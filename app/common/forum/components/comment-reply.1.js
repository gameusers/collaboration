// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import moment from 'moment';


import Button from '@material-ui/core/Button';
import IconPublic from '@material-ui/icons/Public';
import IconUpdate from '@material-ui/icons/Update';
import IconThumbUp from '@material-ui/icons/ThumbUp';
import IconEdit from '@material-ui/icons/Edit';
import IconReply from '@material-ui/icons/Reply';

import green from '@material-ui/core/colors/green';

import Paragraph from '../../layout/components/paragraph';
import FormPost from '../../form/components/post';
import UserThumbnail from '../../user/components/thumbnail';
import UserName from '../../user/components/name';
import ImageVideo from './image-video';


moment.locale('ja');



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// ---------------------------------------------
//   Comments & Replies
// ---------------------------------------------

const CommentsRepliesContainer = styled.div`
  margin: 40px 0 0 0;
  padding: 0;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
  padding: 0;
  // background-color: pink;
`;

const CommentLeftBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  // align-items: stretch;
  margin: 0;
  // background-color: blue;
`;

const CommentThumbnailBox = styled.div`
  // align-items: flex-start;
  margin: 3px 0 0 0;
`;

const CommentLevelBox = styled.div`
  font-size: 12px;
  font-weight: bold;
  line-height: 1em;
  width: 100%;
  text-align: center;
  margin: 6px 0 0 0;
  padding: 0;
  // background-color: pink;
`;

const CommentLine = styled.div`
  flex-grow: 2;
  border-left: 4px solid #84cacb;
  margin: 10px 0 0 0;
  padding: 0;
`;

const CommentRightBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0;
  padding: 0 0 0 10px;
  // background-color: green;
`;

const UserNameBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 0;
`;

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

@inject('stores')
@observer
export default class extends React.Component {
  
  constructor(props) {
    
    super(props);
    
    
    
    // ---------------------------------------------
    //   Set Property
    // ---------------------------------------------
    
    // ID
    // communityId = props.communityId;
    // threadId = props.threadId;
    
    // User Data
    // userObj = props.stores.data.userObj;
    
    // Comment Good
    // handleCommentGood = props.stores.bbs.handleCommentGood;
    
    // Reply Form Open
    // replyInsertFormOpenObj = props.stores.bbs.replyInsertFormOpenObj;
    // handleReplyInsertFormOpen = props.stores.bbs.handleReplyInsertFormOpen;
    
    // 
    // this.commentUpdateFormOpenObj = props.stores.bbs.commentUpdateFormOpenObj;
    // handleCommentUpdateFormOpen = props.stores.bbs.handleCommentUpdateFormOpen;
    
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, communityId, threadId, commentArr } = this.props;
    
    
    
    // --------------------------------------------------
    //   User Data
    // --------------------------------------------------
    
    const { userObj } = stores.data;
    
    
    // --------------------------------------------------
    //   Comment Good
    // --------------------------------------------------
    
    const {
      
      handleCommentGood
      
    } = stores.bbs;
    
    
    // --------------------------------------------------
    //   Reply Insert Form
    // --------------------------------------------------
    
    const {
      
      replyInsertFormOpenObj,
      handleReplyInsertFormOpen,
      handleReplyInsert
      
    } = stores.bbs;
    
    
    // --------------------------------------------------
    //   Comment Update Form
    // --------------------------------------------------
    
    const {
      
      commentUpdateFormOpenObj,
      handleCommentUpdateFormOpen,
      handleCommentUpdate
      
    } = stores.bbs;
    
    
    
    // console.log(`commentArr`);
    // console.dir(commentArr);
    
    
    // --------------------------------------------------
    //   Component - Comment
    // --------------------------------------------------
    
    const componentsCommentArr = [];
    
    for (const [index, value] of commentArr.entries()) {
      
      
      // User Level
      const userLevel = value.userId in userObj ? userObj[value.userId].level : '';
      
      
      // Datetime
      const datetimeNow = moment().utcOffset(0);
      const datetimeUpdated = moment(value.updatedDate).utcOffset(0);
      const datetimeFrom = datetimeUpdated.from(datetimeNow);
      
      
      // Reply Insert Form Open
      let replyInsertFormOpen = false;
      
      if (`${value.id}-reply-insert` in replyInsertFormOpenObj) {
        replyInsertFormOpen = replyInsertFormOpenObj[`${value.id}-reply-insert`];
      }
      
      
      // Comment Update Form Open
      let commentUpdateFormOpen = false;
      
      if (`${value.id}-comment-update` in commentUpdateFormOpenObj) {
        commentUpdateFormOpen = commentUpdateFormOpenObj[`${value.id}-comment-update`];
      }
      
      // console.log(`value.imageVideoArr`);
      // console.dir(value.imageVideoArr);
      // console.log(`value.imageVideoArr[0].id = ${value.imageVideoArr[0].id}`);
      
      
      componentsCommentArr.push(
        
        <CommentsRepliesContainer key={index}>
          
          { commentUpdateFormOpen === false ? (
          
            <React.Fragment>
          
              {/* Comment */}
              <CommentContainer>
                
                {/* コメントの左側　サムネイル */}
                <CommentLeftBox>
                  <CommentThumbnailBox>
                    <UserThumbnail id={value.userId} />
                  </CommentThumbnailBox>
                  
                  { userLevel &&
                    <CommentLevelBox>Lv.{userLevel}</CommentLevelBox>
                  }
                  
                  <CommentLine />
                </CommentLeftBox>
                
                
                {/* コメントの右側　画像・動画・コメント */}
                <CommentRightBox>
                
                  <UserNameBox>
                    <UserName
                      id={value.userId}
                      name={value.name}
                      status={value.status}
                    />
                  </UserNameBox>
                  
                  
                  <CommentBox>
                    <ImageVideo
                      id={value.id}
                      imageVideoArr={value.imageVideoArr}
                    />
                    
                    
                    
                    
                    {/*<p>Comment ID = {value.id}</p>
                    <p>value.imageVideoArr[0].id = {value.imageVideoArr[0].id}</p>*/}
                    
                    
                    
                    <Paragraph text={value.comment} />
                  </CommentBox>
                  
                  
                  {/* 更新日 */}
                  <UpdatedDateBox>
                    <UpdatedDateIconUpdate />
                    <UpdatedDate>{datetimeFrom}</UpdatedDate>
                  </UpdatedDateBox>
                  
                  
                  {/* Goodボタン・返信ボタン・編集ボタン・ID */}
                  <BottomNavBox>
                    
                    <BottomNavButtonsBox>
                      
                      <BottomNavThumbUpButton
                        variant="outlined"
                        onClick={() => handleCommentGood(communityId, threadId, value.id)}
                      >
                        <BottomNavIconThumbUp />
                        {value.good}
                      </BottomNavThumbUpButton>
                      
                      <BottomNavButton
                        variant="outlined"
                        onClick={() => handleReplyInsertFormOpen(`${value.id}-reply-insert`)}
                      >
                        <BottomNavIconReply />
                        返信
                      </BottomNavButton>
                      
                      <BottomNavButton
                        variant="outlined"
                        onClick={() => handleCommentUpdateFormOpen(`${value.id}-comment-update`)}
                      >
                        <BottomNavIconEdit />
                        編集
                      </BottomNavButton>
                      
                      <BottomNavIdBox>
                        <BottomNavIconPublic />
                        <BottomNavId>{value.id}</BottomNavId>
                      </BottomNavIdBox>
                      
                    </BottomNavButtonsBox>
                    
                  </BottomNavBox>
                  
                </CommentRightBox>
                
              </CommentContainer>
              
              
              {/* 返信フォームを表示する */}
              { replyInsertFormOpen &&
                
                <ReplyFormBox>
                  
                  <FormPost
                    id={`${value.id}-reply-insert`}
                    buttonLabel1="返信する"
                    buttonHandle1={() => handleReplyInsert(`${value.id}-reply-insert`)}
                    buttonLabel2="閉じる"
                    buttonHandle2={() => handleReplyInsertFormOpen(`${value.id}-reply-insert`)}
                  />
                  
                </ReplyFormBox>
                
              }
              
            </React.Fragment>
          
          ) : (
            
            <FormPost
              id={`${value.id}-comment-update`}
              name={value.name}
              text={value.comment}
              imageVideoArr={value.imageVideoArr}
              // lightboxArr={value.lightboxArr}
              buttonLabel1="編集する"
              buttonHandle1={() => handleCommentUpdate(communityId, threadId, value.id, `${value.id}-comment-update`)}
              buttonLabel2="閉じる"
              buttonHandle2={() => handleCommentUpdateFormOpen(`${value.id}-comment-update`)}
            />
            
          )}
          
        </CommentsRepliesContainer>
        
      );
      
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
      
        {componentsCommentArr}
      
      </React.Fragment>
    );
    
  }
  
};