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
import TextareaAutosize from 'react-autosize-textarea';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateUser } from 'app/@states/user.js';
import { ContainerStateLayout } from 'app/@states/layout.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { CustomError } from 'app/@modules/error/custom.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationHandleName } from 'app/@validations/name.js';
import { validationCardPlayersStatus } from 'app/@database/card-players/validations/status.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

// import FormName from 'app/common/form/v2/components/name.js';
import FormImageAndVideo from 'app/common/image-and-video/v2/components/form.js';






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
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const useStyles = makeStyles({
  
  label: {
    fontSize: 14
  },
  
});






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

const Component = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    cardPlayers_id,
    // users_id,
    setShowForm,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const classes = useStyles();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [name, setName] = useState('');
  const [nameSearch, setNameSearch] = useState(true);
  const [status, setStatus] = useState('');
  const [statusSearch, setStatusSearch] = useState(true);
  const [comment, setComment] = useState('');
  const [commentSearch, setCommentSearch] = useState(true);
  
  const [imagesAndVideosObj, setImagesAndVideosObj] = useState({
    
    _id: '',
    createdDate: '',
    updatedDate: '',
    users_id: '',
    type: 'ur',
    arr: [],
    
  });
  
  const [imagesAndVideosThumbnailObj, setImagesAndVideosThumbnailObj] = useState({
    
    _id: '',
    createdDate: '',
    updatedDate: '',
    users_id: '',
    type: 'ur',
    arr: [],
    
  });
  
  
  useEffect(() => {
    
    
    // --------------------------------------------------
    //   Button Enable
    // --------------------------------------------------
    
    setButtonDisabled(false);
    
    
    // --------------------------------------------------
    //   編集用データを読み込む
    // --------------------------------------------------
    
    if (cardPlayers_id) {
      handleGetEditData();
    }
    
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateUser = ContainerStateUser.useContainer();
  const stateLayout = ContainerStateLayout.useContainer();
  
  const { login, loginUsersObj } = stateUser;
  
  const {
    
    handleSnackbarOpen,
    handleLoadingOpen,
    handleLoadingClose,
    handleScrollTo,
    
  } = stateLayout;
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * 編集用データを読み込む
   */
  const handleGetEditData = async () => {
    
    
    try {
      
      
      // ---------------------------------------------
      //   cardPlayers_id が存在しない場合エラー
      // ---------------------------------------------
      
      if (!cardPlayers_id) {
        throw new CustomError({ errorsArr: [{ code: 'yYI5YlDcS', messageID: 'Error' }] });
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
        
        to: cardPlayers_id,
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        cardPlayers_id,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      const resultObj = await fetchWrapper({
        
        urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/card-players/get-edit-data`,
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
      //   Button Enable
      // ---------------------------------------------
      
      setButtonDisabled(false);
      
      
      // ---------------------------------------------
      //   Set Form Data
      // ---------------------------------------------
      
      // const name = lodashGet(resultObj, ['data', 'name'], '');
      // const anonymity = lodashGet(resultObj, ['data', 'anonymity'], false);
      // const comment = lodashGet(resultObj, ['data', 'comment'], '');
      // let imagesAndVideosObj = lodashGet(resultObj, ['data', 'imagesAndVideosObj'], {});
      
      // if (Object.keys(imagesAndVideosObj).length === 0) {
        
      //   imagesAndVideosObj = {
          
      //     _id: '',
      //     createdDate: '',
      //     updatedDate: '',
      //     users_id: '',
      //     type: 'forum',
      //     arr: [],
          
      //   };
        
      // }
      
      // setName(name);
      // setAnonymity(anonymity);
      // setComment(comment);
      // setImagesAndVideosObj(imagesAndVideosObj);
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      console.log(`
        ----------------------------------------\n
        /app/common/card/v2/components/parts/edit-button.js - handleGetEditData
      `);
      
      console.log(chalk`
        cardPlayers_id: {green ${cardPlayers_id}}
      `);
      
      console.log(`
        ----- resultObj -----\n
        ${util.inspect(resultObj, { colors: true, depth: null })}\n
        --------------------\n
      `);
      
      
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
   * コメント作成・編集フォームを送信する
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
    //   新規投稿時の forumComments_id
    // ---------------------------------------------
    
    let newForumComments_id = '';
    
    
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      const threadListLimit = parseInt((getCookie({ key: 'forumThreadListLimit' }) || process.env.NEXT_PUBLIC_FORUM_THREAD_LIST_LIMIT), 10);
      const threadLimit = parseInt((getCookie({ key: 'forumThreadLimit' }) || process.env.NEXT_PUBLIC_FORUM_THREAD_LIMIT), 10);
      const commentLimit = parseInt((getCookie({ key: 'forumCommentLimit' }) || process.env.NEXT_PUBLIC_FORUM_COMMENT_LIMIT), 10);
      const replyLimit = parseInt((getCookie({ key: 'forumReplyLimit' }) || process.env.NEXT_PUBLIC_FORUM_REPLY_LIMIT), 10);
      
      
      
      
      // ---------------------------------------------
      //   _id が存在しない場合エラー
      // ---------------------------------------------
      
      if ((!gameCommunities_id && !userCommunities_id) || !forumThreads_id) {
        throw new CustomError({ errorsArr: [{ code: 'UsXqWgrd6', messageID: '1YJnibkmh' }] });
      }
      
      
      
      
      // ---------------------------------------------
      //   Validation Error
      // ---------------------------------------------
      
      if (
        
        validationHandleName({ value: name }).error ||
        validationBoolean({ value: anonymity }).error ||
        validationForumCommentsComment({ value: comment }).error
        
      ) {
        
        throw new CustomError({ errorsArr: [{ code: 'evE70gDt0', messageID: 'uwHIKBy7c' }] });
        
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
        
        gameCommunities_id,
        userCommunities_id,
        forumThreads_id,
        name,
        anonymity,
        comment,
        threadListLimit,
        threadLimit,
        commentLimit,
        replyLimit,
        
      };
      
      if (forumComments_id) {
        formDataObj.forumComments_id = forumComments_id;
      }
      
      if (imagesAndVideosObj.arr.length !== 0) {
        formDataObj.imagesAndVideosObj = imagesAndVideosObj;
      }
      
      
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        resultObj = await fetchWrapper({
          
          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-comments/upsert-comment-gc`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
          
        });
        
      } else if (userCommunities_id) {
        
        resultObj = await fetchWrapper({
          
          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-comments/upsert-comment-uc`,
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
      
      setName('');
      setAnonymity(false);
      setComment('');
      setImagesAndVideosObj({
        
        _id: '',
        createdDate: '',
        updatedDate: '',
        users_id: '',
        type: 'forum',
        arr: [],
        
      });
      
      
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      setButtonDisabled(false);
      
      
      // ---------------------------------------------
      //   Update - gameCommunityObj / userCommunityObj
      // ---------------------------------------------
      
      if (gameCommunities_id) {
        
        setGameCommunityObj(lodashGet(resultObj, ['data', 'gameCommunityObj'], {}));
        
      } else {
        
        setUserCommunityObj(lodashGet(resultObj, ['data', 'userCommunityObj'], {}));
        
      }
      
      
      // ---------------------------------------------
      //   forumThreadsForListObj
      // ---------------------------------------------
      
      setForumThreadsForListObj(lodashGet(resultObj, ['data', 'forumThreadsForListObj'], {}));
      
      
      // ---------------------------------------------
      //   forumThreadsObj
      // ---------------------------------------------
      
      setForumThreadsObj(lodashGet(resultObj, ['data', 'forumThreadsObj'], {}));
      
      
      // ---------------------------------------------
      //   forumCommentsObj
      // ---------------------------------------------
      
      setForumCommentsObj(lodashGet(resultObj, ['data', 'forumCommentsObj'], {}));
      
      
      // ---------------------------------------------
      //   forumRepliesObj
      // ---------------------------------------------
      
      setForumRepliesObj(lodashGet(resultObj, ['data', 'forumRepliesObj'], {}));
      
      
      // ---------------------------------------------
      //   新規投稿時の forumComments_id
      // ---------------------------------------------
      
      newForumComments_id = lodashGet(resultObj, ['data', 'forumCommentsObj', forumThreads_id, 'page1Obj', 'arr', 0], '');
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      handleSnackbarOpen({
        
        variant: 'success',
        messageID: forumComments_id ? 'NKsMLWvkt' : 'fhi9lUaap',
        
      });
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/forum/v2/components/form/comment.js - handleSubmit
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
      //   ----- imagesAndVideosObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // return;
      
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
        
        to: forumComments_id || newForumComments_id || forumThreads_id || 'forumThreads',
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
  //   Property
  // --------------------------------------------------
  
  const limitImagesAndVideos = parseInt(process.env.NEXT_PUBLIC_CARD_PLAYER_IMAGES_AND_VIDEOS_LIMIT, 10);
  const limitImagesAndVideosThumbnail = parseInt(process.env.NEXT_PUBLIC_CARD_PLAYER_IMAGES_AND_VIDEOS_THUMBNAIL_LIMIT, 10);
  
  
  
  // --------------------------------------------------
  //   Validation
  // --------------------------------------------------
  
  const validationHandleNameObj = validationHandleName({ value: name });
  const validationCardPlayersStatusObj = validationCardPlayersStatus({ value: status });
  
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/card/v2/components/form-card-player.js
  // `);
  
  // console.log(chalk`
  //   login: {green ${login}}
  // `);
  
  // console.log(`
  //   ----- loginUsersObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(loginUsersObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(`
  //   ----- followsObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(followsObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <form
      css={css`
        padding: 20px 16px 16px;
      `}
      name={`form-${cardPlayers_id}`}
      onSubmit={(eventObj) => handleSubmit({
        eventObj,
      })}
    >
      
      
      <h2
        css={css`
          margin: 0 0 12px 0;
        `}
      >
        プレイヤーカード
      </h2>
      
      
      <p
        css={css`
          margin: 0 0 24px 0;
        `}
      >
        プレイヤーカードとは、Game Users 内で基本的なプロフィールとして扱われるデータです。あなたがどんなゲームプレイヤーなのか知ってもらう情報になります。
      </p>
      
      
      
      
      {/* ハンドルネーム */}
      <div css={cssBox}>
        
        <TextField
          css={css`
            && {
              width: 100%;
              max-width: 500px;
            }
          `}
          label="ハンドルネーム"
          value={validationHandleNameObj.value}
          onChange={(eventObj) => setName(eventObj.target.value)}
          error={validationHandleNameObj.error}
          helperText={intl.formatMessage({ id: validationHandleNameObj.messageID }, { numberOfCharacters: validationHandleNameObj.numberOfCharacters })}
          margin="normal"
          inputProps={{
            maxLength: 50,
          }}
        />
        
        
        <div>
          <FormControlLabel
            classes={{
              label: classes.label
            }}
            control={
              <Checkbox
                checked={nameSearch}
                onChange={(eventObj) => setNameSearch(eventObj.target.checked)}
              />
            }
            label="ハンドルネームで検索可能にする"
          />
        </div>
        
      </div>
      
      
      
      
      {/* ステータス */}
      <div css={cssBox}>
        
        <TextField
          css={css`
            && {
              width: 100%;
              max-width: 500px;
            }
          `}
          label="ステータス"
          value={validationCardPlayersStatusObj.value}
          onChange={(eventObj) => setStatus(eventObj.target.value)}
          error={validationCardPlayersStatusObj.error}
          helperText={intl.formatMessage({ id: validationCardPlayersStatusObj.messageID }, { numberOfCharacters: validationCardPlayersStatusObj.numberOfCharacters })}
          margin="normal"
          inputProps={{
            maxLength: 50,
          }}
        />
        
        
        <div>
          <FormControlLabel
            classes={{
              label: classes.label
            }}
            control={
              <Checkbox
                checked={statusSearch}
                onChange={(eventObj) => setStatusSearch(eventObj.target.checked)}
              />
            }
            label="ステータスで検索可能にする"
          />
        </div>
        
      </div>
      
      
      
      
      {/* Form Images & Videos */}
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
          プレイヤーカードのトップに表示される大きな画像です。横長の画像（推奨サイズ 1920 x ---）をアップロードしてください。
        </p>
        
        
        <FormImageAndVideo
          showVideoButton={false}
          descriptionImage="横長の大きな画像をアップロードしてください。"
          showImageCaption={true}
          limit={limitImagesAndVideos}
          imagesAndVideosObj={imagesAndVideosObj}
          setImagesAndVideosObj={setImagesAndVideosObj}
        />
        
      </div>
      
      
      
      
      {/* Form Images & Videos */}
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
          ハンドルネームの左側に表示される小さな画像です。正方形の画像（推奨サイズ 256 x 256 ピクセル以上）をアップロードしてください。
        </p>
        
        
        <FormImageAndVideo
          showVideoButton={false}
          descriptionImage="サムネイル画像をアップロードできます。"
          showImageCaption={true}
          limit={limitImagesAndVideosThumbnail}
          imagesAndVideosObj={imagesAndVideosThumbnailObj}
          setImagesAndVideosObj={setImagesAndVideosThumbnailObj}
        />
        
      </div>
      
      
      
      
      
      {/* Comment */}
      <div css={cssBox}>
        
        <h3
          css={css`
            margin: 0 0 12px 0;
          `}
        >
          コメント
        </h3>
        
        
        <TextareaAutosize
          css={css`
            && {
              width: 100%;
              border-radius: 4px;
              box-sizing: border-box;
              padding: 8px 12px;
              line-height: 1.8;
              
              &:focus {
                outline: 1px #A9F5F2 solid;
              }
              
              resize: none;
            }
          `}
          rows={5}
          placeholder="コメントを入力してください。"
          value={comment}
          maxLength={3000}
          disabled={buttonDisabled}
          onChange={(eventObj) => setComment(eventObj.target.value)}
        />
        
        
        <div>
          <FormControlLabel
            classes={{
              label: classes.label
            }}
            control={
              <Checkbox
                checked={commentSearch}
                onChange={(eventObj) => setCommentSearch(eventObj.target.checked)}
              />
            }
            label="コメントで検索可能にする"
          />
        </div>
        
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
          {cardPlayers_id ? '編集する' : '投稿する'}
        </Button>
        
        
        
        
        {/* Close */}
        {cardPlayers_id &&
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
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;