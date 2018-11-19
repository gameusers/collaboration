// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
// import Link from 'next/link';
import getConfig from 'next/config';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';

import Button from '@material-ui/core/Button';

const chalk = require('chalk');
const util = require('util');

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
  
  static async getInitialProps({ pathname, req, res }) {
    
    const isServer = !!req;
    
    // console.log(`
    //   req.headers: \n${util.inspect(req.headers, { colors: true, depth: null })}
    // `);
    
    // --------------------------------------------------
    //   publicRuntimeConfig
    // --------------------------------------------------
    
    const { publicRuntimeConfig } = getConfig();
    
    
    // ---------------------------------------------
    //   Fetch
    // ---------------------------------------------
    
    // ----------------------------------------
    //   API URL
    // ----------------------------------------
    
    const urlApi = `${publicRuntimeConfig.urlApi}/v1/logout/initialProps`;
    
    
    // ----------------------------------------
    //   Headers
    // ----------------------------------------
    
    const headersObj = {
      'Accept': 'application/json'
    };
    
    if (isServer) {
      headersObj['Cookie'] = req.headers.cookie;
    }
    
    
    await fetch(urlApi, {
      method: 'GET',
      credentials: 'same-origin',
      mode: 'same-origin',
      headers: headersObj
      // headers: {
      //   'Accept': 'application/json',
      //   'Cookie': req.headers.cookie
      // }
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((jsonObj) => {
        　　throw new Error(jsonObj.errorsArr[0].message);
        　});
        }
        
        return response.json();
      })
      .then((jsonObj) => {
        
        console.log(`then 1`);
        // console.dir(jsonObj);
        
        
        
        // --------------------------------------------------
        //   Console 出力
        // --------------------------------------------------
        
        // console.log(chalk`
        //   isServer: {green ${isServer}}
        //   req.isAuthenticated(): {green ${req.isAuthenticated()}}
        // `);
        
        // console.log(`
        //   req.session: \n${util.inspect(req.session, { colors: true, depth: null })}
        // `);
        
        console.log(`
          jsonObj: \n${util.inspect(jsonObj, { colors: true, depth: null })}
        `);
        
        
        // --------------------------------------------------
        //   ログインしていない時はログインページにリダイレクト
        // --------------------------------------------------
        
        if (jsonObj.login === false) {
          res.redirect('/login');
          res.end();
          return {};
        }
        
      })
      .catch((error) => {
        
        console.log(`catch: ${error}`);
        
      });
    
    
    return { isServer, pathname };
  }
  
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   publicRuntimeConfig
    // --------------------------------------------------
    
    const { publicRuntimeConfig } = getConfig();
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    const argumentsObj = {
      isServer: props.isServer,
      pathname: props.pathname,
      environment: publicRuntimeConfig.environment,
      urlApi: publicRuntimeConfig.urlApi
    };
    
    this.stores = initStoreIndex(argumentsObj);
    this.stores.logoutIndex = initStoreLogoutIndex(argumentsObj, this.stores);
    
    
    
    
    // ---------------------------------------------
    //   Fetch
    // ---------------------------------------------
    
    // this.urlApi = `${publicRuntimeConfig.urlApi}/v1/logout/initialProps`;
    
    // fetch(this.urlApi, {
    //   method: 'GET',
    //   credentials: 'same-origin',
    //   mode: 'same-origin',
    //   headers: {
    //     'Accept': 'application/json'
    //   }
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       return response.json().then((jsonObj) => {
    //     　　throw new Error(jsonObj.errorsArr[0].message);
    //     　});
    //     }
        
    //     return response.json();
    //   })
    //   .then((jsonObj) => {
        
    //     console.log(`then 2`);
    //     console.dir(jsonObj);
        
        
        
    //     // --------------------------------------------------
    //     //   Console 出力
    //     // --------------------------------------------------
        
    //     // console.log(chalk`
    //     //   loginId: {green ${loginId}}
    //     //   loginPassword: {green ${loginPassword}}
    //     //   req.isAuthenticated(): {green ${req.isAuthenticated()}}
    //     // `);
        
    //     console.log(`
    //       jsonObj: \n${util.inspect(jsonObj, { colors: true, depth: null })}
    //     `);
        
        
    //     if (jsonObj.login === false) {
    //       // res.redirect('/login');
    //       // res.end();
    //       // return {};
    //     }
        
    //   })
    //   .catch((error) => {
        
    //     console.log(`catch: ${error}`);
        
    //   });
    
  }
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const stores = this.stores;
    
    
    
    // ---------------------------------------------
    //   Fetch
    // ---------------------------------------------
    
    // const urlApi = `${this.urlApi}`;
    
    // fetch(urlApi, {
    //   method: 'GET',
    //   credentials: 'same-origin',
    //   mode: 'same-origin',
    //   headers: {
    //     'Accept': 'application/json'
    //   }
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       return response.json().then((jsonObj) => {
    //     　　throw new Error(jsonObj.errorsArr[0].message);
    //     　});
    //     }
        
    //     return response.json();
    //   })
    //   .then((jsonObj) => {
        
    //     console.log(`then 3`);
    //     console.dir(jsonObj);
        
        
        
    //     // --------------------------------------------------
    //     //   Console 出力
    //     // --------------------------------------------------
        
    //     // console.log(chalk`
    //     //   loginId: {green ${loginId}}
    //     //   loginPassword: {green ${loginPassword}}
    //     //   req.isAuthenticated(): {green ${req.isAuthenticated()}}
    //     // `);
        
    //     console.log(`
    //       jsonObj: \n${util.inspect(jsonObj, { colors: true, depth: null })}
    //     `);
        
        
    //     if (jsonObj.login === false) {
    //       // res.redirect('/login');
    //       // res.end();
    //       // return {};
    //     }
        
    //   })
    //   .catch((error) => {
        
    //     console.log(`catch: ${error}`);
        
    //   });
    
    
    
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