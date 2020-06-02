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
import { SRLWrapper } from 'simple-react-lightbox';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

// import shortid from 'shortid';

// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { imageCalculateSize } from 'app/@modules/image/calculate.js';




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
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const {
      
      storeImageAndVideo,
      intl,
      pathArr,
      imagesAndVideosObj,
      setMaxHeight = true
      
    } = this.props;
    
    
    const {
      
      handleLightboxOpen,
      handleLightboxClose,
      handleModalVideoOpen,
      
    } = storeImageAndVideo;
    
    
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const type = lodashGet(imagesAndVideosObj, ['type'], '');
    const arr = lodashGet(imagesAndVideosObj, ['arr'], []);
    
    
    
    
    // --------------------------------------------------
    //   必要なデータがない場合は処理停止
    // --------------------------------------------------
    
    if (!type || arr.length === 0) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - Images
    // --------------------------------------------------
    
    let componentBigImage = '';
    const componentsSmallImagesArr = [];
    
    
    for (const [index, valueObj] of arr.entries()) {
      
      
      // console.log(chalk`
      //   index: {green ${index}}
      // `);
      
      // console.log(`
      //   ----- valueObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(valueObj)), { colors: true, depth: null })}\n
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
          
          componentBigImage =
            <div
              css={css`
                width: 100%;
                background-color: black;
              `}
            >
              <img
                css={css`
                  max-width: 100%;
                  max-height: ${setMaxHeight ? '400px' : 'none'};
                  object-fit: contain;
                  margin: 0 auto;
                `}
                src={valueObj.src}
                srcSet={valueObj.srcSet}
                alt={valueObj.caption}
                width={valueObj.width}
              />
            </div>
          ;
          
          
        // ---------------------------------------------
        //   動画
        // ---------------------------------------------
        
        } else if (valueObj.type === 'video') {
          
          componentBigImage =
            <div
              css={css`
                width: 100%;
                position: relative;
                background-color: black;
              `}
            >
              
              <img
                css={css`
                  // width: 100%;
                  max-width: 100%;
                  max-height: 300px;
                  object-fit: contain;
                  margin: 0 auto;
                `}
                src={`https://img.youtube.com/vi/${valueObj.videoID}/mqdefault.jpg`}
                
                // src={`https://img.youtube.com/vi/${valueObj.videoID}/maxresdefault.jpg`}
                // srcSet={`https://img.youtube.com/vi/${valueObj.videoID}/mqdefault.jpg 480w,heih
                //         https://img.youtube.com/vi/${valueObj.videoID}/maxresdefault.jpg 640w`}
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
                    font-size: 46px;
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
          
          
          // ---------------------------------------------
          //   横幅・高さを計算する
          // ---------------------------------------------
          
          // const calculatedObj = imageCalculateSize({ width, height, specifiedHeight: 108 });
          
          
          // console.log(`
          //   ----- calculatedObj -----\n
          //   ${util.inspect(calculatedObj, { colors: true, depth: null })}\n
          //   --------------------\n
          // `);
          
          
          componentsSmallImagesArr.push(
            <div css={cssPreviewBox} key={index}>
              
              <img
                css={css`
                  height: 108px;
                  min-height: 108px;
                  max-height: 108px;
                  
                  @media screen and (max-width: 480px) {
                    height: 68px;
                    min-height: 68px;
                    max-height: 68px;
                  }
                `}
                src={valueObj.src}
              />
              
            </div>
          );
          
          
        // ---------------------------------------------
        //   動画
        // ---------------------------------------------
        
        } else if (valueObj.type === 'video') {
          
          componentsSmallImagesArr.push(
            <div css={cssPreviewBox} key={`${imagesAndVideosObj._id}-${index}`}>
              
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
                
                
              </div>
              
            </div>
          );
          
          
        }
        
        
      }
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Small Images
    // --------------------------------------------------
    
    let componentSmallImages = '';
    
    if (componentsSmallImagesArr.length !== 0) {
      
      componentSmallImages =
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            margin: 10px 0 0 0;
          `}
        >
          {componentsSmallImagesArr}
        </div>
      ;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Options
    // --------------------------------------------------
    
    // const optionsObj = {
      
    //   settings: {
        
    //     disablePanzoom: true,
        
    //   }
      
    // };
    
    // // 画像がひとつの場合は「サムネイル」と「オートプレイ」「次」「前」「サムネイル」ボタンを非表示にする
    // if (arr.length === 1) {
      
    //   optionsObj.buttons = {
        
    //     showAutoplayButton: false,
    //     showNextButton: false,
    //     showPrevButton: false,
    //     showThumbnailsButton: false,
        
    //   };
      
    //   optionsObj.thumbnails = {
        
    //     showThumbnails: false,
        
    //   };
      
    // }
    
    
    // バグでスレッド、コメント、返信の画像がごちゃまぜで表示されるので、サムネイルを削除して、画像をひとつずつ表示することにしている
    const optionsObj = {
      
      settings: {
        
        disablePanzoom: true,
        
      },
      
      buttons: {
        
        showAutoplayButton: false,
        showNextButton: false,
        showPrevButton: false,
        showThumbnailsButton: false,
        
      },
      
      thumbnails: {
        
        showThumbnails: false,
        
      },
      
    };
    
    
    
    
    // --------------------------------------------------
    //   Callbacks
    // --------------------------------------------------
    
    const callbacksObj = {
      
      
      // onSlideChange: object => handleSlideChange(object),
      // onLightboxClosed: () => handleLightboxClose({ pathArr }),
      // onLightboxOpened: () => handleLightboxOpen({ pathArr }),
      
      onLightboxOpened: (object) => handleLightboxOpen({ object }),
      onLightboxClosed: (object) => handleLightboxClose({ object }),
      
      // onCountSlides: (total) => {
      //   console.log(total);
      // },
      
    };
    
    
    
    
    // --------------------------------------------------
    //   key
    // --------------------------------------------------
    
    const key = pathArr.join('-');
    // const key = `${pathArr.join('-')}-${imagesAndVideosObj._id}`;
    // const key = shortid.generate();
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/image-and-video/components/image-and-video.js
    // `);
    
    // console.log(`
    //   ----- pathArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   key: {green ${key}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <SRLWrapper
        options={optionsObj}
        callbacks={callbacksObj}
        key={key}// ページ遷移を行っても最初に表示した画像が表示され続ける状態（バグ？）を防ぐため、key を入れている
      >
        
        
        {/* Big Image */}
        {componentBigImage}
        
        
        {/* Small Images */}
        {componentSmallImages}
        
        
      </SRLWrapper>
    );
    
    
  }
  
  
});