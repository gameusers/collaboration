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
import initStoreUcSettings from '../../../app/uc/settings/stores/store';
import initStoreUcCommunity from '../../../app/uc/community/stores/store';
import initStoreGameForm from '../../../app/common/game/stores/form';
import initStoreCardPlayer from '../../../app/common/card/player/stores/player';
import initStoreImageAndVideo from '../../../app/common/image-and-video/stores/image-and-video';
import initStoreImageAndVideoForm from '../../../app/common/image-and-video/stores/form';
import initStoreFollow from '../../../app/common/follow/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../../app/common/layout/components/layout';
import Sidebar from '../../../app/common/layout/components/sidebar';
import Drawer from '../../../app/common/layout/components/drawer';
import FormCommunity from '../../../app/uc/settings/components/form-community';
import VideoModal from '../../../app/common/image-and-video/components/video-modal';
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
  
  const storeUcSettings = initStoreUcSettings({ propsObj });
  const storeUcCommunity = initStoreUcCommunity({});
  const storeGameForm = initStoreGameForm({ propsObj });
  const storeCardPlayer = initStoreCardPlayer({});
  const storeImageAndVideo = initStoreImageAndVideo({});
  const storeImageAndVideoForm = initStoreImageAndVideoForm({ propsObj });
  const storeFollow = initStoreFollow({});
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return {
    
    storeUcSettings,
    storeUcCommunity,
    storeGameForm,
    storeCardPlayer,
    storeImageAndVideo,
    storeImageAndVideoForm,
    storeFollow,
    
  };
  
  
};




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/uc/***/settings
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
    const pathname = `/uc/${userCommunityID}/settings`;
    
    
    
    
    // ---------------------------------------------
    //   FormData
    // ---------------------------------------------
    
    const formDataObj = {
      
      userCommunityID,
      
    };
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      urlApi: encodeURI(`${process.env.NEXT_PUBLIC_URL_API}/v2/uc/${userCommunityID}/settings`),
      methodType: 'POST',
      reqHeadersCookie,
      reqAcceptLanguage,
      formData: JSON.stringify(formDataObj),
    });
    
    const statusCode = lodashGet(resultObj, ['statusCode'], 400);
    let propsObj = lodashGet(resultObj, ['data'], {});
    
    const userCommunities_id = lodashGet(resultObj, ['data', 'userCommunityObj', '_id'], '');
    const name = lodashGet(resultObj, ['data', 'userCommunityObj', 'localesArr', 0, 'name'], '');
    const description = lodashGet(resultObj, ['data', 'userCommunityObj', 'localesArr', 0, 'description'], '');
    const descriptionShort = lodashGet(resultObj, ['data', 'userCommunityObj', 'localesArr', 0, 'descriptionShort'], '');
    const communityType = lodashGet(resultObj, ['data', 'userCommunityObj', 'communityType'], 'open');
    const anonymity = lodashGet(resultObj, ['data', 'userCommunityObj', 'anonymity'], true);
    const approval = lodashGet(resultObj, ['data', 'userCommunityObj', 'followsObj', 'approval'], false);
    const imagesAndVideosObj = lodashGet(resultObj, ['data', 'userCommunityObj', 'imagesAndVideosObj'], {});
    const imagesAndVideosThumbnailObj = lodashGet(resultObj, ['data', 'userCommunityObj', 'imagesAndVideosThumbnailObj'], {});
    const gamesArr = lodashGet(resultObj, ['data', 'userCommunityObj', 'gamesArr'], []);
    
    
    
    
    // --------------------------------------------------
    //   Title
    // --------------------------------------------------
    
    const title = `${name}: 設定`;
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    const pathArr = [userCommunities_id, 'ucSettingsFormCommunity'];
    
    
    
    
    // --------------------------------------------------
    //   Stores
    // --------------------------------------------------
    
    const headerNavMainArr = [
      {
        name: 'トップ',
        href: `/uc/[userCommunityID]/index?userCommunityID=${userCommunityID}`,
        as: `/uc/${userCommunityID}`,
      },
      {
        name: 'メンバー',
        href: `/uc/[userCommunityID]/members?userCommunityID=${userCommunityID}`,
        as: `/uc/${userCommunityID}/members`,
      },
      {
        name: '設定',
        href: `/uc/[userCommunityID]/settings?userCommunityID=${userCommunityID}`,
        as: `/uc/${userCommunityID}/settings`,
      }
    ];
    
    propsObj = { ...propsObj, datetimeCurrent, pathname, headerNavMainArr, pathArr, userCommunities_id, name, description, descriptionShort, userCommunityID, communityType, anonymity, approval, imagesAndVideosObj, imagesAndVideosThumbnailObj, gamesArr };
    
    const storesObj = getOrCreateStore({ propsObj });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // const isServer = !!req;
    
    // console.log(chalk`
    //   login: {green ${login}}
    //   datetimeCurrent: {green ${datetimeCurrent}}
    //   isServer: {green ${isServer}}
    //   userCommunityID: {green ${userCommunityID}}
    //   userCommunityName: {green ${userCommunityName}}
    // `);
    
    // console.log(`
    //   ----- resultObj -----\n
    //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return { 
      
      statusCode,
      reqAcceptLanguage,
      userCommunityID,
      userCommunities_id,
      pathArr,
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
                width: 100%;
                max-width: 800px;
                
                @media screen and (max-width: 947px) {
                  max-width: none;
                }
              `}
            >
              
              
              {/* コミュニティ設定 */}
              <Element
                name="ucSettings"
              >
                <FormCommunity pathArr={this.props.pathArr} />
              </Element>
              
              
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