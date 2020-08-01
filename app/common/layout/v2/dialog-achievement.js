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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconClose from '@material-ui/icons/Close';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateLayout } from 'app/@states/layout.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { CustomError } from 'app/@modules/error/custom.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import TitleChip from 'app/common/title/v2/chip.js';






// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssHeading = css`
  color: #ffffff;
	font-size: 16px;
	line-height: 20px;
	position: relative;
	padding: 10px;
	background: #4169e1;
	box-shadow: 10px 0 0 0 #4169e1, -10px 0 0 0 #4169e1, 0 3px 3px 0 rgba(0,0,0,0.1);
  
  &:before {
    content: " ";
  	position: absolute;
  	top: 100%;
  	left: -10px;
  	width: 0;
  	height: 0;
  	border-width: 0 10px 10px 0;
  	border-style: solid;
  	border-color: transparent;
  	border-right-color: #4f4f4f;
  }
  
  &:after {
    content: " ";
  	position: absolute;
  	top: 100%;
  	right: -10px;
  	width: 0;
  	height: 0;
  	border-width: 10px 10px 0 0;
  	border-style: solid;
  	border-color: transparent;
  	border-top-color: #4f4f4f;
  }
`;


// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const useStyles = makeStyles({
  
  paper: {
    backgroundColor: 'black',
  },
  
});






// --------------------------------------------------
//   Components
// --------------------------------------------------

const Component = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  // const {
    
  //   dialogAchievementOpen,
  //   setDialogAchievementOpen,
    
  // } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const classes = useStyles();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  // const [open, setOpen] = React.useState(false);
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateLayout = ContainerStateLayout.useContainer();
  
  const {
    
    handleSnackbarOpen,
    handleLoadingOpen,
    handleLoadingClose,
    handleScrollTo,
    dialogAchievementOpen,
    setDialogAchievementOpen,
    dialogAchievementObj,
    setDialogAchievementObj,
    
  } = stateLayout;
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * データを読み込む
   */
  // const handleGetEditData = async () => {
    
    
  //   try {
      
      
  //     // ---------------------------------------------
  //     //   cardPlayers_id が存在しない場合エラー
  //     // ---------------------------------------------
      
  //     // if (!cardPlayers_id) {
  //     //   throw new CustomError({ errorsArr: [{ code: 'yYI5YlDcS', messageID: 'Error' }] });
  //     // }
      
      
      
      
  //     // ---------------------------------------------
  //     //   Loading Open
  //     // ---------------------------------------------
      
  //     handleLoadingOpen({});
      
      
  //     // ---------------------------------------------
  //     //   Button Disable
  //     // ---------------------------------------------
      
  //     setButtonDisabled(true);
      
      
      
      
  //     // ---------------------------------------------
  //     //   Scroll To
  //     // ---------------------------------------------
      
  //     // handleScrollTo({
        
  //     //   to: cardPlayers_id,
  //     //   duration: 0,
  //     //   delay: 0,
  //     //   smooth: 'easeInOutQuart',
  //     //   offset: -50,
        
  //     // });
      
      
      
      
  //     // ---------------------------------------------
  //     //   FormData
  //     // ---------------------------------------------
      
  //     const formDataObj = {};
      
      
  //     // ---------------------------------------------
  //     //   Fetch
  //     // ---------------------------------------------
      
  //     const resultObj = await fetchWrapper({
        
  //       urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/achievements/get-edit-data`,
  //       methodType: 'POST',
  //       formData: JSON.stringify(formDataObj),
        
  //     });
      
      
  //     // ---------------------------------------------
  //     //   Error
  //     // ---------------------------------------------
      
  //     if ('errorsArr' in resultObj) {
  //       throw new CustomError({ errorsArr: resultObj.errorsArr });
  //     }
      
      
      
      
  //     // ---------------------------------------------
  //     //   Button Enable
  //     // ---------------------------------------------
      
  //     setButtonDisabled(false);
      
      
  //     // ---------------------------------------------
  //     //   Set Form Data
  //     // ---------------------------------------------
      
  //     // const dataObj = lodashGet(resultObj, ['data'], {});
      
  //     // const name = lodashGet(dataObj, ['name'], '');
  //     // const status = lodashGet(dataObj, ['status'], '');
  //     // const comment = lodashGet(dataObj, ['comment'], '');
      
  //     // let imagesAndVideosObj = lodashGet(dataObj, ['imagesAndVideosObj'], {});
      
  //     // if (Object.keys(imagesAndVideosObj).length === 0) {
        
  //     //   imagesAndVideosObj = {
          
  //     //     _id: '',
  //     //     createdDate: '',
  //     //     updatedDate: '',
  //     //     users_id: '',
  //     //     type: 'ur',
  //     //     arr: [],
          
  //     //   };
        
  //     // }
      
  //     // let imagesAndVideosThumbnailObj = lodashGet(dataObj, ['imagesAndVideosThumbnailObj'], {});
      
  //     // if (Object.keys(imagesAndVideosThumbnailObj).length === 0) {
        
  //     //   imagesAndVideosThumbnailObj = {
          
  //     //     _id: '',
  //     //     createdDate: '',
  //     //     updatedDate: '',
  //     //     users_id: '',
  //     //     type: 'ur',
  //     //     arr: [],
          
  //     //   };
        
  //     // }
      
  //     // const age = lodashGet(dataObj, ['age'], '');
  //     // const ageAlternativeText = lodashGet(dataObj, ['ageAlternativeText'], '');
  //     // const sex = lodashGet(dataObj, ['sex'], '');
  //     // const sexAlternativeText = lodashGet(dataObj, ['sexAlternativeText'], '');
  //     // const addressAlternativeText = lodashGet(dataObj, ['addressAlternativeText'], '');
      
  //     // const gamingExperience = lodashGet(dataObj, ['gamingExperience'], '');
  //     // const gamingExperienceAlternativeText = lodashGet(dataObj, ['gamingExperienceAlternativeText'], '');
  //     // const hobbiesArr = lodashGet(dataObj, ['hobbiesArr'], []);
  //     // const specialSkillsArr = lodashGet(dataObj, ['specialSkillsArr'], []);
  //     // const smartphoneModel = lodashGet(dataObj, ['smartphoneModel'], '');
  //     // const smartphoneComment = lodashGet(dataObj, ['smartphoneComment'], '');
      
  //     // const tabletModel = lodashGet(dataObj, ['tabletModel'], '');
  //     // const tabletComment = lodashGet(dataObj, ['tabletComment'], '');
  //     // const pcModel = lodashGet(dataObj, ['pcModel'], '');
  //     // const pcComment = lodashGet(dataObj, ['pcComment'], '');
  //     // const pcSpecsObj = lodashGet(dataObj, ['pcSpecsObj'], {
        
  //     //   os: '',
  //     //   cpu: '',
  //     //   cpuCooler: '',
  //     //   motherboard: '',
  //     //   memory: '',
  //     //   storage: '',
  //     //   graphicsCard: '',
  //     //   opticalDrive: '',
  //     //   powerSupply: '',
  //     //   pcCase: '',
  //     //   monitor: '',
  //     //   mouse: '',
  //     //   keyboard: '',
        
  //     // });
      
  //     // const hardwareActiveArr = lodashGet(dataObj, ['hardwareActiveArr'], []);
  //     // const hardwareInactiveArr = lodashGet(dataObj, ['hardwareInactiveArr'], []);
  //     // const idsArr = lodashGet(dataObj, ['idsArr'], []);
  //     // const activityTimeArr = lodashGet(dataObj, ['activityTimeArr'], [{
        
  //     //   _id: shortid.generate(),
  //     //   beginTime: '',
  //     //   endTime: '',
  //     //   weekArr: [],
        
  //     // }]);
      
  //     // const lookingForFriends = lodashGet(dataObj, ['lookingForFriends'], true);
  //     // const lookingForFriendsIcon = lodashGet(dataObj, ['lookingForFriendsIcon'], 'emoji_u1f603');
  //     // const lookingForFriendsComment = lodashGet(dataObj, ['lookingForFriendsComment'], '');
  //     // const voiceChat = lodashGet(dataObj, ['voiceChat'], true);
  //     // const voiceChatComment = lodashGet(dataObj, ['voiceChatComment'], '');
      
  //     // const linkArr = lodashGet(dataObj, ['linkArr'], [{
        
  //     //   _id: shortid.generate(),
  //     //   type: 'Other',
  //     //   label: '',
  //     //   url: '',
        
  //     // }]);
      
  //     // const search = lodashGet(dataObj, ['search'], true);
      
      
  //     // setName(name);
  //     // setStatus(status);
  //     // setComment(comment);
  //     // setImagesAndVideosObj(imagesAndVideosObj);
  //     // setImagesAndVideosThumbnailObj(imagesAndVideosThumbnailObj);
  //     // setAge(age);
  //     // setAgeAlternativeText(ageAlternativeText);
  //     // setSex(sex);
  //     // setSexAlternativeText(sexAlternativeText);
  //     // setAddressAlternativeText(addressAlternativeText);
  //     // setGamingExperience(gamingExperience);
  //     // setGamingExperienceAlternativeText(gamingExperienceAlternativeText);
  //     // setHobbiesArr(hobbiesArr);
  //     // setSpecialSkillsArr(specialSkillsArr);
  //     // setSmartphoneModel(smartphoneModel);
  //     // setSmartphoneComment(smartphoneComment);
  //     // setTabletModel(tabletModel);
  //     // setTabletComment(tabletComment);
  //     // setPCModel(pcModel);
  //     // setPCComment(pcComment);
  //     // setPCSpecsObj(pcSpecsObj);
  //     // setHardwareActiveArr(hardwareActiveArr);
  //     // setHardwareInactiveArr(hardwareInactiveArr);
  //     // setIDsArr(idsArr);
  //     // setActivityTimeArr(activityTimeArr);
  //     // setLookingForFriends(lookingForFriends);
  //     // setLookingForFriendsIcon(lookingForFriendsIcon);
  //     // setLookingForFriendsComment(lookingForFriendsComment);
  //     // setVoiceChat(voiceChat);
  //     // setVoiceChatComment(voiceChatComment);
  //     // setLinkArr(linkArr);
  //     // setSearch(search);
      
  //     // set();
      
      
      
  //     // ---------------------------------------------
  //     //   console.log
  //     // ---------------------------------------------
      
  //     // console.log(`
  //     //   ----------------------------------------\n
  //     //   /app/common/layout/v2/dialog-achievement.js - handleGetEditData
  //     // `);
      
  //     // console.log(chalk`
  //     //   cardPlayers_id: {green ${cardPlayers_id}}
  //     // `);
      
  //     // console.log(`
  //     //   ----- resultObj -----\n
  //     //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
      
  //   } catch (errorObj) {
      
      
  //     // ---------------------------------------------
  //     //   Button Enable
  //     // ---------------------------------------------
      
  //     setButtonDisabled(false);
      
      
  //     // ---------------------------------------------
  //     //   Snackbar: Error
  //     // ---------------------------------------------
      
  //     handleSnackbarOpen({
        
  //       variant: 'error',
  //       errorObj,
        
  //     });
      
      
  //   } finally {
      
      
  //     // ---------------------------------------------
  //     //   Loading Close
  //     // ---------------------------------------------
      
  //     handleLoadingClose();
      
      
      
  //   }
    
    
  // };
  
  
  
  
  /**
   * フォームを送信する
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
      //   _id が存在しない場合エラー
      // ---------------------------------------------
      
      if (!cardPlayers_id) {
        throw new CustomError({ errorsArr: [{ code: 'TlbdVZVuk', messageID: '1YJnibkmh' }] });
      }
      
      
       
      
      // ---------------------------------------------
      //   Validation Error
      // ---------------------------------------------
      
      if (
        
        validationHandleName({ value: name }).error ||
        validationCardPlayersStatus({ value: status }).error ||
        validationCardPlayersComment({ value: comment }).error ||
        validationCardPlayersAge({ value: age }).error ||
        validationCardPlayersAgeAlternativeText({ value: ageAlternativeText }).error ||
        validationCardPlayersSex({ value: sex }).error ||
        validationCardPlayersSexAlternativeText({ value: sexAlternativeText }).error ||
        validationCardPlayersAddressAlternativeText({ value: addressAlternativeText }).error ||
        validationCardPlayersGamingExperience({ value: gamingExperience }).error ||
        validationCardPlayersGamingExperienceAlternativeText({ value: gamingExperienceAlternativeText }).error ||
        validationCardPlayersHobby({ valueArr: hobbiesArr }).error ||
        validationCardPlayersSpecialSkill({ valueArr: specialSkillsArr }).error ||
        validationCardPlayersSmartphoneModel({ value: smartphoneModel }).error ||
        validationCardPlayersSmartphoneComment({ value: smartphoneComment }).error ||
        validationCardPlayersTabletModel({ value: tabletModel }).error ||
        validationCardPlayersTabletComment({ value: tabletComment }).error ||
        validationCardPlayersPCModel({ value: pcModel }).error ||
        validationCardPlayersPCComment({ value: pcComment }).error ||
        validationCardPlayersPCSpec({ valueObj: pcSpecsObj }).error ||
        validationCardPlayersActivityTimeArr({ valueArr: activityTimeArr }).error ||
        validationCardPlayersLookingForFriendsValue({ value: lookingForFriends }).error ||
        validationCardPlayersLookingForFriendsComment({ value: lookingForFriendsComment }).error ||
        validationCardPlayersLookingForFriendsIcon({ value: lookingForFriendsIcon }).error ||
        validationCardPlayersVoiceChatValue({ value: voiceChat }).error ||
        validationCardPlayersVoiceChatComment({ value: voiceChatComment }).error ||
        validationCardPlayersLinkArr({ valueArr: linkArr }).error ||
        validationBoolean({ value: search }).error
        
      ) {
        
        throw new CustomError({ errorsArr: [{ code: 'g5D-Ev10X', messageID: 'uwHIKBy7c' }] });
        
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
        
        _id: cardPlayers_id,
        name,
        status,
        comment,
        age,
        ageAlternativeText,
        sex,
        sexAlternativeText,
        addressAlternativeText,
        gamingExperience,
        gamingExperienceAlternativeText,
        hobbiesArr,
        specialSkillsArr,
        smartphoneModel,
        smartphoneComment,
        tabletModel,
        tabletComment,
        pcModel,
        pcComment,
        pcSpecsObj,
        hardwareActiveArr,
        hardwareInactiveArr,
        idsArr,
        activityTimeArr,
        lookingForFriends,
        lookingForFriendsIcon,
        lookingForFriendsComment,
        voiceChat,
        voiceChatComment,
        linkArr,
        search,
        
      };
      
      if (imagesAndVideosObj.arr.length !== 0) {
        formDataObj.imagesAndVideosObj = imagesAndVideosObj;
      }
      
      if (imagesAndVideosThumbnailObj.arr.length !== 0) {
        formDataObj.imagesAndVideosThumbnailObj = imagesAndVideosThumbnailObj;
      }
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/card-players/upsert`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
        
      });
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // ---------------------------------------------
      //   Reset Form
      // ---------------------------------------------
      
      // setName('');
      // setAnonymity(false);
      // setComment('');
      // setImagesAndVideosObj({
        
      //   _id: '',
      //   createdDate: '',
      //   updatedDate: '',
      //   users_id: '',
      //   type: 'forum',
      //   arr: [],
        
      // });
      
      
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      setButtonDisabled(false);
      
      
      // ---------------------------------------------
      //   Update - cardPlayersArr
      // ---------------------------------------------
      
      setCardPlayersArr(lodashGet(resultObj, ['data', 'cardPlayersArr'], []));
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      handleSnackbarOpen({
        
        variant: 'success',
        messageID: 'EnStWOly-',
        
      });
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/card/v2/components/form-card-player.js - handleSubmit
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   forumThreads_id: {green ${forumThreads_id}}
      //   forumComments_id: {green ${forumComments_id}}
      //   name: {green ${name}}
      //   comment: {green ${comment}}
      // `);
      
      // console.log(`
      //   ----- formDataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(formDataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      setButtonDisabled(false);
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      handleSnackbarOpen({
        
        variant: 'error',
        errorObj,
        
      });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Hide Form
      // ---------------------------------------------
      
      setShowForm(false);
      
      
      // ---------------------------------------------
      //   Scroll To
      // ---------------------------------------------
      
      handleScrollTo({
        
        to: cardPlayers_id,
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
      
      to: cardPlayers_id,
      duration: 0,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -50,
      
    });
    
    
  };
  
  
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const experiencesAchievementsArr = lodashGet(dialogAchievementObj , ['experiencesObj', 'achievementsArr'], []);
  const experiencesTitlesArr = lodashGet(dialogAchievementObj , ['experiencesObj', 'titlesArr'], []);
  const experiencesTitles_idsArr = lodashGet(dialogAchievementObj , ['experiencesObj', 'titles_idsArr'], []);
  const achievementsArr = lodashGet(dialogAchievementObj, ['achievementsArr'], []);
  
  
  
  
  // --------------------------------------------------
  //   Component - Achievements Chip
  // --------------------------------------------------
  
  const componentAchievementsArr = [];
  
  for (const [index1, value1Obj] of achievementsArr.entries()) {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const type = lodashGet(value1Obj , ['type'], '');
    const conditionsArr = lodashGet(value1Obj , ['conditionsArr'], []);
    const titlesArr = lodashGet(value1Obj , ['titlesArr'], []);
    
    let conditionType = 'count';
    
    
    // --------------------------------------------------
    //   Heading
    // --------------------------------------------------
    
    let heading = '';
    
    switch (type) {
      
      case 'good-count-click':
        
        heading = 'Goodボタンを押す';
        break;
        
      case 'forum-count-post':
        
        heading = 'フォーラムに書き込む';
        break;
        
    }
    
    
    // --------------------------------------------------
    //   Contents
    // --------------------------------------------------
    
    const componentConditionsArr = [];
    
    for (const [index2, value2Obj] of conditionsArr.entries()) {
      
      
      // --------------------------------------------------
      //   Property
      // --------------------------------------------------
      
      const titles_id = lodashGet(value2Obj , ['titles_id'], '');
      const datetime = lodashGet(value2Obj , ['datetime'], '');
      const count = lodashGet(value2Obj , ['count'], 1);
      
      const findObj = titlesArr.find((value3Obj) => {
        return value3Obj._id === titles_id;
      });
      
      const urlID = lodashGet(findObj , ['urlID'], '');
      const name = lodashGet(findObj , ['name'], '');
      
      
      // --------------------------------------------------
      //   Component
      // --------------------------------------------------
      
      componentConditionsArr.push(
        <Step key={index2}>
          
          <StepLabel>
            
            <div
              css={css`
                display: flex;
                flex-flow: row wrap;
                
                background-color: black;
                padding: 12px;
              `}
            >
              
              <div
                css={css`
                  margin: 0 0 0 0;
                `}
              >
                {count} 回
              </div>
            
            
              
              {/*<div
                css={css`
                  font-weight: bold;
                `}
              >
                達成報酬
              </div>
              
              
              <div
                css={css`
                  margin: 0 0 0 16px;
                `}
              >
                称号:
              </div>*/}
              
              
              <div
                // css={css`
                //   background-color: black;
                //   padding: 4px 0;
                // `}
              >
              
              <TitleChip
                _id={titles_id}
                urlID={urlID}
                name={name}
              />
              
              </div>
              
              
            </div>
            
          </StepLabel>
          
          {/*<StepContent>
            
            <div
              css={css`
                display: flex;
                flex-flow: row wrap;
              `}
            >
              
              <div
                css={css`
                  font-weight: bold;
                `}
              >
                達成報酬
              </div>
              
              
              <div
                css={css`
                  margin: 0 0 0 16px;
                `}
              >
                称号:
              </div>
              
              
              <TitleChip
                _id={titles_id}
                urlID={urlID}
                name={name}
              />
              
            </div>
            
          </StepContent>*/}
          
        </Step>
      );
      
      
    }
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    componentAchievementsArr.push(
      <Paper
        css={css`
          && {
            margin: 0 24px;
            
            @media screen and (max-width: 480px) {
              margin: 0;
            }
          }
        `}
        // classes={{
        //   paper: classes.paper
        // }}
        elevation={3}
        key={index1}
      >
        
        
        <h3 css={cssHeading}>{heading}</h3>
        
        
        <Stepper
          activeStep={5}
          orientation="vertical"
        >
          
          {componentConditionsArr}
          
        </Stepper>
        
        
      </Paper>
    );
    
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/layout/v2/dialog-achievement.js
  // `);
  
  // console.log(chalk`
  //   dialogAchievementOpen: {green ${dialogAchievementOpen}}
  // `);
  
  // console.log(`
  //   ----- dialogAchievementObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(dialogAchievementObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Dialog
      fullScreen
      open={dialogAchievementOpen}
      onClose={() => setDialogAchievementOpen(false)}
    >
      
      
      <AppBar
        css={css`
          padding: 0 !important;
        `}
      >
      
        <Toolbar
          css={css`
            && {
              padding-right: 12px;
            }
          `}
        >
          
          <h2>
            実績
          </h2>
          
          
          <div
            css={css`
              margin-left: auto;
            `}
          >
            
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDialogAchievementOpen(false)}
              aria-label="close"
            >
              <IconClose />
            </IconButton>
            
          </div>
          
        </Toolbar>
        
      </AppBar>
      
      
      
      
      <div
        css={css`
          padding: 90px 0 24px 0;
          // padding: 0 16px;
          // background-color: black;
          
          @media screen and (max-width: 480px) {
            margin: 76px 0 24px 0;
          }
        `}
      >
        
        {componentAchievementsArr}
        
      </div>
      
      
    </Dialog>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;