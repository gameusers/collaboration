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
import { useIntl } from 'react-intl';

/** @jsx jsx */
import { css, jsx } from '@emotion/react';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateLayout } from 'app/@states/layout.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import DialogTermsOfService from 'app/common/layout/v2/dialog-terms-of-service.js';






/**
 * Export Component
 */
const Component = (props) => {


  // --------------------------------------------------
  //   props
  // --------------------------------------------------

  const {

    agreeTermsOfService,
    setAgreeTermsOfService,

  } = props;




  // --------------------------------------------------
  //   States
  // --------------------------------------------------

  const stateLayout = ContainerStateLayout.useContainer();

  const { setDialogTermsOfServiceOpen } = stateLayout;




  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------

  const intl = useIntl();




  // --------------------------------------------------
  //   Return
  // --------------------------------------------------

  return (
    <React.Fragment>


      {/* Checkbox */}
      <div
        css={css`
          display: flex;
          flex-flow: row wrap;
        `}
      >

        <FormControlLabel
          control={
            <Checkbox
              checked={agreeTermsOfService}
              onChange={() => setAgreeTermsOfService(!agreeTermsOfService)}
            />
          }
          label="利用規約に同意します"
        />

        <Button
          color="primary"
          onClick={() => setDialogTermsOfServiceOpen(true)}
        >
          利用規約を表示
        </Button>

      </div>


      {/* 利用規約 */}
      <DialogTermsOfService />


    </React.Fragment>
  );


};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
