// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


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
    formArr: [],
    error: false,
    errorCodeArr: []
  };
  
  
  try {
    
    
    // ---------------------------------------------
    //   Validation
    // ---------------------------------------------
    
    for (let dataObj of Object.values(valueArr)) {
      
      const _id = dataObj._id ? dataObj._id : shortid.generate();
      const type = dataObj.type ? dataObj.type : '';
      const label = dataObj.label ? dataObj.label : '';
      const url = dataObj.url ? dataObj.url : '';
      
      
      const formObj = {
        typeObj: {
          messageCode: 'C5lyqOFQz',
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
      
      
      
      // console.log(`
      //   ----- dataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(dataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   _id: {green ${_id}}
      //   type: {green ${type}}
      //   label: {green ${label}}
      //   url: {green ${url}}
      // `);
      
      // console.log(chalk`
      //   beginTime: {green ${beginTime}}
      //   validator.isEmpty(beginTime): {green ${validator.isEmpty(beginTime)}}
      // `);
      
      // console.log(`
      //   ----- weekArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(weekArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   ID
      // ---------------------------------------------
      
      // 英数と -_ のみ
      if (_id.match(/^[\w\-]+$/) === null) {
        errorCodeSet.add('1ArF0ut8V');
      }
      
      
      // ---------------------------------------------
      //   Type
      // ---------------------------------------------
      
      // 適切な値が選択されているかチェック
      if (!validator.isIn(type, ['Twitter', 'Facebook', 'Instagram', 'YouTube', 'Twitch', 'Steam', 'Pixiv', 'Other'])) {
        formObj.typeObj.error = true;
        formObj.typeObj.messageCode = 'PH8jcw-VF';
        errorCodeSet.add('nNCzZDQrE');
      }
      
      
      // ---------------------------------------------
      //   Label
      // ---------------------------------------------
      
      // 文字数チェック
      if (!validator.isEmpty(label) && !validator.isLength(label, { min: minLengthLabel, max: maxLengthLabel })) {
        formObj.labelObj.error = true;
        formObj.labelObj.messageCode = 'xdAU7SgoO';
        errorCodeSet.add('JBMaWZy8Q');
      }
      
      
      // ---------------------------------------------
      //   URL
      // ---------------------------------------------
      
      // 文字数チェック
      if (!validator.isLength(url, { min: minLengthURL, max: maxLengthURL })) {
        formObj.urlObj.error = true;
        formObj.urlObj.messageCode = 'eASl8OdnD';
        errorCodeSet.add('crjh4LA6v');
      }
      
      // URLチェック
      if (!validator.isURL(url)) {
        formObj.urlObj.error = true;
        formObj.urlObj.messageCode = 'Bv79Cmo2s';
        errorCodeSet.add('Rj9SOuo9a');
      }
      
      
      // ---------------------------------------------
      //   データ代入
      // ---------------------------------------------
      
      // フォーム用
      resultObj.formArr.push(formObj);
      
      
    }
    
    
  } catch (errorObj) {
    
    // console.log(chalk`
    //   errorObj.message: {green ${errorObj.message}}
    // `);
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    errorCodeSet.add('cvj2gQZWC');
    
    
  } finally {
    
    
    // console.log(`
    //   ----- errorCodeSet -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(errorCodeSet)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
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