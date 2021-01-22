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
import { useSnackbar } from 'notistack';
import { Element } from 'react-scroll';
import shortid from 'shortid';

/** @jsx jsx */
import { css, jsx } from '@emotion/react';


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

import { validationKeyword } from 'app/@validations/keyword.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import FormDeveloperPublisher from 'app/common/developer-publisher/v2/form.js';






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

  // const {

  //   gameGenresArr,

  // } = props;




  // --------------------------------------------------
  //   States
  // --------------------------------------------------

  const stateUser = ContainerStateUser.useContainer();
  const stateLayout = ContainerStateLayout.useContainer();

  const { loginUsersObj } = stateUser;

  const {

    handleLoadingOpen,
    handleLoadingClose,
    handleScrollTo,
    handleDialogOpen,

  } = stateLayout;


  const role = lodashGet(loginUsersObj, ['role'], '');
  const administrator = role === 'administrator' ? true : false;




  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------

  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [publishersArr, setPublishersArr] = useState([]);

  const [language, setLanguage] = useState('ja');
  const [country, setCountry] = useState('JP');
  const [developerPublisherID, setDeveloperPublisherID] = useState('');
  const [urlID, setUrlID] = useState('');
  const [name, setName] = useState('');

  // const limitDevPub = parseInt(process.env.NEXT_PUBLIC_GAMES_DEVELOPERS_PUBLISHERS_LIMIT, 10);
  

  useEffect(() => {


    // --------------------------------------------------
    //   Button Enable
    // --------------------------------------------------

    setButtonDisabled(false);


  }, []);




  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------

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




    try {


      // ---------------------------------------------
      //   Validations
      // ---------------------------------------------

      if (validationGamesName({ value: name }).error) {
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

        games_id,
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

        const publisherIDsArr = [];

        for (let valueObj of publishers1Arr.values()) {
          publisherIDsArr.push(valueObj.developerPublisherID);
        }

        const developerIDsArr = [];

        for (let valueObj of developers1Arr.values()) {
          developerIDsArr.push(valueObj.developerPublisherID);
        }

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares1Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate1,
          playersMin: playersMin1,
          playersMax: playersMax1,
          publisherIDsArr,
          developerIDsArr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (hardwares2Arr.length > 0) {

        const publisherIDsArr = [];

        for (let valueObj of publishers2Arr.values()) {
          publisherIDsArr.push(valueObj.developerPublisherID);
        }

        const developerIDsArr = [];

        for (let valueObj of developers2Arr.values()) {
          developerIDsArr.push(valueObj.developerPublisherID);
        }

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares2Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate2,
          playersMin: playersMin2,
          playersMax: playersMax2,
          publisherIDsArr,
          developerIDsArr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (hardwares3Arr.length > 0) {

        const publisherIDsArr = [];

        for (let valueObj of publishers3Arr.values()) {
          publisherIDsArr.push(valueObj.developerPublisherID);
        }

        const developerIDsArr = [];

        for (let valueObj of developers3Arr.values()) {
          developerIDsArr.push(valueObj.developerPublisherID);
        }

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares3Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate3,
          playersMin: playersMin3,
          playersMax: playersMax3,
          publisherIDsArr,
          developerIDsArr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (hardwares4Arr.length > 0) {

        const publisherIDsArr = [];

        for (let valueObj of publishers4Arr.values()) {
          publisherIDsArr.push(valueObj.developerPublisherID);
        }

        const developerIDsArr = [];

        for (let valueObj of developers4Arr.values()) {
          developerIDsArr.push(valueObj.developerPublisherID);
        }

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares4Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate4,
          playersMin: playersMin4,
          playersMax: playersMax4,
          publisherIDsArr,
          developerIDsArr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (hardwares5Arr.length > 0) {

        const publisherIDsArr = [];

        for (let valueObj of publishers5Arr.values()) {
          publisherIDsArr.push(valueObj.developerPublisherID);
        }

        const developerIDsArr = [];

        for (let valueObj of developers5Arr.values()) {
          developerIDsArr.push(valueObj.developerPublisherID);
        }

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares5Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate5,
          playersMin: playersMin5,
          playersMax: playersMax5,
          publisherIDsArr,
          developerIDsArr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (hardwares6Arr.length > 0) {

        const publisherIDsArr = [];

        for (let valueObj of publishers6Arr.values()) {
          publisherIDsArr.push(valueObj.developerPublisherID);
        }

        const developerIDsArr = [];

        for (let valueObj of developers6Arr.values()) {
          developerIDsArr.push(valueObj.developerPublisherID);
        }

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares6Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate6,
          playersMin: playersMin6,
          playersMax: playersMax6,
          publisherIDsArr,
          developerIDsArr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (hardwares7Arr.length > 0) {

        const publisherIDsArr = [];

        for (let valueObj of publishers7Arr.values()) {
          publisherIDsArr.push(valueObj.developerPublisherID);
        }

        const developerIDsArr = [];

        for (let valueObj of developers7Arr.values()) {
          developerIDsArr.push(valueObj.developerPublisherID);
        }

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares7Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate7,
          playersMin: playersMin7,
          playersMax: playersMax7,
          publisherIDsArr,
          developerIDsArr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (hardwares8Arr.length > 0) {

        const publisherIDsArr = [];

        for (let valueObj of publishers8Arr.values()) {
          publisherIDsArr.push(valueObj.developerPublisherID);
        }

        const developerIDsArr = [];

        for (let valueObj of developers8Arr.values()) {
          developerIDsArr.push(valueObj.developerPublisherID);
        }

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares8Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate8,
          playersMin: playersMin8,
          playersMax: playersMax8,
          publisherIDsArr,
          developerIDsArr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (hardwares9Arr.length > 0) {

        const publisherIDsArr = [];

        for (let valueObj of publishers9Arr.values()) {
          publisherIDsArr.push(valueObj.developerPublisherID);
        }

        const developerIDsArr = [];

        for (let valueObj of developers9Arr.values()) {
          developerIDsArr.push(valueObj.developerPublisherID);
        }

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares9Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate9,
          playersMin: playersMin9,
          playersMax: playersMax9,
          publisherIDsArr,
          developerIDsArr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (hardwares10Arr.length > 0) {

        const publisherIDsArr = [];

        for (let valueObj of publishers10Arr.values()) {
          publisherIDsArr.push(valueObj.developerPublisherID);
        }

        const developerIDsArr = [];

        for (let valueObj of developers10Arr.values()) {
          developerIDsArr.push(valueObj.developerPublisherID);
        }

        hardwareObj = {

          _id: '',
          hardwareID: lodashGet(hardwares10Arr, [0, 'hardwareID'], ''),
          releaseDate: releaseDate10,
          playersMin: playersMin10,
          playersMax: playersMax10,
          publisherIDsArr,
          developerIDsArr,

        }

        formDataObj.hardwareArr.push(hardwareObj);

      }

      if (administrator && imagesAndVideosObj.arr.length !== 0) {
        formDataObj.imagesAndVideosObj = imagesAndVideosObj;
      }

      if (administrator && imagesAndVideosThumbnailObj.arr.length !== 0) {
        formDataObj.imagesAndVideosThumbnailObj = imagesAndVideosThumbnailObj;
      }


      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------

      let resultObj = {};

      if (administrator) {

        // 新規登録の場合、games_id を空にする
        if (formType === 'new') {
          formDataObj.games_id = '';
        }

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

      handleResetForm();


      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------

      setButtonDisabled(false);


      // --------------------------------------------------
      //   Snackbar: Success
      // --------------------------------------------------

      let messageID = 'Kail6oUOo';

      if (administrator) {

        messageID = 'eeZLfSrPw';

        if (games_id) {
          messageID = 'EnStWOly-';
        }

      }

      showSnackbar({

        enqueueSnackbar,
        intl,
        arr: [
          {
            variant: 'success',
            messageID,
          },
        ]

      });


      // ---------------------------------------------
      //   Router.push = History API pushState()
      // ---------------------------------------------

      Router.push('/gc/register');




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

        to: 'gcRegisterForm',
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
  //   Validations
  // --------------------------------------------------

  const validationDeveloperPublisherIDObj = validationKeyword({ value: developerPublisherID });
  const validationUrlIDObj = validationKeyword({ value: urlID });
  const validationNameObj = validationKeyword({ value: name });
  

  // --------------------------------------------------
  //   Element Name
  // --------------------------------------------------

  const elementName = 'gcRegisterDevelopersPublishersForm';

  


  // --------------------------------------------------
  //   Submit Button Label
  // --------------------------------------------------

  let submitButtonLabel = '仮登録する';

  // if (administrator) {

  //   submitButtonLabel = '本登録：新規登録';

  //   if (formType === 'postscript') {
  //     submitButtonLabel = '本登録：編集';
  //   }
    
  // }




  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------

  // console.log(`
  //   ----------------------------------------\n
  //   app/gc/register/v2/form.js
  // `);

  // console.log(chalk`
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


        <p
          css={css`
            margin: 0 0 14px 0;
          `}
        >
          開発・販売を行っている企業、チームなどを登録する。
        </p>




        {/* 開発 */}
        <div css={cssBox}>
          <FormDeveloperPublisher
            type="developer"
            arr={publishersArr}
            setArr={setPublishersArr}
            limit={1}
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
            ID & name
          </h3>

          <p
            css={css`
              margin: 0 0 12px 0;
            `}
          >
            ID & name
          </p>




          {/* developerPublisherID */}
          <TextField
            css={css`
              && {
                width: 100%;
                max-width: 500px;
              }
            `}
            label="developerPublisherID"
            value={validationDeveloperPublisherIDObj.value}
            onChange={(eventObj) => setDeveloperPublisherID(eventObj.target.value)}
            error={validationDeveloperPublisherIDObj.error}
            helperText={intl.formatMessage({ id: validationDeveloperPublisherIDObj.messageID }, { numberOfCharacters: validationDeveloperPublisherIDObj.numberOfCharacters })}
            margin="normal"
            inputProps={{
              maxLength: 100,
            }}
          />




          {/* urlID */}
          <TextField
            css={css`
              && {
                width: 100%;
                max-width: 500px;
              }
            `}
            label="urlID"
            value={validationUrlIDObj.value}
            onChange={(eventObj) => setUrlID(eventObj.target.value)}
            error={validationUrlIDObj.error}
            helperText={intl.formatMessage({ id: validationUrlIDObj.messageID }, { numberOfCharacters: validationUrlIDObj.numberOfCharacters })}
            margin="normal"
            inputProps={{
              maxLength: 100,
            }}
          />




          {/* name */}
          <TextField
            css={css`
              && {
                width: 100%;
                max-width: 500px;
              }
            `}
            label="name"
            value={validationNameObj.value}
            onChange={(eventObj) => setName(eventObj.target.value)}
            error={validationNameObj.error}
            helperText={intl.formatMessage({ id: validationNameObj.messageID }, { numberOfCharacters: validationNameObj.numberOfCharacters })}
            margin="normal"
            inputProps={{
              maxLength: 100,
            }}
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
            {submitButtonLabel}
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
