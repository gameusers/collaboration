// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import ButtonGroup from '@material-ui/core/ButtonGroup';
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
//   Class
// --------------------------------------------------

@inject('stores', 'storeIDForm')
@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    
    // --------------------------------------------------
    //   super
    // --------------------------------------------------
    
    super(props);
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    this.pathArr = [props._id, 'idForm'];
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount(){
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ pathArr: this.pathArr });
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, storeIDForm, type, _id, ids_idArr } = this.props;
    
    const {
      
      dataObj,
      handleEdit,
      handleDialogOpen,
      
    } = storeIDForm;
    
    
    
    
    // --------------------------------------------------
    //   Dialog
    // --------------------------------------------------
    
    const dialogOpen = lodashGet(dataObj, [...this.pathArr, 'dialog'], false);
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   コンテンツを切り替える
    // --------------------------------------------------
    
    const contentsType = lodashGet(dataObj, [...this.pathArr, 'contentsType'], 'select');
    
    let componentContent = '';
    
    if (contentsType === 'select') {
      
      componentContent =
        <FormSelect
          pathArr={this.pathArr}
          type={type}
          _id={_id}
        />
      ;
      
    } else if (contentsType === 'edit') {
      
      componentContent =
        <FormEdit
          pathArr={this.pathArr}
          type={type}
          _id={_id}
          ids_idArr={ids_idArr}
          additionalGameLimit={1}
        />
      ;
      
    } else {
      
      componentContent =
        <FormRegister
          pathArr={this.pathArr}
          // _id={`${_id}-register`}
          _id={_id}
          additionalGameLimit={1}
        />
      ;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/id/components/form.js
    // `);
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    // `);
    
    // console.log(`
    //   ----- ids_idArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(ids_idArr)), { colors: true, depth: null })}\n
    //   --------------------\n
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
          onClick={() => handleDialogOpen({
            pathArr: this.pathArr,
            _id,
            ids_idArr
          })}
          disabled={buttonDisabled}
        >
          IDを編集する
        </Button>
        
        
        
        
        {/* ダイアログ - ID選択＆登録フォーム */}
        <Dialog
          open={dialogOpen}
          onClose={() => handleEdit({
            pathArr: [...this.pathArr, 'dialog'],
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
                  pathArr: [...this.pathArr, 'dialog'],
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
          <div
            css={css`
              margin: 88px 0 0 12px;
              
              @media screen and (max-width: 480px) {
                margin: 76px 0 0 12px;
              }
            `}
          >
            
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              
              <Button
                onClick={() => handleEdit({
                  pathArr: [...this.pathArr, 'contentsType'],
                  value: 'select'
                })}
                disabled={buttonDisabled}
              >
                選択
              </Button>
              
              <Button
                onClick={() => handleEdit({
                  pathArr: [...this.pathArr, 'contentsType'],
                  value: 'edit'
                })}
                disabled={buttonDisabled}
              >
                編集
              </Button>
              
              <Button
                onClick={() => handleEdit({
                  pathArr: [...this.pathArr, 'contentsType'],
                  value: 'register'
                })}
                disabled={buttonDisabled}
              >
                登録
              </Button>
              
            </ButtonGroup>
            
          </div>
          
          
          {/* コンテンツ */}
          {componentContent}
          
          
        </Dialog>
        
        
      </React.Fragment>
    );
    
  }
  
};