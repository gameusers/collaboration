// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

/** @jsx jsx */
import { css, jsx } from '@emotion/react';






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

/**
 * Export Component
 */
const Component = (props) => {


  // --------------------------------------------------
  //   props
  // --------------------------------------------------

  const { text } = props;




  // --------------------------------------------------
  //   Component
  // --------------------------------------------------

  let componentsArr = [];

  let textArr = [];

  if (text) {
    textArr = text.split('\n').reverse();
  }


  let marginPx = 0;

  for (const [index, value] of textArr.entries()) {

    // if (value === '') {
    if (!value.match(/\S/g)) {

      marginPx += 18;

    } else {

      if (marginPx === 0) {

        componentsArr.push(
          <p key={index}>{value}</p>
        );

      } else {

        componentsArr.push(
          <p style={{ marginBottom: marginPx }} key={index}>{value}</p>
        );

      }

      marginPx = 0;

    }

    // console.log(index, value, marginPx);

  }

  componentsArr = componentsArr.reverse();




  // --------------------------------------------------
  //   Return
  // --------------------------------------------------

  return componentsArr;


};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
