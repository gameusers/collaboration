// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import styled from 'styled-components';
// import Link from 'next/link';
import { inject, observer } from 'mobx-react';

// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import IconKeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import IconKeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

import LinkIcons from '../../components/link-icons';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

let Container = null;
let Image = null;
let BoxData = null;
// let DataTitle = null;
// let BoxDataClosed = null;
// let DataTitleClosed = null;
// let IconButtonDataOpen = null;



const DataTitleBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  // justify-content: center;
  // align-items: center;
  margin: 0 0 2px 0;
  padding: 0 6px 4px 10px;
  border-bottom: #d51a53 solid 1px;
  // background-color: pink;
`;

const DataTitle = styled.h1`
  margin: 6px 0 0 0;
  // padding: 0 10px 4px;
  // border-bottom: #d51a53 solid 1px;
  flex-grow: 2;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.4em;
`;

const IconButtonKeyboardArrowUp = styled(IconButton)`
  margin: 2px auto 0 !important;
  padding: 2px 0 0 !important;
  font-size: 12px !important;
  width: 24px !important;
  height: 24px !important;
  min-width: 24px !important;
  min-height: 24px !important;
  // background-color: blue !important;
`;


const DataInfo = styled.p`
  padding: 6px 20px 0;
  font-size: 12px;
  line-height: 1.4em;
`;

const BoxDataLink = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 10px 0;
`;

// const DivDataLinkForButton = styled.div`
//   margin: 0 12px 0 0;
// `;

// const DivDataLinkForImage = styled.div`
//   margin: 4px 12px 0 0;
// `;

// const ADataLink = styled.a`
//   text-decoration: none;
// `;

// const ButtonDataLink = styled(Button)`
//   margin: 0 !important;
//   padding: 0 !important;
//   font-size: 12px !important;
//   min-width: 36px !important;
//   min-height: 20px !important;
// `;




const BoxDataClosed = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  min-width: 150px;
  max-width: 300px;
  border-radius: 8px;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 0 2px 0 0;
  position: absolute;
  right: 15px;
  bottom: 15px;
`;
      
const DataTitleClosed = styled.h1`
  margin: 0;
  padding: 4px 4px 4px 10px;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.4em;
`;
      
const IconButtonKeyboardArrowDown = styled(IconButton)`
  margin: 0 !important;
  padding: 2px 0 0 !important;
  font-size: 12px !important;
  width: 24px !important;
  height: 24px !important;
  min-width: 24px !important;
  min-height: 24px !important;
  // background-color: red !important;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores') @observer
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
    //   Hero Image
    // --------------------------------------------------
    
    let imgSrc = null;
    
    if (stores.header.heroImageArr) {
      
      const heroImageRandomNo = stores.header.heroImageArr[Math.floor(Math.random() * stores.header.heroImageArr.length)];
      
      const paddingTop = stores.header.dataOpen ? 0 : 'auto';
      
      // padding-top は画像の高さ ÷ 画像の幅 × 100
      Container = styled.div`
        width: 100%;
        background: no-repeat center center url(/static/img/game/${stores.header.gameNo}/hero/${heroImageRandomNo}.jpg);
        background-size: cover;
        position: relative;
        // height: 0;
        padding-top: 56.25%;
        
        @media screen and (max-width: 480px) {
          // position: static;
          // height: auto;
          padding-top: ${paddingTop};
        }
      `;
      
      BoxData = styled.div`
        width: 280px;
        // min-width: 150px;
        // max-width: 300px;
        border-radius: 8px;
        background-color: #000;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        padding: 0 0 6px 0;
        position: absolute;
        right: 15px;
        bottom: 15px;
        
        @media screen and (max-width: 480px) {
          position: static;
          margin: 10px auto;
          right: auto;
          bottom: auto;
        }
      `;
      
      
    // --------------------------------------------------
    //   Hero Image がない場合、サムネイルを表示する
    // --------------------------------------------------
    
    } else {
      
      Container = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        background: no-repeat center center url('/static/img/common/header-back.jpg');
        background-size: cover;
        padding: 15px;
      `;
      
      Image = styled.img`
        margin: 0 15px 0 0;
        border-radius: 8px;
        box-shadow: 4px 4px 10px #383838;
        
        @media screen and (max-width: 480px) {
          width: 96px;
        }
        
        @media screen and (max-width: 320px) {
          width: 64px;
        }
      `;
      
      BoxData = styled.div`
        min-width: 150px;
        max-width: 300px;
        border-radius: 8px;
        background-color: #000;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        padding: 4px 0 6px 0;
      `;
      
      imgSrc = `/static/img/game/${stores.header.gameNo}/thumbnail.jpg`;
      
    }
    
    
    // --------------------------------------------------
    //   Data Link
    // --------------------------------------------------
    
    // let codeDataLinkArr = [];
    
    
    // if (stores.header.dataLinkArr) {
      
    //   stores.header.dataLinkArr.forEach((value, index) => {
        
    //     if (value.type === 'Official') {
          
    //       codeDataLinkArr.push(
    //         <DivDataLinkForButton key={index}>
    //           <ADataLink href={value.url} target="_blank">
    //             <ButtonDataLink
    //               variant="raised"
    //               color="secondary"
    //             >
    //               公式
    //             </ButtonDataLink>
    //           </ADataLink>
    //         </DivDataLinkForButton>
    //       );
          
    //     } else if (value.type === 'Twitter') {
          
    //       codeDataLinkArr.push(
    //         <DivDataLinkForImage key={index}>
    //           <ADataLink href={value.url} target="_blank">
    //             <img src="/static/img/common/social/twitter@2x.png" width="20" height="20" />
    //           </ADataLink>
    //         </DivDataLinkForImage>
    //       );
          
    //     } else if (value.type === 'Facebook') {
          
    //       codeDataLinkArr.push(
    //         <DivDataLinkForImage key={index}>
    //           <ADataLink href={value.url} target="_blank">
    //             <img src="/static/img/common/social/facebook@2x.png" width="20" height="20" />
    //           </ADataLink>
    //         </DivDataLinkForImage>
    //       );
          
    //     } else if (value.type === 'YouTube') {
          
    //       codeDataLinkArr.push(
    //         <DivDataLinkForImage key={index}>
    //           <ADataLink href={value.url} target="_blank">
    //             <img src="/static/img/common/social/youtube@2x.png" width="20" height="20" />
    //           </ADataLink>
    //         </DivDataLinkForImage>
    //       );
          
    //     } else if (value.type === 'Steam') {
          
    //       codeDataLinkArr.push(
    //         <DivDataLinkForImage key={index}>
    //           <ADataLink href={value.url} target="_blank">
    //             <img src="/static/img/common/social/steam@2x.png" width="20" height="20" />
    //           </ADataLink>
    //         </DivDataLinkForImage>
    //       );
          
    //     }
        
    //   });
      
    // }
    
    
    
    return (
      <Container>
        
        {imgSrc && <Image src={imgSrc} />}
        
        { stores.header.dataOpen &&
          <BoxData>
            <DataTitleBox>
              <DataTitle>{stores.header.dataTitle}</DataTitle>
              <IconButtonKeyboardArrowUp color="secondary" onClick={stores.header.dataCloseFunction}>
                <IconKeyboardArrowUp />
              </IconButtonKeyboardArrowUp>
            </DataTitleBox>
            <DataInfo>ハード | {stores.header.dataHardware}</DataInfo>
            <DataInfo>ジャンル | {stores.header.dataGenre}</DataInfo>
            <DataInfo>プレイ人数 | {stores.header.dataPlayersMax}</DataInfo>
            <DataInfo>発売日 | {stores.header.dataReleaseDate}</DataInfo>
            <DataInfo>開発 | {stores.header.dataDeveloper}</DataInfo>
            <BoxDataLink><LinkIcons linkArr={stores.header.dataLinkArr} /></BoxDataLink>
            {/*<BoxDataLink>{codeDataLinkArr}</BoxDataLink>*/}
          </BoxData>
        }
        
        { !stores.header.dataOpen &&
          <BoxDataClosed>
            <DataTitleClosed>{stores.header.dataTitle}</DataTitleClosed>
            <IconButtonKeyboardArrowDown color="secondary" onClick={stores.header.dataOpenFunction}>
              <IconKeyboardArrowDown />
            </IconButtonKeyboardArrowDown>
          </BoxDataClosed>
        }
        
      </Container>
    );
    
  }
  
};