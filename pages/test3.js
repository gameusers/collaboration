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
import Error from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import moment from 'moment';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../app/@modules/fetch';
import { createCsrfToken } from '../app/@modules/csrf';




function Index({ data, datetimeCurrent }) {
  
  
  // --------------------------------------------------
  //   Error
  //   参考：https://github.com/zeit/next.js#custom-error-handling
  // --------------------------------------------------
  
  // if (this.error) {
  //   return <Error statusCode={this.props.statusCode} />;
  // }
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <div>
      <h1>Test 3</h1>
      <div>
        {data}: {datetimeCurrent}
        <p><Link href="/test2"><a>Link</a></Link></p>
      </div>
    </div>
  );
  
  
};




// This gets called on every request
export async function getServerSideProps() {
  
  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()
  
  const datetimeCurrent = moment().utc().toISOString();
  
  console.log(chalk`
    datetimeCurrent: {green ${datetimeCurrent}}
  `);
  
  
  // Pass data to the page via props
  return {
    props: {
      data: 'AAA',
      datetimeCurrent,
    }
  };
  
}


export default Index;