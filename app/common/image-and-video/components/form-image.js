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
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconDescription from '@material-ui/icons/Description';
import IconHelpOutline from '@material-ui/icons/HelpOutline';




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssFontRed = css`
  color: #FE2E2E;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('storeImageAndVideoForm')
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
    
    const { storeImageAndVideoForm, intl, pathArr = [], heading, description, caption, limit, arrayName = 'mainArr' } = this.props;
    
    const {
      
      dataObj,
      handleEdit,
      handleSelectImage,
      handleAddImage,
      
    } = storeImageAndVideoForm;
    
    
    const imageCaption = lodashGet(dataObj, [...pathArr, 'imageCaption'], '');
    const imageCaptionOpen = lodashGet(dataObj, [...pathArr, 'imageCaptionOpen'], false);
    const imagesAndVideosArr = lodashGet(dataObj, [...pathArr, 'imagesAndVideosObj', arrayName], []);
    
    
    
    
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
            onChange={(eventObj) => handleSelectImage({ pathArr, fileObj: eventObj.target.files[0], imagesAndVideosArr })}
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
              onClick={() => handleAddImage({ pathArr, arrayName, limit })}
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
              pathArr: [...pathArr, 'imageCaption'],
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
                      pathArr: [...pathArr, 'imageCaptionOpen'],
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
        
        
      </React.Fragment>
    );
    
  }
  
});