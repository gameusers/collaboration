// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import moment from 'moment';
import TextareaAutosize from 'react-autosize-textarea';

import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import IconEventNote from '@material-ui/icons/EventNote';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconAssignment from '@material-ui/icons/Assignment';
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
  margin: 2px 0 0 0;
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


const CommentReplyPreviewImagesBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 0 6px 0;
`;

const CommentReplyPrevieImg = styled.img`
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

const CommentReplyPreviewVideoBox = styled.div`
  position: relative;
`;

const CommentReplyPreviewVideoImg = styled.img`
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

const CommentReplyPreviewVideoPlayButtonImg = styled.img`
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
  flex-flow: row nowrap;
  margin: 0 0 0 0;
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
    this.communityId = props.communityId;
    this.threadId = props.threadId;
    
    // User Data
    this.userObj = props.stores.data.userObj;
    
    // Comment Good
    this.handleCommentGood = props.stores.bbs.handleCommentGood;
    
    // Reply Form Open
    this.replyFormOpenObj = props.stores.bbs.replyFormOpenObj;
    this.handleReplyFormOpenObj = props.stores.bbs.handleReplyFormOpenObj;
    
    // Comment Edit Form Open
    this.commentEditFormOpenObj = props.stores.bbs.commentEditFormOpenObj;
    this.handleCommentEditFormOpenObj = props.stores.bbs.handleCommentEditFormOpenObj;
    
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, commentArr } = this.props;
    
    
    // const {
      
    //   userObj
      
    // } = stores.data;
    
    
    
    
    // console.log(`loginUserId = ${loginUserId}`);
    // console.log(`administrator = ${administrator}`);
    
    
    
    
    
    // --------------------------------------------------
    //   Component - Comment
    // --------------------------------------------------
    
    const componentsCommentArr = [];
    
    for (const [index, value] of commentArr.entries()) {
      
      // console.log(`value.userId = ${value.userId}`);
      // console.log(`value.updatedDate = ${value.updatedDate}`);
      
      
      // User Level
      const userLevel = value.userId in this.userObj ? this.userObj[value.userId].level : '';
      
      // Datetime
      const datetimeNow = moment().utcOffset(0);
      const datetimeUpdated = moment(value.updatedDate).utcOffset(0);
      const datetimeFrom = datetimeUpdated.from(datetimeNow);
      
      
      // Reply Form Open
      let replyFormOpen = false;
      
      if (value.id in this.replyFormOpenObj) {
        replyFormOpen = this.replyFormOpenObj[value.id];
      }
      
      // Comment Edit Form Open
      let commentEditFormOpen = false;
      
      if (value.id in this.commentEditFormOpenObj) {
        commentEditFormOpen = this.commentEditFormOpenObj[value.id];
      }
      
      
      
      
      componentsCommentArr.push(
        
        <CommentsRepliesContainer key={index}>
          
          { commentEditFormOpen === false ? (
          
            <React.Fragment>
          
              {/* Comment */}
              <CommentContainer>
                
                <CommentLeftBox>
                  <CommentThumbnailBox>
                    <UserThumbnail id={value.userId} />
                  </CommentThumbnailBox>
                  
                  { userLevel &&
                    <CommentLevelBox>Lv.{userLevel}</CommentLevelBox>
                  }
                  
                  <CommentLine />
                </CommentLeftBox>
                
                
                <CommentRightBox>
                
                  <UserNameBox>
                    <UserName id={value.userId} />
                  </UserNameBox>
                  
                  
                  <CommentBox>
                    <Paragraph text={value.comment} />
                  </CommentBox>
                  
                  
                  <UpdatedDateBox>
                    <UpdatedDateIconUpdate />
                    <UpdatedDate>{datetimeFrom}</UpdatedDate>
                  </UpdatedDateBox>
                  
                  
                  <BottomNavBox>
                    
                    <BottomNavButtonsBox>
                      
                      <BottomNavThumbUpButton
                        variant="outlined"
                        onClick={() => this.handleCommentGood(this.communityId, this.threadId, value.id)}
                      >
                        <BottomNavIconThumbUp />
                        {value.good}
                      </BottomNavThumbUpButton>
                      
                      <BottomNavButton
                        variant="outlined"
                        onClick={() => this.handleReplyFormOpenObj(value.id)}
                      >
                        <BottomNavIconReply />
                        返信
                      </BottomNavButton>
                      
                      <BottomNavButton
                        variant="outlined"
                        onClick={() => this.handleCommentEditFormOpenObj(value.id)}
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
              
              
              { replyFormOpen &&
                
                <ReplyFormBox>
                  
                  <FormPost
                    id={`${value.id}-reply`}
                    buttonLabel1="返信する"
                    buttonLabel2="閉じる"
                    buttonHandle2={() => this.handleReplyFormOpenObj(value.id)}
                  />
                  
                </ReplyFormBox>
                
              }
              
            </React.Fragment>
          
          ) : (
            
            <FormPost
              id={`${value.id}-edit`}
              name={value.name}
              text={value.comment}
              imageVideoArr={value.imageVideoArr}
              lightboxArr={value.lightboxArr}
              buttonLabel1="編集する"
              buttonLabel2="閉じる"
              buttonHandle2={() => this.handleCommentEditFormOpenObj(value.id)}
            />
            
          )}
          
        </CommentsRepliesContainer>
        
        
          
        
        
        
        
        
        
        
      );
      // console.log(index, value);
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