// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';

import Button from 'material-ui/Button';
import Badge from 'material-ui/Badge';

import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';

import IconNotifications from '@material-ui/icons/Notifications';
import IconSearch from '@material-ui/icons/Search';
import IconPerson from '@material-ui/icons/Person';
import IconExitToApp from '@material-ui/icons/ExitToApp';

import withRoot from '../lib/material-ui/withRoot';



// --------------------------------------------------
//   Material UI を使うときは styled-components でスタイルシートを書いてください
//   設定方法がわからないため、現状 Material UI だけこの書き方になります
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const BadgeHeaderTopBell = styled(Badge)`
  margin: 0 !important;
  padding: 0 0 0 10px !important;
  top: 14px !important;
  left: 0 !important;
`;

const ButtonHeaderTopMenu = styled(Button)`
  margin: 0 !important;
  padding: 6px !important;
`;


// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores') @observer
class Component extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        
        {/* Head 内部のタグをここで追記する */}
        <Head>
          <title>タイトル</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        
        
        {/* ヘッダー */}
        <header>
          
          {/* トップメニュー */}
          <div className="header-top">
          
            {/* ロゴ */}
            <div>
              <img src="https://gameusers.org/assets/img/common/gameusers_logo.png" width="138px" height="43" />
            </div>
            
            {/* ベル・通知 */}
            <div>
              <BadgeHeaderTopBell badgeContent={4} color="primary">
                <IconNotifications />
              </BadgeHeaderTopBell>
            </div>
            
            {/* 検索フォーム */}
            <div className="header-top-search">
              <TextField
                id="input-with-icon-textfield"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            
            {/* メニュー */}
            <div className="header-top-menu">
              <ButtonHeaderTopMenu>
                <IconPerson />
                プレイヤー
              </ButtonHeaderTopMenu>
              
              <ButtonHeaderTopMenu>
                <IconExitToApp />
                ログイン
              </ButtonHeaderTopMenu>
            </div>
            
          </div>
          
          {/* ヒーローイメージ（各ゲームの大きな画像） */}
          <div>Header 2段目</div>
          
          {/* 2段目のメニュー */}
          <div>Header 3段目</div>
        
        </header>
        
        
        {/* コンテンツ */}
        {this.props.children}
        
        
        {/* フッター */}
        {/*<footer>
          {'Footer'}
        </footer>*/}
        
        
        
        <style jsx>{`
        
          header {
            display: flex !important;
            flex-direction: column !important;
          }
          
          .header-top {
            display: flex !important;
            flex-direction: row !important;
          }
          
          .header-top-search {
            display: flex !important;
            flex-grow: 1 !important;
            justify-content: center !important;
            // background-color: green;
          }
          
          .header-top-menu {
            margin-left: auto !important;
          }
        
          .test-class {
            color: blue;
          }
          
        `}</style>
        
      </div>
    );
  }
  
};

export default withRoot(Component);