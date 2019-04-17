// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


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

const ThumbnailImg = styled.img`
  border-radius: 6px;
  width: 48px;
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
    
    const { thumbnailSrc, anonymity } = this.props;
    
    
    // --------------------------------------------------
    //   Img Src
    // --------------------------------------------------
    
    let src = '/static/img/common/thumbnail/none.svg';
    
    if (!anonymity && thumbnailSrc) {
      src = thumbnailSrc;
    }
    
    
    // --------------------------------------------------
    //   Img Size
    // --------------------------------------------------
    
    let code = <ThumbnailImg src={src} />;
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        {code}
      </React.Fragment>
    );
    
  }
  
};