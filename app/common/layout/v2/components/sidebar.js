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

import { useSpring, animated } from 'react-spring';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

// import lodashGet from 'lodash/get';
// import lodashSet from 'lodash/set';
// import lodashThrottle from 'lodash/throttle';






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

/**
 * react-spring
 * 参考：https://www.react-spring.io/
 */
const Container = ({ children, showNavTop, lowerSidebar }) => {
  
  
  // --------------------------------------------------
  //   移動させる距離を指定
  // --------------------------------------------------
  
  let ypx = 52;
  
  // Navigation Top が表示されている場合は、大きく移動させる
  if (showNavTop) {
    ypx = 105;
  }
  
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




/**
 * Export Component
 */
const Component = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    showNavTop,
    lowerSidebar,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/layout/v2/components/sidebar.js
  // `);
  
  // console.log(chalk`
  //   login: {green ${login}}
  // `);
  
  // console.log(`
  //   ----- linkArr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(linkArr)), { colors: true, depth: null })}\n
  //   --------------------\n
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
      {props.children}
      
      
    </Container>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;