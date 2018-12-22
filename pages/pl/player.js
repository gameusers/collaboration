// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


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
//   Locales
// ---------------------------------------------

import { IntlProvider, addLocaleData, FormattedMessage } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ja from 'react-intl/locale-data/ja';
addLocaleData([...en, ...ja]);

import { locale } from '../../app/@locales/locale';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../app/@modules/fetch';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreIndex from '../../app/@stores/index';
import initStoreCardPlayer from '../../app/common/card/player/stores/player';
import initStorePlayerPlayer from '../../app/pl/player/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../app/common/layout/components/layout';
import CardPlayer from '../../app/common/card/player/components/player';
import CardGame from '../../app/common/card/player/components/game';

// import DialogTest from '../../app/common/user/components/dialog';


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

const CardBox = styled.div`
  margin: 20px 0 0 0;
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
  
  static async getInitialProps({ pathname, req, res, query }) {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const { publicRuntimeConfig } = getConfig();
    
    const isServer = !!req;
    let initialPropsObj = {};
    let statusCode = 400;
    
    const localeObj = locale({
      acceptLanguage: req.headers['accept-language']
    });
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      urlApi: encodeURI(`${publicRuntimeConfig.urlApi}/v1/pl/player/initial-props?playerID=${query.param1}`),
      methodType: 'GET',
      reqHeadersCookie: isServer ? req.headers.cookie : '',
      reqAcceptLanguage: isServer ? req.headers['accept-language'] : ''
    });
    
    statusCode = resultObj.statusCode;
    initialPropsObj = resultObj.data;
    
    
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(localeObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- resultObj -----\n
    //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    return { isServer, pathname, initialPropsObj, statusCode, localeObj };
    
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
        // 'usersLoginObj' in props.initialPropsObj === false ||
        'usersObj' in props.initialPropsObj === false ||
        'cardPlayersObj' in props.initialPropsObj === false ||
        // 'cardGamesObj' in props.initialPropsObj === false ||
        'cardsArr' in props.initialPropsObj === false
      ) {
        throw new Error();
      }
      
      
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
        urlBase: publicRuntimeConfig.urlBase,
        urlApi: publicRuntimeConfig.urlApi
      };
      
      this.stores = initStoreIndex(argumentsObj);
      // this.stores.cardPlayer = initStoreCardPlayer(argumentsObj, this.stores);
      this.stores.playerPlayer = initStorePlayerPlayer(argumentsObj, this.stores);
      
      
      // --------------------------------------------------
      //   Store / Update Data
      // --------------------------------------------------
      
      if ('usersLoginObj' in props.initialPropsObj) {
        this.stores.data.replaceUsersLoginObj(props.initialPropsObj.usersLoginObj);
      }
      
      this.stores.data.replaceUsersObj(props.initialPropsObj.usersObj);
      this.stores.data.replaceCardPlayersObj(props.initialPropsObj.cardPlayersObj);
      this.stores.data.replaceCardGamesObj(props.initialPropsObj.cardGamesObj);
      
      
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
    
    // const stores = this.stores;
    
    
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
    
    for (const [index, valueObj] of this.props.initialPropsObj.cardsArr.entries()) {
      
      if ('cardPlayers_id' in valueObj) {
        
        componentCardsArr.push(
          <CardPlayer
            cardPlayers_id={valueObj.cardPlayers_id}
            cardGames_id="TzjNMDQyl"
            showCardGameButton={true}
            showFollow={true}
            key={index}
          />
        );
        
      } else {
        
        if (index === 0) {
          
          componentCardsArr.push(
            <CardGame
              cardGames_id={valueObj.cardGames_id}
              showGameName={true}
              showCardPlayerButton={false}
              // showCardGameButton={false}
              showFollow={false}
              key={index}
            />
          );
          
        } else {
          
          componentCardsArr.push(
            <CardBox key={index}>
              <CardGame
                cardGames_id={valueObj.cardGames_id}
                showGameName={true}
                showCardPlayerButton={false}
                // showCardGameButton={false}
                showFollow={false}
              />
            </CardBox>
          );
          
        }
        
        
      }
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider stores={this.stores}>
      
        <IntlProvider 
          locale={this.props.localeObj.languageArr[0]}
          messages={this.props.localeObj.dataObj}
        >
          
          <Layout headerNavMainArr={headerNavMainArr}>
            
            {/* Head 内部のタグをここで追記する */}
            <Head>
              <title>あづみ - Game Users</title>
            </Head>
            
            
            <Container>
              
              {/*{this.props.localeObj.language} / 
              <FormattedMessage
                id='hello'
              />*/}
              {/*<DialogTest />*/}
              
              {componentCardsArr}
              
            </Container>
            
          </Layout>
          
        </IntlProvider>
        
      </Provider>
    );
  }
}

export default withRoot(Component);