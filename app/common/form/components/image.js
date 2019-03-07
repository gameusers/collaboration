// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';
// import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

// import IconCreate from '@material-ui/icons/Create';
import IconClose from '@material-ui/icons/Close';
import IconDescription from '@material-ui/icons/Description';
import IconHelpOutline from '@material-ui/icons/HelpOutline';


// ---------------------------------------------
//   Material UI / Color
// ---------------------------------------------

import cyan from '@material-ui/core/colors/cyan';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import LightboxWrapper from '../../layout/components/lightbox';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// ---------------------------------------------
//   Form
// ---------------------------------------------

const Description = styled.p`
  font-size: 12px;
  margin: 10px 0 0 0;
`;

const ImageInputFileBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 10px 0 6px;
`;

const ImageInputFile = styled.input`
  padding: 4px 0 0 0;
`;

const ImageTextField = styled(TextField)`
  && {
    width: 100%;
    max-width: 500px;
    margin: 10px 0 0 0;
    
    @media screen and (max-width: 480px) {
      max-width: auto;
    }
  }
`;

const CaptionDescription = styled.p`
  font-size: 12px;
  margin: 10px 0 0 0;
`;


// ---------------------------------------------
//   Preview
// ---------------------------------------------

const PreviewContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 10px 0 0 0;
`;

const PreviewBox = styled.div`
  position: relative;
  margin: 10px 12px 10px 0;
`;

const PreviewImg = styled.img`
  max-height: 108px;
  
  @media screen and (max-width: 480px) {
    max-height: 54px;
  }
`;

// const PreviewEditFab = styled(Fab)`
//   && {
//     background-color: ${cyan[500]};
//     &:hover {
//       background-color: ${cyan[700]};
//     }
//     width: 24px;
//     height: 24px;
//     min-width: 24px;
//     min-height: 24px;
//     position: absolute;
//     bottom: -10px;
//     left: -10px;
//   }
// `;

const PreviewEditButton = styled(Button)`
  && {
    min-width: 10px;
    padding: 1px 6px;
    position: absolute;
    bottom: -10px;
    left: -10px;
  }
`;


const PreviewRemoveFab = styled(Fab)`
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
  }
`;


// ---------------------------------------------
//   Common
// ---------------------------------------------

const FontRed = styled.span`
  color: #FE2E2E;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default injectIntl(class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, intl, _id, imagesAndVideosArr, caption, limit } = this.props;
    
    const {
      
      dataObj,
      handleEdit,
      handleSelectImage,
      handleAddImage,
      handleRemoveImage,
      
    } = stores.formImageVideo;
    
    const { handleLightboxOpen } = stores.layout;
    
    const imageCaption = lodashGet(dataObj, [_id, 'imageCaption'], '');
    const imageCaptionOpen = lodashGet(dataObj, [_id, 'imageCaptionOpen'], false);
    
    // console.log(`\n---------- imagesAndVideosArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(imagesAndVideosArr)));
    // console.log(`\n-----------------------------------\n`);
    
    
    // --------------------------------------------------
    //   Component - Preview Thumbnail Image & Video
    // --------------------------------------------------
    
    const componentsPreviewArr = [];
    
    if (imagesAndVideosArr.length > 0) {
      
      let imageIndex = 0;
      
      for (const [index, valueObj] of imagesAndVideosArr.entries()) {
        
        
        // ---------------------------------------------
        //   画像
        // ---------------------------------------------
        
        if (valueObj.type === 'image') {
          
          // Lightboxで開く画像Noを設定する
          const currentNo = imageIndex;
          
          
          componentsPreviewArr.push(
            <PreviewBox key={index}>
              <PreviewImg
                src={valueObj.srcSetArr[0].src}
                onClick={() => handleLightboxOpen({ _id, currentNo })}
              />
              
              {/*<PreviewEditButton
                variant="contained"
                color="primary"
                size="small"
              >
                編集
              </PreviewEditButton>*/}
              
              <PreviewRemoveFab
                color="primary"
                onClick={() => handleRemoveImage({ _id, index, imagesAndVideosArr })}
              >
                <IconClose />
              </PreviewRemoveFab>
            </PreviewBox>
          );
          
          imageIndex += 1;
        
        
        // ---------------------------------------------
        //   動画
        // ---------------------------------------------
        
        } else {
          
          // componentsPreviewArr.push(
          //   <PreviewBox key={index}>
          //     <PreviewImg
          //       src={`https://img.youtube.com/vi/${value.videoId}/mqdefault.jpg`}
          //       onClick={() => handleModalVideoOpen(value.videoChannel, value.videoId)}
          //     />
              
          //     <PreviewVideoPlayButtonImg
          //       src="/static/img/common/video-play-button.png"
          //     />
              
          //     <PreviewRemoveFab
          //       color="primary"
          //       onClick={() => handleImageVideoDelete(id, index)}
          //     >
          //       <IconClose />
          //     </PreviewRemoveFab>
              
          //   </PreviewBox>
          // );
          
        }
        
      };
      
    }
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- validationObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(validationObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        {/* Preview */}
        <PreviewContainer>
          {componentsPreviewArr}
        </PreviewContainer>
        
        
        {/* Input file */}
        <ImageInputFileBox>
          
          <ImageInputFile
            type="file"
            onChange={(eventObj) => handleSelectImage({ _id, fileObj: eventObj.target.files[0], imagesAndVideosArr })}
          />
          
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleAddImage({ _id, imagesAndVideosArr, limit })}
          >
            追加
          </Button>
          
        </ImageInputFileBox>
        
        
        {/* Caption */}
        {caption &&
          <ImageTextField
            placeholder="画像名・簡単な解説を入力"
            value={imageCaption}
            onChange={(eventObj) => handleEdit({
              pathArr: [_id, 'imageCaption'],
              value: eventObj.target.value
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconDescription />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleEdit({
                      pathArr: [_id, 'imageCaptionOpen'],
                      value: !imageCaptionOpen
                    })}
                  >
                    <IconHelpOutline />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        }
        
        
        {/* Captionについての解説 */}
        {imageCaptionOpen &&
          <CaptionDescription>
            アップロードした画像をクリック（タップ）すると、画像が拡大表示されますが、上記フォームに文字を入力して追加すると、拡大された画像の下部に入力した文字が表示されるようになります。<strong>基本的には未入力で問題ありません</strong>が、アップロードした画像について、説明を加えたい場合に利用してください。
          </CaptionDescription>
        }
        
        
        {/* アップロードできる画像の解説 */}
        <Description>
          アップロードできる画像の種類は JPEG, PNG, GIF, SVG で、ファイルサイズが5MB以内のものです。<FontRed>画像を選択したら追加ボタンを押してください。</FontRed>
        </Description>
        
        
        {/* Lightbox */}
        <LightboxWrapper
          _id={_id}
          imagesAndVideosArr={imagesAndVideosArr}
        />
        
      </React.Fragment>
    );
    
  }
  
});