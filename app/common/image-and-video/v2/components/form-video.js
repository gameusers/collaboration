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
import lodashCloneDeep from 'lodash/cloneDeep';


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
  
  const [videoChannel, setVideoChannel] = useState('youtube');
  const [url, setUrl] = useState('');
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    heading,
    description,
    limit = 1,
    imagesAndVideosObj,
    setImagesAndVideosObj,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateLayout = ContainerStateLayout.useContainer();
  
  const { handleSnackbarOpen } = stateLayout;
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * 入力した動画を追加する
   * 追加すると動画のサムネイルがフォーム内に表示される（プレビューできる）
   * @param {number} limit - 動画を追加できる上限
   */
  const handleAddVideo = ({ limit }) => {
    
    
    // ---------------------------------------------
    //   Property
    // ---------------------------------------------
    
    const clonedImagesAndVideosObj = lodashCloneDeep(imagesAndVideosObj);
    const arr = lodashGet(clonedImagesAndVideosObj, ['arr'], []);
    
    
    
    
    // ---------------------------------------------
    //   videoID取得
    //   正規表現参考：https://stackoverflow.com/questions/2936467/parse-youtube-video-id-using-preg-match
    // ---------------------------------------------
    
    const regex = new RegExp('(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})', 'i');
    const resultMatchObj = url.match(regex);
    const videoID = lodashGet(resultMatchObj, [1], '');
    
    
    
    
    // ---------------------------------------------
    //   URL が存在しない場合、処理停止
    // ---------------------------------------------
    
    if (url === '') {
      
      handleSnackbarOpen({
        variant: 'error',
        messageID: 'NLcx8C6G-',
      });
      
      return;
      
    }
    
    
    // ---------------------------------------------
    //   同じ動画を追加しようとしている場合、処理停止
    // ---------------------------------------------  
    
    const resultObj = arr.find((valueObj) => {
      return valueObj.videoID === videoID;
    });
    
    if (resultObj) {
      
      handleSnackbarOpen({
        variant: 'error',
        messageID: 'Qd5d74x-3',
      });
      
      return;
      
    }
    
    
    // ---------------------------------------------
    //   limit が 1 のときは既存の要素を削除する
    // ---------------------------------------------
    
    if (limit === 1) {
      
      arr.splice(0, 1);
      
      
    // ---------------------------------------------
    //   画像＆動画が limit より多くなっている場合は処理停止
    // ---------------------------------------------
      
    } else if (limit <= arr.length) {
      
      handleSnackbarOpen({
        variant: 'error',
        messageID: 'fWrKN58iV',
      });
      
      return;
      
    }
    
    
    // ---------------------------------------------
    //   imagesAndVideosArr に追加する
    // ---------------------------------------------
    
    arr.push({
      
      _id: '',
      type: 'video',
      videoChannel,
      videoID,
      
    });
    
    clonedImagesAndVideosObj.arr = arr;
    
    
    
    
    // ---------------------------------------------
    //   更新
    // ---------------------------------------------
    
    setImagesAndVideosObj(clonedImagesAndVideosObj);
    
    
    
    
    // ---------------------------------------------
    //   入力フォームをリセット
    // ---------------------------------------------
    
    setVideoChannel('');
    setUrl('');
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/image-and-video/v2/components/form-video.js - handleAddVideo
    // `);
    
    // console.log(chalk`
    //   videoChannel: {green ${videoChannel}}
    //   videoID: {green ${videoID}}
    // `);
    
    // console.log(`
    //   ----- clonedImagesAndVideosObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(clonedImagesAndVideosObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
  };
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/layout/v2/components/sidebar.js
  // `);
  
  // console.log(chalk`
  //   login: {green ${login}}
  // `);
  
  // console.log(`
  //   ----- linkArr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(linkArr)), { colors: true, depth: null })}\n
  //   --------------------\n
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
        <p
          css={css`
            margin: 12px 0 0 0;
          `}
        >
          {description}
        </p>
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
            onChange={(eventObj) => setVideoChannel(eventObj.target.value)}
            // onChange={(eventObj) => handleEdit({
            //   pathArr: [...pathArr, 'videoChannel'],
            //   value: eventObj.target.value
            // })}
            // inputProps={{
            //   name: 'videoChannel',
            //   id: 'videoChannel',
            // }}
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
        value={url}
        onChange={(eventObj) => setUrl(eventObj.target.value)}
        // onChange={(eventObj) => handleEdit({
        //   pathArr: [...pathArr, 'videoURL'],
        //   value: eventObj.target.value
        // })}
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
        動画のURLを入力してください。<span css={css`color: #FE2E2E;`}>入力後、追加ボタンを押してください。</span>
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
          disabled={buttonDisabled}
          onClick={() => handleAddVideo({ limit })}
        >
          追加
        </Button>
      </div>
      
      
    </React.Fragment>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;