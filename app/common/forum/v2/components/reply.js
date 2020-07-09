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
//   Material UI / Icon
// ---------------------------------------------

import IconPublic from '@material-ui/icons/Public';
import IconUpdate from '@material-ui/icons/Update';
import IconDelete from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
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
import GoodButton from 'app/common/good/v2/components/button.js';
import FormReply from 'app/common/forum/v2/components/form-reply.js';


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
 * Reply
 */
const Reply = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    urlID,
    gameCommunities_id,
    userCommunityID,
    userCommunities_id,
    forumThreads_id,
    forumComments_id,
    forumReplies_id,
    enableAnonymity,
    
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
    
    setGameCommunityObj,
    forumCommentsObj,
    forumRepliesObj,
    setForumRepliesObj,
    setReloadForceForumReply,
    
  } = stateGc;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  // const classes = useStyles();
  const intl = useIntl();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [showFormReply, setShowFormReply] = useState(false);
  const [showFormReplyNew, setShowFormReplyNew] = useState(false);
  const [goods, setGoods] = useState(lodashGet(forumCommentsObj, ['dataObj', forumComments_id, 'goods'], 0));
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * 返信を削除する
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {string} forumThreads_id - DB forum-threads _id / スレッドのID
   * @param {string} forumComments_id - DB forum-comments _id / コメントのID
   * @param {string} forumReplies_id - DB forum-comments _id / 返信のID（コメントと返信は同じコレクションなので、コメントのIDと同じもの）
   */
  const handleDelete = async ({
    
    gameCommunities_id,
    userCommunities_id,
    forumThreads_id,
    forumComments_id,
    forumReplies_id,
    
  }) => {
    
    
    try {
      
      
      // ---------------------------------------------
      //   _id が存在しない場合エラー
      // ---------------------------------------------
      
      if ((!gameCommunities_id && !userCommunities_id) || !forumThreads_id || !forumComments_id || !forumReplies_id) {
        throw new CustomError({ errorsArr: [{ code: 'cqD8ikZJ_', messageID: '1YJnibkmh' }] });
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
        forumComments_id,
        forumReplies_id,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        resultObj = await fetchWrapper({
          
          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-comments/delete-reply-gc`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
          
        });
        
      } else if (userCommunities_id) {
        
        resultObj = await fetchWrapper({
          
          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-comments/delete-reply-uc`,
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
      
      const clonedForumRepliesObj = lodashCloneDeep(forumRepliesObj);
      
      // const page = lodashGet(forumRepliesObj, [forumComments_id, 'page'], 1);
      // const arr = lodashGet(forumRepliesObj, [forumComments_id, `page${page}Obj`, 'arr'], []);
      // const newArr = arr.filter(value => value !== forumReplies_id);
      // lodashSet(clonedForumRepliesObj, [forumComments_id, `page${page}Obj`, 'arr'], newArr);
      
      const dataObj = lodashGet(clonedForumRepliesObj, ['dataObj'], {});
      delete dataObj[forumReplies_id];
      
      setForumRepliesObj(clonedForumRepliesObj);
      
      
      // console.log(`
      //   ----- clonedForumRepliesObj -----\n
      //   ${util.inspect(clonedForumRepliesObj, { colors: true, depth: null })}\n
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
      
      setReloadForceForumReply(true);
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      handleSnackbarOpen({
        variant: 'success',
        messageID: 'o4fiADvZR',
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
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/forum/v2/components/reply.js
  // `);
  
  // console.log(chalk`
  //   urlID: {green ${urlID}}
  //   gameCommunities_id: {green ${gameCommunities_id}}
  //   userCommunityID: {green ${userCommunityID}}
  //   userCommunities_id: {green ${userCommunities_id}}
  //   forumThreads_id: {green ${forumThreads_id}}
  //   enableAnonymity: {green ${enableAnonymity}}
  // `);
  
  // console.log(chalk`
  //   page: {green ${page}}
  //   count: {green ${count}}
  //   limit: {green ${limit}}
  // `);
  
  
  
  
  // --------------------------------------------------
  //   dataObj
  // --------------------------------------------------
  
  const dataObj = lodashGet(forumRepliesObj, ['dataObj', forumReplies_id], {});
  
  // console.log(`
  //   ----- dataObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(dataObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  if (Object.keys(dataObj).length === 0) {
    return null;
  }
  
  
  
  
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
  
  let linkHref = '';
  let linkAs = '';
  
  if (urlID) {
    
    linkHref = `/gc/[urlID]/forum/[...slug]?urlID=${urlID}&forumID=${forumReplies_id}`;
    linkAs = `/gc/${urlID}/forum/${forumReplies_id}`;
    
  } else if (userCommunityID) {
    
    linkHref = `/uc/[userCommunityID]/forum/[...slug]?userCommunityID=${userCommunityID}&forumID=${forumReplies_id}`;
    linkAs = `/uc/${userCommunityID}/forum/${forumReplies_id}`;
    
  }
  
  
  // --------------------------------------------------
  //   Reply to
  // --------------------------------------------------
  
  const replyToForumComments_id = lodashGet(dataObj, ['replyToForumComments_id'], '');
  
  let replyToName = lodashGet(dataObj, ['replyToName'], '');
  
  if (!replyToName) {
    replyToName = 'ななしさん';
  }
  
  const replyTo = `${replyToName} | ${replyToForumComments_id}`;
  
  
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
        border-top: 1px dashed #BDBDBD;
        padding: 20px 0 0 0;
        margin: 20px 0 0 0;
      `}
      name={forumReplies_id}
    >
      
      
      {/* Form */}
      {showFormReply &&
        <FormReply
          gameCommunities_id={gameCommunities_id}
          userCommunities_id={userCommunities_id}
          forumThreads_id={forumThreads_id}
          forumComments_id={forumComments_id}
          forumReplies_id={forumReplies_id}
          replyToForumComments_id={replyToForumComments_id}
          enableAnonymity={enableAnonymity}
          setShowFormReply={setShowFormReply}
        />
      }
      
      
      
      
      {/* Replies */}
      {!showFormReply &&
        <React.Fragment>
        {/*<div
          css={css`
            display: flex;
            flex-flow: column nowrap;
            // border-top: 1px dashed #BDBDBD;
            // margin: 20px 0 0 0;
            // padding: 20px 0 0 0;
          `}
        >*/}
          
          
          {/*<div
            css={css`
              border-top: 1px dashed #BDBDBD;
              padding: 12px 0 0 0;
            `}
          >*/}
            
            
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
            
            
            
            
            {/* Reply Container / Left Purple Line */}
            <div
              css={css`
                border-left: 4px solid #A9A9F5;
                margin: 10px 0 0 0;
                padding: 0 0 0 16px;
                
                @media screen and (max-width: 480px) {
                  padding: 0 0 0 12px;
                }
              `}
            >
              
              
              {/* Reply To */}
              {replyToForumComments_id &&
                <div
                  css={css`
                    display: flex;
                    flex-flow: row nowrap;
                    margin: 0 0 12px 0;
                    color: #7401DF;
                  `}
                >
                  <IconReply
                    css={css`
                      && {
                        font-size: 16px;
                        margin: 4px 4px 0 0;
                      }
                    `}
                  />
                  <p>{replyTo}</p>
                </div>
              }
              
              
              
              
              {/* Comment */}
              <Paragraph text={comment} />
              
              
              
              
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
                
                
                {/* Good Button & Updated Date & forumComments_id */}
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
                      type="forumReply"
                      target_id={forumReplies_id}
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
                  
                  
                  
                  
                  {/* forumReplies_id */}
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
                        <a>{forumReplies_id}</a>
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
                          // margin: 4px 8px 0 0;
                        }
                      }
                    `}
                    variant="outlined"
                    disabled={buttonDisabled}
                    onClick={() => setShowFormReplyNew(true)}
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
                            
                              title: '返信削除',
                              description: '返信を削除しますか？',
                              handle: handleDelete,
                              argumentsObj: {
                                gameCommunities_id,
                                userCommunities_id,
                                forumThreads_id,
                                forumComments_id,
                                forumReplies_id,
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
                      onClick={() => setShowFormReply(true)}
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
              {showFormReplyNew &&
                <FormReply
                  gameCommunities_id={gameCommunities_id}
                  userCommunities_id={userCommunities_id}
                  forumThreads_id={forumThreads_id}
                  forumComments_id={forumComments_id}
                  replyToForumComments_id={forumReplies_id}
                  enableAnonymity={enableAnonymity}
                  setShowFormReply={setShowFormReplyNew}
                />
              }
              
              
            </div>
            
            
          {/*</div>*/}
          
          
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
    userCommunityID,
    userCommunities_id,
    forumThreads_id,
    forumComments_id,
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
    // handleDialogOpen,
    // handleLoadingOpen,
    // handleLoadingClose,
    handleScrollTo,
    
  } = stateLayout;
  
  const {
    
    gameCommunityObj,
    setGameCommunityObj,
    forumThreadsObj,
    forumCommentsObj,
    forumRepliesObj,
    setForumRepliesObj,
    setReloadForceForumComment,
    reloadForceForumReply,
    setReloadForceForumReply,
    
  } = stateGc;
  
  
  
  
  // --------------------------------------------------
  //   Data
  // --------------------------------------------------
  
  /////////////////////
  const updatedDate = lodashGet(gameCommunityObj, ['updatedDateObj', 'forum'], '0000-01-01T00:00:00Z');
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * 返信を読み込む
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {string} forumComments_id - DB forum-comments _id / コメントのID
   * @param {number} page - 返信のページ
   * @param {number} changeLimit - 1ページに表示する件数を変更する場合、値を入力する
   */
  const handleRead = async ({
    
    gameCommunities_id,
    userCommunities_id,
    forumComments_id,
    page,
    changeLimit,
    
  }) => {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const loadedDate = lodashGet(forumRepliesObj, [forumComments_id, `page${page}Obj`, 'loadedDate'], '');
      const arr = lodashGet(forumRepliesObj, [forumComments_id, `page${page}Obj`, 'arr'], []);
      
      // const threadLimit = parseInt((getCookie({ key: 'forumThreadLimit' }) || process.env.NEXT_PUBLIC_FORUM_THREAD_LIMIT), 10);
      const commentLimit = parseInt((getCookie({ key: 'forumCommentLimit' }) || process.env.NEXT_PUBLIC_FORUM_COMMENT_LIMIT), 10);
      let replyLimit = parseInt((getCookie({ key: 'forumReplyLimit' }) || process.env.NEXT_PUBLIC_FORUM_REPLY_LIMIT), 10);
      
      
      
      
      // ---------------------------------------------
      //   Change Limit
      // ---------------------------------------------
      
      if (changeLimit) {
        
        
        replyLimit = changeLimit;
        
        
        // ---------------------------------------------
        //   Set Cookie - forumReplyLimit
        // ---------------------------------------------
        
        Cookies.set('forumReplyLimit', changeLimit);
        
        
      }
      
      
      
      
      // ---------------------------------------------
      //   再読込するかどうか
      // ---------------------------------------------
      
      let reload = false;
      
      
      // ---------------------------------------------
      //   1ページに表示する件数を変更した場合、再読込
      // ---------------------------------------------
      
      if (changeLimit || reloadForceForumReply) {
      // if (changeLimit) {
        
        
        // ---------------------------------------------
        //   次回の読み込み時にコメントを強制リロード
        // ---------------------------------------------
        
        setReloadForceForumComment(true);
        
        
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
        const datetimeForumUpdated = moment(updatedDate).utcOffset(0);
        const datetimeNow = moment().utcOffset(0);
        const datetimeReloadLimit = moment(loadedDate).add(process.env.NEXT_PUBLIC_FORUM_RELOAD_MINUTES, 'm').utcOffset(0);
        
        if (datetimeForumUpdated.isAfter(datetimeLoaded) || datetimeNow.isAfter(datetimeReloadLimit)) {
          reload = true;
        }
        
      }
      
      
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/forum/v2/components/reply.js - handleRead
      // `);
      
      // console.log(chalk`
      //   reloadForceForumReply: {green ${reloadForceForumReply}}
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
        
        const clonedObj = lodashCloneDeep(forumRepliesObj);
        lodashSet(clonedObj, [forumComments_id, 'page'], page);
        setForumRepliesObj(clonedObj);
        
        
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
      //   forumComments_idsArr
      // ---------------------------------------------
      
      let forumComments_idsArr = [forumComments_id];
      
      // 表示件数を変更する場合は他の返信も一緒に更新するため、現在表示されているコメントのIDを取得する
      if (changeLimit) {
        
        const forumThreadsPage = lodashGet(forumThreadsObj, ['page'], 1);
        const forumThreads_idArr = lodashGet(forumThreadsObj, [`page${forumThreadsPage}Obj`, 'arr'], []);
        
        
        forumComments_idsArr = [];
        
        for (let forumThreads_id of forumThreads_idArr.values()) {
          
          const forumCommentsPage = lodashGet(forumCommentsObj, [forumThreads_id, 'page'], 1);
          const tempForumComments_idArr = lodashGet(forumCommentsObj, [forumThreads_id, `page${forumCommentsPage}Obj`, 'arr'], []);
          
          forumComments_idsArr = forumComments_idsArr.concat(tempForumComments_idArr);
          
        }
        
      }
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/forum/v2/components/reply.js - handleRead
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   forumThreads_id: {green ${forumThreads_id}}
      //   forumComments_id: {green ${forumComments_id}}
      //   commentLimit: {green ${commentLimit}}
      //   replyLimit: {green ${replyLimit}}
      // `);
      
      // console.log(`
      //   ----- forumComments_idsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(forumComments_idsArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        userCommunities_id,
        forumComments_idsArr,
        commentPage: 1,
        commentLimit,
        replyPage: page,
        replyLimit,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-comments/read-replies`,
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
      //   Update - forumRepliesObj
      // ---------------------------------------------
      
      const forumRepliesNewObj = lodashGet(resultObj, ['data', 'forumRepliesObj'], {});
      const forumRepliesMergedObj = reload ? forumRepliesNewObj : lodashMerge(forumRepliesObj, forumRepliesNewObj);
      setForumRepliesObj(forumRepliesMergedObj);
      
      
      // ---------------------------------------------
      //   返信の強制リロード解除
      // ---------------------------------------------
      
      setReloadForceForumReply(false);
      
      
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
        
        to: `forumReplies-${forumComments_id}`,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
    }
    
    
  };
  
  
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const page = lodashGet(forumRepliesObj, [forumComments_id, 'page'], 1);
  const count = lodashGet(forumRepliesObj, [forumComments_id, 'count'], 0);
  const limit = parseInt((forumRepliesObj.limit || process.env.NEXT_PUBLIC_FORUM_REPLY_LIMIT), 10);
  const arr = lodashGet(forumRepliesObj, [forumComments_id, `page${page}Obj`, 'arr'], []);
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/forum/v2/components/reply.js
  // `);
  
  // console.log(chalk`
  //   urlID: {green ${urlID}}
  //   gameCommunities_id: {green ${gameCommunities_id}}
  //   userCommunityID: {green ${userCommunityID}}
  //   userCommunities_id: {green ${userCommunities_id}}
  //   forumThreads_id: {green ${forumThreads_id}}
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
  
  for (let forumReplies_id of arr.values()) {
    
    componentArr.push(
      <Reply
        key={forumReplies_id}
        urlID={urlID}
        gameCommunities_id={gameCommunities_id}
        userCommunityID={userCommunityID}
        userCommunities_id={userCommunities_id}
        forumThreads_id={forumThreads_id}
        forumComments_id={forumComments_id}
        forumReplies_id={forumReplies_id}
        enableAnonymity={enableAnonymity}
      />
    );
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Element
      // css={css`
      //   margin: 24px 0 0 0;
      // `}
      name={`forumReplies-${forumComments_id}`}
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
              userCommunities_id,
              forumComments_id,
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
              userCommunities_id,
              forumComments_id,
              page: 1,
              changeLimit: eventObj.target.value,
            })}
            input={
              <OutlinedInput
                classes={{
                  input: classes.input
                }}
                name="forum-replies-pagination"
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