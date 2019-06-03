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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import CardPlayer from './player';
import CardGame from './game';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// const Container = styled.div`
//   margin: 0;
//   padding: 0;
// `;


// --------------------------------------------------
//   Dialog
// --------------------------------------------------

const cssDialogContent = css`
  && {
    margin: 0;
    padding: 0 !important;
  }
`;




// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/customization/overrides/
// --------------------------------------------------

const stylesObj = {
  
  paper: {
    margin: 0
  },
  
};




// --------------------------------------------------
//   Class
// --------------------------------------------------

@withStyles(stylesObj)
@inject('stores', 'storeCardPlayer')
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
    
    const { classes, storeCardPlayer } = this.props;
    
    const {
      
      cardPlayerDialogObj,
      cardPlayerDialog,
      handleCardPlayerDialogClose
      
    } = storeCardPlayer;
    
    
    // console.log(chalk`
    //   cardPlayerDialogObj.type: {green ${cardPlayerDialogObj.type}}
    //   cardPlayerDialogObj._id: {green ${cardPlayerDialogObj._id}}
    // `);
    
    // --------------------------------------------------
    //   Dialog Card Player
    // --------------------------------------------------
    
    let component = '';
    
    if (cardPlayerDialogObj.type === 'player') {
      // console.log(cardPlayerDialogObj._id);
      
      
      // --------------------------------------------------
      //   Component
      // --------------------------------------------------
      
      component =
        <Dialog
          open={cardPlayerDialog}
          onClose={() => handleCardPlayerDialogClose()}
          scroll="paper"
          classes={{
            paper: classes.paper
          }}
        >
          <DialogContent css={cssDialogContent}>
            <CardPlayer
              cardPlayers_id={cardPlayerDialogObj._id}
              showCardPlayerButton={false}
              showCardGameButton={false}
              showFollow={true}
            />
          </DialogContent>
        </Dialog>
      ;
    
    
    
    
    // --------------------------------------------------
    //   Dialog Card Game
    // --------------------------------------------------
    
    } else if (cardPlayerDialogObj.type === 'game') {
      
      // console.log(cardGames_id);
      
      
      // --------------------------------------------------
      //   Component
      // --------------------------------------------------
      
      component =
        <Dialog
          open={cardPlayerDialog}
          onClose={() => handleCardPlayerDialogClose()}
          scroll="paper"
          classes={{
            paper: classes.paper
          }}
        >
          <DialogContent css={cssDialogContent}>
            <CardGame
              cardGames_id={cardPlayerDialogObj._id}
              showGameName={true}
              showCardPlayerButton={false}
              showCardGameButton={false}
              showFollow={true}
            />
          </DialogContent>
        </Dialog>
      ;
      
      
    } else {
      
      return null;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        {component}
      </React.Fragment>
    );
    
  }
  
};