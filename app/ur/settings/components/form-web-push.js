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
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

// import InputAdornment from '@material-ui/core/InputAdornment';
// import IconMailOutline from '@material-ui/icons/MailOutline';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

// import { validationUsersEmail } from '../../../../app/@database/users/validations/email';


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
    
    const { stores, storeUrSettings, intl, pathArr } = this.props;
    
    const {
      
      dataObj,
      handleEdit,
      handleSubmitWebPushSubscribe,
      handleSubmitWebPushUnsubscribe,
      
    } = storeUrSettings;
    
    // const {
      
    //   // handleSubmitWebPushSubscribe,
    //   handleWebPushUnsubscribe,
      
    // } = stores.webPush;
    
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr });
    
    
    
    
    // --------------------------------------------------
    //   ダイアログを表示するための変数
    // --------------------------------------------------
    
    const showDialog = lodashGet(dataObj, [...pathArr, 'showDialog'], false);
    
    
    
    
    // --------------------------------------------------
    //   Web Push Permission
    // --------------------------------------------------
    
    const webPushPermission = lodashGet(dataObj, [...pathArr, 'webPushPermission'], false);
    
    
    // --------------------------------------------------
    //   Component - Permission
    // --------------------------------------------------
    
    let componentPermission = <span css={css` color: red`}>[現在、通知の許可は受けていません]</span>;
    
    if (webPushPermission) {
      
      componentPermission = <span css={css` color: green`}>[通知は許可済みです]</span>;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/ur/settings/components/form-web-push.js
    // `);
    
    // console.log(chalk`
    //   webPushPermission: {green ${webPushPermission}}
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
          heading="通知設定"
          pathArr={pathArr}
          defaultExpanded={true}
        >
          
          
          <p
            css={css`
              margin: 0 0 12px 0;
            `}
          >
            ブラウザで通知を受け取れるプッシュ通知の設定を行えます。
          </p>
          
          <p
            css={css`
              margin: 0 0 12px 0;
            `}
          >
            通知を受けたいデバイス（スマートフォン、タブレット、PCなど）で、このページにアクセスして「通知を許可する」ボタンを押してください。
          </p>
          
          <p
            css={css`
              margin: 0 0 12px 0;
            `}
          >
            通知に対応しているブラウザは Chrome、Edge、Firefox、Opera になります。
          </p>
          
          
          <p>{componentPermission}</p>
          
          
          
          
          {/* フォーム */}
          <form>
            
            
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
                onClick={() => handleSubmitWebPushSubscribe({
                  pathArr,
                })}
                disabled={buttonDisabled}
              >
                通知を許可する
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
                  許可を取り消す
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
          
          <DialogTitle id="alert-dialog-title1">通知の許可取り消し</DialogTitle>
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description1">
              通知の許可を取り消しますか？
            </DialogContentText>
          </DialogContent>
          
          <DialogActions>
            <div
              css={css`
                margin: 0 auto 0 0;
              `}
            >
              <Button
                onClick={() => handleSubmitWebPushUnsubscribe({
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