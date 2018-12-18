// --------------------------------------------------
//   Import
// --------------------------------------------------





/**
 * E-Mail
 * @param {string} value - E-Mail
 */
const validationEmail = (value) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 3;
  const maxLength = 100;
  
  
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
  
  if (slicedValue.match(/^[\^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) === null) {
    resultObj.error = true;
    resultObj.errorMessageArr.push('正しいE-Mailアドレスを入力してください。');
  }
  
  if (numberOfCharacters < minLength || numberOfCharacters > maxLength) {
    resultObj.error = true;
    resultObj.errorMessageArr.push(`E-Mailは${minLength}文字以上、${maxLength}文字以内です。`);
  }
  
  if (slicedValue === '') {
    resultObj.error = false;
    resultObj.errorMessageArr = [];
  }
  
  // console.dir(resultObj);
  
  return resultObj;
  
};


// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = validationEmail;