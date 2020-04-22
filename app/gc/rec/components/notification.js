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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import IconButton from '@material-ui/core/IconButton';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconAlarm from '@material-ui/icons/Alarm';
import IconHelpOutline from '@material-ui/icons/HelpOutline';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeGcRecruitment')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const {
      
      stores,
      storeGcRecruitment,
      intl,
      pathArr,
      notification,
      
    } = this.props;
    
    
    const {
      
      dataObj,
      handleEdit,
      
    } = storeGcRecruitment;
    
    
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (notification === '') {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const showNotificationExplanation = lodashGet(dataObj, [...pathArr, 'showNotificationExplanation'], false);
    
    
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    const component = `プッシュ通知`;
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/gc/rec/components/notification.js
    // `);
    
    // console.log(chalk`
    //   notification: {green ${notification}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          margin: 4px 0 0 0;
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
          <IconAlarm
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
            通知方法:
          </h3>
          
          
          {/* 日数 */}
          <div
            css={css`
              font-size: 14px;
              margin: 2px 0 0 8px;
            `}
          >
            {component}
          </div>
          
          
          {/* 解説 */}
          <IconButton
            css={css`
              && {
                margin: 0 0 0 8px;
                padding: 0;
              }
            `}
            color="primary"
            aria-label="Show Notification Explanation"
            onClick={() => handleEdit({
              pathArr: [...pathArr, 'showNotificationExplanation'],
              value: !showNotificationExplanation,
            })}
          >
            <IconHelpOutline />
          </IconButton>
          
          
        </div>
        
        
        
        
        {/* 解説 */}
        {showNotificationExplanation &&
          <p
            css={css`
              font-size: 12px;
              margin: 6px 0 0 0;
            `}
          >
            この投稿者はプッシュ通知を許可しています。コメントや返信が書き込まれると投稿者に通知が届くため、書き込みに気づきやすくなります。
          </p>
        }
        
        
      </div>
    );
    
  }
  
});