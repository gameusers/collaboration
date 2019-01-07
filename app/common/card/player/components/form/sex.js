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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';




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
  line-height: 1.6em;
`;

const SelectBox = styled.div`
  margin: 12px 0 0 0;
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
export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, _id, value, alternativeText, search } = this.props;
    
    const {
      
      handleCardPlayerEditSex,
      handleCardPlayerEditSexAlternativeText,
      handleCardPlayerEditSexSearch
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   フォーマット
    // --------------------------------------------------
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(`
    //   ----- birthdayObj -----\n
    //   ${util.inspect(birthdayObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   value: {green ${value}}
    //   alternativeText: {green ${alternativeText}}
    //   search: {green ${search}}
    //   birthday: {green ${birthday}}
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        <Heading>性別</Heading>
        
        <Description>性別を選択してください。選択すると性別が表示されます。選択肢以外の値を入力したい場合は、その他のフォームに入力してください。</Description>
        
        
        <SelectBox>
          <FormControl>
            <Select
              value={value}
              onChange={(event) => handleCardPlayerEditSex(event, _id)}
              inputProps={{
                name: 'sex',
                id: 'sex',
              }}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value={'male'}>男性</MenuItem>
              <MenuItem value={'female'}>女性</MenuItem>
            </Select>
          </FormControl>
        </SelectBox>
        
        
        <StyledTextField
          id="sexAlternativeText"
          label="その他"
          value={alternativeText}
          onChange={(event) => handleCardPlayerEditSexAlternativeText(event, _id)}
          helperText="他の値を表示したい場合はこちらに入力してください"
          margin="normal"
          inputProps={{
            maxLength: 20,
          }}
        />
        
        
        <SearchBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={search}
                onChange={(event) => handleCardPlayerEditSexSearch(event, _id)}
              />
            }
            label="性別で検索可能にする"
          />
        </SearchBox>
        
        
      </React.Fragment>
    );
    
  }
  
};