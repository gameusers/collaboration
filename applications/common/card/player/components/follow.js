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
    // margin: 0 2px 0 2px
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
    
    const { stores, cardPlayerId } = this.props;
    
    
    
    // --------------------------------------------------
    //   Data - 必要な情報を取得
    // --------------------------------------------------
    
    const {
      
      model,
      comment
      
    } = stores.data.cardPlayerObj[cardPlayerId].pcObj;
    
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    // if (
    //   model === '' &&
    //   comment === ''
    // ) {
    //   return null;
    // }
    
    
    
    
    
    
    
    // console.log(chalk`
    //   userId: {green ${userId}}
    //   age: {green ${age}}
      
    //   imageSrcSet: {green ${imageSrcSet}}
    //   imageSrc: {green ${imageSrc}}
    //   imageAlt: {green ${imageAlt}}
    // `);
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <FollowBox>
        
        <Button variant="outlined" color="primary">
          フォローする
        </Button>
        
        <FollowersBox>
          <StyledIconFollowers />1,2345,6789 人
        </FollowersBox>
        
      </FollowBox>
    );
    
  }
  
};