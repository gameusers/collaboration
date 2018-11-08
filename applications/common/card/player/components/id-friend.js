// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import Icon from '@material-ui/icons/Style';
import IconHeadsetMic from '@material-ui/icons/HeadsetMic';


// ---------------------------------------------
//   Components
// ---------------------------------------------





// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// ---------------------------------------------
//   見出し
// ---------------------------------------------

const HeadingBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-Ids: center;
`;

const StyledIcon = styled(Icon)`
  && {
    font-size: 24px;
  }
`;

const Heading = styled.h3`
  margin: 2px 0 0 4px;
`;


// ---------------------------------------------
//   ID
// ---------------------------------------------

const IdBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  line-height: 1.8em;
  margin: 4px 0 0 0;
  padding: 0;
  
  @media screen and (max-width: 480px) {
    flex-flow: column wrap;
  }
`;

const Id = styled.div`
  margin: 0 20px 0 0;
  padding: 0;
  
  @media screen and (max-width: 480px) {
    margin: 0;
  }
`;



// ---------------------------------------------
//   活動時間
// ---------------------------------------------

const ActivityTimeBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  line-height: 1.8em;
  margin: 10px 0 0 0;
  padding: 0;
  
  @media screen and (max-width: 480px) {
    flex-flow: column wrap;
  }
`;

const ActivityTime = styled.div`
  margin: 0 20px 0 0;
  padding: 0;
  
  @media screen and (max-width: 480px) {
    margin: 0;
  }
`;



// ---------------------------------------------
//   フレンド募集・ボイスチャット可能
// ---------------------------------------------

const FriendVoiceBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  line-height: 1.8em;
  margin: 6px 0 0 0;
  padding: 0 0 0 0;
  
  @media screen and (max-width: 480px) {
    flex-flow: column wrap;
  }
`;

const FriendBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin: 4px 0 0 0;
`;

const FriendIcon = styled.div`
  margin: 0;
`;

const FriendHeading = styled.h3`
  margin: 0 4px 0 4px;
`;

const FriendComment = styled.div`
  margin: 0 20px 0 0;
  padding: 0;
  
  @media screen and (max-width: 480px) {
    margin: 0;
  }
`;

const VoiceChatBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin: 4px 0 0 0;
`;

const VoiceChatIcon = styled(IconHeadsetMic)`
  && {
    font-size: 24px;
  }
`;

const VoiceChatHeading = styled.h3`
  margin: 0 4px 0 4px;
`;

const VoiceChatComment = styled.div`
  margin: 0;
  padding: 0;
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
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, cardPlayerId } = this.props;
    
    
    
    // --------------------------------------------------
    //   Data - 必要な情報を取得
    // --------------------------------------------------
    
    // const {
      
    //   playstationObj,
    //   xboxObj,
    //   nintendoObj,
    //   steamObj,
    //   otherArr
      
    // } = stores.data.cardPlayerObj[cardPlayerId].idObj;
    const idArr = stores.data.cardPlayerObj[cardPlayerId].idArr;
    const activityTimeArr = stores.data.cardPlayerObj[cardPlayerId].activityTimeObj.valueArr;
    
    const lookingForFriends = stores.data.cardPlayerObj[cardPlayerId].lookingForFriendsObj.value;
    const lookingForFriendsIcon = stores.data.cardPlayerObj[cardPlayerId].lookingForFriendsObj.icon;
    const lookingForFriendsComment = stores.data.cardPlayerObj[cardPlayerId].lookingForFriendsObj.comment;
    
    const voiceChat = stores.data.cardPlayerObj[cardPlayerId].voiceChatObj.value;
    const voiceChatComment = stores.data.cardPlayerObj[cardPlayerId].voiceChatObj.comment;
    
    const linkArr = stores.data.cardPlayerObj[cardPlayerId].linkArr;
    
    
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (
      idArr.length === 0 &&
      activityTimeArr.length === 0 &&
      !lookingForFriends &&
      !voiceChat &&
      linkArr.length === 0
    ) {
      return null;
    }
    
    
    
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - ID
    // --------------------------------------------------
    
    const componentIdArr = [];
    
    if (idArr.length > 0) {
      
      for (const [index, value] of idArr.entries()) {
        
        
        // ---------------------------------------------
        //   PlayStation
        // ---------------------------------------------
        
        if (value.type === 'playstation') {
          
          componentIdArr.push(
            <Id key={`id${index}`}><strong>PlayStation ID: </strong>{value.value}</Id>
          );
          
        }
        
        
        // ---------------------------------------------
        //   Xbox
        // ---------------------------------------------
        
        if (value.type === 'xbox') {
          
          componentIdArr.push(
            <Id key={`id${index}`}><strong>Xbox ID: </strong>{value.value}</Id>
          );
          
        }
        
        
        // ---------------------------------------------
        //   Nintendo
        // ---------------------------------------------
        
        if (value.type === 'nintendo') {
          
          componentIdArr.push(
            <Id key={`id${index}`}><strong>Nintendo ID: </strong>{value.value}</Id>
          );
          
        }
        
        
        // ---------------------------------------------
        //   Steam
        // ---------------------------------------------
        
        if (value.type === 'steam') {
          
          componentIdArr.push(
            <Id key={`id${index}`}><strong>Steam ID: </strong>{value.value}</Id>
          );
          
        }
        
        
        // ---------------------------------------------
        //   Other
        // ---------------------------------------------
        
        if (value.type === 'other') {
          
          componentIdArr.push(
            <Id key={`id${index}`}><strong>{value.label} ID: </strong>{value.value}</Id>
          );
          
        }
        
      }
      
    }
    
    
    // ---------------------------------------------
    //   コンポーネント作成
    // ---------------------------------------------
    
    let componentIdBox = '';
    
    if (componentIdArr.length > 0) {
       componentIdBox = <IdBox>{componentIdArr}</IdBox>;
    }
    
    
    
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - 活動時間
    // --------------------------------------------------
    
    const componentActivityTimeArr = [];
    
    if (activityTimeArr.length > 0) {
      for (const [index, value] of activityTimeArr.entries()) {
        
        const weekTextArr = ['月', '火', '水', '木', '金', '土', '日'];
        
        
        let week = '';
        
        if (value.weekArr.length > 0) {
          
          const tempArr = [];
          
          for (let value of value.weekArr.values()) {
            tempArr.push(weekTextArr[value]);
          }
          
          week = ` (${tempArr.join(' / ')})`;
        }
        
        
        componentActivityTimeArr.push(
          <ActivityTime key={`activityTime${index}`}>
            {value.beginTime} ～ {value.endTime}{week}
          </ActivityTime>
        );
        
      }
    }
    
    let componentActivityTimeBox = '';
    
    if (componentActivityTimeArr.length > 0) {
       componentActivityTimeBox = <ActivityTimeBox><strong>活動時間: </strong> {componentActivityTimeArr}</ActivityTimeBox>;
    }
    
    
    
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - フレンド募集・ボイスチャット可能
    // --------------------------------------------------
    
    const componentFriendVoiceArr = [];
    
    
    // ---------------------------------------------
    //   フレンド募集
    // ---------------------------------------------
    
    if (lookingForFriends) {
      
      let componentFriendHeading = <FriendHeading>フレンド募集</FriendHeading>;
      let componentFriendComment = '';
      
      if (lookingForFriendsComment) {
        
        componentFriendHeading = <FriendHeading>フレンド募集: </FriendHeading>;
        componentFriendComment = <FriendComment>{lookingForFriendsComment}</FriendComment>;
        
      }
      
      componentFriendVoiceArr.push(
        <FriendBox key="lookingForFriends">
          <FriendIcon>
            <img
              src={`/static/img/common/blob-emoji/${lookingForFriendsIcon}.png`}
              width="26"
              height="26"
            />
          </FriendIcon>
          
          {componentFriendHeading}
          {componentFriendComment}
        </FriendBox>
      );
      
    }
    
    
    
    // ---------------------------------------------
    //   ボイスチャット
    // ---------------------------------------------
    
    if (voiceChat) {
      
      let componentVoiceChatHeading = <VoiceChatHeading>ボイスチャット可能</VoiceChatHeading>;
      let componentVoiceChatComment = '';
      
      if (voiceChatComment) {
        
        componentVoiceChatHeading = <VoiceChatHeading>ボイスチャット可能: </VoiceChatHeading>;
        componentVoiceChatComment = <VoiceChatComment>{voiceChatComment}</VoiceChatComment>;
        
      }
      
      componentFriendVoiceArr.push(
        <VoiceChatBox key="voiceChat">
          <VoiceChatIcon />
          
          {componentVoiceChatHeading}
          {componentVoiceChatComment}
        </VoiceChatBox>
      );
      
    }
    
    
    
    // ---------------------------------------------
    //   コンポーネント作成
    // ---------------------------------------------
    
    let componentFriendVoiceBox = '';
    
    if (componentFriendVoiceArr.length > 0) {
       componentFriendVoiceBox = <FriendVoiceBox>{componentFriendVoiceArr}</FriendVoiceBox>;
    }
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   cardPlayerId: {green ${cardPlayerId}}
    // `);
    
    // console.log(`
    //   hardwareArr: \n${util.inspect(hardwareArr, { colors: true, depth: null })}
    // `);
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        <HeadingBox>
          <StyledIcon />
          <Heading>ID・フレンド募集</Heading>
        </HeadingBox>
        
        {componentIdBox}
        {componentActivityTimeBox}
        {componentFriendVoiceBox}
        
      </React.Fragment>
    );
    
  }
  
};