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
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import moment from 'moment';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconHealing from '@material-ui/icons/Healing';
import IconSchedule from '@material-ui/icons/Schedule';
import IconStars from '@material-ui/icons/Stars';
import IconCard1 from '@material-ui/icons/Layers';



// ---------------------------------------------
//   Moment Locale
// ---------------------------------------------

moment.locale('ja');




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  line-height: 1.4em;
  margin: 0;
  padding: 0;
  
  @media screen and (max-width: 768px) {
    flex-flow: row wrap;
  }
`;


// ---------------------------------------------
//   Name And Status
// ---------------------------------------------

const TopBox = styled.div`
  display: flex;
  flex-flow: row wrap;
`;


// ---------------------------------------------
//   Name
// ---------------------------------------------

const NameNoColor = styled.div`
  font-size: 14px;
  margin: 0 2px 0 0;
  padding: 0;
`;


// ---------------------------------------------
//   Status
// ---------------------------------------------

const StatusBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 0;
  // background-color: pink;
`;

const StyledIconHealing = styled(IconHealing)`
  && {
    font-size: 18px;
    margin: 1px 2px 0 0;
  }
`;

const Status = styled.div`
  font-size: 14px;
  margin: 0 2px 0 0;
`;


// ---------------------------------------------
//   Access Time
// ---------------------------------------------

const AccessTimeBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
  padding: 0;
`;

const StyledIconSchedule = styled(IconSchedule)`
  && {
    font-size: 18px;
    margin: 1px 3px 0 0;
  }
`;

const AccessTime = styled.div`
  font-size: 14px;
  margin: 0 2px 0 0;
`;


// ---------------------------------------------
//   Level
// ---------------------------------------------

const LevelBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
  padding: 0;
`;

const StyledIconStars = styled(IconStars)`
  && {
    font-size: 18px;
    margin: 1px 3px 0 0;
  }
`;

const Level = styled.div`
  font-size: 14px;
  margin: 0 6px 0 0;
`;


// ---------------------------------------------
//   Cards
// ---------------------------------------------

const BottomBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 0 0 0;
`;

const StyledButton = styled(Button)`
  && {
    margin: 0 6px 0 0;
    padding: 0 6px 0 3px;
    font-size: 12px;
    // min-width: 36px;
    min-height: 20px
  }
`;

const StyledIconCard1 = styled(IconCard1)`
  && {
    font-size: 18px;
  }
`;


// ---------------------------------------------
//   Game
// ---------------------------------------------

const GameBox = styled.div`
  font-size: 14px;
  margin: 0;
  padding: 0;
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
  
  
  componentDidMount(){
    this.props.stores.layout.handleButtonDisabledObj(`${this.props.cardPlayers_id}-card-player`, false);
    this.props.stores.layout.handleButtonDisabledObj(`${this.props.cardGames_id}-card-game`, false);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const {
      stores,
      
      anonymity,
      
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
    
    const { buttonDisabledObj } = stores.layout;
    
    const { handleCardPlayerDialogOpen } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   Name
    // --------------------------------------------------
    
    let componentName = '';
    
    if (anonymity) {
      
      componentName = <NameNoColor>ななしさん</NameNoColor>;
      
    } else if (name) {
      
      componentName =
        <NameNoColor>
          <Link href={`${stores.data.urlBase}pl/${playerID}`}>
            <a>{name}</a>
          </Link>
        </NameNoColor>;
      
    } else {
      
      componentName = <NameNoColor>削除済みユーザー</NameNoColor>;
      
    }
    
    
    // --------------------------------------------------
    //   Status
    // --------------------------------------------------
    
    let componentStatus = '';
    
    if (anonymity) {
      
      componentStatus = <StatusBox><StyledIconHealing /><Status>774</Status></StatusBox>;
      
    } else if (status) {
      
      componentStatus = <StatusBox><StyledIconHealing /><Status>{status}</Status></StatusBox>;
      
    } else {
      
      componentStatus = <StatusBox><StyledIconHealing /><Status>deleted</Status></StatusBox>;
      
    }
    
    
    // --------------------------------------------------
    //   Access Time
    // --------------------------------------------------
    
    let componentAccessTime = '';
    
    if (!anonymity && accessDate) {
      
      const datetimeNow = moment().utcOffset(0);
      const datetimeAccess = moment(accessDate).utcOffset(0);
      const accessTime = datetimeAccess.from(datetimeNow);
      
      componentAccessTime = <AccessTimeBox><StyledIconSchedule /><AccessTime>{accessTime}</AccessTime></AccessTimeBox>;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Bottom Box
    // --------------------------------------------------
    
    let componentBottomArr = [];
    
    if (showGameName && gameName && gameUrlID) {
      
      componentBottomArr.push(
        <GameBox key="gameBox">
          <Link href={`${stores.data.urlBase}gc/${gameUrlID}`}>
            <a>{gameName}</a>
          </Link>
        </GameBox>
      );
      
    } else {
      
      
      // --------------------------------------------------
      //   Level
      // --------------------------------------------------
      
      if (!anonymity && level) {
        
        componentBottomArr.push(
          <LevelBox key="levelBox">
            <StyledIconStars />
            <Level>Lv.{level}</Level>
          </LevelBox>
        );
        
      } else {
        
        componentBottomArr.push(
          <LevelBox key="levelBox">
            <StyledIconStars />
            <Level>Lv.0</Level>
          </LevelBox>
        );
        
      }
      
      
      // --------------------------------------------------
      //   Button Card Player
      // --------------------------------------------------
      
      if (!anonymity && showCardPlayerButton && cardPlayers_id) {
        
        
        // --------------------------------------------------
        //   Button Disable - ロードが終わるまで使用禁止
        // --------------------------------------------------
        
        let buttonDisabledCardPlayer = true;
        
        if (`${cardPlayers_id}-card-player` in buttonDisabledObj) {
          buttonDisabledCardPlayer = buttonDisabledObj[`${cardPlayers_id}-card-player`];
        }
        
        
        // --------------------------------------------------
        //   Component
        // --------------------------------------------------
        
        componentBottomArr.push(
          <StyledButton
            variant="outlined"
            onClick={() => handleCardPlayerDialogOpen('player', cardPlayers_id)}
            disabled={buttonDisabledCardPlayer}
            key="cardPlayersButton"
          >
            <StyledIconCard1 />
            Player
          </StyledButton>
        );
        
      }
      
      
      // --------------------------------------------------
      //   Button Card Game
      // --------------------------------------------------
      
      if (!anonymity && showCardGameButton && cardGames_id) {
        
        
        // --------------------------------------------------
        //   Button Disable - ロードが終わるまで使用禁止
        // --------------------------------------------------
        
        let buttonDisabledCardGame = true;
        
        if (`${cardGames_id}-card-game` in buttonDisabledObj) {
          buttonDisabledCardGame = buttonDisabledObj[`${cardGames_id}-card-game`];
        }
        
        
        // --------------------------------------------------
        //   Component
        // --------------------------------------------------
        
        componentBottomArr.push(
          <StyledButton
            variant="outlined"
            onClick={() => handleCardPlayerDialogOpen('game', cardGames_id)}
            disabled={buttonDisabledCardGame}
            key="cardGamesButton"
          >
            <StyledIconCard1 />
            Game
          </StyledButton>
        );
        
      }
      
      
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
        <TopBox>
          {componentName}
          {componentStatus}
          {componentAccessTime}
        </TopBox>
        
        <BottomBox>
          {componentBottomArr}
        </BottomBox>
      </Container>
    );
    
  }
  
};