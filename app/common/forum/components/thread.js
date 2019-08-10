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


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconAssignment from '@material-ui/icons/Assignment';
import IconPublic from '@material-ui/icons/Public';


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
    
    this.props.stores.layout.handleButtonEnable({ pathArr: [...this.pathArr, 'buttonDisabled'] });
    
    
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { classes, stores, storeForum, intl, gameCommunities_id, userCommunities_id } = this.props;
    
    // const communities_id = gameCommunities_id || userCommunities_id;
    
    
    
    
    // --------------------------------------------------
    //   Panel Expand Function
    // --------------------------------------------------
    
    const handlePanelExpand = lodashGet(stores, ['layout', 'handlePanelExpand'], '');
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: [...this.pathArr, 'buttonDisabled'] });
    
    
    
    
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
    
    const page = lodashGet(dataObj, [this.communities_id, 'forumThreadsObj', 'page'], 1);
    const arr = lodashGet(dataObj, [this.communities_id, 'forumThreadsObj', 'dataObj', `page${page}Obj`, 'arr'], []);
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- validationForumThreadsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(validationForumThreadsObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // console.log(chalk`
    //   /app/common/forum/components/thread.js
    //   page: {green ${page}}
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
    
    
    for (const [index, valueObj] of arr.entries()) {
      
      
      // --------------------------------------------------
      //   Property
      // --------------------------------------------------
      
      const forumThreads_id = lodashGet(valueObj, ['_id'], '');
      const imagesAndVideos_id = lodashGet(valueObj, ['imagesAndVideos_id'], '');
      const name = lodashGet(valueObj, ['name'], '');
      const description = lodashGet(valueObj, ['description'], '');
      const imagesAndVideosObj = lodashGet(valueObj, ['imagesAndVideosObj'], {});
      
      // 管理者権限がある、またはスレッドを建てた本人の場合、編集ボタンを表示する
      // const editable = lodashGet(valueObj, ['editable'], false);
      const editable = true;
      
      // --------------------------------------------------
      //   Show
      // --------------------------------------------------
      
      const showDescription = lodashGet(dataObj, [...this.pathArr, forumThreads_id, 'showDescription'], true);
      const showForm = lodashGet(dataObj, [...this.pathArr, forumThreads_id, 'showForm'], false);
      
      
      // --------------------------------------------------
      //   Panel
      // --------------------------------------------------
      
      const panelExpanded = stores.layout.handleGetPanelExpanded({ pathArr: [...this.pathArr, forumThreads_id, 'panelExpanded'] });
      
      
      
      
      componentArr.push(
        
        <ExpansionPanel
          css={css`
            margin: 16px 0 !important;
          `}
          expanded={panelExpanded}
          key={index}
        >
          
          
          {/* Summary */}
          <ExpansionPanelSummary
            css={css`
              && {
                cursor: default !important;
                background-color: white !important;
                margin: 20px 0 0 0 !important; 
                
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
                  imagesAndVideos_id={imagesAndVideos_id}
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
                    // background-color: pink;
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
                      onClick={() => handlePanelExpand({ pathArr: [...this.pathArr, forumThreads_id, 'panelExpanded'] })}
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
                      margin: 12px 0 0 0;
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
                      onClick={() => handleEdit({
                        pathArr: [...this.pathArr, forumThreads_id, 'showDescription'],
                        value: !showDescription
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
                      {forumThreads_id}
                    </div>
                    
                  </div>
                  
                  
                  {/* Edit Button */}
                  {editable &&
                    <Button
                      css={css`
                        && {
                          font-size: 12px;
                          height: 22px;
                          min-width: 36px;
                          margin: 2px 0 0 10px;
                          padding: 0 2px;
                        }
                      `}
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit({
                        pathArr: [...this.pathArr, forumThreads_id, 'showForm'],
                        value: !showForm
                      })}
                    >
                      編集
                    </Button>
                  }
                  
                  
                </div>
                
                
                {/* Description */}
                {showDescription &&
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
                    <Paragraph text={description} />
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
                gameCommunities_id={gameCommunities_id}
                userCommunities_id={userCommunities_id}
                forumThreads_id={forumThreads_id}
              />
              
              
            </div>
            
          </ExpansionPanelDetails>
          
        </ExpansionPanel>
        
      );
      
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        {componentArr}
        
      </React.Fragment>
    );
    
  }
  
});