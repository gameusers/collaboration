// --------------------------------------------------
//   Import
// --------------------------------------------------

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
  // margin: 0 0 0 0;
`;

const ThumbnailSmallImg = styled.img`
  border-radius: 6px;
  width: 38px;
  // margin: 3px 0 0 0;
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
    
    const { stores, id, anonymity, small } = this.props;
    
    
    // --------------------------------------------------
    //   Img Src
    // --------------------------------------------------
    
    let src = 'https://gameusers.org/assets/img/common/thumbnail_none.png';
    let srcSet = '';
    
    // if (anonymity) {
    //   src = `https://gameusers.org/assets/img/common/thumbnail_none.png`;
    // }
    
    if (id && id in stores.data.usersObj) {
      src = `/static/img/user/${id}/thumbnail/128x128.jpg`;
      srcSet = `/static/img/user/${id}/thumbnail/256x256.jpg 320w, /static/img/user/${id}/thumbnail/512x512.jpg 640w`;
    }
    
    
    
    
    
    
    // --------------------------------------------------
    //   Img Size
    // --------------------------------------------------
    
    let code = <ThumbnailImg src={src} srcSet={srcSet} />;
    
    if (small) {
      code = <ThumbnailSmallImg src={src} />;
    }
    
    
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