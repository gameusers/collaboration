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
import SwiperCore, { Pagination, Mousewheel, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashHas from 'lodash/has';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import FeedCard from 'app/common/feed/card.js';


// ---------------------------------------------
//   install Swiper components
// ---------------------------------------------

SwiperCore.use([Pagination, Mousewheel, Autoplay]);






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
    
    feedObj = {},
    
  } = props;
  
  
  // --------------------------------------------------
  //   カードデータが存在しない場合、空のコンポーネントを返す
  // --------------------------------------------------
  
  if (Object.keys(feedObj).length === 0) {
    return null;
  }
  
  
  
  
  // --------------------------------------------------
  //   Component - Forum Game Community
  // --------------------------------------------------
  
  const feedDataObj = lodashGet(feedObj, ['allObj', 'dataObj'], {});
  const feedArr = lodashGet(feedObj, ['allObj', 'page1Obj', 'arr'], []);

  const componentFeedsArr = [];
  
  for (const [index, _id] of feedArr.entries()) {
    
    const obj = feedDataObj[_id];
    
    componentFeedsArr.push(
      <SwiperSlide
        key={index}
      >
        <FeedCard
          obj={obj}
        />
      </SwiperSlide>
    );
    
  }

  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   app/common/feed/sidebar.js
  // `);
  
  // console.log(`
  //   ----- obj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(obj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(chalk`
  //   showEditButton: {green ${showEditButton}}
  //   defaultExpanded: {green ${defaultExpanded}}
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Swiper
      css={css`
        max-height: 450px;
        // height: 50%;
        margin: 18px 0 0 0;
        padding: 0 0 4px 0; 
      `}
      direction={'vertical'}
      spaceBetween={14}
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: false }}
      mousewheel={true}
      autoplay={{
        delay: 30000,
        disableOnInteraction: false,
      }}
    >
      {componentFeedsArr}
    </Swiper>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;