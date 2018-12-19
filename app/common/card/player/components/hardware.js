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
//   Material UI / Icons
// ---------------------------------------------

import Icon from '@material-ui/icons/Gamepad';


// ---------------------------------------------
//   Components
// ---------------------------------------------




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
  margin: 3px 0 0 4px;
`;


// ---------------------------------------------
//   項目
// ---------------------------------------------

const ItemBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  line-height: 1.6em;
  margin: 4px 0 0 0;
  padding: 0;
  
  @media screen and (max-width: 480px) {
    flex-flow: column wrap;
  }
`;

const Item = styled.div`
  margin: 0 20px 0 0;
  padding: 0;
  
  @media screen and (max-width: 480px) {
    margin: 0;
  }
`;

// const ItemInactive = styled.div`
//   margin: 0 20px 0 0;
//   padding: 0;
//   color: #FE2E64;
  
//   @media screen and (max-width: 480px) {
//     margin: 0;
//   }
// `;

const SpanColor = styled.span`
  color: #088A08;
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
    
    const { hardwareActiveArr, hardwareInactiveArr, hardwarePlayingArr } = this.props;
    
    const componentArr = [];
    let tempArr = [];
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    // if (!Array.isArray(hardwareArr) || hardwareArr.length === 0) {
    //   return null;
    // }
    
    
    // --------------------------------------------------
    //   見出し
    // --------------------------------------------------
    
    let componentHeading = <Heading>所有ハードウェア<SpanColor>（昔所有）</SpanColor></Heading>;
    
    if (hardwarePlayingArr) {
      componentHeading = <Heading>ハードウェア</Heading>;
    }
    
    
    
    // ---------------------------------------------
    //   所有ハード
    // ---------------------------------------------
    
    if (Array.isArray(hardwareActiveArr) && hardwareActiveArr.length > 0) {
      
      for (let valueObj of hardwareActiveArr) {
        tempArr.push(valueObj.name);
      }
      
      componentArr.push(
        <Item key="hardwareActive">{tempArr.join(' / ')}</Item>
      );
      
    }
    
    
    // ---------------------------------------------
    //   非所有ハード
    // ---------------------------------------------
    
    tempArr = [];
    
    if (Array.isArray(hardwareInactiveArr) && hardwareInactiveArr.length > 0) {
      
      for (let valueObj of hardwareInactiveArr) {
        tempArr.push(valueObj.name);
      }
      
      componentArr.push(
        <Item key="hardwareInactive"><SpanColor>{tempArr.join(' / ')}</SpanColor></Item>
      );
      
    }
    
    
    // ---------------------------------------------
    //   ハードウェア
    // ---------------------------------------------
    
    if (Array.isArray(hardwarePlayingArr) && hardwarePlayingArr.length > 0) {
      
      for (let valueObj of hardwarePlayingArr) {
        tempArr.push(valueObj.name);
      }
      
      componentArr.push(
        <Item key="hardwarePlaying">{tempArr.join(' / ')}</Item>
      );
      
    }
    
    
    // --------------------------------------------------
    //   コンテンツが存在しない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (componentArr.length === 0) {
      return null;
    }
    
    
    // ---------------------------------------------
    //   コンポーネント作成
    // ---------------------------------------------
    
    const componentBox = <ItemBox>{componentArr}</ItemBox>;
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(chalk`
    //   cardPlayers_id: {green ${cardPlayers_id}}
    // `);
    
    // console.log(`
    //   hardwareArr: \n${util.inspect(hardwareArr, { colors: true, depth: null })}
    // `);
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
          
        {/* 見出し */}
        <HeadingBox>
          <StyledIcon />
          {componentHeading}
        </HeadingBox>
        
        {/* ハードウェア */}
        {componentBox}
          
      </Container>
    );
    
  }
  
};