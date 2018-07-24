// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
// import Link from 'next/link';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';

import initStoreLayout from '../../applications/common/layout/stores/layout';
import initStoreGcCommunity from '../../applications/gc/community/stores/store';

import Layout from '../../applications/common/layout/components/layout';

import withRoot from '../../lib/material-ui/withRoot';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------





// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/gc/community
// --------------------------------------------------

@observer
class Component extends React.Component {
  
  static getInitialProps({ pathname, req, query: { param1, param2, param3 } }) {
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
      current: initStoreGcCommunity(props.isServer, storeLayoutInstance),
      pathname: props.pathname
    };
    
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const stores = this.stores;
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider stores={this.stores}>
      
        <Layout headerNavMainArr={stores.layout.headerNavMainObj.gc}>
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>Game Users</title>
          </Head>
        
          gc/community.js
          
        </Layout>
      </Provider>
    );
  }
}

export default withRoot(Component);