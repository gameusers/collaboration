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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateForum } from 'app/@states/forum.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from 'app/common/layout/v2/components/panel.js';
import Paragraph from 'app/common/layout/v2/components/paragraph.js';
import User from 'app/common/user/v2/components/user.js';
import ImageAndVideo from 'app/common/image-and-video/v2/components/image-and-video.js';
import GoodButton from 'app/common/good/v2/components/button.js';






// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssFollowButton = css`
  border-top: 1px dashed #A4A4A4;
  margin: 24px 0 0 0;
  padding: 24px 0 0 0;
`;


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
    
    obj = {},
    // showFollow,
    showEditButton,
    defaultExpanded = true,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const classes = useStyles();
  const [panelExpanded, setPanelExpanded] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  
  
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
   * スレッドを読み込む
   * @param {number} page - スレッドのページ
   * @param {number} changeLimit - 1ページに表示する件数を変更する場合、値を入力する
   */
  // const handleRead = async ({
    
  //   page,
  //   changeLimit,
    
  // }) => {
    
    
  //   try {
      
      
  //     // ---------------------------------------------
  //     //   Router.push 用
  //     // ---------------------------------------------
      
  //     let url = '';
  //     let as = '';
      
  //     if (gameCommunities_id) {
        
  //       if (page === 1) {
          
  //         url = `/gc/[urlID]/index?urlID=${urlID}`;
  //         as = `/gc/${urlID}`;
          
  //       } else {
          
  //         url = `/gc/[urlID]/forum/[...slug]?urlID=${urlID}&page=${page}`;
  //         as = `/gc/${urlID}/forum/${page}`;
          
  //       }
        
  //     } else {
        
  //       if (page === 1) {
          
  //         url = `/uc/[userCommunityID]/index?userCommunityID=${userCommunityID}`;
  //         as = `/uc/${userCommunityID}`;
          
  //       } else {
          
  //         url = `/uc/[userCommunityID]/forum/[...slug]?userCommunityID=${userCommunityID}&page=${page}`;
  //         as = `/uc/${userCommunityID}/forum/${page}`;
          
  //       }
        
  //     }
      
      
      
      
  //     // ---------------------------------------------
  //     //   Change Limit / Set Cookie
  //     // ---------------------------------------------
      
  //     if (changeLimit) {
        
  //       Cookies.set('forumThreadLimit', changeLimit);
        
  //     }
      
      
      
      
  //     // ---------------------------------------------
  //     //   console.log
  //     // ---------------------------------------------
      
  //     // console.log(`
  //     //   ----------------------------------------\n
  //     //   /app/common/forum/v2/components/forum.js - handleRead
  //     // `);
      
  //     // console.log(chalk`
  //     //   gameCommunities_id: {green ${gameCommunities_id}}
  //     //   userCommunities_id: {green ${userCommunities_id}}
  //     //   page: {green ${page}}
  //     //   changeLimit: {green ${changeLimit}}
        
  //     //   url: {green ${url}}
  //     //   as: {green ${as}}
  //     // `);
      
  //     // return;
      
      
      
      
  //     // ---------------------------------------------
  //     //   Router.push = History API pushState()
  //     // ---------------------------------------------
      
  //     await Router.push(url, as);
      
      
  //   } catch (errorObj) {}
    
    
  // };
  
  
  
  
  // --------------------------------------------------
  //   カードデータが存在しない場合、空のコンポーネントを返す
  // --------------------------------------------------
  
  if (Object.keys(obj).length === 0) {
    return null;
  }
  
  
  
  
  // --------------------------------------------------
  //   _id
  // --------------------------------------------------
  
  const _id = lodashGet(obj, ['_id'], '');
  const users_id = lodashGet(obj, ['users_id'], '');
  
  
  // ---------------------------------------------
  //   User
  // ---------------------------------------------
  
  const name = lodashGet(obj, ['nameObj', 'value'], '');
  const status = lodashGet(obj, ['statusObj', 'value'], '');
  const comment = lodashGet(obj, ['commentObj', 'value'], '');
  const exp = lodashGet(obj, ['usersObj', 'exp'], 0);
  const accessDate = lodashGet(obj, ['usersObj', 'accessDate'], '');
  const userID = lodashGet(obj, ['usersObj', 'userID'], '');
  // const followedCount = lodashGet(obj, ['followsObj', 'followedCount'], 0);
  // const followed = lodashGet(obj, ['followsObj', 'followed'], false);
  
  
  
  // --------------------------------------------------
  //   Images and Videos
  // --------------------------------------------------
  
  const imagesAndVideosObj = lodashGet(obj, ['imagesAndVideosObj'], {});
  const imagesAndVideosThumbnailObj = lodashGet(obj, ['imagesAndVideosThumbnailObj'], {});
  
  
  // ---------------------------------------------
  //   Profile
  // ---------------------------------------------
  
  const ageValue = lodashGet(obj, ['ageObj', 'value'], '');
  const ageAlternativeText = lodashGet(obj, ['ageObj', 'alternativeText'], '');
  const sexValue = lodashGet(obj, ['sexObj', 'value'], '');
  const sexAlternativeText = lodashGet(obj, ['sexObj', 'alternativeText'], '');
  const addressAlternativeText = lodashGet(obj, ['addressObj', 'alternativeText'], '');
  const gamingExperienceValue = lodashGet(obj, ['gamingExperienceObj', 'value'], '');
  const gamingExperienceAlternativeText = lodashGet(obj, ['gamingExperienceObj', 'alternativeText'], '');
  const hobbiesValueArr = lodashGet(obj, ['hobbiesObj', 'valueArr'], []);
  const specialSkillsValueArr = lodashGet(obj, ['specialSkillsObj', 'valueArr'], []);
  
  
  // ---------------------------------------------
  //   Hardware
  // ---------------------------------------------
  
  const hardwareActiveArr = lodashGet(obj, ['hardwareActiveArr'], []);
  const hardwareInactiveArr = lodashGet(obj, ['hardwareInactiveArr'], []);
  
  
  // ---------------------------------------------
  //   Smartphone
  // ---------------------------------------------
  
  const smartphoneModel = lodashGet(obj, ['smartphoneObj', 'model'], '');
  const smartphoneComment = lodashGet(obj, ['smartphoneObj', 'comment'], '');
  
  
  // ---------------------------------------------
  //   Tablet
  // ---------------------------------------------
  
  const tabletModel = lodashGet(obj, ['tabletObj', 'model'], '');
  const tabletComment = lodashGet(obj, ['tabletObj', 'comment'], '');
  
  
  // ---------------------------------------------
  //   PC
  // ---------------------------------------------
  
  const pcModel = lodashGet(obj, ['pcObj', 'model'], '');
  const pcComment = lodashGet(obj, ['pcObj', 'comment'], '');
  const pcOs = lodashGet(obj, ['pcObj', 'specsObj', 'os'], '');
  const pcCpu = lodashGet(obj, ['pcObj', 'specsObj', 'cpu'], '');
  const pcCpuCooler = lodashGet(obj, ['pcObj', 'specsObj', 'cpuCooler'], '');
  const pcMotherboard = lodashGet(obj, ['pcObj', 'specsObj', 'motherboard'], '');
  const pcMemory = lodashGet(obj, ['pcObj', 'specsObj', 'memory'], '');
  const pcStorage = lodashGet(obj, ['pcObj', 'specsObj', 'storage'], '');
  const pcGraphicsCard = lodashGet(obj, ['pcObj', 'specsObj', 'graphicsCard'], '');
  const pcOpticalDrive = lodashGet(obj, ['pcObj', 'specsObj', 'opticalDrive'], '');
  const pcPowerSupply = lodashGet(obj, ['pcObj', 'specsObj', 'powerSupply'], '');
  const pcCase = lodashGet(obj, ['pcObj', 'specsObj', 'pcCase'], '');
  const pcMonitor = lodashGet(obj, ['pcObj', 'specsObj', 'monitor'], '');
  const pcMouse = lodashGet(obj, ['pcObj', 'specsObj', 'mouse'], '');
  const pcKeyboard = lodashGet(obj, ['pcObj', 'specsObj', 'keyboard'], '');
    
  
  // ---------------------------------------------
  //   ID
  // ---------------------------------------------
  
  const idsArr = lodashGet(obj, ['idsArr'], []);
  
  
  // ---------------------------------------------
  //   活動時間
  // ---------------------------------------------
  
  const activityTimeArr = lodashGet(obj, ['activityTimeObj', 'valueArr'], []);
  
  
  // ---------------------------------------------
  //   フレンド募集
  // ---------------------------------------------
  
  const lookingForFriendsValue = lodashGet(obj, ['lookingForFriendsObj', 'value'], '');
  const lookingForFriendsIcon = lodashGet(obj, ['lookingForFriendsObj', 'icon'], '');
  const lookingForFriendsComment = lodashGet(obj, ['lookingForFriendsObj', 'comment'], '');
  
  
  // ---------------------------------------------
  //   ボイスチャット
  // ---------------------------------------------
  
  const voiceChatValue = lodashGet(obj, ['voiceChatObj', 'value'], '');
  const voiceChatComment = lodashGet(obj, ['voiceChatObj', 'comment'], '');
  
  
  // ---------------------------------------------
  //   Link
  // ---------------------------------------------
  
  const linkArr = lodashGet(obj, ['linkArr'], []);
  
  
  // --------------------------------------------------
  //   Follow
  // --------------------------------------------------
  
  const followsObj = lodashGet(obj, ['followsObj'], {});
  
  
  // --------------------------------------------------
  //   Edit Form
  // --------------------------------------------------
  
  // const formOpen = lodashGet(storeCardPlayer, ['formOpenObj', cardPlayers_id], false);
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  console.log(`
    ----------------------------------------\n
    /app/common/card/v2/components/card-player.js
  `);
  
  console.log(`
    ----- obj -----\n
    ${util.inspect(JSON.parse(JSON.stringify(obj)), { colors: true, depth: null })}\n
    --------------------\n
  `);
  
  console.log(chalk`
    showEditButton: {green ${showEditButton}}
    defaultExpanded: {green ${defaultExpanded}}
  `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Element
      name={_id}
    >
      
      
      <Card>
        
        
        {/* カード上部 */}
        <div
          css={css`
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            margin: 0;
            padding: 12px 4px 12px 12px;
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
          />
          
          
          {/* 右上に設置されているパネル開閉用のボタン */}
          <div
            css={css`
              margin: 0 0 0 auto;
            `}
          >
            <IconButton
              aria-expanded={panelExpanded}
              aria-label="Show more"
              disabled={buttonDisabled}
              // onClick={() => handlePanelExpand({ pathArr: this.pathArr, defaultExpanded })}
            >
              {panelExpanded ? (
                <IconExpandLess />
              ) : (
                <IconExpandMore />
              )}
            </IconButton>
          </div>
          
          
        </div>
        
        
        
        
        {/* カードのコンテンツ - 折り畳まれる部分 */}
        <Collapse in={panelExpanded} timeout="auto">
          
          
          {/* 編集フォーム */}
          {showForm ? (
            
            {/*<FormPlayer
              cardPlayers_id={cardPlayers_id}
            />*/}
            
          ) : (
            
            <React.Fragment>
              
              
              {/* Big Image */}
              <ImageAndVideo
                imagesAndVideosObj={imagesAndVideosObj}
                setMaxHeight={false}
              />
              
              
              {/* Contents */}
              <CardContent
                css={css`
                  && {
                    font-size: 14px;
                    padding-bottom: 16px !important;
                    
                    ${Object.keys(imagesAndVideosObj).length === 0 &&
                      `border-top: 1px dashed;
                       border-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.50), rgba(0,0,0,0));
                       border-image-slice: 1;`
                    }
                  }
                `}
              >
                
                
                {/* コメント */}
                <Paragraph text={comment} />
                
                
                
                
                
                
                
                
              </CardContent>
              
              
            </React.Fragment>
            
          )}
          
          
        </Collapse>
        
        
      </Card>
      
      
    </Element>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;