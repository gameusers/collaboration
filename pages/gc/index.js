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
import IconFolderOpen from '@material-ui/icons/FolderOpen';
import IconVideogameAsset from '@material-ui/icons/VideogameAsset';
import IconAccountCircle from '@material-ui/icons/AccountCircle';
import IconSupervisorAccount from '@material-ui/icons/SupervisorAccount';
import IconBusiness from '@material-ui/icons/Business';

import initStoreCommon from '../../stores/common';
import initStoreHeader from '../../stores/header';

import Layout from '../../components/layout';

import withRoot from '../../lib/material-ui/withRoot';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 10px 0 10px 10px;
`;

const CardBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  // margin: 10px 0 0 0;
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 14px 10px 0 !important;
  min-width: 500px !important;
  max-width: 500px !important;
  // width: 300px !important;
  cursor: pointer !important;
`;

const CardMediaBox = styled.div`
  background-color: #ecf0f1;
`;

const StyledCardContent = styled(CardContent)`
  padding: 8px 16px 8px 16px !important;
`;

const CardTitle = styled.h3`
  font-size: 14px;
  margin: 0 0 8px 0;
  padding: 0 0 4px 0;
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

const StyledIconFolderOpen = styled(IconFolderOpen)`
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





const CardInfoText = styled.div`
  font-size: 12px;
  margin: 0 0 0 4px;
`;


const CardChipBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 6px 0 0 0;
`;



// const BoxDataLink = styled.div`
//   display: flex;
//   flex-flow: row wrap;
//   padding: 5px 10px 0;
// `;





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
                  <CardMedia
                    image="/static/img/sample/thumbnail-1.jpg"
                    title="Contemplative Reptile"
                    style={{ width: 128, height: 128, margin: '0 auto 0 auto' }}
                  />
                </CardMediaBox>
                
                
                <Link prefetch href="/test">
                  <StyledCardContent>
                    <CardTitle>ダウンタウン熱血行進曲 それゆけ大運動会</CardTitle>
                    
                    <CardInfoContainer>
                      
                      <CardInfoBox>
                        <StyledIconFolderOpen />
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
                        <StyledIconBusiness />
                        <CardInfoText>Behaviour Interactive</CardInfoText>
                      </CardInfoBox>
                      
                    </CardInfoContainer>
                    
                    <CardChipBox>
                      <Chip label="くにおくん" style={{ margin: '0 6px 0 0' }} />
                      <Chip label="ドッジボール" />
                    </CardChipBox>
                    
                  </StyledCardContent>
                </Link>
                
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