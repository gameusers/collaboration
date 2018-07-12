// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconList from '@material-ui/icons/List';
import IconNew from '@material-ui/icons/FiberNew';
import IconImage from '@material-ui/icons/Image';
import IconOndemandVideo from '@material-ui/icons/OndemandVideo';
import IconSearch from '@material-ui/icons/Search';
import IconAssignment from '@material-ui/icons/Assignment';
import IconPublic from '@material-ui/icons/Public';
import IconHealing from '@material-ui/icons/Healing';
import IconSchedule from '@material-ui/icons/Schedule';
import IconVideocam from '@material-ui/icons/Videocam';
import IconClose from '@material-ui/icons/Close';

import cyan from '@material-ui/core/colors/cyan';

import FormPost from '../../form/components/post';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// ---------------------------------------------
//   BBS
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



const ProfileBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  // align-items: flex-start;
  margin: 0;
  padding: 0;
  // background-color: pink;
`;

const ProfileThumbnailBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  // align-items: stretch;
  margin: 0;
  // background-color: blue;
`;

const ProfileThumbnail = styled.img`
  border-radius: 6px;
  width: 48px;
  margin: 3px 0 0 0;
`;

const ProfileLine = styled.div`
  flex-grow: 2;
  border-left: 4px solid #84cacb;
  margin: 10px 0 0 0;
  padding: 0;
`;


const ProfileInfoBox = styled.div`
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

const ProfileName = styled.div`
  font-size: 14px;
  color: #337ab7;
  margin: 0;
  padding: 0;
`;


const ProfileStatusBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 0;
`;

const IconHealingProfileStatus = styled(IconHealing)`
  && {
    font-size: 18px;
    margin: 4px 2px 0 2px;
  }
`;

const ProfileStatus = styled.div`
  font-size: 14px;
`;

const ProfileAccessTimeBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 0;
`;

const IconScheduleProfileAccessTime = styled(IconSchedule)`
  && {
    font-size: 18px;
    margin: 4px 2px 0 2px;
  }
`;




const CommentsRepliesBox = styled.div`
  margin: 40px 0 0 0;
  padding: 0;
`;

const CommentBox = styled.div`
  font-size: 14px;
  line-height: 1.6em;
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
    //             onClick={() => stores.layout.handleOpenModalImage(value.imageSrc)}
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
    //             onClick={() => stores.layout.handleOpenModalVideo(value.videoChannel, value.videoId)}
    //           />
              
    //           <PreviewVideoPlayButtonImg
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
            
            {/* Comments & Replies */}
            <CommentsRepliesBox>
              
              <ProfileBox>
                
                <ProfileThumbnailBox>
                  <ProfileThumbnail src="https://gameusers.org/assets/img/user/1/thumbnail.jpg" />
                  <ProfileLine />
                </ProfileThumbnailBox>
                
                
                <ProfileInfoBox>
                
                  <ProfileNameBox>
                    
                    <ProfileName>あづみ</ProfileName>
                    
                    <ProfileStatusBox>
                      <IconHealingProfileStatus />
                      <ProfileStatus>プロハンター</ProfileStatus>
                    </ProfileStatusBox>
                    
                    <ProfileAccessTimeBox>
                      <IconScheduleProfileAccessTime />
                      <ProfileStatus>1 時間前</ProfileStatus>
                    </ProfileAccessTimeBox>
                    
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
                  
                </ProfileInfoBox>
                
              </ProfileBox>
              
            </CommentsRepliesBox>
            
          </ContentsContainer>
          
        </ContentsExpansionPanelDetails>
        
      </ExpansionPanel>
    );
    
  }
  
};