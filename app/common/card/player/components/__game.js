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
import Hardware from './hardware';
import Id from './id';
import ActivityTime from './activity-time';
import LookingForFriend from './looking-for-friends';
import VoiceChat from './voice-chat';
import FollowButton from './follow-button';
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
    // line-height: 1.6em;
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
    this.props.stores.layout.handleButtonDisabledObj(`${this.props.cardGames_id}-card-games-panel`, false);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const {
      stores,
      showGameName,
      cardPlayers_id,
      showCardPlayerButton,
      cardGames_id,
      showFollow
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   カードデータが存在しない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (cardGames_id in stores.data.cardGamesObj === false) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   Panel
    // ---------------------------------------------
    
    const {
      
      panelExpandedObj,
      handlePanelExpanded,
      buttonDisabledObj
      
    } = stores.layout;
    
    
    // ---------------------------------------------
    //   cardGamesObj & users_id
    // ---------------------------------------------
    
    const cardGamesObj = stores.data.cardGamesObj[cardGames_id];
    const users_id = cardGamesObj.users_id;
    
    
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
    //   Games
    // ---------------------------------------------
    
    const games_id = cardGamesObj.gamesObj._id;
    const gameUrlID = cardGamesObj.gamesObj.urlID;
    const gameThumbnail = cardGamesObj.gamesObj.thumbnail;
    const gameName = cardGamesObj.gamesObj.name;
    
    
    // ---------------------------------------------
    //   Name & Status & Thumbnail & Comment
    // ---------------------------------------------
    
    const name = cardGamesObj.nameObj.value;
    const status = cardGamesObj.statusObj.value;
    const thumbnail = cardGamesObj.thumbnail;
    const comment = cardGamesObj.commentObj.value;
    
    
    let thumbnailSrc = '';
    
    if (thumbnail) {
      thumbnailSrc = `/static/img/card/games/${cardGames_id}/thumbnail/image.jpg`;
    } else if (gameThumbnail) {
      thumbnailSrc = `/static/img/games/${games_id}/thumbnail/image.jpg`;
    }
    
    
    // ---------------------------------------------
    //   Image
    // ---------------------------------------------
    
    const {
      
      imageSrcSet,
      imageSrc,
      imageAlt
      
    } = cardGamesObj.imageArr[0];
    
    
    // ---------------------------------------------
    //   Hardware
    // ---------------------------------------------
    
    const hardwarePlayingArr = cardGamesObj.hardwarePlayingArr;
      
    
    // ---------------------------------------------
    //   ID & Friend
    // ---------------------------------------------
    
    const idArr = cardGamesObj.idArr;
    const activityTimeArr = cardGamesObj.activityTimeObj.valueArr;
    const lookingForFriendsIcon = cardGamesObj.lookingForFriendsObj.icon;
    const lookingForFriendsComment = cardGamesObj.lookingForFriendsObj.comment;
    const voiceChatComment = cardGamesObj.voiceChatObj.comment;
    
    
    // ---------------------------------------------
    //   Link
    // ---------------------------------------------
    
    const linkArr = cardGamesObj.linkArr;
    
    
    
    
    // --------------------------------------------------
    //   Panel Expanded & Button Disable
    // --------------------------------------------------
    
    let panelExpanded = true;
    
    if (`${cardGames_id}-card-games` in panelExpandedObj) {
      panelExpanded = panelExpandedObj[`${cardGames_id}-card-games`];
    }
    
    let panelButtonDisabled = true;
    
    if (`${cardGames_id}-card-games-panel` in buttonDisabledObj) {
      panelButtonDisabled = buttonDisabledObj[`${cardGames_id}-card-games-panel`];
    }
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   cardGames_id: {green ${cardGames_id}}
    // `);
    
    // console.log(`
    //   ----- cardGamesObj -----\n
    //   ${util.inspect(cardGamesObj, { colors: true, depth: null })}\n
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
            
            gameName={gameName}
            gameUrlID={gameUrlID}
            showGameName={showGameName}
            
            level={level}
            cardPlayers_id={cardPlayers_id}
            showCardPlayerButton={showCardPlayerButton}
            // cardGames_id={cardGames_id}
            // showCardGameButton={false}
          />
          
          
          {/* 右上に設置されているパネル開閉用のボタン */}
          <ExpandMoreBox>
            <IconButton
              onClick={() => handlePanelExpanded(`${cardGames_id}-card-games`)}
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
            <img
              srcSet={imageSrcSet}
              src={imageSrc}
              alt={imageAlt}
              width="100%"
            />
          }
          
          
          {/* プロフィール */}
          <StyledCardContent>
            
            
            {/* コメント */}
            <Paragraph text={comment} />
            
            
            {/* 遊んでいるハード */}
            <Hardware hardwarePlayingArr={hardwarePlayingArr} />
            
            
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
              icon={lookingForFriendsIcon}
              comment={lookingForFriendsComment}
            />
            
            
            {/* ボイスチャット */}
            <VoiceChat
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
              
            </ActionsBox>
          </StyledCardActions>
          
          
        </Collapse>
        
        
      </Card>
    );
    
  }
  
};