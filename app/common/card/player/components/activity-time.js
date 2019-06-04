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

import IconAlarm from '@material-ui/icons/Alarm';




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
    
    for (const [index, value] of arr.entries()) {
      
      const weekTextArr = ['月', '火', '水', '木', '金', '土', '日'];
      
      
      let week = '';
      
      if (value.weekArr.length > 0) {
        
        const tempArr = [];
        
        for (let value of value.weekArr.values()) {
          tempArr.push(weekTextArr[value]);
        }
        
        week = ` (${tempArr.join(' / ')})`;
      }
      
      
      componentsArr.push(
        <div
          css={css`
            margin: 0 20px 0 0;
            
            @media screen and (max-width: 480px) {
              margin: 0;
            }
          `}
          key={`activityTime${index}`}
        >
          {value.beginTime} ～ {value.endTime}{week}
        </div>
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
          margin: 28px 0 0 0;
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
          
          <IconAlarm
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
            活動時間
          </h3>
          
        </div>
        
        
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