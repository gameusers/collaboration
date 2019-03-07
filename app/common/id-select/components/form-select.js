// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';
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

import Button from '@material-ui/core/Button';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import IDSelectChip from './chip';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 8px 14px 16px 14px;
`;

const Description = styled.p`
  margin: 12px 0 0 0;
`;

const Heading = styled.div`
  font-weight: bold;
  margin: 24px 0 0 0;
`;

const SelectedBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 4px 0 8px 0;
  padding: 0;
  
  @media screen and (max-width: 480px) {
    flex-flow: column wrap;
  }
`;

const IDBox = styled.div`
  cursor: pointer;
`;

const FuncButton = styled(Button)`
  && {
    margin: 24px 0 0 0;
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
  
  
  componentDidMount() {
    this.props.stores.layout.handleButtonDisabledObj(`${this.props._id}-idFormSelect`, false);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, _id, func } = this.props;
    
    const { buttonDisabledObj } = stores.layout;
    
    const {
      
      idFormDataObj,
      idFormDataSelectedObj,
      idFormDataUnselectedObj,
      handleIDFormMoveFromSelectedToUnselected,
      handleIDFormMoveFromUnselectedToSelected,
      handleIDFormSelectButton
      
    } = stores.idSelectForm;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    let buttonDisabled = true;
    
    if (`${_id}-idFormSelect` in buttonDisabledObj) {
      buttonDisabled = buttonDisabledObj[`${_id}-idFormSelect`];
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - 選択ID
    // --------------------------------------------------
    
    const componentsSelectedArr = [];
    const dataSelectedArr = _id in idFormDataSelectedObj ? idFormDataSelectedObj[_id] : [];
    const selectButtonIDArr = [];
    
    for (const [index, value] of dataSelectedArr.entries()) {
      
      const dataSelectedObj = idFormDataObj[_id].find((valueObj) => {
        return valueObj._id === value;
      });
      
      if (dataSelectedObj) {
        
        selectButtonIDArr.push(dataSelectedObj);
        
        // const games_id = 'games_id' in dataSelectedObj ? dataSelectedObj.games_id : '';
        // const gamesThumbnail = 'gamesThumbnail' in dataSelectedObj ? dataSelectedObj.gamesThumbnail : '';
        // const gamesName = 'gamesName' in dataSelectedObj ? dataSelectedObj.gamesName : '';
        
        const games_id = lodashGet(dataSelectedObj, ['games_id'], '');
        const gamesThumbnailArr = lodashGet(dataSelectedObj, ['gamesImagesAndVideosObj', 'thumbnailArr'], []);
        const gamesName = lodashGet(dataSelectedObj, ['gamesName'], '');
        
        componentsSelectedArr.push(
          <IDBox
            key={index}
            onClick={() => handleIDFormMoveFromSelectedToUnselected({ _id, index })}
          >
            <IDSelectChip
              platform={dataSelectedObj.platform}
              label={dataSelectedObj.label}
              id={dataSelectedObj.id}
              games_id={games_id}
              gamesThumbnailArr={gamesThumbnailArr}
              gamesName={gamesName}
            />
          </IDBox>
        );
        
      }
      
    }
    
    
    // --------------------------------------------------
    //   Component - 未選択ID
    // --------------------------------------------------
    
    const componentsUnselectedArr = [];
    const dataUnselectedArr = _id in idFormDataUnselectedObj ? idFormDataUnselectedObj[_id] : [];
    
    for (const [index, value] of dataUnselectedArr.entries()) {
      
      const dataUnselectedObj = idFormDataObj[_id].find((valueObj) => {
        return valueObj._id === value;
      });
      
      if (dataUnselectedObj) {
        
        // let games_id = 'games_id' in dataUnselectedObj ? dataUnselectedObj.games_id : '';
        // let gamesThumbnail = 'gamesThumbnail' in dataUnselectedObj ? dataUnselectedObj.gamesThumbnail : '';
        // let gamesName = 'gamesName' in dataUnselectedObj ? dataUnselectedObj.gamesName : '';
        
        const games_id = lodashGet(dataUnselectedObj, ['games_id'], '');
        const gamesThumbnailArr = lodashGet(dataUnselectedObj, ['gamesImagesAndVideosObj', 'thumbnailArr'], []);
        const gamesName = lodashGet(dataUnselectedObj, ['gamesName'], '');
        
        componentsUnselectedArr.push(
          <IDBox
            key={index}
            onClick={() => handleIDFormMoveFromUnselectedToSelected({ _id, index })}
          >
            <IDSelectChip
              platform={dataUnselectedObj.platform}
              label={dataUnselectedObj.label}
              id={dataUnselectedObj.id}
              games_id={games_id}
              gamesThumbnailArr={gamesThumbnailArr}
              gamesName={gamesName}
            />
          </IDBox>
        );
        
      }
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- stores.data.usersLoginObj -----\n
    //   ${util.inspect(stores.data.usersLoginObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- selectedArr -----\n
    //   ${util.inspect(selectedArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   hobbyTextFieldCount: {green ${hobbyTextFieldCount}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
        
        
        <Description>
          Game Usersでは、何度も同じIDを入力しなくていいように、IDを登録してから利用するシステムになっています。IDを登録したことがない方は、上部の「登録」ボタンを押してIDを登録してみてください。次回からはIDの利用がとても簡単になります。<br /><br />
          
          選択したいIDをクリック（タップ）して、[ 選択ID ] の欄に入れてください。「選択を確定する」ボタンを押すと、IDの選択は完了します。
          </Description>
        
        
        {/* 選択ID */}
        <Heading>[ 選択ID ]</Heading>
        
        <SelectedBox>
          {componentsSelectedArr}
        </SelectedBox>
        
        
        {/* 未選択ID */}
        <Heading>[ 未選択ID ]</Heading>
        
        <SelectedBox>
          {componentsUnselectedArr}
        </SelectedBox>
        
        
        {/* 「選択を確定する」ボタン */}
        <FuncButton
          variant="outlined"
          color="primary"
          onClick={() => handleIDFormSelectButton({
            _id,
            idArr: selectButtonIDArr,
            func
          })}
          disabled={buttonDisabled}
        >
          選択を確定する
        </FuncButton>
        
        
      </Container>
    );
    
  }
  
};