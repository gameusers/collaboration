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
import FormComment from 'app/common/forum/v2/components/form-comment.js';
// import Reply from './reply';
// import FormReply from './form-reply';


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
 * 
 */
const Comment = (props) => {
  
  
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
    
    page,
    count,
    limit,
    
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
    // forumThreadsObj,
    // setForumThreadsObj,
    forumCommentsObj,
    setForumCommentsObj,
    
  } = stateGc;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const classes = useStyles();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [showFormComment, setShowFormComment] = useState(false);
  const [showFormReply, setShowFormReply] = useState(false);
  
  const [goods, setGoods] = useState(lodashGet(forumCommentsObj, ['dataObj', forumComments_id, 'goods'], 0));
  
  
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
   * @param {string} forumThreads_id - DB forum-threads _id / スレッドのID
   * @param {string} forumComments_id - DB forum-comments _id / コメントのID
   */
  const handleDelete = async ({
    
    gameCommunities_id,
    userCommunities_id,
    forumThreads_id,
    forumComments_id,
    
  }) => {
    
    
    try {
      
      
      // ---------------------------------------------
      //   _id が存在しない場合エラー
      // ---------------------------------------------
      
      if ((!gameCommunities_id && !userCommunities_id) || !forumThreads_id || !forumComments_id) {
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
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        resultObj = await fetchWrapper({
          
          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-comments/delete-comment-gc`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
          
        });
        
      } else if (userCommunities_id) {
        
        resultObj = await fetchWrapper({
          
          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-comments/delete-comment-uc`,
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
      //   ----- forumCommentsObj -----\n
      //   ${util.inspect(forumCommentsObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   State 削除
      // ---------------------------------------------
      
      const clonedForumCommentsObj = lodashCloneDeep(forumCommentsObj);
      
      const page = lodashGet(forumCommentsObj, [forumThreads_id, 'page'], 1);
      const arr = lodashGet(forumCommentsObj, [forumThreads_id, `page${page}Obj`, 'arr'], []);
      const newArr = arr.filter(value => value !== forumComments_id);
      lodashSet(clonedForumCommentsObj, [forumThreads_id, `page${page}Obj`, 'arr'], newArr);
      
      const dataObj = lodashGet(clonedForumCommentsObj, ['dataObj'], {});
      delete dataObj[forumComments_id];
      
      setForumCommentsObj(clonedForumCommentsObj);
      // setForumCommentsObj({ dataObj: {}, limit: 1 });
      
      
      // console.log(`
      //   ----- clonedForumCommentsObj -----\n
      //   ${util.inspect(clonedForumCommentsObj, { colors: true, depth: null })}\n
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
  //   handleShowFormComment,
  //   handleReadComments,
    
  // } = storeForum;
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/forum/v2/components/comment.js
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
  
  const dataObj = lodashGet(forumCommentsObj, ['dataObj', forumComments_id], {});
  
  // console.log(`
  //   ----- dataObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(dataObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
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
  //   Good
  // --------------------------------------------------
  
  // const goods = lodashGet(dataObj, ['goods'], 0);
  
  
  // --------------------------------------------------
  //   Replies
  // --------------------------------------------------
  
  const replies = lodashGet(dataObj, ['replies'], 0);
  
  
  // --------------------------------------------------
  //   Link
  // --------------------------------------------------
  
  let linkHref = '';
  let linkAs = '';
  
  if (urlID) {
    
    linkHref = `/gc/[urlID]/forum/[forumID]?urlID=${urlID}&forumID=${forumComments_id}`;
    linkAs = `/gc/${urlID}/forum/${forumComments_id}`;
    
  } else if (userCommunityID) {
    
    linkHref = `/uc/[userCommunityID]/forum/[forumID]?userCommunityID=${userCommunityID}&forumID=${forumComments_id}`;
    linkAs = `/uc/${userCommunityID}/forum/${forumComments_id}`;
    
  }
  
  
  // --------------------------------------------------
  //   編集権限 - 編集ボタンを表示する
  // --------------------------------------------------
  
  const editable = lodashGet(dataObj, ['editable'], false);
  
  
  
  
  // --------------------------------------------------
  //   Component - Form Comment
  // --------------------------------------------------
  
  return (
    <Element
      css={css`
        border-top: 1px solid;
        border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
        border-image-slice: 1;
        padding: 24px 0 0 0;
        margin: 24px 0 0 0;
      `}
      name={forumComments_id}
    >
      
      
      {/* Form */}
      {showFormComment &&
        <div
          css={css`
            width: 100%;
          `}
        >
          
          <FormComment
            gameCommunities_id={gameCommunities_id}
            userCommunities_id={userCommunities_id}
            forumThreads_id={forumThreads_id}
            forumComments_id={forumComments_id}
            enableAnonymity={enableAnonymity}
          />
          
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
                    type="forumComment"
                    target_id={forumComments_id}
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
                
                
                
                
                {/* forumComments_id */}
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
                      <a>{forumComments_id}</a>
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
                  // onClick={() => handleEdit({
                  //   pathArr: [forumComments_id, 'formReplyObj', 'show'],
                  //   value: !showFormReply
                  // })}
                >
                  <IconReply
                    css={css`
                      && {
                        font-size: 16px;
                        margin: 0 1px 3px 0;
                        
                        // @media screen and (max-width: 480px) {
                        //   display: none;
                        // }
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
                              userCommunities_id,
                              forumThreads_id,
                              forumComments_id,
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
                    // onClick={() => handleShowFormComment({
                    //   pathArr: this.pathArr,
                    //   forumComments_id,
                    // })}
                  >
                    <IconEdit
                      css={css`
                        && {
                          font-size: 16px;
                          margin: 0 2px 3px 0;
                          
                          // @media screen and (max-width: 480px) {
                          //   display: none;
                          // }
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
                
                <FormReply
                  gameCommunities_id={gameCommunities_id}
                  userCommunities_id={userCommunities_id}
                  forumThreads_id={forumThreads_id}
                  forumComments_id={forumComments_id}
                  enableAnonymity={enableAnonymity}
                />
                
              </div>
            }
            
            
            
            
            {/* Reply */}
            {/*<Reply
              urlID={urlID}
              gameCommunities_id={gameCommunities_id}
              userCommunityID={userCommunityID}
              userCommunities_id={userCommunities_id}
              forumThreads_id={forumThreads_id}
              forumComments_id={forumComments_id}
              replies={replies}
              enableAnonymity={enableAnonymity}
            />*/}
            
            
          </div>
        
        
        </React.Fragment>
      }
    
    
    </Element>
  );
  
  
  
  // // --------------------------------------------------
  // //   Return
  // // --------------------------------------------------
  
  // return (
  //   <Element
  //     css={css`
  //       margin: 24px 0 0 0;
  //       padding: 0 0 0 0;
  //       // background-color: pink;
  //     `}
  //     name={`forumComments-${forumThreads_id}`}
  //   >
      
      
  //     {componentArr}
      
      
  //     {/* Pagination */}
  //     <div
  //       css={css`
  //         display: flex;
  //         flex-flow: row wrap;
          
  //         border-top: 1px solid;
  //         border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
  //         border-image-slice: 1;
          
  //         padding: 16px 0 0 0;
  //         margin: 24px 24px 0 0;
  //       `}
  //     >
        
        
  //       {/* Pagination */}
  //       <div
  //         css={css`
  //           margin: 8px 24px 0 0;
  //         `}
  //       >
  //         <Pagination
  //           disabled={buttonDisabled}
  //           onChange={(page) => handleReadComments({
  //             pathArr: this.pathArr,
  //             gameCommunities_id,
  //             userCommunities_id,
  //             forumThreads_id,
  //             page,
  //           })}
  //           pageSize={limit}
  //           current={page}
  //           total={count}
  //           locale={localeInfo}
  //         />
  //       </div>
        
        
  //       {/* Rows Per Page */}
  //       <FormControl
  //         css={css`
  //           margin: 8px 0 0 0 !important;
  //         `}
  //         variant="outlined"
  //       >
          
  //         <Select
  //           value={limit}
  //           onChange={(eventObj) => handleReadComments({
  //             pathArr: this.pathArr,
  //             gameCommunities_id,
  //             userCommunities_id,
  //             forumThreads_id,
  //             page: 1,
  //             changeLimit: eventObj.target.value,
  //           })}
  //           input={
  //             <OutlinedInput
  //               classes={{
  //                 input: classes.input
  //               }}
  //               name="forum-comments-pagination"
  //               id="outlined-rows-per-page"
  //             />
  //           }
  //         >
  //           <MenuItem value={1}>1</MenuItem>
  //           <MenuItem value={10}>10</MenuItem>
  //           <MenuItem value={20}>20</MenuItem>
  //           <MenuItem value={50}>50</MenuItem>
  //         </Select>
          
  //       </FormControl>
        
        
  //     </div>
      
      
  //   </Element>
  // );
  
  
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
    enableAnonymity,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const classes = useStyles();
  // const [panelExpanded, setPanelExpanded] = useState(true);
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
    handleLoadingOpen,
    handleLoadingClose,
    // handleScrollTo,
    
  } = stateLayout;
  
  const {
    
    setGameCommunityObj,
    forumThreadsObj,
    setForumThreadsObj,
    forumCommentsObj,
    
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
      
      const page = lodashGet(forumThreadsObj, ['page'], 1);
      const arr = lodashGet(forumThreadsObj, [`page${page}Obj`, 'arr'], []);
      const newArr = arr.filter(value => value !== forumThreads_id);
      lodashSet(clonedForumThreadsObj, [`page${page}Obj`, 'arr'], newArr);
      
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
  //   Property
  // --------------------------------------------------
  
  const page = lodashGet(forumCommentsObj, [forumThreads_id, 'page'], 1);
  const count = lodashGet(forumCommentsObj, [forumThreads_id, 'count'], 0);
  const limit = parseInt((forumCommentsObj.limit || process.env.NEXT_PUBLIC_FORUM_COMMENT_LIMIT), 10);
  const arr = lodashGet(forumCommentsObj, [forumThreads_id, `page${page}Obj`, 'arr'], []);
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/forum/v2/components/comment.js
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
  
  for (let forumComments_id of arr.values()) {
    
    componentArr.push(
      <Comment
        key={forumComments_id}
        urlID={urlID}
        gameCommunities_id={gameCommunities_id}
        userCommunityID={userCommunityID}
        userCommunities_id={userCommunities_id}
        forumThreads_id={forumThreads_id}
        forumComments_id={forumComments_id}
        enableAnonymity={enableAnonymity}
        page={page}
        count={count}
        limit={limit}
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
      name={`forumComments-${forumThreads_id}`}
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
            // onChange={(page) => handleReadComments({
            //   pathArr: this.pathArr,
            //   gameCommunities_id,
            //   userCommunities_id,
            //   forumThreads_id,
            //   page,
            // })}
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
            // onChange={(eventObj) => handleReadComments({
            //   pathArr: this.pathArr,
            //   gameCommunities_id,
            //   userCommunities_id,
            //   forumThreads_id,
            //   page: 1,
            //   changeLimit: eventObj.target.value,
            // })}
            input={
              <OutlinedInput
                classes={{
                  input: classes.input
                }}
                name="forum-comments-pagination"
                // id="outlined-rows-per-page"
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