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

import Link from 'next/link';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

// import lodashGet from 'lodash/get';
// import lodashSet from 'lodash/set';
// import lodashThrottle from 'lodash/throttle';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';


// ---------------------------------------------
//   Material UI / Icon
// ---------------------------------------------

import IconHome from '@material-ui/icons/Home';
import IconGames from '@material-ui/icons/Games';

import IconForum from '@material-ui/icons/Forum';
import IconDescription from '@material-ui/icons/Description';
import IconIndividual from '@material-ui/icons/DoubleArrow';
import IconSearch from '@material-ui/icons/Search';






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

/**
 * Export Component
 */
const Component = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const { 
    
    arr = [],
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Component
  // --------------------------------------------------
  
  const componentsArr = [];
  
  for (const [index, valueObj] of arr.entries()) {
    
    
    // --------------------------------------------------
    //   Icon & Anchor Text
    // --------------------------------------------------
    
    let icon = '';
    let anchorText = '';
    
    if (valueObj.type === 'gc') {
      
      icon = <IconGames fontSize="small" />;
      anchorText = valueObj.anchorText;
      
    } else if (valueObj.type === 'gc/forum') {
      
      icon = <IconForum fontSize="small" />;
      anchorText = 'フォーラム';
      
    } else if (valueObj.type === 'gc/rec') {
      
      icon = <IconDescription fontSize="small" />;
      anchorText = '募集';
      
    } else if (valueObj.type === 'gc/forum/individual' || valueObj.type === 'gc/rec/individual') {
      
      icon = <IconIndividual fontSize="small" />;
      anchorText = valueObj.anchorText;
      
    } else if (valueObj.type === 'gc/rec/search') {
      
      icon = <IconSearch fontSize="small" />;
      anchorText = '検索';
      
    }
    
    
    // --------------------------------------------------
    //   push
    // --------------------------------------------------
    
    componentsArr.push(
      <div
        css={css`
          display: flex;
          flex-flow: row wrap;
        `}
        key={`breadcrumbs-${index}`}
      >
        
        {icon}
        
        <div
          css={css`
            font-size: 14px;
            margin: 0 0 0 4px;
          `}
        >
          
          {valueObj.href && valueObj.as ?
          
            <Link href={valueObj.href} as={valueObj.as}>
              <a>
                <span
                  css={css`
                    color: rgba(0, 0, 0, 0.54);
                    cursor: pointer;
                  `}
                >
                  {anchorText}
                </span>
              </a>
            </Link>
            
          :
          
            <div
              css={css`
                font-size: 14px;
                font-weight: bold;
                color: rgba(0, 0, 0, 0.87);
                margin: 0 0 0 4px;
              `}
            >
              {anchorText}
            </div>
            
          }
          
        </div>
        
      </div>
    );
    
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/layout/v2/components/breadcrumbs.js
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Paper
      css={css`
        margin: 0 0 16px 0;
        padding: 10px 12px;
      `}
    >
      
      
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        
        
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
          `}
        >
          
          <IconHome fontSize="small" />
          
          <div
            css={css`
              font-size: 14px;
              cursor: pointer;
              margin: 0 0 0 4px;
            `}
          >
            
            <Link href={'/'} as={'/'}>
              <a>
                <span
                  css={css`
                    color: rgba(0, 0, 0, 0.54);
                    cursor: pointer;
                  `}
                >
                  Game Users
                </span>
              </a>
            </Link>
            
          </div>
          
        </div>
        
        
        {componentsArr}
        
        
      </Breadcrumbs>
      
      
    </Paper>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;