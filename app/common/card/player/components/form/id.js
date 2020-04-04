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
//   Components
// ---------------------------------------------

import IDChip from '../../../../id/components/chip';
import IDForm from '../../../../id/components/form';




// --------------------------------------------------
//   Class
// --------------------------------------------------

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
    
    const { type, _id, ids_idArr } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Component - 選択済みID
    // --------------------------------------------------
    
    const componentsSelectedArr = [];
    
    for (const [index, valueObj] of ids_idArr.entries()) {
      
      const games_id = lodashGet(valueObj, ['gamesObj', '_id'], '');
      const gamesName = lodashGet(valueObj, ['gamesObj', 'name'], '');
      const gamesImagesAndVideosThumbnailObj = lodashGet(valueObj, ['gamesObj', 'imagesAndVideosThumbnailObj'], {});
      
      componentsSelectedArr.push(
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
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/card/player/components/form/id.js
    // `);
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    // `);
    
    // console.log(`
    //   ----- ids_idArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(ids_idArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
        <h3
          css={css`
            font-weight: bold;
            margin: 0 0 2px 0;
          `}
        >
          ID
        </h3>
        
        
        <p>ゲームや連絡先のIDを表示します。「IDを登録・編集する」ボタンを押して、表示したいIDを選択してください。</p>
        
        
        
        
        {/* 選択済みID */}
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            margin: 12px 0 8px 0;
            
            @media screen and (max-width: 480px) {
              flex-flow: column wrap;
            }
          `}
        >
          {componentsSelectedArr}
        </div>
        
        
        
        
        {/* ID 選択・編集フォーム */}
        <div
          css={css`
            margin: 24px 0 0 0;
          `}
        >
          <IDForm
            type={type}
            _id={_id}
            ids_idArr={ids_idArr}
          />
        </div>
        
        
      </React.Fragment>
    );
    
  }
  
};