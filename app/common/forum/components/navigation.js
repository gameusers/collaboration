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
// import TextareaAutosize from 'react-autosize-textarea';
import Cookies from 'js-cookie';
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


// ---------------------------------------------
//   Modules
// ---------------------------------------------

// import { getCookie } from '../../../@modules/cookie';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

// const { validationForumThreadsName } = require('../../../@database/forum-threads/validations/name');


// ---------------------------------------------
//   Components
// ---------------------------------------------

import FormThread from './form-thread';




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
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    const communities_id = this.props.gameCommunities_id || this.props.userCommunities_id;
    this.pathArr = [communities_id, 'navigationObj'];
    
    
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
      // sidebar
      
    } = this.props;
    
    const communities_id = gameCommunities_id || userCommunities_id;
    
    
    // --------------------------------------------------
    //   Pathname
    // --------------------------------------------------
    
    const pathname = lodashGet(stores, ['layout', 'pathname'], '');
    
    
    
    
    // --------------------------------------------------
    //   Panel
    // --------------------------------------------------
    
    const handlePanelExpand = lodashGet(stores, ['layout', 'handlePanelExpand'], () => {});
    const panelExpanded = stores.layout.handleGetPanelExpanded({ pathArr: this.pathArr });
    
    
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
      handleReadThreadsList,
      
    } = storeForum;
    
    const openedTabNo = lodashGet(dataObj, [...this.pathArr, 'openedTabNo'], 0);
    
    
    // --------------------------------------------------
    //   Thread List
    // --------------------------------------------------
    
    const threadListCount = lodashGet(dataObj, [communities_id, 'forumThreadsForListObj', 'count'], 0);
    const threadListPage = lodashGet(dataObj, [communities_id, 'forumThreadsForListObj', 'page'], 1);
    const threadListLimit = parseInt((stores.data.getCookie({ key: 'forumThreadListLimit' }) || process.env.FORUM_THREAD_LIST_LIMIT), 10);
    const forumThreadsArr = lodashGet(dataObj, [communities_id, 'forumThreadsForListObj', `page${threadListPage}Obj`, 'arr'], []);
    
    
    
    
    // --------------------------------------------------
    //   Search
    // --------------------------------------------------
    
    // const searchKeyword = lodashGet(dataObj, [_id, 'searchObj', 'keyword'], '');
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- validationForumThreadsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(validationForumThreadsObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumThreadsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsArr)), { colors: true, depth: null })}\n
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
    //   threadListPage: {green ${threadListPage}}
    //   threadListLimit: {green ${threadListLimit}}
    // `);
    
    // console.log(`
    //   ----- dataObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(dataObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- dataObj[_id].forumThreadsForListObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(dataObj[_id].forumThreadsForListObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - Tab
    // --------------------------------------------------
    
    let componentTabs = '';
    
    componentTabs =
      <React.Fragment>
        
        
        {/* PC＆タブレット用 - タブをテキストで表示する */}
        <Tabs
          css={css`
            && {
              padding: 0 12px;
              display: none;
              
              @media screen and (max-width: 947px) {
                display: inline;
              }
            }
          `}
          value={openedTabNo}
          indicatorColor="primary"
          textColor="primary"
          
          onChange={(eventObj, value) => handleEdit({
            pathArr: [...this.pathArr, 'openedTabNo'],
            value
          })}
        >
          
          <Tab label="スレッド一覧" />
          
          <Tab label="スレッド作成" />
          
        </Tabs>
        
        
        
        
        {/* スマートフォン用 - タブをアイコンで表示する */}
        <Tabs
          css={css`
            && {
              padding: 0 12px;
              
              @media screen and (max-width: 947px) {
                display: none;
              }
            }
          `}
          value={openedTabNo}
          indicatorColor="primary"
          textColor="primary"
          
          onChange={(eventObj, value) => handleEdit({
            pathArr: [...this.pathArr, 'openedTabNo'],
            value
          })}
        >
          
          
          {/* スレッド一覧 */}
          <Tooltip
            css={css`
              && {
                @media screen and (max-width: 947px) {
                  display: none;
                }
              }
            `}
            title="スレッド一覧"
          >
            <Tab
              style={{
                minWidth: '92px',
              }}
              icon={<IconListAlt />}
            />
          </Tooltip>
          
          
          {/* スレッド作成 */}
          <Tooltip
            css={css`
              && {
                @media screen and (max-width: 947px) {
                  display: none;
                }
              }
            `}
            title="スレッド作成"
          >
            <Tab
              style={{
                minWidth: '92px',
              }}
              icon={<IconCreate />}
            />
          </Tooltip>
          
          
        </Tabs>
        
        
      </React.Fragment>
    ;
    
    
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - スレッド一覧
    // --------------------------------------------------
    
    let componentThreadList = '';
    
    if (forumThreadsArr.length > 0) {
      
      
      // --------------------------------------------------
      //   テーブルの中身
      // --------------------------------------------------
      
      let componentTableDataArr = [];
      
      
      for (const [index, forumThreads_id] of forumThreadsArr.entries()) {
        
        const threadsDataObj = lodashGet(dataObj, [communities_id, 'forumThreadsForListObj', 'dataObj', forumThreads_id], {});
        
        
        // --------------------------------------------------
        //   Link
        // --------------------------------------------------
        
        let linkHref = '';
        let linkAs = '';
        
        if (userCommunityID) {
          linkHref = `/uc/[userCommunityID]/forum/[forumID]?userCommunityID=${userCommunityID}&forumID=${forumThreads_id}`;
          linkAs = `/uc/${userCommunityID}/forum/${forumThreads_id}`;
        }
        
        // console.log(userCommunityID);
        // console.log(forumThreads_id);
        // console.log(pathname);
        
        
        // --------------------------------------------------
        //   リンクあり
        // --------------------------------------------------
        
        let tableCellName = 
          <Link href={linkHref} as={linkAs}>
            <TableCell
              css={css`
                && {
                  min-width: 268px;
                  cursor: pointer;
                  padding: 14px 0 14px 16px;
                }
              `}
              padding="none"
              component="th"
              scope="row"
            >
              <a>{threadsDataObj.name}</a>
            </TableCell>
          </Link>
        ;
        
        
        // --------------------------------------------------
        //   リンクなし（現在、表示しているスレッドの場合）
        // --------------------------------------------------
        
        if (pathname.indexOf(forumThreads_id) !== -1) {
          
          tableCellName = 
            <TableCell
              css={css`
                && {
                  min-width: 268px;
                  padding: 14px 0 14px 16px;
                }
              `}
              padding="none"
              component="th"
              scope="row"
            >
              {threadsDataObj.name}
            </TableCell>
          ;
          
        }
        
        
        componentTableDataArr.push(
          <TableRow key={index}>
            {tableCellName}
            <TableCell css={cssTableCell}>{threadsDataObj.updatedDate}</TableCell>
            <TableCell css={cssTableCell} align="right">{threadsDataObj.comments}</TableCell>
            <TableCell css={cssTableCell} align="right">{threadsDataObj.replies}</TableCell>
            <TableCell css={cssTableCell} align="right">{threadsDataObj.images}</TableCell>
            <TableCell css={cssTableCell} align="right">{threadsDataObj.videos}</TableCell>
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
                <TableCell css={cssTableCell} align="right">返信</TableCell>
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
            rowsPerPageOptions={[5, 10, 20, 50]}
            count={threadListCount}
            rowsPerPage={threadListLimit}
            page={threadListPage - 1}
            labelRowsPerPage=""
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangeRowsPerPage={(eventObj) => handleReadThreadsList({
              pathArr: this.pathArr,
              temporaryDataID,
              gameCommunities_id,
              userCommunities_id,
              page: 1,
              changeLimit: eventObj.target.value,
            })}
            onChangePage={(eventObj, value) => handleReadThreadsList({
              pathArr: this.pathArr,
              temporaryDataID,
              gameCommunities_id,
              userCommunities_id,
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
                Forum
              </h2>
            </div>
            
            
            {/* Icon */}
            {/*<div
              css={css`
                margin: 0 0 0 14px;
                // background-color: green;
              `}
            >*/}
              
              
              {/* Tooltip内のIconButtonにemotionでスタイルを当てると、ビルド時にエラーがでるため、強引にstyleで当てている */}
              {/*<Tooltip title="すべてのコメント">
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
              
              
            </div>*/}
            
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
              onClick={() => handlePanelExpand({ pathArr: this.pathArr })}
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
            
            
            
            
            {/* Thread List */}
            {openedTabNo === 0 &&
              <div
                css={css`
                  padding: 4px 0 0;
                `}
              >
                {componentThreadList}
              </div>
            }
            
            
            
            
            {/* Thread Form */}
            {openedTabNo === 1 &&
              <div
                css={css`
                  padding: 0 16px 16px;
                `}
              >
                <FormThread
                  gameCommunities_id={gameCommunities_id}
                  userCommunities_id={userCommunities_id}
                  forumThreads_id=""
                  imagesAndVideos_id=""
                />
              </div>
            }
            
            
            
            
            {/* Search */}
            {openedTabNo === 2 &&
              {/*<div
                css={css`
                  padding: 0 16px 16px;
                `}
              >
                
                
                <div
                  css={css`
                    margin: 0 0 16px 0;
                  `}
                >
                  
                  <TextField
                    css={css`
                      && {
                        width: 100%;
                        max-width: 500px;
                      }
                    `}
                    id="createTreadName"
                    label="検索キーワード"
                    value={lodashGet(dataObj, [...this.pathArr, 'searchObj', 'keyword'], '')}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...this.pathArr, 'searchObj', 'keyword'],
                      value: eventObj.target.value
                    })}
                    // error={validationForumThreadsObj.error}
                    // helperText={intl.formatMessage({ id: validationForumThreadsObj.messageID }, { numberOfCharacters: validationForumThreadsObj.numberOfCharacters })}
                    margin="normal"
                    inputProps={{
                      maxLength: 20,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconSearch />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <div
                    css={css`
                      display: flex;
                      flex-flow: row wrap;
                      margin: 6px 0 0 0;
                    `}
                  >
                    
                    <TextField
                      css={css`
                        && {
                          margin: 12px 20px 0 0;
                        }
                      `}
                      id="date-start"
                      label="期間 - 開始日"
                      type="date"
                      value={lodashGet(dataObj, [...this.pathArr, 'searchObj', 'dateStart'], '')}
                      onChange={(eventObj) => handleEdit({
                        pathArr: [...this.pathArr, 'searchObj', 'dateStart'],
                        value: eventObj.target.value
                      })}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    
                    <TextField
                      css={css`
                        && {
                          margin: 12px 0 0 0;
                        }
                      `}
                      id="date-end"
                      label="期間 - 終了日"
                      type="date"
                      value={lodashGet(dataObj, [...this.pathArr, 'searchObj', 'dateEnd'], '')}
                      onChange={(eventObj) => handleEdit({
                        pathArr: [...this.pathArr, 'searchObj', 'dateEnd'],
                        value: eventObj.target.value
                      })}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    
                  </div>
                  
                  
                  <div
                    css={css`
                      display: flex;
                      flex-flow: row wrap;
                      margin: 16px 0 0 0;
                    `}
                  >
                    
                    <FormControlLabel
                      classes={{
                        label: classes.label
                      }}
                      control={
                        <Checkbox
                          value={lodashGet(dataObj, [...this.pathArr, 'searchObj', 'checkThread'], false)}
                          onChange={(eventObj) => handleEdit({
                            pathArr: [...this.pathArr, 'searchObj', 'checkThread'],
                            value: eventObj.target.checked
                          })}
                        />
                      }
                      label="スレッド"
                    />
                    
                    <FormControlLabel
                      classes={{
                        label: classes.label
                      }}
                      control={
                        <Checkbox
                          value={lodashGet(dataObj, [...this.pathArr, 'searchObj', 'checkComment'], false)}
                          onChange={(eventObj) => handleEdit({
                            pathArr: [...this.pathArr, 'searchObj', 'checkComment'],
                            value: eventObj.target.checked
                          })}
                        />
                      }
                      label="コメント"
                    />
                    
                    <FormControlLabel
                      classes={{
                        label: classes.label
                      }}
                      control={
                        <Checkbox
                          value={lodashGet(dataObj, [...this.pathArr, 'searchObj', 'checkImage'], false)}
                          onChange={(eventObj) => handleEdit({
                            pathArr: [...this.pathArr, 'searchObj', 'checkImage'],
                            value: eventObj.target.checked
                          })}
                        />
                      }
                      label="画像あり"
                    />
                    
                    <FormControlLabel
                      classes={{
                        label: classes.label
                      }}
                      control={
                        <Checkbox
                          value={lodashGet(dataObj, [...this.pathArr, 'searchObj', 'checkVideo'], false)}
                          onChange={(eventObj) => handleEdit({
                            pathArr: [...this.pathArr, 'searchObj', 'checkVideo'],
                            value: eventObj.target.checked
                          })}
                        />
                      }
                      label="動画あり"
                    />
                    
                    <FormControlLabel
                      classes={{
                        label: classes.label
                      }}
                      control={
                        <Checkbox
                          value={lodashGet(dataObj, [...this.pathArr, 'searchObj', 'checkMyPost'], false)}
                          onChange={(eventObj) => handleEdit({
                            pathArr: [...this.pathArr, 'searchObj', 'checkMyPost'],
                            value: eventObj.target.checked
                          })}
                        />
                      }
                      label="自分の投稿"
                    />
                    
                  </div>
                  
                </div>
                
                
                <Button
                  variant="contained"
                  color="primary"
                >
                  検索
                </Button>
                
                
              </div>*/}
            }
            
            
          </Paper>
          
          
        </ExpansionPanelDetails>
        
        
      </ExpansionPanel>
    );
    
  }
  
});