// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import Error from 'next/error';
import Head from 'next/head';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';
import lodashGet from 'lodash/get';


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
import initStoreIDForm from '../../app/common/id/stores/form';
import initStoreGameForm from '../../app/common/game/stores/form';
import initStoreImageAndVideo from '../../app/common/image-and-video/stores/image-and-video';
import initStoreImageAndVideoForm from '../../app/common/image-and-video/stores/form';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../app/common/layout/components/layout';
import CardPlayer from '../../app/common/card/player/components/player';
import CardPlayerDialog from '../../app/common/card/player/components/dialog';


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




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/pl/***
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
    const reqHeadersCookie = lodashGet(req, ['headers', 'cookie'], '');
    const reqAcceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
    const playerID = query.param1;
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      urlApi: encodeURI(`${process.env.URL_API}/v1/pl/player/initial-props?playerID=${playerID}`),
      methodType: 'GET',
      reqHeadersCookie,
      reqAcceptLanguage,
    });
    
    const statusCode = resultObj.statusCode;
    const initialPropsObj = resultObj.data;
    
    
    // console.log(chalk`
    //   isServer: {green ${isServer}}
    // `);
    
    // console.log(`
    //   ----- resultObj -----\n
    //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    return { isServer, pathname, initialPropsObj, statusCode, reqAcceptLanguage, playerID };
    
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
        'cardPlayersObj' in props.initialPropsObj === false ||
        'cardsArr' in props.initialPropsObj === false
      ) {
        throw new Error();
      }
      
      
      // --------------------------------------------------
      //   Store
      // --------------------------------------------------
      
      const argumentsObj = {
        isServer: props.isServer,
        pathname: props.pathname,
      };
      
      this.stores = initStoreIndex(argumentsObj);
      this.stores.pathname = props.pathname;
      this.stores.playerPlayer = initStorePlayerPlayer(argumentsObj, this.stores);
      this.stores.cardPlayer = initStoreCardPlayer(argumentsObj, this.stores);
      this.stores.idForm = initStoreIDForm(argumentsObj, this.stores);
      this.stores.gameForm = initStoreGameForm(argumentsObj, this.stores);
      this.stores.imageAndVideo = initStoreImageAndVideo(argumentsObj, this.stores);
      this.stores.imageAndVideoForm = initStoreImageAndVideoForm(argumentsObj, this.stores);
      
      
      // --------------------------------------------------
      //   Update Data - Locale
      // --------------------------------------------------
      
      if (Object.keys(this.stores.data.localeObj).length === 0) {
        
        const localeObj = locale({
          acceptLanguage: props.reqAcceptLanguage
        });
        
        this.stores.data.replaceLocaleObj(localeObj);
        
      }
      
      
      // --------------------------------------------------
      //   Update Data - Header
      // --------------------------------------------------
      
      this.stores.data.replaceHeaderObj(lodashGet(props, ['initialPropsObj', 'headerObj'], {}));
      
      
      // --------------------------------------------------
      //   Update Data - Login User
      // --------------------------------------------------
      
      this.stores.data.replaceUsersLoginObj(lodashGet(props, ['initialPropsObj', 'usersLoginObj'], {}));
      // if ('usersLoginObj' in props.initialPropsObj) {
      //   this.stores.data.replaceUsersLoginObj(props.initialPropsObj.usersLoginObj);
      // }
      
      
      // --------------------------------------------------
      //   Update Data - Card Players
      // --------------------------------------------------
      
      this.stores.data.replaceCardPlayersObj(props.initialPropsObj.cardPlayersObj);
      
      
    } catch (e) {
      this.error = true;
    }
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
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
        pathname: `/pl/${this.props.playerID}`
      },
      {
        name: '設定',
        pathname: `/pl/${this.props.playerID}/config`
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
            _id={valueObj.cardPlayers_id}
            // cardGames_id="TzjNMDQyl"
            // showCardGameButton={true}
            showFollow={true}
            key={index}
          />
        );
        
      }
      
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider stores={this.stores}>
      
        <IntlProvider 
          locale={this.stores.data.localeObj.languageArr[0]}
          messages={this.stores.data.localeObj.dataObj}
        >
          
          <Layout headerNavMainArr={headerNavMainArr}>
            
            {/* Head 内部のタグをここで追記する */}
            <Head>
              <title>マリオ - Game Users</title>
            </Head>
            
            
            <Container>
              
              {/* プレイヤーカード */}
              {componentCardsArr}
              
              {/* プレイヤーカードを表示するダイアログ */}
              <CardPlayerDialog />
              
            </Container>
            
          </Layout>
          
        </IntlProvider>
        
      </Provider>
    );
  }
}

export default withRoot(Component);