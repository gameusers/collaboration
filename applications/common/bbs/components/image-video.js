// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import moment from 'moment';
import Lightbox from 'react-images';


moment.locale('ja');



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const PreviewBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 0 6px 0;
`;

// const PreviewImg = styled.img`
//   // width: 100%;
//   // height: 250px;
//   // object-fit: contain;
  
//   max-width: 480px;
//   max-height: 320px;
  
//   // max-width: 192px;
//   // max-height: 108px;
  
//   margin: 2px 4px 4px 0;
  
//   @media screen and (max-width: 480px) {
//     // width: 260px;
//     // width: 100%;
//     // height: auto;
//     max-width: 256px;
//     max-height: 144px;
//     // max-width: 144px;
//     // max-height: 256px;
    
    
//     // max-width: 128px;
//     // max-height: 72px;
    
    
    
//     // max-width: 260px;
//     // max-height: auto;
//     // max-height: 320px;
//   }
// `;

const PreviewMultipleImg = styled.img`
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
    
    
    // ---------------------------------------------
    //   Initialize Store
    // ---------------------------------------------
    
    // const argumentsLightboxObj = {
    //   id: props.id,
    //   lightboxArr: props.lightboxArr,
    // };
    
    // props.stores.layout.initializeLightbox(argumentsLightboxObj);
    
    
    
    props.stores.layout.initializeLightbox(props.id, props.imageVideoArr);
    
    // props.stores.layout.initializeLightbox2(props.id, props.imageVideoArr);
    
    
    // console.log(`props.id = ${props.id}`);
    // console.dir(props.lightboxArr);
    
    
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, id, imageVideoArr } = this.props;
    
    
    
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
    
    
    // --------------------------------------------------
    //   Component - Preview Image & Video
    // --------------------------------------------------
    
    const imageVideoArrLength = imageVideoArr.length;
    const componentsPreviewArr = [];
    
    for (const [index, value] of imageVideoArr.entries()) {
      
      if (value.type === 'image') {
        
        // const aspectRatio = value.imageSetArr[0].width / value.imageSetArr[0].height;
        
        let aspectRatio = 1;
        let width = 0;
        let height = 0;
        let basic480w = 260;
        let basic320w = 230;
        
        let PreviewImg = '';
        
        
        // 横長画像の場合
        if (value.imageSetArr[0].width >= value.imageSetArr[0].height) {
          
          aspectRatio = value.imageSetArr[0].height / value.imageSetArr[0].width;
          width = value.imageSetArr[1].width;
          height = value.imageSetArr[1].height;
          
          
          // ソース画像の情報を取得する
          const sourceArr = value.imageSetArr.find((value2) => {
            return value2.w === 'source';
          });
          
          // ソース画像が既定値より小さい場合は、その画像の幅を width に設定する
          if (sourceArr.width < basic480w) {
            basic480w = sourceArr.width;
          }
          
          if (sourceArr.width < basic320w) {
            basic320w = sourceArr.width;
          }
          
          // console.log(`sourceArr =`);
          // console.dir(sourceArr);
          // console.log(`basic480w = ${basic480w}`);
          
          
          PreviewImg = styled.img`
            width: ${width};
            height: ${height};
            max-width: 480px;
            max-height: 480px;
            
            margin: 2px 4px 4px 0;
            
            @media screen and (max-width: 480px) {
              width: ${basic480w}px;
              height: ${Math.round(basic480w * aspectRatio)}px;
            }
            
            @media screen and (max-width: 320px) {
              width: ${basic320w}px;
              height: ${Math.round(basic320w * aspectRatio)}px;
            }
          `;
          
        // 縦長画像の場合
        } else {
          
          aspectRatio = value.imageSetArr[0].width / value.imageSetArr[0].height;
          width = value.imageSetArr[1].width;
          height = value.imageSetArr[1].height;
          
          
          // ソース画像の情報を取得する
          const sourceArr = value.imageSetArr.find((value2) => {
            return value2.w === 'source';
          });
          
          // ソース画像が既定値より小さい場合は、その画像の高さを height に設定する
          if (sourceArr.height < basic480w) {
            basic480w = sourceArr.height;
          }
          
          
          PreviewImg = styled.img`
            width: ${width};
            height: ${height};
            max-width: 480px;
            max-height: 480px;
            
            margin: 2px 4px 4px 0;
            
            @media screen and (max-width: 480px) {
              width: ${Math.round(basic480w * aspectRatio)}px;
              height: ${basic480w}px;
            }
          `;
          
        }
        
        // console.log(`aspectRatio = ${aspectRatio}`);
        
        
        
        
        
        if (imageVideoArrLength === 1) {
          
          componentsPreviewArr.push(
            <PreviewImg
              key={index}
              src={value.imageSetArr[1].src}
              // width={value.imageSetArr[1].width}
              // height={value.imageSetArr[1].height}
              onClick={() => handleLightboxOpen(id, index)}
            />
          );
          
        } else {
          
          componentsPreviewArr.push(
            <PreviewMultipleImg
              key={index}
              src={value.imageSetArr[0].src}
              onClick={() => handleLightboxOpen(id, index)}
            />
          );
          
        }
        
      } else if (value.videoChannel && value.videoId) {
        
        componentsPreviewArr.push(
          <PreviewVideoBox
            key={index}
            onClick={() => stores.layout.handleModalVideoOpen(value.videoChannel, value.videoId)}
          >
            <PreviewVideoImg
              src={`https://img.youtube.com/vi/${value.videoId}/mqdefault.jpg`}
            />
            
            <PreviewVideoPlayButtonImg
              src="/static/img/common/video-play-button.png"
            />
          </PreviewVideoBox>
        );
        
      }
      
      // console.log(index, value);
      
    }
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <PreviewBox>
        {componentsPreviewArr}
        
        { (lightboxArr && lightboxArr.length > 0) &&
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
        }
      </PreviewBox>
    );
    
  }
  
};