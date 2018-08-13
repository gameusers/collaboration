// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';

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
//   BBS
// ---------------------------------------------

const UserBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  // align-items: flex-start;
  margin: 0;
  padding: 0;
  // background-color: pink;
`;

const UserThumbnailBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  // align-items: stretch;
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


const NameTextField = styled(TextField)`
  && {
    width: 300px;
    margin: 0 0 4px 0;
    
    @media screen and (max-width: 480px) {
      width: 100%;
    }
  }
`;


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
    
    // ID
    this.id = props.id;
    
    // Arguments
    this.argumentsObj = {
      
      id: props.id,
      name: props.name,
      text: props.text,
      
    };
    
    
    // ---------------------------------------------
    //   Initialize Store
    // ---------------------------------------------
    
    props.stores.formPost.initializeFormPost(this.argumentsObj);
    
  }
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, id, sendButtonLabel1, sendButtonLabel2, sendButtonHandle2 } = this.props;
    
    const {
      anonymityCheckedObj,
      nameObj,
      handleNameObj,
      textObj,
      handleTextObj,
      imageFormOpenObj,
      videoFormOpenObj,
      imageCaptionOpenObj,
      imageCaptionObj,
      videoUrlObj
    } = this.props.stores.formPost;
    
    const previewObj = stores.formPost.previewObj[id];
    
    const loginUserId = stores.data.loginUserObj.id;
    // console.log(`loginUserId = ${loginUserId}`);
    
    // console.log(`sendButtonHandle2 = ${sendButtonHandle2}`);
    
    
    
    
    
    // --------------------------------------------------
    //   Anonymity Checked
    // --------------------------------------------------
    
    let anonymityChecked = false;
    
    if (id in anonymityCheckedObj) {
      anonymityChecked = anonymityCheckedObj[id];
    }
    
    
    // --------------------------------------------------
    //   Name
    // --------------------------------------------------
    
    let name = '';
    
    if (id in nameObj) {
      name = nameObj[id];
    }
    
    
    // --------------------------------------------------
    //   Text
    // --------------------------------------------------
    
    let text = '';
    
    if (id in textObj) {
      text = textObj[id];
    }
    
    
    // --------------------------------------------------
    //   Open Image Form & Video Form
    // --------------------------------------------------
    
    let imageFormOpen = false;
    
    if (id in imageFormOpenObj) {
      imageFormOpen = imageFormOpenObj[id];
    }
    
    let videoFormOpen = false;
    
    if (id in videoFormOpenObj) {
      videoFormOpen = videoFormOpenObj[id];
    }
    
    
    // ---------------------------------------------
    //   - Caption
    // ---------------------------------------------
    
    let imageCaptionOpen = false;
    
    if (id in imageCaptionOpenObj) {
      imageCaptionOpen = imageCaptionOpenObj[id];
    }
    
    let imageCaption = '';
    
    if (id in imageCaptionObj) {
      imageCaption = imageCaptionObj[id];
    }
    
    let videoUrl = '';
    
    if (id in videoUrlObj) {
      videoUrl = videoUrlObj[id];
    }
    
    
    // --------------------------------------------------
    //   Send Button Label
    // --------------------------------------------------
    
    let buttonLabel1 = '送信する';
    
    if (sendButtonLabel1) {
      buttonLabel1 = sendButtonLabel1;
    }
    
    let buttonLabel2 = '送信する';
    
    if (sendButtonLabel2) {
      buttonLabel2 = sendButtonLabel2;
    }
    
    
    
    
    // --------------------------------------------------
    //   Preview
    // --------------------------------------------------
    
    const codePreviewArr = [];
    
    if (previewObj && previewObj.length > 0) {
      
      previewObj.forEach((value, index) => {
        
        
        // ---------------------------------------------
        //   画像
        // ---------------------------------------------
        
        if (value.imageSrc) {
          
          codePreviewArr.push(
            <ImageVideoPreviewBox key={index}>
              <PreviewImg
                src={value.imageSrc}
                onClick={() => stores.layout.handleLightboxOpen(id, index)}
              />
              
              <PreviewDeleteButton
                variant="fab"
                color="primary"
                onClick={() => stores.formPost.handlePreviewDelete(id, index)}
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
                onClick={() => stores.formPost.handlePreviewDelete(id, index)}
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
                    onChange={() => stores.formPost.handleAnonymityChecked(id)}
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
            onChange={(event) => handleNameObj(event, id)}
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
          onChange={(event) => handleTextObj(event, id)}
        />
        
        
        {/* 画像アップロードフォーム＆動画投稿フォームを表示するためのボタン */}
        <ImageVideoButtonsBox>
          <ImageButton
            variant="outlined"
            size="small"
            onClick={() => stores.formPost.handleImageFormOpen(id)}
          >
            画像アップロード
          </ImageButton>
          
          <Button
            variant="outlined"
            size="small"
            onClick={() => stores.formPost.handleVideoFormOpen(id)}
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
                onChange={(event) => stores.formPost.handleSelectImage(event, id)}
              />
              
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => stores.formPost.handleAddImage(id)}
              >
                追加
              </Button>
            </ImageInputFileBox>
            
            <ImageTextField
              placeholder="画像名・簡単な解説を入力"
              value={imageCaption}
              onChange={(event) => stores.formPost.handleImageCaption(event, id)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconDescription />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => stores.formPost.handleImageCaptionOpen(id)}
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
                onChange={(event) => stores.formPost.handleVideoUrl(event, id)}
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
                onClick={() => stores.formPost.handleAddVideo(id)}
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
        
        
        {/* 送信ボタン1 */}
        <SendButton
          variant="contained"
          color="primary"
        >
          {buttonLabel1}
        </SendButton>
        
        
        {/* 送信ボタン2 */}
        { (sendButtonLabel2 && sendButtonHandle2) && 
        <SendButton
          variant="contained"
          color="secondary"
          onClick={() => sendButtonHandle2()}
        >
          {buttonLabel2}
        </SendButton>
        }
        
      </React.Fragment>
    );
    
  }
  
};