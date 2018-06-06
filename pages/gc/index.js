// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';

import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';

// import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';

import Chip from '@material-ui/core/Chip';


import IconSchedule from '@material-ui/icons/Schedule';
import IconStyle from '@material-ui/icons/Style';
import IconVideogameAsset from '@material-ui/icons/VideogameAsset';
import IconAccountCircle from '@material-ui/icons/AccountCircle';
import IconSupervisorAccount from '@material-ui/icons/SupervisorAccount';
import IconBusiness from '@material-ui/icons/Business';
import IconMonetizationOn from '@material-ui/icons/MonetizationOn';

import initStoreCommon from '../../stores/common';
import initStoreHeader from '../../stores/header';

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

// const StyledCard2 = styled(Card)`
//   display: flex;
//   flex-flow: row nowrap;
//   margin: 0 14px 10px 0 !important;
//   min-width: 300px !important;
//   max-width: 300px !important;
//   // width: 300px !important;
//   cursor: pointer !important;
// `;


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
                        <StyledIconAccountCircle />
                        <CardInfoText>100 人</CardInfoText>
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
                        <StyledIconAccountCircle />
                        <CardInfoText>200 人</CardInfoText>
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
              
            </CardBox>
            
            
            {/*<Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="headline">Live From Space</Typography>
            <Typography variant="subheading" color="textSecondary">
              Mac Miller
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton aria-label="Previous">
              {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
            </IconButton>
            <IconButton aria-label="Play/pause">
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            <IconButton aria-label="Next">
              {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
            </IconButton>
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
      </Card>*/}
            gc/index.js
            
            
          </Container>
          
        </Layout>
      </Provider>
    );
  }
}

export default withRoot(Component);