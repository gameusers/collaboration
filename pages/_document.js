// --------------------------------------------------
//   _document.jsについて：https://github.com/zeit/next.js#custom-document
//   日本語の記事：https://qiita.com/tetsutaroendo/items/c7171286137d963cdecf
//   
//   Next.jsでMaterial UIを利用する場合の_document.js
//   参考：https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js
// --------------------------------------------------

// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import flush from 'styled-jsx/server';
// import theme from '../app/@css/material-ui/theme';


// import '@formatjs/intl-relativetimeformat/polyfill';
// 以下のエラーが出るので入れている
// Error: Intl.RelativeTimeFormat is not available in this environment.
// Try polyfilling it using "@formatjs/intl-relativetimeformat"
// Node.jsがv12になるとIntl.RelativeTimeFormatが使えるようになるらしいので、polyfillはいらなくなるみたい
// 開発環境のNode.jsがv12になった場合は、改めてimportしなくていいかチェックすること


class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
          <meta name='description' content='Hello World!' />
          <meta name='format-detection' content='telephone=no' />
          
          {/* iOS */}
          <meta name='application-name' content='Game Users Dev' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='Game Users Dev' />
          
          {/* Android */}
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='#000000' />
          
          {/* OGP */}
          <meta property='og:title' content='Game Users Dev' />
          <meta property='og:type' content='website' />
          <meta property='og:description' content='Hello World!' />
          <meta property='og:url' content='https://dev-1.gameusers.org/' />
          <meta property='og:image' content='/img/common/social/ogp_image.jpg' />
          <meta property='og:site_name' content='Game Users Dev' />
          
          {/* Twitter */}
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:site' content='@gameusersorg' />
          <meta name='twitter:image' content='/img/common/social/ogp_twitter.png' />
          <meta name='twitter:title' content='Game Users' />
          
          {/* Facebook */}
          <meta property='fb:app_id' content='823267361107745' />
          
          {/* link */}
          <link rel='manifest' href='/manifest.json' />
          <link rel="icon" href="/favicon.ico" />
          <link rel='apple-touch-icon' sizes='180x180' href='/img/common/icons/apple-touch-icon-180×180.png' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}


MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        {sheets.getStyleElement()}
        {flush() || null}
      </React.Fragment>
    ),
  };
};


export default MyDocument;