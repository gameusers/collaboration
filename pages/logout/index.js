// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
// import Link from 'next/link';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import initStoreLayout from '../../applications/common/layout/stores/layout';
// import initStoreLoginIndex from '../../applications/login/index/stores/store';

import Layout from '../../applications/common/layout/components/layout';

import withRoot from '../../lib/material-ui/withRoot';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 10px;
`;


// ---------------------------------------------
//   フォーム
// ---------------------------------------------

const PaperForm = styled(Paper)`
  && {
    margin: 0 0 8px 0;
    padding: 16px;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 0 0 10px 0;
`;

const Description = styled.div`
  margin: 0 0 16px 0;
`;

const StyledButton = styled(Button)`
  && {
    margin: 10px 0 0 0;
  }
`;



// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/logout
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
    
    this.stores = {
      layout: storeLayoutInstance,
      // current: initStoreUcIndex(props.isServer, storeLayoutInstance),
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
      
        <Layout headerNavMainArr={stores.layout.headerNavMainObj.logout}>
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>ログアウト - Game Users</title>
          </Head>
          
          
          <Container>
            
            {/* ログアウト */}
            <PaperForm elevation={4}>
            
              <Title>ログアウト</Title>
              
              <Description>
                ログアウトする場合は下のボタンを押してください。
              </Description>
              
              
              {/* ボタン */}
              <StyledButton
                variant="contained"
                color="primary"
                // onClick={stores.current.dialogOpenFunction}
              >
                ログアウト
              </StyledButton>
              
            </PaperForm>
            
          </Container>
          
        </Layout>
      </Provider>
    );
  }
}

export default withRoot(Component);