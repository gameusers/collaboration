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

import React from 'react';
import { inject, observer } from 'mobx-react';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import HandleName from './name';
import Status from './status';
import Comment from './comment';
import Age from './age';
import Sex from './sex';
import Address from './address';
import GamingExperience from './gaming-experience';
import Hobby from './hobby';
import SpecialSkill from './special-skill';
import Smartphone from './smartphone';
import Tablet from './tablet';
import PC from './pc';
import HardwareActive from './hardware-active';
import HardwareInactive from './hardware-inactive';
import ID from './id';
import ActivityTime from './activity-time';
import LookingForFriends from './looking-for-friends';
import VoiceChat from './voice-chat';
import FormLink from './link';

import ImageAndVideoForm from '../../../../image-and-video/components/form';
// import ImageAndVideoFormImage from '../../../../image-and-video/components/form-image';




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssBox = css`
  margin: 36px 0 0 0;
`;

const cssImageBox = css`
  margin: 24px 0 0 0;
`;

// const cssImageTitle = css`
//   font-weight: bold;
//   margin: 0 0 2px 0;
// `;

const cssCloseButtonBox = css`
  margin: 0 0 0 16px;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeCardPlayer')
@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    
    // --------------------------------------------------
    //   super
    // --------------------------------------------------
    
    super(props);
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    this.pathArr = [props.cardPlayers_id, 'form'];
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount(){
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ pathArr: this.pathArr });
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, storeCardPlayer, cardPlayers_id } = this.props;
    
    const {
      
      cardPlayerEditFormDataObj,
      cardPlayerEditFormUndoDataDialogOpenObj,
      handleCardPlayerEditFormUndoDataDialogOpen,
      handleCardPlayerEditFormUndoDataDialogClose,
      handleCardPlayerEditFormUndoData,
      handleHideForm,
      handleCardPlayerEditID,
      // handleImagesAndVideosObjThumbnailArr,
      // handleImagesAndVideosObjMainArr,
      handleEditFormSubmit
      
    } = storeCardPlayer;
    
    
    // --------------------------------------------------
    //   Form Data
    // --------------------------------------------------
    
    const {
      
      nameObj,
      statusObj,
      // imagesAndVideosObj,
      commentObj,
      ageObj,
      sexObj,
      addressObj,
      gamingExperienceObj,
      hobbiesObj,
      specialSkillsObj,
      smartphoneObj,
      tabletObj,
      pcObj,
      hardwareActiveObj,
      hardwareInactiveObj,
      hardwareActiveArr,
      hardwareInactiveArr,
      ids_idArr,
      activityTimeObj,
      lookingForFriendsObj,
      voiceChatObj,
      linkArr
      
    } = cardPlayerEditFormDataObj[cardPlayers_id];
    
    
    
    
    // --------------------------------------------------
    //   Dialog
    // --------------------------------------------------
    
    const dialogOpen = lodashGet(cardPlayerEditFormUndoDataDialogOpenObj, [cardPlayers_id], false);
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- cardPlayerEditFormDataObj[cardPlayers_id] -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(cardPlayerEditFormDataObj[cardPlayers_id])), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- cardPlayerEditFormDataObj[cardPlayers_id] -----\n
    //   ${util.inspect(cardPlayerEditFormDataObj[cardPlayers_id], { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- cardPlayerEditFormDataObj[cardPlayers_id].imagesAndVideosObj -----\n
    //   ${util.inspect(cardPlayerEditFormDataObj[cardPlayers_id].imagesAndVideosObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- imagesAndVideosObj -----\n
    //   ${util.inspect(imagesAndVideosObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- linkArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(linkArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   userscardPlayers_id: {green ${userscardPlayers_id}}
    //   loginUsersObj.cardPlayers_id: {green ${loginUsersObj.cardPlayers_id}}
    //   followedCount: {green ${followedCount}}
    //   followed: {green ${followed}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <form>
        
        <CardContent>
          
          
          <h3
            css={css`
              font-weight: bold;
              margin: 0 0 6px 0;
            `}
          >
            プレイヤーカード
          </h3>
          
          
          <p
            css={css`
              margin: 0 0 24px 0;
            `}
          >
            プレイヤーカードというのは、Game Users 内で基本的なプロフィールとして扱われるデータです。あなたがどんなゲームプレイヤーなのか知ってもらう情報になりますので、いろいろ入力してみてください。
          </p>
          
          
          {/* ハンドルネーム */}
          <HandleName
            _id={cardPlayers_id}
            nameObj={nameObj}
          />
          
          
          {/* ステータス */}
          <Status
            _id={cardPlayers_id}
            statusObj={statusObj}
          />
          
          
          {/* サムネイル */}
          <div css={cssImageBox}>
            
            <ImageAndVideoForm
              pathArr={[...this.pathArr, 'thumbnailObj']}
              type="ucThumbnail"
              showVideoButton={false}
              showImageCaption={false}
              limit={1}
            />
            
            {/*<ImageAndVideoFormImage
              _id={`${cardPlayers_id}-thumbnail`}
              heading="サムネイル"
              description="ハンドルネームの左側に表示される小さな画像です。正方形の画像（推奨サイズ 128 x 128 以上）をアップロードしてください。"
              func={handleImagesAndVideosObjThumbnailArr}
              imagesAndVideosArr={imagesAndVideosObj.thumbnailArr}
              caption={false}
              limit={1}
            />*/}
            
          </div>
          
          
          {/* メイン画像 */}
          <div css={cssImageBox}>
            
            <ImageAndVideoForm
              pathArr={this.pathArr}
              type="ucTop"
              showVideoButton={false}
              showImageCaption={false}
              limit={1}
            />
            
            {/*<ImageAndVideoFormImage
              _id={`${cardPlayers_id}-main`}
              heading="メイン画像"
              description="プレイヤーカードに表示される大きな画像です。横長の画像（推奨サイズ 1280 x 720 以上）をアップロードしてください。"
              func={handleImagesAndVideosObjMainArr}
              imagesAndVideosArr={imagesAndVideosObj.mainArr}
              caption={true}
              limit={1}
            />*/}
            
          </div>
          
          
          {/* コメント */}
          <div css={cssBox}>
            <Comment
              _id={cardPlayers_id}
              commentObj={commentObj}
            />
          </div>
          
          
          {/* 年齢 */}
          <div css={cssBox}>
            <Age
              _id={cardPlayers_id}
              ageObj={ageObj}
            />
          </div>
          
          
          {/* 性別 */}
          <div css={cssBox}>
            <Sex
              _id={cardPlayers_id}
              sexObj={sexObj}
            />
          </div>
          
          
          {/* 住所 */}
          <div css={cssBox}>
            <Address
              _id={cardPlayers_id}
              addressObj={addressObj}
            />
          </div>
          
          
          {/* ゲーム歴 */}
          <div css={cssBox}>
            <GamingExperience
              _id={cardPlayers_id}
              gamingExperienceObj={gamingExperienceObj}
            />
          </div>
          
          
          {/* 趣味 */}
          <div css={cssBox}>
            <Hobby
              _id={cardPlayers_id}
              hobbiesObj={hobbiesObj}
            />
          </div>
          
          
          {/* 特技 */}
          <div css={cssBox}>
            <SpecialSkill
              _id={cardPlayers_id}
              specialSkillsObj={specialSkillsObj}
            />
          </div>
          
          
          {/* スマートフォン */}
          <div css={cssBox}>
            <Smartphone
              _id={cardPlayers_id}
              smartphoneObj={smartphoneObj}
            />
          </div>
          
          
          {/* タブレット */}
          <div css={cssBox}>
            <Tablet
              _id={cardPlayers_id}
              tabletObj={tabletObj}
            />
          </div>
          
          
          {/* PC */}
          <div css={cssBox}>
            <PC
              _id={cardPlayers_id}
              pcObj={pcObj}
            />
          </div>
          
          
          {/* 所有ハードウェア */}
          <div css={cssBox}>
            <HardwareActive
              _id={cardPlayers_id}
              arr={hardwareActiveArr}
              search={hardwareActiveObj.search}
            />
          </div>
          
          
          {/* 昔、所有していたハードウェア */}
          <div css={cssBox}>
            <HardwareInactive
              _id={cardPlayers_id}
              arr={hardwareInactiveArr}
              search={hardwareInactiveObj.search}
            />
          </div>
          
          
          {/* ID */}
          <div css={cssBox}>
            <ID
              _id={cardPlayers_id}
              ids_idArr={ids_idArr}
              func={handleCardPlayerEditID}
            />
          </div>
          
          
          {/* 活動時間 */}
          <div css={cssBox}>
            <ActivityTime
              _id={cardPlayers_id}
              activityTimeObj={activityTimeObj}
            />
          </div>
          
          
          {/* フレンド */}
          <div css={cssBox}>
            <LookingForFriends
              _id={cardPlayers_id}
              value={lookingForFriendsObj.value}
              icon={lookingForFriendsObj.icon}
              comment={lookingForFriendsObj.comment}
              search={lookingForFriendsObj.search}
            />
          </div>
          
          
          {/* ボイスチャット */}
          <div css={cssBox}>
            <VoiceChat
              _id={cardPlayers_id}
              value={voiceChatObj.value}
              comment={voiceChatObj.comment}
              search={voiceChatObj.search}
            />
          </div>
          
          
          {/* Link */}
          <div css={cssBox}>
            <FormLink
              _id={cardPlayers_id}
              arr={linkArr}
            />
          </div>
          
          
        </CardContent>
        
        
        
        
        <CardActions
          css={css`
            && {
              margin: 6px;
            }
          `}
        >
          
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
            `}
          >
            
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEditFormSubmit({ _id: cardPlayers_id })}
              disabled={buttonDisabled}
            >
              保存する
            </Button>
            
            
            <div css={cssCloseButtonBox}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleCardPlayerEditFormUndoDataDialogOpen(cardPlayers_id)}
                disabled={buttonDisabled}
              >
                元に戻す
              </Button>
            </div>
            
            
            <div css={cssCloseButtonBox}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleHideForm({ _id: cardPlayers_id })}
                disabled={buttonDisabled}
              >
                閉じる
              </Button>
            </div>
            
          </div>
          
        </CardActions>
        
        
        
        
        {/* フォームの内容を元に戻すか尋ねるダイアログ */}
        <Dialog
          open={dialogOpen}
          onClose={() => handleCardPlayerEditFormUndoDataDialogClose(cardPlayers_id)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">元に戻す</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              編集フォームの状態をフォームが最初に表示されたときの状態に戻します。よろしいですか？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleCardPlayerEditFormUndoData(cardPlayers_id)} color="primary" autoFocus>
              はい
            </Button>
            
            <Button onClick={() => handleCardPlayerEditFormUndoDataDialogClose(cardPlayers_id)} color="primary">
              いいえ
            </Button>
          </DialogActions>
        </Dialog>
        
        
      </form>
    );
    
  }
  
};