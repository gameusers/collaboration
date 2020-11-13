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
import shortid from 'shortid';
import bcrypt from 'bcryptjs';
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

import { initialProps } from 'app/@api/v2/common.js';






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

    const imagesAndVideosArr = [];


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

      if (type === 'hero_game' && id1 && id2) {


        // --------------------------------------------------
        //   画像を保存する
        // --------------------------------------------------

        if (image_id !== 'mf29yqvx4wc1dvsv') {// なぜかこのIDの画像が存在していない

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


        }

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




    // ---------------------------------------------
    //   Insert
    // ---------------------------------------------

    // await SchemaImagesAndVideos.deleteMany({});
    await SchemaImagesAndVideos.insertMany(imagesAndVideosArr);





    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    console.log(`
      ----------------------------------------\n
      pages/api/v2/common/import-json.js
    `);

    // console.log(`
    //   ----- saveArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(saveArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    console.log(`
      ----- imagesAndVideosArr -----\n
      ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideosArr)), { colors: true, depth: null })}\n
      --------------------\n
    `);

    // console.log(`
    //   ----- userCommunitiesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(userCommunitiesArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);




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
