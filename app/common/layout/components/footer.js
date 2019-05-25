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
import styled from '@emotion/styled';
// import styled from 'styled-components';
// import Link from 'next/link';
import { inject, observer } from 'mobx-react';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconLocalFlorist from '@material-ui/icons/LocalFlorist';
import IconCopyright from '@material-ui/icons/Copyright';
import IconNavigation from '@material-ui/icons/Navigation';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Footer = styled.footer`
  position: relative;
  color: white;
  background-color: black;
  padding: 6px 0 6px;
`;

const MenuBox = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color: white;
  margin: 0;
`;

const StyledIconLocalFlorist = styled(IconLocalFlorist)`
  && {
    font-size: 26px;
    margin: 0 0 3px;
    
    @media screen and (max-width: 480px) {
      margin: 0 0 2px 0;
    }
  }
`;

const ButtonGameUsers = styled(Button)`
  && {
    min-width: 30px;
    min-height: 34px;
    height: 34px;
    font-size: 30px;
    padding: 0 20px 0 8px;
    
    @media screen and (max-width: 480px) {
      min-height: 30px;
      height: 30px;
      font-size: 18px;
      padding: 0 14px 0 10px;
    }
  }
`;

const MenuTextBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex-grow: 2;
  margin: 0 58px 0 0;
  color: white;
  
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
`;


const CopyrightBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledIconCopyright = styled(IconCopyright)`
  && {
    font-size: 20px;
    margin: 0 0 0 0;
  }
`;

const Copyright = styled.div`
  font-size: 12px;
  margin: 0 0 0 4px;
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
    
    // const { stores } = this.props;
    
    
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
            <Fab color="secondary" size="small">
              <IconNavigation />
            </Fab>
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