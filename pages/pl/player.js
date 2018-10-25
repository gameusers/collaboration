// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');



// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import Head from 'next/head';
// import Link from 'next/link';
import getConfig from 'next/config';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';



// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconId from '@material-ui/icons/Person';
import IconPassword from '@material-ui/icons/Lock';
import IconPasswordOutlined from '@material-ui/icons/LockTwoTone';
import IconVisibility from '@material-ui/icons/Visibility';
import IconVisibilityOff from '@material-ui/icons/VisibilityOff';
import IconMailOutline from '@material-ui/icons/MailOutline';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreIndex from '../../applications/common/stores/index';
import initStoreCardPlayer from '../../applications/common/card/player/stores/player';
import initStorePlayerPlayer from '../../applications/pl/player/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../applications/common/layout/components/layout';
import Panel from '../../applications/common/layout/components/panel';
// import TermsOfService from '../../applications/common/layout/components/terms-of-service';
import CardPlayer from '../../applications/common/card/player/components/player';


// ---------------------------------------------
//   Material UI を Next.js で利用するため
// ---------------------------------------------

import withRoot from '../../lib/material-ui/withRoot';





// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 10px 10px 18px 10px;
  
  @media screen and (max-width: 480px) {
    padding: 10px 0 18px 0;
  }
`;


// ---------------------------------------------
//   Card
// ---------------------------------------------

const CardTopBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0;
  padding: 12px 4px 10px 12px;
  // background-color: thistle;
`;


// ---------------------------------------------
//   Card / User
// ---------------------------------------------

const UserBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
  padding: 0;
  // background-color: red;
`;

const UserThumbnailBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0 0 0 0;
  // background-color: blue;
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  // margin: 15px 12px 12px 10px;
  padding: 4px 0 0 10px;
  // background-color: thistle;
  
  max-width: 320px;
  
  @media screen and (max-width: 480px) {
    max-width: initial;
  }
`;

const UserNameBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 0;
  // padding: 0 12px 0 0;
  // line-height: 1em;
  // word-wrap: break-word;
  // background-color: thistle;
`;


// ---------------------------------------------
//   Card / Expand More
// ---------------------------------------------

const ExpandMoreBox = styled.div`
  margin: 0 0 0 auto;
  padding: 0;
  // background-color: pink;
`;








// ---------------------------------------------
//   フォーム
// ---------------------------------------------

const Description = styled.div`
  // width: 100%;
  margin: 0 0 16px 0;
  // padding: 0 30px 0 0;
  // background-color: pink;
`;










// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/pl/***
// --------------------------------------------------

@observer
class Component extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  static async getInitialProps({ pathname, req, res }) {
    
    const isServer = !!req;
    
    
    // --------------------------------------------------
    //   publicRuntimeConfig
    // --------------------------------------------------
    
    const { publicRuntimeConfig } = getConfig();
    
    
    // ---------------------------------------------
    //   Fetch
    // ---------------------------------------------
    
    // ----------------------------------------
    //   API URL
    // ----------------------------------------
    
    // const apiUrl = `${publicRuntimeConfig.apiUrl}/v1/login/initialProps`;
    
    
    // // ----------------------------------------
    // //   Headers
    // // ----------------------------------------
    
    // const headersObj = {
    //   'Accept': 'application/json'
    // };
    
    // if (isServer) {
    //   headersObj['Cookie'] = req.headers.cookie;
    // }
    
    
    // await fetch(apiUrl, {
    //   method: 'GET',
    //   credentials: 'same-origin',
    //   mode: 'same-origin',
    //   headers: headersObj
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       return response.json().then((jsonObj) => {
    //     　　throw new Error(jsonObj.errorsArr[0].message);
    //     　});
    //     }
        
    //     return response.json();
    //   })
    //   .then((jsonObj) => {
        
    //     console.log(`then 1`);
    //     // console.dir(jsonObj);
        
        
        
    //     // --------------------------------------------------
    //     //   Console 出力
    //     // --------------------------------------------------
        
    //     // console.log(chalk`
    //     //   isServer: {green ${isServer}}
    //     //   req.isAuthenticated(): {green ${req.isAuthenticated()}}
    //     // `);
        
    //     // console.log(`
    //     //   req.session: \n${util.inspect(req.session, { colors: true, depth: null })}
    //     // `);
        
    //     // console.log(`
    //     //   jsonObj: \n${util.inspect(jsonObj, { colors: true, depth: null })}
    //     // `);
        
        
    //     // --------------------------------------------------
    //     //   ログインしている場合はログアウトページにリダイレクト
    //     // --------------------------------------------------
        
    //     if (jsonObj.login) {
    //       res.redirect('/logout');
    //       res.end();
    //       return {};
    //     }
        
    //   })
    //   .catch((error) => {
        
    //     console.log(`catch: ${error}`);
        
    //   });
    
    
    
    
    const dataObj = {
      dataLoginUserObj: {},
      dataUserObj: {},
      dataUserCommunityObj: {},
      layoutPanelExpandedObj: {},
      userCommunityId: 'p0V_RsaT1l8',
      bbsNavigationId: 'XcczkfiRN9f',
      bbsNavigationOpenedTabNoObj: {},
      bbsNavigationThreadListObj: {},
      bbsObj: {},
    };
    
    
    // ---------------------------------------------
    //   Data - User
    // ---------------------------------------------
    
    dataObj.dataUserObj = {
      'a8b0gX6lMIz': {
        name: 'あづみデッドバイデイライト',
        status: 'プロハンター',
        playerId: 'az1979',
        playerPage: '/pl/az1979',
        level: 999,
        accessDate: '2018-08-06T08:50:00Z',
        cardPlayerObj: {
          birthday: '2002-10-19T00:00:00Z',
          sex: 'male',
        },
        cardGameObj: {
          'reaBMD4W6': {
            birthday: '2002-10-19T00:00:00Z',
            sex: 'male',
          }
        }
          
      }
    };
    
    
    // ---------------------------------------------
    //   Data - Card Player
    // ---------------------------------------------
    
    dataObj.dataCardPlayerObj = {
      'W6VI422uO': {
        userId: 'a8b0gX6lMIz',
        // createdDate: '2018-10-23T12:00:00Z',
        // updatedDate: '2018-10-23T12:00:00Z',
        comment: `Next.js を試してみたところ、とても優秀だったので採用することに決めました。サーバーサイドレンダリングの機能や、Code Splitting をデフォルトで行ってくれるのは非常に便利です。ただすべての機能を提供してくれるわけではないので、結局、自分で Express を利用したサーバー用コードを書かないといけない部分も多くあるのですが。

それと Next.js はデータベースへのアクセスをすべて API で行うことを推奨しているようです。そこそこの規模のサイトになると、そういった構成が増えてくるのかもしれないのですが、自分は小規模なサイトしか作ったことがないので、初めての経験でちょっと不安です。`,
        // imageSrcSet: '/static/img/card/player/H_NXaMPKG/320w.jpg 320w, /static/img/card/player/H_NXaMPKG/480w.jpg 480w, /static/img/card/player/H_NXaMPKG/640w.jpg 640w, /static/img/card/player/H_NXaMPKG/800w.jpg 800w',
        // imageSrc: '/static/img/card/player/H_NXaMPKG/800w.jpg',
        // imageAlt: 'ライオン',
        imageVideoArr: [
          {
            id: 'H_NXaMPKG',
            type: 'image',
            imageSetArr: [
              {
                w: '320w',
                src: '/static/img/card/player/H_NXaMPKG/320w.jpg',
                width: 320,
                height: 180,
                type: 'JPEG'
              },
              {
                w: '480w',
                src: '/static/img/card/player/H_NXaMPKG/480w.jpg',
                width: 480,
                height: 270,
                type: 'JPEG'
              },
              {
                w: '640w',
                src: '/static/img/card/player/H_NXaMPKG/640w.jpg',
                width: 640,
                height: 360,
                type: 'JPEG'
              },
              {
                w: '800w',
                src: '/static/img/card/player/H_NXaMPKG/800w.jpg',
                width: 800,
                height: 450,
                type: 'JPEG'
              },
              {
                w: 'source',
                src: '/static/img/card/player/H_NXaMPKG/1920w.jpg',
                width: 1920,
                height: 1080,
                type: 'JPEG'
              },
            ],
            caption: 'ライオン',
          },
        ],
        birthdayObj: {
          value: '2002-10-19T00:00:00Z',
          alternativeText: '',
          search: true,
        },
        sexObj: {
          value: 'male',
          alternativeText: '',
          search: true,
        },
        addressObj: {
          value: '大阪',
          // alternativeText: '',
          search: true,
        },
        gamingExperienceObj: {
          value: '2008-09-19T00:00:00Z',
          alternativeText: '',
          search: true,
        },
        hobbiesObj: {
          valueArr: ['映画鑑賞', '料理', '海外旅行', 'ヴァイオリン演奏'],
          search: true,
        },
        specialSkillsObj: {
          valueArr: ['英語が話せる！'],
          search: true,
        },
        smartphoneObj: {
          model: 'g06',
          comment: `月額無料でスマホを利用したい！ということで買った端末です。電話としては機能してるけど、これでゲームをやるのは難しそうです。`,
        },
        tabletObj: {
          model: 'Google Nexus 9 Wi-Fiモデル 32GB',
          comment: `2015年に買ったタブレットなので最近はブラウザをチェックするだけでも重い…。`,
        },
        pcObj: {
          model: '自作PC',
          comment: `BTOで買ったPCが壊れそうになったので、ケースや光学ドライブなどを流用しながらパーツを新しくしました。HDからSSDに移行したときはその速さに驚きましたね！容量があまりないので大量にゲームをインストールできないのですが、高速なのでなんとかSSDでやりくりしていきたいです。

グラボを積んでいないのですが、Ryzen 3 2200Gの機能で昔のゲームや2Dゲームなら普通に動きます。比較的最近のゲームですが、ダーケストダンジョンもいけました。`,
          specsObj: {
            os: 'Windows 10 Home',
            cpu: 'AMD CPU Ryzen 3 2200G',
            cpuCooler: 'CPU 付属品',
            motherboard: 'MSI B350 PC MATE',
            memory: 'Crucial DDR4 8GB x 2',
            storage: 'WD SSD 240GB / WD Green / WDS240G2G0A',
            graphicsCard: '-',
            opticalDrive: 'NEC AD7240S/BK',
            powerSupply: 'Antec EARTHWATTS EA650 650W',
            pcCase: 'COOLER MASTER CM690',
            monitor: 'MITSUBISHI TFT RDT233WX / ASUS VZ239HR',
            mouse: 'Logitech MX300',
            keyboard: 'Microsoft Keyboard With Fingerprint Reader',
            search: true,
          },
        },
        ownedHardwareObj: {
          valueArr: ['u752aJ8tM', 'H3FwPxRHP'],
          search: true,
        },
        idObj: {
          playstationObj: {
            value: 'AZ-1979',
            search: true,
            showType: 1// 1.表示する 2.フォロワーに表示する 3.相互フォローで表示する 4.表示しない 5.表示しない（表示確認ダイアログ）
          },
          xboxObj: {//ゲーマータグ
            value: 'AZ-1979-Xbox',
            search: true,
            showType: 1
          },
          nintendoObj: {//フレンドコード
            value: 'AZ-1979',
            search: true,
            showType: 1
          },
          steamObj: {
            value: 'Azumi1979',
            search: true,
            showType: 1
          },
        },
        activityTimeObj: {
          valueArr: [
            {
              startTime: '19:00',
              endTime: '24:00',
              weekArr: [0, 1, 2, 3, 4]
            },
            {
              startTime: '9:00',
              endTime: '24:00',
              weekArr: [5, 6]
            }
          ],
          search: true,
        },
        lookingForFriendsObj: {
          value: true,
          icon: 1,
          comment: '社会人の方よろしく！',
          search: true,
        },
        voiceChatObj: {
          value: true,
          comment: '夜21時まで',
          search: true,
        },
        linkObj: {
          twitter: {
            url: 'https://twitter.com/Azumi1979',
            search: true,
          },
          facebook: {
            url: '',
            search: true,
          },
          youtube: {
            url: 'https://gaming.youtube.com/channel/UCGmS-B707Sqa19BXRn02JIw/live',
            search: true,
          },
          steam: {
            url: 'https://steamcommunity.com/profiles/76561198031526480/',
            search: true,
          },
          link1: {
            label: '開発サイト',
            url: 'http://35.203.143.160:8080/',
            search: true,
          },
        },
      }
    };
    
    
    
    return { isServer, pathname, dataObj };
    
  }
  
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   publicRuntimeConfig
    // --------------------------------------------------
    
    const { publicRuntimeConfig } = getConfig();
    this.recaptchaSiteKey = publicRuntimeConfig.recaptchaSiteKey;
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    const argumentsObj = {
      isServer: props.isServer,
      pathname: props.pathname,
      environment: publicRuntimeConfig.environment,
      apiUrl: publicRuntimeConfig.apiUrl
    };
    
    this.stores = initStoreIndex(argumentsObj);
    this.stores.cardPlayer = initStoreCardPlayer(argumentsObj, this.stores);
    this.stores.playerPlayer = initStorePlayerPlayer(argumentsObj, this.stores);
    
    
    
    // --------------------------------------------------
    //   Update Data
    // --------------------------------------------------
    
    const {
      dataUserObj,
      dataCardPlayerObj
    } = props.dataObj;
    
    this.stores.data.insertUserObj(dataUserObj);
    
    this.stores.data.updateCardPlayerObj(dataCardPlayerObj);
    
    
    
  }
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const stores = this.stores;
    
    
    
    // --------------------------------------------------
    //   Header Navigation
    // --------------------------------------------------
    
    const headerNavMainArr = [
      {
        name: 'プロフィール',
        pathname: '/pl/AZ-1979'
      },
      {
        name: '設定',
        pathname: '/pl/AZ-1979/config'
      }
    ];
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider stores={this.stores}>
      
        <Layout headerNavMainArr={headerNavMainArr}>
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>あづみ - Game Users</title>
          </Head>
          
          
          <Container>
            
            <CardPlayer cardPlayerId="W6VI422uO" />
            
            
            
            {/* ログイン */}
            <Panel
              id='login'
              summary='プレイヤー'
              detailsComponent={
                <React.Fragment>
                  
                  <Description>
                    pl
                  </Description>
                  
                  
                  
                  
                </React.Fragment>
              }
            />
            
            
            
          </Container>
          
        </Layout>
      </Provider>
    );
  }
}

export default withRoot(Component);