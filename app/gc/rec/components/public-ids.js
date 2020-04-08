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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconStyle from '@material-ui/icons/Style';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import IDChip from '../../../common/id/components/chip';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
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
    
    const { idsArr, publicIDsArr } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    // if (!Array.isArray(arr) || arr.length === 0) {
    //   return null;
    // }
    
    
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    const componentsArr = [];
    
    
    // ---------------------------------------------
    //   - idsArr / ログインしてIDを選択した場合
    // ---------------------------------------------
    
    if (Array.isArray(idsArr) && idsArr.length > 0) {
      
      for (const [index, valueObj] of idsArr.entries()) {
        
        const games_id = lodashGet(valueObj, ['gamesObj', '_id'], '');
        const gamesName = lodashGet(valueObj, ['gamesObj', 'name'], '');
        const gamesImagesAndVideosThumbnailObj = lodashGet(valueObj, ['gamesObj', 'imagesAndVideosThumbnailObj'], {});
        
        componentsArr.push(
          <IDChip
            key={index}
            platform={valueObj.platform}
            label={valueObj.label}
            id={valueObj.id}
            games_id={games_id}
            gamesName={gamesName}
            gamesImagesAndVideosThumbnailObj={gamesImagesAndVideosThumbnailObj}
          />
        );
        
      }
      
      
    // ---------------------------------------------
    //   - publicIDsArr / 非ログインでIDを入力した場合
    // ---------------------------------------------
      
    } else if (Array.isArray(publicIDsArr) && publicIDsArr.length > 0) {
      
      for (const [index, valueObj] of publicIDsArr.entries()) {
        
        const label = valueObj.platform === 'Other' ? 'ID' : '';
        // const gamesName = lodashGet(valueObj, ['gamesObj', 'name'], '');
        
        componentsArr.push(
          <IDChip
            key={index}
            platform={valueObj.platform}
            label={label}
            id={valueObj.id}
          />
        );
        
      }
      
      
    // ---------------------------------------------
    //   - 必要な情報がない場合、空のコンポーネントを返す
    // ---------------------------------------------
      
    } else {
      
      return null;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/gc/rec/components/public-ids.js
    // `);
    
    // console.log(`
    //   ----- idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- publicIDsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(publicIDsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          // border-top: 1px dashed #A4A4A4;
          margin: 24px 0 0 0;
          // padding: 12px 0 0 0;
        `}
      >
        
        
        {/* Heading */}
        <div
          css={css`
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
          `}
        >
          
          <IconStyle
            css={css`
              && {
                font-size: 24px;
              }
            `}
          />
          
          
          <h3
            css={css`
              margin: 2px 0 0 4px;
            `}
          >
            ID
          </h3>
          
        </div>
        
        
        
        
        {/* ID */}
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            margin: 4px 0 0 0;
            
            @media screen and (max-width: 480px) {
              flex-flow: column wrap;
            }
          `}
        >
          {componentsArr}
        </div>
        
        
      </div>
    );
    
  }
  
};