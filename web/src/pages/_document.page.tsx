import { getCssText } from '@lemonade-technologies-hub-ui/react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
        {/* CSS para limpar a interface do Google Translate */}
        <style>{`
          .goog-te-banner-frame.skiptranslate { display: none !important; }
          .goog-te-gadget-icon { display: none !important; }
          body { top: 0px !important; }
          .goog-te-menu-value img { display: none !important; }
          #google_translate_element { display: none !important; }
          .skiptranslate iframe { display: none !important; }
        `}</style>
      </Head>
      <body>
        <Main />
        <div id="google_translate_element"></div>

        <script dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'pt',
                includedLanguages: 'en',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              }, 'google_translate_element');
            }

            (function() {
              const urlParams = new URLSearchParams(window.location.search);
              const isEn = urlParams.get('loc') === 'en' || sessionStorage.getItem('force_en') === 'true';

              if (isEn) {
                sessionStorage.setItem('force_en', 'true');

                // Carrega o script oficial do Google
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
                document.body.appendChild(script);
                
                // Função para forçar o seletor de idioma para 'en'
                function applyTranslation() {
                  setTimeout(function() {
                    var select = document.querySelector('.goog-te-combo');
                    if (select) {
                      select.value = 'en';
                      select.dispatchEvent(new Event('change'));
                    }
                  }, 800);
                }

                // Dispara no carregamento inicial
                window.addEventListener('load', applyTranslation);

                // TRUQUE SÊNIOR: Observa mudanças de rota no Next.js (SPA)
                let lastUrl = location.href;
                const observer = new MutationObserver(() => {
                  const url = location.href;
                  if (url !== lastUrl) {
                    lastUrl = url;
                    applyTranslation();
                  }
                });
                observer.observe(document, { subtree: true, childList: true });
              }
            })();
          `
        }} />

        <NextScript />
      </body>
    </Html>
  )
}