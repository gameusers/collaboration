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


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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

const StyledTextFieldWide = styled(TextField)`
  && {
    width: 400px;
    
    @media screen and (max-width: 480px) {
      width: 100%;
    }
  }
`;

const TextareaBox = styled.div`
  margin: 12px 0 0 0;
`;

const StyledTextareaAutosize = styled(TextareaAutosize)`
  && {
    width: 600px;
    max-width: 600px;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 8px 12px;
    line-height: 1.6em;
    
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
    
    const { stores, _id, model, comment, search } = this.props;
    
    const {
      
      handleCardPlayerEditTabletModel,
      handleCardPlayerEditTabletComment,
      handleCardPlayerEditTabletSearch
      
    } = stores.cardPlayer;
    
    
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
        
        <Heading>タブレット</Heading>
        
        <Description>入力するとタブレットについての情報が表示されます。現在、利用しているタブレットの情報を入力してください。</Description>
        
        
        <StyledTextFieldWide
          id="smartphoneModel"
          label="モデル"
          value={model}
          onChange={(event) => handleCardPlayerEditTabletModel(event, _id)}
          helperText="モデル名、機種名などを入力してください"
          margin="normal"
          inputProps={{
            maxLength: 50,
          }}
        />
        
        
        <TextareaBox>
          <StyledTextareaAutosize
            rows={5}
            placeholder="コメントを入力してください"
            value={comment}
            onChange={(event) => handleCardPlayerEditTabletComment(event, _id)}
            maxLength={3000}
          />
        </TextareaBox>
        
        
        <SearchBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={search}
                onChange={(event) => handleCardPlayerEditTabletSearch(event, _id)}
              />
            }
            label="タブレットの情報で検索可能にする"
          />
        </SearchBox>
        
        
      </React.Fragment>
    );
    
  }
  
};