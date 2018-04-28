// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';

import withRoot from '../lib/material-ui/withRoot';

import Header from './header';





// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores') @observer
class Component extends React.Component {
  
  constructor(props) {
    super(props);
    // console.log(`props.stores.header.test = ${props.stores.header.test}`);
    // console.log(`layout / props.stores.pathname = ${props.stores.pathname}`);
    // console.log(`layout / props.stores.header.loginMenuOpenFunction = ${props.stores.header.loginMenuOpenFunction}`);
  }

  render() {
    
    return (
      <div>
        
        {/* Head 内部のタグをここで追記する */}
        <Head>
          <title>タイトル</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        
        
        {/* ヘッダー */}
        <Header />
        
        
        {/* コンテンツ */}
        {this.props.children}
        
        
        {/* フッター */}
        {/*<footer>
          {'Footer'}
        </footer>*/}
        
        
        
        <style jsx>{`
        
          .test-class {
            color: blue;
          }
          
        `}</style>
        
      </div>
    );
  }
  
};

export default withRoot(Component);