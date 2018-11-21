// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';
// const chalk = require('chalk');
// const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import { action, observable } from 'mobx';
// const { action, observable } = require('mobx');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../../@modules/fetch';

// const { fetchWrapper } = require('../../../../@modules/fetch');




// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeLoginIndex = null;
let storeLayout = null;
let storeData = null;



// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   Constructor
  // ---------------------------------------------
  
  constructor() {}
  
  
  // ---------------------------------------------
  //   Expanded
  // ---------------------------------------------
  
  /**
   * カードの開閉用オブジェクト
   * @type {Object}
   */
  @observable cardExpandedObj = {};
  
  
  /**
   * カードを開閉する。アイコンをクリックしたときに呼び出される
   * @param {string} id - ID
   */
  @action.bound
  handleCardExpanded(id) {
    
    // console.log(`handleCardExpanded id = ${id}`);
    
    if (id in this.cardExpandedObj) {
      this.cardExpandedObj[id] = !this.cardExpandedObj[id];
    } else {
      this.cardExpandedObj[id] = false;
    }
    
  };
  
  
  
  
  /**
   * フォローボタンを押すと呼び出される
   * @param {Object} users_id - フォローする相手のデータベース users の _id
   */
  @action.bound
  async handleFollowSubmit(users_id) {
    
    
    // ---------------------------------------------
    //   FormData
    // ---------------------------------------------
    
    const formData = new FormData();
    
    formData.append('users_id', users_id);
    
    
    // ---------------------------------------------
    //   Fetch
    // ---------------------------------------------
    
    const resultObj = await fetchWrapper({
      urlApi: `${storeData.urlApi}/v1/card-players/follow`,
      methodType: 'POST',
      formData: formData
    });
    
    console.log(`
      resultObj: \n${util.inspect(resultObj, { colors: true, depth: null })}
    `);
    
    
    
    // fetch(urlApi, {
    //   method: 'POST',
    //   credentials: 'same-origin',
    //   mode: 'same-origin',
    //   headers: {
    //     'Accept': 'application/json'
    //   },
    //   body: formData
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       return response.json().then((jsonObj) => {
    //     　　throw new Error(jsonObj.errorsArr[0].message);
    //     　});
    //     }
        
    //     return response.json();
    //   })
    //   .then((jsonObj) => {
        
    //     console.log(`then`);
    //     console.dir(jsonObj);
        
    //     this.handleFormReset();
        
    //   })
    //   .catch((error) => {
        
    //     console.log(`catch: ${error}`);
        
    //   });
    
  };
  
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreCardPlayer(argumentsObj, storeInstanceObj) {
  
  const isServer = argumentsObj.isServer;
  
  
  if ('layout' in storeInstanceObj) {
    storeLayout = storeInstanceObj.layout;
  }
  
  if ('data' in storeInstanceObj) {
    storeData = storeInstanceObj.data;
  }
  
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (storeLoginIndex === null) {
      storeLoginIndex = new Store();
    }
    
    return storeLoginIndex;
    
  }
  
}