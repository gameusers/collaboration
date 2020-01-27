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
    
    const { stores, intl, userCommunities_id, description, createdDate, membersCount, gamesArr } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    // const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   Data
    // --------------------------------------------------
    
    const createdDateFormatted = moment(createdDate).format('YYYY/MM/DD');
    
    
    
    
    // --------------------------------------------------
    //   関連するゲーム
    // --------------------------------------------------
    
    // const gamesArr = lodashGet(stores, ['data', 'headerObj', 'gamesArr'], []);
    
    
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
        heading="コミュニティについて"
        pathArr={this.pathArr}
      >
        
        
        {/* Description */}
        <Paragraph text={description} />
        
        
        
        
        {/* 開設日 */}
        <p
          css={css`
            margin: 32px 0 0 0;
          `}
        >
          <span
            css={css`
              font-weight: bold;
            `}
          >
            開設日
          </span> | {createdDateFormatted}
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
          </span> | {membersCount}人
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
          </span> | オープン
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
          </span> | 承認制
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
          </span> | 認める
        </p>
        
        
        
        
        {/* 関連ゲーム */}
        <p
          css={css`
            font-weight: bold;
            margin: 24px 0 0 0;
          `}
        >
          関連ゲーム
        </p>
        
        {codeGames}
        
        
      </Panel>
    );
    
  }
  
});