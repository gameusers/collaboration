// --------------------------------------------------
//   Import
// --------------------------------------------------

import { action, observable } from 'mobx';
import shortid from 'shortid';


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
  handleName(event, id) {
    this.nameObj[id] = event.target.value;
  };
  
  
  // ---------------------------------------------
  //   Textarea
  // ---------------------------------------------
  
  @observable textObj = {};
  
  @action.bound
  handleText(event, id) {
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
  
  /**
   * 投稿された画像のソースを入れるオブジェクト
   * @type {Object}
   */
  imageSrcObj = {};
  
  /**
   * 投稿された画像の幅を入れるオブジェクト
   * @type {Object}
   */
  imageWidthObj = {};
  
  /**
   * 投稿された画像の高さを入れるオブジェクト
   * @type {Object}
   */
  imageHeightObj = {};
  
  /**
   * 投稿された画像の拡張子を入れるオブジェクト
   * @type {Object}
   */
  imageExtensionObj = {};
  
  
  /**
   * 投稿フォームで画像を選択したときに呼び出される
   * @param {Object} event - イベント
   * @param {string} id - 例）ayucwHGa7Ug-comment-insert
   */
  @action.bound
  handleSelectImage(event, id) {
    
    // console.log(`\n\n`);
    // console.log(`--- handleSelectImage ---`);
    // console.log(`event = ${event} / type = ${typeof event}`);
    // console.log(`id = ${id}`);
    // console.log(`file = ${event.target.files[0]}`);
    // console.log(`\n\n`);
    
    
    // アップロードする画像の最大サイズ、5MBまで
    const imageSizeUpperLimit = 5242880;
    
    // アップロードされたファイル
    const file = event.target.files[0];
    
    
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
    
    const fileReader = new FileReader();
    
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
        
        // console.log(`imageSrcObj[id] = ${this.imageSrcObj[id]}`);
        // console.log(`imageWidthObj[id] = ${this.imageWidthObj[id]}`);
        // console.log(`imageHeightObj[id] = ${this.imageHeightObj[id]}`);
        // console.log(`imageExtensionObj[id] = ${this.imageExtensionObj[id]}`);
        
      };

    };

    fileReader.readAsDataURL(file);
    
  };
  
  
  /**
   * 投稿フォームで選択した画像を追加する
   * 追加すると画像のサムネイルがフォーム内に表示される（プレビューできる）
   * @param {string} id - 例）ayucwHGa7Ug-comment-insert
   */
  @action.bound
  handleAddImage(id) {
    
    
    // ---------------------------------------------
    //  Console 出力
    // ---------------------------------------------
    
    // console.log(`\n\n`);
    // console.log(`--- handleAddImage ---`);
    // console.log(`id = ${id}`);
    // console.log(`this.imageVideoObj =`);
    // console.dir(this.imageVideoObj);
    // console.log(`\n\n`);
    
    
    // ---------------------------------------------
    //  Preview 用の配列、すでに配列が存在する場合はそちらを使う
    // ---------------------------------------------
    
    let imageVideoArr = [];
    
    if (id in this.imageVideoObj) {
      imageVideoArr = this.imageVideoObj[id];
    }
    
    
    // ---------------------------------------------
    //   すでに同じ画像が追加されていないかチェックする
    // ---------------------------------------------
    
    let duplication = false;
    
    if (imageVideoArr.length > 0) {
      
      duplication = imageVideoArr[0].imageSetArr.find((value) => {
        return (value.src === this.imageSrcObj[id]);
      });
      
    }
    
    
    
    
    // imageVideoArr: [
    //   {
    //     id: 'bQcCGQwpv60',
    //     type: 'image',
    //     imageSetArr: [
    //       {
    //         w: '320w',
    //         src: '/static/img/bbs/bQcCGQwpv60/96x144.jpg',
    //         width: 96,
    //         height: 144,
    //         type: 'JPEG'
    //       },
    //       {
    //         w: 'source',
    //         src: '/static/img/bbs/bQcCGQwpv60/96x144.jpg',
    //         width: 96,
    //         height: 144,
    //         type: 'JPEG'
    //       },
    //     ],
    //     caption: '小さい正方形画像',
    //   },
    // ],
    
    
    // ---------------------------------------------
    //   画像が選択されていて、重複していない場合はオブジェクトに追加する
    // ---------------------------------------------
    
    if (id in this.imageSrcObj === false) {
      
      storeLayout.handleSnackbarOpen('error', '画像を選択してください。');
      return;
      
    } else if (duplication) {
      
      storeLayout.handleSnackbarOpen('error', 'すでに同じ画像が追加されています。');
      return;
      
    } else {
      
      const imageId = shortid.generate();
      
      imageVideoArr.push({
        id: imageId,
        type: 'image',
        imageSetArr: [
          {
            w: '320w',
            src: this.imageSrcObj[id],
            width: this.imageWidthObj[id],
            height: this.imageHeightObj[id],
            type: 'JPEG'
          },
          {
            w: 'source',
            src: this.imageSrcObj[id],
            width: this.imageWidthObj[id],
            height: this.imageHeightObj[id],
            type: 'JPEG'
          },
        ],
        caption: this.imageCaptionObj[id]
      });
      
      
      // Preview 用のオブジェクトに追加する
      this.imageVideoObj[id] = imageVideoArr;
      
      // Lightbox 用に画像を追加
      storeLayout.handleLightboxAddImage(id, imageId, this.imageSrcObj[id], this.imageCaptionObj[id]);
      
      // Caption 入力フォームをリセット
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
    //  Image & Video Arr
    // ---------------------------------------------
    
    let imageVideoArr = [];
    
    if (id in this.imageVideoObj) {
      imageVideoArr = this.imageVideoObj[id];
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
      
      const duplication = imageVideoArr.find((value) => {
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
        
        imageVideoArr.push({
          imageSrc: '',
          videoChannel,
          videoId,
        });
        
        this.imageVideoObj[id] = imageVideoArr;
        this.videoUrlObj[id] = '';
        
      }
      
    } else {
      
      storeLayout.handleSnackbarOpen('error', '動画のURLを入力してください。');
      return;
      
    }
    
  };
  
  
  
  
  
  // ---------------------------------------------
  //   Preview用 Image & Video
  // ---------------------------------------------
  
  @observable imageVideoObj = {};
  
  
  // ---------------------------------------------
  //   - Handle
  // ---------------------------------------------
  
  @action.bound
  handleImageVideoDelete(id, index) {
    
    console.log(`\n\n`);
    console.log(`--- handleImageVideoDelete ---`);
    console.log(`id = ${id}`);
    console.log(`index = ${index}`);
    
    
    const deleteId = this.imageVideoObj[id][index].id;
    
    // const deleteIndex = storeLayout.lightboxObj[id].findIndex((value) => {
    //   return value.id === deleteId;
    // });
    
    console.log(`deleteId = ${deleteId}`);
    // console.log(`deleteIndex = ${deleteIndex}`);
    console.log(`this.imageVideoObj =`);
    console.dir(this.imageVideoObj);
    console.log(`this.imageVideoObj[id] =`);
    console.dir(this.imageVideoObj[id]);
    console.log(`\n\n`);
    
    
    // this.imageVideoObj[id].splice(index, 1);
    
    // if (deleteIndex !== -1) {
    //   storeLayout.lightboxObj[id].splice(deleteIndex, 1);
    // }
    
  };
  
  
  
  
  
  // ---------------------------------------------
  //   Lightbox
  // ---------------------------------------------
  
  @observable lightboxObj = {};
  @observable lightboxCurrentNoObj = {};
  @observable lightboxOpenObj = {};
  
  @action.bound
  handleLightboxOpen(id, currentNo) {
    // console.log(`handleLightboxOpen`);
    // console.log(`id = ${id}`);
    // console.log(`currentNo = ${currentNo}`);
    this.lightboxCurrentNoObj[id] = currentNo;
    this.lightboxOpenObj[id] = true;
  };
  
  @action.bound
  handleLightboxClose(id) {
    this.lightboxOpenObj[id] = false;
  };
  
  @action.bound
  handleLightboxPrevious(id) {
    this.lightboxCurrentNoObj[id] = this.lightboxCurrentNoObj[id] - 1;
  };
  
  @action.bound
  handleLightboxNext(id) {
    this.lightboxCurrentNoObj[id] = this.lightboxCurrentNoObj[id] + 1;
  };
  
  
  
  
  
  // ----------------------------------------
  //   Initialize Form Post
  // ----------------------------------------
  
  @action.bound
  initializeFormPost(argumentsObj) {
    
    const id = argumentsObj.id ? argumentsObj.id : '';
    const name = argumentsObj.name ? argumentsObj.name : '';
    const text = argumentsObj.text ? argumentsObj.text : '';
    const imageVideoArr = argumentsObj.imageVideoArr ? argumentsObj.imageVideoArr : [];
    
    
    // Anonymity
    if (id in this.anonymityCheckedObj === false) {
      this.anonymityCheckedObj[id] = false;
    }
    
    // Name
    if (id in this.nameObj === false) {
      this.nameObj[id] = name;
    }
    
    // Text
    if (id in this.textObj === false) {
      this.textObj[id] = text;
    }
    
    
    
    // Image Form Open
    if (id in this.imageFormOpenObj === false) {
      this.imageFormOpenObj[id] = false;
    }
    
    // Video Form Open
    if (id in this.videoFormOpenObj === false) {
      this.videoFormOpenObj[id] = false;
    }
    
    
    
    // Image Caption Open
    if (id in this.imageCaptionOpenObj === false) {
      this.imageCaptionOpenObj[id] = false;
    }
    
    // Image Caption
    if (id in this.imageCaptionObj === false) {
      this.imageCaptionObj[id] = '';
    }
    
    // Video URL
    if (id in this.videoUrlObj === false) {
      this.videoUrlObj[id] = '';
    }
    
    
    
    // Preview Image & Video
    if (id in this.imageVideoObj === false) {
      this.imageVideoObj[id] = imageVideoArr;
    }
    
    
    
    // console.log(`initializeFormPost`);
    // console.log(`id = ${id}`);
    
  }
  
  
}



// --------------------------------------------------
//   Initialize Store
// --------------------------------------------------

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