// --------------------------------------------------
//   Import
// --------------------------------------------------

import initStoreLayout from '../common/layout/stores/layout';
import initStoreData from './data';
import initStoreWebPush from './web-push';


// --------------------------------------------------
//   共通で必要になるストアをここで作成して返す
// --------------------------------------------------

export default function initStoreRoot({ propsObj }) {

  const storeInstanceObj = {
    
    layout: initStoreLayout({ propsObj }),
    data: initStoreData({ propsObj }),
    webPush: initStoreWebPush({ propsObj }),
    
  };
  
  return storeInstanceObj;
  
};