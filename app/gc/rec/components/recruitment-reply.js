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
import User from '../../../common/user/components/user';
import ImageAndVideo from '../../../common/image-and-video/components/image-and-video';

import FormReply from './form/reply';




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
    
    this.pathArr = [this.props.recruitmentComments_id, 'recruitmentRepliesObj'];
    
    
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
      temporaryDataID,
      urlID,
      gameCommunities_id,
      recruitmentThreads_id,
      recruitmentComments_id,
      
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
      handleReadRecruitmentReplies,
      handleShowFormRecruitmentReply,
      
    } = storeGcRecruitment;
    
    
    // --------------------------------------------------
    //   storeGood
    // --------------------------------------------------
    
    const {
      
      handleSubmitGood,
      
    } = storeGood;
    
    
    
    
    // --------------------------------------------------
    //   Comment
    // --------------------------------------------------
    
    const page = lodashGet(dataObj, [gameCommunities_id, 'recruitmentRepliesObj', recruitmentComments_id, 'page'], 1);
    const count = lodashGet(dataObj, [gameCommunities_id, 'recruitmentRepliesObj', recruitmentComments_id, 'count'], 0);
    const limit = parseInt((stores.data.getCookie({ key: 'recruitmentReplyLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT), 10);
    const arr = lodashGet(dataObj, [gameCommunities_id, 'recruitmentRepliesObj', recruitmentComments_id, `page${page}Obj`, 'arr'], []);
    
    
    // --------------------------------------------------
    //   Element Name
    // --------------------------------------------------
    
    const elementName = this.pathArr.join('-');
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/gc/rec/components/recruitment-reply.js
    // `);
    
    // console.log(chalk`
    //   urlID: {green ${urlID}}
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
    //   recruitmentComments_id: {green ${recruitmentComments_id}}
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
    
    
    for (const [index, recruitmentReplies_id] of arr.entries()) {
      
      
      // --------------------------------------------------
      //   Path Array
      // --------------------------------------------------
      
      const pathRecruitmentReplyEditFormArr = [recruitmentReplies_id, 'recruitmentReplyEditForm'];
      const pathRecruitmentReplyNewFormReplyToArr = [recruitmentReplies_id, 'recruitmentReplyNewFormReplyTo'];
      
      
      // --------------------------------------------------
      //   data
      // --------------------------------------------------
      
      const repliesDataObj = lodashGet(dataObj, [gameCommunities_id, 'recruitmentRepliesObj', 'dataObj', recruitmentReplies_id], {});
      
      const comment = lodashGet(repliesDataObj, ['comment'], '');
      const imagesAndVideosObj = lodashGet(repliesDataObj, ['imagesAndVideosObj'], {});
      
      // 管理者権限がある、またはスレッドを建てた本人の場合、編集ボタンを表示する
      const editable = lodashGet(repliesDataObj, ['editable'], false);
      // // const editable = true;
      
      
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
      //   Link
      // --------------------------------------------------
      
      const linkHref = `/gc/[urlID]/rec/[recruitmentID]?urlID=${urlID}&recruitmentID=${recruitmentReplies_id}`;
      const linkAs = `/gc/${urlID}/rec/${recruitmentReplies_id}`;
      
      
      // --------------------------------------------------
      //   Show Form
      // --------------------------------------------------
      
      const showFormReply = lodashGet(dataObj, [...pathRecruitmentReplyEditFormArr, 'showFormReply'], false);
      const showFormReplyTo = lodashGet(dataObj, [...pathRecruitmentReplyNewFormReplyToArr, 'showFormReplyTo'], false);
      
      
      // --------------------------------------------------
      //   Reply to
      // --------------------------------------------------
      
      const replyToRecruitmentReplies_id = lodashGet(repliesDataObj, ['replyToRecruitmentReplies_id'], '');
      
      let replyToName = lodashGet(repliesDataObj, ['replyToName'], '');
      
      if (!replyToName) {
        replyToName = 'ななしさん';
      }
      
      const replyTo = `${replyToName} | ${replyToRecruitmentReplies_id}`;
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/components/recruitment-reply.js
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   recruitmentComments_id: {green ${recruitmentComments_id}}
      // `);
      
      // console.log(`
      //   ----- repliesDataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(repliesDataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      
      
      // --------------------------------------------------
      //   Component - Edit Form
      // --------------------------------------------------
      
      if (showFormReply) {
        
        componentArr.push(
          
          <Element
            key={index}
            name={recruitmentReplies_id}
          >
            
            <FormReply
              pathArr={pathRecruitmentReplyEditFormArr}
              gameCommunities_id={gameCommunities_id}
              recruitmentThreads_id={recruitmentThreads_id}
              recruitmentComments_id={recruitmentComments_id}
              recruitmentReplies_id={recruitmentReplies_id}
              replyToRecruitmentReplies_id={replyToRecruitmentReplies_id}
            />
            
          </Element>
          
        );
      
      
      // --------------------------------------------------
      //   Component - Replies
      // --------------------------------------------------
      
      } else {
        
        componentArr.push(
          <Element
            css={css`
              border-top: 1px dashed #BDBDBD;
              margin: 20px 0 0 0;
              padding: 20px 0 0 0;
            `}
            name={recruitmentReplies_id}
            key={index}
          >
            
            
            {/* Reply */}
            <div>
              
              
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
              
              
              
              
              {/* 返信 */}
              <div
                css={css`
                  border-left: 4px solid #A9A9F5;
                  margin: 12px 0;
                  padding: 8px 0 8px 16px;
                  
                  @media screen and (max-width: 480px) {
                    padding: 8px 0 8px 12px;
                  }
                `}
              >
                
                
                {/* Reply To */}
                {replyToRecruitmentReplies_id &&
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
                
                
                
                
                {/* コメント */}
                <Paragraph text={comment} />
                
                
                
                
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
                    onClick={() => handleSubmitGood({
                      pathArr: this.pathArr,
                      goodsPathArr: [gameCommunities_id, 'recruitmentRepliesObj', 'dataObj', recruitmentReplies_id],
                      type: 'recruitmentReply',
                      target_id: recruitmentReplies_id,
                    })}
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
                        <a>{recruitmentReplies_id}</a>
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
                      onClick={() => handleEdit({
                        pathArr: [...pathRecruitmentReplyNewFormReplyToArr, 'showFormReplyTo'],
                        value: !showFormReplyTo
                      })}
                      // onClick={() => handleShowFormRecruitmentReply({
                      //   pathArr: pathRecruitmentReplyNewFormArr,
                      //   recruitmentReplies_id,
                      // })}
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
                        onClick={() => handleShowFormRecruitmentReply({
                          pathArr: pathRecruitmentReplyEditFormArr,
                          recruitmentReplies_id,
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
                    }
                    
                    
                  </div>
                  
                  
                </div>
                
                
                
                
                {/* Reply - New Form Reply To */}
                {showFormReplyTo &&
                  <FormReply
                    pathArr={pathRecruitmentReplyNewFormReplyToArr}
                    gameCommunities_id={gameCommunities_id}
                    recruitmentThreads_id={recruitmentThreads_id}
                    recruitmentComments_id={recruitmentComments_id}
                    replyToRecruitmentReplies_id={recruitmentReplies_id}
                  />
                }
                
                
              </div>
              
              
            </div>
            
            
          </Element>
        );
        
      }
      
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
              onChange={(page) => handleReadRecruitmentReplies({
                pathArr: this.pathArr,
                gameCommunities_id,
                recruitmentComments_id,
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
              onChange={(eventObj) => handleReadRecruitmentReplies({
                pathArr: this.pathArr,
                gameCommunities_id,
                recruitmentComments_id,
                page: 1,
                changeLimit: eventObj.target.value,
              })}
              input={
                <OutlinedInput
                  classes={{
                    input: classes.input
                  }}
                  name="recruitment-replies-pagination"
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