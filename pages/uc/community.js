// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
// import Link from 'next/link';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import initStoreLayout from '../../applications/common/layout/stores/layout';
import initStoreFormPost from '../../applications/common/form/stores/post';
import initStoreBbsNavigation from '../../applications/common/bbs/stores/navigation';
import initStoreBbsThread from '../../applications/common/bbs/stores/thread';
import initStoreUserCommunity from '../../applications/uc/community/stores/store';

import Layout from '../../applications/common/layout/components/layout';
import BbsNavigation from '../../applications/common/bbs/components/navigation';
import BbsThread from '../../applications/common/bbs/components/thread';

import withRoot from '../../lib/material-ui/withRoot';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 10px;
  
  @media screen and (max-width: 480px) {
    padding: 10px 0;
  }
`;




// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/uc/community
// --------------------------------------------------

@observer
class Component extends React.Component {
  
  static getInitialProps({ pathname, req }) {
    const isServer = !!req;
    return { isServer: isServer, pathname: pathname };
  }
  
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    const storeLayoutInstance = initStoreLayout(props.isServer);
    
    const storeInstanceObj = {
      layout: storeLayoutInstance
    };
    
    this.stores = {
      layout: storeLayoutInstance,
      formPost: initStoreFormPost(props.isServer, storeInstanceObj),
      bbsNavigation: initStoreBbsNavigation(props.isServer, storeInstanceObj),
      bbsTread: initStoreBbsThread(props.isServer, storeInstanceObj),
      current: initStoreUserCommunity(props.isServer, storeInstanceObj),
      pathname: props.pathname
    };
    
  }
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const stores = this.stores;
    
    
    // render() {
    //   var text = "One\n\n\nTwo\nThree";
    //   return (
    //   <div>
    //     {text.split("\n").map((i,key) => {
    //       return <p style={{ marginBottom: '20px' }}>{i}</p>;
    //     })}
    //   </div>
    //   );
    // }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider stores={this.stores}>
      
        <Layout headerNavMainArr={stores.layout.headerNavMainObj.uc}>
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>ユーザーコミュニティ</title>
          </Head>
          
          
          <Container>
            
            {/* BBS Navigation */}
            <BbsNavigation />
            
            {/* BBS */}
            <BbsThread
              id="ks8WPvlQpbg"
            />
            
            
            <Button
              onClick={() => stores.layout.handleSnackbarOpen('success', 'success message')}
            >
              Success
            </Button>
            
            <Button
              onClick={() => stores.layout.handleSnackbarOpen('warning', 'warning message')}
            >
              Warning
            </Button>
            
          </Container>
          
        </Layout>
      </Provider>
    );
  }
}

export default withRoot(Component);