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
//   Material UI / Icons
// ---------------------------------------------

import IconClose from '@material-ui/icons/Close';
import IconDescription from '@material-ui/icons/Description';
import IconHelpOutline from '@material-ui/icons/HelpOutline';


// ---------------------------------------------
//   Material UI / Color
// ---------------------------------------------

import cyan from '@material-ui/core/colors/cyan';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreImageAndVideo from '../stores/image-and-video';
import initStoreImageAndVideoForm from '../stores/form';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import ImageAndVideoFormImage from './form-image';




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssPreviewBox = css`
  position: relative;
  margin: 10px 12px 10px 0;
`;

const cssPreviewRemoveFab = css`
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

const cssFontRed = css`
  color: #FE2E2E;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('storeImageAndVideo', 'storeImageAndVideoForm')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    // this.storeImageAndVideo = initStoreImageAndVideo({});
    // this.storeImageAndVideoForm = initStoreImageAndVideoForm({});
    
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { storeImageAndVideo, storeImageAndVideoForm, intl, _id, descriptionImage, descriptionVideo, func, imagesAndVideosArr = [], caption, limit } = this.props;
    
    const {
      
      dataObj,
      handleEdit,
      handleFormImageShow,
      handleFormVideoShow,
      
    } = storeImageAndVideoForm;
    
    const formImageShow = lodashGet(dataObj, [_id, 'formImageShow'], false);
    const formVideoShow = lodashGet(dataObj, [_id, 'formVideoShow'], false);
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`\n---------- form / imagesAndVideosArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(imagesAndVideosArr)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
        {/* Preview */}
        <ButtonGroup color="primary">
          <Button onClick={() => handleFormImageShow({ _id })}>画像</Button>
          <Button onClick={() => handleFormVideoShow({ _id })}>動画</Button>
        </ButtonGroup>
        
        
        {/* Form Image */}
        {formImageShow &&
          <div
            css={css`
              margin: 14px 0 0 0;
            `}
          >
            <ImageAndVideoFormImage
              _id={_id}
              description={descriptionImage}
              func={func}
              imagesAndVideosArr={imagesAndVideosArr}
              caption={true}
              limit={1}
            />
          </div>
        }
        
        
        {/* Form Video */}
        {formVideoShow &&
          <div
            css={css`
              margin: 14px 0 0 0;
            `}
          >
            AAA
          </div>
        }
        
        
      </React.Fragment>
    );
    
  }
  
});