// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
// const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const shortid = require('shortid');


// ---------------------------------------------
//   Validation
// ---------------------------------------------

const validator = require('validator');




/**
 * Link Array
 * @param {string} valueArr - 検証する配列
 */
const validationCardPlayersLinkArr = ({ valueArr }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLengthLabel = 1;
  const maxLengthLabel = 20;
  
  const minLengthURL = 1;
  const maxLengthURL = 500;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const errorCodeSet = new Set();
  
  let resultObj = {
    valueArr: [],
    formArr: [],
    error: false,
    errorCodeArr: []
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   Validation
    // ---------------------------------------------
    
    for (let dataObj of Object.values(valueArr)) {
      
      const error = false;
      
      const _id = dataObj._id ? dataObj._id : shortid.generate();
      const type = dataObj.type ? dataObj.type : '';
      const label = dataObj.label ? dataObj.label : '';
      const url = dataObj.url ? dataObj.url : '';
      const search = dataObj.search ? dataObj.search : true;
      
      
      const formObj = {
        typeObj: {
          messageCode: 'Error',
          error: false
        },
        labelObj: {
          messageCode: 'sOgKU3gS9',
          error: false
        },
        urlObj: {
          messageCode: 'CAhUTCx7B',
          error: false
        },
      };
      
      
      // ---------------------------------------------
      //   ID
      // ---------------------------------------------
      
      // 英数と -_ のみ
      if (_id.match(/^[\w\-]+$/) === null) {
        errorCodeSet.add('uTHUXw0Li');
        error = true;
      }
      
      
      // ---------------------------------------------
      //   Type
      // ---------------------------------------------
      
      // 適切な値が選択されているかチェック
      if (!validator.isIn(type, ['Twitter', 'Facebook', 'Instagram', 'YouTube', 'Twitch', 'Steam', 'Discord', 'Flickr', 'Tumblr', 'Pinterest', 'Other'])) {
        formObj.typeObj.error = true;
        formObj.typeObj.messageCode = 'PH8jcw-VF';
        errorCodeSet.add('gLkbRV4v-');
        error = true;
      }
      
      
      // ---------------------------------------------
      //   Label
      // ---------------------------------------------
      
      // Type が Other の場合、Label の入力が必要
      if (type === 'Other' && validator.isEmpty(label)) {
        formObj.labelObj.error = true;
        formObj.labelObj.messageCode = 'cFbXmuFVh';
        errorCodeSet.add('V_j_folkh');
        error = true;
      }
      
      // 文字数チェック
      if (!validator.isEmpty(label) && !validator.isLength(label, { min: minLengthLabel, max: maxLengthLabel })) {
        formObj.labelObj.error = true;
        formObj.labelObj.messageCode = 'xdAU7SgoO';
        errorCodeSet.add('z6TMmqmA7');
        error = true;
      }
      
      
      // ---------------------------------------------
      //   URL
      // ---------------------------------------------
      
      // 文字数チェック
      if (!validator.isLength(url, { min: minLengthURL, max: maxLengthURL })) {
        formObj.urlObj.error = true;
        formObj.urlObj.messageCode = 'eASl8OdnD';
        errorCodeSet.add('PjVGliScE');
        error = true;
      }
      
      // URLチェック
      if (!validator.isURL(url)) {
        formObj.urlObj.error = true;
        formObj.urlObj.messageCode = 'Bv79Cmo2s';
        errorCodeSet.add('Zq1czsL9E');
        error = true;
      }
      
      
      // ---------------------------------------------
      //   Search
      // ---------------------------------------------
      
      // Booleanチェック
      if (!validator.isBoolean(String(search))) {
        errorCodeSet.add('mUuHS5wy-');
        error = true;
      }
      
      
      // ---------------------------------------------
      //   データ代入
      // ---------------------------------------------
      
      // フォーム用
      resultObj.formArr.push(formObj);
      
      // データベース更新用
      if (!error) {
        resultObj.valueArr.push({
          _id,
          type,
          label,
          url,
          search
        });
      }
      
      
    }
    
    
  } catch (errorObj) {
    
    
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    errorCodeSet.add('_cLCLfYVB');
    
    
  } finally {
    
    
    // ---------------------------------------------
    //   Error
    // ---------------------------------------------
    
    if (errorCodeSet.size > 0) {
      resultObj.error = true;
      resultObj.errorCodeArr = Array.from(errorCodeSet);
    }
    
    
    return resultObj;
    
    
  }
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  validationCardPlayersLinkArr,
};