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
import { inject, observer } from 'mobx-react';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Data from './data';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    super(props);
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores } = this.props;
    
    
    // --------------------------------------------------
    //   Data
    // --------------------------------------------------
    
    const headerDataOpen = lodashGet(stores, ['layout', 'headerDataOpen'], false);
    const imagesAndVideosObj = lodashGet(stores, ['data', 'headerObj', 'imagesAndVideosObj'], {});
    const thumbnailArr = lodashGet(stores, ['data', 'headerObj', 'imagesAndVideosObj', 'thumbnailArr'], []);
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   headerDataOpen: {green ${headerDataOpen}}
    // `);
    
    console.log(`
      ----- imagesAndVideosObj -----\n
      ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    
    // --------------------------------------------------
    //   Hero Image あり
    // --------------------------------------------------
    
    let code = '';
    
    if (Object.keys(imagesAndVideosObj).length !== 0) {
      
      // const imageObj = mainArr[0];
      // const _id = lodashGet(imagesAndVideosObj, ['_id'], '');
      // const type = lodashGet(imagesAndVideosObj, ['type'], '');
      
      // const srcSetArr = lodashGet(imagesAndVideosObj, ['arr', 'srcSetArr'], []).slice().reverse();
      
      // let backgroundUrl = '';
      // let paddingTop = '56.25';
      // let mediaQueries = '';
      
      
      // for (const [index, valueObj] of srcSetArr.entries()) {
        
      //   const src = valueObj.src;
        
        
      //   // 一番大きい画像のデータを取得する
      //   if (index === 0) {
          
      //     backgroundUrl = src;
          
      //     // padding-top（例：56.25%）は画像の高さ ÷ 画像の幅 × 100
      //     paddingTop = Math.floor(valueObj.height / valueObj.width * 100);
          
      //     continue;
          
      //   }
        
        
      //   if (valueObj.w === '800w') {
      //     mediaQueries += `
      //       @media screen and (max-width: 800px) {
      //         background: no-repeat center center url(${src});
      //         padding-top: ${paddingTop}%;
      //       }
      //     `;
      //   } else if (valueObj.w === '640w') {
      //     mediaQueries += `
      //       @media screen and (max-width: 640px) {
      //         background: no-repeat center center url(${src})
      //         padding-top: ${paddingTop}%;
      //       }
      //     `;
      //   } else if (valueObj.w === '480w') {
      //     mediaQueries += `
      //       @media screen and (max-width: 480px) {
      //         background: no-repeat center center url(${src});
      //         padding-top: ${headerDataOpen ? '10px' : 'auto'};
      //         padding-bottom: ${headerDataOpen ? '10px' : 'auto'};
      //         // padding-top: ${headerDataOpen ? 0 : 'auto'};
      //       }
      //     `;
      //   }
        
      // }
      
      
      // code = 
      //   <div
      //     css={css`
      //       width: 100%;
      //       background: no-repeat center center url(${backgroundUrl});
      //       background-size: cover;
      //       background-color: #25283D;
      //       position: relative;
      //       padding-top: ${paddingTop > 56.25 ? 56.25 : paddingTop}%;
            
      //       ${mediaQueries}
      //     `}
      //   >
      //     <Data heroImage={true} />
      //   </div>
      // ;
      
      
      const name = lodashGet(stores, ['data', 'headerObj', 'name'], '');
      
      const src = lodashGet(imagesAndVideosObj, ['arr', 0, 'src'], '');
      const srcSet = lodashGet(imagesAndVideosObj, ['arr', 0, 'srcSet'], '');
      const width = lodashGet(imagesAndVideosObj, ['arr', 0, 'width'], 256);
      const height = lodashGet(imagesAndVideosObj, ['arr', 0, 'height'], 256);
      
      
      code = 
        <div
          css={css`
            width: 100%;
            background-color: black;
            position: relative;
          `}
        >
          
          <img
            css={css`
              // width: 100%;
              // height: 50%;
              min-height: 220px;
              max-width: 100%;
              max-height: 1080px;
              object-fit: cover;
              margin: 0 auto;
            `}
            src={src}
            srcSet={srcSet}
            alt={name}
            width={width}
            // height={height}
          />
          
          <Data heroImage={true} />
          
        </div>
      ;
      
      
      
      
    // --------------------------------------------------
    //   Hero Image がない場合、サムネイルを表示する
    // --------------------------------------------------
    
    } else {
      
      const thumbnailSrc = lodashGet(thumbnailArr.slice(), [0, 'srcSetArr', 0, 'src'], '');
      const imgSrc = thumbnailSrc ? thumbnailSrc : '/static/img/common/thumbnail/none-game.jpg';
      
      code = 
        <div
          css={css`
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: flex-start;
            background: no-repeat center center url('/static/img/common/header/header-back.jpg');
            background-size: cover;
            background-color: #25283D;
            padding: 15px;
          `}
        >
          <img
            css={css`
              width: 128px;
              border-radius: 8px;
              box-shadow: 4px 4px 10px #383838;
              margin: 0 15px 0 0;
              
              @media screen and (max-width: 480px) {
                width: 96px;
              }
              
              @media screen and (max-width: 320px) {
                width: 64px;
              }
            `}
            src={imgSrc}
          />
          <Data heroImage={false} />
        </div>
      ;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        {code}
      </React.Fragment>
    );
    
    
  }
  
};