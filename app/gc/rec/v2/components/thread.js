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
import { useIntl } from 'react-intl';
import { Element } from 'react-scroll';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/ja_JP';
import SimpleIcons from 'simple-icons-react-component';

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

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconPublic from '@material-ui/icons/Public';
import IconDelete from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
import IconDoubleArrow from '@material-ui/icons/KeyboardReturn';
import IconReply from '@material-ui/icons/Reply';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateLayout } from 'app/@states/layout.js';
import { ContainerStateGc } from 'app/@states/gc.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { CustomError } from 'app/@modules/error/custom.js';
import { getCookie } from 'app/@modules/cookie.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Paragraph from 'app/common/layout/v2/components/paragraph.js';
import User from 'app/common/user/v2/components/user.js';
import ImageAndVideo from 'app/common/image-and-video/v2/components/image-and-video.js';
import ChipHardwares from 'app/common/hardware/v2/components/chip.js';
// import Panel from 'app/common/layout/components/panel.js';

import ChipCategory from 'app/gc/rec/components/chip-category.js';
import RecruitmentComment from 'app/gc/rec/components/recruitment-comment.js';
import FormThread from 'app/gc/rec/v2/components/form/thread.js';
import FormComment from 'app/gc/rec/components/form/comment.js';
import Public from 'app/gc/rec/components/public.js';
import DeadlineDate from 'app/gc/rec/components/deadline-date.js';
import Notification from 'app/gc/rec/components/notification.js';






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
    
    urlID,
    gameCommunities_id,
    recruitmentThreads_id,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const classes = useStyles();
  const [panelExpanded, setPanelExpanded] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  // const [showComment, setShowComment] = useState(true);
  const [showFormThread, setShowFormThread] = useState(false);
  const [showFormComment, setShowFormComment] = useState(false);
  // const [showHardwareExplanation, setShowHardwareExplanation] = useState(false);
  // const [hardwaresArr, setHardwaresArr] = useState([]);
  // const [categoriesArr, setCategoriesArr] = useState([]);
  // const [keyword, setKeyword] = useState('');
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateLayout = ContainerStateLayout.useContainer();
  const stateGc = ContainerStateGc.useContainer();
  
  const {
    
    handleSnackbarOpen,
    handleDialogOpen,
    handleLoadingOpen,
    handleLoadingClose,
    handleScrollTo,
    
  } = stateLayout;
  
  const {
    
    setGameCommunityObj,
    recruitmentThreadsObj,
    setRecruitmentThreadsObj,
    setRecruitmentCommentsObj,
    setRecruitmentRepliesObj,
    
  } = stateGc;
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * スレッドを削除する
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {string} forumThreads_id - DB forum-threads _id / 削除するスレッドのID
   */
  const handleDelete = async ({
    
    gameCommunities_id,
    userCommunities_id,
    forumThreads_id,
    
  }) => {
    
    
    try {
      
      
      // ---------------------------------------------
      //   _id が存在しない場合エラー
      // ---------------------------------------------
      
      if ((!gameCommunities_id && !forumThreads_id) || (!userCommunities_id && !forumThreads_id)) {
        throw new CustomError({ errorsArr: [{ code: 'cGHv25p8q', messageID: '1YJnibkmh' }] });
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
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/forum/v2/components/thread.js - handleDelete
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   forumThreads_id: {green ${forumThreads_id}}
      // `);
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        userCommunities_id,
        forumThreads_id,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        resultObj = await fetchWrapper({
          
          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-threads/delete-gc`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
          
        });
        
      } else if (userCommunities_id) {
        
        resultObj = await fetchWrapper({
          
          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-threads/delete-uc`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
          
        });
        
      }
      
      
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
      //   State 削除
      // ---------------------------------------------
      
      const clonedForumThreadsObj = lodashCloneDeep(forumThreadsObj);
      
      // const page = lodashGet(forumThreadsObj, ['page'], 1);
      // const arr = lodashGet(forumThreadsObj, [`page${page}Obj`, 'arr'], []);
      // const newArr = arr.filter(value => value !== forumThreads_id);
      // lodashSet(clonedForumThreadsObj, [`page${page}Obj`, 'arr'], newArr);
      
      const dataObj = lodashGet(clonedForumThreadsObj, ['dataObj'], {});
      delete dataObj[forumThreads_id];
      
      setForumThreadsObj(clonedForumThreadsObj);
      
      
      // console.log(`
      //   ----- clonedForumThreadsObj -----\n
      //   ${util.inspect(clonedForumThreadsObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Game Community データ更新
      // ---------------------------------------------
      
      const gameCommunityObj = lodashGet(resultObj, ['data', 'gameCommunityObj'], {});
      setGameCommunityObj(gameCommunityObj);
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      handleSnackbarOpen({
        variant: 'success',
        messageID: 'KBPPfi4f9',
      });
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      handleSnackbarOpen({
        variant: 'error',
        errorObj,
      });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      setButtonDisabled(false);
      
      
      // ---------------------------------------------
      //   Loading Close
      // ---------------------------------------------
      
      handleLoadingClose();
      
      
    }
    
    
  };
  
  
  
  
  // --------------------------------------------------
  //   Forum
  // --------------------------------------------------
  
  // const {
    
  //   dataObj,
  //   handleEdit,
  //   handleReadRecruitmentThreads,
  //   handleShowFormRecruitmentThread,
  //   handleDeleteRecruitment,
  //   handleShowDeleteDialog,
    
  // } = storeGcRecruitment;
  
  
  
  
  // --------------------------------------------------
  //   dataObj
  // --------------------------------------------------
  
  const dataObj = lodashGet(recruitmentThreadsObj, ['dataObj', recruitmentThreads_id], {});
  
  // console.log(`
  //   ----- dataObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(dataObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  if (Object.keys(dataObj).length === 0) {
    return null;
  }
  
  
  
  
  // --------------------------------------------------
  //   Path Array
  // --------------------------------------------------
  
  // const pathRecruitmentThreadArr = [recruitmentThreads_id, 'recruitmentThreadObj'];
  // const pathRecruitmentThreadEditFormArr = [recruitmentThreads_id, 'recruitmentThreadEditFormObj'];
  // const pathRecruitmentCommentNewFormArr = [recruitmentThreads_id, 'recruitmentCommentNewFormObj'];
  // const pathRecruitmentCommentEditFormArr = [recruitmentThreads_id, 'recruitmentCommentEditFormObj'];
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const title = lodashGet(dataObj, ['title'], '');
  const comment = lodashGet(dataObj, ['comment'], '');
  
  const imagesAndVideosObj = lodashGet(dataObj, ['imagesAndVideosObj'], {});
  
  // 管理者権限がある、またはスレッドを建てた本人の場合、編集ボタンを表示する
  const editable = lodashGet(dataObj, ['editable'], false);
  // const editable = true;
  
  const category = lodashGet(dataObj, ['category'], 1);
  const hardwaresArr = lodashGet(dataObj, ['hardwaresArr'], []);
  const deadlineDate = lodashGet(dataObj, ['deadlineDate'], '');
  const notification = lodashGet(dataObj, ['notification'], '');
  
  const comments = lodashGet(dataObj, ['comments'], 0);
  
  
  // --------------------------------------------------
  //   User Data
  // --------------------------------------------------
  
  const imagesAndVideosThumbnailObj = lodashGet(dataObj, ['cardPlayersObj', 'imagesAndVideosThumbnailObj'], {});
  
  const cardPlayers_id = lodashGet(dataObj, ['cardPlayersObj', '_id'], '');
  
  let name = lodashGet(dataObj, ['name'], '');
  const cardPlayers_name = lodashGet(dataObj, ['cardPlayersObj', 'name'], '');
  
  if (cardPlayers_name) {
    name = cardPlayers_name;
  }
  
  const status = lodashGet(dataObj, ['cardPlayersObj', 'status'], '');
  
  const exp = lodashGet(dataObj, ['usersObj', 'exp'], 0);
  const accessDate = lodashGet(dataObj, ['usersObj', 'accessDate'], '');
  const userID = lodashGet(dataObj, ['usersObj', 'userID'], '');
  
  
  // --------------------------------------------------
  //   Link
  // --------------------------------------------------
  
  let linkHref = `/gc/[urlID]/rec/[...slug]?urlID=${urlID}&recruitmentID=${recruitmentThreads_id}`;
  let linkAs = `/gc/${urlID}/rec/${recruitmentThreads_id}`;
  
  
  // --------------------------------------------------
  //   ID & Information
  // --------------------------------------------------
  
  const idsArr = lodashGet(dataObj, ['idsArr'], []);
  const publicIDsArr = lodashGet(dataObj, ['publicIDsArr'], []);
  const publicInformationsArr = lodashGet(dataObj, ['publicInformationsArr'], []);
  const publicSetting = lodashGet(dataObj, ['publicSetting'], 1);
  
  
  // --------------------------------------------------
  //   Share: Twitter
  //   参考：https://blog.ikunaga.net/entry/twitter-com-intent-tweet/
  // --------------------------------------------------
  
  const twitterHashtagsArr = lodashGet(dataObj, ['gamesObj', 'twitterHashtagsArr'], []);
  
  let shareTwitterText = title;
  
  if (title.length > 50) {
    shareTwitterText = title.substr(0, 50) + '…';
  }
  
  let shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURI(shareTwitterText)}&url=${process.env.NEXT_PUBLIC_URL_BASE}gc/${urlID}/rec/${recruitmentThreads_id}`;
  
  if (twitterHashtagsArr.length > 0) {
    
    shareTwitter += `&hashtags=${twitterHashtagsArr.join(',')}`;
    
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/gc/rec/v2/components/thread.js
  // `);
  
  // console.log(`
  //   ----- dataObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(dataObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(`
  //   ----- twitterHashtagsArr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(twitterHashtagsArr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Element
      name={recruitmentThreads_id}
    >
      
      
      <Accordion
        css={css`
          margin: 0 0 16px 0 !important;
        `}
        expanded={panelExpanded}
      >
        
        
        {/* Summary */}
        <AccordionSummary
          css={css`
            && {
              cursor: default !important;
              background-color: white !important;
              
              @media screen and (max-width: 480px) {
                padding: 0 16px;
              }
            }
          `}
          classes={{
            expanded: classes.expanded
          }}
        >
          
          
          <div
            css={css`
              display: flex;
              flex-flow: column nowrap;
              width: 100%;
            `}
          >
            
            
            {/* Container - Thread Name & Expansion Button */}
            <div
              css={css`
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                width: 100%;
              `}
            >
              
              
              {/* h2 */}
              <h2
                css={css`
                  font-weight: bold;
                  font-size: 16px;
                  
                  @media screen and (max-width: 480px) {
                    font-size: 14px;
                  }
                `}
              >
                {title}
              </h2>
              
              
              
              
              {/* Expansion Button */}
              <div
                css={css`
                  margin-left: auto;
                `}
              >
                
                <IconButton
                  css={css`
                    && {
                      margin: 0;
                      padding: 4px;
                    }
                  `}
                  aria-expanded={panelExpanded}
                  aria-label="Show more"
                  disabled={buttonDisabled}
                  onClick={() => setPanelExpanded(!panelExpanded)}
                >
                  {panelExpanded ? (
                    <IconExpandLess />
                  ) : (
                    <IconExpandMore />
                  )}
                </IconButton>
                
              </div>
              
              
            </div>
            
            
            
            
            {/* Information */}
            <div
              css={css`
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                font-size: 12px;
              `}
            >
              
              
              {/* Hardwares & recruitmentThreads_id */}
              <div
                css={css`
                  display: flex;
                  flex-flow: row wrap;
                  align-items: center;
                  margin: 0;
                `}
              >
                
                
                {/* ハードウェア  */}
                {/*<ChipHardwares
                  hardwaresArr={hardwaresArr}
                />*/}
                
                
                {/* カテゴリー */}
                {/*<ChipCategory
                  category={category}
                />*/}
                
                
                {/* スレッドの固有ID: recruitmentThreads_id */}
                <div
                  css={css`
                    display: flex;
                    flex-flow: row nowrap;
                    margin: 8px 0 0 0;
                  `}
                >
                  
                  <IconPublic
                    css={css`
                      && {
                        font-size: 24px;
                        margin: 0 2px 0 0;
                      }
                    `}
                  />
                  
                  <div
                    css={css`
                      font-size: 12px;
                      color: #009933;
                      cursor: pointer;
                      margin: 2px 0 0 0;
                    `}
                  >
                    <Link href={linkHref} as={linkAs}>
                      <a>{recruitmentThreads_id}</a>
                    </Link>
                  </div>
                  
                </div>
                
                
              </div>
              
              
            </div>
            
            
          </div>
          
          
        </AccordionSummary>
        
        
        
        
        {/* Contents */}
        <AccordionDetails
          css={css`
            && {
              display: flex;
              flex-flow: column wrap;
              
              @media screen and (max-width: 480px) {
                padding: 0 16px 16px !important;
              }
            }
          `}
        >
            
            
            {/* Thread - Edit Form */}
            {showFormThread &&
              <div
                css={css`
                  width: 100%;
                  
                  border-top: 1px solid;
                  border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
                  border-image-slice: 1;
                  
                  margin: 12px 0 0 0;
                `}
              >
              
                <div
                  css={css`
                    border-left: 4px solid #A4A4A4;
                    margin: 16px 0 0 0;
                    padding: 8px 0 8px 16px;
                    
                    @media screen and (max-width: 480px) {
                      // background-color: #F8F8FF;
                      border-left: none;
                      margin: 0;
                      padding: 32px 0 0 0;
                    }
                  `}
                >
                  
                  <FormThread
                    // pathArr={pathRecruitmentThreadEditFormArr}
                    gameCommunities_id={gameCommunities_id}
                    recruitmentThreads_id={recruitmentThreads_id}
                  />
                  
                </div>
                
              </div>
            }
            
            
            
            
            {/* Thread */}
            {!showFormThread &&
              <div
                css={css`
                  width: 100%;
                  
                  border-top: 1px solid;
                  border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
                  border-image-slice: 1;
                  
                  margin: 12px 0 0 0;
                  padding: 20px 0 0 0;
                `}
              >
                
                
                {/* ユーザー情報 - サムネイル画像・ハンドルネームなど */}
                <User
                  imagesAndVideosThumbnailObj={imagesAndVideosThumbnailObj}
                  name={name}
                  userID={userID}
                  status={status}
                  accessDate={accessDate}
                  exp={exp}
                  cardPlayers_id={cardPlayers_id}
                />
                
                
                
                
                {/* Images and Videos */}
                {Object.keys(imagesAndVideosObj).length > 0 &&
                  <div
                    css={css`
                      margin: 12px 0 0 0;
                    `}
                  >
                    
                    <ImageAndVideo
                      // pathArr={[recruitmentThreads_id, 'imagesAndVideosObj']}
                      imagesAndVideosObj={imagesAndVideosObj}
                    />
                    
                  </div>
                }
                
                
                
                
                {/* スレッド */}
                <div
                  css={css`
                    font-size: 14px;
                    line-height: 1.6em;
                    
                    border-left: 4px solid #A4A4A4;
                    margin: 12px 0 24px 0;
                    padding: 8px 0 8px 16px;
                    
                    @media screen and (max-width: 480px) {
                      padding: 8px 0 8px 12px;
                    }
                  `}
                >
                  
                  
                  {/* コメント */}
                  <Paragraph text={comment} />
                  
                  
                  
                  
                  {/* ID & 情報 & 公開設定 */}
                  {/*<Public
                    idsArr={idsArr}
                    publicIDsArr={publicIDsArr}
                    publicInformationsArr={publicInformationsArr}
                    publicSetting={publicSetting}
                  />*/}
                  
                  
                  
                  
                  {/* 募集期間 ＆ 通知方法 */}
                  {(deadlineDate || notification) &&
                    <div
                      css={css`
                        margin: 20px 0 0 0;
                      `}
                    >
                      
                      {/*<DeadlineDate
                        deadlineDate={deadlineDate}
                      />
                      
                      <Notification
                        // pathArr={pathRecruitmentThreadArr}
                        notification={notification}
                      />*/}
                      
                    </div>
                  }
                  
                  
                  
                  
                  {/* Bottom Container */}
                  <div
                    css={css`
                      display: flex;
                      flex-flow: row wrap;
                      margin: 12px 0 0 0;
                    `}
                  >
                    
                    
                    {/* Buttons */}
                    <div
                      css={css`
                        display: flex;
                        flex-flow: row nowrap;
                        margin-left: auto;
                      `}
                    >
                      
                      
                      <Button
                        css={css`
                          && {
                            font-size: 12px;
                            height: 22px;
                            min-width: 54px;
                            min-height: 22px;
                            line-height: 1;
                            padding: 0 3px;
                            
                            @media screen and (max-width: 480px) {
                              min-width: 36px;
                              min-height: 22px;
                            }
                          }
                        `}
                        variant="outlined"
                        href={shareTwitter}
                        target="_blank"
                        disabled={buttonDisabled}
                      >
                        <Avatar
                          css={css`
                            && {
                              width: 16px;
                              height: 16px;
                              line-height: 1;
                              background-color: #1DA1F2;
                              margin: 0 4px 0 0;
                            }
                          `}
                          alt="PlayStation"
                          style={{ 'backgroundColor': '#1DA1F2' }}
                        >
                          <div style={{ 'width': '80%', 'marginTop': '0px' }}>
                            <SimpleIcons name="Twitter" color="white" />
                          </div>
                        </Avatar>
                        シェア
                      </Button>
                      
                      
                      
                      
                      {/* Delete Button */}
                      {editable &&
                        <Button
                          css={css`
                            && {
                              font-size: 12px;
                              height: 22px;
                              min-width: 54px;
                              min-height: 22px;
                              margin: 0 0 0 12px;
                              padding: 0 4px;
                              
                              @media screen and (max-width: 480px) {
                                min-width: 36px;
                                min-height: 22px;
                              }
                            }
                          `}
                          variant="outlined"
                          color="secondary"
                          disabled={buttonDisabled}
                          onClick={
                            buttonDisabled
                              ?
                                () => {}
                              :
                                () => handleDialogOpen({
                                
                                  title: 'スレッド削除',
                                  description: 'スレッドを削除しますか？',
                                  handle: handleDelete,
                                  argumentsObj: {
                                    gameCommunities_id,
                                    recruitmentThreads_id,
                                  },
                                  
                                })
                          }
                        >
                          <IconDelete
                            css={css`
                              && {
                                font-size: 16px;
                                margin: 0 2px 1px 0;
                              }
                            `}
                          />
                          削除
                        </Button>
                      }
                      
                      
                      
                      
                      {/* Edit Button */}
                      {editable &&
                        <Button
                          css={css`
                            && {
                              font-size: 12px;
                              height: 22px;
                              min-width: 54px;
                              min-height: 22px;
                              margin: 0 0 0 12px;
                              padding: 0 4px;
                              
                              @media screen and (max-width: 480px) {
                                min-width: 36px;
                                min-height: 22px;
                              }
                            }
                          `}
                          variant="outlined"
                          color="primary"
                          // onClick={() => handleShowFormRecruitmentThread({
                          //   pathArr: pathRecruitmentThreadEditFormArr,
                          //   recruitmentThreads_id,
                          // })}
                          disabled={buttonDisabled}
                          onClick={() => setShowFormThread(true)}
                        >
                          <IconEdit
                            css={css`
                              && {
                                font-size: 16px;
                                margin: 0 2px 3px 0;
                              }
                            `}
                          />
                          編集
                        </Button>
                      }
                      
                      
                    </div>
                    
                    
                  </div>
                  
                  
                </div>
                
                
                
                
                {/* Form Comment */}
                <div
                  css={css`
                    
                    ${showFormComment
                      ?
                        `
                        border-top: 2px dashed red;
                        ${comments > 0 && 'border-bottom: 2px dashed red;'}
                        `
                      :
                        `
                        border-top: 1px dashed #585858;
                        ${comments > 0 && 'border-bottom: 1px dashed #585858;'}
                        `
                    }
                    
                    @media screen and (max-width: 480px) {
                      border-left: none;
                    }
                  `}
                >
                  
                  
                  {/* Button - Show New Form Comment */}
                  {!showFormComment &&
                    <div
                      css={css`
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: center;
                        
                        ${comments > 0
                          ?
                            `
                            margin: 14px 0;
                            `
                          :
                            `
                            margin: 14px 0 0 0;
                            `
                        }
                      `}
                    >
                      <Button
                        type="submit"
                        variant="outlined"
                        size="small"
                        disabled={buttonDisabled}
                        startIcon={<IconReply />}
                        onClick={() => setShowFormComment(!showFormComment)}
                        // onClick={() => handleEdit({
                        //   pathArr: [...pathRecruitmentCommentNewFormArr, 'showFormComment'],
                        //   value: !showFormComment,
                        // })}
                      >
                        コメント投稿フォーム
                      </Button>
                    </div>
                  }
                  
                  
                  
                  
                  {/* New Form Comment */}
                  {showFormComment &&
                    <div
                      css={css`
                        // border-top: 2px dashed red;
                        // border-bottom: 2px dashed red;
                        border-left: 4px solid #84cacb;
                        
                        ${comments > 0
                          ? `
                            margin: 24px 0;
                            `
                          : `
                            margin: 24px 0 6px 0;
                            `
                        }
                        
                        padding: 0 0 0 16px;
                        
                        @media screen and (max-width: 480px) {
                          border-left: none;
                          
                          padding-left: 0;
                        }
                      `}
                    >
                      
                      <FormComment
                        // pathArr={pathRecruitmentCommentNewFormArr}
                        gameCommunities_id={gameCommunities_id}
                        recruitmentThreads_id={recruitmentThreads_id}
                        publicSettingThread={publicSetting}
                      />
                      
                    </div>
                  }
                  
                  
                </div>
            
                
                
                
                {/* Comment */}
                {/*<RecruitmentComment
                  urlID={urlID}
                  gameCommunities_id={gameCommunities_id}
                  recruitmentThreads_id={recruitmentThreads_id}
                />*/}
                
                
              </div>
            }
            
            
          </AccordionDetails>
        
        
      </Accordion>
      
      
    </Element>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;