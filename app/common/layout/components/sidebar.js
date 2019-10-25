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
import { inject, observer } from 'mobx-react';
import { useSpring, animated } from 'react-spring';
import lodashGet from 'lodash/get';
import lodashThrottle from 'lodash/throttle';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';




// --------------------------------------------------
//   react-spring
// --------------------------------------------------

const Container = ({ children, initial, headerNavForceScrollUpBegin2 }) => {
  
  let initialPosition = initial;
  
  if (!headerNavForceScrollUpBegin2) {
    initialPosition = true;
  }
  
  console.log(chalk`
    initial: {green ${initial}}
    headerNavForceScrollUpBegin2: {green ${headerNavForceScrollUpBegin2}}
  `);
    
  
  const props = useSpring({
    transform: initialPosition ? 'translateY(0px)' : 'translateY(52px)',
    config: { duration: 250 },
  });
  
  return <animated.div
      css={css`
        width: 300px;
        
        position: sticky;
        top: 52px;
        
        @media screen and (max-width: 947px) {
          width: 100%;
          position: static;
        }
      `}
      style={props}
    >
      {children}
    </animated.div>;
  
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
      initial: true,
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
    let initial = true;
    
    
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
          initial = false;
        }
        
      }
      
      
    }
    
    
    this.scrollYOffset = scrollY;
    
    
    
    
    // ---------------------------------------------
    //   scrollToで移動する場合、上げる
    // ---------------------------------------------
    
    // console.log('Sidebar Scroll');
    
    // const headerNavForceScrollUpBegin = lodashGet(this.props, ['stores', 'layout', 'headerNavForceScrollUpBegin'], false);
    // const headerNavForceScrollUpEnd = lodashGet(this.props, ['stores', 'layout', 'headerNavForceScrollUpEnd'], false);
    
    // console.log(chalk`
    //   headerNavForceScrollUpBegin: {green ${headerNavForceScrollUpBegin}}
    //   headerNavForceScrollUpEnd: {green ${headerNavForceScrollUpEnd}}
    // `);
    
    
    
    // if (headerNavForceScrollUpBegin) {
      
    //   console.log('Sidebar Begin');
      
    //   initial = false;
      
      
      
    //   if (headerNavForceScrollUpEnd) {
        
    //     console.log('Sidebar End');
        
        
    //   }
      
    // }
    
    
    
    
    // ---------------------------------------------
    //   サイドバーがない場合は下げる
    // ---------------------------------------------
    
    if (window.innerWidth <= 947) {
      initial = true;
    }
    
    
    // ---------------------------------------------
    //   console.log
    // ---------------------------------------------
    
    // console.log(chalk`
    //   scrollY: {green ${scrollY}}
    //   scrollUp: {green ${scrollUp}}
    //   showNavTop: {green ${showNavTop}}
    //   initial: {green ${initial}}
    // `);
    
    
    // ---------------------------------------------
    //   setState
    // ---------------------------------------------
    
    if (this.state.initial !== initial) {
      
      this.setState({
        initial,
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
    
    const headerNavForceScrollUpBegin2 = stores.layout.headerNavForceScrollUpBegin2;
    
    
    
    // initial={this.state.initial}
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container initial={this.state.initial} headerNavForceScrollUpBegin2={headerNavForceScrollUpBegin2}>
        
        
        {/*<img
          src="/static/img/sample/knight_f_idle_anim_f0.png"
          width="32"
          height="40"
        />*/}
        
        
        {/* Contents */}
        {this.props.children}
        
        
      </Container>
    );
    
  }
  
};