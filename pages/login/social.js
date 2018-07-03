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
import initStoreLoginSocial from '../../applications/login/social/stores/store';

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

const ButtonsBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const ButtonTwitter = styled(Button)`
  background-color: #55acee !important;
  margin: 0 10px 0 0 !important;
  
  // &:hover {
  //   background-color: #000000 !important,
  // }
`;

const ButtonGoogle = styled(Button)`
  background-color: #dd4b39 !important;
  margin: 0 10px 0 0 !important;
`;




// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/
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
      current: initStoreLoginSocial(props.isServer, props.pathname),
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
            <title>ログイン - ソーシャルアカウント - Game Users</title>
          </Head>
          
          
          <Container>
            
            {/* ログイン */}
            <PaperForm elevation={4}>
            
              <Title>ログイン - ソーシャルアカウント</Title>
              
              <Description>
                ソーシャルアカウントを利用してログインします。すでに Game Users のアカウントを作成済みで、プレイヤーページのソーシャルアカウント設定で、お使いソーシャルアカウントを登録した場合に、こちらのページからログインができるようになります。
              </Description>
              
              
              {/* ボタン */}
              <ButtonsBox>
              
                <ButtonTwitter
                  variant="contained"
                  color="primary"
                  // onClick={stores.current.dialogOpenFunction}
                >
                  Twitter
                </ButtonTwitter>
                
                <ButtonGoogle
                  variant="contained"
                  color="primary"
                  // onClick={stores.current.dialogOpenFunction}
                >
                  Google
                </ButtonGoogle>
                
              </ButtonsBox>
              
            </PaperForm>
            
          </Container>
          
        </Layout>
      </Provider>
    );
  }
}

export default withRoot(Component);