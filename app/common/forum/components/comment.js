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
import styled from 'styled-components';
import moment from 'moment';
import ImageGallery from 'react-image-gallery';
import lodashGet from 'lodash/get';
import lodashHas from 'lodash/has';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

// import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconPublic from '@material-ui/icons/Public';
import IconUpdate from '@material-ui/icons/Update';
import IconThumbUp from '@material-ui/icons/ThumbUp';
import IconEdit from '@material-ui/icons/Edit';
import IconReply from '@material-ui/icons/Reply';


// ---------------------------------------------
//   Material UI / Color
// ---------------------------------------------

import green from '@material-ui/core/colors/green';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Reply from './reply';
import FormReply from './form-reply';
import Paragraph from '../../layout/components/paragraph';
import User from '../../user/components/user';
import ImageAndVideo from '../../image-and-video/components/image-and-video';


// ---------------------------------------------
//   Moment Locale
// ---------------------------------------------

moment.locale('ja');




// --------------------------------------------------
//   Class
// --------------------------------------------------

// @withStyles(stylesObj)
@inject('stores', 'storeForum')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    super(props);
  }
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount(){
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    const _id = this.props.gameCommunities_id || this.props.userCommunities_id;
    this.props.stores.layout.handleButtonEnable({ _id: `${_id}-forumComment` });
    
    
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { classes, stores, storeForum, intl, gameCommunities_id, userCommunities_id, forumThreads_id } = this.props;
    
    const communities_id = gameCommunities_id || userCommunities_id;
    
    
    // --------------------------------------------------
    //   Forum
    // --------------------------------------------------
    
    const {
      
      dataObj,
      handleEdit,
      
    } = storeForum;
    
    
    // --------------------------------------------------
    //   Data
    // --------------------------------------------------
    
    const page = lodashGet(dataObj, [communities_id, 'forumCommentsAndRepliesObj', forumThreads_id, 'page'], 1);
    const arr = lodashGet(dataObj, [communities_id, 'forumCommentsAndRepliesObj', forumThreads_id, 'dataObj', `page${page}Obj`, 'arr'], []);
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   /app/common/forum/components/comment-reply.js
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   forumThreads_id: {green ${forumThreads_id}}
    //   page: {green ${page}}
    // `);
    
    // console.log(`
    //   ----- arr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   配列が空の場合は、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (arr.length === 0) {
      return null;
    }
    
    
    // --------------------------------------------------
    //   Component - Comment & Reply
    // --------------------------------------------------
    
    const componentArr = [];
    
    for (const [index, valueObj] of arr.entries()) {
      
      
      // --------------------------------------------------
      //   User
      // --------------------------------------------------
      
      const forumComments_id = lodashGet(valueObj, ['_id'], '');
      
      let thumbnailSrc = '';
      
      const thumbnailArr = lodashGet(valueObj, ['cardPlayersObj', 'imagesAndVideosObj', 'thumbnailArr'], []);
      
      if (thumbnailArr.length > 0) {
        thumbnailSrc = lodashGet(thumbnailArr, [0, 'src'], '');
      }
      
      const cardPlayers_id = lodashGet(valueObj, ['cardPlayersObj', '_id'], '');
      
      let name = lodashGet(valueObj, ['name'], '');
      const cardPlayers_name = lodashGet(valueObj, ['cardPlayersObj', 'name'], '');
      
      if (cardPlayers_name) {
        name = cardPlayers_name;
      }
      
      const status = lodashGet(valueObj, ['cardPlayersObj', 'status'], '');
      
      const exp = lodashGet(valueObj, ['usersObj', 'exp'], 0);
      const accessDate = lodashGet(valueObj, ['usersObj', 'accessDate'], '');
      const playerID = lodashGet(valueObj, ['usersObj', 'playerID'], '');
      
      
      // --------------------------------------------------
      //   Images and Videos & Comment
      // --------------------------------------------------
      
      const comment = lodashGet(valueObj, ['comment'], '');
      const imagesAndVideosArr = lodashGet(valueObj, ['imagesAndVideosObj', 'mainArr'], {});
      
      
      // --------------------------------------------------
      //   Datetime
      // --------------------------------------------------
      
      const datetimeNow = moment().utcOffset(0);
      const datetimeUpdated = moment(valueObj.updatedDate).utcOffset(0);
      const datetimeFrom = datetimeUpdated.from(datetimeNow);
      
      const goods = lodashGet(valueObj, ['goods'], 0);
      
      
      // --------------------------------------------------
      //   Show
      // --------------------------------------------------
      
      const showFormReply = lodashGet(dataObj, [forumComments_id, 'formReplyObj', 'show'], false);
      // console.log(forumComments_id);
      
      
      
      componentArr.push(
        
        <div
          css={css`
            margin: 36px 0 0 0;
          `}
          key={index}
        >
          
          
          {/* ユーザー情報 - サムネイル画像・ハンドルネームなど */}
          <User
            thumbnailSrc={thumbnailSrc}
            name={name}
            playerID={playerID}
            status={status}
            accessDate={accessDate}
            exp={exp}
            cardPlayers_id={cardPlayers_id}
            showCardPlayerButton={true}
          />
          
          
          {/* Images and Videos */}
          {imagesAndVideosArr.length > 0 &&
            <div
              css={css`
                margin: 12px 0 0 0;
              `}
            >
              
              <ImageAndVideo
                _id={forumComments_id}
                imagesAndVideosArr={imagesAndVideosArr}
              />
              
            </div>
          }
          
          
          {/* Comment Container / Left Green Line */}
          <div
            css={css`
              border-left: 4px solid #84cacb;
              margin: 10px 0 0 0;
              padding: 0 0 0 16px;
              
              @media screen and (max-width: 480px) {
                padding: 0 0 0 12px;
              }
              // background-color: purple;
            `}
          >
            
            
            {/* Comment */}
            <div
              css={css`
                font-size: 14px;
                line-height: 1.6em;
              `}
            >
              
              <div
                css={css`
                  margin 4px 0 0 0;
                `}
              >
                <Paragraph text={comment} />
              </div>
              
            </div>
            
            
            {/* Bottom Container */}
            <div
              css={css`
                display: flex;
                flex-flow: row wrap;
                margin: 6px 0 0 0;
              `}
            >
              
              
              {/* Good Button */}
              <Button
                css={css`
                  && {
                    background-color: ${green[500]};
                    &:hover {
                      background-color: ${green[700]};
                    }
                    
                    color: white;
                    font-size: 12px;
                    height: 22px;
                    min-width: 20px;
                    margin: 4px 12px 0 0;
                    padding: 0 5px;
                    
                    @media screen and (max-width: 480px) {
                      margin: 4px 8px 0 0;
                    }
                  }
                `}
                
                variant="outlined"
                // onClick={() => handleCommentGood(communityId, threadId, value.id)}
              >
                <IconThumbUp
                  css={css`
                    && {
                      font-size: 14px;
                      margin: 0 4px 2px 0;
                    }
                  `}
                />
                {goods}
              </Button>
              
              
              {/* Updated Date */}
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                  margin: 4px 12px 0 0;
                  
                  @media screen and (max-width: 480px) {
                    margin: 4px 8px 0 0;
                  }
                `}
              >
                <IconUpdate
                  css={css`
                    && {
                      font-size: 22px;
                      margin: 0 2px 0 0;
                    }
                  `}
                />
                
                <div
                  css={css`
                    font-size: 12px;
                    margin: 1px 0 0 0;
                  `}
                >
                  {datetimeFrom}
                </div>
              </div>
              
              
              {/* forum-comments_id */}
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                  margin: 1px 0 0 0;
                `}
              >
                <IconPublic
                  css={css`
                    && {
                      font-size: 20px;
                      margin: 3px 2px 0 0;
                    }
                  `}
                />
                <div
                  css={css`
                    font-size: 12px;
                    color: #009933;
                    margin: 4px 0 0 0;
                  `}
                >
                  {forumComments_id}
                </div>
              </div>
              
              
              {/* Buttons */}
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                  margin-left: auto;
                  // background-color: pink;
                `}
              >
                
                <Button
                  css={css`
                    && {
                      font-size: 12px;
                      height: 22px;
                      min-width: 54px;
                      min-height: 22px;
                      margin: 4px 12px 0 0;
                      padding: 0 3px;
                      
                      @media screen and (max-width: 480px) {
                        min-width: 36px;
                        min-height: 22px;
                      }
                    }
                  `}
                  variant="outlined"
                  onClick={() => handleEdit({
                    pathArr: [forumComments_id, 'formReplyObj', 'show'],
                    value: !showFormReply
                  })}
                >
                  <IconReply
                    css={css`
                      && {
                        font-size: 16px;
                        margin: 0 1px 3px 0;
                        
                        @media screen and (max-width: 480px) {
                          display: none;
                        }
                      }
                    `}
                  />
                  返信
                </Button>
                
                
                <Button
                  css={css`
                    && {
                      font-size: 12px;
                      height: 22px;
                      min-width: 54px;
                      min-height: 22px;
                      margin: 4px 0 0 0;
                      padding: 0 4px;
                      
                      @media screen and (max-width: 480px) {
                        min-width: 36px;
                        min-height: 22px;
                      }
                    }
                  `}
                  variant="outlined"
                  // onClick={() => handleCommentUpdateFormOpen(`${value.id}-comment-update`)}
                >
                  <IconEdit
                    css={css`
                      && {
                        font-size: 16px;
                        margin: 0 2px 3px 0;
                        
                        @media screen and (max-width: 480px) {
                          display: none;
                        }
                      }
                    `}
                  />
                  編集
                </Button>
                
              </div>
                
            </div>
            
            
            
            
            {/* Form Reply */}
            {showFormReply &&
              <FormReply
                gameCommunities_id={gameCommunities_id}
                userCommunities_id={userCommunities_id}
                forumComments_id={forumComments_id}
              />
            }
            
            
            
          </div>
          
          
          
          
          
          {/* Reply */}
          <Reply
            gameCommunities_id={gameCommunities_id}
            userCommunities_id={userCommunities_id}
            forumComments_id={forumComments_id}
          />
          
          
          
          
        </div>
        
      );
      
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          // border-top: 1px dashed #A4A4A4;
          margin: 42px 0 0 0;
          padding: 0 0 0 0;
        `}
      >
        
        {componentArr}
      
      </div>
    );
    
  }
  
});