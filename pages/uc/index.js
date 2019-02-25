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
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconSearch from '@material-ui/icons/Search';
import IconAccountCircle from '@material-ui/icons/AccountCircle';
import IconRefresh from '@material-ui/icons/Refresh';
import IconSchedule from '@material-ui/icons/Schedule';
import IconLaunch from '@material-ui/icons/Launch';
import IconVideogameAsset from '@material-ui/icons/VideogameAsset';

import initStoreLayout from '../../app/common/layout/stores/layout';
import initStoreUcIndex from '../../app/uc/index/stores/store';

import Layout from '../../app/common/layout/components/layout';

import withRoot from '../../lib/material-ui/withRoot';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 10px;
`;


// ---------------------------------------------
//   ゲームコミュニティ検索
// ---------------------------------------------

const PaperSearch = styled(Paper)`
  && {
    margin: 0 0 20px 0;
    padding: 16px 16px 0 16px;
  }
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
  && {
    flex-grow: 2;
    margin: 0 10px 0 0;
  }
`;

const FormBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
  margin: 0 0 0 0;
`;

const StyledFormControl = styled(FormControl)`
  && {
    min-width: 120px;
    margin: 0 10px 16px 0;
  }
`;

const ButtonDialog = styled(Button)`
  && {
    margin: 0 0 16px 0;
  }
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
  && {
    display: flex;
    flex-flow: row nowrap;
    margin: 0 0 12px 0;
    min-width: 100%;
    cursor: pointer;
  }
`;

const CardMediaBox = styled.div`
  background-color: #ecf0f1;
`;

const StyledCardMedia = styled(CardMedia)`
  && {
    width: 128px;
    height: 128px;
    
    @media screen and (max-width: 480px) {
      width: 64px;
      height: 64px;
    }
  }
`;

const StyledCardContent = styled(CardContent)`
  && {
    padding: 8px 16px;
  }
`;

const CardTitle = styled.h3`
  font-size: 14px;
  // line-height: 1.6em;
  margin: 0 0 8px 0;
  padding: 2px 0 6px 0;
  border-bottom: 1px solid #6E6E6E;
`;

const CardDescriptionBox = styled.div`
  font-size: 14px;
  // line-height: 1.6em;
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


const StyledIconAccountCircle = styled(IconAccountCircle)`
  && {
    font-size: 24px;
    margin: 1px 0 0 0;
  }
`;

const StyledIconRefresh = styled(IconRefresh)`
  && {
    font-size: 24px;
    margin: 1px 0 0 0;
  }
`;

const StyledIconSchedule = styled(IconSchedule)`
  && {
    font-size: 24px;
    margin: 1px 0 0 0;
  }
`;

const StyledIconLaunch = styled(IconLaunch)`
  && {
    font-size: 24px;
    margin: 1px 0 0 0;
  }
`;

const StyledIconVideogameAsset = styled(IconVideogameAsset)`
  && {
    font-size: 24px;
    margin: 1px 0 0 0;
  }
`;


const CardInfoText = styled.div`
  font-size: 12px;
  margin: 0 0 0 4px;
`;

const CardChipBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 10px 0 0 0;
`;

const StyledChip = styled(Chip)`
  && {
    margin: 0 6px 4px 0;
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
//   URL: http://dev-1.gameusers.org:8080/uc
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
    
    const storeLayoutInstance = initStoreLayout(props.isServer);
    
    this.stores = {
      layout: storeLayoutInstance,
      current: initStoreUcIndex(props.isServer, storeLayoutInstance),
      pathname: props.pathname
    };
    
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
            <CardChipBox key={index}>
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
            
            
            <StyledCardContent key={index}>
            
              <Link prefetch href={value.link}>
                <CardTitle>{value.name}</CardTitle>
              </Link>
              
              {stores.current.descriptionShow &&
                <CardDescriptionBox>
                  {value.description}
                </CardDescriptionBox>
              }
              
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
                      <StyledIconRefresh />
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
                      <StyledIconLaunch />
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
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider stores={this.stores}>
      
        <Layout headerNavMainArr={stores.layout.headerNavMainObj.index}>
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>ユーザーコミュニティ</title>
          </Head>
          
          
          <Container>
            
            {/* ユーザーコミュニティ検索 */}
            <PaperSearch elevation={4}>
            
              <SearchTitle>ユーザーコミュニティ検索</SearchTitle>
              
              {/* 検索フォーム */}
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
              
              
              {/* 並び替え */}
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
              
            </PaperSearch>
            
            
            {/* ユーザーコミュニティ一覧 - カード */}
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
                      checked={stores.current.descriptionShow}
                      onChange={stores.current.descriptionChangeFunction}
                    />
                  }
                  label="説明文"
                />
                
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