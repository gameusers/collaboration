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
import { observer } from 'mobx-react';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssButtonBox = css`
  margin: 0 12px 0 0;
`;

const cssBox = css`
  margin: 4px 12px 0 0;
`;

const cssButton = css`
  && {
    font-size: 12px;
    min-width: 36px;
    min-height: 20px;
    margin: 0;
    padding: 0 5px;
  }
`;




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
    
    const { linkArr = [] } = this.props;
    
    
    // --------------------------------------------------
    //   Data Link
    // --------------------------------------------------
    
    let codeArr = [];
    
    
    for (const [index, valueObj] of linkArr.entries()) {
      
      if (valueObj.type === 'Official') {
        
        codeArr.push(
          <div
            css={cssButtonBox}
            key={index}
          >
            <Button
              css={cssButton}
              variant="contained"
              color="secondary"
              href={valueObj.url}
              target="_blank"
            >
              公式
            </Button>
          </div>
        );
        
      } else if (valueObj.type === 'Other') {
        
        codeArr.push(
          <div
            css={cssButtonBox}
            key={index}
          >
            <Button
              css={cssButton}
              variant="contained"
              color="secondary"
              href={valueObj.url}
              target="_blank"
            >
              {valueObj.label}
            </Button>
          </div>
        );
        
      } else if (valueObj.type === 'Twitter') {
        
        codeArr.push(
          <div
            css={cssBox}
            key={index}
          >
            <a href={valueObj.url} target="_blank">
              <img src="/static/img/common/social/twitter@2x.png" width="20" height="20" />
            </a>
          </div>
        );
        
      } else if (valueObj.type === 'Facebook') {
        
        codeArr.push(
          <div
            css={cssBox}
            key={index}
          >
            <a href={valueObj.url} target="_blank">
              <img src="/static/img/common/social/facebook@2x.png" width="20" height="20" />
            </a>
          </div>
        );
        
      } else if (valueObj.type === 'YouTube') {
        
        codeArr.push(
          <div
            css={cssBox}
            key={index}
          >
            <a href={valueObj.url} target="_blank">
              <img src="/static/img/common/social/youtube@2x.png" width="20" height="20" />
            </a>
          </div>
        );
        
      } else if (valueObj.type === 'Steam') {
        
        codeArr.push(
          <div
            css={cssBox}
            key={index}
          >
            <a href={valueObj.url} target="_blank">
              <img src="/static/img/common/social/steam@2x.png" width="20" height="20" />
            </a>
          </div>
        );
        
      }
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          display: flex;
          flex-flow: row nowrap;
          padding: 6px 10px 1px 10px;
        `}
      >
        {codeArr}
      </div>
    );
    
    
  }
  
};