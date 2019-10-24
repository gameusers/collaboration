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
    font-size: 12px;
    height: 22px;
    min-height: 22px;
    margin: 0 6px 0 0;
    padding: 0 6px 0 3px;
  }
`;

const cssIconLayers = css`
  font-size: 16px !important;
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
    //   Path Array
    // --------------------------------------------------
    
    this.pathArr = [props.cardPlayers_id, 'userNameObj'];
    
    
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
    
    if (this.props.cardPlayers_id) {
      this.props.stores.layout.handleButtonEnable({ pathArr: this.pathArr });
    }
    
    
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
      
      name,
      userID,
      status,
      accessDate,
      
      gameName,
      gameUrlID,
      
      exp,
      
      cardPlayers_id,
      
    } = this.props;
    
    const { handleCardPlayerDialogOpen } = this.storeCardPlayer;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    let buttonDisabled = true;
    
    if (cardPlayers_id) {
      buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - Name
    // --------------------------------------------------
    
    let componentName = '';
    
    if (name && userID) {
      
      componentName =
        <div css={cssNameNoColor}>
          <Link
            href={`/ur/user?userID=${userID}`}
            as={`/ur/${userID}`}
          >
            <a>{name}</a>
          </Link>
        </div>
      ;
      
    } else if (name) {
      
      componentName =
        <div css={cssNameNoColor}>
          {name}
        </div>
      ;
      
    } else {
      
      componentName = <div css={cssNameNoColor}>ななしさん</div>;
      
    }
    
    
    // --------------------------------------------------
    //   Component - Status
    // --------------------------------------------------
    
    let componentStatus = '';
    
    if (status) {
      componentStatus =
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
          `}
        >
          
          <IconHealing
            css={css`
              && {
                font-size: 18px;
                margin: 1px 2px 0 0;
              }
            `}
          />
          
          <div
            css={css`
              font-size: 14px;
              margin: 0 2px 0 0;
            `}
          >
            {status}
          </div>
          
        </div>
      ;
    }
    
    
    // --------------------------------------------------
    //   Component - Access Time
    // --------------------------------------------------
    
    let componentAccessTime = '';
    
    if (accessDate) {
      
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
    //   下段
    // --------------------------------------------------
    
    let componentBottomArr = [];
    
    if (gameName && gameUrlID) {
      
      // componentBottomArr.push(
      //   <div
      //     css={css`
      //       font-size: 14px;
      //     `}
      //     key="gameBox"
      //   >
      //     <Link href={`${process.env.URL_BASE}gc/${gameUrlID}`}>
      //       <a>{gameName}</a>
      //     </Link>
      //   </div>
      // );
      
    } else {
      
      
      // --------------------------------------------------
      //   Component - Level
      // --------------------------------------------------
      
      if (exp) {
        
        const level = Math.floor(exp / 10);
        
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
      //   Component - Button / Open Card Player
      // --------------------------------------------------
      
      if (cardPlayers_id) {
        
        componentBottomArr.push(
          <Button
            css={cssButton}
            variant="outlined"
            onClick={() => handleCardPlayerDialogOpen({ cardPlayers_id })}
            disabled={buttonDisabled}
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
      
      // if (showCardGameButton && cardGames_id) {
        
        
      //   // --------------------------------------------------
      //   //   Button Disable - ロードが終わるまで使用禁止
      //   // --------------------------------------------------
        
      //   let buttonDisabledCardGame = true;
        
      //   if (`${cardGames_id}-card-game` in buttonDisabledObj) {
      //     buttonDisabledCardGame = buttonDisabledObj[`${cardGames_id}-card-game`];
      //   }
        
        
      //   // --------------------------------------------------
      //   //   Component
      //   // --------------------------------------------------
        
      //   componentBottomArr.push(
      //     <Button
      //       css={cssButton}
      //       variant="outlined"
      //       onClick={() => handleCardPlayerDialogOpen('game', cardGames_id)}
      //       disabled={buttonDisabledCardGame}
      //       key="cardGamesButton"
      //     >
      //       <IconLayers css={cssIconLayers} />
      //       Game
      //     </Button>
      //   );
        
      // }
      
      
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
          
          // @media screen and (max-width: 768px) {
          //   flex-flow: row wrap;
          // }
        `}
      >
        
        
        {/* 上段 */}
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
        
        
        {/* 下段 */}
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