// --------------------------------------------------
//   Import
// --------------------------------------------------

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
  margin: 3px 0 0 0;
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
    
    const { stores, anonymity } = this.props;
    
    
    // --------------------------------------------------
    //   Img Src
    // --------------------------------------------------
    
    const userNo = 1;
    
    let src = `https://gameusers.org/assets/img/user/${userNo}/thumbnail.jpg`;
    
    if (anonymity) {
      src = `https://gameusers.org/assets/img/common/thumbnail_none.png`;
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <ThumbnailImg src={src} />
    );
    
  }
  
};