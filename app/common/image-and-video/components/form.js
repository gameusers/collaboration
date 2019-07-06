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

// import IconClose from '@material-ui/icons/Close';
// import IconDescription from '@material-ui/icons/Description';
// import IconHelpOutline from '@material-ui/icons/HelpOutline';


// ---------------------------------------------
//   Material UI / Color
// ---------------------------------------------

// import cyan from '@material-ui/core/colors/cyan';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

// import initStoreImageAndVideo from '../stores/image-and-video';
// import initStoreImageAndVideoForm from '../stores/form';


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
    
    const { storeImageAndVideoForm, intl, _id, descriptionImage, descriptionVideo, arrayName, caption, limit } = this.props;
    
    const {
      
      dataObj,
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
        
        
        {/* Buttons */}
        <ButtonGroup color="primary">
          <Button onClick={() => handleFormImageShow({ _id })}>画像</Button>
          <Button onClick={() => handleFormVideoShow({ _id })}>動画</Button>
        </ButtonGroup>
        
        
        {/* Preview */}
        <FormPreview
          _id={_id}
          arrayName={arrayName}
        />
        
        
        {/* Form Image */}
        {formImageShow &&
          <div
            css={css`
              margin: 8px 0 0 0;
            `}
          >
            <FormImage
              _id={_id}
              description={descriptionImage}
              arrayName={arrayName}
              caption={caption}
              limit={limit}
            />
          </div>
        }
        
        
        {/* Form Video */}
        {formVideoShow &&
          <div
            css={css`
              margin: 8px 0 0 0;
            `}
          >
            <FormVideo
              _id={_id}
              description={descriptionVideo}
              arrayName={arrayName}
              limit={limit}
            />
          </div>
        }
        
        
      </React.Fragment>
    );
    
  }
  
});