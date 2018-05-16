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
// import Menu, { MenuItem } from 'material-ui/Menu';
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


// import IconFavorite from '@material-ui/icons/Favorite';
// import IconFavorite from '@material-ui/icons/Stars';
// import IconFavorite from '@material-ui/icons/InsertEmoticon';
import IconLocalFlorist from '@material-ui/icons/LocalFlorist';
import IconCopyright from '@material-ui/icons/Copyright';
import IconNavigation from '@material-ui/icons/Navigation';

import withRoot from '../lib/material-ui/withRoot';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Footer = styled.footer`
  // display: flex;
  // flex-direction: column;
  position: relative;
  padding: 6px 0 6px;
  background-color: black;
  color: white;
`;

const MenuBox = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  margin: 0;
  font-size: 14px;
  // background-color: pink;
`;

const StyledIconLocalFlorist = styled(IconLocalFlorist)`
  margin: 0 0 3px !important;
  font-size: 26px !important;
`;

const ButtonGameUsers = styled(Button)`
  // margin: 0 30px 0 6px !important;
  padding: 0 20px 0 8px !important;
  min-width: 30px !important;
  min-height: 34px !important;
  height: 34px !important;
  font-size: 30px !important;
  // background-color: green !important;
  
  @media screen and (max-width: 480px) {
    // margin: 0 6px 0 4px !important;
    padding: 0 14px 0 10px !important;
    // min-width: 22px !important;
    min-height: 30px !important;
    height: 30px !important;
    font-size: 18px !important;
  }
`;

const MenuTextBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex-grow: 2;
  // justify-content: center;
  margin: 0 58px 0 0;
  color: white;
  // background-color: green;
  
  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`;

const Menu = styled.div`
  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`;

const MenuVerticalBar = styled.div`
  margin: 0 10px;
  
  @media screen and (max-width: 480px) {
    margin: 0 5px;
  }
`;

const MenuScrollToTop = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  // margin: 4px 0 0 auto;
`;

// const StyledIconNavigation = styled(IconNavigation)`
//   // margin: 3px auto 0 0 !important;
//   font-size: 30px !important;
// `;


const CopyrightBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledIconCopyright = styled(IconCopyright)`
  margin: 3px 0 0 !important;
  font-size: 20px !important;
`;

const Copyright = styled.div`
  margin: 0 0 0 4px;
  font-size: 12px;
  // margin: 0 10px;
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
    
    
    return (
      <Footer>
        
        
        {/* トップメニュー */}
        <MenuBox>
        
          <ButtonGameUsers color="secondary">
            <StyledIconLocalFlorist /> 
            GU
          </ButtonGameUsers>
          
          <MenuTextBox>
            <Menu>公式コミュニティ</Menu>
            <MenuVerticalBar>|</MenuVerticalBar>
            <Menu>お問い合わせ</Menu>
            <MenuVerticalBar>|</MenuVerticalBar>
            {/*<Menu><img src="/static/img/common/social/twitter@2x.png" width="20" height="20" /></Menu>>*/}
            <Menu>Twitter</Menu>
          </MenuTextBox>
          
          <MenuScrollToTop>
            <Button variant="fab" color="secondary" mini>
              <IconNavigation />
            </Button>
          </MenuScrollToTop>
          
        </MenuBox>
        
        
        <CopyrightBox>
          <StyledIconCopyright />
          <Copyright>Game Users All Rights Reserved.</Copyright>
        </CopyrightBox>
        
      </Footer>
    );
  }
  
};

export default withRoot(Component);