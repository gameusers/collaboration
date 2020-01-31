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
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import Avatar from '@material-ui/core/Avatar';
import IconKeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import IconKeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import FollowButton from '../../../follow/components/gc-uc-button';




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
    
    const { stores } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Data
    // --------------------------------------------------
    
    const headerDataOpen = lodashGet(stores, ['layout', 'headerDataOpen'], false);
    
    const name = lodashGet(stores, ['data', 'headerObj', 'name'], '');
    const createdDate = moment(lodashGet(stores, ['data', 'headerObj', 'createdDate'], '')).format('YYYY/MM/DD');
    
    const membersCount = lodashGet(stores, ['data', 'headerObj', 'membersCount'], 1);
    
    
    
    
    // --------------------------------------------------
    //   関連するゲーム
    // --------------------------------------------------
    
    const gamesArr = lodashGet(stores, ['data', 'headerObj', 'gamesArr'], []);
    
    
    const codeGames = [];
    
    for (const [index, valueObj] of gamesArr.entries()) {
      
      const src = lodashGet(valueObj, ['imagesAndVideosObj', 'arr', 0, 'src'], '/static/img/common/thumbnail/none-game.jpg');
      const srcSet = lodashGet(valueObj, ['imagesAndVideosObj', 'arr', 0, 'srcSet'], '');
      
      codeGames.push(
        <Avatar
          css={css`
            && {
              width: 24px;
              height: 24px;
              margin: 0 4px;
            }
          `}
          key={index}
          alt={valueObj.name}
          src={src}
          srcSet={srcSet}
        />
      );
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    let componentData = '';
    
    
    // --------------------------------------------------
    //   Data Opened
    // --------------------------------------------------
    
    if (headerDataOpen) {
      
      componentData = 
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
          
          <div css={cssTitleBox}>
            
            <div css={cssTitle}>{name}</div>
            
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
              onClick={stores.layout.handleHeaderDataClose}
            >
              <IconKeyboardArrowUp />
            </IconButton>
            
          </div>
          
          
          <p css={cssInfo}>開設日 | {createdDate}</p>
          <p css={cssInfo}>メンバー | {membersCount}人</p>
          
          
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
              margin: 8px 8px 2px;
            `}
          >
            {codeGames}
          </div>
          
          
          <FollowButton />
          
          
        </div>
      ;
      
      
    // --------------------------------------------------
    //   Data Closed
    // --------------------------------------------------
      
    } else {
      
      componentData = 
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
          
          <div css={cssTitleClosed}>{name}</div>
          
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
            onClick={stores.layout.handleHeaderDataOpen}
          >
            <IconKeyboardArrowDown />
          </IconButton>
          
        </div>
      ;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   headerDataOpen: {green ${headerDataOpen}}
    //   name: {green ${name}}
    //   hardware: {green ${hardware}}
    // `);
    
    // console.log(`\n---------- hardwareSortedArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(hardwareSortedArr)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(`
    //   ----- hardwareSortedArr -----\n
    //   ${util.inspect(hardwareSortedArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        {componentData}
      </React.Fragment>
    );
    
    
  }
  
};