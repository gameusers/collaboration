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

const Container = ({ children, lower }) => {
  
  const props = useSpring({
    transform: lower ? 'translateY(0px)' : 'translateY(52px)',
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
      lower: true,
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
    let lower = true;
    
    
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
          lower = false;
        }
        
      }
      
      
    }
    
    
    this.scrollYOffset = scrollY;
    
    
    
    
    // ---------------------------------------------
    //   サイドバーがない場合は下げる
    // ---------------------------------------------
    
    if (window.innerWidth <= 947) {
      lower = true;
    }
    
    
    // ---------------------------------------------
    //   console.log
    // ---------------------------------------------
    
    // console.log(chalk`
    //   scrollY: {green ${scrollY}}
    //   scrollUp: {green ${scrollUp}}
    //   showNavTop: {green ${showNavTop}}
    //   lower: {green ${lower}}
    // `);
    
    
    // ---------------------------------------------
    //   setState
    // ---------------------------------------------
    
    if (this.state.lower !== lower) {
      
      this.setState({
        lower,
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
    
    // const { stores } = this.props;
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container lower={this.state.lower}>
        
        
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