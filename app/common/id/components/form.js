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
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

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

const Heading = styled.div`
  font-weight: bold;
  margin: 0 0 2px 0;
`;

const Description = styled.p`
  font-size: 14px;
  margin: 0 0 12px 0;
`;

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

const SelectBox = styled.div`
  padding: 8px 14px;
`;

const SelectedHeading = styled.div`
  margin: 24px 0 0 0;
`;

const UnselectedHeading = styled.div`
  margin: 24px 0 0 0;
`;

const UnselectedBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 4px 0 8px 0;
  padding: 0;
  
  @media screen and (max-width: 480px) {
    flex-flow: column wrap;
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
  
  
  componentDidMount(){
    this.props.stores.layout.handleButtonDisabledObj(`${this.props._id}-idForm`, false);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, _id, arr, search } = this.props;
    
    const { buttonDisabledObj } = stores.layout;
    
    
    // console.log(`
    //   ----- stores -----\n
    //   ${util.inspect(stores, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    const {
      
      idFormDataSelectedArr,
      idFormDataUnselectedArr,
      idFormDialogObj,
      handleIDFormDialogClose,
      handleIDFormDialogOpen
      
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
    //   Component
    // --------------------------------------------------
    
    const componentsUnelectedArr = [];
    
    for (const [index, valueObj] of idFormDataUnselectedArr.entries()) {
      
      let games_id = 'games_id' in valueObj ? valueObj.games_id : '';
      let gamesThumbnail = 'gamesThumbnail' in valueObj ? valueObj.gamesThumbnail : '';
      let gamesName = 'gamesName' in valueObj ? valueObj.gamesName : '';
      
      componentsUnelectedArr.push(
        <ID
          key={index}
          type={valueObj.type}
          label={valueObj.label}
          id={valueObj.value}
          games_id={games_id}
          gamesThumbnail={gamesThumbnail}
          gamesName={gamesName}
        />
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
    
    // console.log(chalk`
    //   hobbyTextFieldCount: {green ${hobbyTextFieldCount}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        <Heading>ID</Heading>
        <Description>表示したいIDを選択してください。</Description>
        
        
        
        {/* ダイアログ表示ボタン */}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleIDFormDialogOpen({
            _id,
            usersLogin_id: stores.data.usersLoginObj._id
          })}
          disabled={buttonDisabled}
        >
          IDを選択する
        </Button>
        
        
        {/* ダイアログ */}
        <Dialog
          open={dialogOpen}
          onClose={() => handleIDFormDialogClose(_id)}
          fullScreen
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          
          
          {/* 上部メニュー */}
          <AppBar>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={() => handleIDFormDialogClose(_id)}
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
              color="secondary"
            >
              ID登録
            </SelectFormTypeButton>
            
          </ButtonBox>
          
          
          {/*  */}
          <SelectBox>
            
            <SelectedHeading>[ 選択ID ]</SelectedHeading>
            
            
            
            <UnselectedHeading>[ 未選択ID ]</UnselectedHeading>
            
            {/* ID */}
            <UnselectedBox>
              {componentsUnelectedArr}
            </UnselectedBox>
            
            
          </SelectBox>
          
          
        </Dialog>
        
        
      </React.Fragment>
    );
    
  }
  
};