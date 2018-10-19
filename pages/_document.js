// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import JssProvider from 'react-jss/lib/JssProvider';
import flush from 'styled-jsx/server';
import getPageContext from '../lib/material-ui/getPageContext';
// import injectGlobalStyles from '../lib/styles/global-styles';


// injectGlobalStyles();
// import injectGlobalStyles from '../lib/styles/global-styles';


// injectGlobalStyles();


const withJssProvider = (App, pageContext, props) => (
  <JssProvider
    registry={pageContext.sheetsRegistry}
    generateClassName={pageContext.generateClassName}
  >
    <App pageContext={pageContext} {...props} />
  </JssProvider>
);


class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = ctx => {
  // Resolution order
  //
  // On the server:
  // 1. page.getInitialProps
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the server with error:
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. page.getInitialProps
  // 3. page.render

  // Get the context of the page to collected side effects.
  const sheet = new ServerStyleSheet(); // for styled-components
  const pageContext = getPageContext(); // for material-ui
  
  // const page = ctx.renderPage(Component => props => (
  //   <JssProvider
  //     registry={pageContext.sheetsRegistry}
  //     generateClassName={pageContext.generateClassName}
  //   >
  //     <Component pageContext={pageContext} {...props} />
  //   </JssProvider>
  // ));
  
  const page = ctx.renderPage(App => props => {
    const WrappedApp = withJssProvider(App, pageContext, props); // for material-ui
    sheet.collectStyles(WrappedApp);  // for styled-components
    return WrappedApp;
  });

  return {
    ...page,
    styleTags: sheet.getStyleElement(),
    pageContext,
    styles: (
      <React.Fragment>
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
        />
        {flush() || null}
      </React.Fragment>
    ),
  };
};

export default MyDocument;