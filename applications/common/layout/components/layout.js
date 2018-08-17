// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';
import ModalVideo from 'react-modal-video';

import Header from './header/header';
import HeaderNavMain from './header/nav-main';
import Footer from './footer';

// import ModalImageVideo from './modal-image-video';
import Snackbar from './snackbar';



// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  
  /**
   * ウィンドウの横幅が大きい場合、ヘッダーの情報を開く
   */
  componentDidMount() {
    if (window.innerWidth > 480) {
      this.props.stores.layout.handleHeaderDataBoxOpen();
    }
  }
  

  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores } = this.props;
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        {/* Head 内部のタグをここで追記する */}
        <Head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <meta name="robots" content="noindex,nofollow" />
          <style>{`
            /* 
            html5doctor.com Reset Stylesheet
            v1.6.1
            Last Updated: 2010-09-17
            Author: Richard Clark - http://richclarkdesign.com 
            Twitter: @rich_clark
            */
            abbr,address,article,aside,audio,b,blockquote,body,canvas,caption,cite,code,dd,del,details,dfn,div,dl,dt,em,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,p,pre,q,samp,section,small,span,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,ul,var,video{margin:0;padding:0;border:0;outline:0;font-size:100%;vertical-align:baseline;background:transparent}body{line-height:1}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}nav ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}a{margin:0;padding:0;font-size:100%;vertical-align:baseline;background:transparent}ins{text-decoration:none}ins,mark{background-color:#ff9;color:#000}mark{font-style:italic;font-weight:700}del{text-decoration:line-through}abbr[title],dfn[title]{border-bottom:1px dotted;cursor:help}table{border-collapse:collapse;border-spacing:0}hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}input,select{vertical-align:middle}
            
            
            /**
             * Swiper 4.1.6
             * Most modern mobile touch slider and framework with hardware accelerated transitions
             * http://www.idangero.us/swiper/
             *
             * Copyright 2014-2018 Vladimir Kharlampidi
             *
             * Released under the MIT License
             *
             * Released on: February 11, 2018
             */
             .swiper-container {
              margin: 0 auto;
              position: relative;
              overflow: hidden;
              list-style: none;
              padding: 0;
              /* Fix of Webkit flickering */
              z-index: 1;
            }
            .swiper-container-no-flexbox .swiper-slide {
              float: left;
            }
            .swiper-container-vertical > .swiper-wrapper {
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              -webkit-flex-direction: column;
              -ms-flex-direction: column;
              flex-direction: column;
            }
            .swiper-wrapper {
              position: relative;
              width: 100%;
              height: 100%;
              z-index: 1;
              display: -webkit-box;
              display: -webkit-flex;
              display: -ms-flexbox;
              display: flex;
              -webkit-transition-property: -webkit-transform;
              transition-property: -webkit-transform;
              -o-transition-property: transform;
              transition-property: transform;
              transition-property: transform, -webkit-transform;
              -webkit-box-sizing: content-box;
              box-sizing: content-box;
            }
            .swiper-container-android .swiper-slide,
            .swiper-wrapper {
              -webkit-transform: translate3d(0px, 0, 0);
              transform: translate3d(0px, 0, 0);
            }
            .swiper-container-multirow > .swiper-wrapper {
              -webkit-flex-wrap: wrap;
              -ms-flex-wrap: wrap;
              flex-wrap: wrap;
            }
            .swiper-container-free-mode > .swiper-wrapper {
              -webkit-transition-timing-function: ease-out;
              -o-transition-timing-function: ease-out;
              transition-timing-function: ease-out;
              margin: 0 auto;
            }
            .swiper-slide {
              -webkit-flex-shrink: 0;
              -ms-flex-negative: 0;
              flex-shrink: 0;
              width: 100%;
              height: 100%;
              position: relative;
              -webkit-transition-property: -webkit-transform;
              transition-property: -webkit-transform;
              -o-transition-property: transform;
              transition-property: transform;
              transition-property: transform, -webkit-transform;
            }
            .swiper-invisible-blank-slide {
              visibility: hidden;
            }
            /* Auto Height */
            .swiper-container-autoheight,
            .swiper-container-autoheight .swiper-slide {
              height: auto;
            }
            .swiper-container-autoheight .swiper-wrapper {
              -webkit-box-align: start;
              -webkit-align-items: flex-start;
              -ms-flex-align: start;
              align-items: flex-start;
              -webkit-transition-property: height, -webkit-transform;
              transition-property: height, -webkit-transform;
              -o-transition-property: transform, height;
              transition-property: transform, height;
              transition-property: transform, height, -webkit-transform;
            }
            /* 3D Effects */
            .swiper-container-3d {
              -webkit-perspective: 1200px;
              perspective: 1200px;
            }
            .swiper-container-3d .swiper-wrapper,
            .swiper-container-3d .swiper-slide,
            .swiper-container-3d .swiper-slide-shadow-left,
            .swiper-container-3d .swiper-slide-shadow-right,
            .swiper-container-3d .swiper-slide-shadow-top,
            .swiper-container-3d .swiper-slide-shadow-bottom,
            .swiper-container-3d .swiper-cube-shadow {
              -webkit-transform-style: preserve-3d;
              transform-style: preserve-3d;
            }
            .swiper-container-3d .swiper-slide-shadow-left,
            .swiper-container-3d .swiper-slide-shadow-right,
            .swiper-container-3d .swiper-slide-shadow-top,
            .swiper-container-3d .swiper-slide-shadow-bottom {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              pointer-events: none;
              z-index: 10;
            }
            .swiper-container-3d .swiper-slide-shadow-left {
              background-image: -webkit-gradient(linear, right top, left top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));
              background-image: -webkit-linear-gradient(right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
              background-image: -o-linear-gradient(right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
              background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
            }
            .swiper-container-3d .swiper-slide-shadow-right {
              background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));
              background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
              background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
              background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
            }
            .swiper-container-3d .swiper-slide-shadow-top {
              background-image: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));
              background-image: -webkit-linear-gradient(bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
              background-image: -o-linear-gradient(bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
              background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
            }
            .swiper-container-3d .swiper-slide-shadow-bottom {
              background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));
              background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
              background-image: -o-linear-gradient(top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
              background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
            }
            /* IE10 Windows Phone 8 Fixes */
            .swiper-container-wp8-horizontal,
            .swiper-container-wp8-horizontal > .swiper-wrapper {
              -ms-touch-action: pan-y;
              touch-action: pan-y;
            }
            .swiper-container-wp8-vertical,
            .swiper-container-wp8-vertical > .swiper-wrapper {
              -ms-touch-action: pan-x;
              touch-action: pan-x;
            }
            .swiper-button-prev,
            .swiper-button-next {
              position: absolute;
              top: 50%;
              width: 27px;
              height: 44px;
              margin-top: -22px;
              z-index: 10;
              cursor: pointer;
              background-size: 27px 44px;
              background-position: center;
              background-repeat: no-repeat;
            }
            .swiper-button-prev.swiper-button-disabled,
            .swiper-button-next.swiper-button-disabled {
              opacity: 0.35;
              cursor: auto;
              pointer-events: none;
            }
            .swiper-button-prev,
            .swiper-container-rtl .swiper-button-next {
              background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E");
              left: 10px;
              right: auto;
            }
            .swiper-button-next,
            .swiper-container-rtl .swiper-button-prev {
              background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E");
              right: 10px;
              left: auto;
            }
            .swiper-button-prev.swiper-button-white,
            .swiper-container-rtl .swiper-button-next.swiper-button-white {
              background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E");
            }
            .swiper-button-next.swiper-button-white,
            .swiper-container-rtl .swiper-button-prev.swiper-button-white {
              background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E");
            }
            .swiper-button-prev.swiper-button-black,
            .swiper-container-rtl .swiper-button-next.swiper-button-black {
              background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E");
            }
            .swiper-button-next.swiper-button-black,
            .swiper-container-rtl .swiper-button-prev.swiper-button-black {
              background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E");
            }
            .swiper-button-lock {
              display: none;
            }
            .swiper-pagination {
              position: absolute;
              text-align: center;
              -webkit-transition: 300ms opacity;
              -o-transition: 300ms opacity;
              transition: 300ms opacity;
              -webkit-transform: translate3d(0, 0, 0);
              transform: translate3d(0, 0, 0);
              z-index: 10;
            }
            .swiper-pagination.swiper-pagination-hidden {
              opacity: 0;
            }
            /* Common Styles */
            .swiper-pagination-fraction,
            .swiper-pagination-custom,
            .swiper-container-horizontal > .swiper-pagination-bullets {
              bottom: 10px;
              left: 0;
              width: 100%;
            }
            /* Bullets */
            .swiper-pagination-bullets-dynamic {
              overflow: hidden;
              font-size: 0;
            }
            .swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
              -webkit-transform: scale(0.33);
              -ms-transform: scale(0.33);
              transform: scale(0.33);
              position: relative;
            }
            .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active {
              -webkit-transform: scale(1);
              -ms-transform: scale(1);
              transform: scale(1);
            }
            .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main {
              -webkit-transform: scale(1);
              -ms-transform: scale(1);
              transform: scale(1);
            }
            .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev {
              -webkit-transform: scale(0.66);
              -ms-transform: scale(0.66);
              transform: scale(0.66);
            }
            .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev {
              -webkit-transform: scale(0.33);
              -ms-transform: scale(0.33);
              transform: scale(0.33);
            }
            .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next {
              -webkit-transform: scale(0.66);
              -ms-transform: scale(0.66);
              transform: scale(0.66);
            }
            .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next {
              -webkit-transform: scale(0.33);
              -ms-transform: scale(0.33);
              transform: scale(0.33);
            }
            .swiper-pagination-bullet {
              width: 8px;
              height: 8px;
              display: inline-block;
              border-radius: 100%;
              background: #000;
              opacity: 0.2;
            }
            button.swiper-pagination-bullet {
              border: none;
              margin: 0;
              padding: 0;
              -webkit-box-shadow: none;
              box-shadow: none;
              -webkit-appearance: none;
              -moz-appearance: none;
              appearance: none;
            }
            .swiper-pagination-clickable .swiper-pagination-bullet {
              cursor: pointer;
            }
            .swiper-pagination-bullet-active {
              opacity: 1;
              background: #007aff;
            }
            .swiper-container-vertical > .swiper-pagination-bullets {
              right: 10px;
              top: 50%;
              -webkit-transform: translate3d(0px, -50%, 0);
              transform: translate3d(0px, -50%, 0);
            }
            .swiper-container-vertical > .swiper-pagination-bullets .swiper-pagination-bullet {
              margin: 6px 0;
              display: block;
            }
            .swiper-container-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
              top: 50%;
              -webkit-transform: translateY(-50%);
              -ms-transform: translateY(-50%);
              transform: translateY(-50%);
              width: 8px;
            }
            .swiper-container-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
              display: inline-block;
              -webkit-transition: 200ms top, 200ms -webkit-transform;
              transition: 200ms top, 200ms -webkit-transform;
              -o-transition: 200ms transform, 200ms top;
              transition: 200ms transform, 200ms top;
              transition: 200ms transform, 200ms top, 200ms -webkit-transform;
            }
            .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
              margin: 0 4px;
            }
            .swiper-container-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
              left: 50%;
              -webkit-transform: translateX(-50%);
              -ms-transform: translateX(-50%);
              transform: translateX(-50%);
              white-space: nowrap;
            }
            .swiper-container-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
              -webkit-transition: 200ms left, 200ms -webkit-transform;
              transition: 200ms left, 200ms -webkit-transform;
              -o-transition: 200ms transform, 200ms left;
              transition: 200ms transform, 200ms left;
              transition: 200ms transform, 200ms left, 200ms -webkit-transform;
            }
            .swiper-container-horizontal.swiper-container-rtl > .swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
              -webkit-transition: 200ms right, 200ms -webkit-transform;
              transition: 200ms right, 200ms -webkit-transform;
              -o-transition: 200ms transform, 200ms right;
              transition: 200ms transform, 200ms right;
              transition: 200ms transform, 200ms right, 200ms -webkit-transform;
            }
            /* Progress */
            .swiper-pagination-progressbar {
              background: rgba(0, 0, 0, 0.25);
              position: absolute;
            }
            .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
              background: #007aff;
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              -webkit-transform: scale(0);
              -ms-transform: scale(0);
              transform: scale(0);
              -webkit-transform-origin: left top;
              -ms-transform-origin: left top;
              transform-origin: left top;
            }
            .swiper-container-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
              -webkit-transform-origin: right top;
              -ms-transform-origin: right top;
              transform-origin: right top;
            }
            .swiper-container-horizontal > .swiper-pagination-progressbar {
              width: 100%;
              height: 4px;
              left: 0;
              top: 0;
            }
            .swiper-container-vertical > .swiper-pagination-progressbar {
              width: 4px;
              height: 100%;
              left: 0;
              top: 0;
            }
            .swiper-pagination-white .swiper-pagination-bullet-active {
              background: #ffffff;
            }
            .swiper-pagination-progressbar.swiper-pagination-white {
              background: rgba(255, 255, 255, 0.25);
            }
            .swiper-pagination-progressbar.swiper-pagination-white .swiper-pagination-progressbar-fill {
              background: #ffffff;
            }
            .swiper-pagination-black .swiper-pagination-bullet-active {
              background: #000000;
            }
            .swiper-pagination-progressbar.swiper-pagination-black {
              background: rgba(0, 0, 0, 0.25);
            }
            .swiper-pagination-progressbar.swiper-pagination-black .swiper-pagination-progressbar-fill {
              background: #000000;
            }
            .swiper-pagination-lock {
              display: none;
            }
            /* Scrollbar */
            .swiper-scrollbar {
              border-radius: 10px;
              position: relative;
              -ms-touch-action: none;
              background: rgba(0, 0, 0, 0.1);
            }
            .swiper-container-horizontal > .swiper-scrollbar {
              position: absolute;
              left: 1%;
              bottom: 3px;
              z-index: 50;
              height: 5px;
              width: 98%;
            }
            .swiper-container-vertical > .swiper-scrollbar {
              position: absolute;
              right: 3px;
              top: 1%;
              z-index: 50;
              width: 5px;
              height: 98%;
            }
            .swiper-scrollbar-drag {
              height: 100%;
              width: 100%;
              position: relative;
              background: rgba(0, 0, 0, 0.5);
              border-radius: 10px;
              left: 0;
              top: 0;
            }
            .swiper-scrollbar-cursor-drag {
              cursor: move;
            }
            .swiper-scrollbar-lock {
              display: none;
            }
            .swiper-zoom-container {
              width: 100%;
              height: 100%;
              display: -webkit-box;
              display: -webkit-flex;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-pack: center;
              -webkit-justify-content: center;
              -ms-flex-pack: center;
              justify-content: center;
              -webkit-box-align: center;
              -webkit-align-items: center;
              -ms-flex-align: center;
              align-items: center;
              text-align: center;
            }
            .swiper-zoom-container > img,
            .swiper-zoom-container > svg,
            .swiper-zoom-container > canvas {
              max-width: 100%;
              max-height: 100%;
              -o-object-fit: contain;
              object-fit: contain;
            }
            .swiper-slide-zoomed {
              cursor: move;
            }
            /* Preloader */
            .swiper-lazy-preloader {
              width: 42px;
              height: 42px;
              position: absolute;
              left: 50%;
              top: 50%;
              margin-left: -21px;
              margin-top: -21px;
              z-index: 10;
              -webkit-transform-origin: 50%;
              -ms-transform-origin: 50%;
              transform-origin: 50%;
              -webkit-animation: swiper-preloader-spin 1s steps(12, end) infinite;
              animation: swiper-preloader-spin 1s steps(12, end) infinite;
            }
            .swiper-lazy-preloader:after {
              display: block;
              content: '';
              width: 100%;
              height: 100%;
              background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
              background-position: 50%;
              background-size: 100%;
              background-repeat: no-repeat;
            }
            .swiper-lazy-preloader-white:after {
              background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23fff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
            }
            @-webkit-keyframes swiper-preloader-spin {
              100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
              }
            }
            @keyframes swiper-preloader-spin {
              100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
              }
            }
            /* a11y */
            .swiper-container .swiper-notification {
              position: absolute;
              left: 0;
              top: 0;
              pointer-events: none;
              opacity: 0;
              z-index: -1000;
            }
            .swiper-container-fade.swiper-container-free-mode .swiper-slide {
              -webkit-transition-timing-function: ease-out;
              -o-transition-timing-function: ease-out;
              transition-timing-function: ease-out;
            }
            .swiper-container-fade .swiper-slide {
              pointer-events: none;
              -webkit-transition-property: opacity;
              -o-transition-property: opacity;
              transition-property: opacity;
            }
            .swiper-container-fade .swiper-slide .swiper-slide {
              pointer-events: none;
            }
            .swiper-container-fade .swiper-slide-active,
            .swiper-container-fade .swiper-slide-active .swiper-slide-active {
              pointer-events: auto;
            }
            .swiper-container-cube {
              overflow: visible;
            }
            .swiper-container-cube .swiper-slide {
              pointer-events: none;
              -webkit-backface-visibility: hidden;
              backface-visibility: hidden;
              z-index: 1;
              visibility: hidden;
              -webkit-transform-origin: 0 0;
              -ms-transform-origin: 0 0;
              transform-origin: 0 0;
              width: 100%;
              height: 100%;
            }
            .swiper-container-cube .swiper-slide .swiper-slide {
              pointer-events: none;
            }
            .swiper-container-cube.swiper-container-rtl .swiper-slide {
              -webkit-transform-origin: 100% 0;
              -ms-transform-origin: 100% 0;
              transform-origin: 100% 0;
            }
            .swiper-container-cube .swiper-slide-active,
            .swiper-container-cube .swiper-slide-active .swiper-slide-active {
              pointer-events: auto;
            }
            .swiper-container-cube .swiper-slide-active,
            .swiper-container-cube .swiper-slide-next,
            .swiper-container-cube .swiper-slide-prev,
            .swiper-container-cube .swiper-slide-next + .swiper-slide {
              pointer-events: auto;
              visibility: visible;
            }
            .swiper-container-cube .swiper-slide-shadow-top,
            .swiper-container-cube .swiper-slide-shadow-bottom,
            .swiper-container-cube .swiper-slide-shadow-left,
            .swiper-container-cube .swiper-slide-shadow-right {
              z-index: 0;
              -webkit-backface-visibility: hidden;
              backface-visibility: hidden;
            }
            .swiper-container-cube .swiper-cube-shadow {
              position: absolute;
              left: 0;
              bottom: 0px;
              width: 100%;
              height: 100%;
              background: #000;
              opacity: 0.6;
              -webkit-filter: blur(50px);
              filter: blur(50px);
              z-index: 0;
            }
            .swiper-container-flip {
              overflow: visible;
            }
            .swiper-container-flip .swiper-slide {
              pointer-events: none;
              -webkit-backface-visibility: hidden;
              backface-visibility: hidden;
              z-index: 1;
            }
            .swiper-container-flip .swiper-slide .swiper-slide {
              pointer-events: none;
            }
            .swiper-container-flip .swiper-slide-active,
            .swiper-container-flip .swiper-slide-active .swiper-slide-active {
              pointer-events: auto;
            }
            .swiper-container-flip .swiper-slide-shadow-top,
            .swiper-container-flip .swiper-slide-shadow-bottom,
            .swiper-container-flip .swiper-slide-shadow-left,
            .swiper-container-flip .swiper-slide-shadow-right {
              z-index: 0;
              -webkit-backface-visibility: hidden;
              backface-visibility: hidden;
            }
            .swiper-container-coverflow .swiper-wrapper {
              /* Windows 8 IE 10 fix */
              -ms-perspective: 1200px;
            }
            
            
        
            /**
             * rc-pagination
             * https://github.com/react-component/pagination
             */
        
            .rc-pagination {
              font-size: 12px;
              font-family: 'Arial';
              -webkit-user-select: none;
                 -moz-user-select: none;
                  -ms-user-select: none;
                      user-select: none;
              padding: 0;
            }
            .rc-pagination > li {
              list-style: none;
            }
            .rc-pagination-total-text {
              float: left;
              height: 30px;
              line-height: 30px;
              list-style: none;
              padding: 0;
              margin: 0 8px 0 0;
            }
            .rc-pagination:after {
              content: " ";
              display: block;
              height: 0;
              clear: both;
              overflow: hidden;
              visibility: hidden;
            }
            .rc-pagination-item {
              cursor: pointer;
              border-radius: 6px;
              min-width: 28px;
              height: 28px;
              line-height: 28px;
              text-align: center;
              list-style: none;
              float: left;
              border: 1px solid #d9d9d9;
              background-color: #fff;
              margin-right: 8px;
            }
            .rc-pagination-item a {
              text-decoration: none;
              color: #666;
            }
            .rc-pagination-item:hover {
              border-color: #2db7f5;
            }
            .rc-pagination-item:hover a {
              color: #2db7f5;
            }
            .rc-pagination-item-active {
              background-color: #2db7f5;
              border-color: #2db7f5;
            }
            .rc-pagination-item-active a {
              color: #fff;
            }
            .rc-pagination-item-active:hover a {
              color: #fff;
            }
            .rc-pagination-jump-prev:after,
            .rc-pagination-jump-next:after {
              content: "•••";
              display: block;
              letter-spacing: 2px;
              color: #ccc;
              font-size: 12px;
              margin-top: 1px;
            }
            .rc-pagination-jump-prev:hover:after,
            .rc-pagination-jump-next:hover:after {
              color: #2db7f5;
            }
            .rc-pagination-jump-prev:hover:after {
              content: "«";
            }
            .rc-pagination-jump-next:hover:after {
              content: "»";
            }
            .rc-pagination-prev,
            .rc-pagination-jump-prev,
            .rc-pagination-jump-next {
              margin-right: 8px;
            }
            .rc-pagination-prev,
            .rc-pagination-next,
            .rc-pagination-jump-prev,
            .rc-pagination-jump-next {
              cursor: pointer;
              color: #666;
              font-size: 10px;
              border-radius: 6px;
              list-style: none;
              min-width: 28px;
              height: 28px;
              line-height: 28px;
              float: left;
              text-align: center;
            }
            .rc-pagination-prev a:after {
              content: "‹";
              display: block;
            }
            .rc-pagination-next a:after {
              content: "›";
              display: block;
            }
            .rc-pagination-prev,
            .rc-pagination-next {
              border: 1px solid #d9d9d9;
              font-size: 18px;
            }
            .rc-pagination-prev a,
            .rc-pagination-next a {
              color: #666;
            }
            .rc-pagination-prev a:after,
            .rc-pagination-next a:after {
              margin-top: -1px;
            }
            .rc-pagination-disabled {
              cursor: not-allowed;
            }
            .rc-pagination-disabled a {
              color: #ccc;
            }
            .rc-pagination-options {
              float: left;
              margin-left: 15px;
            }
            .rc-pagination-options-size-changer {
              float: left;
              width: 80px;
            }
            .rc-pagination-options-quick-jumper {
              float: left;
              margin-left: 16px;
              height: 28px;
              line-height: 28px;
            }
            .rc-pagination-options-quick-jumper input {
              margin: 0 8px;
              box-sizing: border-box;
              background-color: #fff;
              border-radius: 6px;
              border: 1px solid #d9d9d9;
              outline: none;
              padding: 3px 12px;
              width: 50px;
              height: 28px;
            }
            .rc-pagination-options-quick-jumper input:hover {
              border-color: #2db7f5;
            }
            .rc-pagination-options-quick-jumper button {
              display: inline-block;
              margin: 0 8px;
              font-weight: 500;
              text-align: center;
              -ms-touch-action: manipulation;
                  touch-action: manipulation;
              cursor: pointer;
              background-image: none;
              border: 1px solid transparent;
              white-space: nowrap;
              padding: 0 15px;
              font-size: 12px;
              border-radius: 6px;
              height: 28px;
              -webkit-user-select: none;
                 -moz-user-select: none;
                  -ms-user-select: none;
                      user-select: none;
              transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
              position: relative;
              color: rgba(0, 0, 0, 0.65);
              background-color: #fff;
              border-color: #d9d9d9;
            }
            .rc-pagination-options-quick-jumper button:hover,
            .rc-pagination-options-quick-jumper button:active,
            .rc-pagination-options-quick-jumper button:focus {
              color: #2db7f5;
              background-color: #fff;
              border-color: #2db7f5;
            }
            .rc-pagination-simple .rc-pagination-prev,
            .rc-pagination-simple .rc-pagination-next {
              border: none;
              height: 24px;
              line-height: 24px;
              margin: 0;
              font-size: 18px;
            }
            .rc-pagination-simple .rc-pagination-simple-pager {
              float: left;
              margin-right: 8px;
              list-style: none;
            }
            .rc-pagination-simple .rc-pagination-simple-pager .rc-pagination-slash {
              margin: 0 10px;
            }
            .rc-pagination-simple .rc-pagination-simple-pager input {
              margin: 0 8px;
              box-sizing: border-box;
              background-color: #fff;
              border-radius: 6px;
              border: 1px solid #d9d9d9;
              outline: none;
              padding: 5px 8px;
              min-height: 20px;
            }
            .rc-pagination-simple .rc-pagination-simple-pager input:hover {
              border-color: #2db7f5;
            }
            .rc-pagination-simple .rc-pagination-simple-pager button {
              display: inline-block;
              margin: 0 8px;
              font-weight: 500;
              text-align: center;
              -ms-touch-action: manipulation;
                  touch-action: manipulation;
              cursor: pointer;
              background-image: none;
              border: 1px solid transparent;
              white-space: nowrap;
              padding: 0 8px;
              font-size: 12px;
              border-radius: 6px;
              height: 26px;
              -webkit-user-select: none;
                 -moz-user-select: none;
                  -ms-user-select: none;
                      user-select: none;
              transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
              position: relative;
              color: rgba(0, 0, 0, 0.65);
              background-color: #fff;
              border-color: #d9d9d9;
            }
            .rc-pagination-simple .rc-pagination-simple-pager button:hover,
            .rc-pagination-simple .rc-pagination-simple-pager button:active,
            .rc-pagination-simple .rc-pagination-simple-pager button:focus {
              color: #2db7f5;
              background-color: #fff;
              border-color: #2db7f5;
            }
            @media only screen and (max-width: 1024px) {
              .rc-pagination-item-after-jump-prev,
              .rc-pagination-item-before-jump-next {
                display: none;
              }
            }
            
            
            
            /**
             * react-modal-video
             * https://github.com/appleple/react-modal-video
             */
            @keyframes modal-video{from{opacity:0}to{opacity:1}}@keyframes modal-video-inner{from{transform:translate(0, 100px)}to{transform:translate(0, 0)}}.modal-video{position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.5);z-index:1000000;cursor:pointer;opacity:1;animation-timing-function:ease-out;animation-duration:.3s;animation-name:modal-video;-webkit-transition:opacity .3s ease-out;-moz-transition:opacity .3s ease-out;-ms-transition:opacity .3s ease-out;-o-transition:opacity .3s ease-out;transition:opacity .3s ease-out}.modal-video-effect-exit{opacity:0}.modal-video-effect-exit .modal-video-movie-wrap{-webkit-transform:translate(0, 100px);-moz-transform:translate(0, 100px);-ms-transform:translate(0, 100px);-o-transform:translate(0, 100px);transform:translate(0, 100px)}.modal-video-body{max-width:940px;width:100%;height:100%;margin:0 auto;display:table}.modal-video-inner{display:table-cell;vertical-align:middle;width:100%;height:100%}.modal-video-movie-wrap{width:100%;height:0;position:relative;padding-bottom:56.25%;background-color:#333;animation-timing-function:ease-out;animation-duration:.3s;animation-name:modal-video-inner;-webkit-transform:translate(0, 0);-moz-transform:translate(0, 0);-ms-transform:translate(0, 0);-o-transform:translate(0, 0);transform:translate(0, 0);-webkit-transition:-webkit-transform .3s ease-out;-moz-transition:-moz-transform .3s ease-out;-ms-transition:-ms-transform .3s ease-out;-o-transition:-o-transform .3s ease-out;transition:transform .3s ease-out}.modal-video-movie-wrap iframe{position:absolute;top:0;left:0;width:100%;height:100%}.modal-video-close-btn{position:absolute;z-index:2;top:-35px;right:-35px;display:inline-block;width:35px;height:35px;overflow:hidden;border:none;background:transparent}.modal-video-close-btn:before{transform:rotate(45deg)}.modal-video-close-btn:after{transform:rotate(-45deg)}.modal-video-close-btn:before,.modal-video-close-btn:after{content:'';position:absolute;height:2px;width:100%;top:50%;left:0;margin-top:-1px;background:#fff;border-radius:5px;margin-top:-6px}
            
              
              /* 画像下部の無駄な余白を消すために、img タグをブロック要素にする */
              img {
                  display: block;
              }
              
              body {
                background-color: #ecf0f1;
                word-wrap: break-word;
                font-family: -apple-system, BlinkMacSystemFont, "メイリオ", Meiryo, "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN", sans-serif;
                line-height: 1.8em;
              }
              
              /* Swiper 上書き */
              .swiper-pagination {
                pointer-events: none;
              }
          `}</style>
        </Head>
        
        {/* ヘッダー */}
        <Header />
        
        {/* ヘッダー - メインナビゲーション */}
        <HeaderNavMain
          headerNavMainArr={this.props.headerNavMainArr}
        />
        
        {/* コンテンツ */}
        {this.props.children}
        
        {/* フッター */}
        <Footer />
        
        {/* 画像・動画用のモーダルウィンドウ */}
        {/*<ModalImageVideo />*/}
        
        {/* 動画用のモーダルウィンドウ */}
        <ModalVideo
          channel={stores.layout.modalVideoChannel}
          isOpen={stores.layout.modalVideoOpen}
          videoId={stores.layout.modalVideoId}
          onClose={stores.layout.handleModalVideoClose}
        />
        
        {/* Snackbar 通知用 */}
        <Snackbar />
        
      </React.Fragment>
    );
    
  }
  
};