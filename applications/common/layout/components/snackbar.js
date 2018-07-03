// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
// import styled from 'styled-components';
// import Link from 'next/link';
import { inject, observer } from 'mobx-react';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


import IconClose from '@material-ui/icons/Close';
// import IconCopyright from '@material-ui/icons/Copyright';
// import IconNavigation from '@material-ui/icons/Navigation';



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
//   Class
// --------------------------------------------------

@inject('stores') @observer
export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  

  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores } = this.props;
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Snackbar
        key={stores.common.keySnackbar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={stores.common.openSnackbar}
        autoHideDuration={5000}
        onClose={stores.common.handleCloseSnackbar}
        onExited={stores.common.handleExitedSnackbar}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{stores.common.messageSnackbar}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            // className={classes.close}
            onClick={stores.common.handleCloseSnackbar}
          >
            <IconClose />
          </IconButton>
        ]}
      />
    );
  }
  
};