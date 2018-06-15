// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';
import Swiper from 'react-id-swiper';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import IconSchedule from '@material-ui/icons/Schedule';
import IconChatBubble from '@material-ui/icons/ChatBubbleOutline';

import initStoreCommon from '../../applications/common/stores/common';
import initStoreHeader from '../../applications/common/stores/header';

import Layout from '../../applications/common/components/layout';

import withRoot from '../../lib/material-ui/withRoot';



// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 10px 0 10px 10px;
`;

// const CardBox = styled.div`
//   position: relative;
//   margin: 10px 0 0 0;
// `;

// const CardCategory = styled.h2`
//   position: absolute;
//   top: 6px;
//   left: 6px;
//   z-index: 2;
  
//   color: white;
//   border: solid 2px white;
//   // padding: 0.5em;
//   padding: 5px 10px 2px 10px;
//   border-radius: 0.5em;
  
//   background-color: #000;
//   background-color: rgba(0, 0, 0, 0.5);
  
//   // color: green;
//   font-size: 20px;
//   font-weight: normal;
//   // line-height: 1em;
//   // padding: 0 0 10px 0;
  
//   pointer-events: none;
// `;

// const StyledCard = styled(Card)`
//   // margin: 0 14px 45px 0 !important;
//   margin: 0 14px 4px 0 !important;
//   // margin: 0 14px 16px 0 !important;
//   width: 300px !important;
//   cursor: pointer !important;
//   // height: 400px !important;
// `;

// const CardMediaBox = styled.div`
//   background-color: black;
//   position: relative;
// `;

// const CardMediaMoviePlayButton = styled.img`
//   position: absolute;
//   top: 0;
// `;

// const StyledCardContent = styled(CardContent)`
//   padding: 16px 24px 0 24px !important;
// `;

// const CardTitle = styled.h3`
//   margin: 0 0 10px 0;
// `;

// const CardInfoBox = styled.div`
//   display: flex;
//   flex-flow: row nowrap;
//   // justify-content: space-around;
//   font-size: 12px;
//   margin: 10px 0 0 0;
// `;

// const CardInfoLeft = styled.div`
//   // font-size: 12px;
//   // margin: 10px 0 0 0;
// `;

// const CardInfoDateTimeBox = styled.div`
//   display: flex;
//   flex-flow: row nowrap;
// `;

// const StyledIconSchedule = styled(IconSchedule)`
//   font-size: 20px !important;
//   margin: 3px 0 0 0 !important;
// `;

// const CardInfoText = styled.div`
//   font-size: 12px;
//   margin: 0 0 0 4px;
// `;

// const CardInfoRight = styled.div`
//   // font-size: 12px;
//   margin: 0 0 0 20px;
// `;

// const CardInfoCommentsTotalBox = styled.div`
//   display: flex;
//   flex-flow: row nowrap;
// `;

// const StyledIconChatBubble = styled(IconChatBubble)`
//   font-size: 20px !important;
//   margin: 3px 0 0 0 !important;
// `;




// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/
// --------------------------------------------------

@observer
class Component extends React.Component {
  
  static getInitialProps({ pathname, req }) {
    const isServer = !!req;
    return { isServer: isServer, pathname: pathname };
  }
  
  
  constructor(props) {
    
    super(props);
    

    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    this.stores = {
      common: initStoreCommon(props.isServer, props.pathname),
      header: initStoreHeader(props.isServer, props.pathname),
      pathname: props.pathname
    };
    
  }
  
  
  componentDidMount() {
    if (window.innerWidth > 480) {
      this.stores.header.dataOpenFunction();
    }
  }
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const stores = this.stores;
    
    
    
    const params = {
      slidesPerView: 'auto',
      spaceBetween: 0,
      freeMode: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: false,
      }
    };
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider stores={this.stores}>
      
        <Layout>
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>ログイン - Game Users</title>
          </Head>
        
          <Container>
            login/social
          </Container>
          
        </Layout>
      </Provider>
    );
  }
}

export default withRoot(Component);