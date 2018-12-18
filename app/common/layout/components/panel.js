// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import IconExpandMore from '@material-ui/icons/ExpandMore';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// ---------------------------------------------
//   Title
// ---------------------------------------------

const StyledExpansionPanelSummary = styled(ExpansionPanelSummary)`
  && {
    margin: 0 0 0 0;
    
    @media screen and (max-width: 480px) {
      padding: 0 16px;
    }
  }
`;

const StyledH2 = styled.h2`
  font-size: 18px;
  margin: 3px 0 0 0;
`;


// ---------------------------------------------
//   Contents
// ---------------------------------------------

const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  && {
    @media screen and (max-width: 480px) {
      padding: 0 16px 24px 16px;
    }
  }
`;

// div を入れておかないと表示がおかしくなるため入れている
const ContentsContainer = styled.div`
  width: 100%;
  margin: 0;
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
    
    const { stores, id, summary, summaryComponent, detailsComponent } = this.props;
    
    
    
    // ---------------------------------------------
    //   Panel
    // ---------------------------------------------
    
    const {
      
      panelExpandedObj,
      handlePanelExpanded
      
    } = stores.layout;
    
    
    let expanded = true;
    
    if (id in panelExpandedObj) {
      expanded = panelExpandedObj[id];
    }
    
    
    
    // ---------------------------------------------
    //   Title
    // ---------------------------------------------
    
    const title = summary ? <StyledH2>{summary}</StyledH2> : summaryComponent;
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <ExpansionPanel
        expanded={expanded}
      >
        
        {/* Title */}
        <StyledExpansionPanelSummary
          expandIcon={
            <IconExpandMore
              onClick={() => handlePanelExpanded(id)}
            />
          }
        >
          {title}
        </StyledExpansionPanelSummary>
        
        
        {/* Contents */}
        <StyledExpansionPanelDetails>
          <ContentsContainer>
            {detailsComponent}
          </ContentsContainer>
        </StyledExpansionPanelDetails>
        
      </ExpansionPanel>
    );
    
  }
  
};