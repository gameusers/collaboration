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
import { injectIntl } from 'react-intl';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { imageCalculateSize } from '../../../@modules/image';


// ---------------------------------------------
//   Format
// ---------------------------------------------

// const { formatSrcSetArr } = require('../../../@format/image');


// ---------------------------------------------
//   Components
// ---------------------------------------------

import LightboxWrapper from '../../image-and-video/components/lightbox';




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssPreviewBox = css`
  position: relative;
  margin: 0 4px 4px 0;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('storeImageAndVideo')
@observer
export default injectIntl(class extends React.Component {
  
  
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
    
    const { storeImageAndVideo, intl, _id, pathArr, imagesAndVideosObj } = this.props;
    
    const { handleLightboxOpen, handleModalVideoOpen } = storeImageAndVideo;
    
    const type = lodashGet(imagesAndVideosObj, ['type'], '');
    const arr = lodashGet(imagesAndVideosObj, ['arr'], []);
    
    
    // console.log(chalk`
    //   type: {green ${type}}
    // `);
    
    // console.log(`\n---------- arr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(arr)));
    // console.log(`\n-----------------------------------\n`);
    // return null;
    
    
    // --------------------------------------------------
    //   必要なデータがない場合は処理停止
    // --------------------------------------------------
    
    if (!type || arr.length === 0) {
      return null;
    }
    
    
    // --------------------------------------------------
    //   Component - Preview Thumbnail
    // --------------------------------------------------
    
    const componentsThumbnailArr = [];
    let componentFirst = '';
    
    const imagesArr = [];
    let imageIndex = 0;
    
    
    for (const [index, valueObj] of arr.entries()) {
      
      
      // console.log(`
      //   ----- valueObj -----\n
      //   ${util.inspect(valueObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   最初の画像または動画　大きく表示
      // ---------------------------------------------
      
      if (index === 0) {
        
        
        // ---------------------------------------------
        //   画像
        // ---------------------------------------------
        
        if (valueObj.type === 'image') {
          
          
          // ---------------------------------------------
          //   横幅・高さを計算する
          // ---------------------------------------------
          
          const width = valueObj.width;
          const height = valueObj.height;
          
          // const calculatedObj = imageCalculateSize({ width, height, specifiedHeight: 450 });
          // const calculatedObj = imageCalculateSize({ width, height, maxSize: 400 });
          
          
          console.log(chalk`
            width: {green ${width}}
            height: {green ${height}}
          `);
          
          // console.log(`
          //   ----- calculatedObj -----\n
          //   ${util.inspect(JSON.parse(JSON.stringify(calculatedObj)), { colors: true, depth: null })}\n
          //   --------------------\n
          // `);
          
          let cssWidth = '';
          let cssHeight = '';
          
          // if ((width < 800 && height < 800) || height > 400) {
          //   cssWidth = `width: ${calculatedObj.width}px;`;
          //   cssHeight = `height: ${calculatedObj.height}px;`;
          // }
          
          
          componentFirst =
            <div
              css={css`
                width: 100%;
                background-color: black;
              `}
            >
              <img
                css={css`
                  ${cssWidth}
                  ${cssHeight}
                  // width: 100%;
                  // height: 50%;
                  max-width: 100%;
                  max-height: 300px;
                  object-fit: contain;
                  margin: 0 auto;
                `}
                src={valueObj.src}
                srcSet={valueObj.srcSet}
                alt={valueObj.caption}
                onClick={() => handleLightboxOpen({ pathArr, currentNo: 0 })}
                width={width}
                // height={height}
              />
            </div>
          ;
          
          imageIndex += 1;
          imagesArr.push(valueObj);
          
          
        // ---------------------------------------------
        //   動画
        // ---------------------------------------------
        
        } else if (valueObj.type === 'video') {
          
          componentFirst =
            <div
              css={css`
                width: 100%;
                position: relative;
              `}
            >
              
              <img
                css={css`
                  width: 100%;
                `}
                src={`https://img.youtube.com/vi/${valueObj.videoID}/maxresdefault.jpg`}
                srcSet={`https://img.youtube.com/vi/${valueObj.videoID}/mqdefault.jpg 480w,
                         https://img.youtube.com/vi/${valueObj.videoID}/maxresdefault.jpg 640w`}
              />
              
              <div
                css={css`
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  position: absolute;
                  top: 0;
                `}
                onClick={() => handleModalVideoOpen({ videoChannel: valueObj.videoChannel, videoID: valueObj.videoID })}
              >
                <div
                  css={css`
                    font-size: 72px;
                  	position: relative;
                  	width: 1.4em;
                  	height: 1.4em;
                  	border: 0.1em solid white;
                  	border-radius: 100%;
                  	
                  	transition: 0.5s;
                  	&:hover {
                  	  opacity: 0.7;
                  	}
                  	
                    @media screen and (max-width: 480px) {
                      font-size: 36px;
                    }
                  	
                    &:before {
                      content: "";
                    	position: absolute;
                    	top: 0.3em;
                    	left: 0.5em;
                    	width: 0;
                    	height: 0;
                    	border-top: 0.4em solid transparent;
                    	border-left: 0.6em solid white;
                    	border-bottom: 0.4em solid transparent;
                    }
                  `}
                />
              </div>
              
            </div>
          ;
          
        }
        
        
      // ---------------------------------------------
      //   2番目以降の画像または動画　サムネイルで表示
      // ---------------------------------------------
        
      } else {
        
        
        // ---------------------------------------------
        //   画像
        // ---------------------------------------------
        
        if (valueObj.type === 'image') {
          
          // Lightboxで開く画像Noを設定する
          const currentNo = imageIndex;
          
          const src = valueObj.src;
          const width = valueObj.width;
          const height = valueObj.height;
          
          
          // ---------------------------------------------
          //   横幅・高さを計算する
          // ---------------------------------------------
          
          const calculatedObj = imageCalculateSize({ width, height, specifiedHeight: 108 });
          
          // console.log(`
          //   ----- calculatedObj -----\n
          //   ${util.inspect(calculatedObj, { colors: true, depth: null })}\n
          //   --------------------\n
          // `);
          
          // console.log(chalk`
          //   src: {green ${src}}
          //   width: {green ${width}}
          //   height: {green ${height}}
          // `);
          
          
          // ---------------------------------------------
          //   普通の画像
          // ---------------------------------------------
          
          if (src.indexOf('data:image/svg') === -1) {
            
            componentsThumbnailArr.push(
              <div css={cssPreviewBox} key={index}>
                
                <img
                  css={css`
                    min-height: 108px;
                    max-height: 108px;
                    
                    @media screen and (max-width: 480px) {
                      min-height: 68px;
                      max-height: 68px;
                    }
                  `}
                  src={src}
                  onClick={() => handleLightboxOpen({ pathArr, currentNo })}
                />
                
              </div>
            );
            
            
          // ---------------------------------------------
          //   SVG
          // ---------------------------------------------
            
          } else {
            
            componentsThumbnailArr.push(
              <div css={cssPreviewBox} key={index}>
                
                <div
                  css={css`
                    background-repeat: no-repeat;
                    background-position: center center;
                    
                    max-width: 108px;
                    max-height: 108px;
                    width: ${calculatedObj.width}px;
                    height: ${calculatedObj.height}px;
                    background-image: url(${src});
                    
                    @media screen and (max-width: 480px) {
                      max-width: 68px;
                      max-height: 68px;
                    }
                  `}
                  onClick={() => handleLightboxOpen({ pathArr, currentNo })}
                />
                
              </div>
            );
            
          }
          
          imageIndex += 1;
          imagesArr.push(valueObj);
          
          
        // ---------------------------------------------
        //   動画
        // ---------------------------------------------
        
        } else if (valueObj.type === 'video') {
          
          componentsThumbnailArr.push(
            <div css={cssPreviewBox} key={index}>
              
              <div
                css={css`
                  width: 192px;
                  height: 108px;
                  position: relative;
                  
                  @media screen and (max-width: 480px) {
                    width: 120px;
                    height: 68px;
                  }
                `}
              >
                
                <img
                  css={css`
                    width: 100%;
                  `}
                  src={`https://img.youtube.com/vi/${valueObj.videoID}/mqdefault.jpg`}
                />
                
                <div
                  css={css`
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    top: 0;
                    // background-color: pink;
                    // opacity: 0.5;
                  `}
                  onClick={() => handleModalVideoOpen({ videoChannel: valueObj.videoChannel, videoID: valueObj.videoID })}
                >
                  <div
                    css={css`
                      font-size: 24px;
                    	position: relative;
                    	width: 1.4em;
                    	height: 1.4em;
                    	border: 0.1em solid white;
                    	border-radius: 100%;
                    	
                    	transition: 0.5s;
                    	&:hover {
                    	  opacity: 0.7;
                    	}
                    	
                      @media screen and (max-width: 480px) {
                        font-size: 18px;
                      }
                    	
                      &:before {
                        content: "";
                      	position: absolute;
                      	top: 0.3em;
                      	left: 0.5em;
                      	width: 0;
                      	height: 0;
                      	border-top: 0.4em solid transparent;
                      	border-left: 0.6em solid white;
                      	border-bottom: 0.4em solid transparent;
                      }
                    `}
                  />
                </div>
                
              </div>
              
            </div>
          );
          
          
        }
        
        
      }
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`\n---------- imagesAndVideosArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(imagesAndVideosArr)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
        {/* Big Image */}
        {componentFirst}
        
        
        {/* Preview */}
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            margin: 10px 0 0 0;
          `}
        >
          {componentsThumbnailArr}
        </div>
        
        
        {/* Lightbox */}
        <LightboxWrapper
          pathArr={pathArr}
          imagesArr={imagesArr}
        />
        
        
      </React.Fragment>
    );
    
  }
  
});