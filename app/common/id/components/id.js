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
  box-sizing: border-box;
`;

const LeftBox = styled.div`
  
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

const RightBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  font-size: 14px;
  line-height: 1.4;
  padding: 4px 14px 4px 8px;
`;

const Label = styled.span`
  // font-weight: bold;
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
    
    const { type, label, id, games_id, gamesThumbnail, gamesName } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (!type && !id) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    let componentAvatar = '';
    let labelValue = '';
    
    
    // ---------------------------------------------
    //   PlayStation
    // ---------------------------------------------
    
    if (type === 'PlayStation') {
      
      componentAvatar = <StyledAvatar alt="PlayStation" src={`/static/img/platform/playstation-256.jpg`} />;
      labelValue = 'PlayStation';
      
      
    // ---------------------------------------------
    //   Xbox
    // ---------------------------------------------
      
    } else if (type === 'Xbox') {
      
      componentAvatar = <StyledAvatar alt="Xbox" src={`/static/img/platform/xbox-256.jpg`} />;
      labelValue = 'Xbox';
      
      
    // ---------------------------------------------
    //   Nintendo
    // ---------------------------------------------
      
    } else if (type === 'Nintendo') {
      
      componentAvatar = <StyledAvatar alt="Nintendo" src={`/static/img/platform/nintendo-256.jpg`} />;
      labelValue = 'Nintendo';
      
      
    // ---------------------------------------------
    //   Steam
    // ---------------------------------------------
      
    } else if (type === 'Steam') {
      
      componentAvatar = <StyledAvatar alt="Steam" src={`/static/img/platform/steam-256.jpg`} />;
      labelValue = 'Steam';
      
      
    // ---------------------------------------------
    //   Other
    // ---------------------------------------------
      
    } else if (type === 'Other') {
      
      
      // ---------------------------------------------
      //   Avatar
      // ---------------------------------------------
      
      componentAvatar =
        <StyledAvatarNoImage>
          <IconGrade />
        </StyledAvatarNoImage>
      ;
      
      if (gamesThumbnail && games_id) {
        componentAvatar = <StyledAvatarNoImage alt={gamesName} src={`/static/img/games/${games_id}/thumbnail/image.jpg`} />;
      }
      
      
      // ---------------------------------------------
      //   Label
      // ---------------------------------------------
      
      labelValue = label;
      
      if (!label) {
        labelValue = gamesName;
      }
      
      
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
        <LeftBox>
          {componentAvatar}
        </LeftBox>
        <RightBox>
          <Label>{labelValue}:</Label>
          <ID>{id}</ID>
        </RightBox>
      </IDBox>
    );
    
  }
  
};