// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import Avatar from 'material-ui/Avatar';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';

import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';

import IconNotifications from '@material-ui/icons/Notifications';
import IconSearch from '@material-ui/icons/Search';
import IconPerson from '@material-ui/icons/Person';
import IconEject from '@material-ui/icons/Eject';

import withRoot from '../lib/material-ui/withRoot';

// import { InputGroup as InputGroupBS, InputGroupAddon as InputGroupAddonBS, InputGroupText as InputGroupTextBS, Input as InputBS } from 'reactstrap';



// --------------------------------------------------
//   Material UI を使うときは styled-components でスタイルシートを書いてください
//   設定方法がわからないため、現状 Material UI だけこの書き方になります
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------


const IconButtonHeaderTopBell = styled(IconButton)`
  margin: 0 0 0 0 !important;
  padding: 0 !important;
  top: 5px !important;
  left: 5px !important;
`;

const BadgeHeaderTopBell = styled(Badge)`
  // margin: 3px 0 0 0 !important;
  // padding: 0 !important;
  color: black;
  // top: 14px !important;
  // left: 0 !important;
`;

const TextFieldHeaderTopSearch = styled(TextField)`
  width: 70% !important;
`;

const ButtonHeaderTopMenu = styled(Button)`
  margin: 0 10px 0 0 !important;
  padding: 0 !important;
  // background-color: pink !important;
`;

const IconButtonHeaderTopThumbnail = styled(IconButton)`
  top: 2px !important;
  right: 14px !important;
`;

const AvatarHeaderTop = styled(Avatar)`
  // margin: 5px 10px 0 0 !important;
  padding: 0 !important;
  // background-color: pink !important;
`;

const ButtonHeaderBottomMenu = styled(Button)`
  color: white !important;
  margin: 0 0 0 0 !important;
  padding: 6px !important;
  // background-color: pink !important;
`;

const MenuHeaderTopLoginMenu = styled(Menu)`
  position: fixed !important;
  top: 10p !importantx;
  right: 10px !important;
  // background-color: pink !important;
`;

const ListItemIconHeaderTopLoginMenu = styled(ListItemIcon)`
  margin: 0 8px 0 0 !important;
  padding: 0 !important;
`;

const ListItemTextHeaderTopLoginMenu = styled(ListItemText)`
  margin: 0 8px 0 0 !important;
  padding: 0 !important;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores') @observer
class Component extends React.Component {
  
  constructor(props) {
    super(props);
    // console.log(props.stores);
  }

  render() {
    return (
      <div>
        
        {/* Head 内部のタグをここで追記する */}
        <Head>
          <title>タイトル</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        
        
        {/* ヘッダー */}
        <header>
          
          {/* トップメニュー */}
          <div className="header-top">
          
            {/* ロゴ */}
            <div className="header-top-logo">
              <img src="https://gameusers.org/assets/img/common/gameusers_logo.png" width="138px" height="43" />
            </div>
            
            {/* ベル・通知 */}
            <IconButtonHeaderTopBell>
              <BadgeHeaderTopBell badgeContent={4} color="primary">
                <IconNotifications />
              </BadgeHeaderTopBell>
            </IconButtonHeaderTopBell>
            
            {/* 検索フォーム */}
            <div className="header-top-search">
              <TextFieldHeaderTopSearch
                // id="input-with-icon-textfield"
                placeholder="ゲーム、コミュニティを検索"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            
            
            
            {/* メニュー */}
            {/*<ButtonHeaderTopMenu>
              <IconPerson />
              プレイヤー
            </ButtonHeaderTopMenu>*/}
            
            {/*<ButtonHeaderTopMenu>
              <IconExitToApp />
              ログイン
            </ButtonHeaderTopMenu>*/}
            
            <IconButtonHeaderTopThumbnail
              onClick={this.props.stores.header.loginMenuOpen}
            >
              <AvatarHeaderTop
                alt="ユーザー1"
                src="https://gameusers.org/assets/img/user/1/thumbnail.jpg"
              />
            </IconButtonHeaderTopThumbnail>
            
            <MenuHeaderTopLoginMenu
              // id="simple-menu"
              anchorEl={this.props.stores.header.loginMenuAnchorEl}
              open={this.props.stores.header.loginMenuStatus}
              onClose={this.props.stores.header.loginMenuClose}
            >
              <MenuItem onClick={this.props.stores.header.loginMenuClose}>
                <ListItemIconHeaderTopLoginMenu>
                  <IconPerson />
                </ListItemIconHeaderTopLoginMenu>
                <ListItemTextHeaderTopLoginMenu inset primary="プレイヤー" />
              </MenuItem>
              
              <MenuItem onClick={this.props.stores.header.loginMenuClose}>
                <ListItemIconHeaderTopLoginMenu>
                  <IconEject />
                </ListItemIconHeaderTopLoginMenu>
                <ListItemTextHeaderTopLoginMenu inset primary="ログアウト" />
              </MenuItem>
            </MenuHeaderTopLoginMenu>
            
          </div>
          
          {/* ヒーローイメージ（各ゲームの大きな画像） */}
          <div>
            <img src="https://gameusers.org/assets/img/bbs_uc/reply/1726/image_1.jpg?1524229992" width="100%" />
          </div>
          
          {/* 最下部メニュー */}
          <div className="header-bottom-menu">
          
            <ButtonHeaderBottomMenu>
              フィード
            </ButtonHeaderBottomMenu>
            
            <ButtonHeaderBottomMenu>
              コミュニティ
            </ButtonHeaderBottomMenu>
              
            <ButtonHeaderBottomMenu>
              Wiki
            </ButtonHeaderBottomMenu>
            
          </div>
        
        </header>
        
        
        {/* コンテンツ */}
        {this.props.children}
        
        
        
        <Button
          onClick={this.props.stores.header.loginMenuClick}
        >
          テスト
        </Button>
        
        
            
      
        
        
        {/* フッター */}
        {/*<footer>
          {'Footer'}
        </footer>*/}
        
        
        
        <style jsx>{`
        
          header {
            display: flex !important;
            flex-direction: column !important;
          }
          
          .header-top {
            display: flex !important;
            flex-direction: row !important;
          }
          
          .header-top-logo {
            margin: 2px 0 0 10px;
            // background-color: green;
          }
          
          .header-top-search {
            display: flex !important;
            flex-grow: 1 !important;
            justify-content: center !important;
            margin: 8px 0 0 0;
            // background-color: green;
          }
          
          .header-top-menu {
            // height: 60px;
            justify-content: center;
            margin-left: auto !important;
          }
          
          .header-bottom-menu {
            display: flex !important;
            flex-direction: row !important;
            justify-content: center;
            height: 50px;
            background-color: #25283D;
          }
          
          
        
          .test-class {
            color: blue;
          }
          
        `}</style>
        
      </div>
    );
  }
  
};

export default withRoot(Component);