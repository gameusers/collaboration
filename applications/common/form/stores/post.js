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
  //   Form
  // ---------------------------------------------
  
  /**
   * フォームが送信されたときに呼び出される
   * フォームをリセット
   * @param {Object} event - イベント
   * @param {string} id - 例）ayucwHGa7Ug-comment-insert
   */
  @action.bound
  handleFormOnSubmit(event, id) {
    
    // console.log(`\n\n`);
    // console.log(`--- handleFormOnSubmit ---`);
    // console.log(`id = ${id}`);
    // console.log(`\n\n`);
    
    event.preventDefault();
    event.target.reset();
    
    this.anonymityCheckedObj[id] = false;
    this.nameObj[id] = '';
    this.textObj[id] = '';
    this.imageFormOpenObj[id] = false;
    this.videoFormOpenObj[id] = false;
    this.imageSrcObj[id] = '';
    this.imageWidthObj[id] = '';
    this.imageHeightObj[id] = '';
    this.imageExtensionObj[id] = '';
    this.imageCaptionOpenObj[id] = false;
    this.imageCaptionObj[id] = '';
    this.videoUrlObj[id] = '';
    this.imageVideoObj[id] = [];
    
  };
  
  
  
  // ---------------------------------------------
  //   Anonymity
  // ---------------------------------------------
  
  /**
   * ななしにするチェックボックスのチェック情報を保存するオブジェクト
   * @type {Object}
   */
  @observable anonymityCheckedObj = {};
  
  
  /**
   * ななしにするチェックボックスがチェックされたときに呼び出される
   * @param {string} id - 例）ayucwHGa7Ug-comment-insert
   */
  @action.bound
  handleAnonymityChecked(id) {
    this.anonymityCheckedObj[id] = !this.anonymityCheckedObj[id];
  };
  
  
  
  // ---------------------------------------------
  //   Name
  // ---------------------------------------------
  
  /**
   * 名前入力フォームに入力された文字列を保存するオブジェクト
   * ログインしていないときに表示される
   * @type {Object}
   */
  @observable nameObj = {};
  
  
  /**
   * 名前入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   * @param {string} id - 例）ayucwHGa7Ug-comment-insert
   */
  @action.bound
  handleName(event, id) {
    this.nameObj[id] = event.target.value;
  };
  
  
  
  // ---------------------------------------------
  //   Textarea
  // ---------------------------------------------
  
  /**
   * テキスト入力フォームに入力した文字列を保存するオブジェクト
   * @type {Object}
   */
  @observable textObj = {};
  
  
  /**
   * テキスト入力フォームに文字列を入力したときに呼び出される
   * @param {Object} event - イベント
   * @param {string} id - 例）ayucwHGa7Ug-comment-insert
   */
  @action.bound
  handleText(event, id) {
    this.textObj[id] = event.target.value;
    
    // console.log(`\n\n`);
    // console.log(`--- handleText ---`);
    // console.log(`id = ${id}`);
    // console.log(`event.target.value = ${event.target.value}`);
    // console.log(`this.textObj[id] = ${this.textObj[id]}`);
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
   * 投稿された画像のソースを保存するオブジェクト
   * @type {Object}
   */
  imageSrcObj = {};
  
  /**
   * 投稿された画像の幅を保存するオブジェクト
   * @type {Object}
   */
  imageWidthObj = {};
  
  /**
   * 投稿された画像の高さを保存するオブジェクト
   * @type {Object}
   */
  imageHeightObj = {};
  
  /**
   * 投稿された画像の拡張子を保存するオブジェクト
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
    
    // console.log(`imageVideoArr`);
    // console.dir(imageVideoArr);
    
    let duplication = false;
    
    if (imageVideoArr.length > 0) {
      
      for (const value of imageVideoArr.values()) {
        
        if (value.type === 'image') {
          
          console.log(`value.type = ${value.type}`);
          
          duplication = value.imageSetArr.find((value) => {
            return (value.src === this.imageSrcObj[id]);
          });
          
          if (duplication) {
            break;
          }
          
        }
        
      }
      
    }
    
    // console.log(`this.imageSrcObj[id] = ${this.imageSrcObj[id]}`);
    
    // ---------------------------------------------
    //   画像が選択されていて、重複していない場合はオブジェクトに追加する
    // ---------------------------------------------
    
    if (this.imageSrcObj[id] === '' || id in this.imageSrcObj === false) {
      
      storeLayout.handleSnackbarOpen('error', '画像を選択してください。');
      return;
      
    } else if (duplication) {
      
      storeLayout.handleSnackbarOpen('error', 'すでに同じ画像が追加されています。');
      return;
      
    } else {
      
      const imageId = shortid.generate();
      const width = this.imageWidthObj[id];
      const height = this.imageHeightObj[id];
      
      const imageSetArr = [];
      
      
      let aspectRatio = 1;
      
      if (width >= height) {
        
        aspectRatio = height / width;
        // console.log(`aspectRatio = ${aspectRatio}`);
        
        if (width <= 320) {
          
          imageSetArr.push({
            w: '320w',
            src: this.imageSrcObj[id],
            width: this.imageWidthObj[id],
            height: this.imageHeightObj[id],
            type: 'JPEG'
          });
          
        } else if (width > 320) {
          
          imageSetArr.push({
            w: '320w',
            src: this.imageSrcObj[id],
            width: 320,
            height: Math.round(320 * aspectRatio),
            type: 'JPEG'
          });
          
        }
        
        if (width > 480) {
          
          imageSetArr.push({
            w: '480w',
            src: this.imageSrcObj[id],
            width: 480,
            height: Math.round(480 * aspectRatio),
            type: 'JPEG'
          });
          
        }
        
      } else {
        
        if (height <= 320) {
          
          imageSetArr.push({
            w: '320w',
            src: this.imageSrcObj[id],
            width: this.imageWidthObj[id],
            height: this.imageHeightObj[id],
            type: 'JPEG'
          });
          
        } else if (height > 320) {
          
          imageSetArr.push({
            w: '320w',
            src: this.imageSrcObj[id],
            width: Math.round(320 * aspectRatio),
            height: 320,
            type: 'JPEG'
          });
          
        }
        
        if (height > 480) {
          imageSetArr.push({
            w: '480w',
            src: this.imageSrcObj[id],
            width: Math.round(480 * aspectRatio),
            height: 480,
            type: 'JPEG'
          });
        }
        
      }
      
      imageSetArr.push({
        w: 'source',
        src: this.imageSrcObj[id],
        width: this.imageWidthObj[id],
        height: this.imageHeightObj[id],
        type: 'JPEG'
      });
      
      
      // console.dir(imageSetArr);
      
      
      // ---------------------------------------------
      //   imageVideoArr に追加する
      // ---------------------------------------------
      
      imageVideoArr.push({
        id: imageId,
        type: 'image',
        imageSetArr,
        caption: this.imageCaptionObj[id]
      });
      
      
      
      // Preview 用のオブジェクトに追加する
      this.imageVideoObj[id] = imageVideoArr;
      
      // Caption 入力フォームをリセット
      this.imageCaptionObj[id] = '';
      
      
      
      // ---------------------------------------------
      //   Initialize
      // ---------------------------------------------
      
      // Lightbox
      storeLayout.initializeLightbox(id, imageVideoArr);
      
      
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
  
  
  /**
   * 投稿フォームで入力した動画を追加する
   * 追加すると動画のサムネイルがフォーム内に表示される（プレビューできる）
   * @param {string} id - 例）ayucwHGa7Ug-comment-insert
   */
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
          type: 'video',
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
  
  // @observable lightboxObj = {};
  // @observable lightboxCurrentNoObj = {};
  // @observable lightboxOpenObj = {};
  
  // @action.bound
  // handleLightboxOpen(id, currentNo) {
  //   // console.log(`handleLightboxOpen`);
  //   // console.log(`id = ${id}`);
  //   // console.log(`currentNo = ${currentNo}`);
  //   this.lightboxCurrentNoObj[id] = currentNo;
  //   this.lightboxOpenObj[id] = true;
  // };
  
  // @action.bound
  // handleLightboxClose(id) {
  //   this.lightboxOpenObj[id] = false;
  // };
  
  // @action.bound
  // handleLightboxPrevious(id) {
  //   this.lightboxCurrentNoObj[id] = this.lightboxCurrentNoObj[id] - 1;
  // };
  
  // @action.bound
  // handleLightboxNext(id) {
  //   this.lightboxCurrentNoObj[id] = this.lightboxCurrentNoObj[id] + 1;
  // };
  
  
  
  
  
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