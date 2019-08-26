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
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import { useSpring, animated } from 'react-spring';
import lodashGet from 'lodash/get';
import lodashThrottle from 'lodash/throttle';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


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
//   react-spring
// --------------------------------------------------

const Container = ({ children, showNavTop, immediate }) => {
  
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




// --------------------------------------------------
//   Class
// --------------------------------------------------

@withStyles(stylesObj)
@inject('stores')
@observer
export default class extends React.Component {
  
  
  // _isMounted = false;
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // ---------------------------------------------
    //   State
    // ---------------------------------------------
    
    this.state = {
      showNavTop: true,
      immediate: true,
    };
    
    
    // ---------------------------------------------
    //   bind
    // ---------------------------------------------
    
    this.handleScroll = this.handleScroll.bind(this);
    
    
  }
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
    // --------------------------------------------------
    //   スクロールされる度に呼び出される関数を設定する / ヘッダーのアニメーション用
    // --------------------------------------------------
    
    this.scrollYOffset = 0;
    this.navTopHeight = 53;
    this.heroImageHeight = lodashGet(this.props, ['stores', 'layout', 'headerHeroImageHeight'], 0);
    
    window.addEventListener('scroll', this.handleScroll);
    
    
  }
  
  
  // --------------------------------------------------
  //   componentWillUnmount
  // --------------------------------------------------
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  
  
  // --------------------------------------------------
  //   handleScroll
  // --------------------------------------------------
  
  handleScroll = lodashThrottle(() => {
    
    const scrollY = window.scrollY;
    
    let scrollUp = false;
    let showNavTop = true;
    
    
    // ---------------------------------------------
    //   scrollY === 0
    // ---------------------------------------------
    
    if (scrollY !== 0) {
      
      
      // ---------------------------------------------
      //   Scroll Up / Scroll Down
      // ---------------------------------------------
      
      if (scrollY > this.scrollYOffset) {
        scrollUp = false;
      } else {
        scrollUp = true;
      }
      
      
      // ---------------------------------------------
      //   Show Navigation Top
      // ---------------------------------------------
      
      if (this.heroImageHeight < scrollY) {
        
        if (scrollUp) {
          showNavTop = true;
        } else {
          showNavTop = false;
        }
        
      }
    
    }
    
    
    this.scrollYOffset = scrollY;
    
    // console.log(chalk`
    //   scrollY: {green ${scrollY}}
    //   this.navTopHeight: {green ${this.navTopHeight}}
    //   this.heroImageHeight: {green ${this.heroImageHeight}}
    //   scrollUp: {green ${scrollUp}}
    //   showNavTop: {green ${showNavTop}}
    //   immediate: {green ${immediate}}
    // `);
    
    
    if (this.state.showNavTop !== showNavTop) {
      
      this.setState({
        showNavTop,
      });
      
    }
    
  }, 100);
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { classes, stores } = this.props;
    
    
    // --------------------------------------------------
    //   loginUsersObj
    // --------------------------------------------------
    
    const thumbnailSrc = lodashGet(stores, ['data', 'loginUsersObj', 'thumbnailObj', 'src'], '/static/img/common/thumbnail/none.svg');
    const thumbnailSrcSet = lodashGet(stores, ['data', 'loginUsersObj', 'thumbnailObj', 'srcSet'], '');
    const userID = lodashGet(stores, ['data', 'loginUsersObj', 'userID'], '');
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container
        showNavTop={this.state.showNavTop}
        immediate={this.state.immediate}
      >
        
        
        {/* ロゴ */}
        <Link href="/">
          <div
            css={css`
              width: 138px;
              height: 43px;
              background-image: url('/static/img/common/header/logo.png');
              cursor: pointer;
              margin: 0 0 0 6px;
              
              @media screen and (max-width: 480px) {
                width: 30px;
                min-width: 30px;
                height: 43px;
                background-image: url('/static/img/common/header/logo-mobile.png');
                margin: 0 0 0 10px;
              }
            `}
          />
        </Link>
        
        
        {/* ベル・通知 */}
        {userID &&
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
        }
        
        
        {/* 検索フォーム */}
        <div
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
        </div>
        
        
        
        
        {/* サムネイル */}
        {userID ? (
          <IconButton
            css={css`
              && {
                margin: 0 8px 0 auto;
                padding: 0;
              }
            `}
            onClick={stores.layout.handleHeaderLoginMenuOpen}
            // onClick={(eventObj) => stores.layout.handleHeaderLoginMenuOpen({ eventObj })}
          >
            <Avatar
              alt="ログインメニュー"
              src={thumbnailSrc}
              srcSet={thumbnailSrcSet}
            />
          </IconButton>
        ) : (
          <Link href="/login">
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
          </Link>
        )}
        
        
        
        
        {/* ログインメニュー */}
        <Menu
          classes={{
            paper: classes.paper
          }}
          open={stores.layout.headerLoginMenuOpen}
          onClose={stores.layout.handleHeaderLoginMenuClose}
          disableAutoFocusItem={true}
          anchorReference="none"
        >
          
          
          <MenuItem onClick={stores.layout.handleHeaderLoginMenuClose}>
            
            <ListItemIcon
              css={css`
                && {
                  margin: 0 8px 0 0;
                }
              `}
            >
              <IconPerson />
            </ListItemIcon>
            
            <Link href={`/ur/${userID}`}>
              <ListItemText
                css={css`
                  && {
                    margin: 0 8px 0 0;
                  }
                `}
                primary="プレイヤー"
              />
            </Link>
            
          </MenuItem>
          
          
          <MenuItem onClick={stores.layout.handleHeaderLoginMenuClose}>
            
            <ListItemIcon
              css={css`
                && {
                  margin: 0 8px 0 0;
                }
              `}
            >
              <IconEject />
            </ListItemIcon>
            
            <Link href="/logout">
              <ListItemText
                css={css`
                  && {
                    margin: 0 8px 0 0;
                  }
                `}
                primary="ログアウト"
              />
            </Link>
            
          </MenuItem>
          
          
        </Menu>
        
        
      </Container>
    );
    
  }
  
};