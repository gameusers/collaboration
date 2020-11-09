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

import SchemaUsers from 'app/@database/users/schema';
import SchemaExperiences from 'app/@database/experiences/schema';
import SchemaAchievements from 'app/@database/achievements/schema';
import SchemaTitles from 'app/@database/titles/schema';
import SchemaGames from 'app/@database/games/schema';
import SchemaGamesTemps from 'app/@database/games-temps/schema';
import SchemaIDs from 'app/@database/ids/schema';
import SchemaCardPlayers from 'app/@database/card-players/schema';
import SchemaGameGenres from 'app/@database/game-genres/schema';
import SchemaHardwares from 'app/@database/hardwares/schema';
import SchemaDevelopersPublishers from 'app/@database/developers-publishers/schema';
import SchemaEmailConfirmations from 'app/@database/email-confirmations/schema';
import SchemaImagesAndVideos from 'app/@database/images-and-videos/schema';
import SchemaGameCommunities from 'app/@database/game-communities/schema';
import SchemaUserCommunities from 'app/@database/user-communities/schema';
import SchemaForumThreads from 'app/@database/forum-threads/schema';
import SchemaForumComments from 'app/@database/forum-comments/schema';
import SchemaRecruitmentThreads from 'app/@database/recruitment-threads/schema';
import SchemaRecruitmentComments from 'app/@database/recruitment-comments/schema';
import SchemaRecruitmentReplies from 'app/@database/recruitment-replies/schema';
import SchemaFollows from 'app/@database/follows/schema';
import SchemaGoods from 'app/@database/goods/schema';
import SchemaNotifications from 'app/@database/notifications/schema';
import SchemaWebPushes from 'app/@database/web-pushes/schema';

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
    // 画像
    // userCommunitiesArr gameCommunities_idsArr
    // forumObj: { threadCount: 0 }


    // --------------------------------------------------
    //   ISO8601
    // --------------------------------------------------

    const ISO8601 = moment().utc().toISOString();




    // --------------------------------------------------
    //   Json
    // --------------------------------------------------

    const usersDataJsonArr = JSON.parse(fs.readFileSync('import/json/users_data.json', 'utf8'));
    const usersDataDataArr = lodashGet(usersDataJsonArr, [2, 'data'], []);

    const usersLoginJsonArr = JSON.parse(fs.readFileSync('import/json/users_login.json', 'utf8'));
    const usersLoginDataArr = lodashGet(usersLoginJsonArr, [2, 'data'], []);

    const communityJsonArr = JSON.parse(fs.readFileSync('import/json/community.json', 'utf8'));
    const communityDataArr = lodashGet(communityJsonArr, [2, 'data'], []);

    const dataDeveloperJsonArr = JSON.parse(fs.readFileSync('import/json/data_developer.json', 'utf8'));
    const dataDeveloperDataArr = lodashGet(dataDeveloperJsonArr, [2, 'data'], []);

    const gameDataJsonArr = JSON.parse(fs.readFileSync('import/json/game_data.json', 'utf8'));
    const gameDataDataArr = lodashGet(gameDataJsonArr, [2, 'data'], []);




    // --------------------------------------------------
    //   ID
    // --------------------------------------------------

    const idsArr = await SchemaTempID.find().exec();
    const idsObj = {};

    for (let valueObj of idsArr.values()) {
      idsObj[valueObj.key] = valueObj.id;
    }

    // console.log(`
    //   ----- idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- idsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(idsObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);




    // --------------------------------------------------
    //   users
    // --------------------------------------------------

    const usersArr = [];
    const cardPlayersArr = [];
    const experiencesArr = [];
    const followsArr = [];
    const followedUCObj = {};


    for (const [index, valueObj] of usersDataDataArr.entries()) {


      // --------------------------------------------------
      //   _id が存在していない場合は処理しない
      // --------------------------------------------------

      const user_no = lodashGet(valueObj, ['user_no'], 0);

      if (idsObj[`user_no_${user_no}`] === undefined) {
        continue;
      }




      // --------------------------------------------------
      //   users_id
      // --------------------------------------------------

      const users_id = shortid.generate();


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const on_off = lodashGet(valueObj, ['on_off'], '0');
      const renewal_date = lodashGet(valueObj, ['renewal_date'], '');
      const access_date = lodashGet(valueObj, ['access_date'], '');
      const page_title = lodashGet(valueObj, ['page_title'], '');
      const name = lodashGet(valueObj, ['handle_name'], 'Name');

      let status = lodashGet(valueObj, ['status'], '');

      if (!status) {
        status = 'Status'
      }

      const top_image = lodashGet(valueObj, ['top_image'], '');
      const thumbnail = lodashGet(valueObj, ['thumbnail'], '0');

      const comment = lodashGet(valueObj, ['explanation'], '');
      const user_id = lodashGet(valueObj, ['user_id'], '');

      const updatedDate = moment(renewal_date).utc().toISOString();
      const accessDate = moment(access_date).utc().toISOString();

      let userID = user_id;
      let userIDInitial = `${shortid.generate()}${shortid.generate()}${shortid.generate()}`;

      if (user_id.length === 25) {

        userID = shortid.generate();
        userIDInitial = user_id;

      }

      const pagesArr = [];

      if (page_title) {

        pagesArr.push(
          {
            _id: shortid.generate(),
            type: 'top',
            title: page_title,
            language: 'ja',
          },
        );

      }

      const hashedPassword = bcrypt.hashSync(`${shortid.generate()}${shortid.generate()}${shortid.generate()}`, 10);


      // --------------------------------------------------
      //   followedUCObj
      // --------------------------------------------------

      let participation_community = lodashGet(valueObj, ['participation_community'], '');

      if (participation_community) {

        participation_community = participation_community.replace('\\', '');

        const participationCommunityArr = participation_community.split(',');
        participationCommunityArr.shift();
        participationCommunityArr.pop();

        for (let community_no of participationCommunityArr.values()) {

          if (idsObj[`community_no_${community_no}`] !== undefined) {

            if (followedUCObj[community_no]) {

              followedUCObj[community_no].push(users_id);

            } else {

              followedUCObj[community_no] = [users_id];

            }

          }

        }


        // console.log(chalk`
        //   participation_community: {green ${participation_community}}
        // `);

        // console.log(`
        //   ----- participationCommunityArr -----\n
        //   ${util.inspect(JSON.parse(JSON.stringify(participationCommunityArr)), { colors: true, depth: null })}\n
        //   --------------------\n
        // `);


      }




      // --------------------------------------------------
      //   users_login
      // --------------------------------------------------

      const created_at = lodashGet(usersLoginDataArr, [index, 'created_at'], 0);
      const createdDate = moment.unix(created_at).utc().toISOString();
      const loginID = lodashGet(usersLoginDataArr, [index, 'username'], '');




      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (on_off === '1') {


        // --------------------------------------------------
        //   users
        // --------------------------------------------------

        usersArr.push(

          {
            _id: users_id,
            createdDate,
            updatedDate,
            accessDate,
            userID,
            userIDInitial,
            pagesObj: {
              imagesAndVideos_id: '',
              arr: pagesArr,
            },
            loginID,
            loginPassword: hashedPassword,
            emailObj: {
              value: '',
              confirmation: false,
            },
            acceptLanguage,
            countriesArr: ['JP'],
            termsOfServiceConfirmedDate: ISO8601,
            webPushes_id: '',
            role: 'user'
          }

        );


        // --------------------------------------------------
        //   card-players
        // --------------------------------------------------

        cardPlayersArr.push(

          {
            _id: shortid.generate(),
            createdDate,
            updatedDate: ISO8601,
            users_id,
            language: 'ja',
            name,
            status,
            imagesAndVideos_id: '',
            imagesAndVideosThumbnail_id: '',
            comment,
            age: '',
            ageAlternativeText: '',
            sex: '',
            sexAlternativeText: '',
            address: '',
            addressAlternativeText: '',
            gamingExperience: '',
            gamingExperienceAlternativeText: '',
            hobbiesArr: [],
            specialSkillsArr: [],
            smartphoneModel: '',
            smartphoneComment: ``,
            tabletModel: '',
            tabletComment: ``,
            pcModel: '',
            pcComment: ``,
            pcSpecsObj: {
              os: '',
              cpu: '',
              cpuCooler: '',
              motherboard: '',
              memory: '',
              storage: '',
              graphicsCard: '',
              opticalDrive: '',
              powerSupply: '',
              pcCase: '',
              monitor: '',
              mouse: '',
              keyboard: '',
            },
            hardwareActiveArr: [],
            hardwareInactiveArr: [],
            ids_idsArr: [],
            activityTimeArr: [],
            lookingForFriends: true,
            lookingForFriendsIcon: 'emoji_u263a',
            lookingForFriendsComment: '',
            voiceChat: true,
            voiceChatComment: '',
            linkArr: [],
            search: true,
          }

        );


        // --------------------------------------------------
        //   experiences
        // --------------------------------------------------

        experiencesArr.push(

          {
            _id: shortid.generate(),
            createdDate,
            updatedDate: ISO8601,
            users_id,
            exp: 0,
            historiesArr: [
              {
                _id: shortid.generate(),
                createdDate,
                updatedDate: createdDate,
                type: 'account-ancient',
                countDay: 0,
                countMonth: 0,
                countYear: 0,
                countValid: 1,
                countTotal: 1
              },
            ],
            acquiredTitles_idsArr: ['MuK2dKVpn'],
            selectedTitles_idsArr: [],
          }

        );


        // --------------------------------------------------
        //   follows
        // --------------------------------------------------

        followsArr.push(

          {
            _id: shortid.generate(),
            updatedDate: ISO8601,
            gameCommunities_id: '',
            userCommunities_id: '',
            users_id,
            approval: false,
            followArr: [],
            followCount: 0,
            followedArr: [],
            followedCount: 0,
            approvalArr: [],
            approvalCount: 0,
            blockArr: [],
            blockCount: 0,
          }

        );


        // console.log(chalk`
        //   datetimeAccess: {green ${datetimeAccess}}
        //   datetimeLimit: {green ${datetimeLimit}}
        //   valueObj.user_no: {green ${valueObj.user_no}}
        // `);

        // console.log(chalk`
        //   created_at: {green ${created_at}}
        //   createdDate: {green ${createdDate}}
        // `);

      }


    }




    // --------------------------------------------------
    //   user-communities
    // --------------------------------------------------

    const userCommunitiesArr = [];


    for (const [index, valueObj] of communityDataArr.entries()) {


      // --------------------------------------------------
      //   _id が存在していない場合は処理しない
      // --------------------------------------------------

      const community_no = lodashGet(valueObj, ['community_no'], 0);
      const author_user_no = lodashGet(valueObj, ['author_user_no'], 0);

      if (idsObj[`community_no_${community_no}`] === undefined || idsObj[`user_no_${author_user_no}`] === undefined) {
        continue;
      }


      // --------------------------------------------------
      //   userCommunities_id
      // --------------------------------------------------

      const userCommunities_id = shortid.generate();


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const on_off = lodashGet(valueObj, ['on_off'], '0');
      const createdDate = moment(lodashGet(valueObj, ['regi_date'], '')).utc().toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['renewal_date'], '')).utc().toISOString();
      const userCommunityID = lodashGet(valueObj, ['community_id'], '');

      const name = lodashGet(valueObj, ['name'], 'Name');
      const description = lodashGet(valueObj, ['description'], '');
      const descriptionShort = lodashGet(valueObj, ['description_mini'], '');

      const game_list = lodashGet(valueObj, ['game_list'], '');
      const top_image = lodashGet(valueObj, ['top_image'], '');
      const thumbnail = lodashGet(valueObj, ['thumbnail'], '0');
      // const member = lodashGet(valueObj, ['member'], '');


      const open = lodashGet(valueObj, ['open'], '1');

      let communityType = 'open';

      if (open !== '1') {
        communityType = 'closed';
      }


      const config = lodashGet(valueObj, ['config'], '');

      let anonymity = false;

      if (config.indexOf('anonymity\";b:1') !== -1) {
        anonymity = true;
      }


      const users_id = idsObj[`user_no_${author_user_no}`];

      const followedArr = lodashGet(followedUCObj, [community_no], []);
      const followedCount = followedArr.length;




      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (on_off === '1') {


        // --------------------------------------------------
        //   user-communities
        // --------------------------------------------------

        userCommunitiesArr.push(

          {
            _id: userCommunities_id,
            createdDate,
            updatedDate,
            userCommunityID,
            users_id,
            localesArr: [
              {
                _id: shortid.generate(),
                language: 'ja',
                name,
                description,
                descriptionShort,
              }
            ],
            imagesAndVideos_id: '',
            imagesAndVideosThumbnail_id: '',
            gameCommunities_idsArr: [],
            forumObj: {
              threadCount: 0,
            },
            updatedDateObj: {
              forum: ISO8601,
            },
            communityType,
            anonymity,
          }

        );


        // --------------------------------------------------
        //   follows
        // --------------------------------------------------

        followsArr.push(

          {
            _id: shortid.generate(),
            updatedDate: ISO8601,
            gameCommunities_id: '',
            userCommunities_id,
            users_id: '',
            approval: false,
            followArr: [],
            followCount: 0,
            followedArr,
            followedCount,
            approvalArr: [],
            approvalCount: 0,
            blockArr: [],
            blockCount: 0,
          }

        );


      }


    }




    // --------------------------------------------------
    //   developers-publishers
    // --------------------------------------------------

    const developersPublishersArr = [];


    for (const [index, valueObj] of dataDeveloperDataArr.entries()) {


      // --------------------------------------------------
      //   _id が存在していない場合は処理しない
      // --------------------------------------------------

      const developer_no = lodashGet(valueObj, ['developer_no'], 0);

      if (idsObj[`developer_no_${developer_no}`] === undefined) {
        continue;
      }


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const name = lodashGet(valueObj, ['name'], 'Name');
      const developerPublisherID = idsObj[`developer_no_${developer_no}`]




      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (developer_no !== '18') {

        developersPublishersArr.push(

          {
            _id: shortid.generate(),
            createdDate: ISO8601,
            updatedDate: ISO8601,
            language: 'ja',
            country: 'JP',
            developerPublisherID,
            urlID: shortid.generate(),
            name,
          }

        );

      }


    }




    // --------------------------------------------------
    //   hardwares
    // --------------------------------------------------

    const hardwaresArr = [

      {
        _id: 'R6uD6BzZ5',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'I-iu-WmkO',
        urlID: 'Family-Computer',
        name: 'ファミリーコンピュータ',
        searchKeywordsArr: [
          'ファミリーコンピューター',
          'ファミコン',
          'ふぁみりーこんぴゅーたー',
          'ふぁみこん',
          'Family Computer',
          'FamilyComputer',
          'Famicom',
          'FC',
        ]
      },


      {
        _id: 'aOeQ04_vN',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'VFLNnniHr',
        urlID: 'Family-Computer-Disk-System',
        name: 'ファミリーコンピュータ ディスクシステム',
        searchKeywordsArr: [
          'ファミリーコンピューター ディスクシステム',
          'ふぁみりーこんぴゅーたー でぃすくしすてむ',
          'Family Computer Disk System',
          'FamilyComputerDiskSystem',
          'FCDS',
        ]
      },


      {
        _id: 'adzG1JLYu',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'KyOSlwcLk',
        urlID: 'PC-Engine',
        name: 'PCエンジン',
        searchKeywordsArr: [
          'PCエンジン',
          'ピーシーエンジン',
          'ぴーしーえんじん',
          'PC Engine',
          'PCEngine',
          'PCE',
        ]
      },


      {
        _id: 'KVvkuvZF2',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: '2yKF4qXAw',
        urlID: 'MEGA-DRIVE',
        name: 'メガドライブ',
        searchKeywordsArr: [
          'メガドライブ',
          'めがどらいぶ',
          'MEGA DRIVE',
          'MEGADRIVE',
          'MD',
        ]
      },


      {
        _id: 'WOQKUSPPR',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'eKmDxi8lX',
        urlID: 'SUPER-Famicom',
        name: 'スーパーファミコン',
        searchKeywordsArr: [
          'スーパーファミコン',
          'スーファミ',
          'すーぱーふぁみこん',
          'すーふぁみ',
          'SUPER Famicom',
          'SUPERFamicom',
          'Super Family Computer',
          'SuperFamilyComputer',
          'SFC',
        ]
      },


      {
        _id: '8oGNQ2hMR',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'Z4R-SPN2-',
        urlID: 'NEO-GEO',
        name: 'ネオジオ',
        searchKeywordsArr: [
          'ネオジオ',
          'ねおじお',
          'NEO GEO',
          'NEOGEO',
          'NEO・GEO',
          'NG',
        ]
      },


      {
        _id: '9zeb0m_13',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'lBSGQeGmx',
        urlID: 'SEGA-SATURN',
        name: 'セガサターン',
        searchKeywordsArr: [
          'セガサターン',
          'せがさたーん',
          'SEGA SATURN',
          'SEGASATURN',
          'SS',
        ]
      },


      {
        _id: 'zSvRzOp0V',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'zB4ivcsqM',
        urlID: 'PlayStation',
        name: 'PlayStation',
        searchKeywordsArr: [
          'プレイステーション',
          'プレーステーション',
          'プレステ',
          'ぷれいすてーしょん',
          'ぷれーすてーしょん',
          'ぷれすて',
          'Play Station',
          'PlayStation',
          'PS',
        ]
      },


      {
        _id: 'wlDy9Dqmv',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'o9bdsq5af',
        urlID: 'VIRTUAL-BOY',
        name: 'バーチャルボーイ',
        searchKeywordsArr: [
          'バーチャルボーイ',
          'ばーちゃるぼーい',
          'VIRTUAL BOY',
          'VIRTUALBOY',
          'VB',
        ]
      },


      {
        _id: 'N-V_maXNc',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: '45syCFviA',
        urlID: 'NINTENDO-64',
        name: 'NINTENDO64',
        searchKeywordsArr: [
          '任天堂64',
          '任天堂６４',
          'ニンテンドー64',
          'ニンテンドウ64',
          'ニンテンドオ64',
          'ニンテンドー６４',
          'ニンテンドウ６４',
          'ニンテンドオ６４',
          'ニンテンドーロクジュウヨン',
          'ニンテンドウロクジュウヨン',
          'ニンテンドオロクジュウヨン',
          'ロクヨン',
          'にんてんどー64',
          'にんてんどう64',
          'にんてんどお64',
          'にんてんどー６４',
          'にんてんどう６４',
          'にんてんどお６４',
          'にんてんどーろくじゅうよん',
          'にんてんどうろくじゅうよん',
          'にんてんどおろくじゅうよん',
          'ろくよん',
          'NINTENDO 64',
          'NINTENDO64',
          'N64',
        ]
      },


      {
        _id: 'iZ7MmkuQw',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'Kj_Djheqt',
        urlID: 'Dreamcast',
        name: 'ドリームキャスト',
        searchKeywordsArr: [
          'ドリームキャスト',
          'ドリキャス',
          'どりーむきゃすと',
          'どりきゃす',
          'Dreamcast',
          'DC',
        ]
      },


      {
        _id: 'I2cKTLJNk',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: '8RERfeQQ9',
        urlID: 'PlayStation-2',
        name: 'PlayStation 2',
        searchKeywordsArr: [
          'プレイステーション2',
          'プレーステーション2',
          'プレステ2',
          'プレイステーション２',
          'プレーステーション２',
          'プレステ２',
          'プレイステーションツー',
          'プレーステーションツー',
          'プレステツー',
          'ぷれいすてーしょん2',
          'ぷれーすてーしょん2',
          'ぷれすて2',
          'ぷれいすてーしょん２',
          'ぷれーすてーしょん２',
          'ぷれすて２',
          'ぷれいすてーしょんつー',
          'ぷれーすてーしょんつー',
          'ぷれすてつー',
          'Play Station 2',
          'PlayStation 2',
          'PlayStation2',
          'PS2',
        ]
      },


      {
        _id: 'PlRw2lxiy',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'XLUt628gr',
        urlID: 'NINTENDO-GAMECUBE',
        name: 'ニンテンドーゲームキューブ',
        searchKeywordsArr: [
          '任天堂ゲームキューブ',
          'ニンテンドーゲームキューブ',
          'ニンテンドウゲームキューブ',
          'ニンテンドオゲームキューブ',
          'にんてんどーげーむきゅーぶ',
          'にんてんどうげーむきゅーぶ',
          'にんてんどおげーむきゅーぶ',
          'NINTENDO GAMECUBE',
          'NINTENDOGAMECUBE',
          'NGC',
          'GC',
        ]
      },


      {
        _id: 'uQcBzP5cS',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: '78lc0hPjL',
        urlID: 'Xbox',
        name: 'Xbox',
        searchKeywordsArr: [
          'エックスボックス',
          'えっくすぼっくす',
          'Xbox',
        ]
      },


      {
        _id: 'NiozcDYe-',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: '08Qp5KxPA',
        urlID: 'Xbox-360',
        name: 'Xbox 360',
        searchKeywordsArr: [
          'エックスボックス360',
          'エックスボックス３６０',
          'エックスボックスサンロクマル',
          'エックスボックスサンビャクロクジュウ',
          'えっくすぼっくす360',
          'えっくすぼっくす３６０',
          'えっくすぼっくすさんろくまる',
          'えっくすぼっくすさんびゃくろくじゅう',
          'Xbox 360',
          'Xbox360',
          'X360'
        ]
      },


      {
        _id: '4iGMasHh4',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'YNZ6nb1Ki',
        urlID: 'PlayStation-3',
        name: 'PlayStation 3',
        searchKeywordsArr: [
          'プレイステーション3',
          'プレーステーション3',
          'プレステ3',
          'プレイステーション３',
          'プレーステーション３',
          'プレステ３',
          'プレイステーションスリー',
          'プレーステーションスリー',
          'プレステスリー',
          'ぷれいすてーしょん3',
          'ぷれーすてーしょん3',
          'ぷれすて3',
          'ぷれいすてーしょん３',
          'ぷれーすてーしょん３',
          'ぷれすて３',
          'ぷれいすてーしょんすりー',
          'ぷれーすてーしょんすりー',
          'ぷれすてすりー',
          'Play Station 3',
          'PlayStation 3',
          'PlayStation3',
          'PS3',
        ]
      },


      {
        _id: '91N2yPx6B',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'n3wYKZ_ao',
        urlID: 'Wii',
        name: 'Wii',
        searchKeywordsArr: [
          'ウィー',
          'ウイー',
          'うぃー',
          'ういー',
          'Wii',
          'We',
        ]
      },


      {
        _id: 'qX8WLLubQ',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'GTxWVd0z-',
        urlID: 'Wii-U',
        name: 'Wii U',
        searchKeywordsArr: [
          'ウィーユー',
          'ウイーユー',
          'うぃーゆー',
          'ういーゆー',
          'Wii U',
          'Wi U',
          'We U',
          'WiiU',
          'WiU',
          'WeU',
        ]
      },


      {
        _id: 'FW76LaH_H',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'TdK3Oc-yV',
        urlID: 'PlayStation-4',
        name: 'PlayStation 4',
        searchKeywordsArr: [
          'プレイステーション4',
          'プレーステーション4',
          'プレステ4',
          'プレイステーション４',
          'プレーステーション４',
          'プレステ４',
          'プレイステーションフォー',
          'プレーステーションフォー',
          'プレステフォー',
          'ぷれいすてーしょん4',
          'ぷれーすてーしょん4',
          'ぷれすて4',
          'ぷれいすてーしょん４',
          'ぷれーすてーしょん４',
          'ぷれすて４',
          'ぷれいすてーしょんふぉー',
          'ぷれーすてーしょんふぉー',
          'ぷれすてふぉー',
          'Play Station 4',
          'PlayStation 4',
          'PlayStation4',
          'PS4',
        ]
      },


      {
        _id: 'vk2kF94Ks',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'uPqoiXA_8',
        urlID: 'Xbox-One',
        name: 'Xbox One',
        searchKeywordsArr: [
          'エックスボックスワン',
          'エックスボックスイチ',
          'えっくすぼっくすわん',
          'えっくすぼっくすいち',
          'Xbox One',
          'XboxOne',
          'Xbox 1',
          'Xbox1',
          'XO'
        ]
      },


      {
        _id: 'Gu1hYjbv7',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'Zd_Ia4Hwm',
        urlID: 'Nintendo-Switch',
        name: 'Nintendo Switch',
        searchKeywordsArr: [
          '任天堂スイッチ',
          '任天堂スウィッチ',
          'ニンテンドースイッチ',
          'ニンテンドースウィッチ',
          'ニンテンドウスイッチ',
          'ニンテンドウスウィッチ',
          'ニンテンドオスイッチ',
          'ニンテンドオスウィッチ',
          'にんてんどーすいっち',
          'にんてんどーすうぃっち',
          'にんてんどうすいっち',
          'にんてんどうすうぃっち',
          'にんてんどおすいっち',
          'にんてんどおすうぃっち',
          'Nintendo Switch',
          'NintendoSwitch',
          'NS',
        ]
      },


      {
        _id: '_z4DBLYNi',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'XBKalRRW7',
        urlID: 'Game-Boy',
        name: 'ゲームボーイ',
        searchKeywordsArr: [
          'ゲームボーイ',
          'げーむぼーい',
          'Game Boy',
          'GameBoy',
          'GB',
        ]
      },


      {
        _id: '9Z6Wh_JJ2',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'sO2U2PzHl',
        urlID: 'GAME-GEAR',
        name: 'ゲームギア',
        searchKeywordsArr: [
          'ゲームギア',
          'げーむぎあ',
          'GAME GEAR',
          'GAMEGEAR',
          'GG',
        ]
      },


      {
        _id: 'QQtnx7FEN',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'qBsY8y0nO',
        urlID: 'PC-Engine-GT',
        name: 'PCエンジンGT',
        searchKeywordsArr: [
          'PCエンジンGT',
          'ピーシーエンジンジーティー',
          'ぴーしーえんじんじーてぃー',
          'PC Engine GT',
          'PCEngineGT',
          'PCEGT',
        ]
      },


      {
        _id: 'IcH7HG2f7',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'u3SQqtJ-u',
        urlID: 'NEOGEO-POCKET',
        name: 'ネオジオポケット',
        searchKeywordsArr: [
          'ネオジオポケット',
          'ねおじおぽけっと',
          'NEO GEO POCKET',
          'NEOGEO POCKET',
          'NEOGEOPOCKET',
          'NEO・GEO POCKET',
          'NGP',
        ]
      },


      {
        _id: 'S2Q_3MrBo',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'PYIE0rv_e',
        urlID: 'Wonder-Swan',
        name: 'ワンダースワン',
        searchKeywordsArr: [
          'ワンダースワン',
          'わんだーすわん',
          'Wonder Swan',
          'WonderSwan',
          'WS',
        ]
      },


      {
        _id: '4OkTt-VSM',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'AIvzEgDCd',
        urlID: 'GAMEBOY-ADVANCE',
        name: 'ゲームボーイアドバンス',
        searchKeywordsArr: [
          'ゲームボーイアドバンス',
          'げーむぼーいあどばんす',
          'GAMEBOY ADVANCE',
          'GAMEBOYADVANCE',
          'GBA',
        ]
      },


      {
        _id: 'Uem6UalMW',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'HATpnt7sl',
        urlID: 'Nintendo-DS',
        name: 'ニンテンドーDS',
        searchKeywordsArr: [
          '任天堂DS',
          '任天堂ディーエス',
          'ニンテンドーDS',
          'ニンテンドーディーエス',
          'ニンテンドウDS',
          'ニンテンドウディーエス',
          'ニンテンドオDS',
          'ニンテンドオディーエス',
          'にんてんどーDS',
          'にんてんどーでぃーえす',
          'にんてんどうDS',
          'にんてんどうでぃーえす',
          'にんてんどおDS',
          'にんてんどおでぃーえす',
          'Nintendo DS',
          'NintendoDS',
          'NDS',
        ]
      },


      {
        _id: 'nMhdlLGm6',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'efIOgWs3N',
        urlID: 'PlayStation-Portable',
        name: 'PlayStation Portable',
        searchKeywordsArr: [
          'プレイステーション・ポータブル',
          'プレイステーションポータブル',
          'プレーステーション・ポータブル',
          'プレーステーションポータブル',
          'プレステポータブル',
          'ぷれいすてーしょん・ぽーたぶる',
          'ぷれいすてーしょんぽーたぶる',
          'ぷれーすてーしょん・ぽーたぶる',
          'ぷれーすてーしょんぽーたぶる',
          'ぷれすて・ぽーたぶる',
          'ぷれすてぽーたぶる',
          'Play Station Portable',
          'PlayStation Portable',
          'PlayStationPortable',
          'PS Portable',
          'PSPortable',
          'PSP',
        ]
      },


      {
        _id: 'YvgkE6inK',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'qk9DiUwN-',
        urlID: 'Nintendo-3DS',
        name: 'ニンテンドー3DS',
        searchKeywordsArr: [
          '任天堂3DS',
          '任天堂スリーディーエス',
          'ニンテンドー3DS',
          'ニンテンドースリーディーエス',
          'ニンテンドウ3DS',
          'ニンテンドウスリーディーエス',
          'ニンテンドオ3DS',
          'ニンテンドオスリーディーエス',
          'にんてんどー3DS',
          'にんてんどーすりーでぃーえす',
          'にんてんどう3DS',
          'にんてんどうすりーでぃーえす',
          'にんてんどお3DS',
          'にんてんどおすりーでぃーえす',
          'Nintendo 3DS',
          'Nintendo3DS',
          'N3DS',
        ]
      },


      {
        _id: '_3asC9ODV',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'mOpBZsQBm',
        urlID: 'PlayStation-Vita',
        name: 'PlayStation Vita',
        searchKeywordsArr: [
          'プレイステーション・ヴィータ',
          'プレイステーションヴィータ',
          'プレーステーション・ヴィータ',
          'プレーステーションヴィータ',
          'プレステヴィータ',
          'プレイステーション・ビータ',
          'プレイステーションビータ',
          'プレーステーション・ビータ',
          'プレーステーションビータ',
          'プレステビータ',
          'ぷれいすてーしょん・ゔぃーた',
          'ぷれいすてーしょんゔぃーた',
          'ぷれーすてーしょん・ゔぃーた',
          'ぷれーすてーしょんゔぃーた',
          'ぷれすて・ゔぃーた',
          'ぷれすてゔぃーた',
          'ぷれいすてーしょん・びーた',
          'ぷれいすてーしょんびーた',
          'ぷれーすてーしょん・びーた',
          'ぷれーすてーしょんびーた',
          'ぷれすて・びーた',
          'ぷれすてびーた',
          'Play Station Vita',
          'PlayStation Vita',
          'PlayStationVita',
          'PS Vita',
          'PSVita',
          'PSV',
        ]
      },


      {
        _id: '8hmwbso_y',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'ehBtuyjma',
        urlID: 'PC-FX',
        name: 'PC-FX',
        searchKeywordsArr: [
          'PC-FX',
          'ピーシーエフエックス',
          'ぴーしーえふえっくす',
          'PC FX',
          'PCFX',
        ]
      },


      {
        _id: '0J3jIYcCN',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'si2_UYLdW',
        urlID: '3DO',
        name: '3DO',
        searchKeywordsArr: [
          '3DO',
          'スリーディーオー',
          'すりーでぃーおー',
        ]
      },


      {
        _id: 'pr6k8Jn6_',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'P0UG-LHOQ',
        urlID: 'PC',
        name: 'PC',
        searchKeywordsArr: [
          'ピーシー',
          'パソコン',
          'パーソナル・コンピューター',
          'パーソナルコンピューター',
          'ぴーしー',
          'ぱーそなる・こんぴゅーたー',
          'ぱーそなるこんぴゅーたー',
          'Personal Computer',
          'PersonalComputer',
          'PC',
        ]
      },


      {
        _id: 'KN9AMVKP7',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'SXybALV1f',
        urlID: 'Android',
        name: 'Android',
        searchKeywordsArr: [
          'アンドロイド',
          'あんどろいど',
          'Android',
        ]
      },


      {
        _id: 'M7YVRglvr',
        createdDate: ISO8601,
        updatedDate: ISO8601,
        language: 'ja',
        country: 'JP',
        hardwareID: 'o-f3Zxd49',
        urlID: 'iOS',
        name: 'iOS',
        searchKeywordsArr: [
          'アイオーエス',
          'あいおーえす',
          'iOS',
        ]
      },

    ];




    // --------------------------------------------------
    //   games
    // --------------------------------------------------

    // const gamesArr = [];


    // for (const [index, valueObj] of gameDataDataArr.entries()) {


    //   // --------------------------------------------------
    //   //   _id が存在していない場合は処理しない
    //   // --------------------------------------------------

    //   const game_no = lodashGet(valueObj, ['game_no'], 0);

    //   if (idsObj[`game_no_${game_no}`] === undefined) {
    //     continue;
    //   }


    //   // --------------------------------------------------
    //   //   Data
    //   // --------------------------------------------------

    //   const name = lodashGet(valueObj, ['name'], 'Name');
    //   const developerPublisherID = idsObj[`developer_no_${developer_no}`]




    //   // --------------------------------------------------
    //   //   push
    //   // --------------------------------------------------

    //   if (developer_no !== '18') {

    //     developersPublishersArr.push(

    //       {
    //         _id: shortid.generate(),
    //         createdDate: ISO8601,
    //         updatedDate: ISO8601,
    //         language: 'ja',
    //         country: 'JP',
    //         developerPublisherID,
    //         urlID: shortid.generate(),
    //         name,
    //       }

    //     );

    //   }


    // }




    // ---------------------------------------------
    //   transaction
    // ---------------------------------------------

    await dbInsert({

      usersArr,
      cardPlayersArr,
      experiencesArr,
      followsArr,
      userCommunitiesArr,
      developersPublishersArr,
      hardwaresArr,

    });




    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    console.log(`
      ----------------------------------------\n
      pages/api/v2/common/import-json.js
    `);

    // console.log(`
    //   ----- usersArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(usersArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- userCommunitiesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(userCommunitiesArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- followsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(followsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- developersPublishersArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(developersPublishersArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- followedUCObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(followedUCObj)), { colors: true, depth: null })}\n
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




/**
 * Transaction 挿入する
 * 2020/3/4
 * @param {Object} usersConditionObj - DB users 検索条件
 * @param {Object} usersSaveObj - DB users 保存データ
 * @param {Object} cardPlayersConditionObj - DB card-players 検索条件
 * @param {Object} cardPlayersSaveObj - DB card-players 保存データ
 * @param {Object} emailConfirmationsConditionObj - DB email-confirmations 検索条件
 * @param {Object} emailConfirmationsSaveObj - DB email-confirmations 保存データ
 * @param {Object} experiencesConditionObj - DB experiences 検索条件
 * @param {Object} experiencesSaveObj - DB experiences 保存データ
 * @param {Object} followsConditionObj - DB follows 検索条件
 * @param {Object} followsSaveObj - DB follows 保存データ
 * @param {Object} imagesAndVideosConditionObj - DB images-and-videos 検索条件
 * @param {Object} imagesAndVideosSaveObj - DB images-and-videos 保存データ
 * @param {Object} webPushesConditionObj - DB web-pushes 検索条件
 * @param {Object} webPushesSaveObj - DB web-pushes 保存データ
 * @return {Object}
 */
const dbInsert = async ({

  usersArr,
  cardPlayersArr,
  experiencesArr,
  followsArr,
  userCommunitiesArr,
  developersPublishersArr,
  hardwaresArr,

}) => {


  // --------------------------------------------------
  //   Property
  // --------------------------------------------------

  let returnObj = {};




  // --------------------------------------------------
  //   Delete
  // --------------------------------------------------

  // await SchemaHardwares.deleteMany();




  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------

  // const session = await SchemaUsers.startSession();




  // --------------------------------------------------
  //   Database
  // --------------------------------------------------

  try {


    // --------------------------------------------------
    //   Transaction / Start
    // --------------------------------------------------

    // await session.startTransaction();




    // ---------------------------------------------
    //   users
    // ---------------------------------------------

    // await SchemaUsers.deleteMany();
    await SchemaUsers.insertMany(usersArr);


    // ---------------------------------------------
    //   card-players
    // ---------------------------------------------

    // await SchemaCardPlayers.deleteMany();
    await SchemaCardPlayers.insertMany(cardPlayersArr);


    // ---------------------------------------------
    //   experiences
    // ---------------------------------------------

    // await SchemaExperiences.deleteMany();
    await SchemaExperiences.insertMany(experiencesArr);


    // ---------------------------------------------
    //   follows
    // ---------------------------------------------

    // await SchemaFollows.deleteMany();
    await SchemaFollows.insertMany(followsArr);


    // ---------------------------------------------
    //   user-communities
    // ---------------------------------------------

    // await SchemaUserCommunities.deleteMany();
    await SchemaUserCommunities.insertMany(userCommunitiesArr);


    // ---------------------------------------------
    //   developers-publishers
    // ---------------------------------------------

    await SchemaDevelopersPublishers.deleteMany();
    await SchemaDevelopersPublishers.insertMany(developersPublishersArr);


    // ---------------------------------------------
    //   hardwares
    // ---------------------------------------------


    // await SchemaHardwares.insertMany(hardwaresArr, { session });





    // --------------------------------------------------
    //   card-players
    // --------------------------------------------------

    // if (Object.keys(cardPlayersConditionObj).length !== 0 && Object.keys(cardPlayersSaveObj).length !== 0) {
    //   await SchemaCardPlayers.updateOne(cardPlayersConditionObj, cardPlayersSaveObj, { session, upsert: true });
    // }


    // // --------------------------------------------------
    // //   email-confirmations
    // // --------------------------------------------------

    // if (Object.keys(emailConfirmationsConditionObj).length !== 0 && Object.keys(emailConfirmationsSaveObj).length !== 0) {
    //   await SchemaEmailConfirmations.updateOne(emailConfirmationsConditionObj, emailConfirmationsSaveObj, { session, upsert: true });
    // }


    // // --------------------------------------------------
    // //   experiences
    // // --------------------------------------------------

    // if (Object.keys(experiencesConditionObj).length !== 0 && Object.keys(experiencesSaveObj).length !== 0) {
    //   await SchemaExperiences.updateOne(experiencesConditionObj, experiencesSaveObj, { session, upsert: true });
    // }


    // // --------------------------------------------------
    // //   follows
    // // --------------------------------------------------

    // if (Object.keys(followsConditionObj).length !== 0 && Object.keys(followsSaveObj).length !== 0) {
    //   await SchemaFollows.updateOne(followsConditionObj, followsSaveObj, { session, upsert: true });
    // }


    // // --------------------------------------------------
    // //   web-pushes
    // // --------------------------------------------------

    // if (Object.keys(webPushesConditionObj).length !== 0 && Object.keys(webPushesSaveObj).length !== 0) {
    //   await SchemaWebPushes.updateOne(webPushesConditionObj, webPushesSaveObj, { session, upsert: true });
    // }




    // // --------------------------------------------------
    // //   images-and-videos - メイン画像
    // // --------------------------------------------------

    // if (Object.keys(imagesAndVideosConditionObj).length !== 0 && Object.keys(imagesAndVideosSaveObj).length !== 0) {


    //   // --------------------------------------------------
    //   //   画像＆動画を削除する
    //   // --------------------------------------------------

    //   const arr = lodashGet(imagesAndVideosSaveObj, ['arr'], []);

    //   if (arr.length === 0) {

    //     await SchemaImagesAndVideos.deleteOne(imagesAndVideosConditionObj, { session });


    //   // --------------------------------------------------
    //   //   画像＆動画を保存
    //   // --------------------------------------------------

    //   } else {

    //     await SchemaImagesAndVideos.updateOne(imagesAndVideosConditionObj, imagesAndVideosSaveObj, { session, upsert: true });

    //   }

    // }




    // --------------------------------------------------
    //   Transaction / Commit
    // --------------------------------------------------

    // await session.commitTransaction();
    // console.log('--------コミット-----------');

    // session.endSession();




    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    console.log(`
      ----------------------------------------\n
      pages/api/v2/common/import-json.js - transactionForInsert
    `);

    // console.log(`
    //   ----- usersArr -----\n
    //   ${util.inspect(usersArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- cardPlayersArr -----\n
    //   ${util.inspect(cardPlayersArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- experiencesArr -----\n
    //   ${util.inspect(experiencesArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- followsArr -----\n
    //   ${util.inspect(followsArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- emailConfirmationsConditionObj -----\n
    //   ${util.inspect(emailConfirmationsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- emailConfirmationsSaveObj -----\n
    //   ${util.inspect(emailConfirmationsSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- experiencesConditionObj -----\n
    //   ${util.inspect(experiencesConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- experiencesSaveObj -----\n
    //   ${util.inspect(experiencesSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- followsConditionObj -----\n
    //   ${util.inspect(followsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- followsSaveObj -----\n
    //   ${util.inspect(followsSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- imagesAndVideosConditionObj -----\n
    //   ${util.inspect(imagesAndVideosConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- imagesAndVideosSaveObj -----\n
    //   ${util.inspect(imagesAndVideosSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- webPushesConditionObj -----\n
    //   ${util.inspect(webPushesConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- webPushesSaveObj -----\n
    //   ${util.inspect(webPushesSaveObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- returnObj -----\n
    //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);




    // --------------------------------------------------
    //   Return
    // --------------------------------------------------

    return returnObj;


  } catch (errorObj) {

    // console.log(`
    //   ----- errorObj -----\n
    //   ${util.inspect(errorObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);


    // --------------------------------------------------
    //   Transaction / Rollback
    // --------------------------------------------------

    // await session.abortTransaction();
    // console.log('--------ロールバック-----------');

    // session.endSession();


    throw errorObj;

  }


};
