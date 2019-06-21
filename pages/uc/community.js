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
import initStoreForum from '../../app/common/forum/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../app/common/layout/components/layout';
import Drawer from '../../app/common/layout/components/drawer';
import ForumNavigation from '../../app/common/forum/components/navigation';
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
    
    // console.log(chalk`
    //   getInitialProps
    //   userCommunityID: {green ${userCommunityID}}
    // `);
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      urlApi: encodeURI(`${process.env.URL_API}/v1/initial-props/uc/community/?userCommunityID=${userCommunityID}`),
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
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return { pathname, initialPropsObj, statusCode, reqAcceptLanguage, userCommunityID, userCommunities_id: 'cxO8tEGty' };
    
    
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
      
      this.storeForum = initStoreForum({});
      
      
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
      //   Update Data - Forum
      // --------------------------------------------------
      
      this.storeForum.handleEdit({
        pathArr: [props.userCommunities_id, 'forumThreadsArr'],
        value: props.initialPropsObj.forumThreadsArr,
      });
      
      // console.log(`
      //   ----- props.initialPropsObj.forumThreadsArr -----\n
      //   ${util.inspect(props.initialPropsObj.forumThreadsArr, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
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
        storeForum={this.storeForum}
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
              // width: 100%;
              margin: 0 auto;
              padding: 16px;
              
              @media screen and (max-width: 947px) {//989px　947px
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
              
              
              <div style={{ marginTop: '14px' }}></div>
              
              
              <ForumNavigation
                _id={this.props.userCommunities_id}
                sidebar={true}
              />
              
            </div>
            
            
            {/* Main */}
            <div
              css={css`
                width: 100%;
                // overflow-x: auto;
                // max-width: 800px;
                // margin: 0;
                // padding: 0;
              `}
            >
              
              
              <ForumNavigation _id={this.props.userCommunities_id} />
              
              
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