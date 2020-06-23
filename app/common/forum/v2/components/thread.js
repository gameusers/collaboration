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
import lodashSet from 'lodash/set';
import lodashCloneDeep from 'lodash/cloneDeep';


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
import ImageAndVideo from 'app/common/image-and-video/v2/components/image-and-video.js';
import FormThread from 'app/common/forum/v2/components/form-thread.js';
import FormComment from 'app/common/forum/v2/components/form-comment.js';
import Comment from 'app/common/forum/v2/components/comment.js';

// import FormName from 'app/common/form/components/name.js';


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
import { ContainerStateGc } from 'app/@states/gc.js';






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
    forumThreads_id,
    // dataObj,
    enableAnonymity,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const classes = useStyles();
  const [panelExpanded, setPanelExpanded] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [showComment, setShowComment] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateLayout = ContainerStateLayout.useContainer();
  const stateGc = ContainerStateGc.useContainer();
  
  const {
    
    handleSnackbarOpen,
    handleDialogOpen,
    handleLoadingOpen,
    handleLoadingClose,
    handleScrollTo,
    
  } = stateLayout;
  
  const {
    
    setGameCommunityObj,
    forumThreadsObj,
    setForumThreadsObj,
    
  } = stateGc;
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * スレッドを削除する
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {string} forumThreads_id - DB forum-threads _id / 削除するスレッドのID
   */
  const handleDelete = async ({
    
    gameCommunities_id,
    userCommunities_id,
    forumThreads_id,
    
  }) => {
    
    
    try {
      
      
      // ---------------------------------------------
      //   _id が存在しない場合エラー
      // ---------------------------------------------
      
      if ((!gameCommunities_id && !forumThreads_id) || (!userCommunities_id && !forumThreads_id)) {
        throw new CustomError({ errorsArr: [{ code: 'cGHv25p8q', messageID: '1YJnibkmh' }] });
      }
      
      
      
      
      // ---------------------------------------------
      //   Loading Open
      // ---------------------------------------------
      
      handleLoadingOpen({});
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      setButtonDisabled(true);
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/forum/v2/components/thread.js - handleDelete
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   forumThreads_id: {green ${forumThreads_id}}
      // `);
      
      
      
      
      // ---------------------------------------------
      //   FormData
      // ---------------------------------------------
      
      const formDataObj = {
        
        gameCommunities_id,
        userCommunities_id,
        forumThreads_id,
        
      };
      
      
      // ---------------------------------------------
      //   Fetch
      // ---------------------------------------------
      
      let resultObj = {};
      
      if (gameCommunities_id) {
        
        resultObj = await fetchWrapper({
          
          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-threads/delete-gc`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
          
        });
        
      } else if (userCommunities_id) {
        
        resultObj = await fetchWrapper({
          
          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/forum-threads/delete-uc`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
          
        });
        
      }
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if ('errorsArr' in resultObj) {
        throw new CustomError({ errorsArr: resultObj.errorsArr });
      }
      
      
      
      
      // ---------------------------------------------
      //   State 削除
      // ---------------------------------------------
      
      const clonedForumThreadsObj = lodashCloneDeep(forumThreadsObj);
      
      const page = lodashGet(forumThreadsObj, ['page'], 1);
      const arr = lodashGet(forumThreadsObj, [`page${page}Obj`, 'arr'], []);
      const newArr = arr.filter(value => value !== forumThreads_id);
      lodashSet(clonedForumThreadsObj, [`page${page}Obj`, 'arr'], newArr);
      
      const dataObj = lodashGet(clonedForumThreadsObj, ['dataObj'], {});
      delete dataObj[forumThreads_id];
      
      setForumThreadsObj(clonedForumThreadsObj);
      
      
      // console.log(`
      //   ----- clonedForumThreadsObj -----\n
      //   ${util.inspect(clonedForumThreadsObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Game Community データ更新
      // ---------------------------------------------
      
      const gameCommunityObj = lodashGet(resultObj, ['data', 'gameCommunityObj'], {});
      setGameCommunityObj(gameCommunityObj);
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      handleSnackbarOpen({
        variant: 'success',
        messageID: 'KBPPfi4f9',
      });
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      handleSnackbarOpen({
        variant: 'error',
        errorObj,
      });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      setButtonDisabled(false);
      
      
      // ---------------------------------------------
      //   Loading Close
      // ---------------------------------------------
      
      handleLoadingClose();
      
      
    }
    
    
  };
  
  
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const dataObj = lodashGet(forumThreadsObj, ['dataObj', forumThreads_id], {});
  
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
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/forum/v2/components/thread.js
  // `);
  
  // console.log(`
  //   ----- formImagesAndVideosObj -----\n
  //   ${util.inspect(formImagesAndVideosObj, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
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
                
                setShowForm={setShowForm}
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
                        disabled={buttonDisabled}
                        onClick={
                          buttonDisabled
                            ?
                              () => {}
                            :
                              () => handleDialogOpen({
                              
                                title: 'スレッド削除',
                                description: 'スレッドを削除しますか？',
                                handle: handleDelete,
                                argumentsObj: {
                                  gameCommunities_id,
                                  forumThreads_id,
                                },
                                
                              })
                        }
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
                        onClick={() => setShowForm(true)}
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
            <div
              css={css`
                border-top: 1px dashed #585858;
                padding: 14px 0 0 0;
              `}
            >
              
              <FormComment
                gameCommunities_id={gameCommunities_id}
                userCommunities_id={userCommunities_id}
                forumThreads_id={forumThreads_id}
                enableAnonymity={enableAnonymity}
              />
              
            </div>
            
            
            {/* Comment */}
            <Comment
              urlID={urlID}
              gameCommunities_id={gameCommunities_id}
              userCommunityID={userCommunityID}
              userCommunities_id={userCommunities_id}
              forumThreads_id={forumThreads_id}
              // comments={comments}
              enableAnonymity={enableAnonymity}
            />
            
            
          </div>
          
          
        </ExpansionPanelDetails>
        
        
      </ExpansionPanel>
      
      
    </Element>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;