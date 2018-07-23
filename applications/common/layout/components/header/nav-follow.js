// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';

import Button from '@material-ui/core/Button';

import IconLabelImportant from '@material-ui/icons/LabelImportant';
import IconAssignment from '@material-ui/icons/Assignment';
import IconPerson from '@material-ui/icons/Person';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  
  width: 100%;
  // height: 36px;
  text-align: center;
  background-color: #141414;
  margin: 0;
  padding: 0;
`;


// --------------------------------------------------
//   コミュニティ - 参加する
// --------------------------------------------------

const CommunityJoinButton = styled(Button)`
  && {
    color: white;
    margin: 0 4px 0 0;
    padding: 0 6px 0 2px;
  }
`;

const CommunityIconLabelImportant = styled(IconLabelImportant)`
  && {
    font-size: 20px;
    // margin: 0 3px 0 0;
    padding: 0 3px 0 0;
  }
`;


// --------------------------------------------------
//   コミュニティ - ルール
// --------------------------------------------------

const CommunityRuleButton = styled(Button)`
  && {
    color: white;
    margin: 0 2px 0 0;
    padding: 0 6px 0 2px;
  }
`;

const CommunityIconAssignment = styled(IconAssignment)`
  && {
    font-size: 20px;
    margin: 0;
    padding: 0 3px 0 0;
  }
`;


// --------------------------------------------------
//   コミュニティ - メンバー数
// --------------------------------------------------
 
const CommunityMembersBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  color: #BDBDBD;
  margin: 2px 0 0 0;
  padding: 0;
  // border-right: solid 2px #25283D;
`;

const CommunityIconPerson = styled(IconPerson)`
  && {
    font-size: 20px;
    margin: 0;
    padding: 3px 0 0 0;
  }
`;

const CommunityMembers = styled.div`
  font-size: 14px;
  color: #BDBDBD;
  padding: 0;
  // border-right: solid 2px #25283D;
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
    
    const { stores, headerMenuArr } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
        
        <CommunityJoinButton size="small">
          <CommunityIconLabelImportant />
          参加する
        </CommunityJoinButton>
        
        <CommunityRuleButton size="small">
          <CommunityIconAssignment />
          ルール
        </CommunityRuleButton>
        
        <CommunityMembersBox>
          <CommunityIconPerson />
          <CommunityMembers>12345</CommunityMembers>
        </CommunityMembersBox>
        
      </Container>
    );
    
  }
  
};