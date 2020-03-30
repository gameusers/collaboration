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
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


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

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconAssignment from '@material-ui/icons/Assignment';
import IconPublic from '@material-ui/icons/Public';
import IconEdit from '@material-ui/icons/Edit';
import IconDoubleArrow from '@material-ui/icons/DoubleArrow';


// ---------------------------------------------
//   Simple Icons
// ---------------------------------------------

import SimpleIcons from 'simple-icons-react-component';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Paragraph from '../../../common/layout/components/paragraph';
import FormThread from './form/thread';
// import FormComment from './form-comment';
// import Comment from './comment';
import ImageAndVideo from '../../../common/image-and-video/components/image-and-video';
import Panel from '../../../common/layout/components/panel';




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

// const cssAvatar = css`
//   && {
//     width: 32px;
//     height: 32px;
//     line-height: 1;
//     background-color: #003791;
//   }
// `;




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
    this.pathFormThreadArr = [this.props.gameCommunities_id, 'recruitmentFormThreadsObj'];
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ pathArr: this.pathArr });
    this.props.stores.layout.handleButtonEnable({ pathArr: this.pathFormThreadArr });
    
    
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
      settingAnonymity,
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
      // handleReadThreads,
      // handleShowFormThread,
      
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
    
    console.log(`
      ----------------------------------------\n
      /app/gc/rec/components/recruitment-thread.js
    `);
    
    console.log(chalk`
      temporaryDataID: {green ${temporaryDataID}}
      urlID: {green ${urlID}}
      gameCommunities_id: {green ${gameCommunities_id}}
      settingAnonymity: {green ${settingAnonymity}}
      
      page: {green ${page}}
      count: {green ${count}}
      limit: {green ${limit}}
    `);
    
    console.log(`
      ----- arr -----\n
      ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(`
      ----- dataObj -----\n
      ${util.inspect(JSON.parse(JSON.stringify(dataObj)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    
    
    // --------------------------------------------------
    //   Component - Thread
    // --------------------------------------------------
    
    const componentArr = [];
    
    
    for (const [index, recruitmentThreads_id] of arr.entries()) {
      
      
      // --------------------------------------------------
      //   data
      // --------------------------------------------------
      
      const threadsDataObj = lodashGet(dataObj, [gameCommunities_id, 'recruitmentThreadsObj', 'dataObj', recruitmentThreads_id], {});
      
      const title = lodashGet(threadsDataObj, ['title'], '');
      const name = lodashGet(threadsDataObj, ['name'], '');
      const comment = lodashGet(threadsDataObj, ['comment'], '');
      
      const imagesAndVideosObj = lodashGet(threadsDataObj, ['imagesAndVideosObj'], {});
      
      // 管理者権限がある、またはスレッドを建てた本人の場合、編集ボタンを表示する
      const editable = lodashGet(threadsDataObj, ['editable'], false);
      // const editable = true;
      
      const comments = lodashGet(threadsDataObj, ['comments'], 0);
      
      
      // --------------------------------------------------
      //   Link
      // --------------------------------------------------
      
      let linkHref = `/gc/[urlID]/rec/[recruitmentID]?urlID=${urlID}&recruitmentID=${recruitmentThreads_id}`;
      let linkAs = `/gc/${urlID}/rec/${recruitmentThreads_id}`;
      
      
      // --------------------------------------------------
      //   Show
      // --------------------------------------------------
      
      const showForm = lodashGet(dataObj, [recruitmentThreads_id, 'showForm'], false);
      
      
      // --------------------------------------------------
      //   Panel
      // --------------------------------------------------
      
      const panelExpanded = stores.layout.handleGetPanelExpanded({ pathArr: [...this.pathArr, recruitmentThreads_id] });
      
      
      
      
      // --------------------------------------------------
      //   Component - Hardware Chips
      // --------------------------------------------------
      
      const hardwaresArr = lodashGet(threadsDataObj, ['hardwaresArr'], []);
      
      const componentHardwareChipsArr = [];
      
      for (const [index2, value2Obj] of hardwaresArr.entries()) {
        
        
        if (value2Obj.hardwareID === 'TdK3Oc-yV') {
          
          componentHardwareChipsArr.push(
            <div
              key={`hardwareChips-${index2}`}
              css={css`
                margin: 8px 8px 0 0;
              `}
            >
              <Chip
                avatar={
                  <Avatar alt="PlayStation" style={{ 'backgroundColor': '#003791' }}>
                    <div style={{ 'width': '80%', 'marginTop': '4px' }}>
                      <SimpleIcons name="PlayStation" color="white" />
                    </div>
                  </Avatar>
                }
                label={value2Obj.name}
                color="primary"
                variant="outlined"
              />
            </div>
          );
          
        } else if (value2Obj.hardwareID === 'uPqoiXA_8') {
          
          componentHardwareChipsArr.push(
            <div
              key={`hardwareChips-${index2}`}
              css={css`
                margin: 8px 8px 0 0;
              `}
            >
              <Chip
                avatar={
                  <Avatar alt="Xbox" style={{ 'backgroundColor': '#107C10' }}>
                    <div style={{ 'width': '75%', 'marginTop': '4px' }}>
                      <SimpleIcons name="Xbox" color="white" />
                    </div>
                  </Avatar>
                }
                label={value2Obj.name}
                color="primary"
                variant="outlined"
              />
            </div>
          );
          
        } else if (value2Obj.hardwareID === 'Zd_Ia4Hwm') {
          
          componentHardwareChipsArr.push(
            <div
              key={`hardwareChips-${index2}`}
              css={css`
                margin: 8px 8px 0 0;
              `}
            >
              <Chip
                avatar={
                  <Avatar alt="Nintendo" style={{ 'backgroundColor': '#e60012' }}>
                    <div style={{ 'width': '55%', 'marginTop': '4px' }}>
                      <SimpleIcons name="Nintendo" color="white" />
                    </div>
                  </Avatar>
                }
                label={value2Obj.name}
                color="primary"
                variant="outlined"
              />
            </div>
          );
          
        }
        
        
      }
      
      
      
      
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
              
              
              {/* Form */}
              {showForm ? (
                
                <div
                  css={css`
                    width: 100%;
                  `}
                >
                  <FormThread
                    gameCommunities_id={gameCommunities_id}
                    recruitmentThreads_id={recruitmentThreads_id}
                  />
                </div>
                
              // Thread
              ) : (
                
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
                        onClick={() => handlePanelExpand({ pathArr: [...this.pathArr, recruitmentThreads_id] })}
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
                  
                  
                  
                  
                  {/* Images and Videos */}
                  {Object.keys(imagesAndVideosObj).length > 0 &&
                    <div
                      css={css`
                        margin: 12px 0 4px 0;
                      `}
                    >
                      <ImageAndVideo
                        pathArr={[...this.pathArr, recruitmentThreads_id, 'imagesAndVideosObj']}
                        imagesAndVideosObj={imagesAndVideosObj}
                      />
                    </div>
                  }
                  
                  
                  
                  
                  {/* Information */}
                  <div
                    css={css`
                      display: flex;
                      flex-flow: row nowrap;
                      align-items: center;
                      font-size: 12px;
                      // margin: 0;
                      // background-color: pink;
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
                      
                      
                      
                      
                      {/* Hardware Chips */}
                      {componentHardwareChipsArr}
                      
                      
                      
                      
                      {/* recruitmentThreads_id */}
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
                          // margin-left: auto;
                          // background-color: green;
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
                          // onClick={() => handleShowFormThread({
                          //   pathArr: this.pathArr,
                          //   recruitmentThreads_id
                          // })}
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
              　
              )}
              
              
            </ExpansionPanelSummary>
            
            
            
            
            {/* Contents */}
            <ExpansionPanelDetails
              css={css`
                @media screen and (max-width: 480px) {
                  padding: 0 16px 24px !important;
                }
              `}
            >
              
              <div
                css={css`
                  width: 100%;
                  margin: 4px 0 0 0;
                `}
              >
                
                
                {/* Comment */}
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
                  <Paragraph text={comment} />
                </div>
                
                
                {/* Form Comment */}
                {/*<FormComment
                  gameCommunities_id={gameCommunities_id}
                  userCommunities_id={userCommunities_id}
                  recruitmentThreads_id={recruitmentThreads_id}
                  settingAnonymity={settingAnonymity}
                />*/}
                
                
                {/* Comment */}
                {/*<Comment
                  urlID={urlID}
                  gameCommunities_id={gameCommunities_id}
                  userCommunityID={userCommunityID}
                  userCommunities_id={userCommunities_id}
                  recruitmentThreads_id={recruitmentThreads_id}
                  comments={comments}
                  settingAnonymity={settingAnonymity}
                />*/}
                
                
              </div>
              
            </ExpansionPanelDetails>
            
          </ExpansionPanel>
          
          
        </Element>
      );
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
        {/* Recruitment Post Form */}
        <div
          css={css`
            margin: 0 0 12px 0;
          `}
        >
          
          <Panel
            heading="募集投稿フォーム"
            pathArr={this.pathFormThreadArr}
            defaultExpanded={true}
          >
            
            <FormThread
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
                フォーラムトップに戻る
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
            {/*<div
              css={css`
                margin: 8px 24px 0 0;
              `}
            >
              
              <Pagination
                disabled={buttonDisabled}
                onChange={(page) => handleReadThreads({
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
              
            </div>*/}
            
            
            {/* Rows Per Page */}
            {/*<FormControl
              css={css`
                margin: 8px 0 0 0 !important;
              `}
              variant="outlined"
            >
              
              <Select
                value={limit}
                onChange={(eventObj) => handleReadThreads({
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
                    name="forum-threads-pagination"
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
              
            </FormControl>*/}
            
            
          </Paper>
          
        )}
        
        
      </React.Fragment>
    );
    
  }
  
});