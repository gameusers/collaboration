// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import IconHealing from '@material-ui/icons/Healing';
import IconSchedule from '@material-ui/icons/Schedule';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Name = styled.div`
  font-size: 14px;
  color: #337ab7;
  margin: 0;
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
    margin: 4px 2px 0 2px;
  }
`;

const Status = styled.div`
  font-size: 14px;
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
    margin: 4px 2px 0 2px;
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
    
    const { stores, anonymity, anonymityName, anonymityStatus } = this.props;
    
    
    // --------------------------------------------------
    //   Img Src
    // --------------------------------------------------
    
    let name = 'あづみ';
    let status = 'プロハンター';
    let accessTime = '1 時間前';
    
    if (anonymity) {
      name = anonymityName ? anonymityName : 'ななしさん';
      status = anonymityStatus ? anonymityStatus : '774';
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        <Name>{name}</Name>
        
        <StatusBox>
          <StyledIconHealing />
          <Status>{status}</Status>
        </StatusBox>
        
        {!anonymity &&
          <AccessTimeBox>
            <StyledIconSchedule />
            <Status>{accessTime}</Status>
          </AccessTimeBox>
        }
      </React.Fragment>
    );
    
  }
  
};