// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

// const chalk = require('chalk');
// const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  && {
    position: fixed;
    right: 50px;
    bottom: 20px;
    margin: 0;
    padding: 0;
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
    
    const { stores } = this.props;
    
    
    // --------------------------------------------------
    //   Data - 必要な情報を取得
    // --------------------------------------------------
    
    const { loading } = stores.layout;
    
    
    // --------------------------------------------------
    //   ローディング中でない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (!loading) {
      return null;
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
        
        <div className="la-pacman">
        	<div />
        	<div />
        	<div />
        	<div />
        	<div />
        	<div />
        </div>
        
      </Container>
    );
    
  }
  
};