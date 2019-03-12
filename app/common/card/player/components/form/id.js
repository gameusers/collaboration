// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';
// import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import IDChip from '../../../../id/components/chip';
import IDForm from '../../../../id/components/form';




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

const Box = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 12px 0 8px 0;
  
  @media screen and (max-width: 480px) {
    flex-flow: column wrap;
  }
`;

const IDFormBox = styled.div`
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
    
    const { _id, idArr, func } = this.props;
    
    
    // --------------------------------------------------
    //   Component - 選択済み
    // --------------------------------------------------
    
    const componentsSelectedArr = [];
    
    for (const [index, valueObj] of idArr.entries()) {
      
      const games_id = lodashGet(valueObj, ['games_id'], '');
      const gamesThumbnailArr = lodashGet(valueObj, ['gamesImagesAndVideosObj', 'thumbnailArr'], []);
      const gamesName = lodashGet(valueObj, ['gamesName'], '');
      
      componentsSelectedArr.push(
        <IDChip
          key={index}
          platform={valueObj.platform}
          label={valueObj.label}
          id={valueObj.id}
          games_id={games_id}
          gamesThumbnailArr={gamesThumbnailArr}
          gamesName={gamesName}
        />
      );
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`\n---------- idArr / id ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(idArr)));
    // console.log(`\n-----------------------------------\n`);
    
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
          ゲームや連絡先のIDを表示します。「IDを編集する」ボタンを押して、表示したいIDを選択してください。
        </Description>
        
        
        {/* 選択済みID */}
        <Box>
          {componentsSelectedArr}
        </Box>
        
        
        {/* ID選択・編集フォーム */}
        <IDFormBox>
          <IDForm
            _id={_id}
            idArr={idArr}
            func={func}
          />
        </IDFormBox>
        
      </React.Fragment>
    );
    
  }
  
};