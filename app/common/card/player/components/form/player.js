// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import lodashGet from 'lodash/get';


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




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// ---------------------------------------------
//   Content / Card Content
// ---------------------------------------------

const StyledCardContent = styled(CardContent)`
  && {
    
  }
`;


// ----------------------------------------
//   見出し
// ----------------------------------------

const Heading = styled.div`
  font-weight: bold;
  margin: 0 0 6px 0;
`;

const Description = styled.p`
  font-size: 14px;
  margin: 0 0 24px 0;
`;


// ----------------------------------------
//   共通
// ----------------------------------------

const Box = styled.div`
  margin: 36px 0 0 0;
`;


// ----------------------------------------
//   画像
// ----------------------------------------

const ImageBox = styled.div`
  margin: 24px 0 0 0;
`;

const ImageTitle = styled.div`
  font-weight: bold;
  margin: 0 0 2px 0;
`;

const ImageDescription = styled.p`
  
`;


// ---------------------------------------------
//   Bottom / Card Actions
// ---------------------------------------------

const StyledCardActions = styled(CardActions)`
  && {
    margin: 6px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const CloseButtonBox = styled.div`
  margin: 0 0 0 16px;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  
  componentDidMount(){
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ _id: `${this.props.cardPlayers_id}-form` });
    
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, cardPlayers_id } = this.props;
    
    const { buttonDisabledObj } = stores.layout;
    
    const {
      
      cardPlayerEditFormDataObj,
      cardPlayerEditFormUndoDataDialogOpenObj,
      handleCardPlayerEditFormUndoDataDialogOpen,
      handleCardPlayerEditFormUndoDataDialogClose,
      handleCardPlayerEditFormUndoData,
      handleCardPlayerEditFormClose,
      handleCardPlayerEditID,
      handleImagesAndVideosObjThumbnailArr,
      handleImagesAndVideosObjMainArr,
      handleEditFormSubmit
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   Form Data
    // --------------------------------------------------
    
    const {
      
      nameObj,
      statusObj,
      imagesAndVideosObj,
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
      idArr,
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
    
    const buttonDisabled = lodashGet(buttonDisabledObj, [`${cardPlayers_id}-form`], true);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- cardPlayerEditFormDataObj[cardPlayers_id] -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(cardPlayerEditFormDataObj[cardPlayers_id])), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- linkArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(linkArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   users_id: {green ${users_id}}
    //   usersLoginObj._id: {green ${usersLoginObj._id}}
    //   followedCount: {green ${followedCount}}
    //   followed: {green ${followed}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <form>
        
        <StyledCardContent>
          
          <Heading>プレイヤーカード</Heading>
          
          <Description>プレイヤーカードというのは、Game Users 内で基本的なプロフィールとして扱われるデータです。あなたがどんなゲームプレイヤーなのか知ってもらう情報になりますので、いろいろ入力してみてください。</Description>
          
          
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
          <ImageBox>
            <ImageTitle>サムネイル</ImageTitle>
            <ImageDescription>ハンドルネームの左側に表示される小さな画像です。正方形の画像をアップロードしてください。</ImageDescription>
            <ImageAndVideoForm
              _id={`${cardPlayers_id}-thumbnail`}
              func={handleImagesAndVideosObjThumbnailArr}
              imagesAndVideosArr={imagesAndVideosObj.thumbnailArr}
              caption={false}
              limit={1}
            />
          </ImageBox>
          
          
          
          {/* メイン画像 */}
          <ImageBox>
            <ImageTitle>メイン画像</ImageTitle>
            <ImageDescription>プレイヤーカードに表示される大きな画像です。横長の画像（推奨サイズ 1280 x 720 以上）をアップロードしてください。</ImageDescription>
            <ImageAndVideoForm
              _id={`${cardPlayers_id}-main`}
              func={handleImagesAndVideosObjMainArr}
              imagesAndVideosArr={imagesAndVideosObj.mainArr}
              caption={true}
              limit={1}
            />
          </ImageBox>
          
          
          {/* コメント */}
          <Box>
            <Comment
              _id={cardPlayers_id}
              commentObj={commentObj}
            />
          </Box>
          
          
          {/* 年齢 */}
          <Box>
            <Age
              _id={cardPlayers_id}
              ageObj={ageObj}
            />
          </Box>
          
          
          {/* 性別 */}
          <Box>
            <Sex
              _id={cardPlayers_id}
              sexObj={sexObj}
            />
          </Box>
          
          
          {/* 住所 */}
          <Box>
            <Address
              _id={cardPlayers_id}
              addressObj={addressObj}
            />
          </Box>
          
          
          {/* ゲーム歴 */}
          <Box>
            <GamingExperience
              _id={cardPlayers_id}
              gamingExperienceObj={gamingExperienceObj}
            />
          </Box>
          
          
          {/* 趣味 */}
          <Box>
            <Hobby
              _id={cardPlayers_id}
              hobbiesObj={hobbiesObj}
            />
          </Box>
          
          
          {/* 特技 */}
          <Box>
            <SpecialSkill
              _id={cardPlayers_id}
              specialSkillsObj={specialSkillsObj}
            />
          </Box>
          
          
          {/* スマートフォン */}
          <Box>
            <Smartphone
              _id={cardPlayers_id}
              smartphoneObj={smartphoneObj}
            />
          </Box>
          
          
          {/* タブレット */}
          <Box>
            <Tablet
              _id={cardPlayers_id}
              tabletObj={tabletObj}
            />
          </Box>
          
          
          {/* PC */}
          <Box>
            <PC
              _id={cardPlayers_id}
              pcObj={pcObj}
            />
          </Box>
          
          
          {/* 所有ハードウェア */}
          <Box>
            <HardwareActive
              _id={cardPlayers_id}
              arr={hardwareActiveArr}
              search={hardwareActiveObj.search}
            />
          </Box>
          
          
          {/* 昔、所有していたハードウェア */}
          <Box>
            <HardwareInactive
              _id={cardPlayers_id}
              arr={hardwareInactiveArr}
              search={hardwareInactiveObj.search}
            />
          </Box>
          
          
          {/* ID */}
          <Box>
            <ID
              _id={cardPlayers_id}
              idArr={idArr}
              func={handleCardPlayerEditID}
            />
          </Box>
          
          
          {/* 活動時間 */}
          <Box>
            <ActivityTime
              _id={cardPlayers_id}
              activityTimeObj={activityTimeObj}
            />
          </Box>
          
          
          {/* フレンド */}
          <Box>
            <LookingForFriends
              _id={cardPlayers_id}
              value={lookingForFriendsObj.value}
              icon={lookingForFriendsObj.icon}
              comment={lookingForFriendsObj.comment}
              search={lookingForFriendsObj.search}
            />
          </Box>
          
          
          {/* ボイスチャット */}
          <Box>
            <VoiceChat
              _id={cardPlayers_id}
              value={voiceChatObj.value}
              comment={voiceChatObj.comment}
              search={voiceChatObj.search}
            />
          </Box>
          
          
          {/* Link */}
          <Box>
            <FormLink
              _id={cardPlayers_id}
              arr={linkArr}
            />
          </Box>
          
          
        </StyledCardContent>
        
        
        <StyledCardActions>
          <ButtonBox>
            
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEditFormSubmit({ _id: cardPlayers_id })}
              disabled={buttonDisabled}
            >
              保存する
            </Button>
            
            
            <CloseButtonBox>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleCardPlayerEditFormUndoDataDialogOpen(cardPlayers_id)}
                disabled={buttonDisabled}
              >
                元に戻す
              </Button>
            </CloseButtonBox>
            
            
            <CloseButtonBox>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleCardPlayerEditFormClose(cardPlayers_id)}
                disabled={buttonDisabled}
              >
                閉じる
              </Button>
            </CloseButtonBox>
            
          </ButtonBox>
        </StyledCardActions>
        
        
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