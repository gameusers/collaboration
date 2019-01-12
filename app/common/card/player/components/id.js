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

import Icon from '@material-ui/icons/Style';




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
  margin: 2px 0 0 4px;
`;


// ---------------------------------------------
//   ID
// ---------------------------------------------

const Box = styled.div`
  display: flex;
  flex-flow: row wrap;
  line-height: 1.8em;
  margin: 4px 0 0 0;
  padding: 0;
  
  @media screen and (max-width: 480px) {
    flex-flow: column wrap;
  }
`;

const Id = styled.div`
  margin: 0 20px 0 0;
  padding: 0;
  
  @media screen and (max-width: 480px) {
    margin: 0;
  }
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
    
    const { arr } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (!Array.isArray(arr) || arr.length === 0) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    const componentsArr = [];
    
    for (const [index, value] of arr.entries()) {
      
      
      // ---------------------------------------------
      //   PlayStation
      // ---------------------------------------------
      
      if (value.type === 'PlayStation') {
        
        componentsArr.push(
          <Id key={`id${index}`}><strong>PlayStation ID: </strong>{value.value}</Id>
        );
        
      }
      
      
      // ---------------------------------------------
      //   Xbox
      // ---------------------------------------------
      
      if (value.type === 'Xbox') {
        
        componentsArr.push(
          <Id key={`id${index}`}><strong>Xbox ID: </strong>{value.value}</Id>
        );
        
      }
      
      
      // ---------------------------------------------
      //   Nintendo
      // ---------------------------------------------
      
      if (value.type === 'Nintendo') {
        
        componentsArr.push(
          <Id key={`id${index}`}><strong>Nintendo ID: </strong>{value.value}</Id>
        );
        
      }
      
      
      // ---------------------------------------------
      //   Steam
      // ---------------------------------------------
      
      if (value.type === 'Steam') {
        
        componentsArr.push(
          <Id key={`id${index}`}><strong>Steam ID: </strong>{value.value}</Id>
        );
        
      }
      
      
      // ---------------------------------------------
      //   Other
      // ---------------------------------------------
      
      if (value.type === 'Other') {
        
        componentsArr.push(
          <Id key={`id${index}`}><strong>{value.label}: </strong>{value.value}</Id>
        );
        
      }
      
    }
    
    
    
    
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
        
        <HeadingBox>
          <StyledIcon />
          <Heading>ID</Heading>
        </HeadingBox>
        
        <Box>{componentsArr}</Box>
        
      </Container>
    );
    
  }
  
};