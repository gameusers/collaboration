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

import { useState } from 'react';
import { createContainer } from 'unstated-next';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';






// --------------------------------------------------
//   States
// --------------------------------------------------

const useGc = (initialStateObj) => {
  
  
  
  // --------------------------------------------------
  //   Initial State
  // --------------------------------------------------
  
  const categories = lodashGet(initialStateObj, ['categories'], '');
  
  let categoriesArr = [];
  
  if (categories) {
    
    categoriesArr = categories.split(',');
    categoriesArr = categoriesArr.map(value => parseInt(value, 10));
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const [gameCommunityObj, setGameCommunityObj] = useState(lodashGet(initialStateObj, ['gameCommunityObj'], {}));
  
  
  const [forumThreadsForListObj, setForumThreadsForListObj] = useState(lodashGet(initialStateObj, ['forumThreadsForListObj'], {}));
  const [forumThreadsObj, setForumThreadsObj] = useState(lodashGet(initialStateObj, ['forumThreadsObj'], {}));
  const [forumCommentsObj, setForumCommentsObj] = useState(lodashGet(initialStateObj, ['forumCommentsObj'], {}));
  const [forumRepliesObj, setForumRepliesObj] = useState(lodashGet(initialStateObj, ['forumRepliesObj'], {}));
  
  const [reloadForceForumComment, setReloadForceForumComment] = useState(false);
  const [reloadForceForumReply, setReloadForceForumReply] = useState(false);
  
  
  const [recruitmentThreadsObj, setRecruitmentThreadsObj] = useState(lodashGet(initialStateObj, ['recruitmentThreadsObj'], {}));
  const [recruitmentCommentsObj, setRecruitmentCommentsObj] = useState(lodashGet(initialStateObj, ['recruitmentCommentsObj'], {}));
  const [recruitmentRepliesObj, setRecruitmentRepliesObj] = useState(lodashGet(initialStateObj, ['recruitmentRepliesObj'], {}));
  
  const [reloadForceRecruitmentComment, setReloadForceRecruitmentComment] = useState(false);
  const [reloadForceRecruitmentReply, setReloadForceRecruitmentReply] = useState(false);
  
  
  const [searchHardwaresArr, setSearchHardwaresArr] = useState(lodashGet(initialStateObj, ['hardwaresArr'], []));
  const [searchCategoriesArr, setSearchCategoriesArr] = useState(categoriesArr);
  const [searchKeyword, setSearchKeyword] = useState(lodashGet(initialStateObj, ['keyword'], ''));
  
  
  // const [forumThreadsReload, setForumThreadsReload] = useState(false);
  // const [forumCommentsReload, setForumCommentsReload] = useState(false);
  // const [forumRepliesReload, setForumRepliesReload] = useState(false);
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/@states/layout.js
  // `);
  
  // console.log(`
  //   ----- loginUsersObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(loginUsersObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return {
    
    gameCommunityObj,
    setGameCommunityObj,
    
    
    
    
    forumThreadsForListObj,
    setForumThreadsForListObj,
    
    forumThreadsObj,
    setForumThreadsObj,
    
    forumCommentsObj,
    setForumCommentsObj,
    
    forumRepliesObj,
    setForumRepliesObj,
    
    reloadForceForumComment,
    setReloadForceForumComment,
    
    reloadForceForumReply,
    setReloadForceForumReply,
    
    
    
    
    recruitmentThreadsObj,
    setRecruitmentThreadsObj,
    
    recruitmentCommentsObj,
    setRecruitmentCommentsObj,
    
    recruitmentRepliesObj,
    setRecruitmentRepliesObj,
    
    reloadForceRecruitmentComment,
    setReloadForceRecruitmentComment,
    
    reloadForceRecruitmentReply,
    setReloadForceRecruitmentReply,
    
    
    
    
    searchHardwaresArr,
    setSearchHardwaresArr,
    
    searchCategoriesArr,
    setSearchCategoriesArr,
    
    searchKeyword,
    setSearchKeyword,
    
    
  };
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export const ContainerStateGc = createContainer(useGc);