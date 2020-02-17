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

import IconHealing from '@material-ui/icons/Healing';
import IconKeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import IconKeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import FollowButton from '../../../follow/components/ur-button';




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssInfo = css`
  padding: 6px 6px 0 20px;
  font-size: 12px;
  line-height: 1.4em;
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
    const status = lodashGet(stores, ['data', 'headerObj', 'status'], '');
    
    const exp = lodashGet(stores, ['data', 'headerObj', 'exp'], 0);
    const level = Math.floor(exp / 10);
    const followCount = lodashGet(stores, ['data', 'headerObj', 'followCount'], 0);
    const followedCount = lodashGet(stores, ['data', 'headerObj', 'followedCount'], 0);
    
    
    
    
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
    //   Component - Data
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
          
          
          <div
            css={css`
              display: flex;
              flex-flow: row nowrap;
              margin: 0 0 2px 0;
              padding: 0 6px 4px 10px;
              border-bottom: #d51a53 solid 1px;
            `}
          >
            
            <div
              css={css`
                flex-grow: 2;
                font-size: 14px;
                font-weight: normal;
                line-height: 1.4em;
                margin: 6px 0 0 0;
              `}
            >
              {componentName}
            </div>
            
            
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
          
          
          <p css={cssInfo}>Lv. {level}</p>
          
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
            `}
          >
            <p css={cssInfo}>フォロー {followCount}人</p>
            <p css={cssInfo}>フォロワー {followedCount}人</p>
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
          
          
          <div
            css={css`
              font-size: 14px;
              font-weight: normal;
              line-height: 1.4em;
              margin: 0;
              padding: 4px 4px 4px 10px;
            `}
          >
            {componentName}
          </div>
          
          
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