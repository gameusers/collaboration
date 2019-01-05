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

import TextField from '@material-ui/core/TextField';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const StyledTextField = styled(TextField)`
  && {
    margin-right: 16px;
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
    
    const { stores, _id, status } = this.props;
    
    const {
      
      handleCardPlayerEditStatus,
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <StyledTextField
        id="status"
        label="ステータス"
        value={status}
        onChange={(event) => handleCardPlayerEditStatus(event, _id)}
        helperText="ハンドルネームの横に表示される文字です"
        margin="normal"
        inputProps={{
          maxLength: 20,
        }}
      />
    );
    
  }
  
};