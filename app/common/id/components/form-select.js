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
    super(props);
  }
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ _id: `${this.props._id}-idFormSelect` });
    
    
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, storeIDForm, _id, func } = this.props;
    
    const { buttonDisabledObj } = stores.layout;
    
    const {
      
      dataObj,
      handleMoveSelected,
      handleMoveUnselected,
      handleSelectButton
      
    } = storeIDForm;
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = lodashGet(buttonDisabledObj, [`${_id}-idFormSelect`], true);
    
    
    
    
    // --------------------------------------------------
    //   Component - 選択ID
    // --------------------------------------------------
    
    const dataArr = lodashGet(dataObj, [_id, 'dataArr'], []);
    const selectedIDsArr = [];
    
    const componentsSelectedArr = [];
    const selectedArr = lodashGet(dataObj, [_id, 'selectedArr'], []);
    
    
    for (const [index, value] of selectedArr.entries()) {
      
      const tempObj = dataArr.find((valueObj) => {
        return valueObj._id === value;
      });
      
      if (tempObj) {
        
        selectedIDsArr.push(tempObj);
        
        const games_id = lodashGet(tempObj, ['games_id'], '');
        const gamesThumbnailArr = lodashGet(tempObj, ['gamesImagesAndVideosObj', 'thumbnailArr'], []);
        const gamesName = lodashGet(tempObj, ['gamesName'], '');
        
        componentsSelectedArr.push(
          <div
            css={cssIDBox}
            key={index}
            onClick={() => handleMoveSelected({ _id, index })}
          >
            <IDChip
              platform={tempObj.platform}
              label={tempObj.label}
              id={tempObj.id}
              games_id={games_id}
              gamesThumbnailArr={gamesThumbnailArr}
              gamesName={gamesName}
            />
          </div>
        );
        
      }
      
    }
    
    
    // --------------------------------------------------
    //   Component - 未選択ID
    // --------------------------------------------------
    
    const componentsUnselectedArr = [];
    const unselectedArr = lodashGet(dataObj, [_id, 'unselectedArr'], []);
    
    
    for (const [index, value] of unselectedArr.entries()) {
      
      const tempObj = dataArr.find((valueObj) => {
        return valueObj._id === value;
      });
      
      if (tempObj) {
        
        const games_id = lodashGet(tempObj, ['games_id'], '');
        const gamesThumbnailArr = lodashGet(tempObj, ['gamesImagesAndVideosObj', 'thumbnailArr'], []);
        const gamesName = lodashGet(tempObj, ['gamesName'], '');
        
        componentsUnselectedArr.push(
          <div
            css={cssIDBox}
            key={index}
            onClick={() => handleMoveUnselected({ _id, index })}
          >
            <IDChip
              platform={tempObj.platform}
              label={tempObj.label}
              id={tempObj.id}
              games_id={games_id}
              gamesThumbnailArr={gamesThumbnailArr}
              gamesName={gamesName}
            />
          </div>
        );
        
      }
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`\n---------- idArr / form select ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(idArr)));
    // console.log(`\n-----------------------------------\n`);
    
    
    
    
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
            _id,
            idArr: selectedIDsArr,
            func
          })}
          disabled={buttonDisabled}
        >
          選択を確定する
        </Button>
        
        
      </div>
    );
    
  }
  
};