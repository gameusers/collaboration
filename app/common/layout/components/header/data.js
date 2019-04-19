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
import moment from 'moment';
import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import IconButton from '@material-ui/core/IconButton';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconKeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import IconKeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import LinkIcons from './link-icons';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// --------------------------------------------------
//   Opened
// --------------------------------------------------

const BoxOpened = styled.div`
  width: 280px;
  border-radius: 8px;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  position: absolute;
  right: 15px;
  bottom: 15px;
  padding: 0 0 6px 0;
  
  @media screen and (max-width: 480px) {
    position: static;
    right: auto;
    bottom: auto;
    margin: 10px auto;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 0 2px 0;
  padding: 0 6px 4px 10px;
  border-bottom: #d51a53 solid 1px;
`;

const Title = styled.h1`
  margin: 6px 0 0 0;
  flex-grow: 2;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.4em;
`;

const KeyboardArrowUpIconButton = styled(IconButton)`
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

const Info = styled.p`
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
//   Closed
// --------------------------------------------------

const BoxClosed = styled.div`
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
  position: absolute;
  right: 15px;
  bottom: 15px;
  padding: 0 2px 0 0;
`;
      
const TitleClosed = styled.h1`
  font-size: 14px;
  font-weight: normal;
  line-height: 1.4em;
  margin: 0;
  padding: 4px 4px 4px 10px;
`;
      
const KeyboardArrowDownIconButton = styled(IconButton)`
  && {
    font-size: 12px;
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
    margin: 0;
    padding: 2px 0 0;
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
    const name = lodashGet(stores, ['data', 'headerObj', 'name'], '');
    
    
    // --------------------------------------------------
    //   Hardware
    // --------------------------------------------------
    
    const hardwareArr = lodashGet(stores, ['data', 'headerObj', 'hardwareArr'], []);
    const hardwaresArr = lodashGet(stores, ['data', 'headerObj', 'hardwaresArr'], []);
    
    // 日付で並び替える
    const hardwareSortedArr = hardwareArr.slice().sort((a, b) => {
      
      const date1 = new Date(a.releaseDate);
      const date2 = new Date(b.releaseDate);
      
      return (date1 < date2) ? -1 : 1;
      
    });
    
    
    const hardwareNameArr = [];
    
    // Loop
    for (let valueObj of hardwareSortedArr.values()) {
      
      const resultObj = hardwaresArr.find((value2Obj) => {
        return value2Obj.hardwareID === valueObj.hardwareID;
      });
      
      if ('name' in resultObj) {
        hardwareNameArr.push(resultObj.name);
      }
      
    }
    
    const hardware = hardwareNameArr.join(', ');
    
    
    // --------------------------------------------------
    //   Genre
    // --------------------------------------------------
    
    const genreArr = lodashGet(stores, ['data', 'headerObj', 'genreArr'], []);
    const gameGenresArr = lodashGet(stores, ['data', 'headerObj', 'gameGenresArr'], []);
    
    const genreNameArr = [];
    
    // Loop
    for (let value of genreArr.values()) {
      
      const resultObj = gameGenresArr.find((value2Obj) => {
        return value2Obj.genreID === value;
      });
      
      if ('name' in resultObj) {
        genreNameArr.push(resultObj.name);
      }
      
    }
    
    const genre = genreNameArr.join(', ');
    
    
    // --------------------------------------------------
    //   Players
    // --------------------------------------------------
    
    const playersMin = lodashGet(hardwareSortedArr, [0, 'playersMin'], 1);
    const playersMax = lodashGet(hardwareSortedArr, [0, 'playersMax'], 1);
    const players = playersMin === playersMax ? `${playersMin}人` : `${playersMin}-${playersMax}人`;
    
    
    // --------------------------------------------------
    //   Release Date
    // --------------------------------------------------
    
    const releaseData = lodashGet(hardwareSortedArr, [0, 'releaseDate'], '');
    const formattedReleaseData = moment(releaseData).format('YYYY/MM/DD');
    
    
    // --------------------------------------------------
    //   Developer & Publisher
    // --------------------------------------------------
    
    const developersPublishersArr = lodashGet(stores, ['data', 'headerObj', 'developersPublishersArr'], []);
    const developerID = lodashGet(hardwareSortedArr, [0, 'developerID'], '');
    let developer = '';
    
    // Loop
    for (let valueObj of developersPublishersArr.values()) {
      
      if (valueObj.developerPublisherID === developerID) {
        developer = valueObj.name;
      }
      
    }
    
    
    // --------------------------------------------------
    //   Link
    // --------------------------------------------------
    
    const linkArr = lodashGet(stores, ['data', 'headerObj', 'linkArr'], []);
    
    
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    let componentData = '';
    
    if (headerDataOpen) {
      
      componentData = 
        <BoxOpened>
          <TitleBox>
            <Title>{name}</Title>
            <KeyboardArrowUpIconButton color="secondary" onClick={stores.layout.handleHeaderDataClose}>
              <IconKeyboardArrowUp />
            </KeyboardArrowUpIconButton>
          </TitleBox>
          <Info>ハード | {hardware}</Info>
          <Info>ジャンル | {genre}</Info>
          <Info>プレイ人数 | {players}</Info>
          <Info>発売日 | {formattedReleaseData}</Info>
          <Info>開発 | {developer}</Info>
          <LinkIcons linkArr={linkArr} />
        </BoxOpened>
      ;
      
    } else {
      
      componentData = 
        <BoxClosed>
          <TitleClosed>{name}</TitleClosed>
          <KeyboardArrowDownIconButton color="secondary" onClick={stores.layout.handleHeaderDataOpen}>
            <IconKeyboardArrowDown />
          </KeyboardArrowDownIconButton>
        </BoxClosed>
      ;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   headerDataOpen: {green ${headerDataOpen}}
    //   name: {green ${name}}
    //   hardware: {green ${hardware}}
    // `);
    
    // console.log(`\n---------- hardwareSortedArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(hardwareSortedArr)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(`
    //   ----- hardwareSortedArr -----\n
    //   ${util.inspect(hardwareSortedArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        {componentData}
      </React.Fragment>
    );
    
    
  }
  
};