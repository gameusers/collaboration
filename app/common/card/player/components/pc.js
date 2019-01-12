// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

// import chalk from 'chalk';
// import util from 'util';


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

const Container = styled.div`
  margin: 28px 0 0 0;
  padding: 0;
`;


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

const CommentBox = styled.div`
  margin: 6px 0 0 0;
  padding: 0 0 0 0;
`;


// ---------------------------------------------
//   PC Specs
// ---------------------------------------------

const SpecsBox = styled.ul`
  margin: 16px 0 0 0;
  padding: 0 0 0 0;
`;

const SpecsTitle = styled.p`
  font-weight: bold;
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
    
    const {
      pcModel,
      pcComment,
      pcOs,
      pcCpu,
      pcCpuCooler,
      pcMotherboard,
      pcMemory,
      pcStorage,
      pcGraphicsCard,
      pcOpticalDrive,
      pcPowerSupply,
      pcCase,
      pcMonitor,
      pcMouse,
      pcKeyboard
    } = this.props;
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (
      !pcModel &&
      !pcComment &&
      !pcOs &&
      !pcCpu &&
      !pcCpuCooler &&
      !pcMotherboard &&
      !pcMemory &&
      !pcStorage &&
      !pcGraphicsCard &&
      !pcOpticalDrive &&
      !pcPowerSupply &&
      !pcCase &&
      !pcMonitor &&
      !pcMouse &&
      !pcKeyboard
    ) {
      return null;
    }
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - モデル
    // --------------------------------------------------
    
    let componentModel = 'PC';
    
    if (pcModel) {
      componentModel = `PC: ${pcModel}`;
    }
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - コメント
    // --------------------------------------------------
    
    let componentComment = '';
    
    if (pcComment) {
      componentComment = <CommentBox><Paragraph text={pcComment} /></CommentBox>;
    }
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - PCスペック
    // --------------------------------------------------
    
    const componentSpecsArr = [];
    
    
    // ---------------------------------------------
    //   OS
    // ---------------------------------------------
    
    if (pcOs) {
      componentSpecsArr.push(
        <SpecsLi key="os"><strong>OS:</strong> {pcOs}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   CPU
    // ---------------------------------------------
    
    if (pcCpu) {
      componentSpecsArr.push(
        <SpecsLi key="cpu"><strong>CPU:</strong> {pcCpu}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   CPU Cooler
    // ---------------------------------------------
    
    if (pcCpuCooler) {
      componentSpecsArr.push(
        <SpecsLi key="cpuCooler"><strong>CPUクーラー:</strong> {pcCpuCooler}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   マザーボード
    // ---------------------------------------------
    
    if (pcMotherboard) {
      componentSpecsArr.push(
        <SpecsLi key="motherboard"><strong>マザーボード:</strong> {pcMotherboard}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   メモリ
    // ---------------------------------------------
    
    if (pcMemory) {
      componentSpecsArr.push(
        <SpecsLi key="memory"><strong>メモリ:</strong> {pcMemory}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   ストレージ
    // ---------------------------------------------
    
    if (pcStorage) {
      componentSpecsArr.push(
        <SpecsLi key="storage"><strong>ストレージ:</strong> {pcStorage}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   グラフィックス
    // ---------------------------------------------
    
    if (pcGraphicsCard) {
      componentSpecsArr.push(
        <SpecsLi key="graphicsCard"><strong>グラフィックス:</strong> {pcGraphicsCard}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   光学ドライブ
    // ---------------------------------------------
    
    if (pcOpticalDrive) {
      componentSpecsArr.push(
        <SpecsLi key="opticalDrive"><strong>光学ドライブ:</strong> {pcOpticalDrive}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   電源
    // ---------------------------------------------
    
    if (pcPowerSupply) {
      componentSpecsArr.push(
        <SpecsLi key="powerSupply"><strong>電源:</strong> {pcPowerSupply}</SpecsLi>
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
    
    if (pcMonitor) {
      componentSpecsArr.push(
        <SpecsLi key="monitor"><strong>モニター:</strong> {pcMonitor}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   マウス
    // ---------------------------------------------
    
    if (pcMouse) {
      componentSpecsArr.push(
        <SpecsLi key="mouse"><strong>マウス:</strong> {pcMouse}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   キーボード
    // ---------------------------------------------
    
    if (pcKeyboard) {
      componentSpecsArr.push(
        <SpecsLi key="keyboard"><strong>キーボード:</strong> {pcKeyboard}</SpecsLi>
      );
    }
    
    
    // ---------------------------------------------
    //   出力用コンポーネント作成
    // ---------------------------------------------
    
    let componentSpecsBox = '';
    
    if (componentSpecsArr.length > 0) {
       componentSpecsBox = <SpecsBox><SpecsTitle>スペック</SpecsTitle><SpecsUl>{componentSpecsArr}</SpecsUl></SpecsBox>;
    } else {
      return null;
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
        
        {/* 見出し */}
        <HeadingBox>
          <StyledIcon />
          <Heading>{componentModel}</Heading>
        </HeadingBox>
        
        {/* コメント */}
        {componentComment}
        
        {/* PCスペック */}
        {componentSpecsBox}
        
      </Container>
    );
    
  }
  
};