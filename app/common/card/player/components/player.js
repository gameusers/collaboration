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
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import ImageAndVideo from '../../../image-and-video/components/image-and-video';
import Paragraph from '../../../layout/components/paragraph';
import User from '../../../user/components/user';
import Profile from './profile';
import Smartphone from './smartphone';
import Tablet from './tablet';
import Pc from './pc';
import Hardware from './hardware';
import ID from './id';
import ActivityTime from './activity-time';
import LookingForFriend from './looking-for-friends';
import VoiceChat from './voice-chat';
import Link from './link';
// import FollowButton from './follow-button';
import EditButton from './edit-button';
import FormPlayer from './form/player';
import FollowButton from '../../../follow/components/ur-button';




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssFollowButton = css`
  border-top: 1px dashed #A4A4A4;
  margin: 24px 0 0 0;
  padding: 24px 0 0 0;
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
    
    this.pathArr = [props.cardPlayers_id, 'cardObj'];
    
    
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
    
    const {
      
      stores,
      storeCardPlayer,
      cardPlayers_id,
      // showFollow,
      showEditButton,
      defaultExpanded = true,
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   cardPlayersObj
    // --------------------------------------------------
    
    const cardPlayersObj = toJS(lodashGet(stores, ['data', 'cardPlayersObj', cardPlayers_id], {}));
    
    
    // --------------------------------------------------
    //   カードデータが存在しない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (Object.keys(cardPlayersObj).length === 0) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   Panel
    // --------------------------------------------------
    
    const handlePanelExpand = lodashGet(stores, ['layout', 'handlePanelExpand'], () => {});
    const panelExpanded = stores.layout.handleGetPanelExpanded({ pathArr: this.pathArr, defaultExpanded });
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   users_id
    // --------------------------------------------------
    
    const users_id = lodashGet(cardPlayersObj, ['users_id'], '');
    
    
    // ---------------------------------------------
    //   User
    // ---------------------------------------------
    
    const name = lodashGet(cardPlayersObj, ['nameObj', 'value'], '');
    const status = lodashGet(cardPlayersObj, ['statusObj', 'value'], '');
    const comment = lodashGet(cardPlayersObj, ['commentObj', 'value'], '');
    const exp = lodashGet(cardPlayersObj, ['usersObj', 'exp'], 0);
    const accessDate = lodashGet(cardPlayersObj, ['usersObj', 'accessDate'], '');
    const userID = lodashGet(cardPlayersObj, ['usersObj', 'userID'], '');
    // const followedCount = lodashGet(cardPlayersObj, ['followsObj', 'followedCount'], 0);
    // const followed = lodashGet(cardPlayersObj, ['followsObj', 'followed'], false);
    
    
    
    // --------------------------------------------------
    //   Images and Videos
    // --------------------------------------------------
    
    const imagesAndVideosObj = lodashGet(cardPlayersObj, ['imagesAndVideosObj'], {});
    const imagesAndVideosThumbnailObj = lodashGet(cardPlayersObj, ['imagesAndVideosThumbnailObj'], {});
    
    
    // ---------------------------------------------
    //   Profile
    // ---------------------------------------------
    
    const ageValue = lodashGet(cardPlayersObj, ['ageObj', 'value'], '');
    const ageAlternativeText = lodashGet(cardPlayersObj, ['ageObj', 'alternativeText'], '');
    const sexValue = lodashGet(cardPlayersObj, ['sexObj', 'value'], '');
    const sexAlternativeText = lodashGet(cardPlayersObj, ['sexObj', 'alternativeText'], '');
    const addressAlternativeText = lodashGet(cardPlayersObj, ['addressObj', 'alternativeText'], '');
    const gamingExperienceValue = lodashGet(cardPlayersObj, ['gamingExperienceObj', 'value'], '');
    const gamingExperienceAlternativeText = lodashGet(cardPlayersObj, ['gamingExperienceObj', 'alternativeText'], '');
    const hobbiesValueArr = lodashGet(cardPlayersObj, ['hobbiesObj', 'valueArr'], []);
    const specialSkillsValueArr = lodashGet(cardPlayersObj, ['specialSkillsObj', 'valueArr'], []);
    
    
    // ---------------------------------------------
    //   Hardware
    // ---------------------------------------------
    
    const hardwareActiveArr = lodashGet(cardPlayersObj, ['hardwareActiveArr'], []);
    const hardwareInactiveArr = lodashGet(cardPlayersObj, ['hardwareInactiveArr'], []);
    
    
    // ---------------------------------------------
    //   Smartphone
    // ---------------------------------------------
    
    const smartphoneModel = lodashGet(cardPlayersObj, ['smartphoneObj', 'model'], '');
    const smartphoneComment = lodashGet(cardPlayersObj, ['smartphoneObj', 'comment'], '');
    
    
    // ---------------------------------------------
    //   Tablet
    // ---------------------------------------------
    
    const tabletModel = lodashGet(cardPlayersObj, ['tabletObj', 'model'], '');
    const tabletComment = lodashGet(cardPlayersObj, ['tabletObj', 'comment'], '');
    
    
    // ---------------------------------------------
    //   PC
    // ---------------------------------------------
    
    const pcModel = lodashGet(cardPlayersObj, ['pcObj', 'model'], '');
    const pcComment = lodashGet(cardPlayersObj, ['pcObj', 'comment'], '');
    const pcOs = lodashGet(cardPlayersObj, ['pcObj', 'specsObj', 'os'], '');
    const pcCpu = lodashGet(cardPlayersObj, ['pcObj', 'specsObj', 'cpu'], '');
    const pcCpuCooler = lodashGet(cardPlayersObj, ['pcObj', 'specsObj', 'cpuCooler'], '');
    const pcMotherboard = lodashGet(cardPlayersObj, ['pcObj', 'specsObj', 'motherboard'], '');
    const pcMemory = lodashGet(cardPlayersObj, ['pcObj', 'specsObj', 'memory'], '');
    const pcStorage = lodashGet(cardPlayersObj, ['pcObj', 'specsObj', 'storage'], '');
    const pcGraphicsCard = lodashGet(cardPlayersObj, ['pcObj', 'specsObj', 'graphicsCard'], '');
    const pcOpticalDrive = lodashGet(cardPlayersObj, ['pcObj', 'specsObj', 'opticalDrive'], '');
    const pcPowerSupply = lodashGet(cardPlayersObj, ['pcObj', 'specsObj', 'powerSupply'], '');
    const pcCase = lodashGet(cardPlayersObj, ['pcObj', 'specsObj', 'pcCase'], '');
    const pcMonitor = lodashGet(cardPlayersObj, ['pcObj', 'specsObj', 'monitor'], '');
    const pcMouse = lodashGet(cardPlayersObj, ['pcObj', 'specsObj', 'mouse'], '');
    const pcKeyboard = lodashGet(cardPlayersObj, ['pcObj', 'specsObj', 'keyboard'], '');
      
    
    // ---------------------------------------------
    //   ID
    // ---------------------------------------------
    
    const ids_idArr = lodashGet(cardPlayersObj, ['ids_idArr'], []);
    
    
    // ---------------------------------------------
    //   活動時間
    // ---------------------------------------------
    
    const activityTimeArr = lodashGet(cardPlayersObj, ['activityTimeObj', 'valueArr'], []);
    
    
    // ---------------------------------------------
    //   フレンド募集
    // ---------------------------------------------
    
    const lookingForFriendsValue = lodashGet(cardPlayersObj, ['lookingForFriendsObj', 'value'], '');
    const lookingForFriendsIcon = lodashGet(cardPlayersObj, ['lookingForFriendsObj', 'icon'], '');
    const lookingForFriendsComment = lodashGet(cardPlayersObj, ['lookingForFriendsObj', 'comment'], '');
    
    
    // ---------------------------------------------
    //   ボイスチャット
    // ---------------------------------------------
    
    const voiceChatValue = lodashGet(cardPlayersObj, ['voiceChatObj', 'value'], '');
    const voiceChatComment = lodashGet(cardPlayersObj, ['voiceChatObj', 'comment'], '');
    
    
    // ---------------------------------------------
    //   Link
    // ---------------------------------------------
    
    const linkArr = lodashGet(cardPlayersObj, ['linkArr'], []);
    
    
    
    
    // --------------------------------------------------
    //   Edit Form
    // --------------------------------------------------
    
    const formOpen = lodashGet(storeCardPlayer, ['formOpenObj', cardPlayers_id], false);
    
    
    
    
    // --------------------------------------------------
    //   Follow
    // --------------------------------------------------
    
    const followsObj = lodashGet(cardPlayersObj, ['followsObj'], {});
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/card/player/components/player.js
    // `);
    
    // console.log(`
    //   ----- cardPlayersObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(cardPlayersObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   formOpen: {green ${formOpen}}
    //   panelExpanded: {green ${panelExpanded}}
    // `);
    
    // console.log(`
    //   ----- ids_idArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(ids_idArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Card>
        
        
        {/* カード上部 */}
        <div
          css={css`
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            margin: 0;
            padding: 12px 4px 12px 12px;
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
          />
          
          
          {/* 右上に設置されているパネル開閉用のボタン */}
          <div
            css={css`
              margin: 0 0 0 auto;
            `}
          >
            <IconButton
              onClick={() => handlePanelExpand({ pathArr: this.pathArr, defaultExpanded })}
              aria-expanded={panelExpanded}
              aria-label="Show more"
              disabled={buttonDisabled}
            >
              {panelExpanded ? (
                <IconExpandLess />
              ) : (
                <IconExpandMore />
              )}
            </IconButton>
          </div>
          
          
        </div>
        
        
        
        
        {/* カードのコンテンツ - 折り畳まれる部分 */}
        <Collapse in={panelExpanded} timeout="auto">
          
          
          {/* 編集フォーム */}
          {formOpen ? (
            
            <FormPlayer
              cardPlayers_id={cardPlayers_id}
            />
            
          ) : (
            
            <React.Fragment>
              
              
              {/* Big Image */}
              <ImageAndVideo
                pathArr={[cardPlayers_id, 'imagesAndVideosObj']}
                imagesAndVideosObj={imagesAndVideosObj}
                setMaxHeight={false}
              />
              
              
              {/* Contents */}
              <CardContent
                css={css`
                  && {
                    font-size: 14px;
                    padding-bottom: 16px !important;
                    
                    ${Object.keys(imagesAndVideosObj).length === 0 &&
                      `border-top: 1px dashed;
                       border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
                       border-image-slice: 1;`
                    }
                  }
                `}
              >
                
                
                {/* コメント */}
                <Paragraph text={comment} />
                
                
                {/* 年齢・性別などのプロフィール */}
                <Profile
                  ageValue={ageValue}
                  ageAlternativeText={ageAlternativeText}
                  sexValue={sexValue}
                  sexAlternativeText={sexAlternativeText}
                  addressAlternativeText={addressAlternativeText}
                  gamingExperienceValue={gamingExperienceValue}
                  gamingExperienceAlternativeText={gamingExperienceAlternativeText}
                  hobbiesValueArr={hobbiesValueArr}
                  specialSkillsValueArr={specialSkillsValueArr}
                />
                
                
                {/* 所有ハード */}
                <Hardware
                  hardwareActiveArr={hardwareActiveArr}
                  hardwareInactiveArr={hardwareInactiveArr}
                />
                
                
                {/* スマートフォン */}
                <Smartphone
                  smartphoneModel={smartphoneModel}
                  smartphoneComment={smartphoneComment}
                />
                
                
                {/* タブレット */}
                <Tablet
                  tabletModel={tabletModel}
                  tabletComment={tabletComment}
                />
                
                
                {/* PC */}
                <Pc
                  pcModel={pcModel}
                  pcComment={pcComment}
                  pcOs={pcOs}
                  pcCpu={pcCpu}
                  pcCpuCooler={pcCpuCooler}
                  pcMotherboard={pcMotherboard}
                  pcMemory={pcMemory}
                  pcStorage={pcStorage}
                  pcGraphicsCard={pcGraphicsCard}
                  pcOpticalDrive={pcOpticalDrive}
                  pcPowerSupply={pcPowerSupply}
                  pcCase={pcCase}
                  pcMonitor={pcMonitor}
                  pcMouse={pcMouse}
                  pcKeyboard={pcKeyboard}
                />
                
                
                {/* ID */}
                <ID
                  arr={ids_idArr}
                />
                
                
                {/* 活動時間 */}
                <ActivityTime
                  arr={activityTimeArr}
                />
                
                
                {/* フレンド募集 */}
                <LookingForFriend
                  value={lookingForFriendsValue}
                  icon={lookingForFriendsIcon}
                  comment={lookingForFriendsComment}
                />
                
                
                {/* ボイスチャット */}
                <VoiceChat
                  value={voiceChatValue}
                  comment={voiceChatComment}
                />
                
                
                {/* Link */}
                <Link linkArr={linkArr} />
                
                
                {/* フォローボタン */}
                {/*{showFollow &&
                  <FollowButton
                    pathArr={this.pathArr}
                    users_id={users_id}
                    followedCount={followedCount}
                    followed={followed}
                  />
                }*/}
                
                
                {/* Follow Button */}
                <FollowButton
                  cssEmotion={cssFollowButton}
                  size="medium"
                  users_id={users_id}
                  followsObj={followsObj}
                  showNumberOfPeople={true}
                />
                
                
                
                {/* 編集ボタン */}
                {showEditButton &&
                  <EditButton
                    // pathArr={this.pathArr}
                    cardPlayers_id={cardPlayers_id}
                    users_id={users_id}
                  />
                }
                
                
              </CardContent>
              
              
            </React.Fragment>
            
          )}
          
          
        </Collapse>
        
        
      </Card>
    );
    
  }
  
};