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
  // background-color: thistle;
`;


// ---------------------------------------------
//   Top / User Infomation
// ---------------------------------------------

const UserBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  // width: 100%;
  margin: 0;
  padding: 0;
  // background-color: red;
`;

const UserThumbnailBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0 0 0 0;
  // background-color: blue;
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  // margin: 15px 12px 12px 10px;
  padding: 2px 0 0 10px;
  // background-color: thistle;
  
  // width: 100%;
  // max-width: 320px;
  
  @media screen and (max-width: 480px) {
    max-width: initial;
  }
`;

const UserNameBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  // width: 100%;
  margin: 0;
  padding: 0;
  // padding: 0 12px 0 0;
  // line-height: 1em;
  // word-wrap: break-word;
  // background-color: thistle;
`;


// ---------------------------------------------
//   Top / Expand More Button
// ---------------------------------------------

const ExpandMoreBox = styled.div`
  margin: 0 0 0 auto;
  padding: 0;
  // background-color: pink;
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
    // margin: 0;
    // padding-bottom: 0;
  }
`;


// ---------------------------------------------
//   Content / Comment
// ---------------------------------------------

const CommentBox = styled.div`
  // font-size: 14px;
  // line-height: 1.6em;
  // margin: 12px 0 10px 3px;
  // padding: 0 0 0 18px;
`;


// ---------------------------------------------
//   Content / ItemBox
// ---------------------------------------------

const ComponentBox = styled.div`
  margin: 28px 0 0 0;
  padding: 0;
`;



// ---------------------------------------------
//   FollowBox
// ---------------------------------------------

const StyledCardActions = styled(CardActions)`
  && {
    // font-size: 14px;
    // line-height: 1.6em;
    // margin-bottom: 0;
    padding-bottom: 0;
  }
`;

// const FollowBox = styled.div`
//   margin: 0 0 10px 10px;
//   padding: 0;
// `;

// const FollowBox = styled.div`
//   margin: 0 0 0 10px;
//   padding: 0;
// `;




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
    //   必要な情報を取得
    // --------------------------------------------------
    
    const {
      
      panelExpandedObj,
      handlePanelExpanded,
      buttonDisabledObj
      
    } = stores.layout;
    
    const {
      
      cardPlayersObj
      
    } = stores.data;
    
    const {
      
      imageSrcSet,
      imageSrc,
      imageAlt
      
    } = stores.data.cardPlayersObj[cardPlayers_id].imageArr[0];
    
    
    // --------------------------------------------------
    //   オブジェクト内にcardPlayers_idがない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (cardPlayers_id in cardPlayersObj === false) {
      return null;
    }
    
    
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
    //   プロフィール情報
    // --------------------------------------------------
    
    const users_id = cardPlayersObj[cardPlayers_id].users_id;
    const comment = cardPlayersObj[cardPlayers_id].comment;
    
    
    
    // console.log(`
    //   cardPlayersObj: \n${util.inspect(cardPlayersObj, { colors: true, depth: null })}
    // `);
    
    // console.log(`
    //   Follow: \n${util.inspect(Follow, { colors: true, depth: null })}
    // `);
    
    // console.log(chalk`
    //   cardPlayers_id: {green ${cardPlayers_id}}
    // `);
    
    
    // console.log(chalk`
    //   users_id: {green ${users_id}}
      
    //   imageSrcSet: {green ${imageSrcSet}}
    //   imageSrc: {green ${imageSrc}}
    //   imageAlt: {green ${imageAlt}}
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
            <CommentBox>
              <Paragraph text={comment} />
            </CommentBox>
            
            
            {/* 年齢・性別などのプロフィール */}
            <ComponentBox>
              <Profile cardPlayers_id={cardPlayers_id} />
            </ComponentBox>
            
            
            {/* 所有ハード */}
            <ComponentBox>
              <Hardware cardPlayers_id={cardPlayers_id} />
            </ComponentBox>
            
            
            {/* スマートフォン */}
            <ComponentBox>
              <Smartphone cardPlayers_id={cardPlayers_id} />
            </ComponentBox>
            
            
            {/* タブレット */}
            <ComponentBox>
              <Tablet cardPlayers_id={cardPlayers_id} />
            </ComponentBox>
            
            
            {/* PC */}
            <ComponentBox>
              <Pc cardPlayers_id={cardPlayers_id} />
            </ComponentBox>
            
            
            {/* ID & Friend */}
            <ComponentBox>
              <IdFriend cardPlayers_id={cardPlayers_id} />
            </ComponentBox>
            
            
            {/* Link */}
            <ComponentBox>
              <Link cardPlayers_id={cardPlayers_id} />
            </ComponentBox>
            
            
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