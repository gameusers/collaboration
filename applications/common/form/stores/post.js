// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';


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
  };
  
  
  
  
  // ---------------------------------------------
  //   Name
  // ---------------------------------------------
  
  @observable nameObj = {};
  
  @action.bound
  handleNameObj(event, id) {
    this.nameObj[id] = event.target.value;
  };
  
  
  // ---------------------------------------------
  //   Textarea
  // ---------------------------------------------
  
  @observable textObj = {};
  
  @action.bound
  handleTextObj(event, id) {
    this.textObj[id] = event.target.value;
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
        
        console.log(`id = ${id}`);
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
    //   画像が選択されていて、重複していない場合はオブジェクトに追加する
    // ---------------------------------------------
    
    // console.dir(this.imageSrcObj);
    // console.log(id in this.imageSrcObj);
    
    if (id in this.imageSrcObj === false) {
      
      storeLayout.handleSnackbarOpen('error', '画像を選択してください。');
      return;
      
    } else if (duplication) {
      
      storeLayout.handleSnackbarOpen('error', 'すでに同じ画像が登録されています。');
      return;
      
    } else {
      
      previewArr.push({
        imageSrc: this.imageSrcObj[id],
        videoChannel: '',
        videoId: '',
      });
      
      this.previewObj[id] = previewArr;
      
      
      // Lightbox 用に画像を追加
      storeLayout.handleLightboxAddImage(id, this.imageSrcObj[id], this.imageCaptionObj[id]);
      
      // Caption をリセット
      this.imageCaptionObj[id] = '';
      
    }
    
  };
  
  
  // ----------------------------------------
  //   - Caption
  // ----------------------------------------
  
  @observable imageCaptionOpenObj = {};
  
  @action.bound
  handleImageCaptionOpen(id) {
    this.imageCaptionOpenObj[id] = !this.imageCaptionOpenObj[id];
  };
  
  
  @observable imageCaptionObj = {};
  
  @action.bound
  handleImageCaption(event, id) {
    // console.log(`event.target.value = ${event.target.value}`);
    this.imageCaptionObj[id] = event.target.value;
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
      
    } else {
      
      storeLayout.handleSnackbarOpen('error', '動画のURLを入力してください。');
      return;
      
    }
    
  };
  
  
  
  // ---------------------------------------------
  //   Preview Delete
  // ---------------------------------------------
  
  @action.bound
  handlePreviewDelete(id, index) {
    // console.log(`id = ${id}`);
    // console.log(`index = ${index}`);
    // console.log(`this.previewObj[id] = ${this.previewObj[id]}`);
    this.previewObj[id].splice(index, 1);
    storeLayout.handleLightboxDeleteImage(id, index);
  };
  
  
  
  // ---------------------------------------------
  //   Preview
  // ---------------------------------------------
  
  @observable previewObj = {};
  // @observable previewArr = [];
  
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
  
  
  
  // ----------------------------------------
  //   Initialize Form Post
  // ----------------------------------------
  
  @action.bound
  initializeFormPost(argumentsObj) {
    
    const id = argumentsObj.id ? argumentsObj.id : '';
    const name = argumentsObj.name ? argumentsObj.name : '';
    const text = argumentsObj.text ? argumentsObj.text : '';
    const imageVideoArr = argumentsObj.imageVideoArr ? argumentsObj.imageVideoArr : [];
    
    // Name
    if (id in this.nameObj === false) {
      this.nameObj[id] = name;
    }
    
    // Text
    if (id in this.textObj === false) {
      this.textObj[id] = text;
    }
    
    // Image & Video Preview
    if (id in this.previewObj === false) {
      this.previewObj[id] = imageVideoArr;
    }
    
    console.log(`initializeFormPost`);
    console.log(`id = ${id}`);
    
  }
  
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

// export default function initStoreFormPost(isServer, storeInstanceObj) {
export default function initStoreFormPost(argumentsObj) {
  
  const isServer = argumentsObj.isServer;
  const storeInstanceObj = argumentsObj.storeInstanceObj;
  
  
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