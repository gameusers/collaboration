// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packaddresss
// ---------------------------------------------

import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashCloneDeep from 'lodash/cloneDeep';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconAddCircle from '@material-ui/icons/AddCircle';
import IconRemoveCircle from '@material-ui/icons/RemoveCircle';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import FormHardwares from 'app/common/hardware/v2/form.js';






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

/**
 * Form
 */
const ComponentForm = (props) => {


  // --------------------------------------------------
  //   props
  // --------------------------------------------------

  const {

    hardwaresArr,
    setHardwaresArr,
    releaseDate,
    setReleaseDate,
    playersMin,
    setPlayersMin,
    playersMax,
    setPlayersMax,
    publisherID,
    setPublisherID,
    developerID,
    setDeveloperID,

  } = props;

  // const limit = parseInt(process.env.NEXT_PUBLIC_GAMES_SEARCH_KEYWORD_LIMIT, 10);




  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------

  const intl = useIntl();

  // const [hardwaresArr, setHardwaresArr] = useState(lodashGet(props, ['hardwaresArr'], []));
  // const [releaseDate, setReleaseDate] = useState(lodashGet(props, ['releaseDate'], ''));




  // --------------------------------------------------
  //   Return
  // --------------------------------------------------

  return (
    <div
      css={css`
        display: flex;
        flex-flow: column wrap;
        // border-top: 1px solid #dc143c;
        border-bottom: 1px solid #dc143c;
        // margin: 0 0 0 0;
        padding: 12px 0 24px 0;
      `}
      // key={index}
    >


      {/* ハードウェア */}
      <FormHardwares
        hardwaresArr={hardwaresArr}
        setHardwaresArr={setHardwaresArr}
        limit={1}
      />


      {/* 発売日 */}
      <TextField
        css={css`
          && {
            width: 300px;

            @media screen and (max-width: 480px) {
              width: 100%;
            }
          }
        `}
        id="releaseDate"
        type="date"
        margin="normal"
        value={releaseDate}
        onChange={(eventObj) => setReleaseDate(eventObj.target.value)}
      />


      {/* プレイ人数　最小 */}
      <TextField
        css={css`
          && {
            width: 150px;

            @media screen and (max-width: 480px) {
              width: 100%;
            }
          }
        `}
        id="playersMin"
        type="number"
        margin="normal"
        label="プレイ人数 最小"
        value={playersMin}
        onChange={(eventObj) => setPlayersMin(eventObj.target.value)}
        inputProps={{
          min: 1,
        }}
      />


      {/* プレイ人数　最大 */}
      <TextField
        css={css`
          && {
            width: 150px;

            @media screen and (max-width: 480px) {
              width: 100%;
            }
          }
        `}
        id="playersMax"
        type="number"
        margin="normal"
        label="プレイ人数 最大"
        value={playersMax}
        onChange={(eventObj) => setPlayersMax(eventObj.target.value)}
        inputProps={{
          min: 1,
        }}
      />


    </div>
  );


};




/**
 * Export Component
 */
const Component = (props) => {


  // --------------------------------------------------
  //   props
  // --------------------------------------------------

  const {

    hardwares1Arr,
    setHardwares1Arr,
    releaseDate1,
    setReleaseDate1,
    playersMin1,
    setPlayersMin1,
    playersMax1,
    setPlayersMax1,
    publisherID1,
    setPublisherID1,
    developerID1,
    setDeveloperID1,

    arr = [],
    setArr,

  } = props;

  const limit = parseInt(process.env.NEXT_PUBLIC_GAMES_SEARCH_KEYWORD_LIMIT, 10);




  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------

  const intl = useIntl();

  const [formCount, setFormCount] = useState(1);




  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------

  /**
   * フォームを増やす
   */
  const handleAdd = () => {

    if (formCount < 10) {
      setFormCount(formCount + 1);
    }

    // console.log(chalk`
    //   handleAdd
    //   formCount: {green ${formCount}}
    // `);

  };




  /**
   * フォームを減らす
   */
  const handleRemove = () => {

    if (formCount > 1) {
      setFormCount(formCount - 1);
    }

    // console.log(chalk`
    //   handleRemove
    //   formCount: {green ${formCount}}
    // `);

  };




  // --------------------------------------------------
  //   Component
  // --------------------------------------------------

  const componentsArr = [];

  for (let i = 1; i <= formCount; i++) {


    // console.log(`
    //   ----- valueObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(valueObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(chalk`
    //   i: {green ${i}}
    //   formCount: {green ${formCount}}
    // `);

    // --------------------------------------------------
    //   dataObj
    // --------------------------------------------------

    let hardwaresArr = [];
    let setHardwaresArr = () => {};
    let releaseDate = '';
    let setReleaseDate = () => {};
    let playersMin = 1;
    let setPlayersMin = () => {};
    let playersMax = 1;
    let setPlayersMax = () => {};
    let publisherID = '';
    let setPublisherID = () => {};
    let developerID = '';
    let setDeveloperID = () => {};

    switch (i) {

      case 1:

        hardwaresArr = hardwares1Arr;
        setHardwaresArr = setHardwares1Arr;
        releaseDate = releaseDate1;
        setReleaseDate = setReleaseDate1;
        playersMin = playersMin1;
        setPlayersMin = setPlayersMin1;
        playersMax = playersMax1;
        setPlayersMax = setPlayersMax1;
        publisherID = publisherID1;
        setPublisherID = setPublisherID1;
        developerID = developerID1;
        setDeveloperID = setDeveloperID1;

        break;

      // default:

        // return locale_ja;

    }


    componentsArr.push(
      <div
        css={css`
          padding: 0 0 14px 0;
        `}
        key={`formHardware-${i}`}
      >

        <ComponentForm
          hardwaresArr={hardwaresArr}
          setHardwaresArr={setHardwaresArr}
          releaseDate={releaseDate}
          setReleaseDate={setReleaseDate}
          playersMin={playersMin}
          setPlayersMin={setPlayersMin}
          playersMax={playersMax}
          setPlayersMax={setPlayersMax}
          publisherID={publisherID}
          setPublisherID={setPublisherID}
          developerID={developerID}
          setDeveloperID={setDeveloperID}
        />

      </div>
    );

  }




  // --------------------------------------------------
  //   Return
  // --------------------------------------------------

  return (
    <React.Fragment>


      {/* Heading */}
      <h3
        css={css`
          font-weight: bold;
          margin: 0 0 14px 0;
        `}
      >
        ハードウェア
      </h3>

      <p
        css={css`
          margin: 0 0 14px 0;
        `}
      >
        このゲームが利用できるハードウェアを入力してください。
      </p>

      <p
        css={css`
          margin: 0 0 14px 0;
        `}
      >
        ハードウェア名（またはSFC、N64などの略称）の一部を入力すると、入力フォームの下に一覧でハードウェアの正式名称が表示されます。一覧上でハードウェアをクリック（タップ）すると入力は完了です。この欄では複数のハードウェアを入力することが可能です。
      </p>

      <p
        css={css`
          border-bottom: 1px solid #dc143c;
          // margin: 0 0 0 0;
          padding: 0 0 30px 0;
        `}
      >
        ゲームのハードウェア名だけでなく、「Android」「iOS」「PC」などもハードウェアとして入力できます。
      </p>




      {/* フォーム */}
      <div
        css={css`
          display: flex;
          flex-flow: column wrap;
        `}
      >


        {/* テキストフィールド */}
        {componentsArr}


        {/* フォーム追加・削除ボタン */}
        <div
          css={css`
            margin: 12px 0 0 0;
          `}
        >

          {/* - ボタン */}
          {formCount > 1 &&
            <IconButton
              css={css`
                && {
                  margin-right: 16px;
                }
              `}
              onClick={handleRemove}
            >
              <IconRemoveCircle />
            </IconButton>
          }


          {/* + ボタン */}
          {formCount < 10 &&
            <IconButton
              onClick={handleAdd}
            >
              <IconAddCircle />
            </IconButton>
          }

        </div>


      </div>


    </React.Fragment>
  );


};





// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
