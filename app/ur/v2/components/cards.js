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

import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Element } from 'react-scroll';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import CardPlayer from 'app/common/card/v2/components/card-player.js';






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
  
  const {
    
    // arr = [],
    // showFollow,
    showEditButton = true,
    defaultExpanded = true,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  
  const [cardPlayersArr, setCardPlayersArr] = useState(props.cardPlayersArr);
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/ur/v2/components/cards.js
  // `);
  
  // console.log(`
  //   ----- arr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(chalk`
  //   showEditButton: {green ${showEditButton}}
  //   defaultExpanded: {green ${defaultExpanded}}
  // `);
  
  
  
  
  // --------------------------------------------------
  //   配列が空の場合は、空のコンポーネントを返す
  // --------------------------------------------------
  
  if (cardPlayersArr.length === 0) {
    return null;
  }
  
  
  
  
  // --------------------------------------------------
  //   Component - Comment & Reply
  // --------------------------------------------------
  
  const componentsArr = [];
  
  for (let valueObj of cardPlayersArr.values()) {
    
    componentsArr.push(
      <CardPlayer
        key={valueObj._id}
        obj={valueObj}
        showEditButton={showEditButton}
        defaultExpanded={defaultExpanded}
        setCardPlayersArr={setCardPlayersArr}
      />
    );
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Element
      name={`cards`}
    >
      
      {componentsArr}
      
    </Element>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;