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
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


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


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconAssignment from '@material-ui/icons/Assignment';
import IconPublic from '@material-ui/icons/Public';
import IconEdit from '@material-ui/icons/Edit';
import IconDoubleArrow from '@material-ui/icons/DoubleArrow';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Paragraph from '../../layout/components/paragraph';
import FormThread from './form-thread';
import FormComment from './form-comment';
import Comment from './comment';
import ImageAndVideo from '../../image-and-video/components/image-and-video';




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
    
    this.communities_id = this.props.gameCommunities_id || this.props.userCommunities_id;
    this.pathArr = [this.communities_id, 'threadObj'];
    
    
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
      temporaryDataID,
      userCommunityID,
      gameCommunities_id,
      userCommunities_id,
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
      handleReadThreads,
      handleShowFormThread,
      
    } = storeForum;
    
    
    // --------------------------------------------------
    //   Thread
    // --------------------------------------------------
    
    const page = lodashGet(dataObj, [this.communities_id, 'forumThreadsObj', 'page'], 1);
    const count = lodashGet(dataObj, [this.communities_id, 'forumThreadsObj', 'count'], 0);
    const limit = parseInt((stores.data.getCookie({ key: 'forumThreadLimit' }) || process.env.FORUM_THREAD_LIMIT), 10);
    const arr = lodashGet(dataObj, [this.communities_id, 'forumThreadsObj', `page${page}Obj`, 'arr'], []);
    
    
    // --------------------------------------------------
    //   Link Return Top
    // --------------------------------------------------
    
    let linkReturnTopHref = '';
    let linkReturnTopAs = '';
    
    if (userCommunityID) {
      
      linkReturnTopHref = `/uc/[userCommunityID]?userCommunityID=${userCommunityID}`;
      linkReturnTopAs = `/uc/${userCommunityID}`;
      
    }
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   /app/common/forum/components/thread.js
    //   page: {green ${page}}
    //   count: {green ${count}}
    //   limit: {green ${limit}}
    //   userCommunityID: {green ${userCommunityID}}
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
    
    
    for (const [index, forumThreads_id] of arr.entries()) {
      
      
      // --------------------------------------------------
      //   Property
      // --------------------------------------------------
      
      const threadsDataObj = lodashGet(dataObj, [this.communities_id, 'forumThreadsObj', 'dataObj', forumThreads_id], {});
      
      const name = lodashGet(threadsDataObj, ['name'], '');
      const comment = lodashGet(threadsDataObj, ['comment'], '');
      
      const imagesAndVideosObj = lodashGet(threadsDataObj, ['imagesAndVideosObj'], {});
      
      // 管理者権限がある、またはスレッドを建てた本人の場合、編集ボタンを表示する
      const editable = lodashGet(threadsDataObj, ['editable'], false);
      // const editable = true;
      
      const comments = lodashGet(threadsDataObj, ['comments'], 0);
      
      
      // --------------------------------------------------
      //   Link
      // --------------------------------------------------
      
      let linkHref = '';
      let linkAs = '';
      
      if (userCommunityID) {
        
        linkHref = `/uc/[userCommunityID]/forum/[forumID]?userCommunityID=${userCommunityID}&forumID=${forumThreads_id}`;
        linkAs = `/uc/${userCommunityID}/forum/${forumThreads_id}`;
        
      }
      
      
      // --------------------------------------------------
      //   Show
      // --------------------------------------------------
      
      const showComment = lodashGet(dataObj, [...this.pathArr, forumThreads_id, 'showComment'], true);
      const showForm = lodashGet(dataObj, [forumThreads_id, 'showForm'], false);
      
      // console.log(chalk`
      //   forumThreads_id: {green ${forumThreads_id}}
      //   showComment: {green ${showComment}}
      // `);
      
      // --------------------------------------------------
      //   Panel
      // --------------------------------------------------
      
      const panelExpanded = stores.layout.handleGetPanelExpanded({ pathArr: [...this.pathArr, forumThreads_id] });
      
      
      
      
      componentArr.push(
        <Element
          name={forumThreads_id}
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
                  // margin: 0 0 20px 0 !important; 
                  
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
              {showForm ? (
                
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
                
              // Thread
              ) : (
                
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
                        onClick={() => handlePanelExpand({ pathArr: [...this.pathArr, forumThreads_id] })}
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
                      // background-color: pink;
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
                        onClick={() => handleEdit({
                          pathArr: [...this.pathArr, forumThreads_id, 'showComment'],
                          value: !showComment
                        })}
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
                    {editable &&
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
                              margin: 0 0 0 0;
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
                    }
                    
                    
                  </div>
                  
                  
                  {/* Comment */}
                  {showComment &&
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
                  }
                  
                  
                </div>
              　
              )}
              
              
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
                <FormComment
                  gameCommunities_id={gameCommunities_id}
                  userCommunities_id={userCommunities_id}
                  forumThreads_id={forumThreads_id}
                />
                
                
                {/* Comment */}
                <Comment
                  userCommunityID={userCommunityID}
                  gameCommunities_id={gameCommunities_id}
                  userCommunities_id={userCommunities_id}
                  forumThreads_id={forumThreads_id}
                  comments={comments}
                />
                
                
              </div>
              
            </ExpansionPanelDetails>
            
          </ExpansionPanel>
          
          
        </Element>
      );
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
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
                // color="primary"
                size="small"
                disabled={buttonDisabled}
              >
                <IconDoubleArrow
                  css={css`
                    && {
                      // font-size: 16px;
                      margin: 0 3px 0 0;
                      
                      // @media screen and (max-width: 480px) {
                      //   display: none;
                      // }
                    }
                  `}
                />
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
                onChange={(page) => handleReadThreads({
                  pathArr: this.pathArr,
                  temporaryDataID,
                  gameCommunities_id,
                  userCommunities_id,
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
                onChange={(eventObj) => handleReadThreads({
                  pathArr: this.pathArr,
                  temporaryDataID,
                  gameCommunities_id,
                  userCommunities_id,
                  page: 1,
                  changeLimit: eventObj.target.value,
                })}
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
        
        
      </React.Fragment>
    );
    
  }
  
});