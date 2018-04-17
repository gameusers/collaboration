// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';


// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores') @observer
export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Head>
          <title>{  }</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        
        <header class="fortest">
          <nav>
            <Link href='/'><a>Home</a></Link> |
            <Link href='/about'><a>About</a></Link> |
            <Link href='/contact'><a>Contact</a></Link>
          </nav>
        </header>
        
        {this.props.children}
        
        <footer class="fortest">
          {'Footer'}
        </footer>
        <style jsx>{`
          div {
            margin: 50px 0 0 300px;
          }
        `}</style>
      </div>
    );
  }
  
};