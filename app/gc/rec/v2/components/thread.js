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
import { useIntl } from 'react-intl';
import { Element } from 'react-scroll';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/ja_JP';
import SimpleIcons from 'simple-icons-react-component';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


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

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconPublic from '@material-ui/icons/Public';
import IconDelete from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
import IconDoubleArrow from '@material-ui/icons/KeyboardReturn';
import IconReply from '@material-ui/icons/Reply';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateLayout } from 'app/@states/layout.js';
import { ContainerStateGc } from 'app/@states/gc.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Paragraph from 'app/common/layout/components/paragraph.js';
import ChipHardwares from 'app/common/hardware/components/chip.js';
import User from 'app/common/user/components/user.js';
import ImageAndVideo from 'app/common/image-and-video/components/image-and-video.js';
import Panel from 'app/common/layout/components/panel.js';

import ChipCategory from 'app/gc/rec/components/chip-category.js';
import RecruitmentComment from 'app/gc/rec/components/recruitment-comment.js';
import FormThread from 'app/gc/rec/components/form/thread.js';
import FormComment from 'app/gc/rec/components/form/comment.js';
import Public from 'app/gc/rec/components/public.js';
import DeadlineDate from 'app/gc/rec/components/deadline-date.js';
import Notification from 'app/gc/rec/components/notification.js';






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
    
    urlID,
    gameCommunities_id,
    individual,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const classes = useStyles();
  const [panelExpanded, setPanelExpanded] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [showHardwareExplanation, setShowHardwareExplanation] = useState(false);
  const [hardwaresArr, setHardwaresArr] = useState([]);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [keyword, setKeyword] = useState('');
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateLayout = ContainerStateLayout.useContainer();
  const stateGc = ContainerStateGc.useContainer();
  
  const {
    
    handleScrollTo,
    
  } = stateLayout;
  
  const {
    
    setGameCommunityObj,
    recruitmentThreadsObj,
    setRecruitmentThreadsObj,
    setRecruitmentCommentsObj,
    setRecruitmentRepliesObj,
    
  } = stateGc;
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * カテゴリーをチェックしたときに呼び出す
   * @param {string} value - 値
   */
  const handleCategory = ({ value }) => {
    
    
    // --------------------------------------------------
    //   Clone
    // --------------------------------------------------
    
    let clonedArr = lodashCloneDeep(categoriesArr);
    
    
    // --------------------------------------------------
    //   配列に存在しない場合は追加、存在する場合は削除
    // --------------------------------------------------
    
    if (clonedArr.indexOf(value) === -1) {
      
      clonedArr.push(value);
      
    } else {
      
      const newArr = clonedArr.filter(number => number !== value);
      clonedArr = newArr;
      
    }
    
    
    // --------------------------------------------------
    //   数字の昇順に並び替え
    // --------------------------------------------------
    
    clonedArr = clonedArr.slice().sort((a, b) => {
      return a - b;
    });
    
    
    // --------------------------------------------------
    //   更新
    // --------------------------------------------------
    
    setCategoriesArr(clonedArr);
    
    
  };
  
  
  
  
  /**
   * 募集を検索する
   * @param {string} urlID - ゲームのURLになるID　例）Dead-by-Daylight
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
   * @param {number} page - スレッドのページ
   */
  const handleSearch = ({
    
    urlID,
    gameCommunities_id,
    page,
    
  }) => {
    
    
    try {
      
      
      // ---------------------------------------------
      //   For Search
      // ---------------------------------------------
      
      const hardwareIDsArr = [];
      
      for (let valueObj of hardwaresArr.values()) {
        hardwareIDsArr.push(valueObj.hardwareID);
      }
      
      
      // ---------------------------------------------
      //   Router.push 用
      // ---------------------------------------------
      
      const urlHardwares = hardwareIDsArr.length > 0 ? `hardwares=${hardwareIDsArr.join(',')}&` : '';
      const urlCategories = categoriesArr.length > 0 ? `categories=${categoriesArr.join(',')}&` : '';
      const urlKeyword = keyword ? `keyword=${encodeURI(keyword)}&` : '';
      
      let url = `/gc/[urlID]/rec/[...slug]?urlID=${urlID}${urlHardwares}${urlCategories}${urlKeyword}page=${page}`;
      let as = `/gc/${urlID}/rec/search?${urlHardwares}${urlCategories}${urlKeyword}page=${page}`;
      
      if (!urlHardwares && !urlCategories && !urlKeyword) {
        
        if (page === 1) {
          
          url = `/gc/[urlID]/rec/index?urlID=${urlID}&page=${page}`;
          as = `/gc/${urlID}/rec`;
          
        } else {
          
          url = `/gc/[urlID]/rec/[...slug]?urlID=${urlID}&page=${page}`;
          as = `/gc/${urlID}/rec/${page}`;
          
        }
        
      }
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/stores/store.js - handleSearch
      // `);
      
      // console.log(chalk`
      //   urlID: {green ${urlID}}
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   page: {green ${page}}
      // `);
      
      // console.log(chalk`
      //   urlHardwares: {green ${urlHardwares}}
      //   urlCategories: {green ${urlCategories}}
      //   urlKeyword: {green ${urlKeyword}}
      //   url: {green ${url}}
      //   as: {green ${as}}
      // `);
      
      // console.log(`
      //   ----- hardwareIDsArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(hardwareIDsArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- categoriesArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(categoriesArr)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   keyword: {green ${keyword}}
      // `);
      
      
      
      
      // ---------------------------------------------
      //   Router.push = History API pushState()
      // ---------------------------------------------
      
      Router.push(url, as);
      
      
    } catch (errorObj) {}
    
    
  };
  
  
  
  
  // --------------------------------------------------
  //   Forum
  // --------------------------------------------------
  
  // const {
    
  //   dataObj,
  //   handleEdit,
  //   handleReadRecruitmentThreads,
  //   handleShowFormRecruitmentThread,
  //   handleDeleteRecruitment,
  //   handleShowDeleteDialog,
    
  // } = storeGcRecruitment;
  
  
  // --------------------------------------------------
  //   Thread
  // --------------------------------------------------
  
  // const page = lodashGet(dataObj, [...this.pathArr, 'page'], 1);
  // const count = lodashGet(dataObj, [...this.pathArr, 'count'], 0);
  // const arr = lodashGet(dataObj, [...this.pathArr, `page${page}Obj`, 'arr'], []);
  
  const page = lodashGet(recruitmentThreadsObj, ['page'], 1);
  const count = lodashGet(recruitmentThreadsObj, ['count'], 0);
  const arr = lodashGet(recruitmentThreadsObj, [`page${page}Obj`, 'arr'], []);
  
  const limit = parseInt((stores.data.getCookie({ key: 'recruitmentThreadLimit' }) || process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT), 10);
  
  
  // --------------------------------------------------
  //   Link Return Top
  // --------------------------------------------------
  
  const linkReturnTopHref = `/gc/[urlID]/rec/index?urlID=${urlID}`;
  const linkReturnTopAs = `/gc/${urlID}/rec`;
  
  
  // --------------------------------------------------
  //   削除するか尋ねるダイアログを表示するための変数
  // --------------------------------------------------
  
  const deleteDialogRecruitmentThreads_id = lodashGet(dataObj, [gameCommunities_id, 'deleteDialogObj', 'recruitmentThreads_id'], '');
  const deleteDialogRecruitmentComments_id = lodashGet(dataObj, [gameCommunities_id, 'deleteDialogObj', 'recruitmentComments_id'], '');
  const deleteDialogRecruitmentReplies_id = lodashGet(dataObj, [gameCommunities_id, 'deleteDialogObj', 'recruitmentReplies_id'], '');
  
  
  let deleteDialogShow = true;
  let deleteDialogTitle = '';
  let deleteDialogDescription = '';
  
  if (deleteDialogRecruitmentReplies_id) {
    
    deleteDialogTitle = '返信削除';
    deleteDialogDescription = '返信を削除しますか？';
    
  } else if (deleteDialogRecruitmentComments_id) {
    
    deleteDialogTitle = 'コメント削除';
    deleteDialogDescription = 'コメントを削除しますか？';
    
  } else if (deleteDialogRecruitmentThreads_id) {
    
    deleteDialogTitle = '募集削除';
    deleteDialogDescription = '募集を削除しますか？';
    
  } else {
    
    deleteDialogShow = false;
    
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/gc/rec/components/recruitment-thread.js
  // `);
  
  // console.log(chalk`
  //   urlID: {green ${urlID}}
  //   gameCommunities_id: {green ${gameCommunities_id}}
    
  //   page: {green ${page}}
  //   count: {green ${count}}
  //   limit: {green ${limit}}
  // `);
  
  // console.log(`
  //   ----- arr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(`
  //   ----- dataObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(dataObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Component - Thread
  // --------------------------------------------------
  
  const componentArr = [];
  
  
  for (const [index, recruitmentThreads_id] of arr.entries()) {
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    const pathRecruitmentThreadArr = [recruitmentThreads_id, 'recruitmentThreadObj'];
    const pathRecruitmentThreadEditFormArr = [recruitmentThreads_id, 'recruitmentThreadEditFormObj'];
    const pathRecruitmentCommentNewFormArr = [recruitmentThreads_id, 'recruitmentCommentNewFormObj'];
    // const pathRecruitmentCommentEditFormArr = [recruitmentThreads_id, 'recruitmentCommentEditFormObj'];
    
    
    // --------------------------------------------------
    //   data
    // --------------------------------------------------
    
    const threadsDataObj = lodashGet(dataObj, [gameCommunities_id, 'recruitmentThreadsObj', 'dataObj', recruitmentThreads_id], {});
    
    const title = lodashGet(threadsDataObj, ['title'], '');
    const comment = lodashGet(threadsDataObj, ['comment'], '');
    
    const imagesAndVideosObj = lodashGet(threadsDataObj, ['imagesAndVideosObj'], {});
    
    // 管理者権限がある、またはスレッドを建てた本人の場合、編集ボタンを表示する
    const editable = lodashGet(threadsDataObj, ['editable'], false);
    // const editable = true;
    
    const category = lodashGet(threadsDataObj, ['category'], 1);
    const hardwaresArr = lodashGet(threadsDataObj, ['hardwaresArr'], []);
    const deadlineDate = lodashGet(threadsDataObj, ['deadlineDate'], '');
    const notification = lodashGet(threadsDataObj, ['notification'], '');
    
    const comments = lodashGet(threadsDataObj, ['comments'], 0);
    
    
    // --------------------------------------------------
    //   User Data
    // --------------------------------------------------
    
    const imagesAndVideosThumbnailObj = lodashGet(threadsDataObj, ['cardPlayersObj', 'imagesAndVideosThumbnailObj'], {});
    
    const cardPlayers_id = lodashGet(threadsDataObj, ['cardPlayersObj', '_id'], '');
    
    let name = lodashGet(threadsDataObj, ['name'], '');
    const cardPlayers_name = lodashGet(threadsDataObj, ['cardPlayersObj', 'name'], '');
    
    if (cardPlayers_name) {
      name = cardPlayers_name;
    }
    
    const status = lodashGet(threadsDataObj, ['cardPlayersObj', 'status'], '');
    
    const exp = lodashGet(threadsDataObj, ['usersObj', 'exp'], 0);
    const accessDate = lodashGet(threadsDataObj, ['usersObj', 'accessDate'], '');
    const userID = lodashGet(threadsDataObj, ['usersObj', 'userID'], '');
    
    
    // --------------------------------------------------
    //   Link
    // --------------------------------------------------
    
    let linkHref = `/gc/[urlID]/rec/[...slug]?urlID=${urlID}&recruitmentID=${recruitmentThreads_id}`;
    let linkAs = `/gc/${urlID}/rec/${recruitmentThreads_id}`;
    
    
    // --------------------------------------------------
    //   ID & Information
    // --------------------------------------------------
    
    const idsArr = lodashGet(threadsDataObj, ['idsArr'], []);
    const publicIDsArr = lodashGet(threadsDataObj, ['publicIDsArr'], []);
    const publicInformationsArr = lodashGet(threadsDataObj, ['publicInformationsArr'], []);
    const publicSetting = lodashGet(threadsDataObj, ['publicSetting'], 1);
    
    
    // --------------------------------------------------
    //   Show Form
    // --------------------------------------------------
    
    const showFormThread = lodashGet(dataObj, [...pathRecruitmentThreadEditFormArr, 'showFormThread'], false);
    const showFormComment = lodashGet(dataObj, [...pathRecruitmentCommentNewFormArr, 'showFormComment'], false);
    
    
    // --------------------------------------------------
    //   Panel
    // --------------------------------------------------
    
    const panelExpanded = stores.layout.handleGetPanelExpanded({ pathArr: pathRecruitmentThreadArr });
    
    
    // --------------------------------------------------
    //   Share: Twitter
    //   参考：https://blog.ikunaga.net/entry/twitter-com-intent-tweet/
    // --------------------------------------------------
    
    const twitterHashtagsArr = lodashGet(threadsDataObj, ['gamesObj', 'twitterHashtagsArr'], []);
    
    let shareTwitterText = title;
    
    if (title.length > 50) {
      shareTwitterText = title.substr(0, 50) + '…';
    }
    
    let shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURI(shareTwitterText)}&url=${process.env.NEXT_PUBLIC_URL_BASE}gc/${urlID}/rec/${recruitmentThreads_id}`;
    
    if (twitterHashtagsArr.length > 0) {
      
      shareTwitter += `&hashtags=${twitterHashtagsArr.join(',')}`;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/gc/rec/components/recruitment-thread.js
    // `);
    
    // console.log(`
    //   ----- threadsDataObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(threadsDataObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- twitterHashtagsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(twitterHashtagsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   componentArr.push
    // --------------------------------------------------
    
    componentArr.push(
      <Element
        name={recruitmentThreads_id}
        key={index}
      >
        
        
        <ExpansionPanel
          css={css`
            margin: 0 0 16px 0 !important;
          `}
          expanded={panelExpanded}
        >
          
          
          {/* Summary */}
          <ExpansionPanelSummary
            css={css`
              && {
                cursor: default !important;
                background-color: white !important;
                
                @media screen and (max-width: 480px) {
                  padding: 0 16px;
                }
              }
            `}
            classes={{
              expanded: classes.expanded
            }}
          >
            
            
            <div
              css={css`
                display: flex;
                flex-flow: column nowrap;
                width: 100%;
              `}
            >
              
              
              {/* Container - Thread Name & Expansion Button */}
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                  align-items: center;
                  width: 100%;
                `}
              >
                
                
                {/* h2 */}
                <h2
                  css={css`
                    font-weight: bold;
                    font-size: 16px;
                    
                    @media screen and (max-width: 480px) {
                      font-size: 14px;
                    }
                  `}
                >
                  {title}
                </h2>
                
                
                
                
                {/* Expansion Button */}
                <div
                  css={css`
                    margin-left: auto;
                  `}
                >
                  
                  <IconButton
                    css={css`
                      && {
                        margin: 0;
                        padding: 4px;
                      }
                    `}
                    onClick={() => handlePanelExpand({ pathArr: pathRecruitmentThreadArr })}
                    aria-expanded={panelExpanded}
                    aria-label="Show more"
                    disabled={buttonDisabled}
                  >
                    {panelExpanded ? (
                      <IconExpandLess />
                    ) : (
                      <IconExpandMore />
                    )}
                  </IconButton>
                  
                </div>
                
                
              </div>
              
              
              
              
              {/* Information */}
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                  align-items: center;
                  font-size: 12px;
                `}
              >
                
                
                {/* Hardwares & recruitmentThreads_id */}
                <div
                  css={css`
                    display: flex;
                    flex-flow: row wrap;
                    align-items: center;
                    margin: 0;
                  `}
                >
                  
                  
                  {/* ハードウェア  */}
                  <ChipHardwares
                    hardwaresArr={hardwaresArr}
                  />
                  
                  
                  {/* カテゴリー */}
                  <ChipCategory
                    category={category}
                  />
                  
                  
                  {/* スレッドの固有ID: recruitmentThreads_id */}
                  <div
                    css={css`
                      display: flex;
                      flex-flow: row nowrap;
                      margin: 8px 0 0 0;
                    `}
                  >
                    
                    <IconPublic
                      css={css`
                        && {
                          font-size: 24px;
                          margin: 0 2px 0 0;
                        }
                      `}
                    />
                    
                    <div
                      css={css`
                        font-size: 12px;
                        color: #009933;
                        cursor: pointer;
                        margin: 2px 0 0 0;
                      `}
                    >
                      <Link href={linkHref} as={linkAs}>
                        <a>{recruitmentThreads_id}</a>
                      </Link>
                    </div>
                    
                  </div>
                  
                  
                </div>
                
                
              </div>
              
              
            </div>
            
            
          </ExpansionPanelSummary>
          
          
          
          
          {/* Contents */}
          <ExpansionPanelDetails
            css={css`
              && {
                display: flex;
                flex-flow: column wrap;
                
                @media screen and (max-width: 480px) {
                  padding: 0 16px 16px !important;
                }
              }
            `}
          >
              
              
              {/* Thread - Edit Form */}
              {showFormThread &&
                <div
                  css={css`
                    width: 100%;
                    
                    border-top: 1px solid;
                    border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
                    border-image-slice: 1;
                    
                    margin: 12px 0 0 0;
                  `}
                >
                
                  <div
                    css={css`
                      border-left: 4px solid #A4A4A4;
                      margin: 16px 0 0 0;
                      padding: 8px 0 8px 16px;
                      
                      @media screen and (max-width: 480px) {
                        // background-color: #F8F8FF;
                        border-left: none;
                        margin: 0;
                        padding: 32px 0 0 0;
                      }
                    `}
                  >
                    
                    <FormThread
                      pathArr={pathRecruitmentThreadEditFormArr}
                      gameCommunities_id={gameCommunities_id}
                      recruitmentThreads_id={recruitmentThreads_id}
                    />
                    
                  </div>
                  
                </div>
              }
              
              
              
              
              {/* Thread */}
              {!showFormThread &&
                <div
                  css={css`
                    width: 100%;
                    
                    border-top: 1px solid;
                    border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
                    border-image-slice: 1;
                    
                    margin: 12px 0 0 0;
                    padding: 20px 0 0 0;
                  `}
                >
                  
                  
                  {/* ユーザー情報 - サムネイル画像・ハンドルネームなど */}
                  <User
                    imagesAndVideosThumbnailObj={imagesAndVideosThumbnailObj}
                    name={name}
                    userID={userID}
                    status={status}
                    accessDate={accessDate}
                    exp={exp}
                    cardPlayers_id={cardPlayers_id}
                  />
                  
                  
                  
                  
                  {/* Images and Videos */}
                  {Object.keys(imagesAndVideosObj).length > 0 &&
                    <div
                      css={css`
                        margin: 12px 0 0 0;
                      `}
                    >
                      
                      <ImageAndVideo
                        pathArr={[recruitmentThreads_id, 'imagesAndVideosObj']}
                        imagesAndVideosObj={imagesAndVideosObj}
                      />
                      
                    </div>
                  }
                  
                  
                  
                  
                  {/* スレッド */}
                  <div
                    css={css`
                      font-size: 14px;
                      line-height: 1.6em;
                      
                      border-left: 4px solid #A4A4A4;
                      margin: 12px 0 24px 0;
                      padding: 8px 0 8px 16px;
                      
                      @media screen and (max-width: 480px) {
                        padding: 8px 0 8px 12px;
                      }
                    `}
                  >
                    
                    
                    {/* コメント */}
                    <Paragraph text={comment} />
                    
                    
                    
                    
                    {/* ID & 情報 & 公開設定 */}
                    <Public
                      idsArr={idsArr}
                      publicIDsArr={publicIDsArr}
                      publicInformationsArr={publicInformationsArr}
                      publicSetting={publicSetting}
                    />
                    
                    
                    
                    
                    {/* 募集期間 ＆ 通知方法 */}
                    {(deadlineDate || notification) &&
                      <div
                        css={css`
                          margin: 20px 0 0 0;
                        `}
                      >
                        
                        <DeadlineDate
                          deadlineDate={deadlineDate}
                        />
                        
                        <Notification
                          pathArr={pathRecruitmentThreadArr}
                          notification={notification}
                        />
                        
                      </div>
                    }
                    
                    
                    
                    
                    {/* Bottom Container */}
                    <div
                      css={css`
                        display: flex;
                        flex-flow: row wrap;
                        margin: 12px 0 0 0;
                      `}
                    >
                      
                      
                      {/* Buttons */}
                      <div
                        css={css`
                          display: flex;
                          flex-flow: row nowrap;
                          margin-left: auto;
                        `}
                      >
                        
                        
                        <Button
                          css={css`
                            && {
                              font-size: 12px;
                              height: 22px;
                              min-width: 54px;
                              min-height: 22px;
                              line-height: 1;
                              padding: 0 3px;
                              
                              @media screen and (max-width: 480px) {
                                min-width: 36px;
                                min-height: 22px;
                              }
                            }
                          `}
                          variant="outlined"
                          href={shareTwitter}
                          target="_blank"
                          disabled={buttonDisabled}
                        >
                          <Avatar
                            css={css`
                              && {
                                width: 16px;
                                height: 16px;
                                line-height: 1;
                                background-color: #1DA1F2;
                                margin: 0 4px 0 0;
                              }
                            `}
                            alt="PlayStation"
                            style={{ 'backgroundColor': '#1DA1F2' }}
                          >
                            <div style={{ 'width': '80%', 'marginTop': '0px' }}>
                              <SimpleIcons name="Twitter" color="white" />
                            </div>
                          </Avatar>
                          シェア
                        </Button>
                        
                        
                        
                        
                        {/* Delete Button */}
                        {editable &&
                          <Button
                            css={css`
                              && {
                                font-size: 12px;
                                height: 22px;
                                min-width: 54px;
                                min-height: 22px;
                                margin: 0 0 0 12px;
                                padding: 0 4px;
                                
                                @media screen and (max-width: 480px) {
                                  min-width: 36px;
                                  min-height: 22px;
                                }
                              }
                            `}
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleShowDeleteDialog({
                              pathArr: this.pathArr,
                              gameCommunities_id,
                              recruitmentThreads_id,
                            })}
                            disabled={buttonDisabled}
                          >
                            <IconDelete
                              css={css`
                                && {
                                  font-size: 16px;
                                  margin: 0 2px 1px 0;
                                }
                              `}
                            />
                            削除
                          </Button>
                        }
                        
                        
                        
                        
                        {/* Edit Button */}
                        {editable &&
                          <Button
                            css={css`
                              && {
                                font-size: 12px;
                                height: 22px;
                                min-width: 54px;
                                min-height: 22px;
                                margin: 0 0 0 12px;
                                padding: 0 4px;
                                
                                @media screen and (max-width: 480px) {
                                  min-width: 36px;
                                  min-height: 22px;
                                }
                              }
                            `}
                            variant="outlined"
                            color="primary"
                            onClick={() => handleShowFormRecruitmentThread({
                              pathArr: pathRecruitmentThreadEditFormArr,
                              recruitmentThreads_id,
                            })}
                            disabled={buttonDisabled}
                          >
                            <IconEdit
                              css={css`
                                && {
                                  font-size: 16px;
                                  margin: 0 2px 3px 0;
                                }
                              `}
                            />
                            編集
                          </Button>
                        }
                        
                        
                      </div>
                      
                      
                    </div>
                    
                    
                  </div>
                  
                  
                  
                  
                  {/* Form Comment */}
                  <div
                    css={css`
                      
                      ${showFormComment
                        ?
                          `
                          border-top: 2px dashed red;
                          ${comments > 0 && 'border-bottom: 2px dashed red;'}
                          `
                        :
                          `
                          border-top: 1px dashed #585858;
                          ${comments > 0 && 'border-bottom: 1px dashed #585858;'}
                          `
                      }
                      
                      @media screen and (max-width: 480px) {
                        border-left: none;
                      }
                    `}
                  >
                    
                    
                    {/* Button - Show New Form Comment */}
                    {!showFormComment &&
                      <div
                        css={css`
                          display: flex;
                          flex-flow: row nowrap;
                          justify-content: center;
                          
                          ${comments > 0
                            ?
                              `
                              margin: 14px 0;
                              `
                            :
                              `
                              margin: 14px 0 0 0;
                              `
                          }
                        `}
                      >
                        <Button
                          type="submit"
                          variant="outlined"
                          size="small"
                          disabled={buttonDisabled}
                          startIcon={<IconReply />}
                          onClick={() => handleEdit({
                            pathArr: [...pathRecruitmentCommentNewFormArr, 'showFormComment'],
                            value: !showFormComment,
                          })}
                        >
                          コメント投稿フォーム
                        </Button>
                      </div>
                    }
                    
                    
                    
                    
                    {/* New Form Comment */}
                    {showFormComment &&
                      <div
                        css={css`
                          // border-top: 2px dashed red;
                          // border-bottom: 2px dashed red;
                          border-left: 4px solid #84cacb;
                          
                          ${comments > 0
                            ? `
                              margin: 24px 0;
                              `
                            : `
                              margin: 24px 0 6px 0;
                              `
                          }
                          
                          padding: 0 0 0 16px;
                          
                          @media screen and (max-width: 480px) {
                            border-left: none;
                            
                            padding-left: 0;
                          }
                        `}
                      >
                        
                        <FormComment
                          pathArr={pathRecruitmentCommentNewFormArr}
                          gameCommunities_id={gameCommunities_id}
                          recruitmentThreads_id={recruitmentThreads_id}
                          publicSettingThread={publicSetting}
                        />
                        
                      </div>
                    }
                    
                    
                  </div>
              
                  
                  
                  
                  {/* Comment */}
                  <RecruitmentComment
                    urlID={urlID}
                    gameCommunities_id={gameCommunities_id}
                    recruitmentThreads_id={recruitmentThreads_id}
                  />
                  
                  
                </div>
              }
              
              
            </ExpansionPanelDetails>
          
          
        </ExpansionPanel>
        
        
      </Element>
    );
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Element
      name="recruitmentThreads"
    >
      
      
      {/* New Form Recruitment Thread */}
      <div
        css={css`
          margin: 0 0 16px 0;
        `}
      >
        
        <Panel
          heading="募集投稿フォーム"
          pathArr={this.pathRecruitmentThreadsNewFormArr}
          defaultExpanded={false}
        >
          
          <FormThread
            pathArr={this.pathRecruitmentThreadsNewFormArr}
            gameCommunities_id={gameCommunities_id}
          />
          
        </Panel>
        
      </div>
      
      
      
      
      {/* Recruitment */}
      {componentArr}
      
      
      
      
      {/* Pagination */}
      {individual ? (
        
        
        <div
          css={css`
            margin: 16px 0 0 0;
          `}
        >
          
          <Paper
            css={css`
              display: flex;
              flex-flow: row wrap;
              padding: 12px 0 12px 12px;
            `}
          >
            
            <Link href={linkReturnTopHref} as={linkReturnTopAs}>
              <Button
                type="submit"
                variant="outlined"
                size="small"
                disabled={buttonDisabled}
                startIcon={<IconDoubleArrow />}
              >
                募集トップに戻る
              </Button>
            </Link>
            
          </Paper>
          
        </div>
        
        
      ) : (
        
        
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
              onChange={(page) => handleReadRecruitmentThreads({
                pathArr: this.pathArr,
                urlID,
                gameCommunities_id,
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
              onChange={(eventObj) => handleReadRecruitmentThreads({
                pathArr: this.pathArr,
                urlID,
                gameCommunities_id,
                page: 1,
                changeLimit: eventObj.target.value,
              })}
              input={
                <OutlinedInput
                  classes={{
                    input: classes.input
                  }}
                  name="recruitment-threads-pagination"
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
        
        
      )}
      
      
      
      
      {/* スレッド・コメント・返信を削除するか尋ねるダイアログ */}
      <Dialog
        open={deleteDialogShow}
        onClose={() => handleEdit({
          pathArr: [gameCommunities_id, 'showDeleteDialog'],
          value: false,
        })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogTitle id="alert-dialog-title">{deleteDialogTitle}</DialogTitle>
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {deleteDialogDescription}
          </DialogContentText>
        </DialogContent>
        
        <DialogActions>
          <div
            css={css`
              margin: 0 auto 0 0;
            `}
          >
            <Button
              onClick={() => handleDeleteRecruitment({
                gameCommunities_id,
              })}
              color="primary"
              autoFocus
            >
              はい
            </Button>
          </div>
          
          <Button
            onClick={() => handleEdit({
              pathArr: [gameCommunities_id, 'deleteDialogObj'],
              value: {},
            })}
            color="primary"
          >
            いいえ
          </Button>
        </DialogActions>
        
      </Dialog>
      
      
    </Element>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;