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
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import InputAdornment from '@material-ui/core/InputAdornment';
import IconPerson from '@material-ui/icons/Person';
import IconLock from '@material-ui/icons/Lock';
import IconLockTwoToneOutlined from '@material-ui/icons/LockTwoTone';
import IconVisibility from '@material-ui/icons/Visibility';
import IconVisibilityOff from '@material-ui/icons/VisibilityOff';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationUsersLoginID } from '../../../../app/@database/users/validations/login-id';
import { validationUsersLoginPassword, validationUsersLoginPasswordConfirmation } from '../../../../app/@database/users/validations/login-password';


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
      handleSubmitAccount,
      
    } = storeUrSettings;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr });
    
    
    
    
    // --------------------------------------------------
    //   Login ID
    // --------------------------------------------------
    
    const loginID = lodashGet(dataObj, [...pathArr, 'loginID'], '');
    const validationUsersLoginIDObj = validationUsersLoginID({ value: loginID });
    
    
    // --------------------------------------------------
    //   Login Password
    // --------------------------------------------------
    
    const loginPasswordShow = lodashGet(dataObj, [...pathArr, 'loginPasswordShow'], false);
    const loginPassword = lodashGet(dataObj, [...pathArr, 'loginPassword'], '');
    const validationUsersLoginPasswordObj = validationUsersLoginPassword({ value: loginPassword, loginID });
    
    
    // --------------------------------------------------
    //   Login Password Confirmation
    // --------------------------------------------------
    
    const loginPasswordConfirmationShow = lodashGet(dataObj, [...pathArr, 'loginPasswordConfirmationShow'], false);
    const loginPasswordConfirmation = lodashGet(dataObj, [...pathArr, 'loginPasswordConfirmation'], '');
    const validationUsersLoginPasswordConfirmationObj = validationUsersLoginPasswordConfirmation({ value: loginPasswordConfirmation, loginPassword });
    
    
    // --------------------------------------------------
    //   パスワードの強度
    // --------------------------------------------------
    
    const passwordColorArr = ['red', 'red', 'tomato', 'green', 'green'];
    const passwordStrengthArr = ['とても危険', '危険', '普通', '安全', 'とても安全'];
    
    let passwordColor = passwordColorArr[validationUsersLoginPasswordObj.strengthScore];
    let passwordStrength = passwordStrengthArr[validationUsersLoginPasswordObj.strengthScore];
    
    if (loginPassword === '') {
      passwordColor = '#848484';
      passwordStrength = ' -';
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
          heading="ログインID ＆ パスワード"
          pathArr={pathArr}
          defaultExpanded={true}
        >
          
          
          <p
            css={css`
              margin: 0 0 12px 0;
            `}
          >
            ログインする際のIDとパスワードを変更することができます。
          </p>
          
          <p>
            IDとパスワードに利用できる文字は、半角英数字とハイフン( - )アンダースコア( _ )です。※ IDは6文字以上、32文字以内。パスワードは8文字以上、32文字以内。
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
              
              
              {/* ID */}
              <div>
                <TextField
                  css={css`
                    width: 400px;
                    
                    @media screen and (max-width: 480px) {
                      width: 100%;
                    }
                  `}
                  id="loginID"
                  label="ログインID"
                  value={validationUsersLoginIDObj.value}
                  onChange={(eventObj) => handleEdit({
                    pathArr: [...pathArr, 'loginID'],
                    value: eventObj.target.value
                  })}
                  error={validationUsersLoginIDObj.error}
                  helperText={intl.formatMessage({ id: validationUsersLoginIDObj.messageID }, { numberOfCharacters: validationUsersLoginIDObj.numberOfCharacters })}
                  disabled={buttonDisabled}
                  margin="normal"
                  inputProps={{
                    maxLength: 32,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconPerson />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              
              
              
              
              {/* Password */}
              <div>
                <TextField
                  css={css`
                    width: 400px;
                    
                    @media screen and (max-width: 480px) {
                      width: 100%;
                    }
                  `}
                  id="loginPassword"
                  label="ログインパスワード"
                  type={loginPasswordShow ? 'text' : 'password'}
                  value={validationUsersLoginPasswordObj.value}
                  onChange={(eventObj) => handleEdit({
                    pathArr: [...pathArr, 'loginPassword'],
                    value: eventObj.target.value
                  })}
                  error={validationUsersLoginPasswordObj.error}
                  helperText={intl.formatMessage({ id: validationUsersLoginPasswordObj.messageID }, { numberOfCharacters: validationUsersLoginPasswordObj.numberOfCharacters })}
                  disabled={buttonDisabled}
                  margin="normal"
                  inputProps={{
                    maxLength: 32,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconLock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={(eventObj) => handleEdit({
                            pathArr: [...pathArr, 'loginPasswordShow'],
                            value: !loginPasswordShow
                          })}
                          onMouseDown={(eventObj) => {eventObj.preventDefault()}}
                        >
                          {loginPasswordShow ? <IconVisibilityOff /> : <IconVisibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              
              
              <div
                css={css`
                  font-size: 12px;
                  margin: 4px 0 0 0;
                  color: ${passwordColor};
                `}
              >
                パスワード強度：{passwordStrength}
              </div>
              
              
              
              
              {/* Password Confirmation */}
              <div>
                <TextField
                  css={css`
                    width: 400px;
                    
                    @media screen and (max-width: 480px) {
                      width: 100%;
                    }
                  `}
                  id="loginPasswordConfirmation"
                  label="ログインパスワード確認"
                  type={loginPasswordConfirmationShow ? 'text' : 'password'}
                  value={validationUsersLoginPasswordConfirmationObj.value}
                  onChange={(eventObj) => handleEdit({
                    pathArr: [...pathArr, 'loginPasswordConfirmation'],
                    value: eventObj.target.value
                  })}
                  error={validationUsersLoginPasswordConfirmationObj.error}
                  helperText={intl.formatMessage({ id: validationUsersLoginPasswordConfirmationObj.messageID }, { numberOfCharacters: validationUsersLoginPasswordConfirmationObj.numberOfCharacters })}
                  disabled={buttonDisabled}
                  margin="normal"
                  inputProps={{
                    maxLength: 32,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconLockTwoToneOutlined />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={(eventObj) => handleEdit({
                            pathArr: [...pathArr, 'loginPasswordConfirmationShow'],
                            value: !loginPasswordConfirmationShow
                          })}
                          onMouseDown={(eventObj) => {eventObj.preventDefault()}}
                        >
                          {loginPasswordConfirmationShow ? <IconVisibilityOff /> : <IconVisibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
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
                onClick={() => handleSubmitAccount({ pathArr: this.pathArr })}
                disabled={buttonDisabled}
              >
                送信する
              </Button>
              
            </div>
            
            
          </form>
          
          
        </Panel>
        
        
      </div>
    );
    
  }
  
});