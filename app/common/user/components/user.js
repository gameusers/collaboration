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


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Thumbnail from './thumbnail';
import Name from './name';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const ThumbnailBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const InfoBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 2px 0 0 10px;
  
  @media screen and (max-width: 480px) {
    max-width: initial;
  }
`;

const NameBox = styled.div`
  display: flex;
  flex-flow: row wrap;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
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
    
    const {
      
      thumbnailSrc,
      
      // anonymity,
      name,
      playerID,
      status,
      accessDate,
      
      gameName,
      gameUrlID,
      showGameName,
      
      experience,
      cardPlayers_id,
      showCardPlayerButton,
      cardGames_id,
      showCardGameButton
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
        
        <ThumbnailBox>
          <Thumbnail thumbnailSrc={thumbnailSrc} />
        </ThumbnailBox>
        
        
        <InfoBox>
          
          <NameBox>
            <Name
              name={name}
              playerID={playerID}
              status={status}
              accessDate={accessDate}
              
              gameName={gameName}
              gameUrlID={gameUrlID}
              showGameName={showGameName}
              
              experience={experience}
              cardPlayers_id={cardPlayers_id}
              showCardGameButton={showCardGameButton}
              cardGames_id={cardGames_id}
              showCardPlayerButton={showCardPlayerButton}
            />
          </NameBox>
          
        </InfoBox>
        
      </Container>
    );
    
  }
  
};