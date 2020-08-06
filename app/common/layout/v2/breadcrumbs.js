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

import Link from 'next/link';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

// import lodashGet from 'lodash/get';
// import lodashSet from 'lodash/set';
// import lodashThrottle from 'lodash/throttle';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';


// ---------------------------------------------
//   Material UI / Icon
// ---------------------------------------------

import IconHome from '@material-ui/icons/Home';
import IconLogin from '@material-ui/icons/ExitToApp';
import IconLogout from '@material-ui/icons/Eject';
import IconMail from '@material-ui/icons/MailOutline';
import IconLock from '@material-ui/icons/Lock';

import IconGames from '@material-ui/icons/Games';
import IconUCList from '@material-ui/icons/MenuBook';
import IconUserCommunity from '@material-ui/icons/SupervisedUserCircle';
import IconMembers from '@material-ui/icons/SentimentSatisfiedAlt';
import IconUser from '@material-ui/icons/Person';
import IconFollow from '@material-ui/icons/FilterNone';
import IconSetting from '@material-ui/icons/Settings';

import IconForum from '@material-ui/icons/Forum';
import IconDescription from '@material-ui/icons/Description';
import IconIndividual from '@material-ui/icons/DoubleArrow';
import IconSearch from '@material-ui/icons/Search';






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
    
    arr = [],
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Component
  // --------------------------------------------------
  
  const componentsArr = [];
  
  for (const [index, valueObj] of arr.entries()) {
    
    
    // --------------------------------------------------
    //   Icon & Anchor Text
    // --------------------------------------------------
    
    let icon = '';
    let anchorText = '';
    
    
    
    
    // --------------------------------------------------
    //   - Login
    // --------------------------------------------------
    
    if (valueObj.type === 'login') {
      
      icon = <IconLogin fontSize="small" />;
      anchorText = 'ログイン';
      
      
    } else if (valueObj.type === 'login/reset-password' || valueObj.type === 'confirm/reset-password') {
      
      icon = <IconLock fontSize="small" />;
      anchorText = 'パスワード再設定';
      
    
    // --------------------------------------------------
    //   - Logout
    // --------------------------------------------------
    
    } else if (valueObj.type === 'logout') {
      
      icon = <IconLogout fontSize="small" />;
      anchorText = 'ログアウト';
      
      
    // --------------------------------------------------
    //   - 確認 / メールアドレス
    // --------------------------------------------------
    
    } else if (valueObj.type === 'confirm/email') {
      
      icon = <IconMail fontSize="small" />;
      anchorText = 'メールアドレス確認';
    
    
    // --------------------------------------------------
    //   - Game Community
    // --------------------------------------------------
    
    } else if (valueObj.type === 'gc') {
      
      icon = <IconGames fontSize="small" />;
      anchorText = valueObj.anchorText;
      
    } else if (valueObj.type === 'gc/forum' || valueObj.type === 'uc/forum') {
      
      icon = <IconForum fontSize="small" />;
      anchorText = 'フォーラム';
      
    } else if (valueObj.type === 'gc/rec') {
      
      icon = <IconDescription fontSize="small" />;
      anchorText = '募集';
      
    } else if (valueObj.type === 'gc/forum/individual' || valueObj.type === 'gc/rec/individual' || valueObj.type === 'uc/forum/individual') {
      
      icon = <IconIndividual fontSize="small" />;
      anchorText = valueObj.anchorText;
      
    } else if (valueObj.type === 'gc/rec/search') {
      
      icon = <IconSearch fontSize="small" />;
      anchorText = '検索';
      
    } else if (valueObj.type === 'gc/follower') {
      
      icon = <IconFollow fontSize="small" />;
      anchorText = 'フォロワー';
      
      
    // --------------------------------------------------
    //   - User Community
    // --------------------------------------------------
      
    } else if (valueObj.type === 'uc') {
      
      icon = <IconUCList fontSize="small" />;
      anchorText = 'ユーザーコミュニティ';
      
    } else if (valueObj.type === 'uc/index') {
      
      icon = <IconUserCommunity fontSize="small" />;
      anchorText = valueObj.anchorText;
      
    } else if (valueObj.type === 'uc/members') {
      
      icon = <IconMembers fontSize="small" />;
      anchorText = 'メンバー';
    
    
    // --------------------------------------------------
    //   - User
    // --------------------------------------------------
      
    } else if (valueObj.type === 'ur') {
      
      icon = <IconUser fontSize="small" />;
      anchorText = 'ユーザー';
      
    } else if (valueObj.type === 'ur/follow') {
      
      icon = <IconFollow fontSize="small" />;
      anchorText = 'フォロー';
      
    } else if (valueObj.type === 'ur/setting') {
      
      icon = <IconSetting fontSize="small" />;
      anchorText = 'ユーザー設定';
      
    }
    
    
    
    
    // --------------------------------------------------
    //   push
    // --------------------------------------------------
    
    componentsArr.push(
      <div
        css={css`
          display: flex;
          flex-flow: row wrap;
        `}
        key={`breadcrumbs-${index}`}
      >
        
        {icon}
        
        <div
          css={css`
            font-size: 14px;
            margin: 0 0 0 4px;
          `}
        >
          
          {valueObj.href && valueObj.as ?
            
            <Link href={valueObj.href} as={valueObj.as}>
              <a>
                <span
                  css={css`
                    // color: rgba(0, 0, 0, 0.54);
                    color: rgba(0, 0, 0, 0.7);
                    cursor: pointer;
                  `}
                >
                  {anchorText}
                </span>
              </a>
            </Link>
            
          :
          
            <div
              css={css`
                font-size: 14px;
                font-weight: bold;
                color: rgba(0, 0, 0, 0.87);
                margin: 0 0 0 4px;
              `}
            >
              {anchorText}
            </div>
            
          }
          
        </div>
        
      </div>
    );
    
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/layout/v2/components/breadcrumbs.js
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Paper
      css={css`
        margin: 0 0 16px 0;
        padding: 10px 12px;
      `}
    >
      
      
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        
        
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
          `}
        >
          
          <IconHome fontSize="small" />
          
          <div
            css={css`
              font-size: 14px;
              cursor: pointer;
              margin: 0 0 0 4px;
            `}
          >
            
            <Link href={'/'} as={'/'}>
              <a>
                <span
                  css={css`
                    color: rgba(0, 0, 0, 0.7);
                    cursor: pointer;
                  `}
                >
                  Game Users
                </span>
              </a>
            </Link>
            
          </div>
          
        </div>
        
        
        {componentsArr}
        
        
      </Breadcrumbs>
      
      
    </Paper>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;