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


// ---------------------------------------------
//   Material UI / Icon
// ---------------------------------------------

import IconGamepad from '@material-ui/icons/Gamepad';




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssHeading = css`
  margin: 3px 0 0 4px;
`;

const cssItem = css`
  margin: 0 20px 0 0;
  
  @media screen and (max-width: 480px) {
    margin: 0;
  }
`;

const cssSpanColor = css`
  color: #088A08;
`;





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
    
    const { hardwareActiveArr, hardwareInactiveArr, hardwarePlayingArr } = this.props;
    
    const componentArr = [];
    let tempArr = [];
    
    
    
    
    // --------------------------------------------------
    //   見出し
    // --------------------------------------------------
    
    let componentHeading = <h3 css={cssHeading}>所有ハードウェア<span css={cssSpanColor}>（昔所有）</span></h3>;
    
    if (hardwarePlayingArr) {
      componentHeading = <h3 css={cssHeading}>ハードウェア</h3>;
    }
    
    
    // ---------------------------------------------
    //   所有ハード
    // ---------------------------------------------
    
    if (Array.isArray(hardwareActiveArr) && hardwareActiveArr.length > 0) {
      
      for (let valueObj of hardwareActiveArr) {
        tempArr.push(valueObj.name);
      }
      
      componentArr.push(
        <div css={cssItem} key="hardwareActive">{tempArr.join(' / ')}</div>
      );
      
    }
    
    
    // ---------------------------------------------
    //   非所有ハード
    // ---------------------------------------------
    
    tempArr = [];
    
    if (Array.isArray(hardwareInactiveArr) && hardwareInactiveArr.length > 0) {
      
      for (let valueObj of hardwareInactiveArr) {
        tempArr.push(valueObj.name);
      }
      
      componentArr.push(
        <div css={cssItem} key="hardwareInactive"><span css={cssSpanColor}>{tempArr.join(' / ')}</span></div>
      );
      
    }
    
    
    // ---------------------------------------------
    //   ハードウェア
    // ---------------------------------------------
    
    if (Array.isArray(hardwarePlayingArr) && hardwarePlayingArr.length > 0) {
      
      for (let valueObj of hardwarePlayingArr) {
        tempArr.push(valueObj.name);
      }
      
      componentArr.push(
        <div css={cssItem} key="hardwarePlaying">{tempArr.join(' / ')}</div>
      );
      
    }
    
    
    // --------------------------------------------------
    //   コンテンツが存在しない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (componentArr.length === 0) {
      return null;
    }
    
    
    // ---------------------------------------------
    //   コンポーネント作成
    // ---------------------------------------------
    
    const componentBox =
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
        {componentArr}
      </div>
    ;
    
    
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
          
          <IconGamepad
            css={css`
              && {
                font-size: 24px;
              }
            `}
          />
          
          {componentHeading}
          
        </div>
        
        
        {/* ハードウェア */}
        {componentBox}
        
        
      </div>
    );
    
  }
  
};