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
//   Components
// ---------------------------------------------

import Thumbnail from './thumbnail';
import Name from './name';




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
      
      name,
      playerID,
      status,
      accessDate,
      
      gameName,
      gameUrlID,
      showGameName,
      
      exp,
      
      cardPlayers_id,
      showCardPlayerButton,
      cardGames_id,
      showCardGameButton
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          display: flex;
          flex-flow: row nowrap;
        `}
      >
        
        
        {/* Thumbnail */}
        <div
          css={css`
            display: flex;
            flex-flow: column nowrap;
          `}
        >
          <Thumbnail thumbnailSrc={thumbnailSrc} />
        </div>
        
        
        {/* Name */}
        <div
          css={css`
            display: flex;
            flex-flow: column nowrap;
            padding: 0 0 0 10px;
            
            @media screen and (max-width: 480px) {
              max-width: initial;
            }
          `}
        >
          
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
            `}
          >
            
            <Name
              name={name}
              playerID={playerID}
              status={status}
              accessDate={accessDate}
              
              gameName={gameName}
              gameUrlID={gameUrlID}
              showGameName={showGameName}
              
              exp={exp}
              
              cardPlayers_id={cardPlayers_id}
              showCardGameButton={showCardGameButton}
              cardGames_id={cardGames_id}
              showCardPlayerButton={showCardPlayerButton}
            />
            
          </div>
          
        </div>
        
        
      </div>
    );
    
  }
  
};