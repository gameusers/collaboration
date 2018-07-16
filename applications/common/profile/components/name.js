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

const NameNoColor = styled.div`
  font-size: 14px;
  // color: #337ab7;
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
    
    const { stores, anonymity, name, status } = this.props;
    
    
    // --------------------------------------------------
    //   Img Src
    // --------------------------------------------------
    
    let nameValue = 'あづみ';
    let statusValue = 'プロハンター';
    let accessTime = '1 時間前';
    
    if (anonymity) {
      nameValue = 'ななしさん';
      statusValue = '774';
    }
    
    if (name) {
      nameValue = name;
    }
    
    if (status) {
      statusValue = status;
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        {!anonymity && !name ? (
          <Name>{nameValue}</Name>
        ) : (
          <NameNoColor>{nameValue}</NameNoColor>
        )}
        
        <StatusBox>
          <StyledIconHealing />
          <Status>{statusValue}</Status>
        </StatusBox>
        
        {!anonymity && !name &&
          <AccessTimeBox>
            <StyledIconSchedule />
            <Status>{accessTime}</Status>
          </AccessTimeBox>
        }
      </React.Fragment>
    );
    
  }
  
};