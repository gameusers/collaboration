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
import Scrollbar from 'react-smooth-scrollbar';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.nav`
  width: 100%;
  height: 36px;
  text-align: center;
  background-color: #25283D;
  position: -webkit-sticky;
  position: sticky;
  top: -1px;
  z-index: 1000;
  margin: 0 0 8px 0;
  padding: 0;
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
      
const StyledScrollbar = styled(Scrollbar)`
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 0 8px 0;
`;




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
    
    
    // --------------------------------------------------
    //   Component - Menu
    // --------------------------------------------------
    
    const componentsArr = [];
    
    let active = false;
    
    
    if (headerNavMainArr && headerNavMainArr.length > 0) {
      
      const reverseHeaderMenuArr = headerNavMainArr.slice().reverse();
      
      for (const [index, valueObj] of reverseHeaderMenuArr.entries()) {
        
        // console.log(chalk`
        //   valueObj.pathname: {green ${valueObj.pathname}}
        //   stores.pathname: {green ${stores.pathname}}
        // `);
        
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
      <Container>
      
        <StyledScrollbar alwaysShowTracks>
          {componentsArr}
        </StyledScrollbar>
        
      </Container>
    );
    
  }
  
};