// --------------------------------------------------
//   Import
// --------------------------------------------------

import initStoreLayout from '../common/layout/stores/layout';
import initStoreData from './data';

// import initStoreCardPlayer from '../common/card/player/stores/player';


// --------------------------------------------------
//   共通で必要になるストアをここで作成して返す
// --------------------------------------------------

export default function(argumentsObj) {
  
  const storeInstanceObj = {
    layout: new initStoreLayout(argumentsObj),
    data: new initStoreData(argumentsObj),
  };
  
  // storeInstanceObj.cardPlayer = new initStoreCardPlayer(argumentsObj, storeInstanceObj);
  
  return storeInstanceObj;
  
  // return {
  //   layout: new initStoreLayout(argumentsObj),
  //   data: new initStoreData(argumentsObj),
  // };
  
};