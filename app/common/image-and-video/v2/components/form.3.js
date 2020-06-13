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
import { useIntl } from 'react-intl';

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
import ButtonGroup from '@material-ui/core/ButtonGroup';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import FormPreview from './form-preview';
import FormImage from './form-image';
import FormVideo from './form-video';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateLayout } from 'app/@states/layout.js';






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

/**
 * Export Component
 */
const Component = (props) => {
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateLayout = ContainerStateLayout.useContainer();
  
  const { loadingObj } = stateLayout;
  
  const open = lodashGet(loadingObj, ['open'], false);
  const position = lodashGet(loadingObj, ['position'], 'left');
  
  
  
  
  // --------------------------------------------------
  //   ローディング中でない場合、空のコンポーネントを返す
  // --------------------------------------------------
  
  if (!open) {
    return null;
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/layout/v2/components/sidebar.js
  // `);
  
  // console.log(chalk`
  //   login: {green ${login}}
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
        position: fixed;
        bottom: 20px;
        margin: 0;
        padding: 0;
      `}
      style={position === 'left' ? { left: '50px' } : { right: '50px' }}
    >
      
      <div className="la-pacman">
      	<div />
      	<div />
      	<div />
      	<div />
      	<div />
      	<div />
      </div>
      
    </div>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;