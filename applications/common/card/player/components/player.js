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
import UserThumbnail from '../../../user/components/thumbnail';
import UserName from '../../../user/components/name';
import Profile from './profile';
import Smartphone from './smartphone';
import Tablet from './tablet';
import Pc from './pc';
import Hardware from './hardware';
import IdFriend from './id-friend';
import Follow from './follow';
import Link from './link';





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
//   Top / User Infomation
// ---------------------------------------------

const UserBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
  padding: 0;
`;

const UserThumbnailBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0 0 0 0;
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 2px 0 0 10px;
  
  @media screen and (max-width: 480px) {
    max-width: initial;
  }
`;

const UserNameBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 0;
`;


// ---------------------------------------------
//   Top / Expand More Button
// ---------------------------------------------

const ExpandMoreBox = styled.div`
  margin: 0 0 0 auto;
  padding: 0;
`;



// ---------------------------------------------
//   Image
// ---------------------------------------------

const ImageBox = styled.div`
  // margin: 12px 0 10px 3px;
  // padding: 0 0 0 18px;
`;



// ---------------------------------------------
//   Content / Container
// ---------------------------------------------

const StyledCardContent = styled(CardContent)`
  && {
    font-size: 14px;
    line-height: 1.6em;
  }
`;


// ---------------------------------------------
//   Card Actions
// ---------------------------------------------

const StyledCardActions = styled(CardActions)`
  && { 
    padding-bottom: 0;
  }
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
    this.props.stores.layout.handleButtonDisabledObj(`${this.props.users_id}-card-players-panel`, false);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, users_id } = this.props;
    
    
    // --------------------------------------------------
    //   カードデータが存在しない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (users_id in stores.data.cardPlayersObj === false) {
      return null;
    }
    
    // console.log(chalk`
    //   users_id: {green ${users_id}}
    // `);
    
    // console.log(`
    //   ----- cardPlayersObj -----\n
    //   ${util.inspect(cardPlayersObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // return null;
    
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   language
    // ---------------------------------------------
    
    const language = 'ja';
    
    
    // ---------------------------------------------
    //   Panel
    // ---------------------------------------------
    
    const { panelExpandedObj, handlePanelExpanded, buttonDisabledObj } = stores.layout;
    
    
    // ---------------------------------------------
    //   Access Date & Level & Follow
    // ---------------------------------------------
    
    const {
      
      accessDate,
      level,
      followedCount,
      followed
      
    } = stores.data.usersObj[users_id];
    
    
    // ---------------------------------------------
    //   Name & Status & Thumbnail
    // ---------------------------------------------
    
    const cardPlayersObj = stores.data.cardPlayersObj[users_id];
    
    const {
      
      _id,
      name,
      status,
      thumbnail,
      comment
      
    } = cardPlayersObj;
    
    let thumbnailSrc = '';
    
    if (thumbnail) {
      thumbnailSrc = `/static/img/card/players/${_id}/thumbnail/image.jpg`;
    }
    
    // return null;
    // ---------------------------------------------
    //   Image
    // ---------------------------------------------
    
    const {
      
      imageSrcSet,
      imageSrc,
      imageAlt
      
    } = cardPlayersObj.imageArr[0];
    
    
    // ---------------------------------------------
    //   dataObj
    // ---------------------------------------------
    
    // const dataObj = cardPlayersObj.dataArr.find((value) => {
    //   return value.language === language;
    // });
    
    
    // ---------------------------------------------
    //   Comment
    // ---------------------------------------------
    
    // const comment = comment;
    
    
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
    
    const hardwareArr = cardPlayersObj.ownedHardwareObj.valueArr;
    
    
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
    //   Panel Expanded & Button Disabled
    // --------------------------------------------------
    
    let panelExpanded = true;
    
    if (users_id in panelExpandedObj) {
      panelExpanded = panelExpandedObj[`${users_id}-card-players`];
    }
    
    let panelButtonDisabled = true;
    
    if (`${users_id}-card-players-panel` in buttonDisabledObj) {
      panelButtonDisabled = buttonDisabledObj[`${users_id}-card-players-panel`];
    }
    
    
    
    
    // --------------------------------------------------
    //   データ取り出し
    // --------------------------------------------------
    
    // console.log(chalk`
    //   accessDate: {green ${accessDate}}
    //   level: {green ${level}}
    //   followedCount: {green ${followedCount}}
    // `);
    
    // console.log(`
    //   cardPlayersObj: \n${util.inspect(cardPlayersObj, { colors: true, depth: null })}
    // `);
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Card>
        
        
        {/* カード上部 */}
        <CardTopBox>
          
          {/* ユーザー情報 - サムネイル画像・ハンドルネームなど */}
          <UserBox>
            
            <UserThumbnailBox>
              <UserThumbnail thumbnailSrc={thumbnailSrc} />
            </UserThumbnailBox>
            
            
            <UserInfoBox>
              
              <UserNameBox>
                <UserName
                  users_id={users_id}
                  accessDate={accessDate}
                  // anonymity={true}
                  name={name}
                  status={status}
                  level={level}
                />
              </UserNameBox>
              
            </UserInfoBox>
            
          </UserBox>
          
          
          {/* 右上に設置されているパネル開閉用のボタン */}
          <ExpandMoreBox>
            <IconButton
              onClick={() => handlePanelExpanded(`${users_id}-card-players`)}
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
          
          
          {/* 大きな画像 */}
          {imageSrc &&
            <ImageBox>
              <img
                srcSet={imageSrcSet}
                src={imageSrc}
                alt={imageAlt}
              />
            </ImageBox>
          }
          
          
          {/* プロフィール */}
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
            <Hardware hardwareArr={hardwareArr} />
            
            
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
            
            
            {/* Link */}
            <Link linkArr={linkArr} />
            
            
          </StyledCardContent>
          
          
          {/* フォローボタン */}
          <StyledCardActions>
            <Follow
              users_id={users_id}
              followedCount={followedCount}
              followed={followed}
            />
          </StyledCardActions>
          
        </Collapse>
        
        
      </Card>
    );
    
  }
  
};