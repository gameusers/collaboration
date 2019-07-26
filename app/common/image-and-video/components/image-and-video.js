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

const { formatSrcSetArr } = require('../../../@format/image');


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
    
    const { storeImageAndVideo, intl, _id, imagesAndVideosArr } = this.props;
    
    const { handleLightboxOpen, handleModalVideoOpen } = storeImageAndVideo;
    
    // const imagesAndVideosArr = lodashGet(imagesAndVideosObj, [arrayName], []);
    
    // console.log(`\n---------- imagesAndVideosArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(imagesAndVideosArr)));
    // console.log(`\n-----------------------------------\n`);
    // return null;
    
    
    // --------------------------------------------------
    //   配列が空の場合は、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (imagesAndVideosArr.length === 0) {
      return null;
    }
    
    
    // --------------------------------------------------
    //   Component - Preview Thumbnail Image & Video
    // --------------------------------------------------
    
    const componentsThumbnailArr = [];
    let componentFirst = '';
    const imagesArr = [];
    // let bigImageSrc = '';
    
    let imageIndex = 0;
    
    for (const [index, valueObj] of imagesAndVideosArr.entries()) {
      
      
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
            
          const srcSetArr = lodashGet(valueObj, ['srcSetArr'], []);
          
          const formattedObj = formatSrcSetArr({ arr: srcSetArr });
          
          // const srcSetLastObj = lodashGet(srcSetArr, [srcSetArr.length - 1], []);
          // bigImageSrc = lodashGet(srcSetLastObj, ['src'], '');
          // const srcSetArr = lodashGet(srcSetLastObj, ['srcSetArr'], []);
          // const srcSetArr = lodashGet(srcSetLastObj, ['srcSetArr'], []);
          
          // console.log(`
          //   ----- srcSetArr -----\n
          //   ${util.inspect(srcSetArr, { colors: true, depth: null })}\n
          //   --------------------\n
          // `);
          
          componentFirst =
            <img
              srcSet={lodashGet(formattedObj, ['srcSet'], '')}
              src={lodashGet(formattedObj, ['src'], '')}
              onClick={() => handleLightboxOpen({ _id, currentNo: 0 })}
              width="100%"
            />
          ;
          
          // console.log(`
          //   ----- formattedObj -----\n
          //   ${util.inspect(JSON.parse(JSON.stringify(formattedObj)), { colors: true, depth: null })}\n
          //   --------------------\n
          // `);
          
          // console.log(`
          //   ----- srcSetLastObj -----\n
          //   ${util.inspect(JSON.parse(JSON.stringify(srcSetLastObj)), { colors: true, depth: null })}\n
          //   --------------------\n
          // `);
          
          
          imageIndex += 1;
          imagesArr.push(valueObj);
          
          
        // ---------------------------------------------
        //   動画
        // ---------------------------------------------
        
        } else if (valueObj.type === 'video') {
          
          
          
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
          
          const src = lodashGet(valueObj, ['srcSetArr', 0, 'src'], '');
          const width = lodashGet(valueObj, ['srcSetArr', 0, 'width'], 0);
          const height = lodashGet(valueObj, ['srcSetArr', 0, 'height'], 0);
          
          
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
                      min-height: 54px;
                      max-height: 54px;
                    }
                  `}
                  src={src}
                  onClick={() => handleLightboxOpen({ _id, currentNo })}
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
                      max-width: 54px;
                      max-height: 54px;
                    }
                  `}
                  onClick={() => handleLightboxOpen({ _id, currentNo })}
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
                  background-image: url(https://img.youtube.com/vi/${valueObj.videoID}/mqdefault.jpg);
                  background-size: 192px 108px;
                  position: relative;
                  
                  @media screen and (max-width: 480px) {
                    width: 96px;
                    height: 54px;
                    background-size: 96px 54px;
                  }
                `}
              />
              
              <img
                css={css`
                  width: 192px;
                  height: 108px;
                  position: absolute;
                  top: 0;
                  
                  @media screen and (max-width: 480px) {
                    width: 96px;
                    height: 54px;
                  }
                `}
                src="/static/img/common/video-play-button.png"
                onClick={() => handleModalVideoOpen({ videoChannel: valueObj.videoChannel, videoID: valueObj.videoID })}
              />
              
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
          _id={_id}
          imagesAndVideosArr={imagesArr}
        />
        
        
      </React.Fragment>
    );
    
  }
  
});