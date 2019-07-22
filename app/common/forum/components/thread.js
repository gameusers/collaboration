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
import TextareaAutosize from 'react-autosize-textarea';
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
import Tooltip from '@material-ui/core/Tooltip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// import Grow from '@material-ui/core/Grow';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconList from '@material-ui/icons/List';
import IconNew from '@material-ui/icons/FiberNew';
import IconImage from '@material-ui/icons/Image';
import IconOndemandVideo from '@material-ui/icons/OndemandVideo';
import IconListAlt from '@material-ui/icons/ListAlt';
import IconCreate from '@material-ui/icons/Create';
import IconSearch from '@material-ui/icons/Search';

import IconAssignment from '@material-ui/icons/Assignment';
import IconPublic from '@material-ui/icons/Public';
import IconEdit from '@material-ui/icons/Edit';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationForumThreadsName } = require('../../../@database/forum-threads/validations/name');


// ---------------------------------------------
//   Components
// ---------------------------------------------

import FormThread from './form-thread';
import Paragraph from '../../layout/components/paragraph';




// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const stylesObj = {
  
  label: {
    fontSize: 14
  },
  
};


// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

// Tooltip内のIconButtonにemotionでスタイルを当てると、ビルド時にエラーがでるため、強引にstyleで当てている。
// 将来的にバグ？が解消するかもしれないので、以下は消さないように
const cssIconButton = css`
  && {
    width: 28px;
    height: 28px;
    margin: 0 10px 0 0;
    padding: 0;
  }
`;

const cssTableCell = css`
  && {
    white-space: nowrap;
    padding: 14px 16px 14px 16px !important;
  }
`;




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
  }
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount(){
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    const _id = this.props.gameCommunities_id || this.props.userCommunities_id;
    this.props.stores.layout.handleButtonEnable({ _id: `${_id}-forumThread` });
    
    
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { classes, stores, storeForum, intl, gameCommunities_id, userCommunities_id } = this.props;
    
    const _id = gameCommunities_id || userCommunities_id;
    
    
    
    
    // --------------------------------------------------
    //   Panel
    // --------------------------------------------------
    
    // const panelExpanded = lodashGet(stores, ['layout', 'panelExpandedObj', `${_id}-forum`], true);
    const handlePanelExpand = lodashGet(stores, ['layout', 'handlePanelExpand'], '');
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    // const buttonDisabled = lodashGet(stores, ['layout', 'buttonDisabledObj', `${_id}-forum`], true);
    
    
    
    
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
    
    const page = lodashGet(dataObj, [_id, 'forumThreadsObj', 'page'], 1);
    const arr = lodashGet(dataObj, [_id, 'forumThreadsObj', 'dataObj', `page${page}Obj`, 'arr'], []);
    
    
    // --------------------------------------------------
    //   Search
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
    //   Component - Forum
    // --------------------------------------------------
    
    const componentForum = [];
    
    
    for (const [index, valueObj] of arr.entries()) {
      
      
      // --------------------------------------------------
      //   Property
      // --------------------------------------------------
      
      const forumThreads_id = lodashGet(valueObj, ['_id'], '');
      const name = lodashGet(valueObj, ['name'], '');
      const description = lodashGet(valueObj, ['description'], '');
      
      // 管理者権限がある、またはスレッドを建てた本人の場合、編集ボタンを表示する
      // const editable = lodashGet(valueObj, ['editable'], false);
      const editable = true;
      
      // --------------------------------------------------
      //   Show
      // --------------------------------------------------
      
      const showDescription = lodashGet(dataObj, [_id, forumThreads_id, 'showDescription'], false);
      const showForm = lodashGet(dataObj, [_id, forumThreads_id, 'showForm'], false);
      
      
       // --------------------------------------------------
      //   Panel
      // --------------------------------------------------
      
      const panelExpanded = lodashGet(stores, ['layout', 'panelExpandedObj', `${_id}-${forumThreads_id}`], true);
      
      
      // --------------------------------------------------
      //   Button - Disabled
      // --------------------------------------------------
      
      const buttonDisabled = lodashGet(stores, ['layout', 'buttonDisabledObj', `${_id}-forumThread`], true);
      
      
      
      
      componentForum.push(
        
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
                margin: 0;
                
                @media screen and (max-width: 480px) {
                  padding: 0 16px;
                }
              }
            `}
          >
            
            
            {/* Container */}
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
                
                
                {/* Container */}
                <div
                  css={css`
                    display: flex;
                    flex-flow: column nowrap;
                  `}
                >
                  
                  
                  {/* h2 */}
                  <h2
                    css={css`
                      font-weight: bold;
                      font-size: 18px;
                      margin: 0 0 4px 0;
                    `}
                  >
                    {name}
                  </h2>
                  
                  
                  {/* Information */}
                  <div
                    css={css`
                      display: flex;
                      flex-flow: row wrap;
                      font-size: 12px;
                    `}
                  >
                    
                    {/* Show Thread Description */}
                    <div
                      css={css`
                        display: flex;
                        flex-flow: row nowrap;
                        // align-items: center;
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
                          pathArr: [_id, forumThreads_id, 'showDescription'],
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
                          pathArr: [_id, forumThreads_id, 'showForm'],
                          value: !showForm
                        })}
                      >
                        編集
                      </Button>
                    }
                    
                    
                  </div>
                  
                  
                </div>
                
                
                
                
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
                    onClick={() => handlePanelExpand({ _id: `${_id}-${forumThreads_id}` })}
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
              
              
              
              
              {/* Description */}
              {showDescription &&
                <div
                  css={css`
                    font-size: 14px;
                    line-height: 1.6em;
                    border-left: 4px solid #A4A4A4;
                    margin: 12px 0 10px 3px;
                    padding: 0 0 0 18px;
                  `}
                >
                  <Paragraph text={description} />
                </div>
              }
              
              
              
              
              {/* Form */}
              {showForm &&
                <FormThread
                  gameCommunities_id={gameCommunities_id}
                  userCommunities_id={userCommunities_id}
                  forumThreads_id={forumThreads_id}
                />
              }
              
              
              
              
            </div>
            
            
          </ExpansionPanelSummary>
          
          
          
          
          {/* Contents */}
          <ExpansionPanelDetails>
            
            <div
              css={css`
                width: 100%;
              `}
            >
              
              AAA
              
              {/*<FormPost
                id={`${value.id}-comment-insert`}
                buttonLabel1="コメントする"
                buttonHandle1={() => handleCommentInsert(communityId, value.id, `${value.id}-comment-insert`)}
              />*/}
              
              
              {/*<CommentReply
                communityId={communityId}
                threadId={value.id}
                commentArr={value.commentArr}
              />*/}
              
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
        
        {componentForum}
        
      </React.Fragment>
    );
    
  }
  
});