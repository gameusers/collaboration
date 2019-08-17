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
// import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import { animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconLocalFlorist from '@material-ui/icons/LocalFlorist';
import IconCopyright from '@material-ui/icons/Copyright';
import IconNavigation from '@material-ui/icons/Navigation';




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssMenu = css`
  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`;

const cssMenuVerticalBar = css`
  margin: 0 10px;
  
  @media screen and (max-width: 480px) {
    margin: 0 5px;
  }
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
    
    // const handleScrollToTop = lodashGet(stores, ['layout', 'handleScrollToTop'], '');
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <footer
        css={css`
          position: relative;
          color: white;
          background-color: black;
          padding: 6px 0 6px;
        `}
      >
        
        
        {/* Top */}
        <div
          css={css`
            display: flex;
            flex-direction: row;
            font-size: 14px;
            color: white;
            margin: 0;
          `}
        >
          
          
          {/* Logo Flower */}
          <Button
            css={css`
              && {
                font-size: 30px;
                height: 34px;
                min-width: 30px;
                min-height: 34px;
                padding: 0 20px 0 8px;
                
                @media screen and (max-width: 480px) {
                  font-size: 18px;
                  height: 30px;
                  min-height: 30px;
                  padding: 0 14px 0 10px;
                }
              }
            `}
            color="secondary"
          >
            <IconLocalFlorist
              css={css`
                font-size: 26px;
                margin: 0 0 3px;
                
                @media screen and (max-width: 480px) {
                  margin: 0 0 2px 0;
                }
              `}
            /> 
            GU
          </Button>
          
          
          {/* Navigation */}
          <nav
            css={css`
              display: flex;
              flex-flow: row wrap;
              flex-grow: 2;
              margin: 0 58px 0 0;
              color: white;
              
              @media screen and (max-width: 480px) {
                font-size: 12px;
              }
            `}
          >
            <div css={cssMenu}>公式コミュニティ</div>
            <div css={cssMenuVerticalBar}>|</div>
            <div css={cssMenu}>お問い合わせ</div>
            <div css={cssMenuVerticalBar}>|</div>
            <div css={cssMenu}>Twitter</div>
          </nav>
          
          
          {/* Scroll To Top Icon */}
          <div
            css={css`
              position: absolute;
              top: 10px;
              right: 10px;
            `}
          >
            <Fab color="secondary" size="small" onClick={scroll.scrollToTop}>
              <IconNavigation />
            </Fab>
          </div>
          
        </div>
        
        
        
        
        {/* Bottom */}
        <div
          css={css`
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
          `}
        >
          
          <IconCopyright
            css={css`
              && {
                font-size: 20px;
              }
            `}
          />
          
          <div
            css={css`
              font-size: 12px;
              margin: 0 0 0 4px;
            `}
          >
            Game Users All Rights Reserved.
          </div>
          
        </div>
        
        
      </footer>
    );
  }
  
};