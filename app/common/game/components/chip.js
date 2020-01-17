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
    
    const { stores, storeGameForm, pathArr, _id, gameID, name, imagesAndVideosObj } = this.props;
    
    const {
      
      handleRemove,
      
    } = storeGameForm;
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (!_id || !gameID || !name) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - Avatar
    // --------------------------------------------------
    
    let componentAvatar = '';
    
    // const thumbnailArr = lodashGet(imagesAndVideosObj, ['thumbnailArr'], []);
    const formattedObj = formatImagesAndVideosObj({ localeObj: stores.data.localeObj, obj: imagesAndVideosObj });
    
    const thumbnailSrc = lodashGet(formattedObj, ['arr', 0, 'src'], '/static/img/common/thumbnail/none.svg');
    const thumbnailSrcSet = lodashGet(formattedObj, ['arr', 0, 'srcSet'], '');
    
    
    if (thumbnailSrc) {
      
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
    
    // console.log(chalk`
    //   cardPlayers_id: {green ${cardPlayers_id}}
    // `);
    
    // console.log(`\n---------- imagesAndVideosObj ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(imagesAndVideosObj)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(`\n---------- imagesAndVideosObj.thumbnailArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(imagesAndVideosObj.thumbnailArr)));
    // console.log(`\n-----------------------------------\n`);
    
    
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