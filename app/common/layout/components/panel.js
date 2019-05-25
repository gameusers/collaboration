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
// import styled from 'styled-components';
// import { makeStyles } from '@material-ui/styles';
// import { styled } from '@material-ui/styles';
import { injectIntl } from 'react-intl';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { withStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';


// ---------------------------------------------
//   CSS
// ---------------------------------------------

// import css from '../../../../app/login/index/style.css';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const stylesObj = {
  
  expansionPanelExpanded: {
    margin: '0 !important',
    // backgroundColor: 'pink',
  },
  
  expansionPanelSummary: {
    cursor: 'default !important',
    paddingRight: '16px',
    // backgroundColor: 'pink',
  },
  
  iconButton: {
    margin: 0,
    padding: '4px',
    // backgroundColor: 'pink',
  },
  
  expansionPanelDetails: {
    display: 'flex',
    flexFlow: 'column wrap',
  },
  
};




// --------------------------------------------------
//   Class
// --------------------------------------------------

@withStyles(stylesObj)
@inject('stores')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    super(props);
  }
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount(){
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ _id: this.props._id });
    
    
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { classes, stores, _id, heading } = this.props;
    
    
    // --------------------------------------------------
    //   Panel
    // --------------------------------------------------
    
    const panelExpanded = lodashGet(stores, ['layout', 'panelExpandedObj', _id], true);
    const handlePanelExpand = lodashGet(stores, ['layout', 'handlePanelExpand'], '');
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = lodashGet(stores, ['layout', 'buttonDisabledObj', _id], true);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- validationUsersLoginIDObj -----\n
    //   ${util.inspect(validationUsersLoginIDObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- validationUsersLoginPasswordObj -----\n
    //   ${util.inspect(validationUsersLoginPasswordObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   recaptchaRef: {green ${recaptchaRef}}
    // `);
    
    // console.log(classes);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <ExpansionPanel
        classes={{
          expanded: classes.expansionPanelExpanded
        }}
        defaultExpanded={true}
        expanded={panelExpanded}
      >
        
        
        {/* Heading */}
        <ExpansionPanelSummary className={classes.expansionPanelSummary}>
        
          {/*<h2 className={css.heading}>{heading}</h2>*/}
          <h2
            css={css`
              font-weight: bold;
              font-size: 18px;
            `}
          >
            {heading}
          </h2>
          
          {/* Expansion Button */}
          {/*<div className={css.expandMoreBox}>*/}
          <div
            css={css`
              margin: 0 0 0 auto;
              padding: 0;
            `}
          >
            <IconButton
              className={classes.iconButton}
              onClick={() => handlePanelExpand({ _id })}
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
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
          
          
          {/* Contents */}
          {this.props.children}
          
          
        </ExpansionPanelDetails>
        
        
      </ExpansionPanel>
    );
    
  }
  
});