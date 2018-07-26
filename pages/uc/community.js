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
    
    
    // --------------------------------------------------
    //   テスト用　初期データ
    // --------------------------------------------------
    
    const id = 'p0V_RsaT1l8';
    
    
    const initialData = {
      
      id,
      
      
      // ---------------------------------------------
      //   Panel
      // ---------------------------------------------
      
      panelExpandedObj: {
        'p0V_RsaT1l8': true, // BBS スレッド
        'ks8WPvlQpbg': true // BBS
      },
      
      
      // ---------------------------------------------
      //   スレッド一覧
      // ---------------------------------------------
      
      threadListArr: [
        {
          name: '雑談スレッド',
          about: 'ピアキャスト、YouTube Gamingで、ゲームの配信を中心に雑談なども行っています。気軽にコミュニティに参加してや！',
          updatedDate: '2018/5/1',
          comment: 613,
          reply: 780,
          image: 108,
          video: 50
        },
        {
          name: '配信後に俺が感想を書くスレ',
          about: 'ピアキャスト、YouTube Gamingで、ゲームの配信を中心に雑談なども行っています。気軽にコミュニティに参加してや！',
          updatedDate: '2017/3/14',
          comment: 102,
          reply: 91,
          image: 15,
          video: 20
        },
        {
          name: '配信でプレイして欲しいゲームを書き込みましょう！',
          about: 'ピアキャスト、YouTube Gamingで、ゲームの配信を中心に雑談なども行っています。気軽にコミュニティに参加してや！',
          updatedDate: '2017/11/20',
          comment: 478,
          reply: 370,
          image: 60,
          video: 39
        }
      ]
        
      
    };
    
    return { isServer, pathname, id, initialData };
    
  }
  
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    const storeLayoutInstance = initStoreLayout(props.isServer, props.initialData);
    
    const storeInstanceObj = {
      layout: storeLayoutInstance
    };
    
    this.stores = {
      layout: storeLayoutInstance,
      formPost: initStoreFormPost(props.isServer, storeInstanceObj),
      bbsNavigation: initStoreBbsNavigation(props.isServer, storeInstanceObj),
      bbsTread: initStoreBbsThread(props.isServer, storeInstanceObj),
      current: initStoreUserCommunity(props.isServer, storeInstanceObj),
      pathname: props.pathname
    };
    
  }
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const stores = this.stores;
    
    const { id } = this.props;
    
    
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
            <BbsNavigation id={id} />
            
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