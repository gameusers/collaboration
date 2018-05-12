// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';

import Scrollbar from 'react-smooth-scrollbar';
// import SmoothScrollbar from 'smooth-scrollbar';
// import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
// import Swiper from 'react-id-swiper';

import Button from 'material-ui/Button';

import withRoot from '../lib/material-ui/withRoot';
import Header from './header';



// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores') @observer
class Component extends React.Component {
  
  constructor(props) {
    super(props);
  }
  

  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores } = this.props;
    
    
    /**
     * ヘッダー最下部の紺色メニュー
     */
    function HeaderMenu() {
      
      const Container = styled.nav`
        // display: flex;
        // flex-flow: row nowrap;
        // flex-direction: row;
        // justify-content: center;
        
        // overflow-x: auto;
        // -webkit-overflow-scrolling: touch;
        
        margin: 0 0 8px 0;
        // padding: 0 0 8px 0;
        
        width: 100%;
        // height: 46px;
        height: 36px;
        text-align: center;
        background-color: #25283D;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 1200;
        // overflow-x: scroll;
        // overflow-x: hidden;
        // overflow-y: hidden;
        // white-space: nowrap;
      `;
      
      
      // const SwiperContainer = styled(Swiper)`
      //   // margin: 0 0 8px 0;
      //   // padding: 0 0 8px 0;
        
      //   // width: 100%;
      //   // height: 46px;
      //   // height: 36px;
      //   text-align: center;
      //   background-color: #25283D;
      //   position: -webkit-sticky;
      //   position: sticky;
      //   top: 0;
      //   z-index: 1200;
      //   // overflow-x: scroll;
      //   // overflow-x: hidden;
      //   // overflow-y: hidden;
      //   // white-space: nowrap;
      // `;
      
      
      // const Container = styled.nav`
      //   // display: flex;
      //   // flex-flow: row nowrap;
      //   // flex-direction: row;
      //   // justify-content: center;
      //   width: 100%;
      //   height: 46px;
      //   text-align: center;
      //   background-color: #25283D;
      //   position: -webkit-sticky;
      //   position: sticky;
      //   top: 0;
      //   z-index: 1200;
      //   overflow-x: scroll;
      //   // overflow-x: hidden;
      //   overflow-y: hidden;
      // `;
      
      const ButtonMenuActive = styled(Button)`
        color: white !important;
        // border-top: solid 2px #25283D !important;
        padding: 2px 0 0 !important;
        border-bottom: solid 2px #B40431 !important;
      `;
      
      const ButtonMenu = styled(Button)`
        color: #BDBDBD !important;
        // border-top: solid 2px #25283D !important;
        padding: 2px 0 0 !important;
        border-bottom: solid 2px #25283D !important;
        // background-color: green !important;
      `;
      
      // const Inner = styled.div`
      //   display: flex;
      //   background-color: pink;
      //   // width: 50%;
      //   // align-items: center;
      //   // justify-content: center;
      //   // text-align: center;
      // `;
      
      // const Inner = styled.div`
      //   display: inline-block;
      //   white-space: nowrap;
      //   // background-color: #25283D;
      //   // text-align: center;
      //   // background-color: pink;
      // `;
      
      // const Inner = styled.div`
      //   height: 36px;
      //   padding: 0 0 20px 0;
      //   background-color: pink;
      // `;
      
      const ScrollbarContainer = styled(Scrollbar)`
        // width: 100%;
        // height: 100%;
        // text-align: center;
        // background-color: #25283D;
        // position: -webkit-sticky;
        // position: sticky;
        // top: 0;
        // z-index: 1200;
        // overflow-x: scroll;
        // padding: 0 0 6px 0;
        // background-color: yellow;
        // margin: 0 auto;
        // background-color: #25283D;
        // margin: 0 0 8px 0;
        padding: 0 0 8px 0;
        // box-sizing: content-box;
        // display: inline-block;
        // top: 20px;
        // border-bottom: solid 8px #ecf0f1;
        overflow-x: hidden;
        overflow-y: hidden;
        white-space: nowrap;
      `;
      
      
      const codeArr = [];
      let active = false;
      let menuArr = [];
      
      if (stores.pathname === '/') {
        menuArr = stores.header.menuObj.index;
      } else if (stores.pathname === '/gc') {
        menuArr = stores.header.menuObj.gc;
      } else if (stores.pathname === '/uc') {
        menuArr = stores.header.menuObj.uc;
      }
      
      const reverseMenuArr = JSON.parse(JSON.stringify(menuArr)).reverse();
      
      
      reverseMenuArr.forEach((value, index) => {
        
        if (value.pathname === stores.pathname || (!active && index + 1 === reverseMenuArr.length)) {
          
          codeArr.unshift(
            <ButtonMenuActive key={index}>
              {value.name}
            </ButtonMenuActive>
          );
          
          active = true;
          
        } else {
          
          codeArr.unshift(
            <Link prefetch href={value.pathname} key={index}>
              <ButtonMenu>
                {value.name}
              </ButtonMenu>
            </Link>
          );
          
        }
        
        
        // if (value.pathname === stores.pathname || (!active && index + 1 === reverseMenuArr.length)) {
          
        //   codeArr.unshift(
        //     <div style={{width: 60}} key={index}>
        //       <ButtonMenuActive>
        //         {value.name}
        //       </ButtonMenuActive>
        //     </div>
        //   );
          
        //   active = true;
          
        // } else {
          
        //   codeArr.unshift(
        //     <div style={{width: 60}} key={index}>
        //       <Link prefetch href={value.pathname}>
        //         <ButtonMenu>
        //           {value.name}
        //         </ButtonMenu>
        //       </Link>
        //     </div>
        //   );
          
        // }
        
      });
      
      // return (
      //   <ScrollbarsInner style={{ width: '100%', height: 46 }}>
      //     {codeArr}
      //   </ScrollbarsInner>
      // );
      
      // return (
      //   <Container>
      //     <ScrollArea
      //       speed={0.8}
      //       horizontal={true}
      //     >
      //     {codeArr}
      //     </ScrollArea>
      //   </Container>
      // );
      
      // return (
      //   <Container>
          
      //     <ScrollbarContainer
      //       alwaysShowTracks
      //     >
      //       <Inner>
      //       {codeArr}
      //       </Inner>
      //     </ScrollbarContainer>
          
      //   </Container>
      // );
      
      
      // return (
      //   <Container>
      //     <Inner>
      //     <ScrollbarContainer
      //       alwaysShowTracks
      //     >
            
      //       {codeArr}
            
      //     </ScrollbarContainer>
      //     </Inner>
      //   </Container>
      // );
      
      
      
      // const params = {
      //   pagination: {
      //     el: '.swiper-pagination',
      //     type: 'bullets',
      //     clickable: true
      //   },
      //   navigation: {
      //     nextEl: '.swiper-button-next',
      //     prevEl: '.swiper-button-prev'
      //   },
      //   spaceBetween: 30
      // };
      
      // const params = {
      //   slidesPerView: 'auto',
      //   spaceBetween: 30,
      //   // centeredSlides: true,
      //   freeMode: true,
      //   pagination: {
      //     // el: '.swiper-pagination',
      //     // type: 'progressbar',
      //     clickable: true,
      //   }
      // };
      
      // return (
      //   <Container>
      //     <Swiper {...params}>
      //       {codeArr}
      //     </Swiper>
      //   </Container>
      // );
      
      // return (
      //   <Swiper {...params}>
      //     <div style={{width: 80}}>Slide 1</div>
      //     <div style={{width: 80}}>Slide 2</div>
      //     <div style={{width: 80}}>Slide 3</div>
      //     <div style={{width: 80}}>Slide 4</div>
      //     <div style={{width: 80}}>Slide 5</div>
      //   </Swiper>
      // );
      
      
      return (
        <Container>
          <ScrollbarContainer
            // ref={c => this.$container = c}
            alwaysShowTracks
            // continuousScrolling={false}
            // wheelEventTarget={document.querySelector('#header-nav')}
            // scrollIntoView={{
            //   offsetLeft: 50
            // }}
          >
            {codeArr}
          </ScrollbarContainer>
        </Container>
      );
      
      // return (
      //   <Container>
      //     <ScrollbarContainer>
      //       <Inner>
      //         {codeArr}
      //       </Inner>
      //     </ScrollbarContainer>
      //   </Container>
      // );
      
      // return (
      //   <ScrollbarContainer>
      //     <Inner>
      //       {codeArr}
      //     </Inner>
      //   </ScrollbarContainer>
      // );
      
      // return (
      //   <Scrollbars style={{ width: '100%', height: 46 }}>
      //     <Inner>
      //       {codeArr}
      //     </Inner>
      //   </Scrollbars>
      // );
      
      // return (
      //   <Container>
      //     <Inner>
      //       {codeArr}
      //     </Inner>
      //   </Container>
      // );
      
    }
    
    
    
    return (
      <div>
        
        {/* Head 内部のタグをここで追記する */}
        <Head>
          <title>タイトル</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        
        
        {/* ヘッダー */}
        <Header />
        
        {/* 最下部メニュー */}
        <HeaderMenu />
        
        
        {/* コンテンツ */}
        {this.props.children}
        
        
        {/* フッター */}
        {/*<footer>
          {'Footer'}
        </footer>*/}
        
      </div>
    );
  }
  
};

export default withRoot(Component);