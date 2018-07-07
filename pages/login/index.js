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
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import IconId from '@material-ui/icons/Person';
import IconPassword from '@material-ui/icons/Lock';
import IconVisibility from '@material-ui/icons/Visibility';
import IconVisibilityOff from '@material-ui/icons/VisibilityOff';

import initStoreLayout from '../../applications/common/layout/stores/layout';
import initStoreLoginIndex from '../../applications/login/index/stores/store';

import Layout from '../../applications/common/layout/components/layout';

import withRoot from '../../lib/material-ui/withRoot';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 10px;
`;


// ---------------------------------------------
//   フォーム
// ---------------------------------------------

const PaperForm = styled(Paper)`
  && {
    margin: 0 0 8px 0;
    padding: 16px;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 0 0 10px 0;
`;

const Description = styled.div`
  margin: 0 0 16px 0;
`;

const StyledFormControl = styled(FormControl)`
  && {
    margin: 0 0 10px 0;
  }
`;

const FormBox = styled.form`
  margin: 0;
`;

const InputBox = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 300px;
  margin: 0;
  
  @media screen and (max-width: 480px) {
    width: 100%;
  }
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
    
    const storeLayoutInstance = initStoreLayout(props.isServer);
    
    this.stores = {
      layout: storeLayoutInstance,
      current: initStoreLoginIndex(props.isServer, storeLayoutInstance),
      pathname: props.pathname
    };
    
  }
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const stores = this.stores;
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider stores={this.stores}>
      
        <Layout headerMenuArr={stores.layout.headerMenuObj.login}>
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>ログイン - ID & パスワード - Game Users</title>
          </Head>
          
          
          <Container>
            
            {/* ログイン */}
            <PaperForm elevation={4}>
            
              <Title>ログイン - ID & パスワード</Title>
              
              <Description>
                ID とパスワードでログインします。初めて利用する場合は、まずアカウントを作成してください。
              </Description>
              
              
              {/* フォーム */}
              <FormBox>
                
                <InputBox>
                
                  <StyledFormControl>
                    <InputLabel htmlFor="input-with-icon-adornment">ID</InputLabel>
                    <Input
                      id="id"
                      startAdornment={
                        <InputAdornment position="start">
                          <IconId />
                        </InputAdornment>
                      }
                    />
                  </StyledFormControl>
                  
                  <StyledFormControl>
                    <InputLabel htmlFor="input-with-icon-adornment">パスワード</InputLabel>
                    <Input
                      id="password"
                      type={stores.current.showPassword ? 'text' : 'password'}
                      value={stores.current.password}
                      onChange={stores.current.handleChangePassword}
                      startAdornment={
                        <InputAdornment position="start">
                          <IconPassword />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={stores.current.handleClickShowPassword}
                            onMouseDown={stores.current.handleMouseDownPassword}
                          >
                            {stores.current.showPassword ? <IconVisibilityOff /> : <IconVisibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </StyledFormControl>
                
                </InputBox>
                
                
                {/* ボタン */}
                <StyledButton
                  variant="contained"
                  color="primary"
                  // onClick={stores.current.dialogOpenFunction}
                >
                  送信
                </StyledButton>
                
              </FormBox>
              
            </PaperForm>
            
          </Container>
          
        </Layout>
      </Provider>
    );
  }
}

export default withRoot(Component);