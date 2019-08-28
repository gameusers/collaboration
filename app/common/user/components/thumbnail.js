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
    
    const { imagesAndVideosThumbnailObj } = this.props;
    
    
    
    // --------------------------------------------------
    //   src & srcSet
    // --------------------------------------------------
    
    let src = lodashGet(imagesAndVideosThumbnailObj, ['arr', 0, 'src'], '');
    const srcSet = lodashGet(imagesAndVideosThumbnailObj, ['arr', 0, 'srcSet'], '');
    
    
    // --------------------------------------------------
    //   src none
    // --------------------------------------------------
    
    if (!src) {
      src = '/static/img/common/thumbnail/none.svg';
    }
    
    
    // --------------------------------------------------
    //   component - img
    // --------------------------------------------------
    
    const component =
      <img
        css={css`
          border-radius: 6px;
          width: 44px;
        `}
        src={src}
        srcSet={srcSet}
      />
    ;
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        {component}
      </React.Fragment>
    );
    
  }
  
};