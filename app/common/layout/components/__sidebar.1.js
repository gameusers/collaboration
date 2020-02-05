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
import lodashSet from 'lodash/set';
import lodashThrottle from 'lodash/throttle';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';




// --------------------------------------------------
//   react-spring
// --------------------------------------------------

const Container = ({ children, lowerSidebar }) => {
  
  const props = useSpring({
    transform: lowerSidebar ? 'translateY(52px)' : 'translateY(0px)',
    config: { duration: 250 },
  });
  
  return <animated.div
      css={css`
        width: 300px;
        
        position: sticky;
        top: 0;
        
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
    
    // this.state = {
    //   initialPosition: true,
    // };
    
    
    // // ---------------------------------------------
    // //   bind
    // // ---------------------------------------------
    
    // this.handleScroll = this.handleScroll.bind(this);
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    // this.scrollYOffset = 0;
    // this.navTopHeight = 53;
    // this.heroImageHeight = lodashGet(this.props, ['stores', 'layout', 'headerHeroImageHeight'], 0);
    // window.addEventListener('scroll', this.handleScroll);
    
  }
  
  
  // --------------------------------------------------
  //   componentWillUnmount
  // --------------------------------------------------
  
  componentWillUnmount() {
    // window.removeEventListener('scroll', this.handleScroll);
  }
  
  
  
  
  // --------------------------------------------------
  //   handleScroll
  // --------------------------------------------------
  
  // handleScroll = lodashThrottle(() => {
    
    
  //   const scrollY = window.scrollY;
    
  //   let scrollUp = false;
  //   let showNavTop = true;
  //   let initialPosition = true;
    
    
  //   // ---------------------------------------------
  //   //   scrollY === 0
  //   // ---------------------------------------------
    
  //   if (scrollY !== 0) {
      
      
  //     // ---------------------------------------------
  //     //   Scroll Up / Scroll Down
  //     // ---------------------------------------------
      
  //     if (scrollY > this.scrollYOffset) {
  //       scrollUp = false;
  //     } else {
  //       scrollUp = true;
  //     }
      
      
  //     // ---------------------------------------------
  //     //   Show Navigation Top
  //     // ---------------------------------------------
      
  //     if (this.heroImageHeight < scrollY) {
        
  //       if (scrollUp) {
  //         showNavTop = true;
  //       } else {
  //         showNavTop = false;
  //       }
        
  //     }
      
      
  //     // ---------------------------------------------
  //     //   Lower Navigation Main
  //     // ---------------------------------------------
      
  //     if (this.navTopHeight + this.heroImageHeight < scrollY) {
        
  //       if (scrollUp && showNavTop) {
  //         initialPosition = false;
  //       }
        
  //     }
      
      
  //   }
    
    
  //   this.scrollYOffset = scrollY;
    
    
    
    
  //   // ---------------------------------------------
  //   //   scrollToで移動する場合、初期位置にする
  //   // ---------------------------------------------
    
  //   // console.log('Sidebar Scroll');
    
  //   const headerScrollToBeginForSidebar = lodashGet(this.props, ['stores', 'layout', 'headerScrollToBeginForSidebar'], false);
    
  //   if (headerScrollToBeginForSidebar) {
      
  //     // console.log('Sidebar Begin');
      
  //     const headerScrollToEndForSidebar = lodashGet(this.props, ['stores', 'layout', 'headerScrollToEndForSidebar'], false);
      
  //     if (headerScrollToEndForSidebar) {
        
  //       // console.log('Sidebar End');
        
  //       lodashSet(this.props, ['stores', 'layout', 'headerScrollToBeginForSidebar'], false);
  //       lodashSet(this.props, ['stores', 'layout', 'headerScrollToEndForSidebar'], false);
        
  //     }
      
  //     initialPosition = true;
      
  //   }
    
    
    
    
  //   // ---------------------------------------------
  //   //   サイドバーがない場合は初期位置にする
  //   // ---------------------------------------------
    
  //   if (window.innerWidth <= 947) {
  //     initialPosition = true;
  //   }
    
    
  //   // ---------------------------------------------
  //   //   console.log
  //   // ---------------------------------------------
    
  //   // console.log(chalk`
  //   //   scrollY: {green ${scrollY}}
  //   //   scrollUp: {green ${scrollUp}}
  //   //   showNavTop: {green ${showNavTop}}
  //   //   initialPosition: {green ${initialPosition}}
  //   // `);
    
    
  //   // ---------------------------------------------
  //   //   setState
  //   // ---------------------------------------------
    
  //   if (this.state.initialPosition !== initialPosition) {
      
  //     this.setState({
  //       initialPosition,
  //     });
      
  //   }
    
    
  // }, 100);
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------

  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores } = this.props;
    
    
    // --------------------------------------------------
    //   react-spring
    // --------------------------------------------------
    
    const lowerSidebar = lodashGet(stores, ['layout', 'lowerSidebar'], false);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container lowerSidebar={lowerSidebar}>
        
        
        {/*<img
          src="/img/sample/knight_f_idle_anim_f0.png"
          width="32"
          height="40"
        />*/}
        
        
        {/* Contents */}
        {this.props.children}
        
        
      </Container>
    );
    
  }
  
};