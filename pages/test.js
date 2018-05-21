// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import { observer, Provider } from 'mobx-react';
import StoreRoot from '../stores/root';
import Layout from '../components/layout';

// import { withStyles } from 'material-ui/styles';




// --------------------------------------------------
//   Store
// --------------------------------------------------

const stores = {
  instanceStoreRoot: new StoreRoot()
};



const styles = {
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'green',
  },
};

const stylesObj = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'yellow',
  },
});

// const stylesObj = {
//   root: {
//     width: '100%',
//     maxWidth: 360,
//     backgroundColor: 'pink',
//   },
// };



// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/
// --------------------------------------------------

@observer
@withStyles(stylesObj)
export default class extends React.Component {
  
  static getInitialProps({ pathname, query, asPath, req, res, jsonPageRes, err }) {
    
    // const instanceStoreRoot = new StoreRoot();
    
    return { test: 'Text From b' };
    
  }
  
  
  // constructor(props) {
  //   super(props);
  // }
  

  render() {
    
    const { classes } = this.props;
    
    return (
      <Provider stores={stores}>
        
        test.js
        
      </Provider>
    );
  }
}

// export default withStyles(styles)(Conponent);