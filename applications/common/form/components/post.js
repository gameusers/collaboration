// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import IconVideocam from '@material-ui/icons/Videocam';
import IconClose from '@material-ui/icons/Close';

import cyan from '@material-ui/core/colors/cyan';

import ProfileThumbnail from '../../profile/components/thumbnail';
import ProfileName from '../../profile/components/name';



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

// const ProfileThumbnail = styled.img`
//   border-radius: 6px;
//   width: 48px;
//   margin: 3px 0 0 0;
// `;

// const ProfileLine = styled.div`
//   flex-grow: 2;
//   border-left: 4px solid #84cacb;
//   margin: 10px 0 0 0;
//   padding: 0;
// `;


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
    
    const { stores, id, sendButtonLabel } = this.props;
    
    
    
    // --------------------------------------------------
    //   Anonymity Checked
    // --------------------------------------------------
    
    let anonymityChecked = false;
    
    if (id in stores.formPost.anonymityCheckedObj) {
      anonymityChecked = stores.formPost.anonymityCheckedObj[id];
      // console.log(`anonymityChecked = ${anonymityChecked}`);
    }
    
    
    // --------------------------------------------------
    //   Send Button Label
    // --------------------------------------------------
    
    let buttonLabel = '送信する';
    
    if (sendButtonLabel) {
      buttonLabel = sendButtonLabel;
    }
    
    
    
    
    // --------------------------------------------------
    //   Preview
    // --------------------------------------------------
    
    const codePreviewArr = [];
    
    if (stores.formPost.previewArr && stores.formPost.previewArr.length > 0) {
      
      stores.formPost.previewArr.forEach((value, index) => {
        
        
        // ---------------------------------------------
        //   画像
        // ---------------------------------------------
        
        if (value.imageSrc) {
          
          codePreviewArr.push(
            <ImageVideoPreviewBox key={index}>
              <PreviewImg
                src={value.imageSrc}
                onClick={() => stores.layout.handleModalImageOpen(value.imageSrc)}
              />
              
              <PreviewDeleteButton
                variant="fab"
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
                onClick={() => stores.layout.handleModalVideoOpen(value.videoChannel, value.videoId)}
              />
              
              <PreviewVideoPlayButtonImg
                src="/static/img/common/video-play-button.png"
              />
              
              <PreviewDeleteButton
                variant="fab"
                color="primary"
                onClick={() => stores.formPost.handlePreviewDelete(index)}
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
        
        {/* プロフィール */}
        <ProfileBox>
          
          <ProfileThumbnailBox>
            {anonymityChecked ? (
              <ProfileThumbnail anonymity />
            ) : (
              <ProfileThumbnail />
            )}
          </ProfileThumbnailBox>
          
          
          <ProfileInfoBox>
          
            <ProfileNameBox>
              
            {anonymityChecked ? (
              <ProfileName anonymity />
            ) : (
              <ProfileName />
            )}
              
            </ProfileNameBox>
            
            <FormControlLabel
              control={
                <ProfileCheckbox
                  checked={anonymityChecked}
                  onChange={() => stores.formPost.handleAnonymityChecked(id)}
                />
              }
              label="ななしにする"
            />
          
          </ProfileInfoBox>
          
        </ProfileBox>
        
        
        {/* Textarea */}
        <Textarea rows="6" />
        
        
        {/* 画像アップロードフォーム＆動画投稿フォームを表示するためのボタン */}
        <ImageVideoButtonsBox>
          <ImageButton
            variant="outlined"
            size="small"
            onClick={stores.formPost.handleImageOpen}
          >
            画像アップロード
          </ImageButton>
          
          <Button
            variant="outlined"
            size="small"
            onClick={stores.formPost.handleVideoOpen}
          >
            動画投稿
          </Button>
        </ImageVideoButtonsBox>
        
        
        {/* 画像アップロードフォーム */}
        {stores.formPost.imageOpen &&
          <ImageBox>
            <ImageDescription>
              アップロードできる画像の種類は JPEG, PNG, GIF, BMP で、ファイルサイズが5MB以内のものです。
            </ImageDescription>
            
            <ImageInputFile
              type="file"
              onChange={stores.formPost.handleAddImages}
            />
          </ImageBox>
        }
        
        
        {/* 動画投稿フォーム */}
        {stores.formPost.videoOpen &&
          <VideoBox>
          
            <ImageDescription>
              YouTube の URL が登録できます。動画が視聴できるページの URL をブラウザからコピーして貼り付けてください。
            </ImageDescription>
            
            <ImageDescriptionUl>
              <li>https://www.youtube.com/watch?v=__</li>
              <li>https://youtu.be/__?t=600</li>
            </ImageDescriptionUl>
            
            
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
                onClick={stores.formPost.handleAddVideos}
              >
                追加
              </Button>
            </VideoTextFieldBox>
            
          </VideoBox>
        }
        
        
        {/* 画像と動画のプレビュー */}
        {codePreviewArr.length > 0 &&
          <ImageVideoPreviewContainer>
            {codePreviewArr}
          </ImageVideoPreviewContainer>
        }
        
        
        {/* 送信ボタン */}
        <SendButton
          variant="contained"
          color="primary"
        >
          {buttonLabel}
        </SendButton>
        
      </React.Fragment>
    );
    
  }
  
};