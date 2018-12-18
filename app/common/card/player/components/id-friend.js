// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

// import chalk from 'chalk';
// import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------


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

const Container = styled.div`
  margin: 28px 0 0 0;
  padding: 0;
`;


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
    
    const {
      
      idArr,
      activityTimeArr,
      lookingForFriendsIcon,
      lookingForFriendsComment,
      voiceChatComment
      
    } = this.props;
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (
      !idArr &&
      !activityTimeArr &&
      !lookingForFriendsIcon &&
      !lookingForFriendsComment &&
      !voiceChatComment
    ) {
      return null;
    }
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - ID
    // --------------------------------------------------
    
    const componentIdArr = [];
    
    if (Array.isArray(idArr) && idArr.length > 0) {
      
      for (const [index, value] of idArr.entries()) {
        
        
        // ---------------------------------------------
        //   PlayStation
        // ---------------------------------------------
        
        if (value.type === 'PlayStation') {
          
          componentIdArr.push(
            <Id key={`id${index}`}><strong>PlayStation ID: </strong>{value.value}</Id>
          );
          
        }
        
        
        // ---------------------------------------------
        //   Xbox
        // ---------------------------------------------
        
        if (value.type === 'Xbox') {
          
          componentIdArr.push(
            <Id key={`id${index}`}><strong>Xbox ID: </strong>{value.value}</Id>
          );
          
        }
        
        
        // ---------------------------------------------
        //   Nintendo
        // ---------------------------------------------
        
        if (value.type === 'Nintendo') {
          
          componentIdArr.push(
            <Id key={`id${index}`}><strong>Nintendo ID: </strong>{value.value}</Id>
          );
          
        }
        
        
        // ---------------------------------------------
        //   Steam
        // ---------------------------------------------
        
        if (value.type === 'Steam') {
          
          componentIdArr.push(
            <Id key={`id${index}`}><strong>Steam ID: </strong>{value.value}</Id>
          );
          
        }
        
        
        // ---------------------------------------------
        //   Other
        // ---------------------------------------------
        
        if (value.type === 'Other') {
          
          componentIdArr.push(
            <Id key={`id${index}`}><strong>{value.label}: </strong>{value.value}</Id>
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
    
    if (Array.isArray(activityTimeArr) && activityTimeArr.length > 0) {
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
    
    if (lookingForFriendsComment) {
      
      const componentFriendHeading = <FriendHeading>フレンド募集: </FriendHeading>;
      const componentFriendComment = <FriendComment>{lookingForFriendsComment}</FriendComment>;
      
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
    
    if (voiceChatComment) {
      
      const componentVoiceChatHeading = <VoiceChatHeading>ボイスチャット可能: </VoiceChatHeading>;
      const componentVoiceChatComment = <VoiceChatComment>{voiceChatComment}</VoiceChatComment>;
      
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
    //   空の場合、nullを返す
    // --------------------------------------------------
    
    if (!componentIdBox && !componentActivityTimeBox && !componentFriendVoiceBox) {
      return null;
    }
    
    
    // --------------------------------------------------
    //   Heading
    // --------------------------------------------------
    
    let componentHeading = <Heading>ID</Heading>;
    
    if (lookingForFriendsComment || voiceChatComment) {
      componentHeading = <Heading>ID・フレンド募集</Heading>;
    }
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   cardPlayers_id: {green ${cardPlayers_id}}
    // `);
    
    // console.log(`
    //   hardwareArr: \n${util.inspect(hardwareArr, { colors: true, depth: null })}
    // `);
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
        
        <HeadingBox>
          <StyledIcon />
          {componentHeading}
        </HeadingBox>
        
        {componentIdBox}
        {componentActivityTimeBox}
        {componentFriendVoiceBox}
        
      </Container>
    );
    
  }
  
};