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

import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import Icon from '@material-ui/icons/HeadsetMic';




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

const SelectBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 24px 0 0 0;
`;

const IconBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
`;

const StyledIcon = styled(Icon)`
  && {
    font-size: 24px;
    margin: 0 6px 0 0;
  }
`;

const IconText = styled.div`
  margin: 0 4px 0 0;
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

const SearchBox = styled.div`
  
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
    
    const { stores, _id, value, comment, search } = this.props;
    
    const { handleCardPlayerEditFormData } = stores.cardPlayer;
    
    const {
      
      handleCardPlayerEditVoiceChatValue,
      handleCardPlayerEditVoiceChatComment,
      handleCardPlayerEditVoiceChatSearch
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- ageObj -----\n
    //   ${util.inspect(ageObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   value: {green ${value}}
    //   icon: {green ${icon}}
    //   comment: {green ${comment}}
    //   search: {green ${search}}
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        <Heading>ボイスチャット</Heading>
        
        <Description>入力するとボイスチャットについての情報が表示されます。</Description>
        
        
        <SelectBox>
        
          <IconBox>
            <StyledIcon />
            <IconText>ボイスチャット: </IconText>
          </IconBox>
        
        
          <FormControl>
            <Select
              value={value}
              onChange={(eventObj) => handleCardPlayerEditFormData({
                pathArr: [_id, 'voiceChatObj', 'value'],
                value: eventObj.target.value
              })}
              inputProps={{
                name: 'friend',
                id: 'friend',
              }}
            >
              <MenuItem value={true}>できる</MenuItem>
              <MenuItem value={false}>できない</MenuItem>
            </Select>
          </FormControl>
          
        </SelectBox>
        
        
        <TextareaBox>
          <StyledTextareaAutosize
            rows={5}
            placeholder="コメントを入力してください"
            value={comment}
            onChange={(eventObj) => handleCardPlayerEditFormData({
              pathArr: [_id, 'voiceChatObj', 'comment'],
              value: eventObj.target.value
            })}
            maxLength={3000}
          />
        </TextareaBox>
        
        
        <SearchBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={search}
                onChange={(eventObj) => handleCardPlayerEditFormData({
                  pathArr: [_id, 'voiceChatObj', 'search'],
                  value: eventObj.target.checked
                })}
              />
            }
            label="ボイスチャット欄の入力情報で検索可能にする"
          />
        </SearchBox>
        
        
      </React.Fragment>
    );
    
  }
  
};