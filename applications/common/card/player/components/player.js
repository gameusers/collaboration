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
    this.props.stores.layout.handleButtonDisabledObj(`${this.props.cardPlayers_id}-panel`, false);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, cardPlayers_id } = this.props;
    
    
    // --------------------------------------------------
    //   カードデータが存在しない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (cardPlayers_id in stores.data.cardPlayersObj === false) {
      return null;
    }
    
    
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
    
    const {
      
      panelExpandedObj,
      handlePanelExpanded,
      buttonDisabledObj
      
    } = stores.layout;
    
    
    const cardPlayersObj = stores.data.cardPlayersObj[cardPlayers_id];
    
    
    // ---------------------------------------------
    //   Image
    // ---------------------------------------------
    
    const {
      
      imageSrcSet,
      imageSrc,
      imageAlt
      
    } = cardPlayersObj.imageArr[0];
    
    
    // ---------------------------------------------
    //   Users ID
    // ---------------------------------------------
    
    const users_id = cardPlayersObj.users_id;
    
    
    // ---------------------------------------------
    //   dataObj
    // ---------------------------------------------
    
    const dataObj = cardPlayersObj.dataArr.find((value) => {
      return value.language === language;
    });
    
    
    // ---------------------------------------------
    //   Comment
    // ---------------------------------------------
    
    const comment = dataObj.comment;
    
    
    // ---------------------------------------------
    //   Profile
    // ---------------------------------------------
    
    const birthdayValue = dataObj.birthdayObj.value;
    const birthdayAlternativeText = dataObj.birthdayObj.alternativeText;
    const sexValue = dataObj.sexObj.value;
    const sexAlternativeText = dataObj.sexObj.alternativeText;
    const addressValue = dataObj.addressObj.value;
    const gamingExperienceValue = dataObj.gamingExperienceObj.value;
    const gamingExperienceAlternativeText = dataObj.gamingExperienceObj.alternativeText;
    const hobbiesValueArr = dataObj.hobbiesObj.valueArr;
    const specialSkillsValueArr = dataObj.specialSkillsObj.valueArr;
    
    
    // ---------------------------------------------
    //   Hardware
    // ---------------------------------------------
    
    const hardwareArr = dataObj.ownedHardwareObj.valueArr;
    
    
    // ---------------------------------------------
    //   Smartphone
    // ---------------------------------------------
    
    const smartphoneModel = dataObj.smartphoneObj.model;
    const smartphoneComment = dataObj.smartphoneObj.comment;
    
    
    // ---------------------------------------------
    //   Tablet
    // ---------------------------------------------
    
    const tabletModel = dataObj.tabletObj.model;
    const tabletComment = dataObj.tabletObj.comment;
    
    
    // ---------------------------------------------
    //   PC
    // ---------------------------------------------
    
    const pcModel = dataObj.pcObj.model;
    const pcComment = dataObj.pcObj.comment;
    const pcOs = dataObj.pcObj.specsObj.os;
    const pcCpu = dataObj.pcObj.specsObj.cpu;
    const pcCpuCooler = dataObj.pcObj.specsObj.cpuCooler;
    const pcMotherboard = dataObj.pcObj.specsObj.motherboard;
    const pcMemory = dataObj.pcObj.specsObj.memory;
    const pcStorage = dataObj.pcObj.specsObj.storage;
    const pcGraphicsCard = dataObj.pcObj.specsObj.graphicsCard;
    const pcOpticalDrive = dataObj.pcObj.specsObj.opticalDrive;
    const pcPowerSupply = dataObj.pcObj.specsObj.powerSupply;
    const pcCase = dataObj.pcObj.specsObj.pcCase;
    const pcMonitor = dataObj.pcObj.specsObj.monitor;
    const pcMouse = dataObj.pcObj.specsObj.mouse;
    const pcKeyboard = dataObj.pcObj.specsObj.keyboard;
      
    
    // ---------------------------------------------
    //   ID & Friend
    // ---------------------------------------------
    
    const idArr = dataObj.idArr;
    const activityTimeArr = dataObj.activityTimeObj.valueArr;
    const lookingForFriendsIcon = dataObj.lookingForFriendsObj.icon;
    const lookingForFriendsComment = dataObj.lookingForFriendsObj.comment;
    const voiceChatComment = dataObj.voiceChatObj.comment;
    
    
    // ---------------------------------------------
    //   Link
    // ---------------------------------------------
    
    const linkArr = dataObj.linkArr;
    
    
    
    
    
    // --------------------------------------------------
    //   Button Disabled & Panel Expanded
    // --------------------------------------------------
    
    let panelButtonDisabled = true;
    
    if (`${cardPlayers_id}-panel` in buttonDisabledObj) {
      panelButtonDisabled = buttonDisabledObj[`${cardPlayers_id}-panel`];
    }
    
    let panelExpanded = true;
    
    if (cardPlayers_id in panelExpandedObj) {
      panelExpanded = panelExpandedObj[cardPlayers_id];
    }
    
    
    // --------------------------------------------------
    //   データ取り出し
    // --------------------------------------------------
    
    // console.log(`
    //   cardPlayersObj: \n${util.inspect(cardPlayersObj, { colors: true, depth: null })}
    // `);
    
    // console.log(`
    //   dataObj: \n${util.inspect(dataObj, { colors: true, depth: null })}
    // `);
    
    // console.log(chalk`
    //   cardPlayers_id: {green ${cardPlayers_id}}
    // `);
    
    
    // console.log(chalk`
    //   duplication: {green ${duplication}}
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
              <UserThumbnail users_id={users_id} />
            </UserThumbnailBox>
            
            
            <UserInfoBox>
            
              <UserNameBox>
                <UserName users_id={users_id} />
              </UserNameBox>
              
            </UserInfoBox>
            
          </UserBox>
          
          
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
            <Follow cardPlayers_id={cardPlayers_id} />
          </StyledCardActions>
          
        </Collapse>
        
        
      </Card>
    );
    
  }
  
};