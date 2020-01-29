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
//   Material UI / Icons
// ---------------------------------------------

import IconStyle from '@material-ui/icons/Style';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import IDChip from '../../../id/components/chip';




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
    
    const { arr } = this.props;
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (!Array.isArray(arr) || arr.length === 0) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    const componentsArr = [];
    
    for (const [index, valueObj] of arr.entries()) {
      
      const games_id = lodashGet(valueObj, ['games_id'], '');
      const gamesThumbnailArr = lodashGet(valueObj, ['gamesImagesAndVideosObj', 'thumbnailArr'], []);
      const gamesName = lodashGet(valueObj, ['gamesName'], '');
      
      componentsArr.push(
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
    
    // console.log(chalk`
    //   cardPlayers_id: {green ${cardPlayers_id}}
    // `);
    
    // console.log(`
    //   hardwareArr: \n${util.inspect(hardwareArr, { colors: true, depth: null })}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          border-top: 1px dashed #A4A4A4;
          margin: 24px 0 0 0;
          padding: 24px 0 0 0;
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