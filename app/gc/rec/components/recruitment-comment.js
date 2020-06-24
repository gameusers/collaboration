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
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { Element } from 'react-scroll';
import moment from 'moment';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/ja_JP';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


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
//   Material UI / Icons
// ---------------------------------------------

import IconPublic from '@material-ui/icons/Public';
import IconUpdate from '@material-ui/icons/Update';
import IconThumbUp from '@material-ui/icons/ThumbUp';
import IconDelete from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
import IconReply from '@material-ui/icons/Reply';


// ---------------------------------------------
//   Material UI / Color
// ---------------------------------------------

import green from '@material-ui/core/colors/green';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Paragraph from 'app/common/layout/components/paragraph.js';
import User from 'app/common/user/components/user.js';
import ImageAndVideo from 'app/common/image-and-video/components/image-and-video.js';

import FormComment from 'app/gc/rec/components/form/comment.js';
import FormReply from 'app/gc/rec/components/form/reply.js';
import RecruitmentReply from 'app/gc/rec/components/recruitment-reply.js';
import Public from 'app/gc/rec/components/public.js';
import Notification from 'app/gc/rec/components/notification.js';




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
@inject('stores', 'storeGcRecruitment', 'storeGood')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    
    // --------------------------------------------------
    //   super
    // --------------------------------------------------
    
    super(props);
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    this.pathArr = [this.props.recruitmentThreads_id, 'recruitmentCommentsObj'];
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
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
      storeGcRecruitment,
      storeGood,
      intl,
      urlID,
      gameCommunities_id,
      recruitmentThreads_id,
      
    } = this.props;
    
    
    // --------------------------------------------------
    //   storeGcRecruitment
    // --------------------------------------------------
    
    const {
      
      dataObj,
      handleEdit,
      handleReadRecruitmentComments,
      handleShowFormRecruitmentComment,
      handleShowDeleteDialog,
      
    } = storeGcRecruitment;
    
    
    // --------------------------------------------------
    //   storeGood
    // --------------------------------------------------
    
    const {
      
      handleSubmitGood,
      
    } = storeGood;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    // --------------------------------------------------
    //   Thread
    // --------------------------------------------------
    
    const publicSettingThread = lodashGet(dataObj, [gameCommunities_id, 'recruitmentThreadsObj', 'dataObj', recruitmentThreads_id, 'publicSetting'], 1);
    
    
    // --------------------------------------------------
    //   Comment
    // --------------------------------------------------
    
    const page = lodashGet(dataObj, [gameCommunities_id, 'recruitmentCommentsObj', recruitmentThreads_id, 'page'], 1);
    const count = lodashGet(dataObj, [gameCommunities_id, 'recruitmentCommentsObj', recruitmentThreads_id, 'count'], 0);
    const arr = lodashGet(dataObj, [gameCommunities_id, 'recruitmentCommentsObj', recruitmentThreads_id, `page${page}Obj`, 'arr'], []);
    
    const limit = parseInt((stores.data.getCookie({ key: 'recruitmentCommentLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT), 10);
    
    
    // --------------------------------------------------
    //   Element Name
    // --------------------------------------------------
    
    const elementName = this.pathArr.join('-');
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/gc/rec/components/recruitment-comment.js
    // `);
    
    // console.log(chalk`
    //   urlID: {green ${urlID}}
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
    //   publicSettingThread: {green ${publicSettingThread}}
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
    //   ----- dataObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(dataObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   配列が空の場合は、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (arr.length === 0) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - Comment
    // --------------------------------------------------
    
    const componentArr = [];
    
    
    for (const [index, recruitmentComments_id] of arr.entries()) {
      
      
      // --------------------------------------------------
      //   Path Array
      // --------------------------------------------------
      
      const pathRecruitmentCommentArr = [recruitmentComments_id, 'recruitmentCommentObj'];
      const pathRecruitmentCommentEditFormArr = [recruitmentComments_id, 'recruitmentCommentEditFormObj'];
      const pathRecruitmentReplyNewFormArr = [recruitmentComments_id, 'recruitmentReplyNewForm'];
      
      
      // --------------------------------------------------
      //   data
      // --------------------------------------------------
      
      const commentsDataObj = lodashGet(dataObj, [gameCommunities_id, 'recruitmentCommentsObj', 'dataObj', recruitmentComments_id], {});
      
      const comment = lodashGet(commentsDataObj, ['comment'], '');
      
      const imagesAndVideosObj = lodashGet(commentsDataObj, ['imagesAndVideosObj'], {});
      
      // 管理者権限がある、またはスレッドを建てた本人の場合、編集ボタンを表示する
      const editable = lodashGet(commentsDataObj, ['editable'], false);
      // // const editable = true;
      
      const notification = lodashGet(commentsDataObj, ['notification'], '');
      
      
      // --------------------------------------------------
      //   User Data
      // --------------------------------------------------
      
      const imagesAndVideosThumbnailObj = lodashGet(commentsDataObj, ['cardPlayersObj', 'imagesAndVideosThumbnailObj'], {});
      
      const cardPlayers_id = lodashGet(commentsDataObj, ['cardPlayersObj', '_id'], '');
      
      let name = lodashGet(commentsDataObj, ['name'], '');
      const cardPlayers_name = lodashGet(commentsDataObj, ['cardPlayersObj', 'name'], '');
      
      if (cardPlayers_name) {
        name = cardPlayers_name;
      }
      
      const status = lodashGet(commentsDataObj, ['cardPlayersObj', 'status'], '');
      
      const exp = lodashGet(commentsDataObj, ['usersObj', 'exp'], 0);
      const accessDate = lodashGet(commentsDataObj, ['usersObj', 'accessDate'], '');
      const userID = lodashGet(commentsDataObj, ['usersObj', 'userID'], '');
      
      
      // --------------------------------------------------
      //   Datetime
      // --------------------------------------------------
      
      let datetimeCurrent = moment(stores.data.datetimeCurrent);
      const datetimeUpdated = moment(commentsDataObj.updatedDate);
      
      if (datetimeUpdated.isAfter(datetimeCurrent)) {
        datetimeCurrent = datetimeUpdated;
      }
      
      const datetimeFrom = datetimeUpdated.from(datetimeCurrent);
      
      
      // --------------------------------------------------
      //   Good
      // --------------------------------------------------
      
      const goods = lodashGet(commentsDataObj, ['goods'], 0);
      
      
      // --------------------------------------------------
      //   Link
      // --------------------------------------------------
      
      const linkHref = `/gc/[urlID]/rec/[...slug]?urlID=${urlID}&recruitmentID=${recruitmentComments_id}`;
      const linkAs = `/gc/${urlID}/rec/${recruitmentComments_id}`;
      
      
      // --------------------------------------------------
      //   ID & Information
      // --------------------------------------------------
      
      const idsArr = lodashGet(commentsDataObj, ['idsArr'], []);
      const publicIDsArr = lodashGet(commentsDataObj, ['publicIDsArr'], []);
      const publicInformationsArr = lodashGet(commentsDataObj, ['publicInformationsArr'], []);
      const publicSetting = lodashGet(commentsDataObj, ['publicSetting'], 1);
      
      
      // --------------------------------------------------
      //   Show Form
      // --------------------------------------------------
      
      const showFormComment = lodashGet(dataObj, [...pathRecruitmentCommentEditFormArr, 'showFormComment'], false);
      const showFormReply = lodashGet(dataObj, [...pathRecruitmentReplyNewFormArr, 'showFormReply'], false);
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/components/recruitment-comment.js
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   recruitmentComments_id: {green ${recruitmentComments_id}}
      // `);
      
      // console.log(`
      //   ----- commentsDataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(commentsDataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // --------------------------------------------------
      //   componentArr.push
      // --------------------------------------------------
      
      componentArr.push(
        <Element
          css={css`
            ${index === 0 || showFormComment
              ?
                `
                border-top: none;
                border-bottom: none;
                `
              :
                `
                border-top: 1px solid;
                border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
                border-image-slice: 1;
                `
            }
          `}
          name={recruitmentComments_id}
          key={index}
        >
          
          
          
          
          {/* Comment - Edit Form */}
          {showFormComment &&
            <div
              css={css`
                ${showFormComment
                  ?
                    `
                    border-top: 2px dashed red;
                    border-bottom: 2px dashed red;
                    `
                  :
                    `
                    border-top: 1px solid;
                    border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
                    border-image-slice: 1;
                    `
                }
                  
                margin: 24px 0;
                padding: 24px 0 24px 0;
              `}
            >
              
              <div
                css={css`
                  border-left: 4px solid #84cacb;
                  padding: 6px 0 6px 16px;
                  
                  @media screen and (max-width: 480px) {
                    border-left: none;
                    padding-left: 0;
                  }
                `}
              >
                
                <FormComment
                  pathArr={pathRecruitmentCommentEditFormArr}
                  gameCommunities_id={gameCommunities_id}
                  recruitmentThreads_id={recruitmentThreads_id}
                  recruitmentComments_id={recruitmentComments_id}
                  publicSettingThread={publicSettingThread}
                />
                
              </div>
                
            </div>
          }
          
          
          
          
          {/* Comment */}
          {!showFormComment &&
            <div
              css={css`
                margin: 6px 0 0 0;
                padding: 14px 0 0 0;
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
              {Object.keys(imagesAndVideosObj).length > 0 &&
                <div
                  css={css`
                    margin: 12px 0 0 0;
                  `}
                >
                  
                  <ImageAndVideo
                    pathArr={[recruitmentThreads_id, 'imagesAndVideosObj']}
                    imagesAndVideosObj={imagesAndVideosObj}
                  />
                  
                </div>
              }
              
              
              
              
              {/* コメント */}
              <div
                css={css`
                  border-left: 4px solid #84cacb;
                  margin: 12px 0;
                  padding: 8px 0 8px 16px;
                  
                  @media screen and (max-width: 480px) {
                    padding: 8px 0 8px 12px;
                  }
                `}
              >
                
                
                {/* コメント */}
                <Paragraph text={comment} />
                
                
                
                
                {/* ID & 情報 & 公開設定 */}
                <Public
                  idsArr={idsArr}
                  publicIDsArr={publicIDsArr}
                  publicInformationsArr={publicInformationsArr}
                  publicSetting={publicSetting}
                />
                
                
                
                
                {/* 通知方法 */}
                {notification &&
                  <div
                    css={css`
                      margin: 20px 0 8px 0;
                    `}
                  >
                    
                    <Notification
                      pathArr={pathRecruitmentCommentArr}
                      notification={notification}
                    />
                    
                  </div>
                }
                
                
                
                
                {/* Bottom Container */}
                <div
                  css={css`
                    display: flex;
                    flex-flow: row wrap;
                    margin: 12px 0 0 0;
                    
                    @media screen and (max-width: 480px) {
                      flex-flow: column wrap;
                    }
                  `}
                >
                  
                  
                  {/* Good Button & Updated Date & recruitmentComments_id */}
                  <div
                    css={css`
                      display: flex;
                      flex-flow: row nowrap;
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
                      onClick={() => handleSubmitGood({
                        pathArr: this.pathArr,
                        goodsPathArr: [gameCommunities_id, 'recruitmentCommentsObj', 'dataObj', recruitmentComments_id],
                        type: 'recruitmentComment',
                        target_id: recruitmentComments_id,
                      })}
                      disabled={buttonDisabled}
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
                    
                    
                    
                    
                    {/* recruitmentComments_id */}
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
                        <Link href={linkHref} as={linkAs}>
                          <a>{recruitmentComments_id}</a>
                        </Link>
                      </div>
                    </div>
                    
                    
                  </div>
                  
                  
                  
                  
                  {/* Buttons */}
                  <div
                    css={css`
                      display: flex;
                      flex-flow: row nowrap;
                      margin-left: auto;
                      
                      @media screen and (max-width: 480px) {
                        margin-top: 12px;
                      }
                    `}
                  >
                    
                    
                    {/* Reply Button */}
                    <Button
                      css={css`
                        && {
                          font-size: 12px;
                          height: 22px;
                          min-width: 54px;
                          min-height: 22px;
                          // margin: 4px 12px 0 0;
                          padding: 0 3px;
                          
                          @media screen and (max-width: 480px) {
                            min-width: 36px;
                            min-height: 22px;
                          }
                        }
                      `}
                      variant="outlined"
                      disabled={buttonDisabled}
                      onClick={() => handleEdit({
                        pathArr: [...pathRecruitmentReplyNewFormArr, 'showFormReply'],
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
                    
                    
                    
                    
                    {/* Delete Button */}
                    {editable &&
                      <Button
                        css={css`
                          && {
                            font-size: 12px;
                            height: 22px;
                            min-width: 54px;
                            min-height: 22px;
                            margin: 0 0 0 12px;
                            padding: 0 4px;
                            
                            @media screen and (max-width: 480px) {
                              min-width: 36px;
                              min-height: 22px;
                            }
                          }
                        `}
                        variant="outlined"
                        color="secondary"
                        disabled={buttonDisabled}
                        onClick={() => handleShowDeleteDialog({
                          pathArr: this.pathArr,
                          gameCommunities_id,
                          recruitmentThreads_id,
                          recruitmentComments_id,
                        })}
                      >
                        <IconDelete
                          css={css`
                            && {
                              font-size: 16px;
                              margin: 0 2px 1px 0;
                            }
                          `}
                        />
                        削除
                      </Button>
                    }
                    
                    
                    
                    
                    {/* Edit Button */}
                    {editable &&
                      <Button
                        css={css`
                          && {
                            font-size: 12px;
                            height: 22px;
                            min-width: 54px;
                            min-height: 22px;
                            margin: 0 0 0 12px;
                            padding: 0 4px;
                            
                            @media screen and (max-width: 480px) {
                              min-width: 36px;
                              min-height: 22px;
                            }
                          }
                        `}
                        variant="outlined"
                        color="primary"
                        disabled={buttonDisabled}
                        onClick={() => handleShowFormRecruitmentComment({
                          pathArr: pathRecruitmentCommentEditFormArr,
                          recruitmentComments_id,
                        })}
                      >
                        <IconEdit
                          css={css`
                            && {
                              font-size: 16px;
                              margin: 0 2px 3px 0;
                            }
                          `}
                        />
                        編集
                      </Button>
                    }
                    
                    
                  </div>
                  
                  
                </div>
                
                
                
                
                {/* Reply - New Form */}
                {showFormReply &&
                  <FormReply
                    pathArr={pathRecruitmentReplyNewFormArr}
                    gameCommunities_id={gameCommunities_id}
                    recruitmentThreads_id={recruitmentThreads_id}
                    recruitmentComments_id={recruitmentComments_id}
                  />
                }
                
                
                {/* Reply */}
                <RecruitmentReply
                  urlID={urlID}
                  gameCommunities_id={gameCommunities_id}
                  recruitmentThreads_id={recruitmentThreads_id}
                  recruitmentComments_id={recruitmentComments_id}
                />
                
                
              </div>
              
              
            </div>
          }
          
          
        </Element>
      );
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Element
        name={elementName}
      >
        
        
        {/* Comment */}
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
            margin: 14px 24px 0 0;
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
              onChange={(page) => handleReadRecruitmentComments({
                pathArr: this.pathArr,
                gameCommunities_id,
                recruitmentThreads_id,
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
              onChange={(eventObj) => handleReadRecruitmentComments({
                pathArr: this.pathArr,
                gameCommunities_id,
                recruitmentThreads_id,
                page: 1,
                changeLimit: eventObj.target.value,
              })}
              input={
                <OutlinedInput
                  classes={{
                    input: classes.input
                  }}
                  name="recruitment-comments-pagination"
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