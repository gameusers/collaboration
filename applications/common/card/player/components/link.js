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

import Button from '@material-ui/core/Button';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import Icon from '@material-ui/icons/Public';


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
  align-Ids: center;
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
//   リンク
// ---------------------------------------------

const LinkBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
`;

const LinkItem = styled.div`
  margin: 10px 14px 0 0;
`;

const LinkOtherBox = styled.div`
  margin: 10px 12px 0 0;
`;

const LinkOtherA = styled.a`
  text-decoration: none;
`;

const LinkOtherButton = styled(Button)`
  && {
    margin: 0;
    padding: 0 6px;
    font-size: 14px;
    min-width: 36px;
    min-height: 26px
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
    
    for (const [index, value] of linkArr.entries()) {
      
      if (value.type === 'Other') {
        
        componentLinkArr.push(
          <LinkOtherBox key={index}>
            <LinkOtherA href={value.url} target="_blank">
              <LinkOtherButton
                variant="contained"
                color="secondary"
              >
                {value.label}
              </LinkOtherButton>
            </LinkOtherA>
          </LinkOtherBox>
        );
        
      } else if (value.url) {
        
        componentLinkArr.push(
          <LinkItem key={`link${index}`}>
            <a href={value.url} target="_blank">
              <img src={`/static/img/common/social/card/${value.type.toLowerCase()}.png`} width="26" height="26" />
            </a>
          </LinkItem>
        );
        
      }
      
    }
    
    let componentLinkBox = '';
    
    if (componentLinkArr.length > 0) {
       componentLinkBox = <LinkBox>{componentLinkArr}</LinkBox>;
    } else {
      return null;
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
          <Heading>リンク</Heading>
        </HeadingBox>
        
        {componentLinkBox}
        
      </Container>
    );
    
  }
  
};