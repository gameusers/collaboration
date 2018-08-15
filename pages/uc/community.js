// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
// import Link from 'next/link';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import initStoreData from '../../applications/common/layout/stores/data';
import initStoreLayout from '../../applications/common/layout/stores/layout';
import initStoreFormPost from '../../applications/common/form/stores/post';
import initStoreBbsNavigation from '../../applications/common/bbs/stores/navigation';
import initStoreBbs from '../../applications/common/bbs/stores/bbs';
import initStoreUserCommunity from '../../applications/uc/community/stores/store';

import Layout from '../../applications/common/layout/components/layout';
import BbsNavigation from '../../applications/common/bbs/components/navigation';
import Bbs from '../../applications/common/bbs/components/bbs';

import withRoot from '../../lib/material-ui/withRoot';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 10px;
  
  @media screen and (max-width: 480px) {
    padding: 10px 0;
  }
`;




// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/uc/community
// --------------------------------------------------

@observer
class Component extends React.Component {
  
  static getInitialProps({ pathname, req }) {
    
    const isServer = !!req;
    // console.log(`uc/community - getInitialProps`);
    // console.log(`pathname = ${pathname}`);
    
    // --------------------------------------------------
    //   テスト用　初期データ
    // --------------------------------------------------
    
    const currentContentsId = 'p0V_RsaT1l8';
    
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
      currentContentsId,
    };
    
    
    
    // ---------------------------------------------
    //   Login User - Data
    // ---------------------------------------------
    
    dataObj.dataLoginUserObj = {
      id: 'a8b0gX6lMIz',
      accessDate: '2018-08-04T19:30:00'
    };
    
    
    // ---------------------------------------------
    //   User - Data
    // ---------------------------------------------
    
    dataObj.dataUserObj = {
      'a8b0gX6lMIz': {
        name: 'あづみ',
        status: 'プロハンター',
        playerId: 'az1979',
        playerPage: '/pl/az1979',
        level: 999,
        accessDate: '2018-08-06T08:50:00Z'
      }
    };
    
    
    // ---------------------------------------------
    //   User Community - Data
    // ---------------------------------------------
    
    dataObj.dataUserCommunityObj[dataObj.userCommunityId] = {
      name: 'あづみ配信コミュニティ',
      rule: 'ピアキャスト、YouTube Gamingで、ゲームの配信を中心に雑談なども行っています。気軽にコミュニティに参加してや！配信開始時にメールで連絡するので、コミュニティ参加者は自分のプレイヤーページで、メールアドレスを登録してくれるとありがたい。',
      communityId: 'az1979',
      members: 12345,
      administratorId: 'a8b0gX6lMIz'
    };
    
    
    // ---------------------------------------------
    //  BBS - Data
    // ---------------------------------------------
    
    dataObj.bbsObj[dataObj.userCommunityId] = [
      {
        id: 'ks8WPvlQpbg',
        name: '雑談スレッド',
        description: '仲良く雑談しませんか？\nゲームの雑談、または配信でプレイして欲しいゲームはそちらのスレに書いてください。\n\nルイン＆アドオンを使わず、選別もしない\n僕のトラッパーがついにランク4の赤帯になりました。\n\n\nDead by Daylight',
        creatorId: 'yMBo8ViUidf',
        page: 1,
        commentTotal: 5,
        commentArr: [
          {
            id: '_5pweox1Io8',
            userId: 'a8b0gX6lMIz',
            name: '',
            status: '',
            comment: '非常に引き込まれるものがありました。\nジョディのスタンド、エイデンはめちゃくちゃ強いですね。\n僕が知っているジョジョ4部までに出てきたスタンドで\nエイデンに勝てそうなのは\nスタープラチナとザ・ワールド、ヴァニラ・アイスのスタンドくらいですね。\n半径10メートル以内の人間を窒息死させたり\n意のままに操れたりするのはやばすぎます。',
            updatedDate: '2018-08-11T06:50:00Z',
            lightboxArr: [
              {
                id: 'FK_8mRwTa18',
                src: 'https://gameusers.org/assets/img/bbs_uc/reply/1089/image_1.jpg',
                caption: 'Caption 1',
                srcSet: [
                  'https://gameusers.org/assets/img/bbs_uc/reply/1089/image_1.jpg 320w',
                  'https://gameusers.org/assets/img/bbs_uc/reply/1089/image_1.jpg 640w',
                ],
              },
              {
                id: 'Ztz0PgAXUgG',
                src: 'https://gameusers.org/assets/img/bbs_uc/comment/1209/image_1.jpg',
                caption: 'Caption 2',
                srcSet: [
                  'https://gameusers.org/assets/img/bbs_uc/comment/1209/image_1.jpg 320w',
                  'https://gameusers.org/assets/img/bbs_uc/comment/1209/image_1.jpg 640w',
                ],
              },
              {
                id: '9R0YsovoSSp',
                src: 'https://gameusers.org/assets/img/bbs_uc/reply/1775/image_1.jpg',
                caption: '',
                srcSet: [
                  'https://gameusers.org/assets/img/bbs_uc/reply/1775/image_1.jpg 320w',
                  'https://gameusers.org/assets/img/bbs_uc/reply/1775/image_1.jpg 640w',
                ],
              },
            ],
            imageVideoArr: [
              {
                id: 'FK_8mRwTa18',
                imageSrc: 'https://gameusers.org/assets/img/bbs_uc/reply/1089/image_1.jpg',
                imageWidth: 640,
                imageHeight: 360,
                videoChannel: '',
                videoId: '',
              },
              {
                id: 'Ztz0PgAXUgG',
                imageSrc: 'https://gameusers.org/assets/img/bbs_uc/comment/1209/image_1.jpg',
                imageWidth: 187,
                imageHeight: 293,
                videoChannel: '',
                videoId: '',
              },
              {
                id: '9R0YsovoSSp',
                imageSrc: 'https://gameusers.org/assets/img/bbs_uc/reply/1775/image_1.jpg',
                imageWidth: 879,
                imageHeight: 682,
                videoChannel: '',
                videoId: '',
              }
            ],
            good: 5000,
            page: 1,
            replyTotal: 2,
            replyArr: [
              {
                id: 'GMi2JFwJ868',
                userId: '',
                name: 'ななしさん',
                status: '774',
                reply: 'ワールドカップ 日本×ベルギー戦\n\nいろいろありましたが、良くやったと思います。\n個のクオリティでは負けている部分も多かったですが\n素晴らしいゴールもあり、一時は勝てると信じていたのですが…。\nあの試合は最後のカウンターの対応を問題視するよりも\n2点を守れなかったことについて考えるべきだと思います。\n采配次第では勝てただけに本当に残念です。',
                updatedDate: '3 時間前',
                good: 123,
              },
              {
                id: 'E3PwP4kzFa8',
                userId: '',
                name: 'テストネーム',
                status: 'テストステータス',
                reply: '短いテキスト',
                updatedDate: '30 分前',
                good: 0,
              }
            ]
          }
        ]
      },
    ];
    
    
    
    // ---------------------------------------------
    //   Layout - Panel
    // ---------------------------------------------
    
    dataObj.layoutPanelExpandedObj[dataObj.bbsNavigationId] = true;
    
    
    // ---------------------------------------------
    //   BBS Navigation - Tab
    // ---------------------------------------------
    
    dataObj.bbsNavigationOpenedTabNoObj[dataObj.bbsNavigationId] = 0;
    
    
    // ---------------------------------------------
    //   BBS Navigation  - スレッド一覧
    // ---------------------------------------------
    
    dataObj.bbsNavigationThreadListObj[dataObj.bbsNavigationId] = [
      {
        id: 'ks8WPvlQpbg',
        name: '雑談スレッド',
        description: 'ピアキャスト、YouTube Gamingで、ゲームの配信を中心に雑談なども行っています。気軽にコミュニティに参加してや！',
        updatedDate: '2018/5/1',
        comment: 613,
        reply: 780,
        image: 108,
        video: 50
      },
      {
        id: 'JYFo1eo6TtT',
        name: '配信後に俺が感想を書くスレ',
        description: 'description2',
        updatedDate: '2017/3/14',
        comment: 102,
        reply: 91,
        image: 15,
        video: 20
      },
      {
        id: '53w-K9XlenW',
        name: '配信でプレイして欲しいゲームを書き込みましょう！',
        description: 'description3',
        updatedDate: '2017/11/20',
        comment: 478,
        reply: 370,
        image: 60,
        video: 39
      }
    ];
    
    
    return { isServer, pathname, dataObj };
    
  }
  
  
  constructor(props) {
    
    super(props);
    // console.log(`uc/community - constructor`);
    // console.log(`props.pathname = ${props.pathname}`);
    
    // console.log(Date());
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    const {
      dataLoginUserObj,
      dataUserObj,
      dataUserCommunityObj,
      layoutPanelExpandedObj,
      // userCommunityId,
      bbsNavigationId,
      bbsNavigationOpenedTabNoObj,
      bbsNavigationThreadListObj,
      bbsObj
    } = props.dataObj;
    
    const argumentsObj = {
      isServer: props.isServer,
      pathname: props.pathname,
    };
    
    const storeLayoutInstance = initStoreLayout(argumentsObj);
    
    argumentsObj.storeInstanceObj = {
      layout: storeLayoutInstance
    };
    
    this.stores = {
      data: initStoreData(argumentsObj),
      layout: storeLayoutInstance,
      userCommunity: initStoreUserCommunity(argumentsObj),
      formPost: initStoreFormPost(argumentsObj),
      bbsNavigation: initStoreBbsNavigation(argumentsObj),
      bbs: initStoreBbs(argumentsObj),
      pathname: props.pathname
    };
    
    
    
    // --------------------------------------------------
    //   Insert Data
    // --------------------------------------------------
    
    this.stores.data.updateLoginUserObj(dataLoginUserObj);
    this.stores.data.insertUserObj(dataUserObj);
    this.stores.data.insertUserCommunityObj(dataUserCommunityObj);
    this.stores.layout.insertPanelExpanded(layoutPanelExpandedObj);
    this.stores.userCommunity.insertData(dataUserCommunityObj);
    this.stores.bbsNavigation.insertOpenedTabNo(bbsNavigationOpenedTabNoObj);
    this.stores.bbsNavigation.insertThreadList(bbsNavigationId, bbsNavigationThreadListObj);
    this.stores.bbsNavigation.insertCreateThread(bbsNavigationId);
    this.stores.bbsNavigation.insertSearch(bbsNavigationId);
    this.stores.bbs.insertData(bbsObj);
    
    
    this.stores.layout.currentContentsId = props.dataObj.currentContentsId;
    
  }
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const stores = this.stores;
    
    const { userCommunityId, bbsNavigationId } = this.props.dataObj;
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider stores={this.stores}>
      
        <Layout headerNavMainArr={stores.layout.headerNavMainObj.uc}>
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>ユーザーコミュニティ</title>
          </Head>
          
          
          <Container>
            
            {/* BBS Navigation */}
            <BbsNavigation id={bbsNavigationId} />
            
            {/* BBS */}
            <Bbs userCommunityId={userCommunityId} />
            
            
            <Button
              onClick={() => stores.layout.handleSnackbarOpen('success', 'success message')}
            >
              Success
            </Button>
            
            <Button
              onClick={() => stores.layout.handleSnackbarOpen('warning', 'warning message')}
            >
              Warning
            </Button>
            
          </Container>
          
        </Layout>
      </Provider>
    );
  }
}

export default withRoot(Component);