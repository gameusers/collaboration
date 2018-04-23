// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';


// --------------------------------------------------
//   Class
// --------------------------------------------------

export default class StoreHeader {
  
  @observable loginMenuStatus = false;
  @observable loginMenuAnchorEl = null;
  
  
  @action.bound
  loginMenuOpen = event => {
    // console.log('-------------------');
    // console.log(event.currentTarget);
    
    this.loginMenuAnchorEl = event.currentTarget;
    this.loginMenuStatus = true;
  };
  
  @action.bound
  loginMenuClose = () => {
    this.loginMenuAnchorEl = null;
    this.loginMenuStatus = false;
  };
  
}