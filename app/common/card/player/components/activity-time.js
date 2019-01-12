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

import Icon from '@material-ui/icons/Alarm';




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
//   活動時間
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

const ActivityTime = styled.div`
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
      
      const weekTextArr = ['月', '火', '水', '木', '金', '土', '日'];
      
      
      let week = '';
      
      if (value.weekArr.length > 0) {
        
        const tempArr = [];
        
        for (let value of value.weekArr.values()) {
          tempArr.push(weekTextArr[value]);
        }
        
        week = ` (${tempArr.join(' / ')})`;
      }
      
      
      componentsArr.push(
        <ActivityTime key={`activityTime${index}`}>
          {value.beginTime} ～ {value.endTime}{week}
        </ActivityTime>
      );
      
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
          <Heading>活動時間</Heading>
        </HeadingBox>
        
        <Box>{componentsArr}</Box>
        
      </Container>
    );
    
  }
  
};