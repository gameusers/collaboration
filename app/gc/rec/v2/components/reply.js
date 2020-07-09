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
// import IconThumbUp from '@material-ui/icons/ThumbUp';
import IconDelete from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
import IconReply from '@material-ui/icons/Reply';


// ---------------------------------------------
//   Material UI / Color
// ---------------------------------------------

// import green from '@material-ui/core/colors/green';


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

import FormReply from 'app/gc/rec/v2/components/form/reply.js';
// import Reply from 'app/gc/rec/components/recruitment-reply.js';
// import Public from 'app/gc/rec/v2/components/public.js';
// import Notification from 'app/gc/rec/v2/components/notification.js';


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
    recruitmentThreads_id,
    recruitmentComments_id,
    recruitmentReplies_id,
    
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
  
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [showFormNew, setShowFormNew] = useState(false);
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
  
  const dataObj = lodashGet(recruitmentRepliesObj, ['dataObj', recruitmentReplies_id], {});
  
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
  
  const linkHref = `/gc/[urlID]/rec/[...slug]?urlID=${urlID}&recruitmentID=${recruitmentReplies_id}`;
  const linkAs = `/gc/${urlID}/rec/${recruitmentReplies_id}`;
  
  
  // --------------------------------------------------
  //   Reply to
  // --------------------------------------------------
  
  const replyToRecruitmentReplies_id = lodashGet(dataObj, ['replyToRecruitmentReplies_id'], '');
  
  let replyToName = lodashGet(dataObj, ['replyToName'], '');
  
  if (!replyToName) {
    replyToName = 'ななしさん';
  }
  
  const replyTo = `${replyToName} | ${replyToRecruitmentReplies_id}`;
  
  
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
        margin: 20px 0 0 0;
        padding: 20px 0 0 0;
      `}
      name={recruitmentReplies_id}
    >
      
      
      {/* Reply - Edit Form */}
      {showFormEdit &&
        <FormReply
          gameCommunities_id={gameCommunities_id}
          recruitmentThreads_id={recruitmentThreads_id}
          recruitmentComments_id={recruitmentComments_id}
          recruitmentReplies_id={recruitmentReplies_id}
          replyToRecruitmentReplies_id={replyToRecruitmentReplies_id}
          setShowForm={setShowFormEdit}
        />
      }
      
      
      
      
      {/* Reply */}
      {!showFormEdit &&
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
          
          
          
          
          {/* Reply */}
          <div
            css={css`
              border-left: 4px solid #A9A9F5;
              margin: 12px 0;
              padding: 8px 0 8px 16px;
              
              @media screen and (max-width: 480px) {
                padding: 8px 0 8px 12px;
              }
            `}
          >
            
            
            {/* Reply To */}
            {replyToRecruitmentReplies_id &&
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
                    type="recruitmentReply"
                    target_id={recruitmentReplies_id}
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
                
                
                
                
                {/* recruitmentReplies_id */}
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
                      <a>{recruitmentReplies_id}</a>
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
                  onClick={() => setShowFormNew(true)}
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
                              recruitmentThreads_id,
                              recruitmentComments_id,
                              recruitmentReplies_id,
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
                    onClick={() => setShowFormEdit(true)}
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
            
            
            
            
            {/* Reply - New Form */}
            {showFormNew &&
              <div
                css={css`
                  margin: 6px 0 0 0;
                `}
              >
                
                <FormReply
                  gameCommunities_id={gameCommunities_id}
                  recruitmentThreads_id={recruitmentThreads_id}
                  recruitmentComments_id={recruitmentComments_id}
                  replyToRecruitmentReplies_id={recruitmentReplies_id}
                  setShowForm={setShowFormNew}
                />
                
              </div>
            }
            
            
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
    recruitmentComments_id,
    
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
    // setRecruitmentThreadsObj,
    recruitmentCommentsObj,
    // setRecruitmentCommentsObj,
    recruitmentRepliesObj,
    setRecruitmentRepliesObj,
    // reloadForceRecruitmentComment,
    setReloadForceRecruitmentComment,
    
    // setReloadForceRecruitmentReply,
    
  } = stateGc;
  
  
  
  
  // --------------------------------------------------
  //   Data
  // --------------------------------------------------
  
  const updatedDate = lodashGet(gameCommunityObj, ['updatedDateObj', 'recruitment'], '0000-01-01T00:00:00Z');
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * 返信を読み込む
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
   * @param {string} recruitmentComments_id - DB recruitment-comments _id / コメントID
   * @param {number} page - 返信のページ
   * @param {number} changeLimit - 1ページに表示する件数を変更する場合、値を入力する
   */
  const handleRead = async ({
    
    gameCommunities_id,
    recruitmentComments_id,
    page,
    changeLimit,
    
  }) => {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const loadedDate = lodashGet(recruitmentRepliesObj, [recruitmentComments_id, `page${page}Obj`, 'loadedDate'], '');
      const arr = lodashGet(recruitmentRepliesObj, [recruitmentComments_id, `page${page}Obj`, 'arr'], []);
      
      const commentLimit = parseInt((getCookie({ key: 'recruitmentCommentLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT), 10);
      let replyLimit = parseInt((getCookie({ key: 'recruitmentReplyLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT), 10);
      
      
      
      
      // ---------------------------------------------
      //   Change Limit
      // ---------------------------------------------
      
      if (changeLimit) {
        
        
        commentLimit = changeLimit;
        
        
        // ---------------------------------------------
        //   Set Cookie - recruitmentReplyLimit
        // ---------------------------------------------
        
        Cookies.set('recruitmentReplyLimit', changeLimit);
        
        
      }
      
      
      
      
      // ---------------------------------------------
      //   再読込するかどうか
      // ---------------------------------------------
      
      let reload = false;
      
      
      // ---------------------------------------------
      //   1ページに表示する件数を変更した場合、再読込
      // ---------------------------------------------
      
      if (changeLimit) {
        
        
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
        
        const clonedObj = lodashCloneDeep(recruitmentRepliesObj);
        lodashSet(clonedObj, [recruitmentComments_id, 'page'], page);
        setRecruitmentRepliesObj(clonedObj);
        
        
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
      //   recruitmentComments_idsArr
      // ---------------------------------------------
      
      let recruitmentComments_idsArr = [recruitmentComments_id];
      
      // 表示件数を変更する場合は他のコメントも一緒に更新するため、現在表示されているコメントのIDを取得する
      if (changeLimit) {
        
        const recruitmentThreadsPage = lodashGet(recruitmentThreadsObj, ['page'], 1);
        const recruitmentThreads_idsArr = lodashGet(recruitmentThreadsObj, [`page${recruitmentThreadsPage}Obj`, 'arr'], []);
        
        
        recruitmentComments_idsArr = [];
        
        for (let recruitmentThreads_id of recruitmentThreads_idsArr.values()) {
          
          const recruitmentCommentsPage = lodashGet(recruitmentCommentsObj, [recruitmentThreads_id, 'page'], 1);
          const tempRecruitmentComments_idsArr = lodashGet(recruitmentCommentsObj, [recruitmentThreads_id, `page${recruitmentCommentsPage}Obj`, 'arr'], []);
          
          recruitmentComments_idsArr = recruitmentComments_idsArr.concat(tempRecruitmentComments_idsArr);
          
        }
        
      }
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/v2/components/reply.js - handleRead
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   recruitmentComments_id: {green ${recruitmentComments_id}}
      // `);
      
      // console.log(`
      //   ----- recruitmentComments_idsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(recruitmentComments_idsArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        recruitmentComments_idsArr,
        commentPage: 1,
        commentLimit,
        replyPage: page,
        replyLimit,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/recruitment-replies/read-replies`,
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
        
        to: `recruitmentReplies-${recruitmentComments_id}`,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
    }
    
    
  };
  
  
  
  // --------------------------------------------------
  //   storeGcRecruitment
  // --------------------------------------------------
  
  // const {
    
  //   dataObj,
  //   handleEdit,
  //   handleReadRecruitmentReplies,
  //   handleShowFormRecruitmentReply,
  //   handleShowDeleteDialog,
    
  // } = storeGcRecruitment;
  
  
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const page = lodashGet(recruitmentRepliesObj, [recruitmentComments_id, 'page'], 1);
  const count = lodashGet(recruitmentRepliesObj, [recruitmentComments_id, 'count'], 0);
  const limit = parseInt((recruitmentRepliesObj.limit || process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT), 10);
  const arr = lodashGet(recruitmentRepliesObj, [recruitmentComments_id, `page${page}Obj`, 'arr'], []);
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/gc/rec/v2/components/reply.js
  // `);
  
  // console.log(chalk`
  //   urlID: {green ${urlID}}
  //   gameCommunities_id: {green ${gameCommunities_id}}
  //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
  //   recruitmentComments_id: {green ${recruitmentComments_id}}
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
  //   Component - Reply
  // --------------------------------------------------
  
  const componentArr = [];
  
  for (let recruitmentReplies_id of arr.values()) {
    
    componentArr.push(
      <Reply
        key={recruitmentReplies_id}
        urlID={urlID}
        gameCommunities_id={gameCommunities_id}
        recruitmentThreads_id={recruitmentThreads_id}
        recruitmentComments_id={recruitmentComments_id}
        recruitmentReplies_id={recruitmentReplies_id}
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
      name={`recruitmentReplies-${recruitmentComments_id}`}
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
              recruitmentComments_id,
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
              recruitmentComments_id,
              page: 1,
              changeLimit: eventObj.target.value,
            })}
            input={
              <OutlinedInput
                classes={{
                  input: classes.input
                }}
                name="recruitment-replies-pagination"
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