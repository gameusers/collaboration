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
import Link from 'next/link';
import Router from 'next/router';
import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';
import { Element } from 'react-scroll';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/ja_JP';
import Cookies from 'js-cookie';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconEdit from '@material-ui/icons/Edit';
import IconHelpOutline from '@material-ui/icons/HelpOutline';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { CustomError } from 'app/@modules/error/custom.js';
import { showSnackbar } from 'app/@modules/snackbar.js';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateUser } from 'app/@states/user.js';
import { ContainerStateLayout } from 'app/@states/layout.js';
import { ContainerStateGcRegister } from 'app/@states/gc-register.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from 'app/common/layout/v2/panel.js';

import Card from 'app/gc/register/v2/card.js';
import CardTemp from 'app/gc/register/v2/card-temp.js';
import Form from 'app/gc/register/v2/form.js';




// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const useStyles = makeStyles({

  expanded: {
    marginBottom: '0 !important',
  },

  input: {
    fontSize: '12px',
    color: '#666',
    padding: '6px 26px 6px 12px',
  },

});






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

    gcListObj,
    gcTempsListObj,
    gameGenresArr,

  } = props;


  // --------------------------------------------------
  //   States
  // --------------------------------------------------

  const stateUser = ContainerStateUser.useContainer();
  const stateLayout = ContainerStateLayout.useContainer();
  const stateGcRegister = ContainerStateGcRegister.useContainer();

  const { login } = stateUser;

  const {

    handleLoadingOpen,
    handleLoadingClose,
    handleScrollTo,

  } = stateLayout;

  const {

    setLanguage,
    setCountry,
    setName,
    setSubtitle,
    setSortKeyword,
    setURLID,
    setTwitterHashtagsArr,
    setSearchKeywordsArr,
    setGenre1,
    setGenre2,
    setGenre3,

    setHardwares1Arr,
    setReleaseDate1,
    setPlayersMin1,
    setPlayersMax1,
    setPublisherIDs1Arr,
    setDeveloperIDs1Arr,

    setHardwares2Arr,
    setReleaseDate2,
    setPlayersMin2,
    setPlayersMax2,
    setPublisherIDs2Arr,
    setDeveloperIDs2Arr,

    setHardwares3Arr,
    setReleaseDate3,
    setPlayersMin3,
    setPlayersMax3,
    setPublisherIDs3Arr,
    setDeveloperIDs3Arr,

    setHardwares4Arr,
    setReleaseDate4,
    setPlayersMin4,
    setPlayersMax4,
    setPublisherIDs4Arr,
    setDeveloperIDs4Arr,

    setHardwares5Arr,
    setReleaseDate5,
    setPlayersMin5,
    setPlayersMax5,
    setPublisherIDs5Arr,
    setDeveloperIDs5Arr,

    setHardwares6Arr,
    setReleaseDate6,
    setPlayersMin6,
    setPlayersMax6,
    setPublisherIDs6Arr,
    setDeveloperIDs6Arr,

    setHardwares7Arr,
    setReleaseDate7,
    setPlayersMin7,
    setPlayersMax7,
    setPublisherIDs7Arr,
    setDeveloperIDs7Arr,

    setHardwares8Arr,
    setReleaseDate8,
    setPlayersMin8,
    setPlayersMax8,
    setPublisherIDs8Arr,
    setDeveloperIDs8Arr,

    setHardwares9Arr,
    setReleaseDate9,
    setPlayersMin9,
    setPlayersMax9,
    setPublisherIDs9Arr,
    setDeveloperIDs9Arr,

    setHardwares10Arr,
    setReleaseDate10,
    setPlayersMin10,
    setPlayersMax10,
    setPublisherIDs10Arr,
    setDeveloperIDs10Arr,

    setLinkArr,

    setImagesAndVideosObj,
    setImagesAndVideosThumbnailObj,

  } = stateGcRegister;


  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------

  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [buttonDisabled, setButtonDisabled] = useState(true);



  useEffect(() => {

    setButtonDisabled(false);

  }, []);




  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------

  /**
   * 仮登録ゲーム一覧を読み込む
   * @param {number} page - ページ
   * @param {number} changeLimit - 1ページに表示する件数を変更する場合、値を入力する
   */
  const handleRead = async ({

    page,
    changeLimit,

  }) => {


    try {


      // ---------------------------------------------
      //   Router.push 用
      // ---------------------------------------------

      let url = '';
      let as = '';

      if (page === 1) {

        url = `/gc/register/[[...slug]]`;
        as ='/gc/register';

      } else {

        url = '/gc/register/[[...slug]]';
        as = `/gc/register/${page}`;

      }


      // ---------------------------------------------
      //   Change Limit / Set Cookie
      // ---------------------------------------------

      if (changeLimit) {
        Cookies.set('communityListLimit', changeLimit);
      }


      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------

      // console.log(`
      //   ----------------------------------------\n
      //   app/gc/list/v2/register.js - handleRead
      // `);

      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   page: {green ${page}}
      //   changeLimit: {green ${changeLimit}}

      //   url: {green ${url}}
      //   as: {green ${as}}
      // `);

      // return;


      // ---------------------------------------------
      //   Router.push = History API pushState()
      // ---------------------------------------------

      await Router.push(url, as);


    } catch (errorObj) {}


  };




  /**
   * 編集用データを読み込む
   */
  const handleGetEditData = async ({ games_id, gamesTemps_id }) => {


    try {

      // console.log(chalk`
      //   games_id: {green ${games_id}}
      //   gamesTemps_id: {green ${gamesTemps_id}}
      // `);
      // ---------------------------------------------
      //   _id が存在しない場合エラー
      // ---------------------------------------------

      if (!games_id && !gamesTemps_id) {
        throw new CustomError({ errorsArr: [{ code: 'oVxYzL2wk', messageID: 'Error' }] });
      }




      // ---------------------------------------------
      //   Loading Open
      // ---------------------------------------------

      handleLoadingOpen({});


      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------

      setButtonDisabled(true);




      // ---------------------------------------------
      //   Scroll To
      // ---------------------------------------------

      handleScrollTo({

        to: 'gcRegisterForm',
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,

      });




      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------

      const formDataObj = {

        games_id,
        gamesTemps_id,

      };


      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------

      const resultObj = await fetchWrapper({

        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/games-temps/get-edit-data`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),

      });


      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);


      // ---------------------------------------------
      //   Error
      // ---------------------------------------------

      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }




      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------

      setButtonDisabled(false);


      // ---------------------------------------------
      //   Set Form Data
      // ---------------------------------------------

      setLanguage(lodashGet(resultObj, ['data', 'language'], 'ja'));
      setCountry(lodashGet(resultObj, ['data', 'country'], 'JP'));
      setName(lodashGet(resultObj, ['data', 'name'], ''));
      setSubtitle(lodashGet(resultObj, ['data', 'subtitle'], ''));
      setSortKeyword(lodashGet(resultObj, ['data', 'sortKeyword'], ''));
      setURLID(lodashGet(resultObj, ['data', 'urlID'], ''));
      setTwitterHashtagsArr(lodashGet(resultObj, ['data', 'twitterHashtagsArr'], []));
      setSearchKeywordsArr(lodashGet(resultObj, ['data', 'searchKeywordsArr'], []));

      setGenre1(lodashGet(resultObj, ['data', 'genreArr', 0], ''));
      setGenre2(lodashGet(resultObj, ['data', 'genreArr', 1], ''));
      setGenre3(lodashGet(resultObj, ['data', 'genreArr', 2], ''));

      setHardwares1Arr(lodashGet(resultObj, ['data', 'hardwareArr', 0, 'hardwaresArr'], []));
      setHardwares1Arr(lodashGet(resultObj, ['data', 'hardwareArr', 0, 'hardwareID'], ''));
      setReleaseDate1(lodashGet(resultObj, ['data', 'hardwareArr', 0, 'releaseDate'], ''));
      setPlayersMin1(lodashGet(resultObj, ['data', 'hardwareArr', 0, 'playersMin'], ''));
      setPlayersMax1(lodashGet(resultObj, ['data', 'hardwareArr', 0, 'playersMax'], ''));
      setPublisherIDs1Arr(lodashGet(resultObj, ['data', 'hardwareArr', 0, 'publisherIDsArr'], []));
      setDeveloperIDs1Arr(lodashGet(resultObj, ['data', 'hardwareArr', 0, 'developerIDsArr'], []));

      // (lodashGet(resultObj, ['data', ''], ''));
      // (lodashGet(resultObj, ['data', ''], ''));
      // (lodashGet(resultObj, ['data', ''], ''));

      // const anonymity = lodashGet(resultObj, ['data', 'anonymity'], false);
      // const comment = lodashGet(resultObj, ['data', 'comment'], '');
      // let imagesAndVideosObj = lodashGet(resultObj, ['data', 'imagesAndVideosObj'], {});

      // if (Object.keys(imagesAndVideosObj).length === 0) {

      //   imagesAndVideosObj = {

      //     _id: '',
      //     createdDate: '',
      //     updatedDate: '',
      //     users_id: '',
      //     type: 'forum',
      //     arr: [],

      //   };

      // }

      console.log(chalk`
      lodashGet(resultObj, ['data', 'hardwareArr', 0, 'releaseDate'], ''): {green ${lodashGet(resultObj, ['data', 'hardwareArr', 0, 'releaseDate'], '')}}
      `);


    } catch (errorObj) {


      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------

      setButtonDisabled(false);


      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------

      showSnackbar({

        enqueueSnackbar,
        intl,
        errorObj,

      });


    } finally {


      // ---------------------------------------------
      //   Loading Close
      // ---------------------------------------------

      handleLoadingClose();



    }


  };




  // --------------------------------------------------
  //   Thread
  // --------------------------------------------------

  const page = lodashGet(gcListObj, ['page'], 1);
  const limit = lodashGet(gcListObj, ['limit'], parseInt(process.env.NEXT_PUBLIC_COMMUNITY_LIST_LIMIT, 10));
  const count = lodashGet(gcListObj, ['count'], 0);
  const listArr = lodashGet(gcListObj, [`page${page}Obj`, 'arr'], []);
  const tempsListArr = lodashGet(gcTempsListObj, [`page${page}Obj`, 'arr'], []);




  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------

  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/forum/v2/components/forum.js
  // `);

  // console.log(chalk`
  //   urlID: {green ${urlID}}
  //   gameCommunities_id: {green ${gameCommunities_id}}
  //   userCommunityID: {green ${userCommunityID}}
  //   userCommunities_id: {green ${userCommunities_id}}

  //   page: {green ${page}}
  //   count: {green ${count}}
  //   limit: {green ${limit}}
  // `);

  // console.log(`
  //   ----- arr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);




  // --------------------------------------------------
  //   Component - List
  // --------------------------------------------------

  const componentListArr = [];

  for (const [index, gameCommunities_id] of listArr.entries()) {


    // --------------------------------------------------
    //   dataObj
    // --------------------------------------------------

    const dataObj = lodashGet(gcListObj, ['dataObj', gameCommunities_id], {});


    // --------------------------------------------------
    //   push
    // --------------------------------------------------

    componentListArr.push(
      <Card
        key={index}
        obj={dataObj}
        handleGetEditData={handleGetEditData}
      />
    );


  }


  // --------------------------------------------------
  //   Component - Temps List
  // --------------------------------------------------

  const componentTempsListArr = [];

  for (const [index, _id] of tempsListArr.entries()) {


    // --------------------------------------------------
    //   dataObj
    // --------------------------------------------------

    const dataObj = lodashGet(gcTempsListObj, ['dataObj', _id], {});


    // --------------------------------------------------
    //   push
    // --------------------------------------------------

    componentListArr.push(
      <CardTemp
        key={index}
        obj={dataObj}
        handleGetEditData={handleGetEditData}
      />
    );


  }





  // --------------------------------------------------
  //   Return
  // --------------------------------------------------

  return (
    <Element
      name="gcRegister"
    >


      {/* List */}
      <div
        css={css`
          margin: 0 0 16px 0;
        `}
      >
        {componentListArr}
      </div>


      {/* Temps List */}
      <div
        css={css`
          margin: 0 0 16px 0;
        `}
      >
        {componentTempsListArr}
      </div>




      {/* Pagination Container */}
      <Paper
        css={css`
          display: flex;
          flex-flow: row wrap;
          padding: 0 8px 8px 8px;
        `}
      >


        {/* Pagination */}
        <div
          css={css`
            margin: 8px 24px 0 0;
          `}
        >

          <Pagination
            disabled={buttonDisabled}
            onChange={(page) => handleRead({
              page,
            })}
            pageSize={limit}
            current={page}
            total={count}
            locale={localeInfo}
          />

        </div>


        {/* Rows Per Page */}
        <FormControl
          css={css`
            margin: 8px 0 0 0 !important;
          `}
          variant="outlined"
        >

          <Select
            value={limit}
            onChange={(eventObj) => handleRead({
              page: 1,
              changeLimit: eventObj.target.value,
            })}
            input={
              <OutlinedInput
                classes={{
                  input: classes.input
                }}
                name="gc-limit-pagination"
                id="outlined-rows-per-page"
              />
            }
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>

        </FormControl>


      </Paper>




      {/* Form */}
      {login
        ?
          <div
            css={css`
              margin: 28px 0 0 0;
            `}
          >

            <Panel
              heading="ゲーム登録フォーム"
              defaultExpanded={true}
            >

              <Form
                gameGenresArr={gameGenresArr}
              />

            </Panel>

          </div>
        :
          <Paper
            css={css`
              margin: 28px 0 0 0;
              padding: 8px 12px;
            `}
          >
            <p
              css={css`
                color: red;
              `}
            >
              ※ ログインしていないため、登録フォームは表示されません。
            </p>
          </Paper>
      }


    </Element>
  );


};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
