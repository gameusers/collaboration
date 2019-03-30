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

import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Paragraph from '../../../layout/components/paragraph';
import User from '../../../user/components/user';
import Profile from './profile';
import Smartphone from './smartphone';
import Tablet from './tablet';
import Pc from './pc';
import Hardware from './hardware';
import Id from './id';
import ActivityTime from './activity-time';
import LookingForFriend from './looking-for-friends';
import VoiceChat from './voice-chat';
import Link from './link';
import FollowButton from './follow-button';
import EditButton from './edit-button';
import FormPlayer from './form/player';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// ---------------------------------------------
//   Top / Container
// ---------------------------------------------

const CardTopBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0;
  padding: 12px 4px 12px 12px;
`;


// ---------------------------------------------
//   Top / Expand More Button
// ---------------------------------------------

const ExpandMoreBox = styled.div`
  margin: 0 0 0 auto;
  padding: 0;
`;


// ---------------------------------------------
//   Content / Card Content
// ---------------------------------------------

const StyledCardContent = styled(CardContent)`
  && {
    font-size: 14px;
    padding-bottom: 0;
  }
`;


// ---------------------------------------------
//   Bottom / Card Actions
// ---------------------------------------------

const StyledCardActions = styled(CardActions)`
  && {
    margin: 0 6px 6px 6px;
    padding-top: 0;
  }
`;

const ActionsBox = styled.div`
  display: flex;
  flex-flow: column wrap;
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
    
    this.props.stores.layout.handleButtonEnable({ _id: `${this.props._id}-panelButton` });
    
    
    // フォームを表示する、あとで消すように
    // this.props.stores.cardPlayer.handleFormOpen({ _id: 'zaoOWw89g' });
    
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const {
      
      stores,
      _id,
      // cardGames_id,
      // showCardGameButton,
      showFollow
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   cardPlayersObj
    // --------------------------------------------------
    
    const cardPlayersObj = lodashGet(stores, ['data', 'cardPlayersObj', _id], {});
    
    
    // --------------------------------------------------
    //   カードデータが存在しない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (Object.keys(cardPlayersObj).length === false) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   Panel
    // --------------------------------------------------
    
    const panelExpanded = lodashGet(stores, ['layout', 'panelExpandedObj', _id], true);
    const handlePanelExpand = lodashGet(stores, ['layout', 'handlePanelExpand'], '');
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = lodashGet(stores, ['layout', 'buttonDisabledObj', `${_id}-panelButton`], true);
    
    
    
    
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
    const thumbnailSrc = lodashGet(cardPlayersObj, ['imagesAndVideosObj', 'thumbnailArr', 0, 'src'], '');
    
    const level = lodashGet(cardPlayersObj, ['usersObj', 'level'], 0);
    const accessDate = lodashGet(cardPlayersObj, ['usersObj', 'accessDate'], '');
    const playerID = lodashGet(cardPlayersObj, ['usersObj', 'playerID'], '');
    const followedCount = lodashGet(cardPlayersObj, ['usersObj', 'followedCount'], 0);
    const followed = lodashGet(cardPlayersObj, ['usersObj', 'followed'], false);
    
    
    // ---------------------------------------------
    //   Main Image
    // ---------------------------------------------
    
    const imageSrcSet = lodashGet(cardPlayersObj, ['imagesAndVideosObj', 'mainArr', 0, 'srcSet'], '');
    const imageSrc = lodashGet(cardPlayersObj, ['imagesAndVideosObj', 'mainArr', 0, 'src'], '');
    const imageAlt = lodashGet(cardPlayersObj, ['imagesAndVideosObj', 'mainArr', 0, 'caption'], '');
    
    
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
    
    const idArr = lodashGet(cardPlayersObj, ['idArr'], []);
    
    
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
    
    const formOpen = lodashGet(stores, ['cardPlayer', 'formOpenObj', _id], false);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   users_id: {green ${users_id}}
    //   stores.data.usersLoginObj._id: {green ${stores.data.usersLoginObj._id}}
    //   users_id: {green ${users_id}}
    //   editFormOpen: {green ${editFormOpen}}
    // `);
    
    // console.log(`\n---------- cardPlayersObj ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(cardPlayersObj)));
    // console.log(`\n-----------------------------------\n`);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Card>
        
        
        {/* カード上部 */}
        <CardTopBox>
          
          {/* ユーザー情報 - サムネイル画像・ハンドルネームなど */}
          <User
            thumbnailSrc={thumbnailSrc}
            
            name={name}
            playerID={playerID}
            status={status}
            accessDate={accessDate}
            
            level={level}
            // cardPlayers_id={_id}
            // showCardPlayerButton={false}
            // cardGames_id={cardGames_id}
            // showCardGameButton={showCardGameButton}
          />
          
          
          {/* 右上に設置されているパネル開閉用のボタン */}
          <ExpandMoreBox>
            <IconButton
              onClick={() => handlePanelExpand({ _id })}
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
          </ExpandMoreBox>
          
        </CardTopBox>
        
        
        
        
        {/* カードのコンテンツ - 折り畳まれる部分 */}
        <Collapse in={panelExpanded} timeout="auto" unmountOnExit>
          
          
          {/* 編集フォーム */}
          {formOpen ? (
            
            <FormPlayer
              _id={_id}
            />
            
          ) : (
            
            <React.Fragment>
              
              
              {/* 大きな画像 */}
              {imageSrc &&
                <img
                  srcSet={imageSrcSet}
                  src={imageSrc}
                  alt={imageAlt}
                  width="100%"
                />
              }
              
              
              {/* プロフィール*/}
              <StyledCardContent>
                
                
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
                <Id
                  arr={idArr}
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
                
                
              </StyledCardContent>
              
              
              <StyledCardActions>
                <ActionsBox>
                
                  {/* Link */}
                  <Link linkArr={linkArr} />
                  
                  
                  {/* フォローボタン */}
                  {showFollow &&
                    <FollowButton
                      users_id={users_id}
                      followedCount={followedCount}
                      followed={followed}
                    />
                  }
                  
                  {/* 編集ボタン */}
                  <EditButton
                    _id={_id}
                    users_id={users_id}
                  />
                  
                </ActionsBox>
              </StyledCardActions>
              
              
            </React.Fragment>
            
          )}
          
          
        </Collapse>
        
        
      </Card>
    );
    
  }
  
};