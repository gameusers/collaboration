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


import styled from 'styled-components';

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

import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconList from '@material-ui/icons/List';
import IconNew from '@material-ui/icons/FiberNew';
import IconImage from '@material-ui/icons/Image';
import IconOndemandVideo from '@material-ui/icons/OndemandVideo';
import IconEventNote from '@material-ui/icons/EventNote';
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

const cssIconButton = css`
  && {
    width: 28px;
    height: 28px;
    margin: 0 10px 0 0;
    padding: 0;
  }
`;




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

const ThreadListTabBox = styled.div`
  margin: 0;
  padding: 10px 16px 0;
`;

const ThreadListTableWrapper = styled.div`
  overflow-x: auto;
`;

const ThreadListNameTableCell = styled(TableCell)`
  && {
    white-space: nowrap;
    min-width: 280px;
    cursor: pointer;
  }
`;

const ThreadListTableCell = styled(TableCell)`
  && {
    white-space: nowrap;
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
@inject('stores')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    super(props);
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { classes, intl, stores, id } = this.props;
    
    
    // const openedTabNo = stores.bbsNavigation.openedTabNoObj[id];
    
    // const threadListOrderBy = stores.bbsNavigation.threadListOrderByObj[id];
    // const threadListOrder = stores.bbsNavigation.threadListOrderObj[id];
    // const threadListCount = stores.bbsNavigation.threadListCountObj[id];
    // const threadListRowsPerPage = stores.bbsNavigation.threadListRowsPerPageObj[id];
    // const threadListPage = stores.bbsNavigation.threadListPageObj[id];
    // const threadListArr = stores.bbsNavigation.threadListObj[id];
    
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
    //   コンポーネント作成 - スレッド一覧
    // --------------------------------------------------
    
    let componentThreadListArr = [];
    
    // if (threadListArr) {
      
      
    //   // --------------------------------------------------
    //   //   テーブルの中身
    //   // --------------------------------------------------
      
    //   let componentTableDataArr = [];
      
    //   for (const [index, value] of threadListArr.entries()) {
        
    //     componentTableDataArr.push(
    //       <TableRow key={index}>
    //         <ThreadListNameTableCell
    //           component="th"
    //           scope="row"
    //           onClick={() => handleReadThread(value.id)}
    //         >
    //           {value.name}
    //         </ThreadListNameTableCell>
    //         <TableCell>{value.updatedDate}</TableCell>
    //         <TableCell numeric>{value.comment}</TableCell>
    //         <TableCell numeric>{value.reply}</TableCell>
    //         <TableCell numeric>{value.image}</TableCell>
    //         <TableCell numeric>{value.video}</TableCell>
    //       </TableRow>
    //     );
        
    //   }
      
      
    //   componentThreadListArr.push(
    //     <div key="threadList">
          
    //       <ThreadListTableWrapper>
            
    //         <Table>
              
    //           <TableHead>
    //             <TableRow>
                
    //               <ThreadListTableCell>
    //                 名前
    //               </ThreadListTableCell>
                  
    //               <ThreadListTableCell>
    //                 <TableSortLabel
    //                   active={threadListOrderBy === 'updatedDate'}
    //                   direction={threadListOrder}
    //                   onClick={() => handleThreadListSort(id, 'updatedDate')}
    //                 >
    //                   最終更新日
    //                 </TableSortLabel>
    //               </ThreadListTableCell>
                  
    //               <ThreadListTableCell numeric>
    //                 <TableSortLabel
    //                   active={threadListOrderBy === 'comment'}
    //                   direction={threadListOrder}
    //                   onClick={() => handleThreadListSort(id, 'comment')}
    //                 >
    //                   コメント
    //                 </TableSortLabel>
    //               </ThreadListTableCell>
                  
    //               <ThreadListTableCell numeric>
    //                 <TableSortLabel
    //                   active={threadListOrderBy === 'reply'}
    //                   direction={threadListOrder}
    //                   onClick={() => handleThreadListSort(id, 'reply')}
    //                 >
    //                   返信
    //                 </TableSortLabel>
    //               </ThreadListTableCell>
                  
    //               <ThreadListTableCell numeric>
    //                 <TableSortLabel
    //                   active={threadListOrderBy === 'image'}
    //                   direction={threadListOrder}
    //                   onClick={() => handleThreadListSort(id, 'image')}
    //                 >
    //                   画像
    //                 </TableSortLabel>
    //               </ThreadListTableCell>
                  
    //               <ThreadListTableCell numeric>
    //                 <TableSortLabel
    //                   active={threadListOrderBy === 'video'}
    //                   direction={threadListOrder}
    //                   onClick={() => handleThreadListSort(id, 'video')}
    //                 >
    //                   動画
    //                 </TableSortLabel>
    //               </ThreadListTableCell>
                  
    //             </TableRow>
    //           </TableHead>
              
    //           <TableBody>
    //             {componentTableDataArr}
    //           </TableBody>
              
    //         </Table>
            
    //       </ThreadListTableWrapper>
        
    //       <TablePagination
    //         component="div"
    //         count={threadListCount}
    //         rowsPerPage={threadListRowsPerPage}
    //         page={threadListPage}
    //         labelRowsPerPage=""
    //         backIconButtonProps={{
    //           'aria-label': 'Previous Page',
    //         }}
    //         nextIconButtonProps={{
    //           'aria-label': 'Next Page',
    //         }}
    //         onChangeRowsPerPage={(event) => handleThreadListRowsPerPage(event, id)}
    //         onChangePage={(event, value) => handleThreadListPage(event, value, id)}
    //       />
          
    //     </div>
    //   );
      
    // }
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <ExpansionPanel
        // expanded={stores.layout.returnPanelExpanded(id)}
        expanded={true}
      >
        
        
        {/* Summary */}
        <ExpansionPanelSummary
          css={css`
            cursor: default !important;
          `}
          expandIcon={
            <IconExpandMore
              // onClick={() => stores.layout.handlePanelExpanded(id)}
            />
          }
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
              
              
              <Tooltip title="すべてのコメント">
                <IconButton
                  css={cssIconButton}
                  // onClick={handleMenuButtonThreadList}
                >
                  <IconList />
                </IconButton>
              </Tooltip>
              
              
              <Tooltip title="新しいコメント">
                <IconButton
                  css={cssIconButton}
                  // onClick={handleMenuButtonNew}
                >
                  <IconNew />
                </IconButton>
              </Tooltip>
              
              
              <Tooltip title="画像付きのコメント">
                <IconButton
                  css={cssIconButton}
                  // onClick={handleMenuButtonImage}
                >
                  <IconImage />
                </IconButton>
              </Tooltip>
              
              
              <Tooltip title="動画付きのコメント">
                <IconButton
                  css={cssIconButton}
                  // onClick={handleMenuButtonVideo}
                >
                  <IconOndemandVideo />
                </IconButton>
              </Tooltip>
              
              
            </div>
            
          </div>
          
        </ExpansionPanelSummary>
        
        
        
         {/* Contents */}
        <ExpansionPanelDetails
          css={css`
            && {
              // display: inline;
              // margin: 0;
              padding: 0;
            }
          `}
        >
          
          
          {/* Tab */}
          <Paper
            css={css`
              && {
                // margin: 0 16px 0;
                // padding: 0;
              }
            `}
          >
            <Tabs
              // value={openedTabNo}
              value={0}
              indicatorColor="primary"
              textColor="primary"
              // onChange={(event, value) => handleOpenedTabNo(event, value, id)}
            >
              <Tab label="スレッド一覧" />
              <Tab label="スレッド作成" />
              <Tab label="検索" />
            </Tabs>
          </Paper>
          
        </ExpansionPanelDetails>
        
        
        
      </ExpansionPanel>
    );
    
  }
  
});