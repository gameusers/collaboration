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
    
    const { thumbnailSrc, anonymity } = this.props;
    
    
    // --------------------------------------------------
    //   Img Src
    // --------------------------------------------------
    
    // let src = 'https://gameusers.org/assets/img/common/thumbnail_none.png';
    let src = '/static/img/common/thumbnail/none.svg';
    
    if (!anonymity && thumbnailSrc) {
      src = thumbnailSrc;
    }
    
    
    // let srcSet = '';
    
    // if (anonymity) {
    //   src = `https://gameusers.org/assets/img/common/thumbnail_none.png`;
    // }
    
    // if (users_id && users_id in stores.data.usersObj) {
    //   src = `/static/img/user/${users_id}/thumbnail/128x128.jpg`;
    //   srcSet = `/static/img/user/${users_id}/thumbnail/256x256.jpg 320w, /static/img/user/${users_id}/thumbnail/512x512.jpg 640w`;
    // }
    
    
    // console.log(chalk`
    //   thumbnailSrc: {green ${thumbnailSrc}}
    // `);
    
    // console.log(`
    //   stores.data.usersObj: \n${util.inspect(stores.data.usersObj, { colors: true, depth: null })}
    // `);
    
    
    
    // --------------------------------------------------
    //   Img Size
    // --------------------------------------------------
    
    let code = <ThumbnailImg src={src} />;
    
    // let code = <ThumbnailImg src={src} srcSet={srcSet} />;
    
    // if (small) {
    //   code = <ThumbnailSmallImg src={src} />;
    // }
    
    
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