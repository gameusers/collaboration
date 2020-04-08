// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const moment = require('moment');
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');
const lodashHas = require('lodash/has');
const lodashCloneDeep = require('lodash/cloneDeep');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const Schema = require('./schema');
const SchemaForumComments = require('../forum-comments/schema');
const SchemaImagesAndVideos = require('../images-and-videos/schema');
const SchemaGameCommunities = require('../game-communities/schema');
const SchemaUserCommunities = require('../user-communities/schema');

const ModelForumComments = require('../forum-comments/model');
const ModelGameCommunities = require('../game-communities/model');
const ModelUserCommunities = require('../user-communities/model');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

const { CustomError } = require('../../@modules/error/custom');
const { verifyAuthority } = require('../../@modules/authority');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatImagesAndVideosObj } = require('../images-and-videos/format');
const { formatFollowsObj } = require('../follows/format');
const { formatIDsArr } = require('../ids/format');




// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * 検索してデータを取得する / 1件だけ
 * @param {Object} conditionObj - 検索条件
 * @return {Object} 取得データ
 */
const findOne = async ({ conditionObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Error
    // --------------------------------------------------
    
    if (!conditionObj || !Object.keys(conditionObj).length) {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   FindOne
    // --------------------------------------------------
    
    return await Schema.findOne(conditionObj).exec();
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};




/**
 * 取得する
 * @param {Object} conditionObj - 検索条件
 * @return {Array} 取得データ
 */
const find = async ({ conditionObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Error
    // --------------------------------------------------
    
    if (!conditionObj || !Object.keys(conditionObj).length) {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    return await Schema.find(conditionObj).exec();
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * カウントを取得する
 * @param {Object} conditionObj - 検索条件
 * @return {number} カウント数
 */
const count = async ({ conditionObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Error
    // --------------------------------------------------
    
    if (!conditionObj || !Object.keys(conditionObj).length) {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   Find
    // --------------------------------------------------
    
    return await Schema.countDocuments(conditionObj).exec();
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 挿入 / 更新する
 * @param {Object} conditionObj - 検索条件
 * @param {Object} saveObj - 保存するデータ
 * @return {Array}
 */
const upsert = async ({ conditionObj, saveObj }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Error
    // --------------------------------------------------
    
    if (!conditionObj || !Object.keys(conditionObj).length) {
      throw new Error();
    }
    
    if (!saveObj || !Object.keys(saveObj).length) {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   Upsert
    // --------------------------------------------------
    
    return await Schema.findOneAndUpdate(conditionObj, saveObj, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 大量に挿入する
 * @param {Array} saveArr - 保存するデータ
 * @return {Array}
 */
const insertMany = async ({ saveArr }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Error
    // --------------------------------------------------
    
    if (!saveArr || !saveArr.length) {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   insertMany
    // --------------------------------------------------
    
    return await Schema.insertMany(saveArr);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};




/**
 * 削除する
 * @param {Object} conditionObj - 検索条件
 * @param {boolean} reset - trueでデータをすべて削除する
 * @return {Array} 
 */
const deleteMany = async ({ conditionObj, reset = false }) => {
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Error
    // --------------------------------------------------
    
    if (!reset && (!conditionObj || !Object.keys(conditionObj).length)) {
      throw new Error();
    }
    
    
    // --------------------------------------------------
    //   Delete
    // --------------------------------------------------
    
    return await Schema.deleteMany(conditionObj);
    
    
  } catch (err) {
    
    throw err;
    
  }
  
};






// --------------------------------------------------
//   スレッド
// --------------------------------------------------

/**
 * スレッドを取得する
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
 * @param {number} threadPage - スレッドのページ
 * @param {number} threadLimit - スレッドのリミット
 * @param {number} commentPage - コメントのページ
 * @param {number} commentLimit - コメントのリミット
 * @param {number} replyPage - 返信のページ
 * @param {number} replyLimit - 返信のリミット
 * @return {Array} 取得データ
 */
const findForRecruitment = async ({
  
  req,
  localeObj,
  loginUsers_id,
  gameCommunities_id,
  threadPage = 1,
  threadLimit = process.env.RECRUITMENT_THREAD_LIMIT,
  commentPage = 1,
  commentLimit = process.env.RECRUITMENT_COMMENT_LIMIT,
  replyPage = 1,
  replyLimit = process.env.RECRUITMENT_REPLY_LIMIT,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Parse
    // --------------------------------------------------
    
    const intThreadLimit = parseInt(threadLimit, 10);
    const intCommentLimit = parseInt(commentLimit, 10);
    const intReplyLimit = parseInt(replyLimit, 10);
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const language = lodashGet(localeObj, ['language'], '');
    const country = lodashGet(localeObj, ['country'], '');
    
    
    
    
    // --------------------------------------------------
    //   Match Condition Array
    // --------------------------------------------------
    
    let matchConditionArr = [];
    
    matchConditionArr = [
      {
        $match : { gameCommunities_id }
      },
    ];
    
    
    // --------------------------------------------------
    //   threadCount
    // --------------------------------------------------
    
    const gameCommunityArr = await ModelGameCommunities.find({
      
      conditionObj: {
        _id: gameCommunities_id
      }
      
    });
    
    const threadCount = lodashGet(gameCommunityArr, [0, 'recruitmentObj', 'threadCount'], 0);
    
    
    
    
    // --------------------------------------------------
    //   Aggregation
    // --------------------------------------------------
    
    const docArr = await Schema.aggregate([
      
      
      // --------------------------------------------------
      //   Match Condition Array
      // --------------------------------------------------
      
      ...matchConditionArr,
      
      
      // --------------------------------------------------
      //   card-players / プレイヤーカードを取得（名前＆ステータス＆サムネイル用）
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'card-players',
            let: { recruitmentUsers_id: '$users_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$language', language] },
                      { $eq: ['$users_id', '$$recruitmentUsers_id'] },
                    ]
                  },
                }
              },
              
              
              // --------------------------------------------------
              //   card-players / images-and-videos / サムネイルを取得
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { cardPlayersImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $eq: ['$_id', '$$cardPlayersImagesAndVideosThumbnail_id'] },
                        }
                      },
                      { $project:
                        {
                          createdDate: 0,
                          updatedDate: 0,
                          users_id: 0,
                          __v: 0,
                        }
                      }
                    ],
                    as: 'imagesAndVideosThumbnailObj'
                  }
              },
              
              {
                $unwind: {
                  path: '$imagesAndVideosThumbnailObj',
                  preserveNullAndEmptyArrays: true,
                }
              },
              
              
              { $project:
                {
                  name: '$nameObj.value',
                  status: '$statusObj.value',
                  imagesAndVideosThumbnailObj: 1,
                }
              }
            ],
            as: 'cardPlayersObj'
          }
      },
      
      {
        $unwind: {
          path: '$cardPlayersObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // --------------------------------------------------
      //   users / ユーザーを取得（アクセス日時＆経験値＆プレイヤーID用）
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'users',
            let: { forumCommentsUsers_id: '$users_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$forumCommentsUsers_id'] },
                }
              },
              { $project:
                {
                  _id: 0,
                  accessDate: 1,
                  exp: 1,
                  userID: 1,
                }
              }
            ],
            as: 'usersObj'
          }
      },
      
      {
        $unwind: {
          path: '$usersObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // --------------------------------------------------
      //   images-and-videos
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { recruitmentImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $eq: ['$_id', '$$recruitmentImagesAndVideos_id'] },
                }
              },
              { $project:
                {
                  createdDate: 0,
                  updatedDate: 0,
                  users_id: 0,
                  __v: 0,
                }
              }
            ],
            as: 'imagesAndVideosObj'
          }
      },
      
      {
        $unwind: {
          path: '$imagesAndVideosObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // --------------------------------------------------
      //   hardwares
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'hardwares',
            let: { recruitmentHardwareIDsArr: '$hardwareIDsArr' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $in: ['$hardwareID', '$$recruitmentHardwareIDsArr'] }
                    ]
                  },
                }
              },
              { $project:
                {
                  _id: 0,
                  hardwareID: 1,
                  name: 1,
                }
              }
            ],
            as: 'hardwaresArr'
          }
      },
      
      
      // --------------------------------------------------
      //   follows
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'follows',
            let: { recruitmentUsers_id: '$users_id' },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $ne: ['$users_id', '' ] },
                      { $eq: ['$users_id', '$$recruitmentUsers_id'] },
                    ]
                  },
                  
                }
              },
            ],
            as: 'followsObj'
          }
      },
      
      {
        $unwind: {
          path: '$followsObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // --------------------------------------------------
      //   ids
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'ids',
            let: {
              recruitmentIds_idArr: '$ids_idsArr',
              recruitmentUsers_id: '$users_id',
            },
            pipeline: [
              { $match:
                { $expr:
                  { $and:
                    [
                      { $eq: ['$users_id', '$$recruitmentUsers_id'] },
                      { $in: ['$_id', '$$recruitmentIds_idArr'] }
                    ]
                  },
                }
              },
              
              
              // --------------------------------------------------
              //   ids / games
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'games',
                    let: { idsGameCommunities_id: '$gameCommunities_id' },
                    pipeline: [
                      { $match:
                        { $expr:
                          { $and:
                            [
                              { $eq: ['$language', language] },
                              { $eq: ['$country', country] },
                              { $eq: ['$gameCommunities_id', '$$idsGameCommunities_id'] }
                            ]
                          },
                        }
                      },
                      
                      
                      // --------------------------------------------------
                      //   ids / games / images-and-videos / サムネイル用
                      // --------------------------------------------------
                      
                      {
                        $lookup:
                          {
                            from: 'images-and-videos',
                            let: { gamesImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
                            pipeline: [
                              { $match:
                                { $expr:
                                  { $eq: ['$_id', '$$gamesImagesAndVideosThumbnail_id'] },
                                }
                              },
                              { $project:
                                {
                                  createdDate: 0,
                                  updatedDate: 0,
                                  users_id: 0,
                                  __v: 0,
                                }
                              }
                            ],
                            as: 'imagesAndVideosThumbnailObj'
                          }
                      },
                      
                      {
                        $unwind: {
                          path: '$imagesAndVideosThumbnailObj',
                          preserveNullAndEmptyArrays: true,
                        }
                      },
                      
                      
                      { $project:
                        {
                          _id: 1,
                          gameCommunities_id: 1,
                          name: 1,
                          imagesAndVideosThumbnailObj: 1,
                        }
                      }
                    ],
                    as: 'gamesObj'
                  }
              },
              
              {
                $unwind:
                  {
                    path: '$gamesObj',
                    preserveNullAndEmptyArrays: true
                  }
              },
              
              
              { $project:
                {
                  createdDate: 0,
                  updatedDate: 0,
                  users_id: 0,
                  search: 0,
                  __v: 0,
                }
              }
            ],
            as: 'idsArr'
          }
      },
      
      
      { $project:
        {
          imagesAndVideos_id: 0,
          __v: 0,
        }
      },
      
      
      { '$sort': { 'updatedDate': -1 } },
      { $skip: (threadPage - 1) * intThreadLimit },
      { $limit: intThreadLimit },
      
      
    ]).exec();
    
    
    
    
    // --------------------------------------------------
    //   Format
    // --------------------------------------------------
    
    const formattedThreadsObj = format({
      
      req,
      localeObj,
      loginUsers_id,
      arr: docArr,
      threadPage,
      threadCount,
      
    });
    
    const recruitmentThreadsObj = lodashGet(formattedThreadsObj, ['recruitmentThreadsObj'], {});
    const recruitmentThreads_idsForCommentArr = lodashGet(formattedThreadsObj, ['recruitmentThreads_idsForCommentArr'], []);
    
    
    
    
    // // --------------------------------------------------
    // //   DB find / Forum Comments & Replies
    // // --------------------------------------------------
    
    // const forumCommentsAndRepliesObj = await ModelForumComments.findCommentsAndRepliesByForumThreads_idsArr({
    //   req,
    //   localeObj,
    //   loginUsers_id,
    //   forumThreads_idsArr: forumThreads_idsForCommentArr,
    //   forumThreadsObj,
    //   commentPage,
    //   commentLimit: intCommentLimit,
    //   replyPage,
    //   replyLimit: intReplyLimit,
    // });
    
    // const forumCommentsObj = lodashGet(forumCommentsAndRepliesObj, ['forumCommentsObj'], {});
    // const forumRepliesObj = lodashGet(forumCommentsAndRepliesObj, ['forumRepliesObj'], {});
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/recruitment-threads/model.js - findForRecruitment
    // `);
    
    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   threadPage: {green ${threadPage}}
    //   threadLimit: {green ${threadLimit}}
    //   commentLimit: {green ${commentLimit}}
    //   replyLimit: {green ${replyLimit}}
    // `);
    
    // console.log(`
    //   ----- docArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- formattedThreadsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(formattedThreadsObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumCommentsAndRepliesObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumCommentsAndRepliesObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumThreadsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumCommentsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumCommentsObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumRepliesObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumRepliesObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return {
      
      recruitmentThreadsObj,
      
    };
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};







/**
* DB から取得したデータをフォーマットする
* @param {Object} req - リクエスト
* @param {Object} localeObj - ロケール
* @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
* @param {Array} arr - 配列
* @param {number} threadPage - スレッドのページ数
* @param {number} threadCount - スレッドの総数
* @return {Array} フォーマット後のデータ
*/
const format = ({
  
  req,
  localeObj,
  loginUsers_id,
  arr,
  threadPage,
  threadCount,
  
}) => {
  
  
  // --------------------------------------------------
  //   Return Value
  // --------------------------------------------------
  
  const recruitmentThreadsObj = {
    
    page: threadPage,
    count: threadCount,
    dataObj: {},
    
  };
  
  const dataObj = {};
  const recruitmentThreads_idsForCommentArr = [];
  const ISO8601 = moment().utc().toISOString();
  
  
  
  
  // --------------------------------------------------
  //   Loop
  // --------------------------------------------------
  
  for (let valueObj of arr.values()) {
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- valueObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(valueObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- valueObj.cardPlayersObj.imagesAndVideosThumbnailObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(valueObj.cardPlayersObj.imagesAndVideosThumbnailObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const users_id = lodashGet(valueObj, ['users_id'], '');
    const imagesAndVideosObj = lodashGet(valueObj, ['imagesAndVideosObj'], {});
    const followsObj = lodashGet(valueObj, ['followsObj'], {});
    const idsArr = lodashGet(valueObj, ['idsArr'], []);
    const hardwareIDsArr = lodashGet(valueObj, ['hardwareIDsArr'], []);
    const hardwaresArr = lodashGet(valueObj, ['hardwaresArr'], []);
    const imagesAndVideosThumbnailObj = lodashGet(valueObj, ['cardPlayersObj', 'imagesAndVideosThumbnailObj'], {});
    
    
    // --------------------------------------------------
    //   Deep Copy
    // --------------------------------------------------
    
    const clonedObj = lodashCloneDeep(valueObj);
    
    
    // --------------------------------------------------
    //   Datetime
    // --------------------------------------------------
    
    clonedObj.updatedDate = moment(valueObj.updatedDate).utc().format('YYYY/MM/DD hh:mm');
    
    
    // --------------------------------------------------
    //   Format - 画像
    // --------------------------------------------------
    
    const formattedObj = formatImagesAndVideosObj({ localeObj, obj: imagesAndVideosObj });
    
    if (formattedObj) {
      
      clonedObj.imagesAndVideosObj = formattedObj;
      
    } else {
      
      delete clonedObj.imagesAndVideosObj;
      
    }
    
    
    // --------------------------------------------------
    //   Format - cardPlayersObj サムネイル画像
    // --------------------------------------------------
    
    const formattedThumbnailObj = formatImagesAndVideosObj({ localeObj, obj: imagesAndVideosThumbnailObj });
    
    // console.log(`
    //   ----- formattedThumbnailObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(formattedThumbnailObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    if (formattedThumbnailObj) {
      
      clonedObj.cardPlayersObj.imagesAndVideosThumbnailObj = formattedThumbnailObj;
      
    }
    
    
    // --------------------------------------------------
    //   Format - Follows
    // --------------------------------------------------
    
    clonedObj.followsObj = formatFollowsObj({ followsObj, adminUsers_id: users_id, loginUsers_id });
    
    
    // --------------------------------------------------
    //   Format - IDs
    // --------------------------------------------------
    
    clonedObj.idsArr = formatIDsArr({ localeObj, loginUsers_id, followsObj: clonedObj.followsObj, arr: idsArr });;
    
    
    // --------------------------------------------------
    //   編集権限
    // --------------------------------------------------
    
    clonedObj.editable = verifyAuthority({
      
      req,
      users_id: valueObj.users_id,
      loginUsers_id,
      ISO8601: valueObj.createdDate,
      _id: valueObj._id,
      
    });
    
    
    // --------------------------------------------------
    //   Name & Description
    // --------------------------------------------------
    
    const filteredArr = valueObj.localesArr.filter((filterObj) => {
      return filterObj.language === localeObj.language;
    });
    
    
    if (lodashHas(filteredArr, [0])) {
      
      clonedObj.title = lodashGet(filteredArr, [0, 'title'], '');
      clonedObj.name = lodashGet(filteredArr, [0, 'name'], '');
      clonedObj.comment = lodashGet(filteredArr, [0, 'comment'], '');
      
    } else {
      
      clonedObj.title = lodashGet(filteredArr, [0, 'title'], '');
      clonedObj.name = lodashGet(valueObj, ['localesArr', 0, 'name'], '');
      clonedObj.comment = lodashGet(valueObj, ['localesArr', 0, 'comment'], '');
      
    }
    
    
    // --------------------------------------------------
    //   hardwaresArr - 元の配列の順番通りに並べなおす
    // --------------------------------------------------
    
    const sortedHardwaresArr = [];
    
    for (let hardwareID of hardwareIDsArr) {
      
      const index = hardwaresArr.findIndex((value2Obj) => {
        return value2Obj.hardwareID === hardwareID;
      });
      
      if (index !== -1) {
        sortedHardwaresArr.push(hardwaresArr[index]);
      }
      
    }
    
    clonedObj.hardwaresArr = sortedHardwaresArr;
    
    
    
    // --------------------------------------------------
    //   不要な項目を削除する
    // --------------------------------------------------
    
    delete clonedObj._id;
    delete clonedObj.createdDate;
    delete clonedObj.users_id;
    delete clonedObj.hardwareIDsArr;
    delete clonedObj.ids_idsArr;
    delete clonedObj.localesArr;
    delete clonedObj.ip;
    delete clonedObj.userAgent;
    delete clonedObj.__v;
    
    
    // --------------------------------------------------
    //   コメント取得用の _id の入った配列に push
    // --------------------------------------------------
    
    dataObj[valueObj._id] = clonedObj;
    
    if (valueObj.comments > 0) {
      recruitmentThreads_idsForCommentArr.push(valueObj._id);
    }
    
    
    // --------------------------------------------------
    //   forumThreadsObj を作成する
    // --------------------------------------------------
    
    const recruitmentThreadsPageArr = lodashGet(recruitmentThreadsObj, [`page${threadPage}Obj`, 'arr'], []);
    
    recruitmentThreadsPageArr.push(valueObj._id);
    
    recruitmentThreadsObj[`page${threadPage}Obj`] = {
      
      loadedDate: ISO8601,
      arr: recruitmentThreadsPageArr,
      
    };
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   dataObj
  // --------------------------------------------------
  
  recruitmentThreadsObj.dataObj = dataObj;
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return {
    
    recruitmentThreadsObj,
    recruitmentThreads_idsForCommentArr,
    
  };
  
  
};




/**
 * コメント＆返信データを取得する　削除用
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} forumThreads_id - DB forum-threads _id / スレッドのID
 * @return {Array} 取得データ
 */
// const findForDeleteThread = async ({
  
//   req,
//   localeObj,
//   loginUsers_id,
//   forumThreads_id,
  
// }) => {
  
  
//   try {
    
    
//     // --------------------------------------------------
//     //   Thread
//     // --------------------------------------------------
    
//     const forumThreadsArr = await Schema.aggregate([
      
      
//       {
//         $match: { _id: forumThreads_id },
//       },
      
      
//       { $project:
//         {
//           createdDate: 1,
//           users_id: 1,
//           imagesAndVideos_id: 1,
//         }
//       },
      
      
//     ]).exec();
    
    
    
    
//     // --------------------------------------------------
//     //   Comments & Replies
//     // --------------------------------------------------
    
//     const forumCommentsArr = await SchemaForumComments.aggregate([
      
      
//       {
//         $match: { forumThreads_id },
//       },
      
      
//       { $project:
//         {
//           createdDate: 1,
//           users_id: 1,
//           imagesAndVideos_id: 1,
//         }
//       },
      
      
//     ]).exec();
    
    
    
    
//     // --------------------------------------------------
//     //   配列が空の場合は処理停止
//     // --------------------------------------------------
    
//     if (forumThreadsArr.length === 0) {
//       throw new CustomError({ level: 'error', errorsArr: [{ code: 'Wwc1vpiQ-', messageID: 'cvS0qSAlE' }] });
//     }
    
    
    
    
//     // --------------------------------------------------
//     //   編集権限がない場合は処理停止
//     // --------------------------------------------------
    
//     const editable = verifyAuthority({
//       req,
//       users_id: lodashGet(forumThreadsArr, [0, 'users_id'], ''),
//       loginUsers_id,
//       ISO8601: lodashGet(forumThreadsArr, [0, 'createdDate'], ''),
//       _id: lodashGet(forumThreadsArr, [0, '_id'], ''),
//     });
    
//     if (!editable) {
//       throw new CustomError({ level: 'error', errorsArr: [{ code: 'M2XmqnE4r', messageID: 'DSRlEoL29' }] });
//     }
    
    
    
    
//     // --------------------------------------------------
//     //   Format
//     // --------------------------------------------------
    
//     const imagesAndVideos_id = lodashGet(forumThreadsArr, [0, 'imagesAndVideos_id'], '');
    
//     let imagesAndVideos_idsArr = [];
    
//     if (imagesAndVideos_id) {
//       imagesAndVideos_idsArr = [imagesAndVideos_id];
//     }
    
    
//     for (let valueObj of forumCommentsArr.values()) {
      
//       if (valueObj.imagesAndVideos_id) {
//         imagesAndVideos_idsArr.push(valueObj.imagesAndVideos_id);
//       }
      
//     }
    
//     const returnObj = {
//       imagesAndVideos_idsArr,
//     };
    
    
    
//     // --------------------------------------------------
//     //   console.log
//     // --------------------------------------------------
    
//     // console.log(chalk`
//     //   forumThreads_id: {green ${forumThreads_id}}
//     // `);
    
//     // console.log(`
//     //   ----- imagesAndVideos_idsArr -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(imagesAndVideos_idsArr)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
    
//     // console.log(`
//     //   ----- forumThreadsArr -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsArr)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- forumCommentsArr -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(forumCommentsArr)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- returnObj -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
    
    
    
//     // --------------------------------------------------
//     //   Return
//     // --------------------------------------------------
    
//     return returnObj;
    
    
//   } catch (err) {
    
//     throw err;
    
//   }
  
  
// };




// /**
// * スレッドを取得する / 編集用（権限もチェック）
// * @param {Object} req - リクエスト
// * @param {Object} localeObj - ロケール
// * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
// * @param {string} forumThreads_id - DB forum-threads _id / スレッドID
// * @return {Array} 取得データ
// */
// const findForEdit = async ({
  
//   req,
//   localeObj,
//   loginUsers_id,
//   forumThreads_id,
  
// }) => {
  
  
//   try {
    
    
//     // --------------------------------------------------
//     //   Find
//     // --------------------------------------------------
    
//     const resultArr = await Schema.aggregate([
      
      
//       // スレッドを取得
//       {
//         $match : { _id: forumThreads_id }
//       },
      
      
//       // 画像と動画を取得
//       {
//         $lookup:
//           {
//             from: 'images-and-videos',
//             let: { forumThreadsImagesAndVideos_id: '$imagesAndVideos_id' },
//             pipeline: [
//               { $match:
//                 { $expr:
//                   { $eq: ['$_id', '$$forumThreadsImagesAndVideos_id'] },
//                 }
//               },
//               { $project:
//                 {
//                   createdDate: 0,
//                   updatedDate: 0,
//                   users_id: 0,
//                   __v: 0,
//                 }
//               }
//             ],
//             as: 'imagesAndVideosObj'
//           }
//       },
      
//       {
//         $unwind: {
//           path: '$imagesAndVideosObj',
//           preserveNullAndEmptyArrays: true,
//         }
//       },
      
      
//       { $project:
//         {
//           createdDate: 0,
//           imagesAndVideos_id: 0,
//           __v: 0,
//         }
//       },
      
      
//     ]).exec();
    
    
    
    
//     // --------------------------------------------------
//     //   配列が空の場合は処理停止
//     // --------------------------------------------------
    
//     if (resultArr.length === 0) {
//       throw new CustomError({ level: 'error', errorsArr: [{ code: 'V2oFFcQIl', messageID: 'cvS0qSAlE' }] });
//     }
    
    
    
    
//     // --------------------------------------------------
//     //   編集権限がない場合は処理停止
//     // --------------------------------------------------
    
//     const editable = verifyAuthority({
//       req,
//       users_id: lodashGet(resultArr, [0, 'users_id'], ''),
//       loginUsers_id,
//       ISO8601: lodashGet(resultArr, [0, 'createdDate'], ''),
//       _id: lodashGet(resultArr, [0, '_id'], '')
//     });
    
//     if (!editable) {
//       throw new CustomError({ level: 'error', errorsArr: [{ code: '-2ENyEiaJ', messageID: 'DSRlEoL29' }] });
//     }
    
    
    
    
//     // --------------------------------------------------
//     //   Format
//     // --------------------------------------------------
    
//     const _id = lodashGet(resultArr, [0, '_id'], '');
//     const imagesAndVideosObj = lodashGet(resultArr, [0, 'imagesAndVideosObj'], {});
//     let name = '';
//     let comment = '';
    
    
//     // --------------------------------------------------
//     //   Name & Description
//     // --------------------------------------------------
    
//     const filteredArr = resultArr.filter((filterObj) => {
//       return filterObj.language === localeObj.language;
//     });
    
    
//     if (lodashHas(filteredArr, [0])) {
      
//       name = lodashGet(filteredArr, [0, 'name'], '');
//       comment = lodashGet(filteredArr, [0, 'comment'], '');
      
//     } else {
      
//       name = lodashGet(resultArr, [0, 'localesArr', 0, 'name'], '');
//       comment = lodashGet(resultArr, [0, 'localesArr', 0, 'comment'], '');
      
//     }
    
    
    
    
//     // --------------------------------------------------
//     //   console.log
//     // --------------------------------------------------
    
//     // console.log(chalk`
//     //   forumThreads_id: {green ${forumThreads_id}}
//     // `);
    
//     // console.log(`
//     //   ----- resultArr -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(resultArr)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- returnObj -----\n
//     //   ${util.inspect(JSON.parse(JSON.stringify(returnObj)), { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
    
    
    
//     // --------------------------------------------------
//     //   Return
//     // --------------------------------------------------
    
//     return {
//       _id,
//       name,
//       comment,
//       imagesAndVideosObj,
//     };
    
    
//   } catch (err) {
    
//     throw err;
    
//   }
  
  
// };





/**
* Transaction 挿入 / 更新する
* スレッド、画像＆動画、ユーザーコミュニティを同時に更新する
* 
* @param {Object} recruitmentThreadsConditionObj - DB recruitment-threads 検索条件
* @param {Object} recruitmentThreadsSaveObj - DB recruitment-threads 保存データ
* @param {Object} imagesAndVideosConditionObj - DB images-and-videos 検索条件
* @param {Object} imagesAndVideosSaveObj - DB images-and-videos 保存データ
* @param {Object} gameCommunitiesConditionObj - DB game-communities 検索条件
* @param {Object} gameCommunitiesSaveObj - DB game-communities 保存データ
* @return {Object} 
*/
const transactionForUpsert = async ({
  
  recruitmentThreadsConditionObj,
  recruitmentThreadsSaveObj,
  imagesAndVideosConditionObj = {},
  imagesAndVideosSaveObj = {},
  gameCommunitiesConditionObj = {},
  gameCommunitiesSaveObj = {},
  
}) => {
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  let returnObj = {};
  
  
  // --------------------------------------------------
  //   Transaction / Session
  // --------------------------------------------------
  
  const session = await Schema.startSession();
  
  
  
  
  // --------------------------------------------------
  //   Database
  // --------------------------------------------------
  
  try {
    
    
    // --------------------------------------------------
    //   Transaction / Start
    // --------------------------------------------------
    
    await session.startTransaction();
    
    
    
    
    // ---------------------------------------------
    //   - recruitment-threads
    // ---------------------------------------------
    
    await Schema.updateOne(recruitmentThreadsConditionObj, recruitmentThreadsSaveObj, { session, upsert: true });
    
    
    // ---------------------------------------------
    //   - images-and-videos
    // ---------------------------------------------
    
    if (Object.keys(imagesAndVideosConditionObj).length !== 0 && Object.keys(imagesAndVideosSaveObj).length !== 0) {
      
      
      // --------------------------------------------------
      //   画像＆動画を削除する
      // --------------------------------------------------
      
      const arr = lodashGet(imagesAndVideosSaveObj, ['arr'], []);
      
      if (arr.length === 0) {
        
        await SchemaImagesAndVideos.deleteOne(imagesAndVideosConditionObj, { session });
        
        
      // --------------------------------------------------
      //   画像＆動画を保存
      // --------------------------------------------------
        
      } else {
        
        await SchemaImagesAndVideos.updateOne(imagesAndVideosConditionObj, imagesAndVideosSaveObj, { session, upsert: true });
        
      }
      
    }
    
    
    // ---------------------------------------------
    //   - game-communities
    // ---------------------------------------------
    
    if (Object.keys(gameCommunitiesConditionObj).length !== 0 && Object.keys(gameCommunitiesSaveObj).length !== 0) {
      
      await SchemaGameCommunities.updateOne(gameCommunitiesConditionObj, gameCommunitiesSaveObj, { session });
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Transaction / Commit
    // --------------------------------------------------
    
    await session.commitTransaction();
    // console.log('--------コミット-----------');
    
    session.endSession();
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@database/recruitment-threads/model.js - transactionForUpsert
    // `);
    
    // console.log(`
    //   ----- recruitmentThreadsConditionObj -----\n
    //   ${util.inspect(recruitmentThreadsConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- recruitmentThreadsSaveObj -----\n
    //   ${util.inspect(recruitmentThreadsSaveObj, { colors: true, depth: null })}\n
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
    //   ----- gameCommunitiesConditionObj -----\n
    //   ${util.inspect(gameCommunitiesConditionObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- gameCommunitiesSaveObj -----\n
    //   ${util.inspect(gameCommunitiesSaveObj, { colors: true, depth: null })}\n
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
    
    await session.abortTransaction();
    // console.log('--------ロールバック-----------');
    
    session.endSession();
    
    
    throw errorObj;
    
  }
  
};




// /**
// * Transaction スレッドを削除する
// * スレッド、コメント、返信、画像＆動画を削除して、ユーザーコミュニティを更新する
// * @param {Object} forumRepliesConditionObj - DB forum-comments 検索条件
// * @param {Object} forumCommentsConditionObj - DB forum-comments 検索条件
// * @param {Object} forumThreadsConditionObj - DB forum-threads 検索条件
// * @param {Object} imagesAndVideosConditionObj - DB images-and-videos 検索条件
// * @param {Object} gameCommunitiesConditionObj - DB game-communities 検索条件
// * @param {Object} gameCommunitiesSaveObj - DB game-communities 保存データ
// * @param {Object} userCommunitiesConditionObj - DB user-communities 検索条件
// * @param {Object} userCommunitiesSaveObj - DB user-communities 保存データ
// * @return {Object} 
// */
// const transactionForDeleteThread = async ({
  
//   forumRepliesConditionObj,
//   forumCommentsConditionObj,
//   forumThreadsConditionObj,
//   imagesAndVideosConditionObj = {},
//   gameCommunitiesConditionObj = {},
//   gameCommunitiesSaveObj = {},
//   userCommunitiesConditionObj = {},
//   userCommunitiesSaveObj = {},
  
// }) => {
  
  
//   // --------------------------------------------------
//   //   Property
//   // --------------------------------------------------
  
//   let returnObj = {};
  
  
//   // --------------------------------------------------
//   //   Transaction / Session
//   // --------------------------------------------------
  
//   const session = await Schema.startSession();
  
  
  
  
//   // --------------------------------------------------
//   //   Database
//   // --------------------------------------------------
  
//   try {
    
    
//     // --------------------------------------------------
//     //   Transaction / Start
//     // --------------------------------------------------
    
//     await session.startTransaction();
    
    
    
    
//     // --------------------------------------------------
//     //   - forum-comments / Comments & Replies / deleteMany
//     // --------------------------------------------------
    
//     await SchemaForumComments.deleteMany(forumRepliesConditionObj, { session });
//     await SchemaForumComments.deleteMany(forumCommentsConditionObj, { session });
    
    
//     // --------------------------------------------------
//     //   - forum-threads / deleteOne
//     // --------------------------------------------------
    
//     await Schema.deleteOne(forumThreadsConditionObj, { session });
    
    
//     // ---------------------------------------------
//     //   - images-and-videos
//     // ---------------------------------------------
    
//     if (Object.keys(imagesAndVideosConditionObj).length !== 0) {
//       await SchemaImagesAndVideos.deleteMany(imagesAndVideosConditionObj, { session });
//     }
    
    
//     // ---------------------------------------------
//     //   - game-communities
//     // ---------------------------------------------
    
//     if (Object.keys(gameCommunitiesConditionObj).length !== 0 && Object.keys(gameCommunitiesSaveObj).length !== 0) {
//       await SchemaGameCommunities.updateOne(gameCommunitiesConditionObj, gameCommunitiesSaveObj, { session });
//     }
    
    
//     // ---------------------------------------------
//     //   - user-communities
//     // ---------------------------------------------
    
//     if (Object.keys(userCommunitiesConditionObj).length !== 0 && Object.keys(userCommunitiesSaveObj).length !== 0) {
//       await SchemaUserCommunities.updateOne(userCommunitiesConditionObj, userCommunitiesSaveObj, { session });
//     }
    
    
    
    
//     // --------------------------------------------------
//     //   Transaction / Commit
//     // --------------------------------------------------
    
//     await session.commitTransaction();
//     // console.log('--------コミット-----------');
    
//     session.endSession();
    
    
    
    
//     // --------------------------------------------------
//     //   console.log
//     // --------------------------------------------------
    
//     // console.log(`
//     //   ----- forumRepliesConditionObj -----\n
//     //   ${util.inspect(forumRepliesConditionObj, { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- forumCommentsConditionObj -----\n
//     //   ${util.inspect(forumCommentsConditionObj, { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- forumThreadsConditionObj -----\n
//     //   ${util.inspect(forumThreadsConditionObj, { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- imagesAndVideosConditionObj -----\n
//     //   ${util.inspect(imagesAndVideosConditionObj, { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- userCommunitiesConditionObj -----\n
//     //   ${util.inspect(userCommunitiesConditionObj, { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- userCommunitiesSaveObj -----\n
//     //   ${util.inspect(userCommunitiesSaveObj, { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
//     // console.log(`
//     //   ----- returnObj -----\n
//     //   ${util.inspect(returnObj, { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
    
    
    
//     // --------------------------------------------------
//     //   Return
//     // --------------------------------------------------
    
//     return returnObj;
    
    
//   } catch (errorObj) {
    
//     // console.log(`
//     //   ----- errorObj -----\n
//     //   ${util.inspect(errorObj, { colors: true, depth: null })}\n
//     //   --------------------\n
//     // `);
    
    
//     // --------------------------------------------------
//     //   Transaction / Rollback
//     // --------------------------------------------------
    
//     await session.abortTransaction();
//     // console.log('--------ロールバック-----------');
    
//     session.endSession();
    
    
//     throw errorObj;
    
//   }
  
// };




// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  
  findOne,
  find,
  count,
  upsert,
  insertMany,
  deleteMany,
  
  findForRecruitment,
  // findForEdit,
  // findForDeleteThread,
  transactionForUpsert,
  // transactionForDeleteThread,
  
};