// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
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

import IconSchedule from '@material-ui/icons/Schedule';
import IconChatBubble from '@material-ui/icons/ChatBubbleOutline';
// import IconGames from '@material-ui/icons/Details';


import initStoreHeader from '../stores/header';

import Layout from '../components/layout';

import withRoot from '../lib/material-ui/withRoot';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// const ContainerLayout = styled(Layout)`
//   // padding: 10px;
//   padding: 10px 0 10px 10px !important;
// `;

const Container = styled.div`
  // padding: 10px;
  padding: 10px 0 10px 10px;
`;

// const StyledSwiper = styled(Swiper)`
//   margin: 0 0 100px 0;
// `;

// const CardBox = styled.div`
//   display: flex;
//   flex-flow: row nowrap;
// `;


const StyledCard = styled(Card)`
  margin: 0 14px 45px 0 !important;
  width: 300px !important;
`;

const CardMediaBox = styled.div`
  // margin: 0 auto 0 0;
  background-color: black;
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
        
          <Container>
            
            
            BBS
            
            <Swiper {...params}>
            
              <StyledCard>
                
                <CardMediaBox>
                  <CardMedia
                    image="/static/img/sample/0r8294vpatkc9nl1.jpg"
                    title="Grand Theft Auto V"
                    style={{ height: 0, paddingTop: '56.25%' }}
                  />
                </CardMediaBox>
                
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
                
                <CardActions>
                  <Button size="small" color="primary">
                    Grand Theft Auto V
                  </Button>
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
                
                <CardMedia
                  image="/static/img/sample/thumbnail-1.jpg"
                  title="Contemplative Reptile"
                  style={{ width: 128, height: 128 }}
                />
                
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    Lizard
                  </Typography>
                  <Typography component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>
                </CardContent>
                
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
                
              </StyledCard>
              
              
              <StyledCard>
                <CardMedia
                  image="/static/img/sample/0r8294vpatkc9nl1.jpg"
                  // image="/static/img/thumbnail.jpg"
                  title="Contemplative Reptile"
                  style={{ width: '100%', height: 0, paddingTop: '56.25%' }}
                />
                
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    Lizard
                  </Typography>
                  <Typography component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </StyledCard>
            
            </Swiper>
          
          
          
          {/*<CardThumbnail>
            <div>
              <CardContent>
                <Typography variant="headline">Live From Space</Typography>
                <Typography variant="subheading" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
              <div>
                ボタン
              </div>
            </div>
            <CardMedia
              style={{ width: 150, height: 150 }}
              image="/static/img/sample/thumbnail-1.jpg"
              title="Live from space album cover"
            />
          </CardThumbnail>*/}
          
          
          
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