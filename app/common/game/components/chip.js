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
import IconButton from '@material-ui/core/IconButton';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconGrade from '@material-ui/icons/Grade';
import IconClose from '@material-ui/icons/Close';




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
  padding: 4px 6px 4px 6px;
`;

const Name = styled.span`
  font-weight: bold;
`;


const AvatarSubBox = styled.div`
  margin-left: auto;
`;

const StyledIconButton = styled(IconButton)`
  && {
    width: 22px;
    height: 22px;
    
    margin: 0 6px 2px 0;
    padding: 0;
    background-color: #3f51b5;
  }
`;

const StyledIconClose = styled(IconClose)`
  && {
    width: 20px;
    height: 20px;
    color: white;
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
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { _id, gameID, imagesAndVideosObj, name, funcDelete, funcDeleteArgumentsObj } = this.props;
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (!_id || !gameID || !name) {
      return null;
    }
    
    
    // --------------------------------------------------
    //   Component - Avatar
    // --------------------------------------------------
    
    let componentAvatar = '';
    
    const thumbnailArr = lodashGet(imagesAndVideosObj, ['thumbnailArr'], []);
    
    if (thumbnailArr.length > 0) {
      const src = lodashGet(thumbnailArr, [0, 'srcSetArr', 0, 'src'], '');
      componentAvatar = <StyledAvatar alt={name} src={src} />;
    } else {
      componentAvatar = <StyledAvatarNoImage><IconGrade /></StyledAvatarNoImage>;
    }
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   cardPlayers_id: {green ${cardPlayers_id}}
    // `);
    
    // console.log(`\n---------- imagesAndVideosObj ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(imagesAndVideosObj)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(`\n---------- imagesAndVideosObj.thumbnailArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(imagesAndVideosObj.thumbnailArr)));
    // console.log(`\n-----------------------------------\n`);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
        
        <AvatarMainBox>
          {componentAvatar}
        </AvatarMainBox>
        
        <TextBox>
          <Name>{name}</Name>
        </TextBox>
        
        <AvatarSubBox>
          <StyledIconButton
            onClick={() => funcDelete(funcDeleteArgumentsObj)}
          >
            <StyledIconClose />
          </StyledIconButton>
        </AvatarSubBox>
        
      </Container>
    );
    
  }
  
};