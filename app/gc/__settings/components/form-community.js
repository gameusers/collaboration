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
import TextareaAutosize from 'react-autosize-textarea';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationUserCommunitiesName } from '../../../../app/@database/user-communities/validations/name';
import { validationUserCommunitiesUserCommunityID } from '../../../../app/@database/user-communities/validations/user-community-id';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from '../../../../app/common/layout/components/panel';
import ImageAndVideoForm from '../../../../app/common/image-and-video/components/form';
// import ImageAndVideoFormImage from '../../../../app/common/image-and-video/components/form-image';
import GameForm from '../../../../app/common/game/components/form';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeUcSettings')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    this.pathArr = props.pathArr;
    
    
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
    
    const { stores, storeUcSettings, intl } = this.props;
    
    const {
      
      dataObj,
      handleEdit,
      handleSubmitSettings,
      
    } = storeUcSettings;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   Name
    // --------------------------------------------------
    
    const name = lodashGet(dataObj, [...this.pathArr, 'name'], '');
    const validationUserCommunitiesNameObj = validationUserCommunitiesName({ value: name });
    
    
    // --------------------------------------------------
    //   Description
    // --------------------------------------------------
    
    const description = lodashGet(dataObj, [...this.pathArr, 'description'], '');
    
    
    // --------------------------------------------------
    //   Description Short
    // --------------------------------------------------
    
    const descriptionShort = lodashGet(dataObj, [...this.pathArr, 'descriptionShort'], '');
    
    
    // --------------------------------------------------
    //   userCommunityID
    // --------------------------------------------------
    
    const userCommunityID = lodashGet(dataObj, [...this.pathArr, 'userCommunityID'], '');
    const validationUserCommunitiesUserCommunityIDObj = validationUserCommunitiesUserCommunityID({ value: userCommunityID });
    
    
    // --------------------------------------------------
    //   communityType - open / closed
    // --------------------------------------------------
    
    const communityType = lodashGet(dataObj, [...this.pathArr, 'communityType'], 'open');
    
    
    // --------------------------------------------------
    //   Approval
    // --------------------------------------------------
    
    const approval = lodashGet(dataObj, [...this.pathArr, 'approval'], false);
    
    
    // --------------------------------------------------
    //   Anonymity
    // --------------------------------------------------
    
    const anonymity = lodashGet(dataObj, [...this.pathArr, 'anonymity'], true);
    
    
    // --------------------------------------------------
    //   additionalGameLimit
    // --------------------------------------------------
    
    const additionalGameLimit = parseInt(process.env.COMMUNITY_ADDITIONAL_GAME_LIMIT, 10);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   topPageName: {green ${topPageName}}
    // `);
    
    // console.log(`
    //   /app/uc/settings/components/form-community.js\n
    //   ----- this.pathArr -----\n
    //   ${util.inspect(this.pathArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Panel
        heading="ユーザーコミュニティ設定"
        pathArr={this.pathArr}
      >
        
        <p>
          ユーザーコミュニティの設定を行います。
        </p>
        
        
        
        
        <form>
          
          
          {/* 基本情報 */}
          <div
            css={css`
              border-top: 1px dashed #848484;
              margin: 36px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 6px 0;
              `}
            >
              基本情報
            </h3>
            
            
            <div>
              <TextField
                css={css`
                  width: 100%;
                `}
                id="name"
                label="コミュニティの名前"
                value={validationUserCommunitiesNameObj.value}
                onChange={(eventObj) => handleEdit({
                  pathArr: [...this.pathArr, 'name'],
                  value: eventObj.target.value
                })}
                error={validationUserCommunitiesNameObj.error}
                helperText={intl.formatMessage({ id: validationUserCommunitiesNameObj.messageID }, { numberOfCharacters: validationUserCommunitiesNameObj.numberOfCharacters })}
                disabled={buttonDisabled}
                margin="normal"
                inputProps={{
                  maxLength: 50,
                }}
              />
            </div>
            
          </div>
          
          
          
          
          {/* Description */}
          <div
            css={css`
              margin: 24px 0 0 0;
            `}
          >
            
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 6px 0;
              `}
            >
              コミュニティの説明文 (3000文字以内)
            </h3>
            
            
            <TextareaAutosize
              css={css`
                && {
                  width: 100%;
                  border-radius: 4px;
                  box-sizing: border-box;
                  padding: 8px 12px;
                  line-height: 1.8;
                  
                  &:focus {
                    outline: 1px #A9F5F2 solid;
                  }
                  
                  resize: none;
                }
              `}
              rows={5}
              placeholder="コミュニティについての説明文を入力してください。"
              value={description}
              onChange={(eventObj) => handleEdit({
                pathArr: [...this.pathArr, 'description'],
                value: eventObj.target.value
              })}
              maxLength={3000}
              disabled={buttonDisabled}
            />
            
          </div>
          
          
          
          
          {/* Description Short */}
          <div
            css={css`
              margin: 24px 0 0 0;
            `}
          >
            
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 6px 0;
              `}
            >
              短いコミュニティの説明文 (100文字以内)
            </h3>
            
            
            <TextareaAutosize
              css={css`
                && {
                  width: 100%;
                  border-radius: 4px;
                  box-sizing: border-box;
                  padding: 8px 12px;
                  line-height: 1.8;
                  
                  &:focus {
                    outline: 1px #A9F5F2 solid;
                  }
                  
                  resize: none;
                }
              `}
              rows={2}
              placeholder="コミュニティを一覧表示する際に表示される短い説明文を入力してください。"
              value={descriptionShort}
              onChange={(eventObj) => handleEdit({
                pathArr: [...this.pathArr, 'descriptionShort'],
                value: eventObj.target.value
              })}
              maxLength={100}
              disabled={buttonDisabled}
            />
            
          </div>
          
          
          
          
          {/* Image Top */}
          <div
            css={css`
              border-top: 1px dashed #848484;
              margin: 24px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 6px 0;
              `}
            >
              トップ画像
            </h3>
            
            <p
            >
              コミュニティのトップに表示される大きな画像です。横長の画像（推奨サイズ 1920 x ---）をアップロードしてください。
            </p>
            
            <ImageAndVideoForm
              pathArr={this.pathArr}
              type="ucTop"
              showVideoButton={false}
              showImageCaption={false}
              limit={1}
            />
            
          </div>
          
          
          
          
          {/* Image Thumbnail */}
          <div
            css={css`
              border-top: 1px dashed #848484;
              margin: 24px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 6px 0;
              `}
            >
              サムネイル画像
            </h3>
            
            <p
            >
              コミュニティを一覧表示する際に表示される小さな画像です。正方形の画像（推奨サイズ 256 x 256 ピクセル以上）をアップロードしてください。
            </p>
            
            <ImageAndVideoForm
              pathArr={[...this.pathArr, 'thumbnailObj']}
              type="ucThumbnail"
              showVideoButton={false}
              showImageCaption={false}
              limit={1}
            />
            
          </div>
          
          
          
          
          {/* URL */}
          <div
            css={css`
              border-top: 1px dashed #848484;
              margin: 24px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 6px 0;
              `}
            >
              URL
            </h3>
            
            <p
            >
              コミュニティのURLを入力してください。次の形式のURLになります。https://gameusers.org/uc/<span css={css`color: red;`}>***</span>　赤文字部分の文字列を入力してください。
            </p>
            
            <p
              css={css`
                margin: 0 0 8px 0;
              `}
            >
              利用できる文字は半角英数字とハイフン( - )アンダースコア( _ )です。3文字以上、32文字以内。
            </p>
            
            
            <div>
              <TextField
                css={css`
                  width: 400px;
                  
                  @media screen and (max-width: 480px) {
                    width: 100%;
                  }
                `}
                id="userCommunityID"
                label="URL"
                value={validationUserCommunitiesUserCommunityIDObj.value}
                onChange={(eventObj) => handleEdit({
                  pathArr: [...this.pathArr, 'userCommunityID'],
                  value: eventObj.target.value
                })}
                error={validationUserCommunitiesUserCommunityIDObj.error}
                helperText={intl.formatMessage({ id: validationUserCommunitiesUserCommunityIDObj.messageID }, { numberOfCharacters: validationUserCommunitiesUserCommunityIDObj.numberOfCharacters })}
                disabled={buttonDisabled}
                margin="normal"
                inputProps={{
                  maxLength: 32,
                }}
              />
            </div>
            
          </div>
          
          
          
          
          {/* 関連ゲーム */}
          <div
            css={css`
              border-top: 1px dashed #848484;
              margin: 24px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 6px 0;
              `}
            >
              関連ゲーム
            </h3>
            
            <p
            >
              このコミュニティに関連するゲームを選択してください。ユーザーコミュニティを検索した際に、そのゲームに関連するコミュニティとして表示されます。
            </p>
            
            <p
              css={css`
                margin: 0 0 8px 0;
              `}
            >
              またトップ画像をアップロードしていない場合、こちらで選択したゲームの情報が代わりに表示されるようになります。
            </p>
            
            
            <GameForm
              pathArr={this.pathArr}
              additionalGameLimit={additionalGameLimit}
            />
            
          </div>
          
          
          
          
          {/* 更新情報の公開範囲 */}
          <div
            css={css`
              border-top: 1px dashed #848484;
              margin: 16px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 6px 0;
              `}
            >
              公開タイプ
            </h3>
            
            <p>
              コミュニティ内部のコンテンツを閲覧できる相手を選択し、コミュニティの更新情報（フォーラムへの書き込みなど）を Game Users のトップページなどに表示するかどうかの設定になります。
            </p>
            
            <p
              css={css`
                margin: 12px 0 0 0;
              `}
            >
              オープン：コミュニティを誰でも閲覧できます。また更新情報が Game Users のトップページにフィードとして掲載されます。
            </p>
            
            <p
              css={css`
                margin: 12px 0 12px 0;
              `}
            >
              クローズド：コミュニティの参加メンバーだけが閲覧できます。更新情報は参加メンバーだけに通知されます。身内だけで情報交換をしたい場合はクローズドを選んでください。
            </p>
            
            
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="communityType"
                name="communityType"
                value={communityType}
                onChange={(eventObj) => handleEdit({
                  pathArr: [...this.pathArr, 'communityType'],
                  value: eventObj.target.value
                })}
              >
                <FormControlLabel value="open" control={<Radio />} label="オープン" />
                <FormControlLabel value="closed" control={<Radio />} label="クローズド" />
              </RadioGroup>
            </FormControl>
            
          </div>
          
          
          
          
          {/* 参加条件 */}
          <div
            css={css`
              border-top: 1px dashed #848484;
              margin: 24px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 6px 0;
              `}
            >
              参加承認制
            </h3>
            
            <p
              css={css`
                margin: 0 0 12px 0;
              `}
            >
              管理者が承認したユーザーだけをコミュニティに参加させる場合は、以下をチェックしてください。チェックを外すと誰でも参加できるようになります。
            </p>
            
            
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={approval}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...this.pathArr, 'approval'],
                      value: eventObj.target.checked
                    })}
                  />
                }
                label="参加承認制にする"
              />
            </div>
            
          </div>
          
          
          
          
          {/* 匿名での投稿 */}
          <div
            css={css`
              border-top: 1px dashed #848484;
              border-bottom: 1px dashed #848484;
              margin: 16px 0 0 0;
              padding: 24px 0 16px 0;
            `}
          >
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 6px 0;
              `}
            >
              匿名での投稿
            </h3>
            
            <p
              css={css`
                margin: 0 0 12px 0;
              `}
            >
              コミュニティ内で、ログイン済みユーザーが匿名で投稿できるようになります。匿名での投稿を認める場合は、以下をチェックしてください。
            </p>
            
            
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={anonymity}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...this.pathArr, 'anonymity'],
                      value: eventObj.target.checked
                    })}
                  />
                }
                label="認める"
              />
            </div>
            
          </div>
          
          
          
          
          {/* Submit Button */}
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
              margin: 36px 0 0 0;
            `}
          >
            
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmitSettings({ pathArr: this.pathArr })}
              disabled={buttonDisabled}
            >
              送信する
            </Button>
            
          </div>
          
          
          
          
        </form>
        
      </Panel>
    );
    
  }
  
});