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


// ---------------------------------------------
//   Components
// ---------------------------------------------

import IDSelectChip from '../../../../id-select/components/chip';
import IDSelectForm from '../../../../id-select/components/form';




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

const Box = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 12px 0 8px 0;
  padding: 0;
  
  @media screen and (max-width: 480px) {
    flex-flow: column wrap;
  }
`;

const OpenDialogButtonBox = styled.div`
  margin: 24px 0 0 0;
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
    
    const { _id, selectedArr, func } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Component - 選択済み
    // --------------------------------------------------
    
    const componentsSelectedArr = [];
    
    for (const [index, valueObj] of selectedArr.entries()) {
      
      let games_id = 'games_id' in valueObj ? valueObj.games_id : '';
      let gamesThumbnail = 'gamesThumbnail' in valueObj ? valueObj.gamesThumbnail : '';
      let gamesName = 'gamesName' in valueObj ? valueObj.gamesName : '';
      
      componentsSelectedArr.push(
        <IDSelectChip
          key={index}
          platform={valueObj.platform}
          label={valueObj.label}
          id={valueObj.id}
          games_id={games_id}
          gamesThumbnail={gamesThumbnail}
          gamesName={gamesName}
        />
      );
      
    }
    
    
    
    
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
        
        <Heading>ID</Heading>
        
        <Description>
          ゲームのIDを表示します。「IDを編集する」ボタンを押して、表示したいIDを選択してください。
        </Description>
        
        
        {/* 選択済みID */}
        <Box>
          {componentsSelectedArr}
        </Box>
        
        
        {/* ID選択・編集フォーム */}
        <OpenDialogButtonBox>
          <IDSelectForm
            _id={_id}
            selectedArr={selectedArr}
            func={func}
          />
        </OpenDialogButtonBox>
        
      </React.Fragment>
    );
    
  }
  
};