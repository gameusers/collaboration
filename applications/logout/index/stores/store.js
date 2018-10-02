// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';
import fetch from 'isomorphic-unfetch';



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
  
  constructor() {
    
  }
  
  
  // ---------------------------------------------
  //   Login - ID & Password
  // ---------------------------------------------
  
  /**
   * ログアウトフォームで送信ボタンを押すと呼び出される
   */
  @action.bound
  handleLogout() {
    
    
    // ---------------------------------------------
    //   Console 出力
    // ---------------------------------------------
    
    console.log(`\n\n`);
    console.log(`--- handleLogout ---`);
    console.log(`\n\n`);
    
    
    
    // ---------------------------------------------
    //   FormData
    // ---------------------------------------------
    
    const formData = new FormData();
    
    
    // ---------------------------------------------
    //   Fetch
    // ---------------------------------------------
    
    const apiUrl = `${storeData.apiUrl}/v1/logout`;
    
    fetch(apiUrl, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((jsonObj) => {
        　　throw new Error(jsonObj.errorsArr[0].message);
        　});
        }
        
        return response.json();
      })
      .then((jsonObj) => {
        
        console.log(`then`);
        console.dir(jsonObj);
        
        // this.handleFormReset();
        
      })
      .catch((error) => {
        
        console.log(`catch: ${error}`);
        
      });
    
  };
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreLogoutIndex(argumentsObj, storeInstanceObj) {
  
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