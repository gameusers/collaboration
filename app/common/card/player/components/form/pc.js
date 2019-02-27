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
  
`;

const StyledTextFieldWide = styled(TextField)`
  && {
    width: 400px;
    margin-right: 16px;
    
    @media screen and (max-width: 480px) {
      width: 100%;
      margin-right: initial;
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
export default injectIntl(class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, intl, _id, pcObj } = this.props;
    
    const { handleCardPlayerEditFormData } = stores.cardPlayer;
    
    
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
        
        <Heading>PC</Heading>
        
        <Description>入力するとPCについての情報が表示されます。現在、利用しているPCの情報を入力してください。</Description>
        
        
        {/* モデル */}
        <StyledTextFieldWide
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
        
        
        {/* コメント */}
        <TextareaBox>
          <StyledTextareaAutosize
            rows={5}
            placeholder="コメントを入力してください"
            value={pcObj.comment}
            onChange={(eventObj) => handleCardPlayerEditFormData({
              pathArr: [_id, 'pcObj', 'comment'],
              value: eventObj.target.value
            })}
            maxLength={3000}
          />
        </TextareaBox>
        
        
        {/* スペック */}
        <StyledTextFieldWide
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
        
        
        <StyledTextFieldWide
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
        
        
        <StyledTextFieldWide
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
        
        
        <StyledTextFieldWide
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
        
        
        <StyledTextFieldWide
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
        
        
        <StyledTextFieldWide
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
        
        
        <StyledTextFieldWide
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
        
        
        <StyledTextFieldWide
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
        
        
        <StyledTextFieldWide
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
        
        
        <StyledTextFieldWide
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
        
        
        <StyledTextFieldWide
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
        
        
        <StyledTextFieldWide
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
        
        
        <StyledTextFieldWide
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
        
        
        <SearchBox>
          <FormControlLabel
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
        </SearchBox>
        
        
      </React.Fragment>
    );
    
  }
  
});