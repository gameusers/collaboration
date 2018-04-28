// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import { observer, Provider } from 'mobx-react';
import Layout from '../../components/layout';
import StoreIndex from '../../stores/index';
import StoreHeader from '../../stores/header';


// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/uc
// --------------------------------------------------

@observer
export default class extends React.Component {
  
  static getInitialProps({ pathname, query, asPath, req, res, jsonPageRes, err }) {
    

    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    const stores = {
      current: new StoreIndex(),
      header: new StoreHeader(),
      pathname: pathname
    };
    
    return { stores: stores };
    
  }
  
  
  render() {
    return (
      <Provider stores={this.props.stores}>
        <Layout>
          
          /uc/index.js
          
        </Layout>
      </Provider>
    );
  }
}