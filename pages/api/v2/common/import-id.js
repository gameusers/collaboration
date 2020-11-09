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

    const dataDeveloperJsonArr = JSON.parse(fs.readFileSync('import/json/data_developer.json', 'utf8'));
    const dataDeveloperDataArr = lodashGet(dataDeveloperJsonArr, [2, 'data'], []);

    const gameDataJsonArr = JSON.parse(fs.readFileSync('import/json/game_data.json', 'utf8'));
    const gameDataDataArr = lodashGet(gameDataJsonArr, [2, 'data'], []);




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
            id: shortid.generate(),
            key: `user_no_${user_no}`,
          }

        );

      }


    }




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
            id: shortid.generate(),
            key: `community_no_${community_no}`,
          }

        );

      }


    }




    // --------------------------------------------------
    //   developers-publishers
    // --------------------------------------------------

    let idNo2 = '';

    for (const [index, valueObj] of dataDeveloperDataArr.entries()) {


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const developer_no = parseInt(lodashGet(valueObj, ['developer_no'], 0), 10);
      let id = shortid.generate();

      if (developer_no === 2) {
        idNo2 = id;
      } else if (developer_no === 18) {
        id = idNo2;
      }


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      saveArr.push(

        {
          _id: shortid.generate(),
          id,
          key: `developer_no_${developer_no}`,
        }

      );


    }




    // --------------------------------------------------
    //   hardware
    // --------------------------------------------------

    saveArr.push(

      {
        _id: shortid.generate(),
        id: 'zB4ivcsqM',
        key: 'hardware_no_1',
      },
      {
        _id: shortid.generate(),
        id: 'uPqoiXA_8',
        key: 'hardware_no_2',
      },
      {
        _id: shortid.generate(),
        id: 'GTxWVd0z-',
        key: 'hardware_no_3',
      },
      {
        _id: shortid.generate(),
        id: 'qk9DiUwN-',
        key: 'hardware_no_4',
      },
      {
        _id: shortid.generate(),
        id: 'mOpBZsQBm',
        key: 'hardware_no_5',
      },
      {
        _id: shortid.generate(),
        id: 'efIOgWs3N',
        key: 'hardware_no_6',
      },
      {
        _id: shortid.generate(),
        id: 'YNZ6nb1Ki',
        key: 'hardware_no_7',
      },
      {
        _id: shortid.generate(),
        id: '08Qp5KxPA',
        key: 'hardware_no_8',
      },
      {
        _id: shortid.generate(),
        id: '78lc0hPjL',
        key: 'hardware_no_9',
      },
      {
        _id: shortid.generate(),
        id: 'P0UG-LHOQ',
        key: 'hardware_no_10',
      },
      {
        _id: shortid.generate(),
        id: 'HATpnt7sl',
        key: 'hardware_no_11',
      },
      {
        _id: shortid.generate(),
        id: 'XLUt628gr',
        key: 'hardware_no_12',
      },
      {
        _id: shortid.generate(),
        id: 'AIvzEgDCd',
        key: 'hardware_no_13',
      },
      {
        _id: shortid.generate(),
        id: '8RERfeQQ9',
        key: 'hardware_no_14',
      },
      {
        _id: shortid.generate(),
        id: 'PYIE0rv_e',
        key: 'hardware_no_15',
      },
      {
        _id: shortid.generate(),
        id: 'Kj_Djheqt',
        key: 'hardware_no_16',
      },
      {
        _id: shortid.generate(),
        id: 'u3SQqtJ-u',
        key: 'hardware_no_17',
      },
      {
        _id: shortid.generate(),
        id: '45syCFviA',
        key: 'hardware_no_18',
      },
      {
        _id: shortid.generate(),
        id: 'o9bdsq5af',
        key: 'hardware_no_19',
      },
      {
        _id: shortid.generate(),
        id: 'zB4ivcsqM',
        key: 'hardware_no_20',
      },
      {
        _id: shortid.generate(),
        id: 'lBSGQeGmx',
        key: 'hardware_no_21',
      },
      {
        _id: shortid.generate(),
        id: 'ehBtuyjma',
        key: 'hardware_no_22',
      },
      {
        _id: shortid.generate(),
        id: 'si2_UYLdW',
        key: 'hardware_no_23',
      },
      {
        _id: shortid.generate(),
        id: 'Z4R-SPN2-',
        key: 'hardware_no_24',
      },
      {
        _id: shortid.generate(),
        id: 'eKmDxi8lX',
        key: 'hardware_no_25',
      },
      {
        _id: shortid.generate(),
        id: 'sO2U2PzHl',
        key: 'hardware_no_26',
      },
      {
        _id: shortid.generate(),
        id: 'XBKalRRW7',
        key: 'hardware_no_27',
      },
      {
        _id: shortid.generate(),
        id: '2yKF4qXAw',
        key: 'hardware_no_28',
      },
      {
        _id: shortid.generate(),
        id: 'KyOSlwcLk',
        key: 'hardware_no_29',
      },
      {
        _id: shortid.generate(),
        id: 'I-iu-WmkO',
        key: 'hardware_no_30',
      },
      {
        _id: shortid.generate(),
        id: 'Zd_Ia4Hwm',
        key: 'hardware_no_31',
      },
      {
        _id: shortid.generate(),
        id: 'VFLNnniHr',
        key: 'hardware_no_32',
      },
      {
        _id: shortid.generate(),
        id: 'o-f3Zxd49',
        key: 'hardware_no_33',
      },
      {
        _id: shortid.generate(),
        id: 'SXybALV1f',
        key: 'hardware_no_34',
      },

    );




    // --------------------------------------------------
    //   game-genres
    // --------------------------------------------------

    saveArr.push(

      {
        _id: shortid.generate(),
        id: 'YC3gSkK67',
        key: 'genre_no_1',
      },
      {
        _id: shortid.generate(),
        id: 'sU94RUPS7',
        key: 'genre_no_2',
      },
      {
        _id: shortid.generate(),
        id: 'NCt2Bb7WF',
        key: 'genre_no_3',
      },
      {
        _id: shortid.generate(),
        id: 'CoIMeJDxB',
        key: 'genre_no_4',
      },
      {
        _id: shortid.generate(),
        id: '-HKDHuR2v',
        key: 'genre_no_5',
      },
      {
        _id: shortid.generate(),
        id: 'aiB1RZ0f8',
        key: 'genre_no_6',
      },
      {
        _id: shortid.generate(),
        id: 'n2k7J_e12',
        key: 'genre_no_7',
      },
      {
        _id: shortid.generate(),
        id: 'SV1mg4iuD',
        key: 'genre_no_8',
      },
      {
        _id: shortid.generate(),
        id: 'HBpRRumc3',
        key: 'genre_no_9',
      },
      {
        _id: shortid.generate(),
        id: '691Od0Wty',
        key: 'genre_no_10',
      },
      {
        _id: shortid.generate(),
        id: 'rsx6C2bsy',
        key: 'genre_no_11',
      },
      {
        _id: shortid.generate(),
        id: 'lDdVW5ANX',
        key: 'genre_no_12',
      },
      {
        _id: shortid.generate(),
        id: 'jpPfXudBt',
        key: 'genre_no_13',
      },
      {
        _id: shortid.generate(),
        id: 'nFkN4IiIy',
        key: 'genre_no_14',
      },
      {
        _id: shortid.generate(),
        id: '-HKDHuR2v',
        key: 'genre_no_15',
      },
      {
        _id: shortid.generate(),
        id: '691Od0Wty',
        key: 'genre_no_16',
      },
      {
        _id: shortid.generate(),
        id: 'HBpRRumc3',
        key: 'genre_no_17',
      },
      {
        _id: shortid.generate(),
        id: 'HBpRRumc3',
        key: 'genre_no_18',
      },
      {
        _id: shortid.generate(),
        id: '691Od0Wty',
        key: 'genre_no_19',
      },

    );




    // --------------------------------------------------
    //   games
    // --------------------------------------------------

    for (const [index, valueObj] of gameDataDataArr.entries()) {


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const game_no = parseInt(lodashGet(valueObj, ['game_no'], 0), 10);
      const on_off = lodashGet(valueObj, ['on_off'], '0');


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (on_off === '1') {

        saveArr.push(

          {
            _id: shortid.generate(),
            id: shortid.generate(),
            key: `game_no_${game_no}`,
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
