// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import styled from 'styled-components';
// import Link from 'next/link';
import { inject, observer } from 'mobx-react';

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';

import IconKeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import IconKeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

import LinkIcons from '../../components/link-icons';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

let DataBox = null;


const DataTitleBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 0 2px 0;
  padding: 0 6px 4px 10px;
  border-bottom: #d51a53 solid 1px;
`;

const DataTitle = styled.h1`
  margin: 6px 0 0 0;
  flex-grow: 2;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.4em;
`;

const DataKeyboardArrowUpIconButton = styled(IconButton)`
  && {
    margin: 2px auto 0;
    padding: 2px 0 0;
    font-size: 12px;
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
  }
`;

const DataInfo = styled.p`
  padding: 6px 20px 0;
  font-size: 12px;
  line-height: 1.4em;
`;

const DataLink = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 10px 0;
`;


// --------------------------------------------------
//   Data Closed
// --------------------------------------------------

const DataBoxClosed = styled.div`
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
      
const DataKeyboardArrowDownIconButton = styled(IconButton)`
  && {
    margin: 0;
    padding: 2px 0 0;
    font-size: 12px;
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
  }
`;


// --------------------------------------------------
//   Thumbnail 表示用
// --------------------------------------------------

const ContainerThumbnail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  background: no-repeat center center url('/static/img/common/header-back.jpg');
  background-size: cover;
  padding: 15px;
`;

const ImageThumbnail = styled.img`
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

// const DataBoxThumbnail = styled.div`
//   min-width: 150px;
//   max-width: 300px;
//   border-radius: 8px;
//   background-color: #000;
//   background-color: rgba(0, 0, 0, 0.5);
//   color: #fff;
//   padding: 4px 0 6px 0;
// `;




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
    //   Data
    // --------------------------------------------------
    
    const ComponentDataBoxOpen = () => (
      <DataBox>
        <DataTitleBox>
          <DataTitle>{stores.layout.headerDataTitle}</DataTitle>
          <DataKeyboardArrowUpIconButton color="secondary" onClick={stores.layout.handleHeaderDataBoxClose}>
            <IconKeyboardArrowUp />
          </DataKeyboardArrowUpIconButton>
        </DataTitleBox>
        <DataInfo>ハード | {stores.layout.headerDataHardware}</DataInfo>
        <DataInfo>ジャンル | {stores.layout.headerDataGenre}</DataInfo>
        <DataInfo>プレイ人数 | {stores.layout.headerDataPlayersMax}</DataInfo>
        <DataInfo>発売日 | {stores.layout.headerDataReleaseDate}</DataInfo>
        <DataInfo>開発 | {stores.layout.headerDataDeveloper}</DataInfo>
        <DataLink><LinkIcons linkArr={stores.layout.headerDataLinkArr} /></DataLink>
      </DataBox>
    );
    
    const ComponentDataBoxClosed = () => (
      <DataBoxClosed>
        <DataTitleClosed>{stores.layout.headerDataTitle}</DataTitleClosed>
        <DataKeyboardArrowDownIconButton color="secondary" onClick={stores.layout.handleHeaderDataBoxOpen}>
          <IconKeyboardArrowDown />
        </DataKeyboardArrowDownIconButton>
      </DataBoxClosed>
    );
    
    
    // --------------------------------------------------
    //   Hero Image あり
    // --------------------------------------------------
    
    let code = '';
    
    if (stores.layout.headerHeroImageArr) {
      
      const heroImageRandomNo = stores.layout.headerHeroImageArr[Math.floor(Math.random() * stores.layout.headerHeroImageArr.length)];
      
      const paddingTop = stores.layout.headerDataBoxOpen ? 0 : 'auto';
      
      
       // padding-top（例：56.25%）は画像の高さ ÷ 画像の幅 × 100
      const Container = styled.div`
        width: 100%;
        background: no-repeat center center url(/static/img/game/${stores.layout.headerGameNo}/hero/${heroImageRandomNo}.jpg);
        background-size: cover;
        background-color: #25283D;
        position: relative;
        padding-top: 56.25%;
        
        @media screen and (max-width: 480px) {
          padding-top: ${paddingTop};
        }
      `;
      
      DataBox = styled.div`
        width: 280px;
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
      
      
      code = 
        <Container>
          
          { stores.layout.headerDataBoxOpen ? (
            <ComponentDataBoxOpen />
          ) : (
            <ComponentDataBoxClosed />
          )}
          
        </Container>
      ;
      
      
      
    // --------------------------------------------------
    //   Hero Image がない場合、サムネイルを表示する
    // --------------------------------------------------
    
    } else {
      
      const imgSrc = `/static/img/game/${stores.layout.headerGameNo}/thumbnail.jpg`;
      
      
      DataBox = styled.div`
        min-width: 150px;
        max-width: 300px;
        border-radius: 8px;
        background-color: #000;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        padding: 4px 0 6px 0;
      `;
      
      code = 
        <ContainerThumbnail>
          <ImageThumbnail src={imgSrc} />
          <ComponentDataBoxOpen />
        </ContainerThumbnail>
      ;
      
    }
    
    
    return (
      <React.Fragment>
        {code}
      </React.Fragment>
    );
    
  }
  
};