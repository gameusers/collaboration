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
import IdFriend from './id-friend';
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
    line-height: 1.6em;
    padding-bottom: 0;
  }
`;


// ---------------------------------------------
//   Bottom / Card Actions
// ---------------------------------------------

const StyledCardActions = styled(CardActions)`
  && {
    padding-top: 0;
    padding-bottom: 16px;
    
    @media screen and (max-width: 480px) {
      padding: 0 10px 16px 10px;
    }
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
    this.props.stores.layout.handleButtonDisabledObj(`${this.props.cardPlayers_id}-panelButton`, false);
    
    // フォームを表示する、あとで消すように
    this.props.stores.cardPlayer.handleCardPlayerEditFormOpen('zaoOWw89g');
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const {
      
      stores,
      cardPlayers_id,
      cardGames_id,
      showCardGameButton,
      showFollow
      
    } = this.props;
    
    
    // --------------------------------------------------
    //   カードデータが存在しない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (cardPlayers_id in stores.data.cardPlayersObj === false) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   Panel
    // --------------------------------------------------
    
    const {
      
      panelExpandedObj,
      handlePanelExpanded,
      buttonDisabledObj
      
    } = stores.layout;
    
    
    // --------------------------------------------------
    //   Panel /  Expanded & Button Disabled
    // --------------------------------------------------
    
    let panelExpanded = true;
    
    if (cardPlayers_id in panelExpandedObj) {
      panelExpanded = panelExpandedObj[cardPlayers_id];
    }
    
    let panelButtonDisabled = true;
    
    if (`${cardPlayers_id}-panelButton` in buttonDisabledObj) {
      panelButtonDisabled = buttonDisabledObj[`${cardPlayers_id}-panelButton`];
    }
    
    
    
    
    // ---------------------------------------------
    //   cardPlayersObj & users_id
    // ---------------------------------------------
    
    const cardPlayersObj = stores.data.cardPlayersObj[cardPlayers_id];
    const users_id = cardPlayersObj.users_id;
    
    
    // ---------------------------------------------
    //   Access Date & Level & Follow
    // ---------------------------------------------
    
    const {
      
      accessDate,
      level,
      playerID,
      followedCount,
      followed
      
    } = stores.data.usersObj[users_id];
    
    
    // ---------------------------------------------
    //   Name & Status & Thumbnail
    // ---------------------------------------------
    
    const {
      
      name,
      status,
      thumbnail,
      comment
      
    } = cardPlayersObj;
    
    
    let thumbnailSrc = '';
    
    if (thumbnail) {
      thumbnailSrc = `/static/img/card/players/${cardPlayers_id}/thumbnail/image.jpg`;
    }
    
    
    // ---------------------------------------------
    //   Image
    // ---------------------------------------------
    
    let imageSrcSet = '';
    let imageSrc = '';
    let imageAlt = '';
    
    if (cardPlayersObj.imageArr.length > 0) {
      
      imageSrcSet = cardPlayersObj.imageArr[0].imageSrcSet;
      imageSrc = cardPlayersObj.imageArr[0].imageSrc;
      imageAlt = cardPlayersObj.imageArr[0].imageAlt;
      
    }
    
    
    // ---------------------------------------------
    //   Profile
    // ---------------------------------------------
    
    const birthdayValue = cardPlayersObj.birthdayObj.value;
    const birthdayAlternativeText = cardPlayersObj.birthdayObj.alternativeText;
    const sexValue = cardPlayersObj.sexObj.value;
    const sexAlternativeText = cardPlayersObj.sexObj.alternativeText;
    const addressValue = cardPlayersObj.addressObj.value;
    const gamingExperienceValue = cardPlayersObj.gamingExperienceObj.value;
    const gamingExperienceAlternativeText = cardPlayersObj.gamingExperienceObj.alternativeText;
    const hobbiesValueArr = cardPlayersObj.hobbiesObj.valueArr;
    const specialSkillsValueArr = cardPlayersObj.specialSkillsObj.valueArr;
    
    
    // ---------------------------------------------
    //   Hardware
    // ---------------------------------------------
    
    const hardwareActiveArr = cardPlayersObj.hardwareActiveArr;
    const hardwareInactiveArr = cardPlayersObj.hardwareInactiveArr;
    
    
    // ---------------------------------------------
    //   Smartphone
    // ---------------------------------------------
    
    const smartphoneModel = cardPlayersObj.smartphoneObj.model;
    const smartphoneComment = cardPlayersObj.smartphoneObj.comment;
    
    
    // ---------------------------------------------
    //   Tablet
    // ---------------------------------------------
    
    const tabletModel = cardPlayersObj.tabletObj.model;
    const tabletComment = cardPlayersObj.tabletObj.comment;
    
    
    // ---------------------------------------------
    //   PC
    // ---------------------------------------------
    
    const pcModel = cardPlayersObj.pcObj.model;
    const pcComment = cardPlayersObj.pcObj.comment;
    const pcOs = cardPlayersObj.pcObj.specsObj.os;
    const pcCpu = cardPlayersObj.pcObj.specsObj.cpu;
    const pcCpuCooler = cardPlayersObj.pcObj.specsObj.cpuCooler;
    const pcMotherboard = cardPlayersObj.pcObj.specsObj.motherboard;
    const pcMemory = cardPlayersObj.pcObj.specsObj.memory;
    const pcStorage = cardPlayersObj.pcObj.specsObj.storage;
    const pcGraphicsCard = cardPlayersObj.pcObj.specsObj.graphicsCard;
    const pcOpticalDrive = cardPlayersObj.pcObj.specsObj.opticalDrive;
    const pcPowerSupply = cardPlayersObj.pcObj.specsObj.powerSupply;
    const pcCase = cardPlayersObj.pcObj.specsObj.pcCase;
    const pcMonitor = cardPlayersObj.pcObj.specsObj.monitor;
    const pcMouse = cardPlayersObj.pcObj.specsObj.mouse;
    const pcKeyboard = cardPlayersObj.pcObj.specsObj.keyboard;
      
    
    // ---------------------------------------------
    //   ID & Friend
    // ---------------------------------------------
    
    const idArr = cardPlayersObj.idArr;
    const activityTimeArr = cardPlayersObj.activityTimeObj.valueArr;
    const lookingForFriendsIcon = cardPlayersObj.lookingForFriendsObj.icon;
    const lookingForFriendsComment = cardPlayersObj.lookingForFriendsObj.comment;
    const voiceChatComment = cardPlayersObj.voiceChatObj.comment;
    
    
    // ---------------------------------------------
    //   Link
    // ---------------------------------------------
    
    const linkArr = cardPlayersObj.linkArr;
    
    
    
    
    // --------------------------------------------------
    //   Edit Form
    // --------------------------------------------------
    
    const cardPlayerEditFormOpenObj = stores.cardPlayer.cardPlayerEditFormOpenObj;
    
    let editFormOpen = false;
    
    if (cardPlayers_id in cardPlayerEditFormOpenObj) {
      editFormOpen = cardPlayerEditFormOpenObj[cardPlayers_id];
    }
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   cardPlayers_id: {green ${cardPlayers_id}}
    //   users_id: {green ${users_id}}
    //   stores.data.usersLoginObj._id: {green ${stores.data.usersLoginObj._id}}
    //   users_id: {green ${users_id}}
    //   editFormOpen: {green ${editFormOpen}}
    // `);
    
    
    // console.log(`
    //   ----- cardPlayerEditFormOpenObj -----\n
    //   ${util.inspect(cardPlayerEditFormOpenObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- cardPlayersObj -----\n
    //   ${util.inspect(cardPlayersObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
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
            // cardPlayers_id={cardPlayers_id}
            // showCardPlayerButton={false}
            cardGames_id={cardGames_id}
            showCardGameButton={showCardGameButton}
          />
          
          
          {/* 右上に設置されているパネル開閉用のボタン */}
          <ExpandMoreBox>
            <IconButton
              onClick={() => handlePanelExpanded(cardPlayers_id)}
              aria-expanded={panelExpanded}
              aria-label="Show more"
              disabled={panelButtonDisabled}
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
          {editFormOpen ? (
            
            <FormPlayer
              cardPlayers_id={cardPlayers_id}
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
                  birthdayValue={birthdayValue}
                  birthdayAlternativeText={birthdayAlternativeText}
                  sexValue={sexValue}
                  sexAlternativeText={sexAlternativeText}
                  addressValue={addressValue}
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
                
                
                {/* ID & Friend */}
                <IdFriend
                  idArr={idArr}
                  activityTimeArr={activityTimeArr}
                  lookingForFriendsIcon={lookingForFriendsIcon}
                  lookingForFriendsComment={lookingForFriendsComment}
                  voiceChatComment={voiceChatComment}
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
                    cardPlayers_id={cardPlayers_id}
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