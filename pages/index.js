// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';

import Swiper from 'react-id-swiper';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';

// import Dialog from '@material-ui/core/Dialog';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';


import IconSchedule from '@material-ui/icons/Schedule';
import IconChatBubble from '@material-ui/icons/ChatBubbleOutline';
// import IconGames from '@material-ui/icons/Details';

import initStoreCommon from '../stores/common';
import initStoreHeader from '../stores/header';

import Layout from '../components/layout';

import withRoot from '../lib/material-ui/withRoot';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 10px 0 10px 10px;
`;

const StyledCard = styled(Card)`
  margin: 0 14px 45px 0 !important;
  width: 300px !important;
  cursor: pointer  !important;
`;

const CardMediaBox = styled.div`
  background-color: black;
  position: relative;
`;

const CardMediaMoviePlayButton = styled.img`
  position: absolute;
  top: 0;
`;

const StyledCardContent = styled(CardContent)`
  padding: 16px 24px 0 24px !important;
`;

const CardTitle = styled.h3`
  margin: 0 0 10px 0;
`;

const CardInfoBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  // justify-content: space-around;
  font-size: 12px;
  margin: 10px 0 0 0;
`;

const CardInfoLeft = styled.div`
  // font-size: 12px;
  // margin: 10px 0 0 0;
`;

const CardInfoDateTimeBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const StyledIconSchedule = styled(IconSchedule)`
  font-size: 20px !important;
  margin: 3px 0 0 0 !important;
`;

const CardInfoText = styled.div`
  font-size: 12px;
  margin: 0 0 0 4px;
`;

const CardInfoRight = styled.div`
  // font-size: 12px;
  margin: 0 0 0 20px;
`;

const CardInfoCommentsTotalBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const StyledIconChatBubble = styled(IconChatBubble)`
  font-size: 20px !important;
  margin: 3px 0 0 0 !important;
`;

// const StyledCardActions = styled(CardActions)`
//   padding: 0 16px 6px !important;
// `;








// const StyledCardMedia = styled(CardMedia)`
//   height: 0;
//   padding-top: '56.25%';
// `;


// const CardThumbnail = styled(Card)`
//   display: flex;
//   width: 500px;
// `;


const ContainerVideo = styled.div`
  position: relative;
  // max-width: 100%;
  height: 0;
  padding-top: 56.25%;
`;

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;




// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/
// --------------------------------------------------

@observer
class Component extends React.Component {
  
  // static getInitialProps({ pathname, query, asPath, req, res, jsonPageRes, err }) {
  
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
    
    
    
    const params = {
      slidesPerView: 'auto',
      spaceBetween: 0,
      freeMode: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      }
    };
    
    return (
      <Provider stores={this.stores}>
      
        <Layout>
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>index.js</title>
          </Head>
        
          <Container>
            
            
            BBS
            
            <Swiper {...params}>
            
              <StyledCard>
                
                {/*<Link prefetch href='/test'>*/}
                  {/*<CardMediaBox onClick={stores.common.modalImageOpenFunction}>*/}
                  <CardMediaBox onClick={() => stores.common.modalImageOpenFunction('/static/img/sample/0r8294vpatkc9nl1.jpg')}>
                    <CardMedia
                      image="/static/img/sample/0r8294vpatkc9nl1.jpg"
                      title="Grand Theft Auto V"
                      style={{ height: 0, paddingTop: '56.25%' }}
                    />
                  </CardMediaBox>
                {/*</Link>*/}
                
                
                <Link prefetch href="/test">
                  <StyledCardContent>
                    <CardTitle>GTA5について語ろう！</CardTitle>
                    <Typography component="p">
                      5は面白かった！ストーリーで遊べるイベントも2種類用意されてたので、2週目も楽しめた。売れてるだけのことはある！出荷数7500万。本課金の純利益は2億4000万ドル。GTA5すげーな。
                    </Typography>
                    <CardInfoBox>
                      
                      <CardInfoLeft>
                        <CardInfoDateTimeBox>
                          <StyledIconSchedule />
                          <CardInfoText>30 分前</CardInfoText>
                        </CardInfoDateTimeBox>
                      </CardInfoLeft>
                      
                      <CardInfoRight>
                        <CardInfoCommentsTotalBox>
                          <StyledIconChatBubble />
                          <CardInfoText>250</CardInfoText>
                        </CardInfoCommentsTotalBox>
                      </CardInfoRight>
                      
                    </CardInfoBox>
                  </StyledCardContent>
                </Link>
                
                
                <CardActions>
                  <Link prefetch href="/a">
                    <Button size="small" color="primary">
                      Grand Theft Auto V
                    </Button>
                  </Link>
                </CardActions>
                
              </StyledCard>
              
              
              
              
              <StyledCard>
                
                <CardMediaBox>
                  <CardMedia
                    image="/static/img/sample/thumbnail-1.jpg"
                    title="Contemplative Reptile"
                    style={{ width: 128, height: 128, margin: '0 auto 0 auto' }}
                  />
                </CardMediaBox>
                
                <StyledCardContent>
                  <CardTitle>ダウンタウン熱血行進曲 それゆけ大運動会について語ろう！</CardTitle>
                  <Typography component="p">
                    1990年に発売されたアクションゲーム、「ダウンタウン熱血行進曲 それゆけ大運動会」。当時は4種目の競技で競い合う、一見普通の運動会ながら「あらゆる場面で殴る、蹴るの妨害行為が可能」というハチャメチャ仕様のアクションパーティゲームとして話題に。
                  </Typography>
                  <CardInfoBox>
                    
                    <CardInfoLeft>
                      <CardInfoDateTimeBox>
                        <StyledIconSchedule />
                        <CardInfoText>2 日前</CardInfoText>
                      </CardInfoDateTimeBox>
                    </CardInfoLeft>
                    
                    <CardInfoRight>
                      <CardInfoCommentsTotalBox>
                        <StyledIconChatBubble />
                        <CardInfoText>3</CardInfoText>
                      </CardInfoCommentsTotalBox>
                    </CardInfoRight>
                    
                  </CardInfoBox>
                </StyledCardContent>
                
                <CardActions>
                  <Button size="small" color="primary">
                    ダウンタウン熱血行進曲 それゆけ大運動会
                  </Button>
                </CardActions>
                
              </StyledCard>
              
              
              
              <StyledCard>
                
                <CardMediaBox onClick={() => stores.common.modalImageOpenFunction('/static/img/sample/g0dzjmsmuu32drqb.jpg')}>
                  <CardMedia
                    image="/static/img/sample/g0dzjmsmuu32drqb.jpg"
                    title="Metal Gear Solid V: The Phantom Pain"
                    style={{ height: 0, paddingTop: '56.25%' }}
                  />
                </CardMediaBox>
                
                
                <Link prefetch href="/test">
                  <StyledCardContent>
                    <CardTitle>Metal Gear Solid Vについて語ろう！</CardTitle>
                    <Typography component="p">
                      ソ連のアフガニスタン侵攻以来、冷戦は新たな局面に移行していた。1984年、隻眼に義手の男がそのアフガニスタンに現れる。スネークと呼ばれるその男は、過去に米国の非政府諜報機関サイファーにより、歴史の表舞台から消された伝説の傭兵だった。
                    </Typography>
                    <CardInfoBox>
                      
                      <CardInfoLeft>
                        <CardInfoDateTimeBox>
                          <StyledIconSchedule />
                          <CardInfoText>5 日前</CardInfoText>
                        </CardInfoDateTimeBox>
                      </CardInfoLeft>
                      
                      <CardInfoRight>
                        <CardInfoCommentsTotalBox>
                          <StyledIconChatBubble />
                          <CardInfoText>34</CardInfoText>
                        </CardInfoCommentsTotalBox>
                      </CardInfoRight>
                      
                    </CardInfoBox>
                  </StyledCardContent>
                </Link>
                
                
                <CardActions>
                  <Link prefetch href="/a">
                    <Button size="small" color="primary">
                      Metal Gear Solid V: The Phantom Pain
                    </Button>
                  </Link>
                </CardActions>
                
              </StyledCard>
              
              
              
              <StyledCard>
                
                <CardMediaBox onClick={() => stores.common.modalVideoOpenFunction('youtube', '1yIHLQJNvDw')}>
                  <CardMedia
                    image="https://img.youtube.com/vi/1yIHLQJNvDw/mqdefault.jpg"
                    title="ゼルダの伝説 ブレス オブ ザ ワイルド 3rd トレーラー"
                    style={{ height: 0, paddingTop: '56.25%' }}
                  />
                  <CardMediaMoviePlayButton src="/static/img/common/video-play-button.png" width="100%" />
                </CardMediaBox>
                
                
                <Link prefetch href="/test">
                  <StyledCardContent>
                    <CardTitle>ゼルダの伝説 ブレス オブ ザ ワイルドについて語ろう！</CardTitle>
                    <Typography component="p">
                      Nintendo Switch / Wii U　ゼルダの伝説 ブレス オブ ザ ワイルド 3rd トレーラー
                    </Typography>
                    <CardInfoBox>
                      
                      <CardInfoLeft>
                        <CardInfoDateTimeBox>
                          <StyledIconSchedule />
                          <CardInfoText>6 日前</CardInfoText>
                        </CardInfoDateTimeBox>
                      </CardInfoLeft>
                      
                      <CardInfoRight>
                        <CardInfoCommentsTotalBox>
                          <StyledIconChatBubble />
                          <CardInfoText>100</CardInfoText>
                        </CardInfoCommentsTotalBox>
                      </CardInfoRight>
                      
                    </CardInfoBox>
                  </StyledCardContent>
                </Link>
                
                
                <CardActions>
                  <Link prefetch href="/a">
                    <Button size="small" color="primary">
                      ゼルダの伝説 ブレス オブ ザ ワイルド
                    </Button>
                  </Link>
                </CardActions>
                
              </StyledCard>
            
            </Swiper>
          
          
          
          
          
          {/*<iframe width="560" height="315" src="https://www.youtube.com/embed/1yIHLQJNvDw" frameborder="0" allowfullscreen></iframe>
          
          <ContainerVideo>
            <VideoIframe width="560" height="315" src="https://www.youtube.com/embed/1yIHLQJNvDw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen />
          </ContainerVideo>*/}
          
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          
          
          // 占い　マミ○　サヤカ●
          // 1日目　言動が怪しかったから占いました
          
          
          
          </Container>
          
        </Layout>
      </Provider>
    );
  }
}

// export default Component;

export default withRoot(Component);