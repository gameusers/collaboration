// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Layout from '../components/layout';
import { observer, Provider } from 'mobx-react';
import StoreRoot from '../stores/root';
import StoreHeader from '../stores/header';


// --------------------------------------------------
//   Store
// --------------------------------------------------

const stores = {
  root: new StoreRoot(),
  header: new StoreHeader()
};


// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/
// --------------------------------------------------

@observer
export default class extends React.Component {
  
  static getInitialProps({ pathname, query, asPath, req, res, jsonPageRes, err }) {
    
    // const instanceStoreRoot = new StoreRoot();
    
    return { test: 'Text From b' };
    
  }
  
  
  render() {
    return (
      <Provider stores={stores}>
        <Layout>
          
          index.js
          
        </Layout>
      </Provider>
    );
  }
}