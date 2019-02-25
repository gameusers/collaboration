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

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconAddCircle from '@material-ui/icons/AddCircle';
import IconRemoveCircle from '@material-ui/icons/RemoveCircle';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Heading = styled.div`
  font-weight: bold;
  margin: 0 0 2px 0;
`;

const Description = styled.p`
  
`;

const TextFieldBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  && {
    margin-right: 16px;
  }
`;

const SearchBox = styled.div`
  
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
    
    const { stores, intl, _id, hobbiesObj } = this.props;
    
    const {
      
      handleCardPlayerEditFormData,
      handleCardPlayerAddHobbyForm,
      handleCardPlayerRemoveHobbyForm,
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    const componentsArr = [];
    
    for (const [index, value] of hobbiesObj.valueArr.entries()) {
      
      componentsArr.push(
        <StyledTextField
          id={`hobby-${index}`}
          value={value}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'hobbiesObj', 'valueArr', index],
            value: eventObj.target.value
          })}
          margin="dense"
          variant="outlined"
          key={index}
          inputProps={{
            maxLength: 20,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleCardPlayerRemoveHobbyForm({ _id, index })}
                >
                  <IconRemoveCircle />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      );
      
    }
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- validationObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(validationObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   hobbyTextFieldCount: {green ${hobbyTextFieldCount}}
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        <Heading>趣味</Heading>
        <Description>入力すると趣味が表示されます。</Description>
        
        
        <TextFieldBox>
          
          {/* フォーム */}
          {componentsArr}
          
          
          {/* フォーム追加ボタン */}
          <IconButton
            onClick={() => handleCardPlayerAddHobbyForm({ _id })}
          >
            <IconAddCircle />
          </IconButton>
          
        </TextFieldBox>
        
        
        {/* 検索可能チェックボックス */}
        <SearchBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={hobbiesObj.search}
                onChange={(eventObj) => handleCardPlayerEditFormData({
                  pathArr: [_id, 'hobbiesObj', 'search'],
                  value: eventObj.target.checked
                })}
              />
            }
            label="趣味で検索可能にする"
          />
        </SearchBox>
        
      </React.Fragment>
    );
    
  }
  
});