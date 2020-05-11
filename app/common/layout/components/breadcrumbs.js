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
import Link from 'next/link';
import { inject, observer } from 'mobx-react';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import lodashGet from 'lodash/get';
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
import IconDescription from '@material-ui/icons/Description';
import IconSearch from '@material-ui/icons/Search';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------

  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { 
      
      stores,
      arr = [],
      
    } = this.props;
    
    
    
    
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
        
      } else if (valueObj.type === 'gc/rec') {
        
        icon = <IconDescription fontSize="small" />;
        anchorText = '募集';
        
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
    //   /app/common/layout/components/breadcrumbs.js
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
          
          
          
          
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
            `}
          >
            
            <IconGames fontSize="small" />
            
            <div
              css={css`
                font-size: 14px;
                cursor: pointer;
                margin: 0 0 0 4px;
              `}
            >
              
              <Link href="/gc/[urlID]/rec/[...slug]?urlID=Dead-by-Daylight&categories=1,2,3&page=1" as="/gc/Dead-by-Daylight/rec/search?categories=1,2,3&page=1" scroll={false}>
                <a>
                  Test1
                </a>
              </Link>
              
            </div>
            
          </div>
          
          
          
          
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
            `}
          >
            
            <IconGames fontSize="small" />
            
            <div
              css={css`
                font-size: 14px;
                cursor: pointer;
                margin: 0 0 0 4px;
              `}
            >
              
              <Link href="/gc/[urlID]/rec/[...slug]?urlID=Dead-by-Daylight&categories=1,2,3&page=2" as="/gc/Dead-by-Daylight/rec/search?categories=1,2,3&page=2" scroll={false}>
                <a>
                  Test2
                </a>
              </Link>
              
            </div>
            
          </div>
          
          
          
          
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
            `}
          >
            
            <IconGames fontSize="small" />
            
            <div
              css={css`
                font-size: 14px;
                cursor: pointer;
                margin: 0 0 0 4px;
              `}
            >
              
              <Link href="/gc/[urlID]/rec/[...slug]?urlID=Dead-by-Daylight&categories=1,2,3&page=3" as="/gc/Dead-by-Daylight/rec/search?categories=1,2,3&page=3" scroll={false}>
                <a>
                  Test3
                </a>
              </Link>
              
            </div>
            
          </div>
          
          
        </Breadcrumbs>
        
        
      </Paper>
    );
    
    
  }
  
  
};