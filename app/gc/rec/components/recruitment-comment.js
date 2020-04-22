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

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

// import IconExpandLess from '@material-ui/icons/ExpandLess';
// import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconPublic from '@material-ui/icons/Public';
// import IconEdit from '@material-ui/icons/Edit';
// import IconDoubleArrow from '@material-ui/icons/DoubleArrow';
// import IconCreate from '@material-ui/icons/Create';

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

import Paragraph from '../../../common/layout/components/paragraph';
// import ChipCategory from './chip-category';
// import ChipHardwares from '../../../common/hardware/components/chip';
import User from '../../../common/user/components/user';
import ImageAndVideo from '../../../common/image-and-video/components/image-and-video';
// import Panel from '../../../common/layout/components/panel';

// import FormThread from './form/thread';
import FormComment from './form/comment';
import PublicIDs from './public-ids';
import PublicInformations from './public-informations';
import PublicSetting from './public-setting';
// import DeadlineDate from './deadline-date';
import Notification from './notification';




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
@inject('stores', 'storeGcRecruitment')
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
    // this.pathRecruitmentThreadsNewFormArr = [this.props.gameCommunities_id, 'recruitmentThreadsNewFormObj'];
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ pathArr: this.pathArr });
    // this.props.stores.layout.handleButtonEnable({ pathArr: this.pathRecruitmentThreadsNewFormArr });
    
    
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
      intl,
      temporaryDataID,
      urlID,
      gameCommunities_id,
      recruitmentThreads_id,
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   storeGcRecruitment
    // --------------------------------------------------
    
    const {
      
      dataObj,
      handleEdit,
      handleReadRecruitmentThreads,
      handleShowFormThread,
      
    } = storeGcRecruitment;
    
    
    
    
    // --------------------------------------------------
    //   Thread
    // --------------------------------------------------
    
    const publicSettingThread = lodashGet(dataObj, [gameCommunities_id, 'recruitmentThreadsObj', 'dataObj', recruitmentThreads_id, 'publicSetting'], 1);
    
    
    // --------------------------------------------------
    //   Comment
    // --------------------------------------------------
    
    const page = lodashGet(dataObj, [gameCommunities_id, 'recruitmentCommentsObj', recruitmentThreads_id, 'page'], 1);
    const count = lodashGet(dataObj, [gameCommunities_id, 'recruitmentCommentsObj', recruitmentThreads_id, 'count'], 0);
    const limit = parseInt((stores.data.getCookie({ key: 'recruitmentCommentLimit' }) || process.env.RECRUITMENT_COMMENT_LIMIT), 10);
    const arr = lodashGet(dataObj, [gameCommunities_id, 'recruitmentCommentsObj', recruitmentThreads_id, `page${page}Obj`, 'arr'], []);
    
    
    // --------------------------------------------------
    //   Link Return Top
    // --------------------------------------------------
    
    // const linkReturnTopHref = `/gc/[urlID]/rec?urlID=${urlID}`;
    // const linkReturnTopAs = `/gc/${urlID}`;
    
    
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
      
      const pathRecruitmentCommentArr = [recruitmentComments_id, 'recruitmentThreadObj'];
      // const pathRecruitmentThreadEditFormArr = [recruitmentComments_id, 'recruitmentThreadEditFormObj'];
      const pathRecruitmentCommentEditFormArr = [recruitmentComments_id, 'recruitmentCommentEditFormObj'];
      // const pathRecruitmentCommentEditFormArr = [recruitmentThreads_id, 'recruitmentCommentEditFormObj'];
      
      
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
      // const goods = lodashGet(commentsDataObj, ['goods'], 0);
      
      
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
      
      const linkHref = `/gc/[urlID]/rec/[recruitmentID]?urlID=${urlID}&recruitmentID=${recruitmentComments_id}`;
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
      // const showFormReply = lodashGet(dataObj, [...pathRecruitmentCommentNewFormArr, 'showFormReply'], false);
      
      
      
      
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
          name={recruitmentThreads_id}
          key={index}
        >
          
          
          {/* Comment - Edit Form */}
          {showFormComment &&
            <div
              css={css`
                width: 100%;
                border-top: 1px solid;
                border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
                border-image-slice: 1;
                margin: 14px 0 0 0;
                padding: 32px 0 0 0;
              `}
            >
              <FormComment
                pathArr={pathRecruitmentCommentEditFormArr}
                gameCommunities_id={gameCommunities_id}
                recruitmentThreads_id={recruitmentThreads_id}
                publicSettingThread={publicSettingThread}
              />
            </div>
          }
          
          
          
          
          {/* Comment */}
          {!showFormComment &&
            <div
              css={css`
                width: 100%;
                border-top: 1px solid;
                border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
                border-image-slice: 1;
                margin: 14px 0 0 0;
                padding: 20px 0 0 0;
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
                  margin: 12px 0 0 3px;
                  padding: 0 0 0 16px;
                  
                  // margin: 10px 0 0 0;
                  // padding: 0 0 0 12px;
                  
                  // margin: 12px 0 10px 3px;
                  // padding: 0 0 0 16px;
                  
                  @media screen and (max-width: 480px) {
                    padding: 0 0 0 12px;
                  }
                `}
              >
                
                
                {/* コメント */}
                <Paragraph text={comment} />
                
                
                {/* ID */}
                <PublicIDs
                  idsArr={idsArr}
                  publicIDsArr={publicIDsArr}
                />
                
                
                {/* 情報 */}
                <PublicInformations
                  publicInformationsArr={publicInformationsArr}
                />
                
                
                {/* 公開設定 */}
                <PublicSetting
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
                    // onClick={() => handleSubmitGood({
                    //   pathArr: this.pathArr,
                    //   goodsPathArr: [communities_id, 'forumCommentsObj', 'dataObj', forumComments_id],
                    //   type: 'forumComment',
                    //   target_id: forumComments_id,
                    // })}
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
                      // onClick={() => handleEdit({
                      //   pathArr: [recruitmentComments_id, 'formReplyObj', 'show'],
                      //   value: !showFormReply
                      // })}
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
                    
                    
                    {/* Edit Button */}
                    {editable &&
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
                        // onClick={() => handleShowFormComment({
                        //   pathArr: this.pathArr,
                        //   forumComments_id,
                        // })}
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
                    }
                    
                    
                  </div>
                  
                  
                </div>
                
                
              </div>
              
              
              
              
              {/* Form Comment */}
              {/*<div
                css={css`
                  width: 100%;
                  border-top: 1px solid;
                  border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
                  border-image-slice: 1;
                  margin: 14px 0 0 0;
                  padding: 14px 0 0 0;
                `}
              >*/}
                
                
                {/* Show Form Button */}
                {/*{!showFormComment &&
                  <div
                    css={css`
                      display: flex;
                      flex-flow: row nowrap;
                      justify-content: center;
                    `}
                  >
                    <Button
                      type="submit"
                      variant="outlined"
                      size="small"
                      disabled={buttonDisabled}
                      startIcon={<IconCreate />}
                      onClick={() => handleEdit({
                        pathArr: [...pathRecruitmentCommentNewFormArr, 'showFormComment'],
                        value: !showFormComment,
                      })}
                    >
                      コメント投稿フォーム
                    </Button>
                  </div>
                }*/}
                
                
                
                
                {/* Form Comment */}
                {/*{showFormComment &&
                  <div
                    css={css`
                      margin: 16px 0 0 0;
                    `}
                  >
                    
                    <FormComment
                      pathArr={pathRecruitmentCommentNewFormArr}
                      gameCommunities_id={gameCommunities_id}
                      recruitmentThreads_id={recruitmentThreads_id}
                      publicSettingThread={publicSetting}
                    />
                    
                  </div>
                }*/}
                
                
              {/*</div>*/}
              
              
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
              // onChange={(page) => handleReadComments({
              //   pathArr: this.pathArr,
              //   gameCommunities_id,
              //   userCommunities_id,
              //   forumThreads_id,
              //   page,
              // })}
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
              // onChange={(eventObj) => handleReadComments({
              //   pathArr: this.pathArr,
              //   gameCommunities_id,
              //   userCommunities_id,
              //   forumThreads_id,
              //   page: 1,
              //   changeLimit: eventObj.target.value,
              // })}
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