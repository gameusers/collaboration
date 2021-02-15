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

/** @jsx jsx */
import { css, jsx } from '@emotion/react';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashHas from 'lodash/has';
import lodashCloneDeep from 'lodash/cloneDeep';
import lodashMerge from 'lodash/merge';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconHelpOutline from '@material-ui/icons/HelpOutline';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateLayout } from 'app/@states/layout.js';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationKeyword } from 'app/@validations/keyword.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from 'app/common/layout/v2/panel.js';






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

    pageType,
    listType,
    userID,

  } = props;




  // --------------------------------------------------
  //   States
  // --------------------------------------------------

  // const stateLayout = ContainerStateLayout.useContainer();

  // const {

  //   handleScrollTo,

  // } = stateLayout;




  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------

  const intl = useIntl();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // const [searchHardwaresArr, setSearchHardwaresArr] = useState(hardwaresArr);
  // const [searchKeyword, setSearchKeyword] = useState(keyword);
  // const [anchorEl, setAnchorEl] = useState(null);


  useEffect(() => {

    setButtonDisabled(false);

  }, []);




  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------

  /**
   * ページタイプを変更する / ページを移動する
   * @param {string} newListType - [gc / uc / ur]
   */
  const handleChangePageType = async ({

    newPageType,

  }) => {


    // ---------------------------------------------
    //   URL
    // ---------------------------------------------

    let url = `/ur/${userID}/follow/${newPageType}`;

    if (newPageType === 'all') {
      url = `/ur/${userID}/follow`;
    }


    // ---------------------------------------------
    //   Router.push = History API pushState()
    // ---------------------------------------------

    Router.push(url);


  };

  


  /**
   * リストタイプを変更する / ページを移動する
   * @param {string} newListType - [gc / uc / ur]
   */
  const handleChangeListType = async ({

    newListType,

  }) => {


    // ---------------------------------------------
    //   Router.push = History API pushState()
    // ---------------------------------------------

    Router.push(`/ur/${userID}/follow/list/${newListType}`);


  };




  // --------------------------------------------------
  //   Property
  // --------------------------------------------------

  const followContentsPeriod = props.followContentsPeriod || parseInt(process.env.NEXT_PUBLIC_FOLLOW_CONTENTS_PERIOD, 10);;
  



  // --------------------------------------------------
  //   Button href
  // --------------------------------------------------

  let hrefContents = `/ur/${userID}/follow`;
  let hrefList = `/ur/${userID}/follow/list/gc`;




  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------

  // console.log(`
  //   ----------------------------------------\n
  //   app/common/follow/v2/navigation.js
  // `);

  // console.log(chalk`
  // followContentsPeriod: {green ${followContentsPeriod} typeof ${typeof followContentsPeriod}}
  // `);

  // console.log(`
  //   ----- searchHardwaresArr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(searchHardwaresArr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);




  // --------------------------------------------------
  //   Return
  // --------------------------------------------------

  return (
    <Panel
      heading="フォロー"
      defaultExpanded={true}
      mobileMargin={true}
    >


      <ButtonGroup
        size="small"
        color="primary"
        aria-label="outlined primary button group"
        disabled={buttonDisabled}
      >


        {/* ゲームC */}
        <Button>
          <Link href={hrefContents}>
            <a className="link">
              <span
                css={css`
                  ${pageType === 'contents' && 'font-weight: bold'};
                `}
              >
                コンテンツ
              </span>
            </a>
          </Link>
        </Button>




        {/* 一覧 */}
        <Button>
          <Link href={hrefList}>
            <a className="link">
              <span
                css={css`
                  ${pageType === 'list' && 'font-weight: bold'};
                `}
              >
                一覧
              </span>
            </a>
          </Link>
        </Button>
          
        
      </ButtonGroup>




      {/* タイプ */}
      {pageType === 'contents'
      
      ?

        <React.Fragment>

          <div
            css={css`
              margin: 16px 0 0 0;
            `}
          >

            <FormControl>

              <Select
                value={listType}
                onChange={(eventObj) => handleChangePageType({ newPageType: eventObj.target.value })}
                inputProps={{
                  name: 'listType',
                  id: 'listType',
                }}
              >
                <MenuItem value="all">すべて</MenuItem>
                <MenuItem value="gc">ゲームコミュニティ</MenuItem>
                <MenuItem value="uc">ユーザーコミュニティ</MenuItem>
                <MenuItem value="ur">ユーザー</MenuItem>
              </Select>

              <FormHelperText>表示するコンテンツ</FormHelperText>

            </FormControl>

          </div>



          <div
            css={css`
              margin: 12px 0 0 0;
            `}
          >

            <FormControl>

              <Select
                value={followContentsPeriod}
                // onChange={(eventObj) => handleChangeListType({ newListType: eventObj.target.value })}
                inputProps={{
                  name: 'followContentsPeriod',
                  id: 'followContentsPeriod',
                }}
              >
                <MenuItem value="360">6時間</MenuItem>
                <MenuItem value="720">12時間</MenuItem>
                <MenuItem value="1440">1日</MenuItem>
                <MenuItem value="4320">3日</MenuItem>
                <MenuItem value="7200">5日</MenuItem>
                <MenuItem value="14400">10日</MenuItem>
                <MenuItem value="21600">15日</MenuItem>
                <MenuItem value="43200">30日</MenuItem>
              </Select>

              <FormHelperText>コンテンツの取得期間</FormHelperText>

            </FormControl>

          </div>

        </React.Fragment>

      :

        <div
          css={css`
            margin: 16px 0 0 0;
          `}
        >

          <FormControl>

            <Select
              value={listType}
              onChange={(eventObj) => handleChangeListType({ newListType: eventObj.target.value })}
              inputProps={{
                name: 'listType',
                id: 'listType',
              }}
            >
              <MenuItem value="gc">ゲームコミュニティ</MenuItem>
              <MenuItem value="uc">ユーザーコミュニティ</MenuItem>
              <MenuItem value="ur">ユーザー</MenuItem>
            </Select>

          </FormControl>

        </div>

      }


    </Panel>
  );


};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
