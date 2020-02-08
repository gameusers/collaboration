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
//   Material UI
// ---------------------------------------------

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconGrade from '@material-ui/icons/Grade';
import IconClose from '@material-ui/icons/Close';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { formatImagesAndVideosObj } from '../../../@database/images-and-videos/format';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeGameForm')
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
    
    const { stores, storeGameForm, pathArr, _id, gameCommunities_id, name, imagesAndVideosThumbnailObj = {} } = this.props;
    
    const {
      
      handleRemove,
      
    } = storeGameForm;
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (!_id || !gameCommunities_id || !name) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - Avatar
    // --------------------------------------------------
    
    let componentAvatar = '';
    
    const thumbnailSrc = lodashGet(imagesAndVideosThumbnailObj, ['arr', 0, 'src'], '/img/common/thumbnail/none.svg');
    const thumbnailSrcSet = lodashGet(imagesAndVideosThumbnailObj, ['arr', 0, 'srcSet'], '');
    
    
    // const formattedObj = formatImagesAndVideosObj({ localeObj: stores.data.localeObj, obj: imagesAndVideosThumbnailObj });
    
    // const thumbnailSrc = lodashGet(formattedObj, ['arr', 0, 'src'], '/img/common/thumbnail/none.svg');
    // const thumbnailSrcSet = lodashGet(formattedObj, ['arr', 0, 'srcSet'], '');
    
    
    if (Object.keys(imagesAndVideosThumbnailObj).length !== 0) {
      
      componentAvatar =
        <Avatar
          css={css`
            && {
              width: 32px;
              height: 32px;
              background-color: white;
            }
          `}
          alt={name}
          src={thumbnailSrc}
          srcSet={thumbnailSrcSet}
        />
      ;
      
    } else {
      
      componentAvatar =
        <Avatar
          css={css`
            && {
              width: 32px;
              height: 32px;
              background-color: #3f51b5;
            }
          `}
        >
          <IconGrade />
        </Avatar>
      ;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/game/components/chip.js
    // `);
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   name: {green ${name}}
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosThumbnailObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosThumbnailObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          color: #3f51b5;
          border: 1px solid #3f51b5;
          border-radius: 18px;
          margin: 8px 8px 0 0;
        `}
      >
        
        
        <div>
          {componentAvatar}
        </div>
        
        
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            font-size: 14px;
            line-height: 1.4;
            padding: 4px 6px 4px 6px;
          `}
        >
          <span
            css={css`
              font-weight: bold;
            `}
          >
            {name}
          </span>
        </div>
        
        
        <div
          css={css`
            margin-left: auto;
          `}
        >
          <IconButton
            css={css`
              && {
                width: 22px;
                height: 22px;
                
                margin: 0 6px 2px 0;
                padding: 0;
                background-color: #3f51b5;
              }
            `}
            onClick={() => handleRemove({ pathArr, _id })}
          >
            <IconClose
              css={css`
                && {
                  width: 20px;
                  height: 20px;
                  color: white;
                }
              `}
            />
          </IconButton>
        </div>
        
        
      </div>
    );
    
  }
  
};