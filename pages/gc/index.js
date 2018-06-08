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
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';





// import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';

import Chip from '@material-ui/core/Chip';

import IconSearch from '@material-ui/icons/Search';
import IconSchedule from '@material-ui/icons/Schedule';
import IconStyle from '@material-ui/icons/Style';
import IconVideogameAsset from '@material-ui/icons/VideogameAsset';
import IconAccountCircle from '@material-ui/icons/AccountCircle';
import IconSupervisorAccount from '@material-ui/icons/SupervisorAccount';
import IconBusiness from '@material-ui/icons/Business';
import IconMonetizationOn from '@material-ui/icons/MonetizationOn';

import initStoreCommon from '../../stores/common';
import initStoreHeader from '../../stores/header';
import initStoreGcIndex from '../../stores/gc/index';

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
  align-items: flex-start;
  // background-color: pink;
  // margin: 10px 0 0 0;
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-flow: row nowrap;
  // margin: 0 14px 10px 0 !important;
  margin: 0 0 10px 0 !important;
  // min-width: 500px !important;
  // max-width: 500px !important;
  min-width: 49% !important;
  max-width: 49% !important;
  cursor: pointer !important;
  
  // @media screen and (max-width: 1020px) {
  //   min-width: 50% !important;
  //   max-width: 50% !important;
  // }
  
  @media screen and (max-width: 768px) {
    min-width: 100% !important;
    max-width: 100% !important;
  }
  
  // @media screen and (max-width: 480px) {
  //   min-width: 100% !important;
  //   max-width: 100% !important;
  // }
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

const StyledIconStyle = styled(IconStyle)`
  font-size: 24px !important;
  margin: 1px 0 0 0 !important;
`;

const StyledIconSchedule = styled(IconSchedule)`
  font-size: 24px !important;
  margin: 1px 0 0 0 !important;
`;

const StyledIconVideogameAsset = styled(IconVideogameAsset)`
  font-size: 24px !important;
  margin: 1px 0 0 0 !important;
`;

const StyledIconAccountCircle = styled(IconAccountCircle)`
  font-size: 24px !important;
  margin: 1px 0 0 0 !important;
`;

const StyledIconSupervisorAccount = styled(IconSupervisorAccount)`
  font-size: 24px !important;
  margin: 1px 0 0 0 !important;
`;

const StyledIconBusiness = styled(IconBusiness)`
  font-size: 24px !important;
  margin: 1px 0 0 0 !important;
`;

const StyledIconMonetizationOn = styled(IconMonetizationOn)`
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





// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/
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
      current: initStoreGcIndex(props.isServer, props.pathname),
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
    
    
    
    return (
      <Provider stores={this.stores}>
      
        <Layout>
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>ゲーム</title>
          </Head>
          
          
          <Container>
            
            {/* 検索フォーム */}
            <StyledPaper elevation={4}>
            
              <SearchTitle>ゲーム検索</SearchTitle>
            
              <SearchBox>
                <TextFieldSearch
                  placeholder="ゲーム名、メーカー名、タグを検索"
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
              
              
              <FormBox>
              
              <StyledFormControl>
                <InputLabel htmlFor="age-simple">ジャンル</InputLabel>
                <Select
                  value="デザイン"
                  // onChange={this.handleChange}
                  inputProps={{
                    name: 'age',
                    id: 'age-simple',
                  }}
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                  <MenuItem value={10}>アクション</MenuItem>
                  <MenuItem value={20}>スポーツ</MenuItem>
                  <MenuItem value={30}>シミュレーション</MenuItem>
                </Select>
              </StyledFormControl>
              
              
              <StyledFormControl>
                <InputLabel htmlFor="age-simple">ハードウェア</InputLabel>
                <Select
                  value="デザイン"
                  // onChange={this.handleChange}
                  inputProps={{
                    name: 'age',
                    id: 'age-simple',
                  }}
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                  <MenuItem value={10}>PS4</MenuItem>
                  <MenuItem value={20}>PS3</MenuItem>
                  <MenuItem value={30}>Xbox One</MenuItem>
                  <MenuItem value={30}>Nintendo Switch</MenuItem>
                </Select>
              </StyledFormControl>
              
              
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
                  <MenuItem value={10}>更新 - 新しい</MenuItem>
                  <MenuItem value={20}>更新 - 古い</MenuItem>
                  <MenuItem value={20}>フォロー数 - 多い</MenuItem>
                  <MenuItem value={20}>フォロー数 - 少ない</MenuItem>
                  <MenuItem value={20}>発売日 - 新しい</MenuItem>
                  <MenuItem value={20}>発売日 - 古い</MenuItem>
                  <MenuItem value={20}>値段 - 高い</MenuItem>
                  <MenuItem value={20}>値段 - 安い</MenuItem>
                  <MenuItem value={20}>プレイ人数 - 多い</MenuItem>
                  <MenuItem value={20}>プレイ人数 - 少ない</MenuItem>
                </Select>
              </StyledFormControl>
              
              
              <ButtonDialog
                variant="contained"
                color="primary"
                onClick={stores.current.dialogOpenFunction}
              >
                表示情報選択
              </ButtonDialog>
              
              </FormBox>
              
            </StyledPaper>
            
            
            
            <CardBox>
              
              <StyledCard>
                
                <CardMediaBox>
                  <StyledCardMedia
                    image="/static/img/sample/thumbnail-1.jpg"
                    title="Contemplative Reptile"
                  />
                </CardMediaBox>
                
                
                <StyledCardContent>
                
                  <Link prefetch href="/test">
                    <CardTitle>ダウンタウン熱血行進曲 それゆけ大運動会</CardTitle>
                  </Link>
                  
                  
                  <Link prefetch href="/test">
                    
                    <CardInfoContainer>
                      
                      <CardInfoBox>
                        <StyledIconAccountCircle />
                        <CardInfoText>100 人</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconStyle />
                        <CardInfoText>アクション</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconSchedule />
                        <CardInfoText>2016/6/14</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconVideogameAsset />
                        <CardInfoText>PC, PS4, Xbox One</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconSupervisorAccount />
                        <CardInfoText>1-5 人</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconMonetizationOn />
                        <CardInfoText>2,400 円</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconBusiness />
                        <CardInfoText>Behaviour Interactive</CardInfoText>
                      </CardInfoBox>
                      
                    </CardInfoContainer>
                    
                  </Link>
                  
                  
                  <BoxLink>
                    <LinkIcons linkArr={stores.header.dataLinkArr} />
                  </BoxLink>
                  
                  <CardChipBox>
                    <StyledChip label="くにおくん" />
                    <StyledChip label="ドッジボール" />
                  </CardChipBox>
                  
                </StyledCardContent>
                
              </StyledCard>
              
              
              <StyledCard>
                
                <CardMediaBox>
                  <StyledCardMedia
                    image="https://gameusers.org/assets/img/game/650/thumbnail.jpg"
                    title="HEAVY RAIN"
                  />
                </CardMediaBox>
                
                
                <StyledCardContent>
                
                  <Link prefetch href="/test">
                    <CardTitle>HEAVY RAIN - 心の軋むとき -</CardTitle>
                  </Link>
                  
                  
                  <Link prefetch href="/test">
                    
                    <CardInfoContainer>
                      
                      <CardInfoBox>
                        <StyledIconAccountCircle />
                        <CardInfoText>200 人</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconStyle />
                        <CardInfoText>アドベンチャー</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconSchedule />
                        <CardInfoText>2010/2/18</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconVideogameAsset />
                        <CardInfoText>PS3, PS4</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconSupervisorAccount />
                        <CardInfoText>1 人</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconMonetizationOn />
                        <CardInfoText>5,690 円</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconBusiness />
                        <CardInfoText>Quantic Dream</CardInfoText>
                      </CardInfoBox>
                      
                    </CardInfoContainer>
                    
                  </Link>
                  
                  
                  <BoxLink>
                    <LinkIcons linkArr={stores.header.dataLinkArr} />
                  </BoxLink>
                  
                  {/*<CardChipBox>
                    <StyledChip label="くにおくん" />
                    <StyledChip label="ドッジボール" />
                  </CardChipBox>*/}
                  
                </StyledCardContent>
                
              </StyledCard>
              
              
              
              <StyledCard>
                
                <CardMediaBox>
                  <StyledCardMedia
                    image="https://gameusers.org/assets/img/game/643/thumbnail.jpg"
                    title="モンスターハンター：ワールド"
                  />
                </CardMediaBox>
                
                
                <StyledCardContent>
                
                  <Link prefetch href="/test">
                    <CardTitle>モンスターハンター：ワールド</CardTitle>
                  </Link>
                  
                  
                  <Link prefetch href="/test">
                    
                    <CardInfoContainer>
                      
                      <CardInfoBox>
                        <StyledIconAccountCircle />
                        <CardInfoText>1000 人</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconStyle />
                        <CardInfoText>アクション</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconSchedule />
                        <CardInfoText>2018/2/14</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconVideogameAsset />
                        <CardInfoText>PS4, Xbox One</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconSupervisorAccount />
                        <CardInfoText>1-4 人</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconMonetizationOn />
                        <CardInfoText>8,240 円</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconBusiness />
                        <CardInfoText>カプコン</CardInfoText>
                      </CardInfoBox>
                      
                    </CardInfoContainer>
                    
                  </Link>
                  
                  
                  <BoxLink>
                    <LinkIcons linkArr={stores.header.dataLinkArr} />
                  </BoxLink>
                  
                  <CardChipBox>
                    <StyledChip label="モンハン" />
                  </CardChipBox>
                  
                </StyledCardContent>
                
              </StyledCard>
              
              
              <StyledCard>
                
                <CardMediaBox>
                  <StyledCardMedia
                    image="https://gameusers.org/assets/img/game/486/thumbnail.jpg"
                    title="地球防衛軍5"
                  />
                </CardMediaBox>
                
                
                <StyledCardContent>
                
                  <Link prefetch href="/test">
                    <CardTitle>地球防衛軍5</CardTitle>
                  </Link>
                  
                  
                  <Link prefetch href="/test">
                    
                    <CardInfoContainer>
                      
                      <CardInfoBox>
                        <StyledIconAccountCircle />
                        <CardInfoText>300 人</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconStyle />
                        <CardInfoText>アクション</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconSchedule />
                        <CardInfoText>2017/5/10</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconVideogameAsset />
                        <CardInfoText>PC, PS4, Xbox One</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconSupervisorAccount />
                        <CardInfoText>1-4 人</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconMonetizationOn />
                        <CardInfoText>7,980 円</CardInfoText>
                      </CardInfoBox>
                      
                      <CardInfoBox>
                        <StyledIconBusiness />
                        <CardInfoText>サンドロット</CardInfoText>
                      </CardInfoBox>
                      
                    </CardInfoContainer>
                    
                  </Link>
                  
                  
                  <BoxLink>
                    <LinkIcons linkArr={stores.header.dataLinkArr} />
                  </BoxLink>
                  
                  <CardChipBox>
                    <StyledChip label="EDF" />
                  </CardChipBox>
                  
                </StyledCardContent>
                
              </StyledCard>
              
              
            </CardBox>
            
            
            
            <Dialog
              open={stores.current.dialogOpen}
              onClose={stores.current.dialogCloseFunction}
            >
              <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
              <div>
                AAA
              </div>
            </Dialog>
            
            
            
            gc/index.js
            
            
          </Container>
          
        </Layout>
      </Provider>
    );
  }
}

export default withRoot(Component);