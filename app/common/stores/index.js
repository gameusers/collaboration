// --------------------------------------------------
//   Import
// --------------------------------------------------

import initStoreLayout from '../layout/stores/layout';
import initStoreData from './data';



// --------------------------------------------------
//   共通で必要になるストアをここで作成して返す
// --------------------------------------------------

export default function(argumentsObj) {
  
  return {
    layout: new initStoreLayout(argumentsObj),
    data: new initStoreData(argumentsObj),
  };
  
};