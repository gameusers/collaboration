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
//   Function Components
// --------------------------------------------------

/**
 * 
 */
const Component = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    linkArr = [],
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Component
  // --------------------------------------------------
  
  let componentsArr = [];
  
  
  for (const [index, valueObj] of linkArr.entries()) {
    
    if (valueObj.type === 'Official') {
      
      componentsArr.push(
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
      
      componentsArr.push(
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
      
      componentsArr.push(
        <div
          css={cssBox}
          key={index}
        >
          <a href={valueObj.url} target="_blank">
            <img src="/img/common/social/twitter@2x.png" width="20" height="20" />
          </a>
        </div>
      );
      
    } else if (valueObj.type === 'Facebook') {
      
      componentsArr.push(
        <div
          css={cssBox}
          key={index}
        >
          <a href={valueObj.url} target="_blank">
            <img src="/img/common/social/facebook@2x.png" width="20" height="20" />
          </a>
        </div>
      );
      
    } else if (valueObj.type === 'YouTube') {
      
      componentsArr.push(
        <div
          css={cssBox}
          key={index}
        >
          <a href={valueObj.url} target="_blank">
            <img src="/img/common/social/youtube@2x.png" width="20" height="20" />
          </a>
        </div>
      );
      
    } else if (valueObj.type === 'Steam') {
      
      componentsArr.push(
        <div
          css={cssBox}
          key={index}
        >
          <a href={valueObj.url} target="_blank">
            <img src="/img/common/social/steam@2x.png" width="20" height="20" />
          </a>
        </div>
      );
      
    }
    
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/layout/v2/components/header/link-icons.js
  // `);
  
  // console.log(`
  //   ----- linkArr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(linkArr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
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
      {componentsArr}
    </div>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;