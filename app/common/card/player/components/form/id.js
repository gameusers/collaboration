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
    
    const { _id, idArr, func } = this.props;
    
    
    // --------------------------------------------------
    //   Component - 選択済み
    // --------------------------------------------------
    
    const componentsSelectedArr = [];
    
    for (const [index, valueObj] of idArr.entries()) {
      
      const games_id = lodashGet(valueObj, ['games_id'], '');
      const gamesThumbnailArr = lodashGet(valueObj, ['gamesImagesAndVideosObj', 'thumbnailArr'], []);
      const gamesName = lodashGet(valueObj, ['gamesName'], '');
      
      componentsSelectedArr.push(
        <IDChip
          key={index}
          platform={valueObj.platform}
          label={valueObj.label}
          id={valueObj.id}
          games_id={games_id}
          gamesThumbnailArr={gamesThumbnailArr}
          gamesName={gamesName}
        />
      );
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`\n---------- idArr / id ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(idArr)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(chalk`
    //   value: {green ${value}}
    //   alternativeText: {green ${alternativeText}}
    //   search: {green ${search}}
    //   age: {green ${age}}
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
        
        
        <p>ゲームや連絡先のIDを表示します。「IDを編集する」ボタンを押して、表示したいIDを選択してください。</p>
        
        
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
        
        
        {/* ID選択・編集フォーム */}
        <div
          css={css`
            margin: 24px 0 0 0;
          `}
        >
          <IDForm
            _id={_id}
            idArr={idArr}
            func={func}
          />
        </div>
        
        
      </React.Fragment>
    );
    
  }
  
};