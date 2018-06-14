// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import styled from 'styled-components';
// import Link from 'next/link';
// import Head from 'next/head';
import { inject, observer } from 'mobx-react';
// import { VelocityComponent, VelocityTransitionGroup } from 'velocity-react';
// import isMobile from 'ismobilejs';

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

import HeroImage from '../header/hero-image';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Header = styled.header`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const HeaderTop = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 100%;
  position: -webkit-sticky;
  position: sticky;
  
  top: 0;
  z-index: 1200;
`;

const HeaderTopLogo = styled.div`
  margin: 2px 0 0 10px;
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




const IconButtonTopBell = styled(IconButton)`
  top: 5px !important;
  left: 5px !important;
  
  @media screen and (max-width: 480px) {
    width: 26px !important;
    left: 0 !important;
  }
`;

const BadgeTopBell = styled(Badge)`
  color: black !important;
`;

const HeaderTopSearch = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  padding: 8px 0 0 10px;
  // background-color: red;
  max-width: 63%;
  margin-left: auto !important;
`;

const TextFieldTopSearch = styled(TextField)`
  width: 80% !important;
`;

const ButtonTopMenu = styled(Button)`
  margin: 0 10px 0 0 !important;
  padding: 0 !important;
  // background-color: pink !important;
`;

const IconButtonTopThumbnail = styled(IconButton)`
  top: 2px !important;
  right: 8px !important;
  margin-left: auto !important;
  // background-color: pink !important;
`;

const AvatarTop = styled(Avatar)`
  // margin: 5px 10px 0 0 !important;
  padding: 0 !important;
  // background-color: pink !important;
`;

const MenuTopLoginMenu = styled(Menu)`
  position: fixed !important;
  top: 10p !importantx;
  right: 10px !important;
  // background-color: pink !important;
`;

const ListItemIconTopLoginMenu = styled(ListItemIcon)`
  margin: 0 8px 0 0 !important;
  padding: 0 !important;
`;

const ListItemTextTopLoginMenu = styled(ListItemText)`
  margin: 0 8px 0 0 !important;
  padding: 0 !important;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores') @observer
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
    //   Return
    // --------------------------------------------------
    
    return (
      <Header>
          
        {/* トップメニュー */}
        <HeaderTop>
        
          {/* ロゴ */}
          <HeaderTopLogo />
          
          {/* ベル・通知 */}
          <IconButtonTopBell onClick={stores.header.notificationDialogOpenFunction}>
            <BadgeTopBell badgeContent={4} color="primary">
              <IconNotifications />
            </BadgeTopBell>
          </IconButtonTopBell>
          
          {/* 検索フォーム */}
          <HeaderTopSearch>
            <TextFieldTopSearch
              placeholder="ゲーム、コミュニティを検索"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch />
                  </InputAdornment>
                ),
              }}
            />
          </HeaderTopSearch>
          
          
          {/* メニュー */}
          <IconButtonTopThumbnail
            onClick={stores.header.loginMenuOpenFunction}
          >
            <AvatarTop
              alt="ユーザー1"
              src="https://gameusers.org/assets/img/user/1/thumbnail.jpg"
            />
          </IconButtonTopThumbnail>
          
          <MenuTopLoginMenu
            anchorEl={stores.header.loginMenuAnchorEl}
            open={stores.header.loginMenuOpen}
            onClose={stores.header.loginMenuCloseFunction}
          >
            <MenuItem onClick={stores.header.loginMenuCloseFunction}>
              <ListItemIconTopLoginMenu>
                <IconPerson />
              </ListItemIconTopLoginMenu>
              <ListItemTextTopLoginMenu inset primary="プレイヤー" />
            </MenuItem>
            
            <MenuItem onClick={stores.header.loginMenuCloseFunction}>
              <ListItemIconTopLoginMenu>
                <IconEject />
              </ListItemIconTopLoginMenu>
              <ListItemTextTopLoginMenu inset primary="ログアウト" />
            </MenuItem>
          </MenuTopLoginMenu>
          
        </HeaderTop>
        
        
        {/* ヒーローイメージ（各ゲームの大きな画像） */}
        <HeroImage />
        
        
        {/* 通知ダイアログ */}
        <Dialog
          fullScreen
          open={stores.header.notificationDialogOpen}
          onClose={stores.header.notificationDialogCloseFunction}
          // transition={Transition}
        >
          <AppBar>
            <Toolbar>
              <IconButton color="inherit" onClick={stores.header.notificationDialogCloseFunction} aria-label="Close">
                <IconClose />
              </IconButton>
              <Typography variant="title" color="inherit">
                Notifications
              </Typography>
              <Button color="inherit" onClick={stores.header.notificationDialogCloseFunction}>
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
        
      </Header>
    );
  }
  
};