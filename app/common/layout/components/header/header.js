// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
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


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconNotifications from '@material-ui/icons/Notifications';
import IconClose from '@material-ui/icons/Close';
import IconSearch from '@material-ui/icons/Search';
import IconPerson from '@material-ui/icons/Person';
import IconEject from '@material-ui/icons/Eject';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import HeroImage from '../header/hero-image';
import NavSub from '../header/nav-sub';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.header`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  background-color: white;
  width: 100%;
  height: 53px;
  position: -webkit-sticky;
  position: sticky;
  
  top: 0;
  z-index: 1200;
`;


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
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  

  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores } = this.props;
    
    
    // --------------------------------------------------
    //   ナビゲーション - フォロー＆コミュニティ参加用を表示するかどうか
    // --------------------------------------------------
    
    let showNavSub = false;
    
    //　一時しのぎに表示しないコード
    if ('userCommunity' in stores) {
      showNavSub = true;
    }
    
    
    // console.log(`
    //   ----- stores.data.usersLoginObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(stores.data.usersLoginObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- stores.data.usersObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(stores.data.usersObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
        
        
        {/* トップメニュー */}
        <Top>
          
          
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
            />
          </Search>
          
          
          {/* サムネイル */}
          <ThumbnailIconButton
            onClick={stores.layout.handleHeaderLoginMenuOpen}
          >
            <StyledAvatar
              alt="ユーザー1"
              src="https://gameusers.org/assets/img/user/1/thumbnail.jpg"
            />
          </ThumbnailIconButton>
          
          
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
              <LoginMenuListItemText inset primary="プレイヤー" />
            </MenuItem>
            
            <MenuItem onClick={stores.layout.handleHeaderLoginMenuClose}>
              <LoginMenuListItemIcon>
                <IconEject />
              </LoginMenuListItemIcon>
              <LoginMenuListItemText inset primary="ログアウト" />
            </MenuItem>
            
          </LoginMenu>
          
          
        </Top>
        
        
        
        
        {/* ヒーローイメージ（各ゲームの大きな画像） */}
        <HeroImage />
        
        
        
        
        {/* ナビゲーション - フォロー＆コミュニティ参加用 */}
        {showNavSub &&
          <NavSub />
        }
        
        
        
        
        {/* 通知ダイアログ */}
        <Dialog
          fullScreen
          open={stores.layout.headerNotificationDialogOpen}
          onClose={stores.layout.handleHeaderNotificationDialogClose}
        >
        
          <AppBar>
            <Toolbar>
              <IconButton color="inherit" onClick={stores.layout.handleHeaderNotificationDialogClose} aria-label="Close">
                <IconClose />
              </IconButton>
              <Typography variant="h6" color="inherit">
                Notifications
              </Typography>
              <Button color="inherit" onClick={stores.layout.handleHeaderNotificationDialogClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          
          <List>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Default notification ringtone" secondary="Tethys" />
            </ListItem>
          </List>
          
        </Dialog>
        
        
      </Container>
    );
  }
  
};