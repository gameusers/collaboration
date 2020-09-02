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
import moment from 'moment';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateLayout } from 'app/@states/layout.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

// import { fetchWrapper } from 'app/@modules/fetch.js';
// import { CustomError } from 'app/@modules/error/custom.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationUserCommunitiesName } from 'app/@database/user-communities/validations/name.js';
import { validationUserCommunitiesUserCommunityID } from 'app/@database/user-communities/validations/user-community-id.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from 'app/common/layout/v2/panel.js';
import Paragraph from 'app/common/layout/v2/paragraph.js';
import FormImageAndVideo from 'app/common/image-and-video/v2/form.js';
import FormGame from 'app/common/game/v2/form.js';




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
  
  const {
    
    headerObj,
    userCommunityObj,
    // followedCount,
    // gamesArr,
    accessRightRead,
    
  } = props;

  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [name, setName] = useState(lodashGet(props, ['userCommunityObj', 'name'], ''));
  const [description, setDescription] = useState(lodashGet(props, ['userCommunityObj', 'description'], ''));
  const [descriptionShort, setDescriptionShort] = useState(lodashGet(props, ['userCommunityObj', 'descriptionShort'], ''));

  const [imagesAndVideosObj, setImagesAndVideosObj] = useState(lodashGet(props, ['userCommunityObj', 'imagesAndVideosObj'], {
    
    _id: '',
    createdDate: '',
    updatedDate: '',
    users_id: '',
    type: 'uc',
    arr: [],

  }));

  const [imagesAndVideosThumbnailObj, setImagesAndVideosThumbnailObj] = useState(lodashGet(props, ['userCommunityObj', 'imagesAndVideosThumbnailObj'], {
    
    _id: '',
    createdDate: '',
    updatedDate: '',
    users_id: '',
    type: 'uc',
    arr: [],

  }));

  const [userCommunityID, setUserCommunityID] = useState(lodashGet(props, ['userCommunityObj', 'userCommunityID'], ''));
  const [communityType, setCommunityType] = useState(lodashGet(props, ['userCommunityObj', 'communityType'], 'open'));
  const [gamesArr, setGamesArr] = useState(lodashGet(props, ['headerObj', 'gamesArr'], []));
  const [approval, setApproval] = useState(lodashGet(props, ['headerObj', 'followsObj', 'approval'], false));
  const [anonymity, setAnonymity] = useState(lodashGet(props, ['userCommunityObj', 'anonymity'], false));
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   Validation
  // --------------------------------------------------
  
  const validationUserCommunitiesNameObj = validationUserCommunitiesName({ value: name });
  const validationUserCommunitiesUserCommunityIDObj = validationUserCommunitiesUserCommunityID({ value: userCommunityID });
  
  
  // --------------------------------------------------
  //   Limit
  // --------------------------------------------------
  
  const limitImagesAndVideos = parseInt(process.env.NEXT_PUBLIC_CARD_PLAYER_IMAGES_AND_VIDEOS_LIMIT, 10);
  const limitImagesAndVideosThumbnail = parseInt(process.env.NEXT_PUBLIC_CARD_PLAYER_IMAGES_AND_VIDEOS_THUMBNAIL_LIMIT, 10);
  const gamesLimit = parseInt(process.env.NEXT_PUBLIC_COMMUNITY_ADDITIONAL_GAME_LIMIT, 10);
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/uc/v2/about.js
  // `);
  
  // console.log(chalk`
  //   urlID: {green ${urlID}}
  //   gameCommunities_id: {green ${gameCommunities_id}}
  //   userCommunityID: {green ${userCommunityID}}
  //   userCommunities_id: {green ${userCommunities_id}}
    
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
  //   Return
  // --------------------------------------------------
  
  return (
    <Panel
      heading="コミュニティ設定"
      defaultExpanded={true}
    >
      
      
      <p>ユーザーコミュニティの設定を行います。</p>
      
      
      <form>
        

        {/* 基本情報 */}
        <div
          css={css`
            border-top: 1px dashed #848484;
            margin: 36px 0 0 0;
            padding: 24px 0 0 0;
          `}
        >

          <h3
            css={css`
              margin: 0 0 6px 0;
            `}
          >
            基本情報
          </h3>
          
          
          <div>
            <TextField
              css={css`
                width: 100%;
              `}
              id="name"
              label="コミュニティの名前"
              value={validationUserCommunitiesNameObj.value}
              onChange={(eventObj) => setName(eventObj.target.value)}
              error={validationUserCommunitiesNameObj.error}
              helperText={intl.formatMessage({ id: validationUserCommunitiesNameObj.messageID }, { numberOfCharacters: validationUserCommunitiesNameObj.numberOfCharacters })}
              disabled={buttonDisabled}
              margin="normal"
              inputProps={{
                maxLength: 50,
              }}
            />
          </div>
          
        </div>
        



        {/* Description */}
        <div
          css={css`
            margin: 24px 0 0 0;
          `}
        >
          
          
          <h3
            css={css`
              margin: 0 0 6px 0;
            `}
          >
            コミュニティの説明文 (3000文字以内)
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
            placeholder="コミュニティについての説明文を入力してください。"
            value={description}
            onChange={(eventObj) => setDescription(eventObj.target.value)}
            maxLength={3000}
            disabled={buttonDisabled}
          />
          
        </div>




        {/* Description Short */}
        <div
          css={css`
            margin: 24px 0 0 0;
          `}
        >
          
          
          <h3
            css={css`
              font-weight: bold;
              margin: 0 0 6px 0;
            `}
          >
            短いコミュニティの説明文 (100文字以内)
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
            rows={2}
            placeholder="コミュニティを一覧表示する際に表示される短い説明文を入力してください。"
            value={descriptionShort}
            onChange={(eventObj) => setDescriptionShort(eventObj.target.value)}
            maxLength={100}
            disabled={buttonDisabled}
          />
          
        </div>




        {/* Form Images & Videos - Main */}
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
            コミュニティのトップに表示される大きな画像です。横長の画像（推奨サイズ 1920 x ---）をアップロードしてください。
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




        {/* Form Images & Videos - Thumbnail */}
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
            コミュニティを一覧表示する際に表示される小さな画像です。正方形の画像（推奨サイズ 256 x 256 ピクセル以上）をアップロードしてください。
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




        {/* URL */}
        <div css={cssBox}>
          
          <h3
            css={css`
              margin: 0 0 6px 0;
            `}
          >
            URL
          </h3>
          
          <p>
            コミュニティのURLを入力してください。次の形式のURLになります。https://gameusers.org/uc/<span css={css`color: red;`}>***</span>　赤文字部分の文字列を入力してください。
          </p>
          
          <p
            css={css`
              margin: 0 0 8px 0;
            `}
          >
            利用できる文字は半角英数字とハイフン( - )アンダースコア( _ )です。3文字以上、32文字以内。
          </p>
          
          
          <div>
            <TextField
              css={css`
                width: 400px;
                
                @media screen and (max-width: 480px) {
                  width: 100%;
                }
              `}
              id="userCommunityID"
              label="URL"
              value={validationUserCommunitiesUserCommunityIDObj.value}
              onChange={(eventObj) => setUserCommunityID(eventObj.target.value)}
              error={validationUserCommunitiesUserCommunityIDObj.error}
              helperText={intl.formatMessage({ id: validationUserCommunitiesUserCommunityIDObj.messageID }, { numberOfCharacters: validationUserCommunitiesUserCommunityIDObj.numberOfCharacters })}
              disabled={buttonDisabled}
              margin="normal"
              inputProps={{
                maxLength: 32,
              }}
            />
          </div>
          
        </div>




        {/* 関連ゲーム */}
        <div css={cssBox}>
          
          <h3
            css={css`
              margin: 0 0 6px 0;
            `}
          >
            関連ゲーム
          </h3>
          
          <p
          >
            このコミュニティに関連するゲームを選択してください。ユーザーコミュニティを検索した際に、そのゲームに関連するコミュニティとして表示されます。
          </p>
          
          <p
            css={css`
              margin: 0 0 8px 0;
            `}
          >
            またトップ画像をアップロードしていない場合、こちらで選択したゲームの情報が代わりに表示されるようになります。
          </p>
          

          <FormGame
            gamesArr={gamesArr}
            setGamesArr={setGamesArr}
            gamesLimit={gamesLimit}
          />
          
        </div>




        {/* 更新情報の公開範囲 */}
        <div css={cssBox}>
          
          <h3
            css={css`
              margin: 0 0 6px 0;
            `}
          >
            公開タイプ
          </h3>
          
          <p>
            コミュニティ内部のコンテンツを閲覧できる相手を選択し、コミュニティの更新情報（フォーラムへの書き込みなど）を Game Users のトップページなどに表示するかどうかの設定になります。
          </p>
          
          <p
            css={css`
              margin: 12px 0 0 0;
            `}
          >
            オープン：コミュニティを誰でも閲覧できます。また更新情報が Game Users のトップページにフィードとして掲載されます。
          </p>
          
          <p
            css={css`
              margin: 12px 0 12px 0;
            `}
          >
            クローズド：コミュニティの参加メンバーだけが閲覧できます。更新情報は参加メンバーだけに通知されます。身内だけで情報交換をしたい場合はクローズドを選んでください。
          </p>
          
          
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="communityType"
              name="communityType"
              value={communityType}
              onChange={(eventObj) => setCommunityType(eventObj.target.value)}
            >
              <FormControlLabel value="open" control={<Radio />} label="オープン" />
              <FormControlLabel value="closed" control={<Radio />} label="クローズド" />
            </RadioGroup>
          </FormControl>
          
        </div>




        {/* 参加条件 */}
        <div css={cssBox}>
          
          <h3
            css={css`
              margin: 0 0 6px 0;
            `}
          >
            参加承認制
          </h3>
          
          <p
            css={css`
              margin: 0 0 12px 0;
            `}
          >
            管理者が承認したユーザーだけをコミュニティに参加させる場合は、以下をチェックしてください。チェックを外すと誰でも参加できるようになります。
          </p>
          
          
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={approval}
                  onChange={(eventObj) => setApproval(eventObj.target.checked)}
                />
              }
              label="参加承認制にする"
            />
          </div>
          
        </div>




        {/* 匿名での投稿 */}
        <div css={cssBox}>
          
          <h3
            css={css`
              margin: 0 0 6px 0;
            `}
          >
            匿名での投稿
          </h3>
          
          <p
            css={css`
              margin: 0 0 12px 0;
            `}
          >
            コミュニティ内で、ログイン済みユーザーが匿名で投稿できるようになります。匿名での投稿を認める場合は、以下をチェックしてください。
          </p>

          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={anonymity}
                  onChange={(eventObj) => setAnonymity(eventObj.target.checked)}
                />
              }
              label="認める"
            />
          </div>
          
        </div>




        {/* Submit Button */}
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            border-top: 1px dashed #848484;
            margin: 24px 0 0 0;
            padding: 24px 0 0 0;
          `}
        >
          
          <Button
            variant="contained"
            color="primary"
            // onClick={() => handleSubmitSettings({ pathArr: this.pathArr })}
            disabled={buttonDisabled}
          >
            送信する
          </Button>
          
        </div>


      </form>
      
      
    </Panel>
  );
  

};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;