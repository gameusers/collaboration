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

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconEdit from '@material-ui/icons/Edit';
import IconHelpOutline from '@material-ui/icons/HelpOutline';


// ---------------------------------------------
//   States
// ---------------------------------------------

// import { ContainerStateForum } from 'app/@states/forum.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from 'app/common/layout/v2/panel.js';

import CardGC from 'app/common/community-list/v2/card-gc.js';
import Form from 'app/gc/list/v2/form.js';




// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const useStyles = makeStyles({

  expanded: {
    marginBottom: '0 !important',
  },

  input: {
    fontSize: '12px',
    color: '#666',
    padding: '6px 26px 6px 12px',
  },

});




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

    obj,

  } = props;


  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------

  const intl = useIntl();
  const classes = useStyles();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [anchorElEditMode, setAnchorElEditMode] = useState(null);
  const [editable, setEditable] = useState(false);


  useEffect(() => {

    setButtonDisabled(false);

  }, []);


  // --------------------------------------------------
  //   States
  // --------------------------------------------------

  // const stateForum = ContainerStateForum.useContainer();

  // const {

  //   forumThreadsObj,

  // } = stateForum;




  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------

  /**
   * ゲームコミュニティ一覧を読み込む
   * @param {number} page - ページ
   * @param {number} changeLimit - 1ページに表示する件数を変更する場合、値を入力する
   */
  const handleRead = async ({

    page,
    changeLimit,

  }) => {


    try {


      // ---------------------------------------------
      //   Router.push 用
      // ---------------------------------------------

      let url = '';
      let as = '';

      if (page === 1) {

        url = `/gc/list/[[...slug]]`;
        as ='/gc/list';

      } else {

        url = '/gc/list/[[...slug]]';
        as = `/gc/list/${page}`;

      }


      // ---------------------------------------------
      //   Change Limit / Set Cookie
      // ---------------------------------------------

      if (changeLimit) {
        Cookies.set('communityListLimit', changeLimit);
      }


      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------

      // console.log(`
      //   ----------------------------------------\n
      //   app/gc/list/v2/list.js - handleRead
      // `);

      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   page: {green ${page}}
      //   changeLimit: {green ${changeLimit}}

      //   url: {green ${url}}
      //   as: {green ${as}}
      // `);

      // return;


      // ---------------------------------------------
      //   Router.push = History API pushState()
      // ---------------------------------------------

      await Router.push(url, as);


    } catch (errorObj) {}


  };




  // --------------------------------------------------
  //   Thread
  // --------------------------------------------------

  const page = lodashGet(obj, ['page'], 1);
  const limit = lodashGet(obj, ['limit'], parseInt(process.env.NEXT_PUBLIC_COMMUNITY_LIST_LIMIT, 10));
  const count = lodashGet(obj, ['count'], 0);
  const arr = lodashGet(obj, [`page${page}Obj`, 'arr'], []);




  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------

  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/forum/v2/components/forum.js
  // `);

  // console.log(chalk`
  //   urlID: {green ${urlID}}
  //   gameCommunities_id: {green ${gameCommunities_id}}
  //   userCommunityID: {green ${userCommunityID}}
  //   userCommunities_id: {green ${userCommunities_id}}

  //   page: {green ${page}}
  //   count: {green ${count}}
  //   limit: {green ${limit}}
  // `);

  // console.log(`
  //   ----- arr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);




  // --------------------------------------------------
  //   Component - List
  // --------------------------------------------------

  const componentsArr = [];

  for (const [index, gameCommunities_id] of arr.entries()) {


    // --------------------------------------------------
    //   dataObj
    // --------------------------------------------------

    const dataObj = lodashGet(obj, ['dataObj', gameCommunities_id], {});


    // --------------------------------------------------
    //   push
    // --------------------------------------------------

    componentsArr.push(
      <CardGC
        key={index}
        obj={dataObj}
        editable={editable}
      />
    );


  }




  // --------------------------------------------------
  //   Return
  // --------------------------------------------------

  return (
    <Element
      name="GcList"
    >


      {/* Form - Post New Thread */}
      {/* <div
        css={css`
          margin: 0 0 16px 0;
        `}
      >

        <Panel
          heading="スレッド投稿フォーム"
          defaultExpanded={false}
        >

          <FormThread
            gameCommunities_id={gameCommunities_id}
            userCommunities_id={userCommunities_id}
            forumThreads_id=""
          />

        </Panel>

      </div> */}




      {/* List */}
      <div
        css={css`
          margin: 0 0 16px 0;
        `}
      >
        {componentsArr}
      </div>




      {/* Pagination */}
      <Paper
        css={css`
          display: flex;
          flex-flow: row wrap;
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
            onChange={(page) => handleRead({
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
            onChange={(eventObj) => handleRead({
              page: 1,
              changeLimit: eventObj.target.value,
            })}
            input={
              <OutlinedInput
                classes={{
                  input: classes.input
                }}
                name="gc-limit-pagination"
                id="outlined-rows-per-page"
              />
            }
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>

        </FormControl>


      </Paper>




      {/* Pagination */}
      <Paper
        css={css`
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          margin: 48px 0 0 0;
          padding: 12px;
        `}
      >

        <Button
          // type="submit"
          variant="outlined"
          size="small"
          disabled={buttonDisabled}
          onClick={() => setEditable(!editable)}
        >
          <IconEdit
            css={css`
              padding: 0 4px 0 0;
            `}
          />
          ゲーム登録・編集モード
        </Button>




        {/* ？アイコン */}
        <div
          css={css`
            margin: 0 0 0 12px;
          `}
        >
          <IconButton
            css={css`
              && {
                margin: 0 0 0 4px;
                padding: 0;
              }
            `}
            color="primary"
            aria-label="Show Explanation"
            onClick={(eventObj) => setAnchorElEditMode(eventObj.currentTarget)}
          >
            <IconHelpOutline />
          </IconButton>
        </div>




        {/* ？アイコンを押すと表示される解説文 */}
        <Popover
          id={Boolean(anchorElEditMode) ? 'popoverEditMode' : undefined}
          open={Boolean(anchorElEditMode)}
          anchorEl={anchorElEditMode}
          onClose={() => setAnchorElEditMode(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >

          <Paper
            css={css`
              max-width: 400px;
              padding: 0 16px 8px 16px;
            `}
          >

            <div
              css={css`
                margin: 12px 0 0 0;
              `}
            >

              <p
                css={css`
                  margin: 0 0 14px 0;
                `}
              >
                左のボタンを押すと、ゲームの登録・編集フォームが利用できるようになります。
              </p>

              <p>
                Game Users のコンテンツを充実させるために、ぜひデータ追加のお手伝いをよろしくお願いします。
              </p>

            </div>

          </Paper>

        </Popover>

      </Paper>




      <div
        css={css`
          margin: 14px 0 0 0;
        `}
      >
        <Panel
          heading="ゲーム登録フォーム"
          defaultExpanded={true}
        >
          <Form />
        </Panel>
      </div>


    </Element>
  );


};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
