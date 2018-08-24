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



const PreviewMultipleImg = styled.img`
  max-width: 192px;
  max-height: 108px;
  margin: 0 4px 4px 0;
  
  @media screen and (max-width: 480px) {
    max-width: 128px;
    max-height: 72px;
  }
`;



const PreviewVideoBox = styled.div`
  position: relative;
`;

const PreviewVideoImg = styled.img`
  width: 320px;
  height: 180px;
  
  @media screen and (max-width: 480px) {
    width: 256px;
    height: 144px;
  }
  
  @media screen and (max-width: 320px) {
    width: 224px;
    height: 126px;
  }
`;

const PreviewVideoPlayButtonImg = styled.img`
  width: 320px;
  height: 180px;
  position: absolute;
  top: 0;
  
  @media screen and (max-width: 480px) {
    width: 256px;
    height: 144px;
  }
  
  @media screen and (max-width: 320px) {
    width: 224px;
    height: 126px;
  }
`;

const PreviewVideoMultipleImg = styled.img`
  width: 192px;
  height: 108px;
  margin: 0 4px 4px 0;
  
  @media screen and (max-width: 480px) {
    width: 128px;
    height: 72px;
  }
`;

const PreviewVideoMultiplePlayButtonImg = styled.img`
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
    //   Initialize Store
    // ---------------------------------------------
    
    props.stores.layout.initializeLightbox(props.id, props.imageVideoArr);
    
    
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
    
    // console.log(`lightboxArr = `);
    // console.dir(lightboxArr);
    
    
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
    let imageIndex = 0;
    
    // console.log(`imageVideoArr = `);
    // console.dir(imageVideoArr);
    
    
    for (const [index, value] of imageVideoArr.entries()) {
      
      
      // --------------------------------------------------
      //   画像の場合
      // --------------------------------------------------
      
      if (value.type === 'image') {
        
        let aspectRatio = 1;
        let width = 0;
        let height = 0;
        let basic480w = 260;
        let basic320w = 230;
        
        let PreviewImg = '';
        
        // Lightboxで開く画像Noを設定する
        const lightBoxOpenNo = imageIndex;
        // console.log(`lightBoxOpenNo = ${lightBoxOpenNo}`);
        
        
        // --------------------------------------------------
        //   横長画像
        // --------------------------------------------------
        
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
          
          
          // console.log(`width = ${width}`);
          // console.log(`height = ${height}`);
          
          
          PreviewImg = styled.img`
            width: ${width}px;
            height: ${height}px;
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
          
          
        // --------------------------------------------------
        //   縦長画像
        // --------------------------------------------------
        
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
            width: ${width}px;
            height: ${height}px;
            max-width: 480px;
            max-height: 480px;
            
            margin: 2px 4px 4px 0;
            
            @media screen and (max-width: 480px) {
              width: ${Math.round(basic480w * aspectRatio)}px;
              height: ${basic480w}px;
            }
          `;
          
        }
        
        
        // --------------------------------------------------
        //   画像がひとつの場合
        // --------------------------------------------------
        
        if (imageVideoArrLength === 1) {
          
          componentsPreviewArr.push(
            <PreviewImg
              key={index}
              src={value.imageSetArr[1].src}
              // width={value.imageSetArr[1].width}
              // height={value.imageSetArr[1].height}
              onClick={() => handleLightboxOpen(id, lightBoxOpenNo)}
            />
          );
          
        
        // --------------------------------------------------
        //   複数画像の場合
        // --------------------------------------------------
        
        } else {
          
          componentsPreviewArr.push(
            <PreviewMultipleImg
              key={index}
              src={value.imageSetArr[0].src}
              onClick={() => handleLightboxOpen(id, lightBoxOpenNo)}
            />
          );
          
        }
        
        
        imageIndex += 1;
        
        
      // --------------------------------------------------
      //   動画の場合
      // --------------------------------------------------  
      
      } else if (value.type === 'video') {
        
        
        // --------------------------------------------------
        //   動画がひとつの場合
        // --------------------------------------------------
        
        if (imageVideoArrLength === 1) {
          
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
          
        
        // --------------------------------------------------
        //   複数動画の場合
        // --------------------------------------------------
        
        } else {
          
          componentsPreviewArr.push(
            <PreviewVideoBox
              key={index}
              onClick={() => stores.layout.handleModalVideoOpen(value.videoChannel, value.videoId)}
            >
              <PreviewVideoMultipleImg
                src={`https://img.youtube.com/vi/${value.videoId}/mqdefault.jpg`}
              />
              
              <PreviewVideoMultiplePlayButtonImg
                src="/static/img/common/video-play-button.png"
              />
            </PreviewVideoBox>
          );
          
        }
        
      }
      
      // console.log(index, value);
      // console.log(`index = ${index}`);
      
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