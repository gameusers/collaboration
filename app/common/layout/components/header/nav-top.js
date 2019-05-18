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
import styled from 'styled-components';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import {useSpring, animated} from 'react-spring';
import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

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
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// const Container = styled(animated.nav)`
//   display: flex;
//   flex-flow: row nowrap;
//   align-items: center;
  
//   background-color: white;
//   width: 100%;
//   height: 53px;
//   // position: fixed;
//   // position: -webkit-sticky;
//   position: sticky;
  
//   top: 0;
//   z-index: 1001;
// `;

// const Container = styled.nav`
//   display: flex;
//   flex-flow: row nowrap;
//   align-items: center;
  
//   background-color: white;
//   width: 100%;
//   height: 53px;
//   position: fixed;
//   transition: .3s cubic-bezier(.4, 0, .2, 1);
//   // position: -webkit-sticky;
//   // position: sticky;
  
//   top: 0;
//   z-index: 1001;
// `;

// const Container = styled.nav`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
  
//   background-color: white;
//   width: 100%;
//   height: 53px;
//   position: -webkit-sticky;
//   position: sticky;
  
//   top: 0;
//   z-index: 1000;
// `;


// ---------------------------------------------
//   Logo
// ---------------------------------------------

const Logo = styled.div`
  cursor: pointer;
  margin: 0 0 0 6px;
  
  width: 138px;
  height: 43px;
  background-image: url('/static/img/common/logo.png');
  
  @media screen and (max-width: 480px) {
    width: 30px;
    min-width: 30px;
    height: 43px;
    background-image: url('/static/img/common/logo-mobile.png');
  }
`;


// ---------------------------------------------
//   Bell
// ---------------------------------------------

const BellIconButton = styled(IconButton)`
  && {
    margin: 6px 0 0 6px;
    padding: 6px;
    
    @media screen and (max-width: 480px) {
      width: 26px;
    }
  }
`;

const BellBadge = styled(Badge)`
  && {
    color: black;
  }
`;


// ---------------------------------------------
//   Search
// ---------------------------------------------

const Search = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  
  max-width: 63%;
  margin-left: auto !important;
`;

const SearchTextField = styled(TextField)`
  && {
    width: 80%;
  }
`;


// ---------------------------------------------
//   Thumbnail / Login Menu
// ---------------------------------------------

const ThumbnailIconButton = styled(IconButton)`
  && {
    margin: 0 8px 0 auto;
    padding: 0;
  }
`;

const StyledAvatar = styled(Avatar)`
  && {
    
  }
`;

const LoginLinkBox = styled.div`
  display: flex;
  flex-direction: row;
  color: #4000FF;
  cursor: pointer;
  white-space: nowrap;
  margin: 0 16px 0 0;
  
  @media screen and (max-width: 480px) {
    margin: 0 10px 0 0;
  }
`;

const LoginLinkIcon = styled(IconLogin)`
  && {
    margin: 0 6px 0 0;
  }
`;


const LoginMenu = styled(Menu)`
  && {
    position: fixed;
    top: 10p;
    right: 10px;
  }
`;

const LoginMenuListItemIcon = styled(ListItemIcon)`
  && {
    margin: 0 8px 0 0;
  }
`;

const LoginMenuListItemText = styled(ListItemText)`
  && {
    margin: 0 8px 0 0;
  }
`;




// --------------------------------------------------
//   react-spring
// --------------------------------------------------

const Container = ({ children, headerNavTopShow }) => {
  
  const Header = styled(animated.header)`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    background-color: white;
    width: 100%;
    height: 53px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1001;
  `;
  
  const props = useSpring({
    transform: headerNavTopShow ? 'translateY(0px)' : 'translateY(-53px)'
  });
  
  return <Header style={props}>{children}</Header>;
  
};




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
    
    const { stores } = this.props;
    
    
    // --------------------------------------------------
    //   loginUsersObj
    // --------------------------------------------------
    
    const thumbnailSrc = lodashGet(stores, ['data', 'loginUsersObj', 'thumbnailObj', 'src'], '/static/img/common/thumbnail/none.svg');
    const thumbnailSrcSet = lodashGet(stores, ['data', 'loginUsersObj', 'thumbnailObj', 'srcSet'], '');
    const playerID = lodashGet(stores, ['data', 'loginUsersObj', 'playerID'], '');
    
    
    // --------------------------------------------------
    //   Component - Menu
    // --------------------------------------------------
    
    // const headerScrollUp = lodashGet(stores, ['layout', 'headerScrollUp'], false);
    const headerNavTopShow = lodashGet(stores, ['layout', 'headerNavTopShow'], true);
    
    
    // const Container = (props) => {
      
    //   const Nav = styled(animated.nav)`
    //     display: flex;
    //     flex-flow: row nowrap;
    //     align-items: center;
    //     background-color: white;
    //     width: 100%;
    //     height: 53px;
    //     position: sticky;
    //     top: 0;
    //     z-index: 1001;
    //   `;
      
    //   const style = useSpring({
    //     transform: 'translateY(0)',
    //     from: { transform: 'translateY(-100%)' }
    //     // opacity: 1,
    //     // from: { opacity: 0 }
    //   });
      
    //   return <Nav style={style}>{props.children}</Nav>;
      
    // };
    
    // const Container = styled.nav`
    //   display: flex;
    //   flex-flow: row nowrap;
    //   align-items: center;
      
    //   background-color: white;
    //   width: 100%;
    //   height: 53px;
      
    //   // position: fixed;
    //   // position: -webkit-sticky;
    //   position: sticky;
      
    //   // position: ${headerScrollUp ? 'sticky' : 'static'};
    //   // transition: .3s cubic-bezier(.4, 0, .2, 1);
    //   // transform: ${headerScrollUp ? 'translateY(-50%)' : 'translateY(0)'};
    //   top: 0;
    //   z-index: 1001;
    // `;
    
    // console.log(chalk`
    //   headerNavTopShow: {green ${headerNavTopShow}}
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container headerNavTopShow={headerNavTopShow}>
        
        
        {/* ロゴ */}
        <Link href="/">
          <Logo />
        </Link>
        
        
        {/* ベル・通知 */}
        <BellIconButton onClick={stores.layout.handleHeaderNotificationDialogOpen}>
          <BellBadge badgeContent={5} color="primary">
            <IconNotifications />
          </BellBadge>
        </BellIconButton>
        
        
        {/* 検索フォーム */}
        <Search>
          <SearchTextField
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
        </Search>
        
        
        
        
        {/* サムネイル */}
        { playerID ? (
          <ThumbnailIconButton
            onClick={stores.layout.handleHeaderLoginMenuOpen}
          >
            <StyledAvatar
              alt="ログインメニュー"
              src={thumbnailSrc}
              srcSet={thumbnailSrcSet}
            />
          </ThumbnailIconButton>
        ) : (
          <Link href="/login"><LoginLinkBox><LoginLinkIcon /> ログイン</LoginLinkBox></Link>
        )}
        
        
        
        
        {/* ログインメニュー */}
        <LoginMenu
          anchorEl={stores.layout.headerLoginMenuAnchorEl}
          open={stores.layout.headerLoginMenuOpen}
          onClose={stores.layout.handleHeaderLoginMenuClose}
        >
          
          
          <MenuItem onClick={stores.layout.handleHeaderLoginMenuClose}>
            
            <LoginMenuListItemIcon>
              <IconPerson />
            </LoginMenuListItemIcon>
            
            <Link href={`/pl/${playerID}`}>
              <LoginMenuListItemText inset primary="プレイヤー" />
            </Link>
            
          </MenuItem>
          
          
          <MenuItem onClick={stores.layout.handleHeaderLoginMenuClose}>
            
            <LoginMenuListItemIcon>
              <IconEject />
            </LoginMenuListItemIcon>
            
            <Link href="/logout">
              <LoginMenuListItemText inset primary="ログアウト" />
            </Link>
            
          </MenuItem>
          
        </LoginMenu>
        
        
      </Container>
    );
    
  }
  
};