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
import TextareaAutosize from 'react-autosize-textarea';
import { injectIntl } from 'react-intl';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Heading = styled.div`
  font-weight: bold;
  margin: 0 0 2px 0;
`;

const StyledTextareaAutosize = styled(TextareaAutosize)`
  && {
    width: 600px;
    max-width: 600px;
    border-radius: 4px;
    box-sizing: border-box;
    margin: 6px 0 10px 0;
    padding: 8px 12px;
    line-height: 1.8;
    
    &:focus {
      outline: 1px #A9F5F2 solid;
    }
    
    @media screen and (max-width: 480px) {
      width: 100%;
      max-width: auto;
      resize: none;
    }
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
    
    const { stores, intl, _id, commentObj } = this.props;
    
    const {
      
      handleCardPlayerEditComment,
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   フォームの値
    // --------------------------------------------------
    
    const formValue = commentObj.value ? commentObj.value : '';
    // const formError = commentObj.error ? commentObj.error : false;
    // const formMessageID = commentObj.messageID ? commentObj.messageID : 'w7TbcLAdl';
    // const formNumberOfCharacters = commentObj.numberOfCharacters ? commentObj.numberOfCharacters : 0;
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        <Heading>コメント</Heading>
        
        <StyledTextareaAutosize
          rows={5}
          placeholder="コメントを入力してください"
          value={formValue}
          onChange={(eventObj) => handleCardPlayerEditComment({ _id, value: eventObj.target.value })}
          maxLength={3000}
        />
      </React.Fragment>
    );
    
  }
  
});