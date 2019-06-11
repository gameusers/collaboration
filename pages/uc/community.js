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
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../app/@modules/fetch';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreRoot from '../../app/@stores/root';
// import initStoreCardPlayer from '../../app/common/card/player/stores/player';
// import initStorePlPlayer from '../../app/pl/player/stores/store';
// import initStoreIDForm from '../../app/common/id/stores/form';
// import initStoreGameForm from '../../app/common/game/stores/form';
// import initStoreImageAndVideo from '../../app/common/image-and-video/stores/image-and-video';
// import initStoreImageAndVideoForm from '../../app/common/image-and-video/stores/form';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../app/common/layout/components/layout';
import Drawer from '../../app/common/layout/components/drawer';
import BBSNavigation from '../../app/common/bbs/components/navigation';
// import CardPlayerDialog from '../../app/common/card/player/components/dialog';




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/uc/***
// --------------------------------------------------

@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  static async getInitialProps({ req, res, query }) {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const reqHeadersCookie = lodashGet(req, ['headers', 'cookie'], '');
    const reqAcceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
    const userCommunityID = query.userCommunityID;
    const pathname = `/uc/${userCommunityID}`;
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    // const resultObj = await fetchWrapper({
    //   urlApi: encodeURI(`${process.env.URL_API}/v1/initial-props/pl/player/?playerID=${playerID}`),
    //   methodType: 'GET',
    //   reqHeadersCookie,
    //   reqAcceptLanguage,
    // });
    
    // const statusCode = resultObj.statusCode;
    // const initialPropsObj = resultObj.data;
    
    // console.log(chalk`
    //   isServer: {green ${isServer}}
    //   pathname: {green ${pathname}}
    // `);
    
    // console.log(`
    //   ----- resultObj -----\n
    //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return { pathname, reqAcceptLanguage, userCommunityID };
    // return { pathname, initialPropsObj, statusCode, reqAcceptLanguage, userCommunityID };
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   Property / Error Flag
    // --------------------------------------------------
    
    this.error = false;
    
    
    try {
      
      
      // --------------------------------------------------
      //   Error
      // --------------------------------------------------
      
      // if (
      //   this.props.statusCode !== 200 ||
      //   'cardPlayersObj' in props.initialPropsObj === false ||
      //   'cardsArr' in props.initialPropsObj === false
      // ) {
      //   throw new Error();
      // }
      
      
      // --------------------------------------------------
      //   Store
      // --------------------------------------------------
      
      const stores = initStoreRoot({});
      
      // this.storePlPlayer = initStorePlPlayer({});
      // this.storeCardPlayer = initStoreCardPlayer({});
      // this.storeIDForm = initStoreIDForm({});
      // this.storeGameForm = initStoreGameForm({});
      // this.storeImageAndVideo = initStoreImageAndVideo({});
      // this.storeImageAndVideoForm = initStoreImageAndVideoForm({});
      
      
      // --------------------------------------------------
      //   Update Data - Pathname
      // --------------------------------------------------
      
      stores.layout.replacePathname(props.pathname);
      
      
      // --------------------------------------------------
      //   Update Data - Header Navigation Main
      // --------------------------------------------------
      
      const headerNavMainArr = [
        {
          name: 'トップ',
          href: `/uc/community?userCommunityID=${props.userCommunityID}`,
          as: `/uc/${props.userCommunityID}`,
        },
        {
          name: '設定',
          href: `/uc/settings?userCommunityID=${props.userCommunityID}`,
          as: `/uc/${props.userCommunityID}/settings`,
        }
      ];
      
      stores.layout.replaceHeaderNavMainArr(headerNavMainArr);
      
      
      // --------------------------------------------------
      //   Update Data - Card Players
      // --------------------------------------------------
      
      // stores.data.replaceCardPlayersObj(props.initialPropsObj.cardPlayersObj);
      
      
      // --------------------------------------------------
      //   Update Data - Pages Array
      // --------------------------------------------------
      
      // this.storePlPlayer.replacePagesArr(props.initialPropsObj.pagesArr);
      
      
    } catch (e) {
      // console.log(e.message);
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
    //   Player Card
    // --------------------------------------------------
    
    let userName = '';
    
    const componentCardsArr = [];
    
    // for (const [index, valueObj] of this.props.initialPropsObj.cardsArr.entries()) {
      
    //   if ('cardPlayers_id' in valueObj) {
        
    //     const cardPlayers_id = lodashGet(valueObj, ['cardPlayers_id'], '');
    //     userName = lodashGet(stores, ['data', 'cardPlayersObj', cardPlayers_id, 'nameObj', 'value'], '');
        
    //     componentCardsArr.push(
    //       <CardPlayer
    //         _id={valueObj.cardPlayers_id}
    //         showFollow={true}
    //         key={index}
    //       />
    //     );
        
    //   }
      
    // }
    
    
    // --------------------------------------------------
    //   Header Title
    // --------------------------------------------------
    
    // const topPagesObj = this.storePlPlayer.pagesArr.find((valueObj) => {
    //   return valueObj.type === 'top';
    // });
    
    // const topPageName = lodashGet(topPagesObj, ['name'], '');
    // const title = topPageName ? topPageName : `${userName} - Game Users`;
    
    const title = 'ユーザーコミュニティ';
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider
        storePlPlayer={this.storePlPlayer}
        storeCardPlayer={this.storeCardPlayer}
        storeIDForm={this.storeIDForm}
        storeGameForm={this.storeGameForm}
        storeImageAndVideo={this.storeImageAndVideo}
        storeImageAndVideoForm={this.storeImageAndVideoForm}
      >
        
        <Layout>
          
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>{title}</title>
          </Head>
          
          
          
          {/* 2 Column */}
          <div
            css={css`
              display: flex;
              flex-flow: row nowrap;
              justify-content: center;
              margin: 0 auto;
              padding: 16px;
              
              @media screen and (max-width: 947px) {
                padding: 10px 0 10px 0;
              }
            `}
          >
            
            
            {/* Sidebar */}
            <div
              css={css`
                width: 300px;
                margin: 0 16px 0 0;
                padding: 0;
                
                @media screen and (max-width: 947px) {
                  display: none;
                }
              `}
            >
              <img
                src="/static/img/common/advertisement/300x250.jpg"
                width="300"
                height="250"
              />
              
              Sidebar
            </div>
            
            
            {/* Main */}
            <div
              css={css`
                max-width: 800px;
                margin: 0;
                padding: 0;
              `}
            >
              
              
              <BBSNavigation />
              
              
              {/* プレイヤーカード */}
              {componentCardsArr}
              
              
            </div>
            
            
          </div>
          
          
          
          
          {/* プレイヤーカードを表示するダイアログ */}
          {/*<CardPlayerDialog />*/}
          
          
          
          
          {/* Drawer */}
          <Drawer>
            Drawer
          </Drawer>
          
          
          
          
        </Layout>
        
      </Provider>
    );
    
  }
  
}