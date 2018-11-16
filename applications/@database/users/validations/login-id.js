// --------------------------------------------------
//   Import
// --------------------------------------------------





/**
 * Login ID
 * @param {string} value - Login ID
 */
const validationLoginId = (value) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 3;
  const maxLength = 32;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const slicedValue = value ? value.slice(0, maxLength) : '';
  const numberOfCharacters = slicedValue ? slicedValue.length : 0;
  
  let resultObj = {
    value: slicedValue,
    numberOfCharacters,
    error: false,
    errorMessageArr: []
  };
  
  
  // ---------------------------------------------
  //   Validation
  // ---------------------------------------------
  
  if (slicedValue === '') {
    resultObj.error = true;
    resultObj.errorMessageArr.push('IDを入力してください。');
  }
  
  if (slicedValue.match(/^[\w\-]+$/) === null) {
    resultObj.error = true;
    resultObj.errorMessageArr.push('IDに入力できるのは半角英数字とハイフン( - )アンダースコア( _ )です。');
  }
  
  if (numberOfCharacters < minLength || numberOfCharacters > maxLength) {
    resultObj.error = true;
    resultObj.errorMessageArr.push(`IDは${minLength}文字以上、${maxLength}文字以内です。`);
  }
  
  // console.dir(resultObj);
  
  return resultObj;
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = validationLoginId;