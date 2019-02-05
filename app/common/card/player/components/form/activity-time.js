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

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


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
  font-size: 14px;
`;

const Box = styled.div`
  margin: 0;
`;

const StyledFormGroup = styled(FormGroup)`
  && {
    margin: 0;
  }
`;

const TextFieldBox = styled.div`
  margin: 0;
`;

const StyledTextField = styled(TextField)`
  && {
    margin-right: 16px;
  }
`;

const StyledIconButton = styled(IconButton)`
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
    
    const { stores, _id, arr, search } = this.props;
    
    const {
      
      handleCardPlayerEditActivityTimeBeginTime,
      handleCardPlayerEditActivityTimeEndTime,
      handleCardPlayerEditActivityTimeWeekArr,
      handleCardPlayerEditActivityTimeAddForm,
      handleCardPlayerEditActivityTimeRemoveForm,
      handleCardPlayerEditActivityTimeSearch,
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    let componentsArr = [];
    
    for (const [index, valueObj] of arr.entries()) {
      
      // console.log(chalk`
      //   valueObj.weekArr.indexOf(0): {green ${valueObj.weekArr.indexOf(0)}}
      //   valueObj.beginTime: {green ${valueObj.beginTime}}
      //   valueObj.endTime: {green ${valueObj.endTime}}
      // `);
      
      const beginTime = 'beginTime' in valueObj ? valueObj.beginTime : '';
      const endTime = 'endTime' in valueObj ? valueObj.endTime : '';
      const weekArr = 'weekArr' in valueObj ? valueObj.weekArr : [];
      
      
      componentsArr.push(
        <Box key={index}>
          
          <TextFieldBox>
            
            <StyledTextField
              id="beginTime"
              label="開始時間"
              type="time"
              value={beginTime}
              onChange={(eventObj) => handleCardPlayerEditActivityTimeBeginTime({ _id, index, value: eventObj.target.value })}
              helperText="ゲームを開始する時間を選んでください"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            
            <StyledTextField
              id="endTime"
              label="終了時間"
              type="time"
              value={endTime}
              onChange={(eventObj) => handleCardPlayerEditActivityTimeEndTime({ _id, index, value: eventObj.target.value })}
              helperText="ゲームを終了する時間を選んでください"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            
          </TextFieldBox>
          
          
          <StyledFormGroup row>
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={weekArr.indexOf(0) !== -1}
                  onChange={() => handleCardPlayerEditActivityTimeWeekArr({
                    _id,
                    index,
                    value: 0
                  })}
                  color="primary"
                />
              }
              label="日"
            />
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={weekArr.indexOf(1) !== -1}
                  onChange={() => handleCardPlayerEditActivityTimeWeekArr({
                    _id,
                    index,
                    value: 1
                  })}
                  color="primary"
                />
              }
              label="月"
            />
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={weekArr.indexOf(2) !== -1}
                  onChange={() => handleCardPlayerEditActivityTimeWeekArr({
                    _id,
                    index,
                    value: 2
                  })}
                  color="primary"
                />
              }
              label="火"
            />
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={weekArr.indexOf(3) !== -1}
                  onChange={() => handleCardPlayerEditActivityTimeWeekArr({
                    _id,
                    index,
                    value: 3
                  })}
                  color="primary"
                />
              }
              label="水"
            />
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={weekArr.indexOf(4) !== -1}
                  onChange={() => handleCardPlayerEditActivityTimeWeekArr({
                    _id,
                    index,
                    value: 4
                  })}
                  color="primary"
                />
              }
              label="木"
            />
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={weekArr.indexOf(5) !== -1}
                  onChange={() => handleCardPlayerEditActivityTimeWeekArr({
                    _id,
                    index,
                    value: 5
                  })}
                  color="primary"
                />
              }
              label="金"
            />
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={weekArr.indexOf(6) !== -1}
                  onChange={() => handleCardPlayerEditActivityTimeWeekArr({
                    _id,
                    index,
                    value: 6
                  })}
                  color="primary"
                />
              }
              label="土"
            />
            
          </StyledFormGroup>
          
        </Box>
      );
      
    }
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   search: {green ${search}}
    // `);
    
    // const copiedArr = JSON.parse(JSON.stringify(arr));
    
    // console.log(`
    //   ----- arr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        <Heading>活動時間</Heading>
        
        <Description>入力すると活動時間が表示されます。開始時間と終了時間、曜日を入力してください。</Description>
        
        
        {componentsArr}
        
        
        {/* - ボタン */}
        <StyledIconButton
          onClick={() => handleCardPlayerEditActivityTimeRemoveForm({ _id })}
        >
          <IconRemoveCircle />
        </StyledIconButton>
        
        
        {/* + ボタン */}
        <IconButton
          onClick={() => handleCardPlayerEditActivityTimeAddForm({ _id })}
        >
          <IconAddCircle />
        </IconButton>
        
        
        {/* 検索チェックボックス */}
        <SearchBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={search}
                onChange={(eventObj) => handleCardPlayerEditActivityTimeSearch({ _id, value: eventObj.target.checked })}
              />
            }
            label="活動時間で検索可能にする"
          />
        </SearchBox>
        
      </React.Fragment>
    );
    
  }
  
};