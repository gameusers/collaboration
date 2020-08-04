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
import lodashSet from 'lodash/set';
import lodashCloneDeep from 'lodash/cloneDeep';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
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

const cssHeadingBlue = css`
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


const cssHeadingRed = css`
  color: #ffffff;
	font-size: 16px;
	line-height: 20px;
	position: relative;
	padding: 10px;
	background: #ff0033;
	box-shadow: 10px 0 0 0 #ff0033, -10px 0 0 0 #ff0033, 0 3px 3px 0 rgba(0,0,0,0.1);
  
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
//   Components
// --------------------------------------------------

const Component = (props) => {
  
  
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
    // setDialogAchievementObj,
    dialogAchievementTitles_idsArr,
    setDialogAchievementTitles_idsArr,
    
  } = stateLayout;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [pageNo, setPageNo] = useState(0);
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
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
        
        titles_idsArr: dialogAchievementTitles_idsArr,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/experiences/upsert`,
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
      //   Update
      // ---------------------------------------------
      
      setDialogAchievementTitles_idsArr(lodashGet(resultObj, ['data'], []));
      
      
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
      //   /app/common/layout/v2/dialog-achievement.js - handleSubmit
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
      //   Loading Close
      // ---------------------------------------------
      
      handleLoadingClose();
      
      
    }
    
    
  };
  
  
  
  
  /**
   * 称号を追加する / 削除する
   */
  const handleAddRemoveTitle = ({ value }) => {
    
    const clonedArr = lodashCloneDeep(dialogAchievementTitles_idsArr);
    const arrayIndex = clonedArr.indexOf(value);
    
    if (arrayIndex === -1) {
      
      clonedArr.push(value);
      
    } else {
      
      clonedArr.splice(arrayIndex, 1);
      
    }
    
    setDialogAchievementTitles_idsArr(clonedArr);
    
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/layout/v2/dialog-achievement.js - handleAddRemoveTitle
    // `);
    
    // console.log(chalk`
    //   value: {green ${value}}
    //   arrayIndex: {green ${arrayIndex}}
    // `);
    
    // console.log(`
    //   ----- clonedArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(clonedArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
  };
  
  
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const experiencesAchievementsArr = lodashGet(dialogAchievementObj , ['experiencesObj', 'achievementsArr'], []);
  const achievementsArr = lodashGet(dialogAchievementObj, ['achievementsArr'], []);
  const titlesObj = lodashGet(dialogAchievementObj, ['titlesObj'], {});
  
  
  
  
  // --------------------------------------------------
  //   Component - Achievements Chip
  // --------------------------------------------------
  
  const componentAchievementsArr = [];
  const componentTitlesArr = [];
  
  for (const [index1, value1Obj] of achievementsArr.entries()) {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const type = lodashGet(value1Obj , ['type'], '');
    const limitDay = lodashGet(value1Obj , ['limitDay'], 0);
    const limitMonth = lodashGet(value1Obj , ['limitMonth'], 0);
    const limitYear = lodashGet(value1Obj , ['limitYear'], 0);
    const conditionsArr = lodashGet(value1Obj , ['conditionsArr'], []);
    // const titlesArr = lodashGet(value1Obj , ['titlesArr'], []);
    
    const find1Obj = experiencesAchievementsArr.find((tempObj) => {
      return tempObj.type === type;
    });
    
    const countValid = lodashGet(find1Obj , ['countValid'], 0);
    const countTotal = lodashGet(find1Obj , ['countTotal'], 0);
    
    let activeStep = 0;
    
    // let conditionType = 'count';
    
    
    
    
    // --------------------------------------------------
    //   Heading & Explanation
    // --------------------------------------------------
    
    let heading = '';
    let explanation = '';
    
    switch (type) {
      
      case 'good-count-click':
        
        heading = 'Goodボタンを押す';
        explanation = 'フォーラムのGoodボタンを押すとカウントされます。';
        break;
        
      case 'forum-count-post':
        
        heading = 'フォーラムに書き込む';
        explanation = 'ゲームコミュニティ、ユーザーコミュニティのフォーラムに書き込むとカウントされます。';
        break;
        
    }
    
    
    
    
    // --------------------------------------------------
    //   Limit
    // --------------------------------------------------
    
    let limit = '';
    
    if (limitDay) {
      
      limit = `1日に${limitDay}回まで`;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - Step & Title
    // --------------------------------------------------
    
    const componentConditionsArr = [];
    const componentTitleAcquisitionsArr = [];
    
    
    for (const [index2, value2Obj] of conditionsArr.entries()) {
      
      
      // --------------------------------------------------
      //   Property
      // --------------------------------------------------
      
      const titles_id = lodashGet(value2Obj , ['titles_id'], '');
      // const datetime = lodashGet(value2Obj , ['datetime'], '');
      const count = lodashGet(value2Obj , ['count'], 1);
      
      if (countValid >= count) {
        activeStep = index2;
      }
      
      const urlID = lodashGet(titlesObj , [titles_id, 'urlID'], '');
      const name = lodashGet(titlesObj , [titles_id, 'name'], '');
      
      
      
      
      // --------------------------------------------------
      //   Component - Step
      // --------------------------------------------------
      
      componentConditionsArr.push(
        <Step key={index2}>
          
          <StepLabel>
            
            {/*countValid = {countValid}<br />
            activeStep = {activeStep}<br />*/}
            
            <div
              css={css`
                display: flex;
                flex-flow: row wrap;
                align-items: center;
              `}
            >
              
              <div
                css={css`
                  margin: 0 12px 0 0;
                `}
              >
                {count} 回
              </div>
              
              
              <div
                css={css`
                  border-radius: 6px;
                  background-color: black;
                  margin: 0;
                  padding: 4px 6px;
                `}
              >
                
                <TitleChip
                  _id={titles_id}
                  urlID={urlID}
                  name={name}
                />
                
              </div>
              
            </div>
            
          </StepLabel>
          
        </Step>
      );
      
      
      
      
      // --------------------------------------------------
      //   Component - Title Acquisitions
      // --------------------------------------------------
      
      if (countValid >= count) {
        
        componentTitleAcquisitionsArr.push(
          <div
            css={css`
              border-radius: 6px;
              background-color: black;
              cursor: pointer;
              margin: 12px 12px 0 0;
              padding: 4px 6px;
            `}
            key={titles_id}
            onClick={() => handleAddRemoveTitle({ value: titles_id })}
          >
            
            <TitleChip
              _id={titles_id}
              urlID={urlID}
              name={name}
            />
            
          </div>
        );
        
      }
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - Achievement
    // --------------------------------------------------
    
    componentAchievementsArr.push(
      <Paper
        css={css`
          && {
            margin: 24px 0 0;
          }
        `}
        elevation={3}
        key={index1}
      >
        
        
        <h3 css={cssHeadingBlue}>{heading}</h3>
        
        
        <p
          css={css`
            margin: 14px;
          `}
        >
          {explanation}
        </p>
        
        
        <p
          css={css`
            margin: 0 14px;
          `}
        >
          
          <span css={css` font-weight: bold; `}>有効カウント：</span>{countValid}回
          
          {countValid !== countTotal &&
            <React.Fragment> / <span css={css` font-weight: bold; `}>合計カウント：</span>{countTotal}回</React.Fragment>
          }
          
        </p>
        
        
        {limit &&
          <p
            css={css`
              margin: 0 12px;
            `}
          >
            <span css={css` font-weight: bold; `}>制限：</span>{limit}
          </p>
        }
        
        
        
        
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
        >
          
          {componentConditionsArr}
          
        </Stepper>
        
        
      </Paper>
    );
    
    
    
    
    // --------------------------------------------------
    //   Component - Title
    // --------------------------------------------------
    
    componentTitlesArr.push(
      <Paper
        css={css`
          && {
            margin: 24px 0 0;
          }
        `}
        elevation={3}
        key={index1}
      >
        
        
        <h3 css={cssHeadingBlue}>{heading}</h3>
        
        
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            margin: 0 12px;
            padding: 0 0 12px;
          `}
        >
          {componentTitleAcquisitionsArr}
        </div>
        
        
      </Paper>
    );
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Component - Title Selected
  // --------------------------------------------------
  
  const componentTitleSelectedArr = [];
  
  for (let titles_id of dialogAchievementTitles_idsArr.values()) {
    
    const urlID = lodashGet(titlesObj , [titles_id, 'urlID'], '');
    const name = lodashGet(titlesObj , [titles_id, 'name'], '');
    
    
    componentTitleSelectedArr.push(
      <div
        css={css`
          border-radius: 6px;
          background-color: black;
          cursor: pointer;
          margin: 12px 12px 0 0;
          padding: 4px 6px;
        `}
        key={titles_id}
        onClick={() => handleAddRemoveTitle({ value: titles_id })}
      >
        
        <TitleChip
          _id={titles_id}
          urlID={urlID}
          name={name}
        />
        
      </div>
    );
    
    
  }
  
  
  const componentTitleSelected = 
    <Paper
      css={css`
        && {
          margin: 0 0 24px;
          padding: 0 0 12px;
        }
      `}
      elevation={3}
    >
      
      
      <h3 css={cssHeadingRed}>表示する称号</h3>
      
      
      <div
        css={css`
          display: flex;
          flex-flow: row wrap;
          margin: 0 12px;
        `}
      >
        {componentTitleSelectedArr}
      </div>
      
      
      
      
      {/* フォーム */}
      <form
        name="formTitleSelected"
        onSubmit={(eventObj) => handleSubmit({
          eventObj,
        })}
      >
        
        {/* Submit Button */}
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            border-top: 1px dashed #848484;
            margin: 12px 0 0 0;
            padding: 12px 12px 0;
          `}
        >
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={buttonDisabled}
          >
            保存する
          </Button>
          
        </div>
        
      </form>
      
      
    </Paper>
  ;
  
  
  
  
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
  //   ----- dialogAchievementTitles_idsArr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(dialogAchievementTitles_idsArr)), { colors: true, depth: null })}\n
  //   --------------------\n
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
      
      
      {/* Bar */}
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
      
      
      
      
      {/* Content */}
      <div
        css={css`
          margin: 90px 0 24px 0;
          padding: 0 24px;
          
          @media screen and (max-width: 480px) {
            margin: 76px 0 24px 0;
            padding: 0;
          }
        `}
      >
        
        
        {/* Buttons */}
        <ButtonGroup
          css={css`
            // margin: 0 0 0 0;
            // padding: 0 24px;
            
            @media screen and (max-width: 480px) {
              // margin: 76px 0 24px 0;
              padding: 0 12px;
            }
          `}
          color="primary"
          aria-label="outlined primary button group"
          disabled={buttonDisabled}
        >
          
          
          {/* 実績ボタン */}
          <Button
            onClick={() => setPageNo(0)}
          >
            <span
              css={css`
                font-weight: ${pageNo === 0 ? 'bold' : 'normal'};
              `}
            >
              実績
            </span>
          </Button>
          
          
          {/* 称号ボタン */}
          <Button
            onClick={() => setPageNo(1)}
          >
            <span
              css={css`
                font-weight: ${pageNo === 1 ? 'bold' : 'normal'};
              `}
            >
              称号
            </span>
          </Button>
          
          
        </ButtonGroup>
        
        
        
        
        {/* Content */}
        {pageNo === 0
          
          ? // 実績
          
            <React.Fragment>
              
              <p
                css={css`
                  margin: 14px 0 0 0;
                  
                  @media screen and (max-width: 480px) {
                    padding: 0 12px;
                  }
                `}
              >
                Game Users 内で特定の行動をすると称号を獲得することができます。
              </p>
              
              <p
                css={css`
                  color: red;
                  margin: 14px 0 36px 0;
                  
                  @media screen and (max-width: 480px) {
                    padding: 0 12px;
                  }
                `}
              >
                ※ 実績を達成するために内容のないコンテンツを作成した場合、実績機能を利用できなくなることがあります。
              </p>
              
              
              {componentAchievementsArr}
              
            </React.Fragment>
            
          : // 称号
          
            <React.Fragment>
              
              <p
                css={css`
                  margin: 14px 0 28px 0;
                  
                  @media screen and (max-width: 480px) {
                    padding: 0 12px;
                  }
                `}
              >
                獲得した称号はユーザーページ内に表示することができます。表示したい称号を選択して「保存する」ボタンを押してください。左から3つ目までの称号が保存され、ユーザーページ内の上部に表示されます。
              </p>
              
              
              {componentTitleSelected}
              
              {componentTitlesArr}
              
            </React.Fragment>
            
        }
        
      </div>
      
      
    </Dialog>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;