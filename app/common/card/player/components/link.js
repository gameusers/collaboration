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


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import Icon from '@material-ui/icons/Public';


// ---------------------------------------------
//   Simple Icons
// ---------------------------------------------

import SimpleIcons from 'simple-icons-react-component';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  margin: 28px 0 0 0;
`;


// ---------------------------------------------
//   Heading
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
//   Link
// ---------------------------------------------

const Box = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const Item = styled.div`
  margin: 10px 14px 0 0;
`;

const OtherBox = styled.div`
  margin: 10px 12px 0 0;
`;

const OtherButton = styled(Button)`
  && {
    font-size: 14px;
    min-width: 36px;
    min-height: 26px
    margin: 0;
    padding: 0 6px;
  }
`;

const IconBox = styled.div`
  width: 24px;
  height: 24px;
`;




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
    
    const { linkArr } = this.props;
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (!Array.isArray(linkArr) || linkArr.length === 0) {
      return null;
    }
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - リンク
    // --------------------------------------------------
    
    const componentLinkArr = [];
    
    for (const [index, valueObj] of linkArr.entries()) {
      
      if (valueObj.type === 'Other') {
        
        componentLinkArr.push(
          <OtherBox key={index}>
            <OtherButton
              variant="outlined"
              color="secondary"
              href={valueObj.url}
              target="_blank"
            >
              {valueObj.label}
            </OtherButton>
          </OtherBox>
        );
        
      } else if (valueObj.url) {
        
        componentLinkArr.push(
          <Item key={`link${index}`}>
            <a href={valueObj.url} target="_blank">
              <IconBox alt={valueObj.type}>
                <SimpleIcons name={valueObj.type} />
              </IconBox>
            </a>
          </Item>
        );
        
      }
      
    }
    
    let componentLinkBox = '';
    
    if (componentLinkArr.length > 0) {
       componentLinkBox = <Box>{componentLinkArr}</Box>;
    } else {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
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
          <Heading>リンク</Heading>
        </HeadingBox>
        
        {componentLinkBox}
        
      </Container>
    );
    
    
  }
  
};