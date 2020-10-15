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
import Router from 'next/router';
import { useIntl } from 'react-intl';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';
import lodashCloneDeep from 'lodash/cloneDeep';
import lodashMerge from 'lodash/merge';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationKeyword } from 'app/@validations/keyword.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from 'app/common/layout/v2/panel.js';






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

    page = 1,
    hardwaresArr = [],
    keyword,

  } = props;


  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------

  const intl = useIntl();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [searchHardwaresArr, setSearchHardwaresArr] = useState(hardwaresArr);
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  // const [anchorEl, setAnchorEl] = useState(null);


  useEffect(() => {

    setButtonDisabled(false);

  }, []);




  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------

  /**
   * 検索する
   * @param {number} page - ページ
   */
  const handleSearch = () => {


    try {


      // ---------------------------------------------
      //   For Search
      // ---------------------------------------------

      const hardwareIDsArr = [];

      for (let valueObj of searchHardwaresArr.values()) {
        hardwareIDsArr.push(valueObj.hardwareID);
      }


      // ---------------------------------------------
      //   Router.push 用
      // ---------------------------------------------

      // const urlHardwares = hardwareIDsArr.length > 0 ? `hardwares=${hardwareIDsArr.join(',')}&` : '';
      const urlKeyword = searchKeyword ? `keyword=${encodeURI(searchKeyword)}&` : '';

      let url = `/uc/list/[[...slug]]?${urlKeyword}page=${page}`;
      let as = `/uc/list/search?${urlKeyword}page=${page}`;

      if (!urlHardwares && !urlKeyword) {

        if (page === 1) {

          url = '/uc/list/[[...slug]]';
          as = '/uc/list';

        } else {

          url = '/uc/list/[[...slug]]';
          as = `/uc/list/${page}`;

        }

      }




      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------

      // console.log(`
      //   ----------------------------------------\n
      //   app/uc/list/v2/navigation.js - handleSearch
      // `);

      // console.log(chalk`
      //   page: {green ${page}}
      //   searchKeyword: {green ${searchKeyword}}
      // `);

      // console.log(`
      //   ----- hardwareIDsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(hardwareIDsArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);

      // console.log(`
      //   ----- searchCategoriesArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(searchCategoriesArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);




      // ---------------------------------------------
      //   Router.push = History API pushState()
      // ---------------------------------------------

      Router.push(url, as);


    } catch (errorObj) {}


  };




  // --------------------------------------------------
  //   Validations
  // --------------------------------------------------

  const validationKeywordObj = validationKeyword({ value: searchKeyword });




  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------

  // console.log(`
  //   ----------------------------------------\n
  //   app/uc/list/v2/navigation.js
  // `);

  // console.log(chalk`
  //   searchHardwares: {green ${searchHardwares}}
  //   searchCategories: {green ${searchCategories}}
  //   searchKeyword: {green ${searchKeyword}}
  // `);

  // console.log(`
  //   ----- searchHardwaresArr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(searchHardwaresArr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);




  // --------------------------------------------------
  //   Return
  // --------------------------------------------------

  return (
    <Panel
      heading="検索"
      defaultExpanded={true}
    >


      <p>条件を設定して検索することができます。</p>




      {/* Keyword */}
      <div
        css={css`
          width: 100%;
          border-top: 1px dashed #848484;
          margin: 12px 0 0 0;
          padding: 24px 0 0 0;
        `}
      >


        {/* Heading */}
        <h3
          css={css`
            font-size: 14px;
            margin: 0 0 6px 0;
          `}
        >
          コミュニティ名
        </h3>


        {/* TextField */}
        <TextField
          css={css`
            && {
              width: 100%;
            }
          `}
          id="keyword"
          label="キーワード"
          value={validationKeywordObj.value}
          onChange={(eventObj) => setSearchKeyword(eventObj.target.value)}
          error={validationKeywordObj.error}
          helperText={intl.formatMessage({ id: validationKeywordObj.messageID }, { numberOfCharacters: validationKeywordObj.numberOfCharacters })}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />


      </div>




      {/* Button */}
      <div
        css={css`
          width: 100%;
          border-top: 1px dashed #848484;
          margin: 12px 0 0 0;
          padding: 24px 0 0 0;
        `}
      >

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={buttonDisabled}
          onClick={handleSearch}
        >
          検索する
        </Button>

      </div>


    </Panel>
  );


};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
