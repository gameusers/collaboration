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

import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import IconButton from '@material-ui/core/IconButton';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';


// ---------------------------------------------
//   States
// ---------------------------------------------

// import { ContainerStateLayout } from 'app/@states/layout.js';






// --------------------------------------------------
//   Components
// --------------------------------------------------

const Component = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    heading,
    defaultExpanded = true,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const [panelExpanded, setPanelExpanded] = useState(defaultExpanded);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  // const stateLayout = ContainerStateLayout.useContainer();
  
  // const {
    
  //   dialogObj,
  //   handleDialogClose,
    
  // } = stateLayout;
  
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  // const handleClick = async ({
    
  //   handle,
  //   argumentsObj,
    
  // }) => {
    
  //   await handle(argumentsObj);
    
  //   handleDialogClose();
    
  // };
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/layout/v2/components/panel.js
  // `);
  
  // console.log(chalk`
  //   open: {green ${open}}
  // `);
  
  // console.log(`
  //   ----- argumentsObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(argumentsObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Accordion
      css={css`
        margin: 0 !important;
      `}
      expanded={panelExpanded}
      // defaultExpanded={defaultExpanded}
    >
      
      
      {/* Heading */}
      <AccordionSummary
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
            onClick={() => setPanelExpanded(!panelExpanded)}
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
        
        
      </AccordionSummary>
      
      
      
      
      {/* Contents */}
      <AccordionDetails
        css={css`
          display: flex;
          flex-flow: column wrap;
        `}
      >
        
        
        {/* Contents */}
        {props.children}
        
        
      </AccordionDetails>
      
      
    </Accordion>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;