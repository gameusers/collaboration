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
import { Element } from 'react-scroll';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/ja_JP';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { withStyles } from '@material-ui/core/styles';

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


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconPublic from '@material-ui/icons/Public';
import IconEdit from '@material-ui/icons/Edit';
import IconDoubleArrow from '@material-ui/icons/DoubleArrow';
import IconCreate from '@material-ui/icons/Create';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Paragraph from '../../../common/layout/components/paragraph';
import ChipCategory from './chip-category';
import ChipHardwares from '../../../common/hardware/components/chip';
import User from '../../../common/user/components/user';
import ImageAndVideo from '../../../common/image-and-video/components/image-and-video';
import Panel from '../../../common/layout/components/panel';

import RecruitmentComment from './recruitment-comment';
import FormThread from './form/thread';
import FormComment from './form/comment';
import PublicIDs from './public-ids';
import PublicInformations from './public-informations';
import PublicSetting from './public-setting';
import DeadlineDate from './deadline-date';
import Notification from './notification';




// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const stylesObj = {
  
  expanded: {
    marginBottom: '0 !important',
  },
  
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
@inject('stores', 'storeGcRecruitment')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    
    // --------------------------------------------------
    //   super
    // --------------------------------------------------
    
    super(props);
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    this.pathArr = [this.props.gameCommunities_id, 'recruitmentThreadsObj'];
    this.pathRecruitmentThreadsNewFormArr = [this.props.gameCommunities_id, 'recruitmentThreadsNewFormObj'];
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ pathArr: this.pathArr });
    // this.props.stores.layout.handleButtonEnable({ pathArr: this.pathRecruitmentThreadsNewFormArr });
    
    
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
      storeGcRecruitment,
      intl,
      temporaryDataID,
      urlID,
      gameCommunities_id,
      individual,
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Panel Expand Function
    // --------------------------------------------------
    
    const handlePanelExpand = lodashGet(stores, ['layout', 'handlePanelExpand'], () => {});
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   Forum
    // --------------------------------------------------
    
    const {
      
      dataObj,
      handleEdit,
      handleReadRecruitmentThreads,
      handleShowFormThread,
      
    } = storeGcRecruitment;
    
    
    // --------------------------------------------------
    //   Thread
    // --------------------------------------------------
    
    const page = lodashGet(dataObj, [gameCommunities_id, 'recruitmentThreadsObj', 'page'], 1);
    const count = lodashGet(dataObj, [gameCommunities_id, 'recruitmentThreadsObj', 'count'], 0);
    const limit = parseInt((stores.data.getCookie({ key: 'recruitmentThreadsObj' }) || process.env.RECRUITMENT_THREAD_LIMIT), 10);
    const arr = lodashGet(dataObj, [gameCommunities_id, 'recruitmentThreadsObj', `page${page}Obj`, 'arr'], []);
    
    
    // --------------------------------------------------
    //   Link Return Top
    // --------------------------------------------------
    
    const linkReturnTopHref = `/gc/[urlID]/index?urlID=${urlID}`;
    const linkReturnTopAs = `/gc/${urlID}`;
    
    
    
    
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
      
      let linkHref = `/gc/[urlID]/rec/[recruitmentID]?urlID=${urlID}&recruitmentID=${recruitmentThreads_id}`;
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
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/gc/rec/components/recruitment-thread.js
      // `);
      
      // console.log(`
      //   ----- pathRecruitmentThreadArr -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(pathRecruitmentThreadArr)), { colors: true, depth: null })}\n
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
                  
                  
                  
                  
                  {/* Edit Button */}
                  {editable &&
                    <div
                      css={css`
                        display: flex;
                        flex-flow: row nowrap;
                        margin: 8px 0 0 auto;
                      `}
                    >
                      <Button
                        css={css`
                          && {
                            font-size: 12px;
                            height: 22px;
                            min-width: 54px;
                            min-height: 22px;
                            margin: 0 0 0 0;
                            padding: 0 4px;
                            
                            @media screen and (max-width: 480px) {
                              min-width: 36px;
                              min-height: 22px;
                            }
                          }
                        `}
                        variant="outlined"
                        color="primary"
                        disabled={buttonDisabled}
                        onClick={() => handleShowFormThread({
                          pathArr: pathRecruitmentThreadEditFormArr,
                          recruitmentThreads_id,
                        })}
                      >
                        <IconEdit
                          css={css`
                            && {
                              font-size: 16px;
                              margin: 0 2px 3px 0;
                              
                              @media screen and (max-width: 480px) {
                                display: none;
                              }
                            }
                          `}
                        />
                        編集
                      </Button>
                    </div>
                  }
                  
                  
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
                    padding: 0 16px 24px !important;
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
                      padding: 32px 0 0 0;
                    `}
                  >
                    <FormThread
                      pathArr={pathRecruitmentThreadEditFormArr}
                      gameCommunities_id={gameCommunities_id}
                      recruitmentThreads_id={recruitmentThreads_id}
                    />
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
                        margin: 12px 0 10px 3px;
                        padding: 0 0 0 16px;
                        
                        @media screen and (max-width: 480px) {
                          padding: 0 0 0 12px;
                        }
                      `}
                    >
                      
                      
                      {/* コメント */}
                      <Paragraph text={comment} />
                      
                      
                      {/* ID */}
                      <PublicIDs
                        idsArr={idsArr}
                        publicIDsArr={publicIDsArr}
                      />
                      
                      
                      {/* 情報 */}
                      <PublicInformations
                        publicInformationsArr={publicInformationsArr}
                      />
                      
                      
                      {/* 公開設定 */}
                      <PublicSetting
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
                      
                      
                    </div>
                    
                    
                    
                    
                    {/* Form Comment */}
                    <div
                      css={css`
                        width: 100%;
                        
                        border-top: 1px solid;
                        border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
                        border-image-slice: 1;
                        
                        margin: 14px 0 0 0;
                        padding: 14px 0 0 0;
                        
                        // margin: 14px 0 0 0;
                        // padding: 6px 0 0 0;
                      `}
                    >
                      
                      
                      {/* Button - Show Form Comment */}
                      {!showFormComment &&
                        <div
                          css={css`
                            display: flex;
                            flex-flow: row nowrap;
                            justify-content: center;
                          `}
                        >
                          <Button
                            type="submit"
                            variant="outlined"
                            size="small"
                            disabled={buttonDisabled}
                            startIcon={<IconCreate />}
                            onClick={() => handleEdit({
                              pathArr: [...pathRecruitmentCommentNewFormArr, 'showFormComment'],
                              value: !showFormComment,
                            })}
                          >
                            コメント投稿フォーム
                          </Button>
                        </div>
                      }
                      
                      
                      
                      
                      {/* Form Comment */}
                      {showFormComment &&
                        <div
                          css={css`
                            margin: 8px 0 0 0;
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
                      // comments={comments}
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
              margin: 24px 0 8px 0;
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
                >
                  <IconDoubleArrow />
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
                  temporaryDataID,
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
                  temporaryDataID,
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
        
        
      </Element>
    );
    
  }
  
});