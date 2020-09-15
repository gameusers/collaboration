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


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');
const lodashHas = require('lodash/has');
const lodashCloneDeep = require('lodash/cloneDeep');


// ---------------------------------------------
//   Model
// ---------------------------------------------

const SchemaForumThreads = require('../forum-threads/schema.js');
const SchemaForumComments = require('../forum-comments/schema.js');
const SchemaRecruitmentThreads = require('../recruitment-threads/schema.js');
const SchemaRecruitmentComments = require('../recruitment-comments/schema.js');
const SchemaRecruitmentReplies = require('../recruitment-replies/schema.js');
// const SchemaGameCommunities = require('../game-communities/schema.js');
// const SchemaUserCommunities = require('../user-communities/schema.js');

// const ModelForumComments = require('../forum-comments/model.js');
// const ModelGameCommunities = require('../game-communities/model.js');
// const ModelUserCommunities = require('../user-communities/model.js');


// ---------------------------------------------
//   Modules
// ---------------------------------------------

// const { CustomError } = require('../../@modules/error/custom.js');
// const { verifyAuthority } = require('../../@modules/authority.js');


// ---------------------------------------------
//   Format
// ---------------------------------------------

const { formatFeedsArr } = require('./format.js');
const { formatImagesAndVideosObj } = require('../images-and-videos/format.js');


// ---------------------------------------------
//   Moment Locale
// ---------------------------------------------

moment.locale('ja');





/**
 * 日付で並び替える
 * @param {Array} arr - 配列
 * @return {Object} 並び替えたデータ
 */
const sortArray = (arr) => {

  const sortedArr = arr.sort((a, b) => {
    
    const date1 = new Date(a.createdDate);
    const date2 = new Date(b.createdDate);
    
    return (date1 < date2) ? 1 : -1;
    
  });

  return sortedArr;

};




/**
 * フィードを取得する
 * @param {Object} req - リクエスト
 * @param {Object} localeObj - ロケール
 * @param {string} loginUsers_id - DB users _id / ログイン中のユーザーID
 * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
 * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティID
 * @param {number} threadPage - スレッドのページ
 * @param {number} threadLimit - スレッドのリミット
 * @param {number} commentPage - コメントのページ
 * @param {number} commentLimit - コメントのリミット
 * @param {number} replyPage - 返信のページ
 * @param {number} replyLimit - 返信のリミット
 * @return {Object} 取得データ
 */
const findFeed = async ({
  
  req,
  localeObj,
  loginUsers_id,
  arr = [],
  gameCommunities_id,
  userCommunities_id,
  page = 1,
  limit = process.env.NEXT_PUBLIC_FEED_FORUM_LIMIT,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Language & Country & Parse
    // --------------------------------------------------

    // const language = lodashGet(localeObj, ['language'], '');
    // const country = lodashGet(localeObj, ['country'], '');
    // const intLimit = parseInt(limit, 10);



    // --------------------------------------------------
    //   returnObj
    // --------------------------------------------------
    
    const returnObj = {};




    // --------------------------------------------------
    //   フォーラム / ゲームコミュニティ
    // --------------------------------------------------
    
    if (arr.includes('all')) {


      const docForumsGcArr = await findForumGc({

        localeObj,
  
      });

      const docRecruitmentsArr = await findRecruitment({

        localeObj,

      });

      const docForumsUcArr = await findForumUc({

        localeObj,

      });


      // --------------------------------------------------
      //   配列を結合する
      // --------------------------------------------------
      
      mergedArr = docForumsGcArr.concat(docRecruitmentsArr, docForumsUcArr);


      // --------------------------------------------------
      //   フォーマット
      // --------------------------------------------------

      returnObj.allObj = formatFeedsArr({
  
        localeObj,
        arr: sortArray(mergedArr),
        page,
        limit,
        
      });


    }


    
    
    // --------------------------------------------------
    //   フォーラム / ゲームコミュニティ
    // --------------------------------------------------
    
    if (arr.includes('forumGc')) {

      const docForumsGcArr = await findForumGc({

        localeObj,
        gameCommunities_id,
  
      });

      returnObj.forumsGcObj = formatFeedsArr({
  
        localeObj,
        arr: sortArray(docForumsGcArr),
        page,
        limit,
        
      });

    }


    // --------------------------------------------------
    //   募集 / ゲームコミュニティ
    // --------------------------------------------------
    
    if (arr.includes('recruitment')) {

      const docRecruitmentsArr = await findRecruitment({

        localeObj,
        gameCommunities_id,

      });
      
      returnObj.recruitmentsObj = formatFeedsArr({
    
        localeObj,
        arr: sortArray(docRecruitmentsArr),
        page,
        limit,
        
      });

    }
    

    // --------------------------------------------------
    //   フォーラム / ユーザーコミュニティ
    // --------------------------------------------------
    
    if (arr.includes('forumUc')) {

      const docForumsUcArr = await findForumUc({

        localeObj,
        userCommunities_id,

      });

      returnObj.forumsUcObj = formatFeedsArr({
    
        localeObj,
        arr: sortArray(docForumsUcArr),
        page,
        limit,
        
      });

    }
    

    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   app/@database/feeds/model.js - findFeed
    // `);

    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   page: {green ${page}}
    //   limit: {green ${limit}}
    // `);
    
    // console.log(`
    //   ----- docForumsGcArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docForumsGcArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- forumsGcObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumsGcObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- recruitmentsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(recruitmentsObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- docForumsUcArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docForumsUcArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- forumsUcObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(forumsUcObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    

    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return returnObj;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};




/**
 * ゲームコミュニティのフォーラムフィードを取得する
 * @param {Object} localeObj - ロケール
 * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
 * @param {number} page - ページ
 * @param {number} limit - リミット
 * @return {Object} 取得データ
 */
const findForumGc = async ({
  
  localeObj,
  gameCommunities_id,
  page = 1,
  limit = 100,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Language & Country & Parse
    // --------------------------------------------------

    const language = lodashGet(localeObj, ['language'], '');
    const country = lodashGet(localeObj, ['country'], '');
    const intLimit = parseInt(limit, 10);
    



    // --------------------------------------------------
    //   Threads
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   - Match Condition Array
    // ---------------------------------------------
    
    let matchConditionArr = [];
    
    if (gameCommunities_id) {
      
      matchConditionArr = [
        {
          $match: {
            gameCommunities_id,
            userCommunities_id: ''
          }
        },
      ];
        
    } else {

      matchConditionArr = [
        {
          $match: {
            $and: [
              { gameCommunities_id: { $exists: true } },
              { gameCommunities_id: { $ne: null }},
              { gameCommunities_id: { $ne: ''} },
              { userCommunities_id: '' }
            ]
          }
        },
      ];

    }


    // ---------------------------------------------
    //   - Aggregation
    // ---------------------------------------------
    
    const docThreadsArr = await SchemaForumThreads.aggregate([
      
      
      // --------------------------------------------------
      //   Match Condition Array
      // --------------------------------------------------
      
      ...matchConditionArr,
      
      
      // --------------------------------------------------
      //   images-and-videos
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$letImagesAndVideos_id']
                  },
                }
              },
              {
                $project: {
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
      //   games
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'games',
            let: { letGameCommunities_id: '$gameCommunities_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $eq: ['$gameCommunities_id', '$$letGameCommunities_id'] }
                    ]
                  },
                }
              },
              

              // --------------------------------------------------
              //   games / images-and-videos / メイン画像
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $eq: ['$_id', '$$letImagesAndVideos_id']
                          },
                        }
                      },
                      {
                        $project: {
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
              //   games / images-and-videos / サムネイル画像
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { letImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $eq: ['$_id', '$$letImagesAndVideosThumbnail_id']
                          },
                        }
                      },
                      {
                        $project: {
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
              
              {
                $project: {
                  _id: 0,
                  urlID: 1,
                  name: 1,
                  imagesAndVideosObj: 1,
                  imagesAndVideosThumbnailObj: 1,
                }
              }
            ],
            as: 'gamesObj'
          }
      },
      
      {
        $unwind: {
          path: '$gamesObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // --------------------------------------------------
      //   $project
      // --------------------------------------------------
      
      {
        $project: {
          type: 'forumThreadsGc',
          createdDate: 1,
          comments: 1,
          replies: 1,
          localesArr: 1,
          imagesAndVideosObj: 1,
          gamesObj: 1,
        }
      },
      
      
      // --------------------------------------------------
      //   $sort / $skip / $limit
      // --------------------------------------------------
      
      { $sort: { createdDate: -1 } },
      { $skip: (page - 1) * intLimit },
      { $limit: intLimit },
      
      
    ]).exec();
    



    // --------------------------------------------------
    //   Comments & Replies
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   - Match Condition Array
    // ---------------------------------------------
    
    if (gameCommunities_id) {
      
      matchConditionArr = [
        {
          $match: {
            gameCommunities_id,
            userCommunities_id: ''
          }
        },
      ];
        
    } else {

      matchConditionArr = [
        {
          $match: {
            $and: [
              { gameCommunities_id: { $exists: true } },
              { gameCommunities_id: { $ne: null }},
              { gameCommunities_id: { $ne: ''} },
              { userCommunities_id: '' }
            ]
          }
        },
      ];

    }


    // ---------------------------------------------
    //   - Aggregation
    // ---------------------------------------------
    
    const docCommentsArr = await SchemaForumComments.aggregate([
      
      
      // --------------------------------------------------
      //   Match Condition Array
      // --------------------------------------------------
      
      ...matchConditionArr,
      
      
      // --------------------------------------------------
      //   images-and-videos
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$letImagesAndVideos_id']
                  },
                }
              },
              {
                $project: {
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
      //   games
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'games',
            let: { letGameCommunities_id: '$gameCommunities_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $eq: ['$gameCommunities_id', '$$letGameCommunities_id'] }
                    ]
                  },
                }
              },
              

              // --------------------------------------------------
              //   games / images-and-videos / メイン画像
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $eq: ['$_id', '$$letImagesAndVideos_id']
                          },
                        }
                      },
                      {
                        $project: {
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
              //   games / images-and-videos / サムネイル画像
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { letImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $eq: ['$_id', '$$letImagesAndVideosThumbnail_id']
                          },
                        }
                      },
                      {
                        $project: {
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
              
              {
                $project: {
                  _id: 0,
                  urlID: 1,
                  name: 1,
                  imagesAndVideosObj: 1,
                  imagesAndVideosThumbnailObj: 1,
                }
              }
            ],
            as: 'gamesObj'
          }
      },
      
      {
        $unwind: {
          path: '$gamesObj',
          preserveNullAndEmptyArrays: true,
        }
      },


      // --------------------------------------------------
      //   forum-threads
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'forum-threads',
            let: { letForumThreads_id: '$forumThreads_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$letForumThreads_id']
                  },
                }
              },
              {
                $project: {
                  localesArr: 1,
                  comments: 1,
                  replies: 1,
                }
              }
            ],
            as: 'forumThreadsObj'
          }
      },
      
      {
        $unwind: {
          path: '$forumThreadsObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // --------------------------------------------------
      //   $project
      // --------------------------------------------------
      
      {
        $project: {
          type: 'forumCommentsAndRepliesGc',
          createdDate: 1,
          comments: 1,
          replies: 1,
          localesArr: 1,
          imagesAndVideosObj: 1,
          gamesObj: 1,
          forumThreadsObj: 1,
        }
      },
      
      
      // --------------------------------------------------
      //   $sort / $skip / $limit
      // --------------------------------------------------
      
      { $sort: { createdDate: -1 } },
      { $skip: (page - 1) * intLimit },
      { $limit: intLimit },
      
      
    ]).exec();
    
    


    // --------------------------------------------------
    //   配列を結合する
    // --------------------------------------------------
    
    mergedArr = docThreadsArr.concat(docCommentsArr);
    

    // --------------------------------------------------
    //   日付で並び替える
    // --------------------------------------------------

    // const sortedArr = mergedArr.sort((a, b) => {
      
    //   const date1 = new Date(a.createdDate);
    //   const date2 = new Date(b.createdDate);
      
    //   return (date1 < date2) ? 1 : -1;
      
    // });

    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   app/@database/forum-threads/model.js
    // `);

    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   page: {green ${page}}
    //   limit: {green ${limit}}
    // `);
    
    // console.log(`
    //   ----- docThreadsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docThreadsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- docCommentsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docCommentsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- sortedArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(sortedArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return mergedArr;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};




/**
 * ゲームコミュニティの募集フィードを取得する
 * @param {Object} localeObj - ロケール
 * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
 * @param {number} page - ページ
 * @param {number} limit - リミット
 * @return {Object} 取得データ
 */
const findRecruitment = async ({
  
  localeObj,
  gameCommunities_id,
  page = 1,
  limit = 100,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Language & Country & Parse
    // --------------------------------------------------

    const language = lodashGet(localeObj, ['language'], '');
    const country = lodashGet(localeObj, ['country'], '');
    const intLimit = parseInt(limit, 10);
    



    // --------------------------------------------------
    //   Threads
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   - Match Condition Array
    // ---------------------------------------------
    
    let matchConditionArr = [];
    
    if (gameCommunities_id) {
      
      matchConditionArr = [
        {
          $match: {
            gameCommunities_id,
          }
        },
      ];
        
    } else {

      matchConditionArr = [
        {
          $match: {
            $and: [
              { gameCommunities_id: { $exists: true } },
              { gameCommunities_id: { $ne: null }},
              { gameCommunities_id: { $ne: ''} }
            ]
          }
        },
      ];

    }


    // ---------------------------------------------
    //   - Aggregation
    // ---------------------------------------------
    
    const docThreadsArr = await SchemaRecruitmentThreads.aggregate([
      
      
      // --------------------------------------------------
      //   Match Condition Array
      // --------------------------------------------------
      
      ...matchConditionArr,
      
      
      // --------------------------------------------------
      //   images-and-videos
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$letImagesAndVideos_id']
                  },
                }
              },
              {
                $project: {
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
      //   games
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'games',
            let: { letGameCommunities_id: '$gameCommunities_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $eq: ['$gameCommunities_id', '$$letGameCommunities_id'] }
                    ]
                  },
                }
              },
              

              // --------------------------------------------------
              //   games / images-and-videos / メイン画像
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $eq: ['$_id', '$$letImagesAndVideos_id']
                          },
                        }
                      },
                      {
                        $project: {
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
              //   games / images-and-videos / サムネイル画像
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { letImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $eq: ['$_id', '$$letImagesAndVideosThumbnail_id']
                          },
                        }
                      },
                      {
                        $project: {
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
              
              {
                $project: {
                  _id: 0,
                  urlID: 1,
                  name: 1,
                  imagesAndVideosObj: 1,
                  imagesAndVideosThumbnailObj: 1,
                }
              }
            ],
            as: 'gamesObj'
          }
      },
      
      {
        $unwind: {
          path: '$gamesObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // --------------------------------------------------
      //   $project
      // --------------------------------------------------
      
      {
        $project: {
          type: 'recruitmentThreads',
          createdDate: 1,
          comments: 1,
          replies: 1,
          localesArr: 1,
          imagesAndVideosObj: 1,
          gamesObj: 1,
        }
      },
      
      
      // --------------------------------------------------
      //   $sort / $skip / $limit
      // --------------------------------------------------
      
      { $sort: { createdDate: -1 } },
      { $skip: (page - 1) * intLimit },
      { $limit: intLimit },
      
      
    ]).exec();
    



    // --------------------------------------------------
    //   Comments
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   - Match Condition Array
    // ---------------------------------------------
    
    if (gameCommunities_id) {
      
      matchConditionArr = [
        {
          $match: {
            gameCommunities_id,
          }
        },
      ];
        
    } else {

      matchConditionArr = [
        {
          $match: {
            $and: [
              { gameCommunities_id: { $exists: true } },
              { gameCommunities_id: { $ne: null }},
              { gameCommunities_id: { $ne: ''} }
            ]
          }
        },
      ];

    }


    // ---------------------------------------------
    //   - Aggregation
    // ---------------------------------------------
    
    const docCommentsArr = await SchemaRecruitmentComments.aggregate([
      
      
      // --------------------------------------------------
      //   Match Condition Array
      // --------------------------------------------------
      
      ...matchConditionArr,
      
      
      // --------------------------------------------------
      //   images-and-videos
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$letImagesAndVideos_id']
                  },
                }
              },
              {
                $project: {
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
      //   games
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'games',
            let: { letGameCommunities_id: '$gameCommunities_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $eq: ['$gameCommunities_id', '$$letGameCommunities_id'] }
                    ]
                  },
                }
              },
              

              // --------------------------------------------------
              //   games / images-and-videos / メイン画像
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $eq: ['$_id', '$$letImagesAndVideos_id']
                          },
                        }
                      },
                      {
                        $project: {
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
              //   games / images-and-videos / サムネイル画像
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { letImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $eq: ['$_id', '$$letImagesAndVideosThumbnail_id']
                          },
                        }
                      },
                      {
                        $project: {
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
              
              {
                $project: {
                  _id: 0,
                  urlID: 1,
                  name: 1,
                  imagesAndVideosObj: 1,
                  imagesAndVideosThumbnailObj: 1,
                }
              }
            ],
            as: 'gamesObj'
          }
      },
      
      {
        $unwind: {
          path: '$gamesObj',
          preserveNullAndEmptyArrays: true,
        }
      },


      // --------------------------------------------------
      //   recruitment-threads
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'recruitment-threads',
            let: { letRecruitmentThreads_id: '$recruitmentThreads_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$letRecruitmentThreads_id']
                  },
                }
              },
              {
                $project: {
                  localesArr: 1,
                  comments: 1,
                  replies: 1,
                }
              }
            ],
            as: 'recruitmentThreadsObj'
          }
      },
      
      {
        $unwind: {
          path: '$recruitmentThreadsObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // --------------------------------------------------
      //   $project
      // --------------------------------------------------
      
      {
        $project: {
          type: 'recruitmentComments',
          createdDate: 1,
          comments: 1,
          replies: 1,
          localesArr: 1,
          imagesAndVideosObj: 1,
          gamesObj: 1,
          recruitmentThreadsObj: 1,
        }
      },
      
      
      // --------------------------------------------------
      //   $sort / $skip / $limit
      // --------------------------------------------------
      
      { $sort: { createdDate: -1 } },
      { $skip: (page - 1) * intLimit },
      { $limit: intLimit },
      
      
    ]).exec();
    



    // --------------------------------------------------
    //   Replies
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   - Match Condition Array
    // ---------------------------------------------
    
    if (gameCommunities_id) {
      
      matchConditionArr = [
        {
          $match: {
            gameCommunities_id,
          }
        },
      ];
        
    } else {

      matchConditionArr = [
        {
          $match: {
            $and: [
              { gameCommunities_id: { $exists: true } },
              { gameCommunities_id: { $ne: null }},
              { gameCommunities_id: { $ne: ''} }
            ]
          }
        },
      ];

    }


    // ---------------------------------------------
    //   - Aggregation
    // ---------------------------------------------
    
    const docRepliesArr = await SchemaRecruitmentReplies.aggregate([
      
      
      // --------------------------------------------------
      //   Match Condition Array
      // --------------------------------------------------
      
      ...matchConditionArr,
      
      
      // --------------------------------------------------
      //   images-and-videos
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$letImagesAndVideos_id']
                  },
                }
              },
              {
                $project: {
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
      //   games
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'games',
            let: { letGameCommunities_id: '$gameCommunities_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$language', language] },
                      { $eq: ['$country', country] },
                      { $eq: ['$gameCommunities_id', '$$letGameCommunities_id'] }
                    ]
                  },
                }
              },
              

              // --------------------------------------------------
              //   games / images-and-videos / メイン画像
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $eq: ['$_id', '$$letImagesAndVideos_id']
                          },
                        }
                      },
                      {
                        $project: {
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
              //   games / images-and-videos / サムネイル画像
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { letImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $eq: ['$_id', '$$letImagesAndVideosThumbnail_id']
                          },
                        }
                      },
                      {
                        $project: {
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
              
              {
                $project: {
                  _id: 0,
                  urlID: 1,
                  name: 1,
                  imagesAndVideosObj: 1,
                  imagesAndVideosThumbnailObj: 1,
                }
              }
            ],
            as: 'gamesObj'
          }
      },
      
      {
        $unwind: {
          path: '$gamesObj',
          preserveNullAndEmptyArrays: true,
        }
      },


      // --------------------------------------------------
      //   recruitment-threads
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'recruitment-threads',
            let: { letRecruitmentThreads_id: '$recruitmentThreads_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$letRecruitmentThreads_id']
                  },
                }
              },
              {
                $project: {
                  localesArr: 1,
                  comments: 1,
                  replies: 1,
                }
              }
            ],
            as: 'recruitmentThreadsObj'
          }
      },
      
      {
        $unwind: {
          path: '$recruitmentThreadsObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // --------------------------------------------------
      //   $project
      // --------------------------------------------------
      
      {
        $project: {
          type: 'recruitmentReplies',
          createdDate: 1,
          comments: 1,
          replies: 1,
          localesArr: 1,
          imagesAndVideosObj: 1,
          gamesObj: 1,
          recruitmentThreadsObj: 1,
        }
      },
      
      
      // --------------------------------------------------
      //   $sort / $skip / $limit
      // --------------------------------------------------
      
      { $sort: { createdDate: -1 } },
      { $skip: (page - 1) * intLimit },
      { $limit: intLimit },
      
      
    ]).exec();

    


    // --------------------------------------------------
    //   配列を結合する
    // --------------------------------------------------
    
    mergedArr = docThreadsArr.concat(docCommentsArr, docRepliesArr);
    

    // --------------------------------------------------
    //   日付で並び替える
    // --------------------------------------------------

    // const sortedArr = mergedArr.sort((a, b) => {
      
    //   const date1 = new Date(a.createdDate);
    //   const date2 = new Date(b.createdDate);
      
    //   return (date1 < date2) ? 1 : -1;
      
    // });

    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   app/@database/forum-threads/model.js - findRecruitment
    // `);

    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   page: {green ${page}}
    //   limit: {green ${limit}}
    // `);
    
    // console.log(`
    //   ----- docThreadsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docThreadsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- docCommentsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docCommentsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- docRepliesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docRepliesArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- sortedArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(sortedArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return mergedArr;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};




/**
 * ユーザーコミュニティのフォーラムフィードを取得する
 * @param {Object} localeObj - ロケール
 * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティID
 * @param {number} page - ページ
 * @param {number} limit - リミット
 * @return {Object} 取得データ
 */
const findForumUc = async ({
  
  localeObj,
  userCommunities_id,
  page = 1,
  limit = 100,
  
}) => {
  
  
  try {
    
    
    // --------------------------------------------------
    //   Language & Country & Parse
    // --------------------------------------------------

    const language = lodashGet(localeObj, ['language'], '');
    const country = lodashGet(localeObj, ['country'], '');
    const intLimit = parseInt(limit, 10);
    



    // --------------------------------------------------
    //   Threads
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   - Match Condition Array
    // ---------------------------------------------
    
    let matchConditionArr = [];
    
    if (userCommunities_id) {
      
      matchConditionArr = [
        {
          $match: {
            userCommunities_id,
            gameCommunities_id: ''
          }
        },
      ];
        
    } else {

      matchConditionArr = [
        {
          $match: {
            $and: [
              { userCommunities_id: { $exists: true } },
              { userCommunities_id: { $ne: null }},
              { userCommunities_id: { $ne: ''} },
              { gameCommunities_id: '' }
            ]
          }
        },
      ];

    }


    // ---------------------------------------------
    //   - Aggregation
    // ---------------------------------------------
    
    const docThreadsArr = await SchemaForumThreads.aggregate([
      
      
      // --------------------------------------------------
      //   Match Condition Array
      // --------------------------------------------------
      
      ...matchConditionArr,
      
      
      // --------------------------------------------------
      //   images-and-videos
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$letImagesAndVideos_id']
                  },
                }
              },
              {
                $project: {
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
      //   user-communities
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'user-communities',
            let: { letUserCommunities_id: '$userCommunities_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$_id', '$$letUserCommunities_id'] },
                      { $eq: ['$communityType', 'open'] }
                    ]
                  },
                }
              },
              

              // --------------------------------------------------
              //   user-communities / images-and-videos / メイン画像
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $eq: ['$_id', '$$letImagesAndVideos_id']
                          },
                        }
                      },
                      {
                        $project: {
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
              //   user-communities / images-and-videos / サムネイル画像
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { letImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $eq: ['$_id', '$$letImagesAndVideosThumbnail_id']
                          },
                        }
                      },
                      {
                        $project: {
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
              
              {
                $project: {
                  _id: 0,
                  userCommunityID: 1,
                  localesArr: 1,
                  imagesAndVideosObj: 1,
                  imagesAndVideosThumbnailObj: 1,
                }
              }
            ],
            as: 'userCommunitiesObj'
          }
      },
      
      {
        $unwind: {
          path: '$userCommunitiesObj',
          // preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // --------------------------------------------------
      //   $project
      // --------------------------------------------------
      
      {
        $project: {
          type: 'forumThreadsUc',
          createdDate: 1,
          comments: 1,
          replies: 1,
          localesArr: 1,
          imagesAndVideosObj: 1,
          userCommunitiesObj: 1,
        }
      },
      
      
      // --------------------------------------------------
      //   $sort / $skip / $limit
      // --------------------------------------------------
      
      { $sort: { createdDate: -1 } },
      { $skip: (page - 1) * intLimit },
      { $limit: intLimit },
      
      
    ]).exec();
    



    // --------------------------------------------------
    //   Comments & Replies
    // --------------------------------------------------
    
    // ---------------------------------------------
    //   - Match Condition Array
    // ---------------------------------------------
    
    if (userCommunities_id) {
      
      matchConditionArr = [
        {
          $match: {
            userCommunities_id,
            gameCommunities_id: ''
          }
        },
      ];
        
    } else {

      matchConditionArr = [
        {
          $match: {
            $and: [
              { userCommunities_id: { $exists: true } },
              { userCommunities_id: { $ne: null }},
              { userCommunities_id: { $ne: ''} },
              { gameCommunities_id: '' }
            ]
          }
        },
      ];

    }


    // ---------------------------------------------
    //   - Aggregation
    // ---------------------------------------------
    
    const docCommentsArr = await SchemaForumComments.aggregate([
      
      
      // --------------------------------------------------
      //   Match Condition Array
      // --------------------------------------------------
      
      ...matchConditionArr,
      
      
      // --------------------------------------------------
      //   images-and-videos
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'images-and-videos',
            let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$letImagesAndVideos_id']
                  },
                }
              },
              {
                $project: {
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
      //   user-communities
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'user-communities',
            let: { letUserCommunities_id: '$userCommunities_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$_id', '$$letUserCommunities_id'] },
                      { $eq: ['$communityType', 'open'] }
                    ]
                  },
                }
              },
              

              // --------------------------------------------------
              //   user-communities / images-and-videos / メイン画像
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { letImagesAndVideos_id: '$imagesAndVideos_id' },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $eq: ['$_id', '$$letImagesAndVideos_id']
                          },
                        }
                      },
                      {
                        $project: {
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
              //   user-communities / images-and-videos / サムネイル画像
              // --------------------------------------------------
              
              {
                $lookup:
                  {
                    from: 'images-and-videos',
                    let: { letImagesAndVideosThumbnail_id: '$imagesAndVideosThumbnail_id' },
                    pipeline: [
                      {
                        $match: {
                          $expr: {
                            $eq: ['$_id', '$$letImagesAndVideosThumbnail_id']
                          },
                        }
                      },
                      {
                        $project: {
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
              
              {
                $project: {
                  _id: 0,
                  userCommunityID: 1,
                  localesArr: 1,
                  imagesAndVideosObj: 1,
                  imagesAndVideosThumbnailObj: 1,
                }
              }
            ],
            as: 'userCommunitiesObj'
          }
      },
      
      {
        $unwind: {
          path: '$userCommunitiesObj',
          // preserveNullAndEmptyArrays: true,
        }
      },


      // --------------------------------------------------
      //   forum-threads
      // --------------------------------------------------
      
      {
        $lookup:
          {
            from: 'forum-threads',
            let: { letForumThreads_id: '$forumThreads_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$letForumThreads_id']
                  },
                }
              },
              {
                $project: {
                  localesArr: 1,
                  comments: 1,
                  replies: 1,
                }
              }
            ],
            as: 'forumThreadsObj'
          }
      },
      
      {
        $unwind: {
          path: '$forumThreadsObj',
          preserveNullAndEmptyArrays: true,
        }
      },
      
      
      // --------------------------------------------------
      //   $project
      // --------------------------------------------------
      
      {
        $project: {
          type: 'forumCommentsAndRepliesUc',
          createdDate: 1,
          comments: 1,
          replies: 1,
          localesArr: 1,
          imagesAndVideosObj: 1,
          userCommunitiesObj: 1,
          forumThreadsObj: 1,
        }
      },
      
      
      // --------------------------------------------------
      //   $sort / $skip / $limit
      // --------------------------------------------------
      
      { $sort: { createdDate: -1 } },
      { $skip: (page - 1) * intLimit },
      { $limit: intLimit },
      
      
    ]).exec();
    
    


    // --------------------------------------------------
    //   配列を結合する
    // --------------------------------------------------
    
    mergedArr = docThreadsArr.concat(docCommentsArr);
    

    // --------------------------------------------------
    //   日付で並び替える
    // --------------------------------------------------

    // const sortedArr = mergedArr.sort((a, b) => {
      
    //   const date1 = new Date(a.createdDate);
    //   const date2 = new Date(b.createdDate);
      
    //   return (date1 < date2) ? 1 : -1;
      
    // });

    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   app/@database/feeds/model.js - findForumUc
    // `);

    // console.log(chalk`
    //   loginUsers_id: {green ${loginUsers_id}}
    //   userCommunities_id: {green ${userCommunities_id}}
    //   page: {green ${page}}
    //   limit: {green ${limit}}
    // `);
    
    // console.log(`
    //   ----- docThreadsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docThreadsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);

    // console.log(`
    //   ----- docCommentsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(docCommentsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- sortedArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(sortedArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return mergedArr;
    
    
  } catch (err) {
    
    throw err;
    
  }
  
  
};






// --------------------------------------------------
//   Export
// --------------------------------------------------

module.exports = {
  
  findFeed,
  
};