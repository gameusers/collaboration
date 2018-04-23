// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import { observer, Provider } from 'mobx-react';
import StoreRoot from '../stores/root';
import Layout from '../components/layout';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';



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
        <Layout>

          <List component="nav" style={styles.root}>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItem>
          </List>
          
          <Divider />
          
          <List component="nav" className={classes.root}>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItem>
          </List>
          
          <Divider />
          
          <List component="nav" className="mui-test-list">
            <ListItem button>
              <ListItemText primary="Trash" />
            </ListItem>
            <ListItem button component="a" href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItem>
          </List>
          
          
          <br /><br />
          
          
          <style jsx>{`
            .list-test-class {
              width: 100%;
              maxWidth: 360px;
              backgroundColor: green;
            }
          `}</style>
          
          <style jsx global>{`
            .root :global(.list-test) {
              background-color: purple;
            }
            .mui-test-list {
              background-color: pink;
            }
          `}</style>
          
        </Layout>
      </Provider>
    );
  }
}

// export default withStyles(styles)(Conponent);