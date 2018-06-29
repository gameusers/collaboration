// --------------------------------------------------
//   Import
// --------------------------------------------------

import { hot } from 'react-hot-loader';
import React from 'react';
import Head from 'next/head';
// import Link from 'next/link';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';
// import Pagination from 'rc-pagination';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
// import AppBar from '@material-ui/core/AppBar';
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
// import Select from '@material-ui/core/Select';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Chip from '@material-ui/core/Chip';
// import Dialog from '@material-ui/core/Dialog';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';

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



import initStoreCommon from '../../applications/common/stores/common';
import initStoreHeader from '../../applications/common/stores/header';
import initStoreUcCommunity from '../../applications/uc/community/stores/store';

import Layout from '../../applications/common/components/layout';

import withRoot from '../../lib/material-ui/withRoot';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 10px;
`;


// ---------------------------------------------
//   BBS Menu
// ---------------------------------------------

const BbsTitleBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0;
  // background-color: pink;
`;


const ExpansionPanelDetailsBbsMenu = styled(ExpansionPanelDetails)`
  display: inline !important;
  margin: 0 0 0 0 !important;
  padding: 0 !important;
`;

// const PaperBbsMenu = styled(Paper)`
//   margin: 0 0 16px 0 !important;
//   padding: 16px 16px 0 16px !important;
// `;

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
  margin: 0 4px 0 0 !important;
  padding: 0 !important;
  width: 28px !important;
  height: 28px !important;
`;

const PaperBbsMenuTabs = styled(Paper)`
  margin: 0 16px 0 !important;
  padding: 0 !important;
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
  white-space: nowrap !important;
  min-width: 280px !important;
`;

const TableCellBbsThreadList = styled(TableCell)`
  white-space: nowrap !important;
`;

const BbsSearchBox = styled.div`
  margin: 0 0 16px 0;
`;

const TextFieldBbsSearch = styled(TextField)`
  margin: 10px 0 0 0 !important;
`;

const BbsSearchDateTimeBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 15px 0 0 0;
`;

const TextFieldBbsSearchDateTime = styled(TextField)`
  margin: 10px 20px 0 0 !important;
`;

const BbsSearchCheckBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 15px 0 0 0;
`;


// ---------------------------------------------
//   BBS
// ---------------------------------------------

const BbsTitle = styled.h2`
  font-size: 18px;
  margin: 3px 0 0 0;
`;

const BbsInfoBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  font-size: 12px;
  margin: 0 0 0 0;
`;

const StyledIconAssignment = styled(IconAssignment)`
  font-size: 24px !important;
  margin: 2px 2px 0 0 !important;
`;

const BbsInfoAbout = styled.div`
  font-size: 12px;
  color: #009933;
  margin: 0 10px 0 0;
`;

const BbsButton = styled(Button)`
  font-size: 12px !important;
  width: 36px !important;
  height: 22px !important;
  min-width: 36px !important;
  min-height: 22px !important;
  margin: 3px 0 0 0 !important;
  padding: 0 0 0 0 !important;
`;

const StyledIconId = styled(IconPublic)`
  font-size: 24px !important;
  margin: 2px 2px 0 10px !important;
`;

const BbsInfoId = styled.div`
  font-size: 12px;
  color: #009933;
  margin: 0 10px 0 0;
`;

const ExpansionPanelDetailsBbs = styled(ExpansionPanelDetails)`
  display: inline !important;
  margin: 0 !important;
  padding: 0 !important;
`;

const BbsContentsContainer = styled.div`
  margin: 0;
  padding: 0 24px 24px;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  margin: 0;
  padding: 0;
  // background-color: pink;
`;

const ProfileThumbnail = styled.img`
  border-radius: 6px;
  width: 48px;
  margin: 2px 0 0 0;
`;

const ProfileInfoBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0;
  padding: 0 0 0 10px;
`;

const ProfileNameBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 0;
`;

const ProfileName = styled.div`
  font-size: 14px;
  color: #337ab7;
  margin: 0;
  padding: 0;
`;

const StyledIconHealing = styled(IconHealing)`
  font-size: 18px !important;
  margin: 4px 2px 0 2px !important;
`;

const ProfileStatus = styled.div`
  font-size: 14px;
  margin: 0;
  padding: 0;
`;

const StyledIconSchedule = styled(IconSchedule)`
  font-size: 18px !important;
  margin: 4px 2px 0 2px !important;
`;

const ProfileCheckbox = styled(Checkbox)`
  height: auto !important;
`;

const BbsTextarea = styled.textarea`
  width: 100%;
  max-width: 600px;
  margin: 10px 0 0 0;
  padding: 0;
  
  @media screen and (max-width: 480px) {
    max-width: auto;
  }
`;






// ---------------------------------------------
//   Pagination
// ---------------------------------------------

const PaginationBox = styled.div`
  margin: 10px 0 10px 0;
  padding: 0;
`;




// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/uc/community
// --------------------------------------------------

@observer
class Component extends React.Component {
  
  static getInitialProps({ pathname, req }) {
    const isServer = !!req;
    return { isServer: isServer, pathname: pathname };
  }
  
  
  constructor(props) {
    
    super(props);
    

    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    this.stores = {
      common: initStoreCommon(props.isServer, props.pathname),
      header: initStoreHeader(props.isServer, props.pathname),
      current: initStoreUcCommunity(props.isServer, props.pathname),
      pathname: props.pathname
    };
    
  }
  
  
  componentDidMount() {
    if (window.innerWidth > 480) {
      this.stores.header.dataOpenFunction();
    }
  }
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const stores = this.stores;
    
    
    // --------------------------------------------------
    //   スレッド一覧
    // --------------------------------------------------
    
    let codeBbsThreadListArr = [];
    
    if (stores.current.bbsThreadArr) {
      
      
      // --------------------------------------------------
      //   テーブルの中身
      // --------------------------------------------------
      
      let codeTableDataArr = [];
      
      stores.current.bbsThreadArr.forEach((value, index) => {
        
        codeTableDataArr.push(
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
        
      });
      
      
      codeBbsThreadListArr.push(
        <div key="bbsThreadList">
          
          <BbsThreadListTableWrapper>
          
          <Table>
            
            <TableHead>
              <TableRow>
              
                <TableCellBbsThreadListName>
                  名前
                </TableCellBbsThreadListName>
                
                <TableCellBbsThreadList>
                  <TableSortLabel
                    active={stores.current.bbsThreadListOrderBy === 'updatedDate'}
                    direction={stores.current.bbsThreadListOrder}
                    onClick={() => stores.current.sortBbsThreadList('updatedDate')}
                  >
                    最終更新日
                  </TableSortLabel>
                </TableCellBbsThreadList>
                
                <TableCellBbsThreadList numeric>
                  <TableSortLabel
                    active={stores.current.bbsThreadListOrderBy === 'comment'}
                    direction={stores.current.bbsThreadListOrder}
                    onClick={() => stores.current.sortBbsThreadList('comment')}
                  >
                    コメント
                  </TableSortLabel>
                </TableCellBbsThreadList>
                
                <TableCellBbsThreadList numeric>
                  <TableSortLabel
                    active={stores.current.bbsThreadListOrderBy === 'reply'}
                    direction={stores.current.bbsThreadListOrder}
                    onClick={() => stores.current.sortBbsThreadList('reply')}
                  >
                    返信
                  </TableSortLabel>
                </TableCellBbsThreadList>
                
                <TableCellBbsThreadList numeric>
                  <TableSortLabel
                    active={stores.current.bbsThreadListOrderBy === 'image'}
                    direction={stores.current.bbsThreadListOrder}
                    onClick={() => stores.current.sortBbsThreadList('image')}
                  >
                    画像
                  </TableSortLabel>
                </TableCellBbsThreadList>
                
                <TableCellBbsThreadList numeric>
                  <TableSortLabel
                    active={stores.current.bbsThreadListOrderBy === 'video'}
                    direction={stores.current.bbsThreadListOrder}
                    onClick={() => stores.current.sortBbsThreadList('video')}
                  >
                    動画
                  </TableSortLabel>
                </TableCellBbsThreadList>
                
              </TableRow>
            </TableHead>
            
            <TableBody>
              {codeTableDataArr}
            </TableBody>
            
          </Table>
          
          </BbsThreadListTableWrapper>
        
          <TablePagination
            component="div"
            count={stores.current.bbsThreadListCount}
            rowsPerPage={stores.current.bbsThreadListRowsPerPage}
            page={stores.current.bbsThreadListPage}
            labelRowsPerPage=""
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangeRowsPerPage={stores.current.handleChangeBbsThreadListRowsPerPage}
            onChangePage={stores.current.handleChangeBbsThreadListPage}
          />
          
        </div>
      );
      
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider stores={this.stores}>
      
        <Layout>
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>ユーザーコミュニティ</title>
          </Head>
          
          
          <Container>
            
            {/* BBS Menu */}
            <ExpansionPanel
              defaultExpanded={true}
            >
              
              {/* Title */}
              <ExpansionPanelSummary expandIcon={<IconExpandMore />}>
                
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
                    value={stores.current.openBbsMenuTabNo}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={stores.current.handleChangeOpenBbsMenuTabNo}
                  >
                    <Tab label="スレッド一覧" />
                    <Tab label="検索" />
                  </Tabs>
                </PaperBbsMenuTabs>
                
                
                {/* スレッド一覧 */}
                {stores.current.openBbsMenuTabNo === 0 &&
                  <BbsMenuThreadListTabBox>
                    {codeBbsThreadListArr}
                  </BbsMenuThreadListTabBox>
                }
                
                
                {/* 検索 */}
                {stores.current.openBbsMenuTabNo === 1 &&
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
            
            
            
            
            <ExpansionPanel
              defaultExpanded={true}
            >
              
              {/* Title */}
              <ExpansionPanelSummary expandIcon={<IconExpandMore />}>
              
                <BbsTitleBox>
                  
                  <BbsTitle>雑談スレッド</BbsTitle>
                  
                  <BbsInfoBox>
                    
                    <StyledIconAssignment />
                    <BbsInfoAbout>スレッドについて</BbsInfoAbout>
                    
                    <BbsButton variant="outlined">
                      編集
                    </BbsButton>
                    
                    <StyledIconId />
                    <BbsInfoId>ks8WPvlQpbg</BbsInfoId>
                    
                  </BbsInfoBox>
                  
                </BbsTitleBox>
                
              </ExpansionPanelSummary>
              
              
              {/* Contents */}
              <ExpansionPanelDetailsBbs>
                
                <BbsContentsContainer>
                  
                  <ProfileBox>
                    <ProfileThumbnail src="https://gameusers.org/assets/img/user/1/thumbnail.jpg" />
                    
                    <ProfileInfoBox>
                    
                      <ProfileNameBox>
                        <ProfileName>あづみ</ProfileName>
                        <StyledIconHealing />
                        <ProfileStatus>プロハンター</ProfileStatus>
                        <StyledIconSchedule />
                        <ProfileStatus>1 時間前</ProfileStatus>
                      </ProfileNameBox>
                      
                      <FormControlLabel
                        control={
                          <ProfileCheckbox
                            // checked={stores.current.developerShow}
                            // onChange={stores.current.developerChangeFunction}
                          />
                        }
                        label="ななしにする"
                      />
                    
                    </ProfileInfoBox>
                    
                  </ProfileBox>
                  
                  <BbsTextarea rows="6" />
                  
                </BbsContentsContainer>
                
                
              </ExpansionPanelDetailsBbs>
              
            </ExpansionPanel>
            
            
            active<br />
            active<br />
            active<br />
            {/*<textarea>AAA</textarea>
            
            <TextField
              // hintText="MultiLine with rows: 2 and rowsMax: 4"
              value="AAA"
              multiLine={true}
              rows={4}
              rowsMax={4}
            />*/}
            
            
            
          </Container>
          
        </Layout>
      </Provider>
    );
  }
}

export default withRoot(Component);