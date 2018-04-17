// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Layout from '../components/layout';
import { observer, Provider } from 'mobx-react';
import StoreRoot from '../stores/root';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from 'material-ui/Button';


import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


// import Icon from 'material-ui/Icon';
// import IconButton from 'material-ui/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
// import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';


// import ActionAndroid from 'material-ui-icons/Android';
// import ActionPlusOne from 'material-ui-icons/ExposurePlus1';
// import ActionMinusOne from 'material-ui-icons/ExposureNeg1';
// import ActionUndo from 'material-ui-icons/Undo';
// import ActionHome from 'material-ui-icons/Home';


// import ActionAndroid from 'material-ui/svg-icons/action/android';
// import ActionPlusOne from 'material-ui/svg-icons/image/exposure-plus-1';
// import ActionMinusOne from 'material-ui/svg-icons/image/exposure-neg-1';
// import ActionUndo from 'material-ui/svg-icons/content/undo';
// import ActionHome from 'material-ui/svg-icons/action/home';


// --------------------------------------------------
//   Store
// --------------------------------------------------

const stores = {
  instanceStoreRoot: new StoreRoot()
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
          // this.props.test = { this.props.test }
          <p>Counter: {stores.instanceStoreRoot.counter}</p>
          
          
          <p>テストAAAAAAAAA</p>
          <p>http://35.203.143.160:8080/unko</p>
          
          
          <Button color="secondary">
            Secondary
          </Button>
          
          <Button variant="raised">
            Default
          </Button>
          
          
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
          
          <IconButton aria-label="Delete" disabled color="primary">
            <DeleteIcon />
          </IconButton>
          
          <IconButton color="secondary" aria-label="Add an alarm">
            <Icon>alarm</Icon>
          </IconButton>
          
          <IconButton color="primary" aria-label="Add to shopping cart">
            <AddShoppingCartIcon />
          </IconButton>
          
          <input accept="image/*" id="icon-button-file" type="file" />
          
          <label htmlFor="icon-button-file">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          
          
          
          
          
          
          <br /><br />
          
          
          
          
          
          <style jsx>{`
            button: {
              margin: theme.spacing.unit,
            },
            input: {
              display: 'none',
            },
          `}</style>
        </Layout>
      </Provider>
    );
  }
}