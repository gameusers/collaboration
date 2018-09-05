// --------------------------------------------------
//   Import
// --------------------------------------------------

import zxcvbn from 'zxcvbn';



/**
 * ID
 * @param {string} value - ID
 */
export const validationId = (value) => {
  
  
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
  
  if (numberOfCharacters < minLength) {
    resultObj.error = true;
    resultObj.errorMessageArr.push(`IDは${minLength}文字以上、${maxLength}文字以内です。`);
  }
  
  // console.dir(resultObj);
  
  return resultObj;
  
};



/**
 * Password
 * @param {string} password - Password
 */
export const validationPassword = (password, id = '') => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 8;
  const maxLength = 32;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const slicedPassword = password ? password.slice(0, maxLength) : '';
  const numberOfCharacters = slicedPassword ? slicedPassword.length : 0;
  const strengthScore = zxcvbn(slicedPassword).score;
  
  let resultObj = {
    value: slicedPassword,
    numberOfCharacters,
    strengthScore,
    error: false,
    errorMessageArr: []
  };
  
  
  // ---------------------------------------------
  //   Validation
  // ---------------------------------------------
  
  if (slicedPassword === '') {
    resultObj.error = true;
    resultObj.errorMessageArr.push('パスワードを入力してください。');
  }
  
  if (slicedPassword.match(/^[\w\-]+$/) === null) {
    resultObj.error = true;
    resultObj.errorMessageArr.push('パスワードに入力できるのは半角英数字とハイフン( - )アンダースコア( _ )です。');
  }
  
  if (numberOfCharacters < minLength) {
    resultObj.error = true;
    resultObj.errorMessageArr.push(`パスワードは${minLength}文字以上、${maxLength}文字以内です。`);
  }
  
  // console.log(`strengthScore = ${strengthScore}`);
  if (strengthScore < 2) {
    resultObj.error = true;
    resultObj.errorMessageArr.push('パスワードの強度が足りません。');
  }
  
  if (slicedPassword !== '' && id !== '' && slicedPassword === id) {
    resultObj.error = true;
    resultObj.errorMessageArr.push('IDとパスワードを同じ文字列にすることはできません。');
  }
  
  
  // console.dir(resultObj);
  
  return resultObj;
  
};



/**
 * Password Confirmation
 * @param {string} passwordConfirmation - Password Confirmation
 * @param {string} password - Password
 */
export const validationPasswordConfirmation = (passwordConfirmation, password) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  // const minLength = 8;
  const maxLength = 32;
  
  
  // ---------------------------------------------
  //   Result Object
  // ---------------------------------------------
  
  const slicedPasswordConfirmation = passwordConfirmation ? passwordConfirmation.slice(0, maxLength) : '';
  const numberOfCharacters = slicedPasswordConfirmation ? slicedPasswordConfirmation.length : 0;
  
  let resultObj = {
    value: slicedPasswordConfirmation,
    numberOfCharacters,
    error: false,
    errorMessageArr: []
  };
  
  
  // ---------------------------------------------
  //   Validation
  // ---------------------------------------------
  
  if (slicedPasswordConfirmation === '') {
    resultObj.error = true;
    resultObj.errorMessageArr.push('パスワード確認を入力してください。');
  }
  
  if (slicedPasswordConfirmation !== '' && password !== '' && slicedPasswordConfirmation !== password) {
    resultObj.error = true;
    resultObj.errorMessageArr.push('パスワードとパスワード確認の文字列が違っています。');
  }
  
  
  // console.dir(resultObj);
  
  return resultObj;
  
};