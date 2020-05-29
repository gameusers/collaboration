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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


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
import IconSettings from '@material-ui/icons/Settings';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import FormSelect from 'app/common/id/components/form-select.js';
import FormEdit from 'app/common/id/components/form-edit.js';
import FormRegister from 'app/common/id/components/form-register.js';






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
    
    this.pathArr = props.pathArr;
    // this.pathArr = [props._id, 'idFormObj'];
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
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
    
    const {
      
      stores,
      storeIDForm,
      handleSetIDsArr,
      idsArr,
      
    } = this.props;
    
    
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
          handleSetIDsArr={handleSetIDsArr}
          idsArr={idsArr}
        />
      ;
      
    } else if (contentsType === 'edit') {
      
      componentContent =
        <FormEdit
          pathArr={this.pathArr}
          handleSetIDsArr={handleSetIDsArr}
          idsArr={idsArr}
          additionalGameLimit={1}
        />
      ;
      
    } else {
      
      componentContent =
        <FormRegister
          pathArr={this.pathArr}
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
    //   ----- idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(idsArr)), { colors: true, depth: null })}\n
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
            idsArr,
          })}
          disabled={buttonDisabled}
          startIcon={<IconSettings />}
        >
          IDを登録・編集する
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
                <span
                  css={css`
                    font-weight: ${contentsType === 'select' ? 'bold' : 'normal' };
                  `}
                >
                  選択
                </span>
              </Button>
              
              <Button
                onClick={() => handleEdit({
                  pathArr: [...this.pathArr, 'contentsType'],
                  value: 'edit'
                })}
                disabled={buttonDisabled}
              >
                <span
                  css={css`
                    font-weight: ${contentsType === 'edit' ? 'bold' : 'normal' };
                  `}
                >
                  編集
                </span>
              </Button>
              
              <Button
                onClick={() => handleEdit({
                  pathArr: [...this.pathArr, 'contentsType'],
                  value: 'register'
                })}
                disabled={buttonDisabled}
              >
                <span
                  css={css`
                    font-weight: ${contentsType === 'register' ? 'bold' : 'normal' };
                  `}
                >
                  登録
                </span>
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