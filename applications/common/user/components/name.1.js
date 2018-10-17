// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import moment from 'moment';

import IconHealing from '@material-ui/icons/Healing';
import IconSchedule from '@material-ui/icons/Schedule';


moment.locale('ja');


// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  line-height: 1em;
`;

const Name = styled.div`
  font-size: 14px;
  color: #337ab7;
  margin: 2px 0 0 0;
  padding: 0;
`;

const NameNoColor = styled.div`
  font-size: 14px;
  margin: 2px 0 0 0;
  padding: 0;
`;


const StatusBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 0;
`;

const StyledIconHealing = styled(IconHealing)`
  && {
    font-size: 18px;
    margin: 0 2px 0 2px;
  }
`;

const Status = styled.div`
  font-size: 14px;
  margin: 2px 0 0 0;
`;

const AccessTimeBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 0;
`;

const StyledIconSchedule = styled(IconSchedule)`
  && {
    font-size: 18px;
    margin: 0 2px 0 2px;
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
    
    const { stores, id, anonymity, name, status } = this.props;
    
    const userObj = stores.data.userObj;
    
    // const {
    //   userObj
    // } = this.props.stores.data;
    
    
    // --------------------------------------------------
    //   Name & Status & Access Time
    // --------------------------------------------------
    
    let loginUser = false;
    let nameValue = '';
    let statusValue = '';
    let accessTime = '';
    
    if (anonymity) {
      
      nameValue = 'ななしさん';
      statusValue = '774';
    
    } else if (name && status) {
      
      nameValue = name;
      statusValue = status;
    
    } else if (id && id in userObj) {
      
      loginUser = true;
      nameValue = userObj[id].name;
      statusValue = userObj[id].status;
      
      const datetimeNow = moment().utcOffset(0);
      const datetimeAccess = moment(userObj[id].accessDate).utcOffset(0);
      
      accessTime = datetimeAccess.from(datetimeNow);
      
      // console.log(`datetimeNow = ${datetimeNow}`);
      // console.log(`datetimeAccess = ${datetimeAccess}`);
      
    } else {
      
      nameValue = '削除済みユーザー';
      statusValue = 'deleted';
      
    }
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
        
        {loginUser ? (
          <Name>{nameValue}</Name>
        ) : (
          <NameNoColor>{nameValue}</NameNoColor>
        )}
        
        <StatusBox>
          <StyledIconHealing />
          <Status>{statusValue}</Status>
        </StatusBox>
        
        {accessTime &&
          <AccessTimeBox>
            <StyledIconSchedule />
            <Status>{accessTime}</Status>
          </AccessTimeBox>
        }
      </Container>
    );
    
  }
  
};