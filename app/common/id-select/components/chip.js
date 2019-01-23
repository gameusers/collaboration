// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

// import chalk from 'chalk';
// import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Avatar from '@material-ui/core/Avatar';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconGrade from '@material-ui/icons/Grade';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const IDBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: #3f51b5;
  border: 1px solid #3f51b5;
  border-radius: 18px;
  margin: 8px 8px 0 0;
  // box-sizing: border-box;
  // cursor: pointer;
`;

const AvatarMainBox = styled.div`
  
`;

const AvatarSubBox = styled.div`
  margin-left: auto;
`;

const StyledAvatar = styled(Avatar)`
  && {
    width: 32px;
    height: 32px;
    background-color: white;
  }
`;

const StyledAvatarNoImage = styled(Avatar)`
  && {
    width: 32px;
    height: 32px;
    background-color: #3f51b5;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  font-size: 14px;
  line-height: 1.4;
  padding: 4px 14px 4px 6px;
`;

const Label = styled.span`
  font-weight: bold;
  padding: 0 4px 0 0;
`;

const ID = styled.span`
  
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
    
    const { platform, label, id, games_id, gamesThumbnail, gamesName } = this.props;
    
    
    
    
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
      
      componentAvatar = <StyledAvatar alt="PlayStation" src={`/static/img/platform/playstation-256.jpg`} />;
      labelValue = 'PlayStation';
      
      
    // ---------------------------------------------
    //   Xbox
    // ---------------------------------------------
      
    } else if (platform === 'Xbox') {
      
      componentAvatar = <StyledAvatar alt="Xbox" src={`/static/img/platform/xbox-256.jpg`} />;
      labelValue = 'Xbox';
      
      
    // ---------------------------------------------
    //   Nintendo
    // ---------------------------------------------
      
    } else if (platform === 'Nintendo') {
      
      componentAvatar = <StyledAvatar alt="Nintendo" src={`/static/img/platform/nintendo-256.jpg`} />;
      labelValue = 'Nintendo';
      
      
    // ---------------------------------------------
    //   Steam
    // ---------------------------------------------
      
    } else if (platform === 'Steam') {
      
      componentAvatar = <StyledAvatar alt="Steam" src={`/static/img/platform/steam-256.jpg`} />;
      labelValue = 'Steam';
      
      
    // ---------------------------------------------
    //   PC
    // ---------------------------------------------
      
    } else if (platform === 'PC') {
      
      componentAvatar = <StyledAvatar alt="PC" src={`/static/img/platform/pc-256.jpg`} />;
      labelValue = gamesName ? `PC [${gamesName}]` : 'PC';
      
    
    // ---------------------------------------------
    //   Android
    // ---------------------------------------------
      
    } else if (platform === 'Android') {
      
      componentAvatar = <StyledAvatar alt="Android" src={`/static/img/platform/android-256.jpg`} />;
      labelValue = gamesName ? `Android [${gamesName}]` : 'Android';
      
      
    // ---------------------------------------------
    //   iOS
    // ---------------------------------------------
      
    } else if (platform === 'iOS') {
      
      componentAvatar = <StyledAvatar alt="iOS" src={`/static/img/platform/ios-256.jpg`} />;
      labelValue = gamesName ? `iOS [${gamesName}]` : 'iOS';
      
      
    // ---------------------------------------------
    //   Other
    // ---------------------------------------------
      
    } else if (platform === 'Other') {
      
      componentAvatar =
        <StyledAvatarNoImage>
          <IconGrade />
        </StyledAvatarNoImage>
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
    
    if (games_id && gamesThumbnail && gamesName) {
      
      componentSubAvatar =
        <AvatarSubBox>
          <StyledAvatar alt={gamesName} src={`/static/img/games/${games_id}/thumbnail/image.jpg`} />
        </AvatarSubBox>
      ;
    }
    
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   cardPlayers_id: {green ${cardPlayers_id}}
    // `);
    
    // console.log(`
    //   hardwareArr: \n${util.inspect(hardwareArr, { colors: true, depth: null })}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <IDBox>
        
        <AvatarMainBox>
          {componentAvatar}
        </AvatarMainBox>
        
        <TextBox
          style={{ paddingRight: componentSubAvatar ? 6 : 14 }}
        >
          <Label>{labelValue}:</Label>
          <ID>{id}</ID>
        </TextBox>
        
        {componentSubAvatar}
        
      </IDBox>
    );
    
  }
  
};