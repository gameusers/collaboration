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

import IDChip from './chip';




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
      
      dataObj,
      handleMoveSelected,
      handleMoveUnselected,
      handleSelectButton
      
    } = stores.idForm;
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = lodashGet(buttonDisabledObj, [`${_id}-idFormSelect`], true);
    
    
    
    
    // --------------------------------------------------
    //   Component - 選択ID
    // --------------------------------------------------
    
    const dataArr = lodashGet(dataObj, [_id, 'dataArr'], []);
    const selectedIDsArr = [];
    
    const componentsSelectedArr = [];
    const selectedArr = lodashGet(dataObj, [_id, 'selectedArr'], []);
    
    
    for (const [index, value] of selectedArr.entries()) {
      
      const tempObj = dataArr.find((valueObj) => {
        return valueObj._id === value;
      });
      
      if (tempObj) {
        
        selectedIDsArr.push(tempObj);
        
        const games_id = lodashGet(tempObj, ['games_id'], '');
        const gamesThumbnailArr = lodashGet(tempObj, ['gamesImagesAndVideosObj', 'thumbnailArr'], []);
        const gamesName = lodashGet(tempObj, ['gamesName'], '');
        
        componentsSelectedArr.push(
          <IDBox
            key={index}
            onClick={() => handleMoveSelected({ _id, index })}
          >
            <IDChip
              platform={tempObj.platform}
              label={tempObj.label}
              id={tempObj.id}
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
    const unselectedArr = lodashGet(dataObj, [_id, 'unselectedArr'], []);
    
    
    for (const [index, value] of unselectedArr.entries()) {
      
      const tempObj = dataArr.find((valueObj) => {
        return valueObj._id === value;
      });
      
      if (tempObj) {
        
        const games_id = lodashGet(tempObj, ['games_id'], '');
        const gamesThumbnailArr = lodashGet(tempObj, ['gamesImagesAndVideosObj', 'thumbnailArr'], []);
        const gamesName = lodashGet(tempObj, ['gamesName'], '');
        
        componentsUnselectedArr.push(
          <IDBox
            key={index}
            onClick={() => handleMoveUnselected({ _id, index })}
          >
            <IDChip
              platform={tempObj.platform}
              label={tempObj.label}
              id={tempObj.id}
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
    
    // console.log(`\n---------- idArr / form select ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(idArr)));
    // console.log(`\n-----------------------------------\n`);
    
    
    
    
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
          onClick={() => handleSelectButton({
            _id,
            idArr: selectedIDsArr,
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