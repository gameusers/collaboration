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

import { makeStyles } from '@material-ui/core/styles';

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
import IconAssignment from '@material-ui/icons/Assignment';
import IconPublic from '@material-ui/icons/Public';
import IconDelete from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
import IconDoubleArrow from '@material-ui/icons/DoubleArrow';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from 'app/common/layout/v2/components/panel.js';
import Paragraph from 'app/common/layout/v2/components/paragraph.js';
import ImageAndVideo from 'app/common/image-and-video/components/image-and-video.js';
import FormThread from 'app/common/forum/v2/components/form-thread.js';
import FormComment from 'app/common/forum/components/form-comment.js';
import Comment from 'app/common/forum/components/comment.js';

import FormName from 'app/common/form/components/name.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { CustomError } from 'app/@modules/error/custom.js';
import { getCookie } from 'app/@modules/cookie.js';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateLayout } from 'app/@states/layout.js';






// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const useStyles = makeStyles({
  
  expanded: {
    marginBottom: '0 !important',
  },
  
  input: {
    fontSize: '12px',
    color: '#666',
    padding: '6px 26px 6px 12px',
  },
  
});






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

/**
 * スレッド
 */
const Thread = ({ 
  
  urlID,
  gameCommunities_id,
  userCommunityID,
  userCommunities_id,
  buttonDisabled,
  forumThreads_id,
  dataObj,
  
}) => {
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const classes = useStyles();
  const [panelExpanded, setPanelExpanded] = useState(true);
  
  const [showComment, setShowComment] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const name = lodashGet(dataObj, ['name'], '');
  const comment = lodashGet(dataObj, ['comment'], '');
  
  const imagesAndVideosObj = lodashGet(dataObj, ['imagesAndVideosObj'], {});
  
  // 管理者権限がある、またはスレッドを建てた本人の場合、編集ボタンを表示する
  const editable = lodashGet(dataObj, ['editable'], false);
  // const editable = true;
  
  const comments = lodashGet(dataObj, ['comments'], 0);
  
  
  
  
  // --------------------------------------------------
  //   Link
  // --------------------------------------------------
  
  let linkHref = '';
  let linkAs = '';
  
  // ---------------------------------------------
  //   - Game Community
  // ---------------------------------------------
  
  if (urlID) {
    
    linkHref = `/gc/[urlID]/forum/[forumID]?urlID=${urlID}&forumID=${forumThreads_id}`;
    linkAs = `/gc/${urlID}/forum/${forumThreads_id}`;
    
    
  // ---------------------------------------------
  //   - User Community
  // ---------------------------------------------
  
  } else if (userCommunityID) {
    
    linkHref = `/uc/[userCommunityID]/forum/[forumID]?userCommunityID=${userCommunityID}&forumID=${forumThreads_id}`;
    linkAs = `/uc/${userCommunityID}/forum/${forumThreads_id}`;
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Share: Twitter
  //   参考：https://blog.ikunaga.net/entry/twitter-com-intent-tweet/
  // --------------------------------------------------
  
  const twitterHashtagsArr = lodashGet(dataObj, ['gamesObj', 'twitterHashtagsArr'], []);
  
  let shareTwitterText = name;
  
  if (name.length > 50) {
    shareTwitterText = name.substr(0, 50) + '…';
  }
  
  let shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURI(shareTwitterText)}&url=${process.env.NEXT_PUBLIC_URL_BASE}gc/${urlID}/forum/${forumThreads_id}`;
  
  if (twitterHashtagsArr.length > 0) {
    
    shareTwitter += `&hashtags=${twitterHashtagsArr.join(',')}`;
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Element
      name={forumThreads_id}
    >
      
      
      {/* Panel */}
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
          
          
          {/* Form */}
          {showForm &&
            <div
              css={css`
                width: 100%;
              `}
            >
              
              <FormThread
                gameCommunities_id={gameCommunities_id}
                userCommunities_id={userCommunities_id}
                forumThreads_id={forumThreads_id}
              />
              
            </div>
          }
          
          
          
          
          {/* Thread */}
          {!showForm &&
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
                  {name}
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
                    
                    onClick={() => setPanelExpanded(!panelExpanded)}
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
              
              
              
              
              {/* Images and Videos */}
              {Object.keys(imagesAndVideosObj).length > 0 &&
                <div
                  css={css`
                    margin: 12px 0 4px 0;
                  `}
                >
                  
                  <ImageAndVideo
                    pathArr={[...this.pathArr, forumThreads_id, 'imagesAndVideosObj']}
                    imagesAndVideosObj={imagesAndVideosObj}
                  />
                  
                </div>
              }
              
              
              
              
              {/* Information */}
              <div
                css={css`
                  display: flex;
                  flex-flow: row wrap;
                  font-size: 12px;
                  margin: 6px 0 0 0;
                `}
              >
                
                
                {/* Show Thread Description */}
                <div
                  css={css`
                    display: flex;
                    flex-flow: row nowrap;
                    margin: 0 6px 0 0;
                  `}
                >
                  
                  <IconAssignment
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
                    onClick={() => setShowComment(!showComment)}
                  >
                    スレッドについて
                  </div>
                  
                </div>
                
                
                
                
                {/* Thread _id */}
                <div
                  css={css`
                    display: flex;
                    flex-flow: row nowrap;
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
                      <a>{forumThreads_id}</a>
                    </Link>
                  </div>
                  
                </div>
                
                
                
                
                {/* Edit Button */}
                {/*{editable &&
                  <div
                    css={css`
                      display: flex;
                      flex-flow: row nowrap;
                      margin-left: auto;
                    `}
                  >
                    <Button
                      css={css`
                        && {
                          font-size: 12px;
                          height: 22px;
                          min-width: 54px;
                          min-height: 22px;
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
                      onClick={() => handleShowFormThread({
                        pathArr: this.pathArr,
                        forumThreads_id
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
                }*/}
                
                
              </div>
              
              
              
              
              
              <div
                css={css`
                  font-size: 14px;
                  line-height: 1.6em;
                  
                  ${showComment &&
                    `
                    border-left: 4px solid #A4A4A4;
                    margin: 12px 0 10px 0;
                    padding: 8px 0 8px 16px;
                    `
                  }
                  
                  @media screen and (max-width: 480px) {
                    padding: 0 0 8px 12px;
                  }
                `}
              >
                
                
                {/* Comment */}
                {showComment &&
                  <Paragraph text={comment} />
                }
                {/*{showComment &&
                  <div
                    css={css`
                      font-size: 14px;
                      line-height: 1.6em;
                      border-left: 4px solid #A4A4A4;
                      margin: 12px 0 10px 3px;
                      padding: 0 0 0 16px;
                      
                      @media screen and (max-width: 480px) {
                        padding: 0 0 0 12px;
                      }
                    `}
                  >
                    <Paragraph text={comment} />
                  </div>
                }*/}
                
                
                
                
                {/* Bottom Container */}
                <div
                  css={css`
                    display: flex;
                    flex-flow: row wrap;
                    margin: 16px 0 0 0;
                  `}
                >
                  
                  
                  {/* Buttons */}
                  <div
                    css={css`
                      display: flex;
                      flex-flow: row nowrap;
                      margin-left: auto;
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
                      disabled={buttonDisabled}
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
                        // onClick={() => handleShowDeleteDialog({
                        //   pathArr: this.pathArr,
                        //   gameCommunities_id,
                        //   recruitmentThreads_id,
                        // })}
                        disabled={buttonDisabled}
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
                        // onClick={() => handleShowFormRecruitmentThread({
                        //   pathArr: pathRecruitmentThreadEditFormArr,
                        //   recruitmentThreads_id,
                        // })}
                        disabled={buttonDisabled}
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
                
                
              </div>
              
              
            </div>
          　
          }
          
          
        </ExpansionPanelSummary>
        
        
        
        
        {/* Contents */}
        <ExpansionPanelDetails
          css={css`
            @media screen and (max-width: 480px) {
              padding: 0 16px 24px !important;
            }
          `}
        >
          
          <div
            css={css`
              width: 100%;
              margin: 12px 0 0 0;
            `}
          >
            
            
            {/* Form Comment */}
            {/*<div
              css={css`
                border-top: 1px dashed #585858;
                padding: 14px 0 0 0;
              `}
            >
              
              <FormName />
              
              <FormComment
                gameCommunities_id={gameCommunities_id}
                userCommunities_id={userCommunities_id}
                forumThreads_id={forumThreads_id}
                settingAnonymity={settingAnonymity}
              />
              
            </div>*/}
            
            
            {/* Comment */}
            {/*<Comment
              urlID={urlID}
              gameCommunities_id={gameCommunities_id}
              userCommunityID={userCommunityID}
              userCommunities_id={userCommunities_id}
              forumThreads_id={forumThreads_id}
              comments={comments}
              settingAnonymity={settingAnonymity}
            />*/}
            
            
          </div>
          
          
        </ExpansionPanelDetails>
        
        
      </ExpansionPanel>
      
      
    </Element>
  );
  
  
};




/**
 * Export Component
 */
const Component = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    urlID,
    gameCommunities_id,
    userCommunityID,
    userCommunities_id,
    
    setGameCommunityObj,
    setForumThreadsForListObj,
    forumThreadsObj,
    setForumThreadsObj,
    setForumCommentsObj,
    setForumRepliesObj,
    
    settingAnonymity,
    individual,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const classes = useStyles();
  const [panelExpanded, setPanelExpanded] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [name, setName] = useState();
  const [comment, setComment] = useState();
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  // const stateLayout = ContainerStateLayout.useContainer();
  
  // const { loadingObj } = stateLayout;
  
  // const open = lodashGet(loadingObj, ['open'], false);
  // const position = lodashGet(loadingObj, ['position'], 'left');
  
  
  
  
  // --------------------------------------------------
  //   Forum
  // --------------------------------------------------
  
  // const {
    
  //   dataObj,
  //   handleEdit,
  //   handleReadThreads,
  //   handleShowFormThread,
    
  // } = storeForum;
  
  
  // --------------------------------------------------
  //   Thread
  // --------------------------------------------------
  
  const page = lodashGet(forumThreadsObj, ['page'], 1);
  const count = lodashGet(forumThreadsObj, ['count'], 0);
  const limit = parseInt((getCookie({ key: 'threadLimit' }) || process.env.NEXT_PUBLIC_FORUM_THREAD_LIMIT), 10);
  const arr = lodashGet(forumThreadsObj, [`page${page}Obj`, 'arr'], []);
  
  
  // --------------------------------------------------
  //   Link Return Top
  // --------------------------------------------------
  
  let linkReturnTopHref = '';
  let linkReturnTopAs = '';
  
  
  // ---------------------------------------------
  //   - Game Community
  // ---------------------------------------------
  
  if (urlID) {
    
    linkReturnTopHref = `/gc/[urlID]/index?urlID=${urlID}`;
    linkReturnTopAs = `/gc/${urlID}`;
    
    
  // ---------------------------------------------
  //   - User Community
  // ---------------------------------------------
  
  } else if (userCommunityID) {
    
    linkReturnTopHref = `/uc/[userCommunityID]/index?userCommunityID=${userCommunityID}`;
    linkReturnTopAs = `/uc/${userCommunityID}`;
    
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/forum/v2/components/thread.js
  // `);
  
  // console.log(chalk`
  //   urlID: {green ${urlID}}
  //   gameCommunities_id: {green ${gameCommunities_id}}
  //   userCommunityID: {green ${userCommunityID}}
  //   userCommunities_id: {green ${userCommunities_id}}
    
  //   page: {green ${page}}
  //   count: {green ${count}}
  //   limit: {green ${limit}}
  // `);
  
  // console.log(`
  //   ----- arr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Component - Thread
  // --------------------------------------------------
  
  const componentArr = [];
  
  
  for (let forumThreads_id of arr.values()) {
    
    
    // --------------------------------------------------
    //   dataObj
    // --------------------------------------------------
    
    const dataObj = lodashGet(forumThreadsObj, ['dataObj', forumThreads_id], {});
    
    
    // --------------------------------------------------
    //   push
    // --------------------------------------------------
    
    componentArr.push(
      <Thread
        key={forumThreads_id}
        urlID={urlID}
        gameCommunities_id={gameCommunities_id}
        userCommunityID={userCommunityID}
        userCommunities_id={userCommunities_id}
        buttonDisabled={buttonDisabled}
        forumThreads_id={forumThreads_id}
        dataObj={dataObj}
      />
    );
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Element
      name="forumThreads"
    >
      
      
      {/* Form - Post New Thread */}
      <div
        css={css`
          margin: 0 0 16px 0;
        `}
      >
        
        <Panel
          heading="スレッド投稿フォーム"
          defaultExpanded={false}
        >
          
          <FormThread
            gameCommunities_id={gameCommunities_id}
            userCommunities_id={userCommunities_id}
            forumThreads_id=""
            
            setGameCommunityObj={setGameCommunityObj}
            setForumThreadsForListObj={setForumThreadsForListObj}
            forumThreadsObj={forumThreadsObj}
            setForumThreadsObj={setForumThreadsObj}
            setForumCommentsObj={setForumCommentsObj}
            setForumRepliesObj={setForumRepliesObj}
            
            name={name}
            setName={setName}
            comment={comment}
            setComment={setComment}
          />
          
        </Panel>
        
      </div>
      
      
      
      
      {/* Forum */}
      {componentArr}
      
      
      
      
      {/* Pagination */}
      {individual ? (
        
        <div
          css={css`
            margin: 24px 0 8px 0;
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
              >
                <IconDoubleArrow />
                フォーラムトップに戻る
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
              onChange={() => () => {}}
              // onChange={(page) => handleReadThreads({
              //   // pathArr: this.pathArr,
              //   // temporaryDataID,
              //   gameCommunities_id,
              //   userCommunities_id,
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
              onChange={() => () => {}}
              // onChange={(eventObj) => handleReadThreads({
              //   pathArr: this.pathArr,
              //   temporaryDataID,
              //   gameCommunities_id,
              //   userCommunities_id,
              //   page: 1,
              //   changeLimit: eventObj.target.value,
              // })}
              input={
                <OutlinedInput
                  classes={{
                    input: classes.input
                  }}
                  name="forum-threads-pagination"
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
      
      
    </Element>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
// export default withStyles(stylesObj)(Component);