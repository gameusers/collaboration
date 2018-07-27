// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

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
import TableSortLabel from '@material-ui/core/TableSortLabel';

import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconList from '@material-ui/icons/List';
import IconNew from '@material-ui/icons/FiberNew';
import IconImage from '@material-ui/icons/Image';
import IconOndemandVideo from '@material-ui/icons/OndemandVideo';
import IconSearch from '@material-ui/icons/Search';
import IconAssignment from '@material-ui/icons/Assignment';
import IconPublic from '@material-ui/icons/Public';
import IconHealing from '@material-ui/icons/Healing';
import IconSchedule from '@material-ui/icons/Schedule';
import IconVideocam from '@material-ui/icons/Videocam';
import IconClose from '@material-ui/icons/Close';

import cyan from '@material-ui/core/colors/cyan';

import FormPost from '../../form/components/post';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const BbsTitleBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  // margin: 0;
  // width: 100%;
  // padding: 0 0 6px 0;
  // border-bottom: 1px solid #d0d0d0;
  // background-color: pink;
`;


const ExpansionPanelDetailsBbsMenu = styled(ExpansionPanelDetails)`
  && {
    display: inline;
    margin: 0;
    padding: 0;
  }
`;

const BbsMenuTitleBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
  // background-color: pink;
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 3px 0 0 0;
`;

const BbsMenuButtonsBox = styled.div`
  margin: 0 0 0 14px;
  padding: 0;
`;

const IconButtonBbsMenu = styled(IconButton)`
  && {
    margin: 0 4px 0 0;
    padding: 0;
    width: 28px;
    height: 28px;
  }
`;

const PaperBbsMenuTabs = styled(Paper)`
  && {
    margin: 0 16px 0;
    padding: 0;
  }
`;

const BbsMenuThreadListTabBox = styled.div`
  // width: 80%;
  margin: 0;
  padding: 10px 16px 0;
  // background-color: pink;
`;

const BbsMenuSearchTabBox = styled.div`
  width: 100%;
  margin: 0;
  padding: 22px 24px 16px;
`;

const BbsThreadListTableWrapper = styled.div`
  overflow-x: auto;
`;

const TableCellBbsThreadListName = styled(TableCell)`
  && {
    white-space: nowrap;
    min-width: 280px;
  }
`;

const TableCellBbsThreadList = styled(TableCell)`
  && {
    white-space: nowrap;
  }
`;

const BbsSearchBox = styled.div`
  margin: 0 0 16px 0;
`;

const TextFieldBbsSearch = styled(TextField)`
  && {
    margin: 10px 0 0 0;
  }
`;

const BbsSearchDateTimeBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 15px 0 0 0;
`;

const TextFieldBbsSearchDateTime = styled(TextField)`
  && {
    margin: 10px 20px 0 0;
  }
`;

const BbsSearchCheckBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 15px 0 0 0;
`;



// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, id } = this.props;
    
    // console.log(`this.props.id = ${this.props.id}`);
    
    // const test = threadListMap.get('p0V_RsaT1l8').get('ks8WPvlQpbg').get('a');
    // const test = threadListMap.get('p0V_RsaT1l8');
    // console.dir(test);
    
    
    const threadListOrderBy = stores.bbsNavigation.threadListOrderByObj[id];
    const threadListOrder = stores.bbsNavigation.threadListOrderObj[id];
    const threadListCount = stores.bbsNavigation.threadListCountObj[id];
    const threadListRowsPerPage = stores.bbsNavigation.threadListRowsPerPageObj[id];
    const threadListPage = stores.bbsNavigation.threadListPageObj[id];
    const threadListArr = stores.bbsNavigation.threadListObj[id];
    
    const {
      handleThreadListSort,
      handleThreadListRowsPerPage,
      handleThreadListPage
    } = stores.bbsNavigation;
    
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - スレッド一覧
    // --------------------------------------------------
    
    let componentThreadListArr = [];
    
    if (threadListArr) {
      
      
      // --------------------------------------------------
      //   テーブルの中身
      // --------------------------------------------------
      
      let componentTableDataArr = [];
      
      for (const [index, value] of threadListArr.entries()) {
        
        componentTableDataArr.push(
          <TableRow key={index}>
            <TableCellBbsThreadListName
              component="th"
              scope="row"
            >
              {value.name}
            </TableCellBbsThreadListName>
            <TableCell>{value.updatedDate}</TableCell>
            <TableCell numeric>{value.comment}</TableCell>
            <TableCell numeric>{value.reply}</TableCell>
            <TableCell numeric>{value.image}</TableCell>
            <TableCell numeric>{value.video}</TableCell>
          </TableRow>
        );
        
      }
      
      
      componentThreadListArr.push(
        <div key="threadList">
          
          <BbsThreadListTableWrapper>
            
            <Table>
              
              <TableHead>
                <TableRow>
                
                  <TableCellBbsThreadListName>
                    名前
                  </TableCellBbsThreadListName>
                  
                  <TableCellBbsThreadList>
                    <TableSortLabel
                      active={threadListOrderBy === 'updatedDate'}
                      direction={threadListOrder}
                      onClick={() => handleThreadListSort('updatedDate')}
                    >
                      最終更新日
                    </TableSortLabel>
                  </TableCellBbsThreadList>
                  
                  <TableCellBbsThreadList numeric>
                    <TableSortLabel
                      active={threadListOrderBy === 'comment'}
                      direction={threadListOrder}
                      onClick={() => handleThreadListSort('comment')}
                    >
                      コメント
                    </TableSortLabel>
                  </TableCellBbsThreadList>
                  
                  <TableCellBbsThreadList numeric>
                    <TableSortLabel
                      active={threadListOrderBy === 'reply'}
                      direction={threadListOrder}
                      onClick={() => handleThreadListSort('reply')}
                    >
                      返信
                    </TableSortLabel>
                  </TableCellBbsThreadList>
                  
                  <TableCellBbsThreadList numeric>
                    <TableSortLabel
                      active={threadListOrderBy === 'image'}
                      direction={threadListOrder}
                      onClick={() => handleThreadListSort('image')}
                    >
                      画像
                    </TableSortLabel>
                  </TableCellBbsThreadList>
                  
                  <TableCellBbsThreadList numeric>
                    <TableSortLabel
                      active={threadListOrderBy === 'video'}
                      direction={threadListOrder}
                      onClick={() => handleThreadListSort('video')}
                    >
                      動画
                    </TableSortLabel>
                  </TableCellBbsThreadList>
                  
                </TableRow>
              </TableHead>
              
              <TableBody>
                {componentTableDataArr}
              </TableBody>
              
            </Table>
            
          </BbsThreadListTableWrapper>
        
          <TablePagination
            component="div"
            count={threadListCount}
            rowsPerPage={threadListRowsPerPage}
            page={threadListPage}
            labelRowsPerPage=""
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangeRowsPerPage={(event) => handleThreadListRowsPerPage(event)}
            onChangePage={handleThreadListPage}
          />
          
        </div>
      );
      
    }
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <ExpansionPanel
        expanded={stores.layout.returnPanelExpanded(id)}
      >
        
        {/* Title */}
        <ExpansionPanelSummary
          expandIcon={
            <IconExpandMore
              onClick={() => stores.layout.handlePanelExpanded(id)}
            />
          }
        >
          
          <BbsMenuTitleBox>
            
            <Title>BBS</Title>
            
            <BbsMenuButtonsBox>
              
              <Tooltip id="tooltip-list" title="スレッド一覧">
                <IconButtonBbsMenu
                  onClick={stores.current.handleClickBbsMenuButtonThreadList}
                >
                  <IconList />
                </IconButtonBbsMenu>
              </Tooltip>
              
              <Tooltip id="tooltip-new" title="新しいコメント">
                <IconButtonBbsMenu
                  onClick={stores.current.handleClickBbsMenuButtonNew}
                >
                  <IconNew />
                </IconButtonBbsMenu>
              </Tooltip>
              
              <Tooltip id="tooltip-image" title="画像付きのコメント">
                <IconButtonBbsMenu
                  onClick={stores.current.handleClickBbsMenuButtonImage}
                >
                  <IconImage />
                </IconButtonBbsMenu>
              </Tooltip>
              
              <Tooltip id="tooltip-video" title="動画付きのコメント">
                <IconButtonBbsMenu
                  onClick={stores.current.handleClickBbsMenuButtonVideo}
                >
                  <IconOndemandVideo />
                </IconButtonBbsMenu>
              </Tooltip>
              
            </BbsMenuButtonsBox>
            
          </BbsMenuTitleBox>
          
        </ExpansionPanelSummary>
        
        
        {/* Contents */}
        <ExpansionPanelDetailsBbsMenu>
          
          {/* Tab */}
          <PaperBbsMenuTabs>
            <Tabs
              value={stores.current.bbsMenuOpenedTabNo}
              indicatorColor="primary"
              textColor="primary"
              onChange={stores.current.handleBbsMenuOpenedTabNo}
            >
              <Tab label="スレッド一覧" />
              <Tab label="検索" />
            </Tabs>
          </PaperBbsMenuTabs>
          
          
          {/* スレッド一覧 */}
          {stores.current.bbsMenuOpenedTabNo === 0 &&
            <BbsMenuThreadListTabBox>
              {componentThreadListArr}
            </BbsMenuThreadListTabBox>
          }
          
          
          {/* 検索 */}
          {stores.current.bbsMenuOpenedTabNo === 1 &&
            <BbsMenuSearchTabBox>
              
              {/* 検索フォーム */}
              <BbsSearchBox>
                <TextFieldBbsSearch
                  placeholder="検索キーワード"
                  value={stores.current.bbsSearchKeyword}
                  onChange={stores.current.handleBbsSearchKeyword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconSearch />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <BbsSearchDateTimeBox>
                  <TextFieldBbsSearchDateTime
                    id="datetime-local-start"
                    label="開始日時"
                    type="datetime-local"
                    value={stores.current.bbsSearchDateTimeStart}
                    onChange={stores.current.handleBbsSearchDateTimeStart}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  
                  <TextFieldBbsSearchDateTime
                    id="datetime-local-end"
                    label="終了日時"
                    type="datetime-local"
                    value={stores.current.bbsSearchDateTimeEnd}
                    onChange={stores.current.handleBbsSearchDateTimeEnd}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </BbsSearchDateTimeBox>
                
                
                <BbsSearchCheckBox>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={stores.current.checkedBbsSearchThread}
                        onChange={stores.current.handleCheckedBbsSearchThread}
                      />
                    }
                    label="スレッド"
                  />
                  
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={stores.current.checkedBbsSearchComment}
                        onChange={stores.current.handleCheckedBbsSearchComment}
                      />
                    }
                    label="コメント"
                  />
                  
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={stores.current.checkedBbsSearchReply}
                        onChange={stores.current.handleCheckedBbsSearchReply}
                      />
                    }
                    label="返信"
                  />
                
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={stores.current.checkedBbsSearchImage}
                        onChange={stores.current.handleCheckedBbsSearchImage}
                        color="primary"
                      />
                    }
                    label="画像あり"
                  />
                  
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={stores.current.checkedBbsSearchVideo}
                        onChange={stores.current.handleCheckedBbsSearchVideo}
                        color="primary"
                      />
                    }
                    label="動画あり"
                  />
                  
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={stores.current.checkedBbsSearchMine}
                        onChange={stores.current.handleCheckedBbsSearchMine}
                        color="primary"
                      />
                    }
                    label="自分の書き込み"
                  />
                </BbsSearchCheckBox>
                
              </BbsSearchBox>
              
              <Button
                variant="contained"
                color="primary"
              >
                検索
              </Button>
              
            </BbsMenuSearchTabBox>
          }
          
        </ExpansionPanelDetailsBbsMenu>
        
      </ExpansionPanel>
    );
    
  }
  
};