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

import SimpleIcons from 'simple-icons-react-component';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconPublic from '@material-ui/icons/Public';






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
    
    arr,
    
  } = props;
  
  
  
  
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
    
    if (valueObj.type === 'Other') {
      
      componentsArr.push(
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
      
      componentsArr.push(
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
  
  
  // --------------------------------------------------
  //   Component
  // --------------------------------------------------
  
  let component = '';
  
  if (componentsArr.length > 0) {
    
    component =
      <div
        css={css`
          display: flex;
          flex-flow: row wrap;
        `}
      >
        
        {componentsArr}
        
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
      {component}
      
      
    </div>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;