// --------------------------------------------------
//   Import
// --------------------------------------------------

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

import IconHealing from '@material-ui/icons/Healing';
import IconSchedule from '@material-ui/icons/Schedule';
import IconStars from '@material-ui/icons/Stars';


// ---------------------------------------------
//   Moment Locale
// ---------------------------------------------

moment.locale('ja');





// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
  line-height: 1.3em;
  margin: 0 0 0 0;
  padding: 0;
  // width: 80%;
  // background-color: pink;
  
  // @media screen and (max-width: 480px) {
  //   width: 100%;
  // }
`;


// ---------------------------------------------
//   Name
// ---------------------------------------------

const Name = styled.div`
  font-size: 14px;
  color: #337ab7;
  margin: 0 2px 0 0;
  padding: 0;
`;

const NameNoColor = styled.div`
  font-size: 14px;
  margin: 0 2px 0 0;
  padding: 0;
`;


// ---------------------------------------------
//   Status
// ---------------------------------------------

const StatusBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  // align-items: center;
  margin: 0;
  padding: 0;
  // background-color: pink;
`;

const StyledIconHealing = styled(IconHealing)`
  && {
    font-size: 18px;
    margin: 0 2px 0 0;
  }
`;

const Status = styled.div`
  font-size: 14px;
  margin: 0 2px 0 0;
`;


// ---------------------------------------------
//   Access Time
// ---------------------------------------------

const AccessTimeBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  // align-items: center;
  margin: 0;
  padding: 0;
`;

const StyledIconSchedule = styled(IconSchedule)`
  && {
    font-size: 18px;
    margin: 0 3px 0 0;
  }
`;

const AccessTime = styled.div`
  font-size: 14px;
  margin: 0 2px 0 0;
`;


// ---------------------------------------------
//   Level
// ---------------------------------------------

const LevelBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  // align-items: center;
  margin: 0;
  padding: 0;
`;

const StyledIconStars = styled(IconStars)`
  && {
    font-size: 18px;
    margin: 0 3px 0 0;
  }
`;

const Level = styled.div`
  font-size: 14px;
  margin: 0 0 0 0;
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
    
    
    
    // --------------------------------------------------
    //   Name
    // --------------------------------------------------
    
    let componentName = '';
    
    if (anonymity) {
      
      componentName = <NameNoColor>ななしさん</NameNoColor>;
      
    } else if (name) {
      
      componentName = <NameNoColor>{name}</NameNoColor>;
      
    } else if (id && id in userObj) {
      
      componentName = <Name>{userObj[id].name}</Name>;
      
    } else {
      
      componentName = <NameNoColor>削除済みユーザー</NameNoColor>;
      
    }
    
    
    
    // --------------------------------------------------
    //   Status
    // --------------------------------------------------
    
    let componentStatus = '';
    
    if (anonymity) {
      
      componentStatus = <StatusBox><StyledIconHealing /><Status>774</Status></StatusBox>;
      
    } else if (status) {
      
      componentStatus = <StatusBox><StyledIconHealing /><Status>{status}</Status></StatusBox>;
      
    } else if (id && id in userObj) {
      
      componentStatus = <StatusBox><StyledIconHealing /><Status>{userObj[id].status}</Status></StatusBox>;
      
    } else {
      
      componentStatus = <StatusBox><StyledIconHealing /><Status>deleted</Status></StatusBox>;
      
    }
    
    
    
    // --------------------------------------------------
    //   Access Time
    // --------------------------------------------------
    
    let componentAccessTime = '';
    
    if (id && id in userObj) {
      
      const datetimeNow = moment().utcOffset(0);
      const datetimeAccess = moment(userObj[id].accessDate).utcOffset(0);
      const accessTime = datetimeAccess.from(datetimeNow);
      
      componentAccessTime = <AccessTimeBox><StyledIconSchedule /><AccessTime>{accessTime}</AccessTime></AccessTimeBox>;
      
    }
    
    
    // --------------------------------------------------
    //   Level
    // --------------------------------------------------
    
    let componentLevel = '';
    
    if (id && id in userObj) {
      
      componentLevel = <LevelBox><StyledIconStars /><Level>Lv.{userObj[id].level}</Level></LevelBox>;
      
    }
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
        {componentName}
        {componentStatus}
        {componentAccessTime}
        {componentLevel}
      </Container>
    );
    
  }
  
};