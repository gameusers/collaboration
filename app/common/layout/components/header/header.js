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
import Measure from 'react-measure';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconClose from '@material-ui/icons/Close';


// ---------------------------------------------
//   Components
// ---------------------------------------------

// import NavTop from '../header/nav-top';
import HeroImage from '../header/hero-image';
// import NavMain from '../header/nav-main';
import NavSub from '../header/nav-sub';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// const Container = styled.div`
//   display: flex;
//   flex-flow: column nowrap;
//   // background-color: pink;
//   background-color: #25283D;
//   // margin: 20px 0 0 0;
// `;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    super(props);
  }
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
    // --------------------------------------------------
    //   スクロールされる度に呼び出される関数を設定する / ヘッダーのアニメーション用
    //   以下の一文を表示すると、このエラーが表示される。そのうち直すように。
    //   Warning: Can't perform a React state update on an unmounted component.
    // --------------------------------------------------
    
    // window.addEventListener('scroll', this.props.stores.layout.handleHeaderNavOnScroll);
    
    
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores } = this.props;
    
    
    // --------------------------------------------------
    //   ナビゲーション - フォロー＆コミュニティ参加用を表示するかどうか
    // --------------------------------------------------
    
    let showNavSub = false;
    
    //　一時しのぎに表示しないコード
    if ('userCommunity' in stores) {
      showNavSub = true;
    }
    
    
    // // --------------------------------------------------
    // //   loginUsersObj
    // // --------------------------------------------------
    
    // const thumbnailSrc = lodashGet(stores, ['data', 'loginUsersObj', 'thumbnailObj', 'src'], '/static/img/common/thumbnail/none.svg');
    // const thumbnailSrcSet = lodashGet(stores, ['data', 'loginUsersObj', 'thumbnailObj', 'srcSet'], '');
    // const playerID = lodashGet(stores, ['data', 'loginUsersObj', 'playerID'], '');
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   thumbnailSrc: {green ${thumbnailSrc}}
    //   thumbnailSrcSet: {green ${thumbnailSrcSet}}
    //   playerID: {green ${playerID}}
    // `);
    
    // console.log(`
    //   ----- stores.data.loginUsersObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(stores.data.loginUsersObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          && {
            display: flex;
            flex-flow: column nowrap;
            background-color: #25283D;
          }
        `}
      >
        
        
        {/* Navigation - Top */}
        {/*<NavTop />*/}
        
        
        {/* Hero Image（各ゲームの大きな画像） */}
        {/*<HeroImage />*/}
        
        <Measure
          bounds
          onResize={(contentRect) => {
            stores.layout.handleHeaderHeroImageSize({ dimensionsObj: contentRect.bounds });
          }}
        >
          {({ measureRef }) => (
            <div ref={measureRef}>
              <HeroImage />
            </div>
          )}
        </Measure>
        
        
        {/* Navigation - Main */}
        {/*<NavMain headerNavMainArr={this.props.headerNavMainArr} />*/}
        
        
        {/* Navigation - Sub / フォロー＆コミュニティ参加用 */}
        {showNavSub &&
          <NavSub />
        }
        
        
        
        
        {/* 通知ダイアログ */}
        <Dialog
          fullScreen
          open={stores.layout.headerNotificationDialogOpen}
          onClose={stores.layout.handleHeaderNotificationDialogClose}
        >
        
          <AppBar>
            <Toolbar>
              <IconButton color="inherit" onClick={stores.layout.handleHeaderNotificationDialogClose} aria-label="Close">
                <IconClose />
              </IconButton>
              <Typography variant="h6" color="inherit">
                Notifications
              </Typography>
              <Button color="inherit" onClick={stores.layout.handleHeaderNotificationDialogClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          
          <List>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Default notification ringtone" secondary="Tethys" />
            </ListItem>
          </List>
          
        </Dialog>
        
        
      </div>
    );
  }
  
};