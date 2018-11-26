// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconStars from '@material-ui/icons/Stars';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 0;
  line-height: 1em;
`;

const StyledIconStars = styled(IconStars)`
  && {
    font-size: 18px;
    margin: 0 2px 0 0;
  }
`;

const Level = styled.div`
  font-size: 14px;
  margin: 2px 0 0 0;
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
    
    const { stores, users_id } = this.props;
    
    const usersObj = stores.data.usersObj;
    
    
    
    // --------------------------------------------------
    //   Level
    // --------------------------------------------------
    
    const level = usersObj[users_id].level;
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
        <StyledIconStars />
        <Level>Lv.{level}</Level>
      </Container>
    );
    
  }
  
};