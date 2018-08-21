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

const PrevieImg = styled.img`
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
    
    const argumentsLightboxObj = {
      id: props.id,
      lightboxArr: props.lightboxArr,
    };
    
    props.stores.layout.initializeLightbox(argumentsLightboxObj);
    
    
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
    
    const componentsPreviewArr = [];
    
    for (const [index, value] of imageVideoArr.entries()) {
      
      if (value.imageSrc) {
        
        componentsPreviewArr.push(
          <PrevieImg
            key={index}
            src={value.imageSrc}
            onClick={() => handleLightboxOpen(id, index)}
          />
        );
        
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