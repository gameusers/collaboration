// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconFollowers from '@material-ui/icons/PermIdentity';


// ---------------------------------------------
//   Components
// ---------------------------------------------





// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const FollowBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

const FollowersBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin: 0 0 0 10px;
`;

const StyledIconFollowers = styled(IconFollowers)`
  && {
    font-size: 24px;
    // margin: 0 2px 0 0;
    padding: 0;
  }
`;





// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, cardPlayers_id } = this.props;
    
    
    
    // --------------------------------------------------
    //   Data - 必要な情報を取得
    // --------------------------------------------------
    
    const {
      
      users_id
      
    } = stores.data.cardPlayersObj[cardPlayers_id];
    
    const {
      
      followedCount,
      followed
      
    } = stores.data.usersObj[users_id];
    
    const {
      
      handleFollowSubmit,
      followDialogOpenObj,
      handleFollowDialogOpen,
      handleFollowDialogClose
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    // if (
    //   model === '' &&
    //   comment === ''
    // ) {
    //   return null;
    // }
    
    
    // --------------------------------------------------
    //   Component - Button
    // --------------------------------------------------
    
    let componentButton =
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleFollowSubmit('follow', cardPlayers_id, users_id)}
          disabled
        >
          フォローする
        </Button>
      ;
    
    if (followed) {
      componentButton = 
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleFollowDialogOpen(cardPlayers_id)}
          disabled
        >
          フォロー中
        </Button>
      ;
    }
    
    
    // --------------------------------------------------
    //   Dialog Open
    // --------------------------------------------------
    
    let followDialogOpen = false;
    
    if (cardPlayers_id in followDialogOpenObj) {
      followDialogOpen = followDialogOpenObj[cardPlayers_id];
    }
    
    
    
    
    
    // console.log(chalk`
    //   cardPlayers_id: {green ${cardPlayers_id}}
    //   users_id: {green ${users_id}}
    //   followedCount: {green ${followedCount}}
    //   followed: {green ${followed}}
    // `);
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <FollowBox>
        
        {componentButton}
        
        <FollowersBox>
          <StyledIconFollowers />{followedCount} 人
        </FollowersBox>
        
        
        <Dialog
          open={followDialogOpen}
          onClose={() => handleFollowDialogClose(cardPlayers_id)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">フォロー解除</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              このユーザーのフォローを解除しますか？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleFollowDialogClose(cardPlayers_id)} color="primary">
              いいえ
            </Button>
            <Button onClick={() => handleFollowSubmit('unfollow', cardPlayers_id, users_id)} color="primary" autoFocus>
              はい
            </Button>
          </DialogActions>
        </Dialog>
        
      </FollowBox>
    );
    
  }
  
};