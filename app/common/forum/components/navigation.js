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


import styled from '@emotion/styled';

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
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

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

const cssTabIcon = css`
  && {
    min-width: 92px;
  }
`;


// const StyledIconButton = styled(IconButton)`
//   && {
//     width: 28px;
//     height: 28px;
//     margin: 0 10px 0 0;
//     padding: 0;
//   }
// `;




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// const ExpansionPanelDetailsBbsMenu = styled(ExpansionPanelDetails)`
//   && {
//     display: inline;
//     margin: 0;
//     padding: 0;
//   }
// `;


// --------------------------------------------------
//   Title
// --------------------------------------------------

// const StyledIconButton = styled(IconButton)`
//   && {
//     margin: 0 4px 0 0;
//     padding: 0;
//     width: 28px;
//     height: 28px;
//   }
// `;


// --------------------------------------------------
//   Tab
// --------------------------------------------------

// const TabsPaper = styled(Paper)`
//   && {
//     margin: 0 16px 0;
//     padding: 0;
//   }
// `;


// --------------------------------------------------
//   Thread List
// --------------------------------------------------

// const ThreadListTabBox = styled.div`
//   margin: 0;
//   padding: 10px 16px 0;
// `;

// const ThreadListTableWrapper = styled.div`
//   overflow-x: auto;
// `;

const ThreadListNameTableCell = styled(TableCell)`
  && {
    white-space: nowrap;
    min-width: 280px;
    cursor: pointer;
  }
`;




// --------------------------------------------------
//   Create Thread
// --------------------------------------------------

// const CreateThreadTabBox = styled.div`
//   && {
//     width: 100%;
//     // padding: 22px 14px 20px 14px;
//   }

//   // width: 100%;
//   // margin: 0;
//   // padding: 22px 14px 20px 14px;
//   // margin: 0 14px 0 0;
//   // background-color: pink;
// `;

const CreateThreadTabTypography = styled(Typography)`
  // width: 100%;
  // margin: 0;
  padding: 22px 16px 16px 16px;
  // margin: 0 14px 0 0;
  // background-color: pink;
`;



const CreateThreadNameTextField = styled(TextField)`
  && {
    width: 300px;
    margin: 0 0 4px 0;
    
    @media screen and (max-width: 480px) {
      width: 100%;
      // min-width: 100%;
    }
  }
`;

const CreateThreadTextareaAutosize = styled(TextareaAutosize)`
  && {
    width: 600px;
    max-width: 600px;
    border-radius: 4px;
    box-sizing: border-box;
    margin: 10px 0 10px 0;
    padding: 8px 12px;
    line-height: 1.6em;
    
    &:focus {
      outline: 1px #A9F5F2 solid;
    }
    
    @media screen and (max-width: 480px) {
      width: 100%;
      max-width: auto;
      resize: none;
    }
  }
`;

const CreateThreadButtonBox = styled.div`
  margin: 0 0 0 0;
`;


// --------------------------------------------------
//   Search
// --------------------------------------------------

// const SearchTabBox = styled.div`
//   width: 100%;
//   margin: 0;
//   padding: 22px 24px 16px;
// `;

const SearchTabTypography = styled(Typography)`
  padding: 16px;
`;

const SearchBox = styled.div`
  margin: 0 0 16px 0;
`;

const SearchTextField = styled(TextField)`
  && {
    margin: 10px 0 0 0;
  }
`;

const SearchDateTimeBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 15px 0 0 0;
`;

const SearchDateTimeTextField = styled(TextField)`
  && {
    margin: 10px 20px 0 0;
  }
`;

const SearchCheckBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 15px 0 0 0;
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
    
    this.props.stores.layout.handleButtonEnable({ _id: `${this.props._id}-forumNavigation` });
    
    
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { classes, stores, storeForum, intl, _id, sidebar } = this.props;
    
    
    // --------------------------------------------------
    //   Panel
    // --------------------------------------------------
    
    const panelExpanded = lodashGet(stores, ['layout', 'panelExpandedObj', `${_id}-forumNavigation`], true);
    const handlePanelExpand = lodashGet(stores, ['layout', 'handlePanelExpand'], '');
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = lodashGet(stores, ['layout', 'buttonDisabledObj', `${_id}-forumNavigation`], true);
    
    
    
    
    
    const {
      
      dataObj,
      handleEdit,
      handleReadThreadsList,
      
    } = storeForum;
    
    
    const openedTabNo = lodashGet(dataObj, [_id, 'openedTabNo'], 0);
    
    
    // --------------------------------------------------
    //   Thread List
    // --------------------------------------------------
    
    const threadListCount = lodashGet(dataObj, [_id, 'forumThreadsObj', 'count'], 0);
    const threadListPage = lodashGet(dataObj, [_id, 'threadListPage'], 1) - 1;
    const threadListLimit = lodashGet(dataObj, [_id, 'threadListLimit'], parseInt(process.env.FORUM_THREADS_LIMIT, 10));
    
    const forumThreadsArr = lodashGet(dataObj, [_id, 'forumThreadsObj', 'dataObj', `page${threadListPage + 1}Obj`, 'arr'], []);
    
    // const forumThreadsArr = lodashGet(dataObj, [_id, 'forumThreadsObj', 'dataObj', `page${threadListPage + 1}Arr`], []);
    
    // console.log(chalk`
    //   process.env.FORUM_THREADS_LIMIT: {green ${process.env.FORUM_THREADS_LIMIT}}
    // `);
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   openedTabNo: {green ${openedTabNo}}
    // `);
    
    // console.log(chalk`
    //   threadListCount: {green ${threadListCount}}
    //   threadListLimit: {green ${threadListLimit}}
    //   threadListPage: {green ${threadListPage}}
    // `);
    
    // console.log(`
    //   ----- dataObj[_id].forumThreadsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(dataObj[_id].forumThreadsObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`\n---------- forumThreadsArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(forumThreadsArr)));
    // console.log(`\n-----------------------------------\n`);
    
    
    
    // const createThreadName = stores.bbsNavigation.createThreadNameObj[id];
    // const createThreadRule = stores.bbsNavigation.createThreadRuleObj[id];
    
    // const searchKeyword = stores.bbsNavigation.searchKeywordObj[id];
    // const searchDateTimeStart = stores.bbsNavigation.searchDateTimeStartObj[id];
    // const searchDateTimeEnd = stores.bbsNavigation.searchDateTimeEndObj[id];
    // const searchThreadChecked = stores.bbsNavigation.searchThreadCheckedObj[id];
    // const searchCommentChecked = stores.bbsNavigation.searchCommentCheckedObj[id];
    // const searchReplyChecked = stores.bbsNavigation.searchReplyCheckedObj[id];
    // const searchImageChecked = stores.bbsNavigation.searchImageCheckedObj[id];
    // const searchVideoChecked = stores.bbsNavigation.searchVideoCheckedObj[id];
    // const searchMineChecked = stores.bbsNavigation.searchMineCheckedObj[id];
    
    
    // const {
    //   handleMenuButtonThreadList,
    //   handleMenuButtonNew,
    //   handleMenuButtonImage,
    //   handleMenuButtonVideo,
      
    //   handleOpenedTabNo,
      
    //   handleReadThread,
    //   handleThreadListSort,
    //   handleThreadListRowsPerPage,
    //   handleThreadListPage,
      
    //   handleCreateThreadNameObj,
    //   handleCreateThreadRuleObj,
    //   handleCreateThread,
      
    //   handleSearchKeyword,
    //   handleSearchDateTimeStart,
    //   handleSearchDateTimeEnd,
    //   handleSearchThreadChecked,
    //   handleSearchCommentChecked,
    //   handleSearchReplyChecked,
    //   handleSearchImageChecked,
    //   handleSearchVideoChecked,
    //   handleSearchMineChecked
    // } = stores.bbsNavigation;
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - Tab
    // --------------------------------------------------
    
    let componentTabs = '';
    
    if (sidebar) {
      
      componentTabs =
        <Tabs
          css={css`
            && {
              padding: 0 12px;
            }
          `}
          value={openedTabNo}
          indicatorColor="primary"
          textColor="primary"
          // onChange={(event, value) => handleOpenedTabNo(event, value, id)}
        >
          <Tooltip title="スレッド一覧">
            <Tab
              style={{
                minWidth: '92px',
              }}
              icon={<IconListAlt />}
            />
          </Tooltip>
          
          <Tooltip title="スレッド作成">
            <Tab
              style={{
                minWidth: '92px',
              }}
              icon={<IconCreate />}
            />
          </Tooltip>
          
          <Tooltip title="検索">
            <Tab
              style={{
                minWidth: '92px',
              }}
              icon={<IconSearch />}
            />
          </Tooltip>
        </Tabs>
      ;
      
    } else {
      
      componentTabs =
        <Tabs
          css={css`
            && {
              padding: 0 12px;
            }
          `}
          value={openedTabNo}
          indicatorColor="primary"
          textColor="primary"
          // onChange={(event, value) => handleOpenedTabNo(event, value, id)}
        >
          <Tab label="スレッド一覧" />
          <Tab label="スレッド作成" />
          <Tab label="検索" />
        </Tabs>
      ;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - スレッド一覧
    // --------------------------------------------------
    
    let componentThreadList = '';
    
    if (forumThreadsArr.length > 0) {
      
      
      // --------------------------------------------------
      //   テーブルの中身
      // --------------------------------------------------
      
      let componentTableDataArr = [];
      
      for (const [index, valueObj] of forumThreadsArr.entries()) {
        
        componentTableDataArr.push(
          <TableRow key={index}>
            <TableCell
              css={css`
                && {
                  ${sidebar && 'min-width: 268px;'}
                  cursor: pointer;
                  padding: 14px 0 14px 16px;
                  
                  @media screen and (max-width: 640px) {
                    min-width: 268px;
                  }
                }
              `}
              padding="none"
              component="th"
              scope="row"
              // onClick={() => handleReadThread(value.id)}
            >
              {valueObj.name}
            </TableCell>
            <TableCell css={cssTableCell}>{valueObj.updatedDate}</TableCell>
            <TableCell css={cssTableCell} align="right">{valueObj.comments}</TableCell>
            <TableCell css={cssTableCell} align="right">{valueObj.images}</TableCell>
            <TableCell css={cssTableCell} align="right">{valueObj.videos}</TableCell>
          </TableRow>
        );
        
      }
      
      
      componentThreadList =
        <React.Fragment>
          
          
          {/* Table */}
          <Table>
            
            {/* Head */}
            <TableHead>
              <TableRow>
                <TableCell css={cssTableCell}>名前</TableCell>
                <TableCell css={cssTableCell}>最終更新日</TableCell>
                <TableCell css={cssTableCell} align="right">コメント</TableCell>
                <TableCell css={cssTableCell} align="right">画像</TableCell>
                <TableCell css={cssTableCell} align="right">動画</TableCell>
              </TableRow>
            </TableHead>
            
            
            {/* Body */}
            <TableBody>
              {componentTableDataArr}
            </TableBody>
            
            
          </Table>
          
          
          {/* Pagination */}
          <TablePagination
            component="div"
            rowsPerPageOptions={[1, 10, 20, 50]}
            count={threadListCount}
            rowsPerPage={threadListLimit}
            page={threadListPage}
            labelRowsPerPage=""
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangeRowsPerPage={(eventObj) => handleEdit({
              pathArr: [_id, 'threadListLimit'],
              value: eventObj.target.value
            })}
            onChangePage={(eventObj, value) => handleReadThreadsList({
              _id,
              userCommunities_id: _id,
              page: value + 1,
            })}
          />
          
        </React.Fragment>
      ;
      
    }
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <ExpansionPanel
        css={css`
          margin: 0 !important;
        `}
        expanded={panelExpanded}
      >
        
        
        {/* Summary */}
        <ExpansionPanelSummary
          css={css`
            cursor: default !important;
            padding-right: 14px !important;
          `}
        >
          
          <div
            css={css`
              display: flex;
              flex-flow: row nowrap;
              align-items: center;
            `}
          >
            
            
            {/* Heading */}
            <div
              css={css`
                height: 28px;
              `}
            >
              <h2
                css={css`
                  font-size: 18px;
                  line-height: 1;
                  padding: 7px 0 0 0;
                `}
              >
                BBS
              </h2>
            </div>
            
            
            {/* Icon */}
            <div
              css={css`
                margin: 0 0 0 14px;
                // background-color: green;
              `}
            >
              
              
              {/* Tooltip内のIconButtonにemotionでスタイルを当てると、ビルド時にエラーがでるため、強引にstyleで当てている */}
              <Tooltip title="すべてのコメント">
                <IconButton
                  style={{
                    width: '28px',
                    height: '28px',
                    margin: '0 10px 0 0',
                    padding: 0,
                  }}
                  // css={cssIconButton}
                  // onClick={() => handlePanelExpand({ _id: 'test' })}
                  // onClick={handleMenuButtonThreadList}
                >
                  <IconList />
                </IconButton>
              </Tooltip>
              
              
              <Tooltip title="新しいコメント">
                <IconButton
                  style={{
                    width: '28px',
                    height: '28px',
                    margin: '0 10px 0 0',
                    padding: 0,
                  }}
                  // css={cssIconButton}
                  // onClick={handleMenuButtonNew}
                >
                  <IconNew />
                </IconButton>
              </Tooltip>
              
              
              <Tooltip title="画像付きのコメント">
                <IconButton
                  style={{
                    width: '28px',
                    height: '28px',
                    margin: '0 10px 0 0',
                    padding: 0,
                  }}
                  // css={cssIconButton}
                  // onClick={handleMenuButtonImage}
                >
                  <IconImage />
                </IconButton>
              </Tooltip>
              
              
              <Tooltip title="動画付きのコメント">
                <IconButton
                  style={{
                    width: '28px',
                    height: '28px',
                    margin: '0 10px 0 0',
                    padding: 0,
                  }}
                  // css={cssIconButton}
                  // onClick={handleMenuButtonVideo}
                >
                  <IconOndemandVideo />
                </IconButton>
              </Tooltip>
              
              
            </div>
            
          </div>
          
          
          {/* Expansion Button */}
          <div
            css={css`
              margin: 0 0 0 auto;
            `}
          >
            <IconButton
              css={css`
                && {
                  margin: 0;
                  padding: 4px;
                }
              `}
              onClick={() => handlePanelExpand({ _id: `${_id}-forumNavigation` })}
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
          
          
        </ExpansionPanelSummary>
        
        
        
         {/* Contents */}
        <ExpansionPanelDetails
          css={css`
            && {
              padding: 0;
            }
          `}
        >
          
          
          {/* Tab */}
          <Paper
            css={css`
              && {
                width: 100%;
                overflow-x: auto;
              }
            `}
          >
            
            
            {/* Tabs */}
            {componentTabs}
            
            
            {/* スレッド一覧 */}
            {openedTabNo === 0 &&
              <div
                css={css`
                  overflow-x: auto;
                  padding: 4px 0 0;
                `}
              >
                {componentThreadList}
              </div>
            }
            
            
          </Paper>
          
          
        </ExpansionPanelDetails>
        
        
      </ExpansionPanel>
    );
    
  }
  
});