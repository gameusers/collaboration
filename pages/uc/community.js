// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
// import Link from 'next/link';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import initStoreLayout from '../../applications/common/layout/stores/layout';
import initStoreFormPost from '../../applications/common/form/stores/post';
import initStoreBbsNavigation from '../../applications/common/bbs/stores/navigation';
import initStoreBbsThread from '../../applications/common/bbs/stores/thread';
import initStoreUserCommunity from '../../applications/uc/community/stores/store';

import Layout from '../../applications/common/layout/components/layout';
import BbsNavigation from '../../applications/common/bbs/components/navigation';
import BbsThread from '../../applications/common/bbs/components/thread';

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
      layoutPanelExpandedObj: {},
      playerObj: {},
      userCommunityId: 'p0V_RsaT1l8',
      userCommunityDataObj: {},
      bbsNavigationId: 'XcczkfiRN9f',
      bbsNavigationOpenedTabNoObj: {},
      bbsNavigationThreadListObj: {},
      bbsObj: {},
      bbsThreadObj: {},
      bbsCommentObj: {},
      bbsReplyObj: {},
      currentContentsId,
    };
    
    
    
    // ---------------------------------------------
    //   Player - Data
    // ---------------------------------------------
    
    dataObj.playerObj = {
      'a8b0gX6lMIz': {
        name: 'あづみ',
        status: 'プロハンター',
        playerId: 'az1979',
        playerPage: '/pl/az1979',
        level: 999
      }
    };
    
    
    // ---------------------------------------------
    //  BBS - Data
    // ---------------------------------------------
    
    // dataObj.bbsArr[dataObj.userCommunityId] = [
    //   'ks8WPvlQpbg',
    //   'JYFo1eo6TtT',
    //   '53w-K9XlenW'
    // ];
    
    // dataObj.bbsArr[dataObj.userCommunityId] = [
    //   {
    //     id: 'ks8WPvlQpbg',
    //     name: '雑談スレッド',
    //     description: 'みんなで雑談を行いましょう！',
    //     updatedDate: '2018/5/1',
    //     commentArr: [
    //       '_5pweox1Io8',
    //       'M8-vje-bq9c',
    //       '1yIHLQJNvDw',
    //       'Um_cUEd7vl0',
    //       'GMi2JFwJ868'
    //     ]
    //   },
    // ];
    
    dataObj.bbsArr[dataObj.userCommunityId] = [
      {
        id: 'ks8WPvlQpbg',
        name: '雑談スレッド',
        description: '仲良く雑談しませんか？\nゲームの雑談、または配信でプレイして欲しいゲームはそちらのスレに書いてください。',
        page: 1,
        commentTotal: 5,
        commentArr: [
          {
            id: '_5pweox1Io8',
            userId: 'a8b0gX6lMIz',
            name: '',
            status: '',
            comment: '非常に引き込まれるものがありました。\nジョディのスタンド、エイデンはめちゃくちゃ強いですね。\n僕が知っているジョジョ4部までに出てきたスタンドで\nエイデンに勝てそうなのは\nスタープラチナとザ・ワールド、ヴァニラ・アイスのスタンドくらいですね。\n半径10メートル以内の人間を窒息死させたり\n意のままに操れたりするのはやばすぎます。',
            updatedDate: '7 時間前',
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
    //   User Community - Data
    // ---------------------------------------------
    
    dataObj.userCommunityDataObj[dataObj.userCommunityId] = {
      name: 'あづみ配信コミュニティ',
      rule: 'ピアキャスト、YouTube Gamingで、ゲームの配信を中心に雑談なども行っています。気軽にコミュニティに参加してや！配信開始時にメールで連絡するので、コミュニティ参加者は自分のプレイヤーページで、メールアドレスを登録してくれるとありがたい。',
      communityId: 'az1979',
      members: 12345
    };
    
    
    // ---------------------------------------------
    //   Layout - Panel
    // ---------------------------------------------
    
    dataObj.layoutPanelExpandedObj[dataObj.bbsNavigationId] = true;
    
    // dataObj.layoutPanelExpandedObj[currentContentsId] = {
    //   'p0V_RsaT1l8': true, // BBS Navigation
    //   'ks8WPvlQpbg': true // BBS
    // };
    
    
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
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    const {
      userCommunityId,
      userCommunityDataObj,
      bbsNavigationId,
      layoutPanelExpandedObj,
      bbsNavigationOpenedTabNoObj,
      bbsNavigationThreadListObj
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
      layout: storeLayoutInstance,
      userCommunity: initStoreUserCommunity(argumentsObj),
      formPost: initStoreFormPost(argumentsObj),
      bbsNavigation: initStoreBbsNavigation(argumentsObj),
      bbs: initStoreBbsThread(argumentsObj),
      pathname: props.pathname
    };
    
    
    
    // --------------------------------------------------
    //   Insert Data
    // --------------------------------------------------
    
    this.stores.layout.insertPanelExpanded(layoutPanelExpandedObj);
    this.stores.userCommunity.insertData(userCommunityDataObj);
    this.stores.bbsNavigation.insertOpenedTabNo(bbsNavigationOpenedTabNoObj);
    this.stores.bbsNavigation.insertThreadList(bbsNavigationId, bbsNavigationThreadListObj);
    this.stores.bbsNavigation.insertSearch(bbsNavigationId);
    
    this.stores.layout.currentContentsId = props.dataObj.currentContentsId;
    
  }
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const stores = this.stores;
    
    const { bbsNavigationId } = this.props.dataObj;
    
    
    // render() {
    //   var text = "One\n\n\nTwo\nThree";
    //   return (
    //   <div>
    //     {text.split("\n").map((i,key) => {
    //       return <p style={{ marginBottom: '20px' }}>{i}</p>;
    //     })}
    //   </div>
    //   );
    // }
    
    
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
            <BbsThread
              id="ks8WPvlQpbg"
            />
            
            
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