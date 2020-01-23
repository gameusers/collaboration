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

import DataGc from './data-gc';
import DataUc from './data-uc';




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
    
    // const login = lodashGet(stores, ['data', 'login'], false);
    
    const type = lodashGet(stores, ['data', 'headerObj', 'type'], 'gc');
    const imagesAndVideosObj = lodashGet(stores, ['data', 'headerObj', 'imagesAndVideosObj'], {});
    
    const thumbnailArr = lodashGet(stores, ['data', 'headerObj', 'imagesAndVideosObj', 'thumbnailArr'], []);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   type: {green ${type}}
    //   stores.data.getLogin(): {green ${stores.data.getLogin()}}
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Hero Image あり
    // --------------------------------------------------
    
    let code = '';
    
    if (Object.keys(imagesAndVideosObj).length !== 0) {
      
      const name = lodashGet(stores, ['data', 'headerObj', 'name'], '');
      
      const src = lodashGet(imagesAndVideosObj, ['arr', 0, 'src'], '');
      const srcSet = lodashGet(imagesAndVideosObj, ['arr', 0, 'srcSet'], '');
      const width = lodashGet(imagesAndVideosObj, ['arr', 0, 'width'], 256);
      
      
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
              min-height: 220px;
              max-width: 100%;
              max-height: 640px;
              object-fit: cover;
              margin: 0 auto;
            `}
            src={src}
            srcSet={srcSet}
            alt={name}
            width={width}
          />
          
          {type === 'gc' ? (
            <DataGc heroImage={true} />
          ) : (
            <DataUc />
          )}
          
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
          
          <DataGc heroImage={false} />
          
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