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
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';


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
  padding: 4px 0 0 10px;
  // background-color: thistle;
  
  max-width: 320px;
  
  @media screen and (max-width: 480px) {
    max-width: initial;
  }
`;

const UserNameBox = styled.div`
  display: flex;
  flex-flow: row wrap;
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
    //   Expanded
    // --------------------------------------------------
    
    const {
      
      cardExpandedObj,
      handleCardExpanded
      
    } = stores.cardPlayer;
    
    
    let cardExpanded = true;
    
    if (cardPlayerId in cardExpandedObj) {
      cardExpanded = cardExpandedObj[cardPlayerId];
    }
    
    
    
    // --------------------------------------------------
    //   Data - プレイヤーカードオブジェクト取得
    // --------------------------------------------------
    
    const {
      
      cardPlayerObj
      
    } = stores.data;
    
    
    // --------------------------------------------------
    //   オブジェクト内にcardPlayerIdがない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (cardPlayerId in cardPlayerObj === false) {
      return null;
    }
    
    
    
    // --------------------------------------------------
    //   画像
    // --------------------------------------------------
    
    const {
      
      imageSrcSet,
      imageSrc,
      imageAlt
      
    } = stores.data.cardPlayerObj[cardPlayerId];
    
    // let imageSrcSet = '';
    // let imageSrc = '';
    // let imageAlt = '';
    // const imageVideoArr = cardPlayerObj[cardPlayerId].imageVideoArr;
    
    // if (imageVideoArr.length > 0) {
      
    //   const imageSetArr = imageVideoArr[0].imageSetArr;
    //   const tempArr = [];
      
    //   for (let value of imageSetArr.values()) {
        
    //     if (value.w !== 'source') {
    //       tempArr.push(`${value.src} ${value.w}`);
    //       imageSrc = value.src;
    //     }
        
    //   }
      
    //   imageSrcSet = tempArr.join(', ');
    //   imageAlt = imageVideoArr[0].caption;
      
    // }
    
    
    // --------------------------------------------------
    //   プロフィール情報
    // --------------------------------------------------
    
    const userId = cardPlayerObj[cardPlayerId].userId;
    const comment = cardPlayerObj[cardPlayerId].comment;
    
    
    
    
    
    
    // console.log(chalk`
    //   userId: {green ${userId}}
      
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
              <UserThumbnail id={userId} />
            </UserThumbnailBox>
            
            
            <UserInfoBox>
            
              <UserNameBox>
                <UserName id={userId} />
              </UserNameBox>
              
            </UserInfoBox>
            
          </UserBox>
          
          
          {/* 右上に設置されているパネル開閉用のボタン */}
          <ExpandMoreBox>
            <IconButton
              onClick={() => handleCardExpanded(cardPlayerId)}
              aria-expanded={cardExpanded}
              aria-label="Show more"
            >
              {cardExpanded ? (
                <IconExpandLess />
              ) : (
                <IconExpandMore />
              )}
            </IconButton>
          </ExpandMoreBox>
          
        </CardTopBox>
        
        
        
        {/* カードのコンテンツ - 折り畳まれる部分 */}
        <Collapse in={cardExpanded} timeout="auto" unmountOnExit>
          
          
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
              <Profile cardPlayerId={cardPlayerId} />
            </ComponentBox>
            
            
            {/* 所有ハード */}
            <ComponentBox>
              <Hardware cardPlayerId={cardPlayerId} />
            </ComponentBox>
            
            
            {/* スマートフォン */}
            <ComponentBox>
              <Smartphone cardPlayerId={cardPlayerId} />
            </ComponentBox>
            
            
            {/* タブレット */}
            <ComponentBox>
              <Tablet cardPlayerId={cardPlayerId} />
            </ComponentBox>
            
            
            {/* PC */}
            <ComponentBox>
              <Pc cardPlayerId={cardPlayerId} />
            </ComponentBox>
            
            
            {/* ID & Friend */}
            <ComponentBox>
              <IdFriend cardPlayerId={cardPlayerId} />
            </ComponentBox>
            
            
          </StyledCardContent>
          
          
          {/* リンク */}
          <CardActions disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
          </CardActions>
          
          
        </Collapse>
        
        
      </Card>
    );
    
  }
  
};