// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import Button from '@material-ui/core/Button';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const ContainerButton = styled.div`
  margin: 0 12px 0 0;
`;

const Box = styled.div`
  margin: 4px 12px 0 0;
`;

const ATag = styled.a`
  text-decoration: none;
`;

const StyledButton = styled(Button)`
  margin: 0 !important;
  padding: 0 !important;
  font-size: 12px !important;
  min-width: 36px !important;
  min-height: 20px !important;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@observer
export default class extends React.Component {
  
  // constructor(props) {
  //   super(props);
  // }


  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    // const { stores } = this.props;
    // console.dir(this.props);
    
    
    // --------------------------------------------------
    //   Data Link
    // --------------------------------------------------
    
    let codeArr = [];
    
    
    if (this.props.linkArr) {
      
      this.props.linkArr.forEach((value, index) => {
        
        if (value.type === 'Official') {
          
          codeArr.push(
            <ContainerButton key={index}>
              <ATag href={value.url} target="_blank">
                <StyledButton
                  variant="contained"
                  color="secondary"
                >
                  公式
                </StyledButton>
              </ATag>
            </ContainerButton>
          );
          
        } else if (value.type === 'Twitter') {
          
          codeArr.push(
            <Box key={index}>
              <ATag href={value.url} target="_blank">
                <img src="/static/img/common/social/twitter@2x.png" width="20" height="20" />
              </ATag>
            </Box>
          );
          
        } else if (value.type === 'Facebook') {
          
          codeArr.push(
            <Box key={index}>
              <ATag href={value.url} target="_blank">
                <img src="/static/img/common/social/facebook@2x.png" width="20" height="20" />
              </ATag>
            </Box>
          );
          
        } else if (value.type === 'YouTube') {
          
          codeArr.push(
            <Box key={index}>
              <ATag href={value.url} target="_blank">
                <img src="/static/img/common/social/youtube@2x.png" width="20" height="20" />
              </ATag>
            </Box>
          );
          
        } else if (value.type === 'Steam') {
          
          codeArr.push(
            <Box key={index}>
              <ATag href={value.url} target="_blank">
                <img src="/static/img/common/social/steam@2x.png" width="20" height="20" />
              </ATag>
            </Box>
          );
          
        }
        
      });
      
    }
    
    
    return (
      <React.Fragment>
        {codeArr}
      </React.Fragment>
    );
    
  }
  
};