// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
// import Link from 'next/link';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import initStoreLayout from '../../../applications/common/layout/stores/layout';
import initStoreFormPost from '../../../applications/common/form/stores/post';
import initStoreBbsNavigation from '../../../applications/common/bbs/stores/navigation';
import initStoreBbsThread from '../../../applications/common/bbs/stores/thread';
import initStoreUserCommunity from '../../../applications/uc/community/stores/store';

import Layout from '../../../applications/common/layout/components/layout';
import BbsNavigation from '../../../applications/common/bbs/components/navigation';
import BbsThread from '../../../applications/common/bbs/components/thread';

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
    
    
    // --------------------------------------------------
    //   テスト用　初期データ
    // --------------------------------------------------
    
    const id = '3YhijrrHx4e';
    
    
    const initialData = {
      
      id,
      
      
      // ---------------------------------------------
      //   Layout - Panel
      // ---------------------------------------------
      
      panelExpandedObj: {
        '3YhijrrHx4e': true, // BBS スレッド
        'pWlN22vre_c': true // BBS
      },
      
      
      // ---------------------------------------------
      //   BBS Navigation - Tab
      // ---------------------------------------------
      
      openedTabNoObj: {
        '3YhijrrHx4e': 0
      },
      
      
      // ---------------------------------------------
      //   BBS Navigation  - スレッド一覧
      // ---------------------------------------------
      
      threadListObj: {
        '3YhijrrHx4e': [
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
        ]
      }
        
      
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
    
    
    const storeArgumentsArr = [props.isServer, storeInstanceObj, props.initialData];
    
    
    this.stores = {
      layout: storeLayoutInstance,
      formPost: initStoreFormPost(props.isServer, storeInstanceObj),
      bbsNavigation: initStoreBbsNavigation(...storeArgumentsArr),
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
            <title>メンバー</title>
          </Head>
          
          
          <Container>
            
            {/* BBS Navigation */}
            <BbsNavigation id={id} />
            
            <p>AAA</p>
            
          </Container>
          
        </Layout>
      </Provider>
    );
  }
}

export default withRoot(Component);