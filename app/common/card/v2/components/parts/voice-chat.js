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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI / Icon
// ---------------------------------------------

import IconHeadsetMic from '@material-ui/icons/HeadsetMic';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Paragraph from 'app/common/layout/v2/components/paragraph.js';






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

/**
 * Export Component
 */
const Component = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    value,
    comment,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   必要な情報がない場合、空のコンポーネントを返す
  // --------------------------------------------------
  
  if (!comment) {
    return null;
  }
  
  
  
  
  // --------------------------------------------------
  //   できる / できない
  // --------------------------------------------------
  
  const text = value ? 'できる' : 'できない';
  
  
  
  
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
        
        <IconHeadsetMic
          css={css`
            && {
              font-size: 24px;
            }
          `}
        />
        
        
        <h3
          css={css`
            margin: 0 0 0 4px;
          `}
        >
          ボイスチャット: {text}
        </h3>
        
      </div>
      
      
      
      
      {/* Comment */}
      <div
        css={css`
          margin: 6px 0 0 0;
        `}
      >
        
        <Paragraph text={comment} />
        
      </div>
      
      
    </div>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;