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
    // this.pathArr = [props.userCommunities_id, 'ucSettingsFormCommunity'];
    
    
  }
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount(){
    
    
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
      handleSubmitPages,
      
    } = storeUcSettings;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   Name
    // --------------------------------------------------
    
    const userCommunityName = lodashGet(dataObj, [...this.pathArr, 'userCommunityName'], '');
    const validationUserCommunitiesNameObj = validationUserCommunitiesName({ value: userCommunityName });
    
    
    // --------------------------------------------------
    //   Description
    // --------------------------------------------------
    
    const userCommunityDescription = lodashGet(dataObj, [...this.pathArr, 'userCommunityDescription'], '');
    
    
    // --------------------------------------------------
    //   Description Short
    // --------------------------------------------------
    
    const userCommunityDescriptionShort = lodashGet(dataObj, [...this.pathArr, 'userCommunityDescriptionShort'], '');
    
    
    // --------------------------------------------------
    //   userCommunityID
    // --------------------------------------------------
    
    const userCommunityID = lodashGet(dataObj, [...this.pathArr, 'userCommunityID'], '');
    const validationUserCommunitiesUserCommunityIDObj = validationUserCommunitiesUserCommunityID({ value: userCommunityID });
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   topPageName: {green ${topPageName}}
    // `);
    
    // console.log(`
    //   ----- topObj -----\n
    //   ${util.inspect(topObj, { colors: true, depth: null })}\n
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
                id="userCommunityName"
                label="コミュニティの名前"
                value={validationUserCommunitiesNameObj.value}
                onChange={(eventObj) => handleEdit({
                  pathArr: [...this.pathArr, 'userCommunityName'],
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
              value={userCommunityDescription}
              onChange={(eventObj) => handleEdit({
                pathArr: [...this.pathArr, 'userCommunityDescription'],
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
              value={userCommunityDescriptionShort}
              onChange={(eventObj) => handleEdit({
                pathArr: [...this.pathArr, 'userCommunityDescriptionShort'],
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
              コミュニティのトップに表示される大きな画像です。横長の画像（推奨サイズ 1920 x 1080 ピクセル）をアップロードしてください。
            </p>
            
            {/*<ImageAndVideoFormImage
              pathArr={this.pathArr}
              type="ucTop"
              // description="トップページに表示される大きな画像です。"
              showImageCaption={false}
              limit={1}
            />*/}
            
            <ImageAndVideoForm
              pathArr={[...this.pathArr, 'top']}
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
              pathArr={[...this.pathArr, 'thumbnail']}
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
              border-bottom: 1px dashed #848484;
              margin: 24px 0 24px 0;
              padding: 24px 0 24px 0;
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
              // _id={_id}
              // gamesArr={gamesArr}
              // func={handleGame}
              // funcDelete={handleGameDelete}
            />
            
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
              onClick={() => handleSubmitPages({ pathArr: this.pathArr })}
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