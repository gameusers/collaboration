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
import { injectIntl } from 'react-intl';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default injectIntl(class extends React.Component {
  
  
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
    
    this.pathArr = props.pathArr;
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount(){
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ pathArr: this.pathArr });
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, _id, heading, pathArr, defaultExpanded = true } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Panel
    // --------------------------------------------------
    
    const panelExpanded = stores.layout.handleGetPanelExpanded({ pathArr, defaultExpanded });
    const handlePanelExpand = lodashGet(stores, ['layout', 'handlePanelExpand'], '');
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr });
    
    
    // console.log(chalk`
    //   /app/common/layout/components/panel.js
    //   defaultExpanded: {green ${defaultExpanded}}
    //   panelExpanded: {green ${panelExpanded}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <ExpansionPanel
        css={css`
          margin: 0 !important;
        `}
        expanded={panelExpanded}
      >
        
        
        {/* Heading */}
        <ExpansionPanelSummary
          css={css`
            cursor: default !important;
          `}
        >
          
          
          <h2
            css={css`
              font-weight: bold;
              font-size: 18px;
            `}
          >
            {heading}
          </h2>
          
          
          {/* Expansion Button */}
          <div
            css={css`
              margin: 0 0 0 auto;
              padding: 0;
            `}
          >
            <IconButton
              css={css`
                && {
                  margin: 0;
                  padding: 4px;
                }
              `}
              onClick={() => handlePanelExpand({ pathArr, defaultExpanded })}
              aria-expanded={panelExpanded}
              aria-label="Show more"
              disabled={buttonDisabled}
            >
              {panelExpanded ? (
                <IconExpandLess />
              ) : (
                <IconExpandMore />
              )}
            </IconButton>
          </div>
          
          
        </ExpansionPanelSummary>
        
        
        
        
        {/* Contents */}
        <ExpansionPanelDetails
          css={css`
            display: flex;
            flex-flow: column wrap;
          `}
        >
          
          
          {/* Contents */}
          {this.props.children}
          
          
        </ExpansionPanelDetails>
        
        
      </ExpansionPanel>
    );
    
  }
  
});