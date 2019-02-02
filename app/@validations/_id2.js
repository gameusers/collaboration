// --------------------------------------------------
//   Import
// --------------------------------------------------





/**
 * _id
 * @param {string} value - shortidパッケージで作成された _id
 */
const validation_id = (value) => {
  
  
  // ---------------------------------------------
  //   Config
  // ---------------------------------------------
  
  const minLength = 7;
  const maxLength = 14;
  
  
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
  }
  
  if (slicedValue.match(/^[\w\-]+$/) === null) {
    resultObj.error = true;
  }
  
  if (numberOfCharacters < minLength || numberOfCharacters > maxLength) {
    resultObj.error = true;
  }
  
  
  return resultObj;
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = validation_id;