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

import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

// import initStoreFollow from '../@stores/store';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeFollow')
@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    const userCommunities_id = lodashGet(props, ['stores', 'data', 'headerObj', 'userCommunities_id'], '');
    
    this.pathArr = [userCommunities_id, 'followButton'];
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ pathArr: this.pathArr });
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, storeFollow } = this.props;
    const { handleFollow } = storeFollow;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   Button
    // --------------------------------------------------
    
    const login = stores.data.getLogin();
    const userCommunities_id = lodashGet(stores, ['data', 'headerObj', 'userCommunities_id'], '');
    const approval = lodashGet(stores, ['data', 'headerObj', 'approval'], false);
    const author = lodashGet(stores, ['data', 'headerObj', 'author'], false);
    const member = lodashGet(stores, ['data', 'headerObj', 'member'], false);
    const memberApproval = lodashGet(stores, ['data', 'headerObj', 'memberApproval'], false);
    const memberBlocked = lodashGet(stores, ['data', 'headerObj', 'memberBlocked'], false);
    
    let code =  '';
    
    
    // ---------------------------------------------
    //   - ログインしていない場合
    // ---------------------------------------------
    
    if (!login) {
      
      code = 
        <Link href="/login">
          <Button
            variant="contained"
            color="secondary"
            size="small"
          >
            コミュニティに参加する
          </Button>
        </Link>
      ;
      
    }
    
    
    // ---------------------------------------------
    //   - ログインしていてメンバーでない場合
    // ---------------------------------------------
    
    if (login && !member) {
      
      
      // ---------------------------------------------
      //   - 承認制
      // ---------------------------------------------
      
      if (approval) {
        
        code = 
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleFollow({
              pathArr: this.pathArr,
              type: 'followApprovalUc',
              userCommunities_id
            })}
            disabled={buttonDisabled}
          >
            コミュニティに参加申請する
          </Button>
        ;
        
        
      // ---------------------------------------------
      //   - だれでも参加可能
      // ---------------------------------------------
        
      } else {
        
        code = 
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleFollow({
              pathArr: this.pathArr,
              type: 'followUc',
              userCommunities_id
            })}
            disabled={buttonDisabled}
          >
            コミュニティに参加する
          </Button>
        ;
        
      }
      
      
    }
    
    
    // ---------------------------------------------
    //   - ログインしていてメンバーである場合
    // ---------------------------------------------
    
    if (login && member) {
      
      code = 
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleFollow({
            pathArr: this.pathArr,
            type: 'unfollowUc',
            userCommunities_id
          })}
          disabled={buttonDisabled}
        >
          コミュニティから退会する
        </Button>
      ;
      
    }
    
    
    // ---------------------------------------------
    //   - 参加申請済みの場合
    // ---------------------------------------------
    
    if (memberApproval) {
      
      code = 
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleFollow({
            pathArr: this.pathArr,
            type: 'unfollowApprovalUc',
            userCommunities_id
          })}
          disabled={buttonDisabled}
        >
          参加申請を取り下げる
        </Button>
      ;
      
    }
    
    
    // ---------------------------------------------
    //   - 作者またはブロックされている場合
    // ---------------------------------------------
    
    if (author || memberBlocked) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   headerDataOpen: {green ${headerDataOpen}}
    //   name: {green ${name}}
    //   hardware: {green ${hardware}}
    // `);
    
    // console.log(`\n---------- hardwareSortedArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(hardwareSortedArr)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(`
    //   ----- hardwareSortedArr -----\n
    //   ${util.inspect(hardwareSortedArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          margin: 12px 12px 4px;
        `}
      >
        {code}
      </div>
    );
    
    
  }
  
};