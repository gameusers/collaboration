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
import { observer } from 'mobx-react';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 6px 10px 1px 10px;
`;

const ButtonBox = styled.div`
  margin: 0 12px 0 0;
`;

const Box = styled.div`
  margin: 4px 12px 0 0;
`;

const StyledButton = styled(Button)`
  && {
    font-size: 12px;
    min-width: 36px;
    min-height: 20px;
    margin: 0;
    padding: 0 5px;
  }
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

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
    
    const { linkArr = [] } = this.props;
    
    
    // --------------------------------------------------
    //   Data Link
    // --------------------------------------------------
    
    let codeArr = [];
    
    
    for (const [index, valueObj] of linkArr.entries()) {
      
      if (valueObj.type === 'Official') {
        
        codeArr.push(
          <ButtonBox key={index}>
            <StyledButton
              variant="contained"
              color="secondary"
              href={valueObj.url}
              target="_blank"
            >
              公式
            </StyledButton>
          </ButtonBox>
        );
        
      } else if (valueObj.type === 'Other') {
        
        codeArr.push(
          <ButtonBox key={index}>
            <StyledButton
              variant="contained"
              color="secondary"
              href={valueObj.url}
              target="_blank"
            >
              {valueObj.label}
            </StyledButton>
          </ButtonBox>
        );
        
      } else if (valueObj.type === 'Twitter') {
        
        codeArr.push(
          <Box key={index}>
            <a href={valueObj.url} target="_blank">
              <img src="/static/img/common/social/twitter@2x.png" width="20" height="20" />
            </a>
          </Box>
        );
        
      } else if (valueObj.type === 'Facebook') {
        
        codeArr.push(
          <Box key={index}>
            <a href={valueObj.url} target="_blank">
              <img src="/static/img/common/social/facebook@2x.png" width="20" height="20" />
            </a>
          </Box>
        );
        
      } else if (valueObj.type === 'YouTube') {
        
        codeArr.push(
          <Box key={index}>
            <a href={valueObj.url} target="_blank">
              <img src="/static/img/common/social/youtube@2x.png" width="20" height="20" />
            </a>
          </Box>
        );
        
      } else if (valueObj.type === 'Steam') {
        
        codeArr.push(
          <Box key={index}>
            <a href={valueObj.url} target="_blank">
              <img src="/static/img/common/social/steam@2x.png" width="20" height="20" />
            </a>
          </Box>
        );
        
      }
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
        {codeArr}
      </Container>
    );
    
    
  }
  
};