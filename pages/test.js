// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
import { observer, Provider } from 'mobx-react';

import initStoreLayout from '../applications/common/layout/stores/layout';

import Layout from '../applications/common/layout/components/layout';

import withRoot from '../lib/material-ui/withRoot';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------





// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/test
// --------------------------------------------------

@observer
class Component extends React.Component {
  
  static getInitialProps({ pathname, req, query: { id } }) {
    console.log(`id = ${id}`);
    const isServer = !!req;
    return { isServer, pathname };
  }
  
  
  constructor(props) {
    
    super(props);
    

    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    const storeLayoutInstance = initStoreLayout(props.isServer);
    
    this.stores = {
      layout: storeLayoutInstance,
      pathname: props.pathname
    };
    
  }
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    // const stores = this.stores;
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider stores={this.stores}>
      
        <Layout>
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>Game Users</title>
          </Head>
        
          test.js
          
        </Layout>
      </Provider>
    );
  }
}

export default withRoot(Component);