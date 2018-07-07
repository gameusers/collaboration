// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import styled from 'styled-components';
// import Link from 'next/link';
import { inject, observer } from 'mobx-react';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';

import IconCheckCircle from '@material-ui/icons/CheckCircle';
import IconError from '@material-ui/icons/Error';
import IconWarning from '@material-ui/icons/Warning';
import IconInfo from '@material-ui/icons/Info';
import IconClose from '@material-ui/icons/Close';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// const Footer = styled.footer`
//   // display: flex;
//   // flex-direction: column;
//   position: relative;
//   padding: 6px 0 6px;
//   background-color: black;
//   color: white;
// `;




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
export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  

  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores } = this.props;
    
    
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
        key={stores.layout.keySnackbar}
        anchorOrigin={{
          vertical: stores.layout.verticalSnackbar,
          horizontal: stores.layout.horizontalSnackbar,
        }}
        open={stores.layout.openSnackbar}
        autoHideDuration={stores.layout.autoHideDurationSnackbar}
        onClose={stores.layout.handleCloseSnackbar}
        onExited={stores.layout.handleExitedSnackbar}
      >
        <SnackbarContentWrapper
          onClose={stores.layout.handleCloseSnackbar}
          variant={stores.layout.variantSnackbar}
          message={stores.layout.messageSnackbar}
          style={colorsObj[stores.layout.variantSnackbar]}
        />
      </Snackbar>
    );
  }
  
};