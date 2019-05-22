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
import lodashGet from 'lodash/get';


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
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: #3f51b5;
  border: 1px solid #3f51b5;
  border-radius: 18px;
  margin: 8px 8px 0 0;
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
    line-height: 1;
    background-color: #003791;
    // z-index: 0 !important;
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
    
    const { platform, label, id, games_id, gamesThumbnailArr = [], gamesName } = this.props;
    
    
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
        <StyledAvatar alt="PlayStation" style={{ 'backgroundColor': '#003791' }}>
          <div style={{ 'width': '80%', 'marginTop': '4px' }}>
            <SimpleIcons name="PlayStation" color="white" />
          </div>
        </StyledAvatar>
      ;
      labelValue = 'PlayStation';
      
      
    // ---------------------------------------------
    //   Xbox
    // ---------------------------------------------
      
    } else if (platform === 'Xbox') {
      
      componentAvatar =
        <StyledAvatar alt="Xbox" style={{ 'backgroundColor': '#107C10' }}>
          <div style={{ 'width': '75%', 'marginTop': '4px' }}>
            <SimpleIcons name="Xbox" color="white" />
          </div>
        </StyledAvatar>
      ;
      labelValue = 'Xbox';
      
      
    // ---------------------------------------------
    //   Nintendo
    // ---------------------------------------------
      
    } else if (platform === 'Nintendo') {
      
      componentAvatar =
        <StyledAvatar alt="Nintendo" style={{ 'backgroundColor': '#e60012' }}>
          <div style={{ 'width': '55%', 'marginTop': '4px' }}>
            <SimpleIcons name="Nintendo" color="white" />
          </div>
        </StyledAvatar>
      ;
      labelValue = 'Nintendo';
      
      
    // ---------------------------------------------
    //   PC
    // ---------------------------------------------
      
    } else if (platform === 'PC') {
      
      componentAvatar =
        <StyledAvatar alt="PC" style={{ 'backgroundColor': '#000000' }}>
          <IconPC />
        </StyledAvatar>
      ;
      labelValue = gamesName ? `PC [${gamesName}]` : 'PC';
      
    
    // ---------------------------------------------
    //   Android
    // ---------------------------------------------
      
    } else if (platform === 'Android') {
      
      componentAvatar =
        <StyledAvatar alt="Android" style={{ 'backgroundColor': '#A4C639' }}>
          <div style={{ 'width': '75%', 'marginTop': '4px' }}>
            <SimpleIcons name="Android" color="white" />
          </div>
        </StyledAvatar>
      ;
      labelValue = gamesName ? `Android [${gamesName}]` : 'Android';
      
      
    // ---------------------------------------------
    //   iOS
    // ---------------------------------------------
      
    } else if (platform === 'iOS') {
      
      componentAvatar =
        <StyledAvatar alt="Apple" style={{ 'backgroundColor': '#999999' }}>
          <div style={{ 'width': '75%', 'marginTop': '2px' }}>
            <SimpleIcons name="Apple" color="white" />
          </div>
        </StyledAvatar>
      ;
      labelValue = gamesName ? `iOS [${gamesName}]` : 'iOS';
      
      
    // ---------------------------------------------
    //   Steam
    // ---------------------------------------------
      
    } else if (platform === 'Steam') {
      
      componentAvatar =
        <StyledAvatar alt="Steam" style={{ 'backgroundColor': '#000000' }}>
          <div style={{ 'width': '80%', 'marginTop': '4px' }}>
            <SimpleIcons name="Steam" color="white" />
          </div>
        </StyledAvatar>
      ;
      labelValue = 'Steam';
      
      
    // ---------------------------------------------
    //   Origin
    // ---------------------------------------------
      
    } else if (platform === 'Origin') {
      
      componentAvatar =
        <StyledAvatar alt="Origin" style={{ 'backgroundColor': '#F56C2D' }}>
          <div style={{ 'width': '80%', 'marginTop': '4px' }}>
            <SimpleIcons name="Origin" color="white" />
          </div>
        </StyledAvatar>
      ;
      labelValue = 'Origin';
      
      
    // ---------------------------------------------
    //   Discord
    // ---------------------------------------------
      
    } else if (platform === 'Discord') {
      
      componentAvatar =
        <StyledAvatar alt="Discord" style={{ 'backgroundColor': '#7289DA' }}>
          <div style={{ 'width': '65%', 'marginTop': '5px', 'marginRight': '1px' }}>
            <SimpleIcons name="Discord" color="white" />
          </div>
        </StyledAvatar>
      ;
      labelValue = 'Discord';
      
      
    // ---------------------------------------------
    //   Skype
    // ---------------------------------------------
      
    } else if (platform === 'Skype') {
      
      componentAvatar =
        <StyledAvatar alt="Skype" style={{ 'backgroundColor': '#00AFF0' }}>
          <div style={{ 'width': '70%', 'marginTop': '4px' }}>
            <SimpleIcons name="Skype" color="white" />
          </div>
        </StyledAvatar>
      ;
      labelValue = 'Skype';
      
      
    // ---------------------------------------------
    //   ICQ
    // ---------------------------------------------
      
    } else if (platform === 'ICQ') {
      
      componentAvatar =
        <StyledAvatar alt="ICQ" style={{ 'backgroundColor': '#7EBD00' }}>
          <div style={{ 'width': '75%', 'marginTop': '4px' }}>
            <SimpleIcons name="ICQ" color="white" />
          </div>
        </StyledAvatar>
      ;
      labelValue = 'ICQ';
      
      
    // ---------------------------------------------
    //   Line
    // ---------------------------------------------
      
    } else if (platform === 'Line') {
      
      componentAvatar =
        <StyledAvatar alt="Line" style={{ 'backgroundColor': '#00C300' }}>
          <div style={{ 'width': '75%', 'marginTop': '5px' }}>
            <SimpleIcons name="Line" color="white" />
          </div>
        </StyledAvatar>
      ;
      labelValue = 'Line';
      
      
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
    
    if (games_id && gamesName && gamesThumbnailArr.length > 0) {
      
      const src = lodashGet(gamesThumbnailArr, [0, 'srcSetArr', 0, 'src'], '');
      
      componentSubAvatar =
        <AvatarSubBox>
          <StyledAvatar alt={gamesName} src={src} />
        </AvatarSubBox>
      ;
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
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
      <Container>
        
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
        
      </Container>
    );
    
  }
  
};