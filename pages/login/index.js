// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
// import Link from 'next/link';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import IconId from '@material-ui/icons/Person';
import IconPassword from '@material-ui/icons/Lock';
import IconPasswordOutlined from '@material-ui/icons/LockTwoTone';
import IconVisibility from '@material-ui/icons/Visibility';
import IconVisibilityOff from '@material-ui/icons/VisibilityOff';

import initStoreLayout from '../../applications/common/layout/stores/layout';
import initStoreData from '../../applications/common/layout/stores/data';
import initStoreLoginIndex from '../../applications/login/index/stores/store';

import Layout from '../../applications/common/layout/components/layout';
import Panel from '../../applications/common/layout/components/panel';
import TermsOfService from '../../applications/common/layout/components/terms-of-service';

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
  // width: 100%;
  margin: 0 0 16px 0;
  // padding: 0 30px 0 0;
  // background-color: pink;
`;

const StyledFormControl = styled(FormControl)`
  && {
    margin: 0 0 10px 0;
  }
`;

const PasswordFormControl = styled(FormControl)`
  && {
    margin: 0;
  }
`;

// const PasswordScore = styled.div`
//   font-size: 14px;
//   margin: 4px 0 10px 0;
// `;


// const FormBox = styled.form`
//   margin: 0;
// `;

const InputBox = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 300px;
  margin: 0;
  
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const TermsOfServiceBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
`;


const StyledButton = styled(Button)`
  && {
    margin: 10px 0 0 0;
  }
`;



// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/login
// --------------------------------------------------

@observer
class Component extends React.Component {
  
  static getInitialProps({ pathname, req }) {
    const isServer = !!req;
    return { isServer: isServer, pathname: pathname };
  }
  
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    const argumentsObj = {
      isServer: props.isServer,
      pathname: props.pathname
    };
    
    const storeLayoutInstance = initStoreLayout(argumentsObj);
    const storeDataInstance = initStoreData(argumentsObj);
    
    
    argumentsObj.storeInstanceObj = {
      layout: storeLayoutInstance,
      data: storeDataInstance,
    };
    
    const storeLoginIndexInstance = initStoreLoginIndex(argumentsObj);
    
    
    this.stores = {
      layout: storeLayoutInstance,
      data: storeDataInstance,
      loginIndex: storeLoginIndexInstance,
      pathname: props.pathname
    };
    
  }
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const stores = this.stores;
    
    
    
    // --------------------------------------------------
    //   Header
    // --------------------------------------------------
    
    const headerNavMainArr = [
      {
        name: 'ログイン',
        pathname: '/login'
      },
      {
        name: 'ソーシャルログイン',
        pathname: '/login/social'
      },
      // {
      //   name: 'アカウント作成',
      //   pathname: '/login/account'
      // },
    ];
    
    
    
    // --------------------------------------------------
    //   Login
    // --------------------------------------------------
    
    const {
      
      loginId,
      loginIdError,
      handleLoginId,
      
      loginPassword,
      loginPasswordError,
      handleLoginPassword,
      loginPasswordShow,
      handleLoginPasswordShow,
      handleLoginPasswordMouseDown,
      
      handleLoginSubmit,
      
      
      createAccountId,
      createAccountIdError,
      handleCreateAccountId,
      
      createAccountPassword,
      createAccountPasswordScore,
      createAccountPasswordError,
      handleCreateAccountPassword,
      createAccountPasswordShow,
      handleCreateAccountPasswordShow,
      handleCreateAccountPasswordMouseDown,
      
      createAccountPasswordConfirmation,
      createAccountPasswordConfirmationError,
      handleCreateAccountPasswordConfirmation,
      createAccountPasswordConfirmationShow,
      handleCreateAccountPasswordConfirmationShow,
      handleCreateAccountPasswordConfirmationMouseDown,
      
      createAccountTermsOfService,
      handleCreateAccountTermsOfService,
      
      handleCreateAccountSubmit
      
    } = stores.loginIndex;
    
    
    
    // --------------------------------------------------
    //   Layout
    // --------------------------------------------------
    
    const {
      
      handleTermsOfServiceDialogOpen
      
    } = stores.layout;
    
    
    
    // --------------------------------------------------
    //   パスワードの強度
    // --------------------------------------------------
    
    const passwordColorArr = ['red', 'red', 'tomato', 'green', 'green'];
    const passwordTextArr = ['とても危険', '危険', '普通', '安全', 'とても安全'];
    
    const PasswordScore = styled.div`
      font-size: 14px;
      margin: 4px 0 10px 0;
      color: ${passwordColorArr[createAccountPasswordScore]};
    `;
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider stores={this.stores}>
      
        <Layout headerNavMainArr={headerNavMainArr}>
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>ログイン - ID & パスワード - Game Users</title>
          </Head>
          
          
          <Container>
            
            
            {/* ログイン */}
            <Panel
              id='login'
              summary='ログイン - ID & パスワード'
              detailsComponent={
                <React.Fragment>
                  
                  <Description>
                    ID とパスワードでログインします。アカウントをお持ちでない場合は、アカウント作成フォームをご利用ください。
                  </Description>
                  
                  
                  {/* フォーム */}
                  <form>
                    
                    <InputBox>
                      
                      <StyledFormControl error={loginIdError}>
                        <InputLabel htmlFor="loginId">ID</InputLabel>
                        <Input
                          id="loginId"
                          type="text"
                          value={loginId}
                          onChange={handleLoginId}
                          startAdornment={
                            <InputAdornment position="start">
                              <IconId />
                            </InputAdornment>
                          }
                        />
                      </StyledFormControl>
                      
                      <StyledFormControl error={loginPasswordError}>
                        <InputLabel htmlFor="loginPassword">パスワード</InputLabel>
                        <Input
                          id="loginPassword"
                          type={loginPasswordShow ? 'text' : 'password'}
                          value={loginPassword}
                          onChange={handleLoginPassword}
                          startAdornment={
                            <InputAdornment position="start">
                              <IconPassword />
                            </InputAdornment>
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="Toggle password visibility"
                                onClick={handleLoginPasswordShow}
                                onMouseDown={handleLoginPasswordMouseDown}
                              >
                                {loginPasswordShow ? <IconVisibilityOff /> : <IconVisibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </StyledFormControl>
                    
                    </InputBox>
                    
                    
                    {/* 送信ボタン */}
                    <StyledButton
                      variant="contained"
                      color="primary"
                      onClick={handleLoginSubmit}
                    >
                      ログイン
                    </StyledButton>
                    
                  </form>
                  
                </React.Fragment>
              }
            />
            
            
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
                  
                  
                  {/* フォーム */}
                  <form>
                    
                    <InputBox>
                      
                      <StyledFormControl error={createAccountIdError}>
                        <InputLabel htmlFor="createAccountId">ID</InputLabel>
                        <Input
                          id="createAccountId"
                          value={createAccountId}
                          onChange={handleCreateAccountId}
                          startAdornment={
                            <InputAdornment position="start">
                              <IconId />
                            </InputAdornment>
                          }
                        />
                      </StyledFormControl>
                      
                      
                      <PasswordFormControl error={createAccountPasswordError} style={{margin: 0}}>
                        <InputLabel htmlFor="createAccountPassword">パスワード</InputLabel>
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
                      </PasswordFormControl>
                      
                      <PasswordScore>
                        パスワード強度：{passwordTextArr[createAccountPasswordScore]}
                      </PasswordScore>
                      
                      
                      <StyledFormControl error={createAccountPasswordConfirmationError}>
                        <InputLabel htmlFor="createAccountPasswordConfirmation">パスワード確認</InputLabel>
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
                      onClick={handleCreateAccountSubmit}
                    >
                      アカウント作成
                    </StyledButton>
                    
                  </form>
                  
                </React.Fragment>
              }
            />
            
            <TermsOfService />
            
          </Container>
          
        </Layout>
      </Provider>
    );
  }
}

export default withRoot(Component);