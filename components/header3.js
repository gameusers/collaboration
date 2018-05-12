// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';
import { VelocityComponent, VelocityTransitionGroup } from 'velocity-react';
// import isMobile from 'ismobilejs';

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
  
  // position: fixed;
  top: 0;
  z-index: 1200;
`;

// const HeaderTopLogo = styled.div`
//   margin: 2px 0 0 10px;
// `;

const HeaderTopSearch = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  margin: 8px 0 0 0;
  // background-color: red;
`;


const IconButtonTopBell = styled(IconButton)`
  top: 5px;
  left: 5px;
`;

const BadgeTopBell = styled(Badge)`
  // margin: 3px 0 0 0;
  // padding: 0;
  color: black;
  // top: 14px;
  // left: 0;
`;

const TextFieldTopSearch = styled(TextField)`
  width: 70%;
`;

const ButtonTopMenu = styled(Button)`
  margin: 0 10px 0 0;
  padding: 0;
  // background-color: pink;
`;

const IconButtonTopThumbnail = styled(IconButton)`
  top: 2px;
  right: 14px;
`;

const AvatarTop = styled(Avatar)`
  // margin: 5px 10px 0 0;
  padding: 0;
  // background-color: pink;
`;

const MenuTopLoginMenu = styled(Menu)`
  position: fixed;
  top: 10px;
  right: 10px;
  // background-color: pink;
`;

const ListItemIconTopLoginMenu = styled(ListItemIcon)`
  margin: 0 8px 0 0;
  padding: 0;
`;

const ListItemTextTopLoginMenu = styled(ListItemText)`
  margin: 0 8px 0 0;
  padding: 0;
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
    
    
    
    
    // --------------------------------------------------
    //   Components
    //   ループや複雑な分岐が必要なコンポーネントはここに関数で書いてください
    // --------------------------------------------------
    
    /**
     * ロゴ
     */
    function Logo() {
      
      const Logo = styled.div`
        margin: 2px 0 0 10px;
        width: 138px;
        height: 43px;
        background-image: url('/static/img/common/logo.png');
        
        @media screen and (max-width: 480px) {
          width: 30px;
          height: 43px;
          background-image: url('/static/img/common/logo-mobile.png');
        }
      `;
      
      
      // if (isMobile.phone) {
      //   console.log('Header.js / スマートフォン');
      // } else if (isMobile.tablet) {
      //   console.log('Header.js / タブレット');
      // } else {
      //   console.log('Header.js / PC');
      // }
      
      
      // if (isMobile.phone) {
      //   return (
      //     <HeaderTopLogo>
      //       <img src="/static/img/common/logo-mobile.png" width="30" height="43" />
      //     </HeaderTopLogo>
      //   );
      // }
      
      // <img src="/static/img/common/logo.png" width="138" height="43" />
      
      
      
      
      return (
        <Logo />
      );
      
    }
    
    
    /**
     * ヒーローイメージ
     */
    function HeroImage() {
      
      
      // --------------------------------------------------
      //   Styled Components
      // --------------------------------------------------
      
      let Container = styled.div`
        position: relative;
        width: 100%;
      `;
      
      let Image = styled.img`
        width: 100%;
      `;
      
      let BoxData = styled.div`
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
      `;
      
      const DataTitle = styled.p`
        padding: 0 10px;
        border-bottom: #d51a53 solid 1px;
        font-size: 14px;
      `;
      
      const DataInfo = styled.p`
        padding: 10px 20px 0;
        font-size: 12px;
        line-height: 1em;
      `;
      
      const BoxDataLink = styled.div`
        display: flex;
        flex-direction: row;
        padding: 7px 10px 0;
      `;
      
      const DivDataLinkForButton = styled.div`
        margin: 0 12px 0 0;
      `;
      
      const DivDataLinkForImage = styled.div`
        margin: 4px 12px 0 0;
      `;
      
      const ADataLink = styled.a`
        text-decoration: none;
      `;
      
      const ButtonDataLink = styled(Button)`
        margin: 0 !important;
        padding: 0 !important;
        font-size: 12px !important;
        min-width: 36px !important;
        min-height: 20px !important;
      `;
      
      
      
      // --------------------------------------------------
      //   Hero Image
      // --------------------------------------------------
      
      let imgSrc = null;
      
      if (stores.header.heroImageArr) {
        
        const heroImageRandomNo = stores.header.heroImageArr[Math.floor(Math.random() * stores.header.heroImageArr.length)];
        
        imgSrc = `/static/img/game/${stores.header.gameNo}/hero/${heroImageRandomNo}.jpg`;
        
      } else {
        
        Container = styled.div`
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: flex-start;
          background: no-repeat center center url('/static/img/common/header-back.jpg');
          background-size: cover;
          width: 100%;
          padding: 20px 0;
        `;
        
        Image = styled.img`
          margin: 0 15px;
          border-radius: 8px;
          box-shadow: 4px 4px 10px #383838;
        `;
        
        BoxData = styled.div`
          min-width: 150px;
          max-width: 300px;
          border-radius: 8px;
          background-color: #000;
          background-color: rgba(0, 0, 0, 0.5);
          color: #fff;
          padding: 4px 0 6px 0;
        `;
        
        imgSrc = `/static/img/game/${stores.header.gameNo}/thumbnail.jpg`;
        
      }
      
      
      
      // --------------------------------------------------
      //   Data Link
      // --------------------------------------------------
      
      let codeDataLinkArr = [];
      
      
      if (stores.header.dataLinkArr) {
        
        stores.header.dataLinkArr.forEach((value, index) => {
          
          if (value.type === 'Official') {
            
            codeDataLinkArr.push(
              <DivDataLinkForButton key={index}>
                <ADataLink href={value.url} target="_blank">
                  <ButtonDataLink
                    variant="raised"
                    color="secondary"
                  >
                    公式
                  </ButtonDataLink>
                </ADataLink>
              </DivDataLinkForButton>
            );
            
          } else if (value.type === 'Twitter') {
           
            codeDataLinkArr.push(
              <DivDataLinkForImage key={index}>
                <ADataLink href={value.url} target="_blank">
                  <img src="/static/img/common/social/twitter@2x.png" width="20" height="20" />
                </ADataLink>
              </DivDataLinkForImage>
            );
            
          } else if (value.type === 'Facebook') {
           
            codeDataLinkArr.push(
              <DivDataLinkForImage key={index}>
                <ADataLink href={value.url} target="_blank">
                  <img src="/static/img/common/social/facebook@2x.png" width="20" height="20" />
                </ADataLink>
              </DivDataLinkForImage>
            );
            
          } else if (value.type === 'YouTube') {
           
            codeDataLinkArr.push(
              <DivDataLinkForImage key={index}>
                <ADataLink href={value.url} target="_blank">
                  <img src="/static/img/common/social/youtube@2x.png" width="20" height="20" />
                </ADataLink>
              </DivDataLinkForImage>
            );
            
          } else if (value.type === 'Steam') {
           
            codeDataLinkArr.push(
              <DivDataLinkForImage key={index}>
                <ADataLink href={value.url} target="_blank">
                  <img src="/static/img/common/social/steam@2x.png" width="20" height="20" />
                </ADataLink>
              </DivDataLinkForImage>
            );
            
          }
          
        });
        
      }
      
      
      return (
        <Container>
          
          <Image src={imgSrc} />
          
          <BoxData>
            <DataTitle>{stores.header.dataTitle}</DataTitle>
            <DataInfo>ハード | {stores.header.dataHardware}</DataInfo>
            <DataInfo>ジャンル | {stores.header.dataGenre}</DataInfo>
            <DataInfo>プレイ人数 | {stores.header.dataPlayersMax}</DataInfo>
            <DataInfo>発売日 | {stores.header.dataReleaseDate}</DataInfo>
            <DataInfo>開発 | {stores.header.dataDeveloper}</DataInfo>
            <BoxDataLink>{codeDataLinkArr}</BoxDataLink>
          </BoxData>
          
        </Container>
      );
      
    }
    
    
    
    /**
     * 下部の紺色メニュー
     */
    function Menu() {
      
      const Container = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 46px;
        background-color: #25283D;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 1200;
      `;
      
      const ButtonMenuActive = styled(Button)`
        color: white;
        border-top: solid 2px #25283D;
        border-bottom: solid 2px #B40431;
      `;
      
      const ButtonMenu = styled(Button)`
        color: #BDBDBD;
        border-top: solid 2px #25283D;
        border-bottom: solid 2px #25283D;
      `;
      
      
      const codeArr = [];
      let active = false;
      let menuArr = [];
      
      if (stores.pathname === '/') {
        menuArr = stores.header.menuObj.index;
      } else if (stores.pathname === '/gc') {
        menuArr = stores.header.menuObj.gc;
      } else if (stores.pathname === '/uc') {
        menuArr = stores.header.menuObj.uc;
      }
      
      const reverseMenuArr = JSON.parse(JSON.stringify(menuArr)).reverse();
      
      // console.log(JSON.stringify(stores.header.menuObj));
      
      
      reverseMenuArr.forEach((value, index) => {
        
        // console.log(`header value.pathname = ${value.pathname}`);
        // console.log(`index = ${index}`);
        // console.log(`value = ${value}`);
        // console.log(`index = ${index}`);
        // console.log(`headerMenuReverseArr.length = ${headerMenuReverseArr.length}`);
        
        if (value.pathname === stores.pathname || (!active && index + 1 === reverseMenuArr.length)) {
          
          codeArr.unshift(
            <ButtonMenuActive key={index}>
              {value.name}
            </ButtonMenuActive>
          );
          
          active = true;
          
        } else {
          
          codeArr.unshift(
            <Link prefetch href={value.pathname} key={index}>
              <ButtonMenu>
                {value.name}
              </ButtonMenu>
            </Link>
          );
          
        }
        
      });
      
      return (
        <Container>
          {codeArr}
        </Container>
      );
      
    }
    
    
    
    return (
      <Header>
        
        {/* ヘッダー */}
        {/*<VelocityComponent
          animation={{ translateY: stores.header.topMenuOpen ? 0 : -48 }}
          duration={300}
        >*/}
        
        {/*<Header>*/}
          
          {/* トップメニュー */}
          <HeaderTop>
          
            {/* ロゴ */}
            <Logo />
            {/*<HeaderTopLogo>
              <img src="/static/img/common/logo.png" width="138px" height="43" />
            </HeaderTopLogo>*/}
            
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
            
          </HeaderTop>
          
          
          
          
          {/* ヒーローイメージ（各ゲームの大きな画像） */}
          <HeroImage />
          
          {/* 最下部メニュー */}
          {/* <Menu /> */}
          
          
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
          
        {/*</Header>*/}
        
        {/*</VelocityComponent>
        
        
        <Button
          onClick={stores.header.topMenuOpenFunction}
        >
          テスト
        </Button>*/}
        
        
        
      </Header>
    );
  }
  
};

export default withRoot(Component);