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

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { Element } from 'react-scroll';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashHas from 'lodash/has';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconSchedule from '@material-ui/icons/Schedule';
import IconChatBubble from '@material-ui/icons/ChatBubbleOutline';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Paragraph from 'app/common/layout/v2/paragraph.js';
import ImageAndVideo from 'app/common/image-and-video/v2/image-and-video.js';






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

/**
 * Export Component
 */
const Component = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    obj = {},
    
  } = props;
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  // const [panelExpanded, setPanelExpanded] = useState(defaultExpanded);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  // const [showForm, setShowForm] = useState(false);
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  // --------------------------------------------------
  //   カードデータが存在しない場合、空のコンポーネントを返す
  // --------------------------------------------------
  
  if (Object.keys(obj).length === 0) {
    return null;
  }
  
  
  
  
  // ---------------------------------------------
  //   Data
  // ---------------------------------------------
  
  const type = lodashGet(obj, ['type'], '');
  const _id = lodashGet(obj, ['_id'], '');
  const name = lodashGet(obj, ['name'], '');
  const comment = lodashGet(obj, ['comment'], '');
  const datetimeFrom = lodashGet(obj, ['datetimeFrom'], '');
  const commentsAndReplies = lodashGet(obj, ['commentsAndReplies'], 0);


  // --------------------------------------------------
  //   games
  // --------------------------------------------------
  
  const gameUrlID = lodashGet(obj, ['gamesObj', 'urlID'], '');
  const gameName = lodashGet(obj, ['gamesObj', 'name'], '');
  const gameImagesAndVideosObj = lodashGet(obj, ['gamesObj', 'imagesAndVideosObj'], {});
  const gameImagesAndVideosThumbnailObj = lodashGet(obj, ['gamesObj', 'imagesAndVideosThumbnailObj'], {});
  
  
  
  // --------------------------------------------------
  //   Images and Videos
  // --------------------------------------------------
  
  // let src = lodashGet(obj, ['gamesObj', 'imagesAndVideosObj', 'arr', 0, 'src'], '');
  
  // if (lodashHas(obj, ['imagesAndVideosObj', 'arr', 0, 'src'])) {
  //   src = lodashGet(obj, ['imagesAndVideosObj', 'arr', 0, 'src'], '');
  // }

  // 

  // ---------------------------------------------
  //   - ゲームのサムネイルを表示する
  // ---------------------------------------------
  
  let imagesAndVideosObj = gameImagesAndVideosThumbnailObj;
  let maxHeight = '128';
  let imageOrVideo = 'image';


  // ---------------------------------------------
  //   - アップロードした画像または動画がある場合、そちらを表示
  // ---------------------------------------------

  if (lodashHas(obj, ['imagesAndVideosObj'])) {

    imagesAndVideosObj = lodashGet(obj, ['imagesAndVideosObj'], {});
    maxHeight = '';

    const imagesAndVideosType = lodashGet(obj, ['imagesAndVideosObj', 'arr', 0, 'type'], '');

    if (imagesAndVideosType === 'video') {
      imageOrVideo = 'video';
    }


  // ---------------------------------------------
  //   - ゲームのヒーローイメージがある場合、そちらを表示
  // ---------------------------------------------

  } else if (Object.keys(gameImagesAndVideosObj).length !== 0) {

    imagesAndVideosObj = gameImagesAndVideosObj;
    maxHeight = '';

  }

  
  // ---------------------------------------------
  //   Link
  // ---------------------------------------------
  
  let linkHref = '';
  let linkAs = '';

  if (type === 'forumThreadGc' || type === 'forumCommentOrReplyGc') {

    linkHref = `/gc/[urlID]/forum/[[...slug]]`;
    linkAs = `/gc/${gameUrlID}/forum/${_id}`;

  } else if (type === 'recruitmentThreads' || type === 'recruitmentComments' || type === 'recruitmentReplies') {

    linkHref = `/gc/[urlID]/rec/[[...slug]]`;
    linkAs = `/gc/${gameUrlID}/rec/${_id}`;

  }

  const gameLinkHref = `/gc/[urlID]`;
  const gameLinkAs = `/gc/${gameUrlID}`;
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   app/common/feed/card.js
  // `);
  
  // console.log(`
  //   ----- obj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(obj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(chalk`
  //   showEditButton: {green ${showEditButton}}
  //   defaultExpanded: {green ${defaultExpanded}}
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Card
      css={css`
        && {
          margin: 0 0 4px 0;
          // width: 300px;
          // min-width: 300px;
          cursor: pointer;
        }
      `}
    >
      

      {imageOrVideo === 'image' ? (
        <Link
          href={linkHref}
          as={linkAs}
        >
        <div
          css={css`
            background-color: black;
            position: relative;
          `}
        >

          <ImageAndVideo
            imagesAndVideosObj={imagesAndVideosObj}
            lightbox={false}
            maxHeight={maxHeight}
          />

        </div>
        </Link>
      ) : (
        <div
          css={css`
            background-color: black;
            position: relative;
          `}
        >

          <ImageAndVideo
            imagesAndVideosObj={imagesAndVideosObj}
            lightbox={false}
            maxHeight={maxHeight}
          />

        </div>
      )}

      
      
      <Link
        href={linkHref}
        as={linkAs}
      >
        
        <CardContent
          css={css`
            && {
              padding: 12px 20px 0 20px;
            }
          `}
        >


          <h3
            css={css`
              margin: 0 0 10px 0;
            `}
          >
            {name}
          </h3>


          <Typography component="p">
            {comment}
          </Typography>




          <div
            css={css`
              display: flex;
              flex-flow: row nowrap;
              // justify-content: space-around;
              font-size: 12px;
              margin: 10px 0 0 0;
            `}
          >
            
            <div
              css={css`
                display: flex;
                flex-flow: row nowrap;
              `}
            >
              <IconSchedule
                css={css`
                  && {
                    font-size: 20px;
                    margin: 0 0 0 0;
                  }
                `}
              />
              <div
                css={css`
                  font-size: 12px;
                  margin: 0 0 0 4px;
                `}
              >
                {datetimeFrom}
              </div>
            </div>
            

            <div
              css={css`
                margin: 0 0 0 20px;
              `}
            >
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                `}
              >
                <IconChatBubble
                  css={css`
                    && {
                      font-size: 20px;
                      margin: 0 0 0 0;
                    }
                  `}
                />
                <div
                  css={css`
                    font-size: 12px;
                    margin: 0 0 0 4px;
                  `}
                >
                  {commentsAndReplies}
                </div>
              </div>
            </div>
            
          </div>

        </CardContent>

      </Link>
      
      
      <Link
        href={gameLinkHref}
        as={gameLinkAs}
      >
        
        <div
          css={css`
            padding: 6px 10px 6px 10px;
          `}
        >
          <Button
            css={css`
              text-transform: none !important
            `}
            // size="small"
            color="primary"
          >
            {gameName}
          </Button>
        </div>
        
      </Link>
      
    </Card>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;