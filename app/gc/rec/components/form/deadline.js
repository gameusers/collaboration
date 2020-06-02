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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import TextField from '@material-ui/core/TextField';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationRecruitmentThreadsDeadlineDate } from 'app/@database/recruitment-threads/validations/deadline.js';






// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeGcRecruitment')
@observer
export default injectIntl(class extends React.Component {
  
  
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
    //   storeGcRecruitment
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
    
    // const formattedDate = deadlineDate || '';
    // const formattedDate = deadlineDate ? moment(deadlineDate).format('YYYY-MM-DDThh:mm:ss') : '';
    const formattedDate = deadlineDate ? moment(deadlineDate).format('YYYY-MM-DDTHH:mm') : '';
    
    
    
    
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
          募集期間 （未記入でもOK）
        </h3>
        
        <p
          css={css`
            // margin: 0 0 24px 0;
          `}
        >
          募集期間を設定する場合は、募集の締切日時を設定してください。募集期間が過ぎると、募集者とコメントをした方のID・情報が自動的に非表示になります。無期限に募集を掲載したい場合は未記入にしてください。
        </p>
        
        <p
          css={css`
            color: red;
            margin: 0 0 24px 0;
          `}
        >
          すぐに募集を締め切りたい場合は、この欄で過去の日付を入力してください。
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
          id={`${pathArr.join('-')}-deadlineDate`}
          label="募集の締切日時"
          type="datetime-local"
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