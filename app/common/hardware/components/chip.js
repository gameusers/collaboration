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
import { injectIntl } from 'react-intl';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconLaptopMac from '@material-ui/icons/LaptopMac';
import IconOther from '@material-ui/icons/Grade';


// ---------------------------------------------
//   Simple Icons
// ---------------------------------------------

import SimpleIcons from 'simple-icons-react-component';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeGcRecruitment')
@observer
export default injectIntl(class extends React.Component {
  
  
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
    
    const {
      
      stores,
      intl,
      hardwaresArr = [],
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   配列が空の場合は処理停止
    // --------------------------------------------------
    
    if (hardwaresArr.lenght === 0) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - Hardware Chips
    // --------------------------------------------------
    
    const componentsArr = [];
    
    for (const [index, valueObj] of hardwaresArr.entries()) {
      
      
      // --------------------------------------------------
      //   - PC
      // --------------------------------------------------
      
      if (valueObj.hardwareID === 'P0UG-LHOQ') {
        
        componentsArr.push(
          <div
            key={`hardwareChips-${index}`}
            css={css`
              margin: 8px 8px 0 0;
            `}
          >
            <Chip
              avatar={
                <Avatar alt="PC">
                  <IconLaptopMac />
                </Avatar>
              }
              label="PC"
              color="primary"
              variant="outlined"
            />
          </div>
        );
      
      
      // --------------------------------------------------
      //   - Android
      // --------------------------------------------------
      
      } else if (valueObj.hardwareID === 'SXybALV1f') {
        
        componentsArr.push(
          <div
            key={`hardwareChips-${index}`}
            css={css`
              margin: 8px 8px 0 0;
            `}
          >
            <Chip
              avatar={
                <Avatar alt={valueObj.name} style={{ 'backgroundColor': '#3DDC84' }}>
                  <div style={{ 'width': '80%', 'marginTop': '1px' }}>
                    <SimpleIcons name="Android" color="white" />
                  </div>
                </Avatar>
              }
              label={valueObj.name}
              color="primary"
              variant="outlined"
            />
          </div>
        );
        
        
      // --------------------------------------------------
      //   - iOS
      // --------------------------------------------------
      
      } else if (valueObj.hardwareID === 'o-f3Zxd49') {
        
        componentsArr.push(
          <div
            key={`hardwareChips-${index}`}
            css={css`
              margin: 8px 8px 0 0;
            `}
          >
            <Chip
              avatar={
                <Avatar alt={valueObj.name} style={{ 'backgroundColor': '#999999' }}>
                  <div style={{ 'width': '75%', 'marginTop': '0' }}>
                    <SimpleIcons name="Apple" color="white" />
                  </div>
                </Avatar>
              }
              label={valueObj.name}
              color="primary"
              variant="outlined"
            />
          </div>
        );
      
      
      // --------------------------------------------------
      //   - Nintendo Switch
      // --------------------------------------------------
        
      } else if (valueObj.hardwareID === 'Zd_Ia4Hwm') {
        
        componentsArr.push(
          <div
            key={`hardwareChips-${index}`}
            css={css`
              margin: 8px 8px 0 0;
            `}
          >
            <Chip
              avatar={
                <Avatar alt={valueObj.name} style={{ 'backgroundColor': '#E60012' }}>
                  <div style={{ 'width': '65%', 'marginTop': '2px' }}>
                    <SimpleIcons name="Nintendo Switch" color="white" />
                  </div>
                </Avatar>
              }
              label={valueObj.name}
              color="primary"
              variant="outlined"
            />
          </div>
        );
      
      
      // --------------------------------------------------
      //   - PlayStation 4
      // --------------------------------------------------
      
      } else if (valueObj.hardwareID === 'TdK3Oc-yV') {
        
        componentsArr.push(
          <div
            key={`hardwareChips-${index}`}
            css={css`
              margin: 8px 8px 0 0;
            `}
          >
            <Chip
              avatar={
                <Avatar alt={valueObj.name} style={{ 'backgroundColor': '#003791' }}>
                  <div style={{ 'width': '80%', 'marginTop': '2px' }}>
                    <SimpleIcons name="PlayStation" color="white" />
                  </div>
                </Avatar>
              }
              label={valueObj.name}
              color="primary"
              variant="outlined"
            />
          </div>
        );
        
        
      // --------------------------------------------------
      //   - Xbox One
      // --------------------------------------------------
        
      } else if (valueObj.hardwareID === 'uPqoiXA_8') {
        
        componentsArr.push(
          <div
            key={`hardwareChips-${index}`}
            css={css`
              margin: 8px 8px 0 0;
            `}
          >
            <Chip
              avatar={
                <Avatar alt={valueObj.name} style={{ 'backgroundColor': '#107C10' }}>
                  <div style={{ 'width': '75%', 'marginTop': '2px' }}>
                    <SimpleIcons name="Xbox" color="white" />
                  </div>
                </Avatar>
              }
              label={valueObj.name}
              color="primary"
              variant="outlined"
            />
          </div>
        );
        
        
      // --------------------------------------------------
      //   - Wii U
      // --------------------------------------------------
        
      } else if (valueObj.hardwareID === 'uPqoiXA_8') {
        
        componentsArr.push(
          <div
            key={`hardwareChips-${index}`}
            css={css`
              margin: 8px 8px 0 0;
            `}
          >
            <Chip
              avatar={
                <Avatar alt={valueObj.name} style={{ 'backgroundColor': '#107C10' }}>
                  <div style={{ 'width': '75%', 'marginTop': '2px' }}>
                    <SimpleIcons name="Xbox" color="white" />
                  </div>
                </Avatar>
              }
              label={valueObj.name}
              color="primary"
              variant="outlined"
            />
          </div>
        );
        
        
      // --------------------------------------------------
      //   - PlayStation 3
      // --------------------------------------------------
      
      } else if (valueObj.hardwareID === 'YNZ6nb1Ki') {
        
        componentsArr.push(
          <div
            key={`hardwareChips-${index}`}
            css={css`
              margin: 8px 8px 0 0;
            `}
          >
            <Chip
              avatar={
                <Avatar alt={valueObj.name} style={{ 'backgroundColor': '#003791' }}>
                  <div style={{ 'width': '80%', 'marginTop': '2px' }}>
                    <SimpleIcons name="PlayStation" color="white" />
                  </div>
                </Avatar>
              }
              label={valueObj.name}
              color="primary"
              variant="outlined"
            />
          </div>
        );
        
        
      // --------------------------------------------------
      //   - Xbox 360
      // --------------------------------------------------
        
      } else if (valueObj.hardwareID === '08Qp5KxPA') {
        
        componentsArr.push(
          <div
            key={`hardwareChips-${index}`}
            css={css`
              margin: 8px 8px 0 0;
            `}
          >
            <Chip
              avatar={
                <Avatar alt={valueObj.name} style={{ 'backgroundColor': '#107C10' }}>
                  <div style={{ 'width': '75%', 'marginTop': '2px' }}>
                    <SimpleIcons name="Xbox" color="white" />
                  </div>
                </Avatar>
              }
              label={valueObj.name}
              color="primary"
              variant="outlined"
            />
          </div>
        );
        
        
      // --------------------------------------------------
      //   - Nintendo 3DS
      // --------------------------------------------------
        
      } else if (valueObj.hardwareID === 'qk9DiUwN-') {
        
        componentsArr.push(
          <div
            key={`hardwareChips-${index}`}
            css={css`
              margin: 8px 8px 0 0;
            `}
          >
            <Chip
              avatar={
                <Avatar alt={valueObj.name} style={{ 'backgroundColor': '#D12228' }}>
                  <div style={{ 'width': '65%', 'marginTop': '2px' }}>
                    <SimpleIcons name="Nintendo 3DS" color="white" />
                  </div>
                </Avatar>
              }
              label={valueObj.name}
              color="primary"
              variant="outlined"
            />
          </div>
        );
        
        
      // --------------------------------------------------
      //   - PS Vita
      // --------------------------------------------------
      
      } else if (valueObj.hardwareID === 'mOpBZsQBm') {
        
        componentsArr.push(
          <div
            key={`hardwareChips-${index}`}
            css={css`
              margin: 8px 8px 0 0;
            `}
          >
            <Chip
              avatar={
                <Avatar alt={valueObj.name} style={{ 'backgroundColor': '#003791' }}>
                  <div style={{ 'width': '80%', 'marginTop': '2px' }}>
                    <SimpleIcons name="PlayStation" color="white" />
                  </div>
                </Avatar>
              }
              label={valueObj.name}
              color="primary"
              variant="outlined"
            />
          </div>
        );
        
        
      // --------------------------------------------------
      //   - PSP
      // --------------------------------------------------
      
      } else if (valueObj.hardwareID === 'efIOgWs3N') {
        
        componentsArr.push(
          <div
            key={`hardwareChips-${index}`}
            css={css`
              margin: 8px 8px 0 0;
            `}
          >
            <Chip
              avatar={
                <Avatar alt={valueObj.name} style={{ 'backgroundColor': '#003791' }}>
                  <div style={{ 'width': '80%', 'marginTop': '2px' }}>
                    <SimpleIcons name="PlayStation" color="white" />
                  </div>
                </Avatar>
              }
              label={valueObj.name}
              color="primary"
              variant="outlined"
            />
          </div>
        );
        
        
      // --------------------------------------------------
      //   - ファミリーコンピュータ
      // --------------------------------------------------
        
      } else if (valueObj.hardwareID === 'I-iu-WmkO') {
        
        componentsArr.push(
          <div
            key={`hardwareChips-${index}`}
            css={css`
              margin: 8px 8px 0 0;
            `}
          >
            <Chip
              avatar={
                <Avatar alt="Nintendo" style={{ 'backgroundColor': '#e60012' }}>
                  <div style={{ 'width': '55%', 'marginTop': '2px' }}>
                    <SimpleIcons name="Nintendo" color="white" />
                  </div>
                </Avatar>
              }
              label={valueObj.name}
              color="primary"
              variant="outlined"
            />
          </div>
        );
        
      
      // --------------------------------------------------
      //   - その他
      // --------------------------------------------------
        
      } else {
        
        componentsArr.push(
          <div
            key={`hardwareChips-${index}`}
            css={css`
              margin: 8px 8px 0 0;
            `}
          >
            <Chip
              avatar={
                <Avatar alt={valueObj.name}>
                  <IconOther />
                </Avatar>
              }
              label={valueObj.name}
              color="primary"
              variant="outlined"
            />
          </div>
        );
        
      }
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/gc/rec/components/chip-hardwares.js
    // `);
    
    // console.log(`
    //   ----- hardwaresArr -----\n
    //   ${util.inspect(hardwaresArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        {componentsArr}
        
      </React.Fragment>
    );
    
  }
  
});