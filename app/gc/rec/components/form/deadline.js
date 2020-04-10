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
import moment from 'moment';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import TextField from '@material-ui/core/TextField';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationRecruitmentThreadsDeadlineDate } from '../../../../@database/recruitment-threads/validations/deadline';




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
      storeGcRecruitment,
      intl,
      pathArr,
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Forum
    // --------------------------------------------------
    
    const {
      
      dataObj,
      handleEdit,
      
    } = storeGcRecruitment;
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const deadlineDate = lodashGet(dataObj, [...pathArr, 'deadlineDate'], '');
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    const validationRecruitmentThreadsDeadlineDateObj = validationRecruitmentThreadsDeadlineDate({ value: deadlineDate });
    
    
    // --------------------------------------------------
    //   日付のフォーマット
    // --------------------------------------------------
    
    const formattedDate = deadlineDate ? moment(deadlineDate).format('YYYY-MM-DD') : '';
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/gc/rec/components/form/thread.js
    // `);
    
    // console.log(chalk`
    //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
    //   showForm: {green ${showForm}}
    // `);
    
    // console.log(`
    //   ----- validationRecruitmentThreadsID1Obj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(validationRecruitmentThreadsID1Obj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
          
        <h3
          css={css`
            font-weight: bold;
            margin: 0 0 2px 0;
          `}
        >
          募集期限 （未記入でもOK）
        </h3>
        
        <p
          css={css`
            margin: 0 0 24px 0;
          `}
        >
          募集期限を設定する場合は、募集の締切日を設定してください。募集期限が過ぎると、募集者とコメントをした方のID・情報が自動的に非表示になります。無期限に募集を掲載したい場合は未記入にしてください。
        </p>
        
        
        
        <TextField
          css={css`
            && {
              width: 400px;
              
              @media screen and (max-width: 480px) {
                width: 100%;
              }
            }
          `}
          id="deadlineDate"
          label="募集の締切日"
          type="date"
          value={formattedDate}
          onChange={(eventObj) => handleEdit({
            pathArr: [...pathArr, 'deadlineDate'],
            value: eventObj.target.value
          })}
          error={validationRecruitmentThreadsDeadlineDateObj.error}
          helperText={intl.formatMessage({ id: validationRecruitmentThreadsDeadlineDateObj.messageID }, { numberOfCharacters: validationRecruitmentThreadsDeadlineDateObj.numberOfCharacters })}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        
        
        
      </React.Fragment>
    );
    
  }
  
});