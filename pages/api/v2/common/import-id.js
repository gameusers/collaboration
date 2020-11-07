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


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { returnErrorsArr } from 'app/@modules/log/log.js';


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


    // 登録しなければならないデータ
    // 参加ユーザーコミュニティ
    // experiencesArr


    // --------------------------------------------------
    //   ISO8601
    // --------------------------------------------------

    const ISO8601 = moment().utc().toISOString();


    // --------------------------------------------------
    //   Json
    // --------------------------------------------------

    const usersDataJsonArr = JSON.parse(fs.readFileSync('import/json/users_data.json', 'utf8'));
    const usersDataDataArr = lodashGet(usersDataJsonArr, [2, 'data'], []);

    const communityJsonArr = JSON.parse(fs.readFileSync('import/json/community.json', 'utf8'));
    const communityDataArr = lodashGet(communityJsonArr, [2, 'data'], []);



    // --------------------------------------------------
    //   users
    // --------------------------------------------------

    const saveArr = [];


    for (const [index, valueObj] of usersDataDataArr.entries()) {


      // --------------------------------------------------
      //   users_data
      // --------------------------------------------------

      const user_no = lodashGet(valueObj, ['user_no'], 0);
      const on_off = lodashGet(valueObj, ['on_off'], '0');
      const access_date = lodashGet(valueObj, ['access_date'], '');


      // --------------------------------------------------
      //   Datetime
      // --------------------------------------------------

      const datetimeAccess = moment(access_date);
      const datetimeLimit = moment('2017-01-01T00:00:00.000Z');


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (on_off === '1' && datetimeAccess.isAfter(datetimeLimit)) {

        saveArr.push(

          {
            _id: shortid.generate(),
            key: `user_no_${user_no}`,
          }

        );

      }


    }


    //

    // console.log(chalk`
    //   usersArr.length: {green ${usersArr.length}}
    // `);




    // --------------------------------------------------
    //   user-communities
    // --------------------------------------------------

    const bansUCArr = [9, 10, 12];

    for (const [index, valueObj] of communityDataArr.entries()) {


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const community_no = parseInt(lodashGet(valueObj, ['community_no'], 0), 10);
      const on_off = lodashGet(valueObj, ['on_off'], '0');


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (on_off === '1' && !bansUCArr.includes(community_no)) {
        // console.log(community_no);
        saveArr.push(

          {
            _id: shortid.generate(),
            key: `community_no_${community_no}`,
          }

        );

      }


    }




    // ---------------------------------------------
    //   Insert
    // ---------------------------------------------

    await SchemaTempID.deleteMany({});
    await SchemaTempID.insertMany(saveArr);




    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    console.log(`
      ----------------------------------------\n
      pages/api/v2/common/import-json.js
    `);

    console.log(`
      ----- saveArr -----\n
      ${util.inspect(JSON.parse(JSON.stringify(saveArr)), { colors: true, depth: null })}\n
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
