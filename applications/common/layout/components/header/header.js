// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';

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
import NavSub from '../header/nav-sub';



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
  cursor: pointer;
  
  @media screen and (max-width: 480px) {
    width: 30px;
    min-width: 30px;
    height: 43px;
    background-image: url('/static/img/common/logo-mobile.png');
  }
`;



const IconButtonTopBell = styled(IconButton)`
  && {
    top: 5px;
    left: 5px;
    
    @media screen and (max-width: 480px) {
      width: 26px;
      left: 0;
    }
  }
`;

const BadgeTopBell = styled(Badge)`
  && {
    color: black;
  }
`;

const HeaderTopSearch = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  padding: 8px 0 0 10px;
  max-width: 63%;
  margin-left: auto !important;
`;

const TextFieldTopSearch = styled(TextField)`
  && {
    width: 80%;
  }
`;

const ButtonTopMenu = styled(Button)`
  && {
    margin: 0 10px 0 0;
    padding: 0;
  }
`;

const IconButtonTopThumbnail = styled(IconButton)`
  && {
    top: 2px;
    right: 8px;
    margin-left: auto;
  }
`;

const AvatarTop = styled(Avatar)`
  && {
    margin:0;
    padding: 0;
  }
`;

const MenuTopLoginMenu = styled(Menu)`
  && {
    position: fixed;
    top: 10p;
    right: 10px;
  }
`;

const ListItemIconTopLoginMenu = styled(ListItemIcon)`
  && {
    margin: 0 8px 0 0;
    padding: 0;
  }
`;

const ListItemTextTopLoginMenu = styled(ListItemText)`
  && {
    margin: 0 8px 0 0;
    padding: 0;
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
    
    // const historyStateArr = stores.layout.historyStateArr[0];
    
    
    
    // --------------------------------------------------
    //   ナビゲーション - フォロー＆コミュニティ参加用を表示するかどうか
    // --------------------------------------------------
    
    let showNavSub = false;
    //　一時しのぎに表示しないコード
    if ('userCommunity' in stores) {
      showNavSub = true;
    }
    
    // if (historyStateArr && historyStateArr.param1 === 'uc' && historyStateArr.param2) {
    //   showNavSub = true;
    // }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Header>
          
        {/* トップメニュー */}
        <HeaderTop>
        
          {/* ロゴ */}
          <Link prefetch href="/">
            <HeaderTopLogo />
          </Link>
          
          {/* ベル・通知 */}
          <IconButtonTopBell onClick={stores.layout.handleHeaderNotificationDialogOpen}>
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
            onClick={stores.layout.handleHeaderLoginMenuOpen}
          >
            <AvatarTop
              alt="ユーザー1"
              src="https://gameusers.org/assets/img/user/1/thumbnail.jpg"
            />
          </IconButtonTopThumbnail>
          
          <MenuTopLoginMenu
            anchorEl={stores.layout.headerLoginMenuAnchorEl}
            open={stores.layout.headerLoginMenuOpen}
            onClose={stores.layout.handleHeaderLoginMenuClose}
          >
            <MenuItem onClick={stores.layout.handleHeaderLoginMenuClose}>
              <ListItemIconTopLoginMenu>
                <IconPerson />
              </ListItemIconTopLoginMenu>
              <ListItemTextTopLoginMenu inset primary="プレイヤー" />
            </MenuItem>
            
            <MenuItem onClick={stores.layout.handleHeaderLoginMenuClose}>
              <ListItemIconTopLoginMenu>
                <IconEject />
              </ListItemIconTopLoginMenu>
              <ListItemTextTopLoginMenu inset primary="ログアウト" />
            </MenuItem>
          </MenuTopLoginMenu>
          
        </HeaderTop>
        
        
        
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
        
      </Header>
    );
  }
  
};