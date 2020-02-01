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
import moment from 'moment';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Avatar from '@material-ui/core/Avatar';

// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from '../../../common/layout/components/panel';
import Paragraph from '../../../common/layout/components/paragraph';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
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
    
    const {
      
      stores,
      intl,
      userCommunities_id,
      description,
      createdDate,
      followedCount,
      communityType,
      approval,
      anonymity,
      gamesArr,
      accessRightRead,
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    // const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   パネルを初期状態で開くかどうか
    // --------------------------------------------------
    
    const defaultExpanded = accessRightRead ? false : true;
    
    
    // --------------------------------------------------
    //   開設日
    // --------------------------------------------------
    
    const codeCreatedDate = moment(createdDate).format('YYYY/MM/DD');
    
    
    // --------------------------------------------------
    //   公開タイプ
    // --------------------------------------------------
    
    const codeCommunityType = communityType === 'open' ? intl.formatMessage({ id: 'DXeihaDx8' }) : intl.formatMessage({ id: 'QHz1wbGch' });
    
    
    // --------------------------------------------------
    //   参加
    // --------------------------------------------------
    
    const codeApproval = approval ? intl.formatMessage({ id: 'Da45qlq9l' }) : intl.formatMessage({ id: 'nEtCLmbKz' });
    
    
    // --------------------------------------------------
    //   匿名での投稿
    // --------------------------------------------------
    
    const codeAnonymity = anonymity ? intl.formatMessage({ id: 'I2lSx_RQh' }) : intl.formatMessage({ id: 'btIZLhdBM' });
    
    
    // --------------------------------------------------
    //   関連するゲーム
    // --------------------------------------------------
    
    const codeGames = [];
    
    for (const [index, valueObj] of gamesArr.entries()) {
      
      const src = lodashGet(valueObj, ['imagesAndVideosObj', 'arr', 0, 'src'], '/static/img/common/thumbnail/none-game.jpg');
      const srcSet = lodashGet(valueObj, ['imagesAndVideosObj', 'arr', 0, 'srcSet'], '');
      const urlID = lodashGet(valueObj, ['urlID'], '');
      
      // const linkHref = `/gc/[userCommunityID]?urlID=${urlID}`;
      const linkHref = '';
      const linkAs = `/gc/${urlID}`;
      
      
      codeGames.push(
        <div
          key={index}
          css={css`
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            margin: 8px 0 0 0;
          `}
        >
          
          <Avatar
            css={css`
              && {
                width: 32px;
                height: 32px;
                margin: 0 8px 0 0;
              }
            `}
            alt={valueObj.name}
            src={src}
            srcSet={srcSet}
          />
          
          
          
          <p>
            <Link href={linkHref} as={linkAs}>
              <a>{valueObj.name}</a>
            </Link>
          </p>
          
          
        </div>
      );
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/uc/community/components/about.js
    // `);
    
    // console.log(chalk`
    //   createdDate: {green ${createdDate}}
    //   description: {green ${description}}
    //   followedCount: {green ${followedCount}}
    //   communityType: {green ${communityType}}
    //   approval: {green ${approval}}
    //   anonymity: {green ${anonymity}}
    //   accessRightRead: {green ${accessRightRead}}
    // `);
    
    // console.log(`
    //   ----- this.pathArr -----\n
    //   ${util.inspect(this.pathArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----------------------------------------
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Panel
        heading="コミュニティについて"
        pathArr={this.pathArr}
        defaultExpanded={defaultExpanded}
      >
        
        
        {/* Description */}
        <Paragraph text={description} />
        
        
        
        
        {/* 開設日 */}
        <p
          css={css`
            border-top: 1px dashed #848484;
            margin: 24px 0 0 0;
            padding: 24px 0 0 0;
          `}
        >
          <span
            css={css`
              font-weight: bold;
            `}
          >
            開設日
          </span> | {codeCreatedDate}
        </p>
        
        
        
        
        {/* メンバー */}
        <p
          css={css`
            margin: 6px 0 0 0;
          `}
        >
          <span
            css={css`
              font-weight: bold;
            `}
          >
            メンバー
          </span> | {followedCount}人
        </p>
        
        
        
        
        {/* 公開タイプ */}
        <p
          css={css`
            margin: 6px 0 0 0;
          `}
        >
          <span
            css={css`
              font-weight: bold;
            `}
          >
            公開タイプ
          </span> | {codeCommunityType}
        </p>
        
        
        
        
        {/* 参加 */}
        <p
          css={css`
            margin: 6px 0 0 0;
          `}
        >
          <span
            css={css`
              font-weight: bold;
            `}
          >
            参加
          </span> | {codeApproval}
        </p>
        
        
        
        
        {/* 匿名での投稿 */}
        <p
          css={css`
            margin: 6px 0 0 0;
          `}
        >
          <span
            css={css`
              font-weight: bold;
            `}
          >
            匿名での投稿
          </span> | {codeAnonymity}
        </p>
        
        
        
        
        {/* 関連ゲーム */}
        <p
          css={css`
            font-weight: bold;
            border-top: 1px dashed #848484;
            margin: 24px 0 0 0;
            padding: 24px 0 0 0;
          `}
        >
          関連ゲーム
        </p>
        
        {codeGames}
        
        
      </Panel>
    );
    
  }
  
});