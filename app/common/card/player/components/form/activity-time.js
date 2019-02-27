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
// import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconAddCircle from '@material-ui/icons/AddCircle';
import IconRemoveCircle from '@material-ui/icons/RemoveCircle';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationCardPlayersActivityTimeObjValueArr } = require('../../../../../@database/card-players/validations/activity-time');



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

const Box = styled.div`
  
`;

const TextFieldBox = styled.div`
  margin: 12px 0 0 0;
`;

const StyledTextField = styled(TextField)`
  && {
    margin-right: 16px;
  }
`;

const IconButtonBox = styled.div`
  margin: 12px 0 0 0;
`;

const StyledIconButton = styled(IconButton)`
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
    
    const { stores, intl, _id, activityTimeObj } = this.props;
    
    const {
      
      handleCardPlayerEditFormData,
      handleCardPlayerEditActivityTimeWeekArr,
      handleCardPlayerEditActivityTimeAddForm,
      handleCardPlayerEditActivityTimeRemoveForm,
      
    } = stores.cardPlayer;
    
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    const validationObj = validationCardPlayersActivityTimeObjValueArr({ required: false, valueArr: activityTimeObj.valueArr });
    
    // console.log(`
    //   ----- validationObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(validationObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    let componentsArr = [];
    
    for (const [index, valueObj] of activityTimeObj.valueArr.entries()) {
      
      const beginTime = 'beginTime' in valueObj ? valueObj.beginTime : '';
      const beginTimeError = validationObj.formArr[index].beginTimeObj.error;
      const beginTimeMessageCode = validationObj.formArr[index].beginTimeObj.messageCode;
      
      const endTime = 'endTime' in valueObj ? valueObj.endTime : '';
      const endTimeError = validationObj.formArr[index].endTimeObj.error;
      const endTimeMessageCode = validationObj.formArr[index].endTimeObj.messageCode;
      
      const weekArr = 'weekArr' in valueObj ? valueObj.weekArr : [];
      const weekError = validationObj.formArr[index].weekObj.error;
      const weekMessageCode = validationObj.formArr[index].weekObj.messageCode;
      
      
      componentsArr.push(
        <Box key={index}>
          
          <TextFieldBox>
            
            <StyledTextField
              id="beginTime"
              label="開始時間"
              type="time"
              value={beginTime}
              onChange={(eventObj) => handleCardPlayerEditFormData({
                pathArr: [_id, 'activityTimeObj', 'valueArr', index, 'beginTime'],
                value: eventObj.target.value
              })}
              error={beginTimeError}
              helperText={intl.formatMessage({ id: beginTimeMessageCode })}
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
              onChange={(eventObj) => handleCardPlayerEditFormData({
                pathArr: [_id, 'activityTimeObj', 'valueArr', index, 'endTime'],
                value: eventObj.target.value
              })}
              error={endTimeError}
              helperText={intl.formatMessage({ id: endTimeMessageCode })}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            
          </TextFieldBox>
          
          
          <FormControl required error={weekError} component="fieldset">
            
            <FormGroup row>
              
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
              
            </FormGroup>
            
            <FormHelperText>{intl.formatMessage({ id: weekMessageCode })}</FormHelperText>
            
          </FormControl>
          
        </Box>
      );
      
    }
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   search: {green ${search}}
    // `);
    
    // const copiedArr = JSON.parse(JSON.stringify(arr));
    
    // console.log(`
    //   ----- activityTimeObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(activityTimeObj)), { colors: true, depth: null })}\n
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
        
        
        {/* フォーム追加・削除ボタン */}
        <IconButtonBox>
          
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
          
        </IconButtonBox>
        
        
        {/* 検索チェックボックス */}
        <SearchBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={activityTimeObj.search}
                onChange={(eventObj) => handleCardPlayerEditFormData({
                  pathArr: [_id, 'activityTimeObj', 'search'],
                  value: eventObj.target.checked
                })}
              />
            }
            label="活動時間で検索可能にする"
          />
        </SearchBox>
        
      </React.Fragment>
    );
    
  }
  
});