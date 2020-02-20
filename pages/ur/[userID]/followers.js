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
import { Element } from 'react-scroll';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../app/@modules/fetch';
import { createCsrfToken } from '../../../app/@modules/csrf';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreRoot from '../../../app/@stores/root';
import initStoreUrUser from '../../../app/ur/user/stores/store';
import initStoreCardPlayer from '../../../app/common/card/player/stores/player';
import initStoreIDForm from '../../../app/common/id/stores/form';
import initStoreGameForm from '../../../app/common/game/stores/form';
import initStoreImageAndVideo from '../../../app/common/image-and-video/stores/image-and-video';
import initStoreImageAndVideoForm from '../../../app/common/image-and-video/stores/form';
import initStoreFollow from '../../../app/common/follow/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../../app/common/layout/components/layout';
import Sidebar from '../../../app/common/layout/components/sidebar';
import Drawer from '../../../app/common/layout/components/drawer';
import CardPlayer from '../../../app/common/card/player/components/player';
import CardPlayerDialog from '../../../app/common/card/player/components/dialog';




/**
 * ストアを読み込む、または作成する
 * @param {Object} propsObj - ストアに入れる値
 */
const getOrCreateStore = ({ propsObj }) => {
  
  
  // --------------------------------------------------
  //   Stores
  // --------------------------------------------------
  
  initStoreRoot({ propsObj });
  
  const storeUrUser = initStoreUrUser({ propsObj });
  const storeCardPlayer = initStoreCardPlayer({});
  const storeIDForm = initStoreIDForm({});
  const storeGameForm = initStoreGameForm({});
  const storeImageAndVideo = initStoreImageAndVideo({});
  const storeImageAndVideoForm = initStoreImageAndVideoForm({});
  const storeFollow = initStoreFollow({});
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return {
    
    storeUrUser,
    storeCardPlayer,
    storeIDForm,
    storeGameForm,
    storeImageAndVideo,
    storeImageAndVideoForm,
    storeFollow,
    
  };
  
  
};




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/ur/***/followers
// --------------------------------------------------

@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  static async getInitialProps({ req, res, query, datetimeCurrent }) {
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    createCsrfToken(req, res);
    
    
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const reqHeadersCookie = lodashGet(req, ['headers', 'cookie'], '');
    const reqAcceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
    const userID = query.userID;
    const pathname = `/ur/${userID}/followers`;
    
    
    // --------------------------------------------------
    //   Get Cookie & Temporary Data for Fetch
    // --------------------------------------------------
    
    const stores = initStoreRoot({});
    
    const page = stores.data.getTemporaryData({ pathname, key: 'followersPage' });
    const limit = stores.data.getCookie({ key: 'followersLimit' });
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      urlApi: encodeURI(`${process.env.URL_API}/v2/ur/${userID}/followers?page=${page}&limit=${limit}`),
      methodType: 'GET',
      reqHeadersCookie,
      reqAcceptLanguage,
    });
    
    const statusCode = lodashGet(resultObj, ['statusCode'], 400);
    let propsObj = lodashGet(resultObj, ['data'], {});
    
    const cardPlayersObj = lodashGet(resultObj, ['data', 'cardPlayersObj'], {});
    const pagesObj = lodashGet(resultObj, ['data', 'pagesObj'], []);
    const accessLevel = lodashGet(resultObj, ['data', 'accessLevel'], 1);
    
    
    
    
    // --------------------------------------------------
    //   Title
    // --------------------------------------------------
    
    const title = `フォロワー`;
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    // const pathArr = [loginUsers_id, 'urFollowers'];
    
    
    
    
    // --------------------------------------------------
    //   Stores
    // --------------------------------------------------
    
    const headerNavMainArr = [
      {
        name: 'トップ',
        href: `/ur/[userID]?userID=${userID}`,
        as: `/ur/${userID}`,
      },
      {
        name: 'フォロワー',
        href: `/ur/[userID]/followers?userID=${userID}`,
        as: `/ur/${userID}/followers`,
      },
    ];
    
    if (accessLevel >= 50) {
      
      headerNavMainArr.push(
        {
          name: '設定',
          href: `/ur/[userID]/settings?userID=${userID}`,
          as: `/ur/${userID}/settings`,
        }
      );
      
    }
    
    propsObj = { ...propsObj, datetimeCurrent, pathname, headerNavMainArr, cardPlayersObj, pagesObj };
    
    const storesObj = getOrCreateStore({ propsObj });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/ur/[userID]/index.js
    // `);
    
    // console.log(`
    //   ----- resultObj -----\n
    //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   userID: {green ${userID}}
    //   accessLevel: {green ${accessLevel} / ${typeof accessLevel}}
    //   accessLevel => 50: {green ${accessLevel >= 50}}
    // `);
    
    // console.log(`
    //   ----------------------------------------
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return { 
      
      statusCode,
      reqAcceptLanguage,
      title,
      storesObj,
      propsObj,
      
    };
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    
    // --------------------------------------------------
    //   super
    // --------------------------------------------------
    
    super(props);
    
    
    // --------------------------------------------------
    //   Property / Error Flag
    // --------------------------------------------------
    
    this.error = false;
    
    
    try {
      
      
      // --------------------------------------------------
      //   Error
      // --------------------------------------------------
      
      if (
        this.props.statusCode !== 200
        // 'cardPlayersObj' in props.propsObj === false ||
        // 'cardsArr' in props.propsObj === false
      ) {
        throw new Error();
      }
      
      
      // --------------------------------------------------
      //   Stores
      // --------------------------------------------------
      
      const isServer = !process.browser;
      
      if (isServer) {
        this.storesObj = props.storesObj;
      } else {
        this.storesObj = getOrCreateStore({ propsObj: props.propsObj });
      }
      
      
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
    
    // const cardsArr = lodashGet(this.props, ['propsObj', 'cardsArr'], []);
    
    // console.log(`
    //   ----- cardsArr -----\n
    //   ${util.inspect(cardsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Player Card
    // --------------------------------------------------
    
    // let userName = '';
    
    // const componentCardsArr = [];
    
    // for (const [index, valueObj] of cardsArr.entries()) {
      
    //   if ('cardPlayers_id' in valueObj) {
        
    //     const cardPlayers_id = lodashGet(valueObj, ['cardPlayers_id'], '');
    //     userName = lodashGet(this.props, ['propsObj', 'cardPlayersObj', cardPlayers_id, 'nameObj', 'value'], '');
    //     // userName = lodashGet(stores, ['data', 'cardPlayersObj', cardPlayers_id, 'nameObj', 'value'], '');
    //     // console.log(userName);
        
    //     componentCardsArr.push(
    //       <CardPlayer
    //         cardPlayers_id={valueObj.cardPlayers_id}
    //         showFollow={true}
    //         showEditButton={true}
    //         key={index}
    //       />
    //     );
        
    //   }
      
    // }
    
    
    
    
    // // --------------------------------------------------
    // //   Header Title
    // // --------------------------------------------------
    
    // const pagesArr = lodashGet(this.props, ['propsObj', 'pagesObj', 'arr'], []);
    
    // const topPagesObj = pagesArr.find((valueObj) => {
    //   return valueObj.type === 'top';
    // });
    
    // const topPageName = lodashGet(topPagesObj, ['name'], '');
    // const title = topPageName ? topPageName : `${userName} - Game Users`;
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider { ...this.storesObj }>
        
        <Layout>
          
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>{this.props.title}</title>
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
                display: flex;
                flex-flow: column nowrap;
                padding: 10px 0 10px 0;
              }
            `}
          >
            
            
            {/* Sidebar */}
            <div
              css={css`
                width: 300px;
                margin: 0 16px 0 0;
                
                @media screen and (max-width: 947px) {
                  width: auto;
                  margin: 0 0 16px 0;
                }
              `}
            >
              
              
              <Sidebar>
                <img
                  src="/img/common/advertisement/300x250.jpg"
                  width="300"
                  height="250"
                />
              </Sidebar>
              
              
              Sidebar
              
            </div>
            
            
            
            
            {/* Main */}
            <div
              css={css`
                max-width: 800px;
                
                @media screen and (max-width: 947px) {
                  max-width: none;
                }
              `}
            >
              
              
              {/* プレイヤーカード */}
              <Element
                name="cardPlayer"
              >
                
              </Element>
              
              
            </div>
            
            
          </div>
          
          
          
          
          {/* プレイヤーカードを表示するダイアログ */}
          <CardPlayerDialog />
          
          
          
          
          {/* Drawer */}
          <Drawer>
            Drawer
          </Drawer>
          
          
          
          
        </Layout>
        
      </Provider>
    );
    
  }
  
}