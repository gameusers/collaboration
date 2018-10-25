// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import Icon from '@material-ui/icons/LaptopMac';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Paragraph from '../../../layout/components/paragraph';





// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// ---------------------------------------------
//   見出し
// ---------------------------------------------

const HeadingBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  && {
    font-size: 24px;
  }
`;

const Heading = styled.h3`
  margin: 0 0 0 4px;
`;



const Model = styled.p`
  font-weight: bold;
`;

const CommentBox = styled.div`
  margin: 3px 0 0 0;
  padding: 0 0 0 0;
`;


// ---------------------------------------------
//   PC Specs
// ---------------------------------------------

const SpecsBox = styled.ul`
  // line-height: 1.8em;
  margin: 14px 0 0 0;
  padding: 0 0 0 0;
`;

const SpecsTitle = styled.p`
  font-weight: bold;
  // margin: 0 0 3px 0;
  // padding: 0 0 0 0;
`;

const SpecsUl = styled.ul`
  list-style-type: disc;
  line-height: 1.8em;
  margin: 3px 0 0 20px;
  padding: 0 0 0 0;
`;

const SpecsLi = styled.li`
  margin: 0;
  padding: 0;
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
    
    const { stores, cardPlayerId } = this.props;
    
    
    
    // --------------------------------------------------
    //   Data - 必要な情報を取得
    // --------------------------------------------------
    
    const {
      
      model,
      comment
      
    } = stores.data.cardPlayerObj[cardPlayerId].pcObj;
    
    const {
      
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
      keyboard
      
    } = stores.data.cardPlayerObj[cardPlayerId].pcObj.specsObj;
    
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (
      model === '' &&
      comment === '' &&
      os === '' &&
      cpu === '' &&
      cpuCooler === '' &&
      motherboard === '' &&
      memory === '' &&
      storage === '' &&
      graphicsCard === '' &&
      opticalDrive === '' &&
      powerSupply === '' &&
      pcCase === '' &&
      monitor === '' &&
      mouse === '' &&
      keyboard === ''
    ) {
      return null;
    }
    
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - モデル
    // --------------------------------------------------
    
    let componentModel = 'PC';
    
    if (model) {
      componentModel = `PC: ${model}`;
    }
    
    // let componentModel = <Model>PC</Model>;
    
    // if (model) {
    //   componentModel = <Model>PC: {model}</Model>;
    // }
    
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - コメント
    // --------------------------------------------------
    
    let componentComment = '';
    
    if (comment) {
      componentComment = <CommentBox><Paragraph text={comment} /></CommentBox>;
    }
    
    
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - PCスペック
    // --------------------------------------------------
    
    const componentSpecsArr = [];
    
    
    // ---------------------------------------------
    //   OS
    // ---------------------------------------------
    
    if (os) {
      componentSpecsArr.push(
        <SpecsLi key="os"><strong>OS:</strong> {os}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   CPU
    // ---------------------------------------------
    
    if (cpu) {
      componentSpecsArr.push(
        <SpecsLi key="cpu"><strong>CPU:</strong> {cpu}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   CPU Cooler
    // ---------------------------------------------
    
    if (cpuCooler) {
      componentSpecsArr.push(
        <SpecsLi key="cpuCooler"><strong>CPUクーラー:</strong> {cpuCooler}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   マザーボード
    // ---------------------------------------------
    
    if (motherboard) {
      componentSpecsArr.push(
        <SpecsLi key="motherboard"><strong>マザーボード:</strong> {motherboard}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   メモリ
    // ---------------------------------------------
    
    if (memory) {
      componentSpecsArr.push(
        <SpecsLi key="memory"><strong>メモリ:</strong> {memory}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   ストレージ
    // ---------------------------------------------
    
    if (storage) {
      componentSpecsArr.push(
        <SpecsLi key="storage"><strong>ストレージ:</strong> {storage}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   グラフィックス
    // ---------------------------------------------
    
    if (graphicsCard) {
      componentSpecsArr.push(
        <SpecsLi key="graphicsCard"><strong>グラフィックス:</strong> {graphicsCard}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   光学ドライブ
    // ---------------------------------------------
    
    if (opticalDrive) {
      componentSpecsArr.push(
        <SpecsLi key="opticalDrive"><strong>光学ドライブ:</strong> {opticalDrive}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   電源
    // ---------------------------------------------
    
    if (powerSupply) {
      componentSpecsArr.push(
        <SpecsLi key="powerSupply"><strong>電源:</strong> {powerSupply}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   ケース
    // ---------------------------------------------
    
    if (pcCase) {
      componentSpecsArr.push(
        <SpecsLi key="pcCase"><strong>ケース:</strong> {pcCase}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   モニター
    // ---------------------------------------------
    
    if (monitor) {
      componentSpecsArr.push(
        <SpecsLi key="monitor"><strong>モニター:</strong> {monitor}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   モニター
    // ---------------------------------------------
    
    if (mouse) {
      componentSpecsArr.push(
        <SpecsLi key="mouse"><strong>マウス:</strong> {mouse}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   キーボード
    // ---------------------------------------------
    
    if (keyboard) {
      componentSpecsArr.push(
        <SpecsLi key="keyboard"><strong>キーボード:</strong> {keyboard}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   出力用コンポーネント作成
    // ---------------------------------------------
    
    let componentSpecsBox = '';
    
    if (componentSpecsArr.length > 0) {
       componentSpecsBox = <SpecsBox><SpecsTitle>スペック</SpecsTitle><SpecsUl>{componentSpecsArr}</SpecsUl></SpecsBox>;
    }
    
    
    
    
    // console.log(chalk`
    //   userId: {green ${userId}}
    //   age: {green ${age}}
      
    //   imageSrcSet: {green ${imageSrcSet}}
    //   imageSrc: {green ${imageSrc}}
    //   imageAlt: {green ${imageAlt}}
    // `);
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
        {/* 見出し */}
        <HeadingBox>
          <StyledIcon />
          <Heading>{componentModel}</Heading>
        </HeadingBox>
        
        {/* コメント */}
        {componentComment}
        
        {/* PCスペック */}
        {componentSpecsBox}
        
      </React.Fragment>
    );
    
  }
  
};