// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

// import chalk from 'chalk';
// import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import moment from 'moment';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import Icon from '@material-ui/icons/Person';


// ---------------------------------------------
//   Components
// ---------------------------------------------


// ---------------------------------------------
//   Moment Locale
// ---------------------------------------------

moment.locale('ja');





// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  margin: 28px 0 0 0;
  padding: 0;
`;


// ---------------------------------------------
//   見出し
// ---------------------------------------------

const HeadingBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  && {
    font-size: 24px;
  }
`;

const Heading = styled.h3`
  margin: 3px 0 0 4px;
`;


// ---------------------------------------------
//   項目
// ---------------------------------------------

const ItemBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  line-height: 2.0em;
  margin: 4px 0 0 0;
  padding: 0;
  
  @media screen and (max-width: 480px) {
    flex-flow: column wrap;
  }
`;

const Item = styled.div`
  margin: 0 20px 0 0;
  padding: 0;
  
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
  
  constructor(props) {
    super(props);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const {
      birthdayValue,
      birthdayAlternativeText,
      sexValue,
      sexAlternativeText,
      addressValue,
      gamingExperienceValue,
      gamingExperienceAlternativeText,
      hobbiesValueArr,
      specialSkillsValueArr,
    } = this.props;
    
    
    // --------------------------------------------------
    //   必要な情報がない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (
      !birthdayValue &&
      !birthdayAlternativeText &&
      !sexValue &&
      !sexAlternativeText &&
      !addressValue &&
      !gamingExperienceValue &&
      !gamingExperienceAlternativeText &&
      !hobbiesValueArr &&
      !specialSkillsValueArr
    ) {
      return null;
    }
    
    // console.log(chalk`
    //   hobbiesValueArr: {green ${hobbiesValueArr}}
    // `);
    
    // --------------------------------------------------
    //   コンポーネント作成 - プロフィール項目（年齢、性別など）
    // --------------------------------------------------
    
    const componentBasicsArr = [];
    
    
    // ---------------------------------------------
    //   年齢
    // ---------------------------------------------
    
    let age = '';
    
    if (birthdayAlternativeText) {
      age = birthdayAlternativeText;
    } else if (birthdayValue) {
      age = `${moment().diff(birthdayValue, 'years')}歳`;
    }
    
    if (age) {
      componentBasicsArr.push(
        <Item key="age"><strong>年齢:</strong> {age}</Item>
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
        <Item key="sex"><strong>性別:</strong> {sex}</Item>
      );
    }
    
    
    // ---------------------------------------------
    //   住んでいるところ
    // ---------------------------------------------
    
    if (addressValue) {
      componentBasicsArr.push(
        <Item key="address"><strong>住んでいるところ:</strong> {addressValue}</Item>
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
        <Item key="gamingExperience"><strong>ゲーム歴:</strong> {gamingExperience}</Item>
      );
    }
    
    
    // ---------------------------------------------
    //   趣味
    // ---------------------------------------------
    
    if (Array.isArray(hobbiesValueArr) && hobbiesValueArr.length > 0) {
      componentBasicsArr.push(
        <Item key="hobbie"><strong>趣味:</strong> {hobbiesValueArr.join(' / ')}</Item>
      );
    }
    
    
    // ---------------------------------------------
    //   特技
    // ---------------------------------------------
    
    if (Array.isArray(specialSkillsValueArr) && specialSkillsValueArr.length > 0) {
      componentBasicsArr.push(
        <Item key="specialSkills"><strong>特技:</strong> {specialSkillsValueArr.join(' / ')}</Item>
      );
    }
    
    
    // ---------------------------------------------
    //   コンポーネント作成
    // ---------------------------------------------
    
    let componentBasicsBox = '';
    
    if (componentBasicsArr.length > 0) {
       componentBasicsBox = <ItemBox>{componentBasicsArr}</ItemBox>;
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
      <Container>
        
        <HeadingBox>
          <StyledIcon />
          <Heading>プロフィール</Heading>
        </HeadingBox>
        
        {/* 各項目 */}
        {componentBasicsBox}
        
      </Container>
    );
    
  }
  
};