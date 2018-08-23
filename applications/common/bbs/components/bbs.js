// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
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
import ProfileThumbnail from '../../user/components/thumbnail';
import ProfileName from '../../user/components/name';
import CommentReply from '../../bbs/components/comment-reply';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// ---------------------------------------------
//   Title
// ---------------------------------------------

const TitleExpansionPanelSummary = styled(ExpansionPanelSummary)`
  && {
    margin: 0 0 0 0;
    
    @media screen and (max-width: 480px) {
      padding: 0 16px;
    }
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  // margin: 0;
  // width: 100%;
  // padding: 0 0 6px 0;
  // border-bottom: 1px solid #d0d0d0;
  // background-color: pink;
`;

const TitleH2 = styled.h2`
  font-size: 18px;
  margin: 3px 0 0 0;
`;

const TitleInfoBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  font-size: 12px;
  margin: 0 0 0 0;
`;

const TitleInfoAboutBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 6px 0 0;
`;

const IconAssignmentBbsInfo = styled(IconAssignment)`
  && {
    font-size: 24px;
    margin: 2px 2px 0 0;
  }
`;

const BbsInfoAbout = styled.div`
  font-size: 12px;
  color: #009933;
  margin: 0;
`;

const TitleInfoIdBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 8px 0 0;
`;

const IconPublicBbsInfo = styled(IconPublic)`
  && {
    font-size: 24px;
    margin: 2px 2px 0 0;
  }
`;

const BbsInfoId = styled.div`
  font-size: 12px;
  color: #009933;
`;


const TitleInfoMiniButton = styled(Button)`
  && {
    font-size: 12px;
    width: 36px;
    height: 22px;
    min-width: 36px;
    min-height: 22px;
    margin: 3px 0 0 0;
    padding: 0;
  }
`;

const TitleDescriptionBox = styled.div`
  font-size: 14px;
  line-height: 1.6em;
  border-left: 4px solid #A4A4A4;
  margin: 12px 0 10px 3px;
  padding: 0 0 0 18px;
  // border-bottom: 1px solid #d0d0d0;
  // background-color: pink;
`;



const CreateThreadNameTextField = styled(TextField)`
  && {
    width: 300px;
    margin: 10px 0 4px 0;
    
    @media screen and (max-width: 480px) {
      width: 88%;
      // min-width: 100%;
    }
  }
`;

const CreateThreadTextareaAutosize = styled(TextareaAutosize)`
  && {
    width: 600px;
    max-width: 600px;
    border-radius: 4px;
    box-sizing: border-box;
    margin: 10px 0 10px 0;
    padding: 8px 12px;
    line-height: 1.6em;
    
    &:focus {
      outline: 1px #A9F5F2 solid;
    }
    
    @media screen and (max-width: 480px) {
      width: 88%;
      max-width: auto;
      resize: none;
    }
  }
`;

const CreateThreadButtonBox = styled.div`
  margin: 0 0 0 0;
`;



// ---------------------------------------------
//   Contents
// ---------------------------------------------

const ContentsExpansionPanelDetails = styled(ExpansionPanelDetails)`
  && {
    // display: inline;
    // margin: 0;
    // padding: 0 0 16px 0;
    
    @media screen and (max-width: 480px) {
      padding: 0 16px 24px 16px;
    }
  }
`;

const ContentsContainer = styled.div`
  width: 100%;
  margin: 0;
  // padding: 0 16px;
`;



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

const ProfileNameBox = styled.div`
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



// const CommentReplySwiperImgBox = styled.div`
//   width: 320px;
//   height: 180px;
//   // max-width: 500px;
//   // max-height: 300px;
//   // margin: 0 0 14px 0;
//   // padding: 0 0 0 0;
//   // background-color: green;
  
//   @media screen and (max-width: 480px) {
//     // max-width: 100%;
//     // max-height: 200px;
//   }
// `;

// const CommentReplySwiperImg = styled.img`
//   width: 320px;
//   height: 180px;
//   // max-width: 500px;
//   // max-height: 300px;
//   // margin: 0 0 14px 0;
//   // padding: 0 0 0 0;
//   // background-color: green;
  
//   @media screen and (max-width: 480px) {
//     // max-width: 100%;
//     // max-height: 200px;
//   }
// `;



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
    //   Community ID
    // ---------------------------------------------
    
    this.communityId = props.gameCommunityId ? props.gameCommunityId : props.userCommunityId;
    
    
    // ---------------------------------------------
    //   BBS Data
    // ---------------------------------------------
    
    this.dataObj = props.stores.bbs.dataObj[this.communityId];
    
    
    
    
    // ---------------------------------------------
    //   Initialize Store
    // ---------------------------------------------
    
    // ----------------------------------------
    //   - Layout Panel
    // ----------------------------------------
    
    const layoutPanelExpandedObj = {};
    
    for (const value of Object.values(this.dataObj)) {
      layoutPanelExpandedObj[value.id] = true;
    }
    
    props.stores.layout.insertPanelExpanded(layoutPanelExpandedObj);
    
    
    // ----------------------------------------
    //   - BBS
    // ----------------------------------------
    
    props.stores.bbs.initializeBbs(this.dataObj);
    
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, gameCommunityId, userCommunityId } = this.props;
    
    
    const {
      
      handleThreadDescriptionOpenObj,
      handleThreadUpdateFormOpen,
      handleThreadUpdateFormName,
      handleThreadUpdateFormDescription,
      handleThreadUpdate
      
    } = stores.bbs;
    
    
    // ---------------------------------------------
    //   Login User ID
    // ---------------------------------------------
    
    const loginUserId = stores.data.loginUserObj.id;
    
    
    // ---------------------------------------------
    //   Thread Edit Form
    // ---------------------------------------------
    
    const {
      
      threadUpdateFormOpenObj,
      threadUpdateFormNameObj,
      threadUpdateFormDescriptionObj,
      
      handleCommentInsert
      
    } = stores.bbs;
    
    // const threadUpdateFormNameObj = stores.bbs.threadUpdateFormNameObj;
    // const threadUpdateFormDescriptionObj = stores.bbs.threadUpdateFormDescriptionObj;
    
    
    // ---------------------------------------------
    //   Community ID
    // ---------------------------------------------
    
    // const communityId = gameCommunityId ? gameCommunityId : userCommunityId;
    const communityId = this.communityId;
    
    
    // ---------------------------------------------
    //   管理者権限
    // ---------------------------------------------
    
    let administrator = false;
    
    if (userCommunityId && stores.data.userCommunityObj[userCommunityId].administratorId === loginUserId) {
      administrator = true;
    }
    
    
    
    
    // console.log(`loginUserId = ${loginUserId}`);
    // console.log(`administrator = ${administrator}`);
    
    
    // --------------------------------------------------
    //   Component - Thread
    // --------------------------------------------------
    
    const componentsBbsArr = [];
    
    for (const [key, value] of Object.entries(this.dataObj)) {
      
      // console.log(`value.commentArr`);
      // console.dir(value.commentArr);
      
      
      // 管理者権限がある、またはスレッドを建てた本人の場合、編集ボタンを表示する
      const editable = administrator || loginUserId === value.creatorId ? true : false;
      
      
      const threadUpdateFormName = threadUpdateFormNameObj[value.id];
      const threadUpdateFormDescription = threadUpdateFormDescriptionObj[value.id];
      
      
      componentsBbsArr.push(
        
        <ExpansionPanel
          expanded={stores.layout.returnPanelExpanded(value.id)}
          key={key}
        >
          
          {/* Title */}
          <TitleExpansionPanelSummary
            expandIcon={
              <IconExpandMore
                onClick={() => stores.layout.handlePanelExpanded(value.id)}
              />
            }
          >
            
            <TitleBox>
              
              <TitleH2>{value.name}</TitleH2>
              
              <TitleInfoBox>
                
                <TitleInfoAboutBox>
                  <IconAssignmentBbsInfo />
                  <BbsInfoAbout
                    onClick={() => handleThreadDescriptionOpenObj(value.id)}
                  >
                    スレッドについて
                  </BbsInfoAbout>
                </TitleInfoAboutBox>
                
                <TitleInfoIdBox>
                  <IconPublicBbsInfo />
                  <BbsInfoId>ks8WPvlQpbg</BbsInfoId>
                </TitleInfoIdBox>
                
                { editable &&
                  <BottomNavButton
                    variant="outlined"
                    onClick={() => handleThreadUpdateFormOpen(value.id)}
                  >
                    <BottomNavIconEdit />
                    編集
                  </BottomNavButton>
                }
                
              </TitleInfoBox>
              
              
              {/* スレッドについてを表示 */}
              { stores.bbs.threadDescriptionOpenObj[value.id] &&
                <TitleDescriptionBox>
                  <Paragraph text={value.description} />
                </TitleDescriptionBox>
              }
              
              
              {/* Thread Update Form */}
              { threadUpdateFormOpenObj[value.id] &&
                <React.Fragment>
                  
                  {/* Thread Name */}
                  <CreateThreadNameTextField
                    placeholder="スレッド名"
                    value={threadUpdateFormName}
                    onChange={(event) => handleThreadUpdateFormName(event, value.id)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconEventNote />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  
                  {/* Thread Description */}
                  <CreateThreadTextareaAutosize
                    rows={5}
                    placeholder="スレッドについての説明、書き込みルールなどがあれば、こちらに記述してください"
                    value={threadUpdateFormDescription}
                    onChange={(event) => handleThreadUpdateFormDescription(event, value.id)}
                  />
                  
                  
                  {/* Send Button */}
                  <CreateThreadButtonBox>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleThreadUpdate(communityId, value.id)}
                    >
                      編集する
                    </Button>
                  </CreateThreadButtonBox>
                  
                </React.Fragment>
              }
              
            </TitleBox>
            
          </TitleExpansionPanelSummary>
          
          
          
          {/* Contents */}
          <ContentsExpansionPanelDetails>
            
            <ContentsContainer>
              
              {/* Form Post Comment */}
              <FormPost
                id={`${value.id}-comment-insert`}
                buttonLabel1="コメントする"
                buttonHandle1={() => handleCommentInsert(communityId, value.id, `${value.id}-comment-insert`)}
              />
              
              
              <CommentReply
                communityId={communityId}
                threadId={value.id}
                commentArr={value.commentArr}
              />
              
            </ContentsContainer>
            
          </ContentsExpansionPanelDetails>
          
        </ExpansionPanel>
        
      );
      
    }
    
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
      
        {componentsBbsArr}
        
        
        
        
      
      <ExpansionPanel
        // expanded={stores.layout.returnPanelExpanded(communityId)}
        expanded={true}
      >
        
        {/* Title */}
        <TitleExpansionPanelSummary
          expandIcon={
            <IconExpandMore
              onClick={() => stores.layout.handlePanelExpanded(communityId)}
            />
          }
        >
        
          <TitleBox>
            
            <TitleH2>雑談スレッド</TitleH2>
            
            <TitleInfoBox>
              
              <TitleInfoAboutBox>
                <IconAssignmentBbsInfo />
                <BbsInfoAbout
                  onClick={() => handleThreadDescriptionOpenObj(communityId)}
                >
                  スレッドについて
                </BbsInfoAbout>
              </TitleInfoAboutBox>
              
              <TitleInfoIdBox>
                <IconPublicBbsInfo />
                <BbsInfoId>ks8WPvlQpbg</BbsInfoId>
              </TitleInfoIdBox>
              
              <TitleInfoMiniButton variant="outlined">
                編集
              </TitleInfoMiniButton>
              
            </TitleInfoBox>
            
            
            { stores.bbs.threadDescriptionOpenObj[communityId] &&
              <TitleDescriptionBox>
                <p>仲良く雑談しませんか？</p>
                <p>ゲームの雑談、または配信でプレイして欲しいゲームはそちらのスレに書いてください。</p>
                <p>スピードワゴンって最初ただのチンピラみたいな出方してたんだな。</p>
                <p>金持ちのおっさんのイメージの方が強くなってた。</p>
                <p>ドラクエの話やめろ！</p>
              </TitleDescriptionBox>
            }
            
            
            
            
          </TitleBox>
          
        </TitleExpansionPanelSummary>
        
        
        
        {/* Contents */}
        <ContentsExpansionPanelDetails>
          
          <ContentsContainer>
            
            
            {/* Form Post Comment */}
            <FormPost
              id="ks8WPvlQpbg-comment2"
              buttonLabel="コメントする"
            />
            
            
            {/* Comment1 */}
            <CommentsRepliesContainer>
              
              
              {/* Comment */}
              <CommentContainer>
                
                <CommentLeftBox>
                  <CommentThumbnailBox>
                    <ProfileThumbnail id="a8b0gX6lMIz" />
                  </CommentThumbnailBox>
                  
                  <CommentLevelBox>Lv.999</CommentLevelBox>
                  
                  <CommentLine />
                </CommentLeftBox>
                
                
                <CommentRightBox>
                
                  <ProfileNameBox>
                    <ProfileName />
                  </ProfileNameBox>
                  
                  
                  <CommentBox>
                  
                    <p style={{ marginBottom: '20px' }}>BEYOND: Two Souls</p>
                    
                    <p>非常に引き込まれるものがありました。</p>
                    <p>ジョディのスタンド、エイデンはめちゃくちゃ強いですね。</p>
                    <p>僕が知っているジョジョ4部までに出てきたスタンドで</p>
                    <p>エイデンに勝てそうなのは</p>
                    <p>スタープラチナとザ・ワールド、ヴァニラ・アイスのスタンドくらいですね。</p>
                    <p>半径10メートル以内の人間を窒息死させたり</p>
                    <p>意のままに操れたりするのはやばすぎます。</p>

                  </CommentBox>
                  
                  
                  <UpdatedDateBox>
                    <UpdatedDateIconUpdate />
                    <UpdatedDate>7 時間前</UpdatedDate>
                  </UpdatedDateBox>
                  
                  
                  <BottomNavBox>
                    
                    {/*<BottomNavInfoBox>
                      
                      <BottomNavUpdatedDateBox>
                        <BottomNavIconUpdate />
                        <BottomNavUpdatedDate>7 時間前</BottomNavUpdatedDate>
                      </BottomNavUpdatedDateBox>
                      
                      <BottomNavIdBox>
                        <BottomNavIconPublic />
                        <BottomNavId>_5pweox1Io8</BottomNavId>
                      </BottomNavIdBox>
                      
                    </BottomNavInfoBox>*/}
                    
                    <BottomNavButtonsBox>
                      
                      <BottomNavThumbUpButton variant="outlined">
                        <BottomNavIconThumbUp />
                        5000
                      </BottomNavThumbUpButton>
                      
                      <BottomNavButton variant="outlined">
                        <BottomNavIconReply />
                        返信
                      </BottomNavButton>
                      
                      <BottomNavButton variant="outlined">
                        <BottomNavIconEdit />
                        編集
                      </BottomNavButton>
                      
                      <BottomNavIdBox>
                        <BottomNavIconPublic />
                        <BottomNavId>_5pweox1Io8</BottomNavId>
                      </BottomNavIdBox>
                      
                    </BottomNavButtonsBox>
                    
                    
                    
                    
                  </BottomNavBox>
                  
                </CommentRightBox>
                
              </CommentContainer>
              
              
              
              {/* Reply1 */}
              <CommentContainer>
                
                <ReplyLeftBox>
                  <ReplyLine />
                  
                  <ReplyThumbnailBox>
                    <ProfileThumbnail id="a8b0gX6lMIz" anonymity small />
                  </ReplyThumbnailBox>
                </ReplyLeftBox>
                
                
                <ReplyRightBox>
                
                  <ProfileNameBox>
                    <ProfileName anonymity />
                  </ProfileNameBox>
                  
                  
                  <CommentBox>
                  
                    <p style={{ marginBottom: '20px' }}>ワールドカップ 日本×ベルギー戦</p>
                    
                    <p>いろいろありましたが、良くやったと思います。</p>
                    <p>個のクオリティでは負けている部分も多かったですが</p>
                    <p>素晴らしいゴールもあり、一時は勝てると信じていたのですが…。</p>
                    <p>あの試合は最後のカウンターの対応を問題視するよりも</p>
                    <p>2点を守れなかったことについて考えるべきだと思います。</p>
                    <p>采配次第では勝てただけに本当に残念です。</p>

                  </CommentBox>
                  
                  
                  <UpdatedDateBox>
                    <UpdatedDateIconUpdate />
                    <UpdatedDate>3 時間前</UpdatedDate>
                  </UpdatedDateBox>
                  
                  
                  <BottomNavBox>
                    
                    <BottomNavThumbUpButton variant="outlined">
                      <BottomNavIconThumbUp />
                      123
                    </BottomNavThumbUpButton>
                    
                    <BottomNavButton variant="outlined">
                      <BottomNavIconReply />
                      返信
                    </BottomNavButton>
                    
                    <BottomNavIdBox>
                      <BottomNavIconPublic />
                      <BottomNavId>GMi2JFwJ868</BottomNavId>
                    </BottomNavIdBox>
                    
                  </BottomNavBox>
                  
                </ReplyRightBox>
                
              </CommentContainer>
              
              
              {/* Reply2 */}
              <CommentContainer>
                
                <ReplyLeftBox>
                  <ReplyLine />
                  
                  <ReplyThumbnailBox>
                    <ProfileThumbnail id="a8b0gX6lMIz" anonymity small />
                  </ReplyThumbnailBox>
                </ReplyLeftBox>
                
                
                <ReplyRightBox>
                
                  <ProfileNameBox>
                    <ProfileName
                      name="テストネーム"
                      status="テストステータス"
                    />
                  </ProfileNameBox>
                  
                  
                  <CommentBox>
                  
                    <p>短いテキスト</p>

                  </CommentBox>
                  
                  
                  <UpdatedDateBox>
                    <UpdatedDateIconUpdate />
                    <UpdatedDate>30 分前</UpdatedDate>
                  </UpdatedDateBox>
                  
                  
                  <BottomNavBox>
                    
                    <BottomNavThumbUpButton variant="outlined">
                      <BottomNavIconThumbUp />
                      0
                    </BottomNavThumbUpButton>
                    
                    <BottomNavButton variant="outlined">
                      <BottomNavIconReply />
                      返信
                    </BottomNavButton>
                    
                    <BottomNavIdBox>
                      <BottomNavIconPublic />
                      <BottomNavId>E3PwP4kzFa8</BottomNavId>
                    </BottomNavIdBox>
                    
                  </BottomNavBox>
                  
                </ReplyRightBox>
                
              </CommentContainer>
              
            </CommentsRepliesContainer>
            
            
            
            {/* Comment2 */}
            <CommentsRepliesContainer>
              
              <CommentContainer>
                
                <CommentLeftBox>
                  <CommentThumbnailBox>
                    <ProfileThumbnail id="a8b0gX6lMIz" />
                    <CommentLevelBox>Lv.500</CommentLevelBox>
                  </CommentThumbnailBox>
                  
                  {/*<CommentLine />*/}
                </CommentLeftBox>
                
                
                <CommentRightBox>
                
                  <ProfileNameBox>
                    <ProfileName />
                  </ProfileNameBox>
                  
                  
                  <CommentBox>
                    
                    <CommentReplyImg
                      src="https://gameusers.org/assets/img/bbs_uc/reply/1089/image_1.jpg"
                      onClick={() => stores.layout.handleModalImageOpen('https://gameusers.org/assets/img/bbs_uc/reply/1089/image_1.jpg')}
                    />
                    
                    <p>Dead by Daylight配信はサバイバーが悲惨なことになってしまいましたが</p>
                    <p>誰かがコメントでスキルチェックのやり方を</p>
                    <p>音を聞いてやるといいと教えてくれてたので</p>
                    <p>配信後に意識してやってみたら結構できるようになりました。</p>
                    <p>配信しているとちょっとずつ音の遅延が発生していたので</p>
                    <p>それもあって余計難しくなっていたのかもしれません。</p>
                    <p style={{ marginBottom: '20px' }}>PS4のコントローラーのイヤフォンプラグから音を取り込むようにしてみたので</p>
                    <p>音ズレが治っているといいのですが。</p>
                    <p>次の配信ではスキルチェックがもっとできるようになっていると思います。</p>

                  </CommentBox>
                  
                  
                  <UpdatedDateBox>
                    <UpdatedDateIconUpdate />
                    <UpdatedDate>1 日前</UpdatedDate>
                  </UpdatedDateBox>
                  
                  
                  <BottomNavBox>
                    
                    <BottomNavThumbUpButton variant="outlined">
                      <BottomNavIconThumbUp />
                      1
                    </BottomNavThumbUpButton>
                    
                    <BottomNavButton variant="outlined">
                      <BottomNavIconEdit />
                      編集
                    </BottomNavButton>
                    
                    <BottomNavButton variant="outlined">
                      <BottomNavIconReply />
                      返信
                    </BottomNavButton>
                    
                    <BottomNavIdBox>
                      <BottomNavIconPublic />
                      <BottomNavId>M8-vje-bq9c</BottomNavId>
                    </BottomNavIdBox>
                    
                  </BottomNavBox>
                  
                </CommentRightBox>
                
              </CommentContainer>
              
            </CommentsRepliesContainer>
            
            
            
            {/* Comment3 */}
            <CommentsRepliesContainer>
              
              <CommentContainer>
                
                <CommentLeftBox>
                  <CommentThumbnailBox>
                    <ProfileThumbnail id="a8b0gX6lMIz" />
                    <CommentLevelBox>Lv.30</CommentLevelBox>
                  </CommentThumbnailBox>
                  
                  {/*<CommentLine />*/}
                </CommentLeftBox>
                
                
                <CommentRightBox>
                
                  <ProfileNameBox>
                    <ProfileName />
                  </ProfileNameBox>
                  
                  
                  <CommentBox>
                    
                    <CommentReplyVideoBox
                      onClick={() => stores.layout.handleModalVideoOpen('youtube', '1yIHLQJNvDw')}
                    >
                      <CommentReplyVideoImg
                        src="https://img.youtube.com/vi/1yIHLQJNvDw/mqdefault.jpg"
                      />
                      
                      <CommentReplyVideoPlayButtonImg
                        src="/static/img/common/video-play-button.png"
                      />
                    </CommentReplyVideoBox>
                    
                    <p>PCの相談に乗ってくれた方ありがとうございました。</p>
                    <p>注文したパーツは明日届くようです。</p>
                    <p>久しぶりに組み立てるのでちゃんとできるか心配です。</p>

                  </CommentBox>
                  
                  
                  <UpdatedDateBox>
                    <UpdatedDateIconUpdate />
                    <UpdatedDate>3 日前</UpdatedDate>
                  </UpdatedDateBox>
                  
                  
                  <BottomNavBox>
                    
                    <BottomNavThumbUpButton variant="outlined">
                      <BottomNavIconThumbUp />
                      67
                    </BottomNavThumbUpButton>
                    
                    <BottomNavButton variant="outlined">
                      <BottomNavIconEdit />
                      編集
                    </BottomNavButton>
                    
                    <BottomNavButton variant="outlined">
                      <BottomNavIconReply />
                      返信
                    </BottomNavButton>
                    
                    <BottomNavIdBox>
                      <BottomNavIconPublic />
                      <BottomNavId>1yIHLQJNvDw</BottomNavId>
                    </BottomNavIdBox>
                    
                  </BottomNavBox>
                  
                </CommentRightBox>
                
              </CommentContainer>
              
            </CommentsRepliesContainer>
            
            
            
            
            {/* Comment4 */}
            <CommentsRepliesContainer>
              
              <CommentContainer>
                
                <CommentLeftBox>
                  <CommentThumbnailBox>
                    <ProfileThumbnail id="a8b0gX6lMIz" />
                    <CommentLevelBox>Lv.1</CommentLevelBox>
                  </CommentThumbnailBox>
                  
                  {/*<CommentLine />*/}
                </CommentLeftBox>
                
                
                <CommentRightBox>
                
                  <ProfileNameBox>
                    <ProfileName />
                  </ProfileNameBox>
                  
                  
                  <CommentBox>
                    
                    <CommentReplyPreviewImagesBox>
                    
                      <CommentReplyPrevieImg
                        src="https://gameusers.org/assets/img/bbs_uc/reply/1089/image_1.jpg"
                        onClick={() => stores.layout.handleLightboxOpen('Um_cUEd7vl0', 0)}
                      />
                      
                      <CommentReplyPrevieImg
                        src="https://gameusers.org/assets/img/bbs_uc/comment/1209/image_1.jpg"
                        onClick={() => stores.layout.handleLightboxOpen('Um_cUEd7vl0', 1)}
                      />
                      
                      <CommentReplyPrevieImg
                        src="https://gameusers.org/assets/img/bbs_uc/reply/1775/image_1.jpg"
                        onClick={() => stores.layout.handleLightboxOpen('Um_cUEd7vl0', 2)}
                      />
                      
                      <CommentReplyPrevieImg
                        src="https://gameusers.org/assets/img/bbs_uc/comment/1168/image_1.jpg"
                        onClick={() => stores.layout.handleLightboxOpen('Um_cUEd7vl0', 3)}
                      />
                      
                      <CommentReplyPrevieImg
                        src="https://gameusers.org/assets/img/bbs_uc/comment/1167/image_1.jpg"
                        onClick={() => stores.layout.handleLightboxOpen('Um_cUEd7vl0', 4)}
                      />
                      
                      <CommentReplyPreviewVideoBox
                        onClick={() => stores.layout.handleModalVideoOpen('youtube', '1yIHLQJNvDw')}
                      >
                        <CommentReplyPreviewVideoImg
                          src="https://img.youtube.com/vi/1yIHLQJNvDw/mqdefault.jpg"
                        />
                        
                        <CommentReplyPreviewVideoPlayButtonImg
                          src="/static/img/common/video-play-button.png"
                        />
                      </CommentReplyPreviewVideoBox>
                    
                    </CommentReplyPreviewImagesBox>
                    
                    
                    
                    <p>画像・動画複数表示テスト。</p>
                    <p>仮想世界の中に生み出されたコンピューターが生み出した仮想世界の中に生み出されたコンピューターが生み出した仮想世界の中に…。といった感じで合わせ鏡のように永遠に増えていく世界の一つに僕らは住んでいるのです。ずっと上まで遡れば現実の世界があるのかもしれませんが、知る術はないでしょうね。大元の世界はどんな世界なんでしょうか。気になります。</p>

                  </CommentBox>
                  
                  
                  <UpdatedDateBox>
                    <UpdatedDateIconUpdate />
                    <UpdatedDate>5 日前</UpdatedDate>
                  </UpdatedDateBox>
                  
                  
                  <BottomNavBox>
                    
                    <BottomNavThumbUpButton variant="outlined">
                      <BottomNavIconThumbUp />
                      3
                    </BottomNavThumbUpButton>
                    
                    <BottomNavButton variant="outlined">
                      <BottomNavIconEdit />
                      編集
                    </BottomNavButton>
                    
                    <BottomNavButton variant="outlined">
                      <BottomNavIconReply />
                      返信
                    </BottomNavButton>
                    
                    <BottomNavIdBox>
                      <BottomNavIconPublic />
                      <BottomNavId>Um_cUEd7vl0</BottomNavId>
                    </BottomNavIdBox>
                    
                  </BottomNavBox>
                  
                </CommentRightBox>
                
              </CommentContainer>
              
            </CommentsRepliesContainer>
            
            
            
            {/* Comment5 */}
            <CommentsRepliesContainer>
              
              <CommentContainer>
                
                <CommentLeftBox>
                  <CommentThumbnailBox>
                    <ProfileThumbnail id="a8b0gX6lMIz" />
                    <CommentLevelBox>Lv.1</CommentLevelBox>
                  </CommentThumbnailBox>
                  
                  {/*<CommentLine />*/}
                </CommentLeftBox>
                
                
                <CommentRightBox>
                
                  <ProfileNameBox>
                    <ProfileName />
                  </ProfileNameBox>
                  
                  
                  <CommentBox>
                    
                    <CommentReplyPreviewImagesBox>
                    
                      <CommentReplyPrevieImg
                        src="https://gameusers.org/assets/img/bbs_uc/comment/1070/image_1.jpg"
                        onClick={() => stores.layout.handleLightboxOpen('GMi2JFwJ868', 0)}
                      />
                      
                      <CommentReplyPrevieImg
                        src="https://gameusers.org/assets/img/bbs_uc/reply/1592/image_1.jpg"
                        onClick={() => stores.layout.handleLightboxOpen('GMi2JFwJ868', 1)}
                      />
                      
                      <CommentReplyPrevieImg
                        src="https://gameusers.org/assets/img/bbs_uc/comment/1065/image_1.jpg"
                        onClick={() => stores.layout.handleLightboxOpen('GMi2JFwJ868', 2)}
                      />
                      
                      <CommentReplyPreviewVideoBox
                        onClick={() => stores.layout.handleModalVideoOpen('youtube', '1yIHLQJNvDw')}
                      >
                        <CommentReplyPreviewVideoImg
                          src="https://img.youtube.com/vi/1yIHLQJNvDw/mqdefault.jpg"
                        />
                        
                        <CommentReplyPreviewVideoPlayButtonImg
                          src="/static/img/common/video-play-button.png"
                        />
                      </CommentReplyPreviewVideoBox>
                    
                    </CommentReplyPreviewImagesBox>
                    
                    
                    
                    <p>画像・動画複数表示テスト2。</p>
                    <p>スマホを充電するケーブルなどが床に転がっているのが気に入らなかったので、ケーブルにマジックテープを巻きつけて磁石を固定し、鉄で出来ているPCケースやテーブルの足にくっつけようと考えました。</p>

                  </CommentBox>
                  
                  
                  <UpdatedDateBox>
                    <UpdatedDateIconUpdate />
                    <UpdatedDate>7 日前</UpdatedDate>
                  </UpdatedDateBox>
                  
                  
                  <BottomNavBox>
                    
                    <BottomNavThumbUpButton variant="outlined">
                      <BottomNavIconThumbUp />
                      30
                    </BottomNavThumbUpButton>
                    
                    <BottomNavButton variant="outlined">
                      <BottomNavIconEdit />
                      編集
                    </BottomNavButton>
                    
                    <BottomNavButton variant="outlined">
                      <BottomNavIconReply />
                      返信
                    </BottomNavButton>
                    
                    <BottomNavIdBox>
                      <BottomNavIconPublic />
                      <BottomNavId>GMi2JFwJ868</BottomNavId>
                    </BottomNavIdBox>
                    
                  </BottomNavBox>
                  
                </CommentRightBox>
                
              </CommentContainer>
              
            </CommentsRepliesContainer>
            
            
            
          </ContentsContainer>
          
        </ContentsExpansionPanelDetails>
        
        
        
        {/*<Swiper {...swiperSettingObj}>
                      
          <div style={{ width: '300px', height: '300px', backgroundColor: 'pink' }}>
            AAA
          </div>
          
          <div style={{ width: '300px', height: '300px', backgroundColor: 'pink' }}>
            BBB
          </div>
          
          <div style={{ width: '300px', height: '300px', backgroundColor: 'pink' }}>
            CCC
          </div>
          
          <div style={{ width: '300px', height: '300px', backgroundColor: 'pink' }}>
            DDD
          </div>
            
        </Swiper>*/}
        
        
      </ExpansionPanel>
      
      </React.Fragment>
    );
    
  }
  
};