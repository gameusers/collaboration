// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import moment from 'moment';
import ImageGallery from 'react-image-gallery';
import lodashGet from 'lodash/get';
import lodashHas from 'lodash/has';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconPublic from '@material-ui/icons/Public';
import IconUpdate from '@material-ui/icons/Update';
import IconThumbUp from '@material-ui/icons/ThumbUp';
import IconEdit from '@material-ui/icons/Edit';
import IconReply from '@material-ui/icons/Reply';


// ---------------------------------------------
//   Material UI / Color
// ---------------------------------------------

import green from '@material-ui/core/colors/green';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Paragraph from '../../layout/components/paragraph';
import User from '../../user/components/user';
// import ImageVideo from './image-video';


// ---------------------------------------------
//   Moment Locale
// ---------------------------------------------

moment.locale('ja');




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// ---------------------------------------------
//   Comments & Replies
// ---------------------------------------------

const CommentBox = styled.div`
  font-size: 14px;
  line-height: 1.6em;
  margin: 0;
  padding: 0;
`;

const ReplyFormBox = styled.div`
  margin: 14px 0 0 0;
  padding: 0;
`;



// ---------------------------------------------
//   Comment - Reply
// ---------------------------------------------

const ReplyLeftBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  // align-items: flex-start;
  // padding: 10px 0 0 0;
  // background-color: blue;
`;

const ReplyThumbnailBox = styled.div`
  align-items: flex-start;
  margin: 19px 0 0 6px;
`;

const ReplyLine = styled.div`
  // flex-grow: 2;
  border-left: 4px solid #84cacb;
  margin: 0 0 0 0;
  padding: 0;
`;

const ReplyRightBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  // margin: 10px 0 0 0;
  padding: 16px 0 0 10px;
  // background-color: green;
`;

const CommentReplyImg = styled.img`
  max-width: 500px;
  max-height: 300px;
  margin: 0 0 14px 0;
  padding: 0 0 0 0;
  // background-color: green;
  
  @media screen and (max-width: 480px) {
    max-width: 100%;
    max-height: 200px;
  }
`;

const CommentReplyVideoImg = styled.img`
  max-width: 500px;
  max-height: 300px;
  margin: 0 0 14px 0;
  padding: 0 0 0 0;
  // background-color: green;
  
  @media screen and (max-width: 480px) {
    max-width: 100%;
    max-height: 200px;
  }
`;

const CommentReplyVideoBox = styled.div`
  position: relative;
`;

const CommentReplyVideoPlayButtonImg = styled.img`
  position: absolute;
  top: 0;
  
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;


const PreviewBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 0 6px 0;
`;

const PrevieImg = styled.img`
  // width: 320px;
  // height: 180px;
  max-width: 192px;
  max-height: 108px;
  margin: 0 4px 4px 0;
  // padding: 0 0 0 0;
  // background-color: green;
  
  @media screen and (max-width: 480px) {
    max-width: 128px;
    max-height: 72px;
  }
`;

const PreviewVideoBox = styled.div`
  position: relative;
`;

const PreviewVideoImg = styled.img`
  width: 192px;
  height: 108px;
  // margin: 0 0 14px 0;
  // padding: 0 0 0 0;
  // background-color: green;
  
  @media screen and (max-width: 480px) {
    width: 128px;
    height: 72px;
  }
`;

const PreviewVideoPlayButtonImg = styled.img`
  width: 192px;
  height: 108px;
  position: absolute;
  top: 0;
  
  @media screen and (max-width: 480px) {
    width: 128px;
    height: 72px;
  }
`;






// ----------------------------------------
//   Comment & Reply - Updated Date
// ----------------------------------------

const UpdatedDateBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 8px 0 4px;
  padding: 0 0 0 0;
  border-bottom: 1px dashed #D8D8D8;
  // border-radius: 10px;
  // background-color: #FAFAFA;
`;

const UpdatedDateIconUpdate = styled(IconUpdate)`
  && {
    font-size: 22px;
    margin: 2px 2px 0 0;
  }
`;

const UpdatedDate = styled.div`
  font-size: 12px;
  // font-weight: bold;
  // color: #009933;
`;


// ---------------------------------------------
//   Comment & Reply - Bottom Navigation
// ---------------------------------------------

const BottomNavBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 0 0 0;
  padding: 0;
`;


const BottomNavButtonsBox = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const BottomNavInfoBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 10px 0 0;
`;


// ----------------------------------------
//   - Updated Date
// ----------------------------------------

const BottomNavUpdatedDateBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 1px 6px 0 0;
`;

const BottomNavIconUpdate = styled(IconUpdate)`
  && {
    font-size: 22px;
    margin: 2px 2px 0 0;
  }
`;

const BottomNavUpdatedDate = styled.div`
  font-size: 12px;
  // color: #009933;
`;


// ----------------------------------------
//   - ID
// ----------------------------------------

const BottomNavIdBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 1px 0 0 0;
`;

const BottomNavIconPublic = styled(IconPublic)`
  && {
    font-size: 20px;
    margin: 3px 2px 0 0;
  }
`;

const BottomNavId = styled.div`
  font-size: 12px;
  color: #009933;
`;


// ----------------------------------------
//   - Buttons
// ----------------------------------------

const BottomNavThumbUpButton = styled(Button)`
  && {
    background-color: ${green[500]};
    &:hover {
      background-color: ${green[700]};
    }
    
    color: white;
    font-size: 12px;
    // width: 56px;
    height: 22px;
    min-width: 40px;
    min-height: 22px;
    margin: 4px 8px 0 0;
    padding: 0 5px;
  }
`;

const BottomNavIconThumbUp = styled(IconThumbUp)`
  && {
    font-size: 14px;
    margin: 0 4px 0 0;
    padding: 0;
  }
`;

const BottomNavButton = styled(Button)`
  && {
    font-size: 12px;
    height: 22px;
    min-width: 54px;
    min-height: 22px;
    margin: 4px 8px 0 0;
    padding: 0 2px;
    
    @media screen and (max-width: 480px) {
      min-width: 36px;
      min-height: 22px;
    }
  }
`;

const BottomNavIconEdit = styled(IconEdit)`
  && {
    font-size: 16px;
    margin: 0 3px 0 0;
    padding: 0;
    
    @media screen and (max-width: 480px) {
      display: none;
    }
  }
`;

const BottomNavIconReply = styled(IconReply)`
  && {
    font-size: 16px;
    margin: 0 1px 0 0;
    padding: 0;
    
    @media screen and (max-width: 480px) {
      display: none;
    }
  }
`;






// --------------------------------------------------
//   Class
// --------------------------------------------------

// @withStyles(stylesObj)
@inject('stores', 'storeForum')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    super(props);
  }
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount(){
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    const _id = this.props.gameCommunities_id || this.props.userCommunities_id;
    this.props.stores.layout.handleButtonEnable({ _id: `${_id}-forumComment` });
    
    
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { classes, stores, storeForum, intl, gameCommunities_id, userCommunities_id, forumThreads_id } = this.props;
    
    const _id = gameCommunities_id || userCommunities_id;
    
    
    // --------------------------------------------------
    //   Forum
    // --------------------------------------------------
    
    const {
      
      dataObj,
      handleEdit,
      
    } = storeForum;
    
    
    // --------------------------------------------------
    //   Data
    // --------------------------------------------------
    
    const page = lodashGet(dataObj, [_id, 'forumCommentsAndRepliesObj', forumThreads_id, 'page'], 1);
    const arr = lodashGet(dataObj, [_id, 'forumCommentsAndRepliesObj', forumThreads_id, 'dataObj', `page${page}Obj`, 'arr'], []);
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   /app/common/forum/components/comment-reply.js
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   forumThreads_id: {green ${forumThreads_id}}
    //   page: {green ${page}}
    // `);
    
    // console.log(`
    //   ----- arr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    // const { stores, communityId, threadId, commentArr } = this.props;
    
    
    
    // --------------------------------------------------
    //   User Data
    // --------------------------------------------------
    
    // const { userObj } = stores.data;
    
    
    // // --------------------------------------------------
    // //   Comment Good
    // // --------------------------------------------------
    
    // const {
      
    //   handleCommentGood
      
    // } = stores.bbs;
    
    
    // // --------------------------------------------------
    // //   Reply Insert Form
    // // --------------------------------------------------
    
    // const {
      
    //   replyInsertFormOpenObj,
    //   handleReplyInsertFormOpen,
    //   handleReplyInsert
      
    // } = stores.bbs;
    
    
    // // --------------------------------------------------
    // //   Comment Update Form
    // // --------------------------------------------------
    
    // const {
      
    //   commentUpdateFormOpenObj,
    //   handleCommentUpdateFormOpen,
    //   handleCommentUpdate
      
    // } = stores.bbs;
    
    
    
    // console.log(`commentArr`);
    // console.dir(commentArr);
    
    
    // --------------------------------------------------
    //   配列が空の場合は、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (arr.length === 0) {
      return null;
    }
    
    const images = [
      {
        original: '/static/img/forum/__/dFnadiGia/main/dFnadiGia/800w.jpg',
        thumbnail: '/static/img/forum/__/dFnadiGia/main/dFnadiGia/320w.jpg',
      },
      {
        original: '/static/img/forum/__/8_AsHN1fm/main/rlEoEK75y/320w.jpg',
        thumbnail: '/static/img/forum/__/8_AsHN1fm/main/rlEoEK75y/320w.jpg'
      },
      {
        original: '/static/img/forum/__/FK_8mRwTa18/800x533.jpg',
        thumbnail: '/static/img/forum/__/FK_8mRwTa18/320x213.jpg'
      },
      {
        original: '/static/img/forum/__/LnDhqEc3sU6/256x256.jpg',
        thumbnail: '/static/img/forum/__/LnDhqEc3sU6/256x256.jpg'
      },
      {
        original: '/static/img/forum/__/UKXKoSLsPuF/800x800.jpg',
        thumbnail: '/static/img/forum/__/UKXKoSLsPuF/320x320.jpg'
      },
      {
        original: '/static/img/forum/__/wQ40f5McTrq/800x300.jpg',
        thumbnail: '/static/img/forum/__/wQ40f5McTrq/320x120.jpg'
      },
      {
        original: '/static/img/forum/__/FK_8mRwTa18/800x533.jpg',
        thumbnail: '/static/img/forum/__/FK_8mRwTa18/320x213.jpg'
      },
      {
        original: '/static/img/forum/__/LnDhqEc3sU6/256x256.jpg',
        thumbnail: '/static/img/forum/__/LnDhqEc3sU6/256x256.jpg'
      },
      {
        original: '/static/img/forum/__/UKXKoSLsPuF/800x800.jpg',
        thumbnail: '/static/img/forum/__/UKXKoSLsPuF/320x320.jpg'
      },
      {
        original: '/static/img/forum/__/wQ40f5McTrq/800x300.jpg',
        thumbnail: '/static/img/forum/__/wQ40f5McTrq/320x120.jpg'
      },
    ];
    
    
    // --------------------------------------------------
    //   Component - Comment & Reply
    // --------------------------------------------------
    
    const componentArr = [];
    
    for (const [index, valueObj] of arr.entries()) {
      
      
      // --------------------------------------------------
      //   Property
      // --------------------------------------------------
      
      let thumbnailSrc = '';
      
      const thumbnailArr = lodashGet(valueObj, ['cardPlayersObj', 'imagesAndVideosObj', 'thumbnailArr'], []);
      
      if (thumbnailArr.length > 0) {
        thumbnailSrc = lodashGet(thumbnailArr, [0, 'src'], '');
      }
      
      // const thumbnailSrc = lodashGet(valueObj, ['cardPlayersObj', 'imagesAndVideosObj', 'thumbnailArr', 0, 'src'], '');
      const cardPlayers_id = lodashGet(valueObj, ['cardPlayersObj', '_id'], '');
      
      let name = lodashGet(valueObj, ['name'], '');
      const cardPlayers_name = lodashGet(valueObj, ['cardPlayersObj', 'name'], '');
      
      if (cardPlayers_name) {
        name = cardPlayers_name;
      }
      
      const status = lodashGet(valueObj, ['cardPlayersObj', 'status'], '');
      
      const exp = lodashGet(valueObj, ['usersObj', 'exp'], 0);
      const accessDate = lodashGet(valueObj, ['usersObj', 'accessDate'], '');
      const playerID = lodashGet(valueObj, ['usersObj', 'playerID'], '');
      
      
      const comment = lodashGet(valueObj, ['comment'], '');
      
      // // Datetime
      // const datetimeNow = moment().utcOffset(0);
      // const datetimeUpdated = moment(value.updatedDate).utcOffset(0);
      // const datetimeFrom = datetimeUpdated.from(datetimeNow);
      
      
      // // Reply Insert Form Open
      // let replyInsertFormOpen = false;
      
      // if (`${value.id}-reply-insert` in replyInsertFormOpenObj) {
      //   replyInsertFormOpen = replyInsertFormOpenObj[`${value.id}-reply-insert`];
      // }
      
      
      // // Comment Update Form Open
      // let commentUpdateFormOpen = false;
      
      // if (`${value.id}-comment-update` in commentUpdateFormOpenObj) {
      //   commentUpdateFormOpen = commentUpdateFormOpenObj[`${value.id}-comment-update`];
      // }
      
      // console.log(`value.imageVideoArr`);
      // console.dir(value.imageVideoArr);
      // console.log(`value.imageVideoArr[0].id = ${value.imageVideoArr[0].id}`);
      
      
      componentArr.push(
        
        <div
          css={css`
             margin: 24px 0 0 0;
          `}
          key={index}
        >
          
          
          {/* Comment */}
          <div
            css={css`
              display: flex;
              flex-flow: column nowrap;
              // background-color: purple;
            `}
          >
            
            
            {/* ユーザー情報 - サムネイル画像・ハンドルネームなど */}
            <User
              thumbnailSrc={thumbnailSrc}
              name={name}
              playerID={playerID}
              status={status}
              accessDate={accessDate}
              exp={exp}
              cardPlayers_id={cardPlayers_id}
              showCardPlayerButton={true}
            />
            
            
            {/* 画像・動画 */}
            <div
              css={css`
                // width: 600px;
                // width: 600px;
                margin: 12px 0 0 0;
              `}
            >
              <img src="/static/img/forum/__/wQ40f5McTrq/1920x721.jpg" width="100%" />
              {/*<ImageGallery
                items={images}
                useBrowserFullscreen={false}
              />*/}
            </div>
            
            
            {/* 画像・動画・コメント */}
            <div
              css={css`
                font-size: 14px;
                line-height: 1.6em;
                border-left: 4px solid #84cacb;
                margin: 12px 0 0 3px;
                padding: 0 0 3px 18px;
                // background-color: pink;
              `}
            >
              
              {/*<ImageVideo
                id={value.id}
                imageVideoArr={value.imageVideoArr}
              />*/}
              
              
              
              <div
                css={css`
                  margin 4px 0 0 0;
                `}
              >
                <Paragraph text={comment} />
              </div>
              
            </div>
            
            
          </div>
          
          
        </div>
        
      );
      
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          // border-top: 1px dashed #A4A4A4;
          margin: 42px 0 0 0;
          padding: 0 0 0 0;
        `}
      >
        
        {componentArr}
      
      </div>
    );
    
  }
  
});