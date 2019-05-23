// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';


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

const Container = styled.div`
  margin: 0;
  padding: 0;
`;


// --------------------------------------------------
//   Dialog
// --------------------------------------------------

const StyledDialogContent = styled(DialogContent)`
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
    
    const { classes, stores } = this.props;
    
    const {
      
      cardPlayerDialogObj,
      cardPlayerDialog,
      handleCardPlayerDialogClose
      
    } = stores.cardPlayer;
    
    
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
          <StyledDialogContent>
            <CardPlayer
              cardPlayers_id={cardPlayerDialogObj._id}
              showCardPlayerButton={false}
              showCardGameButton={false}
              showFollow={true}
            />
          </StyledDialogContent>
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
          <StyledDialogContent>
            <CardGame
              cardGames_id={cardPlayerDialogObj._id}
              showGameName={true}
              showCardPlayerButton={false}
              showCardGameButton={false}
              showFollow={true}
            />
          </StyledDialogContent>
        </Dialog>
      ;
      
      
    } else {
      
      return null;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
        {component}
      </Container>
    );
    
  }
  
};