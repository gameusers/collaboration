// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Error from 'next/error';
import moment from 'moment';
import { animateScroll as scroll } from 'react-scroll';
import Swiper from 'react-id-swiper';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconSchedule from '@material-ui/icons/Schedule';
import IconChatBubble from '@material-ui/icons/ChatBubbleOutline';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { createCsrfToken } from 'app/@modules/csrf.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from 'app/common/layout/v2/components/layout.js';
import Breadcrumbs from 'app/common/layout/v2/components/breadcrumbs.js';
import FormLogout from 'app/logout/index/v2/components/form-logout.js';






// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cardBox = css`
  position: relative;
  margin: 10px 0 0 0;
`;

const cardCategory = css`
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

const styledCard = css`
  && {
    margin: 0 14px 4px 0;
    width: 300px;
    cursor: pointer;
  }
`;

const cardMediaBox = css`
  background-color: black;
  position: relative;
`;

const cardMediaMoviePlayButton = css`
  position: absolute;
  top: 0;
`;

const styledCardContent = css`
  && {
    padding: 16px 24px 0 24px;
  }
`;

const cardTitle = css`
  margin: 0 0 10px 0;
`;

const cardInfoBox = css`
  display: flex;
  flex-flow: row nowrap;
  // justify-content: space-around;
  font-size: 12px;
  margin: 10px 0 0 0;
`;

const cardInfoDateTimeBox = css`
  display: flex;
  flex-flow: row nowrap;
`;

// const CardInfoDateTimeBox = styled.div`
//   display: flex;
//   flex-flow: row nowrap;
// `;

const styledIconSchedule = css`
  && {
    font-size: 20px;
    margin: 3px 0 0 0;
  }
`;

// const StyledIconSchedule = styled(IconSchedule)`
//   && {
//     font-size: 20px;
//     margin: 3px 0 0 0;
//   }
// `;

const cardInfoText = css`
  font-size: 12px;
  margin: 0 0 0 4px;
`;

// const CardInfoText = styled.div`
//   font-size: 12px;
//   margin: 0 0 0 4px;
// `;

const cardInfoRight = css`
  margin: 0 0 0 20px;
`;

// const CardInfoRight = styled.div`
//   // font-size: 12px;
//   margin: 0 0 0 20px;
// `;

const cardInfoCommentsTotalBox = css`
  display: flex;
  flex-flow: row nowrap;
`;

// const CardInfoCommentsTotalBox = styled.div`
//   display: flex;
//   flex-flow: row nowrap;
// `;

const styledIconChatBubble = css`
  && {
    font-size: 20px;
    margin: 3px 0 0 0;
  }
`;

// const StyledIconChatBubble = styled(IconChatBubble)`
//   && {
//     font-size: 20px;
//     margin: 3px 0 0 0;
//   }
// `;





// --------------------------------------------------
//   Function Components
//   URL: https://dev-1.gameusers.org/logout
// --------------------------------------------------

const Component = (props) => {
  
  
  // --------------------------------------------------
  //   Error
  //   参考：https://github.com/zeit/next.js#custom-error-handling
  // --------------------------------------------------
  
  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /pages/gc/[urlID]/forum/[...slug].js - ContainerLayout
  // `);
  
  // console.log(`
  //   ----- props -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(props)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Component - Sidebar
  // --------------------------------------------------
  
  const componentSidebar = '';
  // const componentSidebar =
  //   <ForumNavigation
  //     urlID={props.urlID}
  //     gameCommunities_id={props.gameCommunities_id}
  //   />
  // ;
  
  
  
  
  // --------------------------------------------------
  //   Component - Contents
  // --------------------------------------------------
  
  // --------------------------------------------------
  //   Swiper Setting
  // --------------------------------------------------
  
  const swiperSettingObj = {
    
    slidesPerView: 'auto',
    spaceBetween: 0,
    freeMode: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: false,
    }
    
  };
  
  
  const componentContent = 
    <React.Fragment>
      
      {/*<Breadcrumbs
        arr={props.breadcrumbsArr}
      />*/}
      
      
      {/* Contents */}
      <div
        css={css`
          padding: 10px 0 10px 10px;
        `}
      >
        
        
        <div
          css={cardBox}
        >
          
          <h2
            css={cardCategory}
          >
            フォーラム
          </h2>
          
          
          <Swiper {...swiperSettingObj} style={{ margin: '0 0 10px 0' }}>
            
            <Card css={styledCard}>
              
              <div
                css={cardMediaBox}
                // onClick={() => stores.layout.handleModalImageOpen('/img/sample/0r8294vpatkc9nl1.jpg')}
              >
                <CardMedia
                  image="/img/sample/0r8294vpatkc9nl1.jpg"
                  title="Grand Theft Auto V"
                  style={{ height: 0, paddingTop: '56.25%' }}
                />
              </div>
              
              
              <Link href="/test">
                <CardContent css={styledCardContent}>
                  <h3 css={cardTitle}>GTA5について語ろう！</h3>
                  <Typography component="p">
                    5は面白かった！ストーリーで遊べるイベントも2種類用意されてたので、2週目も楽しめた。売れてるだけのことはある！出荷数7500万。本課金の純利益は2億4000万ドル。GTA5すげーな。
                  </Typography>
                  <div css={cardInfoBox}>
                    
                    <div>
                      <div css={cardInfoDateTimeBox}>
                        <IconSchedule css={styledIconSchedule} />
                        <div css={cardInfoText}>30 分前</div>
                      </div>
                    </div>
                    
                    <div css={cardInfoRight}>
                      <div css={cardInfoCommentsTotalBox}>
                        <div css={styledIconChatBubble} />
                        <div css={cardInfoText}>250</div>
                      </div>
                    </div>
                    
                  </div>
                </CardContent>
              </Link>
              
              
              <Link href="/test">
                <CardActions>
                  <Button size="small" color="primary">
                    Grand Theft Auto V
                  </Button>
                </CardActions>
              </Link>
              
            </Card>
            
            
            
            
            <Card css={styledCard}>
              
              <div
                css={cardMediaBox}
              >
                <CardMedia
                  image="/img/sample/thumbnail-1.jpg"
                  title="Contemplative Reptile"
                  style={{ width: 128, height: 128, margin: '0 auto 0 auto' }}
                />
              </div>
              
              <CardContent css={styledCardContent}>
                <h3 css={cardTitle}>ダウンタウン熱血行進曲 それゆけ大運動会について語ろう！</h3>
                <Typography component="p">
                  1990年に発売されたアクションゲーム、「ダウンタウン熱血行進曲 それゆけ大運動会」。当時は4種目の競技で競い合う、一見普通の運動会ながら「あらゆる場面で殴る、蹴るの妨害行為が可能」というハチャメチャ仕様のアクションパーティゲームとして話題に。
                </Typography>
                <div css={cardInfoBox}>
                  
                  <div>
                    <div css={cardInfoDateTimeBox}>
                      <IconSchedule css={styledIconSchedule} />
                      <div css={cardInfoText}>2 日前</div>
                    </div>
                  </div>
                  
                  <div css={cardInfoRight}>
                    <div css={cardInfoCommentsTotalBox}>
                      <div css={styledIconChatBubble} />
                      <div css={cardInfoText}>3</div>
                    </div>
                  </div>
                  
                </div>
              </CardContent>
              
              <CardActions>
                <Button size="small" color="primary">
                  ダウンタウン熱血行進曲 それゆけ大運動会
                </Button>
              </CardActions>
              
            </Card>
            
            
            
            <Card css={styledCard}>
              
              <div
                css={cardMediaBox}
                //onClick={() => stores.layout.handleModalImageOpen('/img/sample/g0dzjmsmuu32drqb.jpg')}
              >
                <CardMedia
                  image="/img/sample/g0dzjmsmuu32drqb.jpg"
                  title="Metal Gear Solid V: The Phantom Pain"
                  style={{ height: 0, paddingTop: '56.25%' }}
                />
              </div>
              
              
              <Link href="/test">
                <CardContent css={styledCardContent}>
                  <h3 css={cardTitle}>Metal Gear Solid Vについて語ろう！</h3>
                  <Typography component="p">
                    ソ連のアフガニスタン侵攻以来、冷戦は新たな局面に移行していた。1984年、隻眼に義手の男がそのアフガニスタンに現れる。スネークと呼ばれるその男は、過去に米国の非政府諜報機関サイファーにより、歴史の表舞台から消された伝説の傭兵だった。
                  </Typography>
                  <div css={cardInfoBox}>
                    
                    <div>
                      <div css={cardInfoDateTimeBox}>
                        <IconSchedule css={styledIconSchedule} />
                        <div css={cardInfoText}>5 日前</div>
                      </div>
                    </div>
                    
                    <div css={cardInfoRight}>
                      <div css={cardInfoCommentsTotalBox}>
                        <div css={styledIconChatBubble} />
                        <div css={cardInfoText}>34</div>
                      </div>
                    </div>
                    
                  </div>
                </CardContent>
              </Link>
              
              
              <Link href="/test">
                <CardActions>
                  <Button size="small" color="primary">
                    Metal Gear Solid V: The Phantom Pain
                  </Button>
                </CardActions>
              </Link>
              
            </Card>
            
            
            
            <Card css={styledCard}>
              
              <div
                css={cardMediaBox}
                //onClick={() => stores.layout.handleModalVideoOpen('youtube', '1yIHLQJNvDw')}
              >
                <CardMedia
                  image="https://img.youtube.com/vi/1yIHLQJNvDw/mqdefault.jpg"
                  title="ゼルダの伝説 ブレス オブ ザ ワイルド 3rd トレーラー"
                  style={{ height: 0, paddingTop: '56.25%' }}
                />
                <img css={cardMediaMoviePlayButton} src="/img/common/video-play-button.png" width="100%" />
              </div>
              
              
              <Link href="/test">
                <CardContent css={styledCardContent}>
                  <h3 css={cardTitle}>ゼルダの伝説 ブレス オブ ザ ワイルドについて語ろう！</h3>
                  <Typography component="p">
                    Nintendo Switch / Wii U　ゼルダの伝説 ブレス オブ ザ ワイルド 3rd トレーラー
                  </Typography>
                  <div css={cardInfoBox}>
                    
                    <div>
                      <div css={cardInfoDateTimeBox}>
                        <IconSchedule css={styledIconSchedule} />
                        <div css={cardInfoText}>6 日前</div>
                      </div>
                    </div>
                    
                    <div css={cardInfoRight}>
                      <div css={cardInfoCommentsTotalBox}>
                        <div css={styledIconChatBubble} />
                        <div css={cardInfoText}>100</div>
                      </div>
                    </div>
                    
                  </div>
                </CardContent>
              </Link>
              
              
              <Link href="/test">
                <CardActions>
                  <Button size="small" color="primary">
                    ゼルダの伝説 ブレス オブ ザ ワイルド
                  </Button>
                </CardActions>
              </Link>
              
            </Card>
          
          </Swiper>
          
        </div>
        
        
        
        <div
          css={cardBox}
        >
          
          
          <h2
            css={cardCategory}
          >
            募集
          </h2>
          
          
          <Swiper {...swiperSettingObj}>
            
            <Card css={styledCard}>
              
              <div
                css={cardMediaBox}
                //onClick={() => stores.layout.handleModalImageOpen('https://gameusers.org/assets/img/u/4d7l2h4e7v35ov6s.jpg')}
              >
                <CardMedia
                  image="https://gameusers.org/assets/img/u/4d7l2h4e7v35ov6s.jpg"
                  title="フォーオナー"
                  style={{ height: 0, paddingTop: '56.25%' }}
                />
              </div>
              
              
              <Link href="/test">
                <CardContent css={styledCardContent}>
                  <h3 css={cardTitle}>ギルドメンバーを募集しています</h3>
                  <Typography component="p">
                    フォーオナーは、伝説の戦士たちの戦いを描いた、壮大なスケールのアクションゲームです。伝説の偉大な戦士―　勇猛なナイト、残忍なヴァイキング、冷酷な侍の中からヒーローを選び、大軍勢のAIが入り乱れる戦地で戦います。
                  </Typography>
                  <div css={cardInfoBox}>
                    
                    <div>
                      <div css={cardInfoDateTimeBox}>
                        <IconSchedule css={styledIconSchedule} />
                        <div css={cardInfoText}>5 分前</div>
                      </div>
                    </div>
                    
                    <div css={cardInfoRight}>
                      <div css={cardInfoCommentsTotalBox}>
                        <div css={styledIconChatBubble} />
                        <div css={cardInfoText}>310</div>
                      </div>
                    </div>
                    
                  </div>
                </CardContent>
              </Link>
              
              
              <Link href="/test">
                <CardActions>
                  <Button size="small" color="primary">
                    フォーオナー
                  </Button>
                </CardActions>
              </Link>
              
            </Card>
            
            
            
            <Card css={styledCard}>
              
              <div
                css={cardMediaBox}
              >
                <CardMedia
                  image="https://gameusers.org/assets/img/game/650/thumbnail.jpg"
                  title="HEAVY RAIN"
                  style={{ width: 128, height: 128, margin: '0 auto 0 auto' }}
                />
              </div>
              
              <CardContent css={styledCardContent}>
                <h3 css={cardTitle}>アイテム交換希望</h3>
                <Typography component="p">
                  愛は、どこまで貫けるのか——。人は、どこまで許されるのか———。小さな街で起きた、奇怪な連続誘拐殺人事件を題材にしたサスペンスアドベンチャーゲーム。4人の主人公の視点によって物語が展開され、わずかな手がかりをもとに犯人を追う。
                </Typography>
                <div css={cardInfoBox}>
                  
                  <div>
                    <div css={cardInfoDateTimeBox}>
                      <IconSchedule css={styledIconSchedule} />
                      <div css={cardInfoText}>1 日前</div>
                    </div>
                  </div>
                  
                  <div css={cardInfoRight}>
                    <div css={cardInfoCommentsTotalBox}>
                      <div css={styledIconChatBubble} />
                      <div css={cardInfoText}>9</div>
                    </div>
                  </div>
                  
                </div>
              </CardContent>
              
              <CardActions>
                <Button size="small" color="primary">
                  HEAVY RAIN -心の軋むとき-
                </Button>
              </CardActions>
              
            </Card>
            
            
            
            <Card css={styledCard}>
              
              <div
                css={cardMediaBox}
              >
                <CardMedia
                  image="https://gameusers.org/assets/img/game/647/thumbnail.jpg"
                  title="どうぶつの森 ポケットキャンプ"
                  style={{ width: 128, height: 128, margin: '0 auto 0 auto' }}
                />
              </div>
              
              
              <Link href="/test">
                <CardContent css={styledCardContent}>
                  <h3 css={cardTitle}>一緒に遊びましょう！</h3>
                  <Typography component="p">
                    あなたは、キャンプ場の管理人。どうぶつたちの集まるにぎやかなキャンプ場を作ります。イベントも盛りだくさん。
                  </Typography>
                  <div css={cardInfoBox}>
                    
                    <div>
                      <div css={cardInfoDateTimeBox}>
                        <IconSchedule css={styledIconSchedule} />
                        <div css={cardInfoText}>3 日前</div>
                      </div>
                    </div>
                    
                    <div css={cardInfoRight}>
                      <div css={cardInfoCommentsTotalBox}>
                        <div css={styledIconChatBubble} />
                        <div css={cardInfoText}>16</div>
                      </div>
                    </div>
                    
                  </div>
                </CardContent>
              </Link>
              
              
              <Link href="/test">
                <CardActions>
                  <Button size="small" color="primary">
                    どうぶつの森 ポケットキャンプ
                  </Button>
                </CardActions>
              </Link>
              
            </Card>
            
            
            
            <Card css={styledCard}>
              
              <div
                css={cardMediaBox}
                //onClick={() => stores.layout.handleModalVideoOpen('youtube', 'y-NkzONb2Bw')}
              >
                <CardMedia
                  image="https://img.youtube.com/vi/y-NkzONb2Bw/mqdefault.jpg"
                  title="マリオテニス エース"
                  style={{ height: 0, paddingTop: '56.25%' }}
                />
                <img css={cardMediaMoviePlayButton} src="/img/common/video-play-button.png" width="100%" />
              </div>
              
              
              <Link href="/test">
                <CardContent css={styledCardContent}>
                  <h3 css={cardTitle}>フレンド募集</h3>
                  <Typography component="p">
                    Nintendo 公式チャンネル / マリオテニス エース 紹介映像
                  </Typography>
                  <div css={cardInfoBox}>
                    
                    <div>
                      <div css={cardInfoDateTimeBox}>
                        <IconSchedule css={styledIconSchedule} />
                        <div css={cardInfoText}>10 日前</div>
                      </div>
                    </div>
                    
                    <div css={cardInfoRight}>
                      <div css={cardInfoCommentsTotalBox}>
                        <div css={styledIconChatBubble} />
                        <div css={cardInfoText}>5</div>
                      </div>
                    </div>
                    
                  </div>
                </CardContent>
              </Link>
              
              
              <Link href="/test">
                <CardActions>
                  <Button size="small" color="primary">
                    マリオテニス エース
                  </Button>
                </CardActions>
              </Link>
              
            </Card>
            
            
            
            <Card css={styledCard}>
              
              <div
                css={cardMediaBox}
              >
                <CardMedia
                  image="https://gameusers.org/assets/img/game/639/thumbnail.jpg"
                  title="アイスクライマー"
                  style={{ width: 128, height: 128, margin: '0 auto 0 auto' }}
                />
              </div>
              
              
              <Link href="/test">
                <CardContent css={styledCardContent}>
                  <h3 css={cardTitle}>アイスクライマー配信視聴者募集！</h3>
                  <Typography component="p">
                    HEAVY RAIN やります！クリアしたけど超モヤモヤするので全エンディングをYouTubeで見ます。謎はすべて解けるのか？見てや！
                  </Typography>
                  <div css={cardInfoBox}>
                    
                    <div>
                      <div css={cardInfoDateTimeBox}>
                        <IconSchedule css={styledIconSchedule} />
                        <div css={cardInfoText}>12 日前</div>
                      </div>
                    </div>
                    
                    <div css={cardInfoRight}>
                      <div css={cardInfoCommentsTotalBox}>
                        <div css={styledIconChatBubble} />
                        <div css={cardInfoText}>80</div>
                      </div>
                    </div>
                    
                  </div>
                </CardContent>
              </Link>
              
              
              <Link href="/test">
                <CardActions>
                  <Button size="small" color="primary">
                    アイスクライマー
                  </Button>
                </CardActions>
              </Link>
              
            </Card>
            
          </Swiper>
          
        </div>
        
        
      </div>
      
      
      
      
      <div style={{ margin: '36px 24px' }}>
        
        <p>------------------------------</p>
        
        <p style={{ margin: '0 0 24px 0', fontWeight: 'bold' }}>[現在、作成中のページ]</p>
        
        <p>ログイン<br />
        <a href={`/login`}>{`/login`}</a></p>
        
        <p>ログアウト<br />
        <a href={`/logout`}>{`/logout`}</a></p>
        
        <p>ゲームコミュニティ<br />
        <a href={`/gc/Dead-by-Daylight`}>{`/gc/Dead-by-Daylight`}</a></p>
        
        <p>ユーザーコミュニティ<br />
        <a href={`/uc/community1`}>{`/uc/community1`}</a></p>
        
        <p>ユーザー<br />
        <a href={`/ur/user1`}>{`/ur/user1`}</a></p>
        
        <p>------------------------------</p>
        
      </div>
      
    </React.Fragment>
  ;
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Layout
      title={props.title}
      componentSidebar={componentSidebar}
      componentContent={componentContent}
      
      headerObj={props.headerObj}
      headerNavMainArr={props.headerNavMainArr}
    />
  );
  
  
};




/**
 * getServerSideProps
 * @param {Object} req - リクエスト
 * @param {Object} res - レスポンス
 * @param {Object} query - クエリー
 */
export async function getServerSideProps({ req, res, query }) {
  
  
  // --------------------------------------------------
  //   CSRF
  // --------------------------------------------------
  
  createCsrfToken(req, res);
  
  
  
  
  // --------------------------------------------------
  //   Cookie & Accept Language
  // --------------------------------------------------
  
  const reqHeadersCookie = lodashGet(req, ['headers', 'cookie'], '');
  const reqAcceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
  
  
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const ISO8601 = moment().utc().toISOString();
  
  
  
  
  // --------------------------------------------------
  //   Fetch
  // --------------------------------------------------
  
  const resultObj = await fetchWrapper({
    
    urlApi: encodeURI(`${process.env.NEXT_PUBLIC_URL_API}/v2/common/initial-props`),
    methodType: 'GET',
    reqHeadersCookie,
    reqAcceptLanguage,
    
  });
  
  const statusCode = lodashGet(resultObj, ['statusCode'], 400);
  const dataObj = lodashGet(resultObj, ['data'], {});
  
  
  
  
  // --------------------------------------------------
  //   dataObj
  // --------------------------------------------------
  
  const login = lodashGet(dataObj, ['login'], false);
  const loginUsersObj = lodashGet(dataObj, ['loginUsersObj'], {});
  const headerObj = lodashGet(dataObj, ['headerObj'], {});
  
  
  
  
  // --------------------------------------------------
  //   Title
  // --------------------------------------------------
  
  const title = `Game Users`;
  
  
  
  
  // --------------------------------------------------
  //   Header Navigation Link
  // --------------------------------------------------
  
  const headerNavMainArr = [
    
    {
      name: 'トップ',
      href: '/',
      as: '/',
      active: true,
    },
    // {
    //   name: 'ゲームコミュニティ',
    //   href: '/gc',
    //   as: '/gc',
    //   active: false,
    // },
    // {
    //   name: 'ユーザーコミュニティ',
    //   href: '/uc',
    //   as: '/uc',
    //   active: false,
    // },
    
  ];
  
  
  
  
  // --------------------------------------------------
  //   パンくずリスト
  // --------------------------------------------------
  
  // const breadcrumbsArr = [
    
  //   {
  //     type: 'logout',
  //     anchorText: '',
  //     href: '',
  //     as: '',
  //   },
    
  // ];
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /pages/logout/index.js
  // `);
  
  // console.log(`
  //   ----- resultObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return { 
    
    props: {
      
      reqAcceptLanguage,
      ISO8601,
      statusCode,
      login,
      loginUsersObj,
      title,
      headerObj,
      headerNavMainArr,
      // breadcrumbsArr,
      
    }
    
  };
  
  
}




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;