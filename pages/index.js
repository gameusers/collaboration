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
import Link from 'next/link';
import Error from 'next/error';
import moment from 'moment';
// import { animateScroll as scroll } from 'react-scroll';
// import Swiper from 'react-id-swiper';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

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
//   States
// ---------------------------------------------

import { ContainerStateLayout } from 'app/@states/layout.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { createCsrfToken } from 'app/@modules/csrf.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from 'app/common/layout/v2/layout.js';
import FeedCard from 'app/common/feed/card.js';


// ---------------------------------------------
//   install Swiper components
// ---------------------------------------------

SwiperCore.use([Pagination]);




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cardBox = css`
  position: relative;
  margin: 0 0 10px 0;
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
//   URL: http://localhost:8080/
// --------------------------------------------------

/**
 * レイアウト
 * @param {Object} props - Props
 */
const ContainerLayout = (props) => {
  

  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    feedObj = {},
    
  } = props;

  
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
  //   Component - Forum
  // --------------------------------------------------
  
  let dataObj = lodashGet(feedObj, ['forumThreadsGcObj', 'dataObj'], {});
  let arr = lodashGet(feedObj, ['forumThreadsGcObj', 'page1Obj', 'arr'], []);

  // console.log(`
  //   ----- dataObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(dataObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  // console.log(`
  //   ----- arr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);

  const componentForumArr = [];
  
  for (const [index, _id] of arr.entries()) {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const obj = dataObj[_id];
    
    
    // --------------------------------------------------
    //   Push
    // --------------------------------------------------
    
    componentForumArr.push(
      <SwiperSlide
        key={index}
      >
        <FeedCard
          obj={obj}
        />
      </SwiperSlide>
    );
    
    
  }




  // --------------------------------------------------
  //   Component - Recruitment
  // --------------------------------------------------
  
  dataObj = lodashGet(feedObj, ['forumRecruitmentsObj', 'dataObj'], {});
  arr = lodashGet(feedObj, ['forumRecruitmentsObj', 'page1Obj', 'arr'], []);


  const componentRecruitmentArr = [];
  
  for (const [index, _id] of arr.entries()) {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const obj = dataObj[_id];
    
    
    // --------------------------------------------------
    //   Push
    // --------------------------------------------------
    
    componentRecruitmentArr.push(
      <SwiperSlide
        key={index}
      >
        <FeedCard
          obj={obj}
        />
      </SwiperSlide>
    );
    
    
  }
  
  
  // --------------------------------------------------
  //   Component - Contents
  // --------------------------------------------------
  
  // --------------------------------------------------
  //   Swiper Setting
  // --------------------------------------------------
  
  // const swiperSettingObj = {
    
  //   slidesPerView: 'auto',
  //   spaceBetween: 0,
  //   freeMode: true,
  //   pagination: {
  //     el: '.swiper-pagination',
  //     clickable: false,
  //   }
    
  // };
  
  
  const componentContent = 
    <React.Fragment>
      
      
      {/* Contents */}
      <div
        css={css`
          padding: 10px 0 10px 10px;
        `}
      >
        
        
        <div css={cardBox}>
          
          <h2 css={cardCategory}>フォーラム</h2>
          
          <Swiper
            spaceBetween={14}
            slidesPerView={'auto'}
            // centeredSlides={true}
            // slidesPerView={'auto'}
            // slidesPerView={3}
            // autoHeight={true}
            freeMode={true}
            // initialSlide={2}
            // width={300}
            // navigation
            pagination={{ clickable: false }}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            {componentForumArr}

          </Swiper>
          
        </div>
        



        <div css={cardBox}>
          
          <h2 css={cardCategory}>募集</h2>
          
          <Swiper
            spaceBetween={14}
            slidesPerView={'auto'}
            freeMode={true}
            pagination={{ clickable: false }}
          >
            {componentRecruitmentArr}

          </Swiper>
          
        </div>
        
        
        {/* <div
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
          
        </div> */}
        
        
      </div>
      
      
      
      
      <div style={{ margin: '36px 24px' }}>
        
        <p>------------------------------</p>
        
        <p style={{ margin: '0 0 24px 0' }}>借りてるVPSのスペックが足りなくてよく落ちる。アクセスしてエラーが出ても気にせんといてや。</p>
        
        <p>一緒にこの神サイトを作ってくれる開発者を募集しています！</p>
        <p>開発者の取り分が可能な限り最大になるようなサイトにしたいという目標を掲げています。</p>
        <p>利用するリソース（サーバー代など）の必要経費を除いて、それ以外はすべて開発者の取り分にしたいのです。これはサイトの主要コンテンツではない独立したコンテンツをサイト内で公開した場合の想定です。</p>
        <p>例えば、それぞれが各自いろいろな場所に自作のアプリケーションを公開しても、陰が生まれるほどの大樹にはなりえません。</p>
        <p>そこで最大限の収益を得られる環境を作り、様々な開発者が寄り集まることのメリットを生み出したいのです。</p>
        <p>実現できれば面白いと思いませんか？</p>
        
        <p style={{ margin: '24px 0 24px 0' }}><a href="https://gameusers.org/dev/blog/">開発ブログ</a> / <a href="https://github.com/gameusers/collaboration">GitHub</a></p>
        
        
        
        
        <p style={{ margin: '0 0 24px 0', fontWeight: 'bold' }}>[現在、作成中のページ]</p>
        
        {/*<p>ログイン<br />
        <a href={`/login`}>{`/login`}</a></p>
        
        <p>ログアウト<br />
        <a href={`/logout`}>{`/logout`}</a></p>
        
        <p>ゲームコミュニティ<br />
        <a href={`/gc/Dead-by-Daylight`}>{`/gc/Dead-by-Daylight`}</a></p>
        
        <p>ユーザーコミュニティ<br />
        <a href={`/uc/community1`}>{`/uc/community1`}</a></p>
        
        <p>ユーザー<br />
        <a href={'/ur/user1'}>{`/ur/user1`}</a></p>*/}
        
        <p>ログイン</p>
        <Link href={'/login'} as={'/login'}>
          <a>/login</a>
        </Link>
        
        <p>ログアウト</p>
        <Link href={'/logout'} as={'/logout'}>
          <a>/logout</a>
        </Link>
        
        <p>ゲームコミュニティ</p>
        <Link href={'/gc/[urlID]'} as={'/gc/Dead-by-Daylight'}>
          <a>/gc/Dead-by-Daylight</a>
        </Link>
        
        <p>ユーザーコミュニティ</p>
        <Link href={'/uc/[userCommunityID]'} as={'/uc/community1'}>
          <a>/uc/community1</a>
        </Link>
        
        <p>ユーザー</p>
        <Link href={'/ur/[userID]'} as={'/ur/user1'}>
          <a>/ur/user1</a>
        </Link>
        
        
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
      // componentSidebar={}
      componentContent={componentContent}
      
      headerObj={props.headerObj}
      headerNavMainArr={props.headerNavMainArr}
    />
  );
  
  
};




/**
 * コンポーネント / このページ独自のステートを設定する
 * @param {Object} props - Props
 */
const Component = (props) => {
  
  
  // --------------------------------------------------
  //   Error
  //   参考：https://nextjs.org/docs/advanced-features/custom-error-page#reusing-the-built-in-error-page
  // --------------------------------------------------
  
  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return <ContainerLayout {...props} />;
  
  
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
    
    urlApi: encodeURI(`${process.env.NEXT_PUBLIC_URL_API}/v2/index`),
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
  const feedObj = lodashGet(dataObj, ['feedObj'], {});
  
  
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

      feedObj,
      
    }
    
  };
  
  
}




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;