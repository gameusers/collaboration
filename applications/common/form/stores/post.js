// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';
// import { Store as StoreCommon } from '../../../common/layout/stores/common';
// import initStoreLayout from '../../../common/layout/stores/layout';
// import { store as storeCommon } from '../../../common/layout/stores/common';


// --------------------------------------------------
//   Store
// --------------------------------------------------

let storeFormPost = null;
let storeLayout = null;


// --------------------------------------------------
//   Class
// --------------------------------------------------

class Store {
  
  
  // ---------------------------------------------
  //   BBS Form
  // ---------------------------------------------
  
  @observable bbsFormAnonymityChecked = false;
  @observable bbsFormImageOpen = false;
  @observable bbsFormVideoOpen = false;
  
  
  @action.bound
  handleBbsFormAnonymityChecked() {
    this.bbsFormAnonymityChecked = !this.bbsFormAnonymityChecked;
  };
  
  @action.bound
  handleBbsFormImageOpen() {
    this.bbsFormImageOpen = !this.bbsFormImageOpen;
    this.bbsFormVideoOpen = false;
  };
  
  @action.bound
  handleBbsFormVideoOpen() {
    this.bbsFormVideoOpen = !this.bbsFormVideoOpen;
    this.bbsFormImageOpen = false;
  };
  
  @action.bound
  handleBbsFormAddImages(event) {
    // console.log(`file = ${event.target.files[0]}`);
    
    const imageSizeUpperLimit = 5242880;
    
    const file = event.target.files[0];
    const fileReader = new FileReader();
    
    
    // ---------------------------------------------
    //   Error
    // ---------------------------------------------
    
    if (!file) {
      return;
    }
    
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
      storeLayout.handleOpenSnackbar('error', '最新のブラウザを利用してください。');
      return;
    }
    
    if (!file.type.match(/^image\/(gif|jpeg|png|svg\+xml)$/)) {
      storeLayout.handleOpenSnackbar('error', 'アップロードできるのは PNG, GIF, JPEG, SVG の画像ファイルです。');
      return;
    }
    
    if (file.size > imageSizeUpperLimit) {
      storeLayout.handleOpenSnackbar('error', '画像のサイズが大きすぎます。');
      return;
    }
    
    
    // ---------------------------------------------
    //   画像のデータ取得
    // ---------------------------------------------
    
    fileReader.onload = () => {

      const img = new Image();
      img.src = fileReader.result;

      img.onload = () => {

        const { width } = img;
        const { height } = img;

        let extension = null;

        if (file.type === 'image/gif') {
          extension = 'gif';
        } else if (file.type === 'image/jpeg') {
          extension = 'jpg';
        } else if (file.type === 'image/png') {
          extension = 'png';
        } else {
          extension = 'svg';
        }
        
        console.log(`width = ${width}`);
        console.log(`height = ${height}`);
        console.log(`extension = ${extension}`);
        console.log(`fileReader.result = ${fileReader.result}`);

        // dispatch(actions.funcShareImage(file, fileReader.result, width, height, extension));
        
        
        this.previewArr.push({
          imageSrc: fileReader.result,
          videoChannel: '',
          videoId: '',
        });
        
      };

    };

    fileReader.readAsDataURL(file);
    
  };
  
  
  
  
  // ---------------------------------------------
  //   Video
  // ---------------------------------------------
  
  @observable videoUrl = '';
  
  @action.bound
  handleVideoUrl(event) {
    this.videoUrl = event.target.value;
  };
  
  
  
  // ---------------------------------------------
  //   Preview
  // ---------------------------------------------
  
  @action.bound
  handlePreviewDelete(number) {
    this.previewArr.splice(number, 1);
  };
  
  
  
  // ---------------------------------------------
  //   Preview
  // ---------------------------------------------
  
  @observable previewArr = [];
  
  // @observable previewArr = [
  //   {
  //     imageSrc: 'https://gameusers.org/assets/img/bbs_uc/comment/1199/image_1.jpg',
  //     videoChannel: '',
  //     videoId: ''
  //   },
  //   {
  //     imageSrc: 'https://gameusers.org/assets/img/bbs_uc/comment/1167/image_1.jpg',
  //     videoChannel: '',
  //     videoId: ''
  //   },
  //   {
  //     imageSrc: '',
  //     videoChannel: 'youtube',
  //     videoId: '1yIHLQJNvDw'
  //   },
  // ];
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

export default function initStoreFormPost(isServer, storeInstanceObj) {
  
  if (storeLayout === null && 'layout' in storeInstanceObj) {
    storeLayout = storeInstanceObj.layout;
  }
  
  if (isServer) {
    
    return new Store();
    
  } else {
    
    if (storeFormPost === null) {
      storeFormPost = new Store();
    }
    
    return storeFormPost;
    
  }
  
}