// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
// import Head from 'next/head';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Paper from '@material-ui/core/Paper';
// import Tooltip from '@material-ui/core/Tooltip';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import TableSortLabel from '@material-ui/core/TableSortLabel';

// import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconAssignment from '@material-ui/icons/Assignment';
import IconPublic from '@material-ui/icons/Public';
import IconThumbUp from '@material-ui/icons/ThumbUp';
import IconEdit from '@material-ui/icons/Edit';
import IconReply from '@material-ui/icons/Reply';
// import IconOndemandVideo from '@material-ui/icons/OndemandVideo';
// import IconSearch from '@material-ui/icons/Search';
// import IconHealing from '@material-ui/icons/Healing';
// import IconSchedule from '@material-ui/icons/Schedule';
// import IconVideocam from '@material-ui/icons/Videocam';
// import IconClose from '@material-ui/icons/Close';

import green from '@material-ui/core/colors/green';

import FormPost from '../../form/components/post';
import ProfileThumbnail from '../../profile/components/thumbnail';
import ProfileName from '../../profile/components/name';



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





// ---------------------------------------------
//   Mini Buttons
// ---------------------------------------------

const CommentMiniButtonBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 6px 0 0 0;
  padding: 0;
`;


const CommentThumbUpMiniButton = styled(Button)`
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

const StyledIconThumbUp = styled(IconThumbUp)`
  && {
    font-size: 14px;
    margin: 0 4px 0 0;
    padding: 0;
  }
`;

const CommentMiniButton = styled(Button)`
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

const StyledIconEdit = styled(IconEdit)`
  && {
    font-size: 16px;
    margin: 0 3px 0 0;
    padding: 0;
    
    @media screen and (max-width: 480px) {
      display: none;
    }
  }
`;

const StyledIconReply = styled(IconReply)`
  && {
    font-size: 16px;
    margin: 0 1px 0 0;
    padding: 0;
    
    @media screen and (max-width: 480px) {
      display: none;
    }
  }
`;

const CommentIdBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 1px 0 0 0;
`;

const CommentIdIconPublic = styled(IconPublic)`
  && {
    font-size: 20px;
    margin: 3px 2px 0 0;
  }
`;

const CommentId = styled.div`
  font-size: 12px;
  color: #009933;
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
    
    const { stores } = this.props;
    
    
    
    // --------------------------------------------------
    //   Preview
    // --------------------------------------------------
    
    // const codePreviewArr = [];
    
    // if (stores.formPost.previewArr && stores.formPost.previewArr.length > 0) {
      
    //   stores.formPost.previewArr.forEach((value, index) => {
        
        
    //     // ---------------------------------------------
    //     //   画像
    //     // ---------------------------------------------
        
    //     if (value.imageSrc) {
          
    //       codePreviewArr.push(
    //         <ImageVideoPreviewBox key={index}>
    //           <PreviewImg
    //             src={value.imageSrc}
    //             onClick={() => stores.layout.handleModalImageOpen(value.imageSrc)}
    //           />
              
    //           <PreviewDeleteButton
    //             variant="fab"
    //             mini
    //             color="primary"
    //             onClick={() => stores.formPost.handlePreviewDelete(index)}
    //           >
    //             <IconClose />
    //           </PreviewDeleteButton>
    //         </ImageVideoPreviewBox>
    //       );
          
    //     // ---------------------------------------------
    //     //   動画
    //     // ---------------------------------------------
        
    //     } else {
          
    //       codePreviewArr.push(
    //         <ImageVideoPreviewBox key={index}>
    //           <PreviewImg
    //             src={`https://img.youtube.com/vi/${value.videoId}/mqdefault.jpg`}
    //             onClick={() => stores.layout.handleModalVideoOpen(value.videoChannel, value.videoId)}
    //           />
              
    //           <PreviewCommentReplyVideoPlayButtonImgImg
    //             src="/static/img/common/video-play-button.png"
    //           />
              
    //           <PreviewDeleteButton
    //             variant="fab"
    //             color="primary"
    //           >
    //             <IconClose />
    //           </PreviewDeleteButton>
    //         </ImageVideoPreviewBox>
    //       );
          
    //     }
        
    //   });
      
    // }
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <ExpansionPanel
        expanded={stores.current.bbsExpanded}
      >
        
        {/* Title */}
        <TitleExpansionPanelSummary
          expandIcon={
            <IconExpandMore
              onClick={stores.current.handleBbsExpanded}
            />
          }
        >
        
          <TitleBox>
            
            <TitleH2>雑談スレッド</TitleH2>
            
            <TitleInfoBox>
              
              <TitleInfoAboutBox>
                <IconAssignmentBbsInfo />
                <BbsInfoAbout>スレッドについて</BbsInfoAbout>
              </TitleInfoAboutBox>
              
              <TitleInfoIdBox>
                <IconPublicBbsInfo />
                <BbsInfoId>ks8WPvlQpbg</BbsInfoId>
              </TitleInfoIdBox>
              
              <TitleInfoMiniButton variant="outlined">
                編集
              </TitleInfoMiniButton>
              
            </TitleInfoBox>
            
          </TitleBox>
          
        </TitleExpansionPanelSummary>
        
        
        
        {/* Contents */}
        <ContentsExpansionPanelDetails>
          
          <ContentsContainer>
            
            
            {/* Form Post Comment */}
            <FormPost
              id="ks8WPvlQpbg"
              sendButtonLabel="コメントする"
            />
            
            
            {/* Comment1 */}
            <CommentsRepliesContainer>
              
              
              {/* Comment */}
              <CommentContainer>
                
                <CommentLeftBox>
                  <CommentThumbnailBox>
                    <ProfileThumbnail />
                  </CommentThumbnailBox>
                  
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
                  
                  
                  <CommentMiniButtonBox>
                    
                    <CommentThumbUpMiniButton variant="outlined">
                      <StyledIconThumbUp />
                      5000
                    </CommentThumbUpMiniButton>
                    
                    <CommentMiniButton variant="outlined">
                      <StyledIconEdit />
                      編集
                    </CommentMiniButton>
                    
                    <CommentMiniButton variant="outlined">
                      <StyledIconReply />
                      返信
                    </CommentMiniButton>
                    
                    <CommentIdBox>
                      <CommentIdIconPublic />
                      <CommentId>_5pweox1Io8</CommentId>
                    </CommentIdBox>
                    
                  </CommentMiniButtonBox>
                  
                </CommentRightBox>
                
              </CommentContainer>
              
              
              
              {/* Reply1 */}
              <CommentContainer>
                
                <ReplyLeftBox>
                  <ReplyLine />
                  
                  <ReplyThumbnailBox>
                    <ProfileThumbnail anonymity small />
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
                  
                  
                  <CommentMiniButtonBox>
                    
                    <CommentThumbUpMiniButton variant="outlined">
                      <StyledIconThumbUp />
                      123
                    </CommentThumbUpMiniButton>
                    
                    <CommentMiniButton variant="outlined">
                      <StyledIconReply />
                      返信
                    </CommentMiniButton>
                    
                    <CommentIdBox>
                      <CommentIdIconPublic />
                      <CommentId>GMi2JFwJ868</CommentId>
                    </CommentIdBox>
                    
                  </CommentMiniButtonBox>
                  
                </ReplyRightBox>
                
              </CommentContainer>
              
              
              {/* Reply2 */}
              <CommentContainer>
                
                <ReplyLeftBox>
                  <ReplyLine />
                  
                  <ReplyThumbnailBox>
                    <ProfileThumbnail anonymity small />
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
                  
                  
                  <CommentMiniButtonBox>
                    
                    <CommentThumbUpMiniButton variant="outlined">
                      <StyledIconThumbUp />
                      0
                    </CommentThumbUpMiniButton>
                    
                    <CommentMiniButton variant="outlined">
                      <StyledIconReply />
                      返信
                    </CommentMiniButton>
                    
                    <CommentIdBox>
                      <CommentIdIconPublic />
                      <CommentId>E3PwP4kzFa8</CommentId>
                    </CommentIdBox>
                    
                  </CommentMiniButtonBox>
                  
                </ReplyRightBox>
                
              </CommentContainer>
              
            </CommentsRepliesContainer>
            
            
            
            {/* Comment2 */}
            <CommentsRepliesContainer>
              
              <CommentContainer>
                
                <CommentLeftBox>
                  <CommentThumbnailBox>
                    <ProfileThumbnail />
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
                  
                  
                  <CommentMiniButtonBox>
                    
                    <CommentThumbUpMiniButton variant="outlined">
                      <StyledIconThumbUp />
                      1
                    </CommentThumbUpMiniButton>
                    
                    <CommentMiniButton variant="outlined">
                      <StyledIconEdit />
                      編集
                    </CommentMiniButton>
                    
                    <CommentMiniButton variant="outlined">
                      <StyledIconReply />
                      返信
                    </CommentMiniButton>
                    
                    <CommentIdBox>
                      <CommentIdIconPublic />
                      <CommentId>M8-vje-bq9c</CommentId>
                    </CommentIdBox>
                    
                  </CommentMiniButtonBox>
                  
                </CommentRightBox>
                
              </CommentContainer>
              
            </CommentsRepliesContainer>
            
            
            
            {/* Comment3 */}
            <CommentsRepliesContainer>
              
              <CommentContainer>
                
                <CommentLeftBox>
                  <CommentThumbnailBox>
                    <ProfileThumbnail />
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
                  
                  
                  <CommentMiniButtonBox>
                    
                    <CommentThumbUpMiniButton variant="outlined">
                      <StyledIconThumbUp />
                      67
                    </CommentThumbUpMiniButton>
                    
                    <CommentMiniButton variant="outlined">
                      <StyledIconEdit />
                      編集
                    </CommentMiniButton>
                    
                    <CommentMiniButton variant="outlined">
                      <StyledIconReply />
                      返信
                    </CommentMiniButton>
                    
                    <CommentIdBox>
                      <CommentIdIconPublic />
                      <CommentId>M8-vje-bq9c</CommentId>
                    </CommentIdBox>
                    
                  </CommentMiniButtonBox>
                  
                </CommentRightBox>
                
              </CommentContainer>
              
            </CommentsRepliesContainer>
            
            
            
            
          </ContentsContainer>
          
        </ContentsExpansionPanelDetails>
        
      </ExpansionPanel>
    );
    
  }
  
};