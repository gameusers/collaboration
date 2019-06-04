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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI / Icon
// ---------------------------------------------

import IconLaptopMac from '@material-ui/icons/LaptopMac';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Paragraph from '../../../layout/components/paragraph';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  
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
      
      componentComment =
        <div
          css={css`
            margin: 6px 0 0 0;
          `}
        >
          <Paragraph text={pcComment} />
        </div>
      ;
      
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
        <li key="os"><strong>OS:</strong> {pcOs}</li>
      );
    }
    
    
    // ---------------------------------------------
    //   CPU
    // ---------------------------------------------
    
    if (pcCpu) {
      componentSpecsArr.push(
        <li key="cpu"><strong>CPU:</strong> {pcCpu}</li>
      );
    }
    
    
    // ---------------------------------------------
    //   CPU Cooler
    // ---------------------------------------------
    
    if (pcCpuCooler) {
      componentSpecsArr.push(
        <li key="cpuCooler"><strong>CPUクーラー:</strong> {pcCpuCooler}</li>
      );
    }
    
    
    // ---------------------------------------------
    //   マザーボード
    // ---------------------------------------------
    
    if (pcMotherboard) {
      componentSpecsArr.push(
        <li key="motherboard"><strong>マザーボード:</strong> {pcMotherboard}</li>
      );
    }
    
    
    // ---------------------------------------------
    //   メモリ
    // ---------------------------------------------
    
    if (pcMemory) {
      componentSpecsArr.push(
        <li key="memory"><strong>メモリ:</strong> {pcMemory}</li>
      );
    }
    
    
    // ---------------------------------------------
    //   ストレージ
    // ---------------------------------------------
    
    if (pcStorage) {
      componentSpecsArr.push(
        <li key="storage"><strong>ストレージ:</strong> {pcStorage}</li>
      );
    }
    
    
    // ---------------------------------------------
    //   グラフィックス
    // ---------------------------------------------
    
    if (pcGraphicsCard) {
      componentSpecsArr.push(
        <li key="graphicsCard"><strong>グラフィックス:</strong> {pcGraphicsCard}</li>
      );
    }
    
    
    // ---------------------------------------------
    //   光学ドライブ
    // ---------------------------------------------
    
    if (pcOpticalDrive) {
      componentSpecsArr.push(
        <li key="opticalDrive"><strong>光学ドライブ:</strong> {pcOpticalDrive}</li>
      );
    }
    
    
    // ---------------------------------------------
    //   電源
    // ---------------------------------------------
    
    if (pcPowerSupply) {
      componentSpecsArr.push(
        <li key="powerSupply"><strong>電源:</strong> {pcPowerSupply}</li>
      );
    }
    
    
    // ---------------------------------------------
    //   ケース
    // ---------------------------------------------
    
    if (pcCase) {
      componentSpecsArr.push(
        <li key="pcCase"><strong>ケース:</strong> {pcCase}</li>
      );
    }
    
    
    // ---------------------------------------------
    //   モニター
    // ---------------------------------------------
    
    if (pcMonitor) {
      componentSpecsArr.push(
        <li key="monitor"><strong>モニター:</strong> {pcMonitor}</li>
      );
    }
    
    
    // ---------------------------------------------
    //   マウス
    // ---------------------------------------------
    
    if (pcMouse) {
      componentSpecsArr.push(
        <li key="mouse"><strong>マウス:</strong> {pcMouse}</li>
      );
    }
    
    
    // ---------------------------------------------
    //   キーボード
    // ---------------------------------------------
    
    if (pcKeyboard) {
      componentSpecsArr.push(
        <li key="keyboard"><strong>キーボード:</strong> {pcKeyboard}</li>
      );
    }
    
    
    // ---------------------------------------------
    //   出力用コンポーネント作成
    // ---------------------------------------------
    
    let componentSpecsBox = '';
    
    if (componentSpecsArr.length > 0) {
      
      componentSpecsBox =
        <div
          css={css`
            margin: 16px 0 0 0;
          `}
        >
          
          <p
            css={css`
              font-weight: bold;
            `}
          >
            スペック
          </p>
          
          <ul
            css={css`
              list-style-type: disc;
              margin: 3px 0 0 20px;
            `}
          >
            {componentSpecsArr}
          </ul>
          
        </div>
      ;
      
    } else {
      
      return null;
      
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          margin: 28px 0 0 0;
        `}
      >
        
        
        {/* Heading */}
        <div
          css={css`
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
          `}
        >
          
          <IconLaptopMac
            css={css`
              && {
                font-size: 24px;
              }
            `}
          />
          
          
          <h3
            css={css`
              margin: 0 0 0 4px;
            `}
          >
            {componentModel}
          </h3>
          
        </div>
        
        
        {/* コメント */}
        {componentComment}
        
        
        {/* PCスペック */}
        {componentSpecsBox}
        
        
      </div>
    );
    
  }
  
};