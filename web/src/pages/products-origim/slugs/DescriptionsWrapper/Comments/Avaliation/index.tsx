import { DialogCloseCustom } from '@/components/DialogCloseCustom'
import { AvaliationBox, AvaliationContainer, BtnUtil, Util } from './styles'
import { Heading, Text } from '@lemonade-technologies-hub-ui/react'
import { StarsWrapper } from '../styles'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { ThumbsUp } from 'phosphor-react'

interface AvaliationProps {
  onClose: () => void
}

export default function Avaliation({ onClose }: AvaliationProps) {
  function handleUtil() {
    // console.log({})
  }

  return (
    <AvaliationContainer>
      <DialogCloseCustom onClose={onClose} />

      <AvaliationBox>
        <Text as="strong">Joao</Text>

        <StarsWrapper>
          <FaStar size={16} />
          <FaStar size={16} />
          <FaStar size={16} />
          <FaStar size={16} />
          <FaStarHalfAlt size={16} />
        </StarsWrapper>
        <Text as="small" size="xs">
          Avaliado em 01/09/2010
        </Text>
        <Heading as="h4">Placa potente</Heading>
        <Text>
          Placa muito silenciosa, competente e gelada. Jogo em Full HD sempre
          com tudo no máximo e ela empurra com sobra., Silenciosa, fria e
          competente., Pra quem gosta aparência extravagante talvez não agrade o
          design minimalista e simples da placa.
        </Text>

        <Util>
          <BtnUtil onClick={handleUtil}>
            <ThumbsUp size={16} />
            Útil (1)
          </BtnUtil>
        </Util>
      </AvaliationBox>
    </AvaliationContainer>
  )
}
