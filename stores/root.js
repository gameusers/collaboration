// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';


// --------------------------------------------------
//   Class
// --------------------------------------------------

export default class StoreRoot {
  
  @observable counter = 0;

  // constructor (isServer, lastUpdate) {
  //   this.lastUpdate = lastUpdate
  // }

  // @action start = () => {
  //   this.timer = setInterval(() => {
  //     this.lastUpdate = Date.now()
  //     this.light = true
  //   }, 1000)
  // }

  
  @action.bound
  increment() {
    this.counter += 1;
  }
  
  @action.bound
  decrement() {
    this.counter -= 1;
  }
  
  @action.bound
  reset() {
    this.counter = 0;
  }
  
}