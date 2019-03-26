// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import Error from 'next/error';
import Head from 'next/head';
// import Link from 'next/link';
import getConfig from 'next/config';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

// import IconId from '@material-ui/icons/Person';
// import IconPassword from '@material-ui/icons/Lock';
// import IconPasswordOutlined from '@material-ui/icons/LockTwoTone';
// import IconVisibility from '@material-ui/icons/Visibility';
// import IconVisibilityOff from '@material-ui/icons/VisibilityOff';
// import IconMailOutline from '@material-ui/icons/MailOutline';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { IntlProvider, addLocaleData, FormattedMessage } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ja from 'react-intl/locale-data/ja';
addLocaleData([...en, ...ja]);

import { locale } from '../../app/@locales/locale';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../app/@modules/fetch';
import { imageCalculateSize } from '../../app/@modules/image';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreIndex from '../../app/@stores/index';
import initStoreCardPlayer from '../../app/common/card/player/stores/player';
import initStorePlayerPlayer from '../../app/pl/player/stores/store';
import initStoreIDForm from '../../app/common/id/stores/form';
import initStoreGameForm from '../../app/common/game/stores/form';
import initStoreImageAndVideo from '../../app/common/image-and-video/stores/image-and-video';
import initStoreImageAndVideoForm from '../../app/common/image-and-video/stores/form';
// import initStoreFormImageVideo from '../../app/common/form/stores/image-video';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../app/common/layout/components/layout';
import CardPlayer from '../../app/common/card/player/components/player';
// import CardGame from '../../app/common/card/player/components/game';
import CardPlayerDialog from '../../app/common/card/player/components/dialog';

// import DialogTest from '../../app/common/user/components/dialog';
import User from '../../app/common/user/components/user';


// ---------------------------------------------
//   Material UI を Next.js で利用するため
// ---------------------------------------------

import withRoot from '../../lib/material-ui/withRoot';











// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 10px 10px 18px 10px;
  
  @media screen and (max-width: 480px) {
    padding: 10px 0 18px 0;
  }
`;

// const CardBox = styled.div`
//   margin: 20px 0 0 0;
// `;




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/pl/***
// --------------------------------------------------

@observer
class Component extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  static async getInitialProps({ pathname, req, res, query }) {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const { publicRuntimeConfig } = getConfig();
    
    const isServer = !!req;
    let initialPropsObj = {};
    let statusCode = 400;
    
    const localeObj = locale({
      acceptLanguage: req.headers['accept-language']
    });
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      urlApi: encodeURI(`${publicRuntimeConfig.urlApi}/v1/pl/player/initial-props?playerID=${query.param1}`),
      methodType: 'GET',
      reqHeadersCookie: isServer ? req.headers.cookie : '',
      reqAcceptLanguage: isServer ? req.headers['accept-language'] : ''
    });
    
    statusCode = resultObj.statusCode;
    initialPropsObj = resultObj.data;
    
    // console.log(`
    //   ----- req.headers.cookie -----\n
    //   ${util.inspect(req.headers.cookie, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- req.headers['accept-language'] -----\n
    //   ${util.inspect(req.headers['accept-language'], { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- localeObj -----\n
    //   ${util.inspect(localeObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- resultObj -----\n
    //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    // console.log(`
    //   ----- process.env -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(process.env)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    return { isServer, pathname, initialPropsObj, statusCode, localeObj };
    
  }
  
  
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   Property / Error 判定用
    // --------------------------------------------------
    
    this.error = false;
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    try {
      
      
      // --------------------------------------------------
      //   Errorの場合
      // --------------------------------------------------
      
      if (
        this.props.statusCode !== 200 ||
        // 'usersLoginObj' in props.initialPropsObj === false ||
        'usersObj' in props.initialPropsObj === false ||
        'cardPlayersObj' in props.initialPropsObj === false ||
        // 'cardGamesObj' in props.initialPropsObj === false ||
        'cardsArr' in props.initialPropsObj === false
      ) {
        throw new Error();
      }
      
      
      // --------------------------------------------------
      //   publicRuntimeConfig
      // --------------------------------------------------
      
      const { publicRuntimeConfig } = getConfig();
      
      
      // --------------------------------------------------
      //   Store
      // --------------------------------------------------
      
      const argumentsObj = {
        isServer: props.isServer,
        pathname: props.pathname,
        environment: publicRuntimeConfig.environment,
        urlBase: publicRuntimeConfig.urlBase,
        urlApi: publicRuntimeConfig.urlApi
      };
      
      this.stores = initStoreIndex(argumentsObj);
      this.stores.playerPlayer = initStorePlayerPlayer(argumentsObj, this.stores);
      this.stores.cardPlayer = initStoreCardPlayer(argumentsObj, this.stores);
      this.stores.idForm = initStoreIDForm(argumentsObj, this.stores);
      this.stores.gameForm = initStoreGameForm(argumentsObj, this.stores);
      this.stores.imageAndVideo = initStoreImageAndVideo(argumentsObj, this.stores);
      this.stores.imageAndVideoForm = initStoreImageAndVideoForm(argumentsObj, this.stores);
      
      
      // --------------------------------------------------
      //   Store / Update Data
      // --------------------------------------------------
      
      if ('usersLoginObj' in props.initialPropsObj) {
        this.stores.data.replaceUsersLoginObj(props.initialPropsObj.usersLoginObj);
      }
      
      this.stores.data.replaceUsersObj(props.initialPropsObj.usersObj);
      this.stores.data.replaceCardPlayersObj(props.initialPropsObj.cardPlayersObj);
      this.stores.data.replaceCardGamesObj(props.initialPropsObj.cardGamesObj);
      
      
    } catch (e) {
      this.error = true;
    }
    
    
  }
  
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Error
    //   参考：https://github.com/zeit/next.js#custom-error-handling
    // --------------------------------------------------
    
    if (this.error) {
      return <Error statusCode={this.props.statusCode} />;
    }
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    // const stores = this.stores;
    
    
    // --------------------------------------------------
    //   Header Navigation
    // --------------------------------------------------
    
    const headerNavMainArr = [
      {
        name: 'プロフィール',
        pathname: '/pl/AZ-1979'
      },
      {
        name: '設定',
        pathname: '/pl/AZ-1979/config'
      }
    ];
    
    
    // --------------------------------------------------
    //   Player Card
    // --------------------------------------------------
    
    const componentCardsArr = [];
    
    for (const [index, valueObj] of this.props.initialPropsObj.cardsArr.entries()) {
      
      if ('cardPlayers_id' in valueObj) {
        
        componentCardsArr.push(
          <CardPlayer
            _id={valueObj.cardPlayers_id}
            cardGames_id="TzjNMDQyl"
            showCardGameButton={true}
            showFollow={true}
            key={index}
          />
        );
        
      } else {
        
        // if (index === 0) {
          
        //   componentCardsArr.push(
        //     <CardGame
        //       cardGames_id={valueObj.cardGames_id}
        //       showGameName={true}
        //       showCardPlayerButton={false}
        //       // showCardGameButton={false}
        //       showFollow={false}
        //       key={index}
        //     />
        //   );
          
        // } else {
          
        //   componentCardsArr.push(
        //     <CardBox key={index}>
        //       <CardGame
        //         cardGames_id={valueObj.cardGames_id}
        //         showGameName={true}
        //         showCardPlayerButton={false}
        //         // showCardGameButton={false}
        //         showFollow={false}
        //       />
        //     </CardBox>
        //   );
          
        // }
        
        
      }
      
    }
    
    
    // console.log(chalk`
    //   process.env.NODE_ENV: {green ${process.env.NODE_ENV}}
    //   process.env.URL_BASE: {green ${process.env.URL_BASE}}
    //   process.env.URL_API: {green ${process.env.URL_API}}
    // `);
    
    
    
    
    // console.log(`\n---------- imageCalculateSize({ width: 500, height: 406, minSize: 128, maxSize: 320, square: true }) ----------\n`);
    // console.dir(imageCalculateSize({ width: 500, height: 406, minSize: 128, maxSize: 320, square: true }));
    // console.log(`\n-----------------------------------\n`);
    
    
    // console.log(`\n---------- imageCalculateSize({ width: 500, height: 600, minSize: 128, maxSize: 550, square: true }) ----------\n`);
    // console.dir(imageCalculateSize({ width: 500, height: 900, minSize: 128, maxSize: 550, square: true }));
    // console.log(`\n-----------------------------------\n`);
    
    
    // console.log(`\n---------- imageCalculateSize({ width: 108, height: 128, minSize: 128, maxSize: 320, square: true }) ----------\n`);
    // console.dir(imageCalculateSize({ width: 108, height: 128, minSize: 128, maxSize: 320, square: true }));
    // console.log(`\n-----------------------------------\n`);
    
    
    // console.log(`\n---------- imageCalculateSize({ width: 64, height: 64, minSize: 128, maxSize: 128, square: true }) ----------\n`);
    // console.dir(imageCalculateSize({ width: 64, height: 64, minSize: 128, maxSize: 128, square: true }));
    // console.log(`\n-----------------------------------\n`);
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider stores={this.stores}>
      
        <IntlProvider 
          locale={this.props.localeObj.languageArr[0]}
          messages={this.props.localeObj.dataObj}
        >
          
          <Layout headerNavMainArr={headerNavMainArr}>
            
            {/* Head 内部のタグをここで追記する */}
            <Head>
              <title>マリオ - Game Users</title>
            </Head>
            
            
            <Container>
              
              {/*{this.props.localeObj.language} / 
              <FormattedMessage
                id='hello'
              />*/}
              {/*<DialogTest />*/}
              
              {/* カードダイアログテスト用 */}
              {/*<div style={{ margin: '0 0 20px 0', padding: '10px', backgroundColor: 'white' }}>
                <User
                  thumbnailSrc={'http://dev-1.gameusers.org:8080/static/img/card/players/zaoOWw89g/thumbnail/image.jpg'}
                  name={'Name'}
                  playerID={'user1'}
                  status={'Status'}
                  accessDate={'2018-12-22T02:56:41.194Z'}
                  level={'99'}
                  cardPlayers_id={'WAMuArrBZ'}
                  showCardPlayerButton={true}
                  cardGames_id={'3sZUV34Q_'}
                  showCardGameButton={true}
                />
              </div>*/}
              
              {/*<div style={{ width: '300px', height: '300px', 'backgroundImage': 'url(data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+UGxheVN0YXRpb24gaWNvbjwvdGl0bGU+PHBhdGggZD0iTTguOTg1IDIuNTk2djE3LjU0OGwzLjkxNSAxLjI2MVY2LjY4OGMwLS42OS4zMDQtMS4xNTEuNzk0LS45OTEuNjM2LjE4MS43Ni44MTQuNzYgMS41MDV2NS44NzZjMi40NDEgMS4xOTMgNC4zNjItLjAwMiA0LjM2Mi0zLjE1MyAwLTMuMjM3LTEuMTI2LTQuNjc1LTQuNDM4LTUuODI3LTEuMzA3LS40NDgtMy43MjgtMS4xODYtNS4zOTEtMS41MDJoLS4wMDJ6bTQuNjU2IDE2LjI0Mmw2LjI5Ni0yLjI3NWMuNzE1LS4yNTguODI2LS42MjUuMjQ2LS44MTgtLjU4Ni0uMTkyLTEuNjM3LS4xMzktMi4zNTcuMTIzbC00LjIwNSAxLjQ5OXYtMi4zODVsLjI0LS4wODVzMS4yMDEtLjQyIDIuOTEzLS42MTVjMS42OTYtLjE4IDMuNzg1LjAyOSA1LjQzNy42NjEgMS44NDguNjAxIDIuMDQxIDEuNDcyIDEuNTc2IDIuMDcycy0xLjYyMiAxLjAzNi0xLjYyMiAxLjAzNmwtOC41NDQgMy4xMDd2LTIuMjk3bC4wMi0uMDIzek0xLjgwOCAxOC42Yy0xLjktLjU0NS0yLjIxNC0xLjY2OC0xLjM1Mi0yLjMyMS44MDEtLjU4NSAyLjE1OS0xLjA1MSAyLjE1OS0xLjA1MWw1LjYxNi0yLjAxM3YyLjMxM0w0LjIwNiAxN2MtLjcwNS4yNzEtLjgyNS42MzItLjIzOS44MjYuNTg2LjE5NSAxLjYzNy4xNSAyLjM0My0uMTJMOC4yNDggMTd2Mi4wNzRjLS4xMjEuMDI5LS4yNTYuMDQ0LS4zOTEuMDczLTEuOTM4LjMzMS0zLjk5NS4xOTYtNi4wMzctLjQ3OWwtLjAxMi0uMDY4eiIvPjwvc3ZnPg==)' }}></div>*/}
              
              
              {componentCardsArr}
              
              
              {/* プレイヤーカードを表示するダイアログ */}
              <CardPlayerDialog />
              
            </Container>
            
          </Layout>
          
        </IntlProvider>
        
      </Provider>
    );
  }
}

export default withRoot(Component);