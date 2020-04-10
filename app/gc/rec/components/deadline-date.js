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
import { injectIntl } from 'react-intl';
import moment from 'moment';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconDescription from '@material-ui/icons/Description';
// import IconInformation from '@material-ui/icons/DoubleArrow';
import IconInformation from '@material-ui/icons/MenuBook';
// import IconInformation from '@material-ui/icons/School';



// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeGcRecruitment')
@observer
export default injectIntl(class extends React.Component {
  
  
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
    
    const {
      
      stores,
      intl,
      deadlineDate,
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    // if (!Array.isArray(publicInformationsArr) || publicInformationsArr.length === 0) {
    //   return null;
    // }
    
    
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    // const componentsArr = [];
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    // let datetimeCurrent = moment(stores.data.datetimeCurrent);
    // const datetimeDeadline = moment(deadlineDate);
    
    // if (datetimeDeadline.isAfter(datetimeCurrent)) {
    //   datetimeCurrent = datetimeDeadline;
    // }
    
    // const datetimeFromNow = datetimeDeadline.from(datetimeCurrent);
    
    // const datetimeFromNow = moment(deadlineDate).fromNow();
    
    // 日時の差をミリ秒で取得
    const diff = moment(deadlineDate).diff(moment(stores.data.datetimeCurrent));
    
    // duration オブジェクトを生成
    const duration = moment.duration(diff);
    
    // 締め切りまでの日数を取得（小数点切り捨て）
    const days = Math.floor(duration.asDays());
    
    let component = `残り ${days}日`;
    
    
    if (days === 0) {
      
      component = <span css={css` color: red; `}>残り {moment(deadlineDate).fromNow(true)}</span>;
      
    } else if (days < 0) {
      
      component = <span css={css` color: red; `}>締め切り</span>;
      
    }
    
    
    
    
    // const datetimeCurrent = moment(stores.data.datetimeCurrent);
    // const datetimeFromNow = moment(deadlineDate).from(datetimeCurrent).duration().days()
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/gc/rec/components/chip-category.js
    // `);
    
    // console.log(chalk`
    //   category: {green ${category}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          // border-top: 1px dashed #A4A4A4;
          margin: 24px 0 0 0;
          // padding: 12px 0 0 0;
        `}
      >
        
        
        <div
          css={css`
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
          `}
        >
          
          
          {/* Icon */}
          <IconDescription
            css={css`
              && {
                font-size: 24px;
              }
            `}
          />
          
          
          {/* Heading */}
          <h3
            css={css`
              margin: 2px 0 0 4px;
            `}
          >
            募集期限:
          </h3>
          
          
          {/* 日数 */}
          <div
            css={css`
              font-size: 14px;
              margin: 2px 0 0 12px;
            `}
          >
            {component}
          </div>
          
          
        </div>
        
        
      </div>
    );
    
  }
  
});