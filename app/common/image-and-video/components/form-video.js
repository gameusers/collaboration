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

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconOndemandVideo from '@material-ui/icons/OndemandVideo';




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssFontRed = css`
  color: #FE2E2E;
`;




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
    
    const { storeImageAndVideoForm, intl, pathArr = [], heading, description, limit, arrayName = 'mainArr' } = this.props;
    
    const {
      
      dataObj,
      handleEdit,
      handleAddVideo,
      
    } = storeImageAndVideoForm;
    
    const videoChannel = lodashGet(dataObj, [...pathArr, 'videoChannel'], 'youtube');
    const videoURL = lodashGet(dataObj, [...pathArr, 'videoURL'], '');
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`\n---------- imagesAndVideosArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(imagesAndVideosArr)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(chalk`
    //   videoChannel: {green ${videoChannel}}
    //   videoURL: {green ${videoURL}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
        {/* Heading */}
        {heading &&
          <div
            css={css`
              font-weight: bold;
              margin: 0 0 2px 0;
            `}
          >
            {heading}
          </div>
        }
        
        
        {/* Description */}
        {description &&
          <p>{description}</p>
        }
        
        
        {/* Select Video Channel */}
        <div
          css={css`
            margin: 12px 0 0 0;
          `}
        >
          <FormControl>
            <Select
              value={videoChannel}
              onChange={(eventObj) => handleEdit({
                pathArr: [...pathArr, 'videoChannel'],
                value: eventObj.target.value
              })}
              inputProps={{
                name: 'videoChannel',
                id: 'videoChannel',
              }}
            >
              <MenuItem value="youtube">YouTube</MenuItem>
            </Select>
          </FormControl>
        </div>
        
        
        {/* Video URL */}
        <TextField
          css={css`
            && {
              width: 100%;
              max-width: 500px;
              margin: 14px 0 0 0;
              
              @media screen and (max-width: 480px) {
                max-width: auto;
              }
            }
          `}
          placeholder="動画URL"
          value={videoURL}
          onChange={(eventObj) => handleEdit({
            pathArr: [...pathArr, 'videoURL'],
            value: eventObj.target.value
          })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconOndemandVideo />
              </InputAdornment>
            ),
          }}
        />
        
        
        {/* 動画の解説 */}
        <p
          css={css`
            font-size: 12px;
            margin: 10px 0 0 0;
          `}
        >
          動画のURLを入力してください。<span css={cssFontRed}>入力後、追加ボタンを押してください。</span>
        </p>
        
        
        {/* Button */}
        <div
          css={css`
            margin: 16px 0 0 0;
          `}
        >
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleAddVideo({ pathArr, arrayName, limit })}
          >
            追加
          </Button>
        </div>
        
        
      </React.Fragment>
    );
    
  }
  
});