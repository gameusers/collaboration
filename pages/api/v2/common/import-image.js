// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import fs from 'fs';
// import shortid from 'shortid';
// import bcrypt from 'bcryptjs';
import moment from 'moment';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';


// ---------------------------------------------
//   Schema
// ---------------------------------------------

import SchemaTempID from 'import/@database/temp-id-schema.js';
import SchemaTempImageID from 'import/@database/temp-image-id-schema.js';

import SchemaImagesAndVideos from 'app/@database/images-and-videos/schema.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { returnErrorsArr } from 'app/@modules/log/log.js';
import { saveImageAndVideo } from 'import/@modules/image.js';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { locale } from 'app/@locales/locale.js';


// ---------------------------------------------
//   API
// ---------------------------------------------

// import { initialProps } from 'app/@api/v2/common.js';






// --------------------------------------------------
//   endpointID: lXllGsGQd
// --------------------------------------------------

export default async (req, res) => {


  // --------------------------------------------------
  //   Status Code
  // --------------------------------------------------

  let statusCode = 400;


  // --------------------------------------------------
  //   Property
  // --------------------------------------------------

  let returnObj = {};
  const requestParametersObj = {};
  const loginUsers_id = lodashGet(req, ['user', '_id'], '');


  // --------------------------------------------------
  //   Language & IP & User Agent
  // --------------------------------------------------

  const acceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = lodashGet(req, ['headers', 'user-agent'], '');


  // --------------------------------------------------
  //   Locale
  // --------------------------------------------------

  const localeObj = locale({
    acceptLanguage
  });




  try {


    // --------------------------------------------------
    //   ISO8601
    // --------------------------------------------------

    const ISO8601 = moment().utc().toISOString();


    // --------------------------------------------------
    //   imagesAndVideosArr
    // --------------------------------------------------

    const imagesAndVideosArr = [

      // other - ヒーローイメージが存在しない場合に利用する
      {

        _id: 'CYBV5uEL7',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: '',
        type: 'other',
        images: 1,
        videos: 0,
        arr: [

          {
            _id: 'BrhMB9ieu',
            type: 'image',
            imageType: 'JPEG',
            srcSetArr: [
              {
                _id: 'ymHghwM9n',
                w: '320w',
                width: 320,
                height: 213,
              },
              {
                _id: '4F7FiLqpu',
                w: '480w',
                width: 480,
                height: 320,
              },
              {
                _id: 'WSi6pNd-q',
                w: '640w',
                width: 640,
                height: 426,
              },
              {
                _id: 'Kqe9TUqpm',
                w: '800w',
                width: 800,
                height: 533,
              },
              {
                _id: 'lkXL68rWu',
                w: '1920w',
                width: 1920,
                height: 1278,
              }
            ]
          },

        ]

      },


      {

        _id: 'AHqqHmZuQ',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: '',
        type: 'other',
        images: 1,
        videos: 0,
        arr: [

          {
            _id: '9_2jKiGoU',
            type: 'image',
            imageType: 'JPEG',
            srcSetArr: [
              {
                _id: 'q39NZSD70',
                w: '320w',
                width: 320,
                height: 201,
              },
              {
                _id: '7noDaA3Lg',
                w: '480w',
                width: 480,
                height: 302,
              },
              {
                _id: 'RjwJKXrbc',
                w: '640w',
                width: 640,
                height: 402,
              },
              {
                _id: 'HakFFEAkM',
                w: '800w',
                width: 800,
                height: 503,
              },
              {
                _id: '8w9-XE44q',
                w: '1920w',
                width: 1920,
                height: 1206,
              }
            ]
          },

        ]

      },


      {

        _id: 'iJtSWSHU4',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        users_id: '',
        type: 'other',
        images: 1,
        videos: 0,
        arr: [

          {
            _id: 'S4CQDBdZB',
            type: 'image',
            imageType: 'JPEG',
            srcSetArr: [
              {
                _id: 'q01DxisdG',
                w: '320w',
                width: 320,
                height: 194,
              },
              {
                _id: 'VTaFCqw-n',
                w: '480w',
                width: 480,
                height: 292,
              },
              {
                _id: 'P-bziIrGv',
                w: '640w',
                width: 640,
                height: 389,
              },
              {
                _id: 'XcWv7ezUk',
                w: '800w',
                width: 800,
                height: 486,
              },
              {
                _id: 'lua_hAZbB',
                w: '1920w',
                width: 1920,
                height: 1166,
              }
            ]
          },

        ]

      },

    ];


    // --------------------------------------------------
    //   Json
    // --------------------------------------------------

    const usersDataJsonArr = JSON.parse(fs.readFileSync('import/json/users_data.json', 'utf8'));
    const usersDataDataArr = lodashGet(usersDataJsonArr, [2, 'data'], []);

    const communityJsonArr = JSON.parse(fs.readFileSync('import/json/community.json', 'utf8'));
    const communityDataArr = lodashGet(communityJsonArr, [2, 'data'], []);

    const gameDataJsonArr = JSON.parse(fs.readFileSync('import/json/game_data.json', 'utf8'));
    const gameDataDataArr = lodashGet(gameDataJsonArr, [2, 'data'], []);

    const imageJsonArr = JSON.parse(fs.readFileSync('import/json/image.json', 'utf8'));
    const imageDataArr = lodashGet(imageJsonArr, [2, 'data'], []);

    const bbsThreadUCJsonArr = JSON.parse(fs.readFileSync('import/json/bbs_thread.json', 'utf8'));
    const bbsThreadUCDataArr = lodashGet(bbsThreadUCJsonArr, [2, 'data'], []);

    const bbsThreadGCJsonArr = JSON.parse(fs.readFileSync('import/json/bbs_thread_gc.json', 'utf8'));
    const bbsThreadGCDataArr = lodashGet(bbsThreadGCJsonArr, [2, 'data'], []);

    const bbsCommentUCJsonArr = JSON.parse(fs.readFileSync('import/json/bbs_comment.json', 'utf8'));
    const bbsCommentUCDataArr = lodashGet(bbsCommentUCJsonArr, [2, 'data'], []);

    const bbsCommentGCJsonArr = JSON.parse(fs.readFileSync('import/json/bbs_comment_gc.json', 'utf8'));
    const bbsCommentGCDataArr = lodashGet(bbsCommentGCJsonArr, [2, 'data'], []);

    const bbsReplyUCJsonArr = JSON.parse(fs.readFileSync('import/json/bbs_reply.json', 'utf8'));
    const bbsReplyUCDataArr = lodashGet(bbsReplyUCJsonArr, [2, 'data'], []);

    const bbsReplyGCJsonArr = JSON.parse(fs.readFileSync('import/json/bbs_reply_gc.json', 'utf8'));
    const bbsReplyGCDataArr = lodashGet(bbsReplyGCJsonArr, [2, 'data'], []);

    const recruitmentJsonArr = JSON.parse(fs.readFileSync('import/json/recruitment.json', 'utf8'));
    const recruitmentDataArr = lodashGet(recruitmentJsonArr, [2, 'data'], []);

    const recruitmentReplyJsonArr = JSON.parse(fs.readFileSync('import/json/recruitment_reply.json', 'utf8'));
    const recruitmentReplyDataArr = lodashGet(recruitmentReplyJsonArr, [2, 'data'], []);




    // --------------------------------------------------
    //   ID
    // --------------------------------------------------

    const idsArr = await SchemaTempID.find().exec();
    const idsObj = {};

    for (let valueObj of idsArr.values()) {
      idsObj[valueObj.key] = valueObj.id;
    }


    const idsImageArr = await SchemaTempImageID.find().exec();
    const idsImageObj = {};

    for (let valueObj of idsImageArr.values()) {

      idsImageObj[valueObj.key] = {

        id1: valueObj.id1,
        id2Arr: valueObj.id2Arr,
        idThumbnail1: valueObj.idThumbnail1,
        idThumbnail2: valueObj.idThumbnail2,

      };

    }




    // --------------------------------------------------
    //   users
    // --------------------------------------------------

    for (const [index, valueObj] of usersDataDataArr.entries()) {


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const user_no = lodashGet(valueObj, ['user_no'], 0);

      const users_id = lodashGet(idsObj, [`user_no_${user_no}`], '');
      const idThumbnail1 = lodashGet(idsImageObj, [`user_no_${user_no}`, 'idThumbnail1'], '');
      const idThumbnail2 = lodashGet(idsImageObj, [`user_no_${user_no}`, 'idThumbnail2'], '');


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (users_id && idThumbnail1 && idThumbnail2) {


        // --------------------------------------------------
        //   画像を保存する
        // --------------------------------------------------

        const imagesAndVideosObj = await saveImageAndVideo({

          pass: `import/img-old/user/${user_no}/thumbnail_original.jpg`,
          type: 'ur',
          id1: idThumbnail1,
          id2: idThumbnail2,
          users_id,
          ISO8601,

        });

        if (Object.keys(imagesAndVideosObj).length !== 0) {
          imagesAndVideosArr.push(imagesAndVideosObj);
        }


      }


    }




    // --------------------------------------------------
    //   user-communities
    // --------------------------------------------------

    for (const [index, valueObj] of communityDataArr.entries()) {


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const community_no = parseInt(lodashGet(valueObj, ['community_no'], 0), 10);
      const author_user_no = parseInt(lodashGet(valueObj, ['author_user_no'], 0), 10);

      const users_id = lodashGet(idsObj, [`user_no_${author_user_no}`], '');

      const idThumbnail1 = lodashGet(idsImageObj, [`community_no_${community_no}`, 'idThumbnail1'], '');
      const idThumbnail2 = lodashGet(idsImageObj, [`community_no_${community_no}`, 'idThumbnail2'], '');


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (users_id && idThumbnail1 && idThumbnail2) {


        // --------------------------------------------------
        //   画像を保存する
        // --------------------------------------------------

        const imagesAndVideosObj = await saveImageAndVideo({

          pass: `import/img-old/community/${community_no}/thumbnail_original.jpg`,
          type: 'uc',
          id1: idThumbnail1,
          id2: idThumbnail2,
          users_id,
          ISO8601,

        });

        if (Object.keys(imagesAndVideosObj).length !== 0) {
          imagesAndVideosArr.push(imagesAndVideosObj);
        }


      }


    }




    // --------------------------------------------------
    //   games - thumbnail
    // --------------------------------------------------

    for (const [index, valueObj] of gameDataDataArr.entries()) {


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const game_no = parseInt(lodashGet(valueObj, ['game_no'], 0), 10);

      const idThumbnail1 = lodashGet(idsImageObj, [`game_no_${game_no}`, 'idThumbnail1'], '');
      const idThumbnail2 = lodashGet(idsImageObj, [`game_no_${game_no}`, 'idThumbnail2'], '');


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (idThumbnail1 && idThumbnail2) {


        // --------------------------------------------------
        //   画像を保存する
        // --------------------------------------------------

        const imagesAndVideosObj = await saveImageAndVideo({

          pass: `import/img-old/game/${game_no}/thumbnail.jpg`,
          type: 'gc',
          id1: idThumbnail1,
          id2: idThumbnail2,
          users_id: '',
          ISO8601,

        });

        if (Object.keys(imagesAndVideosObj).length !== 0) {
          imagesAndVideosArr.push(imagesAndVideosObj);
        }


      }


    }




    // --------------------------------------------------
    //   games - heroimage
    // --------------------------------------------------

    const id2Obj = {};
    const tempImagesAndVideosObj = {};

    for (const [index, valueObj] of imageDataArr.entries()) {


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const on_off = lodashGet(valueObj, ['on_off'], '');
      const game_no = parseInt(lodashGet(valueObj, ['game_no'], 0), 10);
      const image_id = lodashGet(valueObj, ['image_id'], '');
      const type = lodashGet(valueObj, ['type'], '');

      const id1 = lodashGet(idsImageObj, [`game_no_${game_no}`, 'id1'], '');
      const id2Arr = lodashGet(idsImageObj, [`game_no_${game_no}`, 'id2Arr'], []);

      if (id2Obj[game_no] !== undefined) {

        id2Obj[game_no] += 1;

      } else {

        id2Obj[game_no] = 0;

      }

      const id2 = id2Arr[id2Obj[game_no]];

      // console.log(chalk`
      //   game_no: {green ${game_no}}
      //   image_id: {green ${image_id}}
      //   id1: {green ${id1}}
      //   id2: {green ${id2}}
      //   id2Obj[game_no]: {green ${id2Obj[game_no]}}
      // `);

      // console.log(`
      //   ----- idsImageObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(lodashGet(idsImageObj, [`game_no_${game_no}`], []))), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);

      // console.log(`
      //   ----- id2Arr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(id2Arr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      // game_no = 6 image_id = mf29yqvx4wc1dvsv 削除済みで画像が存在していない
      if (on_off === '1' && type === 'hero_game' && id1 && id2) {


        // --------------------------------------------------
        //   画像を保存する
        // --------------------------------------------------

        // if (image_id !== 'mf29yqvx4wc1dvsv') {// なぜかこのIDの画像が存在していない

          tempImagesAndVideosObj[game_no] = await saveImageAndVideo({

            pass: `import/img-old/u/${image_id}.jpg`,
            type: 'gc',
            id1,
            id2,
            users_id: '',
            ISO8601,
            heroImage: true,
            imagesAndVideosObj: tempImagesAndVideosObj[game_no],

          });


        // }

      }


    }


    for (let valueObj of Object.values(tempImagesAndVideosObj)) {
      imagesAndVideosArr.push(valueObj);
    }


    // console.log(`
    //   ----- tempImagesAndVideosObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(tempImagesAndVideosObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);




    // --------------------------------------------------
    //   forum-threads UC
    // --------------------------------------------------

    for (const [index, valueObj] of bbsThreadUCDataArr.entries()) {


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const bbs_thread_no = parseInt(lodashGet(valueObj, ['bbs_thread_no'], 0), 10);
      const community_no = lodashGet(valueObj, ['community_no'], '');

      if (idsObj[`bbs_thread_no_uc_${bbs_thread_no}`] === undefined || idsObj[`community_no_${community_no}`] === undefined) {
        continue;
      }


      const user_no = lodashGet(valueObj, ['user_no'], 0);
      const users_id = lodashGet(idsObj, [`user_no_${user_no}`], '');
      const image = lodashGet(valueObj, ['image'], '');
      const movie = lodashGet(valueObj, ['movie'], '');

      const id1 = lodashGet(idsImageObj, [`bbs_thread_no_uc_${bbs_thread_no}`, 'id1'], '');
      const id2 = lodashGet(idsImageObj, [`bbs_thread_no_uc_${bbs_thread_no}`, 'id2Arr', 0], '');


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (id1 && id2) {


        let imagesAndVideosObj = {};


        // --------------------------------------------------
        //   画像を保存する
        // --------------------------------------------------

        if (image) {

          imagesAndVideosObj = await saveImageAndVideo({

            pass: `import/img-old/bbs_uc/thread/${bbs_thread_no}/image_1.jpg`,
            type: 'forum',
            id1,
            id2,
            users_id,
            ISO8601,

          });


        // --------------------------------------------------
        //   動画
        // --------------------------------------------------

        } else if (movie && movie.indexOf('a:1:{i:0;a:1:{s:7:\"youtube\";s:11:\"') !== -1) {

          let videoIDArr = movie.split('a:1:{i:0;a:1:{s:7:\"youtube\";s:11:\"');
          videoIDArr = videoIDArr[1].split('";}}');
          const videoID = videoIDArr[0];

          // console.log(`
          //   ----- videoIDArr -----\n
          //   ${util.inspect(JSON.parse(JSON.stringify(videoIDArr)), { colors: true, depth: null })}\n
          //   --------------------\n
          // `);

          // console.log(chalk`
          //   videoID: {green ${videoID}}
          // `);

          imagesAndVideosObj = {

            _id: id1,
            createdDate: ISO8601,
            updatedDate: ISO8601,
            users_id,
            type: 'forum',
            images: 0,
            videos: 1,
            arr: [
              {
                _id: id2,
                type: 'video',
                videoChannel: 'youtube',
                videoID,
              },
            ],

          };

        }


        if (Object.keys(imagesAndVideosObj).length !== 0) {
          imagesAndVideosArr.push(imagesAndVideosObj);
        }


      }


    }




    // --------------------------------------------------
    //   forum-threads GC
    // --------------------------------------------------

    for (const [index, valueObj] of bbsThreadGCDataArr.entries()) {


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const bbs_thread_no = parseInt(lodashGet(valueObj, ['bbs_thread_no'], 0), 10);
      const game_no = lodashGet(valueObj, ['game_no'], '');

      if (idsObj[`bbs_thread_no_gc_${bbs_thread_no}`] === undefined || idsObj[`game_no_${game_no}`] === undefined) {
        continue;
      }


      const image = lodashGet(valueObj, ['image'], '');
      const movie = lodashGet(valueObj, ['movie'], '');

      const id1 = lodashGet(idsImageObj, [`bbs_thread_no_gc_${bbs_thread_no}`, 'id1'], '');
      const id2 = lodashGet(idsImageObj, [`bbs_thread_no_gc_${bbs_thread_no}`, 'id2Arr', 0], '');


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (id1 && id2) {


        let imagesAndVideosObj = {};

          // console.log(chalk`
          //   bbs_thread_no: {green ${bbs_thread_no}}
          //   game_no: {green ${game_no}}
          // `);
        // --------------------------------------------------
        //   画像を保存する
        // --------------------------------------------------

        if (image) {

          imagesAndVideosObj = await saveImageAndVideo({

            pass: `import/img-old/bbs_gc/thread/${bbs_thread_no}/image_1.jpg`,
            type: 'forum',
            id1,
            id2,
            users_id: '',
            ISO8601,

          });


        // --------------------------------------------------
        //   動画
        // --------------------------------------------------

        } else if (movie && movie.indexOf('a:1:{i:0;a:1:{s:7:\"youtube\";s:11:\"') !== -1) {

          let videoIDArr = movie.split('a:1:{i:0;a:1:{s:7:\"youtube\";s:11:\"');
          videoIDArr = videoIDArr[1].split('";}}');
          const videoID = videoIDArr[0];

          imagesAndVideosObj = {

            _id: id1,
            createdDate: ISO8601,
            updatedDate: ISO8601,
            users_id: '',
            type: 'forum',
            images: 0,
            videos: 1,
            arr: [
              {
                _id: id2,
                type: 'video',
                videoChannel: 'youtube',
                videoID,
              },
            ],

          };

        }


        if (Object.keys(imagesAndVideosObj).length !== 0) {
          imagesAndVideosArr.push(imagesAndVideosObj);
        }


      }


    }




    // --------------------------------------------------
    //   forum-comments UC
    // --------------------------------------------------

    for (const [index, valueObj] of bbsCommentUCDataArr.entries()) {


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const bbs_thread_no = parseInt(lodashGet(valueObj, ['bbs_thread_no'], 0), 10);
      const bbs_comment_no = parseInt(lodashGet(valueObj, ['bbs_comment_no'], 0), 10);
      const community_no = lodashGet(valueObj, ['community_no'], '');

      if (idsObj[`bbs_thread_no_uc_${bbs_thread_no}`] === undefined || idsObj[`bbs_comment_no_uc_${bbs_comment_no}`] === undefined || idsObj[`community_no_${community_no}`] === undefined) {
        continue;
      }


      const user_no = lodashGet(valueObj, ['user_no'], 0);
      const users_id = lodashGet(idsObj, [`user_no_${user_no}`], '');
      const image = lodashGet(valueObj, ['image'], '');
      const movie = lodashGet(valueObj, ['movie'], '');

      const id1 = lodashGet(idsImageObj, [`bbs_comment_no_uc_${bbs_comment_no}`, 'id1'], '');
      const id2 = lodashGet(idsImageObj, [`bbs_comment_no_uc_${bbs_comment_no}`, 'id2Arr', 0], '');


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (id1 && id2) {


        let imagesAndVideosObj = {};


        // --------------------------------------------------
        //   画像を保存する
        // --------------------------------------------------

        if (image) {

          imagesAndVideosObj = await saveImageAndVideo({

            pass: `import/img-old/bbs_uc/comment/${bbs_comment_no}/image_1.jpg`,
            type: 'forum',
            id1,
            id2,
            users_id,
            ISO8601,

          });


        // --------------------------------------------------
        //   動画
        // --------------------------------------------------

        } else if (movie && movie.indexOf('a:1:{i:0;a:1:{s:7:\"youtube\";s:11:\"') !== -1) {

          // console.log(chalk`
          // movie: {green ${movie}}
          // `);

          let videoIDArr = movie.split('a:1:{i:0;a:1:{s:7:\"youtube\";s:11:\"');
          videoIDArr = videoIDArr[1].split('";}}');
          const videoID = videoIDArr[0];

          // console.log(`
          //   ----- videoIDArr -----\n
          //   ${util.inspect(JSON.parse(JSON.stringify(videoIDArr)), { colors: true, depth: null })}\n
          //   --------------------\n
          // `);

          // console.log(`
          //   ----- videoIDArr -----\n
          //   ${util.inspect(JSON.parse(JSON.stringify(videoIDArr)), { colors: true, depth: null })}\n
          //   --------------------\n
          // `);

          // console.log(chalk`
          //   videoID: {green ${videoID}}
          // `);


          imagesAndVideosObj = {

            _id: id1,
            createdDate: ISO8601,
            updatedDate: ISO8601,
            users_id,
            type: 'forum',
            images: 0,
            videos: 1,
            arr: [
              {
                _id: id2,
                type: 'video',
                videoChannel: 'youtube',
                videoID,
              },
            ],

          };


        }


        if (Object.keys(imagesAndVideosObj).length !== 0) {
          imagesAndVideosArr.push(imagesAndVideosObj);
        }


      }


    }




    // --------------------------------------------------
    //   forum-comments GC
    // --------------------------------------------------

    for (const [index, valueObj] of bbsCommentGCDataArr.entries()) {


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const bbs_thread_no = parseInt(lodashGet(valueObj, ['bbs_thread_no'], 0), 10);
      const bbs_comment_no = parseInt(lodashGet(valueObj, ['bbs_comment_no'], 0), 10);
      const game_no = lodashGet(valueObj, ['game_no'], '');

      if (idsObj[`bbs_thread_no_gc_${bbs_thread_no}`] === undefined || idsObj[`bbs_comment_no_gc_${bbs_comment_no}`] === undefined || idsObj[`game_no_${game_no}`] === undefined) {
        continue;
      }


      const user_no = lodashGet(valueObj, ['user_no'], 0);
      const users_id = lodashGet(idsObj, [`user_no_${user_no}`], '');
      const image = lodashGet(valueObj, ['image'], '');
      const movie = lodashGet(valueObj, ['movie'], '');

      const id1 = lodashGet(idsImageObj, [`bbs_comment_no_gc_${bbs_comment_no}`, 'id1'], '');
      const id2 = lodashGet(idsImageObj, [`bbs_comment_no_gc_${bbs_comment_no}`, 'id2Arr', 0], '');


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (id1 && id2) {


        let imagesAndVideosObj = {};


        // --------------------------------------------------
        //   画像を保存する
        // --------------------------------------------------

        if (image) {

          imagesAndVideosObj = await saveImageAndVideo({

            pass: `import/img-old/bbs_gc/comment/${bbs_comment_no}/image_1.jpg`,
            type: 'forum',
            id1,
            id2,
            users_id,
            ISO8601,

          });


        // --------------------------------------------------
        //   動画
        // --------------------------------------------------

        } else if (movie && movie.indexOf('a:1:{i:0;a:1:{s:7:\"youtube\";s:11:\"') !== -1) {

          let videoIDArr = movie.split('a:1:{i:0;a:1:{s:7:\"youtube\";s:11:\"');
          videoIDArr = videoIDArr[1].split('";}}');
          const videoID = videoIDArr[0];

          imagesAndVideosObj = {

            _id: id1,
            createdDate: ISO8601,
            updatedDate: ISO8601,
            users_id,
            type: 'forum',
            images: 0,
            videos: 1,
            arr: [
              {
                _id: id2,
                type: 'video',
                videoChannel: 'youtube',
                videoID,
              },
            ],

          };

        }


        if (Object.keys(imagesAndVideosObj).length !== 0) {
          imagesAndVideosArr.push(imagesAndVideosObj);
        }


      }


    }




    // --------------------------------------------------
    //   forum-replys UC
    // --------------------------------------------------

    for (const [index, valueObj] of bbsReplyUCDataArr.entries()) {


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const bbs_thread_no = parseInt(lodashGet(valueObj, ['bbs_thread_no'], 0), 10);
      const bbs_comment_no = parseInt(lodashGet(valueObj, ['bbs_comment_no'], 0), 10);
      const bbs_reply_no = parseInt(lodashGet(valueObj, ['bbs_reply_no'], 0), 10);
      const community_no = lodashGet(valueObj, ['community_no'], '');

      if (idsObj[`bbs_thread_no_uc_${bbs_thread_no}`] === undefined || idsObj[`bbs_comment_no_uc_${bbs_comment_no}`] === undefined || idsObj[`bbs_reply_no_uc_${bbs_reply_no}`] === undefined || idsObj[`community_no_${community_no}`] === undefined) {
        continue;
      }


      const user_no = lodashGet(valueObj, ['user_no'], 0);
      const users_id = lodashGet(idsObj, [`user_no_${user_no}`], '');
      const image = lodashGet(valueObj, ['image'], '');
      const movie = lodashGet(valueObj, ['movie'], '');

      const id1 = lodashGet(idsImageObj, [`bbs_reply_no_uc_${bbs_reply_no}`, 'id1'], '');
      const id2 = lodashGet(idsImageObj, [`bbs_reply_no_uc_${bbs_reply_no}`, 'id2Arr', 0], '');


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (id1 && id2) {


        let imagesAndVideosObj = {};


        // --------------------------------------------------
        //   画像を保存する
        // --------------------------------------------------

        if (image) {

          imagesAndVideosObj = await saveImageAndVideo({

            pass: `import/img-old/bbs_uc/reply/${bbs_reply_no}/image_1.jpg`,
            type: 'forum',
            id1,
            id2,
            users_id,
            ISO8601,

          });


        // --------------------------------------------------
        //   動画
        // --------------------------------------------------

        } else if (movie && movie.indexOf('a:1:{i:0;a:1:{s:7:\"youtube\";s:11:\"') !== -1) {


          let videoIDArr = movie.split('a:1:{i:0;a:1:{s:7:\"youtube\";s:11:\"');
          videoIDArr = videoIDArr[1].split('";}}');
          const videoID = videoIDArr[0];


          imagesAndVideosObj = {

            _id: id1,
            createdDate: ISO8601,
            updatedDate: ISO8601,
            users_id,
            type: 'forum',
            images: 0,
            videos: 1,
            arr: [
              {
                _id: id2,
                type: 'video',
                videoChannel: 'youtube',
                videoID,
              },
            ],

          };


        }


        if (Object.keys(imagesAndVideosObj).length !== 0) {
          imagesAndVideosArr.push(imagesAndVideosObj);
        }


      }


    }




    // --------------------------------------------------
    //   forum-replys GC
    // --------------------------------------------------

    for (const [index, valueObj] of bbsReplyGCDataArr.entries()) {


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const bbs_thread_no = parseInt(lodashGet(valueObj, ['bbs_thread_no'], 0), 10);
      const bbs_comment_no = parseInt(lodashGet(valueObj, ['bbs_comment_no'], 0), 10);
      const bbs_reply_no = parseInt(lodashGet(valueObj, ['bbs_reply_no'], 0), 10);
      const game_no = lodashGet(valueObj, ['game_no'], '');

      if (idsObj[`bbs_thread_no_gc_${bbs_thread_no}`] === undefined || idsObj[`bbs_comment_no_gc_${bbs_comment_no}`] === undefined || idsObj[`bbs_reply_no_gc_${bbs_reply_no}`] === undefined || idsObj[`game_no_${game_no}`] === undefined) {
        continue;
      }


      const user_no = lodashGet(valueObj, ['user_no'], 0);
      const users_id = lodashGet(idsObj, [`user_no_${user_no}`], '');
      const image = lodashGet(valueObj, ['image'], '');
      const movie = lodashGet(valueObj, ['movie'], '');

      const id1 = lodashGet(idsImageObj, [`bbs_reply_no_gc_${bbs_reply_no}`, 'id1'], '');
      const id2 = lodashGet(idsImageObj, [`bbs_reply_no_gc_${bbs_reply_no}`, 'id2Arr', 0], '');


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (id1 && id2) {


        let imagesAndVideosObj = {};


        // --------------------------------------------------
        //   画像を保存する
        // --------------------------------------------------

        if (image) {

          imagesAndVideosObj = await saveImageAndVideo({

            pass: `import/img-old/bbs_gc/reply/${bbs_reply_no}/image_1.jpg`,
            type: 'forum',
            id1,
            id2,
            users_id,
            ISO8601,

          });


        // --------------------------------------------------
        //   動画
        // --------------------------------------------------

        } else if (movie && movie.indexOf('a:1:{i:0;a:1:{s:7:\"youtube\";s:11:\"') !== -1) {

          let videoIDArr = movie.split('a:1:{i:0;a:1:{s:7:\"youtube\";s:11:\"');
          videoIDArr = videoIDArr[1].split('";}}');
          const videoID = videoIDArr[0];

          imagesAndVideosObj = {

            _id: id1,
            createdDate: ISO8601,
            updatedDate: ISO8601,
            users_id,
            type: 'forum',
            images: 0,
            videos: 1,
            arr: [
              {
                _id: id2,
                type: 'video',
                videoChannel: 'youtube',
                videoID,
              },
            ],

          };

        }


        if (Object.keys(imagesAndVideosObj).length !== 0) {
          imagesAndVideosArr.push(imagesAndVideosObj);
        }


      }


    }




    // --------------------------------------------------
    //   recruitment-threads
    // --------------------------------------------------

    for (const [index, valueObj] of recruitmentDataArr.entries()) {


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const recruitment_id = lodashGet(valueObj, ['recruitment_id'], '');
      const game_no = lodashGet(valueObj, ['game_no'], '');

      if (

        idsObj[`recruitment_id_${recruitment_id}`] === undefined ||
        idsObj[`game_no_${game_no}`] === undefined

      ) {
        continue;
      }


      const user_no = lodashGet(valueObj, ['user_no'], 0);
      const users_id = lodashGet(idsObj, [`user_no_${user_no}`], '');
      const image = lodashGet(valueObj, ['image'], '');
      const movie = lodashGet(valueObj, ['movie'], '');

      const id1 = lodashGet(idsImageObj, [`recruitment_id_${recruitment_id}`, 'id1'], '');
      const id2 = lodashGet(idsImageObj, [`recruitment_id_${recruitment_id}`, 'id2Arr', 0], '');


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (id1 && id2) {


        let imagesAndVideosObj = {};


        // --------------------------------------------------
        //   画像を保存する
        // --------------------------------------------------

        if (image) {

          imagesAndVideosObj = await saveImageAndVideo({

            pass: `import/img-old/recruitment/recruitment/${recruitment_id}/image_1.jpg`,
            type: 'recruitment',
            id1,
            id2,
            users_id,
            ISO8601,

          });


        // --------------------------------------------------
        //   動画
        // --------------------------------------------------

        } else if (movie && movie.indexOf('a:1:{i:0;a:1:{s:7:\"youtube\";s:11:\"') !== -1) {

          let videoIDArr = movie.split('a:1:{i:0;a:1:{s:7:\"youtube\";s:11:\"');
          videoIDArr = videoIDArr[1].split('";}}');
          const videoID = videoIDArr[0];

          imagesAndVideosObj = {

            _id: id1,
            createdDate: ISO8601,
            updatedDate: ISO8601,
            users_id,
            type: 'recruitment',
            images: 0,
            videos: 1,
            arr: [
              {
                _id: id2,
                type: 'video',
                videoChannel: 'youtube',
                videoID,
              },
            ],

          };

        }


        if (Object.keys(imagesAndVideosObj).length !== 0) {
          imagesAndVideosArr.push(imagesAndVideosObj);
        }


      }


    }




    // --------------------------------------------------
    //   recruitment-comments
    // --------------------------------------------------

    for (const [index, valueObj] of recruitmentReplyDataArr.entries()) {


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const recruitment_id = lodashGet(valueObj, ['recruitment_id'], '');
      const recruitment_reply_id = lodashGet(valueObj, ['recruitment_reply_id'], '');
      const game_no = lodashGet(valueObj, ['game_no'], '');

      if (

        idsObj[`recruitment_id_${recruitment_id}`] === undefined ||
        idsObj[`recruitment_reply_id_${recruitment_reply_id}`] === undefined ||
        idsObj[`game_no_${game_no}`] === undefined

      ) {
        continue;
      }


      const user_no = lodashGet(valueObj, ['user_no'], 0);
      const users_id = lodashGet(idsObj, [`user_no_${user_no}`], '');
      const image = lodashGet(valueObj, ['image'], '');
      const movie = lodashGet(valueObj, ['movie'], '');

      const id1 = lodashGet(idsImageObj, [`recruitment_reply_id_${recruitment_reply_id}`, 'id1'], '');
      const id2 = lodashGet(idsImageObj, [`recruitment_reply_id_${recruitment_reply_id}`, 'id2Arr', 0], '');


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (id1 && id2) {


        let imagesAndVideosObj = {};


        // --------------------------------------------------
        //   画像を保存する
        // --------------------------------------------------

        if (image) {

          imagesAndVideosObj = await saveImageAndVideo({

            pass: `import/img-old/recruitment/reply/${recruitment_reply_id}/image_1.jpg`,
            type: 'recruitment',
            id1,
            id2,
            users_id,
            ISO8601,

          });


        // --------------------------------------------------
        //   動画
        // --------------------------------------------------

        } else if (movie && movie.indexOf('a:1:{i:0;a:1:{s:7:\"youtube\";s:11:\"') !== -1) {

          let videoIDArr = movie.split('a:1:{i:0;a:1:{s:7:\"youtube\";s:11:\"');
          videoIDArr = videoIDArr[1].split('";}}');
          const videoID = videoIDArr[0];

          imagesAndVideosObj = {

            _id: id1,
            createdDate: ISO8601,
            updatedDate: ISO8601,
            users_id,
            type: 'recruitment',
            images: 0,
            videos: 1,
            arr: [
              {
                _id: id2,
                type: 'video',
                videoChannel: 'youtube',
                videoID,
              },
            ],

          };

        }


        if (Object.keys(imagesAndVideosObj).length !== 0) {
          imagesAndVideosArr.push(imagesAndVideosObj);
        }


      }


    }




    // ---------------------------------------------
    //   Insert
    // ---------------------------------------------

    await SchemaImagesAndVideos.deleteMany({});
    await SchemaImagesAndVideos.insertMany(imagesAndVideosArr);





    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    console.log(`
      ----------------------------------------\n
      pages/api/v2/common/import-json.js
    `);

    console.log(`
      ----- imagesAndVideosArr -----\n
      ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosArr)), { colors: true, depth: null })}\n
      --------------------\n
    `);




    // ---------------------------------------------
    //   Success
    // ---------------------------------------------

    return res.status(200).json(returnObj);


  } catch (errorObj) {


    // ---------------------------------------------
    //   Log
    // ---------------------------------------------

    const resultErrorObj = returnErrorsArr({

      errorObj,
      endpointID: 'lXllGsGQd',
      users_id: loginUsers_id,
      ip,
      userAgent,
      requestParametersObj,

    });


    // --------------------------------------------------
    //   Return JSON Object / Error
    // --------------------------------------------------

    return res.status(statusCode).json(resultErrorObj);


  }


};
