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
import TextareaAutosize from 'react-autosize-textarea';

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
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { CustomError } from 'app/@modules/error/custom.js';
import { getCookie } from 'app/@modules/cookie.js';
import { showSnackbar } from 'app/@modules/snackbar.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationBoolean } from 'app/@validations/boolean.js';
import { validationHandleName } from 'app/@validations/name.js';

import { validationGamesName, validationGamesSubtitle, validationGamesSortKeyword } from 'app/@database/games/validations/name.js';
import { validationGamesURLID } from 'app/@database/games/validations/url.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import FormImageAndVideo from 'app/common/image-and-video/v2/form.js';
import FormHardwares from 'app/common/hardware/v2/form.js';

import FormTwitter from 'app/gc/list/v2/form/twitter.js';
import FormSearchKeyword from 'app/gc/list/v2/form/search-keyword.js';
import FormHardware from 'app/gc/list/v2/form/hardware.js';
import FormLink from 'app/gc/list/v2/form/link.js';




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
    setShowForm,

    gameGenresArr,

  } = props;




  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------

  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [language, setLanguage] = useState('ja');
  const [country, setCountry] = useState('JP');
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [sortKeyword, setSortKeyword] = useState('');
  const [urlID, setURLID] = useState('');
  const [twitterHashtagsArr, setTwitterHashtagsArr] = useState([]);
  const [searchKeywordsArr, setSearchKeywordsArr] = useState([]);

  const [genre1, setGenre1] = useState('');
  const [genre2, setGenre2] = useState('');
  const [genre3, setGenre3] = useState('');

  const [hardwares1Arr, setHardwares1Arr] = useState([]);
  const [releaseDate1, setReleaseDate1] = useState('');
  const [playersMin1, setPlayersMin1] = useState(1);
  const [playersMax1, setPlayersMax1] = useState(1);
  const [publisherID1, setPublisherID1] = useState('');
  const [developerID1, setDeveloperID1] = useState('');

  const [hardwaresArr, setHardwaresArr] = useState([
    {
      hardwareID: '',
      releaseDate: '',
      playersMin: 1,
      playersMax: 1,
      publisherID: '',
      developerID: '',
    }
  ]);

  const [imagesAndVideosObj, setImagesAndVideosObj] = useState({

    _id: '',
    createdDate: '',
    updatedDate: '',
    users_id: '',
    type: 'gc',
    arr: [],

  });

  const [imagesAndVideosThumbnailObj, setImagesAndVideosThumbnailObj] = useState({

    _id: '',
    createdDate: '',
    updatedDate: '',
    users_id: '',
    type: 'gc',
    arr: [],

  });

  const [linkArr, setLinkArr] = useState([{

    _id: '',
    type: 'Official',
    label: '',
    url: '',

  }]);

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
   * 募集を投稿する
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




      // // ---------------------------------------------
      // //   Validations
      // // ---------------------------------------------

      // if (

      //   validationRecruitmentThreadsCategory({ value: category }).error ||

      //   validationRecruitmentThreadsTitle({ value: title }).error ||
      //   validationHandleName({ value: name }).error ||
      //   validationRecruitmentThreadsComment({ value: comment }).error ||

      //   validationRecruitmentThreadsPlatform({ value: platform1 }).error ||
      //   validationRecruitmentThreadsPlatform({ value: platform2 }).error ||
      //   validationRecruitmentThreadsPlatform({ value: platform3 }).error ||

      //   validationRecruitmentThreadsID({ value: id1 }).error ||
      //   validationRecruitmentThreadsID({ value: id2 }).error ||
      //   validationRecruitmentThreadsID({ value: id3 }).error ||

      //   validationRecruitmentThreadsInformationTitle({ value: informationTitle1 }).error ||
      //   validationRecruitmentThreadsInformationTitle({ value: informationTitle2 }).error ||
      //   validationRecruitmentThreadsInformationTitle({ value: informationTitle3 }).error ||
      //   validationRecruitmentThreadsInformationTitle({ value: informationTitle4 }).error ||
      //   validationRecruitmentThreadsInformationTitle({ value: informationTitle5 }).error ||

      //   validationRecruitmentThreadsInformation({ value: information1 }).error ||
      //   validationRecruitmentThreadsInformation({ value: information2 }).error ||
      //   validationRecruitmentThreadsInformation({ value: information3 }).error ||
      //   validationRecruitmentThreadsInformation({ value: information4 }).error ||
      //   validationRecruitmentThreadsInformation({ value: information5 }).error ||

      //   validationRecruitmentThreadsPublicSetting({ value: publicSetting }).error ||

      //   validationRecruitmentThreadsDeadlineDate({ value: deadlineDate }).error ||

      //   validationBoolean({ value: webPushAvailable }).error

      // ) {

      //   throw new CustomError({ errorsArr: [{ code: 'S0JRF6V5l', messageID: 'uwHIKBy7c' }] });

      // }




      // // ---------------------------------------------
      // //   Loading Open
      // // ---------------------------------------------

      // handleLoadingOpen({});


      // // ---------------------------------------------
      // //   Button Disable
      // // ---------------------------------------------

      // setButtonDisabled(true);




      // // ---------------------------------------------
      // //   FormData
      // // ---------------------------------------------

      // const formDataObj = {

      //   gameCommunities_id,
      //   recruitmentThreads_id,
      //   hardwareIDsArr,
      //   category,
      //   title,
      //   name,
      //   comment,
      //   idsArr,
      //   platform1,
      //   platform2,
      //   platform3,
      //   id1,
      //   id2,
      //   id3,
      //   informationTitle1,
      //   informationTitle2,
      //   informationTitle3,
      //   informationTitle4,
      //   informationTitle5,
      //   information1,
      //   information2,
      //   information3,
      //   information4,
      //   information5,
      //   publicSetting,
      //   deadlineDate,
      //   webPushAvailable,
      //   threadLimit,
      //   commentLimit,
      //   replyLimit,

      // };

      // if (Object.keys(imagesAndVideosObj).length !== 0) {
      //   formDataObj.imagesAndVideosObj = imagesAndVideosObj;
      // }

      // if (webPushAvailable && Object.keys(webPushSubscriptionObj).length !== 0) {
      //   formDataObj.webPushSubscriptionObj = webPushSubscriptionObj;
      // }


      // // ---------------------------------------------
      // //   Fetch
      // // ---------------------------------------------

      // const resultObj = await fetchWrapper({

      //   urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/recruitment-threads/upsert`,
      //   methodType: 'POST',
      //   formData: JSON.stringify(formDataObj),

      // });


      // // ---------------------------------------------
      // //   Error
      // // ---------------------------------------------

      // if ('errorsArr' in resultObj) {
      //   throw new CustomError({ errorsArr: resultObj.errorsArr });
      // }




      // // ---------------------------------------------
      // //   Reset Form
      // // ---------------------------------------------

      // setHardwaresArr([]);
      // setCategory('');
      // setTitle('');
      // setName('');
      // setComment('');
      // setImagesAndVideosObj({

      //   _id: '',
      //   createdDate: '',
      //   updatedDate: '',
      //   users_id: '',
      //   type: 'recruitment',
      //   arr: [],

      // });

      // setIDsArr([]);
      // setPlatform1('Other');
      // setPlatform2('Other');
      // setPlatform3('Other');
      // setID1('');
      // setID2('');
      // setID3('');
      // setInformationTitle1('');
      // setInformationTitle2('');
      // setInformationTitle3('');
      // setInformationTitle4('');
      // setInformationTitle5('');
      // setInformation1('');
      // setInformation2('');
      // setInformation3('');
      // setInformation4('');
      // setInformation5('');
      // setPublicSetting(1);
      // setDeadlineDate('');
      // setWebPushAvailable(false);
      // setWebPushSubscriptionObj({});




      // // ---------------------------------------------
      // //   Button Enable
      // // ---------------------------------------------

      // setButtonDisabled(false);


      // // --------------------------------------------------
      // //   gameCommunityObj
      // // --------------------------------------------------

      // setGameCommunityObj(lodashGet(resultObj, ['data', 'gameCommunityObj'], {}));


      // // ---------------------------------------------
      // //   forumThreadsObj
      // // ---------------------------------------------

      // setRecruitmentThreadsObj(lodashGet(resultObj, ['data', 'recruitmentThreadsObj'], {}));


      // // ---------------------------------------------
      // //   forumCommentsObj
      // // ---------------------------------------------

      // setRecruitmentCommentsObj(lodashGet(resultObj, ['data', 'recruitmentCommentsObj'], {}));


      // // ---------------------------------------------
      // //   forumRepliesObj
      // // ---------------------------------------------

      // setRecruitmentRepliesObj(lodashGet(resultObj, ['data', 'recruitmentRepliesObj'], {}));


      // // ---------------------------------------------
      // //   新規投稿時の recruitmentThreads_id
      // // ---------------------------------------------

      // newRecruitmentThreads_id = lodashGet(resultObj, ['data', 'recruitmentThreadsObj', 'page1Obj', 'arr', 0], '');




      // // --------------------------------------------------
      // //   Snackbar: Success
      // // --------------------------------------------------

      // const experienceObj = lodashGet(resultObj, ['data', 'experienceObj'], {});

      // showSnackbar({

      //   enqueueSnackbar,
      //   intl,
      //   experienceObj,
      //   arr: [
      //     {
      //       variant: 'success',
      //       messageID: recruitmentThreads_id ? 'xM5NqhTq5' : 'B9Goe5scP',
      //     },
      //   ]

      // });




      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------

      console.log(`
        ----------------------------------------\n
        app/gc/list/v2/form.js / handleSubmit
      `);

      console.log(`
        ----- hardwaresArr -----\n
        ${util.inspect(JSON.parse(JSON.stringify(hardwaresArr)), { colors: true, depth: null })}\n
        --------------------\n
      `);

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
      //   Hide Form
      // ---------------------------------------------

      // if (recruitmentThreads_id) {
      //   setShowForm(false);
      // }


      // // ---------------------------------------------
      // //   Scroll
      // // ---------------------------------------------

      // handleScrollTo({

      //   to: recruitmentThreads_id || newRecruitmentThreads_id || 'recruitmentThreads',
      //   duration: 0,
      //   delay: 0,
      //   smooth: 'easeInOutQuart',
      //   offset: -50,

      // });


      // // ---------------------------------------------
      // //   Loading Close
      // // ---------------------------------------------

      // handleLoadingClose();


    }


  };




  /**
   * フォームを閉じる
   */
  const handleClose = async () => {


    // ---------------------------------------------
    //   閉じる
    // ---------------------------------------------

    setShowForm(false);


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


  };




  // --------------------------------------------------
  //   Property
  // --------------------------------------------------

  // const limitHardwares = parseInt(process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_HARDWARES_LIMIT, 10);
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

  const elementName = games_id ? `${games_id}-editForm` : 'gamesRegisterForm';




  // --------------------------------------------------
  //   Component - gameGenres
  // --------------------------------------------------

  const componentsGameGenreMenuItemsArr = [];

  for (const [index, valueObj] of gameGenresArr.entries()) {


    // --------------------------------------------------
    //   dataObj
    // --------------------------------------------------

    // const dataObj = lodashGet(obj, ['dataObj', gameCommunities_id], {});


    // --------------------------------------------------
    //   push
    // --------------------------------------------------

    componentsGameGenreMenuItemsArr.push(
      <MenuItem
        key={index}
        value={valueObj.genreID}
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
              </h3>


              <p
                css={css`
                  margin: 0 0 14px 0;
                `}
              >
                登録済みのゲームを編集できます。
              </p>

            </React.Fragment>
          :
            <p
              css={css`
                margin: 0 0 14px 0;
              `}
            >
              ゲームを新しく登録する場合、こちらのフォームを利用してください。すべての情報を正確に入力する必要はありません。わからない欄は未入力にするか、適当な文字列を入力してもらえるとありがたいです。
            </p>
        }




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
            半角英数字で、ゲーム名を -（ハイフン）で繋げます。この欄は難しいかもしれないので、わからない場合は適当な文字を入力しておいてください。
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
            hardwares1Arr={hardwares1Arr}
            setHardwares1Arr={setHardwares1Arr}
            releaseDate1={releaseDate1}
            setReleaseDate1={setReleaseDate1}
            playersMin1={playersMin1}
            setPlayersMin1={setPlayersMin1}
            playersMax1={playersMax1}
            setPlayersMax1={setPlayersMax1}
            publisherID1={publisherID1}
            setPublisherID1={setPublisherID1}
            developerID1={developerID1}
            setDeveloperID1={setDeveloperID1}

            arr={hardwaresArr}
            setArr={setHardwaresArr}
            // limit={limitHardwares}
          />

        </div>




        {/* Form Images & Videos - Main */}
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




        {/* Form Images & Videos - Thumbnail */}
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




        {/* Link */}
        <div css={cssBox}>

        <FormLink
          linkArr={linkArr}
          setLinkArr={setLinkArr}
        />

        </div>






          {/* Form Images & Videos */}
          {/* <div
            css={css`
              margin: 12px 0 0 0;
            `}
          >

            <FormImageAndVideo
              // type="recruitment"
              descriptionImage="募集に表示する画像をアップロードできます。"
              descriptionVideo="募集に表示する動画を登録できます。"
              showImageCaption={true}
              limit={limitImagesAndVideos}
              imagesAndVideosObj={imagesAndVideosObj}
              setImagesAndVideosObj={setImagesAndVideosObj}
            />

          </div> */}


        {/* </div> */}



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
            {games_id ? '編集する' : '登録する'}
          </Button>




          {/* Close */}
          {games_id &&
            <div
              css={css`
                margin: 0 0 0 auto;
              `}
            >
              <Button
                variant="outlined"
                color="secondary"
                disabled={buttonDisabled}
                onClick={() => handleClose()}
              >
                閉じる
              </Button>
            </div>
          }

        </div>


      </form>


    </Element>
  );


};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
