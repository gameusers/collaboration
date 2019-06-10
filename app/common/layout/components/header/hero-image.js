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
    const mainArr = lodashGet(stores, ['data', 'headerObj', 'imagesAndVideosObj', 'mainArr'], []);
    const thumbnailArr = lodashGet(stores, ['data', 'headerObj', 'imagesAndVideosObj', 'thumbnailArr'], []);
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   headerDataOpen: {green ${headerDataOpen}}
    //   name: {green ${name}}
    //   hardware: {green ${hardware}}
    // `);
    
    // console.log(`\n---------- mainArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(mainArr)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(`
    //   ----- hardwareSortedArr -----\n
    //   ${util.inspect(hardwareSortedArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    // --------------------------------------------------
    //   Hero Image あり
    // --------------------------------------------------
    
    let code = '';
    
    if (mainArr.length > 0) {
      
      const imageObj = mainArr[0];
      
      const srcSetArr = lodashGet(imageObj, ['srcSetArr'], []).slice().reverse();
      
      let backgroundUrl = '';
      let paddingTop = '56.25';
      let mediaQueries = '';
      
      
      for (const [index, valueObj] of srcSetArr.entries()) {
        
        if (index === 0) {
          backgroundUrl = valueObj.src;
          
          // padding-top（例：56.25%）は画像の高さ ÷ 画像の幅 × 100
          paddingTop = Math.floor(valueObj.height / valueObj.width * 100);
        }
        
        if (valueObj.w === '800w') {
          mediaQueries += `
            @media screen and (max-width: 800px) {
              background: no-repeat center center url(${valueObj.src});
              padding-top: ${paddingTop}%;
            }
          `;
        } else if (valueObj.w === '640w') {
          mediaQueries += `
            @media screen and (max-width: 640px) {
              background: no-repeat center center url(${valueObj.src})
              padding-top: ${paddingTop}%;
            }
          `;
        } else if (valueObj.w === '480w') {
          mediaQueries += `
            @media screen and (max-width: 480px) {
              background: no-repeat center center url(${valueObj.src});
              padding-top: ${headerDataOpen ? '10px' : 'auto'};
              padding-bottom: ${headerDataOpen ? '10px' : 'auto'};
              // padding-top: ${headerDataOpen ? 0 : 'auto'};
            }
          `;
        }
        
      }
      
      
      code = 
        <div
          css={css`
            width: 100%;
            background: no-repeat center center url(${backgroundUrl});
            background-size: cover;
            background-color: #25283D;
            position: relative;
            padding-top: ${paddingTop > 56.25 ? 56.25 : paddingTop}%;
            
            ${mediaQueries}
          `}
        >
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