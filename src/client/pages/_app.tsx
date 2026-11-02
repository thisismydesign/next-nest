import type { AppProps } from 'next/app';
import Script from 'next/script';

import '../styles.css';

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const App = ({ Component, pageProps }: AppProps) => (
  <>
    {gaId && (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
        <Script id="ga">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}</Script>
      </>
    )}
    <Component {...pageProps} />
  </>
);

export default App;
