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




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  margin: 28px 0 0 0;
  padding: 0;
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
  
  
  componentDidMount(){
    this.props.stores.layout.handleButtonDisabledObj(`${this.props.users_id}-edit`, false);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, cardPlayers_id, users_id } = this.props;
    
    const { buttonDisabledObj } = stores.layout;
    
    const { usersLoginObj } = stores.data;
    
    const {
      
      handleCardPlayerEditFormOpen
      
    } = stores.cardPlayer;
    
    
    
    
    // --------------------------------------------------
    //   ログインしていない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (Object.keys(usersLoginObj).length === 0) {
      return null;
    }
    
    
    // --------------------------------------------------
    //   自分のカードでない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (users_id !== usersLoginObj._id) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - Button
    // --------------------------------------------------
    
    let buttonDisabled = true;
    
    if (`${users_id}-edit` in buttonDisabledObj) {
      buttonDisabled = buttonDisabledObj[`${users_id}-edit`];
    }
    
    let componentButton =
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleCardPlayerEditFormOpen(cardPlayers_id)}
        disabled={buttonDisabled}
      >
        編集する
      </Button>
    ;
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(`
    //   ----- usersLoginObj -----\n
    //   ${util.inspect(usersLoginObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   users_id: {green ${users_id}}
    //   usersLoginObj._id: {green ${usersLoginObj._id}}
    //   followedCount: {green ${followedCount}}
    //   followed: {green ${followed}}
    // `);
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
        {componentButton}
      </Container>
    );
    
  }
  
};