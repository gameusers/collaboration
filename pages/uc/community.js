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
    console.log(`uc/community - getInitialProps`);
    console.log(`pathname = ${pathname}`);
    
    // --------------------------------------------------
    //   テスト用　初期データ
    // --------------------------------------------------
    
    const currentContentsId = 'p0V_RsaT1l8';
    
    const dataObj = {
      userCommunityId: 'p0V_RsaT1l8',
      userCommunityDataObj: {},
      bbsNavigationId: 'XcczkfiRN9f',
      currentContentsId,
      panelExpandedObj: {},
      openedTabNoObj: {},
      threadListObj: {}
    };
    
    
    // ---------------------------------------------
    //   User Community - Data
    // ---------------------------------------------
    
    dataObj.userCommunityDataObj = {
      'p0V_RsaT1l8': {
        name: 'あづみ配信コミュニティ',
        rule: 'ピアキャスト、YouTube Gamingで、ゲームの配信を中心に雑談なども行っています。気軽にコミュニティに参加してや！配信開始時にメールで連絡するので、コミュニティ参加者は自分のプレイヤーページで、メールアドレスを登録してくれるとありがたい。',
        communityId: 'az1979',
        members: 12345
      }
    };
    
    
    // ---------------------------------------------
    //   Layout - Panel
    // ---------------------------------------------
    
    dataObj.panelExpandedObj[dataObj.bbsNavigationId] = true;
    
    // dataObj.panelExpandedObj[currentContentsId] = {
    //   'p0V_RsaT1l8': true, // BBS Navigation
    //   'ks8WPvlQpbg': true // BBS
    // };
    
    
    // ---------------------------------------------
    //   BBS Navigation - Tab
    // ---------------------------------------------
    
    dataObj.openedTabNoObj[dataObj.bbsNavigationId] = 0;
    
    
    // ---------------------------------------------
    //   BBS Navigation  - スレッド一覧
    // ---------------------------------------------
    
    dataObj.threadListObj[dataObj.bbsNavigationId] = [
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
    console.log(`uc/community - constructor`);
    console.log(`props.pathname = ${props.pathname}`);
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    const {
      userCommunityId,
      userCommunityDataObj,
      bbsNavigationId,
      panelExpandedObj,
      openedTabNoObj,
      threadListObj
    } = props.dataObj;
    
    const argumentsObj = {
      isServer: props.isServer,
      pathname: props.pathname,
    };
    
    
    const storeLayoutInstance = initStoreLayout(argumentsObj);
    
    const storeInstanceObj = {
      layout: storeLayoutInstance
    };
    
    argumentsObj.storeInstanceObj = {
      layout: storeLayoutInstance
    };
    
    
    this.stores = {
      layout: storeLayoutInstance,
      userCommunity: initStoreUserCommunity(argumentsObj),
      formPost: initStoreFormPost(props.isServer, storeInstanceObj),
      bbsNavigation: initStoreBbsNavigation(argumentsObj),
      bbsTread: initStoreBbsThread(props.isServer, storeInstanceObj),
      pathname: props.pathname
    };
    
    
    
    // --------------------------------------------------
    //   Insert Data
    // --------------------------------------------------
    
    this.stores.layout.insertPanelExpanded(panelExpandedObj);
    this.stores.userCommunity.insertData(userCommunityDataObj);
    this.stores.bbsNavigation.insertOpenedTabNo(openedTabNoObj);
    this.stores.bbsNavigation.insertThreadList(bbsNavigationId, threadListObj);
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