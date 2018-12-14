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
import moment from 'moment';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconHealing from '@material-ui/icons/Healing';
import IconSchedule from '@material-ui/icons/Schedule';
import IconStars from '@material-ui/icons/Stars';
import IconCard1 from '@material-ui/icons/Layers';
import IconCard2 from '@material-ui/icons/LayersOutlined';



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
  // background-color: green;
  
  @media screen and (max-width: 768px) {
    flex-flow: row wrap;
  }
`;



// ---------------------------------------------
//   Name And Status
// ---------------------------------------------

const NameAndStatusBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  // align-items: flex-end;
  // background-color: green;
`;


// ---------------------------------------------
//   Name
// ---------------------------------------------

const Name = styled.div`
  font-size: 14px;
  color: #337ab7;
  margin: 0 2px 0 0;
  padding: 0;
`;

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
//   Player Card
// ---------------------------------------------




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

const LevelAndCardBox = styled.div`
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

const StyledIconCard2 = styled(IconCard2)`
  && {
    font-size: 18px;
  }
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
      cardPlayers_id,
      cardGames_id,
      anonymity,
      name,
      status,
      accessDate,
      level
    } = this.props;
    
    const {
      
      buttonDisabledObj
      
    } = stores.layout;
    
    
    // --------------------------------------------------
    //   Name
    // --------------------------------------------------
    
    let componentName = '';
    
    if (anonymity) {
      
      componentName = <NameNoColor>ななしさん</NameNoColor>;
      
    } else if (name) {
      
      componentName = <NameNoColor>{name}</NameNoColor>;
      
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
    //   Level
    // --------------------------------------------------
    
    let componentLevel = '';
    
    if (!anonymity && level) {
      
      componentLevel = <LevelBox><StyledIconStars /><Level>Lv.{level}</Level></LevelBox>;
      
    } else {
      
       componentLevel = <LevelBox><StyledIconStars /><Level>Lv.0</Level></LevelBox>;
      
    }
    
    
    // --------------------------------------------------
    //   Button Card Player
    // --------------------------------------------------
    
    let componentCardPlayersButton = '';
    
    if (!anonymity && cardPlayers_id) {
      
      
      // --------------------------------------------------
      //   Button Disabled
      // --------------------------------------------------
      
      let buttonDisabledCardPlayer = true;
      
      if (`${cardPlayers_id}-card-player` in buttonDisabledObj) {
        buttonDisabledCardPlayer = buttonDisabledObj[`${cardPlayers_id}-card-player`];
      }
      
      
      componentCardPlayersButton = 
        <StyledButton
          variant="outlined"
          // onClick={() => handleFollowSubmit('follow', cardPlayers_id, users_id)}
          disabled={buttonDisabledCardPlayer}
        >
          <StyledIconCard1 />
          Player
        </StyledButton>
      ;
      
    }
    
    
    // --------------------------------------------------
    //   Button Card Game
    // --------------------------------------------------
    
    let componentCardGamesButton = '';
    
    if (!anonymity && cardGames_id) {
      
      
      // --------------------------------------------------
      //   Button Disabled
      // --------------------------------------------------
      
      let buttonDisabledCardGame = true;
      
      if (`${cardGames_id}-card-game` in buttonDisabledObj) {
        buttonDisabledCardGame = buttonDisabledObj[`${cardGames_id}-card-game`];
      }
      
      
      componentCardGamesButton = 
        <StyledButton
          variant="outlined"
          // onClick={() => handleFollowSubmit('follow', cardPlayers_id, users_id)}
          disabled={buttonDisabledCardGame}
        >
          <StyledIconCard1 />
          Game
        </StyledButton>
      ;
      
    }
    
    
    
    // console.log(chalk`
    //   users_id: {green ${users_id}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
        <NameAndStatusBox>
          {componentName}
          {componentStatus}
          {componentAccessTime}
          
        </NameAndStatusBox>
        
        <LevelAndCardBox>
          
          {componentLevel}
          
          {componentCardPlayersButton}
          {componentCardGamesButton}
          
        </LevelAndCardBox>
      </Container>
    );
    
  }
  
};