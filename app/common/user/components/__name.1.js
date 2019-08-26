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
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


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
import IconLayers from '@material-ui/icons/Layers';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreCardPlayer from '../../card/player/stores/player';




// ---------------------------------------------
//   Moment Locale
// ---------------------------------------------

moment.locale('ja');




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

// ---------------------------------------------
//   Name
// ---------------------------------------------

const cssNameNoColor = css`
  font-size: 14px;
  margin: 0 2px 0 0;
`;


// ---------------------------------------------
//   Status
// ---------------------------------------------

const cssStatusBox = css`
  display: flex;
  flex-flow: row wrap;
`;

const cssIconHealing = css`
  && {
    font-size: 18px;
    margin: 1px 2px 0 0;
  }
`;

const cssStatus = css`
  font-size: 14px;
  margin: 0 2px 0 0;
`;


// ---------------------------------------------
//   Level
// ---------------------------------------------

const cssLevelBox = css`
  display: flex;
  flex-flow: row nowrap;
`;

const cssIconStars = css`
  && {
    font-size: 18px;
    margin: 1px 3px 0 0;
  }
`;

const cssLevel = css`
  font-size: 14px;
  margin: 0 6px 0 0;
`;


// ---------------------------------------------
//   Cards
// ---------------------------------------------

const cssButton = css`
  && {
    margin: 0 6px 0 0;
    padding: 0 6px 0 3px;
    font-size: 12px;
    // min-width: 36px;
    min-height: 20px
  }
`;

const cssIconLayers = css`
  font-size: 18px;
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
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    this.storeCardPlayer = initStoreCardPlayer({});
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount(){
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ _id: `${this.props.cardPlayers_id}-card-player` });
    this.props.stores.layout.handleButtonEnable({ _id: `${this.props.cardGames_id}-card-game` });
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const {
      
      stores,
      
      anonymity,
      
      name,
      userID,
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
    
    const { buttonDisabledObj } = stores.layout;
    
    const { handleCardPlayerDialogOpen } = this.storeCardPlayer;
    
    
    // --------------------------------------------------
    //   Name
    // --------------------------------------------------
    
    let componentName = '';
    
    if (anonymity) {
      
      componentName = <div css={cssNameNoColor}>ななしさん</div>;
      
    } else if (name) {
      
      componentName =
        <div css={cssNameNoColor}>
          <Link href={`${stores.data.urlBase}ur/${userID}`}>
            <a>{name}</a>
          </Link>
        </div>;
      
    } else {
      
      componentName = <div css={cssNameNoColor}>削除済みユーザー</div>;
      
    }
    
    
    // --------------------------------------------------
    //   Status
    // --------------------------------------------------
    
    let componentStatus = '';
    
    if (anonymity) {
      
      componentStatus = <div css={cssStatusBox}><IconHealing css={cssIconHealing} /><div css={cssStatus}>774</div></div>;
      
    } else if (status) {
      
      componentStatus = <div css={cssStatusBox}><IconHealing css={cssIconHealing} /><div css={cssStatus}>{status}</div></div>;
      
    } else {
      
      componentStatus = <div css={cssStatusBox}><IconHealing css={cssIconHealing} /><div css={cssStatus}>deleted</div></div>;
      
    }
    
    
    // --------------------------------------------------
    //   Access Time
    // --------------------------------------------------
    
    let componentAccessTime = '';
    
    if (!anonymity && accessDate) {
      
      const datetimeNow = moment().utcOffset(0);
      const datetimeAccess = moment(accessDate).utcOffset(0);
      const accessTime = datetimeAccess.from(datetimeNow);
      
      componentAccessTime =
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
          `}
        >
          <IconSchedule
            css={css`
              && {
                font-size: 18px;
                margin: 1px 3px 0 0;
              }
            `}
          />
            <div
              css={css`
                font-size: 14px;
                margin: 0 2px 0 0;
              `}
            >
              {accessTime}
            </div>
        </div>
      ;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Bottom Box
    // --------------------------------------------------
    
    let componentBottomArr = [];
    
    if (showGameName && gameName && gameUrlID) {
      
      componentBottomArr.push(
        <div
          css={css`
            font-size: 14px;
          `}
          key="gameBox"
        >
          <Link href={`${stores.data.urlBase}gc/${gameUrlID}`}>
            <a>{gameName}</a>
          </Link>
        </div>
      );
      
    } else {
      
      
      // --------------------------------------------------
      //   Level
      // --------------------------------------------------
      
      if (!anonymity && experience) {
        
        const level = Math.floor(experience / 10);
        
        componentBottomArr.push(
          <div css={cssLevelBox} key="levelBox">
            <IconStars css={cssIconStars} />
            <div css={cssLevel}>Lv.{level}</div>
          </div>
        );
        
      } else {
        
        componentBottomArr.push(
          <div css={cssLevelBox} key="levelBox">
            <IconStars css={cssIconStars} />
            <div css={cssLevel}>Lv.0</div>
          </div>
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
          <Button
            css={cssButton}
            variant="outlined"
            onClick={() => handleCardPlayerDialogOpen('player', cardPlayers_id)}
            disabled={buttonDisabledCardPlayer}
            key="cardPlayersButton"
          >
            <IconLayers css={cssIconLayers} />
            Player
          </Button>
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
          <Button
            css={cssButton}
            variant="outlined"
            onClick={() => handleCardPlayerDialogOpen('game', cardGames_id)}
            disabled={buttonDisabledCardGame}
            key="cardGamesButton"
          >
            <IconLayers css={cssIconLayers} />
            Game
          </Button>
        );
        
      }
      
      
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          display: flex;
          flex-flow: column wrap;
          line-height: 1.6em;
          
          @media screen and (max-width: 768px) {
            flex-flow: row wrap;
          }
        `}
      >
        
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
          `}
        >
          {componentName}
          {componentStatus}
          {componentAccessTime}
        </div>
        
        <div
          css={css`
            display: flex;
            flex-flow: row nowrap;
          `}
        >
          {componentBottomArr}
        </div>
        
      </div>
    );
    
  }
  
};