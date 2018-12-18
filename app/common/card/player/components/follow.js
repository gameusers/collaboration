// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


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
  margin: 10px 10px 20px 10px;
  // margin: 18px 23px 20px 23px;
  // padding: 0;
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

const ButtonBox = styled.div`
  position: relative;
`;

// const StyledCircularProgress = styled(CircularProgress)`
//   && {
//     color: ${green[500]};
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     margin-top: -12px;
//     margin-left: -12px;
//   }
// `;



// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  
  componentDidMount(){
    this.props.stores.layout.handleButtonDisabledObj(`${this.props.users_id}-follow`, false);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, users_id, followedCount, followed } = this.props;
    
    const {
      
      buttonDisabledObj
      
    } = stores.layout;
    
    const {
      
      usersLoginObj
      
    } = stores.data;
    
    // const {
      
    //   users_id
      
    // } = stores.data.cardPlayersObj[users_id];
    
    // const {
      
    //   followedCount,
    //   followed
      
    // } = stores.data.usersObj[users_id];
    
    const {
      
      handleFollowSubmit,
      followDialogOpenObj,
      handleFollowDialogOpen,
      handleFollowDialogClose
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   ログインしていない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (Object.keys(usersLoginObj).length === 0) {
      return null;
    }
    
    
    // --------------------------------------------------
    //   Component - Button
    // --------------------------------------------------
    
    let followButtonDisabled = true;
    
    if (`${users_id}-follow` in buttonDisabledObj) {
      followButtonDisabled = buttonDisabledObj[`${users_id}-follow`];
    }
    
    
    let componentButton =
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleFollowSubmit('follow', users_id)}
          disabled={followButtonDisabled}
        >
          フォローする
        </Button>
      ;
    
    if (followed) {
      componentButton = 
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleFollowDialogOpen(users_id)}
          disabled={followButtonDisabled}
        >
          フォロー中
        </Button>
      ;
    }
    
    
    // --------------------------------------------------
    //   Dialog Open
    // --------------------------------------------------
    
    let followDialogOpen = false;
    
    if (users_id in followDialogOpenObj) {
      followDialogOpen = followDialogOpenObj[users_id];
    }
    
    
    
    // console.log(chalk`
    //   users_id-follow in buttonDisabledObj: {green ${`${users_id}-follow` in buttonDisabledObj}}
    //   buttonDisabledObj[users_id-follow]: {green ${buttonDisabledObj[`${users_id}-follow`]}}
    //   followButtonDisabled: {green ${followButtonDisabled}}
    // `);
    
    // console.log(`
    //   buttonDisabledObj: \n${util.inspect(buttonDisabledObj, { colors: true, depth: null })}
    // `);
    
    // console.log(chalk`
    //   users_id: {green ${users_id}}
    //   users_id: {green ${users_id}}
    //   followedCount: {green ${followedCount}}
    //   followed: {green ${followed}}
    // `);
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <FollowBox>
        
        <ButtonBox>
          {componentButton}
        </ButtonBox>
        
        
        <FollowersBox>
          <StyledIconFollowers />{followedCount} 人
        </FollowersBox>
        
        
        <Dialog
          open={followDialogOpen}
          onClose={() => handleFollowDialogClose(users_id)}
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
            <Button onClick={() => handleFollowDialogClose(users_id)} color="primary">
              いいえ
            </Button>
            <Button onClick={() => handleFollowSubmit('unfollow', users_id)} color="primary" autoFocus>
              はい
            </Button>
          </DialogActions>
        </Dialog>
        
      </FollowBox>
    );
    
  }
  
};