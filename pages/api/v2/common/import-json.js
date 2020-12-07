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
import SchemaTempImageID from 'import/@database/temp-image-id-schema.js';


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
import { array } from 'prop-types';






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
    // recruitmentThreadsArr.publicCommentsUsers_idsArr


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

    const dataLinkJsonArr = JSON.parse(fs.readFileSync('import/json/data_link.json', 'utf8'));
    const dataLinkDataArr = lodashGet(dataLinkJsonArr, [2, 'data'], []);

    const imageJsonArr = JSON.parse(fs.readFileSync('import/json/image.json', 'utf8'));
    const imageDataArr = lodashGet(imageJsonArr, [2, 'data'], []);

    const imageObj = {};

    for (let valueObj of imageDataArr.values()) {
      imageObj[valueObj.game_no] = valueObj.image_no;
    }

    const gameIDJsonArr = JSON.parse(fs.readFileSync('import/json/game_id.json', 'utf8'));
    const gameIDDataArr = lodashGet(gameIDJsonArr, [2, 'data'], []);

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

    const tempIDsArr = await SchemaTempID.find().exec();
    const idsObj = {};

    for (let valueObj of tempIDsArr.values()) {
      idsObj[valueObj.key] = valueObj.id;
    }


    const tempIDsImageArr = await SchemaTempImageID.find().exec();
    const idsImageObj = {};

    for (let valueObj of tempIDsImageArr.values()) {

      idsImageObj[valueObj.key] = {

        id1: valueObj.id1,
        id2Arr: valueObj.id2Arr,
        idThumbnail1: valueObj.idThumbnail1,
        idThumbnail2: valueObj.idThumbnail2,

      };

    }


    const gameIDsObj = {};
    const banIDsArr = [2, 5, 8, 9, 14];

    for (let valueObj of gameIDDataArr.values()) {

      const game_id_no = parseInt(valueObj.game_id_no, 10);

      // console.log(`
      //   ----- valueObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(valueObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);

      if (!banIDsArr.includes(game_id_no)) {

        // console.log(chalk`
        //   valueObj.game_id_no: {green ${valueObj.game_id_no}}
        //   valueObj.id: {green ${valueObj.id}}
        //   banIDsArr.includes(game_id_no): {green ${banIDsArr.includes(game_id_no)}}
        // `);

        gameIDsObj[valueObj.id] = {

          _id: idsObj[`game_id_no_${valueObj.game_id_no}`],
          user_no: valueObj.user_no,

        };

      }

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

    // console.log(`
    //   ----- gameIDsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(gameIDsObj)), { colors: true, depth: null })}\n
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

      const users_id = idsObj[`user_no_${user_no}`];


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

      let comment = lodashGet(valueObj, ['explanation'], '');

      if (comment) {
        comment = comment.replace(/\r\n/g, '\n');
      }

      const user_id = lodashGet(valueObj, ['user_id'], '');

      const updatedDate = moment(renewal_date).utc().add(-9, 'hours').toISOString();
      const accessDate = moment(access_date).utc().add(-9, 'hours').toISOString();

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
      const createdDate = moment.unix(created_at).utc().add(-9, 'hours').toISOString();
      const loginID = lodashGet(usersLoginDataArr, [index, 'username'], '');
      const group = lodashGet(usersLoginDataArr, [index, 'group'], '1');




      // --------------------------------------------------
      //   imagesAndVideosThumbnail_id
      // --------------------------------------------------

      const imagesAndVideosThumbnail_id = lodashGet(idsImageObj, [`user_no_${user_no}`, 'idThumbnail1'], '');

      // console.log(chalk`
      //   imagesAndVideosThumbnail_id: {green ${imagesAndVideosThumbnail_id}}
      // `);





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
            role: group === '100' ? 'administrator' : 'user',
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
            imagesAndVideosThumbnail_id,
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
    //   forum-replies UC
    // --------------------------------------------------

    const forumRepliesArr = [];
    const forumReplyCountUCObj = {};
    const forumReplyCountForThreadUCObj = {};
    const forumImagesCountForThreadUCObj = {};
    const forumVideosCountForThreadUCObj = {};


    for (const [index, valueObj] of bbsReplyUCDataArr.entries()) {


      // --------------------------------------------------
      //   _id が存在していない場合は処理しない
      // --------------------------------------------------

      const bbs_thread_no = parseInt(lodashGet(valueObj, ['bbs_thread_no'], 0), 10);
      const bbs_comment_no = parseInt(lodashGet(valueObj, ['bbs_comment_no'], 0), 10);
      const bbs_reply_no = parseInt(lodashGet(valueObj, ['bbs_reply_no'], 0), 10);
      const on_off = lodashGet(valueObj, ['on_off'], '0');
      const community_no = lodashGet(valueObj, ['community_no'], '');

      if (

        idsObj[`bbs_thread_no_uc_${bbs_thread_no}`] === undefined ||
        idsObj[`bbs_comment_no_uc_${bbs_comment_no}`] === undefined ||
        idsObj[`bbs_reply_no_uc_${bbs_reply_no}`] === undefined ||
        idsObj[`community_no_${community_no}`] === undefined ||
        on_off !== '1'

      ) {
        continue;
      }


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const bbs_id = lodashGet(valueObj, ['bbs_id'], '');
      const createdDate = moment(lodashGet(valueObj, ['regi_date'], '')).utc().add(-9, 'hours').toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['sort_date'], '')).utc().add(-9, 'hours').toISOString();
      const user_no = lodashGet(valueObj, ['user_no'], '');
      let anonymity = valueObj.anonymity ? true : false;

      let name = lodashGet(valueObj, ['handle_name'], '');

      if (!name) {
        name = '';
      }

      let comment = lodashGet(valueObj, ['comment'], '');

      if (comment) {
        comment = comment.replace(/\r\n/g, '\n');
      }

      const image = lodashGet(valueObj, ['image'], '');
      const movie = lodashGet(valueObj, ['movie'], '');
      const goods = parseInt(lodashGet(valueObj, ['good'], 0), 10);
      const userAgent = lodashGet(valueObj, ['user_agent'], '');


      // --------------------------------------------------
      //   _id
      // --------------------------------------------------

      const forumThreads_id = idsObj[`bbs_thread_no_uc_${bbs_thread_no}`];
      const forumComments_id = idsObj[`bbs_comment_no_uc_${bbs_comment_no}`];
      const forumReplies_id = idsObj[`bbs_reply_no_uc_${bbs_reply_no}`];
      const userCommunities_id = idsObj[`community_no_${community_no}`];

      // if (!forumThreads_id) {
      //   console.log(chalk`
      //     bbs_id: {green ${bbs_id}}
      //   `);
      // }


      // --------------------------------------------------
      //   users_id
      // --------------------------------------------------

      let users_id = '';

      if (user_no) {

        if (idsObj[`user_no_${user_no}`]) {

          users_id = idsObj[`user_no_${user_no}`];

        } else {

          // console.log(chalk`
          //   user_no: {green ${user_no}}
          //   anonymity: {green ${anonymity}}
          //   bbs_id: {green ${bbs_id}}
          // `);

          users_id = '';
          anonymity = false;
          name = '';

        }

      }


      // --------------------------------------------------
      //   imagesAndVideos_id
      // --------------------------------------------------

      const imagesAndVideos_id = lodashGet(idsImageObj, [`bbs_reply_no_uc_${bbs_reply_no}`, 'id1'], '');

      // if (imagesAndVideos_id) {
      //   console.log(chalk`
      //     name: {green ${name}}
      //     imagesAndVideos_id: {green ${imagesAndVideos_id}}
      //   `);
      // }


      // --------------------------------------------------
      //   count
      // --------------------------------------------------

      if (forumReplyCountUCObj[bbs_comment_no] !== undefined) {
        forumReplyCountUCObj[bbs_comment_no] += 1;
      } else {
        forumReplyCountUCObj[bbs_comment_no] = 1;
      }

      if (forumReplyCountForThreadUCObj[bbs_thread_no] !== undefined) {
        forumReplyCountForThreadUCObj[bbs_thread_no] += 1;
      } else {
        forumReplyCountForThreadUCObj[bbs_thread_no] = 1;
      }

      if (image) {

        if (forumImagesCountForThreadUCObj[bbs_thread_no] !== undefined) {
          forumImagesCountForThreadUCObj[bbs_thread_no] += 1;
        } else {
          forumImagesCountForThreadUCObj[bbs_thread_no] = 1;
        }

      }

      if (movie) {

        if (forumVideosCountForThreadUCObj[bbs_thread_no] !== undefined) {
          forumVideosCountForThreadUCObj[bbs_thread_no] += 1;
        } else {
          forumVideosCountForThreadUCObj[bbs_thread_no] = 1;
        }

      }


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      forumRepliesArr.push(

        {
          _id: forumReplies_id,
          createdDate,
          updatedDate,
          gameCommunities_id: '',
          userCommunities_id,
          forumThreads_id,
          forumComments_id,
          replyToForumReplys_id: '',
          users_id,
          localesArr: [
            {
              _id: shortid.generate(),
              language: 'ja',
              name,
              comment,
            }
          ],
          imagesAndVideos_id,
          anonymity,
          goods,
          replies: 0,
          acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
          ip: '192.168.1.0',
          userAgent,
        }

      );


    }




    // --------------------------------------------------
    //   forum-replies GC
    // --------------------------------------------------

    const forumReplyCountGCObj = {};
    const forumReplyCountForThreadGCObj = {};
    const forumImagesCountForThreadGCObj = {};
    const forumVideosCountForThreadGCObj = {};


    for (const [index, valueObj] of bbsReplyGCDataArr.entries()) {


      // --------------------------------------------------
      //   _id が存在していない場合は処理しない
      // --------------------------------------------------

      const bbs_thread_no = parseInt(lodashGet(valueObj, ['bbs_thread_no'], 0), 10);
      const bbs_comment_no = parseInt(lodashGet(valueObj, ['bbs_comment_no'], 0), 10);
      const bbs_reply_no = parseInt(lodashGet(valueObj, ['bbs_reply_no'], 0), 10);
      const on_off = lodashGet(valueObj, ['on_off'], '0');
      const game_no = lodashGet(valueObj, ['game_no'], '');

      if (

        idsObj[`bbs_thread_no_gc_${bbs_thread_no}`] === undefined ||
        idsObj[`bbs_comment_no_gc_${bbs_comment_no}`] === undefined ||
        idsObj[`bbs_reply_no_gc_${bbs_reply_no}`] === undefined ||
        idsObj[`game_no_${game_no}`] === undefined ||
        on_off !== '1'

      ) {
        continue;
      }


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const bbs_id = lodashGet(valueObj, ['bbs_id'], '');
      const createdDate = moment(lodashGet(valueObj, ['regi_date'], '')).utc().add(-9, 'hours').toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['sort_date'], '')).utc().add(-9, 'hours').toISOString();
      const user_no = lodashGet(valueObj, ['user_no'], '');
      let anonymity = valueObj.anonymity ? true : false;

      let name = lodashGet(valueObj, ['handle_name'], '');

      if (!name) {
        name = '';
      }

      let comment = lodashGet(valueObj, ['comment'], '');

      if (comment) {
        comment = comment.replace(/\r\n/g, '\n');
      }

      const image = lodashGet(valueObj, ['image'], '');
      const movie = lodashGet(valueObj, ['movie'], '');
      const goods = parseInt(lodashGet(valueObj, ['good'], 0), 10);
      const userAgent = lodashGet(valueObj, ['user_agent'], '');


      // --------------------------------------------------
      //   _id
      // --------------------------------------------------

      const forumThreads_id = idsObj[`bbs_thread_no_gc_${bbs_thread_no}`];
      const forumComments_id = idsObj[`bbs_comment_no_gc_${bbs_comment_no}`];
      const forumReplies_id = idsObj[`bbs_reply_no_gc_${bbs_reply_no}`];
      const gameCommunities_id = idsObj[`game_no_${game_no}`];

      // if (!forumThreads_id) {
      //   console.log(chalk`
      //     bbs_id: {green ${bbs_id}}
      //   `);
      // }


      // --------------------------------------------------
      //   users_id
      // --------------------------------------------------

      let users_id = '';

      if (user_no) {

        if (idsObj[`user_no_${user_no}`]) {

          users_id = idsObj[`user_no_${user_no}`];

        } else {

          // console.log(chalk`
          //   user_no: {green ${user_no}}
          //   anonymity: {green ${anonymity}}
          //   bbs_id: {green ${bbs_id}}
          // `);

          users_id = '';
          anonymity = false;
          name = '';

        }

      }


      // --------------------------------------------------
      //   imagesAndVideos_id
      // --------------------------------------------------

      const imagesAndVideos_id = lodashGet(idsImageObj, [`bbs_reply_no_gc_${bbs_reply_no}`, 'id1'], '');

      // if (imagesAndVideos_id) {
      //   console.log(chalk`
      //     name: {green ${name}}
      //     imagesAndVideos_id: {green ${imagesAndVideos_id}}
      //   `);
      // }


      // --------------------------------------------------
      //   count
      // --------------------------------------------------

      if (forumReplyCountGCObj[bbs_comment_no] !== undefined) {
        forumReplyCountGCObj[bbs_comment_no] += 1;
      } else {
        forumReplyCountGCObj[bbs_comment_no] = 1;
      }

      if (forumReplyCountForThreadGCObj[bbs_thread_no] !== undefined) {
        forumReplyCountForThreadGCObj[bbs_thread_no] += 1;
      } else {
        forumReplyCountForThreadGCObj[bbs_thread_no] = 1;
      }

      if (image) {

        if (forumImagesCountForThreadGCObj[bbs_thread_no] !== undefined) {
          forumImagesCountForThreadGCObj[bbs_thread_no] += 1;
        } else {
          forumImagesCountForThreadGCObj[bbs_thread_no] = 1;
        }

      }

      if (movie) {

        if (forumVideosCountForThreadGCObj[bbs_thread_no] !== undefined) {
          forumVideosCountForThreadGCObj[bbs_thread_no] += 1;
        } else {
          forumVideosCountForThreadGCObj[bbs_thread_no] = 1;
        }

      }


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      forumRepliesArr.push(

        {
          _id: forumReplies_id,
          createdDate,
          updatedDate,
          gameCommunities_id,
          userCommunities_id: '',
          forumThreads_id,
          forumComments_id,
          replyToForumComments_id: '',
          users_id,
          localesArr: [
            {
              _id: shortid.generate(),
              language: 'ja',
              name,
              comment,
            }
          ],
          imagesAndVideos_id,
          anonymity,
          goods,
          replies: 0,
          acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
          ip: '192.168.1.0',
          userAgent,
        }

      );


    }




    // --------------------------------------------------
    //   forum-comments UC
    // --------------------------------------------------

    const forumCommentsArr = [];
    const forumCommentCountUCObj = {};


    for (const [index, valueObj] of bbsCommentUCDataArr.entries()) {


      // --------------------------------------------------
      //   _id が存在していない場合は処理しない
      // --------------------------------------------------

      const bbs_thread_no = parseInt(lodashGet(valueObj, ['bbs_thread_no'], 0), 10);
      const bbs_comment_no = parseInt(lodashGet(valueObj, ['bbs_comment_no'], 0), 10);
      const on_off = lodashGet(valueObj, ['on_off'], '0');
      const community_no = lodashGet(valueObj, ['community_no'], '');

      if (

        idsObj[`bbs_thread_no_uc_${bbs_thread_no}`] === undefined ||
        idsObj[`bbs_comment_no_uc_${bbs_comment_no}`] === undefined ||
        idsObj[`community_no_${community_no}`] === undefined ||
        on_off !== '1'

      ) {
        continue;
      }


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const bbs_id = lodashGet(valueObj, ['bbs_id'], '');
      const createdDate = moment(lodashGet(valueObj, ['regi_date'], '')).utc().add(-9, 'hours').toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['sort_date'], '')).utc().add(-9, 'hours').toISOString();
      const user_no = lodashGet(valueObj, ['user_no'], '');
      let anonymity = valueObj.anonymity ? true : false;

      let name = lodashGet(valueObj, ['handle_name'], '');

      if (!name) {
        name = '';
      }

      let comment = lodashGet(valueObj, ['comment'], '');

      if (comment) {
        comment = comment.replace(/\r\n/g, '\n');
      }

      const image = lodashGet(valueObj, ['image'], '');
      const movie = lodashGet(valueObj, ['movie'], '');
      const goods = parseInt(lodashGet(valueObj, ['good'], 0), 10);
      const replies = lodashGet(forumReplyCountUCObj, [bbs_comment_no], 0);
      const userAgent = lodashGet(valueObj, ['user_agent'], '');


      // --------------------------------------------------
      //   _id
      // --------------------------------------------------

      const forumThreads_id = idsObj[`bbs_thread_no_uc_${bbs_thread_no}`];
      const forumComments_id = idsObj[`bbs_comment_no_uc_${bbs_comment_no}`];
      const userCommunities_id = idsObj[`community_no_${community_no}`];


      // --------------------------------------------------
      //   users_id
      // --------------------------------------------------

      let users_id = '';

      if (user_no) {

        if (idsObj[`user_no_${user_no}`]) {

          users_id = idsObj[`user_no_${user_no}`];

        } else {

          // console.log(chalk`
          //   user_no: {green ${user_no}}
          //   anonymity: {green ${anonymity}}
          //   bbs_id: {green ${bbs_id}}
          // `);

          users_id = '';
          anonymity = false;
          name = '';

        }

      }


      // --------------------------------------------------
      //   imagesAndVideos_id
      // --------------------------------------------------

      const imagesAndVideos_id = lodashGet(idsImageObj, [`bbs_comment_no_uc_${bbs_comment_no}`, 'id1'], '');

      // if (imagesAndVideos_id) {
      //   console.log(chalk`
      //     name: {green ${name}}
      //     imagesAndVideos_id: {green ${imagesAndVideos_id}}
      //   `);
      // }


      // --------------------------------------------------
      //   count
      // --------------------------------------------------

      if (forumCommentCountUCObj[bbs_thread_no] !== undefined) {
        forumCommentCountUCObj[bbs_thread_no] += 1;
      } else {
        forumCommentCountUCObj[bbs_thread_no] = 1;
      }

      if (image) {

        if (forumImagesCountForThreadUCObj[bbs_thread_no] !== undefined) {
          forumImagesCountForThreadUCObj[bbs_thread_no] += 1;
        } else {
          forumImagesCountForThreadUCObj[bbs_thread_no] = 1;
        }

      }

      if (movie) {

        if (forumVideosCountForThreadUCObj[bbs_thread_no] !== undefined) {
          forumVideosCountForThreadUCObj[bbs_thread_no] += 1;
        } else {
          forumVideosCountForThreadUCObj[bbs_thread_no] = 1;
        }

      }


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      forumCommentsArr.push(

        {
          _id: forumComments_id,
          createdDate,
          updatedDate,
          gameCommunities_id: '',
          userCommunities_id,
          forumThreads_id,
          forumComments_id: '',
          replyToForumComments_id: '',
          users_id,
          localesArr: [
            {
              _id: shortid.generate(),
              language: 'ja',
              name,
              comment,
            }
          ],
          imagesAndVideos_id,
          anonymity,
          goods,
          replies,
          acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
          ip: '192.168.1.0',
          userAgent,
        }

      );


    }




    // --------------------------------------------------
    //   forum-comments GC
    // --------------------------------------------------

    const forumCommentCountGCObj = {};


    for (const [index, valueObj] of bbsCommentGCDataArr.entries()) {


      // --------------------------------------------------
      //   _id が存在していない場合は処理しない
      // --------------------------------------------------

      const bbs_thread_no = parseInt(lodashGet(valueObj, ['bbs_thread_no'], 0), 10);
      const bbs_comment_no = parseInt(lodashGet(valueObj, ['bbs_comment_no'], 0), 10);
      const on_off = lodashGet(valueObj, ['on_off'], '0');
      const game_no = lodashGet(valueObj, ['game_no'], '');

      if (

        idsObj[`bbs_thread_no_gc_${bbs_thread_no}`] === undefined ||
        idsObj[`bbs_comment_no_gc_${bbs_comment_no}`] === undefined ||
        idsObj[`game_no_${game_no}`] === undefined ||
        on_off !== '1'

      ) {
        continue;
      }


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const bbs_id = lodashGet(valueObj, ['bbs_id'], '');
      const createdDate = moment(lodashGet(valueObj, ['regi_date'], '')).utc().add(-9, 'hours').toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['sort_date'], '')).utc().add(-9, 'hours').toISOString();
      const user_no = lodashGet(valueObj, ['user_no'], '');
      let anonymity = valueObj.anonymity ? true : false;

      let name = lodashGet(valueObj, ['handle_name'], '');

      if (!name) {
        name = '';
      }

      let comment = lodashGet(valueObj, ['comment'], '');

      if (comment) {
        comment = comment.replace(/\r\n/g, '\n');
      }

      const image = lodashGet(valueObj, ['image'], '');
      const movie = lodashGet(valueObj, ['movie'], '');
      const goods = parseInt(lodashGet(valueObj, ['good'], 0), 10);
      const replies = lodashGet(forumReplyCountGCObj, [bbs_comment_no], 0);
      const userAgent = lodashGet(valueObj, ['user_agent'], '');


      // --------------------------------------------------
      //   _id
      // --------------------------------------------------

      const forumThreads_id = idsObj[`bbs_thread_no_gc_${bbs_thread_no}`];
      const forumComments_id = idsObj[`bbs_comment_no_gc_${bbs_comment_no}`];
      const gameCommunities_id = idsObj[`game_no_${game_no}`];


      // --------------------------------------------------
      //   users_id
      // --------------------------------------------------

      let users_id = '';

      if (user_no) {

        if (idsObj[`user_no_${user_no}`]) {

          users_id = idsObj[`user_no_${user_no}`];

        } else {

          // console.log(chalk`
          //   user_no: {green ${user_no}}
          //   anonymity: {green ${anonymity}}
          //   bbs_id: {green ${bbs_id}}
          // `);

          users_id = '';
          anonymity = false;
          name = '';

        }

      }


      // --------------------------------------------------
      //   imagesAndVideos_id
      // --------------------------------------------------

      const imagesAndVideos_id = lodashGet(idsImageObj, [`bbs_comment_no_gc_${bbs_comment_no}`, 'id1'], '');

      // if (imagesAndVideos_id) {
      //   console.log(chalk`
      //     name: {green ${name}}
      //     imagesAndVideos_id: {green ${imagesAndVideos_id}}
      //   `);
      // }


      // --------------------------------------------------
      //   forumCommentCountGCObj
      // --------------------------------------------------

      if (forumCommentCountGCObj[bbs_thread_no] !== undefined) {
        forumCommentCountGCObj[bbs_thread_no] += 1;
      } else {
        forumCommentCountGCObj[bbs_thread_no] = 1;
      }

      if (image) {

        if (forumImagesCountForThreadGCObj[bbs_thread_no] !== undefined) {
          forumImagesCountForThreadGCObj[bbs_thread_no] += 1;
        } else {
          forumImagesCountForThreadGCObj[bbs_thread_no] = 1;
        }

      }

      if (movie) {

        if (forumVideosCountForThreadGCObj[bbs_thread_no] !== undefined) {
          forumVideosCountForThreadGCObj[bbs_thread_no] += 1;
        } else {
          forumVideosCountForThreadGCObj[bbs_thread_no] = 1;
        }

      }


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      forumCommentsArr.push(

        {
          _id: forumComments_id,
          createdDate,
          updatedDate,
          gameCommunities_id,
          userCommunities_id: '',
          forumThreads_id,
          forumComments_id: '',
          replyToForumComments_id: '',
          users_id,
          localesArr: [
            {
              _id: shortid.generate(),
              language: 'ja',
              name,
              comment,
            }
          ],
          imagesAndVideos_id,
          anonymity,
          goods,
          replies,
          acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
          ip: '192.168.1.0',
          userAgent,
        }

      );


    }




    // --------------------------------------------------
    //   forum-threads UC
    // --------------------------------------------------

    const forumThreadsArr = [];
    const forumThreadCountUCObj = {};


    for (const [index, valueObj] of bbsThreadUCDataArr.entries()) {


      // --------------------------------------------------
      //   _id が存在していない場合は処理しない
      // --------------------------------------------------

      const bbs_thread_no = parseInt(lodashGet(valueObj, ['bbs_thread_no'], 0), 10);
      const on_off = lodashGet(valueObj, ['on_off'], '0');
      const community_no = lodashGet(valueObj, ['community_no'], '');

      if (

        idsObj[`bbs_thread_no_uc_${bbs_thread_no}`] === undefined ||
        idsObj[`community_no_${community_no}`] === undefined ||
        on_off !== '1'

      ) {
        continue;
      }


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const bbs_id = lodashGet(valueObj, ['bbs_id'], '');
      const createdDate = moment(lodashGet(valueObj, ['regi_date'], '')).utc().add(-9, 'hours').toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['sort_date'], '')).utc().add(-9, 'hours').toISOString();
      const user_no = lodashGet(valueObj, ['user_no'], '');
      const name = lodashGet(valueObj, ['title'], '');

      let comment = lodashGet(valueObj, ['comment'], '');

      if (comment) {
        comment = comment.replace(/\r\n/g, '\n');
      }

      const image = lodashGet(valueObj, ['image'], '');
      const movie = lodashGet(valueObj, ['movie'], '');
      const comments = lodashGet(forumCommentCountUCObj, [bbs_thread_no], 0);
      const replies = lodashGet(forumReplyCountForThreadUCObj, [bbs_thread_no], 0);
      const userAgent = lodashGet(valueObj, ['user_agent'], '');

      // if (!name) {
      //   console.log(chalk`
      //     bbs_id: {green ${bbs_id}}
      //   `);
      // }


      // --------------------------------------------------
      //   _id
      // --------------------------------------------------

      const forumThreads_id = idsObj[`bbs_thread_no_uc_${bbs_thread_no}`];
      const userCommunities_id = idsObj[`community_no_${community_no}`];


      // --------------------------------------------------
      //   users_id
      // --------------------------------------------------

      let users_id = '';

      if (idsObj[`user_no_${user_no}`]) {
        users_id = idsObj[`user_no_${user_no}`];
      }


      // --------------------------------------------------
      //   imagesAndVideos_id
      // --------------------------------------------------

      const imagesAndVideos_id = lodashGet(idsImageObj, [`bbs_thread_no_uc_${bbs_thread_no}`, 'id1'], '');

      // if (imagesAndVideos_id) {
      //   console.log(chalk`
      //     name: {green ${name}}
      //     imagesAndVideos_id: {green ${imagesAndVideos_id}}
      //   `);
      // }


      // --------------------------------------------------
      //   count
      // --------------------------------------------------

      if (forumThreadCountUCObj[community_no] !== undefined) {
        forumThreadCountUCObj[community_no] += 1;
      } else {
        forumThreadCountUCObj[community_no] = 1;
      }

      if (image) {

        if (forumImagesCountForThreadUCObj[bbs_thread_no] !== undefined) {
          forumImagesCountForThreadUCObj[bbs_thread_no] += 1;
        } else {
          forumImagesCountForThreadUCObj[bbs_thread_no] = 1;
        }

      }

      if (movie) {

        if (forumVideosCountForThreadUCObj[bbs_thread_no] !== undefined) {
          forumVideosCountForThreadUCObj[bbs_thread_no] += 1;
        } else {
          forumVideosCountForThreadUCObj[bbs_thread_no] = 1;
        }

      }

      const images = lodashGet(forumImagesCountForThreadUCObj, [bbs_thread_no], 0);
      const videos = lodashGet(forumVideosCountForThreadUCObj, [bbs_thread_no], 0);


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      forumThreadsArr.push(

        {
          _id: forumThreads_id,
          createdDate,
          updatedDate,
          gameCommunities_id: '',
          userCommunities_id,
          users_id,
          localesArr: [
            {
              _id: shortid.generate(),
              language: 'ja',
              name,
              comment,
            }
          ],
          imagesAndVideos_id,
          comments,
          replies,
          images,
          videos,
          acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
          ip: '192.168.1.0',
          userAgent,
        }

      );


    }




    // --------------------------------------------------
    //   forum-threads GC
    // --------------------------------------------------

    const forumThreadCountGCObj = {};


    for (const [index, valueObj] of bbsThreadGCDataArr.entries()) {


      // --------------------------------------------------
      //   _id が存在していない場合は処理しない
      // --------------------------------------------------

      const bbs_thread_no = parseInt(lodashGet(valueObj, ['bbs_thread_no'], 0), 10);
      const on_off = lodashGet(valueObj, ['on_off'], '0');
      const game_no = lodashGet(valueObj, ['game_no'], '');

      if (

        idsObj[`bbs_thread_no_gc_${bbs_thread_no}`] === undefined ||
        idsObj[`game_no_${game_no}`] === undefined ||
        on_off !== '1'

      ) {
        continue;
      }


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const bbs_id = lodashGet(valueObj, ['bbs_id'], '');
      const createdDate = moment(lodashGet(valueObj, ['regi_date'], '')).utc().add(-9, 'hours').toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['sort_date'], '')).utc().add(-9, 'hours').toISOString();
      const name = lodashGet(valueObj, ['title'], '');

      let comment = lodashGet(valueObj, ['comment'], '');

      if (comment) {
        comment = comment.replace(/\r\n/g, '\n');
      }

      const image = lodashGet(valueObj, ['image'], '');
      const movie = lodashGet(valueObj, ['movie'], '');
      const comments = lodashGet(forumCommentCountGCObj, [bbs_thread_no], 0);
      const replies = lodashGet(forumReplyCountForThreadGCObj, [bbs_thread_no], 0);
      const userAgent = lodashGet(valueObj, ['user_agent'], '');

      // if (!name) {
      //   console.log(chalk`
      //     bbs_id: {green ${bbs_id}}
      //   `);
      // }


      // --------------------------------------------------
      //   _id
      // --------------------------------------------------

      const forumThreads_id = idsObj[`bbs_thread_no_gc_${bbs_thread_no}`];
      const gameCommunities_id = idsObj[`game_no_${game_no}`];


      // --------------------------------------------------
      //   imagesAndVideos_id
      // --------------------------------------------------

      const imagesAndVideos_id = lodashGet(idsImageObj, [`bbs_thread_no_gc_${bbs_thread_no}`, 'id1'], '');

      // if (imagesAndVideos_id) {
      //   console.log(chalk`
      //     name: {green ${name}}
      //     imagesAndVideos_id: {green ${imagesAndVideos_id}}
      //   `);
      // }


      // --------------------------------------------------
      //   count
      // --------------------------------------------------

      if (forumThreadCountGCObj[game_no] !== undefined) {
        forumThreadCountGCObj[game_no] += 1;
      } else {
        forumThreadCountGCObj[game_no] = 1;
      }

      if (image) {

        if (forumImagesCountForThreadGCObj[bbs_thread_no] !== undefined) {
          forumImagesCountForThreadGCObj[bbs_thread_no] += 1;
        } else {
          forumImagesCountForThreadGCObj[bbs_thread_no] = 1;
        }

      }

      if (movie) {

        if (forumVideosCountForThreadGCObj[bbs_thread_no] !== undefined) {
          forumVideosCountForThreadGCObj[bbs_thread_no] += 1;
        } else {
          forumVideosCountForThreadGCObj[bbs_thread_no] = 1;
        }

      }

      const images = lodashGet(forumImagesCountForThreadGCObj, [bbs_thread_no], 0);
      const videos = lodashGet(forumVideosCountForThreadGCObj, [bbs_thread_no], 0);


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      forumThreadsArr.push(

        {
          _id: forumThreads_id,
          createdDate,
          updatedDate,
          gameCommunities_id,
          userCommunities_id: '',
          users_id: '',
          localesArr: [
            {
              _id: shortid.generate(),
              language: 'ja',
              name,
              comment,
            }
          ],
          imagesAndVideos_id,
          comments,
          replies,
          images,
          videos,
          acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
          ip: '192.168.1.0',
          userAgent,
        }

      );


    }




    // --------------------------------------------------
    //   recruitment-comments & recruitment-replies
    // --------------------------------------------------

    const recruitmentRepliesArr = [];
    const recruitmentCommentsArr = [];
    const recruitmentCommentCountObj = {};
    const recruitmentImagesCountForThreadObj = {};
    const recruitmentVideosCountForThreadObj = {};
    const publicCommentsUsers_idsObj = {};

    const gameNoCountObj = {};

    const recruitmentComments_idsObj = {

      // 返信 : コメント


      // プラントvs.ゾンビ ガーデンウォーフェア
      'a0xplrcj2db65qgu': 'cscn4284xafzskab',
      'zejon6ollakxggau': 'cscn4284xafzskab',
      'na8tz9yrpr8zsz2q': 'cscn4284xafzskab',
      'dfy4am2sjd3ilbh8': 'kl2su8o8fptrsib1',
      'ayulu9l7l7avt1hj': '6eleoe3uu4vejabj',
      'ewwhd8w3pz7rlqhf': '6eleoe3uu4vejabj',
      'b6re306gtunpdnkq': '6eleoe3uu4vejabj',


      // PlanetSide 2
      'b7q7s53d0vytpnvd': '4z3pyb5aiz6l2u2m',


      // ドラゴンズドグマ オンライン
      'irjnm3t4pycz0jpo': 'wu7tmzelttv2l2zt',
      '0mqr0nl846sfkepx': 'x3pmtslos55ueubb',
      '4snjdkleu3et4ug0': 'btdkug4a6zoumn6e',
      'fe55xsszveq9sub4': 'btdkug4a6zoumn6e',
      'esy35e6zc6gbc3z1': 'wqotrlrx4a2cbiib',
      '3x10ozgeqqc83f7q': 'k5k6v5e54zqsrp6b',
      'n1nv636nytvjor3d': 'k5k6v5e54zqsrp6b',
      'rt2uq5p66i06f299': 'e1ilzwqbwdfazmx9',
      'bputpkm905wwq3vu': '4r5mo7b3qmqo6vs5',
      'hh7dk9scth6jx8yv': '92klip5iizv8fj0e',
      'o0lxlvsswyqycp1q': '1udhzq1q9lxzazta',
      'io2ue5m9nvm2x0qm': '4egmh3dulnq0uesv',
      'xayddixrsjcm2lgm': 'pi921meynzpbq9iz',
      '7rgpst67c0npj9a7': 'nzz4633tuxv36lt6',
      '0zkzlmehyy1wf0zu': 'tj5mstn9if7rm3kz',
      '3k56683ch9lc343e': '1e3vcindn04221qp',
      'z7ntxjaybi2h9ulw': 'qefo3mv9jg18k8v0',
      'yqvqk0fijogr6of3': '4emso3fddwz7zhyb',
      'fvh679m8jzknkkqd': '6yojkk71xcupy01k',
      'u76y7dy1letae6gf': 'gr5hljjmr3auyswk',
      'cb6tu3tmcl5766ja': 'bi3uyjogh0byqgxy',
      'jdxtk98lvl7oj0t3': 'bi3uyjogh0byqgxy',
      'xbegmpqx3tgrz9pb': 'ny2quow5uvw214gw',
      '9rl96vrb7fopks5u': '5c76eq3pruufjt4q',
      '5pulpni99w05zozi': 't7xehte6nuz52l2z',
      'ujl0ua9eya2qbeeq': 'tzz5qk3zmb1v6e4q',
      '9m3rzqxltnziwu2c': '7qfe4jgfid0y2t0j',
      'lmmaf3iioocpbltc': '7qfe4jgfid0y2t0j',
      'kyfmx58lhzyberq1': 'athxsxte9w7fk6w5',
      'o1d64i6q4srniczs': 'iewc4v491rz8c2vb',
      'ngul3y8yktwsuig7': 'ani4zid96an6b4tr',
      '7de5i4d3jxwxek8y': 's7hczlxpw7q3p4nb',
      'cc574yiaa7umqggb': '4cenpqn8opm0w4jn',
      'jsjtxdt15u8o9s6y': 'f77cta9jlr9daplb',
      'nkq5vd9u4ktcsh43': 'ggs70rm9wq6hoi0v',
      'g034z1gm7xm9d5em': 'lptkbb7tt78hyvry',
      'u87on24rr9ujesmx': '2qjiqogt21ocak19',
      'sewx1w1w6u3l3ds4': '48rlkuj1hmsawxes',
      'tcsc1cyeskw5b6o0': 'jfgxl6p7ud9svqpa',
      'yh8aimlvej70hgo6': 'bz1yqkgk4458k012',
      'wef7wtuwcdw3kivy': '89jlafegfxwlfed6',
      'l0ybyjvmecf3xacl': 'jhic4geufgell4i2',
      'uvn08tkv0ixinvb8': 'z0tlt9yg7vrmvgaw',
      '9tlk94ve2obdz9oi': 'feoo0xlyphun1c38',
      'ntr4i4e4dzv25jct': '61xe0e35dzr48vix',
      '3gg1x0upovbg19tq': 'feoo0xlyphun1c38',
      '02c9su47x6fjth2d': 'usbwryud0isclzk4',
      '247ql4pkvko1394z': 'k5v4h5vc9s2ldoaf',
      'a9dbobl35t8mnfxn': '66s6y4mela4jvlkn',
      'npsyitga1uxzmcoa': '3n3urwnmuagdwxpo',
      '4rm72nxi89k7xo8c': '4cx2vbd8656soswb',
      'zdzt0xlgw62x4g23': 'vk8z1g1b4ke2vex1',
      '2293s5fpr4viue69': 'vk8z1g1b4ke2vex1',
      'rrnd0jo92773zrzp': 'vk8z1g1b4ke2vex1',
      '54kr1f1ku82av3e0': 'd1pzg1z9tztmlakw',
      'i1ij8rkueep730ye': '62bl24t24ij1iym6',
      'lz96dcskmg5gjkuw': '62bl24t24ij1iym6',
      'eegxir5cmnzlyx8r': '9lh0o7m5ls48suit',
      'o4rwv3p031vckev1': 'f45dlrvokddf4ge2',
      'd4vkx3v4iqyey0bp': 'f45dlrvokddf4ge2',
      'd77mfsaxi2jnta0d': 'uabl6fdtlagxkgsj',
      'r5olv3846igv514i': '8rjz8tpzghw9igej',
      'i66zms31b5hinams': 'iswpigq15qbte9zt',
      'spxr4c7et1baqtdc': 'iswpigq15qbte9zt',
      '7tjmgep1bh989rpp': 'iswpigq15qbte9zt',
      'ke1pq89aue8amugn': 'ygj8vbkun9ayofbm',
      'zmef49bkkatk4x1s': 'bsg9j2npdqzanxjc',
      'k1p3jlemausv0j5a': 'bsg9j2npdqzanxjc',
      'gloy9lxbspo90sj6': 'u4mgte454j3zo3sy',
      'uh6veko83it6ov8q': 'u4mgte454j3zo3sy',
      'y83honqjsa43mzi6': 'mr2vqlf4gi9fuipm',
      'rz79vz9pis44vp7v': 'mr2vqlf4gi9fuipm',
      '6rr7vqbsd3ffn4r8': 'mr2vqlf4gi9fuipm',
      's3oloab58vahjksp': 'ytp30pyy1q5uoclt',
      'yxa4ouxdqr9u1io9': 'ytp30pyy1q5uoclt',
      'egujbsckprbdu94n': 'ytp30pyy1q5uoclt',
      '6e7nugda9i4jlzl7': 'sdb089a84gmfx0wb',
      'ee9xo8j5shmwwgdw': 'fflx5pm5ojoyaqyd',


      // Agar.io
      'y78kfl5c83o57a3i': 'lfq0kr8ove5c2w3c',
      'yh5m1a22vfzx6oy7': 'lfq0kr8ove5c2w3c',
      'gjz70nn388yk3536': 'lfq0kr8ove5c2w3c',
      'iirnnvrw8347nakt': 'ah6urr2th21jc6w2',
      'm36p1nfp9i0qfws0': 'ah6urr2th21jc6w2',
      'sy83xb5l070aycsv': 'ah6urr2th21jc6w2',
      '67u1zan5u039z5iu': 'ah6urr2th21jc6w2',
      'jv3i12dqrmqmrhtk': '9s9yqhouky6b07cq',


      // ポイッとヒーロー
      'jpo0jaxot4w19eca': 'qefiptko3wuxw7vf',
      'lci1xcm2fwo0faa4': 'qefiptko3wuxw7vf',
      '5ifiuo15x6mid3ka': 'xca3sfl08tcpx0wz',
      'lpvprf83wfsu85hq': 'xca3sfl08tcpx0wz',
      'g8b00awwk076vxjc': 'xca3sfl08tcpx0wz',
      'ot5a4qf8qw1d1tjj': 'n43gvrwzezpr4qnb',
      'adnjc7fpvzr4pfc8': '8om0ysv8eq59q9p4',
      'sylh0ecs48o10uv9': 'fckh6xahmmq9n23v',
      'gfu5smgshwzxs1nf': 'xojlh1pzh1cykgyi',
      'jxrievas9rm4z4y6': 'lik4nbi9pccb5kuh',
      '6z0pp1tpflad6eie': 'lik4nbi9pccb5kuh',
      'w4un2dovbrib9d1g': 'clc49htoiplcmvby',
      '0n4apby8dprzyzxg': '5emww5dmrx0q3vde',
      'o94w2s34kj2ivgln': 'ia3rkj07v8hcmmar',
      'hj2ln7m3k050kvgl': 'y6gf6csmjq5x6ltu',
      '70bds0x8szlr2h54': 'y6gf6csmjq5x6ltu',
      'mwey4w51ge62xgb4': 'y6gf6csmjq5x6ltu',
      'dkdaurl640z7xsgf': '1qmnhjjehr03uqsj',
      '5l3njf6zc2kg9h3y': 'yvhsao54jj7vcjbs',
      'kee2rxch34xq33us': 'yvhsao54jj7vcjbs',
      'a12xajyq7bmugrct': 'i4jqeskyd4ucy9kq',
      'm7vm6ksfypxhgfed': 'i4jqeskyd4ucy9kq',
      'p3m6u7v8cn5bmvn2': '50646qgnpigo21qp',
      'm6hxopmgzwoilfep': 'ymtq9tym0wk21luv',
      'n08n9uix5khmwi1a': 'j8fk6321cw4uae7a',
      '1i3ofa9129z75c7o': 'o55ib5pxerjw1dvn',
      'g8svav14tfghy8i5': 'g97d9lwiomokuz4v',
      'yyquzp9a7i1jmtba': 'g97d9lwiomokuz4v',
      'j4e0jvdprcqvugxq': 'g97d9lwiomokuz4v',
      'kv7hk3lx21wsj9hv': 'n3vbk84jegnuhv5s',
      'b6gmv36ihlrz71o5': '37kf161e2qwkkxw6',
      'cpya9a2a55kx9g7p': 'grt5o4xj78qf8cf3',
      '3mkp2392c9wrndos': 'fl9znoxh7om1p29r',
      'vex0u4br8hsd23fg': 'gmef7fwrk3m36c9i',
      'jfgpykbn4p0jznha': 'zlfwpf9whpme25e5',
      'ky143bse1rsvnkpm': 'qtt7on4bcqliskpb',
      'j7jba95rc3m3updb': 'qtt7on4bcqliskpb',
      'x7ykf41ypg6vcq5i': '3rs4wcbqoih0wkby',
      'spb8btrg90h9uquw': '3rs4wcbqoih0wkby',
      'bp2ccxljja8dpo1s': 'aw1tcj0r1wz4dwut',
      '714cch0mrt4434gt': 'aw1tcj0r1wz4dwut',
      'k9o840yeq4z43l56': '2zoppt7vrhp2kbf0',
      '5gocu6xoq6bthwhh': '2zoppt7vrhp2kbf0',
      'pri3dk5bar0ncvyh': '2zoppt7vrhp2kbf0',
      'f2q4alydwzw0dov1': '2zoppt7vrhp2kbf0',
      's3smj8gdosm8ppll': '2zoppt7vrhp2kbf0',
      'mvwgns02xtvmjzqm': 'qylv3k8k7z09gljs',
      'l7qjhqaxm9emcngd': 'qylv3k8k7z09gljs',
      'hxhwxj4yclwn3we4': 'b4gyo6c2ed425vdm',
      'sy9x7djygqyrrtbx': 'rc5iv628lkyjb8cb',
      'gzovo2xi7rm7pmks': 'rc5iv628lkyjb8cb',
      'x2e8dkoqr4812rrr': 'rc5iv628lkyjb8cb',
      'tbzb6e1yqua7o11p': 'jqhw0gu2ppalew09',
      'vq562vgukmkx0gb7': 'jqhw0gu2ppalew09',
      'cbuuxy91o2ja7f36': 'jqhw0gu2ppalew09',
      '694gva7n8jf4zchh': 'jqhw0gu2ppalew09',
      'n9n4rnn59200f149': '7572n0yijzj6j2ft',
      '3guut4r1u779qjd4': 'uf6wccvrszcvwf2l',
      '4brhvi21jjb7m24o': 'nlrrll9dj04jr1jt',
      '47cz8nw8il7pc10p': 'nlrrll9dj04jr1jt',
      '8j7cs0vyd3z05w8g': 'ekth3xzub3gpyrl4',
      'd9odt0acy9lgyef3': 'ekth3xzub3gpyrl4',
      'ffktmcsik4fersgh': 'ekth3xzub3gpyrl4',
      'tbkljmh82rv8kvif': 'gskvcuk8xy02diec',
      'h0p4txh4uyqnchqg': 'gskvcuk8xy02diec',
      '6zon0ol65uif7qhi': '7vn3gewcmwpp93fs',
      '4xoi4nv8xr0tnmp1': '7vn3gewcmwpp93fs',
      '35qh5lslkbvy486d': '7vn3gewcmwpp93fs',
      'jpet7ybf8iyu3r92': 'mjw06ttpuo5u9reo',
      'shnu3y1mdmpg063a': 'yr11slhpqt3el22o',
      'plk23id86m1inegv': 'coa0uormhk8w3bsf',
      '5ygg21w2enttdnh1': 'coa0uormhk8w3bsf',
      'orv28m375cusczi0': '7lxcugi0kwni4wm6',
      '0xh4ar6kskvxe7ka': '7lxcugi0kwni4wm6',
      '1q7kgada5tcbdpgh': '7lxcugi0kwni4wm6',
      'edc0ohhp9xxpuchv': '7lxcugi0kwni4wm6',
      'sphj4cz1b4uw40dt': 'dk1yf34hdf4uba0y',
      'd8e7k51a0jyt5y1k': 'tedtjuipyw5i3q81',
      'ohd9x4cdr09o41pb': 'tedtjuipyw5i3q81',
      '3dntxe4d44s7ltvs': 'tedtjuipyw5i3q81',
      '868psn1d3pye5kxh': 'tedtjuipyw5i3q81',
      'yinqka09qvvg5qqj': 'umvdhi3jgge0k86t',
      '78xbdlro3jxg7slq': 'qfq4nqgecerrekvn',
      'g66lod3a68zmpx2k': 'm4qga0t78w427gdn',
      '6zgut30yg4e4v4ho': 'nn9q53et066skbsi',
      'fy9binfgmburwx33': 'k2wbufuoyce7x6tc',
      'catuy1ve94z73m24': 'qzu6x49qnzzg6f7u',
      'cdbvwzpjxcu3tanu': 'rvpfst9ejecz1xlj',
      'k88d1vouzs8q188o': 'telp960nwg96llie',
      '58lkmx6xijgrc6d5': 'i8xobcdahkowdt3w',
      '37w9q2d5pqf363gv': 'i8xobcdahkowdt3w',
      'kukzz900mhsfu5h3': 'i8xobcdahkowdt3w',
      'mdudhiwf1q4nosuk': '2mw1zly9bgaguiil',
      '8k05m09bw1k7l00u': '2mw1zly9bgaguiil',
      'ksz5gsn6jas212v8': '2mw1zly9bgaguiil',
      'vixq1ri962o6pyvf': '2mw1zly9bgaguiil',
      'picvdmfj3nnh9y8c': 'ze7b3025oglbvws3',
      'nhxpo3kfu7bygsgz': '71wxqw2b3u3rwiod',
      'd2jrmosb9qvit3yd': '71wxqw2b3u3rwiod',
      '6qhis7o0l9bqrrd0': '71wxqw2b3u3rwiod',
      'b7coobig38zp0n6y': '71wxqw2b3u3rwiod',
      'rl220jj0yu1ic46a': '71wxqw2b3u3rwiod',
      '3ehybpbpmqao5i7j': '71wxqw2b3u3rwiod',
      'xfl55brn1zgwf7b7': '71wxqw2b3u3rwiod',
      'hd8fq6go7aj1cfy4': '7zriglrc1q1vitdm',
      'l1zn9sc353s9b6ua': '7zriglrc1q1vitdm',
      'lls4zxdkkdy1kulw': '0w44fnzf2ap6a8sz',
      '67ldi7l1el7ljdho': 'm0j5ypaw85141m7m',
      'mq8p2wyvvjk5u666': 'h83jw4mpi0ov7hjz',
      'kfisuhzjg804e37b': 'h83jw4mpi0ov7hjz',
      'xti2gq7tov8whzic': 'h83jw4mpi0ov7hjz',
      't72b29rqfx0tr3s1': 'h83jw4mpi0ov7hjz',
      'o71jfbakf64y3a4x': 'h83jw4mpi0ov7hjz',
      'a0jizz4fya9tzh5w': 'h83jw4mpi0ov7hjz',
      'is59wxa3conkei4e': 'h83jw4mpi0ov7hjz',
      '8wcosayojqhu2sb4': 'zhjqojmq43kpjp00',
      'tca7t40iteitgspp': 'zhjqojmq43kpjp00',
      'vpfnbzimye1nna2u': 'zhjqojmq43kpjp00',
      'cpt9zb3lvtpfcm8y': 'zhjqojmq43kpjp00',
      'rl2lu0g17sfzvss1': 'uylmwud893nb8bra',
      '7e2hx31xnb6e5ima': 'uylmwud893nb8bra',
      '5wum7ijkir96zr2n': 'uylmwud893nb8bra',
      'jsv6d4at7tm85dcs': 'uylmwud893nb8bra',
      'nrf7wmpdy5ev7980': 'yhupe82h6pd3rtkf',
      'u1vo6cla9gyf5ks9': 'yhupe82h6pd3rtkf',
      'a9ozfajppbvbo09h': 'yhupe82h6pd3rtkf',
      'hcy5gy1akl856z97': 'r2ldmpa5mdvdm9p2',
      'jhywuozyi8wu629c': 'r2ldmpa5mdvdm9p2',
      'kehu11zcvl2bzcs0': 'mwzxbgdrm2msfcho',
      'pj7mjglkmbl4qqgw': 'oqvqq7skrkncum2a',
      'iegohf1cyv0lomab': 'lsn7pgvteho4noqo',
      'mut2ecvehkwnpto5': 's3nsa3soy8itx2yk',
      'j680vn7sc8fsr6bz': 'ulzqsy5v8uhsdd43',
      'xc2ny85r61cf0bh5': 'ky92zhh12vnkjwd3',
      '23tmtl3h644nwy7p': 'ky92zhh12vnkjwd3',
      '7rbyh5bo5e7rl8fr': '6uyss4dz7yk90qxg',


      // Everybody's Gone to the Rapture -幸福な消失-
      'ah1uh8ecxlcb1u7e': 'kehfoh6k2gwxboi4',


      // モンスターハンター4G
      'i03bv4y908x76tr2': 'vs3eugz1wvcrxc52',
      'zmdpm2x7p3qrk331': 'vs3eugz1wvcrxc52',
      'pf7ksydydt9yatad': 'vs3eugz1wvcrxc52',


      // Fate/Grand Order
      'ovgb1oc3duqmamb3': 'nmtf558su9hob7oi',


      // Hearthstone
      'o2xglga29ba0soua': 'qp6fu12smu7fg1jt',
      'negp6zwg4izy1jhy': 'qp6fu12smu7fg1jt',
      '8svoekvxhn3hox4e': 'qp6fu12smu7fg1jt',
      'omvc0nexazy3uuh3': 'qp6fu12smu7fg1jt',
      '318x3k4dg22soc04': 'qp6fu12smu7fg1jt',
      'kv917hw5wh8t1j97': '51e78ixj2apvvciv',
      '9lfwrnvrxoum0etu': 'h1nc240l55crai63',
      'al8q37y9g0u7ogwk': 'vqntyw2wyjq4yxeu',
      'aljvjsktan5vbwr9': 'etjx7b8n217vovid',
      'kea10gqzyglu5xcr': 'x7xgugmxxs6vpnh1',
      'p5g1cy0lt12xtalj': 'x7xgugmxxs6vpnh1',
      'df61feetl82l9glf': 'gqdzcnvo15fk25x4',
      '8h7zdqp0ufthvi5f': 'uwhik4wb64moyusu',
      'moqa704ewzb0grke': '09ctis9kkjlatr7x',
      '4k1ylacha5f8a01c': 'ox6gjpl5ttj7opx7',
      '6gegttxeobbj1zvb': 'ox6gjpl5ttj7opx7',
      'bgrisbgm2ll9tlr8': 'ox6gjpl5ttj7opx7',
      'gahtm9buogddah8w': 'ox6gjpl5ttj7opx7',
      '8tnn22gnj07s0y13': 'pua5nxnlkhpa6m6d',
      '0tylv6cafmyrwrsn': 'd8z8xp6mki094cnp',
      'fdjkj28wx9m5jkf1': 'u34es2avf7csc4p0',
      'h2irrz21twgl4mvs': 'l2rrkw8tp4k07xy7',
      'o3mwi6gew5rrcnis': 'gqb0sdwc2sqlxlkf',
      'rp25s1g98qlp9wne': 'hgsz0xk68f0o69s2',
      'lg899l56lrorc61m': 'hgsz0xk68f0o69s2',
      '46gkl0l6tv3k0ozu': '0ny7pi6fs5urmnjb',


      // ララ・クロフト アンド テンプル オブ オシリス
      'mlc6boecbcei7r21': 'vcejshkh5nkqc4o7',
      'afoxxxq37hf93va4': 'tfib7gyje6hh5q5o',


      // Call of Duty: Black Ops 3
      'qepeikymq2go1m3b': 'fbpvtpcy265lwzer',


      // 崩壊学園
      'jmaf24jp386675co': 'gwq6hmc11u28jkha',


      // ファイナルファンタジー ブレイブエクスヴィアス
      'uc3knmg20vw6q2ok': 'ke4q7omtj4ldxemt',


      // シャドウバース
      '2mekx3ieam1q6qcq': '74o6lgvtvp9irv8w',
      'xfiqbraw154k6fdl': '74o6lgvtvp9irv8w',
      'jlir7l026mpbf5gw': '74o6lgvtvp9irv8w',
      'n8upl38mvr87d1le': '74o6lgvtvp9irv8w',


      // レインボーシックス シージ
      '0ulmlak0emv7ice0': '9hyavfyl9vq9ap7j',


      // ぽっちゃり☆プリンセス ～メタ冒険～
      'wsqepq92lzq7wlt8': '0ig67r58l5a5fsng',
      '694ubg44ugcm0zgq': '0ig67r58l5a5fsng',
      'qmfb6rydsr4vx4oe': '0ig67r58l5a5fsng',


      // 新約 アルカナスレイヤー
      'a6cjsn10clkpiaoe': 'qjpo4p7celreetxc',
      'wia0vmg846epkq93': 'qjpo4p7celreetxc',
      '1wzdoe5jsi0wqjkz': 'pg8q3fl76eeu4ake',


      // ディビジョン
      'kf6emlctm81ln0gq': 'h8n9wvgj6wsizipc',
      'wkixcr6gsqds242v': 'h8n9wvgj6wsizipc',
      '2zn7oc18c8osqrf2': 'h8n9wvgj6wsizipc',
      'bocxkyjxzpb805eg': 'f9e02zi5534opuuv',
      '0l652d4sz956be5e': '6rav1f49i5mm2tdq',
      '62kug573og87qzqs': 'aenmognxktt7nasu',
      '2d3t8nn7hyvuplnr': 'mlivf8e43y3qzp9z',
      'r2v7u0zs5zeqkait': 'mlivf8e43y3qzp9z',
      'aiqu1jhv9djw8j7c': 'mlivf8e43y3qzp9z',
      '1tpvustyk1mh00g0': '94mul018vv4hsr69',
      'f4tzo7qdk13kww5f': 'pwkf46k591fvq3cw',
      'yl5qyg6uqbbxavzh': 'b0ntjdwt0nrxjtwo',


      // タップクエスト
      'cuwd5r5wd3fc8cr4': '1jmrofajjfgjl5o8',
      'oxra0aketwqp42bu': '1jmrofajjfgjl5o8',


      // ドラゴンクエストビルダーズ
      '3k21me5kijc4nfkf': 'hfuhdzqth3ilwf9a',


      // プラントvs.ゾンビ ガーデンウォーフェア2
      'u14wghxd8kiyg1f8': 'dra1qcd98x3yc5rh',


      // ARK: Survival Evolved
      '4pajnks0da23o468': 'cf3dk9bvfjwwcbnj',
      'y7iwd6va6fk3pf4n': 'iuhslahdpbwjvd7u',
      'wy1c2bfdhiji4o8z': 'iuhslahdpbwjvd7u',
      'j35161qry2g6lq6l': '46od66k8ezpnog9c',
      'cpbl4of414u96pg3': '46od66k8ezpnog9c',
      'zwhxq8mabr8zhlma': 'bat1nuon16lmwcdy',
      'franpj52jh4751re': 's2xvrydx0o4cnqf7',
      '7xow308fp4ufcxab': 's2xvrydx0o4cnqf7',
      '1l0whfgxppmh3ya0': 's2xvrydx0o4cnqf7',
      'dd1hakmdpdrnvyhk': 's2xvrydx0o4cnqf7',
      'kqk4upeiajeiie78': 's2xvrydx0o4cnqf7',
      'shnc6hc0mbaxyyeo': 's2xvrydx0o4cnqf7',
      '6yar5m0emy85swdi': 'jyaxvq86gpox5ryd',
      '7b9wf4cr9ghxqqhf': '3hxs6qqh2yn6eo8c',
      'n6r2hsaub512newr': 'e96qcnim4sxbqdkc',
      'ghw67vvbb2jb945s': '08hxwklv57s9o81o',
      '2pdpbfkjuwjes2e6': 'qiz5ds62lrj0kdab',
      '90wxd78otzh659lu': 'qiz5ds62lrj0kdab',
      'rxwzgn44vr3ln5ho': 'kf4fg90wfsjpt7xp',
      'ocyh40jll2xh9aey': 'kf4fg90wfsjpt7xp',
      'y59qqguzoyxsjtwc': 'ymxih5rm2pw76e1v',
      'l1zp775bhuwkwunb': 'ymxih5rm2pw76e1v',
      'gpsmpm5jpablb06j': 'c6x8uiz53scpkqnt',
      'u4clt97bf2u3ojie': 'c6x8uiz53scpkqnt',
      'xozjtamjbmhj4nsa': 'u35t00kn9nnu5mla',
      'lzaa8hjmk5m9tgtp': '1fbojocrldirxw8t',
      '8s8nohikwwor95z9': 'j36fd4p8jkhvyvmd',
      'mkt0wac5xu5exayc': '8y0wxlq389tqubob',
      'wpdjed1p1h1kpra0': '38sdi6bq1k5hrpzz',
      'l4bfsbz8unvo53ek': '38sdi6bq1k5hrpzz',
      'wkbrep6khzudeneb': '38sdi6bq1k5hrpzz',
      '0mg39113fcnacviy': '32scgof3tkf6anv8',
      'fr1u6rt97nn729mb': '32scgof3tkf6anv8',
      'gaiy6lwr8y9ov3h9': '6e0znyemxgln1c3a',
      'jzll7ztgjd9djn63': '6e0znyemxgln1c3a',
      'ljf7mn9nvxxcjhil': 'nidqinxiyqn8axka',
      '4sm19tgcvz5hevb9': 'nidqinxiyqn8axka',
      '3urfazf2awvib242': 'ozqvrb5yeqksli2l',
      '43p07ba606b4zuds': 'ozqvrb5yeqksli2l',
      'yapvq648cu6ktcw2': 'k7fenzraqwzf0hau',
      '933h897z5jz24wvg': 'cxjcuyhtnvozg8a8',
      'uhlo0hzaowda40bo': 'gje85sob6gnj941u',
      'un29gdad1q9jgt0l': '8owp4ybla3wxv8it',
      'iebuodeccirinuof': 'wpyg0jpdgj56zv63',
      'uac6z83s3frsngk8': 'd3h67pa0ors8tiaj',
      'gnjf8mn4tb0ytwf9': 'd3h67pa0ors8tiaj',
      'nmh3uwwq60ld9nuw': 'd3h67pa0ors8tiaj',
      'a76fd8xmqukh8258': 'd3h67pa0ors8tiaj',
      'wztaeckc16ji9ve6': 'd3h67pa0ors8tiaj',
      '07v5ck1vswo22920': 'd3h67pa0ors8tiaj',
      'dfnsu91ac5ahlqw4': 'd3h67pa0ors8tiaj',
      '0do4ldu0p5oc9j64': 'httxadg666tc1ckm',
      'wsvkeiyxnp0bcb1v': 'e9b70n9co5stxcfc',
      's9z9b5hhj96k9im7': 'e9b70n9co5stxcfc',
      'b3kviuqx0kyo9yue': '08ewct43c0pd1942',
      'o931hbl5w6e7n088': 'y2cv1oe0htb40kpe',
      'pnpogzrjbn3zlc8x': '7w5f2iqv8a1jjylq',
      'xe2cssu1e61qxww5': '41na4lxcf5h751t6',
      '9ae964x4g95y15ul': '41na4lxcf5h751t6',
      'tlzjhm1wqgzr7uty': 'au7jpy5wd5hqfkbq',
      '1r8426duyvfdujn1': 'w1zwbss9d6qdczkc',
      'hzhu1vto5svowjeu': '3zqguem8rsf23n4z',
      'yo5rhj7d68ajkw20': 'uszdu53krzil4o32',
      'zk3oogx5zm0jczia': '1rxivzsnudz57ncg',
      'sv4yj5y2wilpeg49': '1rxivzsnudz57ncg',
      'crvdxkjme55a3bb3': 'v13ykk4dn71kbgsq',
      'azjlno45kkrl297q': 'v13ykk4dn71kbgsq',
      'q4lmj7scljlh1mi1': '6iyszi6k3773aqcw',
      'wo8iq0rlm6duu66e': 'nwly7vb3ublkczbu',
      '5vbzxwi1qop3pb8u': 'nwly7vb3ublkczbu',
      'zrja8zgwzj602acj': 'nwly7vb3ublkczbu',
      'e9y7ouloq8k3u4qv': 'nwly7vb3ublkczbu',
      'rwq60u2am1i093l7': 'lihx2syhm33t5ylx',
      '4u72h3a3ht1ygdfx': '11m7svd8bu1u8aei',
      '7sjwh4mfw6xmz8ct': '11m7svd8bu1u8aei',
      'jcynllhajwtlvxkk': '11m7svd8bu1u8aei',
      'vv9k5czb9nxas54r': '11m7svd8bu1u8aei',
      'yaxzp6uvob3wlitn': '11m7svd8bu1u8aei',
      'snup391a8bvnwtvx': '11m7svd8bu1u8aei',
      'p3urzysiadsfydcg': '11m7svd8bu1u8aei',
      'pnjxs5czle2lz4fl': '11m7svd8bu1u8aei',
      '0rjsuq5o0t70v7oj': '11m7svd8bu1u8aei',
      '1l1p2jamcusmo6ry': '11m7svd8bu1u8aei',
      'y5abi19akotrvv1h': '11m7svd8bu1u8aei',
      'eygj0bo1r02n5vsk': 'bdlo4u0zc26a4ryt',
      'kv5n8a2s6957ptwt': 'bdlo4u0zc26a4ryt',
      'zmvi4q8852rku0ce': 'bdlo4u0zc26a4ryt',
      'dvgjfzam0hdq3urt': 'bdlo4u0zc26a4ryt',
      'g2utg5vzn4id0u0u': 'bdlo4u0zc26a4ryt',
      'usp283nfx7s3hlys': 'bdlo4u0zc26a4ryt',
      'm58hjq8rsegxpajb': 'nh1yp3kziu84fpx6',
      '56iaymeozptzcgbw': 'nh1yp3kziu84fpx6',
      's81qqm3pvp2xk8bb': 'nh1yp3kziu84fpx6',
      'ahw0yne3o7ogrgeo': 'nh1yp3kziu84fpx6',
      'edz5j59n2ghvf5a3': 'uz8w76sta8ecjvg5',
      'pvz3bsjq15s5c5uy': 'h6bsw3fglg8cs4bq',
      'rus0j8r5lpnumg5s': 'h6bsw3fglg8cs4bq',
      'b5g7uohu4jgxz8kn': 'xtti1yfdcw7bdf4g',
      'skxdn1ld6gpwtv58': 'qvz1bstul5x1dizs',
      'o4e4xrpcjcasji88': '03l5sdn2rfb6186z',
      'mjenurtwh0dy6wyh': 'prnnfzykquz9vr97',
      '7dnba88uyhcvwptb': 'qbwujykjiekj4fqc',
      'spuq95q3oj0oem1u': 'xpvk6qsuibb4mvv8',
      'nhskty2zb9iotrq7': 'xpvk6qsuibb4mvv8',
      '0wz5syn8hmrpb1xj': 'xpvk6qsuibb4mvv8',
      'qqzc5wth7h50rdnr': '0sc6us8bsp83t861',
      '0x78dw6g3cxocopd': 'zny26pd16qpfs56b',
      'zky0kj152to79rrc': 'zny26pd16qpfs56b',
      'k9j36npvszhy7g7w': '6fo71hh4bhi5llgm',
      'kxu4qpa8gj5pvbsz': '6fo71hh4bhi5llgm',
      'om1364gm2ol3wpev': '6fo71hh4bhi5llgm',
      'cp6ysyrp4r9t88nd': 't883lyf0e01ahlda',
      'zc1qf8s1qsfmnojc': 't883lyf0e01ahlda',
      'i7lhum73li25mlnh': 't883lyf0e01ahlda',
      'tbe7hq0v0rzi3ff3': 't883lyf0e01ahlda',
      'te0c7ddhwyuz8o9z': '6iv3mwlofxaqn278',
      '3b8p1mlbpx8m1l4w': 't8mm5feh6vny5w3q',
      '9vvrr5ts1zlgkb0v': 't8mm5feh6vny5w3q',
      '4bgy25n5udw5tqif': 't8mm5feh6vny5w3q',
      'g3cgpngu10p2ek3b': 'y3cyqsac3l2hig9v',
      'znihcsbbkjibklw4': '0akgvfg8gersm28i',
      'epr2yq6ad2oq90eg': '0akgvfg8gersm28i',
      'zgkjgy8iib5oq81i': '0akgvfg8gersm28i',
      '368yzkhhnh100zsm': 'wq71lcc0rse5eide',
      'cdhbaen0jmopfyv2': 'wq71lcc0rse5eide',
      '2v3uvs9ro9gw13ah': '9qr8dit00oxstdyi',
      'ba2v51am7xatrjd7': '9qr8dit00oxstdyi',
      'mn2ve0y9q9sa0g2m': '9qr8dit00oxstdyi',
      'dgqjxhuv5kbnooib': 'din9y9g8s85rck3s',
      'q61y9ldqv753n4oa': 'm7om5qd5dk4wmqr4',


      // モンスターハンター：ワールド
      'l0fmvwvz8yloegdr': 'zlt4p775swrayaz9',
      '9aikv95tela9i6vz': 'zlt4p775swrayaz9',
      'ccho12gzc1bma7qz': 'to5ig1syrlyzsb83',


      // どうぶつの森 ポケットキャンプ
      '7swnhftqui2lp492': 'mk4x9s5v370atwx7',
      '6i5gubc0l4hkbjga': 'mk4x9s5v370atwx7',


      // スーパーマリオメーカー2
      'pa80fh564czuntys': '0wrb3z2k38siguxg',


    }

    const recruitmentRepliesCountObj = {


      // プラントvs.ゾンビ ガーデンウォーフェア
      'cscn4284xafzskab': 3,
      'kl2su8o8fptrsib1': 1,
      '6eleoe3uu4vejabj': 3,


      // PlanetSide 2
      '4z3pyb5aiz6l2u2m': 1,


      // ドラゴンズドグマ オンライン
      'wu7tmzelttv2l2zt': 1,
      'x3pmtslos55ueubb': 1,
      'btdkug4a6zoumn6e': 2,
      'wqotrlrx4a2cbiib': 1,
      'k5k6v5e54zqsrp6b': 2,
      'e1ilzwqbwdfazmx9': 1,
      '4r5mo7b3qmqo6vs5': 1,
      '92klip5iizv8fj0e': 1,
      '1udhzq1q9lxzazta': 1,
      '4egmh3dulnq0uesv': 1,
      'pi921meynzpbq9iz': 1,
      'nzz4633tuxv36lt6': 1,
      'tj5mstn9if7rm3kz': 1,
      '1e3vcindn04221qp': 1,
      'qefo3mv9jg18k8v0': 1,
      '4emso3fddwz7zhyb': 1,
      '6yojkk71xcupy01k': 1,
      'gr5hljjmr3auyswk': 1,
      'bi3uyjogh0byqgxy': 2,
      'ny2quow5uvw214gw': 1,
      '5c76eq3pruufjt4q': 1,
      't7xehte6nuz52l2z': 1,
      'tzz5qk3zmb1v6e4q': 1,
      '7qfe4jgfid0y2t0j': 2,
      'athxsxte9w7fk6w5': 1,
      'iewc4v491rz8c2vb': 1,
      'ani4zid96an6b4tr': 1,
      's7hczlxpw7q3p4nb': 1,
      '4cenpqn8opm0w4jn': 1,
      'f77cta9jlr9daplb': 1,
      'ggs70rm9wq6hoi0v': 1,
      'lptkbb7tt78hyvry': 1,
      '2qjiqogt21ocak19': 1,
      '48rlkuj1hmsawxes': 1,
      'jfgxl6p7ud9svqpa': 1,
      'bz1yqkgk4458k012': 1,
      '89jlafegfxwlfed6': 1,
      'jhic4geufgell4i2': 1,
      'z0tlt9yg7vrmvgaw': 1,
      'feoo0xlyphun1c38': 2,
      '61xe0e35dzr48vix': 1,
      'usbwryud0isclzk4': 1,
      'k5v4h5vc9s2ldoaf': 1,
      '66s6y4mela4jvlkn': 1,
      '3n3urwnmuagdwxpo': 1,
      '4cx2vbd8656soswb': 1,
      'vk8z1g1b4ke2vex1': 3,
      'd1pzg1z9tztmlakw': 1,
      '62bl24t24ij1iym6': 2,
      '9lh0o7m5ls48suit': 1,
      'f45dlrvokddf4ge2': 2,
      'uabl6fdtlagxkgsj': 1,
      '8rjz8tpzghw9igej': 1,
      'iswpigq15qbte9zt': 3,
      'ygj8vbkun9ayofbm': 1,
      'bsg9j2npdqzanxjc': 2,
      'u4mgte454j3zo3sy': 2,
      'mr2vqlf4gi9fuipm': 3,
      'ytp30pyy1q5uoclt': 3,
      'sdb089a84gmfx0wb': 1,
      'fflx5pm5ojoyaqyd': 1,


      // Agar.io
      'lfq0kr8ove5c2w3c': 3,
      'ah6urr2th21jc6w2': 4,
      '9s9yqhouky6b07cq': 1,


      // ポイッとヒーロー
      'qefiptko3wuxw7vf': 2,
      'xca3sfl08tcpx0wz': 3,
      'n43gvrwzezpr4qnb': 1,
      '8om0ysv8eq59q9p4': 1,
      'fckh6xahmmq9n23v': 1,
      'xojlh1pzh1cykgyi': 1,
      'lik4nbi9pccb5kuh': 2,
      'clc49htoiplcmvby': 1,
      '5emww5dmrx0q3vde': 1,
      'ia3rkj07v8hcmmar': 1,
      'y6gf6csmjq5x6ltu': 3,
      '1qmnhjjehr03uqsj': 1,
      'yvhsao54jj7vcjbs': 2,
      'i4jqeskyd4ucy9kq': 2,
      '50646qgnpigo21qp': 1,
      'ymtq9tym0wk21luv': 1,
      'j8fk6321cw4uae7a': 1,
      'o55ib5pxerjw1dvn': 1,
      'g97d9lwiomokuz4v': 3,
      'n3vbk84jegnuhv5s': 1,
      '37kf161e2qwkkxw6': 1,
      'grt5o4xj78qf8cf3': 1,
      'fl9znoxh7om1p29r': 1,
      'gmef7fwrk3m36c9i': 1,
      'zlfwpf9whpme25e5': 1,
      'qtt7on4bcqliskpb': 2,
      '3rs4wcbqoih0wkby': 2,
      'aw1tcj0r1wz4dwut': 2,
      '2zoppt7vrhp2kbf0': 5,
      'qylv3k8k7z09gljs': 2,
      'b4gyo6c2ed425vdm': 1,
      'rc5iv628lkyjb8cb': 3,
      'jqhw0gu2ppalew09': 4,
      '7572n0yijzj6j2ft': 1,
      'uf6wccvrszcvwf2l': 1,
      'nlrrll9dj04jr1jt': 2,
      'ekth3xzub3gpyrl4': 3,
      'gskvcuk8xy02diec': 2,
      '7vn3gewcmwpp93fs': 3,
      'mjw06ttpuo5u9reo': 1,
      'yr11slhpqt3el22o': 1,
      'coa0uormhk8w3bsf': 2,
      '7lxcugi0kwni4wm6': 4,
      'dk1yf34hdf4uba0y': 1,
      'tedtjuipyw5i3q81': 4,
      'umvdhi3jgge0k86t': 1,
      'qfq4nqgecerrekvn': 1,
      'm4qga0t78w427gdn': 1,
      'nn9q53et066skbsi': 1,
      'k2wbufuoyce7x6tc': 1,
      'qzu6x49qnzzg6f7u': 1,
      'rvpfst9ejecz1xlj': 1,
      'telp960nwg96llie': 1,
      'i8xobcdahkowdt3w': 3,
      '2mw1zly9bgaguiil': 4,
      'ze7b3025oglbvws3': 1,
      '71wxqw2b3u3rwiod': 7,
      '7zriglrc1q1vitdm': 2,
      '0w44fnzf2ap6a8sz': 1,
      'm0j5ypaw85141m7m': 1,
      'h83jw4mpi0ov7hjz': 7,
      'zhjqojmq43kpjp00': 4,
      'uylmwud893nb8bra': 4,
      'yhupe82h6pd3rtkf': 3,
      'r2ldmpa5mdvdm9p2': 2,
      'mwzxbgdrm2msfcho': 1,
      'oqvqq7skrkncum2a': 1,
      'lsn7pgvteho4noqo': 1,
      's3nsa3soy8itx2yk': 1,
      'ulzqsy5v8uhsdd43': 1,
      'ky92zhh12vnkjwd3': 2,
      '6uyss4dz7yk90qxg': 1,


      // Everybody's Gone to the Rapture -幸福な消失-
      'kehfoh6k2gwxboi4': 1,


      // モンスターハンター4G
      'vs3eugz1wvcrxc52': 3,


      // Fate/Grand Order
      'nmtf558su9hob7oi': 1,


      // Hearthstone
      'qp6fu12smu7fg1jt': 5,
      '51e78ixj2apvvciv': 1,
      'h1nc240l55crai63': 1,
      'vqntyw2wyjq4yxeu': 1,
      'etjx7b8n217vovid': 1,
      'x7xgugmxxs6vpnh1': 2,
      'gqdzcnvo15fk25x4': 1,
      'uwhik4wb64moyusu': 1,
      '09ctis9kkjlatr7x': 1,
      'ox6gjpl5ttj7opx7': 4,
      'pua5nxnlkhpa6m6d': 1,
      'd8z8xp6mki094cnp': 1,
      'u34es2avf7csc4p0': 1,
      'l2rrkw8tp4k07xy7': 1,
      'gqb0sdwc2sqlxlkf': 1,
      'hgsz0xk68f0o69s2': 2,
      '0ny7pi6fs5urmnjb': 1,


      // ララ・クロフト アンド テンプル オブ オシリス
      'vcejshkh5nkqc4o7': 1,
      'tfib7gyje6hh5q5o': 1,


      // Call of Duty: Black Ops 3
      'fbpvtpcy265lwzer': 1,


      // 崩壊学園
      'gwq6hmc11u28jkha': 1,


      // ファイナルファンタジー ブレイブエクスヴィアス
      'ke4q7omtj4ldxemt': 1,


      // シャドウバース
      '74o6lgvtvp9irv8w': 4,


      // レインボーシックス シージ
      '9hyavfyl9vq9ap7j': 1,


      // ぽっちゃり☆プリンセス ～メタ冒険～
      '0ig67r58l5a5fsng': 3,


      // 新約 アルカナスレイヤー
      'qjpo4p7celreetxc': 2,
      'pg8q3fl76eeu4ake': 1,


      // ディビジョン
      'h8n9wvgj6wsizipc': 3,
      'f9e02zi5534opuuv': 1,
      '6rav1f49i5mm2tdq': 1,
      'aenmognxktt7nasu': 1,
      'mlivf8e43y3qzp9z': 3,
      '94mul018vv4hsr69': 1,
      'pwkf46k591fvq3cw': 1,
      'b0ntjdwt0nrxjtwo': 1,


      // タップクエスト
      '1jmrofajjfgjl5o8': 2,


      // ドラゴンクエストビルダーズ
      'hfuhdzqth3ilwf9a': 1,


      // プラントvs.ゾンビ ガーデンウォーフェア2
      'dra1qcd98x3yc5rh': 1,


      // ARK: Survival Evolved
      'cf3dk9bvfjwwcbnj': 1,
      'iuhslahdpbwjvd7u': 2,
      '46od66k8ezpnog9c': 2,
      'bat1nuon16lmwcdy': 1,
      's2xvrydx0o4cnqf7': 6,
      'jyaxvq86gpox5ryd': 1,
      '3hxs6qqh2yn6eo8c': 1,
      'e96qcnim4sxbqdkc': 1,
      '08hxwklv57s9o81o': 1,
      'qiz5ds62lrj0kdab': 2,
      'kf4fg90wfsjpt7xp': 2,
      'ymxih5rm2pw76e1v': 2,
      'c6x8uiz53scpkqnt': 2,
      'u35t00kn9nnu5mla': 1,
      '1fbojocrldirxw8t': 1,
      'j36fd4p8jkhvyvmd': 1,
      '8y0wxlq389tqubob': 1,
      '38sdi6bq1k5hrpzz': 3,
      '32scgof3tkf6anv8': 2,
      '6e0znyemxgln1c3a': 2,
      'nidqinxiyqn8axka': 2,
      'ozqvrb5yeqksli2l': 1,
      'k7fenzraqwzf0hau': 1,
      'cxjcuyhtnvozg8a8': 1,
      'gje85sob6gnj941u': 1,
      '8owp4ybla3wxv8it': 1,
      'wpyg0jpdgj56zv63': 1,
      'd3h67pa0ors8tiaj': 7,
      'httxadg666tc1ckm': 1,
      'e9b70n9co5stxcfc': 2,
      '08ewct43c0pd1942': 1,
      'y2cv1oe0htb40kpe': 1,
      '7w5f2iqv8a1jjylq': 1,
      '41na4lxcf5h751t6': 2,
      'au7jpy5wd5hqfkbq': 1,
      'w1zwbss9d6qdczkc': 1,
      '3zqguem8rsf23n4z': 1,
      'uszdu53krzil4o32': 1,
      '1rxivzsnudz57ncg': 2,
      'v13ykk4dn71kbgsq': 2,
      '6iyszi6k3773aqcw': 1,
      'nwly7vb3ublkczbu': 4,
      'lihx2syhm33t5ylx': 1,
      '11m7svd8bu1u8aei': 11,
      'bdlo4u0zc26a4ryt': 6,
      'nh1yp3kziu84fpx6': 4,
      'uz8w76sta8ecjvg5': 1,
      'h6bsw3fglg8cs4bq': 2,
      'xtti1yfdcw7bdf4g': 1,
      'qvz1bstul5x1dizs': 1,
      '03l5sdn2rfb6186z': 1,
      'prnnfzykquz9vr97': 1,
      'qbwujykjiekj4fqc': 1,
      'xpvk6qsuibb4mvv8': 3,
      '0sc6us8bsp83t861': 1,
      'zny26pd16qpfs56b': 2,
      '6fo71hh4bhi5llgm': 3,
      't883lyf0e01ahlda': 4,
      '6iv3mwlofxaqn278': 1,
      't8mm5feh6vny5w3q': 3,
      'y3cyqsac3l2hig9v': 1,
      '0akgvfg8gersm28i': 3,
      'wq71lcc0rse5eide': 2,
      '9qr8dit00oxstdyi': 3,
      'din9y9g8s85rck3s': 1,
      'm7om5qd5dk4wmqr4': 1,


      // モンスターハンター：ワールド
      'zlt4p775swrayaz9': 2,
      'to5ig1syrlyzsb83': 1,


      // どうぶつの森 ポケットキャンプ
      'mk4x9s5v370atwx7': 2,


      // スーパーマリオメーカー2
      '0wrb3z2k38siguxg': 1,


    }




    for (const [index, valueObj] of recruitmentReplyDataArr.entries()) {


      // --------------------------------------------------
      //   _id が存在していない場合は処理しない
      // --------------------------------------------------

      const recruitment_id = lodashGet(valueObj, ['recruitment_id'], 0);
      const recruitment_reply_id = lodashGet(valueObj, ['recruitment_reply_id'], 0);
      const on_off = lodashGet(valueObj, ['on_off'], '0');
      const game_no = lodashGet(valueObj, ['game_no'], '');
      const anonymity = lodashGet(valueObj, ['anonymity'], '');

      if (

        idsObj[`recruitment_id_${recruitment_id}`] === undefined ||
        idsObj[`recruitment_reply_id_${recruitment_reply_id}`] === undefined ||
        idsObj[`game_no_${game_no}`] === undefined ||
        on_off !== '1' ||
        anonymity === '1'

      ) {
        continue;
      }


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const createdDate = moment(lodashGet(valueObj, ['regi_date'], '')).utc().add(-9, 'hours').toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['sort_date'], '')).utc().add(-9, 'hours').toISOString();
      const user_no = lodashGet(valueObj, ['user_no'], '');

      let name = lodashGet(valueObj, ['handle_name'], '');

      if (!name) {
        name = '';
      }

      let comment = lodashGet(valueObj, ['comment'], '');

      if (comment) {
        comment = comment.replace(/\r\n/g, '\n');
      }

      const image = lodashGet(valueObj, ['image'], '');
      const movie = lodashGet(valueObj, ['movie'], '');
      const id_hardware_no_1 = lodashGet(valueObj, ['id_hardware_no_1'], '');
      const id_hardware_no_2 = lodashGet(valueObj, ['id_hardware_no_2'], '');
      const id_hardware_no_3 = lodashGet(valueObj, ['id_hardware_no_3'], '');
      const id_1 = lodashGet(valueObj, ['id_1'], '');
      const id_2 = lodashGet(valueObj, ['id_2'], '');
      const id_3 = lodashGet(valueObj, ['id_3'], '');
      const info_title_1 = lodashGet(valueObj, ['info_title_1'], '');
      const info_title_2 = lodashGet(valueObj, ['info_title_2'], '');
      const info_title_3 = lodashGet(valueObj, ['info_title_3'], '');
      const info_title_4 = lodashGet(valueObj, ['info_title_4'], '');
      const info_title_5 = lodashGet(valueObj, ['info_title_5'], '');
      const info_1 = lodashGet(valueObj, ['info_1'], '');
      const info_2 = lodashGet(valueObj, ['info_2'], '');
      const info_3 = lodashGet(valueObj, ['info_3'], '');
      const info_4 = lodashGet(valueObj, ['info_4'], '');
      const info_5 = lodashGet(valueObj, ['info_5'], '');
      const publicSetting = parseInt(lodashGet(valueObj, ['open_type'], '1'), 10);
      const goods = parseInt(lodashGet(valueObj, ['good'], 0), 10);
      const replies = lodashGet(recruitmentRepliesCountObj, [recruitment_reply_id], 0);
      const userAgent = lodashGet(valueObj, ['user_agent'], '');


      //   1. 誰にでも公開
      //   2. 募集者だけに公開
      //   3. 募集者が自分に公開した場合


      // --------------------------------------------------
      //   _id
      // --------------------------------------------------

      const recruitmentThreads_id = idsObj[`recruitment_id_${recruitment_id}`];
      const recruitmentComments_id = idsObj[`recruitment_reply_id_${recruitment_reply_id}`];
      const gameCommunities_id = idsObj[`game_no_${game_no}`];


      // --------------------------------------------------
      //   users_id
      // --------------------------------------------------

      let users_id = '';

      if (user_no) {

        if (idsObj[`user_no_${user_no}`]) {

          users_id = idsObj[`user_no_${user_no}`];

        } else {

          users_id = '';
          name = '';

        }

      }


      // --------------------------------------------------
      //   publicCommentsUsers_idsObj
      // --------------------------------------------------

      if (users_id) {

        if (publicCommentsUsers_idsObj[recruitmentThreads_id]) {
          publicCommentsUsers_idsObj[recruitmentThreads_id].push(users_id);
        } else {
          publicCommentsUsers_idsObj[recruitmentThreads_id] = [users_id];
        }

      }



      // --------------------------------------------------
      //   imagesAndVideos_id
      // --------------------------------------------------

      const imagesAndVideos_id = lodashGet(idsImageObj, [`recruitment_reply_id_${recruitment_reply_id}`, 'id1'], '');

      // if (imagesAndVideos_id) {
      //   console.log(chalk`
      //     name: {green ${name}}
      //     imagesAndVideos_id: {green ${imagesAndVideos_id}}
      //   `);
      // }


      // --------------------------------------------------
      //   ids_idsArr
      // --------------------------------------------------

      let ids_idsArr = [];
      let publicIDsArr = [];

      if (gameIDsObj[id_1]) {

        const gameIDs_id = lodashGet(gameIDsObj, [id_1, '_id'], '');
        const gameIDsUser_no = lodashGet(gameIDsObj, [id_1, 'user_no'], '');

        if (gameIDsUser_no === user_no) {
          ids_idsArr.push(gameIDs_id);
        }

      }

      if (gameIDsObj[id_2]) {

        const gameIDs_id = lodashGet(gameIDsObj, [id_2, '_id'], '');
        const gameIDsUser_no = lodashGet(gameIDsObj, [id_2, 'user_no'], '');

        if (gameIDsUser_no === user_no) {
          ids_idsArr.push(gameIDs_id);
        }

      }

      if (gameIDsObj[id_3]) {

        const gameIDs_id = lodashGet(gameIDsObj, [id_3, '_id'], '');
        const gameIDsUser_no = lodashGet(gameIDsObj, [id_3, 'user_no'], '');

        if (gameIDsUser_no === user_no) {
          ids_idsArr.push(gameIDs_id);
        }

      }


      const setPublicIDsArr = (arr, id_hardware_no, id) => {

        let platform = 'Other';

        if (id_hardware_no === '1' || id_hardware_no === '5' || id_hardware_no === '6' || id_hardware_no === '7') {
          platform = 'PlayStation';
        } else if (id_hardware_no === '2' || id_hardware_no === '8' || id_hardware_no === '9') {
          platform = 'Xbox';
        } else if (id_hardware_no === '3' || id_hardware_no === '4' || id_hardware_no === '31') {
          platform = 'Nintendo';
        } else if (id_hardware_no === '10') {
          platform = 'PC';
        } else if (id_hardware_no === '33') {
          platform = 'iOS';
        } else if (id_hardware_no === '34') {
          platform = 'Android';
        }

        arr.push(
          {
            _id: shortid.generate(),
            platform,
            id,
          }
        );

        return arr;

      }


      if (id_1) {
        setPublicIDsArr(publicIDsArr, id_hardware_no_1, id_1);
      }

      if (id_2) {
        setPublicIDsArr(publicIDsArr, id_hardware_no_2, id_2);
      }

      if (id_3) {
        setPublicIDsArr(publicIDsArr, id_hardware_no_3, id_3);
      }


      if (publicIDsArr.length >= 2) {

        ids_idsArr = [];

      } else if (ids_idsArr.length > 0) {

        publicIDsArr = [];

      }


      // --------------------------------------------------
      //   publicInformationsArr
      // --------------------------------------------------

      const publicInformationsArr = [];


      const setPublicInformationsArr = (arr, title, information) => {

        arr.push(
          {
            _id: shortid.generate(),
            title,
            information,
          }
        );

        return arr;

      }

      if (info_title_1 && info_1) {
        setPublicInformationsArr(publicInformationsArr, info_title_1, info_1);
      }

      if (info_title_2 && info_2) {
        setPublicInformationsArr(publicInformationsArr, info_title_2, info_2);
      }

      if (info_title_3 && info_3) {
        setPublicInformationsArr(publicInformationsArr, info_title_3, info_3);
      }

      if (info_title_4 && info_4) {
        setPublicInformationsArr(publicInformationsArr, info_title_4, info_4);
      }

      if (info_title_5 && info_5) {
        setPublicInformationsArr(publicInformationsArr, info_title_5, info_5);
      }


      // --------------------------------------------------
      //   count
      // --------------------------------------------------

      if (recruitmentCommentCountObj[recruitment_id] !== undefined) {
        recruitmentCommentCountObj[recruitment_id] += 1;
      } else {
        recruitmentCommentCountObj[recruitment_id] = 1;
      }

      if (image) {

        if (recruitmentImagesCountForThreadObj[recruitment_id] !== undefined) {
          recruitmentImagesCountForThreadObj[recruitment_id] += 1;
        } else {
          recruitmentImagesCountForThreadObj[recruitment_id] = 1;
        }

      }

      if (movie) {

        if (recruitmentVideosCountForThreadObj[recruitment_id] !== undefined) {
          recruitmentVideosCountForThreadObj[recruitment_id] += 1;
        } else {
          recruitmentVideosCountForThreadObj[recruitment_id] = 1;
        }

      }


      if (gameNoCountObj[game_no] !== undefined) {
        gameNoCountObj[game_no] += 1;
      } else {
        gameNoCountObj[game_no] = 1;
      }



      // if (recruitment_id === 'd1m8kehivs8320l7') {
      //   console.log(chalk`
      //     recruitment_reply_id: {green ${recruitment_reply_id}}
      //     recruitmentComments_idsObj[recruitment_reply_id]: {green ${recruitmentComments_idsObj[recruitment_reply_id]}}
      //   `);
      // }

      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (recruitmentComments_idsObj[recruitment_reply_id]) {

        // const recruitmentComments_id = idsObj[`recruitment_reply_id_${recruitmentComments_idsObj[recruitment_reply_id]}`];

        // console.log(chalk`
        //   recruitment_reply_id: {green ${recruitment_reply_id}}
        //   : {green ${idsObj[`recruitment_reply_id_${recruitmentComments_idsObj[recruitment_reply_id]}`]}}
        // `);

        recruitmentRepliesArr.push(

          {
            _id: recruitmentComments_id,
            createdDate,
            updatedDate,
            gameCommunities_id,
            recruitmentThreads_id,
            recruitmentComments_id: idsObj[`recruitment_reply_id_${recruitmentComments_idsObj[recruitment_reply_id]}`],
            replyToRecruitmentReplies_id: '',
            users_id,
            localesArr: [
              {
                _id: shortid.generate(),
                language: 'ja',
                name,
                comment,
              }
            ],
            imagesAndVideos_id,
            goods,
            acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
            ip: '192.168.1.0',
            userAgent,
          }

        );

      } else {

        recruitmentCommentsArr.push(

          {
            _id: recruitmentComments_id,
            createdDate,
            updatedDate,
            gameCommunities_id,
            recruitmentThreads_id,
            users_id,
            localesArr: [
              {
                _id: shortid.generate(),
                language: 'ja',
                name,
                comment,
              }
            ],
            imagesAndVideos_id,
            ids_idsArr,
            publicIDsArr,
            publicInformationsArr,
            publicSetting,
            webPushAvailable: false,
            webPushes_id: '',
            goods,
            replies,
            acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
            ip: '192.168.1.0',
            userAgent,
          }

        );

      }


    }


    // console.log(`
    //   ----- gameNoCountObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(gameNoCountObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);



    // --------------------------------------------------
    //   recruitment-threads
    // --------------------------------------------------

    const recruitmentThreadsArr = [];
    const recruitmentThreadCountObj = {};


    for (const [index, valueObj] of recruitmentDataArr.entries()) {


      // --------------------------------------------------
      //   _id が存在していない場合は処理しない
      // --------------------------------------------------

      const recruitment_id = lodashGet(valueObj, ['recruitment_id'], 0);
      const on_off = lodashGet(valueObj, ['on_off'], '0');
      const game_no = lodashGet(valueObj, ['game_no'], '');
      const anonymity = lodashGet(valueObj, ['anonymity'], '');

      if (

        idsObj[`recruitment_id_${recruitment_id}`] === undefined ||
        idsObj[`game_no_${game_no}`] === undefined ||
        on_off !== '1' ||
        anonymity === '1'

      ) {
        continue;
      }


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const createdDate = moment(lodashGet(valueObj, ['regi_date'], '')).utc().add(-9, 'hours').toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['sort_date'], '')).utc().add(-9, 'hours').toISOString();
      const user_no = lodashGet(valueObj, ['user_no'], '');
      const type = lodashGet(valueObj, ['type'], '');
      let title = lodashGet(valueObj, ['etc_title'], '');

      if (!title) {

        if (type === '2') {
          title = 'フレンド募集';
        } else if (type === '3') {
          title = 'メンバー募集';
        } else if (type === '4') {
          title = '売買・交換相手募集';
        } else {
          title = 'その他の募集';
        }


        // 1 フレンド募集
        // 2 メンバー募集
        // 3 売買・交換相手募集
      }

      let name = lodashGet(valueObj, ['handle_name'], '');

      if (!name) {
        name = '';
      }

      let comment = lodashGet(valueObj, ['comment'], '');

      if (comment) {
        comment = comment.replace(/\r\n/g, '\n');
      }

      const image = lodashGet(valueObj, ['image'], '');
      const movie = lodashGet(valueObj, ['movie'], '');
      const id_hardware_no_1 = lodashGet(valueObj, ['id_hardware_no_1'], '');
      const id_hardware_no_2 = lodashGet(valueObj, ['id_hardware_no_2'], '');
      const id_hardware_no_3 = lodashGet(valueObj, ['id_hardware_no_3'], '');
      const id_1 = lodashGet(valueObj, ['id_1'], '');
      const id_2 = lodashGet(valueObj, ['id_2'], '');
      const id_3 = lodashGet(valueObj, ['id_3'], '');
      const info_title_1 = lodashGet(valueObj, ['info_title_1'], '');
      const info_title_2 = lodashGet(valueObj, ['info_title_2'], '');
      const info_title_3 = lodashGet(valueObj, ['info_title_3'], '');
      const info_title_4 = lodashGet(valueObj, ['info_title_4'], '');
      const info_title_5 = lodashGet(valueObj, ['info_title_5'], '');
      const info_1 = lodashGet(valueObj, ['info_1'], '');
      const info_2 = lodashGet(valueObj, ['info_2'], '');
      const info_3 = lodashGet(valueObj, ['info_3'], '');
      const info_4 = lodashGet(valueObj, ['info_4'], '');
      const info_5 = lodashGet(valueObj, ['info_5'], '');
      const publicSetting = parseInt(lodashGet(valueObj, ['open_type'], '1'), 10);
      const userAgent = lodashGet(valueObj, ['user_agent'], '');

      // <select class="form-control margin_top_10" id="recruitment_open_type">
      //     <option value="1">誰にでも公開</option>
      //     <option value="2">返信者に公開（全員）</option>
      //     <option value="3">返信者に公開（選択）</option>
      //   </select>

      // if (publicSetting === 2) {

      //   text = 'ログインしてコメントした方のみ、ID・情報を閲覧することができます。';

      // } else if (publicSetting === 3) {

      //   text = 'ログインしてコメントした方の中から、募集者がID・情報を公開する相手を選びます。';

      // }


      // --------------------------------------------------
      //   _id
      // --------------------------------------------------

      const recruitmentThreads_id = idsObj[`recruitment_id_${recruitment_id}`];
      const gameCommunities_id = idsObj[`game_no_${game_no}`];


      // --------------------------------------------------
      //   users_id
      // --------------------------------------------------

      let users_id = '';

      if (user_no) {

        if (idsObj[`user_no_${user_no}`]) {

          users_id = idsObj[`user_no_${user_no}`];

        } else {

          users_id = '';
          name = '';

        }

      }


      // --------------------------------------------------
      //   category
      // --------------------------------------------------

      let category = '';

      if (type === '2') {
        category = 1;
      } else if (type === '3') {
        category = 2;
      } else if (type === '4') {
        category = 3;
      }


      // 1 フレンド募集
      // 2 メンバー募集
      // 3 売買・交換相手募集

      // <select class="form-control" id="recruitment_type">
      //   <option value="1">プレイヤー募集</option>
      //   <option value="2">フレンド募集</option>
      //   <option value="3">ギルド・クランメンバー募集</option>
      //   <option value="4">売買・交換相手募集</option>
      //   <option value="5">その他の募集</option>
      // </select>


      // --------------------------------------------------
      //   imagesAndVideos_id
      // --------------------------------------------------

      const imagesAndVideos_id = lodashGet(idsImageObj, [`recruitment_id_${recruitment_id}`, 'id1'], '');

      // if (imagesAndVideos_id) {
      //   console.log(chalk`
      //     name: {green ${name}}
      //     imagesAndVideos_id: {green ${imagesAndVideos_id}}
      //   `);
      // }


      // --------------------------------------------------
      //   deadlineDate
      // --------------------------------------------------

      const deadlineDate = moment(lodashGet(valueObj, ['limit_date'], '')).utc().add(-9, 'hours').toISOString();


      // --------------------------------------------------
      //   publicCommentsUsers_idsArr
      // --------------------------------------------------

      let publicCommentsUsers_idsArr = publicCommentsUsers_idsObj[recruitmentThreads_id];
      publicCommentsUsers_idsArr = Array.from(new Set(publicCommentsUsers_idsArr));


      // --------------------------------------------------
      //   publicApprovalUsers_idsArrr
      // --------------------------------------------------

      let publicApprovalUsers_idsArrr = [];

      if (recruitment_id === 'cp55xdtmafcczqcp') {
        // publicApprovalUsers_idsArrr = [idsObj['user_no_937'], idsObj['user_no_939']];
      }

      if (recruitment_id === 'pp2bgvbnfw73udd1') {
        publicApprovalUsers_idsArrr = [idsObj['user_no_937'], idsObj['user_no_939']];
      }


      // const approval_users = lodashGet(valueObj, ['approval_users'], '');

      // if (approval_users) {

      //   let approvalUsersArr = approval_users.split('a:1:{i:0;s:3:\"');
      //   approvalUsersArr = approvalUsersArr[1].split('";}');
      //   approvalUsersArr.pop();

      //   if (idsObj[`user_no_${approvalUsersArr[0]}`]) {
      //     publicApprovalUsers_idsArrr.push(idsObj[`user_no_${approvalUsersArr[0]}`]);
      //   }

      //   // console.log(`
      //   //   ----- approvalUsersArr -----\n
      //   //   ${util.inspect(JSON.parse(JSON.stringify(approvalUsersArr)), { colors: true, depth: null })}\n
      //   //   --------------------\n
      //   // `);

      //   // console.log(`
      //   //   ----- publicApprovalUsers_idsArrr -----\n
      //   //   ${util.inspect(JSON.parse(JSON.stringify(publicApprovalUsers_idsArrr)), { colors: true, depth: null })}\n
      //   //   --------------------\n
      //   // `);

      // }




      // --------------------------------------------------
      //   ids_idsArr
      // --------------------------------------------------

      let ids_idsArr = [];
      let publicIDsArr = [];

      if (users_id) {

        if (gameIDsObj[id_1]) {

          const gameIDs_id = lodashGet(gameIDsObj, [id_1, '_id'], '');
          const gameIDsUser_no = lodashGet(gameIDsObj, [id_1, 'user_no'], '');

          if (gameIDsUser_no === user_no) {
            ids_idsArr.push(gameIDs_id);
          }

        }

        if (gameIDsObj[id_2]) {

          const gameIDs_id = lodashGet(gameIDsObj, [id_2, '_id'], '');
          const gameIDsUser_no = lodashGet(gameIDsObj, [id_2, 'user_no'], '');

          if (gameIDsUser_no === user_no) {
            ids_idsArr.push(gameIDs_id);
          }

        }

        if (gameIDsObj[id_3]) {

          const gameIDs_id = lodashGet(gameIDsObj, [id_3, '_id'], '');
          const gameIDsUser_no = lodashGet(gameIDsObj, [id_3, 'user_no'], '');

          if (gameIDsUser_no === user_no) {
            ids_idsArr.push(gameIDs_id);
          }

        }

      }


      const setPublicIDsArr = (arr, id_hardware_no, id) => {

        let platform = 'Other';

        if (id_hardware_no === '1' || id_hardware_no === '5' || id_hardware_no === '6' || id_hardware_no === '7') {
          platform = 'PlayStation';
        } else if (id_hardware_no === '2' || id_hardware_no === '8' || id_hardware_no === '9') {
          platform = 'Xbox';
        } else if (id_hardware_no === '3' || id_hardware_no === '4' || id_hardware_no === '31') {
          platform = 'Nintendo';
        } else if (id_hardware_no === '10') {
          platform = 'PC';
        } else if (id_hardware_no === '33') {
          platform = 'iOS';
        } else if (id_hardware_no === '34') {
          platform = 'Android';
        }

        arr.push(
          {
            _id: shortid.generate(),
            platform,
            id,
          }
        );

        return arr;

      }


      if (id_1) {
        setPublicIDsArr(publicIDsArr, id_hardware_no_1, id_1);
      }

      if (id_2) {
        setPublicIDsArr(publicIDsArr, id_hardware_no_2, id_2);
      }

      if (id_3) {
        setPublicIDsArr(publicIDsArr, id_hardware_no_3, id_3);
      }


      if (publicIDsArr.length >= 2) {

        ids_idsArr = [];

      } else if (ids_idsArr.length > 0) {

        publicIDsArr = [];

      }


      // --------------------------------------------------
      //   publicInformationsArr
      // --------------------------------------------------

      const publicInformationsArr = [];


      const setPublicInformationsArr = (arr, title, information) => {

        arr.push(
          {
            _id: shortid.generate(),
            title,
            information,
          }
        );

        return arr;

      }

      if (info_title_1 && info_1) {
        setPublicInformationsArr(publicInformationsArr, info_title_1, info_1);
      }

      if (info_title_2 && info_2) {
        setPublicInformationsArr(publicInformationsArr, info_title_2, info_2);
      }

      if (info_title_3 && info_3) {
        setPublicInformationsArr(publicInformationsArr, info_title_3, info_3);
      }

      if (info_title_4 && info_4) {
        setPublicInformationsArr(publicInformationsArr, info_title_4, info_4);
      }

      if (info_title_5 && info_5) {
        setPublicInformationsArr(publicInformationsArr, info_title_5, info_5);
      }


      // --------------------------------------------------
      //   count
      // --------------------------------------------------

      if (recruitmentThreadCountObj[game_no] !== undefined) {
        recruitmentThreadCountObj[game_no] += 1;
      } else {
        recruitmentThreadCountObj[game_no] = 1;
      }

      if (image) {

        if (recruitmentImagesCountForThreadObj[recruitment_id] !== undefined) {
          recruitmentImagesCountForThreadObj[recruitment_id] += 1;
        } else {
          recruitmentImagesCountForThreadObj[recruitment_id] = 1;
        }

      }

      if (movie) {

        if (recruitmentVideosCountForThreadObj[recruitment_id] !== undefined) {
          recruitmentVideosCountForThreadObj[recruitment_id] += 1;
        } else {
          recruitmentVideosCountForThreadObj[recruitment_id] = 1;
        }

      }

      const comments = lodashGet(recruitmentCommentCountObj, [recruitment_id], 0);
      const images = lodashGet(recruitmentImagesCountForThreadObj, [recruitment_id], 0);
      const videos = lodashGet(recruitmentVideosCountForThreadObj, [recruitment_id], 0);




      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      recruitmentThreadsArr.push(

        {
          _id: recruitmentThreads_id,
          createdDate,
          updatedDate,
          gameCommunities_id,
          users_id,
          hardwareIDsArr: [],
          category,
          localesArr: [
            {
              _id: shortid.generate(),
              language: 'ja',
              title,
              name,
              comment,
            }
          ],
          imagesAndVideos_id,
          ids_idsArr,
          publicIDsArr,
          publicInformationsArr,
          publicSetting,
          publicCommentsUsers_idsArr,
          publicApprovalUsers_idsArrr,
          deadlineDate,
          webPushAvailable: false,
          webPushes_id: '',
          comments,
          replies: 0,
          images,
          videos,
          acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
          ip: '192.168.1.0',
          userAgent,
        }

      );


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

      const userCommunities_id = idsObj[`community_no_${community_no}`];


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const on_off = lodashGet(valueObj, ['on_off'], '0');
      const createdDate = moment(lodashGet(valueObj, ['regi_date'], '')).utc().add(-9, 'hours').toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['renewal_date'], '')).utc().add(-9, 'hours').toISOString();
      const userCommunityID = lodashGet(valueObj, ['community_id'], '');

      const name = lodashGet(valueObj, ['name'], 'Name');

      let description = lodashGet(valueObj, ['description'], '');

      if (description) {
        description = description.replace(/\r\n/g, '\n');
      }

      let descriptionShort = lodashGet(valueObj, ['description_mini'], '');

      if (descriptionShort) {
        descriptionShort = descriptionShort.replace(/\r\n/g, '\n');
      }

      const users_id = idsObj[`user_no_${author_user_no}`];

      // const top_image = lodashGet(valueObj, ['top_image'], '');
      // const thumbnail = lodashGet(valueObj, ['thumbnail'], '0');


      // --------------------------------------------------
      //   gameCommunities_idsArr
      // --------------------------------------------------

      const game_list = lodashGet(valueObj, ['game_list'], '');

      let gameCommunities_idsArr = [];

      if (game_list) {

        let splitedArr = [];
        splitedArr = game_list.split(',');

        splitedArr.shift();
        splitedArr.pop();

        for (let game_no of splitedArr.values()) {

          if (idsObj[`game_no_${game_no}`] !== undefined) {
            gameCommunities_idsArr.push(idsObj[`game_no_${game_no}`]);
          }

        }

      }


      // --------------------------------------------------
      //   communityType
      // --------------------------------------------------

      const open = lodashGet(valueObj, ['open'], '1');

      let communityType = 'open';

      if (open !== '1') {
        communityType = 'closed';
      }


      // --------------------------------------------------
      //   anonymity
      // --------------------------------------------------

      const config = lodashGet(valueObj, ['config'], '');

      let anonymity = false;

      if (config.indexOf('anonymity\";b:1') !== -1) {
        anonymity = true;
      }


      // --------------------------------------------------
      //   follows
      // --------------------------------------------------

      const followedArr = lodashGet(followedUCObj, [community_no], []);
      const followedCount = followedArr.length;


      // --------------------------------------------------
      //   imagesAndVideosThumbnail_id
      // --------------------------------------------------

      const imagesAndVideosThumbnail_id = lodashGet(idsImageObj, [`community_no_${community_no}`, 'idThumbnail1'], '');


      // --------------------------------------------------
      //   threadCount
      // --------------------------------------------------

      const threadCount = lodashGet(forumThreadCountUCObj, [community_no], 0);




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
            imagesAndVideosThumbnail_id,
            gameCommunities_idsArr,
            forumObj: {
              threadCount,
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

    const gamesArr = [];
    const gameCommunitiesArr = [];


    for (const [index, valueObj] of gameDataDataArr.entries()) {


      // --------------------------------------------------
      //   _id が存在していない場合は処理しない
      // --------------------------------------------------

      const game_no = lodashGet(valueObj, ['game_no'], 0);

      if (idsObj[`game_no_${game_no}`] === undefined) {
        continue;
      }


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const on_off = lodashGet(valueObj, ['on_off'], '0');
      const createdDate = moment(lodashGet(valueObj, ['renewal_date'], '')).utc().add(-9, 'hours').toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['renewal_date'], '')).utc().add(-9, 'hours').toISOString();
      const urlID = lodashGet(valueObj, ['id'], '');
      const name = lodashGet(valueObj, ['name_ja'], '');
      const subtitle = lodashGet(valueObj, ['subtitle'], '');
      let sortKeyword = lodashGet(valueObj, ['kana'], '');

      if (game_no === '661') {
        sortKeyword = 'ドライバーサンフランシスコ';
      }


      // --------------------------------------------------
      //   searchKeywordsArr
      // --------------------------------------------------

      const similarity_ja = lodashGet(valueObj, ['similarity_ja'], '');
      let searchKeywordsArr = [];

      if (similarity_ja) {

        searchKeywordsArr = similarity_ja.split('\/-*-\/');
        searchKeywordsArr.shift();
        searchKeywordsArr.pop();

      }


      // --------------------------------------------------
      //   twitterHashtagsArr
      // --------------------------------------------------

      const twitter_hashtag_ja = lodashGet(valueObj, ['twitter_hashtag_ja'], '');

      let twitterHashtagsArr = [];

      if (twitter_hashtag_ja) {
        twitterHashtagsArr = [twitter_hashtag_ja];
      }



      // --------------------------------------------------
      //   genreArr
      // --------------------------------------------------

      const genre = lodashGet(valueObj, ['genre'], '');

      let genreArr = [];

      if (genre) {

        let splitedArr = [];
        splitedArr = genre.split(',');
        splitedArr.shift();
        splitedArr.pop();

        for (let genre_no of splitedArr.values()) {

          if (idsObj[`genre_no_${genre_no}`] !== undefined) {
            genreArr.push(idsObj[`genre_no_${genre_no}`]);
          }

        }

      }


      // --------------------------------------------------
      //   hardware
      // --------------------------------------------------

      const hardware = lodashGet(valueObj, ['hardware'], '');
      const playersMax = parseInt(lodashGet(valueObj, ['players_max'], 1), 10);
      const release_date_1 = lodashGet(valueObj, ['release_date_1'], '');
      const release_date_2 = lodashGet(valueObj, ['release_date_2'], '');
      const release_date_3 = lodashGet(valueObj, ['release_date_3'], '');
      const release_date_4 = lodashGet(valueObj, ['release_date_4'], '');
      const release_date_5 = lodashGet(valueObj, ['release_date_5'], '');
      const developer = lodashGet(valueObj, ['developer'], '');

      let hardwareArr = [];

      if (hardware) {

        let splitedHardwareArr = [];
        splitedHardwareArr = hardware.split(',');
        splitedHardwareArr.shift();
        splitedHardwareArr.pop();


        let splitedDeveloperArr = [];

        if (developer) {
          splitedDeveloperArr = developer.split(',');
          splitedDeveloperArr.shift();
          splitedDeveloperArr.pop();
        }


        for (const [index, hardware_no] of splitedHardwareArr.entries()) {

          if (idsObj[`hardware_no_${hardware_no}`] !== undefined) {

            let releaseDate = '';

            if (index === 0) {

              releaseDate = release_date_1;

            } else if (index === 1) {

              releaseDate = release_date_2;

            } else if (index === 2) {

              releaseDate = release_date_3;

            } else if (index === 3) {

              releaseDate = release_date_4;

            } else if (index === 4) {

              releaseDate = release_date_5;

            }


            let developerIDsArr = [];

            for (let developer_no of splitedDeveloperArr.values()) {

              if (idsObj[`developer_no_${developer_no}`] !== undefined) {
                developerIDsArr.push(idsObj[`developer_no_${developer_no}`]);
              }

            }


            hardwareArr.push({

              _id: shortid.generate(),
              hardwareID: idsObj[`hardware_no_${hardware_no}`],
              releaseDate,
              playersMin: 1,
              playersMax,
              publisherIDsArr: [],
              developerIDsArr,

            });

          }

        }

      }




      // --------------------------------------------------
      //   link
      // --------------------------------------------------

      const linkArr = [];


      for (const [index, value2Obj] of dataLinkDataArr.entries()) {


        // --------------------------------------------------
        //   _id が存在していない場合は処理しない
        // --------------------------------------------------

        if (value2Obj.game_no !== game_no) {
          continue;
        }


        // --------------------------------------------------
        //   Data
        // --------------------------------------------------

        let type = lodashGet(value2Obj, ['type'], '');

        if (type === 'etc') {
          type = 'Other';
        }

        const label = lodashGet(value2Obj, ['name'], '');
        const url = lodashGet(value2Obj, ['url'], '');
        const country = lodashGet(value2Obj, ['country'], '');


        // --------------------------------------------------
        //   push
        // --------------------------------------------------

        linkArr.push({

          _id: shortid.generate(),
          type,
          label,
          url,

        });


      }




      // --------------------------------------------------
      //   gameCommunities_id
      // --------------------------------------------------

      const gameCommunities_id = idsObj[`game_no_${game_no}`];




      // --------------------------------------------------
      //   imagesAndVideos_id & imagesAndVideosThumbnail_id
      // --------------------------------------------------

      let imagesAndVideos_id = '';

      if (imageObj[game_no]) {
        imagesAndVideos_id = lodashGet(idsImageObj, [`game_no_${game_no}`, 'id1'], '');
      }

      const thumbnail = lodashGet(valueObj, ['thumbnail'], '0');

      let imagesAndVideosThumbnail_id = '';

      if (thumbnail === '1') {
        imagesAndVideosThumbnail_id = lodashGet(idsImageObj, [`game_no_${game_no}`, 'idThumbnail1'], '');
      }

      // if (imagesAndVideos_id) {
      //   console.log(chalk`
      //     name: {green ${name}}
      //   `);
      // }

      // if (imagesAndVideosThumbnail_id) {
      //   console.log(chalk`
      //     name: {green ${name}}
      //   `);
      // }




      // --------------------------------------------------
      //   threadCount
      // --------------------------------------------------

      const forumThreadCount = lodashGet(forumThreadCountGCObj, [game_no], 0);
      const recruitmentThreadCount = lodashGet(recruitmentThreadCountObj, [game_no], 0);

      // if (!forumThreadCount) {
      //   console.log(chalk`
      // game_no: {green ${game_no}}
      // forumThreadCount: {green ${forumThreadCount}}
      // `);
      // }
      // console.log(chalk`
      // game_no: {green ${game_no}}
      // forumThreadCount: {green ${forumThreadCount}}
      // `);




      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (on_off === '1') {


        // --------------------------------------------------
        //   games
        // --------------------------------------------------

        gamesArr.push(

          {
            _id: shortid.generate(),
            createdDate,
            updatedDate,
            gameCommunities_id,
            urlID,
            language: 'ja',
            country: 'JP',
            imagesAndVideos_id,
            imagesAndVideosThumbnail_id,
            name,
            subtitle,
            sortKeyword,
            searchKeywordsArr,
            twitterHashtagsArr,
            genreArr,
            genreSubArr: [],
            genreTagArr: [],
            hardwareArr,
            linkArr,
          }

        );


        // --------------------------------------------------
        //   game-communities
        // --------------------------------------------------

        gameCommunitiesArr.push(

          {
            _id: gameCommunities_id,
            createdDate,
            updatedDate,
            forumObj: {
              threadCount: forumThreadCount === 0 ? 1 : forumThreadCount,
            },
            recruitmentObj: {
              threadCount: recruitmentThreadCount,
            },
            updatedDateObj: {
              forum: updatedDate,
              recruitment: updatedDate,
            },
            anonymity: false,
          }

        );


        // --------------------------------------------------
        //   forum-threads
        // --------------------------------------------------

        if (forumThreadCount === 0) {

          forumThreadsArr.push(

            {
              _id: shortid.generate(),
              createdDate,
              updatedDate,
              gameCommunities_id,
              userCommunities_id: '',
              users_id: '',
              localesArr: [
                {
                  _id: shortid.generate(),
                  language: 'ja',
                  name: `${name}について語ろう！`,
                  comment: '雑談でもなんでもOK！\nみんなで語りましょう！！',
                }
              ],
              imagesAndVideos_id: '',
              comments: 0,
              replies: 0,
              images: 0,
              videos: 0,
              acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
              ip: '192.168.1.0',
              userAgent,
            }

          );

        }



      }

    }




    // --------------------------------------------------
    //   ids
    // --------------------------------------------------

    const idsArr = [];


    for (const [index, valueObj] of gameIDDataArr.entries()) {


      // --------------------------------------------------
      //   _id が存在していない場合は処理しない
      // --------------------------------------------------

      const game_id_no = parseInt(lodashGet(valueObj, ['game_id_no'], 0), 10);
      const user_no = lodashGet(valueObj, ['user_no'], '');

      if (idsObj[`game_id_no_${game_id_no}`] === undefined || idsObj[`user_no_${user_no}`] === undefined) {
        continue;
      }


      // --------------------------------------------------
      //   Data
      // --------------------------------------------------

      const on_off = lodashGet(valueObj, ['on_off'], '0');
      const game_no = lodashGet(valueObj, ['game_no'], '');
      const hardware_no = lodashGet(valueObj, ['hardware_no'], '');
      const id = lodashGet(valueObj, ['id'], '');




      // --------------------------------------------------
      //   users_id
      // --------------------------------------------------

      let users_id = '';

      if (idsObj[`user_no_${user_no}`]) {
        users_id = idsObj[`user_no_${user_no}`];
      }


      // --------------------------------------------------
      //   gameCommunities_id
      // --------------------------------------------------

      let gameCommunities_id = '';

      if (idsObj[`game_no_${game_no}`]) {
        gameCommunities_id = idsObj[`game_no_${game_no}`];
      }


      // --------------------------------------------------
      //   platform
      // --------------------------------------------------

      let platform = 'Other';

      if (hardware_no === '1' || hardware_no === '7') {
        platform = 'PlayStation';
      }


      // --------------------------------------------------
      //   label
      // --------------------------------------------------

      let label = '';

      if (platform === 'Other') {
        label = 'ID';
      }




      // --------------------------------------------------
      //   push
      // --------------------------------------------------

      if (on_off === '1') {

        idsArr.push(

          {
            _id: idsObj[`game_id_no_${game_id_no}`],
            createdDate: ISO8601,
            updatedDate: ISO8601,
            users_id,
            gameCommunities_id,
            platform,
            label,
            id,
            publicSetting: 5,
            search: false,
          }

        );

      }


    }







    // ---------------------------------------------
    //   transaction
    // ---------------------------------------------

    await dbInsert({

      usersArr,
      cardPlayersArr,
      experiencesArr,
      followsArr,
      forumRepliesArr,
      forumCommentsArr,
      forumThreadsArr,
      recruitmentRepliesArr,
      recruitmentCommentsArr,
      recruitmentThreadsArr,
      userCommunitiesArr,
      developersPublishersArr,
      hardwaresArr,
      gamesArr,
      gameCommunitiesArr,
      idsArr,

    });




    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    // console.log(`
    //   ----------------------------------------\n
    //   pages/api/v2/common/import-json.js
    // `);

    // console.log(`
    //   ----- usersArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(usersArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- cardPlayersArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(cardPlayersArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- forumThreadsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- forumCommentsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumCommentsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- forumRepliesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumRepliesArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- recruitmentCommentsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(recruitmentCommentsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // for (const [index, valueObj] of recruitmentCommentsArr.entries()) {

    //   // if (valueObj.publicIDsArr.length > 0) {
    //   //   console.log(`
    //   //     ----- valueObj.publicIDsArr -----\n
    //   //     ${util.inspect(JSON.parse(JSON.stringify(valueObj.publicIDsArr)), { colors: true, depth: null })}\n
    //   //     --------------------\n
    //   //   `);
    //   // }

    //   if (valueObj.publicInformationsArr.length > 0) {
    //     console.log(`
    //       ----- valueObj.publicInformationsArr -----\n
    //       ${util.inspect(JSON.parse(JSON.stringify(valueObj.publicInformationsArr)), { colors: true, depth: null })}\n
    //       --------------------\n
    //     `);
    //   }

    // }

    // console.log(`
    //   ----- recruitmentThreadsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(recruitmentThreadsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // for (const [index, valueObj] of recruitmentThreadsArr.entries()) {

    //   // if (valueObj.ids_idsArr.length > 0) {
    //   //   console.log(`
    //   //     ----- valueObj.ids_idsArr -----\n
    //   //     ${util.inspect(JSON.parse(JSON.stringify(valueObj.ids_idsArr)), { colors: true, depth: null })}\n
    //   //     --------------------\n
    //   //   `);
    //   // }

    //   // if (valueObj.publicIDsArr.length > 0) {
    //   //   console.log(`
    //   //     ----- valueObj.publicIDsArr -----\n
    //   //     ${util.inspect(JSON.parse(JSON.stringify(valueObj.publicIDsArr)), { colors: true, depth: null })}\n
    //   //     --------------------\n
    //   //   `);
    //   // }

    //   if (valueObj.publicInformationsArr.length > 0) {
    //     console.log(`
    //       ----- valueObj.publicInformationsArr -----\n
    //       ${util.inspect(JSON.parse(JSON.stringify(valueObj.publicInformationsArr)), { colors: true, depth: null })}\n
    //       --------------------\n
    //     `);
    //   }

    // }


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
    //   ----- gamesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(gamesArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- gameCommunitiesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(gameCommunitiesArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(idsArr)), { colors: true, depth: null })}\n
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
 * Transaction
 * @return {Object}
 */
const dbInsert = async ({

  usersArr,
  cardPlayersArr,
  experiencesArr,
  followsArr,
  forumRepliesArr,
  forumCommentsArr,
  forumThreadsArr,
  recruitmentRepliesArr,
  recruitmentCommentsArr,
  recruitmentThreadsArr,
  userCommunitiesArr,
  developersPublishersArr,
  hardwaresArr,
  gamesArr,
  gameCommunitiesArr,
  idsArr,

}) => {


  // --------------------------------------------------
  //   Property
  // --------------------------------------------------

  let returnObj = {};




  // --------------------------------------------------
  //   Database
  // --------------------------------------------------

  try {


    // ---------------------------------------------
    //   users
    // ---------------------------------------------

    await SchemaUsers.deleteMany();
    await SchemaUsers.insertMany(usersArr);


    // ---------------------------------------------
    //   card-players
    // ---------------------------------------------

    await SchemaCardPlayers.deleteMany();
    await SchemaCardPlayers.insertMany(cardPlayersArr);


    // ---------------------------------------------
    //   experiences
    // ---------------------------------------------

    await SchemaExperiences.deleteMany();
    await SchemaExperiences.insertMany(experiencesArr);


    // ---------------------------------------------
    //   follows
    // ---------------------------------------------

    await SchemaFollows.deleteMany();
    await SchemaFollows.insertMany(followsArr);


    // ---------------------------------------------
    //   forum-comments
    // ---------------------------------------------

    await SchemaForumComments.deleteMany();
    await SchemaForumComments.insertMany(forumRepliesArr);
    await SchemaForumComments.insertMany(forumCommentsArr);


    // ---------------------------------------------
    //   forum-threads
    // ---------------------------------------------

    await SchemaForumThreads.deleteMany();
    await SchemaForumThreads.insertMany(forumThreadsArr);


    // ---------------------------------------------
    //   recruitment-replies
    // ---------------------------------------------

    await SchemaRecruitmentReplies.deleteMany();
    await SchemaRecruitmentReplies.insertMany(recruitmentRepliesArr);


    // ---------------------------------------------
    //   recruitment-comments
    // ---------------------------------------------

    await SchemaRecruitmentComments.deleteMany();
    await SchemaRecruitmentComments.insertMany(recruitmentCommentsArr);


    // ---------------------------------------------
    //   recruitment-threads
    // ---------------------------------------------

    await SchemaRecruitmentThreads.deleteMany();
    await SchemaRecruitmentThreads.insertMany(recruitmentThreadsArr);


    // ---------------------------------------------
    //   user-communities
    // ---------------------------------------------

    await SchemaUserCommunities.deleteMany();
    await SchemaUserCommunities.insertMany(userCommunitiesArr);


    // ---------------------------------------------
    //   developers-publishers
    // ---------------------------------------------

    await SchemaDevelopersPublishers.deleteMany();
    await SchemaDevelopersPublishers.insertMany(developersPublishersArr);


    // ---------------------------------------------
    //   hardwares
    // ---------------------------------------------

    await SchemaHardwares.deleteMany();
    await SchemaHardwares.insertMany(hardwaresArr);


    // ---------------------------------------------
    //   games
    // ---------------------------------------------

    await SchemaGames.deleteMany();
    await SchemaGames.insertMany(gamesArr);


    // ---------------------------------------------
    //   game-communities
    // ---------------------------------------------

    await SchemaGameCommunities.deleteMany();
    await SchemaGameCommunities.insertMany(gameCommunitiesArr);


    // ---------------------------------------------
    //   ids
    // ---------------------------------------------

    await SchemaIDs.deleteMany();
    await SchemaIDs.insertMany(idsArr);




    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------

    // console.log(`
    //   ----------------------------------------\n
    //   pages/api/v2/common/import-json.js - transactionForInsert
    // `);

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

    throw errorObj;

  }


};
