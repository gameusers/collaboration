// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
// import withRoot from '../lib/material-ui/withRoot';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------





// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/test
// --------------------------------------------------

class Component extends React.Component {
  
  static getInitialProps({ pathname, req, query: { id } }) {
    console.log(`id = ${id}`);
    const isServer = !!req;
    return { isServer, pathname };
  }
  
  
  constructor(props) {
    super(props);
  }
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    // const stores = this.stores;
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div>test</div>
    );
  }
}

export default Component;