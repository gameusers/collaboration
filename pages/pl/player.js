// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import Error from 'next/error';
import Head from 'next/head';
// import Link from 'next/link';
import getConfig from 'next/config';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

// import IconId from '@material-ui/icons/Person';
// import IconPassword from '@material-ui/icons/Lock';
// import IconPasswordOutlined from '@material-ui/icons/LockTwoTone';
// import IconVisibility from '@material-ui/icons/Visibility';
// import IconVisibilityOff from '@material-ui/icons/VisibilityOff';
// import IconMailOutline from '@material-ui/icons/MailOutline';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

// import initStoreIndex from '../../applications/common/stores/index';
import initStoreIndex from '../../applications/@stores/index';
import initStoreCardPlayer from '../../applications/common/card/player/stores/player';
import initStorePlayerPlayer from '../../applications/pl/player/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../applications/common/layout/components/layout';
import CardPlayer from '../../applications/common/card/player/components/player';


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
//   フォーム
// ---------------------------------------------

// const Description = styled.div`
//   margin: 0 0 16px 0;
// `;





// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/pl/***
// --------------------------------------------------

@observer
class Component extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  static async getInitialProps({ pathname, req, res, query }) {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const isServer = !!req;
    let initialPropsObj = {};
    let statusCode = 0;
    let errorObj = {};
    
    
    // console.log(chalk`
    //   pathname: {green ${pathname}}
    // `);
    
    // console.log(`
    //   query: \n${util.inspect(query, { colors: true, depth: null })}
    // `);
    
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   API URL
    // ---------------------------------------------
    
    const { publicRuntimeConfig } = getConfig();
    const urlApi = `${publicRuntimeConfig.urlApi}/v1/pl/player/initial-props?playerId=${query.param1}`;
    
    
    // ---------------------------------------------
    //   Headers
    // ---------------------------------------------
    
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
    })
      .then((response) => {
        
        // console.log(`
        //   response: \n${util.inspect(response, { colors: true, depth: null })}
        // `);
        
        statusCode = response.status;
        
        if (!response.ok) {
          return response.json().then((jsonObj) => {
            errorObj = jsonObj;
        　　throw new Error(errorObj.errorsArr[0].message);
        　});
        }
        
        return response.json();
        
      })
      .then((jsonObj) => {
        
        
        // --------------------------------------------------
        //   Console 出力
        // --------------------------------------------------
        
        // console.log(`
        //   jsonObj: \n${util.inspect(jsonObj, { colors: true, depth: null })}
        // `);
        
        initialPropsObj = jsonObj;
        
        
      })
      .catch((error) => {
        
        console.log(`
          errorObj: \n${util.inspect(errorObj, { colors: true, depth: null })}
        `);
        
        console.log(`/pages/pl/player.js\ngetInitialProps\nFetch / ${error}`);
        
      });
    
    
    return { isServer, pathname, initialPropsObj, statusCode };
    
  }
  
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   Property / Error 判定用
    // --------------------------------------------------
    
    this.error = false;
    
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    try {
      
      
      // --------------------------------------------------
      //   Errorの場合
      // --------------------------------------------------
      
      if (
        this.props.statusCode !== 200 ||
        'data' in props.initialPropsObj === false ||
        'usersLoginObj' in props.initialPropsObj.data === false ||
        'usersObj' in props.initialPropsObj.data === false ||
        'cardPlayersObj' in props.initialPropsObj.data === false ||
        'cardsArr' in props.initialPropsObj === false
      ) {
        throw new Error();
      }
      
      
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
        urlBase: publicRuntimeConfig.urlBase,
        urlApi: publicRuntimeConfig.urlApi
      };
      
      this.stores = initStoreIndex(argumentsObj);
      this.stores.cardPlayer = initStoreCardPlayer(argumentsObj, this.stores);
      this.stores.playerPlayer = initStorePlayerPlayer(argumentsObj, this.stores);
      
      
      // --------------------------------------------------
      //   Store / Update Data
      // --------------------------------------------------
      
      this.stores.data.updateUsersObj(props.initialPropsObj.data.usersObj);
      this.stores.data.updateCardPlayersObj(props.initialPropsObj.data.cardPlayersObj);
      
      
    } catch (e) {
      this.error = true;
    }
    
    
  }
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Error
    //   参考：https://github.com/zeit/next.js#custom-error-handling
    // --------------------------------------------------
    
    if (this.error) {
      return <Error statusCode={this.props.statusCode} />;
    }
    
    
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
    //   Player Card
    // --------------------------------------------------
    
    const componentCardsArr = [];
    
    for (const [index, value] of this.props.initialPropsObj.cardsArr.entries()) {
      // console.log(index, value);
      
      if (value.type === 'player') {
        
        componentCardsArr.push(
          <CardPlayer cardPlayers_id={value._id} key={index} />
        );
        
      } else {
        
      }
      
    }
    
    
    
    
    
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
            
            {componentCardsArr}
            
          </Container>
          
        </Layout>
      </Provider>
    );
  }
}

export default withRoot(Component);