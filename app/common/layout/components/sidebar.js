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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
// import lodashSet from 'lodash/set';
// import lodashThrottle from 'lodash/throttle';






// --------------------------------------------------
//   react-spring
// --------------------------------------------------

const Container = ({ children, showNavTop, lowerSidebar }) => {
  
  
  // --------------------------------------------------
  //   移動させる距離を指定
  // --------------------------------------------------
  
  let ypx = 52;
  
  // Navigation Top が表示されている場合は、大きく移動させる
  if (showNavTop) {
    ypx = 105;
  }
  
  // ypx = 105;
  
  // console.log(chalk`
  //   showNavTop: {green ${showNavTop}}
  //   lowerSidebar: {green ${lowerSidebar}}
  //   ypx: {green ${ypx}}
  // `);
  
  
  const props = useSpring({
    transform: lowerSidebar ? `translateY(${ypx}px)` : 'translateY(0px)',
    config: { duration: 250 },
  });
  
  return <animated.div
    css={css`
      width: 300px;
      margin: 0 0 50px 0;
      
      position: sticky;
      top: 0;
      
      @media screen and (max-width: 947px) {
        width: 100%;
        position: static;
        margin: 0;
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
    
    const showNavTop = lodashGet(stores, ['layout', 'showNavTop'], true);
    const lowerSidebar = lodashGet(stores, ['layout', 'lowerSidebar'], false);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/layout/components/sidebar.js
    // `);
    
    // console.log(chalk`
    //   showNavTop: {green ${showNavTop}}
    //   lowerSidebar: {green ${lowerSidebar}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container
        showNavTop={showNavTop}
        lowerSidebar={lowerSidebar}
      >
        
        
        {/* Contents */}
        {this.props.children}
        
        
      </Container>
    );
    
  }
  
};