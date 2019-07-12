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


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationForumThreadsName } = require('../../../@database/forum-threads/validations/name');


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from '../../layout/components/panel';
import ImageAndVideoForm from '../../image-and-video/components/form';



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
    this.props.stores.layout.handleButtonEnable({ _id: `${_id}-forum` });
    
    
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
    
    const panelExpanded = lodashGet(stores, ['layout', 'panelExpandedObj', `${_id}-forum`], true);
    const handlePanelExpand = lodashGet(stores, ['layout', 'handlePanelExpand'], '');
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = lodashGet(stores, ['layout', 'buttonDisabledObj', `${_id}-forum`], true);
    
    
    
    
    // --------------------------------------------------
    //   Forum
    // --------------------------------------------------
    
    const {
      
      dataObj,
      handleEdit,
      handleChangeThreadRowsPerPage,
      handleReadThreadsList,
      handleSubmitCreateThread,
      
    } = storeForum;
    
    
    // --------------------------------------------------
    //   Thread List
    // --------------------------------------------------
    
    const forumArr = [1];
    
    // const threadListCount = lodashGet(dataObj, [_id, 'forumThreadsObj', 'count'], 0);
    // const threadListPage = lodashGet(dataObj, [_id, 'forumThreadsObj', 'page'], 1) - 1;
    // const threadListLimit = lodashGet(dataObj, [_id, 'forumThreadsObj', 'limit'], parseInt(process.env.FORUM_THREADS_LIMIT, 10));
    
    // const forumThreadsArr = lodashGet(dataObj, [_id, 'forumThreadsObj', 'dataObj', `page${threadListPage + 1}Obj`, 'arr'], []);
    
    
    // // --------------------------------------------------
    // //   Create Thread
    // // --------------------------------------------------
    
    // const createThreadName = lodashGet(dataObj, [_id, 'createThreadObj', 'name'], '');
    // const createThreadDescription = lodashGet(dataObj, [_id, 'createThreadObj', 'description'], '');
    
    // const validationForumThreadsObj = validationForumThreadsName({ value: createThreadName });
    
    
    // --------------------------------------------------
    //   Search
    // --------------------------------------------------
    
    // const searchKeyword = lodashGet(dataObj, [_id, 'searchObj', 'keyword'], '');
    
    
    // console.log(`
    //   ----- validationForumThreadsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(validationForumThreadsObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // console.log(chalk`
    //   navigation.js
    //   _id: {green ${_id}}
    //   openedTabNo  : {green ${openedTabNo}}
    // `);
    
    // console.log(chalk`
    //   createThreadName: {green ${createThreadName} / ${typeof createThreadName}}
    // `);
    
    // console.log(chalk`
    //   threadListCount: {green ${threadListCount}}
    //   threadListLimit: {green ${threadListLimit}}
    //   threadListPage: {green ${threadListPage}}
    // `);
    
    // console.log(`
    //   ----- dataObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(dataObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- dataObj[_id].forumThreadsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(dataObj[_id].forumThreadsObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    
    // --------------------------------------------------
    //   Component - Forum
    // --------------------------------------------------
    
    const componentForum = [];
    
    
    for (const [index, valueObj] of forumArr.entries()) {
      
      // console.log(`value.commentArr`);
      // console.dir(value.commentArr);
      
      
      // 管理者権限がある、またはスレッドを建てた本人の場合、編集ボタンを表示する
      // const editable = administrator || loginUserId === value.creatorId ? true : false;
      const editable = true;
      
      
      // const threadUpdateFormName = threadUpdateFormNameObj[value.id];
      // const threadUpdateFormDescription = threadUpdateFormDescriptionObj[value.id];
      
      
      componentForum.push(
        
        <ExpansionPanel
          expanded={panelExpanded}
          key={index}
        >
          
          {/* Title */}
          <ExpansionPanelSummary
            css={css`
              && {
                margin: 0;
                
                @media screen and (max-width: 480px) {
                  padding: 0 16px;
                }
              }
            `}
          >
            
            
            <div
              css={css`
                display: flex;
                flex-flow: column nowrap;
              `}
            >
            
            
            <h2
              css={css`
                font-weight: bold;
                font-size: 18px;
              `}
            >
              雑談スレッド
            </h2>
            
            
            <div
              css={css`
                display: flex;
                flex-flow: row wrap;
                font-size: 12px;
              `}
            >
            
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
                  `}
                  // onClick={() => handleThreadDescriptionOpenObj(value.id)}
                >
                  スレッドについて
                </div>
                
              </div>
              
            </div>
            
            
            
            {/* Expansion Button */}
            <div
              css={css`
                margin: 0 0 0 auto;
                padding: 0;
              `}
            >
              
              <IconButton
                css={css`
                  && {
                    margin: 0;
                    padding: 4px;
                  }
                `}
                onClick={() => handlePanelExpand({ _id })}
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
            
            
          </ExpansionPanelSummary>
          
          
          
          {/* Contents */}
          {/*<ContentsExpansionPanelDetails>
            
            <ContentsContainer>
              
              <FormPost
                id={`${value.id}-comment-insert`}
                buttonLabel1="コメントする"
                buttonHandle1={() => handleCommentInsert(communityId, value.id, `${value.id}-comment-insert`)}
              />
              
              
              <CommentReply
                communityId={communityId}
                threadId={value.id}
                commentArr={value.commentArr}
              />
              
            </ContentsContainer>
            
          </ContentsExpansionPanelDetails>*/}
          
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