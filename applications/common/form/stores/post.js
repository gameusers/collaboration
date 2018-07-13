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
  //   Open Image Video Form
  // ---------------------------------------------
  
  @observable imageOpen = false;
  
  @action.bound
  handleImageOpen() {
    this.imageOpen = !this.imageOpen;
    this.videoOpen = false;
  };
  
  
  @observable videoOpen = false;
  
  @action.bound
  handleVideoOpen() {
    this.videoOpen = !this.videoOpen;
    this.imageOpen = false;
  };
  
  
  
  // ---------------------------------------------
  //   Image Form
  // ---------------------------------------------
  
  @action.bound
  handleAddImages(event) {
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
        
        console.log(`width = ${width}`);
        console.log(`height = ${height}`);
        console.log(`extension = ${extension}`);
        console.log(`fileReader.result = ${fileReader.result}`);

        // dispatch(actions.funcShareImage(file, fileReader.result, width, height, extension));
        
        // ---------------------------------------------
        //   重複のチェック
        // ---------------------------------------------
        
        const duplication = this.previewArr.find((value) => {
          return (value.imageSrc === fileReader.result);
        });
        
        
        // console.log(`duplication = ${duplication}`);
        
        // ---------------------------------------------
        //   重複していない場合は配列に追加する
        // ---------------------------------------------
        
        if (duplication) {
          
          storeLayout.handleSnackbarOpen('error', 'すでに同じ画像が登録されています。');
          return;
          
        } else {
          
          this.previewArr.push({
            imageSrc: fileReader.result,
            videoChannel: '',
            videoId: '',
          });
          
        }
        
      };

    };

    fileReader.readAsDataURL(file);
    
  };
  
  
  
  // ---------------------------------------------
  //   Video Form
  // ---------------------------------------------
  
  @observable videoUrl = '';
  
  @action.bound
  handleVideoUrl(event) {
    this.videoUrl = event.target.value;
  };
  
  @action.bound
  handleAddVideos() {
    
    
    // ---------------------------------------------
    //   Video Channel
    // ---------------------------------------------
    
    let videoChannel = 'youtube';
    
    if (this.videoUrl.indexOf('youtube.com') !== -1 || this.videoUrl.indexOf('youtu.be') !== -1) {
      videoChannel = 'youtube';
    }
    
    
    // ---------------------------------------------
    //   Video Id
    // ---------------------------------------------
    
    const resultArr = this.videoUrl.match(/[/?=]([-\w]{11})/);
    
    if (resultArr) {
      
      const videoId = resultArr[1];
      
      
      // ---------------------------------------------
      //   重複のチェック
      // ---------------------------------------------
      
      const duplication = this.previewArr.find((value) => {
        return (value.videoId === videoId);
      });
      
      // console.log(`duplication = ${duplication}`);
      
      
      // ---------------------------------------------
      //   重複していない場合は配列に追加する
      // ---------------------------------------------
      
      if (duplication) {
        
        storeLayout.handleSnackbarOpen('error', 'すでに同じ動画が登録されています。');
        return;
        
      } else {
        
        this.videoUrl = '';
        
        this.previewArr.push({
          imageSrc: '',
          videoChannel,
          videoId,
        });
        
      }
      
      // console.log(`videoId = ${videoId}`);
    }
    
    // console.log(`resultArr = ${resultArr}`);
    
  };
  
  
  
  // ---------------------------------------------
  //   Preview Image Video
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