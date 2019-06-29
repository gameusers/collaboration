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

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconClose from '@material-ui/icons/Close';
import IconDescription from '@material-ui/icons/Description';
import IconHelpOutline from '@material-ui/icons/HelpOutline';


// ---------------------------------------------
//   Material UI / Color
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
  }
`;

const cssFontRed = css`
  color: #FE2E2E;
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
    
    const { storeImageAndVideo, storeImageAndVideoForm, intl, _id, heading, description, func, imagesAndVideosArr = [], caption, limit } = this.props;
    
    const {
      
      dataObj,
      handleEdit,
      handleSelectImage,
      handleAddImage,
      handleRemoveImage,
      
    } = storeImageAndVideoForm;
    
    const { handleLightboxOpen } = storeImageAndVideo;
    
    const imageCaption = lodashGet(dataObj, [_id, 'imageCaption'], '');
    const imageCaptionOpen = lodashGet(dataObj, [_id, 'imageCaptionOpen'], false);
    
    
    
    
    // --------------------------------------------------
    //   Component - Preview Thumbnail Image & Video
    // --------------------------------------------------
    
    const componentsPreviewArr = [];
    
    if (imagesAndVideosArr.length > 0) {
      
      let imageIndex = 0;
      
      for (const [index, valueObj] of imagesAndVideosArr.entries()) {
        
        
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
                  onClick={() => handleLightboxOpen({ _id, currentNo })}
                />
                
                <Fab
                  css={cssPreviewRemoveFab}
                  color="primary"
                  onClick={() => handleRemoveImage({ _id, index, func, imagesAndVideosArr })}
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
                  onClick={() => handleLightboxOpen({ _id, currentNo })}
                />
                
                <Fab
                  css={cssPreviewRemoveFab}
                  color="primary"
                  onClick={() => handleRemoveImage({ _id, index, func, imagesAndVideosArr })}
                >
                  <IconClose />
                </Fab>
                
              </div>
            );
            
          }
          
          imageIndex += 1;
          
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
        
        
        {/* Heading */}
        {heading &&
          <div
            css={css`
              font-weight: bold;
              margin: 0 0 2px 0;
            `}
          >
            {heading}
          </div>
        }
        
        
        {/* Description */}
        {description &&
          <p>{description}</p>
        }
        
        
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
        
        
        {/* Input file */}
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            margin: 0 0 6px;
          `}
        >
          
          <input
            css={css`
              margin: 14px 0 0 0;
            `}
            type="file"
            onChange={(eventObj) => handleSelectImage({ _id, fileObj: eventObj.target.files[0], imagesAndVideosArr })}
          />
          
          <div
            css={css`
              margin: 12px 0 0 0;
            `}
          >
            <Button
              
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => handleAddImage({ _id, func, imagesAndVideosArr, limit })}
            >
              追加
            </Button>
          </div>
          
        </div>
        
        
        {/* Caption */}
        {caption &&
          <TextField
            css={css`
              && {
                width: 100%;
                max-width: 500px;
                margin: 10px 0 0 0;
                
                @media screen and (max-width: 480px) {
                  max-width: auto;
                }
              }
            `}
            placeholder="画像名・簡単な解説"
            value={imageCaption}
            onChange={(eventObj) => handleEdit({
              pathArr: [_id, 'imageCaption'],
              value: eventObj.target.value
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconDescription />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleEdit({
                      pathArr: [_id, 'imageCaptionOpen'],
                      value: !imageCaptionOpen
                    })}
                  >
                    <IconHelpOutline />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        }
        
        
        {/* Captionについての解説 */}
        {imageCaptionOpen &&
          <p
            css={css`
              font-size: 12px;
              margin: 10px 0 0 0;
            `}
          >
            アップロードした画像をクリック（タップ）すると、画像が拡大表示されますが、上記フォームに文字を入力して追加すると、拡大された画像の下部に入力した文字が表示されるようになります。<strong>基本的には未入力で問題ありません</strong>が、アップロードした画像について、説明を加えたい場合に利用してください。
          </p>
        }
        
        
        {/* アップロードできる画像の解説 */}
        <p
          css={css`
            font-size: 12px;
            margin: 10px 0 0 0;
          `}
        >
          アップロードできる画像の種類は JPEG, PNG, GIF, SVG で、ファイルサイズが5MB以内のものです。<span css={cssFontRed}>画像を選択したら追加ボタンを押してください。</span>
        </p>
        
        
        {/* Lightbox */}
        <LightboxWrapper
          _id={_id}
          imagesAndVideosArr={imagesAndVideosArr}
        />
        
        
      </React.Fragment>
    );
    
  }
  
});