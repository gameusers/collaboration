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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI / Icon
// ---------------------------------------------

import IconTabletAndroid from '@material-ui/icons/TabletAndroid';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Paragraph from '../../../layout/components/paragraph';




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
    
    const { tabletModel, tabletComment } = this.props;
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (
      !tabletModel &&
      !tabletComment
    ) {
      return null;
    }
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - モデル
    // --------------------------------------------------
    
    let componentModel = 'タブレット';
    
    if (tabletModel) {
      componentModel = `タブレット: ${tabletModel}`;
    }
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - コメント
    // --------------------------------------------------
    
    let componentComment = '';
    
    if (tabletComment) {
      
      componentComment =
        <div
          css={css`
            margin: 6px 0 0 0;
          `}
        >
          <Paragraph text={tabletComment} />
        </div>
      ;
      
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
          
          <IconTabletAndroid
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
            {componentModel}
          </h3>
          
        </div>
        
        
        {/* コメント */}
        {componentComment}
        
          
      </div>
    );
    
  }
  
};