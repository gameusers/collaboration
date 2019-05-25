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
// import styled from 'styled-components';
import styled from '@emotion/styled';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import { useSpring, animated } from 'react-spring';
import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconMenu from '@material-ui/icons/Menu';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const FlexBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 0;
  padding: 0 12px;
  // background-color: pink;
  
  @media screen and (max-width: 480px) {
    position: relative;
  }
`;

const DrawerMenuButtonBox = styled.div`
  margin: 0 28px 0 0;
  
  @media screen and (max-width: 480px) {
    position: absolute;
    left: 12px;
  }
`;

const StyledIconButton = styled(IconButton)`
  && {
    color: white;
    width: 28px;
    height: 28px;
    // margin: 0 28px 0 0;
    padding: 0;
    
    @media screen and (max-width: 480px) {
      // margin: 0 28px 0 auto;
    }
  }
`;

const MenuActiveButton = styled(Button)`
  && {
    height: 36px;
    color: white;
    border-bottom: solid 2px #B40431;
    margin: 0 10px 0 0;
  }
`;
      
const MenuButton = styled(Button)`
  && {
    height: 36px;
    color: #BDBDBD;
    border-bottom: solid 2px #25283D;
    margin: 0 10px 0 0;
  }
`;




// --------------------------------------------------
//   react-spring
// --------------------------------------------------

const Container = ({ children, headerScrollUp, headerNavTopShow, headerNavMainPositionSticky }) => {
  
  const Nav = styled(animated.nav)`
    && {
      width: 100%;
      height: 36px;
      background-color: #25283D;
      // position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 1000;
    }
  `;
  
  // const Nav = styled(animated.nav)`
  //   width: 100%;
  //   height: 36px;
  //   background-color: #25283D;
  //   position: -webkit-sticky;
  //   position: sticky;
  //   top: 0;
  //   z-index: 1000 !important;
  // `;
  
  
  // const Nav = styled(animated.nav)`
  //   width: 100%;
  //   height: 36px;
  //   text-align: center;
  //   background-color: #25283D;
  //   position: -webkit-sticky;
  //   position: sticky;
  //   top: 0;
  //   z-index: 1000;
  // `;
  
  // const props = useSpring({
  //   transform: headerScrollUp && headerNavTopShow ? 'translateY(53px)' : 'translateY(0px)',
  // });
  
  const props = useSpring({
    transform: headerScrollUp && headerNavTopShow && headerNavMainPositionSticky ? 'translateY(53px)' : 'translateY(0px)',
  });
  
  
  return <Nav style={props}>{children}</Nav>;
  
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
    
    const { stores, headerNavMainArr } = this.props;
    
    const headerScrollUp = lodashGet(stores, ['layout', 'headerScrollUp'], false);
    const headerNavTopShow = lodashGet(stores, ['layout', 'headerNavTopShow'], true);
    const headerNavMainPositionSticky = lodashGet(stores, ['layout', 'headerNavMainPositionSticky'], false);
    
    const drawerIconShow = lodashGet(stores, ['layout', 'drawerIconShow'], false);
    const handleDrawerOpen = lodashGet(stores, ['layout', 'handleDrawerOpen'], () => {});
    
    
    // --------------------------------------------------
    //   Component - Button
    // --------------------------------------------------
    
    const componentsArr = [];
    
    let active = false;
    
    
    if (headerNavMainArr && headerNavMainArr.length > 0) {
      
      const reverseHeaderMenuArr = headerNavMainArr.slice().reverse();
      
      for (const [index, valueObj] of reverseHeaderMenuArr.entries()) {
        
        if (valueObj.as === stores.pathname || (!active && index + 1 === reverseHeaderMenuArr.length)) {
          
          componentsArr.unshift(
            <MenuActiveButton key={index}>
              {valueObj.name}
            </MenuActiveButton>
          );
          
          active = true;
          
        } else {
          
          componentsArr.unshift(
            <Link href={valueObj.href} as={valueObj.as} key={index}>
              <MenuButton>
                {valueObj.name}
              </MenuButton>
            </Link>
          );
          
        }
        
      }
      
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container
        headerScrollUp={headerScrollUp}
        headerNavTopShow={headerNavTopShow}
        headerNavMainPositionSticky={headerNavMainPositionSticky}
      >
        
        <FlexBox>
        
        {/* Drawer Menu */}
        {drawerIconShow &&
          <DrawerMenuButtonBox>
            <StyledIconButton
              onClick={() => handleDrawerOpen()}
            >
              <IconMenu />
            </StyledIconButton>
          </DrawerMenuButtonBox>
        }
        
        
        {/* Menu */}
        {componentsArr}
        
        </FlexBox>
        
        
      </Container>
    );
    
  }
  
};