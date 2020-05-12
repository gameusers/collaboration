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

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { imageCalculateSize } from '../../../@modules/image/calculate';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import { SRLWrapper, useLightbox } from 'simple-react-lightbox';




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssPreviewBox = css`
  position: relative;
  margin: 0 4px 4px 0;
`;




// --------------------------------------------------
//   Functional Component
// --------------------------------------------------

/**
 * 最初の大きな画像
 * Lightboxのバグ？で、ページ遷移後戻ってくると、最初の画像がLightboxで開けなくなる
 * Hookを利用するとなぜか直るので、わざわざFunctional Componentにしている
 * バグが直ったら不要かもしれない
 * https://simple-react-lightbox.dev/with-hook/
 * 
 * @param {number} width - 横幅
 * @param {string} src - ソース
 * @param {string} src - ソースセット
 * @param {string} src - キャプション
 * @param {boolean} setMaxHeight - 高さを設定する場合 true
 */
const ComponentBigImage = ({ width, src, srcSet, caption, setMaxHeight, handleLightboxOpen, pathArr }) => {

  // Custom Hook
  const { openLightbox } = useLightbox();
  
  
  return (
    <div
      css={css`
        width: 100%;
        background-color: black;
      `}
    >
      <img
        css={css`
          // width: 100%;
          // height: 50%;
          max-width: 100%;
          max-height: ${setMaxHeight ? '400px' : 'none'};
          object-fit: contain;
          margin: 0 auto;
        `}
        src={src}
        srcSet={srcSet}
        alt={caption}
        onClick={() => openLightbox(0)}
        // onClick={() => handleLightboxOpen({ pathArr, openLightbox:useLightbox })}
        
        // onClick={() => handleLightboxOpen({ pathArr, currentNo: 0 })}
        width={width}
        // height={height}
      />
    </div>
  );
  
};




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
          // const height = valueObj.height;
          
          
          // componentBigImage =
          //   <div
          //     css={css`
          //       width: 100%;
          //       background-color: black;
          //     `}
          //   >
          //     <img
          //       css={css`
          //         // width: 100%;
          //         // height: 50%;
          //         max-width: 100%;
          //         max-height: ${setMaxHeight ? '400px' : 'none'};
          //         object-fit: contain;
          //         margin: 0 auto;
          //       `}
          //       src={valueObj.src}
          //       srcSet={valueObj.srcSet}
          //       alt={valueObj.caption}
          //       onClick={() => openLightbox(0)}
                
          //       // onClick={() => handleLightboxOpen({ pathArr, currentNo: 0 })}
          //       width={width}
          //       // height={height}
          //     />
          //   </div>
          // ;
          
          
          componentBigImage =
            <ComponentBigImage
              width={width}
              src={valueObj.src}
              srcSet={valueObj.srcSet}
              caption={valueObj.caption}
              setMaxHeight={setMaxHeight}
              // handleLightboxOpen={handleLightboxOpen}
              // pathArr={pathArr}
            />
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
          
          // Lightboxで開く画像Noを設定する
          // const currentNo = imageIndex;
          
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
            
            componentsSmallImagesArr.push(
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
                  // onClick={() => handleLightboxOpen({ pathArr })}
                />
                
              </div>
            );
            
            
          // ---------------------------------------------
          //   SVG
          // ---------------------------------------------
            
          } else {
            
            componentsSmallImagesArr.push(
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
                  // onClick={() => handleLightboxOpen({ pathArr })}
                />
                
              </div>
            );
            
          }
          
          // imageIndex += 1;
          // imagesArr.push(valueObj);
          
          
        // ---------------------------------------------
        //   動画
        // ---------------------------------------------
        
        } else if (valueObj.type === 'video') {
          
          componentsSmallImagesArr.push(
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
                
                
              </div>
              
            </div>
          );
          
          
        }
        
        
      }
      
      
      // imageIndex += 1;
      // imagesArr.push(valueObj);
      
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
    
    const optionsObj = {
      
      enablePanzoom: false,
      
    };
    
    // 画像がひとつの場合は「オートプレイボタン」と「一覧で表示されるサムネイル画像」を非表示にする
    if (arr.length === 1) {
      
      optionsObj.autoplaySpeed = 0;
      optionsObj.showThumbnails = false;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Callbacks
    // --------------------------------------------------
    
    const callbacksObj = {
      
      // onCountSlides: total => countSlides(total),
      // onSlideChange: object => handleSlideChange(object),
      onLightboxClosed: () => handleLightboxClose({ pathArr }),
      onLightboxOpened: () => handleLightboxOpen({ pathArr }),
      
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
      <SRLWrapper
        options={optionsObj}
        callbacks={callbacksObj}
      >
        
        
        {/* Big Image */}
        {componentBigImage}
        
        
        {/* Small Images */}
        {componentSmallImages}
        
        
      </SRLWrapper>
    );
    
  }
  
});