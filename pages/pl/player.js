// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import Head from 'next/head';
// import Link from 'next/link';
import getConfig from 'next/config';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';


// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconId from '@material-ui/icons/Person';
import IconPassword from '@material-ui/icons/Lock';
import IconPasswordOutlined from '@material-ui/icons/LockTwoTone';
import IconVisibility from '@material-ui/icons/Visibility';
import IconVisibilityOff from '@material-ui/icons/VisibilityOff';
import IconMailOutline from '@material-ui/icons/MailOutline';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreIndex from '../../applications/common/stores/index';
import initStoreCardsPlayer from '../../applications/common/cards/stores/player';
import initStorePlayerPlayer from '../../applications/pl/player/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../applications/common/layout/components/layout';
import Panel from '../../applications/common/layout/components/panel';
// import TermsOfService from '../../applications/common/layout/components/terms-of-service';
import PlayerCards from '../../applications/common/cards/components/player';


// ---------------------------------------------
//   Material UI を Next.js で利用するため
// ---------------------------------------------

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


// ---------------------------------------------
//   Card
// ---------------------------------------------

const CardTopBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0;
  padding: 12px 4px 10px 12px;
  // background-color: thistle;
`;


// ---------------------------------------------
//   Card / User
// ---------------------------------------------

const UserBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
  padding: 0;
  // background-color: red;
`;

const UserThumbnailBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0 0 0 0;
  // background-color: blue;
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  // margin: 15px 12px 12px 10px;
  padding: 4px 0 0 10px;
  // background-color: thistle;
  
  max-width: 320px;
  
  @media screen and (max-width: 480px) {
    max-width: initial;
  }
`;

const UserNameBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 0;
  // padding: 0 12px 0 0;
  // line-height: 1em;
  // word-wrap: break-word;
  // background-color: thistle;
`;


// ---------------------------------------------
//   Card / Expand More
// ---------------------------------------------

const ExpandMoreBox = styled.div`
  margin: 0 0 0 auto;
  padding: 0;
  // background-color: pink;
`;








// ---------------------------------------------
//   フォーム
// ---------------------------------------------

const Description = styled.div`
  // width: 100%;
  margin: 0 0 16px 0;
  // padding: 0 30px 0 0;
  // background-color: pink;
`;










// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/pl/***
// --------------------------------------------------

@observer
class Component extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  static async getInitialProps({ pathname, req, res }) {
    
    const isServer = !!req;
    
    
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
    
    // const apiUrl = `${publicRuntimeConfig.apiUrl}/v1/login/initialProps`;
    
    
    // // ----------------------------------------
    // //   Headers
    // // ----------------------------------------
    
    // const headersObj = {
    //   'Accept': 'application/json'
    // };
    
    // if (isServer) {
    //   headersObj['Cookie'] = req.headers.cookie;
    // }
    
    
    // await fetch(apiUrl, {
    //   method: 'GET',
    //   credentials: 'same-origin',
    //   mode: 'same-origin',
    //   headers: headersObj
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
        
    //     console.log(`then 1`);
    //     // console.dir(jsonObj);
        
        
        
    //     // --------------------------------------------------
    //     //   Console 出力
    //     // --------------------------------------------------
        
    //     // console.log(chalk`
    //     //   isServer: {green ${isServer}}
    //     //   req.isAuthenticated(): {green ${req.isAuthenticated()}}
    //     // `);
        
    //     // console.log(`
    //     //   req.session: \n${util.inspect(req.session, { colors: true, depth: null })}
    //     // `);
        
    //     // console.log(`
    //     //   jsonObj: \n${util.inspect(jsonObj, { colors: true, depth: null })}
    //     // `);
        
        
    //     // --------------------------------------------------
    //     //   ログインしている場合はログアウトページにリダイレクト
    //     // --------------------------------------------------
        
    //     if (jsonObj.login) {
    //       res.redirect('/logout');
    //       res.end();
    //       return {};
    //     }
        
    //   })
    //   .catch((error) => {
        
    //     console.log(`catch: ${error}`);
        
    //   });
    
    
    
    
    const dataObj = {
      dataLoginUserObj: {},
      dataUserObj: {},
      dataUserCommunityObj: {},
      layoutPanelExpandedObj: {},
      userCommunityId: 'p0V_RsaT1l8',
      bbsNavigationId: 'XcczkfiRN9f',
      bbsNavigationOpenedTabNoObj: {},
      bbsNavigationThreadListObj: {},
      bbsObj: {},
    };
    
    
    // ---------------------------------------------
    //   User - Data
    // ---------------------------------------------
    
    dataObj.dataUserObj = {
      'a8b0gX6lMIz': {
        name: 'あづみデッドバイデイライト',
        status: 'プロハンター',
        playerId: 'az1979',
        playerPage: '/pl/az1979',
        level: 999,
        accessDate: '2018-08-06T08:50:00Z'
      }
    };
    
    
    
    return { isServer, pathname, dataObj };
    
  }
  
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
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
    this.stores.cardsPlayer = initStoreCardsPlayer(argumentsObj, this.stores);
    this.stores.playerPlayer = initStorePlayerPlayer(argumentsObj, this.stores);
    
    
    
    // --------------------------------------------------
    //   Insert Data
    // --------------------------------------------------
    
    const {
      dataUserObj
    } = props.dataObj;
    
    this.stores.data.insertUserObj(dataUserObj);
    
    
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
        name: 'プロフィール',
        pathname: '/pl/AZ-1979'
      },
      {
        name: '設定',
        pathname: '/pl/AZ-1979/config'
      }
    ];
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider stores={this.stores}>
      
        <Layout headerNavMainArr={headerNavMainArr}>
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>あづみ - Game Users</title>
          </Head>
          
          
          <Container>
            
            <PlayerCards />
            
            
            
            {/* ログイン */}
            <Panel
              id='login'
              summary='プレイヤー'
              detailsComponent={
                <React.Fragment>
                  
                  <Description>
                    pl
                  </Description>
                  
                  
                  
                  
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