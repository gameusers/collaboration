// --------------------------------------------------
//   Import
// --------------------------------------------------

import initStoreLayout from '../common/layout/stores/layout';
import initStoreData from './data';


// --------------------------------------------------
//   共通で必要になるストアをここで作成して返す
// --------------------------------------------------

export default function initStoreIndex() {

  const storeInstanceObj = {
    layout: initStoreLayout({}),
    data: initStoreData({}),
  };
  
  return storeInstanceObj;
  
};