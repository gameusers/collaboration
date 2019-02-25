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
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconAddCircle from '@material-ui/icons/AddCircle';
import IconRemoveCircle from '@material-ui/icons/RemoveCircle';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationCardPlayersLinkArr } = require('../../../../../@database/card-players/validations/link');




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

const FormBox = styled.div`
  border-bottom: 1px dashed #d0d0d0;
  padding: 24px 0;
`;

const SelectBox = styled.div`
  margin: 12px 0 0 0;
`;

const StyledSelect = styled(Select)`
  && {
    width: 200px;
  }
`;

const IconButtonForSelect = styled(IconButton)`
  && {
    margin-left: 24px;
  }
`;

const StyledTextFieldWide = styled(TextField)`
  && {
    width: 400px;
    
    @media screen and (max-width: 480px) {
      width: 100%;
    }
  }
`;

const StyledTextField100Per = styled(TextField)`
  && {
    width: 100%;
  }
`;

const SearchBox = styled.div`
  
`;

const ButtonBox = styled.div`
  margin: 12px;
`;

const IconButtonForButtonBox = styled(IconButton)`
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
    
    const { stores, intl, _id, arr } = this.props;
    
    const {
      
      handleCardPlayerEditFormData,
      handleCardPlayerAddLinkForm,
      handleCardPlayerRemoveLinkForm
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    const validationObj = validationCardPlayersLinkArr({ valueArr: arr });
    
    
    // --------------------------------------------------
    //   Component - Form
    // --------------------------------------------------
    
    let componentsArr = [];
    
    for (const [index, valueObj] of arr.entries()) {
      
      
      const type = 'type' in valueObj ? valueObj.type : '';
      
      const label = 'label' in valueObj ? valueObj.label : '';
      const labelError = validationObj.formArr[index].labelObj.error;
      const labelMessageCode = validationObj.formArr[index].labelObj.messageCode;
      
      const url = 'url' in valueObj ? valueObj.url : '';
      const urlError = validationObj.formArr[index].urlObj.error;
      const urlMessageCode = validationObj.formArr[index].urlObj.messageCode;
      
      const search = 'search' in valueObj ? valueObj.search : '';
      
      
      componentsArr.push(
        
        <FormBox key={index}>
          
          <SelectBox>
            <FormControl>
              <InputLabel htmlFor="linkType">ウェブサイトの種類</InputLabel>
              <StyledSelect
                value={type}
                onChange={(eventObj) => handleCardPlayerEditFormData({
                  pathArr: [_id, 'linkArr', index, 'type'],
                  value: eventObj.target.value
                })}
                inputProps={{
                  name: 'linkType',
                  id: 'linkType',
                }}
              >
                <MenuItem value={'Twitter'}>Twitter</MenuItem>
                <MenuItem value={'Facebook'}>Facebook</MenuItem>
                <MenuItem value={'Instagram'}>Instagram</MenuItem>
                <MenuItem value={'YouTube'}>YouTube</MenuItem>
                <MenuItem value={'Twitch'}>Twitch</MenuItem>
                <MenuItem value={'Steam'}>Steam</MenuItem>
                <MenuItem value={'Pixiv'}>Pixiv</MenuItem>
                <MenuItem value={'Other'}>その他</MenuItem>
              </StyledSelect>
            </FormControl>
            
            
            {/* - ボタン */}
            <IconButtonForSelect
              onClick={() => handleCardPlayerRemoveLinkForm({ _id, index })}
            >
              <IconRemoveCircle />
            </IconButtonForSelect>
            
          </SelectBox>
          
          
          {valueObj.type === 'Other' &&
            <StyledTextFieldWide
              id="linkLabel"
              label="リンクのタイトル"
              value={label}
              onChange={(eventObj) => handleCardPlayerEditFormData({
                pathArr: [_id, 'linkArr', index, 'label'],
                value: eventObj.target.value
              })}
              error={labelError}
              helperText={intl.formatMessage({ id: labelMessageCode })}
              margin="normal"
              inputProps={{
                maxLength: 20,
              }}
            />
          }
          
          
          <StyledTextField100Per
            id="linkURL"
            label="URL"
            value={url}
            onChange={(eventObj) => handleCardPlayerEditFormData({
              pathArr: [_id, 'linkArr', index, 'url'],
              value: eventObj.target.value
            })}
            error={urlError}
            helperText={intl.formatMessage({ id: urlMessageCode })}
            margin="normal"
            inputProps={{
              maxLength: 500,
            }}
          />
          
          
          <SearchBox>
            <FormControlLabel
              control={
                <Checkbox
                  checked={search}
                  onChange={(eventObj) => handleCardPlayerEditFormData({
                    pathArr: [_id, 'linkArr', index, 'search'],
                    value: eventObj.target.checked
                  })}
                />
              }
              label="このリンクを検索可能にする"
            />
          </SearchBox>
          
        </FormBox>
        
        
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
    
    // console.log(`
    //   ----- process.env -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(process.env)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   process.env.customKey: {green ${process.env.customKey}}
    // `);
    
    // console.log(chalk`
    //   process.env.NODE_ENV2: {green ${process.env.NODE_ENV}}
    //   process.env.URL_BASE2: {green ${process.env.URL_BASE}}
    //   process.env.URL_API2: {green ${process.env.URL_API}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        <Heading>リンク</Heading>
        
        <Description>入力するとリンクが表示されます。</Description>
        
        
        {componentsArr}
        
        
        <ButtonBox>
          
          {/* - ボタン */}
          <IconButtonForButtonBox
            onClick={() => handleCardPlayerRemoveLinkForm({ _id, index: 999 })}
          >
            <IconRemoveCircle />
          </IconButtonForButtonBox>
          
          
          {/* + ボタン */}
          <IconButton
            onClick={() => handleCardPlayerAddLinkForm({ _id })}
          >
            <IconAddCircle />
          </IconButton>
          
        </ButtonBox>
        
        
      </React.Fragment>
    );
    
  }
  
});