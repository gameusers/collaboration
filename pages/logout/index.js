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

import initStoreCommon from '../../applications/common/layout/stores/common';
import initStoreHeader from '../../applications/common/layout/stores/header';
import initStoreLoginIndex from '../../applications/login/index/stores/store';

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
  margin: 0 0 8px 0 !important;
  padding: 16px !important;
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 0 0 10px 0;
`;

const Description = styled.div`
  margin: 0 0 16px 0;
`;

const StyledButton = styled(Button)`
  margin: 10px 0 0 0 !important;
`;



// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/login
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
    
    this.stores = {
      common: initStoreCommon(props.isServer, props.pathname),
      header: initStoreHeader(props.isServer, props.pathname),
      current: initStoreLoginIndex(props.isServer, props.pathname),
      pathname: props.pathname
    };
    
  }
  
  
  componentDidMount() {
    if (window.innerWidth > 480) {
      this.stores.header.dataOpenFunction();
    }
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
      
        <Layout>
          
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