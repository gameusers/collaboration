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
import lodashSet from 'lodash/set';
import lodashThrottle from 'lodash/throttle';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


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

const Container = ({ children, lowerNavMain }) => {
  
  const props = useSpring({
    transform: lowerNavMain ? 'translateY(53px)' : 'translateY(0px)',
    config: { duration: 250 },
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
    // --------------------------------------------------
    
    this.scrollYOffset = 0;
    this.navTopHeight = 53;
    this.heroImageHeight = lodashGet(this.props, ['stores', 'layout', 'headerHeroImageHeight'], 0);
    
    window.addEventListener('scroll', this.handleScroll);
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentWillUnmount
  // --------------------------------------------------
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  
  
  
  
  // --------------------------------------------------
  //   handleScroll
  // --------------------------------------------------
  
  handleScroll = lodashThrottle(() => {
    
    
    const scrollY = window.scrollY;
    
    let scrollUp = false;
    let showNavTop = true;
    let lowerNavMain = false;
    
    
    // ---------------------------------------------
    //   scrollY === 0
    // ---------------------------------------------
    
    if (scrollY !== 0) {
      
      
      // ---------------------------------------------
      //   Scroll Up / Scroll Down
      // ---------------------------------------------
      
      if (scrollY > this.scrollYOffset) {
        // console.log('scrollDown');
        scrollUp = false;
      } else {
        // console.log('scrollUp');
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
    
    
    // ---------------------------------------------
    //   scrollToで移動する場合、ナビゲーションを上の位置に表示する
    // ---------------------------------------------
    
    // console.log('Nav Main Scroll');
    
    const headerNavForceScrollUpBegin = lodashGet(this.props, ['stores', 'layout', 'headerNavForceScrollUpBegin'], false);
    
    if (headerNavForceScrollUpBegin) {
      
      // console.log('Nav Main Begin');
      
      const headerNavForceScrollUpEnd = lodashGet(this.props, ['stores', 'layout', 'headerNavForceScrollUpEnd'], false);
      
      if (headerNavForceScrollUpEnd) {
        
        // console.log('Nav Main End');
        
        lodashSet(this.props, ['stores', 'layout', 'headerNavForceScrollUpBegin'], false);
        lodashSet(this.props, ['stores', 'layout', 'headerNavForceScrollUpEnd'], false);
        
        // return;
        
      }
      
      lowerNavMain = false;
      
    }
    
    // console.log(chalk`
    //   lowerNavMain: {green ${lowerNavMain}}
    // `);
    // ---------------------------------------------
    //   console.log
    // ---------------------------------------------
    
    // console.log(chalk`
    //   scrollY: {green ${scrollY}}
    //   this.navTopHeight: {green ${this.navTopHeight}}
    //   this.heroImageHeight: {green ${this.heroImageHeight}}
    //   scrollUp: {green ${scrollUp}}
    //   showNavTop: {green ${showNavTop}}
    //   lowerNavMain: {green ${lowerNavMain}}
    // `);
    
    
    // ---------------------------------------------
    //   setState
    // ---------------------------------------------
    
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