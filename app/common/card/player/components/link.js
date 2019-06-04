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
import SimpleIcons from 'simple-icons-react-component';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconPublic from '@material-ui/icons/Public';




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
    
    const { linkArr } = this.props;
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (!Array.isArray(linkArr) || linkArr.length === 0) {
      return null;
    }
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - リンク
    // --------------------------------------------------
    
    const componentLinkArr = [];
    
    for (const [index, valueObj] of linkArr.entries()) {
      
      if (valueObj.type === 'Other') {
        
        componentLinkArr.push(
          <div
            css={css`
              margin: 10px 12px 0 0;
            `}
            key={index}
          >
            <Button
              css={css`
                && {
                  font-size: 14px;
                  min-width: 36px;
                  min-height: 26px
                  margin: 0;
                  padding: 0 6px;
                }
              `}
              variant="outlined"
              color="secondary"
              href={valueObj.url}
              target="_blank"
            >
              {valueObj.label}
            </Button>
          </div>
        );
        
      } else if (valueObj.url) {
        
        componentLinkArr.push(
          <div
            css={css`
              margin: 10px 14px 0 0;
            `}
            key={`link${index}`}
          >
            <a href={valueObj.url} target="_blank">
              <div
                css={css`
                  width: 24px;
                  height: 24px;
                `}
              >
                <SimpleIcons name={valueObj.type} />
              </div>
            </a>
          </div>
        );
        
      }
      
    }
    
    
    let componentLinkBox = '';
    
    if (componentLinkArr.length > 0) {
      
      componentLinkBox =
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
          `}
        >
          {componentLinkArr}
        </div>
      ;
      
    } else {
      
      return null;
      
    }
    
    
    
    
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
          
          <IconPublic
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
            リンク
          </h3>
          
        </div>
        
        
        {/* Link */}
        {componentLinkBox}
        
        
      </div>
    );
    
    
  }
  
};