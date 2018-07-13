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

import IconSchedule from '@material-ui/icons/Schedule';
import IconChatBubble from '@material-ui/icons/ChatBubbleOutline';

import initStoreLayout from '../applications/common/layout/stores/layout';
import initStoreIndex from '../applications/index/stores/store';

import Layout from '../applications/common/layout/components/layout';

import withRoot from '../lib/material-ui/withRoot';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 10px 0 10px 10px;
`;

const CardBox = styled.div`
  position: relative;
  margin: 10px 0 0 0;
`;

const CardCategory = styled.h2`
  position: absolute;
  top: 6px;
  left: 6px;
  z-index: 2;
  
  color: white;
  border: solid 2px white;
  // padding: 0.5em;
  padding: 5px 10px 2px 10px;
  border-radius: 0.5em;
  
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.5);
  
  // color: green;
  font-size: 20px;
  font-weight: normal;
  // line-height: 1em;
  // padding: 0 0 10px 0;
  
  pointer-events: none;
`;

const StyledCard = styled(Card)`
  && {
    margin: 0 14px 4px 0;
    width: 300px;
    cursor: pointer;
  }
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
  && {
    padding: 16px 24px 0 24px;
  }
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
  && {
    font-size: 20px;
    margin: 3px 0 0 0;
  }
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
  && {
    font-size: 20px;
    margin: 3px 0 0 0;
  }
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
    
    const storeLayoutInstance = initStoreLayout(props.isServer);
    
    this.stores = {
      layout: storeLayoutInstance,
      current: initStoreIndex(props.isServer, storeLayoutInstance),
      pathname: props.pathname
    };
    
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
        clickable: false,
      }
    };
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider stores={this.stores}>
      
        <Layout headerMenuArr={stores.layout.headerMenuObj.index}>
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>Game Users</title>
          </Head>
        
          <Container>
            
            
          <CardBox>
            
            <CardCategory>BBS</CardCategory>
            
            <Swiper {...params} style={{ margin: '0 0 10px 0' }}>
            
              <StyledCard>
                
                <CardMediaBox onClick={() => stores.layout.handleModalImageOpen('/static/img/sample/0r8294vpatkc9nl1.jpg')}>
                  <CardMedia
                    image="/static/img/sample/0r8294vpatkc9nl1.jpg"
                    title="Grand Theft Auto V"
                    style={{ height: 0, paddingTop: '56.25%' }}
                  />
                </CardMediaBox>
                
                
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
                
                
                <Link prefetch href="/test">
                  <CardActions>
                    <Button size="small" color="primary">
                      Grand Theft Auto V
                    </Button>
                  </CardActions>
                </Link>
                
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
                
                <CardMediaBox onClick={() => stores.layout.handleModalImageOpen('/static/img/sample/g0dzjmsmuu32drqb.jpg')}>
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
                
                
                <Link prefetch href="/test">
                  <CardActions>
                    <Button size="small" color="primary">
                      Metal Gear Solid V: The Phantom Pain
                    </Button>
                  </CardActions>
                </Link>
                
              </StyledCard>
              
              
              
              <StyledCard>
                
                <CardMediaBox onClick={() => stores.layout.handleModalVideoOpen('youtube', '1yIHLQJNvDw')}>
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
                
                
                <Link prefetch href="/test">
                  <CardActions>
                    <Button size="small" color="primary">
                      ゼルダの伝説 ブレス オブ ザ ワイルド
                    </Button>
                  </CardActions>
                </Link>
                
              </StyledCard>
            
            </Swiper>
            
            </CardBox>
            
            
            
            <CardBox>
              
              <CardCategory>募集</CardCategory>
              
              <Swiper {...params}>
                
                <StyledCard>
                  
                  <CardMediaBox onClick={() => stores.layout.handleModalImageOpen('https://gameusers.org/assets/img/u/4d7l2h4e7v35ov6s.jpg')}>
                    <CardMedia
                      image="https://gameusers.org/assets/img/u/4d7l2h4e7v35ov6s.jpg"
                      title="フォーオナー"
                      style={{ height: 0, paddingTop: '56.25%' }}
                    />
                  </CardMediaBox>
                  
                  
                  <Link prefetch href="/test">
                    <StyledCardContent>
                      <CardTitle>ギルドメンバーを募集しています</CardTitle>
                      <Typography component="p">
                        フォーオナーは、伝説の戦士たちの戦いを描いた、壮大なスケールのアクションゲームです。伝説の偉大な戦士―　勇猛なナイト、残忍なヴァイキング、冷酷な侍の中からヒーローを選び、大軍勢のAIが入り乱れる戦地で戦います。
                      </Typography>
                      <CardInfoBox>
                        
                        <CardInfoLeft>
                          <CardInfoDateTimeBox>
                            <StyledIconSchedule />
                            <CardInfoText>5 分前</CardInfoText>
                          </CardInfoDateTimeBox>
                        </CardInfoLeft>
                        
                        <CardInfoRight>
                          <CardInfoCommentsTotalBox>
                            <StyledIconChatBubble />
                            <CardInfoText>310</CardInfoText>
                          </CardInfoCommentsTotalBox>
                        </CardInfoRight>
                        
                      </CardInfoBox>
                    </StyledCardContent>
                  </Link>
                  
                  
                  <Link prefetch href="/test">
                    <CardActions>
                      <Button size="small" color="primary">
                        フォーオナー
                      </Button>
                    </CardActions>
                  </Link>
                  
                </StyledCard>
                
                
                
                <StyledCard>
                  
                  <CardMediaBox>
                    <CardMedia
                      image="https://gameusers.org/assets/img/game/650/thumbnail.jpg"
                      title="HEAVY RAIN"
                      style={{ width: 128, height: 128, margin: '0 auto 0 auto' }}
                    />
                  </CardMediaBox>
                  
                  <StyledCardContent>
                    <CardTitle>アイテム交換希望</CardTitle>
                    <Typography component="p">
                      愛は、どこまで貫けるのか——。人は、どこまで許されるのか———。小さな街で起きた、奇怪な連続誘拐殺人事件を題材にしたサスペンスアドベンチャーゲーム。4人の主人公の視点によって物語が展開され、わずかな手がかりをもとに犯人を追う。
                    </Typography>
                    <CardInfoBox>
                      
                      <CardInfoLeft>
                        <CardInfoDateTimeBox>
                          <StyledIconSchedule />
                          <CardInfoText>1 日前</CardInfoText>
                        </CardInfoDateTimeBox>
                      </CardInfoLeft>
                      
                      <CardInfoRight>
                        <CardInfoCommentsTotalBox>
                          <StyledIconChatBubble />
                          <CardInfoText>9</CardInfoText>
                        </CardInfoCommentsTotalBox>
                      </CardInfoRight>
                      
                    </CardInfoBox>
                  </StyledCardContent>
                  
                  <CardActions>
                    <Button size="small" color="primary">
                      HEAVY RAIN -心の軋むとき-
                    </Button>
                  </CardActions>
                  
                </StyledCard>
                
                
                
                <StyledCard>
                  
                  <CardMediaBox>
                    <CardMedia
                      image="https://gameusers.org/assets/img/game/647/thumbnail.jpg"
                      title="どうぶつの森 ポケットキャンプ"
                      style={{ width: 128, height: 128, margin: '0 auto 0 auto' }}
                    />
                  </CardMediaBox>
                  
                  
                  <Link prefetch href="/test">
                    <StyledCardContent>
                      <CardTitle>一緒に遊びましょう！</CardTitle>
                      <Typography component="p">
                        あなたは、キャンプ場の管理人。どうぶつたちの集まるにぎやかなキャンプ場を作ります。イベントも盛りだくさん。
                      </Typography>
                      <CardInfoBox>
                        
                        <CardInfoLeft>
                          <CardInfoDateTimeBox>
                            <StyledIconSchedule />
                            <CardInfoText>3 日前</CardInfoText>
                          </CardInfoDateTimeBox>
                        </CardInfoLeft>
                        
                        <CardInfoRight>
                          <CardInfoCommentsTotalBox>
                            <StyledIconChatBubble />
                            <CardInfoText>16</CardInfoText>
                          </CardInfoCommentsTotalBox>
                        </CardInfoRight>
                        
                      </CardInfoBox>
                    </StyledCardContent>
                  </Link>
                  
                  
                  <Link prefetch href="/test">
                    <CardActions>
                      <Button size="small" color="primary">
                        どうぶつの森 ポケットキャンプ
                      </Button>
                    </CardActions>
                  </Link>
                  
                </StyledCard>
                
                
                
                <StyledCard>
                  
                  <CardMediaBox onClick={() => stores.layout.handleModalVideoOpen('youtube', 'y-NkzONb2Bw')}>
                    <CardMedia
                      image="https://img.youtube.com/vi/y-NkzONb2Bw/mqdefault.jpg"
                      title="マリオテニス エース"
                      style={{ height: 0, paddingTop: '56.25%' }}
                    />
                    <CardMediaMoviePlayButton src="/static/img/common/video-play-button.png" width="100%" />
                  </CardMediaBox>
                  
                  
                  <Link prefetch href="/test">
                    <StyledCardContent>
                      <CardTitle>フレンド募集</CardTitle>
                      <Typography component="p">
                        Nintendo 公式チャンネル / マリオテニス エース 紹介映像
                      </Typography>
                      <CardInfoBox>
                        
                        <CardInfoLeft>
                          <CardInfoDateTimeBox>
                            <StyledIconSchedule />
                            <CardInfoText>10 日前</CardInfoText>
                          </CardInfoDateTimeBox>
                        </CardInfoLeft>
                        
                        <CardInfoRight>
                          <CardInfoCommentsTotalBox>
                            <StyledIconChatBubble />
                            <CardInfoText>5</CardInfoText>
                          </CardInfoCommentsTotalBox>
                        </CardInfoRight>
                        
                      </CardInfoBox>
                    </StyledCardContent>
                  </Link>
                  
                  
                  <Link prefetch href="/test">
                    <CardActions>
                      <Button size="small" color="primary">
                        マリオテニス エース
                      </Button>
                    </CardActions>
                  </Link>
                  
                </StyledCard>
                
                
                
                <StyledCard>
                  
                  <CardMediaBox>
                    <CardMedia
                      image="https://gameusers.org/assets/img/game/639/thumbnail.jpg"
                      title="アイスクライマー"
                      style={{ width: 128, height: 128, margin: '0 auto 0 auto' }}
                    />
                  </CardMediaBox>
                  
                  
                  <Link prefetch href="/test">
                    <StyledCardContent>
                      <CardTitle>アイスクライマー配信視聴者募集！</CardTitle>
                      <Typography component="p">
                        HEAVY RAIN やります！クリアしたけど超モヤモヤするので全エンディングをYouTubeで見ます。謎はすべて解けるのか？見てや！
                      </Typography>
                      <CardInfoBox>
                        
                        <CardInfoLeft>
                          <CardInfoDateTimeBox>
                            <StyledIconSchedule />
                            <CardInfoText>12 日前</CardInfoText>
                          </CardInfoDateTimeBox>
                        </CardInfoLeft>
                        
                        <CardInfoRight>
                          <CardInfoCommentsTotalBox>
                            <StyledIconChatBubble />
                            <CardInfoText>80</CardInfoText>
                          </CardInfoCommentsTotalBox>
                        </CardInfoRight>
                        
                      </CardInfoBox>
                    </StyledCardContent>
                  </Link>
                  
                  
                  <Link prefetch href="/test">
                    <CardActions>
                      <Button size="small" color="primary">
                        アイスクライマー
                      </Button>
                    </CardActions>
                  </Link>
                  
                </StyledCard>
                
              </Swiper>
              
            </CardBox>
            
          </Container>
          
        </Layout>
      </Provider>
    );
  }
}

export default withRoot(Component);