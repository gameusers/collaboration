// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


import Chip from '@material-ui/core/Chip';

import IconSearch from '@material-ui/icons/Search';
import IconAccountCircle from '@material-ui/icons/AccountCircle';
import IconAutorenew from '@material-ui/icons/Refresh';
import IconSchedule from '@material-ui/icons/Schedule';
import IconGames from '@material-ui/icons/Games';
import IconVideogameAsset from '@material-ui/icons/VideogameAsset';
import IconSupervisorAccount from '@material-ui/icons/SupervisorAccount';
import IconBusiness from '@material-ui/icons/Business';
import IconMonetizationOn from '@material-ui/icons/WebAsset';

import initStoreCommon from '../../stores/common';
import initStoreHeader from '../../stores/header';
import initStoreUcIndex from '../../applications/uc/index/stores/store';

import Pagination from 'rc-pagination';

import Layout from '../../components/layout';
import LinkIcons from '../../components/link-icons';

import withRoot from '../../lib/material-ui/withRoot';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 10px;
  
  @media screen and (max-width: 480px) {
    // padding: 10px 0 10px 0;
  }
`;





const StyledPaper = styled(Paper)`
  margin: 0 0 20px 0 !important;
  padding: 16px 16px 0 16px !important;
`;


const SearchBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 8px 0 20px 0;
`;

const SearchTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 16px 0;
`;

const TextFieldSearch = styled(TextField)`
  flex-grow: 2 !important;
  margin: 0 10px 0 0 !important;
  // width: 80% !important;
`;

const FormBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
  margin: 0 0 0 0;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px !important;
  margin: 0 10px 16px 0 !important;
`;

const ButtonDialog = styled(Button)`
  margin: 0 0 16px 0 !important;
`;



const CardBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  // align-items: flex-start;
  // background-color: pink;
  // margin: 10px 0 0 0;
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 0 12px 0 !important;
  min-width: 100% !important;
  // max-width: 49% !important;
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

const StyledIconAutorenew = styled(IconAutorenew)`
  font-size: 24px !important;
  margin: 1px 0 0 0 !important;
`;

const StyledIconSchedule = styled(IconSchedule)`
  font-size: 24px !important;
  margin: 1px 0 0 0 !important;
`;

const StyledIconAccountCircle = styled(IconAccountCircle)`
  font-size: 24px !important;
  margin: 1px 0 0 0 !important;
`;

const StyledIconMonetizationOn = styled(IconMonetizationOn)`
  font-size: 24px !important;
  margin: 1px 0 0 0 !important;
`;

const StyledIconVideogameAsset = styled(IconVideogameAsset)`
  font-size: 24px !important;
  margin: 1px 0 0 0 !important;
`;

const StyledIconGames = styled(IconGames)`
  font-size: 24px !important;
  margin: 1px 0 0 0 !important;
`;





const CardInfoText = styled.div`
  font-size: 12px;
  margin: 0 0 0 4px;
`;

const BoxLink = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2px 0 0;
`;

const CardChipBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 10px 0 0 0;
`;

const StyledChip = styled(Chip)`
  margin: 0 6px 4px 0 !important;
`;



const PaginationBox = styled.div`
  margin: 10px 0 10px 0;
  padding: 0;
`;




// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/gc
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
      current: initStoreUcIndex(props.isServer, props.pathname),
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
    //   Game Cards
    // --------------------------------------------------
    
    let codeArr = [];
    
    if (stores.current.gamesArr) {
      
      stores.current.gamesArr.forEach((value, index) => {
        
        
        // --------------------------------------------------
        //  Tags
        // --------------------------------------------------
        
        let codeTagArr = [];
        let codeTagChipArr = [];
        
        if (stores.current.tagShow && value.tagArr.length > 0) {
          
          value.tagArr.forEach((value2, index2) => {
            codeTagChipArr.push(<StyledChip label={value2} key={index2} />);
          });
          
          codeTagArr.push(
            <CardChipBox>
              {codeTagChipArr}
            </CardChipBox>
          );
          
        }
        
        
        codeArr.push(
          <StyledCard key={index}>
            
            <Link prefetch href={value.link}>
            <CardMediaBox>
              <StyledCardMedia
                image={value.thumbnail}
                title={value.name}
              />
            </CardMediaBox>
            </Link>
            
            
            <StyledCardContent>
            
              <Link prefetch href={value.link}>
                <CardTitle>{value.name}</CardTitle>
              </Link>
              
              <CardDescriptionBox>
                {value.description}
              </CardDescriptionBox>
              
              <Link prefetch href={value.link}>
                
                <CardInfoContainer>
                  
                  {stores.current.membersShow &&
                    <CardInfoBox>
                      <StyledIconAccountCircle />
                      <CardInfoText>{value.members}</CardInfoText>
                    </CardInfoBox>
                  }
                  
                  {stores.current.updatedDateShow &&
                    <CardInfoBox>
                      <StyledIconAutorenew />
                      <CardInfoText>{value.updatedDate}</CardInfoText>
                    </CardInfoBox>
                  }
                  
                  {stores.current.createdDateShow &&
                    <CardInfoBox>
                      <StyledIconSchedule />
                      <CardInfoText>{value.createdDate}</CardInfoText>
                    </CardInfoBox>
                  }
                  
                  {stores.current.typeShow &&
                    <CardInfoBox>
                      <StyledIconMonetizationOn />
                      <CardInfoText>{value.type}</CardInfoText>
                    </CardInfoBox>
                  }
                  
                  {stores.current.gameShow &&
                    <CardInfoBox>
                      <StyledIconVideogameAsset />
                      <CardInfoText>{value.game}</CardInfoText>
                    </CardInfoBox>
                  }
                  
                </CardInfoContainer>
                
              </Link>
              
              {codeTagArr}
              
            </StyledCardContent>
            
          </StyledCard>
        );
        
      });
      
    }
    
    
    
    return (
      <Provider stores={this.stores}>
      
        <Layout>
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>ユーザーコミュニティ</title>
          </Head>
          
          
          <Container>
            
            {/* ユーザーコミュニティ検索 */}
            <StyledPaper elevation={4}>
            
              <SearchTitle>ユーザーコミュニティ検索</SearchTitle>
              
              {/* ユーザーコミュニティ検索フォーム */}
              <SearchBox>
                <TextFieldSearch
                  placeholder="コミュニティ名、ゲーム名、タグを検索"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconSearch />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                >
                  検索
                </Button>
              </SearchBox>
              
              
              {/* カテゴリー・ハードウェア・並び替え */}
              <FormBox>
                
                {/* 並び替え */}
                <StyledFormControl>
                  <InputLabel htmlFor="age-simple">並び替え</InputLabel>
                  <Select
                    value="新しい順"
                    // onChange={this.handleChange}
                    inputProps={{
                      name: 'age',
                      id: 'age-simple',
                    }}
                  >
                    <MenuItem value="">
                      <em></em>
                    </MenuItem>
                    <MenuItem value={20}>メンバー数 - 多い</MenuItem>
                    <MenuItem value={20}>メンバー数 - 少ない</MenuItem>
                    <MenuItem value={10}>更新日 - 新しい</MenuItem>
                    <MenuItem value={20}>更新日 - 古い</MenuItem>
                    <MenuItem value={10}>登録日 - 新しい</MenuItem>
                    <MenuItem value={20}>登録日 - 古い</MenuItem>
                  </Select>
                </StyledFormControl>
                
                
                {/* 表示情報選択 */}
                <ButtonDialog
                  variant="contained"
                  color="primary"
                  onClick={stores.current.dialogOpenFunction}
                >
                  表示情報選択
                </ButtonDialog>
                
              </FormBox>
              
            </StyledPaper>
            
            
            
            {/* ゲーム一覧 - カード */}
            <CardBox>
              {codeArr}
            </CardBox>
            
            
            {/* Pagination */}
            <PaginationBox>
              <Pagination
                onChange={stores.current.pageChangeFunction}
                current={stores.current.paginationCurrent}
                total={stores.current.paginationTotal}
                pageSize={stores.current.paginationPageSize}
              />
            </PaginationBox>
            
            
            {/* 表示情報選択ダイアログ */}
            <Dialog
              open={stores.current.dialogOpen}
              onClose={stores.current.dialogCloseFunction}
            >
              <DialogTitle>表示情報選択</DialogTitle>
              <DialogContent>
              
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stores.current.membersShow}
                      onChange={stores.current.membersChangeFunction}
                    />
                  }
                  label="メンバー数"
                />
              
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stores.current.updatedDateShow}
                      onChange={stores.current.updatedDateChangeFunction}
                    />
                  }
                  label="更新日"
                />
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stores.current.createdDateShow}
                      onChange={stores.current.createdDateChangeFunction}
                    />
                  }
                  label="登録日"
                />
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stores.current.typeShow}
                      onChange={stores.current.typeChangeFunction}
                    />
                  }
                  label="参加タイプ"
                />
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stores.current.gameShow}
                      onChange={stores.current.gameChangeFunction}
                    />
                  }
                  label="関連ゲーム"
                />
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stores.current.tagShow}
                      onChange={stores.current.tagChangeFunction}
                    />
                  }
                  label="タグ"
                />
                
              </DialogContent>
            </Dialog>
            
            
          </Container>
          
        </Layout>
      </Provider>
    );
  }
}

export default withRoot(Component);