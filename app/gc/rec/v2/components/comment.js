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
import moment from 'moment';
import Cookies from 'js-cookie';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/ja_JP';

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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconPublic from '@material-ui/icons/Public';
import IconUpdate from '@material-ui/icons/Update';
import IconThumbUp from '@material-ui/icons/ThumbUp';
import IconDelete from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
import IconReply from '@material-ui/icons/Reply';


// ---------------------------------------------
//   Material UI / Color
// ---------------------------------------------

import green from '@material-ui/core/colors/green';


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
import GoodButton from 'app/common/good/v2/components/button.js';

import FormComment from 'app/gc/rec/v2/components/form/comment.js';
import FormReply from 'app/gc/rec/components/form/reply.js';
import Reply from 'app/gc/rec/components/recruitment-reply.js';
import Public from 'app/gc/rec/v2/components/public.js';
import Notification from 'app/gc/rec/v2/components/notification.js';


// ---------------------------------------------
//   Moment Locale
// ---------------------------------------------

moment.locale('ja');






// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const useStyles = makeStyles({
  
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
 * Comment
 */
const Comment = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    index,
    urlID,
    gameCommunities_id,
    recruitmentThreads_id,
    recruitmentComments_id,
    enableAnonymity,
    publicSettingThread,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateLayout = ContainerStateLayout.useContainer();
  const stateGc = ContainerStateGc.useContainer();
  
  const {
    
    ISO8601,
    handleSnackbarOpen,
    handleDialogOpen,
    handleLoadingOpen,
    handleLoadingClose,
    // handleScrollTo,
    
  } = stateLayout;
  
  const {
    
    gameCommunityObj,
    setGameCommunityObj,
    recruitmentThreadsObj,
    setRecruitmentThreadsObj,
    recruitmentCommentsObj,
    setRecruitmentCommentsObj,
    recruitmentRepliesObj,
    setRecruitmentRepliesObj,
    reloadForceRecruitmentComment,
    setReloadForceRecruitmentComment,
    
  } = stateGc;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  // const classes = useStyles();
  const intl = useIntl();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [showFormComment, setShowFormComment] = useState(false);
  const [showFormReply, setShowFormReply] = useState(false);
  const [goods, setGoods] = useState(lodashGet(recruitmentCommentsObj, ['dataObj', recruitmentComments_id, 'goods'], 0));
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * コメントを削除する
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドのID
   * @param {string} recruitmentComments_id - DB recruitment-comments _id / コメントのID
   */
  const handleDelete = async ({
    
    gameCommunities_id,
    userCommunities_id,
    recruitmentThreads_id,
    recruitmentComments_id,
    
  }) => {
    
    
    try {
      
      
      // ---------------------------------------------
      //   _id が存在しない場合エラー
      // ---------------------------------------------
      
      if ((!gameCommunities_id && !userCommunities_id) || !recruitmentThreads_id || !recruitmentComments_id) {
        throw new CustomError({ errorsArr: [{ code: '_quWlqMjb', messageID: '1YJnibkmh' }] });
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
      //   /app/common/recruitment/v2/components/thread.js - handleDelete
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
      // `);
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        userCommunities_id,
        recruitmentThreads_id,
        recruitmentComments_id,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        resultObj = await fetchWrapper({
          
          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/recruitment-comments/delete-comment-gc`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
          
        });
        
      } else if (userCommunities_id) {
        
        resultObj = await fetchWrapper({
          
          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/recruitment-comments/delete-comment-uc`,
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
      
      
      // console.log(`
      //   ----- recruitmentCommentsObj -----\n
      //   ${util.inspect(recruitmentCommentsObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   State 削除
      // ---------------------------------------------
      
      const clonedRecruitmentCommentsObj = lodashCloneDeep(recruitmentCommentsObj);
      
      // const page = lodashGet(recruitmentCommentsObj, [recruitmentThreads_id, 'page'], 1);
      // const arr = lodashGet(recruitmentCommentsObj, [recruitmentThreads_id, `page${page}Obj`, 'arr'], []);
      // const newArr = arr.filter(value => value !== recruitmentComments_id);
      // lodashSet(clonedRecruitmentCommentsObj, [recruitmentThreads_id, `page${page}Obj`, 'arr'], newArr);
      
      const dataObj = lodashGet(clonedRecruitmentCommentsObj, ['dataObj'], {});
      delete dataObj[recruitmentComments_id];
      
      setRecruitmentCommentsObj(clonedRecruitmentCommentsObj);
      // setRecruitmentCommentsObj({ dataObj: {}, limit: 1 });
      
      
      // console.log(`
      //   ----- clonedRecruitmentCommentsObj -----\n
      //   ${util.inspect(clonedRecruitmentCommentsObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Game Community データ更新
      // ---------------------------------------------
      
      const gameCommunityObj = lodashGet(resultObj, ['data', 'gameCommunityObj'], {});
      setGameCommunityObj(gameCommunityObj);
      
      
      // ---------------------------------------------
      //   次回の読み込み時に強制リロード
      // ---------------------------------------------
      
      setReloadForceRecruitmentComment(true);
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      handleSnackbarOpen({
        variant: 'success',
        messageID: 'GERzvKtUN',
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
  //   dataObj
  // --------------------------------------------------
  
  const dataObj = lodashGet(recruitmentCommentsObj, ['dataObj', recruitmentComments_id], {});
  
  // console.log(`
  //   ----- dataObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(dataObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  if (Object.keys(dataObj).length === 0) {
    return null;
  }
  
  
  
  
  // --------------------------------------------------
  //   storeGcRecruitment
  // --------------------------------------------------
  
  // const {
    
  //   dataObj,
  //   handleEdit,
  //   handleReadRecruitmentComments,
  //   handleShowFormRecruitmentComment,
  //   handleShowDeleteDialog,
    
  // } = storeGcRecruitment;
  
  
  // // --------------------------------------------------
  // //   storeGood
  // // --------------------------------------------------
  
  // const {
    
  //   handleSubmitGood,
    
  // } = storeGood;
  
  
  
  
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
  //   Comment
  // --------------------------------------------------
  
  const comment = lodashGet(dataObj, ['comment'], '');
  
  
  // --------------------------------------------------
  //   Images and Videos
  // --------------------------------------------------
  
  const imagesAndVideosObj = lodashGet(dataObj, ['imagesAndVideosObj'], {});
  
  
  // --------------------------------------------------
  //   Datetime
  // --------------------------------------------------
  
  let datetimeCurrent = ISO8601;
  const datetimeUpdated = moment(dataObj.updatedDate);
  
  if (datetimeUpdated.isAfter(datetimeCurrent)) {
    datetimeCurrent = datetimeUpdated;
  }
  
  const datetimeFrom = datetimeUpdated.from(datetimeCurrent);
  
  
  // --------------------------------------------------
  //   Link
  // --------------------------------------------------
  
  const linkHref = `/gc/[urlID]/rec/[...slug]?urlID=${urlID}&recruitmentID=${recruitmentComments_id}`;
  const linkAs = `/gc/${urlID}/rec/${recruitmentComments_id}`;
  
  
  // --------------------------------------------------
  //   ID & Information
  // --------------------------------------------------
  
  const idsArr = lodashGet(dataObj, ['idsArr'], []);
  const publicIDsArr = lodashGet(dataObj, ['publicIDsArr'], []);
  const publicInformationsArr = lodashGet(dataObj, ['publicInformationsArr'], []);
  const publicSetting = lodashGet(dataObj, ['publicSetting'], 1);
  
  
  // --------------------------------------------------
  //   Notification
  // --------------------------------------------------
  
  const notification = lodashGet(dataObj, ['notification'], '');
  
  
  // --------------------------------------------------
  //   編集権限 - 編集ボタンを表示する
  // --------------------------------------------------
  
  const editable = lodashGet(dataObj, ['editable'], false);
  
  
  
  
  // --------------------------------------------------
  //   Component
  // --------------------------------------------------
  
  return (
    <Element
      css={css`
        ${index === 0 || showFormComment
          ?
            `
            border-top: none;
            border-bottom: none;
            `
          :
            `
            border-top: 1px solid;
            border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
            border-image-slice: 1;
            `
        }
      `}
      name={recruitmentComments_id}
    >
      
      
      {/* Comment - Edit Form */}
      {showFormComment &&
        <div
          css={css`
            ${showFormComment
              ?
                `
                border-top: 2px dashed red;
                border-bottom: 2px dashed red;
                `
              :
                `
                border-top: 1px solid;
                border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
                border-image-slice: 1;
                `
            }
              
            margin: 24px 0;
            padding: 24px 0 24px 0;
          `}
        >
          
          <div
            css={css`
              border-left: 4px solid #84cacb;
              padding: 6px 0 6px 16px;
              
              @media screen and (max-width: 480px) {
                border-left: none;
                padding-left: 0;
              }
            `}
          >
            
            <FormComment
              gameCommunities_id={gameCommunities_id}
              recruitmentThreads_id={recruitmentThreads_id}
              recruitmentComments_id={recruitmentComments_id}
              enableAnonymity={enableAnonymity}
              publicSettingThread={publicSettingThread}
              setShowForm={setShowFormComment}
            />
            
          </div>
          
        </div>
      }
      
      
      
      
      {/* Comments & Replies */}
      {!showFormComment &&
        <React.Fragment>
          
          
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
                imagesAndVideosObj={imagesAndVideosObj}
              />
              
            </div>
          }
          
          
          
          
          {/* Comment Container / Left Green Line */}
          <div
            css={css`
              border-left: 4px solid #84cacb;
              margin: 12px 0;
              padding: 8px 0 8px 16px;
              
              @media screen and (max-width: 480px) {
                padding: 0 0 0 12px;
              }
            `}
          >
            
            
            {/* Comment */}
            <Paragraph text={comment} />
            
            
            
            
            {/* ID & 情報 & 公開設定 */}
            <Public
              idsArr={idsArr}
              publicIDsArr={publicIDsArr}
              publicInformationsArr={publicInformationsArr}
              publicSetting={publicSetting}
            />
            
            
            
            
            {/* 通知方法 */}
            {notification &&
              <div
                css={css`
                  margin: 20px 0 8px 0;
                `}
              >
                
                <Notification
                  notification={notification}
                />
                
              </div>
            }
            
            
            
            
            {/* Bottom Container */}
            <div
              css={css`
                display: flex;
                flex-flow: row wrap;
                margin: 12px 0 0 0;
                
                @media screen and (max-width: 480px) {
                  flex-flow: column wrap;
                }
              `}
            >
              
              
              {/* Good Button & Updated Date & recruitmentComments_id */}
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                `}
              >
                
                
                {/* Good Button */}
                <div
                  css={css`
                    && {
                      margin: 2px 12px 0 0;
                      
                      @media screen and (max-width: 480px) {
                        margin: 2px 8px 0 0;
                      }
                    }
                  `}
                >
                  
                  <GoodButton
                    goods={goods}
                    setGoods={setGoods}
                    type="recruitmentComment"
                    target_id={recruitmentComments_id}
                  />
                  
                </div>
                
                
                
                
                {/* Updated Date */}
                <div
                  css={css`
                    display: flex;
                    flex-flow: row nowrap;
                    margin: 4px 12px 0 0;
                    
                    @media screen and (max-width: 480px) {
                      margin: 4px 8px 0 0;
                    }
                  `}
                >
                  <IconUpdate
                    css={css`
                      && {
                        font-size: 22px;
                        margin: 0 2px 0 0;
                      }
                    `}
                  />
                  
                  <div
                    css={css`
                      font-size: 12px;
                      margin: 1px 0 0 0;
                    `}
                  >
                    {datetimeFrom}
                  </div>
                </div>
                
                
                
                
                {/* recruitmentComments_id */}
                <div
                  css={css`
                    display: flex;
                    flex-flow: row nowrap;
                    margin: 1px 0 0 0;
                  `}
                >
                  <IconPublic
                    css={css`
                      && {
                        font-size: 20px;
                        margin: 3px 2px 0 0;
                      }
                    `}
                  />
                  <div
                    css={css`
                      font-size: 12px;
                      color: #009933;
                      margin: 4px 0 0 0;
                    `}
                  >
                    <Link href={linkHref} as={linkAs}>
                      <a>{recruitmentComments_id}</a>
                    </Link>
                  </div>
                </div>
                
              </div>
              
              
              
              
              {/* Buttons */}
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                  margin-left: auto;
                  
                  @media screen and (max-width: 480px) {
                    margin-top: 12px;
                  }
                `}
              >
                
                
                {/* Reply Button */}
                <Button
                  css={css`
                    && {
                      font-size: 12px;
                      height: 22px;
                      min-width: 54px;
                      min-height: 22px;
                      // margin: 4px 12px 0 0;
                      padding: 0 3px;
                      
                      @media screen and (max-width: 480px) {
                        min-width: 36px;
                        min-height: 22px;
                      }
                    }
                  `}
                  variant="outlined"
                  disabled={buttonDisabled}
                  onClick={() => setShowFormReply(true)}
                >
                  <IconReply
                    css={css`
                      && {
                        font-size: 16px;
                        margin: 0 1px 3px 0;
                      }
                    `}
                  />
                  返信
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
                          
                            title: 'コメント削除',
                            description: 'コメントを削除しますか？',
                            handle: handleDelete,
                            argumentsObj: {
                              gameCommunities_id,
                              recruitmentThreads_id,
                              recruitmentComments_id,
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
                    disabled={buttonDisabled}
                    onClick={() => setShowFormComment(true)}
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
            
            
            
            
            {/* Form Reply */}
            {showFormReply &&
              <div
                css={css`
                  margin: 6px 0 0 0;
                `}
              >
                
                {/*<FormReply
                  gameCommunities_id={gameCommunities_id}
                  recruitmentThreads_id={recruitmentThreads_id}
                  recruitmentComments_id={recruitmentComments_id}
                  enableAnonymity={enableAnonymity}
                  setShowFormReply={setShowFormReply}
                />*/}
                
              </div>
            }
            
            
            
            
            {/* Reply */}
            {/*<Reply
              urlID={urlID}
              gameCommunities_id={gameCommunities_id}
              recruitmentThreads_id={recruitmentThreads_id}
              recruitmentComments_id={recruitmentComments_id}
              enableAnonymity={enableAnonymity}
            />*/}
            
            
          </div>
        
        
        </React.Fragment>
      }
    
    
    </Element>
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
    
    urlID,
    gameCommunities_id,
    recruitmentThreads_id,
    enableAnonymity,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const classes = useStyles();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateLayout = ContainerStateLayout.useContainer();
  const stateGc = ContainerStateGc.useContainer();
  
  const {
    
    ISO8601,
    handleSnackbarOpen,
    handleScrollTo,
    
  } = stateLayout;
  
  const {
    
    gameCommunityObj,
    setGameCommunityObj,
    recruitmentThreadsObj,
    setRecruitmentThreadsObj,
    recruitmentCommentsObj,
    setRecruitmentCommentsObj,
    recruitmentRepliesObj,
    setRecruitmentRepliesObj,
    reloadForceRecruitmentComment,
    setReloadForceRecruitmentComment,
    
  } = stateGc;
  
  
  
  
  // --------------------------------------------------
  //   Data
  // --------------------------------------------------
  
  const updatedDate = lodashGet(gameCommunityObj, ['updatedDateObj', 'recruitment'], '0000-01-01T00:00:00Z');
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * コメントを読み込む
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
   * @param {string} recruitmentThreads_id - DB recruitment-threads _id / スレッドID
   * @param {number} page - コメントのページ
   * @param {number} changeLimit - 1ページに表示する件数を変更する場合、値を入力する
   */
  const handleRead = async ({
    
    gameCommunities_id,
    recruitmentThreads_id,
    page,
    changeLimit,
    
  }) => {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const loadedDate = lodashGet(recruitmentCommentsObj, [recruitmentThreads_id, `page${page}Obj`, 'loadedDate'], '');
      const arr = lodashGet(recruitmentCommentsObj, [recruitmentThreads_id, `page${page}Obj`, 'arr'], []);
      
      const threadLimit = parseInt((getCookie({ key: 'recruitmentThreadLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT), 10);
      let commentLimit = parseInt((getCookie({ key: 'recruitmentCommentLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT), 10);
      const replyLimit = parseInt((getCookie({ key: 'recruitmentReplyLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT), 10);
      
      
      
      
      // ---------------------------------------------
      //   Change Limit
      // ---------------------------------------------
      
      if (changeLimit) {
        
        
        commentLimit = changeLimit;
        
        
        // ---------------------------------------------
        //   Set Cookie - recruitmentCommentLimit
        // ---------------------------------------------
        
        Cookies.set('recruitmentCommentLimit', changeLimit);
        
        
      }
      
      
      
      
      // ---------------------------------------------
      //   再読込するかどうか
      // ---------------------------------------------
      
      let reload = false;
      
      
      // ---------------------------------------------
      //   1ページに表示する件数を変更した場合、再読込
      // ---------------------------------------------
      
      if (changeLimit || reloadForceRecruitmentComment) {
        
        
        // ---------------------------------------------
        //   次回の読み込み時に強制リロード
        // ---------------------------------------------
        
        // setReloadForceRecruitmentComment(true);
        
        
        // ---------------------------------------------
        //   再読込
        // ---------------------------------------------
        
        reload = true;
        
      
      // ---------------------------------------------
      //   最後の読み込み以降にフォーラムの更新があった場合
      //   または最後の読み込みからある程度時間（10分）が経っていた場合、再読込する
      // ---------------------------------------------
        
      } else if (loadedDate) {
        
        const datetimeLoaded = moment(loadedDate).utcOffset(0);
        const datetimeRecruitmentUpdated = moment(updatedDate).utcOffset(0);
        const datetimeNow = moment().utcOffset(0);
        const datetimeReloadLimit = moment(loadedDate).add(process.env.NEXT_PUBLIC_RECRUITMENT_RELOAD_MINUTES, 'm').utcOffset(0);
        
        if (datetimeRecruitmentUpdated.isAfter(datetimeLoaded) || datetimeNow.isAfter(datetimeReloadLimit)) {
          reload = true;
        }
        
      }
      
      // console.log(chalk`
      //   reload: {green ${reload}}
      // `);
      
      // console.log(`
      //   ----- arr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   すでにデータを読み込んでいる場合は、ストアのデータを表示する
      // ---------------------------------------------
      
      if (!reload && arr.length > 0) {
        
        console.log('store');
        
        
        // ---------------------------------------------
        //   Set Page
        // ---------------------------------------------
        
        const clonedObj = lodashCloneDeep(recruitmentCommentsObj);
        lodashSet(clonedObj, [recruitmentThreads_id, 'page'], page);
        setRecruitmentCommentsObj(clonedObj);
        
        
        // ---------------------------------------------
        //   Return
        // ---------------------------------------------
        
        return;
        
        
      }
      
      console.log('fetch');
      
      
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      setButtonDisabled(true);
      
      
      
      
      // ---------------------------------------------
      //   recruitmentThreads_idArr
      // ---------------------------------------------
      
      let recruitmentThreads_idArr = [recruitmentThreads_id];
      
      // 表示件数を変更する場合は他のスレッドも一緒に更新するため、現在表示されているスレッドのIDを取得する
      if (changeLimit) {
        
        const recruitmentThreadsPage = lodashGet(recruitmentThreadsObj, ['page'], 1);
        recruitmentThreads_idArr = lodashGet(recruitmentThreadsObj, [`page${recruitmentThreadsPage}Obj`, 'arr'], []);
        
      }
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/recruitment/v2/components/comment.js - handleRead
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
      // `);
      
      // console.log(`
      //   ----- recruitmentThreads_idArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(recruitmentThreads_idArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        recruitmentThreads_idArr,
        threadPage: 1,
        threadLimit,
        commentPage: page,
        commentLimit,
        replyPage: 1,
        replyLimit,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/recruitment-comments/read-comments`,
        methodType: 'POST',
        formData: JSON.stringify(formDataObj),
        
      });
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   Update - gameCommunityObj
      // ---------------------------------------------
      
      const gameCommunityObj = lodashGet(resultObj, ['data', 'gameCommunityObj'], {});
      setGameCommunityObj(gameCommunityObj);
      
      
      // ---------------------------------------------
      //   Update - recruitmentThreadsObj - dataObj / [データオブジェクトのみ]
      //   再読込する場合は新しいデータに置き換える、再読込しない場合は古いデータと新しいデータをマージする
      // ---------------------------------------------
      
      const clonedRecruitmentThreadsObj = lodashCloneDeep(recruitmentThreadsObj);
      
      const recruitmentThreadsOldDataObj = lodashGet(recruitmentThreadsObj, ['dataObj'], {});
      const recruitmentThreadsNewDataObj = lodashGet(resultObj, ['data', 'recruitmentThreadsObj', 'dataObj'], {});
      clonedRecruitmentThreadsObj.dataObj = lodashMerge(recruitmentThreadsOldDataObj, recruitmentThreadsNewDataObj);
      
      setRecruitmentThreadsObj(clonedRecruitmentThreadsObj);
      
      
      // console.log(`
      //   ----- recruitmentThreadsOldDataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(recruitmentThreadsOldDataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- recruitmentThreadsNewDataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(recruitmentThreadsNewDataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- clonedRecruitmentThreadsObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(clonedRecruitmentThreadsObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Update - recruitmentCommentsObj
      // ---------------------------------------------
      
      const recruitmentCommentsNewObj = lodashGet(resultObj, ['data', 'recruitmentCommentsObj'], {});
      const recruitmentCommentsMergedObj = reload ? recruitmentCommentsNewObj : lodashMerge(recruitmentCommentsObj, recruitmentCommentsNewObj);
      setRecruitmentCommentsObj(recruitmentCommentsMergedObj);
      
      
      // ---------------------------------------------
      //   Update - recruitmentRepliesObj
      // ---------------------------------------------
      
      const recruitmentRepliesNewObj = lodashGet(resultObj, ['data', 'recruitmentRepliesObj'], {});
      const recruitmentRepliesMergedObj = reload ? recruitmentRepliesNewObj : lodashMerge(recruitmentRepliesObj, recruitmentRepliesNewObj);
      setRecruitmentRepliesObj(recruitmentRepliesMergedObj);
      
      
      // ---------------------------------------------
      //   コメントの強制リロード解除
      // ---------------------------------------------
      
      setReloadForceRecruitmentComment(false);
      
      
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
      //   Scroll To
      // ---------------------------------------------
      
      handleScrollTo({
        
        to: `recruitmentComments-${recruitmentThreads_id}`,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
    }
    
    
  };
  
  
  
  
  // --------------------------------------------------
  //   Thread
  // --------------------------------------------------
  
  const publicSettingThread = lodashGet(recruitmentThreadsObj, ['dataObj', recruitmentThreads_id, 'publicSetting'], 1);
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const page = lodashGet(recruitmentCommentsObj, [recruitmentThreads_id, 'page'], 1);
  const count = lodashGet(recruitmentCommentsObj, [recruitmentThreads_id, 'count'], 0);
  const limit = parseInt((recruitmentCommentsObj.limit || process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT), 10);
  const arr = lodashGet(recruitmentCommentsObj, [recruitmentThreads_id, `page${page}Obj`, 'arr'], []);
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/gc/rec/v2/components/comment.js
  // `);
  
  // console.log(chalk`
  //   urlID: {green ${urlID}}
  //   gameCommunities_id: {green ${gameCommunities_id}}
  //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
  //   enableAnonymity: {green ${enableAnonymity}}
  // `);
  
  // console.log(chalk`
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
  //   配列が空の場合は、空のコンポーネントを返す
  // --------------------------------------------------
  
  if (arr.length === 0) {
    return null;
  }
  
  
  
  
  // --------------------------------------------------
  //   Component - Comment & Reply
  // --------------------------------------------------
  
  const componentArr = [];
  
  for (const [index, recruitmentComments_id] of arr.entries()) {
  // for (let recruitmentComments_id of arr.values()) {
    
    componentArr.push(
      <Comment
        key={recruitmentComments_id}
        index={index}
        urlID={urlID}
        gameCommunities_id={gameCommunities_id}
        recruitmentThreads_id={recruitmentThreads_id}
        recruitmentComments_id={recruitmentComments_id}
        enableAnonymity={enableAnonymity}
        publicSettingThread={publicSettingThread}
      />
    );
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Element
      css={css`
        margin: 24px 0 0 0;
      `}
      name={`recruitmentComments-${recruitmentThreads_id}`}
    >
      
      
      {componentArr}
      
      
      
      
      {/* Pagination */}
      <div
        css={css`
          display: flex;
          flex-flow: row wrap;
          
          border-top: 1px solid;
          border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
          border-image-slice: 1;
          
          padding: 16px 0 0 0;
          margin: 24px 24px 0 0;
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
            onChange={() => {}}
            onChange={(page) => handleRead({
              gameCommunities_id,
              recruitmentThreads_id,
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
            onChange={() => {}}
            onChange={(eventObj) => handleRead({
              gameCommunities_id,
              recruitmentThreads_id,
              page: 1,
              changeLimit: eventObj.target.value,
            })}
            input={
              <OutlinedInput
                classes={{
                  input: classes.input
                }}
                name="recruitment-comments-pagination"
              />
            }
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
          
        </FormControl>
        
        
      </div>
      
      
    </Element>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;