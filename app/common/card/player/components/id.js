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

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import Icon from '@material-ui/icons/Grade';




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
  // align-items: center;
  // line-height: 1.8em;
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





const IDBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  
  // width: auto;
  
  // line-height: 1.8em;
  // font-size: 14px;
  color: #3f51b5;
  border: 1px solid #3f51b5;
  // box-sizing: border-box;
  border-radius: 18px;
  margin: 8px 8px 0 0;
  // padding: 0;
  // background-color: pink;
`;

const LeftBox = styled.div`
  // background-color: pink;
  // flex-shrink: 1;
  // min-width: 32px;
  // min-height: 32px;
  // max-width: 32px;
  // max-height: 32px;
  
`;

const StyledAvatar = styled(Avatar)`
  && {
    width: 32px;
    height: 32px;
    background-color: #3f51b5;
  }
`;

const RightBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  // flex-grow: 3;
  padding: 4px 14px 4px 8px;
  // background-color: pink;
`;

const Label = styled.span`
  // font-weight: bold;
  padding: 0 4px 0 0;
`;

const ID = styled.span`
  // padding: 0 12px 0 8px;
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
    
    for (const [index, valueObj] of arr.entries()) {
      
      
      
      
      
      
      // ---------------------------------------------
      //   PlayStation
      // ---------------------------------------------
      
      if (valueObj.type === 'PlayStation') {
        
        componentsArr.push(
          <Id key={`id${index}`}><strong>PlayStation ID: </strong>{valueObj.value}</Id>
        );
        
      }
      
      
      // ---------------------------------------------
      //   Xbox
      // ---------------------------------------------
      
      if (valueObj.type === 'Xbox') {
        
        componentsArr.push(
          <Id key={`id${index}`}><strong>Xbox ID: </strong>{valueObj.value}</Id>
        );
        
      }
      
      
      // ---------------------------------------------
      //   Nintendo
      // ---------------------------------------------
      
      if (valueObj.type === 'Nintendo') {
        
        componentsArr.push(
          <Id key={`id${index}`}><strong>Nintendo ID: </strong>{valueObj.value}</Id>
        );
        
      }
      
      
      // ---------------------------------------------
      //   Steam
      // ---------------------------------------------
      
      if (valueObj.type === 'Steam') {
        
        componentsArr.push(
          <Id key={`id${index}`}><strong>Steam ID: </strong>{valueObj.value}</Id>
        );
        
      }
      
      
      // ---------------------------------------------
      //   Other
      // ---------------------------------------------
      
      if (valueObj.type === 'Other') {
        
        
        // ---------------------------------------------
        //   Avatar
        // ---------------------------------------------
        
        let componentAvatar =
          <StyledAvatar>
            <Icon />
          </StyledAvatar>
        ;
        
        if (valueObj.gamesThumbnail && valueObj.games_id) {
          componentAvatar = <StyledAvatar alt={valueObj.gamesName} src={`/static/img/games/${valueObj.games_id}/thumbnail/image.jpg`} />;
        }
        
        
        // ---------------------------------------------
        //   Label
        // ---------------------------------------------
        
        let label = valueObj.label;
        
        if (!valueObj.label) {
          label = valueObj.gamesName;
        }
        
        
        componentsArr.push(
          <IDBox key={`id${index}`}>
            <LeftBox>
              {componentAvatar}
            </LeftBox>
            <RightBox>
              <Label>{label}:</Label>
              <ID>{valueObj.value}</ID>
            </RightBox>
          </IDBox>
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
        
        
        {/*<br /><br />
        <Chip
          avatar={<Avatar alt="Natacha" src="/static/img/games/w_zkqpr3R/thumbnail/image.jpg" />}
          label="Dead by Daylight: AZ-1979 / 本アカウントaaaaaaaaあ"
          color="primary"
          variant="outlined"
        />
        
        
        <Box>
        
        <IDBox>
          <LeftBox>
            <StyledAvatar alt="Natacha" src="/static/img/games/w_zkqpr3R/thumbnail/image.jpg" />
          </LeftBox>
          <RightBox>
            <Label>Dead by Daylight:</Label>
            <ID>AZ-1979 / 本アカウントaaaaaaaaあ2</ID>
          </RightBox>
        </IDBox>
        
        
        <IDBox>
          <LeftBox>
            <StyledAvatar alt="Natacha" src="/static/img/games/w_zkqpr3R/thumbnail/image.jpg" />
          </LeftBox>
          <RightBox>
            <Label>Dead by Daylight:</Label>
            <ID>AZ-1979</ID>
          </RightBox>
        </IDBox>
        
        </Box>*/}
        
      </Container>
    );
    
  }
  
};