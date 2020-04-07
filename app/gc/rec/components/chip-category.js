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

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

// import IconFriend from '@material-ui/icons/TagFaces';
import IconFriend from '@material-ui/icons/SentimentSatisfiedAlt';
// import IconFriend from '@material-ui/icons/AddCircle';

import IconMember from '@material-ui/icons/SupervisedUserCircle';
// import IconDeal from '@material-ui/icons/Shuffle';
import IconDeal from '@material-ui/icons/MonetizationOn';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeGcRecruitment')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    super(props);
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const {
      
      stores,
      intl,
      category,
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/gc/rec/components/chip-category.js
    // `);
    
    // console.log(chalk`
    //   category: {green ${category}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        {/*<div
          css={css`
            margin: 8px 8px 0 0;
          `}
        >
          <Chip
            avatar={
              <Avatar alt="フレンド募集">
                <IconFriend />
              </Avatar>
            }
            label="フレンド募集"
            color="primary"
            variant="outlined"
          />
        </div>
        
        
        <div
          css={css`
            margin: 8px 8px 0 0;
          `}
        >
          <Chip
            avatar={
              <Avatar alt="メンバー募集">
                <IconMember />
              </Avatar>
            }
            label="メンバー募集"
            color="primary"
            variant="outlined"
          />
        </div>
        
        
        <div
          css={css`
            margin: 8px 8px 0 0;
          `}
        >
          <Chip
            avatar={
              <Avatar alt="売買・交換相手募集">
                <IconDeal />
              </Avatar>
            }
            label="売買・交換相手募集"
            color="primary"
            variant="outlined"
          />
        </div>*/}
        
        
        
        {category === 1 ? (
          
          <div
            css={css`
              margin: 8px 8px 0 0;
            `}
          >
            <Chip
              avatar={
                <Avatar alt="フレンド募集">
                  <IconFriend />
                </Avatar>
              }
              label="フレンド募集"
              color="primary"
              variant="outlined"
            />
          </div>
          
        ) : category === 2 ? (
          
          <div
            css={css`
              margin: 8px 8px 0 0;
            `}
          >
            <Chip
              avatar={
                <Avatar alt="メンバー募集">
                  <IconMember />
                </Avatar>
              }
              label="メンバー募集"
              color="primary"
              variant="outlined"
            />
          </div>
          
        ) : category === 3 (
          
          <div
            css={css`
              margin: 8px 8px 0 0;
            `}
          >
            <Chip
              avatar={
                <Avatar alt="売買・交換相手募集">
                  <IconDeal />
                </Avatar>
              }
              label="売買・交換相手募集"
              color="primary"
              variant="outlined"
            />
          </div>
          
        )}
        
        
      </React.Fragment>
    );
    
  }
  
});