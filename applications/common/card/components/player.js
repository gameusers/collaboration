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
import moment from 'moment';


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


// ---------------------------------------------
//   Moment Locale
// ---------------------------------------------

moment.locale('ja');





// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// ---------------------------------------------
//   Top
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
//   Top / User
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
//   Top / Expand More
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
//   Content
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
//   Content / Item
// ---------------------------------------------

const ItemBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  // font-size: 14px;
  line-height: 2.0em;
  margin: 14px 0 0 0;
  padding: 0 0 0 0;
  
  @media screen and (max-width: 480px) {
    flex-flow: column wrap;
  }
`;

const Item = styled.div`
  margin: 0 20px 0 0;
  padding: 0 0 0 0;
  
  @media screen and (max-width: 480px) {
    margin: 0 0 0 0;
  }
`;


// ---------------------------------------------
//   Content / PC Specs
// ---------------------------------------------

const PcSpecsBox = styled.ul`
  // line-height: 1.8em;
  margin: 14px 0 0 0;
  padding: 0 0 0 0;
`;

const PcSpecsTitle = styled.p`
  font-weight: bold;
  margin: 0 0 3px 0;
  padding: 0 0 0 0;
`;

const PcSpecsUl = styled.ul`
  list-style-type: disc;
  line-height: 1.8em;
  margin: 0 0 0 20px;
  padding: 0 0 0 0;
`;

const PcSpecsLi = styled.li`
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
    
    const { stores, id } = this.props;
    
    
    
    // --------------------------------------------------
    //   Expanded
    // --------------------------------------------------
    
    const {
      
      cardExpandedObj,
      handleCardExpanded
      
    } = stores.cardPlayer;
    
    
    let cardExpanded = true;
    
    if (id in cardExpandedObj) {
      cardExpanded = cardExpandedObj[id];
    }
    
    
    
    // --------------------------------------------------
    //   Data - プレイヤーカードオブジェクト取得
    // --------------------------------------------------
    
    const {
      
      cardPlayerObj
      
    } = stores.data;
    
    
    // --------------------------------------------------
    //   オブジェクト内にIDがない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (id in cardPlayerObj === false) {
      return null;
    }
    
    
    
    // --------------------------------------------------
    //   画像
    // --------------------------------------------------
    
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
    
    
    // --------------------------------------------------
    //   プロフィール情報
    // --------------------------------------------------
    
    const userId = cardPlayerObj[id].userId;
    const comment = cardPlayerObj[id].comment;
    
    
    
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - プロフィール項目（年齢、性別など）
    // --------------------------------------------------
    
    const componentItemsArr = [];
    
    
    // ---------------------------------------------
    //   年齢
    // ---------------------------------------------
    
    const birthdayValue = cardPlayerObj[id].birthdayObj.value;
    const birthdayAlternativeText = cardPlayerObj[id].birthdayObj.alternativeText;
    
    let age = '';
    
    if (birthdayAlternativeText) {
      age = birthdayAlternativeText;
    } else if (birthdayValue) {
      age = `${moment().diff(birthdayValue, 'years')}歳`;
    }
    
    if (age) {
      componentItemsArr.push(
        <Item key="age"><strong>年齢:</strong> {age}</Item>
      );
    }
    
    
    // ---------------------------------------------
    //   性別
    // ---------------------------------------------
    
    const sexValue = cardPlayerObj[id].sexObj.value;
    const sexAlternativeText = cardPlayerObj[id].sexObj.alternativeText;
    
    let sex = '';
    
    if (sexAlternativeText) {
      sex = sexAlternativeText;
    } else if (sexValue === 'male') {
      sex = '男';
    } else if (sexValue === 'female') {
      sex = '女';
    }
    
    if (sex) {
      componentItemsArr.push(
        <Item key="sex"><strong>性別:</strong> {sex}</Item>
      );
    }
    
    
    // ---------------------------------------------
    //   住んでいるところ
    // ---------------------------------------------
    
    const addressValue = cardPlayerObj[id].addressObj.value;
    
    if (addressValue) {
      componentItemsArr.push(
        <Item key="address"><strong>住んでいるところ:</strong> {addressValue}</Item>
      );
    }
    
    
    // ---------------------------------------------
    //   ゲーム歴
    // ---------------------------------------------
    
    const gamingExperienceValue = cardPlayerObj[id].gamingExperienceObj.value;
    const gamingExperienceAlternativeText = cardPlayerObj[id].gamingExperienceObj.alternativeText;
    
    let gamingExperience = '';
    
    if (gamingExperienceAlternativeText) {
      gamingExperience = gamingExperienceAlternativeText;
    } else if (gamingExperienceValue) {
      gamingExperience = `${moment(gamingExperienceValue).fromNow(true)}`;
    }
    
    if (gamingExperience) {
      componentItemsArr.push(
        <Item key="gamingExperience"><strong>ゲーム歴:</strong> {gamingExperience}</Item>
      );
    }
    
    
    // ---------------------------------------------
    //   趣味
    // ---------------------------------------------
    
    const hobbiesValueArr = cardPlayerObj[id].hobbiesObj.valueArr;
    
    if (hobbiesValueArr.length > 0) {
      componentItemsArr.push(
        <Item key="hobbie"><strong>趣味:</strong> {hobbiesValueArr.join(' / ')}</Item>
      );
    }
    
    
    // ---------------------------------------------
    //   特技
    // ---------------------------------------------
    
    const specialSkillsValueArr = cardPlayerObj[id].specialSkillsObj.valueArr;
    
    if (specialSkillsValueArr.length > 0) {
      componentItemsArr.push(
        <Item key="specialSkills"><strong>特技:</strong> {specialSkillsValueArr.join(' / ')}</Item>
      );
    }
    
    
    // ---------------------------------------------
    //   コンポーネント作成
    // ---------------------------------------------
    
    let componentItemBox = '';
    
    if (componentItemsArr.length > 0) {
       componentItemBox = <ItemBox>{componentItemsArr}</ItemBox>;
    }
    
    
    
   
    
    // --------------------------------------------------
    //   コンポーネント作成 - PC スペック
    // --------------------------------------------------
    
    const componentPcSpecsItemsArr = [];
    
    
    // ---------------------------------------------
    //   OS
    // ---------------------------------------------
    
    const os = cardPlayerObj[id].pcSpecsObj.os;
    
    if (os) {
      componentPcSpecsItemsArr.push(
        <PcSpecsLi key="os"><strong>OS:</strong> {os}</PcSpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   CPU
    // ---------------------------------------------
    
    const cpu = cardPlayerObj[id].pcSpecsObj.cpu;
    
    if (cpu) {
      componentPcSpecsItemsArr.push(
        <PcSpecsLi key="cpu"><strong>CPU:</strong> {cpu}</PcSpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   CPU Cooler
    // ---------------------------------------------
    
    const cpuCooler = cardPlayerObj[id].pcSpecsObj.cpuCooler;
    
    if (cpuCooler) {
      componentPcSpecsItemsArr.push(
        <PcSpecsLi key="cpuCooler"><strong>CPUクーラー:</strong> {cpuCooler}</PcSpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   マザーボード
    // ---------------------------------------------
    
    const motherboard = cardPlayerObj[id].pcSpecsObj.motherboard;
    
    if (motherboard) {
      componentPcSpecsItemsArr.push(
        <PcSpecsLi key="motherboard"><strong>マザーボード:</strong> {motherboard}</PcSpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   メモリ
    // ---------------------------------------------
    
    const memory = cardPlayerObj[id].pcSpecsObj.memory;
    
    if (memory) {
      componentPcSpecsItemsArr.push(
        <PcSpecsLi key="memory"><strong>メモリ:</strong> {memory}</PcSpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   ストレージ
    // ---------------------------------------------
    
    const storage = cardPlayerObj[id].pcSpecsObj.storage;
    
    if (storage) {
      componentPcSpecsItemsArr.push(
        <PcSpecsLi key="storage"><strong>ストレージ:</strong> {storage}</PcSpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   グラフィックス
    // ---------------------------------------------
    
    const graphicsCard = cardPlayerObj[id].pcSpecsObj.graphicsCard;
    
    if (graphicsCard) {
      componentPcSpecsItemsArr.push(
        <PcSpecsLi key="graphicsCard"><strong>グラフィックス:</strong> {graphicsCard}</PcSpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   光学ドライブ
    // ---------------------------------------------
    
    const opticalDrive = cardPlayerObj[id].pcSpecsObj.opticalDrive;
    
    if (opticalDrive) {
      componentPcSpecsItemsArr.push(
        <PcSpecsLi key="opticalDrive"><strong>光学ドライブ:</strong> {opticalDrive}</PcSpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   電源
    // ---------------------------------------------
    
    const powerSupply = cardPlayerObj[id].pcSpecsObj.powerSupply;
    
    if (powerSupply) {
      componentPcSpecsItemsArr.push(
        <PcSpecsLi key="powerSupply"><strong>電源:</strong> {powerSupply}</PcSpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   ケース
    // ---------------------------------------------
    
    const pcCase = cardPlayerObj[id].pcSpecsObj.case;
    
    if (pcCase) {
      componentPcSpecsItemsArr.push(
        <PcSpecsLi key="pcCase"><strong>ケース:</strong> {pcCase}</PcSpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   モニター
    // ---------------------------------------------
    
    const monitor = cardPlayerObj[id].pcSpecsObj.monitor;
    
    if (monitor) {
      componentPcSpecsItemsArr.push(
        <PcSpecsLi key="monitor"><strong>モニター:</strong> {monitor}</PcSpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   コンポーネント作成
    // ---------------------------------------------
    
    let componentPcSpecsBox = '';
    
    if (componentPcSpecsItemsArr.length > 0) {
       componentPcSpecsBox = <PcSpecsBox><PcSpecsTitle>PCスペック</PcSpecsTitle><PcSpecsUl>{componentPcSpecsItemsArr}</PcSpecsUl></PcSpecsBox>;
    }
    
    
    
    
    
    
    
    
    console.log(chalk`
      userId: {green ${userId}}
      age: {green ${age}}
      
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
          
          
          {/* テキスト */}
          <StyledCardContent>
            
            <CommentBox>
              <Paragraph text={comment} />
            </CommentBox>
            
            
            {componentItemBox}
            {componentPcSpecsBox}
            
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