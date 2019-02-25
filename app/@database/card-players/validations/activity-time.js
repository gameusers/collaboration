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
 * Activity Time Object / Value Array
 * @param {string} valueArr - 検証する配列
 */
const validationCardPlayersActivityTimeObjValueArr = ({ valueArr }) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minNumber = 0;
  const maxNumber = 6;
  
  
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
      const beginTime = dataObj.beginTime ? dataObj.beginTime : '';
      const endTime = dataObj.endTime ? dataObj.endTime : '';
      const weekArr = dataObj.weekArr ? dataObj.weekArr : [];
      
      
      const formObj = {
        beginTimeObj: {
          messageCode: 'vKhuy_98i',
          error: false
        },
        endTimeObj: {
          messageCode: 'h7yr2vkyk',
          error: false
        },
        weekObj: {
          messageCode: 'vplWXcVvo',
          error: false
        },
      };
      
      
      
      // const beginTime = dataObj.beginTime;
      // const beginTime = '03:60';
      // const endTime = dataObj.endTime;
      // const weekArr = dataObj.weekArr;
      
      
      // console.log(`
      //   ----- dataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(dataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   _id: {green ${_id}}
      //   beginTime: {green ${beginTime}}
      //   endTime: {green ${endTime}}
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
        errorCodeSet.add('qBOC809TB');
        error = true;
      }
      
      
      // ---------------------------------------------
      //   開始時間
      // ---------------------------------------------
      
      // 時間チェック
      if (beginTime.match(/^([0-1][0-9]|2[0-3]):[0-5][0-9]+$/) === null) {
        formObj.beginTimeObj.error = true;
        formObj.beginTimeObj.messageCode = 'McbWUO45b';
        errorCodeSet.add('umBDyFGBI');
        error = true;
      }
      
      // 存在チェック
      if (validator.isEmpty(beginTime)) {
        formObj.beginTimeObj.error = true;
        formObj.beginTimeObj.messageCode = 'cFbXmuFVh';
        errorCodeSet.add('vv5WHKoBd');
        error = true;
      }
      
      
      // ---------------------------------------------
      //   終了時間
      // ---------------------------------------------
      
      // 時間チェック
      if (endTime.match(/^([0-1][0-9]|2[0-3]):[0-5][0-9]+$/) === null) {
        formObj.endTimeObj.error = true;
        formObj.endTimeObj.messageCode = 'McbWUO45b';
        errorCodeSet.add('7zsdduAfk');
        error = true;
      }
      
      // 存在チェック
      if (validator.isEmpty(endTime)) {
        formObj.endTimeObj.error = true;
        formObj.endTimeObj.messageCode = 'cFbXmuFVh';
        errorCodeSet.add('QxNZyKS6K');
        error = true;
      }
      
      
      // ---------------------------------------------
      //   曜日
      // ---------------------------------------------
      
      // 配列の値が数字の範囲内に収まっているか
      if (weekArr.length > 0) {
        
        for (let week of weekArr.values()) {
          if (!validator.isInt(String(week), { min: minNumber, max: maxNumber })) {
            formObj.weekObj.error = true;
            formObj.weekObj.messageCode = 'PH8jcw-VF';
            errorCodeSet.add('Vgawt5hJ5');
            error = true;
          }
        }
        
      // 曜日が選ばれていない場合
      } else {
        formObj.weekObj.error = true;
        formObj.weekObj.messageCode = 'dmja16xDh';
        errorCodeSet.add('goXfxvMKa');
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
          beginTime,
          endTime,
          weekArr
        });
      }
      
    }
    
    
  } catch (errorObj) {
    
    // console.log(chalk`
    //   errorObj.message: {green ${errorObj.message}}
    // `);
    // ---------------------------------------------
    //   その他のエラー
    // ---------------------------------------------
    
    errorCodeSet.add('kiWVCUNgA');
    
    
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
  validationCardPlayersActivityTimeObjValueArr,
};