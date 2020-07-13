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
import moment from 'moment';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconHealing from '@material-ui/icons/Healing';
import IconSchedule from '@material-ui/icons/Schedule';
import IconStars from '@material-ui/icons/Stars';
import IconLayers from '@material-ui/icons/Layers';






// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

// ---------------------------------------------
//   Name
// ---------------------------------------------

const cssNameNoColor = css`
  font-size: 14px;
  margin: 0 2px 0 0;
`;


// ---------------------------------------------
//   Level
// ---------------------------------------------

const cssLevelBox = css`
  display: flex;
  flex-flow: row nowrap;
`;

const cssIconStars = css`
  && {
    font-size: 18px;
    margin: 1px 3px 0 0;
  }
`;

const cssLevel = css`
  font-size: 14px;
  margin: 0 6px 0 0;
`;


// ---------------------------------------------
//   Cards
// ---------------------------------------------

const cssButton = css`
  && {
    font-size: 12px;
    height: 22px;
    min-height: 22px;
    margin: 0 6px 0 0;
    padding: 0 6px 0 3px;
  }
`;

const cssIconLayers = css`
  font-size: 16px !important;
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
    
    name,
    userID,
    status,
    accessDate,
    gameName,
    gameUrlID,
    exp,
    cardPlayers_id,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  // const [buttonDisabled, setButtonDisabled] = useState(true);
  
  // const [name, setName] = useState();
  // const [comment, setComment] = useState();
  // const [imagesAndVideosObj, setImagesAndVideosObj] = useState({
    
  //   _id: '',
  //   createdDate: '',
  //   updatedDate: '',
  //   users_id: '',
  //   type: 'forum',
  //   arr: [],
    
  // });
  
  
  // useEffect(() => {
    
  //   setButtonDisabled(false);
    
    
  //   // --------------------------------------------------
  //   //   編集用データを読み込む
  //   // --------------------------------------------------
    
  //   if (forumThreads_id) {
  //     handleGetEditData({ forumThreads_id });
  //   }
    
    
  // }, []);
  
  
  
  
  // // --------------------------------------------------
  // //   States
  // // --------------------------------------------------
  
  // const stateLayout = ContainerStateLayout.useContainer();
  // const stateGc = ContainerStateGc.useContainer();
  
  // const {
    
  //   handleSnackbarOpen,
  //   // handleDialogOpen,
  //   handleLoadingOpen,
  //   handleLoadingClose,
  //   handleScrollTo,
    
  // } = stateLayout;
  
  // const {
    
  //   setGameCommunityObj,
  //   setForumThreadsForListObj,
  //   setForumThreadsObj,
  //   setForumCommentsObj,
  //   setForumRepliesObj,
    
  // } = stateGc;
  
  
  
  
  // // --------------------------------------------------
  // //   Handler
  // // --------------------------------------------------
  
  // /**
  // * 編集用データを読み込む
  // * @param {string} forumThreads_id - DB forum-threads _id / スレッドのID
  // */
  // const handleGetEditData = async ({ forumThreads_id }) => {
    
    
  //   try {
      
      
  //     // ---------------------------------------------
  //     //   forumThreads_id が存在しない場合エラー
  //     // ---------------------------------------------
      
  //     if (!forumThreads_id) {
  //       throw new CustomError({ errorsArr: [{ code: '5bsoal_-V', messageID: 'Error' }] });
  //     }
      
      
      
      
  //     // ---------------------------------------------
  //     //   Loading Open
  //     // ---------------------------------------------
      
  //     handleLoadingOpen({});
      
      
  //     // ---------------------------------------------
  //     //   Button Disable
  //     // ---------------------------------------------
      
  //     setButtonDisabled(true);
      
      
      
      
  //     // ---------------------------------------------
  //     //   FormData
  //     // ---------------------------------------------
      
  //     const formDataObj = {
  //       forumThreads_id,
  //     };
      
      
  //     // ---------------------------------------------
  //     //   Fetch
  //     // ---------------------------------------------
      
  //     const resultObj = await fetchWrapper({
        
  //       urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-threads/get-edit-data`,
  //       methodType: 'POST',
  //       formData: JSON.stringify(formDataObj),
        
  //     });
      
      
  //     // console.log(`
  //     //   ----- resultObj -----\n
  //     //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
      
  //     // ---------------------------------------------
  //     //   Error
  //     // ---------------------------------------------
      
  //     if ('errorsArr' in resultObj) {
  //       throw new CustomError({ errorsArr: resultObj.errorsArr });
  //     }
      
      
      
      
  //     // ---------------------------------------------
  //     //   Set Form Data
  //     // ---------------------------------------------
      
  //     const name = lodashGet(resultObj, ['data', 'name'], '');
  //     const comment = lodashGet(resultObj, ['data', 'comment'], '');
  //     let imagesAndVideosObj = lodashGet(resultObj, ['data', 'imagesAndVideosObj'], {});
      
  //     if (Object.keys(imagesAndVideosObj).length === 0) {
        
  //       imagesAndVideosObj = {
          
  //         _id: '',
  //         createdDate: '',
  //         updatedDate: '',
  //         users_id: '',
  //         type: 'forum',
  //         arr: [],
          
  //       };
        
  //     }
      
  //     setName(name);
  //     setComment(comment);
  //     setImagesAndVideosObj(imagesAndVideosObj);
      
      
  //   } catch (errorObj) {
      
      
  //     // ---------------------------------------------
  //     //   Snackbar: Error
  //     // ---------------------------------------------
      
  //     handleSnackbarOpen({
  //       variant: 'error',
  //       errorObj,
  //     });
      
      
  //   } finally {
      
      
  //     // ---------------------------------------------
  //     //   Button Enable
  //     // ---------------------------------------------
      
  //     setButtonDisabled(false);
      
      
  //     // ---------------------------------------------
  //     //   Loading Close
  //     // ---------------------------------------------
      
  //     handleLoadingClose();
      
      
  //     // ---------------------------------------------
  //     //   Scroll To
  //     // ---------------------------------------------
      
  //     handleScrollTo({
        
  //       to: forumThreads_id,
  //       duration: 0,
  //       delay: 0,
  //       smooth: 'easeInOutQuart',
  //       offset: -50,
        
  //     });
      
      
  //   }
    
    
  // };
  
  
  // /**
  // * スレッド作成・編集フォームを送信する
  // * @param {Object} eventObj - イベント
  // * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
  // * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
  // * @param {string} forumThreads_id - DB forum-threads _id / 編集するスレッドのID
  // */
  // const handleSubmit = async ({
    
  //   eventObj,
  //   gameCommunities_id,
  //   userCommunities_id,
  //   forumThreads_id,
    
  // }) => {
    
    
  //   // ---------------------------------------------
  //   //   フォームの送信処理停止
  //   // ---------------------------------------------
    
  //   eventObj.preventDefault();
    
    
    
  //   // ---------------------------------------------
  //   //   新規投稿時の forumThreads_id
  //   // ---------------------------------------------
    
  //   let newForumThreads_id = '';
    
    
    
    
  //   try {
      
      
  //     // ---------------------------------------------
  //     //   Property
  //     // ---------------------------------------------
      
  //     const threadListLimit = parseInt((getCookie({ key: 'forumThreadListLimit' }) || process.env.NEXT_PUBLIC_FORUM_THREAD_LIST_LIMIT), 10);
  //     const threadLimit = parseInt((getCookie({ key: 'forumThreadLimit' }) || process.env.NEXT_PUBLIC_FORUM_THREAD_LIMIT), 10);
  //     const commentLimit = parseInt((getCookie({ key: 'forumCommentLimit' }) || process.env.NEXT_PUBLIC_FORUM_COMMENT_LIMIT), 10);
  //     const replyLimit = parseInt((getCookie({ key: 'forumReplyLimit' }) || process.env.NEXT_PUBLIC_FORUM_REPLY_LIMIT), 10);
      
      
      
      
  //     // ---------------------------------------------
  //     //   _id が存在しない場合エラー
  //     // ---------------------------------------------
      
  //     if (!gameCommunities_id && !userCommunities_id) {
  //       throw new CustomError({ errorsArr: [{ code: '8319EqfHo', messageID: '1YJnibkmh' }] });
  //     }
      
      
  //     // ---------------------------------------------
  //     //   Validation
  //     // ---------------------------------------------
      
  //     // const validationHandleNameObj = validationForumThreadsName({ value: name });
  //     // const validationForumThreadsCommentObj = validationForumThreadsComment({ value: comment });
      
      
  //     // ---------------------------------------------
  //     //   Validation Error
  //     // ---------------------------------------------
      
  //     if (
        
  //       validationForumThreadsName({ value: name }).error ||
  //       validationForumThreadsComment({ value: comment }).error
        
  //     ) {
        
  //       throw new CustomError({ errorsArr: [{ code: '3NtQODEsb', messageID: 'uwHIKBy7c' }] });
        
  //     }
      
      
      
      
  //     // ---------------------------------------------
  //     //   Loading Open
  //     // ---------------------------------------------
      
  //     handleLoadingOpen({});
      
      
  //     // ---------------------------------------------
  //     //   Button Disable
  //     // ---------------------------------------------
      
  //     setButtonDisabled(true);
      
      
      
      
  //     // ---------------------------------------------
  //     //   console.log
  //     // ---------------------------------------------
      
  //     // console.log(`
  //     //   ----------------------------------------\n
  //     //   /app/common/forum/v2/components/form/thread.js - handleSubmit
  //     // `);
      
  //     // console.log(chalk`
  //     //   gameCommunities_id: {green ${gameCommunities_id}}
  //     //   userCommunities_id: {green ${userCommunities_id}}
  //     //   forumThreads_id: {green ${forumThreads_id}}
  //     //   name: {green ${name}}
  //     //   comment: {green ${comment}}
  //     // `);
      
  //     // console.log(`
  //     //   ----- imagesAndVideosObj -----\n
  //     //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
  //     // return;
      
      
      
      
  //     // ---------------------------------------------
  //     //   FormData
  //     // ---------------------------------------------
      
  //     const formDataObj = {
        
  //       gameCommunities_id,
  //       userCommunities_id,
  //       forumThreads_id,
  //       name,
  //       comment,
  //       threadListLimit,
  //       threadLimit,
  //       commentLimit,
  //       replyLimit,
        
  //     };
      
  //     if (imagesAndVideosObj.arr.length !== 0) {
  //       formDataObj.imagesAndVideosObj = imagesAndVideosObj;
  //     }
      
      
      
      
  //     // ---------------------------------------------
  //     //   Fetch
  //     // ---------------------------------------------
      
  //     let resultObj = {};
      
  //     if (gameCommunities_id) {
        
  //       resultObj = await fetchWrapper({
          
  //         urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-threads/upsert-gc`,
  //         methodType: 'POST',
  //         formData: JSON.stringify(formDataObj),
          
  //       });
        
  //     } else {
        
  //       resultObj = await fetchWrapper({
          
  //         urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-threads/upsert-uc`,
  //         methodType: 'POST',
  //         formData: JSON.stringify(formDataObj),
          
  //       });
        
  //     }
      
      
  //     // console.log(`
  //     //   ----- resultObj -----\n
  //     //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
  //     //   --------------------\n
  //     // `);
      
      
  //     // ---------------------------------------------
  //     //   Error
  //     // ---------------------------------------------
      
  //     if ('errorsArr' in resultObj) {
  //       throw new CustomError({ errorsArr: resultObj.errorsArr });
  //     }
      
      
      
      
  //     // --------------------------------------------------
  //     //   gameCommunityObj
  //     // --------------------------------------------------
      
  //     setGameCommunityObj(lodashGet(resultObj, ['data', 'updatedDateObj'], {}));
      
      
  //     // ---------------------------------------------
  //     //   forumThreadsForListObj
  //     // ---------------------------------------------
      
  //     setForumThreadsForListObj(lodashGet(resultObj, ['data', 'forumThreadsForListObj'], {}));
      
      
  //     // ---------------------------------------------
  //     //   forumThreadsObj
  //     // ---------------------------------------------
      
  //     setForumThreadsObj(lodashGet(resultObj, ['data', 'forumThreadsObj'], {}));
      
      
  //     // ---------------------------------------------
  //     //   forumCommentsObj
  //     // ---------------------------------------------
      
  //     setForumCommentsObj(lodashGet(resultObj, ['data', 'forumCommentsObj'], {}));
      
      
  //     // ---------------------------------------------
  //     //   forumRepliesObj
  //     // ---------------------------------------------
      
  //     setForumRepliesObj(lodashGet(resultObj, ['data', 'forumRepliesObj'], {}));
      
      
      
      
  //     // ---------------------------------------------
  //     //   Close Form & Reset Form
  //     // ---------------------------------------------
      
  //     if (forumThreads_id) {
        
  //       setShowForm(false);
        
  //     } else {
        
  //       setName('');
  //       setComment('');
  //       setImagesAndVideosObj({
          
  //         _id: '',
  //         createdDate: '',
  //         updatedDate: '',
  //         users_id: '',
  //         type: 'forum',
  //         arr: [],
          
  //       });
        
  //     }
      
      
      
      
  //     // ---------------------------------------------
  //     //   新規投稿時の forumThreads_id
  //     // ---------------------------------------------
      
  //     newForumThreads_id = lodashGet(resultObj, ['data', 'forumThreadsObj', 'page1Obj', 'arr', 0], '');
      
  //     // console.log(chalk`
  //     //   forumThreads_id: {green ${forumThreads_id}}
  //     // `);
      
      
      
      
  //     // ---------------------------------------------
  //     //   Snackbar: Success
  //     // ---------------------------------------------
      
  //     handleSnackbarOpen({
  //       variant: 'success',
  //       messageID: forumThreads_id ? 'HINAkcSmJ' : 'pInPmleQh',
  //     });
      
      
  //   } catch (errorObj) {
      
      
  //     // ---------------------------------------------
  //     //   Snackbar: Error
  //     // ---------------------------------------------
      
  //     handleSnackbarOpen({
  //       variant: 'error',
  //       errorObj,
  //     });
      
      
  //   } finally {
      
      
  //     // ---------------------------------------------
  //     //   Button Enable
  //     // ---------------------------------------------
      
  //     setButtonDisabled(false);
      
      
  //     // ---------------------------------------------
  //     //   Loading Close
  //     // ---------------------------------------------
      
  //     handleLoadingClose();
      
      
  //     // ---------------------------------------------
  //     //   Scroll To
  //     // ---------------------------------------------
      
  //     handleScrollTo({
        
  //       to: forumThreads_id || newForumThreads_id || 'forumThreads',
  //       duration: 0,
  //       delay: 0,
  //       smooth: 'easeInOutQuart',
  //       offset: -50,
        
  //     });
      
      
  //   }
    
    
  // };
  
  
  
  
  // --------------------------------------------------
  //   Component - Name
  // --------------------------------------------------
  
  let componentName = '';
  
  if (name && userID) {
    
    componentName =
      <div css={cssNameNoColor}>
        <Link
          href={`/ur/[userID]/index?userID=${userID}`}
          as={`/ur/${userID}`}
        >
          <a>{name}</a>
        </Link>
      </div>
    ;
    
  } else if (name) {
    
    componentName =
      <div css={cssNameNoColor}>
        {name}
      </div>
    ;
    
  } else {
    
    componentName = <div css={cssNameNoColor}>ななしさん</div>;
    
  }
  
  
  // --------------------------------------------------
  //   Component - Status
  // --------------------------------------------------
  
  let componentStatus = '';
  
  if (status) {
    componentStatus =
      <div
        css={css`
          display: flex;
          flex-flow: row wrap;
        `}
      >
        
        <IconHealing
          css={css`
            && {
              font-size: 18px;
              margin: 1px 2px 0 0;
            }
          `}
        />
        
        <div
          css={css`
            font-size: 14px;
            margin: 0 2px 0 0;
          `}
        >
          {status}
        </div>
        
      </div>
    ;
  }
  
  
  // --------------------------------------------------
  //   Component - Access Time
  // --------------------------------------------------
  
  let componentAccessTime = '';
  
  if (accessDate) {
    
    const datetimeNow = moment().utcOffset(0);
    const datetimeAccess = moment(accessDate).utcOffset(0);
    const accessTime = datetimeAccess.from(datetimeNow);
    
    componentAccessTime =
      <div
        css={css`
          display: flex;
          flex-flow: row wrap;
        `}
      >
        
        <IconSchedule
          css={css`
            && {
              font-size: 18px;
              margin: 1px 3px 0 0;
            }
          `}
        />
        
        <div
          css={css`
            font-size: 14px;
            margin: 0 2px 0 0;
          `}
        >
          {accessTime}
        </div>
        
      </div>
    ;
    
  }
  
  
  
  
  // --------------------------------------------------
  //   下段
  // --------------------------------------------------
  
  let componentBottomArr = [];
  
  if (gameName && gameUrlID) {
    
    // componentBottomArr.push(
    //   <div
    //     css={css`
    //       font-size: 14px;
    //     `}
    //     key="gameBox"
    //   >
    //     <Link href={`${process.env.NEXT_PUBLIC_URL_BASE}gc/${gameUrlID}`}>
    //       <a>{gameName}</a>
    //     </Link>
    //   </div>
    // );
    
  } else {
    
    
    // --------------------------------------------------
    //   Component - Level
    // --------------------------------------------------
    
    if (exp) {
      
      const level = Math.floor(exp / 10);
      
      componentBottomArr.push(
        <div css={cssLevelBox} key="levelBox">
          <IconStars css={cssIconStars} />
          <div css={cssLevel}>Lv.{level}</div>
        </div>
      );
      
    } else {
      
      componentBottomArr.push(
        <div css={cssLevelBox} key="levelBox">
          <IconStars css={cssIconStars} />
          <div css={cssLevel}>Lv.0</div>
        </div>
      );
      
    }
    
    
    // --------------------------------------------------
    //   Component - Button / Open Card Player
    // --------------------------------------------------
    
    if (cardPlayers_id) {
      
      componentBottomArr.push(
        <Button
          css={cssButton}
          variant="outlined"
          // onClick={() => handleCardPlayerDialogOpen({ cardPlayers_id })}
          // disabled={buttonDisabled}
          key="cardPlayersButton"
        >
          <IconLayers css={cssIconLayers} />
          Player
        </Button>
      );
      
    }
    
    
    // --------------------------------------------------
    //   Button Card Game
    // --------------------------------------------------
    
    // if (showCardGameButton && cardGames_id) {
      
      
    //   // --------------------------------------------------
    //   //   Button Disable - ロードが終わるまで使用禁止
    //   // --------------------------------------------------
      
    //   let buttonDisabledCardGame = true;
      
    //   if (`${cardGames_id}-card-game` in buttonDisabledObj) {
    //     buttonDisabledCardGame = buttonDisabledObj[`${cardGames_id}-card-game`];
    //   }
      
      
    //   // --------------------------------------------------
    //   //   Component
    //   // --------------------------------------------------
      
    //   componentBottomArr.push(
    //     <Button
    //       css={cssButton}
    //       variant="outlined"
    //       onClick={() => handleCardPlayerDialogOpen('game', cardGames_id)}
    //       disabled={buttonDisabledCardGame}
    //       key="cardGamesButton"
    //     >
    //       <IconLayers css={cssIconLayers} />
    //       Game
    //     </Button>
    //   );
      
    // }
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/forum/v2/components/form/thread.js
  // `);
  
  // console.log(`
  //   ----- imagesAndVideosObj -----\n
  //   ${util.inspect(imagesAndVideosObj, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(`
  //   ----- validationForumThreadsNameObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(validationForumThreadsNameObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(chalk`
  //   forumThreads_id: {green ${forumThreads_id}}
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <div
      css={css`
        display: flex;
        flex-flow: column wrap;
        line-height: 1.6em;
        
        // @media screen and (max-width: 768px) {
        //   flex-flow: row wrap;
        // }
      `}
    >
      
      
      {/* 上段 */}
      <div
        css={css`
          display: flex;
          flex-flow: row wrap;
        `}
      >
        {componentName}
        {componentStatus}
        {componentAccessTime}
      </div>
      
      
      
      
      {/* 下段 */}
      <div
        css={css`
          display: flex;
          flex-flow: row nowrap;
        `}
      >
        {componentBottomArr}
      </div>
      
      
    </div>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;