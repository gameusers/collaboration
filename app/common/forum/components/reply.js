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
import moment from 'moment';
import { Element } from 'react-scroll';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/ja_JP';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


// ---------------------------------------------
//   Material UI / Icon
// ---------------------------------------------

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

import FormReply from './form-reply';
import Paragraph from '../../layout/components/paragraph';
import User from '../../user/components/user';
import ImageAndVideo from '../../image-and-video/components/image-and-video';


// ---------------------------------------------
//   Moment Locale
// ---------------------------------------------

moment.locale('ja');




// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const stylesObj = {
  
  input: {
    fontSize: '12px',
    color: '#666',
    padding: '6px 26px 6px 12px',
  },
  
};




// --------------------------------------------------
//   Class
// --------------------------------------------------

@withStyles(stylesObj)
@inject('stores', 'storeForum')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    this.pathArr = [props.forumComments_id, 'replyObj'];
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount(){
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ pathArr: this.pathArr });
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const {
      
      classes,
      stores,
      storeForum,
      intl,
      gameCommunities_id,
      userCommunities_id,
      forumThreads_id,
      forumComments_id,
      
    } = this.props;
    
    const communities_id = gameCommunities_id || userCommunities_id;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   Forum
    // --------------------------------------------------
    
    const {
      
      dataObj,
      handleEdit,
      handleReadReplies,
      handleShowFormReply,
      
    } = storeForum;
    
    
    const page = lodashGet(dataObj, [communities_id, 'forumRepliesObj', forumComments_id, 'page'], 1);
    const count = lodashGet(dataObj, [communities_id, 'forumRepliesObj', forumComments_id, 'count'], 0);
    const limit = lodashGet(dataObj, [communities_id, 'forumRepliesObj', 'limit'], parseInt(process.env.FORUM_REPLY_LIMIT, 10));
    const arr = lodashGet(dataObj, [communities_id, 'forumRepliesObj', forumComments_id, `page${page}Obj`, 'arr'], []);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   /app/common/forum/components/reply.js
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   forumComments_id: {green ${forumComments_id}}
    //   page: {green ${page}}
    //   count: {green ${count}}
    //   limit: {green ${limit}}
    // `);
    
    // console.log(`
    //   ----- arr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumCommentsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(lodashGet(dataObj, [communities_id, 'forumCommentsObj'], {}))), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumRepliesObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(lodashGet(dataObj, [communities_id, 'forumRepliesObj'], {}))), { colors: true, depth: null })}\n
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
    
    for (const [index, forumReplies_id] of arr.entries()) {
      
      
      // --------------------------------------------------
      //   dataObj
      // --------------------------------------------------
      
      const repliesDataObj = lodashGet(dataObj, [communities_id, 'forumRepliesObj', 'dataObj', forumReplies_id], {});
      
      
      // --------------------------------------------------
      //   User Data
      // --------------------------------------------------
      
      const imagesAndVideosThumbnailObj = lodashGet(repliesDataObj, ['cardPlayersObj', 'imagesAndVideosThumbnailObj'], {});
      
      const cardPlayers_id = lodashGet(repliesDataObj, ['cardPlayersObj', '_id'], '');
      
      let name = lodashGet(repliesDataObj, ['name'], '');
      const cardPlayers_name = lodashGet(repliesDataObj, ['cardPlayersObj', 'name'], '');
      
      if (cardPlayers_name) {
        name = cardPlayers_name;
      }
      
      const status = lodashGet(repliesDataObj, ['cardPlayersObj', 'status'], '');
      
      const exp = lodashGet(repliesDataObj, ['usersObj', 'exp'], 0);
      const accessDate = lodashGet(repliesDataObj, ['usersObj', 'accessDate'], '');
      const userID = lodashGet(repliesDataObj, ['usersObj', 'userID'], '');
      
      
      // --------------------------------------------------
      //   Images and Videos & Comment
      // --------------------------------------------------
      
      const comment = lodashGet(repliesDataObj, ['comment'], '');
      const imagesAndVideosArr = lodashGet(repliesDataObj, ['imagesAndVideosObj', 'mainArr'], {});
      
      
      // --------------------------------------------------
      //   Datetime
      // --------------------------------------------------
      
      let datetimeCurrent = moment(stores.data.datetimeCurrent);
      const datetimeUpdated = moment(repliesDataObj.updatedDate);
      
      if (datetimeUpdated.isAfter(datetimeCurrent)) {
        datetimeCurrent = datetimeUpdated;
      }
      
      const datetimeFrom = datetimeUpdated.from(datetimeCurrent);
      
      
      // --------------------------------------------------
      //   Good
      // --------------------------------------------------
      
      const goods = lodashGet(repliesDataObj, ['goods'], 0);
      
      
      // --------------------------------------------------
      //   Show
      // --------------------------------------------------
      
      const showFormEditReply = lodashGet(dataObj, [forumReplies_id, 'formReplyObj', 'show'], false);
      const showFormNewReply = lodashGet(dataObj, [forumComments_id, forumReplies_id, 'formReplyObj', 'show'], false);
      
      
      // --------------------------------------------------
      //   Reply to
      // --------------------------------------------------
      
      const replyToForumComments_id = lodashGet(repliesDataObj, ['replyToForumComments_id'], '');
      
      let replyToName = lodashGet(repliesDataObj, ['replyToName'], '');
      
      if (!replyToName) {
        replyToName = 'ななしさん';
      }
      
      const replyTo = `${replyToName} | ${replyToForumComments_id}`;
      
      
      
      
      // --------------------------------------------------
      //   Component - Form Reply
      // --------------------------------------------------
      
      if (showFormEditReply) {
        
        componentArr.push(
          
          <Element
            css={css`
              border-top: 1px solid;
              border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
              border-image-slice: 1;
              padding: 24px 0 0 0;
              margin: 24px 0 0 0;
            `}
            key={index}
            name={forumComments_id}
          >
            
            
            <div
              css={css`
                width: 100%;
              `}
            >
              <FormReply
                gameCommunities_id={gameCommunities_id}
                userCommunities_id={userCommunities_id}
                forumThreads_id={forumThreads_id}
                forumComments_id={forumComments_id}
                forumReplies_id={forumReplies_id}
              />
            </div>
            
            
          </Element>
          
        );
      
      
      // --------------------------------------------------
      //   Component - Replies
      // --------------------------------------------------
      
      } else {
        
        componentArr.push(
          
          <div
            css={css`
              display: flex;
              flex-flow: column nowrap;
              padding: 12px 0 0 0;
            `}
            key={index}
          >
            
            
            <div
              css={css`
                border-top: 1px dashed #BDBDBD;
                padding: 12px 0 0 0;
              `}
            >
              
              
              {/* ユーザー情報 - サムネイル画像・ハンドルネームなど */}
              <User
                imagesAndVideosThumbnailObj={imagesAndVideosThumbnailObj}
                name={name}
                userID={userID}
                status={status}
                accessDate={accessDate}
                exp={exp}
                cardPlayers_id={cardPlayers_id}
              />
              
              
              {/* Images and Videos */}
              {imagesAndVideosArr.length > 0 &&
                <div
                  css={css`
                    margin: 12px 0 0 0;
                  `}
                >
                  
                  <ImageAndVideo
                    pathArr={[forumReplies_id, 'replyObj', 'formImagesAndVideosObj']}
                    imagesAndVideosArr={imagesAndVideosArr}
                  />
                  
                </div>
              }
              
              
              
              
              {/* Reply Container / Left Purple Line */}
              <div
                css={css`
                  border-left: 4px solid #A9A9F5;
                  margin: 10px 0 0 0;
                  padding: 0 0 0 16px;
                  
                  @media screen and (max-width: 480px) {
                    padding: 0 0 0 12px;
                  }
                `}
              >
                
                
                {/* Reply To */}
                {replyToForumComments_id &&
                  <div
                    css={css`
                      display: flex;
                      flex-flow: row nowrap;
                      margin: 0 0 12px 0;
                      color: #7401DF;
                    `}
                  >
                    <IconReply
                      css={css`
                        && {
                          font-size: 16px;
                          margin: 4px 4px 0 0;
                        }
                      `}
                    />
                    <p>{replyTo}</p>
                  </div>
                }
                
                
                {/* Comment */}
                <div
                  css={css`
                    font-size: 14px;
                    line-height: 1.6em;
                    margin 4px 0 0 0;
                  `}
                >
                  <Paragraph text={comment} />
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
                        min-width: 40px;
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
                      {forumReplies_id}
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
                            margin: 4px 8px 0 0;
                          }
                        }
                      `}
                      variant="outlined"
                      onClick={() => handleEdit({
                        pathArr: [forumComments_id, forumReplies_id, 'formReplyObj', 'show'],
                        value: !showFormNewReply
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
                      color="primary"
                      onClick={() => handleShowFormReply({
                        pathArr: this.pathArr,
                        forumReplies_id,
                      })}
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
                {showFormNewReply &&
                  <FormReply
                    gameCommunities_id={gameCommunities_id}
                    userCommunities_id={userCommunities_id}
                    forumThreads_id={forumThreads_id}
                    forumComments_id={forumComments_id}
                    replyToForumComments_id={forumReplies_id}
                  />
                }
                
                
              </div>
              
              
            </div>
            
            
          </div>
          
        );
        
      }
      
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Element
        name={`forumReplies-${forumComments_id}`}
      >
        
        
        {componentArr}
        
        
        {/* Pagination */}
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            
            border-top: 1px solid;
            border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
            border-image-slice: 1;
            
            padding: 16px 0 0 0;
            margin: 24px 24px 0 0;
          `}
        >
          
          
          {/* Pagination */}
          <div
            css={css`
              margin: 8px 24px 0 0;
            `}
          >
            <Pagination
              disabled={buttonDisabled}
              onChange={(page) => handleReadReplies({
                pathArr: this.pathArr,
                gameCommunities_id,
                userCommunities_id,
                forumComments_id,
                page,
              })}
              pageSize={limit}
              current={page}
              total={count}
              locale={localeInfo}
            />
          </div>
          
          
          {/* Rows Per Page */}
          <FormControl
            css={css`
              margin: 8px 0 0 0 !important;
            `}
            variant="outlined"
          >
            
            <Select
              value={limit}
              onChange={(eventObj) => handleReadReplies({
                pathArr: this.pathArr,
                gameCommunities_id,
                userCommunities_id,
                forumComments_id,
                page: 1,
                changeLimit: eventObj.target.value,
              })}
              input={
                <OutlinedInput
                  classes={{
                    input: classes.input
                  }}
                  name="forum-comments-pagination"
                  id="outlined-rows-per-page"
                />
              }
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
            
          </FormControl>
          
          
        </div>
        
      
      </Element>
    );
    
  }
  
});