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
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Drawer from '@material-ui/core/Drawer';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores } = this.props;
    
    const drawerOpen = lodashGet(stores, ['layout', 'drawerOpen'], false);
    const handleDrawerClose = lodashGet(stores, ['layout', 'handleDrawerClose'], () => {});
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
      >
        <div
          css={css`
            width: 500px;
            
            @media screen and (max-width: 480px) {
              width: 300px;
            }
            
            @media screen and (max-width: 320px) {
              width: 280px;
            }
          `}
        >
          {this.props.children}
        </div>
      </Drawer>
    );
    
  }
  
};