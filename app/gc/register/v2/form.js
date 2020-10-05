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
import { useSnackbar } from 'notistack';
import { Element } from 'react-scroll';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashHas from 'lodash/has';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconHelpOutline from '@material-ui/icons/HelpOutline';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateUser } from 'app/@states/user.js';
import { ContainerStateLayout } from 'app/@states/layout.js';
import { ContainerStateGcRegister } from 'app/@states/gc-register.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { CustomError } from 'app/@modules/error/custom.js';
import { showSnackbar } from 'app/@modules/snackbar.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationGamesName, validationGamesSubtitle, validationGamesSortKeyword } from 'app/@database/games/validations/name.js';
import { validationGamesURLID } from 'app/@database/games/validations/url.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import FormImageAndVideo from 'app/common/image-and-video/v2/form.js';

import FormTwitter from 'app/gc/register/v2/form/twitter.js';
import FormSearchKeyword from 'app/gc/register/v2/form/search-keyword.js';
import FormHardware from 'app/gc/register/v2/form/hardware.js';
import FormLink from 'app/gc/register/v2/form/link.js';




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssBox = css`
  border-top: 1px dashed #848484;
  margin: 24px 0 0 0;
  padding: 24px 0 0 0;
`;






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

    games_id,
    gameGenresArr,

  } = props;




  // --------------------------------------------------
  //   States
  // --------------------------------------------------

  const stateUser = ContainerStateUser.useContainer();
  const stateLayout = ContainerStateLayout.useContainer();
  const stateGcRegister = ContainerStateGcRegister.useContainer();

  const { loginUsersObj } = stateUser;

  const {

    handleLoadingOpen,
    handleLoadingClose,
    handleScrollTo,
    handleDialogOpen,

  } = stateLayout;

  const {

    language,
    setLanguage,
    country,
    setCountry,
    name,
    setName,
    subtitle,
    setSubtitle,
    sortKeyword,
    setSortKeyword,
    urlID,
    setURLID,
    twitterHashtagsArr,
    setTwitterHashtagsArr,
    searchKeywordsArr,
    setSearchKeywordsArr,
    genre1,
    setGenre1,
    genre2,
    setGenre2,
    genre3,
    setGenre3,

    hardwaresCount,

    hardwares1Arr,
    setHardwares1Arr,
    releaseDate1,
    setReleaseDate1,
    playersMin1,
    setPlayersMin1,
    playersMax1,
    setPlayersMax1,
    publishers1Arr,
    setPublishers1Arr,
    developers1Arr,
    setDevelopers1Arr,

    hardwares2Arr,
    setHardwares2Arr,
    releaseDate2,
    setReleaseDate2,
    playersMin2,
    setPlayersMin2,
    playersMax2,
    setPlayersMax2,
    publishers2Arr,
    setPublishers2Arr,
    developers2Arr,
    setDevelopers2Arr,

    hardwares3Arr,
    setHardwares3Arr,
    releaseDate3,
    setReleaseDate3,
    playersMin3,
    setPlayersMin3,
    playersMax3,
    setPlayersMax3,
    publishers3Arr,
    setPublishers3Arr,
    developers3Arr,
    setDevelopers3Arr,

    hardwares4Arr,
    setHardwares4Arr,
    releaseDate4,
    setReleaseDate4,
    playersMin4,
    setPlayersMin4,
    playersMax4,
    setPlayersMax4,
    publishers4Arr,
    setPublishers4Arr,
    developers4Arr,
    setDevelopers4Arr,

    hardwares5Arr,
    setHardwares5Arr,
    releaseDate5,
    setReleaseDate5,
    playersMin5,
    setPlayersMin5,
    playersMax5,
    setPlayersMax5,
    publishers5Arr,
    setPublishers5Arr,
    developers5Arr,
    setDevelopers5Arr,

    hardwares6Arr,
    setHardwares6Arr,
    releaseDate6,
    setReleaseDate6,
    playersMin6,
    setPlayersMin6,
    playersMax6,
    setPlayersMax6,
    publishers6Arr,
    setPublishers6Arr,
    developers6Arr,
    setDevelopers6Arr,

    hardwares7Arr,
    setHardwares7Arr,
    releaseDate7,
    setReleaseDate7,
    playersMin7,
    setPlayersMin7,
    playersMax7,
    setPlayersMax7,
    publishers7Arr,
    setPublishers7Arr,
    developers7Arr,
    setDevelopers7Arr,

    hardwares8Arr,
    setHardwares8Arr,
    releaseDate8,
    setReleaseDate8,
    playersMin8,
    setPlayersMin8,
    playersMax8,
    setPlayersMax8,
    publishers8Arr,
    setPublishers8Arr,
    developers8Arr,
    setDevelopers8Arr,

    hardwares9Arr,
    setHardwares9Arr,
    releaseDate9,
    setReleaseDate9,
    playersMin9,
    setPlayersMin9,
    playersMax9,
    setPlayersMax9,
    publishers9Arr,
    setPublishers9Arr,
    developers9Arr,
    setDevelopers9Arr,

    hardwares10Arr,
    setHardwares10Arr,
    releaseDate10,
    setReleaseDate10,
    playersMin10,
    setPlayersMin10,
    playersMax10,
    setPlayersMax10,
    publishers10Arr,
    setPublishers10Arr,
    developers10Arr,
    setDevelopers10Arr,

    linkArr,
    setLinkArr,

    imagesAndVideosObj,
    setImagesAndVideosObj,
    imagesAndVideosThumbnailObj,
    setImagesAndVideosThumbnailObj,

    handleResetForm,

  } = stateGcRegister;


  const role = lodashGet(loginUsersObj, ['role'], '');
  const administrator = role === 'administrator' ? true : false;




  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------

  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [anchorElSortKeyword, setAnchorElSortKeyword] = useState(null);
  const [anchorElSubtitle, setAnchorElSubtitle] = useState(null);


  useEffect(() => {


    // --------------------------------------------------
    //   Button Enable
    // --------------------------------------------------

    setButtonDisabled(false);


    // --------------------------------------------------
    //   編集用データを読み込む
    // --------------------------------------------------

    if (games_id) {
      handleGetEditData();
    }


  }, []);




  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------

  /**
   * 編集用データを読み込む
   */
  const handleGetEditData = async () => {


    try {


      // ---------------------------------------------
      //   recruitmentThreads_id が存在しない場合エラー
      // ---------------------------------------------

      if (!recruitmentThreads_id) {
        throw new CustomError({ errorsArr: [{ code: '1sfB7JPUO', messageID: 'Error' }] });
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

        to: recruitmentThreads_id,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,

      });




      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------

      const formDataObj = {

        recruitmentThreads_id,

      };


      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------

      const resultObj = await fetchWrapper({

        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/recruitment-threads/get-edit-data`,
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

      setHardwaresArr(lodashGet(resultObj, ['data', 'hardwaresArr'], []));
      setCategory(lodashGet(resultObj, ['data', 'category'], ''));


      const localesArr = lodashGet(resultObj, ['data', 'localesArr'], []);

      const filteredArr = localesArr.filter((filterObj) => {
        return filterObj.language === localeObj.language;
      });

      if (lodashHas(filteredArr, [0])) {

        setTitle(lodashGet(filteredArr, [0, 'title'], ''));
        setName(lodashGet(filteredArr, [0, 'name'], ''));
        setComment(lodashGet(filteredArr, [0, 'comment'], ''));

      } else {

        setTitle(lodashGet(localesArr, [0, 'title'], ''));
        setName(lodashGet(localesArr, [0, 'name'], ''));
        setComment(lodashGet(localesArr, [0, 'comment'], ''));

      }


      let tempImagesAndVideosObj = lodashGet(resultObj, ['data', 'imagesAndVideosObj'], {});

      if (Object.keys(tempImagesAndVideosObj).length === 0) {

        tempImagesAndVideosObj = {

          _id: '',
          createdDate: '',
          updatedDate: '',
          users_id: '',
          type: 'recruitment',
          arr: [],

        };

      }

      setImagesAndVideosObj(tempImagesAndVideosObj);


      setIDsArr(lodashGet(resultObj, ['data', 'idsArr'], []));
      setPlatform1(lodashGet(resultObj, ['data', 'platform1'], 'Other'));
      setPlatform2(lodashGet(resultObj, ['data', 'platform2'], 'Other'));
      setPlatform3(lodashGet(resultObj, ['data', 'platform3'], 'Other'));
      setID1(lodashGet(resultObj, ['data', 'id1'], ''));
      setID2(lodashGet(resultObj, ['data', 'id2'], ''));
      setID3(lodashGet(resultObj, ['data', 'id3'], ''));
      setInformationTitle1(lodashGet(resultObj, ['data', 'informationTitle1'], ''));
      setInformationTitle2(lodashGet(resultObj, ['data', 'informationTitle2'], ''));
      setInformationTitle3(lodashGet(resultObj, ['data', 'informationTitle3'], ''));
      setInformationTitle4(lodashGet(resultObj, ['data', 'informationTitle4'], ''));
      setInformationTitle5(lodashGet(resultObj, ['data', 'informationTitle5'], ''));
      setInformation1(lodashGet(resultObj, ['data', 'information1'], ''));
      setInformation2(lodashGet(resultObj, ['data', 'information2'], ''));
      setInformation3(lodashGet(resultObj, ['data', 'information3'], ''));
      setInformation4(lodashGet(resultObj, ['data', 'information4'], ''));
      setInformation5(lodashGet(resultObj, ['data', 'information5'], ''));
      setPublicSetting(lodashGet(resultObj, ['data', 'publicSetting'], 1));
      setDeadlineDate(lodashGet(resultObj, ['data', 'deadlineDate'], ''));
      setWebPushAvailable(lodashGet(resultObj, ['data', 'webPushAvailable'], false));
      setWebPushSubscriptionObj(lodashGet(resultObj, ['data', 'webPushesObj', 'subscriptionObj'], {}));


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




  /**
   * ゲームを登録する
   * @param {Object} eventObj - イベント
   */
  const handleSubmit = async ({

    eventObj,

  }) => {


    // ---------------------------------------------
    //   フォームの送信処理停止
    // ---------------------------------------------

    eventObj.preventDefault();


    // ---------------------------------------------
    //   新規投稿時の recruitmentThreads_id
    // ---------------------------------------------

    // let newRecruitmentThreads_id = '';




    try {


      // ---------------------------------------------
      //   Property
      // ---------------------------------------------

      // const hardwareIDsArr = [];

      // for (let valueObj of hardwaresArr.values()) {
      //   hardwareIDsArr.push(valueObj.hardwareID);
      // }

      // const threadLimit = parseInt((getCookie({ key: 'recruitmentThreadLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT), 10);
      // const commentLimit = parseInt((getCookie({ key: 'recruitmentCommentLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT), 10);
      // const replyLimit = parseInt((getCookie({ key: 'recruitmentReplyLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT), 10);




      // ---------------------------------------------
      //   Validations
      // ---------------------------------------------

      if (

        validationGamesName({ value: name }).error

      ) {

        throw new CustomError({ errorsArr: [{ code: 'PmDcQerd2', messageID: 'uwHIKBy7c' }] });

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
      //   FormData
      // ---------------------------------------------

      const formDataObj = {

        language,
        country,
        name,
        subtitle,
        sortKeyword,
        urlID,
        twitterHashtagsArr,
        searchKeywordsArr,
        genreArr: [],
        hardwareArr: [],
        linkArr,

      };

      if (genre1) {
        formDataObj.genreArr.push(genre1);
      }

      if (genre2) {
        formDataObj.genreArr.push(genre2);
      }

      if (genre3) {
        formDataObj.genreArr.push(genre3);
      }


      let hardwareObj = {};

      if (hardwares1Arr.length > 0) {

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares1Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate1,
          playersMin: playersMin1,
          playersMax: playersMax1,
          publishersArr: publishers1Arr,
          developersArr: developers1Arr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (hardwares2Arr.length > 0) {

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares2Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate2,
          playersMin: playersMin2,
          playersMax: playersMax2,
          publishersArr: publishers2Arr,
          developersArr: developers2Arr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (hardwares3Arr.length > 0) {

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares3Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate3,
          playersMin: playersMin3,
          playersMax: playersMax3,
          publishersArr: publishers3Arr,
          developersArr: developers3Arr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (hardwares4Arr.length > 0) {

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares4Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate4,
          playersMin: playersMin4,
          playersMax: playersMax4,
          publishersArr: publishers4Arr,
          developersArr: developers4Arr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (hardwares5Arr.length > 0) {

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares5Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate5,
          playersMin: playersMin5,
          playersMax: playersMax5,
          publishersArr: publishers5Arr,
          developersArr: developers5Arr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (hardwares6Arr.length > 0) {

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares6Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate6,
          playersMin: playersMin6,
          playersMax: playersMax6,
          publishersArr: publishers6Arr,
          developersArr: developers6Arr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (hardwares7Arr.length > 0) {

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares7Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate7,
          playersMin: playersMin7,
          playersMax: playersMax7,
          publishersArr: publishers7Arr,
          developersArr: developers7Arr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (hardwares8Arr.length > 0) {

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares8Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate8,
          playersMin: playersMin8,
          playersMax: playersMax8,
          publishersArr: publishers8Arr,
          developersArr: developers8Arr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (hardwares9Arr.length > 0) {

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares9Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate9,
          playersMin: playersMin9,
          playersMax: playersMax9,
          publishersArr: publishers9Arr,
          developersArr: developers9Arr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (hardwares10Arr.length > 0) {

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares10Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate10,
          playersMin: playersMin10,
          playersMax: playersMax10,
          publishersArr: publishers10Arr,
          developersArr: developers10Arr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (imagesAndVideosObj.arr.length !== 0) {
        formDataObj.imagesAndVideosObj = imagesAndVideosObj;
      }

      if (imagesAndVideosThumbnailObj.arr.length !== 0) {
        formDataObj.imagesAndVideosThumbnailObj = imagesAndVideosObj;
      }


      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------

      let resultObj = {};

      if (administrator) {

        resultObj = await fetchWrapper({

          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/games/upsert`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),

        });

      } else {

        resultObj = await fetchWrapper({

          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/games-temps/upsert`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),

        });

      }


      // ---------------------------------------------
      //   Error
      // ---------------------------------------------

      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }




      // ---------------------------------------------
      //   Reset Form
      // ---------------------------------------------

      setLanguage('ja');
      setCountry('JP');
      setName('');
      setSubtitle('');
      setSortKeyword('');
      setURLID('');
      setTwitterHashtagsArr([]);
      setSearchKeywordsArr([]);

      setGenre1('');
      setGenre2('');
      setGenre3('');

      setHardwares1Arr([]);
      setReleaseDate1('');
      setPlayersMin1(1);
      setPlayersMax1(1);
      setPublishers1Arr([]);
      setDevelopers1Arr([]);

      setHardwares2Arr([]);
      setReleaseDate2('');
      setPlayersMin2(1);
      setPlayersMax2(1);
      setPublishers2Arr([]);
      setDevelopers2Arr([]);

      setHardwares3Arr([]);
      setReleaseDate3('');
      setPlayersMin3(1);
      setPlayersMax3(1);
      setPublishers3Arr([]);
      setDevelopers3Arr([]);

      setHardwares4Arr([]);
      setReleaseDate4('');
      setPlayersMin4(1);
      setPlayersMax4(1);
      setPublishers4Arr([]);
      setDevelopers4Arr([]);

      setHardwares5Arr([]);
      setReleaseDate5('');
      setPlayersMin5(1);
      setPlayersMax5(1);
      setPublishers5Arr([]);
      setDevelopers5Arr([]);

      setHardwares6Arr([]);
      setReleaseDate6('');
      setPlayersMin6(1);
      setPlayersMax6(1);
      setPublishers6Arr([]);
      setDevelopers6Arr([]);

      setHardwares7Arr([]);
      setReleaseDate7('');
      setPlayersMin7(1);
      setPlayersMax7(1);
      setPublishers7Arr([]);
      setDevelopers7Arr([]);

      setHardwares8Arr([]);
      setReleaseDate8('');
      setPlayersMin8(1);
      setPlayersMax8(1);
      setPublishers8Arr([]);
      setDevelopers8Arr([]);

      setHardwares9Arr([]);
      setReleaseDate9('');
      setPlayersMin9(1);
      setPlayersMax9(1);
      setPublishers9Arr([]);
      setDevelopers9Arr([]);

      setHardwares10Arr([]);
      setReleaseDate10('');
      setPlayersMin10(1);
      setPlayersMax10(1);
      setPublishers10Arr([]);
      setDevelopers10Arr([]);

      setLinkArr([{

        _id: '',
        type: 'Official',
        label: '',
        url: '',

      }]);

      setImagesAndVideosObj({

        _id: '',
        createdDate: '',
        updatedDate: '',
        users_id: '',
        type: 'temp',
        arr: [],

      });

      setImagesAndVideosThumbnailObj({

        _id: '',
        createdDate: '',
        updatedDate: '',
        users_id: '',
        type: 'temp',
        arr: [],

      });




      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------

      setButtonDisabled(false);


      // --------------------------------------------------
      //   Snackbar: Success
      // --------------------------------------------------

      showSnackbar({

        enqueueSnackbar,
        intl,
        arr: [
          {
            variant: 'success',
            messageID: 'Kail6oUOo',
          },
        ]

      });




      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------

      // console.log(`
      //   ----------------------------------------\n
      //   app/gc/list/v2/form.js / handleSubmit
      // `);

      // console.log(`
      //   ----- formDataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(formDataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);

      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);

      // console.log(chalk`
      //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
      //   newRecruitmentThreads_id: {green ${newRecruitmentThreads_id}}
      // `);


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
      //   Scroll
      // ---------------------------------------------

      handleScrollTo({

        to: 'GcRegister',
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,

      });


      // ---------------------------------------------
      //   Loading Close
      // ---------------------------------------------

      handleLoadingClose();


    }


  };




  // --------------------------------------------------
  //   Property
  // --------------------------------------------------

  const limitImagesAndVideos = parseInt(process.env.NEXT_PUBLIC_GAMES_IMAGES_AND_VIDEOS_LIMIT, 10);
  const limitImagesAndVideosThumbnail = parseInt(process.env.NEXT_PUBLIC_GAMES_IMAGES_AND_VIDEOS_THUMBNAIL_LIMIT, 10);


  // --------------------------------------------------
  //   Validations
  // --------------------------------------------------

  const validationGamesNameObj = validationGamesName({ value: name });
  const validationGamesSubtitleObj = validationGamesSubtitle({ value: subtitle });
  const validationGamesSortKeywordObj = validationGamesSortKeyword({ value: sortKeyword });
  const validationGamesURLIDObj = validationGamesURLID({ value: urlID });


  // --------------------------------------------------
  //   Element Name
  // --------------------------------------------------

  const elementName = 'gcRegisterForm';




  // --------------------------------------------------
  //   Component - gameGenres
  // --------------------------------------------------

  const componentsGameGenreMenuItemsArr = [];

  for (const [index, valueObj] of gameGenresArr.entries()) {


    // --------------------------------------------------
    //   genreID
    // --------------------------------------------------

    const genreID = lodashGet(valueObj, ['genreID'], '');


    // --------------------------------------------------
    //   push
    // --------------------------------------------------

    componentsGameGenreMenuItemsArr.push(
      <MenuItem
        key={index}
        value={genreID}
      >
        {valueObj.name}
      </MenuItem>
    );


  }




  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------

  // console.log(`
  //   ----------------------------------------\n
  //   app/gc/list/v2/form.js
  // `);

  // console.log(chalk`
  //   gameCommunities_id: {green ${gameCommunities_id}}
  //   games_id: {green ${games_id}}
  // `);

  // console.log(`
  //   ----- validationRecruitmentThreadsID1Obj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(validationRecruitmentThreadsID1Obj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);




  // --------------------------------------------------
  //   Return
  // --------------------------------------------------

  return (
    <Element
      name={elementName}
    >


      {/* Form */}
      <form
        name={elementName}
        onSubmit={(eventObj) => handleSubmit({
          eventObj,
        })}
      >


        {/* Heading & Explanation */}
        {games_id
          ?
            <React.Fragment>

              <h3
                css={css`
                  font-weight: bold;
                  margin: 0 0 12px 0;
                `}
              >
                ゲーム編集フォーム
              </h3>sudo service docker start


              <p
                css={css`
                  margin: 0 0 14px 0;
                `}
              >
                登録済みのゲームのデータを利用して、さらに情報を追加できます。
              </p>

            </React.Fragment>
          :
            <React.Fragment>

              <p
                css={css`
                  margin: 0 0 14px 0;
                `}
              >
                ゲームを新しく登録する場合、こちらのフォームを利用してください。すべての情報を正確に入力する必要はありません。わからない欄は未入力にしておいてください。
              </p>



            </React.Fragment>
        }

        <p
          css={css`
            margin: 0 0 14px 0;
          `}
        >
          こちらのフォームに入力してもらったデータは仮登録という形で保存されます。Game Users運営の確認後に正式にサイトに反映されますので、空欄が多かったり、多少間違っている情報があっても問題はありません。
        </p>

        <p
          css={css`
            margin: 0 0 14px 0;
          `}
        >
          登録は新規にすべての情報を入力するか、既存の情報をベースにして追記していくかになります。ゲームの一覧をクリック（タップ）すると、登録済みの情報に追記することができるようになります。追記した場合、同じゲームが一覧に複数表示されることになりますが、これは元々の仕様なので気にしないでください。
        </p>

        <p
          css={css`
            color: red;
            margin: 0 0 14px 0;
          `}
        >
          ※ フォームを送信するにはログインする必要があります。
        </p>




        {/* Category */}
        <div css={cssBox}>

          <h3
            css={css`
              font-weight: bold;
              margin: 0 0 2px 0;
            `}
          >
            言語・国
          </h3>

          <p
            css={css`
              margin: 0 0 24px 0;
            `}
          >
            言語と国を選んでください。現在、選べるのは日本語・日本のみです。
          </p>


          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
            `}
          >

            <div
              css={css`
                margin: 0 24px 12px 0;
              `}
            >
              <FormControl>

                <InputLabel shrink id="categoryLabel">言語</InputLabel>

                <Select
                  css={css`
                    && {
                      width: 200px;
                    }
                  `}
                  labelId="言語"
                  value={language}
                  onChange={(eventObj) => setLanguage(eventObj.target.value)}
                  displayEmpty
                >
                  <MenuItem value="ja">日本語</MenuItem>
                </Select>

              </FormControl>
            </div>



            <div
              css={css`
                margin: 0 0 12px 0;
              `}
            >
              <FormControl>

                <InputLabel shrink id="categoryLabel">国</InputLabel>

                <Select
                  css={css`
                    && {
                      width: 200px;
                    }
                  `}
                  labelId="国"
                  value={country}
                  onChange={(eventObj) => setCountry(eventObj.target.value)}
                  displayEmpty
                >
                  <MenuItem value="JP">日本</MenuItem>
                </Select>

              </FormControl>
            </div>

          </div>


        </div>




        {/* Name */}
        <div css={cssBox}>


          <h3
            css={css`
              font-weight: bold;
              margin: 0 0 2px 0;
            `}
          >
            ゲーム名
          </h3>

          <p
            css={css`
              margin: 0 0 12px 0;
            `}
          >
            ゲーム名を入力してください。ゲーム名とサブタイトルは入力するフォームを分けてください。
          </p>


          {/* Name */}
          <TextField
            css={css`
              && {
                width: 100%;
                max-width: 500px;
                ${games_id && `margin-top: 4px;`}
              }
            `}
            label="ゲーム名"
            value={validationGamesNameObj.value}
            onChange={(eventObj) => setName(eventObj.target.value)}
            error={validationGamesNameObj.error}
            helperText={intl.formatMessage({ id: validationGamesNameObj.messageID }, { numberOfCharacters: validationGamesNameObj.numberOfCharacters })}
            margin="normal"
            inputProps={{
              maxLength: 100,
            }}
          />




          {/* 並び替え用のカタカナ表記 */}
          <TextField
            css={css`
              && {
                width: 100%;
                max-width: 500px;
                ${games_id && `margin-top: 4px;`}
              }
            `}
            label="ゲーム名（カタカナ）"
            value={validationGamesSortKeywordObj.value}
            onChange={(eventObj) => setSortKeyword(eventObj.target.value)}
            error={validationGamesSortKeywordObj.error}
            helperText={intl.formatMessage({ id: validationGamesSortKeywordObj.messageID }, { numberOfCharacters: validationGamesSortKeywordObj.numberOfCharacters })}
            margin="normal"
            inputProps={{
              maxLength: 100,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={(eventObj) => setAnchorElSortKeyword(eventObj.currentTarget)}
                  >
                    <IconHelpOutline />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />


          {/* ？アイコンを押すと表示される解説文 */}
          <Popover
            id={Boolean(anchorElSortKeyword) ? 'popoverSortKeyword' : undefined}
            open={Boolean(anchorElSortKeyword)}
            anchorEl={anchorElSortKeyword}
            onClose={() => setAnchorElSortKeyword(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >

            <Paper
              css={css`
                max-width: 400px;
                padding: 0 16px 8px 16px;
              `}
            >

              <div
                css={css`
                  margin: 12px 0 0 0;
                `}
              >

                <p
                  css={css`
                    margin: 0 0 14px 0;
                  `}
                >
                  ゲーム名をカタカナで入力してください。スペースはすべて削除し、数字は半角数字に変換してください。サブタイトルは不要です。五十音順で並べ替える際に利用します。
                </p>

                <p>
                  例）ドラゴンクエストIII そして伝説へ…　→ ドラゴンクエスト3
                </p>

              </div>

            </Paper>

          </Popover>




          {/* Sub Title */}
          <TextField
            css={css`
              && {
                width: 100%;
                max-width: 500px;
                ${games_id && `margin-top: 4px;`}
              }
            `}
            label="サブタイトル"
            value={validationGamesSubtitleObj.value}
            onChange={(eventObj) => setSubtitle(eventObj.target.value)}
            error={validationGamesSubtitleObj.error}
            helperText={intl.formatMessage({ id: validationGamesSubtitleObj.messageID }, { numberOfCharacters: validationGamesSubtitleObj.numberOfCharacters })}
            margin="normal"
            inputProps={{
              maxLength: 100,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={(eventObj) => setAnchorElSubtitle(eventObj.currentTarget)}
                  >
                    <IconHelpOutline />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />


          {/* ？アイコンを押すと表示される解説文 */}
          <Popover
            id={Boolean(anchorElSubtitle) ? 'popoverSubtitle' : undefined}
            open={Boolean(anchorElSubtitle)}
            anchorEl={anchorElSubtitle}
            onClose={() => setAnchorElSubtitle(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >

            <Paper
              css={css`
                max-width: 400px;
                padding: 0 16px 8px 16px;
              `}
            >

              <div
                css={css`
                  margin: 12px 0 0 0;
                `}
              >

                <p
                  css={css`
                    margin: 0 0 14px 0;
                  `}
                >
                  サブタイトルがある場合はこちらに入力してください。
                </p>

                <p>
                  例）ドラゴンクエストIII そして伝説へ…　→ そして伝説へ…
                </p>

              </div>

            </Paper>

          </Popover>


        </div>




        {/* URL */}
        <div css={cssBox}>


          <h3
            css={css`
              font-weight: bold;
              margin: 0 0 2px 0;
            `}
          >
            URL
          </h3>

          <p
            css={css`
              margin: 0 0 12px 0;
            `}
          >
            ゲームコミュニティのURLを入力してください。次の形式のURLになります。https://gameusers.org/gc/<span css={css`color: red;`}>***</span>　この赤文字部分です。
          </p>

          <p
            css={css`
              margin: 0 0 12px 0;
            `}
          >
            半角英数字で、ゲーム名を -（ハイフン）で繋げます。
          </p>

          <p
            css={css`
              margin: 0 0 12px 0;
            `}
          >
            例）Dead by Daylight → Dead-by-Daylight
          </p>


          {/* urlID */}
          <TextField
            css={css`
              && {
                width: 100%;
                max-width: 500px;
                ${games_id && `margin-top: 4px;`}
              }
            `}
            label="URL"
            value={validationGamesURLIDObj.value}
            onChange={(eventObj) => setURLID(eventObj.target.value)}
            error={validationGamesURLIDObj.error}
            helperText={intl.formatMessage({ id: validationGamesURLIDObj.messageID }, { numberOfCharacters: validationGamesURLIDObj.numberOfCharacters })}
            margin="normal"
            inputProps={{
              maxLength: 100,
            }}
          />


        </div>




        {/* Search Keywords */}
        <div css={cssBox}>

          <FormSearchKeyword
            arr={searchKeywordsArr}
            setArr={setSearchKeywordsArr}
          />

        </div>




        {/* Twitter Hashtags */}
        <div css={cssBox}>

          <FormTwitter
            arr={twitterHashtagsArr}
            setArr={setTwitterHashtagsArr}
          />

        </div>




        {/* Category */}
        <div css={cssBox}>

          <h3
            css={css`
              font-weight: bold;
              margin: 0 0 2px 0;
            `}
          >
            ジャンル
          </h3>

          <p
            css={css`
              margin: 0 0 12px 0;
            `}
          >
            当てはまるジャンルを選んでください。複数ジャンルに当てはまる場合は複数選んでください。
          </p>


          <FormControl
            css={css`
              && {
                margin: 16px 16px 0 0;
              }
            `}
          >

            <InputLabel shrink id="genreLabel">ジャンル1</InputLabel>

            <Select
              css={css`
                && {
                  width: 200px;
                }
              `}
              labelId="genreLabel"
              value={genre1}
              onChange={(eventObj) => setGenre1(eventObj.target.value)}
              displayEmpty
            >
              <MenuItem value="">&nbsp;</MenuItem>
              {componentsGameGenreMenuItemsArr}
            </Select>

          </FormControl>


          <FormControl
            css={css`
              && {
                margin: 16px 16px 0 0;
              }
            `}
          >

            <InputLabel shrink id="genreLabel">ジャンル2</InputLabel>

            <Select
              css={css`
                && {
                  width: 200px;
                }
              `}
              labelId="genreLabel"
              value={genre2}
              onChange={(eventObj) => setGenre2(eventObj.target.value)}
              displayEmpty
            >
              <MenuItem value="">&nbsp;</MenuItem>
              {componentsGameGenreMenuItemsArr}
            </Select>

          </FormControl>


          <FormControl
            css={css`
              && {
                margin: 16px 16px 0 0;
              }
            `}
          >

            <InputLabel shrink id="genreLabel">ジャンル3</InputLabel>

            <Select
              css={css`
                && {
                  width: 200px;
                }
              `}
              labelId="genreLabel"
              value={genre3}
              onChange={(eventObj) => setGenre3(eventObj.target.value)}
              displayEmpty
            >
              <MenuItem value="">&nbsp;</MenuItem>
              {componentsGameGenreMenuItemsArr}
            </Select>

          </FormControl>

        </div>




        {/* Hardware */}
        <div css={cssBox}>

          <FormHardware
            hardwaresCount={hardwaresCount}

            hardwares1Arr={hardwares1Arr}
            setHardwares1Arr={setHardwares1Arr}
            releaseDate1={releaseDate1}
            setReleaseDate1={setReleaseDate1}
            playersMin1={playersMin1}
            setPlayersMin1={setPlayersMin1}
            playersMax1={playersMax1}
            setPlayersMax1={setPlayersMax1}
            publishers1Arr={publishers1Arr}
            setPublishers1Arr={setPublishers1Arr}
            developers1Arr={developers1Arr}
            setDevelopers1Arr={setDevelopers1Arr}

            hardwares2Arr={hardwares2Arr}
            setHardwares2Arr={setHardwares2Arr}
            releaseDate2={releaseDate2}
            setReleaseDate2={setReleaseDate2}
            playersMin2={playersMin2}
            setPlayersMin2={setPlayersMin2}
            playersMax2={playersMax2}
            setPlayersMax2={setPlayersMax2}
            publishers2Arr={publishers2Arr}
            setPublishers2Arr={setPublishers2Arr}
            developers2Arr={developers2Arr}
            setDevelopers2Arr={setDevelopers2Arr}

            hardwares3Arr={hardwares3Arr}
            setHardwares3Arr={setHardwares3Arr}
            releaseDate3={releaseDate3}
            setReleaseDate3={setReleaseDate3}
            playersMin3={playersMin3}
            setPlayersMin3={setPlayersMin3}
            playersMax3={playersMax3}
            setPlayersMax3={setPlayersMax3}
            publishers3Arr={publishers3Arr}
            setPublishers3Arr={setPublishers3Arr}
            developers3Arr={developers3Arr}
            setDevelopers3Arr={setDevelopers3Arr}

            hardwares4Arr={hardwares4Arr}
            setHardwares4Arr={setHardwares4Arr}
            releaseDate4={releaseDate4}
            setReleaseDate4={setReleaseDate4}
            playersMin4={playersMin4}
            setPlayersMin4={setPlayersMin4}
            playersMax4={playersMax4}
            setPlayersMax4={setPlayersMax4}
            publishers4Arr={publishers4Arr}
            setPublishers4Arr={setPublishers4Arr}
            developers4Arr={developers4Arr}
            setDevelopers4Arr={setDevelopers4Arr}

            hardwares5Arr={hardwares5Arr}
            setHardwares5Arr={setHardwares5Arr}
            releaseDate5={releaseDate5}
            setReleaseDate5={setReleaseDate5}
            playersMin5={playersMin5}
            setPlayersMin5={setPlayersMin5}
            playersMax5={playersMax5}
            setPlayersMax5={setPlayersMax5}
            publishers5Arr={publishers5Arr}
            setPublishers5Arr={setPublishers5Arr}
            developers5Arr={developers5Arr}
            setDevelopers5Arr={setDevelopers5Arr}

            hardwares6Arr={hardwares6Arr}
            setHardwares6Arr={setHardwares6Arr}
            releaseDate6={releaseDate6}
            setReleaseDate6={setReleaseDate6}
            playersMin6={playersMin6}
            setPlayersMin6={setPlayersMin6}
            playersMax6={playersMax6}
            setPlayersMax6={setPlayersMax6}
            publishers6Arr={publishers6Arr}
            setPublishers6Arr={setPublishers6Arr}
            developers6Arr={developers6Arr}
            setDevelopers6Arr={setDevelopers6Arr}

            hardwares7Arr={hardwares7Arr}
            setHardwares7Arr={setHardwares7Arr}
            releaseDate7={releaseDate7}
            setReleaseDate7={setReleaseDate7}
            playersMin7={playersMin7}
            setPlayersMin7={setPlayersMin7}
            playersMax7={playersMax7}
            setPlayersMax7={setPlayersMax7}
            publishers7Arr={publishers7Arr}
            setPublishers7Arr={setPublishers7Arr}
            developers7Arr={developers7Arr}
            setDevelopers7Arr={setDevelopers7Arr}

            hardwares8Arr={hardwares8Arr}
            setHardwares8Arr={setHardwares8Arr}
            releaseDate8={releaseDate8}
            setReleaseDate8={setReleaseDate8}
            playersMin8={playersMin8}
            setPlayersMin8={setPlayersMin8}
            playersMax8={playersMax8}
            setPlayersMax8={setPlayersMax8}
            publishers8Arr={publishers8Arr}
            setPublishers8Arr={setPublishers8Arr}
            developers8Arr={developers8Arr}
            setDevelopers8Arr={setDevelopers8Arr}

            hardwares9Arr={hardwares9Arr}
            setHardwares9Arr={setHardwares9Arr}
            releaseDate9={releaseDate9}
            setReleaseDate9={setReleaseDate9}
            playersMin9={playersMin9}
            setPlayersMin9={setPlayersMin9}
            playersMax9={playersMax9}
            setPlayersMax9={setPlayersMax9}
            publishers9Arr={publishers9Arr}
            setPublishers9Arr={setPublishers9Arr}
            developers9Arr={developers9Arr}
            setDevelopers9Arr={setDevelopers9Arr}

            hardwares10Arr={hardwares10Arr}
            setHardwares10Arr={setHardwares10Arr}
            releaseDate10={releaseDate10}
            setReleaseDate10={setReleaseDate10}
            playersMin10={playersMin10}
            setPlayersMin10={setPlayersMin10}
            playersMax10={playersMax10}
            setPlayersMax10={setPlayersMax10}
            publishers10Arr={publishers10Arr}
            setPublishers10Arr={setPublishers10Arr}
            developers10Arr={developers10Arr}
            setDevelopers10Arr={setDevelopers10Arr}
          />

        </div>




        {/* Form Images & Videos */}
        {administrator &&
          <React.Fragment>

            {/* Main */}
            <div css={cssBox}>

              <h3
                css={css`
                  margin: 0 0 6px 0;
                `}
              >
                メイン画像
              </h3>

              <p
                css={css`
                  margin: 0 0 12px 0;
                `}
              >
                ゲームコミュニティのトップに表示される大きな画像です。横長の画像（推奨サイズ 1920 x ---）をアップロードしてください。
              </p>


              <FormImageAndVideo
                showVideoButton={false}
                descriptionImage="横長の大きな画像をアップロードしてください。"
                showImageCaption={false}
                limit={limitImagesAndVideos}
                imagesAndVideosObj={imagesAndVideosObj}
                setImagesAndVideosObj={setImagesAndVideosObj}
              />

            </div>




            {/* Thumbnail */}
            <div css={cssBox}>

              <h3
                css={css`
                  margin: 0 0 6px 0;
                `}
              >
                サムネイル画像
              </h3>

              <p
                css={css`
                  margin: 0 0 12px 0;
                `}
              >
                ゲームコミュニティの一覧に表示される小さな画像です。正方形の画像（推奨サイズ 256 x 256 ピクセル以上）をアップロードしてください。
              </p>


              <FormImageAndVideo
                showVideoButton={false}
                descriptionImage="サムネイル画像をアップロードできます。"
                showImageCaption={false}
                limit={limitImagesAndVideosThumbnail}
                imagesAndVideosObj={imagesAndVideosThumbnailObj}
                setImagesAndVideosObj={setImagesAndVideosThumbnailObj}
              />

            </div>

          </React.Fragment>
        }




        {/* Link */}
        <div css={cssBox}>

          <FormLink
            linkArr={linkArr}
            setLinkArr={setLinkArr}
          />

        </div>




        {/* Buttons */}
        <div
          css={css`
            display: flex;
            flex-flow: row nowrap;
            border-top: 1px dashed #848484;
            margin: 24px 0 0 0;
            padding: 36px 0 0 0;
          `}
        >


          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={buttonDisabled}
          >
            {games_id ? '登録する' : '仮登録する'}
          </Button>


          {/* Reset Form */}
          <div
            css={css`
              margin: 0 0 0 auto;
            `}
          >
            <Button
              variant="contained"
              color="secondary"
              disabled={buttonDisabled}
              onClick={() => handleDialogOpen({
                title: 'フォームリセット',
                description: 'フォームをリセットしますか？',
                handle: handleResetForm,
                argumentsObj: {},
              })}
            >
              リセット
            </Button>
          </div>


        </div>


      </form>


    </Element>
  );


};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
