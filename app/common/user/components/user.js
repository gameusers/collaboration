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

import UserThumbnail from './thumbnail';
import UserName from './name';
// import CardPlayer from '../../app/common/card/player/components/player';
import CardGame from '../../../common/card/player/components/game';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
  padding: 0;
`;

const UserThumbnailBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0 0 0 0;
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 2px 0 0 10px;
  
  @media screen and (max-width: 480px) {
    max-width: initial;
  }
`;

const UserNameBox = styled.div`
  display: flex;
  flex-flow: row wrap;
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
    
    const {
      classes,
      stores,
      
      thumbnailSrc,
      
      // anonymity,
      name,
      playerID,
      status,
      accessDate,
      
      gameName,
      gameUrlID,
      showGameName,
      
      level,
      cardPlayers_id,
      showCardPlayerButton,
      cardGames_id,
      showCardGameButton
    } = this.props;
    
    
    const {
      
      cardPlayerDialogObj,
      handleCardPlayerDialogClose
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   Dialog Card Game
    // --------------------------------------------------
    
    let componentDialogCardGame = '';
    
    if (cardGames_id) {
      
      
      // --------------------------------------------------
      //   Dialog Open
      // --------------------------------------------------
      
      let dialogOpen = false;
      
      if (cardGames_id in cardPlayerDialogObj) {
        dialogOpen = cardPlayerDialogObj[cardGames_id];
      }
      
      
      // --------------------------------------------------
      //   Component
      // --------------------------------------------------
      
      componentDialogCardGame =
        <Dialog
          open={dialogOpen}
          onClose={() => handleCardPlayerDialogClose(cardGames_id)}
          scroll="paper"
          classes={{
            paper: classes.paper
          }}
        >
          <StyledDialogContent>
            <CardGame
              cardGames_id={cardGames_id}
              showGameName={true}
              showCardPlayerButton={false}
              showCardGameButton={false}
              showFollow={true}
            />
          </StyledDialogContent>
        </Dialog>
      ;
      
      
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
        
        <UserThumbnailBox>
          <UserThumbnail thumbnailSrc={thumbnailSrc} />
        </UserThumbnailBox>
        
        
        <UserInfoBox>
          
          <UserNameBox>
            <UserName
              name={name}
              playerID={playerID}
              status={status}
              accessDate={accessDate}
              
              gameName={gameName}
              gameUrlID={gameUrlID}
              showGameName={showGameName}
              
              level={level}
              cardPlayers_id={cardPlayers_id}
              showCardGameButton={showCardGameButton}
              cardGames_id={cardGames_id}
              showCardPlayerButton={showCardPlayerButton}
            />
          </UserNameBox>
          
        </UserInfoBox>
        
        
        {componentDialogCardGame}
        
      </Container>
    );
    
  }
  
};