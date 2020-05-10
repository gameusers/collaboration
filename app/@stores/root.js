// --------------------------------------------------
//   Import
// --------------------------------------------------

import initStoreLayout from '../common/layout/stores/layout.js';
import initStoreData from './data.js';
import initStoreWebPush from './web-push.js';
import initStoreFollow from '../common/follow/stores/store.js';


// --------------------------------------------------
//   共通で必要になるストアをここで作成して返す
// --------------------------------------------------

export default function initStoreRoot({ propsObj }) {

  const storeInstanceObj = {
    
    layout: initStoreLayout({ propsObj }),
    data: initStoreData({ propsObj }),
    webPush: initStoreWebPush({ propsObj }),
    follow: initStoreFollow({ propsObj }),
    
  };
  
  return storeInstanceObj;
  
};