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
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import { useSpring, animated } from 'react-spring';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';


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
//   react-spring
// --------------------------------------------------

const Container = ({ children, headerScrollUp, headerNavTopShow, headerNavMainPositionSticky }) => {
  
  const Nav = styled(animated.nav)`
    width: 100%;
    height: 36px;
    background-color: #25283D;
    position: sticky;
    top: 0;
    z-index: 1000;
  `;
  
  const props = useSpring({
    transform: headerScrollUp && headerNavTopShow && headerNavMainPositionSticky ? 'translateY(53px)' : 'translateY(0px)',
  });
  
  return <Nav style={props}>{children}</Nav>;
  
  // const cssNav = css`
  //   width: 100%;
  //   height: 36px;
  //   background-color: #25283D;
  //   position: sticky;
  //   top: 0;
  //   z-index: 1000;
  // `;
  
  // const props = useSpring({
  //   transform: headerScrollUp && headerNavTopShow && headerNavMainPositionSticky ? 'translateY(53px)' : 'translateY(0px)',
  // });
  
  // return <nav css={cssNav} style={props}>{children}</nav>;
  
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
    
    const { stores } = this.props;
    
    const pathname = lodashGet(stores, ['layout', 'pathname'], '');
    const headerNavMainArr = lodashGet(stores, ['layout', 'headerNavMainArr'], []);
    
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
    
    
    if (headerNavMainArr.length > 0) {
      
      const reverseHeaderMenuArr = headerNavMainArr.slice().reverse();
      
      for (const [index, valueObj] of reverseHeaderMenuArr.entries()) {
        
        if (valueObj.as === pathname || (!active && index + 1 === reverseHeaderMenuArr.length)) {
          
          componentsArr.unshift(
            <Button
              css={css`
                && {
                  height: 36px;
                  color: white;
                  border-bottom: solid 2px #B40431;
                  margin: 0 10px 0 0;
                }
              `}
              key={index}
            >
              {valueObj.name}
            </Button>
          );
          
          active = true;
          
        } else {
          
          componentsArr.unshift(
            <Link href={valueObj.href} as={valueObj.as} key={index}>
              <Button
                css={css`
                  && {
                    height: 36px;
                    color: #BDBDBD;
                    border-bottom: solid 2px #25283D;
                    margin: 0 10px 0 0;
                  }
                `}
              >
                {valueObj.name}
              </Button>
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
        
        <div
          css={css`
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            margin: 0;
            padding: 0 12px;
            
            @media screen and (max-width: 480px) {
              position: relative;
            }
          `}
        >
          
          {/* Drawer Menu */}
          {drawerIconShow &&
            <div
              css={css`
                margin: 0 28px 0 0;
                
                @media screen and (max-width: 480px) {
                  position: absolute;
                  left: 12px;
                }
              `}
            >
              <IconButton
                css={css`
                  && {
                    color: white;
                    width: 28px;
                    height: 28px;
                    padding: 0;
                  }
                `}
                onClick={() => handleDrawerOpen()}
              >
                <IconMenu />
              </IconButton>
            </div>
          }
          
          
          {/* Menu */}
          {componentsArr}
          
          
        </div>
        
        
      </Container>
    );
    
  }
  
};