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
//   Material UI
// ---------------------------------------------

// import Drawer from '@material-ui/core/Drawer';


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
import initStorePlPlayer from '../../app/pl/player/stores/store';
import initStoreIDForm from '../../app/common/id/stores/form';
import initStoreGameForm from '../../app/common/game/stores/form';
import initStoreImageAndVideo from '../../app/common/image-and-video/stores/image-and-video';
import initStoreImageAndVideoForm from '../../app/common/image-and-video/stores/form';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../app/common/layout/components/layout';
import Drawer from '../../app/common/layout/components/drawer';
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
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  margin: 0 auto;
  padding: 16px;
  // background-color: pink;
  
  @media screen and (max-width: 947px) {
    padding: 10px 0 10px 0;
  }
`;

const ColumnSidebar = styled.div`
  width: 300px;
  margin: 0 16px 0 0;
  padding: 0;
  // background-color: pink;
  
  @media screen and (max-width: 947px) {
    display: none;
  }
`;

const ColumnMain = styled.div`
  max-width: 800px;
  margin: 0;
  padding: 0;
  // background-color: green;
`;



// const ContainerMobile = styled.div`
//   padding: 10px 10px 18px 10px;
  
//   @media screen and (max-width: 480px) {
//     padding: 10px 0 18px 0;
//   }
// `;




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/pl/***
// --------------------------------------------------

@observer
class Component extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  static async getInitialProps({ req, res, query }) {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const isServer = !process.browser;
    const reqHeadersCookie = lodashGet(req, ['headers', 'cookie'], '');
    const reqAcceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
    const playerID = query.playerID;
    const pathname = `/pl/${playerID}`;
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      urlApi: encodeURI(`${process.env.URL_API}/v1/initial-props/pl/player/?playerID=${playerID}`),
      methodType: 'GET',
      reqHeadersCookie,
      reqAcceptLanguage,
    });
    
    const statusCode = resultObj.statusCode;
    const initialPropsObj = resultObj.data;
    
    // console.log(chalk`
    //   isServer: {green ${isServer}}
    //   pathname: {green ${pathname}}
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
      this.stores.plPlayer = initStorePlPlayer(argumentsObj, this.stores);
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
      
      this.stores.data.replaceLoginUsersObj(lodashGet(props, ['initialPropsObj', 'loginUsersObj'], {}));
      
      
      // --------------------------------------------------
      //   Update Data - Card Players
      // --------------------------------------------------
      
      this.stores.data.replaceCardPlayersObj(props.initialPropsObj.cardPlayersObj);
      
      
      // --------------------------------------------------
      //   Update Data - Pages Array
      // --------------------------------------------------
      
      this.stores.plPlayer.replacePagesArr(props.initialPropsObj.pagesArr);
      
      
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
    
    const stores = this.stores;
    
    // const drawerOpen = lodashGet(stores, ['layout', 'drawerOpen'], false);
    // const handleDrawerClose = lodashGet(stores, ['layout', 'handleDrawerClose'], () => {});
    
    
    // --------------------------------------------------
    //   Header Navigation
    // --------------------------------------------------
    
    const headerNavMainArr = [
      {
        name: 'プロフィール',
        href: `/pl/player?playerID=${this.props.playerID}`,
        as: `/pl/${this.props.playerID}`,
      },
      {
        name: '設定',
        href: `/pl/settings?playerID=${this.props.playerID}`,
        as: `/pl/${this.props.playerID}/settings`,
      }
    ];
    
    
    // --------------------------------------------------
    //   Player Card
    // --------------------------------------------------
    
    let userName = '';
    
    const componentCardsArr = [];
    
    for (const [index, valueObj] of this.props.initialPropsObj.cardsArr.entries()) {
      
      if ('cardPlayers_id' in valueObj) {
        
        const cardPlayers_id = lodashGet(valueObj, ['cardPlayers_id'], '');
        userName = lodashGet(stores, ['data', 'cardPlayersObj', cardPlayers_id, 'nameObj', 'value'], '');
        
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
    //   Header Title
    // --------------------------------------------------
    
    const topPagesObj = stores.plPlayer.pagesArr.find((valueObj) => {
      return valueObj.type === 'top';
    });
    
    const topPageName = lodashGet(topPagesObj, ['name'], '');
    const title = topPageName ? topPageName : `${userName} - Game Users`;
    
    
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
              <title>{title}</title>
            </Head>
            
            
            
            
            {/* 2 Column */}
            <Container>
              
              
              {/* Sidebar */}
              <ColumnSidebar>
                <img
                  src="/static/img/common/advertisement/300x250.jpg"
                  width="300"
                  height="250"
                />
                
                サイドメニュー
              </ColumnSidebar>
              
              
              {/* Main */}
              <ColumnMain>
                
                {/* プレイヤーカード */}
                {componentCardsArr}
                
              </ColumnMain>
              
              
            </Container>
            
            
            
            
            {/* プレイヤーカードを表示するダイアログ */}
            <CardPlayerDialog />
            
            
            
            
            {/* Drawer */}
            <Drawer>
              Drawer
            </Drawer>
            
            
          </Layout>
          
        </IntlProvider>
        
      </Provider>
    );
  }
}

export default withRoot(Component);