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

import React from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import FormPreview from './form-preview';
import FormImage from './form-image';
import FormVideo from './form-video';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('storeImageAndVideoForm')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    super(props);
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const {
      
      storeImageAndVideoForm,
      intl,
      pathArr = [],
      type,
      showImageButton = true,
      showVideoButton = true,
      descriptionImage,
      descriptionVideo,
      showImageCaption,
      limit,
      
    } = this.props;
    
    const {
      
      dataObj,
      handleShowFormImage,
      handleShowFormVideo,
      
    } = storeImageAndVideoForm;
    
    
    const showFormImage = lodashGet(dataObj, [...pathArr, 'showFormImage'], false);
    const showFormVideo = lodashGet(dataObj, [...pathArr, 'showFormVideo'], false);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   /app/common/image-and-video/components/form.js\n
    //   ----- pathArr -----\n
    //   ${util.inspect(pathArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
        {/* Preview */}
        <FormPreview
          pathArr={pathArr}
        />
        
        
        {/* Buttons */}
        <ButtonGroup
          css={css`
            margin: 12px 0 0 0;
          `}
          color="primary"
        >
          
          {showImageButton &&
            <Button onClick={() => handleShowFormImage({ pathArr })}>画像</Button>
          }
          
          {showVideoButton &&
            <Button onClick={() => handleShowFormVideo({ pathArr })}>動画</Button>
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
              pathArr={pathArr}
              type={type}
              description={descriptionImage}
              showImageCaption={showImageCaption}
              limit={limit}
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
            <FormVideo
              pathArr={pathArr}
              type={type}
              description={descriptionVideo}
              limit={limit}
            />
          </div>
        }
        
        
      </React.Fragment>
    );
    
  }
  
});