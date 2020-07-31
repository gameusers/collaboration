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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

// import Avatar from '@material-ui/core/Avatar';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

// import IconGrade from '@material-ui/icons/Grade';
// import IconPC from '@material-ui/icons/LaptopMac';






// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

// const cssAvatar = css`
//   && {
//     width: 32px;
//     height: 32px;
//     line-height: 1;
//     background-color: #003791;
//   }
// `;






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

/**
 * Export Component
 */
const Component = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    achievementID,
    urlID,
    name,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   必要な情報がない場合、空のコンポーネントを返す
  // --------------------------------------------------
  
  if (!achievementID && !urlID && !name) {
    return null;
  }
  
  
  
  
  // --------------------------------------------------
  //   Color
  // --------------------------------------------------
  
  let colorLine = '';
  let colorText = '';
  
  
  // ---------------------------------------------
  //   エデンの民
  // ---------------------------------------------
  
  if (achievementID === 'MuK2dKVpn') {
    
    colorLine = 'background-image: linear-gradient(135deg, #704308 0%, #ffce08 40%, #e1ce08 60%, #704308 100%);';
    colorText = 'background-image: linear-gradient(135deg, #b8751e 0%, #ffce08 37%, #fefeb2 47%, #fafad6 50%, #fefeb2 53%, #e1ce08 63%, #b8751e 100%);';
    
    
  // ---------------------------------------------
  //   遊び人
  // ---------------------------------------------
    
  } else if (achievementID === '7YCic-Yds') {
    
    colorLine = colorText = 'background-image: linear-gradient(25deg, #f80014, #ff7a4f, #ffbd8b, #fcfccb);';
    
    
  // ---------------------------------------------
  //   書紀
  // ---------------------------------------------
    
  } else if (achievementID === '8Fbta4f9O') {
    
    colorLine = colorText = 'background-image: linear-gradient(25deg, #f80014, #ff7a4f, #ffbd8b, #fcfccb);';
    
    
  // ---------------------------------------------
  //   人気者
  // ---------------------------------------------
    
  } else if (achievementID === 'NwzUOqsiC') {
    
    colorLine = colorText = 'background-image: linear-gradient(25deg, #7a19fb, #705ffc, #588cfd, #00b4fd);';
    
    
  // ---------------------------------------------
  //   PC
  // ---------------------------------------------
    
  } else if (achievementID === 'PC') {
    
    colorLine = '';
    colorText = '';
    
  
  // ---------------------------------------------
  //   Android
  // ---------------------------------------------
    
  } else if (achievementID === 'Android') {
    
    colorLine = '';
    colorText = '';
    
    
  // ---------------------------------------------
  //   iOS
  // ---------------------------------------------
    
  } else if (achievementID === 'iOS') {
    
    colorLine = '';
    colorText = '';
    
    
  // ---------------------------------------------
  //   Steam
  // ---------------------------------------------
    
  } else if (achievementID === 'Steam') {
    
    colorLine = '';
    colorText = '';
    
    
  // ---------------------------------------------
  //   Origin
  // ---------------------------------------------
    
  } else if (achievementID === 'Origin') {
    
    colorLine = '';
    colorText = '';
    
    
  // ---------------------------------------------
  //   Discord
  // ---------------------------------------------
    
  } else if (achievementID === 'Discord') {
    
    colorLine = '';
    colorText = '';
    
    
  // ---------------------------------------------
  //   Skype
  // ---------------------------------------------
    
  } else if (achievementID === 'Skype') {
    
    colorLine = '';
    colorText = '';
    
    
  // ---------------------------------------------
  //   ICQ
  // ---------------------------------------------
    
  } else if (achievementID === 'ICQ') {
    
    colorLine = '';
    colorText = '';
    
    
  // ---------------------------------------------
  //   Line
  // ---------------------------------------------
    
  } else if (achievementID === 'Line') {
    
    colorLine = '';
    colorText = '';
    
    
  // ---------------------------------------------
  //   Other
  // ---------------------------------------------
    
  } else if (achievementID === 'Other') {
    
    colorLine = '';
    colorText = '';
    
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/achievement/v2/chip.js
  // `);
  
  // console.log(chalk`
  //   achievementID: {green ${achievementID}}
  //   urlID: {green ${urlID}}
  //   name: {green ${name}}
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
        color: #fff;
        font-weight: bold;
        background: #000;
        
        position: relative;
        box-shadow: 0 2px 14px rgba(0, 0, 0, .1);
        
        &:before {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          content: '';
          ${colorLine}
          // background-image: linear-gradient(25deg, #f80014, #ff7a4f, #ffbd8b, #fcfccb);
          // background-image: linear-gradient(25deg, #7a19fb, #705ffc, #588cfd, #00b4fd);
          // background-image: linear-gradient(25deg, #5447ff, #5678ff, #49a4ff, #01cfff);
          // background-image: linear-gradient(25deg, #b8421c, #d16d1c, #e89618, #ffbf0c);
          // background-image: linear-gradient(25deg, #ff2268, #df8e6f, #abca76, #1aff7d);
          // background-image: linear-gradient(25deg, #e36976, #eb9582, #f0bd8e, #f2e59a)
        }
        
        &:after {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          content: '';
          ${colorLine}
          // background-image: linear-gradient(25deg, #f80014, #ff7a4f, #ffbd8b, #fcfccb);
          // background-image: linear-gradient(25deg, #7a19fb, #705ffc, #588cfd, #00b4fd);
          // background-image: linear-gradient(25deg, #5447ff, #5678ff, #49a4ff, #01cfff);
          // background-image: linear-gradient(25deg, #b8421c, #d16d1c, #e89618, #ffbf0c);
          // background-image: linear-gradient(25deg, #ff2268, #df8e6f, #abca76, #1aff7d);
          // background-image: linear-gradient(25deg, #e36976, #eb9582, #f0bd8e, #f2e59a)
        }
        
        margin: 0 0 0 12px;
        padding: 0 4px;
      
      `}
    >
      
      <span
        css={css`
          ${colorText}
          // background-image: linear-gradient(25deg, #f80014, #ff7a4f, #ffbd8b, #fcfccb);
          // background-image: linear-gradient(25deg, #7a19fb, #705ffc, #588cfd, #00b4fd);
          // background-image: linear-gradient(25deg, #5447ff, #5678ff, #49a4ff, #01cfff);
          // background-image: linear-gradient(25deg, #b8421c, #d16d1c, #e89618, #ffbf0c);
          // background-image: linear-gradient(25deg, #ff2268, #df8e6f, #abca76, #1aff7d);
          // background-image: linear-gradient(25deg, #e36976, #eb9582, #f0bd8e, #f2e59a)
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        `}
      >
        {name}
      </span>
      
    </div>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;