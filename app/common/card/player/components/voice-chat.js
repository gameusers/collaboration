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

import Icon from '@material-ui/icons/HeadsetMic';


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
    
    const { value, comment } = this.props;
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (!comment) {
      return null;
    }
    
    
    // --------------------------------------------------
    //   できる / できない
    // --------------------------------------------------
    
    let text = 'できない';
    
    if (value) {
      text = 'できる';
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
          
        {/* 見出し */}
        <HeadingBox>
          <StyledIcon />
          <Heading>ボイスチャット: {text}</Heading>
        </HeadingBox>
        
        {/* コメント */}
        <CommentBox><Paragraph text={comment} /></CommentBox>
          
      </Container>
    );
    
  }
  
};