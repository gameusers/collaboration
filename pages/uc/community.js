// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';
import Pagination from 'rc-pagination';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconList from '@material-ui/icons/List';
import IconNew from '@material-ui/icons/FiberNew';
import IconImage from '@material-ui/icons/Image';
import IconOndemandVideo from '@material-ui/icons/OndemandVideo';
import IconLaunch from '@material-ui/icons/Launch';
import IconVideogameAsset from '@material-ui/icons/VideogameAsset';

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

const PaperBbsMenu = styled(Paper)`
  margin: 0 0 16px 0 !important;
  padding: 8px 16px 16px 16px !important;
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
  margin: 0 4px 0 0 !important;
  padding: 0 !important;
  width: 28px !important;
  height: 28px !important;
`;

const AppBarBbsMenu = styled(AppBar)`
  margin: 16px 0 0 0 !important;
  padding: 0 !important;
`;

const PaperBbsMenuTabs = styled(Paper)`
  margin: 16px 0 0 0 !important;
  padding: 0 !important;
`;

const BbsMenuTabBox = styled.div`
  margin: 10px 0 0 0;
  padding: 0;
`;


// ---------------------------------------------
//   Card
// ---------------------------------------------

const CardBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 0 12px 0 !important;
  min-width: 100% !important;
  cursor: pointer !important;
`;

const CardMediaBox = styled.div`
  background-color: #ecf0f1;
`;

const StyledCardMedia = styled(CardMedia)`
  width: 128px !important;
  height: 128px !important;
  
  @media screen and (max-width: 480px) {
    width: 64px !important;
    height: 64px !important;
  }
`;

const StyledCardContent = styled(CardContent)`
  padding: 8px 16px 8px 16px !important;
`;

const CardTitle = styled.h3`
  font-size: 14px;
  line-height: 1.6em;
  margin: 0 0 8px 0;
  padding: 2px 0 6px 0;
  border-bottom: 1px solid #6E6E6E;
`;

const CardDescriptionBox = styled.div`
  font-size: 14px;
  line-height: 1.6em;
  margin: 0 0 10px 0;
  padding: 0;
`;

const CardInfoContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
`;

const CardInfoBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 12px 0 0;
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
    
    let codeArr = [];
    
    if (stores.current.bbsThreadArr) {
      
      
      // --------------------------------------------------
      //   テーブルの中身
      // --------------------------------------------------
      
      let codeTableDataArr = [];
      
      stores.current.bbsThreadArr.forEach((value, index) => {
        
        codeTableDataArr.push(
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              {value.name}
            </TableCell>
            <TableCell>{value.updatedDate}</TableCell>
            <TableCell numeric>{value.comments}</TableCell>
            <TableCell numeric>{value.replies}</TableCell>
            <TableCell numeric>{value.images}</TableCell>
            <TableCell numeric>{value.videos}</TableCell>
          </TableRow>
        );
        
      });
      
      
      codeArr.push(
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>名前</TableCell>
              <TableCell>最終更新日</TableCell>
              <TableCell numeric>コメント</TableCell>
              <TableCell numeric>返信</TableCell>
              <TableCell numeric>画像</TableCell>
              <TableCell numeric>動画</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {codeTableDataArr}
          </TableBody>
        </Table>
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
            <PaperBbsMenu elevation={2}>
              
              {/* Title */}
              <BbsMenuTitleBox>
                
                <Title>BBS</Title>
                
                <BbsMenuButtonsBox>
                  
                  <Tooltip id="tooltip-list" title="スレッド一覧">
                    <IconButtonBbsMenu>
                      <IconList />
                    </IconButtonBbsMenu>
                  </Tooltip>
                  
                  <Tooltip id="tooltip-new" title="新しいコメント">
                    <IconButtonBbsMenu>
                      <IconNew />
                    </IconButtonBbsMenu>
                  </Tooltip>
                  
                  <Tooltip id="tooltip-image" title="画像付きのコメント">
                    <IconButtonBbsMenu>
                      <IconImage />
                    </IconButtonBbsMenu>
                  </Tooltip>
                  
                  <Tooltip id="tooltip-video" title="動画付きのコメント">
                    <IconButtonBbsMenu>
                      <IconOndemandVideo />
                    </IconButtonBbsMenu>
                  </Tooltip>
                  
                </BbsMenuButtonsBox>
                
              </BbsMenuTitleBox>
              
              
              {/* Tab */}
              {/*<AppBarBbsMenu position="static" color="default">*/}
              <PaperBbsMenuTabs>
                <Tabs
                  value={stores.current.openNoBbsMenu}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={stores.current.changeOpenNoBbsMenu}
                >
                  <Tab label="スレッド一覧" />
                  <Tab label="検索" />
                </Tabs>
              </PaperBbsMenuTabs>
              {/*</AppBarBbsMenu>*/}
              
              {stores.current.openNoBbsMenu === 0 &&
                <BbsMenuTabBox>
                  {codeArr}
                </BbsMenuTabBox>
              }
              {stores.current.openNoBbsMenu === 1 &&
                <BbsMenuTabBox>
                  Item Two
                </BbsMenuTabBox>
              }
              
            </PaperBbsMenu>
            
            
            
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