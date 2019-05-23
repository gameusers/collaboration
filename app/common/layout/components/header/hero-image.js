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
import styled from 'styled-components';
// import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Data from './data';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const ContainerThumbnail = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-start;
  background: no-repeat center center url('/static/img/common/header/header-back.jpg');
  background-size: cover;
  background-color: #25283D;
  padding: 15px;
`;

const ThumbnailImg = styled.img`
  width: 128px;
  border-radius: 8px;
  box-shadow: 4px 4px 10px #383838;
  margin: 0 15px 0 0;
  
  @media screen and (max-width: 480px) {
    width: 96px;
  }
  
  @media screen and (max-width: 320px) {
    width: 64px;
  }
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
    
    const { stores } = this.props;
    
    
    // --------------------------------------------------
    //   Data
    // --------------------------------------------------
    
    const headerDataOpen = lodashGet(stores, ['layout', 'headerDataOpen'], false);
    const mainArr = lodashGet(stores, ['data', 'headerObj', 'imagesAndVideosObj', 'mainArr'], []);
    const thumbnailArr = lodashGet(stores, ['data', 'headerObj', 'imagesAndVideosObj', 'thumbnailArr'], []);
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   headerDataOpen: {green ${headerDataOpen}}
    //   name: {green ${name}}
    //   hardware: {green ${hardware}}
    // `);
    
    // console.log(`\n---------- mainArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(mainArr)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(`
    //   ----- hardwareSortedArr -----\n
    //   ${util.inspect(hardwareSortedArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    // --------------------------------------------------
    //   Hero Image あり
    // --------------------------------------------------
    
    let code = '';
    
    if (mainArr.length > 0) {
      
      const imageObj = mainArr[0];
      
      const srcSetArr = lodashGet(imageObj, ['srcSetArr'], []).slice().reverse();
      
      let backgroundUrl = '';
      let paddingTop = '56.25%';
      let mediaQueries = '';
      
      for (const [index, valueObj] of srcSetArr.entries()) {
        
        if (valueObj.w === '800w') {
          mediaQueries += `
            @media screen and (max-width: 800px) {
              background: no-repeat center center url(${valueObj.src});
            }
          `;
        } else if (valueObj.w === '640w') {
          mediaQueries += `
            @media screen and (max-width: 640px) {
              background: no-repeat center center url(${valueObj.src});
            }
          `;
        } else if (valueObj.w === '480w') {
          mediaQueries += `
            @media screen and (max-width: 480px) {
              background: no-repeat center center url(${valueObj.src});
              padding-top: ${headerDataOpen ? '10px' : 'auto'};
              padding-bottom: ${headerDataOpen ? '10px' : 'auto'};
              // padding-top: ${headerDataOpen ? 0 : 'auto'};
            }
          `;
        }
        
        if (index === 0) {
          backgroundUrl = valueObj.src;
          paddingTop = Math.floor(valueObj.height / valueObj.width * 100);
        }
        
        
      }
      
      
       // padding-top（例：56.25%）は画像の高さ ÷ 画像の幅 × 100
      const Container = styled.div`
        width: 100%;
        background: no-repeat center center url(${backgroundUrl});
        background-size: cover;
        background-color: #25283D;
        position: relative;
        padding-top: ${paddingTop}%;
        
        ${mediaQueries}
      `;
      
      
      code = 
        <Container>
          <Data heroImage={true} />
        </Container>
      ;
      
      
      
    // --------------------------------------------------
    //   Hero Image がない場合、サムネイルを表示する
    // --------------------------------------------------
    
    } else {
      
      const thumbnailSrc = lodashGet(thumbnailArr.slice(), [0, 'srcSetArr', 0, 'src'], '');
      const imgSrc = thumbnailSrc ? thumbnailSrc : '/static/img/common/thumbnail/none-game.jpg';
      
      code = 
        <ContainerThumbnail>
          <ThumbnailImg src={imgSrc} />
          <Data heroImage={false} />
        </ContainerThumbnail>
      ;
      
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