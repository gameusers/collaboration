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




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const ButtonBox = styled.div`
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
    this.props.stores.layout.handleButtonDisabledObj(`${this.props._id}-idForm`, false);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, _id, idArr, func } = this.props;
    
    const { buttonDisabledObj } = stores.layout;
    
    const {
      
      dataObj,
      handleEdit,
      handleDialogOpen,
      
    } = stores.idForm;
    
    
    
    
    // --------------------------------------------------
    //   Dialog
    // --------------------------------------------------
    
    const dialogOpen = lodashGet(dataObj, [_id, 'dialog'], false);
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = lodashGet(buttonDisabledObj, [`${_id}-idForm`], true);
    
    
    
    
    // --------------------------------------------------
    //   コンテンツを切り替える
    // --------------------------------------------------
    
    const contentsType = lodashGet(dataObj, [_id, 'contentsType'], 'select');
    
    let componentContent = '';
    
    if (contentsType === 'select') {
      componentContent =
        <FormSelect
          _id={_id}
          func={func}
        />
      ;
    } else if (contentsType === 'edit') {
      componentContent =
        <FormEdit
          _id={_id}
          func={func}
          idArr={idArr}
        />
      ;
    } else {
      componentContent =
        <FormRegister
          _id={`${_id}-register`}
        />
      ;
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    // `);
    
    // console.log(`\n---------- idArr / form ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(idArr)));
    // console.log(`\n-----------------------------------\n`);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
        {/* ダイアログ表示ボタン */}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleDialogOpen({
            _id,
            idArr
          })}
          disabled={buttonDisabled}
        >
          IDを編集する
        </Button>
        
        
        {/* ダイアログ - ID選択＆登録フォーム */}
        <Dialog
          open={dialogOpen}
          onClose={() => handleEdit({
            pathArr: [_id, 'dialog'],
            value: false
          })}
          fullScreen
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          
          
          {/* 上部メニュー */}
          <AppBar>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={() => handleEdit({
                  pathArr: [_id, 'dialog'],
                  value: false
                })}
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
              onClick={() => handleEdit({
                pathArr: [_id, 'contentsType'],
                value: 'select'
              })}
              disabled={buttonDisabled}
            >
              選択
            </SelectFormTypeButton>
            
            <SelectFormTypeButton
              variant="outlined"
              color="primary"
              onClick={() => handleEdit({
                pathArr: [_id, 'contentsType'],
                value: 'edit'
              })}
              disabled={buttonDisabled}
            >
              編集
            </SelectFormTypeButton>
            
            <SelectFormTypeButton
              variant="outlined"
              color="primary"
              onClick={() => handleEdit({
                pathArr: [_id, 'contentsType'],
                value: 'register'
              })}
              disabled={buttonDisabled}
            >
              登録
            </SelectFormTypeButton>
            
          </ButtonBox>
          
          
          {/* コンテンツ */}
          {componentContent}
          
          
        </Dialog>
        
        
      </React.Fragment>
    );
    
  }
  
};