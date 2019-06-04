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
import moment from 'moment';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconPerson from '@material-ui/icons/Person';




// ---------------------------------------------
//   Moment Locale
// ---------------------------------------------

moment.locale('ja');




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssItem = css`
  margin: 0 20px 0 0;
  
  @media screen and (max-width: 480px) {
    margin: 0;
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
    
    const {
      ageValue,
      ageAlternativeText,
      sexValue,
      sexAlternativeText,
      addressAlternativeText,
      gamingExperienceValue,
      gamingExperienceAlternativeText,
      hobbiesValueArr,
      specialSkillsValueArr,
    } = this.props;
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (
      !ageValue &&
      !ageAlternativeText &&
      !sexValue &&
      !sexAlternativeText &&
      !addressAlternativeText &&
      !gamingExperienceValue &&
      !gamingExperienceAlternativeText &&
      !hobbiesValueArr &&
      !specialSkillsValueArr
    ) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   コンポーネント作成 - プロフィール項目（年齢、性別など）
    // --------------------------------------------------
    
    const componentBasicsArr = [];
    
    
    // ---------------------------------------------
    //   年齢
    // ---------------------------------------------
    
    let age = '';
    
    if (ageAlternativeText) {
      age = ageAlternativeText;
    } else if (ageValue) {
      age = `${moment().diff(ageValue, 'years')}歳`;
    }
    
    if (age) {
      componentBasicsArr.push(
        <div css={cssItem} key="age"><strong>年齢:</strong> {age}</div>
      );
    }
    
    
    // ---------------------------------------------
    //   性別
    // ---------------------------------------------
    
    let sex = '';
    
    if (sexAlternativeText) {
      sex = sexAlternativeText;
    } else if (sexValue === 'male') {
      sex = '男';
    } else if (sexValue === 'female') {
      sex = '女';
    }
    
    if (sex) {
      componentBasicsArr.push(
        <div css={cssItem} key="sex"><strong>性別:</strong> {sex}</div>
      );
    }
    
    
    // ---------------------------------------------
    //   住所
    // ---------------------------------------------
    
    if (addressAlternativeText) {
      componentBasicsArr.push(
        <div css={cssItem} key="address"><strong>住所:</strong> {addressAlternativeText}</div>
      );
    }
    
    
    // ---------------------------------------------
    //   ゲーム歴
    // ---------------------------------------------
    
    let gamingExperience = '';
    
    if (gamingExperienceAlternativeText) {
      gamingExperience = gamingExperienceAlternativeText;
    } else if (gamingExperienceValue) {
      gamingExperience = `${moment(gamingExperienceValue).fromNow(true)}`;
    }
    
    if (gamingExperience) {
      componentBasicsArr.push(
        <div css={cssItem} key="gamingExperience"><strong>ゲーム歴:</strong> {gamingExperience}</div>
      );
    }
    
    
    // ---------------------------------------------
    //   趣味
    // ---------------------------------------------
    
    if (Array.isArray(hobbiesValueArr) && hobbiesValueArr.length > 0) {
      componentBasicsArr.push(
        <div css={cssItem} key="hobbie"><strong>趣味:</strong> {hobbiesValueArr.join(' / ')}</div>
      );
    }
    
    
    // ---------------------------------------------
    //   特技
    // ---------------------------------------------
    
    if (Array.isArray(specialSkillsValueArr) && specialSkillsValueArr.length > 0) {
      componentBasicsArr.push(
        <div css={cssItem} key="specialSkills"><strong>特技:</strong> {specialSkillsValueArr.join(' / ')}</div>
      );
    }
    
    
    // ---------------------------------------------
    //   コンポーネント作成
    // ---------------------------------------------
    
    let componentBasicsBox = '';
    
    if (componentBasicsArr.length > 0) {
      
      componentBasicsBox =
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            margin: 4px 0 0 0;
            
            @media screen and (max-width: 480px) {
              flex-flow: column wrap;
            }
          `}
        >
          {componentBasicsArr}
        </div>
      ;
      
    } else {
      
      return null;
      
    }
    
    
    
    // console.log(chalk`
    //   userId: {green ${userId}}
    //   age: {green ${age}}
      
    //   imageSrcSet: {green ${imageSrcSet}}
    //   imageSrc: {green ${imageSrc}}
    //   imageAlt: {green ${imageAlt}}
    // `);
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          margin: 28px 0 0 0;
        `}
      >
        
        
        {/* Heading */}
        <div
          css={css`
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
          `}
        >
          
          <IconPerson
            css={css`
              && {
                font-size: 24px;
              }
            `}
          />
          
          <h3
            css={css`
              margin: 3px 0 0 4px;
            `}
          >
            プロフィール
          </h3>
          
        </div>
        
        
        {/* 各項目 */}
        {componentBasicsBox}
        
        
      </div>
    );
    
  }
  
};