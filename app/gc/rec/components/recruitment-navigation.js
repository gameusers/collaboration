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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconAlarm from '@material-ui/icons/Alarm';
import IconHelpOutline from '@material-ui/icons/HelpOutline';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationKeyword } from '../../../@validations/keyword.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from '../../../common/layout/components/panel';
import FormHardwares from '../../../common/hardware/components/form.js';




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
    
    
    // --------------------------------------------------
    //   super
    // --------------------------------------------------
    
    super(props);
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    this.pathArr = [this.props.gameCommunities_id, 'recruitment', 'navigation'];
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ pathArr: this.pathArr });
    
    
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
      // temporaryDataID,
      // urlID,
      gameCommunities_id,
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   storeGcRecruitment
    // --------------------------------------------------
    
    const {
      
      dataObj,
      handleEdit,
      handleNavigationFormSearchCategory,
      handleNavigationFormSearchSubmit,
      
    } = storeGcRecruitment;
    
    
    const showHardwareExplanation = lodashGet(dataObj, [...this.pathArr, 'showHardwareExplanation'], false);
    const limitHardwares = parseInt(process.env.RECRUITMENT_SEARCH_HARDWARES_LIMIT, 10);
    
    const categoriesArr = lodashGet(dataObj, [...this.pathArr, 'categoriesArr'], []);
    const keyword = lodashGet(dataObj, [...this.pathArr, 'keyword'], '');
    
    
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    const validationKeywordObj = validationKeyword({ value: keyword });
    
    
    
    
    // --------------------------------------------------
    //   Element Name
    // --------------------------------------------------
    
    const elementName = this.pathArr.join('-');
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/gc/rec/components/recruitment-navigation.js
    // `);
    
    // console.log(chalk`
    //   gameCommunities_id  : {green ${gameCommunities_id}}
    // `);
    
    // console.log(chalk`
    //   threadListCount: {green ${threadListCount}}
    //   threadListPage: {green ${threadListPage}}
    //   threadListLimit: {green ${threadListLimit}}
    // `);
    
    // console.log(`
    //   ----- categoriesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(categoriesArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Panel
        heading="募集検索"
        pathArr={this.pathArr}
        defaultExpanded={false}
      >
        
        
        <p>条件を設定して募集を検索することができます。</p>
        
        
        
        
        {/* Form */}
        <form
          name={elementName}
          onSubmit={(eventObj) => handleNavigationFormSearchSubmit({
            eventObj,
            pathArr: this.pathArr,
            gameCommunities_id,
          })}
        >
          
          
          {/* Form Hardware */}
          <div
            css={css`
              width: 100%;
              border-top: 1px dashed #848484;
              margin: 24px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            
            <div
              css={css`
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
              `}
            >
              
              <h3
                css={css`
                  font-weight: bold;
                  margin: 2px 0 0 0;
                `}
              >
                ハードウェア
              </h3>
              
              
              {/* ？アイコン */}
              <IconButton
                css={css`
                  && {
                    margin: 0 0 0 8px;
                    padding: 0;
                  }
                `}
                color="primary"
                aria-label="Show Notification Explanation"
                onClick={() => handleEdit({
                  pathArr: [...this.pathArr, 'showHardwareExplanation'],
                  value: !showHardwareExplanation,
                })}
              >
                <IconHelpOutline />
              </IconButton>
              
            </div>
            
            
            
            
            {/* 解説 */}
            {showHardwareExplanation &&
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
                  募集に関係するハードウェアを選んでください（PC版、○○版などの情報です）
                </p>
                
                <p
                  css={css`
                    margin: 0 0 14px 0;
                  `}
                >
                  ハードウェア名（またはSFC、N64などの略称）の一部を入力すると、入力フォームの下に一覧でハードウェアの正式名称が表示されます。一覧上でハードウェアをクリック（タップ）すると入力は完了です。この欄では複数のハードウェアを入力することが可能です。
                </p>
                
                <p>
                  ゲームのハードウェア名だけでなく、「Android」「iOS」「PC」などもハードウェアとして入力できます。
                </p>
                
              </div>
            }
            
            
            
            
            {/* Form */}
            <FormHardwares
              pathArr={this.pathArr}
              limit={limitHardwares}
            />
            
            
          </div>
        
          
          
          
          {/* Form Category */}
          <div
            css={css`
              border-top: 1px dashed #848484;
              margin: 24px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            
            {/* Heading */}
            <h3
              css={css`
                font-size: 14px;
                margin: 0 0 6px 0;
              `}
            >
              カテゴリー
            </h3>
            
            
            
            
            {/* Checkbox */}
            <FormControl
              required
              component="fieldset"
            >
              
              <FormGroup row>
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={categoriesArr.indexOf(1) !== -1}
                      onChange={() => handleNavigationFormSearchCategory({
                        pathArr: this.pathArr,
                        value: 1,
                      })}
                      color="primary"
                    />
                  }
                  label="フレンド募集"
                />
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={categoriesArr.indexOf(2) !== -1}
                      onChange={() => handleNavigationFormSearchCategory({
                        pathArr: this.pathArr,
                        value: 2,
                      })}
                      color="primary"
                    />
                  }
                  label="メンバー募集"
                />
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={categoriesArr.indexOf(3) !== -1}
                      onChange={() => handleNavigationFormSearchCategory({
                        pathArr: this.pathArr,
                        value: 3,
                      })}
                      color="primary"
                    />
                  }
                  label="売買・交換相手募集"
                />
                
              </FormGroup>
              
            </FormControl>
            
          </div>
          
          
          
          
          {/* Keyword */}
          <div
            css={css`
              width: 100%;
              border-top: 1px dashed #848484;
              margin: 12px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            
            {/* Heading */}
            <h3
              css={css`
                font-size: 14px;
                margin: 0 0 6px 0;
              `}
            >
              タイトル・募集文検索
            </h3>
            
            
            {/* TextField */}
            <TextField
              css={css`
                && {
                  width: 100%;
                }
              `}
              id="keyword"
              label="キーワード"
              value={validationKeywordObj.value}
              onChange={(eventObj) => handleEdit({
                pathArr: [...this.pathArr, 'keyword'],
                value: eventObj.target.value
              })}
              error={validationKeywordObj.error}
              helperText={intl.formatMessage({ id: validationKeywordObj.messageID }, { numberOfCharacters: validationKeywordObj.numberOfCharacters })}
              margin="normal"
              inputProps={{
                maxLength: 100,
              }}
            />
            
            
          </div>
          
          
          
          
          {/* Button */}
          <div
            css={css`
              width: 100%;
              border-top: 1px dashed #848484;
              margin: 12px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={buttonDisabled}
            >
              検索する
            </Button>
            
          </div>
        
        
        </form>
        
        
      </Panel>
    );
    
    
  }
  
  
});