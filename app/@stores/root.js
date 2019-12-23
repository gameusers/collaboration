// --------------------------------------------------
//   Import
// --------------------------------------------------

import initStoreLayout from '../common/layout/stores/layout';
import initStoreData from './data';


// --------------------------------------------------
//   共通で必要になるストアをここで作成して返す
// --------------------------------------------------

export default function initStoreRoot({ initialPropsObj }) {

  const storeInstanceObj = {
    
    layout: initStoreLayout({ initialPropsObj }),
    data: initStoreData({ initialPropsObj }),
    
  };
  
  return storeInstanceObj;
  
};