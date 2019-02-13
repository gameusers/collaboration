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
    
    const { stores, intl, _id, nameObj } = this.props;
    // const { formatMessage } = this.props.intl;
    
    const {
      
      handleCardPlayerEditName,
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   フォームの値
    // --------------------------------------------------
    
    const formValue = nameObj.value ? nameObj.value : '';
    const formError = nameObj.error ? nameObj.error : false;
    const formMessageID = nameObj.messageID ? nameObj.messageID : 'l1Nr3Di-O';
    const formNumberOfCharacters = nameObj.numberOfCharacters ? nameObj.numberOfCharacters : 0;
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- nameObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(nameObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   formValue: {green ${formValue}}
    //   formError: {green ${formError}}
    //   formMessageID: {green ${formMessageID}}
    //   formNumberOfCharacters: {green ${formNumberOfCharacters}}
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <StyledTextField
        id="name"
        label="ハンドルネーム"
        value={formValue}
        onChange={(eventObj) => handleCardPlayerEditName({ _id, value: eventObj.target.value })}
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