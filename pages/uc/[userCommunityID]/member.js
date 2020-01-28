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
import Link from 'next/link';
import { observer, Provider } from 'mobx-react';
import { Element } from 'react-scroll';
import lodashGet from 'lodash/get';
import lodashHas from 'lodash/has';

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
import initStoreUcMember from '../../../app/uc/community/stores/store';
import initStoreCardPlayer from '../../../app/common/card/player/stores/player';
import initStoreForum from '../../../app/common/forum/stores/store';
import initStoreImageAndVideo from '../../../app/common/image-and-video/stores/image-and-video';
import initStoreImageAndVideoForm from '../../../app/common/image-and-video/stores/form';
import initStoreFollow from '../../../app/common/follow/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../../app/common/layout/components/layout';
import Sidebar from '../../../app/common/layout/components/sidebar';
import Drawer from '../../../app/common/layout/components/drawer';
import VideoModal from '../../../app/common/image-and-video/components/video-modal';
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
  
  const storeUcMember = initStoreUcMember({});
  const storeCardPlayer = initStoreCardPlayer({});
  // const storeForum = initStoreForum({ propsObj });
  // const storeImageAndVideo = initStoreImageAndVideo({});
  // const storeImageAndVideoForm = initStoreImageAndVideoForm({});
  const storeFollow = initStoreFollow({});
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return {
    
    storeUcMember,
    storeCardPlayer,
    // storeForum,
    // storeImageAndVideo,
    // storeImageAndVideoForm,
    storeFollow,
    
  };
  
  
};




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/uc/***/member
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
    const userCommunityID = query.userCommunityID;
    const pathname = `/uc/${userCommunityID}/member`;
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      urlApi: encodeURI(`${process.env.URL_API}/v2/uc/${userCommunityID}/member`),
      methodType: 'GET',
      reqHeadersCookie,
      reqAcceptLanguage,
    });
    
    const statusCode = lodashGet(resultObj, ['statusCode'], 400);
    let propsObj = lodashGet(resultObj, ['data'], {});
    
    const userCommunities_id = lodashGet(resultObj, ['data', 'userCommunityObj', '_id'], '');
    const userCommunityName = lodashGet(resultObj, ['data', 'userCommunityObj', 'name'], '');
    // const accessRightRead = lodashGet(resultObj, ['data', 'accessRightRead'], false);
    const author = lodashGet(resultObj, ['data', 'headerObj', 'author'], false);
    
    
    // --------------------------------------------------
    //   Title
    // --------------------------------------------------
    
    const title = `${userCommunityName}: メンバー`;
    
    
    // --------------------------------------------------
    //   Stores
    // --------------------------------------------------
    
    const headerNavMainArr = [
      {
        name: 'トップ',
        href: `/uc/[userCommunityID]?userCommunityID=${userCommunityID}`,
        as: `/uc/${userCommunityID}`,
      },
      {
        name: 'メンバー',
        href: `/uc/[userCommunityID]/member?userCommunityID=${userCommunityID}`,
        as: `/uc/${userCommunityID}/member`,
      }
    ];
    
    if (author) {
      headerNavMainArr.push(
        {
          name: '設定',
          href: `/uc/[userCommunityID]/settings?userCommunityID=${userCommunityID}`,
          as: `/uc/${userCommunityID}/settings`,
        }
      );
    }
    
    propsObj = { ...propsObj, datetimeCurrent, pathname, headerNavMainArr, userCommunities_id };
    
    const storesObj = getOrCreateStore({ propsObj });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /pages/uc/[userCommunityID]/member.js
    `);
    
    console.log(chalk`
      userCommunityID: {green ${userCommunityID}}
      userCommunityName: {green ${userCommunityName}}
      author: {green ${author}}
    `);
    
    // console.log(`
    //   ----- resultObj -----\n
    //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    console.log(`
      ----------------------------------------
    `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return { 
      
      statusCode,
      reqAcceptLanguage,
      userCommunityID,
      userCommunities_id,
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
        this.props.statusCode !== 200 ||
        this.props.userCommunities_id === ''
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
    //   Setting
    // --------------------------------------------------
    
    // const settingAnonymity = lodashGet(this.props, ['propsObj', 'userCommunityObj', 'anonymity'], false);
    // const accessRightRead = lodashGet(this.props, ['propsObj', 'accessRightRead'], false);
    
    
    // --------------------------------------------------
    //   About
    // --------------------------------------------------
    
    // const description = lodashGet(this.props, ['propsObj', 'userCommunityObj', 'description'], '');
    // const communityType = lodashGet(this.props, ['propsObj', 'userCommunityObj', 'communityType'], 'open');
    // const anonymity = lodashGet(this.props, ['propsObj', 'userCommunityObj', 'anonymity'], true);
    // const createdDate = lodashGet(this.props, ['propsObj', 'headerObj', 'createdDate'], '');
    // const approval = lodashGet(this.props, ['propsObj', 'headerObj', 'approval'], false);
    // const membersCount = lodashGet(this.props, ['propsObj', 'headerObj', 'membersCount'], 1);
    // const gamesArr = lodashGet(this.props, ['propsObj', 'headerObj', 'gamesArr'], []);
    
    
    // console.log(`
    //   ----- this.props -----\n
    //   ${util.inspect(this.props, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   createdDate: {green ${createdDate}}
    //   description: {green ${description}}
    //   membersCount: {green ${membersCount}}
    // `);
    
    // console.log(`
    //   ----- gamesArr -----\n
    //   ${util.inspect(gamesArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // console.log(chalk`
    //   this.props.settingAnonymity: {green ${this.props.settingAnonymity}}
    //   this.settingAnonymity: {green ${this.settingAnonymity}}
    //   this.props.userCommunities_id: {green ${this.props.userCommunities_id}}
    // `);
    
    
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
              
              
              {/* フォーラムのナビゲーション */}
              <Sidebar>
                
              </Sidebar>
              
              
            </div>
            
            
            
            
            {/* Main */}
            <div
              css={css`
                width: 100%;
                max-width: 800px;
                
                @media screen and (max-width: 947px) {
                  max-width: none;
                }
              `}
            >
              
              
              {/* About Community */}
              {/*<div
                css={css`
                  ${accessRightRead ? 'margin: 32px 0 0 0' : 'margin: 0 0 0 0'};
                `}
              >
                <Abount
                  pathArr={[this.props.userCommunities_id, 'about']}
                  description={description}
                  createdDate={createdDate}
                  membersCount={membersCount}
                  communityType={communityType}
                  approval={approval}
                  anonymity={anonymity}
                  gamesArr={gamesArr}
                  accessRightRead={accessRightRead}
                />
              </div>*/}
              
              
            </div>
            
            
          </div>
          
          
          
          
          {/* プレイヤーカードを表示するダイアログ */}
          <CardPlayerDialog />
          
          
          
          
          {/* Drawer */}
          <Drawer>
            Drawer
          </Drawer>
          
          
          
          
          <VideoModal />
          
          
          
        </Layout>
        
      </Provider>
    );
    
  }
  
}