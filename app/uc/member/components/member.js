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
import { injectIntl } from 'react-intl';
// import moment from 'moment';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/ja_JP';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import CardPlayer from '../../../common/card/player/components/player';




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssButton = css`
  && {
    font-size: 12px;
    min-width: 40px;
    min-height: 24px;
    margin: 0 12px 0 0;
    padding: 2px 8px 0;
  }
`;




// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const stylesObj = {
  
  input: {
    fontSize: '12px',
    color: '#666',
    padding: '6px 26px 6px 12px',
  },
  
};




// --------------------------------------------------
//   Class
// --------------------------------------------------

@withStyles(stylesObj)
@inject('stores', 'storeUcMember')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    this.pathArr = [props.userCommunities_id, 'member'];
    
    
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
    
    const {
      
      classes,
      stores,
      storeUcMember,
      intl,
      userCommunities_id,
      pathArr,
      pathname,
      
    } = this.props;
    
    
    const {
      
      handleReadMembers,
      
    } = storeUcMember;
    
    
    const page = lodashGet(storeUcMember, ['dataObj', ...pathArr, 'membersObj', 'page'], 1);
    const count = lodashGet(storeUcMember, ['dataObj', ...pathArr, 'membersObj', 'count'], 1);
    const limit = parseInt((stores.data.getCookie({ key: 'memberLimit' }) || process.env.COMMUNITY_MEMBER_LIMIT), 10);
    const arr = lodashGet(storeUcMember, ['dataObj', ...pathArr, 'membersObj', `page${page}Obj`, 'arr'], []);
    
    
    // const membersObj = lodashGet(storeUcMember, ['dataObj', ...pathArr, 'membersObj'], {});
    
    // console.log(`
    //   ----- membersObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(membersObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   メンバー
    // --------------------------------------------------
    
    const componentCardPlayersArr = [];
    
    for (const [index, value] of arr.entries()) {
      
      componentCardPlayersArr.push(
        <div
          css={css`
            ${index === 0 ? 'margin: 0' : 'margin: 16px 0 0 0'};
          `}
          key={index}
        >
          
          
          {/* Card Player */}
          <CardPlayer
            cardPlayers_id={value}
            showFollow={true}
            showEditButton={true}
            defaultExpanded={false}
          />
          
          
          {/* Buttons */}
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
              margin: 12px 0 16px 0;
            `}
          >
            
            <Button
              css={cssButton}
              variant="contained"
              color="secondary"
            >
              参加承認
            </Button>
            
            
            <Button
              css={cssButton}
              variant="contained"
              color="primary"
            >
              ブロック
            </Button>
            
          </div>
          
          
        </div>
      );
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/uc/member/components/member.js
    // `);
    
    // console.log(chalk`
    //   page: {green ${page}}
    //   count: {green ${count}}
    //   limit: {green ${limit}}
    // `);
    
    // console.log(`
    //   ----- arr -----\n
    //   ${util.inspect(arr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----------------------------------------
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
        {/* Control Buttons */}
        <div
          css={css`
            margin: 0 0 24px 0;
          `}
        >
          <ButtonGroup variant="contained" aria-label="contained primary button group">
            <Button>メンバー</Button>
            <Button>承認申請 (99+)</Button>
            <Button>ブロック</Button>
          </ButtonGroup>
        </div>
        
        
        {/* Member's Card Players */}
        {componentCardPlayersArr}
        
        
        {/* Pagination */}
        <Paper
          css={css`
            display: flex;
            flex-flow: row wrap;
            margin: 16px 0 0 0;
            padding: 0 8px 8px 8px;
          `}
        >
          
          
          {/* Pagination */}
          <div
            css={css`
              margin: 8px 24px 0 0;
            `}
          >
            
            <Pagination
              disabled={buttonDisabled}
              onChange={(page) => handleReadMembers({
                pathArr,
                pathname,
                userCommunities_id,
                page,
              })}
              pageSize={limit}
              current={page}
              total={count}
              locale={localeInfo}
            />
            
          </div>
          
          
          {/* Rows Per Page */}
          <FormControl
            css={css`
              margin: 8px 0 0 0 !important;
            `}
            variant="outlined"
          >
            
            <Select
              value={limit}
              onChange={(eventObj) => handleReadMembers({
                pathArr,
                pathname,
                userCommunities_id,
                page: 1,
                newLimit: eventObj.target.value,
              })}
              input={
                <OutlinedInput
                  classes={{
                    input: classes.input
                  }}
                  name="member-pagination"
                  id="outlined-rows-per-page"
                />
              }
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
            
          </FormControl>
          
          
        </Paper>
        
        
      </React.Fragment>
    );
    
  }
  
});