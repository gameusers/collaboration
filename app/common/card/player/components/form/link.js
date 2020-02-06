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

import { withStyles } from '@material-ui/core/styles';

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
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const stylesObj = {
  
  label: {
    fontSize: 14
  },
  
};




// --------------------------------------------------
//   Class
// --------------------------------------------------

@withStyles(stylesObj)
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
    
    const { classes, storeCardPlayer, intl, _id, arr } = this.props;
    
    const {
      
      handleCardPlayerEditFormData,
      handleCardPlayerAddLinkForm,
      handleCardPlayerRemoveLinkForm
      
    } = storeCardPlayer;
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    const validationObj = validationCardPlayersLinkArr({ valueArr: arr });
    
    
    // --------------------------------------------------
    //   Component - Form
    // --------------------------------------------------
    
    let componentsArr = [];
    
    for (const [index, valueObj] of arr.entries()) {
      
      
      const type = lodashGet(valueObj, ['type'], '');
      
      const label = lodashGet(valueObj, ['label'], '');
      const labelError = lodashGet(validationObj, ['formArr', index, 'labelObj', 'error'], false);
      const labelMessageID = lodashGet(validationObj, ['formArr', index, 'labelObj', 'messageID'], 'sOgKU3gS9');
      
      const url = lodashGet(valueObj, ['url'], '');
      const urlError = lodashGet(validationObj, ['formArr', index, 'urlObj', 'error'], false);
      const urlMessageID = lodashGet(validationObj, ['formArr', index, 'urlObj', 'messageID'], 'CAhUTCx7B');
      
      const search = lodashGet(valueObj, ['search'], true);
      
      
      componentsArr.push(
        
        <div
          css={css`
            border-bottom: 1px dashed #d0d0d0;
            padding: 24px 0;
          `}
          key={index}
        >
          
          <div
            css={css`
              margin: 12px 0 0 0;
            `}
          >
            <FormControl>
              
              <InputLabel htmlFor="linkType">ウェブサイトの種類</InputLabel>
              
              <Select
                css={css`
                  && {
                    width: 200px;
                  }
                `}
                _id="linkType"
                value={type}
                onChange={(eventObj) => handleCardPlayerEditFormData({
                  pathArr: [_id, 'linkArr', index, 'type'],
                  value: eventObj.target.value
                })}
              >
                <MenuItem value={'Twitter'}>Twitter</MenuItem>
                <MenuItem value={'Facebook'}>Facebook</MenuItem>
                <MenuItem value={'Instagram'}>Instagram</MenuItem>
                <MenuItem value={'YouTube'}>YouTube</MenuItem>
                <MenuItem value={'Twitch'}>Twitch</MenuItem>
                <MenuItem value={'Steam'}>Steam</MenuItem>
                <MenuItem value={'Discord'}>Discord</MenuItem>
                <MenuItem value={'Flickr'}>Flickr</MenuItem>
                <MenuItem value={'Tumblr'}>Tumblr</MenuItem>
                <MenuItem value={'Pinterest'}>Pinterest</MenuItem>
                <MenuItem value={'Other'}>その他</MenuItem>
              </Select>
              
            </FormControl>
            
            
            {/* - ボタン */}
            <IconButton
              css={css`
                && {
                  margin-left: 24px;
                }
              `}
              onClick={() => handleCardPlayerRemoveLinkForm({ _id, index })}
            >
              <IconRemoveCircle />
            </IconButton>
            
          </div>
          
          
          {valueObj.type === 'Other' &&
            <TextField
              css={css`
                && {
                  width: 400px;
                  
                  @media screen and (max-width: 480px) {
                    width: 100%;
                  }
                }
              `}
              id="linkLabel"
              label="リンクのタイトル"
              value={label}
              onChange={(eventObj) => handleCardPlayerEditFormData({
                pathArr: [_id, 'linkArr', index, 'label'],
                value: eventObj.target.value
              })}
              error={labelError}
              helperText={intl.formatMessage({ id: labelMessageID })}
              margin="normal"
              inputProps={{
                maxLength: 20,
              }}
            />
          }
          
          
          <TextField
            css={css`
              && {
                width: 100%;
              }
            `}
            id={`linkURL${index}`}
            label="URL"
            value={url}
            onChange={(eventObj) => handleCardPlayerEditFormData({
              pathArr: [_id, 'linkArr', index, 'url'],
              value: eventObj.target.value
            })}
            error={urlError}
            helperText={intl.formatMessage({ id: urlMessageID })}
            margin="normal"
            inputProps={{
              maxLength: 500,
            }}
          />
          
          
          <div>
            <FormControlLabel
              classes={{
                label: classes.label
              }}
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
          </div>
          
        </div>
        
        
      );
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
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
        
        
        <h3
          css={css`
            font-weight: bold;
            margin: 0 0 2px 0;
          `}
        >
          リンク
        </h3>
        
        
        <p>入力するとリンクが表示されます。</p>
        
        
        {componentsArr}
        
        
        <div
          css={css`
            margin: 12px;
          `}
        >
          
          {/* - ボタン */}
          <IconButton
            css={css`
              && {
                margin-right: 16px;
              }
            `}
            onClick={() => handleCardPlayerRemoveLinkForm({ _id, index: 999 })}
          >
            <IconRemoveCircle />
          </IconButton>
          
          
          {/* + ボタン */}
          <IconButton
            onClick={() => handleCardPlayerAddLinkForm({ _id })}
          >
            <IconAddCircle />
          </IconButton>
          
        </div>
        
        
      </React.Fragment>
    );
    
  }
  
});