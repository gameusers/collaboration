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
//   Material UI
// ---------------------------------------------

import Fab from '@material-ui/core/Fab';


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

import { imageCalculateSize } from '../../../@modules/image';


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

@inject('storeImageAndVideo', 'storeImageAndVideoForm')
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
    
    const { storeImageAndVideo, storeImageAndVideoForm, intl, pathArr = [], arrayName = 'mainArr' } = this.props;
    
    const { handleLightboxOpen, handleModalVideoOpen } = storeImageAndVideo;
    
    const { dataObj, handleRemovePreview } = storeImageAndVideoForm;
    
    const imagesAndVideosArr = lodashGet(dataObj, [...pathArr, 'imagesAndVideosObj', arrayName], []);
    
    
    
    
    // --------------------------------------------------
    //   Component - Preview Thumbnail Image & Video
    // --------------------------------------------------
    
    const componentsPreviewArr = [];
    const imagesArr = [];
    
    if (imagesAndVideosArr.length > 0) {
      
      let imageIndex = 0;
      
      for (const [index, valueObj] of imagesAndVideosArr.entries()) {
        
        
        // console.log(`
        //   ----- valueObj -----\n
        //   ${util.inspect(valueObj, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
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
          
          
          if (src.indexOf('data:image/svg') === -1) {
            
            componentsPreviewArr.push(
              <div css={cssPreviewBox} key={index}>
                
                <img
                  css={css`
                    max-height: 108px;
                    
                    @media screen and (max-width: 480px) {
                      max-height: 54px;
                    }
                  `}
                  src={src}
                  onClick={() => handleLightboxOpen({ pathArr, currentNo })}
                />
                
                <Fab
                  css={cssPreviewRemoveFab}
                  color="primary"
                  onClick={() => handleRemovePreview({ pathArr, arrayName, index })}
                >
                  <IconClose />
                </Fab>
                
              </div>
            );
            
          } else {
            
            componentsPreviewArr.push(
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
                  onClick={() => handleLightboxOpen({ pathArr, currentNo })}
                />
                
                <Fab
                  css={cssPreviewRemoveFab}
                  color="primary"
                  onClick={() => handleRemovePreview({ pathArr, arrayName, index })}
                >
                  <IconClose />
                </Fab>
                
              </div>
            );
            
          }
          
          imageIndex += 1;
          imagesArr.push(valueObj);
          
          
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
              
              <Fab
                css={cssPreviewRemoveFab}
                color="primary"
                onClick={() => handleRemovePreview({ pathArr, arrayName, index })}
              >
                <IconClose />
              </Fab>
              
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
        
      };
      
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
        
        
        {/* Preview */}
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            margin: 10px 0 0 0;
          `}
        >
          {componentsPreviewArr}
        </div>
        
        
        {/* Lightbox */}
        <LightboxWrapper
          pathArr={pathArr}
          imagesAndVideosArr={imagesArr}
        />
        
        
      </React.Fragment>
    );
    
  }
  
});