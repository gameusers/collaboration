// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
// import Link from 'next/link';
import getConfig from 'next/config';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import initStoreIndex from '../../applications/common/stores/index';
import initStoreLogoutIndex from '../../applications/logout/index/stores/store';

import Layout from '../../applications/common/layout/components/layout';
import Panel from '../../applications/common/layout/components/panel';

import withRoot from '../../lib/material-ui/withRoot';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 10px 10px 18px 10px;
  
  @media screen and (max-width: 480px) {
    padding: 10px 0 18px 0;
  }
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
    //   publicRuntimeConfig
    // --------------------------------------------------
    
    const { publicRuntimeConfig } = getConfig();
    this.recaptchaSiteKey = publicRuntimeConfig.recaptchaSiteKey;
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    const argumentsObj = {
      isServer: props.isServer,
      pathname: props.pathname,
      environment: publicRuntimeConfig.environment,
      apiUrl: publicRuntimeConfig.apiUrl
    };
    
    this.stores = initStoreIndex(argumentsObj);
    this.stores.logoutIndex = initStoreLogoutIndex(argumentsObj, this.stores);
    
  }
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const stores = this.stores;
    
    
    
    // --------------------------------------------------
    //   Header Navigation
    // --------------------------------------------------
    
    const headerNavMainArr = [
      {
        name: 'ログアウト',
        pathname: '/logout'
      }
    ];
    
    
    
    // --------------------------------------------------
    //   Login
    // --------------------------------------------------
    
    const {
      
      handleLogout
      
    } = stores.logoutIndex;
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider stores={this.stores}>
      
        <Layout headerNavMainArr={headerNavMainArr}>
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>ログアウト - Game Users</title>
          </Head>
          
          
          <Container>
            
            <Panel
              id='logout'
              summary='ログアウト'
              detailsComponent={
                <React.Fragment>
                  
                  <Description>
                    ログアウトする場合は以下のボタンを押してください。
                  </Description>
                  
                  
                  {/* フォーム */}
                  <form>
                    
                    {/* 送信ボタン */}
                    <StyledButton
                      variant="contained"
                      color="primary"
                      onClick={() => handleLogout()}
                    >
                      ログアウト
                    </StyledButton>
                    
                  </form>
                  
                </React.Fragment>
              }
            />
            
          </Container>
          
        </Layout>
      </Provider>
    );
  }
}

export default withRoot(Component);