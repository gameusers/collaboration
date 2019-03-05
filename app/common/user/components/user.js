// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';
// import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import UserThumbnail from './thumbnail';
import UserName from './name';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const UserThumbnailBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
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
`;




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
      
      level,
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
        
      </Container>
    );
    
  }
  
};