// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import { observer, Provider } from 'mobx-react';

import Layout from '../../components/layout';
import initStoreHeader from '../../stores/header';



// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/gc
// --------------------------------------------------

@observer
export default class extends React.Component {
  
  static getInitialProps({ pathname, query, asPath, req, res, jsonPageRes, err }) {
    const isServer = !!req;
    return { isServer: isServer, pathname: pathname };
  }
  
  
  constructor (props) {
    super(props);
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    this.stores = {
      header: initStoreHeader(props.isServer, props.pathname),
      pathname: props.pathname
    };
    
  }
  
  
  render() {
    return (
      <Provider stores={this.stores}>
        <Layout>
          
          gc/index.js
          
        </Layout>
      </Provider>
    );
  }
}