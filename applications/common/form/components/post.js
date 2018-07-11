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



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// ---------------------------------------------
//   BBS
// ---------------------------------------------

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

const ProfileCheckbox = styled(Checkbox)`
  && {
    height: auto;
  }
`;





const Textarea = styled.textarea`
  width: 100%;
  max-width: 600px;
  margin: 10px 0 0 0;
  padding: 0;
  
  @media screen and (max-width: 480px) {
    max-width: auto;
  }
`;

const ImageVideoButtonsBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 1px 0 0 0;
  padding: 0;
`;

const ImageButton = styled(Button)`
  && {
    margin: 0 8px 0 0;
  }
`;

const ImageBox = styled.div`
  // display: flex;
  // flex-flow: row nowrap;
  // font-size: 14px;
  margin: 10px 0 0 0;
  padding: 0;
`;

const ImageDescription = styled.p`
  font-size: 14px;
  // margin: 0 0 0 0;
  // padding: 0;
`;

const ImageDescriptionUl = styled.ul`
  font-size: 14px;
  margin: 10px 16px;
  // padding: 0;
`;

const ImageInputFile = styled.input`
  // font-size: 14px;
  margin: 12px 0 4px 0;
  // padding: 0;
`;

const VideoBox = styled.div`
  margin: 10px 0 0 0;
  padding: 0;
`;

const VideoTextFieldBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  // margin: 8px 0 20px 0;
  // background-color: pink;
`;

const VideoTextField = styled(TextField)`
  && {
    flex-grow: 2;
    width: 100%;
    max-width: 500px;
    margin: 0 10px 0 0;
    
    @media screen and (max-width: 480px) {
      max-width: auto;
    }
  }
`;




const ImageVideoPreviewContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 10px 0 0 0;
  padding: 0;
`;

const ImageVideoPreviewBox = styled.div`
  position: relative;
  margin: 10px 12px 0 0;
  padding: 0;
`;

const PreviewImg = styled.img`
  max-height: 108px;
  
  @media screen and (max-width: 480px) {
    max-height: 54px;
  }
`;

const PreviewDeleteButton = styled(Button)`
  && {
    background-color: ${cyan[500]};
    &:hover {
      background-color: ${cyan[700]};
    }
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
    position: absolute;
    top: -10px;
    right: -10px;
    // z-index: 1000;
  }
`;

const PreviewVideoPlayButtonImg = styled.img`
  // background-color: pink;
  // opacity: 0.5;
  // max-height: 108px;
  // padding: 10px 10px 0 0;
  pointer-events: none;
  width: 100%;
  position: absolute;
  top: 0;
`;

const SendButton = styled(Button)`
  && {
    margin: 18px 0 0 0;
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
  }
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores } = this.props;
    
    
    
    // --------------------------------------------------
    //   Preview
    // --------------------------------------------------
    
    const codePreviewArr = [];
    
    if (stores.formPost.previewArr && stores.formPost.previewArr.length > 0) {
      
      // console.log(`stores.pathname = ${stores.pathname}`);
      
      stores.formPost.previewArr.forEach((value, index) => {
        
        
        // ---------------------------------------------
        //   画像
        // ---------------------------------------------
        
        if (value.imageSrc) {
          
          codePreviewArr.push(
            <ImageVideoPreviewBox key={index}>
              <PreviewImg
                src={value.imageSrc}
                onClick={() => stores.layout.handleOpenModalImage(value.imageSrc)}
              />
              
              <PreviewDeleteButton
                variant="fab"
                mini
                color="primary"
                onClick={() => stores.formPost.handlePreviewDelete(index)}
              >
                <IconClose />
              </PreviewDeleteButton>
            </ImageVideoPreviewBox>
          );
          
        // ---------------------------------------------
        //   動画
        // ---------------------------------------------
        
        } else {
          
          codePreviewArr.push(
            <ImageVideoPreviewBox key={index}>
              <PreviewImg
                src={`https://img.youtube.com/vi/${value.videoId}/mqdefault.jpg`}
                onClick={() => stores.layout.handleOpenModalVideo(value.videoChannel, value.videoId)}
              />
              
              <PreviewVideoPlayButtonImg
                src="/static/img/common/video-play-button.png"
              />
              
              <PreviewDeleteButton
                variant="fab"
                color="primary"
              >
                <IconClose />
              </PreviewDeleteButton>
            </ImageVideoPreviewBox>
          );
          
        }
        
      });
      
    }
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        {/* BBS Form */}
        <ProfileBox>
          
          <ProfileThumbnailBox>
            
            {stores.formPost.bbsFormAnonymityChecked ? (
              <ProfileThumbnail src="https://gameusers.org/assets/img/common/thumbnail_none.png" />
            ) : (
              <ProfileThumbnail src="https://gameusers.org/assets/img/user/1/thumbnail.jpg" />
            )}
          
          </ProfileThumbnailBox>
          
          
          <ProfileInfoBox>
          
            <ProfileNameBox>
              
              {stores.formPost.bbsFormAnonymityChecked ? (
                <React.Fragment>
                  <ProfileName>ななしさん</ProfileName>
                  
                  <ProfileStatusBox>
                    <IconHealingProfileStatus />
                    <ProfileStatus>774</ProfileStatus>
                  </ProfileStatusBox>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <ProfileName>あづみ</ProfileName>
                  
                  <ProfileStatusBox>
                    <IconHealingProfileStatus />
                    <ProfileStatus>プロハンター</ProfileStatus>
                  </ProfileStatusBox>
                  
                  <ProfileAccessTimeBox>
                    <IconScheduleProfileAccessTime />
                    <ProfileStatus>1 時間前</ProfileStatus>
                  </ProfileAccessTimeBox>
                </React.Fragment>
              )}
              
            </ProfileNameBox>
            
            <FormControlLabel
              control={
                <ProfileCheckbox
                  checked={stores.formPost.bbsFormAnonymityChecked}
                  onChange={stores.formPost.handleBbsFormAnonymityChecked}
                />
              }
              label="ななしにする"
            />
          
          </ProfileInfoBox>
          
        </ProfileBox>
        
        
        <Textarea rows="6" />
        
        
        <ImageVideoButtonsBox>
          <ImageButton
            variant="outlined"
            size="small"
            onClick={stores.formPost.handleBbsFormImageOpen}
          >
            画像アップロード
          </ImageButton>
          
          <Button
            variant="outlined"
            size="small"
            onClick={stores.formPost.handleBbsFormVideoOpen}
          >
            動画投稿
          </Button>
        </ImageVideoButtonsBox>
        
        
        {stores.formPost.bbsFormImageOpen &&
          <ImageBox>
            <ImageDescription>
              アップロードできる画像の種類は JPEG, PNG, GIF, BMP で、ファイルサイズが5MB以内のものです。
            </ImageDescription>
            
            <ImageInputFile
              type="file"
              onChange={stores.formPost.handleBbsFormAddImages}
            />
          </ImageBox>
        }
        
        
        {stores.formPost.bbsFormVideoOpen &&
          <VideoBox>
          
            <ImageDescription>
              YouTube の URL が登録できます。動画が視聴できるページの URL をブラウザからコピーして貼り付けてください。
            </ImageDescription>
            
            <ImageDescriptionUl>
              <li>https://www.youtube.com/watch?v=__</li>
              <li>https://youtu.be/__?t=600</li>
            </ImageDescriptionUl>
            
            {/*<ImageDescription>
              YouTube - https://www.youtube.com/watch?v=__
            </ImageDescription>*/}
            
            
            {/* Video URL */}
            <VideoTextFieldBox>
              <VideoTextField
                placeholder=""
                value={stores.formPost.videoUrl}
                onChange={stores.formPost.handleVideoUrl}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconVideocam />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                size="small"
              >
                追加
              </Button>
            </VideoTextFieldBox>
            
          </VideoBox>
        }
        
        
        {codePreviewArr.length > 0 &&
          <ImageVideoPreviewContainer>
            {codePreviewArr}
          </ImageVideoPreviewContainer>
        }
        
        
        <SendButton
          variant="contained"
          color="primary"
        >
          コメントする
        </SendButton>
        
      </React.Fragment>
    );
    
  }
  
};