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


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const validationCardPlayersSpecialSkill = require('../../../../../@database/card-players/validations/special-skill');




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Heading = styled.div`
  font-weight: bold;
  margin: 0 0 2px 0;
`;

const Description = styled.p`
  font-size: 14px;
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
  margin: 0;
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
    
    const { stores, intl, _id, specialSkillsObj } = this.props;
    
    const {
      
      handleCardPlayerAddSpecialSkillForm,
      handleCardPlayerRemoveSpecialSkillForm,
      handleCardPlayerEditSpecialSkill,
      handleCardPlayerEditSpecialSkillSearch
      
    } = stores.cardPlayer;
    
    
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    const validationObj = validationCardPlayersSpecialSkill({ required: false, valueArr: specialSkillsObj.valueArr });
    
    
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    const componentsArr = [];
    
    for (const [index, value] of specialSkillsObj.valueArr.entries()) {
      
      componentsArr.push(
        <StyledTextField
          id={`specialSkill-${index}`}
          value={value}
          onChange={(eventObj) => handleCardPlayerEditSpecialSkill({ _id, index, value: eventObj.target.value })}
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
                  onClick={() => handleCardPlayerRemoveSpecialSkillForm({ _id, index })}
                >
                  <IconRemoveCircle />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      );
      
    }
    
    // for (let i = 0; i < arr.length; i++) {
      
    //   componentsArr.push(
    //     <StyledTextField
    //       id={`specialSkill-${i}`}
    //       value={arr[i]}
    //       onChange={(event) => handleCardPlayerEditSpecialSkill(event, _id, i)}
    //       margin="dense"
    //       variant="outlined"
    //       key={i}
    //       inputProps={{
    //         maxLength: 20,
    //       }}
    //       InputProps={{
    //         endAdornment: (
    //           <InputAdornment position="end">
    //             <IconButton
    //               onClick={() => handleCardPlayerRemoveSpecialSkillForm(_id, i)}
    //             >
    //               <IconRemoveCircle />
    //             </IconButton>
    //           </InputAdornment>
    //         ),
    //       }}
    //     />
    //   );
      
    // }
    
    
    
    
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
        
        <Heading>特技</Heading>
        <Description>入力すると特技が表示されます。</Description>
        
        
        <TextFieldBox>
          
          {/* フォーム */}
          {componentsArr}
          
          
          {/* フォーム追加ボタン */}
          <IconButton
            onClick={() => handleCardPlayerAddSpecialSkillForm({ _id })}
          >
            <IconAddCircle />
          </IconButton>
          
        </TextFieldBox>
        
        
        {/* 検索可能チェックボックス */}
        <SearchBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={specialSkillsObj.search}
                onChange={(eventObj) => handleCardPlayerEditSpecialSkillSearch({ _id, value: eventObj.target.checked })}
              />
            }
            label="特技で検索可能にする"
          />
        </SearchBox>
        
      </React.Fragment>
    );
    
  }
  
});