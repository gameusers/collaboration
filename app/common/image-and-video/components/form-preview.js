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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconClose from '@material-ui/icons/Close';


// ---------------------------------------------
//   Material UI / Colors
// ---------------------------------------------

import cyan from '@material-ui/core/colors/cyan';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { imageCalculateSize } from 'app/@modules/image/calculate.js';
import { formatImagesAndVideosObj } from 'app/@database/images-and-videos/format.js';




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssPreviewBox = css`
  position: relative;
  margin: 10px 12px 10px 0;
`;

const cssPreviewRemoveFab = css`
  && {
    background-color: ${cyan[500]};
    
    &:hover {
      background-color: ${cyan[700]};
    }
    
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 2;
  }
`;






// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeImageAndVideo', 'storeImageAndVideoForm')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const {
      
      stores,
      storeImageAndVideo,
      storeImageAndVideoForm,
      intl,
      pathArr = [],
      
    } = this.props;
    
    
    const {
      
      handleModalVideoOpen,
      
    } = storeImageAndVideo;
    
    
    const {
      
      dataObj,
      handleGetImagesAndVideosObj,
      handleRemovePreview,
      
    } = storeImageAndVideoForm;
    
    
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const imagesAndVideosObj = handleGetImagesAndVideosObj({ pathArr });
    const formattedObj = formatImagesAndVideosObj({ localeObj: stores.data.localeObj, obj: imagesAndVideosObj });
    
    const type = lodashGet(formattedObj, ['type'], '');
    const arr = lodashGet(formattedObj, ['arr'], []);
    
    
    // 画像を追加してもプレビューが更新されないときがある。これを読み込むと正常に更新される。ただいい方法ではない。
    const imageType = lodashGet(dataObj, [...pathArr, 'imagesAndVideosObj', 'type'], '');
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/image-and-video/components/form-preview.js
    // `);
    
    // console.log(`
    //   ----- pathArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- dataObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(dataObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- formattedObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(formattedObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- arr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // const test = lodashGet(imagesAndVideosObj, ['type'], '');
    
    
    
    
    // --------------------------------------------------
    //   必要なデータがない場合は処理停止
    // --------------------------------------------------
    
    if (!type || arr.length === 0) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - Preview Thumbnail Image & Video
    // --------------------------------------------------
    
    const componentsPreviewArr = [];
    
    
    for (const [index, valueObj] of arr.entries()) {
      
      
      // console.log(`
      //   ----- valueObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(valueObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   画像
      // ---------------------------------------------
      
      if (valueObj.type === 'image') {
        
        const src = valueObj.src;
        const width = valueObj.width;
        const height = valueObj.height;
        const caption = lodashGet(valueObj, ['caption'], '');
        
        
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
          
          componentsPreviewArr.push(
            <div css={cssPreviewBox} key={index}>
              
              {/* Image */}
              <Tooltip title={caption}>
              
                <img
                  css={css`
                    // width: 108px;
                    height: 108px;
                    min-height: 108px;
                    max-height: 108px;
                    
                    @media screen and (max-width: 480px) {
                      // width: 68px;
                      height: 68px;
                      min-height: 68px;
                      max-height: 68px;
                    }
                  `}
                  src={src}
                  // width="108px"
                  // height="108px"
                  alt={imageType}
                />
              
              </Tooltip>
              
              
              {/* Remove Button */}
              <Fab
                css={cssPreviewRemoveFab}
                color="primary"
                onClick={() => handleRemovePreview({ pathArr, index })}
              >
                <IconClose />
              </Fab>
              
            </div>
          );
          
          
        // ---------------------------------------------
        //   SVG
        // ---------------------------------------------
          
        } else {
          
          componentsPreviewArr.push(
            <div css={cssPreviewBox} key={index}>
              
              {/* Image */}
              <Tooltip title={caption}>
                
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
                />
                
              </Tooltip>
              
              
              {/* Remove Button */}
              <Fab
                css={cssPreviewRemoveFab}
                color="primary"
                onClick={() => handleRemovePreview({ pathArr, index })}
              >
                <IconClose />
              </Fab>
              
            </div>
          );
          
        }
        
        
      // ---------------------------------------------
      //   動画
      // ---------------------------------------------
      
      } else if (valueObj.type === 'video') {
        
        componentsPreviewArr.push(
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
              
              
              {/* Image */}
              <img
                css={css`
                  width: 100%;
                `}
                src={`https://img.youtube.com/vi/${valueObj.videoID}/mqdefault.jpg`}
              />
              
              
              {/* Play Button */}
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
              
              
              {/* Remove Button */}
              <Fab
                css={cssPreviewRemoveFab}
                color="primary"
                onClick={() => handleRemovePreview({ pathArr, index })}
              >
                <IconClose />
              </Fab>
            
            
            </div>
            
          </div>
        );
        
      }
      
    };
    
    
    
    
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
      
        
        {/* Preview */}
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            margin: 2px 0 0 0;
          `}
        >
          {componentsPreviewArr}
        </div>
        
        
      </React.Fragment>
    );
    
  }
  
});