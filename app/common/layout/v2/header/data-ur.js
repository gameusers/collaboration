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

import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import IconButton from '@material-ui/core/IconButton';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconHealing from '@material-ui/icons/Healing';
import IconKeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import IconKeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import AchievementChip from 'app/common/achievement/v2/chip.js';
import FollowButton from 'app/common/follow/v2/follow-button.js';






// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssTitleBox = css`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 0 2px 0;
  padding: 0 6px 4px 10px;
  border-bottom: #d51a53 solid 1px;
`;

const cssInfo = css`
  padding: 6px 20px 0;
  font-size: 12px;
  line-height: 1.4em;
`;


// --------------------------------------------------
//   Opened
// --------------------------------------------------

const cssTitle = css`
  flex-grow: 2;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.4em;
  margin: 6px 0 0 0;
`;


// --------------------------------------------------
//   Closed
// --------------------------------------------------

const cssTitleClosed = css`
  font-size: 14px;
  font-weight: normal;
  line-height: 1.4em;
  margin: 0;
  padding: 4px 4px 4px 10px;
`;


// --------------------------------------------------
//   Gold
//   参考：https://jajaaan.co.jp/css/css-headline/
// --------------------------------------------------

const cssLineGold = css`
  color: #fff;
  font-weight: bold;
  background: #000;
  
  position: relative;
  -webkit-box-shadow: 0 2px 14px rgba(0, 0, 0, .1);
  box-shadow: 0 2px 14px rgba(0, 0, 0, .1);
  
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    content: '';
    background-image: -webkit-linear-gradient(315deg, #704308 0%, #ffce08 40%, #e1ce08 60%, #704308 100%);
    background-image: linear-gradient(135deg, #704308 0%, #ffce08 40%, #e1ce08 60%, #704308 100%);
  }
  
  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    content: '';
    background-image: -webkit-linear-gradient(315deg, #704308 0%, #ffce08 40%, #e1ce08 60%, #704308 100%);
    background-image: linear-gradient(135deg, #704308 0%, #ffce08 40%, #e1ce08 60%, #704308 100%);
  }
  
  margin: 0 0 0 12px;
  padding: 0 4px;
`;

const cssTextGold = css`
  background-image: -webkit-linear-gradient(315deg, #b8751e 0%, #ffce08 37%, #fefeb2 47%, #fafad6 50%, #fefeb2 53%, #e1ce08 63%, #b8751e 100%);
  background-image: linear-gradient(135deg, #b8751e 0%, #ffce08 37%, #fefeb2 47%, #fafad6 50%, #fefeb2 53%, #e1ce08 63%, #b8751e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;


// --------------------------------------------------
//   Red
// --------------------------------------------------

const cssLineRed = css`
  color: #fff;
  font-weight: bold;
  background: #000;
  
  position: relative;
  box-shadow: 0 2px 14px rgba(0, 0, 0, .1);
  
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    content: '';
    background-image: linear-gradient(25deg, #f80014, #ff7a4f, #ffbd8b, #fcfccb);
    // background-image: linear-gradient(25deg, #7a19fb, #705ffc, #588cfd, #00b4fd);
    // background-image: linear-gradient(25deg, #5447ff, #5678ff, #49a4ff, #01cfff);
    // background-image: linear-gradient(25deg, #b8421c, #d16d1c, #e89618, #ffbf0c);
    // background-image: linear-gradient(25deg, #ff2268, #df8e6f, #abca76, #1aff7d);
    // background-image: linear-gradient(25deg, #e36976, #eb9582, #f0bd8e, #f2e59a)
  }
  
  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    content: '';
    background-image: linear-gradient(25deg, #f80014, #ff7a4f, #ffbd8b, #fcfccb);
    // background-image: linear-gradient(25deg, #7a19fb, #705ffc, #588cfd, #00b4fd);
    // background-image: linear-gradient(25deg, #5447ff, #5678ff, #49a4ff, #01cfff);
    // background-image: linear-gradient(25deg, #b8421c, #d16d1c, #e89618, #ffbf0c);
    // background-image: linear-gradient(25deg, #ff2268, #df8e6f, #abca76, #1aff7d);
    // background-image: linear-gradient(25deg, #e36976, #eb9582, #f0bd8e, #f2e59a)
  }
  
  margin: 0 0 0 12px;
  padding: 0 4px;
`;

const cssTextRed = css`
  background-image: linear-gradient(25deg, #f80014, #ff7a4f, #ffbd8b, #fcfccb);
  // background-image: linear-gradient(25deg, #7a19fb, #705ffc, #588cfd, #00b4fd);
  // background-image: linear-gradient(25deg, #5447ff, #5678ff, #49a4ff, #01cfff);
  // background-image: linear-gradient(25deg, #b8421c, #d16d1c, #e89618, #ffbf0c);
  // background-image: linear-gradient(25deg, #ff2268, #df8e6f, #abca76, #1aff7d);
  // background-image: linear-gradient(25deg, #e36976, #eb9582, #f0bd8e, #f2e59a)
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;







// --------------------------------------------------
//   Function Components
// --------------------------------------------------

const Component = (props) => {
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const [open, setOpen] = useState(true);
  
  
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    headerObj,
    heroImage,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const name = lodashGet(headerObj, ['name'], '');
  const status = lodashGet(headerObj, ['status'], '');
  
  const exp = lodashGet(headerObj, ['exp'], 0);
  const level = Math.floor(exp / 10);
  const tnl = 10 - (exp % 10);
  
  const achievementsArr = lodashGet(headerObj, ['achievementsArr'], []);
  
  const users_id = lodashGet(headerObj, ['users_id'], '');
  const followsObj = lodashGet(headerObj, ['followsObj'], {});
  const followCount = lodashGet(headerObj, ['followsObj', 'followCount'], 0);
  const followedCount = lodashGet(headerObj, ['followsObj', 'followedCount'], 0);
  
  
  
  
  // --------------------------------------------------
  //   Component - Name
  // --------------------------------------------------
  
  let componentName = '';
  
  componentName =
    <div
      css={css`
        display: flex;
        flex-flow: row wrap;
      `}
    >
      
      <div
        css={css`
          font-size: 14px;
          margin: 0 2px 0 0;
        `}
      >
        {name}
      </div>
      
      <IconHealing
        css={css`
          && {
            font-size: 18px;
            margin: 0 2px 0 0;
          }
        `}
      />
      
      <div
        css={css`
          font-size: 14px;
          margin: 0 2px 0 0;
        `}
      >
        {status}
      </div>
      
    </div>
  ;
  
  
  
  
  // --------------------------------------------------
  //   Component - Achievements Chip
  // --------------------------------------------------
  
  const componentAchievementsArr = [];
  
  for (const [index, valueObj] of achievementsArr.entries()) {
    
    componentAchievementsArr.push(
      <AchievementChip
        key={index}
        achievementID={valueObj.achievementID}
        urlID={valueObj.urlID}
        name={valueObj.name}
      />
    );
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Component
  // --------------------------------------------------
  
  let component = '';
  
  
  // --------------------------------------------------
  //   Hero Image
  // --------------------------------------------------
  
  if (heroImage) {
    
    
    // --------------------------------------------------
    //   Open
    // --------------------------------------------------
    
    if (open) {
      
      component = 
        <div
          css={css`
            width: 280px;
            border-radius: 8px;
            background-color: #000;
            background-color: rgba(0, 0, 0, 0.5);
            color: #fff;
            
            position: absolute;
            right: 15px;
            bottom: 15px;
            padding: 0 0 6px 0;
          `}
        >
          
          
          {/* Open Button */}
          <div css={cssTitleBox}>
            
            <div css={cssTitle}>{componentName}</div>
            
            <IconButton
              css={css`
                && {
                  font-size: 12px;
                  width: 24px;
                  height: 24px;
                  min-width: 24px;
                  min-height: 24px;
                  margin: 2px auto 0;
                  padding: 2px 0 0 0;
                }
              `}
              color="secondary"
              onClick={() => setOpen(false)}
            >
              <IconKeyboardArrowUp />
            </IconButton>
            
          </div>
          
          
          
          
          {/* Data */}
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
              margin: 0 0 2px 0;
            `}
          >
            <p css={cssInfo}>Lv. {level}</p>
            <p css={cssInfo}>次のレベルまで {tnl} Exp</p>
          </div>
          
          
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
              margin: 0 0 2px 0;
            `}
          >
            <p css={cssInfo}>フォロー {followCount}人</p>
            <p css={cssInfo}>フォロワー {followedCount}人</p>
          </div>
          
          
          
          
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
              margin: 12px 6px 0;
            `}
            
          >
            
            {componentAchievementsArr}
            
          </div>
          
          
          
          
          {/* Follow Button */}
          <FollowButton
            type="header"
            users_id={users_id}
            followsObj={followsObj}
          />
        
          
        </div>
      ;
      
      
    // --------------------------------------------------
    //   Close
    // --------------------------------------------------
      
    } else {
      
      component = 
        <div
          css={css`
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            
            min-width: 150px;
            max-width: 300px;
            border-radius: 8px;
            background-color: #000;
            background-color: rgba(0, 0, 0, 0.5);
            color: #fff;
            
            position: absolute;
            right: 15px;
            bottom: 15px;
            padding: 0 2px 0 0;
          `}
        >
          
          
          <div css={cssTitleClosed}>{componentName}</div>
          
          
          {/* Close Button */}
          <IconButton
            css={css`
              && {
                font-size: 12px;
                width: 24px;
                height: 24px;
                min-width: 24px;
                min-height: 24px;
                margin: 2px 0 0 0;
                padding: 0;
              }
            `}
            color="secondary"
            onClick={() => setOpen(true)}
          >
            <IconKeyboardArrowDown />
          </IconButton>
          
          
        </div>
      ;
      
    }
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/layout/v2/components/header/data-ur.js
  // `);
  
  // console.log(chalk`
  //   open: {green ${open}}
  //   name: {green ${name}}
  //   hardware: {green ${hardware}}
  // `);
  
  // console.log(`
  //   ----- hardwareSortedArr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(hardwareSortedArr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return component;
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;