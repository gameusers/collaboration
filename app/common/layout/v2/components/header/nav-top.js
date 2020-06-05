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

import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useSpring, animated } from 'react-spring';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashThrottle from 'lodash/throttle';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconLogin from '@material-ui/icons/ExitToApp';
import IconNotifications from '@material-ui/icons/Notifications';
import IconSearch from '@material-ui/icons/Search';
import IconPerson from '@material-ui/icons/Person';
import IconEject from '@material-ui/icons/Eject';


// ---------------------------------------------
//   Contexts
// ---------------------------------------------

import { ContextLoginUser } from 'app/common/context/user.js';






// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const stylesObj = {
  
  paper: {
    top: 0,
    right: 0,
    marginTop: 14,
    marginRight: 14,
  },
  
};






// --------------------------------------------------
//   Components
// --------------------------------------------------

/**
 * react-spring
 * 参考：https://www.react-spring.io/
 */
const Container = ({ children, showNavTop }) => {
  
  // console.log(chalk`
  //   showNavTop: {green ${showNavTop}}
  // `);
  
  const props = useSpring({
    transform: showNavTop ? 'translateY(0px)' : 'translateY(-53px)',
    config: { duration: 250 },
  });
  
  return <animated.header
      css={css`
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        background-color: white;
        width: 100%;
        height: 53px;
        position: sticky;
        top: 0;
        z-index: 1001;
      `}
      style={props}
    >
      {children}
    </animated.header>;
  
};




/**
 * 
 */
const Component = (props) => {
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const contextObj = useContext(ContextLoginUser);
  const [showNavTop, setShowNavTop] = useState(true);
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  
  
  useEffect(() => {
    
    // console.log('useEffect');
    
    let scrollYOffset = 0;
    let navTopHeight = 53;
    
    
    // --------------------------------------------------
    //   handleScroll
    // --------------------------------------------------
    
    const handleScroll = lodashThrottle(() => {
      
      
      // console.log('BBB');
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const scrollY = window.scrollY;
      let scrollUp = false;
      
      // const headerHeroImageHeight = lodashGet(this.props, ['stores', 'layout', 'headerHeroImageHeight'], 0);
      
      // const showNavTopOld = lodashGet(this.props, ['stores', 'layout', 'showNavTop'], true);
      // const lowerNavMainOld = lodashGet(this.props, ['stores', 'layout', 'lowerNavMain'], false);
      // const lowerSidebarOld = lodashGet(this.props, ['stores', 'layout', 'lowerSidebar'], false);
      
      let showNavTopNew = true;
      // let lowerNavMainNew = false;
      // let lowerSidebarNew = false;
      
      
      
      
      // ---------------------------------------------
      //   scrollY === 0 / スクロールしていない状態
      // ---------------------------------------------
      
      if (scrollY !== 0) {
        
        
        // ---------------------------------------------
        //   Scroll Up / Scroll Down
        // ---------------------------------------------
        
        if (scrollY > scrollYOffset) {
          
          scrollUp = false;
          
        } else {
          
          scrollUp = true;
          
        }
        
        
        // ---------------------------------------------
        //   ヒーローイメージの高さよりもスクロールが小さい場合（スクロールバーのノブが上の方にある場合）
        // ---------------------------------------------
        
        // if (headerHeroImageHeight < scrollY) {
          
          if (scrollUp) {
            
            showNavTopNew = true;
            
          } else {
            
            showNavTopNew = false;
            
          }
          
        // }
        
        
        // // ---------------------------------------------
        // //   上向きのスクロールで Navigation Top が表示中の場合、Navigation Main の位置を下げる
        // // ---------------------------------------------
        
        // if (this.navTopHeight + headerHeroImageHeight < scrollY) {
          
        //   if (scrollUp && showNavTopNew) {
        //     lowerNavMainNew = true;
        //   }
          
        //   // サイドバーの位置を下げる
        //   lowerSidebarNew = true;
          
        // }
        
        
      }
      
      
      // ---------------------------------------------
      //   過去のスクロール量を記録
      // ---------------------------------------------
      
      scrollYOffset = scrollY;
      
      
      
      
      setShowNavTop(showNavTopNew);
      
      
      // if (showNavTop !== showNavTopNew) {
      //   console.log(`CCC`);
      //   setShowNavTop(showNavTopNew);
      // }
      
      
      
      
      // // ---------------------------------------------
      // //   デバイスの横幅が狭い場合（スマホなど）はサイドバーの位置を下げない
      // // ---------------------------------------------
      
      // if (window.innerWidth <= 947) {
      //   lowerSidebarNew = false;
      // }
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/layout/components/header/nav-top.js - handleScroll
      // `);
      
      // console.log(chalk`
      //   scrollY: {green ${scrollY}}
      //   scrollUp: {green ${scrollUp}}
      //   showNavTopNew: {green ${showNavTopNew}}
      // `);
      
      // console.log(chalk`
      //   scrollY: {green ${scrollY}}
      //   this.navTopHeight: {green ${this.navTopHeight}}
      //   headerHeroImageHeight: {green ${headerHeroImageHeight}}
      //   scrollUp: {green ${scrollUp}}
      //   showNavTopNew: {green ${showNavTopNew}}
      //   lowerNavMainNew: {green ${lowerNavMainNew}}
      //   lowerSidebarNew: {green ${lowerSidebarNew}}
      // `);
      
      
      
      
      // // ---------------------------------------------
      // //   scrollTo が終わって次のスクロールの処理
      // // ---------------------------------------------
      
      // const scrollToEnd = lodashGet(this.props, ['stores', 'layout', 'scrollToEnd'], false);
      
      // // console.log(chalk`
      // //   scrollToEnd: {green ${scrollToEnd}}
      // // `);
      
      // if (scrollToEnd) {
        
      //   // console.log(chalk`
      //   //   Stop - lodashThrottle
      //   // `);
        
      //   // ---------------------------------------------
      //   //   コンテンツ量が少ない場合は Navigation Top を表示する
      //   // ---------------------------------------------
        
      //   if (showNavTopNew && !lowerNavMainNew && !lowerSidebarNew) {
          
      //     lodashSet(this.props, ['stores', 'layout', 'showNavTop'], true);
          
          
      //   // ---------------------------------------------
      //   //   コンテンツ量が多い場合は Navigation Top を非表示にする
      //   // ---------------------------------------------
          
      //   } else {
          
      //     lodashSet(this.props, ['stores', 'layout', 'showNavTop'], false);
          
      //   }
        
        
      //   // ---------------------------------------------
      //   //   Navigation Top & Sidebar の位置を下げる
      //   // ---------------------------------------------
        
      //   lodashSet(this.props, ['stores', 'layout', 'lowerNavMain'], false);
      //   // lodashSet(this.props, ['stores', 'layout', 'lowerSidebar'], false);
        
      //   // ページトップに戻ったときは、サイドバーを下げない
      //   if (scrollY === 0) {
          
      //     lodashSet(this.props, ['stores', 'layout', 'lowerSidebar'], false);
          
      //   } else {
          
      //     lodashSet(this.props, ['stores', 'layout', 'lowerSidebar'], true);
          
      //   }
        
        
      //   // ---------------------------------------------
      //   //   scrollTo 終了
      //   // ---------------------------------------------
        
      //   lodashSet(this.props, ['stores', 'layout', 'scrollToEnd'], false);
        
        
      //   // ---------------------------------------------
      //   //   処理停止 / ストアは更新しない
      //   // ---------------------------------------------
        
      //   return;
        
        
      // }
      
      
      
      
      // // ---------------------------------------------
      // //   setState
      // // ---------------------------------------------
      
      // if (showNavTopOld !== showNavTopNew) {
      //   lodashSet(this.props, ['stores', 'layout', 'showNavTop'], showNavTopNew);
      // }
      
      // if (lowerNavMainOld !== lowerNavMainNew) {
      //   lodashSet(this.props, ['stores', 'layout', 'lowerNavMain'], lowerNavMainNew);
      // }
      
      // if (lowerSidebarOld !== lowerSidebarNew) {
      //   lodashSet(this.props, ['stores', 'layout', 'lowerSidebar'], lowerSidebarNew);
      // }
      
      
    }, 100);
    
    
    
    
    // ---------------------------------------------
    //   EventListener: scroll
    // ---------------------------------------------
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    classes,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   loginUsersObj
  // --------------------------------------------------
  
  const userID = lodashGet(contextObj, ['loginUsersObj', 'userID'], '');
  
  const imagesAndVideosThumbnailArr = lodashGet(contextObj, ['loginUsersObj', 'cardPlayerObj', 'imagesAndVideosThumbnailObj', 'arr'], []);
  
  let thumbnailSrc = '/img/common/thumbnail/none.svg';
  let thumbnailSrcSet = '';
  
  if (imagesAndVideosThumbnailArr.length > 0) {
    
    thumbnailSrc = lodashGet(imagesAndVideosThumbnailArr, [0, 'src'], '/img/common/thumbnail/none.svg');
    thumbnailSrcSet = lodashGet(imagesAndVideosThumbnailArr, [0, 'srcSet'], '');
    
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----- contextObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(contextObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Container
      showNavTop={showNavTop}
    >
      
      
      {/* ロゴ */}
      <Link href="/">
        <div
          css={css`
            width: 138px;
            height: 43px;
            background-image: url('/img/common/header/logo.png');
            cursor: pointer;
            margin: 0 0 0 6px;
            
            @media screen and (max-width: 480px) {
              width: 30px;
              min-width: 30px;
              height: 43px;
              background-image: url('/img/common/header/logo-mobile.png');
              margin: 0 0 0 10px;
            }
          `}
        />
      </Link>
      
      
      
      {/* ベル・通知 */}
        {/*{userID &&
          <IconButton
            css={css`
              && {
                margin: 6px 0 0 6px !important;
                padding: 6px !important;
                
                @media screen and (max-width: 480px) {
                  width: 26px;
                }
              }
            `}
            onClick={stores.layout.handleHeaderNotificationDialogOpen}
          >
            <Badge
              css={css`
                color: black;
              `}
              badgeContent={5}
              color="primary"
            >
              <IconNotifications />
            </Badge>
          </IconButton>
        }*/}
        
        
        {/* 検索フォーム */}
        {/*<div
          css={css`
            display: flex;
            flex-grow: 1;
            justify-content: center;
            margin-left: auto;
          `}
        >
          <TextField
            css={css`
              && {
                width: 90%;
              }
            `}
            placeholder="検索"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch />
                </InputAdornment>
              ),
            }}
            inputProps={{
              autoComplete: "off"
            }}
          />
        </div>*/}
        
        
        
        
        {/*  右寄せ（検索フォームを非表示にした場合、代わりにこのタグで右寄せにしている） */}
        <div
          css={css`
            display: flex;
            // flex-grow: 1;
            justify-content: flex-end;
            margin-left: auto;
          `}
        >
          
          
          {/* サムネイルまたはログインページへのリンク */}
          {userID
            ?
              
              <IconButton
                css={css`
                  && {
                    margin: 0 8px 0 auto;
                    padding: 0;
                  }
                `}
                onClick={() => setLoginMenuOpen(true)}
              >
                <Avatar
                  alt="ログインメニュー"
                  src={thumbnailSrc}
                  srcSet={thumbnailSrcSet}
                />
              </IconButton>
              
            :
              
              <Link href="/login">
                <a>
                  <div
                    css={css`
                      display: flex;
                      flex-direction: row;
                      color: #4000FF;
                      cursor: pointer;
                      white-space: nowrap;
                      margin: 0 16px 0 0;
                      
                      @media screen and (max-width: 480px) {
                        margin: 0 10px 0 0;
                      }
                    `}
                  >
                    <IconLogin
                      css={css`
                        && {
                          margin: 0 6px 0 0;
                        }
                      `}
                    /> ログイン
                  </div>
                </a>
              </Link>
              
          }
          
          
        </div>
        
        
        
        
        {/* ログインメニュー */}
        <Menu
          classes={{
            paper: classes.paper
          }}
          open={loginMenuOpen}
          onClose={() => setLoginMenuOpen(false)}
          disableAutoFocusItem={true}
          anchorReference="none"
        >
          
          
          <MenuItem onClick={() => setLoginMenuOpen(false)}>
            
            <ListItemIcon>
              <IconPerson />
            </ListItemIcon>
            
            
            <Link href={`/ur/[userID]/index?userID=${userID}`} as={`/ur/${userID}`}>
              <a
                css={css`
                  color: black;
                  text-decoration: none;
                  
                  &:hover {
                    text-decoration: none;
                  }
                `}
              >
                <ListItemText
                  css={css`
                    && {
                      margin: 0 8px 0 0;
                    }
                  `}
                  primary="ユーザー"
                />
              </a>
            </Link>
            
          </MenuItem>
          
          
          
          
          <MenuItem onClick={() => setLoginMenuOpen(false)}>
            
            <ListItemIcon>
              <IconEject />
            </ListItemIcon>
            
            
            <Link href="/logout">
              <a
                css={css`
                  color: black;
                  text-decoration: none;
                  
                  &:hover {
                    text-decoration: none;
                  }
                `}
              >
                <ListItemText
                  css={css`
                    && {
                      margin: 0 8px 0 0;
                    }
                  `}
                  primary="ログアウト"
                />
              </a>
            </Link>
            
          </MenuItem>
          
          
        </Menu>
        
    
    </Container>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default withStyles(stylesObj)(Component);