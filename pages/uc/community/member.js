// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
// import Link from 'next/link';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import initStoreLayout from '../../../app/common/layout/stores/layout';
import initStoreFormPost from '../../../app/common/form/stores/post';
import initStoreBbsNavigation from '../../../app/common/bbs/stores/navigation';
import initStoreBbs from '../../../app/common/bbs/stores/bbs';
import initStoreUserCommunity from '../../../app/uc/community/stores/store';

import Layout from '../../../app/common/layout/components/layout';
import BbsNavigation from '../../../app/common/bbs/components/navigation';
import Bbs from '../../../app/common/bbs/components/bbs';

import withRoot from '../../../lib/material-ui/withRoot';



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
    
    const currentContentsId = '3YhijrrHx4e';
    
    const dataObj = {
      layoutPanelExpandedObj: {},
      userCommunityId: '3YhijrrHx4e',
      userCommunityDataObj: {},
      bbsNavigationId: 'Fb9X6VWoBQN',
      bbsNavigationOpenedTabNoObj: {},
      bbsNavigationThreadListObj: {},
      currentContentsId,
    };
    
    
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
        id: 'pWlN22vre_c',
        name: 'Member 1',
        description: 'description1',
        updatedDate: '2018/5/1',
        comment: 613,
        reply: 780,
        image: 108,
        video: 50
      },
      {
        id: '_DdoPKFV4dN',
        name: 'Member 2',
        description: 'description2',
        updatedDate: '2017/3/14',
        comment: 102,
        reply: 91,
        image: 15,
        video: 20
      },
      {
        id: 'wgiGrCToBTs',
        name: 'Member 3！',
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
      bbs: initStoreBbs(argumentsObj),
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