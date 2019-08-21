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
import { useSpring, animated, config } from 'react-spring';
import lodashGet from 'lodash/get';
import lodashThrottle from 'lodash/throttle';
import lodashDebounce from 'lodash/debounce';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
// import styled from '@emotion/styled';


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

// let startAnimation = false;

const Container = ({ children, lowerNavMain }) => {
  
  // const Nav = styled(animated.nav)`
  //   width: 100%;
  //   height: 36px;
  //   background-color: #25283D;
  //   position: sticky;
  //   top: 0;
  //   z-index: 1000;
  // `;
  
  
  
  // const props = useSpring({
  //   translateY: 0,
  //   from: { translateY: 53 }
  // });
  
  // const [props, set, stop] = useSpring(() => ({ transform: 'translateY(0px)' }));
  
  // // Update spring with new props
  // set({ transform: lowerNavMain ? 'translateY(53px)' : 'translateY(0px)' });
  // // Stop animation
  // stop();
  
  
  const props = useSpring({
    transform: lowerNavMain ? 'translateY(53px)' : 'translateY(0px)',
    config: { duration: 250 },
    // config: config.slow,
    // config: { mass: 1, tension: 210, friction: 20, clamp: true }
    // immediate: true,
    // onStart: () => {
    //   console.log('onStart');
    //   startAnimation = true;
    // },
    // onRest: () => {
    //   console.log('onRest');
    //   startAnimation = false;
    // },
  });
  
  return <animated.nav
      css={css`
        width: 100%;
        height: 36px;
        background-color: #25283D;
        position: sticky;
        top: 0;
        z-index: 1000;
      `}
      style={props}
    >
      {children}
    </animated.nav>;
  
  // return <Nav style={props}>{children}</Nav>;
  
};




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  
  // positionSticky = false;
  // navTopHeight = 53;
  // heroImageHeight = 0;
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // ---------------------------------------------
    //   State
    // ---------------------------------------------
    
    this.state = {
      lowerNavMain: false,
    };
    
    
    // ---------------------------------------------
    //   bind
    // ---------------------------------------------
    
    this.handleScroll = this.handleScroll.bind(this);
    
    
  }
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
    // --------------------------------------------------
    //   スクロールされる度に呼び出される関数を設定する / ヘッダーのアニメーション用
    //   以下の一文を表示すると、このエラーが表示される。そのうち直すように。
    //   Warning: Can't perform a React state update on an unmounted component.
    // --------------------------------------------------
    
    this.scrollYOffset = 0;
    this.navTopHeight = 53;
    this.heroImageHeight = lodashGet(this.props, ['stores', 'layout', 'headerHeroImageHeight'], 0);
    
    // console.log(chalk`
    //   this.heroImageHeight: {green ${this.heroImageHeight}}
    // `);
    
    
    // console.log('componentDidMount / nav-main');
    window.addEventListener('scroll', this.handleScroll);
    
    
  }
  
  
  componentWillUnmount() {
    // console.log('componentWillUnmount / nav-main');
    window.removeEventListener('scroll', this.handleScroll);
  }
  
  
  
  
  handleScroll = lodashThrottle(() => {
    
    // if (startAnimation) {
    //   console.log('中止');
    //   return;
    // }
    
    const scrollY = window.scrollY;
    
    let scrollUp = false;
    let showNavTop = true;
    let lowerNavMain = false;
    
    
    // console.log(chalk`
    //   startAnimation: {green ${startAnimation}}
    // `);
    
    
    // ---------------------------------------------
    //   scrollY === 0
    // ---------------------------------------------
    
    if (scrollY !== 0) {
      
      
      // ---------------------------------------------
      //   Scroll Up / Scroll Down
      // ---------------------------------------------
      
      if (scrollY > this.scrollYOffset) {
        scrollUp = false;
      } else {
        scrollUp = true;
      }
      
      
      // ---------------------------------------------
      //   Show Navigation Top
      // ---------------------------------------------
      
      if (this.heroImageHeight < scrollY) {
        
        if (scrollUp) {
          showNavTop = true;
        } else {
          showNavTop = false;
        }
        
      }
      
      
      // ---------------------------------------------
      //   Lower Navigation Main
      // ---------------------------------------------
      
      if (this.navTopHeight + this.heroImageHeight < scrollY) {
        
        if (scrollUp && showNavTop) {
          lowerNavMain = true;
        }
        
      }
      
    
    }
    
    
    this.scrollYOffset = scrollY;
    
    // console.log(chalk`
    //   scrollY: {green ${scrollY}}
    //   this.navTopHeight: {green ${this.navTopHeight}}
    //   this.heroImageHeight: {green ${this.heroImageHeight}}
    //   scrollUp: {green ${scrollUp}}
    //   showNavTop: {green ${showNavTop}}
    //   lowerNavMain: {green ${lowerNavMain}}
    // `);
    
    if (this.state.lowerNavMain !== lowerNavMain) {
      
      this.setState({
        lowerNavMain,
      });
      
    }
    
    
  }, 100);
  
  
  
  
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
    
    // const headerScrollUp = lodashGet(stores, ['layout', 'headerScrollUp'], false);
    // const headerNavTopShow = lodashGet(stores, ['layout', 'headerNavTopShow'], true);
    // const headerNavMainPositionSticky = lodashGet(stores, ['layout', 'headerNavMainPositionSticky'], false);
    
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
        // headerScrollUp={headerScrollUp}
        // headerNavTopShow={headerNavTopShow}
        lowerNavMain={this.state.lowerNavMain}
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
        //   onScroll={this.handleScroll}
        // ref={this.myRef}
        >
          
          {/*<p
            css={css`
              color: white;
            `}
          >positionSticky: {this.state.positionSticky}</p>*/}
          
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