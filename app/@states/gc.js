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
  //   Hooks
  // --------------------------------------------------
  
  const [gameCommunityObj, setGameCommunityObj] = useState(lodashGet(initialStateObj, ['gameCommunityObj'], {}));
  const [forumThreadsForListObj, setForumThreadsForListObj] = useState(lodashGet(initialStateObj, ['forumThreadsForListObj'], {}));
  const [forumThreadsObj, setForumThreadsObj] = useState(lodashGet(initialStateObj, ['forumThreadsObj'], {}));
  const [forumCommentsObj, setForumCommentsObj] = useState(lodashGet(initialStateObj, ['forumCommentsObj'], {}));
  const [forumRepliesObj, setForumRepliesObj] = useState(lodashGet(initialStateObj, ['forumRepliesObj'], {}));
  
  
  
  
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
    
  };
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export const ContainerStateGc = createContainer(useGc);