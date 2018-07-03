// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';

import ModalVideo from 'react-modal-video';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';



// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/customization/overrides/
// --------------------------------------------------

const stylesObj = {
  
  // 画像・動画用ダイアログの背景を黒にする。設定しないと下に白い1pxの線が出てしまうため
  paper: {
    backgroundColor: 'black'
  },
  
};



// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores') @observer
export class Component extends React.Component {
  
  constructor(props) {
    super(props);
  }
  

  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores } = this.props;
    const { classes } = this.props;
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        <Dialog
          open={stores.common.openModalImage}
          onClose={stores.common.handleCloseModalImage}
          maxWidth='md'
          classes={{
            paper: classes.paper
          }}
        >
          <img src={stores.common.srcModalImage} width="100%" />
        </Dialog>
        <ModalVideo
          channel={stores.common.channelModalVideo}
          isOpen={stores.common.openModalVideo}
          videoId={stores.common.idModalVideo}
          onClose={stores.common.handleCloseModalVideo}
        />
      </React.Fragment>
    );
    
  }
  
};

export default withStyles(stylesObj)(Component);