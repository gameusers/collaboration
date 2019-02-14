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
`;

const StyledTextField = styled(TextField)`
  && {
    margin-right: 16px;
    
    @media screen and (max-width: 480px) {
      width: 100%;
      margin-right: initial;
    }
  }
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
    
    const {
      stores,
      _id,
      model,
      comment,
      os,
      cpu,
      cpuCooler,
      motherboard,
      memory,
      storage,
      graphicsCard,
      opticalDrive,
      powerSupply,
      pcCase,
      monitor,
      mouse,
      keyboard,
      search
    } = this.props;
    
    const {
      
      handleCardPlayerEditPCModel,
      handleCardPlayerEditPCComment,
      handleCardPlayerEditPCSpecOS,
      handleCardPlayerEditPCSpecCPU,
      handleCardPlayerEditPCSpecCPUCooler,
      handleCardPlayerEditPCSpecMotherboard,
      handleCardPlayerEditPCSpecMemory,
      handleCardPlayerEditPCSpecStorage,
      handleCardPlayerEditPCSpecGraphicsCard,
      handleCardPlayerEditPCSpecOpticalDrive,
      handleCardPlayerEditPCSpecPowerSupply,
      handleCardPlayerEditPCSpecPCCase,
      handleCardPlayerEditPCSpecMonitor,
      handleCardPlayerEditPCSpecMouse,
      handleCardPlayerEditPCSpecKeyboard,
      handleCardPlayerEditPCSearch
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(`
    //   ----- ageObj -----\n
    //   ${util.inspect(ageObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   value: {green ${value}}
    //   alternativeText: {green ${alternativeText}}
    //   search: {green ${search}}
    //   age: {green ${age}}
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        <Heading>PC</Heading>
        
        <Description>入力するとPCについての情報が表示されます。現在、利用しているPCの情報を入力してください。</Description>
        
        
        <StyledTextFieldWide
          id="pcModel"
          label="モデル"
          value={model}
          onChange={(event) => handleCardPlayerEditPCModel(event, _id)}
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
            onChange={(event) => handleCardPlayerEditPCComment(event, _id)}
            maxLength={3000}
          />
        </TextareaBox>
        
        
        <StyledTextFieldWide
          id="specOS"
          label="OS"
          value={os}
          onChange={(event) => handleCardPlayerEditPCSpecOS(event, _id)}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <StyledTextFieldWide
          id="specCPU"
          label="CPU"
          value={cpu}
          onChange={(event) => handleCardPlayerEditPCSpecCPU(event, _id)}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <StyledTextFieldWide
          id="specCPUCooler"
          label="CPUクーラー"
          value={cpuCooler}
          onChange={(event) => handleCardPlayerEditPCSpecCPUCooler(event, _id)}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <StyledTextFieldWide
          id="specMotherboard"
          label="マザーボード"
          value={motherboard}
          onChange={(event) => handleCardPlayerEditPCSpecMotherboard(event, _id)}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <StyledTextFieldWide
          id="specMemory"
          label="メモリー"
          value={memory}
          onChange={(event) => handleCardPlayerEditPCSpecMemory(event, _id)}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <StyledTextFieldWide
          id="specStorage"
          label="ストレージ"
          value={storage}
          onChange={(event) => handleCardPlayerEditPCSpecStorage(event, _id)}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <StyledTextFieldWide
          id="specGraphicsCard"
          label="グラフィックカード"
          value={graphicsCard}
          onChange={(event) => handleCardPlayerEditPCSpecGraphicsCard(event, _id)}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <StyledTextFieldWide
          id="specOpticalDrive"
          label="光学ドライブ"
          value={opticalDrive}
          onChange={(event) => handleCardPlayerEditPCSpecOpticalDrive(event, _id)}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <StyledTextFieldWide
          id="specPowerSupply"
          label="電源"
          value={powerSupply}
          onChange={(event) => handleCardPlayerEditPCSpecPowerSupply(event, _id)}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <StyledTextFieldWide
          id="specCase"
          label="ケース"
          value={pcCase}
          onChange={(event) => handleCardPlayerEditPCSpecPCCase(event, _id)}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <StyledTextFieldWide
          id="specMonitor"
          label="モニター"
          value={monitor}
          onChange={(event) => handleCardPlayerEditPCSpecMonitor(event, _id)}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <StyledTextFieldWide
          id="specMouse"
          label="マウス"
          value={mouse}
          onChange={(event) => handleCardPlayerEditPCSpecMouse(event, _id)}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <StyledTextFieldWide
          id="specKeyboard"
          label="キーボード"
          value={keyboard}
          onChange={(event) => handleCardPlayerEditPCSpecKeyboard(event, _id)}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
        />
        
        
        <SearchBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={search}
                onChange={(event) => handleCardPlayerEditPCSearch(event, _id)}
              />
            }
            label="PCの情報で検索可能にする"
          />
        </SearchBox>
        
        
      </React.Fragment>
    );
    
  }
  
};