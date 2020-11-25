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
      const createdDate = moment(lodashGet(valueObj, ['regi_date'], '')).utc().toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['sort_date'], '')).utc().toISOString();
      const user_no = lodashGet(valueObj, ['user_no'], '');
      let anonymity = valueObj.anonymity ? true : false;

      let name = lodashGet(valueObj, ['handle_name'], '');

      if (!name) {
        name = '';
      }

      const comment = lodashGet(valueObj, ['comment'], '');
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
      const createdDate = moment(lodashGet(valueObj, ['regi_date'], '')).utc().toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['sort_date'], '')).utc().toISOString();
      const user_no = lodashGet(valueObj, ['user_no'], '');
      let anonymity = valueObj.anonymity ? true : false;

      let name = lodashGet(valueObj, ['handle_name'], '');

      if (!name) {
        name = '';
      }

      const comment = lodashGet(valueObj, ['comment'], '');
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
      const createdDate = moment(lodashGet(valueObj, ['regi_date'], '')).utc().toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['sort_date'], '')).utc().toISOString();
      const user_no = lodashGet(valueObj, ['user_no'], '');
      let anonymity = valueObj.anonymity ? true : false;

      let name = lodashGet(valueObj, ['handle_name'], '');

      if (!name) {
        name = '';
      }

      const comment = lodashGet(valueObj, ['comment'], '');
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
      const createdDate = moment(lodashGet(valueObj, ['regi_date'], '')).utc().toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['sort_date'], '')).utc().toISOString();
      const user_no = lodashGet(valueObj, ['user_no'], '');
      let anonymity = valueObj.anonymity ? true : false;

      let name = lodashGet(valueObj, ['handle_name'], '');

      if (!name) {
        name = '';
      }

      const comment = lodashGet(valueObj, ['comment'], '');
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
      const createdDate = moment(lodashGet(valueObj, ['regi_date'], '')).utc().toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['sort_date'], '')).utc().toISOString();
      const user_no = lodashGet(valueObj, ['user_no'], '');
      const name = lodashGet(valueObj, ['title'], '');
      const comment = lodashGet(valueObj, ['comment'], '');
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
      const createdDate = moment(lodashGet(valueObj, ['regi_date'], '')).utc().toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['sort_date'], '')).utc().toISOString();
      const name = lodashGet(valueObj, ['title'], '');
      const comment = lodashGet(valueObj, ['comment'], '');
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
    //   recruitment-comments
    // --------------------------------------------------

    const recruitmentCommentsArr = [];
    const recruitmentCommentCountObj = {};
    const recruitmentImagesCountForThreadObj = {};
    const recruitmentVideosCountForThreadObj = {};


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

      const createdDate = moment(lodashGet(valueObj, ['regi_date'], '')).utc().toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['sort_date'], '')).utc().toISOString();
      const user_no = lodashGet(valueObj, ['user_no'], '');

      let name = lodashGet(valueObj, ['handle_name'], '');

      if (!name) {
        name = '';
      }

      const comment = lodashGet(valueObj, ['comment'], '');
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
      const recruitmentComments_id = idsObj[`recruitment_reply_id_${recruitment_reply_id}`];
      // const hardwareID1 = idsObj[`hardware_no_${id_hardware_no_1}`];
      // const hardwareID2 = idsObj[`hardware_no_${id_hardware_no_2}`];
      // const hardwareID3 = idsObj[`hardware_no_${id_hardware_no_3}`];
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
      //   imagesAndVideos_id
      // --------------------------------------------------

      const imagesAndVideos_id = lodashGet(idsImageObj, [`recruitment_reply_id${recruitment_reply_id}`, 'id1'], '');

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


      // --------------------------------------------------
      //   push
      // --------------------------------------------------

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
          replies: 0,
          acceptLanguage: 'ja,en-US;q=0.9,en;q=0.8',
          ip: '192.168.1.0',
          userAgent,
        }

      );


    }




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

      const createdDate = moment(lodashGet(valueObj, ['regi_date'], '')).utc().toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['sort_date'], '')).utc().toISOString();
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

      const comment = lodashGet(valueObj, ['comment'], '');
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

      // if (!title) {
      //   console.log(chalk`
      //     recruitment_id: {green ${recruitment_id}}
      //     title: {green ${title}}
      //   `);
      // }


      // --------------------------------------------------
      //   _id
      // --------------------------------------------------

      const recruitmentThreads_id = idsObj[`recruitment_id_${recruitment_id}`];
      // const recruitmentComments_id = idsObj[`recruitment_reply_id_${recruitment_reply_id}`];
      // const hardwareID1 = idsObj[`hardware_no_${id_hardware_no_1}`];
      // const hardwareID2 = idsObj[`hardware_no_${id_hardware_no_2}`];
      // const hardwareID3 = idsObj[`hardware_no_${id_hardware_no_3}`];
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

      const imagesAndVideos_id = lodashGet(idsImageObj, [`recruitment_id${recruitment_id}`, 'id1'], '');

      // if (imagesAndVideos_id) {
      //   console.log(chalk`
      //     name: {green ${name}}
      //     imagesAndVideos_id: {green ${imagesAndVideos_id}}
      //   `);
      // }


      // --------------------------------------------------
      //   deadlineDate
      // --------------------------------------------------

      const deadlineDate = moment(lodashGet(valueObj, ['limit_date'], '')).utc().toISOString();


      // --------------------------------------------------
      //   publicApprovalUsers_idsArrr
      // --------------------------------------------------

      const publicApprovalUsers_idsArrr = [];
      const approval_users = lodashGet(valueObj, ['approval_users'], '');

      if (approval_users) {

        let approvalUsersArr = approval_users.split('a:1:{i:0;s:3:\"');
        approvalUsersArr = approvalUsersArr[1].split('";}');
        approvalUsersArr.pop();

        if (idsObj[`user_no_${approvalUsersArr[0]}`]) {
          publicApprovalUsers_idsArrr.push(idsObj[`user_no_${approvalUsersArr[0]}`]);
        }

        // console.log(`
        //   ----- approvalUsersArr -----\n
        //   ${util.inspect(JSON.parse(JSON.stringify(approvalUsersArr)), { colors: true, depth: null })}\n
        //   --------------------\n
        // `);

        // console.log(`
        //   ----- publicApprovalUsers_idsArrr -----\n
        //   ${util.inspect(JSON.parse(JSON.stringify(publicApprovalUsers_idsArrr)), { colors: true, depth: null })}\n
        //   --------------------\n
        // `);

      }




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
          publicCommentsUsers_idsArr: [],
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
      const createdDate = moment(lodashGet(valueObj, ['regi_date'], '')).utc().toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['renewal_date'], '')).utc().toISOString();
      const userCommunityID = lodashGet(valueObj, ['community_id'], '');

      const name = lodashGet(valueObj, ['name'], 'Name');
      const description = lodashGet(valueObj, ['description'], '');
      const descriptionShort = lodashGet(valueObj, ['description_mini'], '');

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
      const createdDate = moment(lodashGet(valueObj, ['renewal_date'], '')).utc().toISOString();
      const updatedDate = moment(lodashGet(valueObj, ['renewal_date'], '')).utc().toISOString();
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
            createdDate: ISO8601,
            updatedDate: ISO8601,
            forumObj: {
              threadCount: forumThreadCount === 0 ? 1 : forumThreadCount,
            },
            recruitmentObj: {
              threadCount: recruitmentThreadCount,
            },
            updatedDateObj: {
              forum: ISO8601,
              recruitment: ISO8601,
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
            label: '',
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
    //   recruitment-comments
    // ---------------------------------------------

    await SchemaRecruitmentComments.deleteMany();
    await SchemaRecruitmentComments.insertMany(recruitmentCommentsArr);
    // import SchemaRecruitmentReplies


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
