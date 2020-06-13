// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React, { useState, useEffect, useContext } from 'react';
import { useIntl } from 'react-intl';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import FormPreview from 'app/common/image-and-video/v2/components/form-preview.js';
import FormImage from 'app/common/image-and-video/v2/components/form-image.js';
// import FormVideo from './form-video';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateLayout } from 'app/@states/layout.js';






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

/**
 * Export Component
 */
const Component = (props) => {
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [showFormImage, setShowFormImage] = useState(false);
  const [showFormVideo, setShowFormVideo] = useState(false);
  const [imagesAndVideosObj, setImagesAndVideosObj] = useState({
    
    _id: '',
    createdDate: '',
    updatedDate: '',
    users_id: '',
    type: props.type,
    arr: [],
    
  });
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  // const stateLayout = ContainerStateLayout.useContainer();
  
  // const { loadingObj } = stateLayout;
  
  // const open = lodashGet(loadingObj, ['open'], false);
  // const position = lodashGet(loadingObj, ['position'], 'left');
  
  
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    type,
    showImageButton = true,
    showVideoButton = true,
    descriptionImage,
    descriptionVideo,
    showImageCaption,
    limit,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  const handleShowFormImage = () => {
    
    setShowFormImage(true);
    setShowFormVideo(false);
    
  };
  
  
  const handleShowFormVideo = () => {
    
    setShowFormImage(false);
    setShowFormVideo(true);
    
  };
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/image-and-video/components/form.js
  // `);
  
  // console.log(`
  //   ----- pathArr -----\n
  //   ${util.inspect(pathArr, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(`
  //   ----- imagesAndVideosObj -----\n
  //   ${util.inspect(imagesAndVideosObj, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <React.Fragment>
      
      
      {/* Preview */}
      <FormPreview
        imagesAndVideosObj={imagesAndVideosObj}
        // setImagesAndVideosObj={setImagesAndVideosObj}
      />
      
      
      
      
      {/* Buttons */}
      <ButtonGroup
        css={css`
          margin: 12px 0 0 0;
        `}
        color="primary"
        disabled={buttonDisabled}
      >
        
        {showImageButton &&
          <Button onClick={() => handleShowFormImage()}>画像</Button>
        }
        
        {showVideoButton &&
          <Button onClick={() => handleShowFormVideo()}>動画</Button>
        }
        
      </ButtonGroup>
      
      
      
      
      {/* Form Image */}
      {showFormImage &&
        <div
          css={css`
            margin: 8px 0 0 0;
          `}
        >
          
          <FormImage
            type={type}
            description={descriptionImage}
            showImageCaption={showImageCaption}
            limit={limit}
            imagesAndVideosObj={imagesAndVideosObj}
            setImagesAndVideosObj={setImagesAndVideosObj}
          />
          
        </div>
      }
      
      
      
      
      {/* Form Video */}
      {showFormVideo &&
        <div
          css={css`
            margin: 8px 0 0 0;
          `}
        >
          {/*<FormVideo
            pathArr={pathArr}
            type={type}
            description={descriptionVideo}
            limit={limit}
          />*/}
        </div>
      }
      
      
    </React.Fragment>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;