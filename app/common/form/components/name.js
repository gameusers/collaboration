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

import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useIntl, injectIntl } from 'react-intl';
import { Element } from 'react-scroll';
import TextareaAutosize from 'react-autosize-textarea';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationHandleName } from 'app/@validations/name.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import FormIDsInformations from 'app/gc/rec/components/form/ids-informations.js';
import ImageAndVideoForm from 'app/common/image-and-video/components/form.js';




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

// const cssBox = css`
//   border-top: 1px dashed #848484;
//   margin: 24px 0 0 0;
//   padding: 24px 0 0 0;
// `;


// // --------------------------------------------------
// //   Material UI Style Overrides
// //   https://material-ui.com/styles/basics/
// // --------------------------------------------------

// const stylesObj = {
  
//   label: {
//     fontSize: 14
//   },
  
// };






// --------------------------------------------------
//   Components
// --------------------------------------------------

/**
 * ハンドルネーム
 */
const Name = () => {
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const [name, setName] = useState();
  
  
  // --------------------------------------------------
  //   Validation
  // --------------------------------------------------
  
  const validationHandleNameObj = validationHandleName({ value: name });
  
  const {
    
    value,
    error,
    messageID,
    numberOfCharacters,
    
  } = validationHandleNameObj;
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----- validationHandleNameObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(validationHandleNameObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log('AAA');
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <React.Fragment>
      
      <TextField
        css={css`
          && {
            width: 100%;
            max-width: 500px;
          }
        `}
        // id={`${elementName}-name`}
        label="ハンドルネーム"
        value={value}
        onChange={(eventObj) => setName(eventObj.target.value)}
        error={error}
        helperText={intl.formatMessage({ id: messageID }, { numberOfCharacters })}
        margin="normal"
        inputProps={{
          maxLength: 50,
        }}
      />
      
    </React.Fragment>
  );
  
  
};




/**
 * 匿名
 */
const Anonymity = () => {
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const [anonymity, setAnonymity] = useState();
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <div
      css={css`
        margin: 0 0 4px 0;
      `}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={anonymity}
            onChange={(eventObj) => setAnonymity(eventObj.target.checked)}
          />
        }
        label="ハンドルネームを匿名にする"
      />
    </div>
  );
  
  
};




/**
 * ログインしていて enableAnonymity が true の場合は、ハンドルネームを匿名にすることができる
 */
const Component = (props) => {
  
  // const [count, setCount] = useState(0);
  
  const {
    
    // stores,
    enableAnonymity
    
  } = props;
  
  
  // const login = stores.data.getLogin();
  const login = false;
  
  // console.log(chalk`
  //   props.stores.data.getLogin(): {green ${props.stores.data.getLogin()} / ${typeof props.stores.data.getLogin()}}
  // `);
  
  
  return (
    <React.Fragment>
      
      {!login &&
        <Name />
      }
      
      
      {/* Anonymity */}
      {(login && enableAnonymity) &&
        <Anonymity />
      }
      
    </React.Fragment>
  );
  
};


export default Component;




// /**
// * ログインしていて enableAnonymity が true の場合は、ハンドルネームを匿名にすることができる
// */
// const Component = (props) => {
// // const Component = inject('stores')(observer((props) => {
  
//   // const [count, setCount] = useState(0);
  
//   const {
    
//     stores,
//     enableAnonymity
    
//   } = props;
  
  
//   // const login = stores.data.getLogin();
//   const login = false;
  
//   // console.log(chalk`
//   //   props.stores.data.getLogin(): {green ${props.stores.data.getLogin()} / ${typeof props.stores.data.getLogin()}}
//   // `);
  
  
//   return (
//     <React.Fragment>
      
//       {!login &&
//         <Name />
//       }
      
      
//       {/* Anonymity */}
//       {(login && enableAnonymity) &&
//         <Anonymity />
//       }
      
//     </React.Fragment>
//   );
  
// };
// // }));


// export default inject('stores')(observer(Component));
// // export default Component;