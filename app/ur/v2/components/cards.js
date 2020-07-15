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
import Link from 'next/link';
import Router from 'next/router';
import { useIntl } from 'react-intl';
import { Element } from 'react-scroll';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/ja_JP';
import Cookies from 'js-cookie';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

// import { makeStyles } from '@material-ui/core/styles';

// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Collapse from '@material-ui/core/Collapse';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

// import IconExpandLess from '@material-ui/icons/ExpandLess';
// import IconExpandMore from '@material-ui/icons/ExpandMore';


// ---------------------------------------------
//   States
// ---------------------------------------------

// import { ContainerStateForum } from 'app/@states/forum.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

// import Panel from 'app/common/layout/v2/components/panel.js';
// import Paragraph from 'app/common/layout/v2/components/paragraph.js';
// import User from 'app/common/user/v2/components/user.js';
// import ImageAndVideo from 'app/common/image-and-video/v2/components/image-and-video.js';
// import GoodButton from 'app/common/good/v2/components/button.js';
import CardPlayer from 'app/common/card/v2/components/card-player.js';






// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

// const cssFollowButton = css`
//   border-top: 1px dashed #A4A4A4;
//   margin: 24px 0 0 0;
//   padding: 24px 0 0 0;
// `;


// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

// const useStyles = makeStyles({
  
//   expanded: {
//     marginBottom: '0 !important',
//   },
  
//   input: {
//     fontSize: '12px',
//     color: '#666',
//     padding: '6px 26px 6px 12px',
//   },
  
// });






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
    // showFollow,
    showEditButton,
    defaultExpanded = true,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  // const classes = useStyles();
  // const [panelExpanded, setPanelExpanded] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/ur/v2/components/cards.js
  // `);
  
  // console.log(`
  //   ----- arr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(chalk`
  //   showEditButton: {green ${showEditButton}}
  //   defaultExpanded: {green ${defaultExpanded}}
  // `);
  
  
  
  
  // --------------------------------------------------
  //   配列が空の場合は、空のコンポーネントを返す
  // --------------------------------------------------
  
  if (arr.length === 0) {
    return null;
  }
  
  
  
  
  // --------------------------------------------------
  //   Component - Comment & Reply
  // --------------------------------------------------
  
  const componentsArr = [];
  
  for (let valueObj of arr.values()) {
    
    componentsArr.push(
      <CardPlayer
        key={valueObj._id}
        obj={valueObj}
        showEditButton={showEditButton}
        defaultExpanded={defaultExpanded}
      />
    );
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Element
      name={`cards`}
    >
      
      
      {componentsArr}
      
      
      
      
      {/* Pagination */}
      {/*<div
        css={css`
          display: flex;
          flex-flow: row wrap;
          
          border-top: 1px solid;
          border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
          border-image-slice: 1;
          
          padding: 16px 0 0 0;
          margin: 24px 24px 0 0;
        `}
      >*/}
        
        
        {/* Pagination */}
        {/*<div
          css={css`
            margin: 8px 24px 0 0;
          `}
        >
          <Pagination
            disabled={buttonDisabled}
            onChange={() => {}}
            onChange={(page) => handleRead({
              page,
            })}
            pageSize={limit}
            current={page}
            total={count}
            locale={localeInfo}
          />
        </div>*/}
        
        
        
        
        {/* Rows Per Page */}
        {/*<FormControl
          css={css`
            margin: 8px 0 0 0 !important;
          `}
          variant="outlined"
        >
          
          <Select
            value={limit}
            onChange={() => {}}
            onChange={(eventObj) => handleRead({
              page: 1,
              changeLimit: eventObj.target.value,
            })}
            input={
              <OutlinedInput
                classes={{
                  input: classes.input
                }}
                name="forum-comments-pagination"
              />
            }
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
          
        </FormControl>*/}
        
        
      {/*</div>*/}
      
      
    </Element>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;