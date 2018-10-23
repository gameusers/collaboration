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
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import MoreVertIcon from '@material-ui/icons/MoreVert';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Paragraph from '../../layout/components/paragraph';
import UserThumbnail from '../../user/components/thumbnail';
import UserName from '../../user/components/name';





// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// ---------------------------------------------
//   Card
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
//   Card / User
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
//   Card / Expand More
// ---------------------------------------------

const ExpandMoreBox = styled.div`
  margin: 0 0 0 auto;
  padding: 0;
  // background-color: pink;
`;


// ---------------------------------------------
//   Content / Image
// ---------------------------------------------

const ImageBox = styled.div`
  // margin: 12px 0 10px 3px;
  // padding: 0 0 0 18px;
`;


// ---------------------------------------------
//   Content / Description
// ---------------------------------------------

const CommentBox = styled.div`
  font-size: 14px;
  line-height: 1.6em;
  // margin: 12px 0 10px 3px;
  // padding: 0 0 0 18px;
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
    
    const { stores, id } = this.props;
    
    
    
    // ---------------------------------------------
    //   Expanded
    // ---------------------------------------------
    
    const {
      
      cardExpandedObj,
      handleCardExpanded
      
    } = stores.cardPlayer;
    
    
    let cardExpanded = true;
    
    if (id in cardExpandedObj) {
      cardExpanded = cardExpandedObj[id];
    }
    
    
    
    // ---------------------------------------------
    //   Data
    // ---------------------------------------------
    
    const {
      
      cardPlayerObj
      
    } = stores.data;
    
    
    
    // ---------------------------------------------
    //   Error / 空のコンポーネントを返す
    // ---------------------------------------------
    
    if (id in cardPlayerObj === false) {
      return null;
    }
    
    
    // ---------------------------------------------
    //   必要な情報
    // ---------------------------------------------
    
    const userId = cardPlayerObj[id].userId;
    const comment = cardPlayerObj[id].comment;
    
    let imageSrcSet = '';
    let imageSrc = '';
    let imageAlt = '';
    const imageVideoArr = cardPlayerObj[id].imageVideoArr;
    
    if (imageVideoArr.length > 0) {
      
      const imageSetArr = imageVideoArr[0].imageSetArr;
      const tempArr = [];
      
      for (let value of imageSetArr.values()) {
        
        if (value.w !== 'source') {
          tempArr.push(`${value.src} ${value.w}`);
          imageSrc = value.src;
        }
        
      }
      
      imageSrcSet = tempArr.join(', ');
      imageAlt = imageVideoArr[0].caption;
      
    }
    
    
    
    console.log(chalk`
      id in cardPlayerObj: {green ${'AAA' in cardPlayerObj}}
      userId: {green ${userId}}
      
      imageSrcSet: {green ${imageSrcSet}}
      imageSrc: {green ${imageSrc}}
      imageAlt: {green ${imageAlt}}
    `);
    
    
    
    
    
    // ---------------------------------------------
    //   Title
    // ---------------------------------------------
    
    // const title = summary ? <StyledH2>{summary}</StyledH2> : summaryComponent;
    
    
    
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
              onClick={() => handleCardExpanded(id)}
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
          
          
          {/*
          <ImageBox>
              <img
                srcSet="/static/img/card/player/H_NXaMPKG/320w.jpg 320w,
                        /static/img/card/player/H_NXaMPKG/480w.jpg 480w,
                        /static/img/card/player/H_NXaMPKG/640w.jpg 640w,
                        /static/img/card/player/H_NXaMPKG/800w.jpg 800w"
                src="/static/img/card/player/H_NXaMPKG/800w.jpg"
                alt="妖精の衣装を着たエルバ"
              />
             </ImageBox>
          */}
          
          
          {/*<CardMedia
            image="/static/img/sample/lion-1920.jpg"
            // title="Contemplative Reptile"
            style={{ height: 0, paddingTop: '56.25%' }}
          />*/}
          
          
          {/* テキスト */}
          <CardContent>
            <CommentBox>
              <Paragraph text={comment} />
            </CommentBox>
          </CardContent>
          
          
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