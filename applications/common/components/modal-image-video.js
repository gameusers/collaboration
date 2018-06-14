// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
// import styled from 'styled-components';
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
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// const ContainerVideo = styled.div`
//   // position: relative;
//   // max-width: 100%;
//   // height: 0;
//   // padding-top: 56.25%;
// `;

// const VideoIframe = styled.iframe`
//   position: absolute;
//   top: 0;
//   right: 0;
//   width: 100%;
//   height: 100%;
// `;



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
          open={stores.common.modalImageOpen}
          onClose={stores.common.modalImageCloseFunction}
          maxWidth='md'
          classes={{
            paper: classes.paper
          }}
        >
          <img src={stores.common.modalImageSrc} width="100%" />
        </Dialog>
        <ModalVideo
          channel={stores.common.modalVideoChannel}
          isOpen={stores.common.modalVideoOpen}
          videoId={stores.common.modalVideoId}
          onClose={stores.common.modalVideoCloseFunction}
        />
      </React.Fragment>
    );
    
  }
  
};

export default withStyles(stylesObj)(Component);