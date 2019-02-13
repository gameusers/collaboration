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
import { injectIntl } from 'react-intl';


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
export default injectIntl(class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, intl, _id, statusObj } = this.props;
    
    const {
      
      handleCardPlayerEditStatus,
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   フォームの値
    // --------------------------------------------------
    
    const formValue = statusObj.value ? statusObj.value : '';
    const formError = statusObj.error ? statusObj.error : false;
    const formMessageID = statusObj.messageID ? statusObj.messageID : 'RuqHo4jGS';
    const formNumberOfCharacters = statusObj.numberOfCharacters ? statusObj.numberOfCharacters : 0;
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <StyledTextField
        id="status"
        label="ステータス"
        value={formValue}
        onChange={(eventObj) => handleCardPlayerEditStatus({ _id, value: eventObj.target.value })}
        error={formError}
        helperText={intl.formatMessage({ id: formMessageID }, { numberOfCharacters: formNumberOfCharacters })}
        margin="normal"
        inputProps={{
          maxLength: 20,
        }}
      />
    );
    
  }
  
});