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
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/ja_JP';
import SimpleIcons from 'simple-icons-react-component';

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
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconPublic from '@material-ui/icons/Public';
import IconEdit from '@material-ui/icons/Edit';
import IconDoubleArrow from '@material-ui/icons/KeyboardReturn';
import IconReply from '@material-ui/icons/Reply';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Paragraph from 'app/common/layout/components/paragraph.js';
import ChipHardwares from 'app/common/hardware/components/chip.js';
import User from 'app/common/user/components/user.js';
import ImageAndVideo from 'app/common/image-and-video/components/image-and-video.js';
import Panel from 'app/common/layout/components/panel.js';

import ChipCategory from 'app/gc/rec/components/chip-category.js';
import RecruitmentComment from 'app/gc/rec/components/recruitment-comment.js';
import FormThread from 'app/gc/rec/components/form/thread.js';
import FormComment from 'app/gc/rec/components/form/comment.js';
import Public from 'app/gc/rec/components/public.js';
import DeadlineDate from 'app/gc/rec/components/deadline-date.js';
import Notification from 'app/gc/rec/components/notification.js';




// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const stylesObj = {
  
  expanded: {
    marginBottom: '0 !important',
  },
  
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
    
    this.pathArr = [this.props.gameCommunities_id, 'recruitmentThreadsObj'];
    this.pathRecruitmentThreadsNewFormArr = [this.props.gameCommunities_id, 'recruitmentThreadsNewFormObj'];
    
    
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
      intl,
      urlID,
      gameCommunities_id,
      individual,
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Panel Expand Function
    // --------------------------------------------------
    
    const handlePanelExpand = lodashGet(stores, ['layout', 'handlePanelExpand'], () => {});
    
    
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
      handleReadRecruitmentThreads,
      handleShowFormRecruitmentThread,
      
    } = storeGcRecruitment;
    
    
    // --------------------------------------------------
    //   Thread
    // --------------------------------------------------
    
    const page = lodashGet(dataObj, [gameCommunities_id, 'recruitmentThreadsObj', 'page'], 1);
    const count = lodashGet(dataObj, [gameCommunities_id, 'recruitmentThreadsObj', 'count'], 0);
    const arr = lodashGet(dataObj, [gameCommunities_id, 'recruitmentThreadsObj', `page${page}Obj`, 'arr'], []);
    
    const limit = parseInt((stores.data.getCookie({ key: 'recruitmentThreadLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT), 10);
    
    
    // --------------------------------------------------
    //   Link Return Top
    // --------------------------------------------------
    
    const linkReturnTopHref = `/gc/[urlID]/rec/index?urlID=${urlID}`;
    const linkReturnTopAs = `/gc/${urlID}/rec`;
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/gc/rec/components/recruitment-thread.js
    // `);
    
    // console.log(chalk`
    //   urlID: {green ${urlID}}
    //   gameCommunities_id: {green ${gameCommunities_id}}
      
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
    //   Component - Thread
    // --------------------------------------------------
    
    const componentArr = [];
    
    
    for (const [index, recruitmentThreads_id] of arr.entries()) {
      
      
      // --------------------------------------------------
      //   Path Array
      // --------------------------------------------------
      
      const pathRecruitmentThreadArr = [recruitmentThreads_id, 'recruitmentThreadObj'];
      const pathRecruitmentThreadEditFormArr = [recruitmentThreads_id, 'recruitmentThreadEditFormObj'];
      const pathRecruitmentCommentNewFormArr = [recruitmentThreads_id, 'recruitmentCommentNewFormObj'];
      // const pathRecruitmentCommentEditFormArr = [recruitmentThreads_id, 'recruitmentCommentEditFormObj'];
      
      
      // --------------------------------------------------
      //   data
      // --------------------------------------------------
      
      const threadsDataObj = lodashGet(dataObj, [gameCommunities_id, 'recruitmentThreadsObj', 'dataObj', recruitmentThreads_id], {});
      
      const title = lodashGet(threadsDataObj, ['title'], '');
      const comment = lodashGet(threadsDataObj, ['comment'], '');
      
      const imagesAndVideosObj = lodashGet(threadsDataObj, ['imagesAndVideosObj'], {});
      
      // 管理者権限がある、またはスレッドを建てた本人の場合、編集ボタンを表示する
      const editable = lodashGet(threadsDataObj, ['editable'], false);
      // const editable = true;
      
      const category = lodashGet(threadsDataObj, ['category'], 1);
      const hardwaresArr = lodashGet(threadsDataObj, ['hardwaresArr'], []);
      const deadlineDate = lodashGet(threadsDataObj, ['deadlineDate'], '');
      const notification = lodashGet(threadsDataObj, ['notification'], '');
      
      const comments = lodashGet(threadsDataObj, ['comments'], 0);
      
      
      // --------------------------------------------------
      //   User Data
      // --------------------------------------------------
      
      const imagesAndVideosThumbnailObj = lodashGet(threadsDataObj, ['cardPlayersObj', 'imagesAndVideosThumbnailObj'], {});
      
      const cardPlayers_id = lodashGet(threadsDataObj, ['cardPlayersObj', '_id'], '');
      
      let name = lodashGet(threadsDataObj, ['name'], '');
      const cardPlayers_name = lodashGet(threadsDataObj, ['cardPlayersObj', 'name'], '');
      
      if (cardPlayers_name) {
        name = cardPlayers_name;
      }
      
      const status = lodashGet(threadsDataObj, ['cardPlayersObj', 'status'], '');
      
      const exp = lodashGet(threadsDataObj, ['usersObj', 'exp'], 0);
      const accessDate = lodashGet(threadsDataObj, ['usersObj', 'accessDate'], '');
      const userID = lodashGet(threadsDataObj, ['usersObj', 'userID'], '');
      
      
      // --------------------------------------------------
      //   Link
      // --------------------------------------------------
      
      let linkHref = `/gc/[urlID]/rec/[...slug]?urlID=${urlID}&recruitmentID=${recruitmentThreads_id}`;
      let linkAs = `/gc/${urlID}/rec/${recruitmentThreads_id}`;
      
      
      // --------------------------------------------------
      //   ID & Information
      // --------------------------------------------------
      
      const idsArr = lodashGet(threadsDataObj, ['idsArr'], []);
      const publicIDsArr = lodashGet(threadsDataObj, ['publicIDsArr'], []);
      const publicInformationsArr = lodashGet(threadsDataObj, ['publicInformationsArr'], []);
      const publicSetting = lodashGet(threadsDataObj, ['publicSetting'], 1);
      
      
      // --------------------------------------------------
      //   Show Form
      // --------------------------------------------------
      
      const showFormThread = lodashGet(dataObj, [...pathRecruitmentThreadEditFormArr, 'showFormThread'], false);
      const showFormComment = lodashGet(dataObj, [...pathRecruitmentCommentNewFormArr, 'showFormComment'], false);
      
      
      // --------------------------------------------------
      //   Panel
      // --------------------------------------------------
      
      const panelExpanded = stores.layout.handleGetPanelExpanded({ pathArr: pathRecruitmentThreadArr });
      
      
      // --------------------------------------------------
      //   Share: Twitter
      //   参考：https://blog.ikunaga.net/entry/twitter-com-intent-tweet/
      // --------------------------------------------------
      
      const twitterHashtagsArr = lodashGet(threadsDataObj, ['gamesObj', 'twitterHashtagsArr'], []);
      
      let shareTwitterText = title;
      
      if (title.length > 50) {
        shareTwitterText = title.substr(0, 50) + '…';
      }
      
      let shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURI(shareTwitterText)}&url=${process.env.NEXT_PUBLIC_URL_BASE}gc/${urlID}/rec/${recruitmentThreads_id}`;
      
      if (twitterHashtagsArr.length > 0) {
        
        shareTwitter += `&hashtags=${twitterHashtagsArr.join(',')}`;
        
      }
      
      
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/components/recruitment-thread.js
      // `);
      
      // console.log(`
      //   ----- threadsDataObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(threadsDataObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- twitterHashtagsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(twitterHashtagsArr)), { colors: true, depth: null })}\n
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
          
          
          <ExpansionPanel
            css={css`
              margin: 0 0 16px 0 !important;
            `}
            expanded={panelExpanded}
          >
            
            
            {/* Summary */}
            <ExpansionPanelSummary
              css={css`
                && {
                  cursor: default !important;
                  background-color: white !important;
                  
                  @media screen and (max-width: 480px) {
                    padding: 0 16px;
                  }
                }
              `}
              classes={{
                expanded: classes.expanded
              }}
            >
              
              
              <div
                css={css`
                  display: flex;
                  flex-flow: column nowrap;
                  width: 100%;
                `}
              >
                
                
                {/* Container - Thread Name & Expansion Button */}
                <div
                  css={css`
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    width: 100%;
                  `}
                >
                  
                  
                  {/* h2 */}
                  <h2
                    css={css`
                      font-weight: bold;
                      font-size: 16px;
                      
                      @media screen and (max-width: 480px) {
                        font-size: 14px;
                      }
                    `}
                  >
                    {title}
                  </h2>
                  
                  
                  
                  
                  {/* Expansion Button */}
                  <div
                    css={css`
                      margin-left: auto;
                    `}
                  >
                    
                    <IconButton
                      css={css`
                        && {
                          margin: 0;
                          padding: 4px;
                        }
                      `}
                      onClick={() => handlePanelExpand({ pathArr: pathRecruitmentThreadArr })}
                      aria-expanded={panelExpanded}
                      aria-label="Show more"
                      disabled={buttonDisabled}
                    >
                      {panelExpanded ? (
                        <IconExpandLess />
                      ) : (
                        <IconExpandMore />
                      )}
                    </IconButton>
                    
                  </div>
                  
                  
                </div>
                
                
                
                
                {/* Information */}
                <div
                  css={css`
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    font-size: 12px;
                  `}
                >
                  
                  
                  {/* Hardwares & recruitmentThreads_id */}
                  <div
                    css={css`
                      display: flex;
                      flex-flow: row wrap;
                      align-items: center;
                      margin: 0;
                    `}
                  >
                    
                    
                    {/* ハードウェア  */}
                    <ChipHardwares
                      hardwaresArr={hardwaresArr}
                    />
                    
                    
                    {/* カテゴリー */}
                    <ChipCategory
                      category={category}
                    />
                    
                    
                    {/* スレッドの固有ID: recruitmentThreads_id */}
                    <div
                      css={css`
                        display: flex;
                        flex-flow: row nowrap;
                        margin: 8px 0 0 0;
                      `}
                    >
                      
                      <IconPublic
                        css={css`
                          && {
                            font-size: 24px;
                            margin: 0 2px 0 0;
                          }
                        `}
                      />
                      
                      <div
                        css={css`
                          font-size: 12px;
                          color: #009933;
                          cursor: pointer;
                          margin: 2px 0 0 0;
                        `}
                      >
                        <Link href={linkHref} as={linkAs}>
                          <a>{recruitmentThreads_id}</a>
                        </Link>
                      </div>
                      
                    </div>
                    
                    
                  </div>
                  
                  
                </div>
                
                
              </div>
              
              
            </ExpansionPanelSummary>
            
            
            
            
            {/* Contents */}
            <ExpansionPanelDetails
              css={css`
                && {
                  display: flex;
                  flex-flow: column wrap;
                  
                  @media screen and (max-width: 480px) {
                    padding: 0 16px 16px !important;
                  }
                }
              `}
            >
                
                
                {/* Thread - Edit Form */}
                {showFormThread &&
                  <div
                    css={css`
                      width: 100%;
                      
                      border-top: 1px solid;
                      border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
                      border-image-slice: 1;
                      
                      margin: 12px 0 0 0;
                    `}
                  >
                  
                    <div
                      css={css`
                        border-left: 4px solid #A4A4A4;
                        margin: 16px 0 0 0;
                        padding: 8px 0 8px 16px;
                        
                        @media screen and (max-width: 480px) {
                          // background-color: #F8F8FF;
                          border-left: none;
                          margin: 0;
                          padding: 32px 0 0 0;
                        }
                      `}
                    >
                      
                      <FormThread
                        pathArr={pathRecruitmentThreadEditFormArr}
                        gameCommunities_id={gameCommunities_id}
                        recruitmentThreads_id={recruitmentThreads_id}
                      />
                      
                    </div>
                    
                  </div>
                }
                
                
                
                
                {/* Thread */}
                {!showFormThread &&
                  <div
                    css={css`
                      width: 100%;
                      
                      border-top: 1px solid;
                      border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
                      border-image-slice: 1;
                      
                      margin: 12px 0 0 0;
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
                    
                    
                    
                    
                    {/* スレッド */}
                    <div
                      css={css`
                        font-size: 14px;
                        line-height: 1.6em;
                        
                        border-left: 4px solid #A4A4A4;
                        margin: 12px 0 24px 0;
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
                      
                      
                      
                      
                      {/* 募集期間 ＆ 通知方法 */}
                      {(deadlineDate || notification) &&
                        <div
                          css={css`
                            margin: 20px 0 0 0;
                          `}
                        >
                          
                          <DeadlineDate
                            deadlineDate={deadlineDate}
                          />
                          
                          <Notification
                            pathArr={pathRecruitmentThreadArr}
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
                                line-height: 1;
                                margin: 4px 0 0 0;
                                padding: 0 3px;
                                
                                @media screen and (max-width: 480px) {
                                  min-width: 36px;
                                  min-height: 22px;
                                }
                              }
                            `}
                            variant="outlined"
                            href={shareTwitter}
                            target="_blank"
                          >
                            <Avatar
                              css={css`
                                && {
                                  width: 16px;
                                  height: 16px;
                                  line-height: 1;
                                  background-color: #1DA1F2;
                                  margin: 0 4px 0 0;
                                }
                              `}
                              alt="PlayStation"
                              style={{ 'backgroundColor': '#1DA1F2' }}
                            >
                              <div style={{ 'width': '80%', 'marginTop': '0px' }}>
                                <SimpleIcons name="Twitter" color="white" />
                              </div>
                            </Avatar>
                            シェア
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
                                  margin: 4px 0 0 12px;
                                  padding: 0 4px;
                                  
                                  @media screen and (max-width: 480px) {
                                    min-width: 36px;
                                    min-height: 22px;
                                  }
                                }
                              `}
                              variant="outlined"
                              color="primary"
                              onClick={() => handleShowFormRecruitmentThread({
                                pathArr: pathRecruitmentThreadEditFormArr,
                                recruitmentThreads_id,
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
                      
                      
                    </div>
                    
                    
                    
                    
                    {/* Form Comment */}
                    <div
                      css={css`
                        
                        ${showFormComment
                          ?
                            `
                            border-top: 2px dashed red;
                            ${comments > 0 && 'border-bottom: 2px dashed red;'}
                            `
                          :
                            `
                            border-top: 1px dashed #585858;
                            ${comments > 0 && 'border-bottom: 1px dashed #585858;'}
                            `
                        }
                        
                        @media screen and (max-width: 480px) {
                          border-left: none;
                        }
                      `}
                    >
                      
                      
                      {/* Button - Show New Form Comment */}
                      {!showFormComment &&
                        <div
                          css={css`
                            display: flex;
                            flex-flow: row nowrap;
                            justify-content: center;
                            
                            ${comments > 0
                              ?
                                `
                                margin: 14px 0;
                                `
                              :
                                `
                                margin: 14px 0 0 0;
                                `
                            }
                          `}
                        >
                          <Button
                            type="submit"
                            variant="outlined"
                            size="small"
                            disabled={buttonDisabled}
                            startIcon={<IconReply />}
                            onClick={() => handleEdit({
                              pathArr: [...pathRecruitmentCommentNewFormArr, 'showFormComment'],
                              value: !showFormComment,
                            })}
                          >
                            コメント投稿フォーム
                          </Button>
                        </div>
                      }
                      
                      
                      
                      
                      {/* New Form Comment */}
                      {showFormComment &&
                        <div
                          css={css`
                            // border-top: 2px dashed red;
                            // border-bottom: 2px dashed red;
                            border-left: 4px solid #84cacb;
                            
                            ${comments > 0
                              ? `
                                margin: 24px 0;
                                `
                              : `
                                margin: 24px 0 6px 0;
                                `
                            }
                            
                            padding: 0 0 0 16px;
                            
                            @media screen and (max-width: 480px) {
                              border-left: none;
                              
                              padding-left: 0;
                            }
                          `}
                        >
                          
                          <FormComment
                            pathArr={pathRecruitmentCommentNewFormArr}
                            gameCommunities_id={gameCommunities_id}
                            recruitmentThreads_id={recruitmentThreads_id}
                            publicSettingThread={publicSetting}
                          />
                          
                        </div>
                      }
                      
                      
                    </div>
                
                    
                    
                    
                    {/* Comment */}
                    <RecruitmentComment
                      urlID={urlID}
                      gameCommunities_id={gameCommunities_id}
                      recruitmentThreads_id={recruitmentThreads_id}
                    />
                    
                    
                  </div>
                }
                
                
              </ExpansionPanelDetails>
            
            
          </ExpansionPanel>
          
          
        </Element>
      );
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Element
        name="recruitmentThreads"
      >
        
        
        {/* New Form Recruitment Thread */}
        <div
          css={css`
            margin: 0 0 16px 0;
          `}
        >
          
          <Panel
            heading="募集投稿フォーム"
            pathArr={this.pathRecruitmentThreadsNewFormArr}
            defaultExpanded={false}
          >
            
            <FormThread
              pathArr={this.pathRecruitmentThreadsNewFormArr}
              gameCommunities_id={gameCommunities_id}
            />
            
          </Panel>
          
        </div>
        
        
        
        
        {/* Recruitment */}
        {componentArr}
        
        
        
        
        {/* Pagination */}
        {individual ? (
          
          
          <div
            css={css`
              margin: 16px 0 0 0;
            `}
          >
            
            <Paper
              css={css`
                display: flex;
                flex-flow: row wrap;
                padding: 12px 0 12px 12px;
              `}
            >
              
              <Link href={linkReturnTopHref} as={linkReturnTopAs}>
                <Button
                  type="submit"
                  variant="outlined"
                  size="small"
                  disabled={buttonDisabled}
                  startIcon={<IconDoubleArrow />}
                >
                  募集トップに戻る
                </Button>
              </Link>
              
            </Paper>
            
          </div>
          
          
        ) : (
          
          
          <Paper
            css={css`
              display: flex;
              flex-flow: row wrap;
              padding: 0 8px 8px 8px;
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
                onChange={(page) => handleReadRecruitmentThreads({
                  pathArr: this.pathArr,
                  urlID,
                  gameCommunities_id,
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
                onChange={(eventObj) => handleReadRecruitmentThreads({
                  pathArr: this.pathArr,
                  urlID,
                  gameCommunities_id,
                  page: 1,
                  changeLimit: eventObj.target.value,
                })}
                input={
                  <OutlinedInput
                    classes={{
                      input: classes.input
                    }}
                    name="recruitment-threads-pagination"
                    id="outlined-rows-per-page"
                  />
                }
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
              
            </FormControl>
            
            
          </Paper>
          
          
        )}
        
        
        
        {/*<Link
          href={`/gc/[urlID]/rec/[...slug]?urlID=Dead-by-Daylight&recruitmentID=RptgCrCS-v`}
          as={`/gc/Dead-by-Daylight/rec/RptgCrCS-v`}
        >
          <a>RptgCrCS-v</a>
        </Link>*/}
        
        
      </Element>
    );
    
    
  }
  
  
});