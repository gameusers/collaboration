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
  
  // min-width: 20px;
  // box-sizing: border-box;
  // cursor: pointer;
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

// const StyledAvatarClose = styled(Avatar)`
//   && {
//     width: 32px;
//     height: 32px;
//     background-color: rgba(63, 81, 181, 0.7);
//     cursor: pointer;
//   }
// `;



const TextBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  font-size: 14px;
  line-height: 1.4;
  padding: 4px 6px 4px 6px;
`;

const Name = styled.span`
  font-weight: bold;
  // word-wrap: break-word;
  // width : 100%;
  // padding: 0 4px 0 0;
`;


const AvatarSubBox = styled.div`
  margin-left: auto;
`;

const StyledIconButton = styled(IconButton)`
  && {
    width: 22px;
    height: 22px;
    // font-size: 12px;
    
    margin: 0 6px 2px 0;
    padding: 0;
    // background-color: rgba(63, 81, 181, 0.7);
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
    
    const { _id, gameID, thumbnail, name, funcDelete } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (!_id || !gameID || !name) {
      return null;
    }
    
    // console.log(funcDelete);
    funcDelete({ id: 'id', gameID: 'gameID'});
    
    
    // --------------------------------------------------
    //   Component - Avatar
    // --------------------------------------------------
    
    let componentAvatar = '';
    
    if (thumbnail) {
      
      componentAvatar =
        <StyledAvatar alt={name} src={`/static/img/games/${_id}/thumbnail/image.jpg`} />
      ;
      
    } else {
      
      componentAvatar =
        <StyledAvatarNoImage>
          <IconGrade />
        </StyledAvatarNoImage>
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
      <Container>
        
        <AvatarMainBox>
          {componentAvatar}
        </AvatarMainBox>
        
        <TextBox>
          <Name>{name}</Name>
        </TextBox>
        
        <AvatarSubBox>
          <StyledIconButton
            // onClick={() => funcDelete()}
            onClick={() => funcDelete({ _id, gameID })}
          >
            <StyledIconClose />
          </StyledIconButton>
        </AvatarSubBox>
        
        {/*<AvatarSubBox>
          <StyledAvatarClose>
            <IconClose />
          </StyledAvatarClose>
        </AvatarSubBox>*/}
        
      </Container>
    );
    
  }
  
};