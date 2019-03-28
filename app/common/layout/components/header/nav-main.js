// --------------------------------------------------
//   Import
// --------------------------------------------------

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
  margin: 0 0 8px 0;
  padding: 0;
  
  width: 100%;
  height: 36px;
  text-align: center;
  background-color: #25283D;
  position: -webkit-sticky;
  position: sticky;
  top: -1px;
  z-index: 1200;
`;
      
const MenuActiveButton = styled(Button)`
  && {
    height: 36px;
    color: white;
    margin: 0 10px 0 0;
    border-bottom: solid 2px #B40431;
  }
`;
      
const MenuButton = styled(Button)`
  && {
    height: 36px;
    color: #BDBDBD;
    margin: 0 10px 0 0;
    // padding: 2px 0 0;
    border-bottom: solid 2px #25283D;
  }
`;
      
const StyledScrollbar = styled(Scrollbar)`
  padding: 0 0 8px 0;
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }


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
      
      reverseHeaderMenuArr.forEach((value, index) => {
        
        if (value.pathname === stores.pathname || (!active && index + 1 === reverseHeaderMenuArr.length)) {
          
          componentsArr.unshift(
            <MenuActiveButton key={index}>
              {value.name}
            </MenuActiveButton>
          );
          
          active = true;
          
        } else {
          
          componentsArr.unshift(
            <Link href={value.pathname} key={index}>
              <MenuButton>
                {value.name}
              </MenuButton>
            </Link>
          );
          
        }
        
      });
      
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