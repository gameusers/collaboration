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

import React, { useState } from 'react';
import { useIntl } from 'react-intl';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateLayout } from 'app/@states/layout.js';






// --------------------------------------------------
//   Components
// --------------------------------------------------

const Component = (props) => {
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateLayout = ContainerStateLayout.useContainer();
  
  const {
    
    cardPlayersObj,
    setCardPlayersObj,
    
    dialogCardOpen,
    handleDialogCardClose,
    
  } = stateLayout;
  
  
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  // const open = lodashGet(dialogObj, ['open'], false);
  // const title = lodashGet(dialogObj, ['title'], '');
  // const description = lodashGet(dialogObj, ['description'], '');
  // const handle = lodashGet(dialogObj, ['handle'], () => {});
  // const argumentsObj = lodashGet(dialogObj, ['argumentsObj'], {});
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  // const handleDialogCardOpen = ({
    
  //   cardPlayers_id,
    
  // }) => {
    
  //   setDialogCardOpen(true);
    
  // };
  
  
  
  
  // const handleClick = async ({
    
  //   handle,
  //   argumentsObj,
    
  // }) => {
    
  //   await handle(argumentsObj);
    
  //   handleDialogClose();
    
  // };
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/layout/v2/dialog-card.js
  // `);
  
  // console.log(chalk`
  //   open: {green ${open}}
  // `);
  
  // console.log(`
  //   ----- argumentsObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(argumentsObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Dialog
      open={dialogCardOpen}
      maxWidth='md'
      onClose={() => handleDialogCardClose()}
      scroll='paper'
      // classes={{
      //   paper: classes.paper
      // }}
    >
      
      <DialogContent
        css={css`
          && {
            margin: 0;
            padding: 0;
          }
        `}
      >
        
        AAA
        {/*<CardPlayer
          key={valueObj._id}
          obj={valueObj}
          showFollowButton={false}
          showEditButton={true}
          defaultExpanded={true}
          setCardPlayersArr={setCardPlayersArr}
        />*/}
        
      </DialogContent>
      
    </Dialog>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;