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
import { observer } from 'mobx-react';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Avatar from '@material-ui/core/Avatar';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconGrade from '@material-ui/icons/Grade';
import IconPC from '@material-ui/icons/LaptopMac';


// ---------------------------------------------
//   Simple Icons
// ---------------------------------------------

import SimpleIcons from 'simple-icons-react-component';




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssAvatar = css`
  && {
    width: 32px;
    height: 32px;
    line-height: 1;
    background-color: #003791;
  }
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { platform, label, id, games_id, gamesName, gamesImagesAndVideosThumbnailObj = {} } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (!platform && !id) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - Avatar & Label
    // --------------------------------------------------
    
    let componentAvatar = '';
    let labelValue = '';
    
    
    // ---------------------------------------------
    //   PlayStation
    // ---------------------------------------------
    
    if (platform === 'PlayStation') {
      
      componentAvatar =
        <Avatar css={cssAvatar} alt="PlayStation" style={{ 'backgroundColor': '#003791' }}>
          <div style={{ 'width': '80%', 'marginTop': '4px' }}>
            <SimpleIcons name="PlayStation" color="white" />
          </div>
        </Avatar>
      ;
      labelValue = 'PlayStation';
      
      
    // ---------------------------------------------
    //   Xbox
    // ---------------------------------------------
      
    } else if (platform === 'Xbox') {
      
      componentAvatar =
        <Avatar css={cssAvatar} alt="Xbox" style={{ 'backgroundColor': '#107C10' }}>
          <div style={{ 'width': '75%', 'marginTop': '2px' }}>
            <SimpleIcons name="Xbox" color="white" />
          </div>
        </Avatar>
      ;
      labelValue = 'Xbox';
      
      
    // ---------------------------------------------
    //   Nintendo
    // ---------------------------------------------
      
    } else if (platform === 'Nintendo') {
      
      componentAvatar =
        <Avatar css={cssAvatar} alt="Nintendo" style={{ 'backgroundColor': '#e60012' }}>
          <div style={{ 'width': '55%', 'marginTop': '4px' }}>
            <SimpleIcons name="Nintendo" color="white" />
          </div>
        </Avatar>
      ;
      labelValue = 'Nintendo';
      
      
    // ---------------------------------------------
    //   PC
    // ---------------------------------------------
      
    } else if (platform === 'PC') {
      
      componentAvatar =
        <Avatar css={cssAvatar} alt="PC" style={{ 'backgroundColor': '#000000' }}>
          <IconPC />
        </Avatar>
      ;
      labelValue = gamesName ? `PC [${gamesName}]` : 'PC';
      
    
    // ---------------------------------------------
    //   Android
    // ---------------------------------------------
      
    } else if (platform === 'Android') {
      
      componentAvatar =
        <Avatar css={cssAvatar} alt="Android" style={{ 'backgroundColor': '#A4C639' }}>
          <div style={{ 'width': '75%', 'marginTop': '4px' }}>
            <SimpleIcons name="Android" color="white" />
          </div>
        </Avatar>
      ;
      labelValue = gamesName ? `Android [${gamesName}]` : 'Android';
      
      
    // ---------------------------------------------
    //   iOS
    // ---------------------------------------------
      
    } else if (platform === 'iOS') {
      
      componentAvatar =
        <Avatar css={cssAvatar} alt="Apple" style={{ 'backgroundColor': '#999999' }}>
          <div style={{ 'width': '75%', 'marginTop': '2px' }}>
            <SimpleIcons name="Apple" color="white" />
          </div>
        </Avatar>
      ;
      labelValue = gamesName ? `iOS [${gamesName}]` : 'iOS';
      
      
    // ---------------------------------------------
    //   Steam
    // ---------------------------------------------
      
    } else if (platform === 'Steam') {
      
      componentAvatar =
        <Avatar css={cssAvatar} alt="Steam" style={{ 'backgroundColor': '#000000' }}>
          <div style={{ 'width': '80%', 'marginTop': '4px' }}>
            <SimpleIcons name="Steam" color="white" />
          </div>
        </Avatar>
      ;
      labelValue = 'Steam';
      
      
    // ---------------------------------------------
    //   Origin
    // ---------------------------------------------
      
    } else if (platform === 'Origin') {
      
      componentAvatar =
        <Avatar css={cssAvatar} alt="Origin" style={{ 'backgroundColor': '#F56C2D' }}>
          <div style={{ 'width': '80%', 'marginTop': '4px' }}>
            <SimpleIcons name="Origin" color="white" />
          </div>
        </Avatar>
      ;
      labelValue = 'Origin';
      
      
    // ---------------------------------------------
    //   Discord
    // ---------------------------------------------
      
    } else if (platform === 'Discord') {
      
      componentAvatar =
        <Avatar css={cssAvatar} alt="Discord" style={{ 'backgroundColor': '#7289DA' }}>
          <div style={{ 'width': '65%', 'marginTop': '5px', 'marginRight': '1px' }}>
            <SimpleIcons name="Discord" color="white" />
          </div>
        </Avatar>
      ;
      labelValue = 'Discord';
      
      
    // ---------------------------------------------
    //   Skype
    // ---------------------------------------------
      
    } else if (platform === 'Skype') {
      
      componentAvatar =
        <Avatar css={cssAvatar} alt="Skype" style={{ 'backgroundColor': '#00AFF0' }}>
          <div style={{ 'width': '70%', 'marginTop': '4px' }}>
            <SimpleIcons name="Skype" color="white" />
          </div>
        </Avatar>
      ;
      labelValue = 'Skype';
      
      
    // ---------------------------------------------
    //   ICQ
    // ---------------------------------------------
      
    } else if (platform === 'ICQ') {
      
      componentAvatar =
        <Avatar css={cssAvatar} alt="ICQ" style={{ 'backgroundColor': '#7EBD00' }}>
          <div style={{ 'width': '75%', 'marginTop': '4px' }}>
            <SimpleIcons name="ICQ" color="white" />
          </div>
        </Avatar>
      ;
      labelValue = 'ICQ';
      
      
    // ---------------------------------------------
    //   Line
    // ---------------------------------------------
      
    } else if (platform === 'Line') {
      
      componentAvatar =
        <Avatar css={cssAvatar} alt="Line" style={{ 'backgroundColor': '#00C300' }}>
          <div style={{ 'width': '75%', 'marginTop': '5px' }}>
            <SimpleIcons name="Line" color="white" />
          </div>
        </Avatar>
      ;
      labelValue = 'Line';
      
      
    // ---------------------------------------------
    //   Other
    // ---------------------------------------------
      
    } else if (platform === 'Other') {
      
      componentAvatar =
        <Avatar
          css={css`
            && {
              width: 32px;
              height: 32px;
              background-color: #3f51b5;
            }
          `}
        >
          <IconGrade />
        </Avatar>
      ;
      
    }
    
    
    // --------------------------------------------------
    //   Label
    // --------------------------------------------------
    
    if (label) {
      labelValue = label;
    }
    
    
    // --------------------------------------------------
    //   Component - Sub Avatar
    // --------------------------------------------------
    
    let componentSubAvatar = '';
    
    if (games_id && gamesName && Object.keys(gamesImagesAndVideosThumbnailObj).length !== 0) {
      
      const src = lodashGet(gamesImagesAndVideosThumbnailObj, ['arr', 0, 'src'], '');
      const srcSet = lodashGet(gamesImagesAndVideosThumbnailObj, ['arr', 0, 'srcSet'], '');
      
      componentSubAvatar =
        <div
          css={css`
            margin-left: auto;
          `}
        >
          <Avatar
            css={cssAvatar}
            alt={gamesName}
            src={src}
            srcSet={srcSet}
          />
        </div>
      ;
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/id/components/chip.js
    // `);
    
    // console.log(chalk`
    //   cardPlayers_id: {green ${cardPlayers_id}}
    // `);
    
    // console.log(`
    //   ----- gamesImagesAndVideosThumbnailObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(gamesImagesAndVideosThumbnailObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          color: #3f51b5;
          border: 1px solid #3f51b5;
          border-radius: 18px;
          margin: 8px 8px 0 0;
        `}
      >
        
        
        <div>
          {componentAvatar}
        </div>
        
        
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            font-size: 14px;
            line-height: 1.4;
            padding: ${componentSubAvatar ? '4px 6px 4px 6px' : '4px 14px 4px 6px'}
          `}
        >
          
          <span
            css={css`
              font-weight: bold;
              padding: 0 4px 0 0;
            `}
          >
            {labelValue}:
          </span>
          
          <span>{id}</span>
          
        </div>
        
        
        {componentSubAvatar}
        
        
      </div>
    );
    
  }
  
};