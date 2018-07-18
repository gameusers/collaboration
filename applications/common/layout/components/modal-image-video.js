// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';

import ModalVideo from 'react-modal-video';
import Lightbox from 'react-images';



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
          open={stores.layout.modalImageOpen}
          onClose={stores.layout.handleModalImageClose}
          maxWidth='md'
          classes={{
            paper: classes.paper
          }}
        >
          <img src={stores.layout.modalImageSrc} width="100%" />
        </Dialog>
        <ModalVideo
          channel={stores.layout.modalVideoChannel}
          isOpen={stores.layout.modalVideoOpen}
          videoId={stores.layout.modalVideoId}
          onClose={stores.layout.handleModalVideoClose}
        />
        <Lightbox
          images={[
            {
              src: 'https://gameusers.org/assets/img/bbs_uc/reply/1089/image_1.jpg',
              caption: 'Caption 1',
              srcSet: [
                'https://gameusers.org/assets/img/bbs_uc/reply/1089/image_1.jpg 320w',
                'https://gameusers.org/assets/img/bbs_uc/reply/1089/image_1.jpg 640w',
              ],
            },
            {
              src: 'https://gameusers.org/assets/img/bbs_uc/comment/1209/image_1.jpg',
              caption: 'Caption 2',
              srcSet: [
                'https://gameusers.org/assets/img/bbs_uc/comment/1209/image_1.jpg 320w',
                'https://gameusers.org/assets/img/bbs_uc/comment/1209/image_1.jpg 640w',
              ],
            }
          ]}
          currentImage={stores.layout.lightboxCurrentNo}
          isOpen={stores.layout.lightboxOpen}
          onClickPrev={stores.layout.handleLightboxPreviousCurrentNo}
          onClickNext={stores.layout.handleLightboxNextCurrentNo}
          onClose={stores.layout.handleLightboxClose}
          backdropClosesModal
        />
      </React.Fragment>
    );
    
  }
  
};

export default withStyles(stylesObj)(Component);