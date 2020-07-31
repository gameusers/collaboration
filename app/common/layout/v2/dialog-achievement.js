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

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconClose from '@material-ui/icons/Close';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateLayout } from 'app/@states/layout.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import AchievementChip from 'app/common/achievement/v2/chip.js';






// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

// const useStyles = makeStyles({
  
//   input: {
//     fontSize: '12px',
//     color: '#666',
//     padding: '6px 26px 6px 12px',
//   },
  
// });






// --------------------------------------------------
//   Components
// --------------------------------------------------

const Component = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    dialogAchievementOpen,
    setDialogAchievementOpen,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  // const [open, setOpen] = React.useState(false);
  
  
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
  //   props
  // --------------------------------------------------
  
  // const open = lodashGet(dialogObj, ['open'], false);
  // const title = lodashGet(dialogObj, ['title'], '');
  // const description = lodashGet(dialogObj, ['description'], '');
  // const handle = lodashGet(dialogObj, ['handle'], () => {});
  // const argumentsObj = lodashGet(dialogObj, ['argumentsObj'], {});
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  const handleClick = async ({
    
    handle,
    argumentsObj,
    
  }) => {
    
    await handle(argumentsObj);
    
    handleDialogClose();
    
  };
  
  
  
  
  // --------------------------------------------------
  //   Component - Achievements Chip
  // --------------------------------------------------
  
  const componentAchievementsArr = [];
  
  // for (const [index, valueObj] of achievementsArr.entries()) {
    
  //   componentAchievementsArr.push(
  //     <AchievementChip
  //       key={index}
  //       achievementID={valueObj.achievementID}
  //       urlID={valueObj.urlID}
  //       name={valueObj.name}
  //     />
  //   );
    
  // }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/layout/v2/dialog-achievement.js
  // `);
  
  // console.log(chalk`
  //   dialogAchievementOpen: {green ${dialogAchievementOpen}}
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
    <Dialog
      fullScreen
      open={dialogAchievementOpen}
      onClose={() => setDialogAchievementOpen(false)}
      // TransitionComponent={Transition}
    >
      
      <AppBar
        css={css`
          padding: 0 !important;
        `}
      >
      
        <Toolbar
          css={css`
            && {
              padding-right: 12px;
            }
          `}
        >
          
          <h2>
            実績
          </h2>
          
          
          <div
            css={css`
              margin-left: auto;
            `}
          >
            
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDialogAchievementOpen(false)}
              aria-label="close"
            >
              <IconClose />
            </IconButton>
            
          </div>
          
        </Toolbar>
        
      </AppBar>
      
      
      
      
      
      <div
        css={css`
          margin: 90px 0 0 0;
          // padding: 0 16px;
          
          @media screen and (max-width: 480px) {
            margin: 76px 0 0 0;
          }
        `}
      >
        
        
        
        <div
          css={css`
            display: inline-block;
            position: relative;
            height: 60px;
            line-height: 60px;
            text-align: center;
            padding: 7px 0;
            font-size: 18px;
            background: #acd879;
            color: #FFF;
            box-sizing: border-box;
            
            &:before {
              position: absolute;
              content: '';
              width: 0px;
              height: 0px;
              z-index: 1;
              
              top: 0;
              left: 0;
              border-width: 30px 0px 30px 15px;
              border-color: transparent transparent transparent #fff;
              border-style: solid;
            }
            
            &:after {
              position: absolute;
              content: '';
              width: 0px;
              height: 0px;
              z-index: 1;
              
              top: 0;
              right: 0;
              border-width: 30px 15px 30px 0px;
              border-color: transparent #fff transparent transparent;
              border-style: solid;
            }
            
            margin: 0 24px;
            
            @media screen and (max-width: 480px) {
              margin: 0 0 0 4px;
            }
          `}
        >
          
          <h3
            css={css`
              margin: 0;
              padding: 0 30px;
              border-top: dashed 2px rgba(255, 255, 255, 0.5);
              border-bottom: dashed 2px rgba(255, 255, 255, 0.5);
              line-height: 42px;
            `}
          >
            Good ボタンを押される
          </h3>
          
        </div>
        
        
        
        
        <Paper
          css={css`
            margin: 0 24px;
            
            @media screen and (max-width: 480px) {
              margin: 0;
            }
          `}
          elevation={3}
        >
          
          
          <Stepper
            activeStep={0}
            orientation="vertical"
          >
            
            <Step key={0}>
              
              <StepLabel>1 回</StepLabel>
              
              <StepContent>
                
                <div
                  css={css`
                    display: flex;
                    flex-flow: row wrap;
                  `}
                >
                  
                  <div
                    css={css`
                      font-weight: bold;
                    `}
                  >
                    達成報酬
                  </div>
                  
                  
                  <div
                    css={css`
                      margin: 0 0 0 16px;
                    `}
                  >
                    称号:
                  </div>
                  
                  
                  <AchievementChip
                    achievementID="7YCic-Yds"
                    urlID="7YCic-Yds"
                    name="遊び人"
                  />
                  
                </div>
                
              </StepContent>
              
            </Step>
            
            
            <Step>
              <StepLabel>10 回</StepLabel>
            </Step>
            
            
            <Step>
              <StepLabel>20 回</StepLabel>
            </Step>
            
            <Step>
              <StepLabel>30</StepLabel>
            </Step>
            
            <Step>
              <StepLabel>40</StepLabel>
            </Step>
            
            <Step>
              <StepLabel>50</StepLabel>
            </Step>
            
            <Step>
              <StepLabel>60</StepLabel>
            </Step>
            
          </Stepper>
          
          
        </Paper>
        
        
      </div>
      
      
      
      
    </Dialog>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;