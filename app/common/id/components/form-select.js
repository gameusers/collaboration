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
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import IDChip from './chip';




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssHeading = css`
  font-weight: bold;
  margin: 24px 0 0 0;
`;

const cssBox = css`
  display: flex;
  flex-flow: row wrap;
  margin: 4px 0 8px 0;
  
  @media screen and (max-width: 480px) {
    flex-flow: column wrap;
  }
`;

const cssIDBox = css`
  cursor: pointer;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeIDForm')
@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    
    // --------------------------------------------------
    //   super
    // --------------------------------------------------
    
    super(props);
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    // this.pathArr = [props._id, 'idFormSelectObj'];
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    // this.props.stores.layout.handleButtonEnable({ pathArr: this.pathArr });
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, storeIDForm, pathArr, type, _id } = this.props;
    
    const {
      
      dataObj,
      handleMoveSelected,
      handleMoveUnselected,
      handleSelectButton
      
    } = storeIDForm;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   Component - 選択ID
    // --------------------------------------------------
    
    const dataArr = lodashGet(dataObj, [...pathArr, 'dataArr'], []);
    const selectedIDsArr = [];
    
    const componentsSelectedArr = [];
    const selectedArr = lodashGet(dataObj, [...pathArr, 'selectedArr'], []);
    
    
    for (const [index, value] of selectedArr.entries()) {
      
      const tempObj = dataArr.find((valueObj) => {
        return valueObj._id === value;
      });
      
      if (tempObj) {
        
        selectedIDsArr.push(tempObj);
        
        const games_id = lodashGet(tempObj, ['gamesObj', '_id'], '');
        const gamesName = lodashGet(tempObj, ['gamesObj', 'name'], '');
        const gamesImagesAndVideosThumbnailObj = lodashGet(tempObj, ['gamesObj', 'imagesAndVideosThumbnailObj'], {});
        
        componentsSelectedArr.push(
          <div
            css={cssIDBox}
            key={index}
            onClick={() => handleMoveSelected({
              pathArr,
              index,
            })}
          >
            <IDChip
              platform={tempObj.platform}
              label={tempObj.label}
              id={tempObj.id}
              games_id={games_id}
              gamesName={gamesName}
              gamesImagesAndVideosThumbnailObj={gamesImagesAndVideosThumbnailObj}
            />
          </div>
        );
        
      }
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - 未選択ID
    // --------------------------------------------------
    
    const componentsUnselectedArr = [];
    const unselectedArr = lodashGet(dataObj, [...pathArr, 'unselectedArr'], []);
    
    
    for (const [index, value] of unselectedArr.entries()) {
      
      const tempObj = dataArr.find((valueObj) => {
        return valueObj._id === value;
      });
      
      if (tempObj) {
        
        const games_id = lodashGet(tempObj, ['gamesObj', '_id'], '');
        const gamesName = lodashGet(tempObj, ['gamesObj', 'name'], '');
        const gamesImagesAndVideosThumbnailObj = lodashGet(tempObj, ['gamesObj', 'imagesAndVideosThumbnailObj'], {});
        
        componentsUnselectedArr.push(
          <div
            css={cssIDBox}
            key={index}
            onClick={() => handleMoveUnselected({
              pathArr,
              index,
            })}
          >
            <IDChip
              platform={tempObj.platform}
              label={tempObj.label}
              id={tempObj.id}
              games_id={games_id}
              gamesName={gamesName}
              gamesImagesAndVideosThumbnailObj={gamesImagesAndVideosThumbnailObj}
            />
          </div>
        );
        
      }
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /app/common/id/components/form-select.js
    `);
    
    console.log(chalk`
      _id: {green ${_id}}
    `);
    
    console.log(`
      ----- pathArr -----\n
      ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          padding: 8px 14px 16px 14px;
        `}
      >
        
        
        <p
          css={css`
            margin: 12px 0 0 0;
          `}
        >
          Game Usersでは、何度も同じIDを入力しなくていいように、IDを登録してから利用するシステムになっています。IDを登録したことがない方は、上部の「登録」ボタンを押してIDを登録してみてください。次回からはIDの利用がとても簡単になります。<br /><br />
          
          選択したいIDをクリック（タップ）して、[ 選択ID ] の欄に入れてください。「選択を確定する」ボタンを押すと、IDの選択は完了します。
        </p>
        
        
        
        
        {/* 選択ID */}
        <h4 css={cssHeading}>[ 選択ID ]</h4>
        
        <div css={cssBox}>
          {componentsSelectedArr}
        </div>
        
        
        
        
        {/* 未選択ID */}
        <h4 css={cssHeading}>[ 未選択ID ]</h4>
        
        <div css={cssBox}>
          {componentsUnselectedArr}
        </div>
        
        
        
        
        {/* 「選択を確定する」ボタン */}
        <Button
          css={css`
            && {
              margin: 24px 0 0 0;
            }
          `}
          variant="outlined"
          color="primary"
          onClick={() => handleSelectButton({
            pathArr,
            type,
            _id,
            idsArr: selectedIDsArr,
          })}
          disabled={buttonDisabled}
        >
          選択を確定する
        </Button>
        
        
      </div>
    );
    
  }
  
};