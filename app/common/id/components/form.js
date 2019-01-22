// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

// import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconClose from '@material-ui/icons/Close';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import ID from '../../id/components/id';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const ButtonBox = styled.div`
  // display: flex;
  // flex-flow: row wrap;
  margin: 90px 0 0 12px;
`;

const SelectFormTypeButton = styled(Button)`
  && {
    margin: 0 16px 0 0;
  }
`;

const ContentsSelectBox = styled.div`
  padding: 8px 14px;
`;

const SelectedHeading = styled.div`
  margin: 24px 0 0 0;
`;

const UnselectedHeading = styled.div`
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
    // console.log(this.props.stores.data.usersLoginObj._id);
    
    this.props.stores.layout.handleButtonDisabledObj(`${this.props._id}-idForm`, false);
    
    // this.props.stores.layout.handleButtonDisabledObj(`${this.props.stores.data.usersLoginObj._id}-idForm`, false);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, _id, selectedArr, func } = this.props;
    
    const { buttonDisabledObj } = stores.layout;
    
    const {
      
      idFormDataSelectedObj,
      idFormDataUnselectedObj,
      idFormDialogObj,
      handleIDFormDialogClose,
      handleIDFormDialogOpen,
      handleIDFormMoveFromSelectedToUnselected,
      handleIDFormMoveFromUnselectedToSelected,
      handleIDFormSelectButton
      
    } = stores.idForm;
    
    
    
    
    // --------------------------------------------------
    //   Dialog
    // --------------------------------------------------
    
    let dialogOpen = false;
    
    if (_id in idFormDialogObj) {
      dialogOpen = idFormDialogObj[_id];
    }
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    let buttonDisabled = true;
    
    if (`${_id}-idForm` in buttonDisabledObj) {
      buttonDisabled = buttonDisabledObj[`${_id}-idForm`];
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - 選択ID
    // --------------------------------------------------
    
    const componentsFormSelectedArr = [];
    const dataSelectedArr = _id in idFormDataSelectedObj ? idFormDataSelectedObj[_id] : [];
    
    for (const [index, valueObj] of dataSelectedArr.entries()) {
      
      let games_id = 'games_id' in valueObj ? valueObj.games_id : '';
      let gamesThumbnail = 'gamesThumbnail' in valueObj ? valueObj.gamesThumbnail : '';
      let gamesName = 'gamesName' in valueObj ? valueObj.gamesName : '';
      
      componentsFormSelectedArr.push(
        <IDBox
          key={index}
          onClick={() => handleIDFormMoveFromSelectedToUnselected({ _id, index })}
        >
          <ID
            // key={index}
            platform={valueObj.platform}
            label={valueObj.label}
            id={valueObj.id}
            games_id={games_id}
            gamesThumbnail={gamesThumbnail}
            gamesName={gamesName}
            onClick={() => handleIDFormMoveFromSelectedToUnselected({ _id: valueObj.id })}
          />
        </IDBox>
      );
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - 未選択ID
    // --------------------------------------------------
    
    const componentsFormUnselectedArr = [];
    const dataUnselectedArr = _id in idFormDataUnselectedObj ? idFormDataUnselectedObj[_id] : [];
    
    for (const [index, valueObj] of dataUnselectedArr.entries()) {
      
      let games_id = 'games_id' in valueObj ? valueObj.games_id : '';
      let gamesThumbnail = 'gamesThumbnail' in valueObj ? valueObj.gamesThumbnail : '';
      let gamesName = 'gamesName' in valueObj ? valueObj.gamesName : '';
      
      componentsFormUnselectedArr.push(
        <IDBox
          key={index}
          onClick={() => handleIDFormMoveFromUnselectedToSelected({ _id, index })}
        >
          <ID
            // key={index}
            platform={valueObj.platform}
            label={valueObj.label}
            id={valueObj.id}
            games_id={games_id}
            gamesThumbnail={gamesThumbnail}
            gamesName={gamesName}
          />
        </IDBox>
      );
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
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
      <React.Fragment>
        
        
        {/* ダイアログ表示ボタン */}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleIDFormDialogOpen({
            _id,
            selectedArr
          })}
          disabled={buttonDisabled}
        >
          IDを編集する
        </Button>
        
        
        
        
        {/* ダイアログ - ID選択＆登録フォーム */}
        <Dialog
          open={dialogOpen}
          onClose={() => handleIDFormDialogClose({_id})}
          fullScreen
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          
          
          {/* 上部メニュー */}
          <AppBar>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={() => handleIDFormDialogClose({_id})}
                aria-label="Close"
              >
                <IconClose />
              </IconButton>
              <Typography variant="h6" color="inherit" >
                ID 選択＆登録フォーム
              </Typography>
            </Toolbar>
          </AppBar>
          
          
          {/* ボタン */}
          <ButtonBox>
            
            <SelectFormTypeButton
              variant="outlined"
              color="primary"
            >
              ID選択
            </SelectFormTypeButton>
            
            <SelectFormTypeButton
              variant="outlined"
              color="primary"
            >
              ID登録・編集
            </SelectFormTypeButton>
            
          </ButtonBox>
          
          
          {/* コンテンツ - ID選択 */}
          <ContentsSelectBox>
            
            
            {/* 選択ID */}
            <SelectedHeading>[ 選択ID ]</SelectedHeading>
            
            <SelectedBox>
              {componentsFormSelectedArr}
            </SelectedBox>
            
            
            {/* 未選択ID */}
            <UnselectedHeading>[ 未選択ID ]</UnselectedHeading>
            
            <SelectedBox>
              {componentsFormUnselectedArr}
            </SelectedBox>
            
            
            {/* 「選択を確定する」ボタン */}
            <FuncButton
              variant="outlined"
              color="primary"
              onClick={() => handleIDFormSelectButton({
                _id,
                idArr: idFormDataSelectedObj[_id],
                func
              })}
              // onClick={() =>func({
              //   _id,
              //   idArr: idFormDataSelectedObj[_id]
              // })}
            >
              選択を確定する
            </FuncButton>
            
            
          </ContentsSelectBox>
          
          
        </Dialog>
        
        
      </React.Fragment>
    );
    
  }
  
};