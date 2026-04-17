import Script from 'next/script'

export function Analitics() {
  return (
    process.env.NODE_ENV === 'production' && (
      <>
        <Script src="https://www.googletagmanager.com/gtag/js?id=GTM-59KPT35L" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'GTM-59KPT35L');
          `}
        </Script>
      </>
    )
  )
}
