// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Layout from '../components/layout';
import { observer, Provider } from 'mobx-react';
import StoreRoot from '../stores/root';


// --------------------------------------------------
//   Store
// --------------------------------------------------

const stores = {
  instanceStoreRoot: new StoreRoot()
};


// --------------------------------------------------
//   Class
// --------------------------------------------------

@observer
export default class extends React.Component {
  // 命名規約をこうしてください
  static getInitialProps({ pathname, query, asPath, req, res, jsonPageRes, err }) {
    
    // const instanceStoreRoot = new StoreRoot();
    
    return { test: 'Text From b' };
    
  }

  render() {
    return (
      <Provider stores={stores}>
        <Layout>
          // this.props.test = { this.props.test }
          <p>Counter: {stores.instanceStoreRoot.counter}</p>
          
          unko
          
          
          <button onClick={stores.instanceStoreRoot.increment}>++</button>
          <button onClick={stores.instanceStoreRoot.decrement}>--</button>
          <button onClick={stores.instanceStoreRoot.reset}>Reset</button>
          
          <style jsx>{`
            p {
              color: red;
            }
          `}</style>
        </Layout>
      </Provider>
    );
  }
}