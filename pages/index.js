// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import { observer, Provider } from 'mobx-react';

import initStoreHeader from '../stores/header';

import Layout from '../components/layout';

import withRoot from '../lib/material-ui/withRoot';


// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/
// --------------------------------------------------

@observer
class Component extends React.Component {
  
  static getInitialProps({ pathname, query, asPath, req, res, jsonPageRes, err }) {
  
  // static getInitialProps({ pathname, req, res }) {
    
    console.log(`getInitialProps / pathname = ${pathname}`);
    // console.log(`getInitialProps / query = ${query}`);
    // console.log(`getInitialProps / req = ${JSON.parse(JSON.stringify(req))}`);
    // console.log(`getInitialProps / req = ${JSON.parse(JSON.stringify(res))}`);
    // console.log(`getInitialProps / res = ${res}`);
    // console.log(`getInitialProps / asPath = ${asPath}`);
    // console.log(`getInitialProps / jsonPageRes = ${jsonPageRes}`);
    
    // console.log(`getInitialProps / width = ${windowSize.width}`);
    
    
    const isServer = !!req;
    return { isServer: isServer, pathname: pathname };
  }
  
  
  constructor(props) {
    
    super(props);
    
    
    if (typeof window !== 'undefined') {
      console.log(`getInitialProps / width = ${window.innerWidth}`);
    }
    

    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    this.stores = {
      header: initStoreHeader(props.isServer, props.pathname),
      pathname: props.pathname
    };
    
  }
  
  
  componentDidMount() {
    console.log(`componentDidMount / width = ${window.innerWidth}`);
  }
  
  
  
  render() {
    return (
      <Provider stores={this.stores}>
        <Layout>
          
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          index.js<br />
          
        </Layout>
      </Provider>
    );
  }
}

// export default Component;

export default withRoot(Component);