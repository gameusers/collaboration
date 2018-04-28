// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import { observer, Provider } from 'mobx-react';

import Layout from '../components/layout';
import initStoreHeader from '../stores/header';


// --------------------------------------------------
//   Store
// --------------------------------------------------

// const stores = {
//   current: new StoreIndex(),
//   header: new StoreHeader()
// };


// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/
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
          
          index.js
          
        </Layout>
      </Provider>
    );
  }
}