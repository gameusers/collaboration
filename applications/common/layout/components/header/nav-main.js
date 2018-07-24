// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import Scrollbar from 'react-smooth-scrollbar';

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
      
const ButtonMenuActive = styled(Button)`
  && {
    color: white;
    padding: 2px 0 0;
    border-bottom: solid 2px #B40431;
  }
`;
      
const ButtonMenu = styled(Button)`
  && {
    color: #BDBDBD;
    padding: 2px 0 0;
    border-bottom: solid 2px #25283D;
  }
`;
      
const ScrollbarContainer = styled(Scrollbar)`
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
    //   Menu
    // --------------------------------------------------
    
    const codeArr = [];
    let active = false;
    
    
    if (headerNavMainArr && headerNavMainArr.length > 0) {
      
      const reverseHeaderMenuArr = headerNavMainArr.slice().reverse();
      
      reverseHeaderMenuArr.forEach((value, index) => {
        
        if (value.pathname === stores.pathname || (!active && index + 1 === reverseHeaderMenuArr.length)) {
          
          codeArr.unshift(
            <ButtonMenuActive key={index}>
              {value.name}
            </ButtonMenuActive>
          );
          
          active = true;
          
        } else {
          
          codeArr.unshift(
            <Link prefetch href={value.pathname} key={index}>
              <ButtonMenu>
                {value.name}
              </ButtonMenu>
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
        <ScrollbarContainer
          alwaysShowTracks
        >
          {codeArr}
        </ScrollbarContainer>
      </Container>
    );
    
  }
  
};