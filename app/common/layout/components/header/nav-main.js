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

import Button from '@material-ui/core/Button';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// const Container = styled.nav`
//   width: 100%;
//   height: 36px;
//   text-align: center;
//   background-color: #25283D;
//   // position: -webkit-sticky;
//   position: sticky;
//   // top: -1px;
//   // position: fixed;
//   // top: 53px;
//   top: 0;
//   z-index: 1000;
//   padding: 0;
// `;

// const Container = styled.nav`
//   width: 100%;
//   height: 28px;
//   // height: 36px;
//   text-align: center;
//   background-color: #25283D;
//   // position: -webkit-sticky;
//   // position: sticky;
//   // top: -1px;
//   // position: fixed;
//   // top: 0;
//   z-index: 1000;
//   margin: 0 0 8px 0;
//   padding: 0;
// `;
      
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
  
  // console.log(chalk`
  //   headerScrollUp: {green ${headerScrollUp}}
  //   headerNavTopShow: {green ${headerNavTopShow}}
  //   headerNavMainPositionSticky: {green ${headerNavMainPositionSticky}}
  // `);
  
  // const Nav = styled(animated.nav)`
  //   width: 100%;
  //   height: 36px;
  //   text-align: center;
  //   background-color: #25283D;
  //   position: -webkit-sticky;
  //   position: sticky;
  //   // top: 0;
  //   top: 53px;
  //   z-index: 1000;
  // `;
  
  
  // const props = useSpring({
  //   transform: headerScrollUp && headerNavTopShow && headerNavMainPositionSticky ? 'translateY(53px)' : 'translateY(0px)',
  // });
  
  
  const Nav = styled(animated.nav)`
    width: 100%;
    height: 36px;
    text-align: center;
    background-color: #25283D;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    // top: 53px;
    z-index: 1000;
  `;
  
  const props = useSpring({
    transform: headerScrollUp && headerNavTopShow && headerNavMainPositionSticky ? 'translateY(53px)' : 'translateY(0px)',
  });
  
  
  
  
  
  // let props = {};
  
  // if (headerScrollUp && headerNavTopShow && !headerNavMainPositionSticky) {
  
  // if (headerScrollY > headerHeroImageHeight) {
    
  //   const translateY = headerScrollY - headerHeroImageHeight;
    
  //   Nav = styled(animated.nav)`
  //     width: 100%;
  //     height: 36px;
  //     text-align: center;
  //     background-color: #25283D;
  //     // position: -webkit-sticky;
  //     // position: sticky;
  //     top: 0;
  //     transform: translateY(${translateY}px)
  //     z-index: 1000;
  //   `;
    
  //   props = {};
    
  //   console.log(chalk`
  //     headerScrollY: {green ${headerScrollY}}
  //     headerHeroImageHeight: {green ${headerHeroImageHeight}}
  //     translateY: {green ${translateY}}
  //   `);
    
  // }
  
  // }
  
  
  // if (headerScrollUp && headerNavTopShow && !headerNavMainPositionSticky) {
    
  //   Nav = styled(animated.nav)`
  //     width: 100%;
  //     height: 36px;
  //     text-align: center;
  //     background-color: #25283D;
  //     position: -webkit-sticky;
  //     position: sticky;
  //     top: 0;
  //     z-index: 1000;
  //   `;
    
  //   props = {};
    
  // }
  
  
  
  // let props = useSpring({
  //   // top: headerScrollUp && headerNavTopShow && headerNavMainPositionSticky ? '53px' : '0px',
  //   transform: headerScrollUp && headerNavTopShow && headerNavMainPositionSticky ? 'translateY(53px)' : 'translateY(0px)',
  //   // immediate: true,
  //   onRest: () => {
  //     // top: headerScrollUp && headerNavTopShow && headerNavMainPositionSticky ? '53px' : '0px',
      
  //     // Nav = styled(animated.nav)`
  //     //   width: 100%;
  //     //   height: 36px;
  //     //   text-align: center;
  //     //   background-color: #25283D;
  //     //   position: -webkit-sticky;
  //     //   position: sticky;
  //     //   top: 53px;
  //     //   z-index: 1000;
  //     // `;
  //     if (headerScrollUp && headerNavTopShow && headerNavMainPositionSticky) {
  //       document.getElementById('header-nav-main').classList.add('header-nav-main');
  //     } else {
  //       document.getElementById('header-nav-main').classList.remove('header-nav-main');
  //     }
      
      
      
  //     console.log('finish');
  //   }
  // });
  
  
  // props = useSpring({
  //   transform: 'translateY(0px)',
  // });
  
  
  // const Nav = styled(animated.nav)`
  //   width: 100%;
  //   height: 36px;
  //   text-align: center;
  //   background-color: #25283D;
  //   position: -webkit-sticky;
  //   position: sticky;
  //   top: 53px;
  //   z-index: 1000;
  // `;
  
  // const props = useSpring({
  //   top: headerScrollUp && headerNavTopShow && headerNavMainPositionSticky ? '53px' : '0px',
  // });
  
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
    
    
    
    // const headerHeroImageHeight = lodashGet(stores, ['layout', 'headerHeroImageHeight'], 0);
    // const headerScrollY = lodashGet(stores, ['layout', 'headerScrollY'], 0);
    
    const headerScrollUp = lodashGet(stores, ['layout', 'headerScrollUp'], false);
    const headerNavTopShow = lodashGet(stores, ['layout', 'headerNavTopShow'], true);
    const headerNavMainPositionSticky = lodashGet(stores, ['layout', 'headerNavMainPositionSticky'], false);
    
    
    // --------------------------------------------------
    //   Component - Menu
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
        // headerHeroImageHeight={headerHeroImageHeight}
        // headerScrollY={headerScrollY}
        headerScrollUp={headerScrollUp}
        headerNavTopShow={headerNavTopShow}
        headerNavMainPositionSticky={headerNavMainPositionSticky}
      > 
        {componentsArr}
      </Container>
    );
    
  }
  
};