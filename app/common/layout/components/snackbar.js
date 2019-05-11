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
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconCheckCircle from '@material-ui/icons/CheckCircle';
import IconError from '@material-ui/icons/Error';
import IconWarning from '@material-ui/icons/Warning';
import IconInfo from '@material-ui/icons/Info';
import IconClose from '@material-ui/icons/Close';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { CustomError } from '../../../@modules/error/custom';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------




// --------------------------------------------------
//   Component
// --------------------------------------------------

const SnackbarContentWrapper = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const { message, onClose, variant, ...other } = props;
  
  
  // --------------------------------------------------
  //   styled-components
  // --------------------------------------------------
  
  const StyledSpan = styled.span`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  `;
  
  const StyledIconCheckCircle = styled(IconCheckCircle)`
    && {
      font-size: 20px;
      opacity: 0.9;
      margin: 0 6px 0 0;
    }
  `;
  
  const StyledIconError = styled(IconError)`
    && {
      font-size: 20px;
      opacity: 0.9;
      margin: 0 6px 0 0;
    }
  `;
  
  const StyledIconWarning = styled(IconWarning)`
    && {
      font-size: 20px;
      opacity: 0.9;
      margin: 0 6px 0 0;
    }
  `;
  
  const StyledIconInfo = styled(IconInfo)`
    && {
      font-size: 20px;
      opacity: 0.9;
      margin: 0 6px 0 0;
    }
  `;
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------

  return (
    <SnackbarContent
      aria-describedby="client-snackbar"
      message={
        <StyledSpan id="client-snackbar">
          {variant === 'success' ? (
            <StyledIconCheckCircle />
          ) : variant === 'error' ? (
            <StyledIconError />
          ) : variant === 'warning' ? (
            <StyledIconWarning />
          ) : (
            <StyledIconInfo />
          )}
          {message}
        </StyledSpan>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <IconClose />
        </IconButton>,
      ]}
      {...other}
    />
  );
  
};




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
  //   render
  // --------------------------------------------------

  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, intl } = this.props;
    
    
    // --------------------------------------------------
    //   Message
    // --------------------------------------------------
    
    let messageID = lodashGet(stores, ['layout', 'snackbarMessageID'], 'qnWsuPcrJ');
    const errorObj = lodashGet(stores, ['layout', 'snackbarErrorObj'], null);
    
    let errorMessage = '';
    let message = '';
    
    
    if (errorObj) {
      
      if (errorObj instanceof CustomError) {
        
        errorMessage = lodashGet(errorObj, ['errorsArr', 0, 'code'], 'Error');
        messageID = lodashGet(errorObj, ['errorsArr', 0, 'messageID'], 'Error');
        
      } else {
        
        errorMessage = errorObj.message;
        messageID = 'Error';
        
      }
      
    }
    
    
    if (messageID === 'Error') {
      message = `Error Message: ${errorMessage}`;
    } else {
      message = intl.formatMessage({ id: messageID });
    }
    
    
    
    
    // let variant = null;
    // if (this.props.variant) {
    //   variant = this.props.variant;
    // }
    
    // let vertical = 'bottom';
    // if (this.props.vertical) {
    //   vertical = this.props.vertical;
    // }
    
    // let horizontal = 'left';
    // if (this.props.horizontal) {
    //   horizontal = this.props.horizontal;
    // }
    
    // let autoHideDuration = 5000;
    // if (this.props.autoHideDuration) {
    //   autoHideDuration = this.props.autoHideDuration;
    // }
    
    
    // --------------------------------------------------
    //   Colors
    // --------------------------------------------------
    
    const colorsObj = {
      success: {
        color: 'white',
        backgroundColor: '#43a047',
      },
      error: {
        color: 'white',
        backgroundColor: '#d32f2f',
      },
      warning: {
        color: 'white',
        backgroundColor: '#ffa000',
      },
      info: {
        color: 'white',
        backgroundColor: '#1976d2',
      }
    };
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Snackbar
        key={stores.layout.snackbarKey}
        anchorOrigin={{
          vertical: stores.layout.snackbarVertical,
          horizontal: stores.layout.snackbarHorizontal,
        }}
        open={stores.layout.snackbarOpen}
        autoHideDuration={stores.layout.snackbarAutoHideDuration}
        onClose={stores.layout.handleSnackbarClose}
        onExited={stores.layout.handleSnackbarExited}
      >
        <SnackbarContentWrapper
          onClose={stores.layout.handleSnackbarClose}
          variant={stores.layout.snackbarVariant}
          message={message}
          style={colorsObj[stores.layout.snackbarVariant]}
        />
      </Snackbar>
    );
  }
  
});