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
import Head from 'next/head';
// import Link from 'next/link';
// import getConfig from 'next/config';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';
// import { injectIntl } from 'react-intl';
// import ReCAPTCHA from "react-google-recaptcha";
// import fetch from 'isomorphic-unfetch';
import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconID from '@material-ui/icons/Person';
import IconPassword from '@material-ui/icons/Lock';
import IconPasswordOutlined from '@material-ui/icons/LockTwoTone';
import IconVisibility from '@material-ui/icons/Visibility';
import IconVisibilityOff from '@material-ui/icons/VisibilityOff';
import IconMailOutline from '@material-ui/icons/MailOutline';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { IntlProvider, addLocaleData, FormattedMessage } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ja from 'react-intl/locale-data/ja';
addLocaleData([...en, ...ja]);

import { locale } from '../../app/@locales/locale';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../app/@modules/fetch';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreIndex from '../../app/@stores/index';
import initStoreLoginIndex from '../../app/login/index/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../app/common/layout/components/layout';
import Panel from '../../app/common/layout/components/panel';
import TermsOfService from '../../app/common/layout/components/terms-of-service';
import FormLogin from '../../app/login/index/components/form-login';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

// const { validationUsersLoginID } = require('../../app/@database/users/validations/login-id2');


// ---------------------------------------------
//   Material UI を Next.js で利用するため
// ---------------------------------------------

import withRoot from '../../lib/material-ui/withRoot';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 10px 10px 18px 10px;
  
  @media screen and (max-width: 480px) {
    padding: 10px 0 18px 0;
  }
`;


// ---------------------------------------------
//   フォーム
// ---------------------------------------------

const Description = styled.div`
  margin: 0 0 16px 0;
`;

// const StyledTextField = styled(TextField)`
//   && {
//     margin-right: 16px;
//   }
// `;



const StyledFormControl = styled(FormControl)`
  && {
    margin: 0 0 10px 0;
  }
`;

const StyledFormHelperText = styled(FormHelperText)`
  && {
    line-height: 1.4em;
    margin: 6px 0 6px 0;
  }
`;



const PasswordFormControl = styled(FormControl)`
  && {
    margin: 0;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 360px;
  
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const TermsOfServiceBox = styled.div`
  display: flex;
  flex-flow: row wrap;
`;


const StyledButton = styled(Button)`
  && {
    margin: 10px 0 0 0;
  }
`;

const ReCAPTCHAContainer = styled.div`
  margin: 30px 0 0 0;
`;




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/login
// --------------------------------------------------

@observer
class Component extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  static async getInitialProps({ pathname, req, res }) {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const isServer = !!req;
    const reqHeadersCookie = lodashGet(req, ['headers', 'cookie'], '');
    const reqAcceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      urlApi: encodeURI(`${process.env.URL_API}/v1/login/initial-props`),
      methodType: 'GET',
      reqHeadersCookie,
      reqAcceptLanguage,
    });
    
    const statusCode = resultObj.statusCode;
    // const initialPropsObj = resultObj.data;
    
    // console.log(`
    //   ----- resultObj -----\n
    //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   ログインしている場合はログアウトページにリダイレクト
    // --------------------------------------------------
    
    const login = lodashGet(resultObj, ['data', 'login'], false);
    
    if (login) {
      res.redirect('/logout');
      res.end();
      return {};
    }
    
    
    return { isServer, pathname, statusCode, reqAcceptLanguage };
    
  }
  
  
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   Property / Error 判定用
    // --------------------------------------------------
    
    this.error = false;
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    try {
      
      
      // --------------------------------------------------
      //   Errorの場合
      // --------------------------------------------------
      
      if (
        this.props.statusCode !== 200
      ) {
        throw new Error();
      }
      
      
      // --------------------------------------------------
      //   Store
      // --------------------------------------------------
      
      const argumentsObj = {
        isServer: props.isServer,
        pathname: props.pathname,
      };
      
      this.stores = initStoreIndex(argumentsObj);
      this.stores.loginIndex = initStoreLoginIndex(argumentsObj, this.stores);
      
      
      // --------------------------------------------------
      //   Update Data
      // --------------------------------------------------
      
      if (Object.keys(this.stores.data.localeObj).length === 0) {
        
        const localeObj = locale({
          acceptLanguage: props.reqAcceptLanguage
        });
        
        this.stores.data.replaceLocaleObj(localeObj);
        
      }
      
      
    } catch (e) {
      this.error = true;
    }
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Error
    //   参考：https://github.com/zeit/next.js#custom-error-handling
    // --------------------------------------------------
    
    if (this.error) {
      return <Error statusCode={this.props.statusCode} />;
    }
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const stores = this.stores;
    
    
    
    // --------------------------------------------------
    //   Header Navigation
    // --------------------------------------------------
    
    const headerNavMainArr = [
      {
        name: 'ログイン',
        pathname: '/login'
      },
      {
        name: 'ソーシャルログイン',
        pathname: '/login/social'
      }
    ];
    
    
    
    // --------------------------------------------------
    //   Login
    // --------------------------------------------------
    
    const {
      
      loginID,
      loginIDNumberOfCharacters,
      loginIDError,
      loginIDErrorMessage,
      handleLoginID,
      
      loginPassword,
      loginPasswordNumberOfCharacters,
      loginPasswordError,
      loginPasswordErrorMessage,
      handleLoginPassword,
      loginPasswordShow,
      handleLoginPasswordShow,
      handleLoginPasswordMouseDown,
      
      handleLoginRecaptchaResponse,
      
      handleLoginSubmit,
      
      
      createAccountID,
      createAccountIDNumberOfCharacters,
      createAccountIDError,
      createAccountIDErrorMessage,
      handleCreateAccountID,
      
      createAccountPassword,
      createAccountPasswordNumberOfCharacters,
      createAccountPasswordStrengthScore,
      createAccountPasswordError,
      createAccountPasswordErrorMessage,
      handleCreateAccountPassword,
      createAccountPasswordShow,
      handleCreateAccountPasswordShow,
      handleCreateAccountPasswordMouseDown,
      
      createAccountPasswordConfirmation,
      createAccountPasswordConfirmationNumberOfCharacters,
      createAccountPasswordConfirmationError,
      createAccountPasswordConfirmationErrorMessage,
      handleCreateAccountPasswordConfirmation,
      createAccountPasswordConfirmationShow,
      handleCreateAccountPasswordConfirmationShow,
      handleCreateAccountPasswordConfirmationMouseDown,
      
      createAccountEmail,
      createAccountEmailNumberOfCharacters,
      createAccountEmailError,
      createAccountEmailErrorMessage,
      handleCreateAccountEmail,
      
      createAccountTermsOfService,
      handleCreateAccountTermsOfService,
      
      handleCreateAccountRecaptchaResponse,
      
      handleCreateAccountSubmit
      
    } = stores.loginIndex;
    
    
    
    // --------------------------------------------------
    //   Layout
    // --------------------------------------------------
    
    const {
      
      handleTermsOfServiceDialogOpen
      
    } = stores.layout;
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    // const loginID = lodashGet(dataObj, ['loginID'], '');
    // const validationUsersLoginIDObj = validationUsersLoginID({ value: loginID });
    
    
    
    // --------------------------------------------------
    //   文字数
    // --------------------------------------------------
    
    let loginIDNoC = '';
    
    if (loginIDNumberOfCharacters > 0) {
      loginIDNoC = `（${loginIDNumberOfCharacters}文字）`;
    }
    
    
    let loginPasswordNoC = '';
    
    if (loginPasswordNumberOfCharacters > 0) {
      loginPasswordNoC = `（${loginPasswordNumberOfCharacters}文字）`;
    }
    
    
    let createAccountIDNoC = '';
    
    if (createAccountIDNumberOfCharacters > 0) {
      createAccountIDNoC = `（${createAccountIDNumberOfCharacters}文字）`;
    }
    
    
    let createAccountPasswordNoC = '';
    
    if (createAccountPasswordNumberOfCharacters > 0) {
      createAccountPasswordNoC = `（${createAccountPasswordNumberOfCharacters}文字）`;
    }
    
    
    let createAccountPasswordConfirmationNoC = '';
    
    if (createAccountPasswordConfirmationNumberOfCharacters > 0) {
      createAccountPasswordConfirmationNoC = `（${createAccountPasswordConfirmationNumberOfCharacters}文字）`;
    }
    
    let createAccountEmailNoC = '';
    
    if (createAccountEmailNumberOfCharacters > 0) {
      createAccountEmailNoC = `（${createAccountEmailNumberOfCharacters}文字）`;
    }
    
    
    
    // --------------------------------------------------
    //   エラーメッセージ
    // --------------------------------------------------
    
    let loginIDEM = '';
    
    if (loginIDErrorMessage) {
      loginIDEM = <StyledFormHelperText>{loginIDErrorMessage}</StyledFormHelperText>;
    }
    
    
    let loginPasswordEM = '';
    
    if (loginPasswordErrorMessage) {
      loginPasswordEM = <StyledFormHelperText>{loginPasswordErrorMessage}</StyledFormHelperText>;
    }
    
    
    let createAccountIDEM = '';
    
    if (createAccountIDErrorMessage) {
      createAccountIDEM = <StyledFormHelperText>{createAccountIDErrorMessage}</StyledFormHelperText>;
    }
    
    
    let createAccountPasswordEM = '';
    
    if (createAccountPasswordErrorMessage) {
      createAccountPasswordEM = <StyledFormHelperText>{createAccountPasswordErrorMessage}</StyledFormHelperText>;
    }
    
    
    let createAccountPasswordConfirmationEM = '';
    
    if (createAccountPasswordConfirmationErrorMessage) {
      createAccountPasswordConfirmationEM = <StyledFormHelperText>{createAccountPasswordConfirmationErrorMessage}</StyledFormHelperText>;
    }
    
    let createAccountEmailEM = '';
    
    if (createAccountEmailErrorMessage) {
      createAccountEmailEM = <StyledFormHelperText>{createAccountEmailErrorMessage}</StyledFormHelperText>;
    }
    
    
    
    // --------------------------------------------------
    //   パスワードの強度
    // --------------------------------------------------
    
    const passwordColorArr = ['red', 'red', 'tomato', 'green', 'green'];
    const passwordStrengthArr = ['とても危険', '危険', '普通', '安全', 'とても安全'];
    
    let passwordColor = passwordColorArr[createAccountPasswordStrengthScore];
    let passwordStrength = passwordStrengthArr[createAccountPasswordStrengthScore];
    
    if (createAccountPassword === '') {
      passwordColor = '#848484';
      passwordStrength = ' -';
    }
    
    const PasswordScore = styled.div`
      font-size: 14px;
      margin: 4px 0 10px 0;
      color: ${passwordColor};
    `;
    
    
    
    // --------------------------------------------------
    //   reCAPTCHA
    // --------------------------------------------------
    
    let loginRecaptchaRef = '';
    let createAccountRecaptchaRef = '';
    
    if (process.env.VERIFY_RECAPTCHA === '1') {
      loginRecaptchaRef = React.createRef();
      createAccountRecaptchaRef = React.createRef();
    }
    
    // if (this.verifyRecaptcha) {
    //   loginRecaptchaRef = React.createRef();
    //   createAccountRecaptchaRef = React.createRef();
    // }
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider stores={this.stores}>
        
        <IntlProvider 
          locale={this.stores.data.localeObj.languageArr[0]}
          messages={this.stores.data.localeObj.dataObj}
        >
          
          <Layout headerNavMainArr={headerNavMainArr}>
            
            {/* Head 内部のタグをここで追記する */}
            <Head>
              <title>ログイン - ID & パスワード - Game Users</title>
            </Head>
            
            
            <Container>
              
              
              {/* ログイン */}
              <FormLogin />
              
              
              
              
              {/* アカウント作成 */}
              <Panel
                id='createAccount'
                summary='アカウント作成'
                detailsComponent={
                  <React.Fragment>
                    
                    <Description>
                      アカウントを作成する場合は、こちらのフォームにIDとパスワードを入力して送信してください。
                    </Description>
                    
                    <Description>
                      利用できる文字は半角英数字とハイフン( - )アンダースコア( _ )です。
  ※ IDは3文字以上、32文字以内。パスワードは8文字以上、32文字以内。
                    </Description>
                    
                    <Description>
                      E-Mailの入力は任意ですが、登録しておくとパスワードを忘れたときにメールでパスワードを受け取ることができるようになります。
                    </Description>
                    
                    <Description>
                      ID、パスワード、E-Mailはアカウント作成後に追加・変更することが可能です。
                    </Description>
                    
                    
                    
                    {/* フォーム */}
                    <form>
                      
                      <InputBox>
                        
                        <StyledFormControl error={createAccountIDError}>
                          <InputLabel htmlFor="createAccountID">ID{createAccountIDNoC}</InputLabel>
                          <Input
                            id="createAccountID"
                            value={createAccountID}
                            onChange={handleCreateAccountID}
                            startAdornment={
                              <InputAdornment position="start">
                                <IconID />
                              </InputAdornment>
                            }
                          />
                          {createAccountIDEM}
                        </StyledFormControl>
                        
                        
                        <PasswordFormControl error={createAccountPasswordError} style={{margin: 0}}>
                          <InputLabel htmlFor="createAccountPassword">パスワード{createAccountPasswordNoC}</InputLabel>
                          <Input
                            id="createAccountPassword"
                            type={createAccountPasswordShow ? 'text' : 'password'}
                            value={createAccountPassword}
                            onChange={handleCreateAccountPassword}
                            startAdornment={
                              <InputAdornment position="start">
                                <IconPassword />
                              </InputAdornment>
                            }
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="Toggle password visibility"
                                  onClick={handleCreateAccountPasswordShow}
                                  onMouseDown={handleCreateAccountPasswordMouseDown}
                                >
                                  {createAccountPasswordShow ? <IconVisibilityOff /> : <IconVisibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          {createAccountPasswordEM}
                        </PasswordFormControl>
                        
                        <PasswordScore>
                          パスワード強度：{passwordStrength}
                        </PasswordScore>
                        
                        
                        <StyledFormControl error={createAccountPasswordConfirmationError}>
                          <InputLabel htmlFor="createAccountPasswordConfirmation">パスワード確認{createAccountPasswordConfirmationNoC}</InputLabel>
                          <Input
                            id="createAccountPasswordConfirmation"
                            type={createAccountPasswordConfirmationShow ? 'text' : 'password'}
                            value={createAccountPasswordConfirmation}
                            onChange={handleCreateAccountPasswordConfirmation}
                            startAdornment={
                              <InputAdornment position="start">
                                <IconPasswordOutlined />
                              </InputAdornment>
                            }
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="Toggle password visibility"
                                  onClick={handleCreateAccountPasswordConfirmationShow}
                                  onMouseDown={handleCreateAccountPasswordConfirmationMouseDown}
                                >
                                  {createAccountPasswordConfirmationShow ? <IconVisibilityOff /> : <IconVisibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          {createAccountPasswordConfirmationEM}
                        </StyledFormControl>
                        
                        
                        <StyledFormControl error={createAccountEmailError}>
                          <InputLabel htmlFor="createAccountEmail">E-Mail（任意）{createAccountEmailNoC}</InputLabel>
                          <Input
                            id="createAccountEmail"
                            value={createAccountEmail}
                            onChange={handleCreateAccountEmail}
                            startAdornment={
                              <InputAdornment position="start">
                                <IconMailOutline />
                              </InputAdornment>
                            }
                          />
                          {createAccountEmailEM}
                        </StyledFormControl>
                      
                      </InputBox>
                      
                      
                      
                      <TermsOfServiceBox>
                        
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={createAccountTermsOfService}
                              onChange={handleCreateAccountTermsOfService}
                            />
                          }
                          label="利用規約に同意します"
                        />
                        
                        <Button
                          color="primary"
                          onClick={handleTermsOfServiceDialogOpen}
                        >
                          利用規約を表示
                        </Button>
                        
                      </TermsOfServiceBox>
                      
                      
                      
                      {/* 送信ボタン */}
                      <StyledButton
                        variant="contained"
                        color="secondary"
                        onClick={() => handleCreateAccountSubmit(createAccountRecaptchaRef)}
                      >
                        アカウント作成
                      </StyledButton>
                      
                      
                      
                      {/* reCAPTCHA */}
                      { this.verifyRecaptcha &&
                        {/*<ReCAPTCHAContainer>
                          <ReCAPTCHA
                            ref={createAccountRecaptchaRef}
                            size="invisible"
                            badge="inline"
                            sitekey={process.env.RECAPTCHA_SITE_KEY}
                            onChange={handleCreateAccountRecaptchaResponse}
                          />
                        </ReCAPTCHAContainer>*/}
                      }
                      
                      
                    </form>
                    
                  </React.Fragment>
                }
              />
              
              <TermsOfService />
              
            </Container>
            
          </Layout>
          
        </IntlProvider>
        
      </Provider>
    );
  }
}

export default withRoot(Component);