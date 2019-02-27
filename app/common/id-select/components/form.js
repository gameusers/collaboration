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

import FormSelect from './form-select';
import FormEdit from './form-edit';
import FormRegister from './form-register';


const { validation_id } = require('../../../@validations/_id');
const validationIDsPlatform = require('../../../@database/ids/validations/platform');
const validationIDsPublicSetting = require('../../../@database/ids/validations/public-setting');




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const ButtonBox = styled.div`
  // display: flex;
  // flex-flow: row wrap;
  margin: 88px 0 0 12px;
  
  @media screen and (max-width: 480px) {
    margin: 76px 0 0 12px;
  }
  
`;

const SelectFormTypeButton = styled(Button)`
  && {
    margin: 0 16px 0 0;
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
    this.props.stores.layout.handleButtonDisabledObj(`${this.props._id}-idSelectForm`, false);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, _id, selectedArr, func } = this.props;
    
    const { buttonDisabledObj } = stores.layout;
    
    const {
      
      idFormDialogObj,
      handleIDFormDialogClose,
      handleIDFormDialogOpen,
      
      idFormContentsTypeObj,
      handleIDFormContentsType,
      
    } = stores.idSelectForm;
    
    
    
    
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
    
    if (`${_id}-idSelectForm` in buttonDisabledObj) {
      buttonDisabled = buttonDisabledObj[`${_id}-idSelectForm`];
    }
    
    
    
    
    // --------------------------------------------------
    //   コンテンツを切り替える
    // --------------------------------------------------
    
    let contentsType = 'select';
    
    if (_id in idFormContentsTypeObj) {
      contentsType = idFormContentsTypeObj[_id];
    }
    
    let componentForm = '';
    
    if (contentsType === 'select') {
      componentForm =
        <FormSelect
          _id={_id}
          func={func}
        />
      ;
    } else if (contentsType === 'edit') {
      componentForm =
        <FormEdit
          _id={_id}
          func={func}
          selectedArr={selectedArr}
        />
      ;
    } else {
      componentForm =
        <FormRegister
          _id={`${_id}-register`}
        />
      ;
    }
    
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // const test = 1;
    
    // console.log(`
    //   ----- validationIDsPublicSetting({ required: true, publicSetting: test }) -----\n
    //   ${util.inspect(validationIDsPublicSetting({ required: true, publicSetting: test }), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- validationIDsPlatform({ required: true, platform: test }) -----\n
    //   ${util.inspect(validationIDsPlatform({ required: true, platform: test }), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- validation_id({ required: true, _id: test }) -----\n
    //   ${util.inspect(validation_id({ required: true, _id: test }), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   String(value): {green ${String(test)}}
    // `);
    
    
    
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
                ID 入力フォーム
              </Typography>
            </Toolbar>
          </AppBar>
          
          
          {/* ボタン */}
          <ButtonBox>
            
            <SelectFormTypeButton
              variant="outlined"
              color="primary"
              onClick={() => handleIDFormContentsType({ _id, type: 'select' })}
              disabled={buttonDisabled}
            >
              選択
            </SelectFormTypeButton>
            
            <SelectFormTypeButton
              variant="outlined"
              color="primary"
              onClick={() => handleIDFormContentsType({ _id, type: 'edit' })}
              disabled={buttonDisabled}
            >
              編集
            </SelectFormTypeButton>
            
            <SelectFormTypeButton
              variant="outlined"
              color="primary"
              onClick={() => handleIDFormContentsType({ _id, type: 'register' })}
              disabled={buttonDisabled}
            >
              登録
            </SelectFormTypeButton>
            
          </ButtonBox>
          
          
          {/* コンテンツ */}
          {componentForm}
          
          
        </Dialog>
        
        
      </React.Fragment>
    );
    
  }
  
};