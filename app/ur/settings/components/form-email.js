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
import { injectIntl } from 'react-intl';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import InputAdornment from '@material-ui/core/InputAdornment';
import IconMailOutline from '@material-ui/icons/MailOutline';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationUsersEmail } from '../../../../app/@database/users/validations/email';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from '../../../../app/common/layout/components/panel';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeUrSettings')
@observer
export default injectIntl(class extends React.Component {
  
  
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
    
    const { stores, storeUrSettings, intl, pathArr } = this.props;
    
    const {
      
      dataObj,
      handleEdit,
      handleSubmitEmail,
      handleSubmitDeleteEmail,
      
    } = storeUrSettings;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr });
    
    
    
    
    // --------------------------------------------------
    //   ダイアログを表示するための変数
    // --------------------------------------------------
    
    const showDialog = lodashGet(dataObj, [...pathArr, 'showDialog'], false);
    
    
    
    
    // --------------------------------------------------
    //   E-Mail Address
    // --------------------------------------------------
    
    const email = lodashGet(dataObj, [...pathArr, 'email'], '');
    const validationUsersEmailObj = validationUsersEmail({ value: email });
    
    
    // --------------------------------------------------
    //   E-Mail Confirmation
    // --------------------------------------------------
    
    const emailSource = lodashGet(dataObj, [...pathArr, 'emailSource'], '');
    const emailConfirmation = lodashGet(dataObj, [...pathArr, 'emailConfirmation'], false);
    
    
    
    
    // --------------------------------------------------
    //   Component - Confirmation
    // --------------------------------------------------
    
    let componentConfirmation = '';
    
    if (email) {
      
      if (emailConfirmation && emailSource === email) {
        
        componentConfirmation = <span css={css` color: green`}>このメールアドレスは確認済みです</span>;
        
      } else {
        
        componentConfirmation = <span css={css` color: red`}>このメールアドレスは確認が必要です</span>;
        
      }
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   topPageName: {green ${topPageName}}
    // `);
    
    // console.log(`
    //   ----- topObj -----\n
    //   ${util.inspect(topObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          margin: 16px 0 0 0;
        `}
      >
        
        
        <Panel
          heading="メールアドレス登録"
          pathArr={pathArr}
          defaultExpanded={false}
        >
          
          
          <p
            css={css`
              margin: 0 0 12px 0;
            `}
          >
            メールアドレスを登録しておくとパスワードを忘れたときに、メールを利用してパスワードを再設定できるようになります。
          </p>
          
          <p
            css={css`
              margin: 0 0 12px 0;
            `}
          >
            メールアドレスを入力して「確認メールを送信」ボタンを押すと、入力したメールアドレスに確認メールが届きます。24時間以内に表示されているURLにアクセスして登録を完了してください。24時間以内にアクセスできなかった場合は、再度ボタンを押してください。もう一度、確認メールが送信されます。
          </p>
          
          <p>
            メールは confirmation@gameusers.org こちらのアドレスから届きます。ドメイン指定をされている方は @gameusers.org を受信できるように設定してください。
          </p>
          
          
          
          
          {/* フォーム */}
          <form>
            
            
            {/*  */}
            <div
              css={css`
                border-top: 1px dashed #848484;
                margin: 36px 0 0 0;
                padding: 24px 0 0 0;
              `}
            >
              
              
              {/* E-Mail Address */}
              <div>
                <TextField
                  css={css`
                    width: 400px;
                    
                    @media screen and (max-width: 480px) {
                      width: 100%;
                    }
                  `}
                  id="email"
                  label="メールアドレス"
                  value={validationUsersEmailObj.value}
                  onChange={(eventObj) => handleEdit({
                    pathArr: [...pathArr, 'email'],
                    value: eventObj.target.value
                  })}
                  error={validationUsersEmailObj.error}
                  helperText={intl.formatMessage({ id: validationUsersEmailObj.messageID }, { numberOfCharacters: validationUsersEmailObj.numberOfCharacters })}
                  disabled={buttonDisabled}
                  margin="normal"
                  inputProps={{
                    maxLength: 32,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconMailOutline />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              
              
              <div
                css={css`
                  margin: 0 0 0 0;
                `}
              >
                {componentConfirmation}
              </div>
              
              
            </div>
            
            
            
            
            {/* Submit Button */}
            <div
              css={css`
                display: flex;
                flex-flow: row wrap;
                border-top: 1px dashed #848484;
                margin: 24px 0 0 0;
                padding: 24px 0 0 0;
              `}
            >
              
              
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmitEmail({ pathArr })}
                disabled={buttonDisabled}
              >
                確認メールを送信
              </Button>
              
              
              <div
                css={css`
                  margin: 0 0 0 16px;
                `}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEdit({
                    pathArr: [...pathArr, 'showDialog'],
                    value: true,
                  })}
                  disabled={buttonDisabled}
                >
                  削除する
                </Button>
              </div>
              
              
            </div>
            
            
          </form>
          
          
        </Panel>
        
        
        
        
        {/* 削除するか尋ねるダイアログ */}
        <Dialog
          open={showDialog}
          onClose={() => handleEdit({
            pathArr: [...pathArr, 'showDialog'],
            value: false,
          })}
          aria-labelledby="alert-dialog-title1"
          aria-describedby="alert-dialog-description1"
        >
          
          <DialogTitle id="alert-dialog-title1">メールアドレス削除</DialogTitle>
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description1">
              メールアドレスを削除しますか？
            </DialogContentText>
          </DialogContent>
          
          <DialogActions>
            <div
              css={css`
                margin: 0 auto 0 0;
              `}
            >
              <Button
                onClick={() => handleSubmitDeleteEmail({
                  pathArr,
                })}
                color="primary"
                autoFocus
              >
                はい
              </Button>
            </div>
            
            <Button
              onClick={() => handleEdit({
                pathArr: [...pathArr, 'showDialog'],
                value: false,
              })}
              color="primary"
            >
              いいえ
            </Button>
          </DialogActions>
          
        </Dialog>
        
        
      </div>
    );
    
  }
  
});