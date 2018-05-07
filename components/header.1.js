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
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';

import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import CloseIcon from '@material-ui/icons/Close';
// import Slide from 'material-ui/transitions/Slide';

import IconNotifications from '@material-ui/icons/Notifications';
import IconSearch from '@material-ui/icons/Search';
import IconPerson from '@material-ui/icons/Person';
import IconEject from '@material-ui/icons/Eject';

import withRoot from '../lib/material-ui/withRoot';



// --------------------------------------------------
//   Material UI を使うときは styled-components でスタイルシートを書いてください
//   設定方法がわからないため、現状 Material UI だけこの書き方になります
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const IconButtonTopBell = styled(IconButton)`
  margin: 0 0 0 0 !important;
  padding: 0 !important;
  top: 5px !important;
  left: 5px !important;
`;

const BadgeTopBell = styled(Badge)`
  // margin: 3px 0 0 0 !important;
  // padding: 0 !important;
  color: black;
  // top: 14px !important;
  // left: 0 !important;
`;

const TextFieldTopSearch = styled(TextField)`
  width: 70% !important;
`;

const ButtonTopMenu = styled(Button)`
  margin: 0 10px 0 0 !important;
  padding: 0 !important;
  // background-color: pink !important;
`;

const IconButtonTopThumbnail = styled(IconButton)`
  top: 2px !important;
  right: 14px !important;
`;

const AvatarTop = styled(Avatar)`
  // margin: 5px 10px 0 0 !important;
  padding: 0 !important;
  // background-color: pink !important;
`;

const ButtonBottomMenuActive = styled(Button)`
  color: white !important;
  border-top: solid 2px #25283D !important;
  border-bottom: solid 2px #B40431 !important;
  // box-sizing: content-box !important;
  // &:hover {
  //   color: black !important;
  //   background-color: #0069d9 !important;
  //   border-color: #0062cc !important;
  // };
`;

const ButtonBottomMenu = styled(Button)`
  color: #BDBDBD !important;
  border-top: solid 2px #25283D !important;
  border-bottom: solid 2px #25283D !important;
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
class Component extends React.Component {
  
  constructor(props) {
    super(props);
    
  }

  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores } = this.props;
    
    // console.log(`header stores.pathname = ${this.props.stores.pathname}`);
    // console.log(`header / stores.pathname = ${stores.pathname}`);
    // console.log(`document.location.pathname = ${document.location.pathname}`);
    
    // console.log(`header / stores.header.test = ${stores.header.test}`);
    // console.log(`this.props.stores.header.test = ${this.props.stores.header.test}`);
    
    // console.log(`header / stores.header.loginMenuOpenFunction2 = ${stores.header.loginMenuOpenFunction}`);
    // console.log(`header / stores.header.headerMenuFunction = ${stores.header.headerMenuFunction}`);
    // console.log(`header / stores.header.menuArr = ${stores.header.menuArr}`);
    
    
    const items = ['Sun', 'Mon', 'Tue', 'Wed'];
    
    
    // --------------------------------------------------
    //   メニュー
    // --------------------------------------------------
    
    const codeMenuArr = [];
    let menuActive = false;
    let reverseMenuArr = {};
    
    
    if (stores.pathname === '/') {
      
      reverseMenuArr = stores.header.menuObj.index.reverse();
      
    } else if (stores.pathname === '/gc') {
      
      reverseMenuArr = stores.header.menuObj.gc.reverse();
      
    }
    
    
    // for(const [key, value] of stores.current.headerMenuArr) {
    reverseMenuArr.forEach((value, index) => {
      
      // console.log(`header value.pathname = ${value.pathname}`);
      // console.log(`index = ${index}`);
      // console.log(`headerMenuReverseArr.length = ${headerMenuReverseArr.length}`);
      
      if (value.pathname === stores.pathname || (!menuActive && index + 1 === reverseMenuArr.length)) {
        
        codeMenuArr.unshift(
          <ButtonBottomMenuActive key={index}>
            {value.name}
          </ButtonBottomMenuActive>
        );
        
        menuActive = true;
        
      } else {
        
        codeMenuArr.unshift(
          <Link prefetch href={value.pathname} key={index}>
            <ButtonBottomMenu>
              {value.name}
            </ButtonBottomMenu>
          </Link>
        );
        
        // codeMenuArr.unshift(
        //   <div className="hero-image-data" key={index}>
        //     abc
        //   </div>
        // );
        
      }
      
    });
    
    
    
    // function codeHeroImage() {
      
    // }
    
    
    
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
            <IconButtonTopBell onClick={stores.header.notificationDialogOpenFunction}>
              <BadgeTopBell badgeContent={4} color="primary">
                <IconNotifications />
              </BadgeTopBell>
            </IconButtonTopBell>
            
            {/* 検索フォーム */}
            <div className="header-top-search">
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
            </div>
            
            
            
            {/* メニュー */}
            {/*<ButtonTopMenu>
              <IconPerson />
              プレイヤー
            </ButtonTopMenu>*/}
            
            {/*<ButtonTopMenu>
              <IconExitToApp />
              ログイン
            </ButtonTopMenu>*/}
            
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
            
          </div>
          
          {/* ヒーローイメージ（各ゲームの大きな画像） */}
           {/* <div className="hero-image">
            <img src="https://gameusers.org/assets/img/bbs_uc/reply/1726/image_1.jpg?1524229992" width="100%" />
            
            <div className="hero-image-data">
              <p className="hero-image-data-title">タイトル</p>
              <p className="hero-image-data-info">ハード | </p>
              <p className="hero-image-data-info">ジャンル | </p>
              <p className="hero-image-data-info">プレイ人数 | </p>
              <p className="hero-image-data-info">発売日 | </p>
              <p className="hero-image-data-info">開発 | </p>
              <div className="link"></div>
            </div>
          </div>*/}
          
          
          <HeroImage />
          
          
          {/* 最下部メニュー */}
          <div className="header-bottom-menu">
            {codeMenuArr}
          </div>
          
          <div className="hero-image-data">
            abc
          </div>
          
          <ul>
            { items.map((d, idx) => {
              return <li key={idx}>{idx} : {d}</li>;
            }) }
          </ul>
          
          <Link prefetch href='/gc'>
            <ButtonBottomMenu>
              gc
            </ButtonBottomMenu>
          </Link>
          
          {/* <Button
            onClick={stores.header.notificationDialogOpenFunction}
          >
          AAA
          </Button> */}
            
          
          
          <Dialog
            fullScreen
            open={stores.header.notificationDialogOpen}
            onClose={stores.header.notificationDialogCloseFunction}
            // transition={Transition}
          >
            <AppBar>
              <Toolbar>
                <IconButton color="inherit" onClick={stores.header.notificationDialogCloseFunction} aria-label="Close">
                  <CloseIcon />
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
          
          
          
        
        </header>
        
        
        
        <style jsx>{`
        
          header {
            display: flex !important;
            flex-direction: column !important;
            background-color: white;
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
          
          .hero-image {
            position: relative;
            width: 100%;
          }
          
          .hero-image-data {
            position: absolute;
            min-width: 150px;
            max-width: 300px;
            border-radius: 8px;
            background-color: #000;
            background-color: rgba(0, 0, 0, 0.5);
            color: #fff;
            padding: 4px 0 6px 0;
            right: 20px;
            bottom: 20px;
          }
          
          .hero-image-data-title {
            padding: 0 10px;
            border-bottom: #d51a53 solid 1px;
            font-size: 14px;
          }
          
          .hero-image-data-info {
            padding: 6px 20px 0;
            font-size: 12px;
            line-height: 1.6em;
          }
          
          .header-bottom-menu {
            display: flex !important;
            flex-direction: row !important;
            justify-content: center;
            height: 46px;
            background-color: #25283D;
          }
          
        `}</style>
        
      </div>
    );
  }
  
};



// --------------------------------------------------
//   Code
// --------------------------------------------------


/**
 * ヒーローイメージ
 * @param {object} props
 */
function HeroImage(props) {
  
  const Container = styled.div`
    position: relative !important;
    width: 100% !important;
    // background-color: pink !important;
  `;
  
  const BoxData = styled.div`
    position: absolute !important;
    min-width: 150px !important;
    max-width: 300px !important;
    border-radius: 8px !important;
    background-color: #000 !important;
    background-color: rgba(0, 0, 0, 0.5) !important;
    color: #fff !important;
    padding: 4px 0 6px 0 !important;
    right: 20px !important;
    bottom: 20px !important;
  `;
  
  const DataTitle = styled.p`
    padding: 0 10px !important;
    border-bottom: #d51a53 solid 1px !important;
    font-size: 14px !important;
  `;
  
  const DataInfo = styled.p`
    // margin: 0 !important;
    padding: 6px 20px 0 !important;
    font-size: 12px !important;
    line-height: 1.6em !important;
  `;
  
  return (
    <Container>
    
      <img src="https://gameusers.org/assets/img/bbs_uc/reply/1726/image_1.jpg?1524229992" width="100%" />
        
      <BoxData>
        <DataTitle>タイトル</DataTitle>
        <DataInfo>ハード | </DataInfo>
        <DataInfo>ジャンル | </DataInfo>
        <DataInfo>プレイ人数 | </DataInfo>
        <DataInfo>発売日 | </DataInfo>
        <DataInfo>開発 | </DataInfo>
        <div className="link"></div>
      </BoxData>
      
    </Container>
  );
  
}





export default withRoot(Component);