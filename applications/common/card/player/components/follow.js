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
    
    
    
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    // if (
    //   model === '' &&
    //   comment === ''
    // ) {
    //   return null;
    // }
    
    let componentButton = <Button variant="outlined" color="primary">フォローする</Button>;
    
    if (followed) {
      componentButton = <Button variant="outlined" color="primary">フォロー中</Button>;
    }
    
    
    
    
    
    
    console.log(chalk`
      cardPlayers_id: {green ${cardPlayers_id}}
      users_id: {green ${users_id}}
      followedCount: {green ${followedCount}}
      followed: {green ${followed}}
    `);
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <FollowBox>
        
        {componentButton}
        
        <FollowersBox>
          <StyledIconFollowers />{followedCount} 人
        </FollowersBox>
        
      </FollowBox>
    );
    
  }
  
};