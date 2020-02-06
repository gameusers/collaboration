// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


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
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssTextField = css`
  && {
    margin-right: 16px;
  }
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('storeCardPlayer')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    super(props);
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { storeCardPlayer, intl, _id, activityTimeObj } = this.props;
    
    const {
      
      handleCardPlayerEditFormData,
      handleCardPlayerEditActivityTimeWeekArr,
      handleCardPlayerEditActivityTimeAddForm,
      handleCardPlayerEditActivityTimeRemoveForm,
      
    } = storeCardPlayer;
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    const validationObj = validationCardPlayersActivityTimeObjValueArr({ required: false, valueArr: activityTimeObj.valueArr });
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    let componentsArr = [];
    
    for (const [index, valueObj] of activityTimeObj.valueArr.entries()) {
      
      const beginTime = lodashGet(valueObj, ['beginTime'], '');
      const beginTimeError = lodashGet(validationObj, ['formArr', index, 'beginTimeObj', 'error'], false);
      const beginTimeMessageID = lodashGet(validationObj, ['formArr', index, 'beginTimeObj', 'messageID'], 'qnWsuPcrJ');
      
      const endTime = lodashGet(valueObj, ['endTime'], '');
      const endTimeError = lodashGet(validationObj, ['formArr', index, 'endTimeObj', 'error'], false);
      const endTimeMessageID = lodashGet(validationObj, ['formArr', index, 'endTimeObj', 'messageID'], 'qnWsuPcrJ');
      
      const weekArr = lodashGet(valueObj, ['weekArr'], '');
      const weekError = lodashGet(validationObj, ['formArr', index, 'weekObj', 'error'], false);
      const weekMessageID = lodashGet(validationObj, ['formArr', index, 'weekObj', 'messageID'], 'qnWsuPcrJ');
      
      
      componentsArr.push(
        <div key={index}>
          
          <div
            css={css`
              margin: 12px 0 0 0;
            `}
          >
            
            <TextField
              css={cssTextField}
              id={`beginTimeActivityTime${index}`}
              label="開始時間"
              type="time"
              value={beginTime}
              onChange={(eventObj) => handleCardPlayerEditFormData({
                pathArr: [_id, 'activityTimeObj', 'valueArr', index, 'beginTime'],
                value: eventObj.target.value
              })}
              error={beginTimeError}
              helperText={intl.formatMessage({ id: beginTimeMessageID })}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            
            <TextField
              css={cssTextField}
              id={`endTimeActivityTime${index}`}
              label="終了時間"
              type="time"
              value={endTime}
              onChange={(eventObj) => handleCardPlayerEditFormData({
                pathArr: [_id, 'activityTimeObj', 'valueArr', index, 'endTime'],
                value: eventObj.target.value
              })}
              error={endTimeError}
              helperText={intl.formatMessage({ id: endTimeMessageID })}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            
          </div>
          
          
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
            
            <FormHelperText>{intl.formatMessage({ id: weekMessageID })}</FormHelperText>
            
          </FormControl>
          
        </div>
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
        
        
        <h3
          css={css`
            font-weight: bold;
            margin: 0 0 2px 0;
          `}
        >
          活動時間
        </h3>
        
        
        <p>入力すると活動時間が表示されます。開始時間と終了時間、曜日を入力してください。</p>
        
        
        
        
        {/* Form */}
        {componentsArr}
        
        
        
        
        {/* フォーム追加・削除ボタン */}
        <div
          css={css`
            margin: 12px 0 0 0;
          `}
        >
          
          
          {/* - ボタン */}
          <IconButton
            css={css`
              && {
                margin-right: 16px;
              }
            `}
            onClick={() => handleCardPlayerEditActivityTimeRemoveForm({ _id })}
          >
            <IconRemoveCircle />
          </IconButton>
          
          
          {/* + ボタン */}
          <IconButton
            onClick={() => handleCardPlayerEditActivityTimeAddForm({ _id })}
          >
            <IconAddCircle />
          </IconButton>
          
          
        </div>
        
        
        
        
        {/* 検索チェックボックス */}
        <div>
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
        </div>
        
        
      </React.Fragment>
    );
    
  }
  
});