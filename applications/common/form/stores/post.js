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
  //   Anonymity
  // ---------------------------------------------
  
  @observable anonymityCheckedObj = {};
  
  @action.bound
  handleAnonymityChecked(id) {
    this.anonymityCheckedObj[id] = !this.anonymityCheckedObj[id];
    
    // console.log(`id = ${id}`);
    // console.log(`this.anonymityCheckedObj[id] = ${this.anonymityCheckedObj[id]}`);
    // console.dir(`this.anonymityCheckedObj = ${this.anonymityCheckedObj}`);
  };
  
  
  
  // ---------------------------------------------
  //   Open Image Form & Video Form
  // ---------------------------------------------
  
  @observable imageFormOpenObj = {};
  @observable videoFormOpenObj = {};
  
  @action.bound
  handleImageFormOpen(id) {
    this.imageFormOpenObj[id] = !this.imageFormOpenObj[id];
    this.videoFormOpenObj[id] = false;
  };
  
  @action.bound
  handleVideoFormOpen(id) {
    this.videoFormOpenObj[id] = !this.videoFormOpenObj[id];
    this.imageFormOpenObj[id] = false;
  };
  
  
  
  // ---------------------------------------------
  //   Image Form
  // ---------------------------------------------
  
  imageSrcObj = {};
  imageWidthObj = {};
  imageHeightObj = {};
  imageExtensionObj = {};
  
  
  @action.bound
  handleSelectImage(event, id) {
    // console.log(`file = ${event.target.files[0]}`);
    // console.log(`id = ${id}`);
    
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
      storeLayout.handleSnackbarOpen('error', '最新のブラウザを利用してください。');
      return;
    }
    
    if (!file.type.match(/^image\/(gif|jpeg|png|svg\+xml)$/)) {
      storeLayout.handleSnackbarOpen('error', 'アップロードできるのは PNG, GIF, JPEG, SVG の画像ファイルです。');
      return;
    }
    
    if (file.size > imageSizeUpperLimit) {
      storeLayout.handleSnackbarOpen('error', '画像のサイズが大きすぎます。');
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
        
        this.imageSrcObj[id] = fileReader.result;
        this.imageWidthObj[id] = width;
        this.imageHeightObj[id] = height;
        this.imageExtensionObj[id] = extension;
        
        console.log(`imageSrcObj[id] = ${this.imageSrcObj[id]}`);
        console.log(`imageWidthObj[id] = ${this.imageWidthObj[id]}`);
        console.log(`imageHeightObj[id] = ${this.imageHeightObj[id]}`);
        console.log(`imageExtensionObj[id] = ${this.imageExtensionObj[id]}`);
        
      };

    };

    fileReader.readAsDataURL(file);
    
  };
  
  
  @action.bound
  handleAddImage(id) {
    
    
    // ---------------------------------------------
    //  Preview Arr
    // ---------------------------------------------
    
    let previewArr = [];
    
    if (id in this.previewObj) {
      previewArr = this.previewObj[id];
    }
    
    
    // ---------------------------------------------
    //   重複のチェック
    // ---------------------------------------------
    
    const duplication = previewArr.find((value) => {
      return (value.imageSrc === this.imageSrcObj[id]);
    });
    
    
    // ---------------------------------------------
    //   重複していない場合はオブジェクトに追加する
    // ---------------------------------------------
    
    if (duplication) {
      
      storeLayout.handleSnackbarOpen('error', 'すでに同じ画像が登録されています。');
      return;
      
    } else {
      
      previewArr.push({
        imageSrc: this.imageSrcObj[id],
        videoChannel: '',
        videoId: '',
      });
      
      this.previewObj[id] = previewArr;
      
    }
    
  };
  
  
  
  @observable imageCaptionOpenObj = {};
  
  @action.bound
  handleImageCaptionOpen(id) {
    this.imageCaptionOpenObj[id] = !this.imageCaptionOpenObj[id];
  };
  
  
  
  // ---------------------------------------------
  //   Video Form
  // ---------------------------------------------
  
  @observable videoUrlObj = {};
  
  @action.bound
  handleVideoUrl(event, id) {
    this.videoUrlObj[id] = event.target.value;
  };
  
  
  @action.bound
  handleAddVideo(id) {
    
    
    // ---------------------------------------------
    //  Preview Arr
    // ---------------------------------------------
    
    let previewArr = [];
    
    if (id in this.previewObj) {
      previewArr = this.previewObj[id];
    }
    
    
    // ---------------------------------------------
    //   Video URL
    // ---------------------------------------------
    
    let videoUrl = '';
    
    if (id in this.videoUrlObj) {
      videoUrl = this.videoUrlObj[id];
    }
    
    
    // ---------------------------------------------
    //   Video Channel
    // ---------------------------------------------
    
    let videoChannel = 'youtube';
    
    if (videoUrl.indexOf('youtube.com') !== -1 || videoUrl.indexOf('youtu.be') !== -1) {
      videoChannel = 'youtube';
    }
    
    
    // ---------------------------------------------
    //   Video Id
    // ---------------------------------------------
    
    const resultArr = videoUrl.match(/[/?=]([-\w]{11})/);
    
    if (resultArr) {
      
      const videoId = resultArr[1];
      
      
      // ---------------------------------------------
      //   重複のチェック
      // ---------------------------------------------
      
      const duplication = previewArr.find((value) => {
        return (value.videoId === videoId);
      });
      
      // console.log(`duplication = ${duplication}`);
      
      
      // ---------------------------------------------
      //   重複していない場合はオブジェクトに追加する
      // ---------------------------------------------
      
      if (duplication) {
        
        storeLayout.handleSnackbarOpen('error', 'すでに同じ動画が登録されています。');
        return;
        
      } else {
        
        previewArr.push({
          imageSrc: '',
          videoChannel,
          videoId,
        });
        
        this.previewObj[id] = previewArr;
        this.videoUrlObj[id] = '';
        
      }
      
    }
    
  };
  
  
  
  // ---------------------------------------------
  //   Preview Delete
  // ---------------------------------------------
  
  @action.bound
  handlePreviewDelete(id, number) {
    // console.log(`id = ${id}`);
    // console.log(`number = ${number}`);
    // console.log(`this.previewObj[id] = ${this.previewObj[id]}`);
    this.previewObj[id].splice(number, 1);
  };
  
  
  
  // ---------------------------------------------
  //   Preview
  // ---------------------------------------------
  
  @observable previewObj = {};
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