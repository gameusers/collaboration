// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import Lightbox from 'react-images';
import ModalVideo from 'react-modal-video';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import IconPermIdentity from '@material-ui/icons/PermIdentity';
import IconVideocam from '@material-ui/icons/Videocam';
import IconClose from '@material-ui/icons/Close';
import IconDescription from '@material-ui/icons/Description';
import IconHelpOutline from '@material-ui/icons/HelpOutline';


import cyan from '@material-ui/core/colors/cyan';

import UserThumbnail from '../../user/components/thumbnail';
import UserName from '../../user/components/name';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// ---------------------------------------------
//   User
// ---------------------------------------------

const UserBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
  padding: 0;
  // background-color: pink;
`;

const UserThumbnailBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 3px 0 0 0;
  // background-color: blue;
`;

const UserInfoBox = styled.div`
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

const UserCheckbox = styled(Checkbox)`
  && {
    height: auto;
  }
`;


// ---------------------------------------------
//   Input Name
// ---------------------------------------------

const NameTextField = styled(TextField)`
  && {
    width: 300px;
    margin: 0 0 4px 0;
    
    @media screen and (max-width: 480px) {
      width: 100%;
    }
  }
`;


// ---------------------------------------------
//   Textarea
// ---------------------------------------------

const StyledTextareaAutosize = styled(TextareaAutosize)`
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
      width: 100%;
      max-width: auto;
      resize: none;
    }
  }
`;



// ---------------------------------------------
//   Image Video Form
// ---------------------------------------------

// ----------------------------------------
//   - Image
// ----------------------------------------

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
  line-height: 1.6em;
  margin: 10px 16px;
  // padding: 0;
`;

const ImageInputFileBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  // font-size: 14px;
  margin: 10px 0 6px;
  // padding: 0;
`;

const ImageInputFile = styled.input`
  // font-size: 14px;
  margin: 0;
  padding: 4px 0 0 0;
`;

const ImageTextField = styled(TextField)`
  && {
    // flex-grow: 2;
    width: 100%;
    max-width: 500px;
    margin: 10px 0 0 0;
    
    @media screen and (max-width: 480px) {
      max-width: auto;
    }
  }
`;

const ImageCaptionDescription = styled.p`
  font-size: 14px;
  margin: 10px 0 0 0;
  // padding: 0;
`;


// ----------------------------------------
//   - Video
// ----------------------------------------

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



// ---------------------------------------------
//   Image Video Preview
// ---------------------------------------------

const PreviewContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 10px 0 0 0;
  padding: 0;
`;

const PreviewBox = styled.div`
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
    margin: 18px 10px 0 0;
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
    //   Props
    // ---------------------------------------------
    
    // Arguments
    
    
    
    // ---------------------------------------------
    //   Initialize Store
    // ---------------------------------------------
    
    const argumentsLightboxObj = {
      id: props.id,
      lightboxArr: props.lightboxArr,
    };
    
    props.stores.layout.initializeLightbox(argumentsLightboxObj);
    
    
    // props.stores.layout.initializeModalVideo(props.id);
    
    
    const argumentsFormPostObj = {
      id: props.id,
      name: props.name,
      text: props.text,
      imageVideoArr: props.imageVideoArr,
    };
    
    props.stores.formPost.initializeFormPost(argumentsFormPostObj);
    
  }
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, id, buttonLabel1, buttonHandle1, buttonLabel2, buttonHandle2 } = this.props;
    
    
    
    // ---------------------------------------------
    //   Login User ID
    // ---------------------------------------------
    
    const loginUserId = stores.data.loginUserObj.id;
    
    
    
    // ---------------------------------------------
    //   Form
    // ---------------------------------------------
    
    const anonymityChecked = stores.formPost.anonymityCheckedObj[id];
    const name = stores.formPost.nameObj[id];
    const text = stores.formPost.textObj[id];
    const imageFormOpen = stores.formPost.imageFormOpenObj[id];
    const videoFormOpen = stores.formPost.videoFormOpenObj[id];
    const imageCaptionOpen = stores.formPost.imageCaptionOpenObj[id];
    const imageCaption = stores.formPost.imageCaptionObj[id];
    const videoUrl = stores.formPost.videoUrlObj[id];
    
    const {
      
      handleAnonymityChecked,
      handleName,
      handleText,
      handleImageFormOpen,
      handleVideoFormOpen,
      handleSelectImage,
      handleAddImage,
      handleImageCaptionOpen,
      handleImageCaption,
      handleVideoUrl,
      handleAddVideo,
      handleImageVideoDelete
      
    } = this.props.stores.formPost;
    
    
    
    // ---------------------------------------------
    //   Image & Video
    // ---------------------------------------------
    
    const imageVideoArr = stores.formPost.imageVideoObj[id];
    
    
    
    // ---------------------------------------------
    //   Lightbox
    // ---------------------------------------------
    
    const lightboxArr = stores.layout.lightboxObj[id];
    const lightboxCurrentNo = stores.layout.lightboxCurrentNoObj[id];
    const lightboxOpen = stores.layout.lightboxOpenObj[id];
    
    const {
      
      handleLightboxOpen,
      handleLightboxClose,
      handleLightboxPrevious,
      handleLightboxNext,
      
    } = this.props.stores.layout;
    
    
    
    // ---------------------------------------------
    //   Modal Video
    // ---------------------------------------------
    
    // const modalVideoChannel = stores.layout.modalVideoChannelObj[id];
    // const modalVideoOpen = stores.layout.modalVideoIdObj[id];
    // const modalVideoId = stores.layout.modalVideoOpenObj[id];
    
    // console.log(`modalVideoChannel = ${modalVideoChannel}`);
    // console.log(`modalVideoOpen = ${modalVideoOpen}`);
    // console.log(`modalVideoId = ${modalVideoId}`);
    
    const {
      
      handleModalVideoOpen,
      
    } = this.props.stores.layout;
    
    
    
    // --------------------------------------------------
    //   Send Button Label
    // --------------------------------------------------
    
    const sendButtonLabel1 = buttonLabel1 ? buttonLabel1 : '送信する';
    const sendButtonLabel2 = buttonLabel2 ? buttonLabel2 : '送信する';
    
    
    
    
    // --------------------------------------------------
    //   Component - Image & Video Thumbnail
    // --------------------------------------------------
    
    const componentImageVideoArr = [];
    
    if (imageVideoArr && imageVideoArr.length > 0) {
      
      for (const [index, value] of imageVideoArr.entries()) {
        
        // console.log(`index = ${index}`);
        // console.dir(value);
        
        // ---------------------------------------------
        //   画像
        // ---------------------------------------------
        
        if (value.imageSrc) {
          
          componentImageVideoArr.push(
            <PreviewBox key={index}>
              <PreviewImg
                src={value.imageSrc}
                onClick={() => handleLightboxOpen(id, index)}
              />
              
              <PreviewDeleteButton
                variant="fab"
                color="primary"
                onClick={() => handleImageVideoDelete(id, index)}
              >
                <IconClose />
              </PreviewDeleteButton>
            </PreviewBox>
          );
        
        
        // ---------------------------------------------
        //   動画
        // ---------------------------------------------
        
        } else {
          
          // const modalVideoOpen = stores.layout.modalVideoIdObj[`${id}-${value.videoChannel}-${value.videoId}`];
          
          componentImageVideoArr.push(
            <PreviewBox key={index}>
              <PreviewImg
                src={`https://img.youtube.com/vi/${value.videoId}/mqdefault.jpg`}
                onClick={() => handleModalVideoOpen(value.videoChannel, value.videoId)}
              />
              
              <PreviewVideoPlayButtonImg
                src="/static/img/common/video-play-button.png"
              />
              
              <PreviewDeleteButton
                variant="fab"
                color="primary"
                onClick={() => handleImageVideoDelete(id, index)}
              >
                <IconClose />
              </PreviewDeleteButton>
              
              
              {/*<ModalVideo
                channel={value.videoChannel}
                isOpen={modalVideoOpen}
                videoId={value.videoId}
                onClose={() => handleModalVideoClose(id, value.videoChannel, value.videoId)}
              />*/}
              
            </PreviewBox>
          );
          
        }
        
      };
      
    }
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
      
        {/* User */}
        {loginUserId ? (
          <UserBox>
            
            <UserThumbnailBox>
              {anonymityChecked ? (
                <UserThumbnail anonymity />
              ) : (
                <UserThumbnail id={loginUserId} />
              )}
            </UserThumbnailBox>
            
            
            <UserInfoBox>
            
              <UserNameBox>
                
                {anonymityChecked ? (
                  <UserName anonymity />
                ) : (
                  <UserName id={loginUserId} />
                )}
                
              </UserNameBox>
              
              <FormControlLabel
                control={
                  <UserCheckbox
                    checked={anonymityChecked}
                    onChange={() => handleAnonymityChecked(id)}
                  />
                }
                label="ななしにする"
              />
            
            </UserInfoBox>
            
          </UserBox>
        ) : (
          <NameTextField
            id="name"
            label="ハンドルネーム（未入力でもOK！）"
            value={name}
            onChange={(event) => handleName(event, id)}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconPermIdentity />
                </InputAdornment>
              ),
            }}
          />
        )}
        
        
        {/* Textarea */}
        <StyledTextareaAutosize
          rows={5}
          value={text}
          onChange={(event) => handleText(event, id)}
        />
        
        
        {/* 画像アップロードフォーム＆動画投稿フォームを表示するためのボタン */}
        <ImageVideoButtonsBox>
          <ImageButton
            variant="outlined"
            size="small"
            onClick={() => handleImageFormOpen(id)}
          >
            画像アップロード
          </ImageButton>
          
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleVideoFormOpen(id)}
          >
            動画投稿
          </Button>
        </ImageVideoButtonsBox>
        
        
        {/* 画像アップロードフォーム */}
        {imageFormOpen &&
          <ImageBox>
            <ImageDescription>
              アップロードできる画像の種類は JPEG, PNG, GIF, BMP で、ファイルサイズが5MB以内のものです。
            </ImageDescription>
            
            <ImageInputFileBox>
              <ImageInputFile
                type="file"
                onChange={(event) => handleSelectImage(event, id)}
              />
              
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => handleAddImage(id)}
              >
                追加
              </Button>
            </ImageInputFileBox>
            
            <ImageTextField
              placeholder="画像名・簡単な解説を入力"
              value={imageCaption}
              onChange={(event) => handleImageCaption(event, id)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconDescription />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleImageCaptionOpen(id)}
                    >
                      <IconHelpOutline />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            {imageCaptionOpen &&
              <ImageCaptionDescription>
                アップロードした画像をクリック（タップ）すると、画像が拡大表示されますが、上記フォームに文字を入力して追加すると、拡大された画像の下部に入力した文字が表示されるようになります。<strong>基本的には未入力で問題ありません</strong>が、アップロードした画像について丁寧に説明したい場合などに利用してください。
              </ImageCaptionDescription>
            }
            
          </ImageBox>
        }
        
        
        {/* 動画投稿フォーム */}
        {videoFormOpen &&
          <VideoBox>
          
            <ImageDescription>
              YouTubeのURLが登録できます。動画が視聴できるページのURLをブラウザからコピーして貼り付けてください。
            </ImageDescription>
            
            <ImageDescriptionUl>
              <li>https://www.youtube.com/watch?v=__</li>
              <li>https://youtu.be/__?t=600</li>
            </ImageDescriptionUl>
            
            
            {/* Video URL */}
            <VideoTextFieldBox>
              <VideoTextField
                placeholder=""
                value={videoUrl}
                onChange={(event) => handleVideoUrl(event, id)}
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
                onClick={() => handleAddVideo(id)}
              >
                追加
              </Button>
            </VideoTextFieldBox>
            
          </VideoBox>
        }
        
        
        {/* 画像と動画のプレビュー */}
        {componentImageVideoArr.length > 0 &&
          <React.Fragment>
        
            <PreviewContainer>
              {componentImageVideoArr}
            </PreviewContainer>
            
            <Lightbox
              images={lightboxArr}
              currentImage={lightboxCurrentNo}
              isOpen={lightboxOpen}
              onClickPrev={() => handleLightboxPrevious(id)}
              onClickNext={() => handleLightboxNext(id)}
              onClose={() => handleLightboxClose(id)}
              backdropClosesModal
              preloadNextImage={false}
            />
            
            {/*<ModalVideo
              channel={modalVideoChannel}
              isOpen={modalVideoOpen}
              videoId={modalVideoId}
              onClose={handleModalVideoClose}
            />*/}
          
          </React.Fragment>
        }
        
        
        {/* 送信ボタン1 */}
        <SendButton
          variant="contained"
          color="primary"
          onClick={() => buttonHandle1()}
        >
          {sendButtonLabel1}
        </SendButton>
        
        
        {/* 送信ボタン2 */}
        { (buttonLabel2 && buttonHandle2) && 
        <SendButton
          variant="contained"
          color="secondary"
          onClick={() => buttonHandle2()}
        >
          {sendButtonLabel2}
        </SendButton>
        }
        
      </React.Fragment>
    );
    
  }
  
};