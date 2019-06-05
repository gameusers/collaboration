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
import TextareaAutosize from 'react-autosize-textarea';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';




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
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssTextField = css`
  && {
    width: 400px;
    
    @media screen and (max-width: 480px) {
      width: 100%;
    }
  }
`;




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
    
    const { classes, storeCardPlayer, intl, _id, pcObj } = this.props;
    
    const { handleCardPlayerEditFormData } = storeCardPlayer;
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- pcObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(pcObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   _id: {green ${_id}}
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
          PC
        </h3>
        
        
        <p>入力するとPCについての情報が表示されます。現在、利用しているPCの情報を入力してください。</p>
        
        
        {/* モデル */}
        <TextField
          css={cssTextField}
          id="pcModel"
          label="モデル・機種名"
          value={pcObj.model}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'pcObj', 'model'],
            value: eventObj.target.value
          })}
          margin="normal"
          inputProps={{
            maxLength: 50,
          }}
        />
        
        
        <TextareaAutosize
          css={css`
            && {
              width: 600px;
              max-width: 600px;
              border-radius: 4px;
              box-sizing: border-box;
              line-height: 1.8;
              margin: 6px 0 0 0;
              padding: 8px 12px;
              
              &:focus {
                outline: 1px #A9F5F2 solid;
              }
              
              @media screen and (max-width: 480px) {
                width: 100%;
                max-width: auto;
                resize: none;
              }
            }
          `}
          rows={5}
          placeholder="コメントを入力してください"
          value={pcObj.comment}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'pcObj', 'comment'],
            value: eventObj.target.value
          })}
          maxLength={3000}
        />
        
        
        {/* スペック */}
        <TextField
          css={cssTextField}
          id="specOS"
          label="OS"
          value={pcObj.specsObj.os}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'pcObj', 'specsObj', 'os'],
            value: eventObj.target.value
          })}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <TextField
          css={cssTextField}
          id="specCPU"
          label="CPU"
          value={pcObj.specsObj.cpu}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'pcObj', 'specsObj', 'cpu'],
            value: eventObj.target.value
          })}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <TextField
          css={cssTextField}
          id="specCPUCooler"
          label="CPUクーラー"
          value={pcObj.specsObj.cpuCooler}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'pcObj', 'specsObj', 'cpuCooler'],
            value: eventObj.target.value
          })}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <TextField
          css={cssTextField}
          id="specMotherboard"
          label="マザーボード"
          value={pcObj.specsObj.motherboard}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'pcObj', 'specsObj', 'motherboard'],
            value: eventObj.target.value
          })}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <TextField
          css={cssTextField}
          id="specMemory"
          label="メモリー"
          value={pcObj.specsObj.memory}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'pcObj', 'specsObj', 'memory'],
            value: eventObj.target.value
          })}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <TextField
          css={cssTextField}
          id="specStorage"
          label="ストレージ"
          value={pcObj.specsObj.storage}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'pcObj', 'specsObj', 'storage'],
            value: eventObj.target.value
          })}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <TextField
          css={cssTextField}
          id="specGraphicsCard"
          label="グラフィックカード"
          value={pcObj.specsObj.graphicsCard}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'pcObj', 'specsObj', 'graphicsCard'],
            value: eventObj.target.value
          })}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <TextField
          css={cssTextField}
          id="specOpticalDrive"
          label="光学ドライブ"
          value={pcObj.specsObj.opticalDrive}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'pcObj', 'specsObj', 'opticalDrive'],
            value: eventObj.target.value
          })}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <TextField
          css={cssTextField}
          id="specPowerSupply"
          label="電源"
          value={pcObj.specsObj.powerSupply}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'pcObj', 'specsObj', 'powerSupply'],
            value: eventObj.target.value
          })}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <TextField
          css={cssTextField}
          id="specCase"
          label="ケース"
          value={pcObj.specsObj.pcCase}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'pcObj', 'specsObj', 'pcCase'],
            value: eventObj.target.value
          })}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <TextField
          css={cssTextField}
          id="specMonitor"
          label="モニター"
          value={pcObj.specsObj.monitor}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'pcObj', 'specsObj', 'monitor'],
            value: eventObj.target.value
          })}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <TextField
          css={cssTextField}
          id="specMouse"
          label="マウス"
          value={pcObj.specsObj.mouse}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'pcObj', 'specsObj', 'mouse'],
            value: eventObj.target.value
          })}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <TextField
          css={cssTextField}
          id="specKeyboard"
          label="キーボード"
          value={pcObj.specsObj.keyboard}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'pcObj', 'specsObj', 'keyboard'],
            value: eventObj.target.value
          })}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <div>
          <FormControlLabel
            classes={{
              label: classes.label
            }}
            control={
              <Checkbox
                checked={pcObj.search}
                onChange={(eventObj) => handleCardPlayerEditFormData({
                  pathArr: [_id, 'pcObj', 'search'],
                  value: eventObj.target.checked
                })}
              />
            }
            label="PCの情報で検索可能にする"
          />
        </div>
        
        
      </React.Fragment>
    );
    
  }
  
});