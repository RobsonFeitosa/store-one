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
        {/* Estilo para tentar esconder a barra e o popup do Google Translate */}
        <style>{`
          .goog-te-banner-frame.skiptranslate, .goog-te-gadget-icon { display: none !important; }
          body { top: 0px !important; }
          .goog-te-menu-value img { display: none !important; }
          .goog-te-menu-frame { box-shadow: none !important; }
        `}</style>
      </Head>
      <body>
        <Main />
        <div id="google_translate_element" style={{ display: 'none' }}></div>

        {/* Scripts do Google Translate */}
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

            // Script para forçar a tradução se loc=en estiver na URL
            (function() {
              const urlParams = new URLSearchParams(window.location.search);
              if (urlParams.get('loc') === 'en') {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
                document.body.appendChild(script);
                
                // Força o clique na tradução após o carregamento (hack de persistência)
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    var select = document.querySelector('.goog-te-combo');
                    if (select) {
                      select.value = 'en';
                      select.dispatchEvent(new Event('change'));
                    }
                  }, 1000);
                });
              }
            })();
          `
        }} />

        <NextScript />
      </body>
    </Html>
  )
}