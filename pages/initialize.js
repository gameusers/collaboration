// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import getConfig from 'next/config';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { fetchWrapper } = require('../app/@modules/fetch');




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/initialize
// --------------------------------------------------

class Component extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  // static async getInitialProps({ pathname, req, res }) {
  // }
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   .env
    // --------------------------------------------------
    
    this.environment = process.env.NODE_ENV;
    this.urlBase = process.env.NEXT_PUBLIC_URL_BASE;
    this.urlApi = process.env.NEXT_PUBLIC_URL_API;
    
    
  }
  
  
  async initializeDB() {
    
    console.log('initializeDB');
    
    
    try {
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formData = new FormData();
      
      // formData.append('users_id', users_id);
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      await fetchWrapper({
        urlApi: `${this.urlApi}/v1/initialize/db`,
        methodType: 'POST',
        formData: formData
      });
      
      
      
    } catch (error) {
      
      console.log(error);
      
    }
    
  }
  
  
  render() {
    
    
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div>
        
        <h1>データベース</h1>
        <p>以下のボタンを押すと、MongoDB の gameusers データベース内に、初期コレクションを挿入します。データを初期状態に戻したいときにも利用できます。</p>
        
        <Button variant="contained" onClick={() => this.initializeDB()}>
          データベース - データ挿入
        </Button>
        
        
        <br /><br />
        
        
        <h1>開発中の主要ページ</h1>
        <p>開発の状況により、正常にアクセスできないページが出てくることがあります。</p>
        
        
        <p>トップページ<br />
        <a href={this.urlBase} target="_blank">{this.urlBase}</a></p>
        
        <p>ユーザーコミュニティ一覧<br />
        <a href={`${this.urlBase}uc`} target="_blank">{`${this.urlBase}uc`}</a></p>
        
        <p>ゲームコミュニティ一覧<br />
        <a href={`${this.urlBase}gc`} target="_blank">{`${this.urlBase}gc`}</a></p>
        
        <p>ログイン<br />
        <a href={`${this.urlBase}login`} target="_blank">{`${this.urlBase}login`}</a></p>
        
        <p>ログアウト<br />
        <a href={`${this.urlBase}logout`} target="_blank">{`${this.urlBase}logout`}</a></p>
        
        <p>ゲームコミュニティ（現在はこのページを作成中）<br />
        <a href={`${this.urlBase}gc/Dead-by-Daylight`} target="_blank">{`${this.urlBase}gc/Dead-by-Daylight`}</a></p>
        
        <p>ユーザーコミュニティ<br />
        <a href={`${this.urlBase}uc/community1`} target="_blank">{`${this.urlBase}uc/community1`}</a></p>
        
        <p>ユーザー<br />
        <a href={`${this.urlBase}ur/user1`} target="_blank">{`${this.urlBase}ur/user1`}</a></p>
        
        
        <br /><br />
        
        
        <h1>ログイン情報</h1>
        <p>1. ログインID：8OM0dhDak　パスワード：8OM0dhDak0</p>
        <p>2. ログインID：enPLLYBBEg3y　パスワード：enPLLYBBEg3y0</p>
        <p>3. ログインID：nzPR7R9GO　パスワード：nzPR7R9GO0</p>
        
        
        <br />
        
        
      </div>
    );
  }
}

export default Component;