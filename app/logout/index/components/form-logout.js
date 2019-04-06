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
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandMore from '@material-ui/icons/ExpandMore';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Heading = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const Description = styled.p`
  
`;

const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  && {
    display: flex;
    flex-flow: column wrap;
  }
`;

const SubmitButtonBox = styled.div`
  margin: 20px 0 0 0;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    super(props);
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount(){
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ _id: 'logout' });
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, intl } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Panel
    // --------------------------------------------------
    
    const panelExpanded = lodashGet(stores, ['layout', 'panelExpandedObj', 'logout'], true);
    const handlePanelExpand = lodashGet(stores, ['layout', 'handlePanelExpand'], '');
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = lodashGet(stores, ['layout', 'buttonDisabledObj', 'logout'], true);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- validationUsersLoginIDObj -----\n
    //   ${util.inspect(validationUsersLoginIDObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- validationUsersLoginPasswordObj -----\n
    //   ${util.inspect(validationUsersLoginPasswordObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   process.env.RECAPTCHA_SITE_KEY: {green ${process.env.RECAPTCHA_SITE_KEY}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
        <ExpansionPanel defaultExpanded={true} expanded={panelExpanded}>
          
          
          {/* Heading */}
          <ExpansionPanelSummary expandIcon={<IconExpandMore />} onClick={() => handlePanelExpand({ _id: 'logout' })}>
            <Heading>ログアウト</Heading>
          </ExpansionPanelSummary>
          
          
          {/* Contents */}
          <StyledExpansionPanelDetails>
            
            <Description>
              ログアウトする場合は以下のボタンを押してください。
            </Description>
            
            
            {/* Submit Button */}
            <SubmitButtonBox>
              <Button
                variant="contained"
                color="primary"
                onClick={() => stores.logoutIndex.handleLogout()}
                disabled={buttonDisabled}
              >
                ログアウト
              </Button>
            </SubmitButtonBox>
            
          </StyledExpansionPanelDetails>
          
        </ExpansionPanel>
        
        
      </React.Fragment>
    );
    
  }
  
});