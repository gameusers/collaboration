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

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconPermIdentity from '@material-ui/icons/PermIdentity';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { CustomError } from 'app/@modules/error/custom.js';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateUser } from 'app/@states/user.js';
import { ContainerStateLayout } from 'app/@states/layout.js';






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

const Component = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    type,
    gameCommunities_id,
    userCommunities_id,
    users_id,
    followsObj = {},
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateUser = ContainerStateUser.useContainer();
  const stateLayout = ContainerStateLayout.useContainer();
  
  const { login } = stateUser;
  const { handleSnackbarOpen, handleDialogOpen } = stateLayout;
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  const handleFollow = async ({
    
    type,
    gameCommunities_id,
    userCommunities_id,
    users_id,
    
  }) => {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      setButtonDisabled(true);
      
      
      
      
      // ---------------------------------------------
      //   リロードするかどうか
      // ---------------------------------------------
      
      let pageTransition = false;
      
      
      
      
      // ---------------------------------------------
      //   Game Community & User Community
      // ---------------------------------------------
      
      if (gameCommunities_id || userCommunities_id) {
        
        
        // ---------------------------------------------
        //   FormData
        // ---------------------------------------------
        
        const formDataObj = {
          
          gameCommunities_id,
          userCommunities_id,
          
        };
        
        
        // ---------------------------------------------
        //   Fetch
        // ---------------------------------------------
        
        const resultObj = await fetchWrapper({
          
          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/follows/upsert-follow-gc-uc`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
          
        });
        
        
        // console.log(`
        //   ----- resultObj -----\n
        //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        
        // ---------------------------------------------
        //   Error
        // ---------------------------------------------
        
        if ('errorsArr' in resultObj) {
          throw new CustomError({ errorsArr: resultObj.errorsArr });
        }
        
        
        
        
        // --------------------------------------------------
        //   console.log
        // --------------------------------------------------
        
        // console.log(`
        //   ----------------------------------------\n
        //   /app/common/follow/v2/components/follow-button.js - handleFollow
        // `);
        
        // console.log(chalk`
        //   type: {green ${type}}
        //   gameCommunities_id: {green ${gameCommunities_id}}
        //   userCommunities_id: {green ${userCommunities_id}}
        // `);
        
        
        
        
        // ---------------------------------------------
        //   結果反映：メンバーかどうか、メンバー数を変更
        // ---------------------------------------------
        
        const follow = lodashGet(resultObj, ['data', 'follow'], null);
        const followedCount = lodashGet(resultObj, ['data', 'followedCount'], null);
        
        if (lodashHas(resultObj, ['data', 'follow'])) {
          lodashSet(followsObj, ['follow'], follow);
        }
        
        if (lodashHas(resultObj, ['data', 'followedCount'])) {
          lodashSet(followsObj, ['followedCount'], followedCount);
        }
        
        
        // ---------------------------------------------
        //   リロードするかどうか
        // ---------------------------------------------
        
        pageTransition = lodashGet(resultObj, ['data', 'pageTransition'], false);
        
        
        
      // ---------------------------------------------
      //   User
      // ---------------------------------------------
        
      } else {
        
        
        // ---------------------------------------------
        //   FormData
        // ---------------------------------------------
        
        const formDataObj = {
          
          users_id,
          
        };
        
        
        // ---------------------------------------------
        //   Fetch
        // ---------------------------------------------
        
        const resultObj = await fetchWrapper({
          
          urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/follows/upsert-follow-ur`,
          methodType: 'POST',
          formData: JSON.stringify(formDataObj),
          
        });
        
        
        // console.log(`
        //   ----- resultObj -----\n
        //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        
        // ---------------------------------------------
        //   Error
        // ---------------------------------------------
        
        if ('errorsArr' in resultObj) {
          throw new CustomError({ errorsArr: resultObj.errorsArr });
        }
        
        
        
        
        // ---------------------------------------------
        //   結果反映：フォロー状態、フォロー数を変更
        // ---------------------------------------------
        
        const follow = lodashGet(resultObj, ['data', 'follow'], null);
        const followApproval = lodashGet(resultObj, ['data', 'followApproval'], null);
        const followedCount = lodashGet(resultObj, ['data', 'followedCount'], null);
        
        
        // ----------------------------------------
        //   - Header
        // ----------------------------------------
        
        if (follow !== null) {
          lodashSet(followsObj, ['follow'], follow);
        }
        
        if (followApproval !== null) {
          lodashSet(followsObj, ['followApproval'], followApproval);
        }
        
        if (followedCount !== null) {
          lodashSet(followsObj, ['followedCount'], followedCount);
        }
        
        
        // ----------------------------------------
        //   - Card Players
        // ----------------------------------------
        
        const cardPlayers_idsArr = lodashGet(resultObj, ['data', 'cardPlayers_idsArr'], []);
        
        for (let cardPlayers_id of cardPlayers_idsArr.values()) {
          
          // console.log(chalk`
          //   cardPlayers_id: {green ${cardPlayers_id}}
          // `);
          
          // 要修正 2020/06/09
          
          // if (follow !== null) {
          //   lodashSet(storeData, ['cardPlayersObj', cardPlayers_id, 'followsObj', 'follow'], follow);
          // }
          
          // if (followApproval !== null) {
          //   lodashSet(storeData, ['cardPlayersObj', cardPlayers_id, 'followsObj', 'followApproval'], followApproval);
          // }
          
          // if (followedCount !== null) {
          //   lodashSet(storeData, ['cardPlayersObj', cardPlayers_id, 'followsObj', 'followedCount'], followedCount);
          // }
          
        }
        
        
        // ---------------------------------------------
        //   リロードするかどうか
        // ---------------------------------------------
        
        pageTransition = lodashGet(resultObj, ['data', 'pageTransition'], false);
        
        
      }
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      let messageID = 'RTsMTGw-1';
      
      switch (type) {
        
        case 'followGc':
          messageID = 'RTsMTGw-1';
          break;
          
        case 'unfollowGc':
          messageID = '1z127R0YE';
          break;
          
        
        case 'followUc':
          messageID = 'SY6WWDyxQ';
          break;
          
        case 'unfollowUc':
          messageID = 'xWAfTONZ6';
          break;
          
        case 'followApprovalUc':
          messageID = 'PaC4bsJe2';
          break;
          
        case 'unfollowApprovalUc':
          messageID = 'HOo6u_sXD';
          break;
          
        case 'follow':
          messageID = 'RTsMTGw-1';
          break;
          
        case 'unfollow':
          messageID = '1z127R0YE';
          break;
          
        case 'followApproval':
          messageID = 'T7i5qYulJ';
          break;
          
        case 'unfollowApproval':
          messageID = 'a-BV7oEkP';
          break;
          
      }
      
      
      handleSnackbarOpen({
        
        variant: 'success',
        messageID,
        
      });
      
      
      
      
      // ---------------------------------------------
      //   リロードする
      // ---------------------------------------------
      
      if (pageTransition) {
        window.location.reload();
      }
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      handleSnackbarOpen({
        
        variant: 'error',
        errorObj,
        
      });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      setButtonDisabled(false);
      
      
    }
    
    
  };
  
  
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  // const login = lodashHas(loginUsersObj, ['_id']);
  
  const approval = lodashGet(followsObj, ['approval'], false);
  const admin = lodashGet(followsObj, ['admin'], false);
  const follow = lodashGet(followsObj, ['follow'], false);
  const followedCount = lodashGet(followsObj, ['followedCount'], 0);
  const followApproval = lodashGet(followsObj, ['followApproval'], false);
  const followBlocked = lodashGet(followsObj, ['followBlocked'], false);
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/follow/v2/components/follow-button.js
  // `);
  
  // console.log(chalk`
  //   login: {green ${login}}
  //   lodashHas(loginUsersObj, ['_id']): {green ${lodashHas(loginUsersObj, ['_id'])}}
  // `);
  
  // console.log(`
  //   ----- loginUsersObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(loginUsersObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(`
  //   ----- followsObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(followsObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // ---------------------------------------------
  //   - 自分自身（コミュニティの作者）またはブロックされている場合、処理停止
  // ---------------------------------------------
  
  if (admin || followBlocked) {
    return null;
  }
  
  
  
  
  // --------------------------------------------------
  //   Component - Button
  // --------------------------------------------------
  
  let component =  '';
  const size = type === 'header' ? 'small' : 'medium';
  
  
  // ---------------------------------------------
  //   - Game Community
  // ---------------------------------------------
  
  if (gameCommunities_id) {
    
    
    // ---------------------------------------------
    //   - ログインしていない場合
    // ---------------------------------------------
    
    if (!login) {
      
      component = 
        <Link href="/login">
          <Button
            variant="contained"
            color="secondary"
            size={size}
          >
            フォローする
          </Button>
        </Link>
      ;
      
    }
    
    
    // ---------------------------------------------
    //   - ログインしていてフォローしていない場合
    // ---------------------------------------------
    
    if (login && !follow) {
      
      component = 
        <Button
          variant="contained"
          color="secondary"
          size={size}
          disabled={buttonDisabled}
          onClick={() => handleFollow({
            type: 'followGc',
            gameCommunities_id,
          })}
        >
          フォローする
        </Button>
      ;
      
    }
    
    
    // ---------------------------------------------
    //   - ログインしていてフォローしている場合
    // ---------------------------------------------
    
    if (login && follow) {
      
      component = 
        <Button
          variant="contained"
          color="primary"
          size={size}
          disabled={buttonDisabled}
          onClick={() => handleDialogOpen({
            title: 'フォロー解除',
            description: 'フォローを解除しますか？',
            handle: handleFollow,
            argumentsObj: {
              type: 'unfollowGc',
              gameCommunities_id,
            },
          })}
        >
          フォロー中
        </Button>
      ;
      
    }
    
    
  // ---------------------------------------------
  //   - User Community
  // ---------------------------------------------
    
  } else if (userCommunities_id) {
    
    
    // ---------------------------------------------
    //   - ログインしていない場合
    // ---------------------------------------------
    
    if (!login) {
      
      component = 
        <Link href="/login">
          <Button
            variant="contained"
            color="secondary"
            size={size}
          >
            コミュニティに参加する
          </Button>
        </Link>
      ;
      
    }
    
    
    // ---------------------------------------------
    //   - ログインしていてメンバーでない場合
    // ---------------------------------------------
    
    if (login && !follow) {
      
      
      // ---------------------------------------------
      //   - 承認制
      // ---------------------------------------------
      
      if (approval) {
        
        component = 
          <Button
            variant="contained"
            color="secondary"
            size={size}
            disabled={buttonDisabled}
            onClick={() => handleFollow({
              type: 'followApprovalUc',
              userCommunities_id,
            })}
          >
            コミュニティに参加申請する
          </Button>
        ;
        
        
      // ---------------------------------------------
      //   - だれでも参加可能
      // ---------------------------------------------
        
      } else {
        
        component = 
          <Button
            variant="contained"
            color="secondary"
            size={size}
            disabled={buttonDisabled}
            onClick={() => handleFollow({
              type: 'followUc',
              userCommunities_id,
            })}
          >
            コミュニティに参加する
          </Button>
        ;
        
      }
      
      
    }
    
    
    // ---------------------------------------------
    //   - ログインしていてメンバーである場合
    // ---------------------------------------------
    
    if (login && follow) {
      
      component = 
        <Button
          variant="contained"
          color="primary"
          size={size}
          disabled={buttonDisabled}
          onClick={() => handleDialogOpen({
            title: 'コミュニティの退会',
            description: 'コミュニティから退会しますか？',
            handle: handleFollow,
            argumentsObj: {
              type: 'unfollowUc',
              gameCommunities_id,
            },
          })}
        >
          コミュニティから退会する
        </Button>
      ;
      
    }
    
    
    // ---------------------------------------------
    //   - 参加申請済みの場合
    // ---------------------------------------------
    
    if (followApproval) {
      
      component = 
        <Button
          variant="contained"
          color="primary"
          size={size}
          disabled={buttonDisabled}
          onClick={() => handleDialogOpen({
            title: '参加申請の取り下げ',
            description: '参加申請を取り下げますか？',
            handle: handleFollow,
            argumentsObj: {
              type: 'unfollowApprovalUc',
              gameCommunities_id,
            },
          })}
        >
          参加申請を取り下げる
        </Button>
      ;
      
    }
    
    
  // ---------------------------------------------
  //   - User
  // ---------------------------------------------
  
  } else if (users_id) {
    
    
    // ---------------------------------------------
    //   - ログインしていない場合
    // ---------------------------------------------
    
    if (!login) {
      
      component = 
        <Link href="/login">
          <Button
            variant="contained"
            color="secondary"
            size={size}
          >
            フォローする
          </Button>
        </Link>
      ;
      
    }
    
    
    // ---------------------------------------------
    //   - ログインしていてフォローしていない場合
    // ---------------------------------------------
    
    if (login && !follow) {
      
      
      // ---------------------------------------------
      //   - 承認制
      // ---------------------------------------------
      
      if (approval) {
        
        component = 
          <Button
            variant="contained"
            color="secondary"
            size={size}
            disabled={buttonDisabled}
            onClick={() => handleFollow({
              type: 'followApproval',
              users_id,
            })}
          >
            フォロー申請をする
          </Button>
        ;
        
        
      // ---------------------------------------------
      //   - だれでもフォロー可能
      // ---------------------------------------------
        
      } else {
        
        component = 
          <Button
            variant="contained"
            color="secondary"
            size={size}
            disabled={buttonDisabled}
            onClick={() => handleFollow({
              type: 'follow',
              users_id,
            })}
          >
            フォローする
          </Button>
        ;
        
      }
      
      
    }
    
    
    // ---------------------------------------------
    //   - ログインしていてフォロー済みである場合
    // ---------------------------------------------
    
    if (login && follow) {
      
      component = 
        <Button
          variant="contained"
          color="primary"
          size={size}
          disabled={buttonDisabled}
          onClick={() => handleDialogOpen({
            title: 'フォローの解除',
            description: 'フォローを解除しますか？',
            handle: handleFollow,
            argumentsObj: {
              type: 'unfollow',
              users_id,
            },
          })}
        >
          フォロー中
        </Button>
      ;
      
    }
    
    
    // ---------------------------------------------
    //   - 参加申請済みの場合
    // ---------------------------------------------
    
    if (followApproval) {
      
      component = 
        <Button
          variant="contained"
          color="primary"
          size={size}
          disabled={buttonDisabled}
          onClick={() => handleDialogOpen({
            title: 'フォロー申請の取り下げ',
            description: 'フォロー申請を取り下げますか？',
            handle: handleFollow,
            argumentsObj: {
              type: 'unfollowApproval',
              users_id,
            },
          })}
        >
          フォロー申請を取り下げる
        </Button>
      ;
      
    }
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Component - Number of People
  // --------------------------------------------------
  
  const componentNumberOfPeople =
    <div
      css={css`
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        margin: 0 0 0 10px;
      `}
    >
      <IconPermIdentity
        css={css`
          font-size: 24px;
          padding: 0;
        `}
      />
      {followedCount} 人
    </div>
  ;
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/follow/v2/components/gc-button.js
  // `);
  
  // console.log(chalk`
  //   login: {green ${login}}
  // `);
  
  // console.log(`
  //   ----- linkArr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(linkArr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <div
      css={css`
        ${type === 'header' &&
          `
            border-top: 1px dashed #A4A4A4;
            margin: 12px 12px 4px;
            padding: 12px 0 0 0;
          `
        }
        ${type === 'cardPlayer' &&
          `
            border-top: 1px dashed #A4A4A4;
            margin: 24px 0 0 0;
            padding: 24px 0 0 0;
          `
        }
      `}
    >
      
      
      {/* Button */}
      <div
        css={css`
          display: flex;
          flex-flow: row wrap;
          align-items: center;
        `}
      >
        
        {component}
        
        {componentNumberOfPeople}
        
      </div>
      
      
    </div>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;