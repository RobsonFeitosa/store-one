import { pt_BR, en, Faker } from '@faker-js/faker';
import { dataSource } from './typeorm.config';
import { Product } from '../../../modules/product/domain/entities/product.entity';
import { Category } from '../../../modules/product/domain/entities/category.entity';
import { ProductData } from '../../../modules/product/domain/entities/product-data.entity';
import { TimeDiscount } from '../../../modules/product/domain/entities/time-discount.entity';
import { User } from '../../../modules/user/domain/entities/user.entity';
import { UserSettings } from '../../../modules/user/domain/entities/user-settings.entity';
import { Archive } from '../../../modules/archive/domain/entities/archive.entity';
import { ProductAttribute } from '../../../modules/product/domain/entities/product-attribute.entity';
import { ProductVariation } from '../../../modules/product/domain/entities/product-variation.entity';
import Team from '../../../modules/users/infra/typeorm/entities/Team';
import { Professional } from '../../../modules/users/infra/typeorm/entities/Professional';
import { TimeIntervals } from '../../../modules/users/infra/typeorm/entities/TimeIntervals';
import { Address } from '../../../modules/address/domain/entities/address.entity';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const faker = new Faker({
  locale: [pt_BR, en],
});

const IMAGES_SOURCE_DIR = 'C:\\www\\ecommerce\\banco-imgens-produtos';
const UPLOADS_DEST_DIR = path.resolve(__dirname, '..', '..', '..', '..', 'tmp', 'uploads');

async function seed() {
  await dataSource.initialize();
  console.log('Banco de dados inicializado para o seed.');

  const categoryRepository = dataSource.getRepository(Category);
  const productRepository = dataSource.getRepository(Product);
  const productDataRepository = dataSource.getRepository(ProductData);
  const timeDiscountRepository = dataSource.getRepository(TimeDiscount);
  const userRepository = dataSource.getRepository(User);
  const userSettingsRepository = dataSource.getRepository(UserSettings);
  const archiveRepository = dataSource.getRepository(Archive);
  const productAttributeRepository = dataSource.getRepository(ProductAttribute);
  const productVariationRepository = dataSource.getRepository(ProductVariation);
  const teamRepository = dataSource.getRepository(Team);
  const professionalRepository = dataSource.getRepository(Professional);
  const timeIntervalsRepository = dataSource.getRepository(TimeIntervals);
  const addressRepository = dataSource.getRepository(Address);

  await dataSource.query('TRUNCATE TABLE "ar100_archives", "users_settings", "users", "pd104_products_data", "pd100_products", "pd101_product_categories", "ti100_time_discount", "pd105_products_attributes", "pd106_products_variations", "te100_team", "pr100_professional", "pr100_time_intervals", "address" CASCADE');

  console.log('Tabelas limpas.');

  // Create Admin User
  const hashedPassword = await bcrypt.hash('123123', 10);
  const adminSettings = await userSettingsRepository.save(new UserSettings({
    level: 2,
    actived: true,
  }));

  const admin = await userRepository.save(new User({
    name: 'Admin Robson',
    email: 'robson.gw@hotmail.com',
    password: hashedPassword,
    settings_id: adminSettings.id,
  }));
  console.log('Usuário admin criado: robson.gw@hotmail.com');

  // Create Addresses for Admin
  const addressesData = [
    {
      title: 'Casa',
      zipcode: '01310-100',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
      neighborhood: 'Bela Vista',
      street: 'Avenida Paulista',
      street_number: '1000',
      primary: true,
      user_id: admin.id,
    },
    {
      title: 'Trabalho',
      zipcode: '20040-002',
      city: 'Rio de Janeiro',
      state: 'RJ',
      country: 'Brasil',
      neighborhood: 'Centro',
      street: 'Avenida Rio Branco',
      street_number: '156',
      primary: false,
      user_id: admin.id,
    },
    {
      title: 'Casa de Praia',
      zipcode: '88010-000',
      city: 'Florianópolis',
      state: 'SC',
      country: 'Brasil',
      neighborhood: 'Centro',
      street: 'Rua Felipe Schmidt',
      street_number: '500',
      primary: false,
      user_id: admin.id,
    },
  ];

  for (const addr of addressesData) {
    await addressRepository.save(new Address(addr));
  }
  console.log('3 endereços criados para o admin.');

  // Create Teams and Professionals
  const team = await teamRepository.save(Object.assign(new Team(), {
    name: 'Equipe de Atendimento Geral',
    user_id: admin.id,
    operation: 'all',
  }));

  const professionalNames = [
    'Carlos Silva', 'Ana Souza', 'Ricardo Santos', 'Beatriz Lima', 'Fernando Costa'
  ];

  for (const name of professionalNames) {
    const professional = await professionalRepository.save(Object.assign(new Professional(), {
      name,
      function: faker.person.jobTitle(),
      actived: true,
      team_id: team.id,
    }));

    // Create time intervals for each professional (Monday to Friday, 08:00 to 18:00)
    for (let day = 1; day <= 5; day++) {
      await timeIntervalsRepository.save(Object.assign(new TimeIntervals(), {
        professional_id: professional.id,
        week_day: day,
        time_start_in_minutes_one: 480, // 08:00
        time_end_in_minutes_one: 720,   // 12:00
        time_start_in_minutes_two: 780, // 13:00
        time_end_in_minutes_two: 1080,  // 18:00
      }));
    }
  }
  console.log(`${professionalNames.length} profissionais criados.`);

  const categories: Category[] = [];
  const categoryNames = [
    'Eletrônicos', 'Hardware', 'Periféricos', 'Casa', 'Beleza', 'Brinquedos', 'Livros', 'Ferramentas',
    'Serviços Automotivos', 'Estética', 'Tecnologia', 'Serviços Domésticos', 'Saúde', 'Aluguel'
  ];
  for (const name of categoryNames) {
    const isServiceCategory = [
      'Serviços Automotivos', 'Estética', 'Tecnologia', 'Serviços Domésticos', 'Saúde', 'Aluguel'
    ].includes(name);

    const category = new Category({
      name,
      slug: faker.helpers.slugify(name.toLowerCase()),
      type: isServiceCategory ? 'service' : 'product',
      level: 1,
      description: faker.commerce.productDescription() + ' ' + faker.lorem.sentences(5),
    });
    categories.push(await categoryRepository.save(category));
  }
  console.log(`${categories.length} categorias criadas.`);

  const productsDataToSeed = [
    {
      name: 'Placa de Video Gigabyte GeForce RTX 4060 Eagle OC, 8GB, GDDR6, 128-bit, GV-N4060EAGLE-OC-8GD',
      imagePattern: 'example-pd1-',
      imageRange: 5,
      description: 'A placa de vídeo Gigabyte GeForce RTX 4060 Eagle OC oferece desempenho excepcional para gamers e criadores. Com a arquitetura NVIDIA Ada Lovelace, ela proporciona gráficos ultra-realistas com Ray Tracing e suporte a DLSS 3 para taxas de quadros fluidas.',
      category: 'Hardware',
      type: 'product',
      quantity: 15,
      sku: 'GV-N4060EAGLE-OC-8GD',
      weight: 1.2,
      dimensions: { height: 10, width: 20, length: 30 },
      code_bar: '4719331313722'
    },
    {
      name: 'Cadeira Gamer KBM! GAMING Tempest CG600, Preta, Com Almofadas, Descanso Para Pernas Retrátil, Reclinável',
      imagePattern: 'example-pd2-',
      imageRange: 4,
      description: 'Conforto e estilo definem a Cadeira Gamer KBM! GAMING Tempest CG600. Equipada com almofadas cervicais e lombares, descanso para pernas retrátil e reclinação ajustável, é ideal para longas sessões de jogo ou trabalho.',
      category: 'Periféricos',
      type: 'product',
      quantity: 8,
      sku: 'KBM-CG600-BK',
      weight: 22.5,
      dimensions: { height: 85, width: 65, length: 70 },
      code_bar: '7898671170001'
    },
    {
      name: 'Vichy Minéral 89 Hidratante Facial 30ml',
      imagePattern: 'example-pd3-',
      imageRange: 7,
      description: 'O Vichy Minéral 89 é um fortalecedor facial composto por 89% de Água Vulcânica de Vichy e Ácido Hialurônico. Hidrata profundamente, preenche a pele e reforça a barreira cutânea contra agressões externas.',
      category: 'Beleza',
      type: 'product',
      quantity: 45,
      sku: 'VICHY-M89-30',
      weight: 0.15,
      dimensions: { height: 12, width: 4, length: 4 },
      code_bar: '3337875543248'
    },
    {
      name: 'Brinquedo Didático para Crianças, Interativo, Colorido, Estimula Criatividade e Coordenação Motora',
      imagePattern: 'example-pd4-',
      imageRange: 4,
      description: 'Um brinquedo interativo e vibrante projetado para estimular os sentidos e as habilidades motoras das crianças. Com diversas formas e cores, promove o aprendizado lúdico e a coordenação motora fina.',
      category: 'Brinquedos',
      type: 'product',
      quantity: 25,
      sku: 'BRINQ-DIDAT-01',
      weight: 0.8,
      dimensions: { height: 25, width: 25, length: 25 },
      code_bar: '7898506720002'
    },
    {
      name: 'Carrinho Controle Remoto Drifter Polibrinq',
      imagePattern: 'example-pd5-',
      imageRange: 4,
      variantPattern: 'example-pd-var1-',
      variantRange: 2,
      description: 'Prepare-se para manobras incríveis com o Carrinho Drifter da Polibrinq. Com controle remoto preciso e design aerodinâmico, ele é perfeito para competições e drifts emocionantes em diversas superfícies.',
      category: 'Brinquedos',
      type: 'product',
      quantity: 12,
      sku: 'POLI-DRIFT-RE',
      weight: 1.5,
      dimensions: { height: 15, width: 20, length: 35 },
      code_bar: '7898506720125'
    },
    {
      name: 'Livro Os Frutos Da Terra',
      imagePattern: 'example-pd6-',
      imageRange: 1,
      variantPattern: 'example-pd-var2-',
      variantRange: 2,
      description: 'Uma obra literária profunda que explora a relação do homem com a terra e suas raízes. "Os Frutos Da Terra" é uma leitura essencial para quem busca reflexão e uma escrita poética sobre a existência humana.',
      category: 'Livros',
      type: 'product'
    },
    {
      name: 'Lançador Nerf Elite 2.0 Commander Rd-6 12 Dardos',
      imagePattern: 'example-pd7-',
      imageRange: 6,
      description: 'Domine o campo de batalha com o Nerf Elite 2.0 Commander. Possui tambor rotativo para 6 dardos e trilhos táticos para personalização, permitindo ataques rápidos e precisos em suas aventuras.',
      category: 'Brinquedos',
      type: 'product'
    },
    {
      name: 'Fritadeira Elétrica Electrolux Air Fryer Oven 12L',
      imagePattern: 'example-pd8-',
      imageRange: 4,
      description: 'Praticidade e saúde na sua cozinha com a Air Fryer Oven Electrolux de 12 litros. Multifuncional, ela frita, assa e desidrata alimentos sem óleo, mantendo o sabor e a crocância com grande capacidade interna.',
      category: 'Casa',
      type: 'product'
    },
    {
      name: 'Travesseiro de viagem da marca Fibrasca',
      imagePattern: 'example-pd9-',
      imageRange: 6,
      description: 'Viaje com total conforto usando o travesseiro de viagem Fibrasca. Com design ergonômico que se adapta ao pescoço, ele proporciona o suporte necessário para um descanso relaxante durante voos ou trajetos longos.',
      category: 'Casa',
      type: 'product'
    },
    {
      name: 'Parafusadeira e Furadeira a Bateria WAP BPF 12K3',
      imagePattern: 'example-pd10-',
      imageRange: 6,
      description: 'A WAP BPF 12K3 é a ferramenta ideal para reparos domésticos e montagens. Leve, ergonômica e potente, possui bateria de 12V de longa duração e mandril de aperto rápido para maior agilidade no trabalho.',
      category: 'Ferramentas',
      type: 'product'
    },
    {
      name: 'Serra Tico Tico WAP ESTT 550',
      imagePattern: 'example-pd11-',
      imageRange: 6,
      description: 'Cortes precisos em madeira, metal e plástico com a Serra Tico Tico WAP ESTT 550. Possui controle de velocidade variável e sistema de troca rápida de lâminas, oferecendo versatilidade para seus projetos de marcenaria.',
      category: 'Ferramentas',
      type: 'product'
    },
    {
      name: 'Ventilador de Mesa Arno Xtreme Force Breeze 40cm',
      imagePattern: 'example-pd12-',
      imageRange: 7,
      description: 'Refresque seu ambiente com o ventilador mais forte e silencioso do Brasil. O Arno Xtreme Force Breeze possui 3 velocidades e grade aerodinâmica, garantindo ventilação potente mesmo nos dias mais quentes.',
      category: 'Casa',
      type: 'product'
    },
    {
      name: 'Serra tico-tico a bateria Bosch GST 12V-70',
      imagePattern: 'example-pd13-',
      imageRange: 6,
      description: 'Compacta e profissional, a serra tico-tico Bosch GST 12V-70 oferece total liberdade de movimento. Ideal para cortes curvos e retos em espaços reduzidos, mantendo a precisão e potência da linha Bosch Professional.',
      category: 'Ferramentas',
      type: 'product'
    },
    {
      name: 'Lixadeira Orbital WAP Elo 250',
      imagePattern: 'example-pd14-',
      imageRange: 7,
      description: 'Consiga acabamentos perfeitos em superfícies de madeira ou metal com a Lixadeira WAP Elo 250. Seu design ergonômico reduz a fadiga do operador, enquanto o sistema de coleta de pó mantém o ambiente limpo.',
      category: 'Ferramentas',
      type: 'product'
    },
    {
      name: 'Tablet Samsung Galaxy Tab S6 Lite',
      imagePattern: 'example-pd15-',
      imageRange: 6,
      description: 'O Galaxy Tab S6 Lite é seu companheiro ideal para estudos e entretenimento. Acompanha a caneta S Pen, possui tela vibrante de 10.4" e bateria de longa duração em um corpo metálico elegante e leve.',
      category: 'Eletrônicos',
      type: 'product'
    },
    {
      name: 'Bocina Inteligente Amazon Echo Dot',
      imagePattern: 'example-pd16-',
      imageRange: 6,
      description: 'A Alexa está pronta para ajudar com o Amazon Echo Dot. Peça músicas, configure alarmes, controle dispositivos de casa inteligente e obtenha respostas instantâneas, tudo apenas usando sua voz.',
      category: 'Eletrônicos',
      type: 'product'
    },
    {
      name: 'Amazon Echo Show 5',
      imagePattern: 'example-pd17-',
      imageRange: 5,
      description: 'Gerencie seu dia com o Echo Show 5. Com tela de 5.5", permite fazer chamadas de vídeo, assistir trailers, conferir letras de músicas e visualizar câmeras de segurança compatíveis com total integração à Alexa.',
      category: 'Eletrônicos',
      type: 'product'
    },
    {
      name: 'Câmera DSLR Canon EOS Rebel T7',
      imagePattern: 'example-pd18-',
      imageRange: 7,
      description: 'Capture momentos inesquecíveis com qualidade profissional usando a Canon Rebel T7. Com sensor de 24.1 MP e conectividade Wi-Fi, é perfeita para quem deseja evoluir na fotografia e compartilhar fotos incríveis.',
      category: 'Eletrônicos',
      type: 'product'
    },
    {
      name: 'Apple AirPods (2ª geração)',
      imagePattern: 'example-pd19-',
      imageRange: 6,
      description: 'Experiência sonora sem fios e mágica com os AirPods da Apple. Com ativação automática e conexão instantânea com seus dispositivos, oferecem áudio de alta qualidade e comando por voz "E aí Siri".',
      category: 'Eletrônicos',
      type: 'product'
    },
    {
      name: 'Smart TV Samsung da linha Crystal UHD',
      imagePattern: 'example-pd20-',
      imageRange: 7,
      description: 'Mergulhe em imagens realistas com a Samsung Crystal UHD. Com processador 4K de última geração, design sem bordas e múltiplos assistentes de voz integrados, ela transforma sua experiência de assistir TV.',
      category: 'Eletrônicos',
      type: 'product'
    },
    {
      name: 'Troca de óleo lubrificante Synt Nx10',
      imagePattern: 'example-sc1-',
      imageRange: 3,
      variantPattern: 'example-sc-var1-',
      variantRange: 2,
      description: 'Mantenha o motor do seu veículo protegido com a troca de óleo Synt Nx10. Nosso serviço inclui a substituição completa do lubrificante e verificação de filtros para garantir a máxima eficiência e durabilidade do motor.',
      category: 'Serviços Automotivos',
      type: 'service'
    },
    {
      name: 'Correção na correia dentada',
      imagePattern: 'example-sc2-',
      imageRange: 1,
      variantPattern: 'example-sc-var3-',
      variantRange: 2,
      description: 'Evite danos graves ao motor com a manutenção preventiva da correia dentada. Realizamos a troca e o ajuste preciso para assegurar o sincronismo perfeito e a segurança do seu automóvel.',
      category: 'Serviços Automotivos',
      type: 'service'
    },
    {
      name: 'Corte de cabelo masculino',
      imagePattern: 'example-sc3-',
      imageRange: 2,
      description: 'Cortes modernos e clássicos realizados por profissionais qualificados. Oferecemos um atendimento personalizado para garantir o visual que melhor combina com seu estilo e personalidade.',
      category: 'Estética',
      type: 'service'
    },
    {
      name: 'Manutenção de computadores',
      imagePattern: 'example-sc4-',
      imageRange: 1,
      variantPattern: 'example-sc-var2-',
      variantRange: 2,
      description: 'Assistência técnica completa para desktops e notebooks. Realizamos limpeza interna, troca de componentes, formatação e otimização de sistema para que seu equipamento volte a ter alto desempenho.',
      category: 'Tecnologia',
      type: 'service'
    },
    {
      name: 'Sistema de vigilância monitorado',
      imagePattern: 'example-sc5-',
      imageRange: 2,
      description: 'Segurança total para sua residência ou empresa. Instalamos e configuramos sistemas de câmeras de alta definição com acesso remoto via smartphone, garantindo monitoramento 24 horas por dia.',
      category: 'Tecnologia',
      type: 'service'
    },
    {
      name: 'Design sobrancelhas e maquiagem',
      imagePattern: 'example-sc6-',
      imageRange: 3,
      description: 'Realce sua beleza natural com nosso serviço de design de sobrancelhas e maquiagem profissional. Utilizamos técnicas avançadas e produtos de alta qualidade para ocasiões especiais ou para o dia a dia.',
      category: 'Estética',
      type: 'service'
    },
    {
      name: 'Equipe de limpeza e higiene',
      imagePattern: 'example-sc7-',
      imageRange: 2,
      description: 'Serviços especializados de limpeza para ambientes comerciais e residenciais. Nossa equipe utiliza equipamentos modernos e produtos eficientes para garantir máxima higiene e bem-estar.',
      category: 'Serviços Domésticos',
      type: 'service'
    },
    {
      name: 'Clareamento dental a laser',
      imagePattern: 'example-sc8-',
      imageRange: 2,
      description: 'Conquiste um sorriso mais branco e brilhante com o clareamento dental a laser. Um procedimento rápido, seguro e indolor realizado por dentistas experientes para resultados imediatos.',
      category: 'Saúde',
      type: 'service'
    },
    {
      name: 'Limpeza florestal',
      imagePattern: 'example-sc9-',
      imageRange: 2,
      description: 'Serviços de roçada, poda e remoção de resíduos vegetais em grandes áreas. Realizamos a manutenção de terrenos e áreas verdes com foco na preservação ambiental e prevenção de incêndios.',
      category: 'Serviços Domésticos',
      type: 'service'
    },
    {
      name: 'Alugueis de carros',
      imagePattern: 'example-sc10-',
      imageRange: 2,
      description: 'Ampla frota de veículos modernos para todas as suas necessidades de viagem. Oferecemos planos flexíveis, seguro incluso e assistência 24h para que você viaje com total tranquilidade.',
      category: 'Aluguel',
      type: 'service'
    }
  ];

  if (!fs.existsSync(UPLOADS_DEST_DIR)) {
    fs.mkdirSync(UPLOADS_DEST_DIR, { recursive: true });
  }

  for (const item of productsDataToSeed) {
    const category = categories.find(c => c.name === item.category) || categories[0];
    const price = Math.round(Number(faker.commerce.price({ min: 50, max: 5000 })) * 100);

    const product = new Product({
      name: item.name,
      price,
      old_price: Math.round(price * 1.15),
      description: item.description,
      short_description: `${item.description} ${faker.lorem.sentences(4)}`.split(' ').slice(0, 45).join(' ') + '.',
      cod_product: faker.string.alphanumeric(10).toUpperCase(),
      slug: faker.helpers.slugify(item.name.toLowerCase()),
      published: 'true',
      visibility: 'public',
      type: item.type as any,
      categories: JSON.stringify([category.id]),
      emphasis: faker.datatype.boolean(),
      mode_data: 'single',
    });

    const savedProduct = await productRepository.save(product);

    const productData = new ProductData({
      product_id: savedProduct.id,
      quantity: (item as any).quantity || faker.number.int({ min: 5, max: 100 }),
      sku: (item as any).sku || faker.string.alphanumeric(12).toUpperCase(),
      weight: item.type === 'product'
        ? ((item as any).weight || parseFloat(faker.commerce.price({ min: 0.5, max: 15 })))
        : null,
      dimensions: item.type === 'product'
        ? JSON.stringify((item as any).dimensions || {
          height: faker.number.int({ min: 10, max: 100 }),
          width: faker.number.int({ min: 10, max: 100 }),
          length: faker.number.int({ min: 10, max: 100 }),
        })
        : null,
      code_bar: item.type === 'product'
        ? ((item as any).code_bar || faker.string.numeric(13))
        : null,
    });
    await productDataRepository.save(productData);

    // Save Images
    const imagesToSave: string[] = [];
    for (let j = 1; j <= item.imageRange; j++) {
      imagesToSave.push(`${item.imagePattern}${j}.jpg`);
    }

    for (let index = 0; index < imagesToSave.length; index++) {
      const fileName = imagesToSave[index];
      const sourcePath = path.join(IMAGES_SOURCE_DIR, fileName);
      const destPath = path.join(UPLOADS_DEST_DIR, fileName);

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        const stats = fs.statSync(destPath);

        const archive = new Archive({
          origin_target: 'product',
          reference_id: savedProduct.id,
          name: fileName,
          is_primary: index === 0,
          size: String(stats.size),
          type: 'image/jpeg',
        });
        await archiveRepository.save(archive);
      } else {
        console.warn(`Imagem não encontrada: ${sourcePath}`);
      }
    }

    if (item.variantPattern && item.variantRange) {
      const isColorType = ['Brinquedos', 'Tecnologia'].includes(item.category);
      const variantType = isColorType ? 'Cor' : 'Tamanho';
      const colorOptions = ['Verde', 'Amarelo', 'Azul', 'Vermelho', 'Preto', 'Branco'];
      const sizeOptions = ['Pequeno', 'Grande', 'Médio', 'Extra Grande', 'Único'];
      const currentOptions = isColorType ? colorOptions : sizeOptions;
      
      const attributeOptions = currentOptions.slice(0, item.variantRange);

      const attribute = new ProductAttribute({
        product_id: savedProduct.id,
        name: variantType,
        options: JSON.stringify(attributeOptions),
      });
      const savedAttribute = await productAttributeRepository.save(attribute);

      for (let k = 1; k <= item.variantRange; k++) {
        const fileName = `${item.variantPattern}${k}.jpg`;
        const sourcePath = path.join(IMAGES_SOURCE_DIR, fileName);
        const destPath = path.join(UPLOADS_DEST_DIR, fileName);
        const optionName = attributeOptions[k - 1] || `${variantType} ${k}`;

        const variation = new ProductVariation({
          product_attribute_id: savedAttribute.id,
          price: price,
          name: optionName,
          quantity: faker.number.int({ min: 1, max: 20 }),
          active: true,
          sku: faker.string.alphanumeric(12).toUpperCase(),
          weight: faker.number.int({ min: 1, max: 5 }),
          dimensions: JSON.stringify({ height: 10, width: 10, length: 10 }),
        });
        const savedVariation = await productVariationRepository.save(variation);

        if (fs.existsSync(sourcePath)) {
          fs.copyFileSync(sourcePath, destPath);
          const stats = fs.statSync(destPath);

          const archive = new Archive({
            origin_target: 'product_variation',
            reference_id: savedProduct.id,
            name: fileName,
            is_primary: true,
            size: String(stats.size),
            type: 'image/jpeg',
          });
          const savedArchive = await archiveRepository.save(archive);

          await productVariationRepository.update(savedVariation.id, { image_id: savedArchive.id });
        } else {
          console.warn(`Imagem da variante não encontrada: ${sourcePath}`);
        }
      }
    }
  }

  console.log('Seed de produtos e imagens finalizado com sucesso.');
  await dataSource.destroy();
}

seed().catch((error) => {
  console.error('Erro durante o seed:', error);
  process.exit(1);
});
