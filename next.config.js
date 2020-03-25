// --------------------------------------------------
//   Require
// --------------------------------------------------

require('dotenv').config();
const webpack = require('webpack');
const withOffline = require('next-offline');


// --------------------------------------------------
//   module.exports
// --------------------------------------------------

module.exports = withOffline({
  
  
  // --------------------------------------------------
  //   Webpack Config
  // --------------------------------------------------
  
  webpack: (config, options) => {
    
    
    // --------------------------------------------------
    //   https://github.com/oliver-moran/jimp/tree/master/packages/jimp
    // --------------------------------------------------
    
    config.plugins.push(new webpack.DefinePlugin({
      'process.browser': 'true'
    }));
    
    // config.optimization.minimize = false;
    
    return config;
    
    
  },
  
  
  
  
  // --------------------------------------------------
  //   next-offline / Using workbox
  //   https://github.com/hanford/next-offline
  // --------------------------------------------------
  
  dontAutoRegisterSw: true,
  
  workboxOpts: {
    swDest: 'public/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  
  
  
  
  // --------------------------------------------------
  //   Environment Variables
  //   https://nextjs.org/docs/api-reference/next.config.js/environment-variables
  // --------------------------------------------------
  
  env: {
    
    VERIFY_RECAPTCHA: process.env.VERIFY_RECAPTCHA,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    
    
    ID_INSERT_LIMIT: process.env.ID_INSERT_LIMIT,
    UPLOAD_IMAGE_SIZE_UPPER_LIMIT: process.env.UPLOAD_IMAGE_SIZE_UPPER_LIMIT,
    FOLLOWERS_LIMIT: process.env.FOLLOWERS_LIMIT,
    FOLLOWERS_RELOAD_MINUTES: process.env.FOLLOWERS_RELOAD_MINUTES,
    
    
    CARD_PLAYER_HOBBY_LIMIT: process.env.CARD_PLAYER_HOBBY_LIMIT,
    CARD_PLAYER_SPECIAL_SKILL_LIMIT: process.env.CARD_PLAYER_SPECIAL_SKILL_LIMIT,
    CARD_PLAYER_ACTIVITY_TIME_LIMIT: process.env.CARD_PLAYER_ACTIVITY_TIME_LIMIT,
    CARD_PLAYER_LINK_LIMIT: process.env.CARD_PLAYER_LINK_LIMIT,
    
    
    COMMUNITY_MEMBER_LIMIT: process.env.COMMUNITY_MEMBER_LIMIT,
    COMMUNITY_MEMBER_RELOAD_MINUTES: process.env.COMMUNITY_MEMBER_RELOAD_MINUTES,
    COMMUNITY_ADDITIONAL_GAME_LIMIT: process.env.COMMUNITY_ADDITIONAL_GAME_LIMIT,
    
    
    FORUM_THREAD_LIST_LIMIT: process.env.FORUM_THREAD_LIST_LIMIT,
    FORUM_THREAD_LIMIT: process.env.FORUM_THREAD_LIMIT,
    FORUM_COMMENT_LIMIT: process.env.FORUM_COMMENT_LIMIT,
    FORUM_REPLY_LIMIT: process.env.FORUM_REPLY_LIMIT,
    
    FORUM_THREAD_IMAGES_AND_VIDEOS_LIMIT: process.env.FORUM_THREAD_IMAGES_AND_VIDEOS_LIMIT,
    FORUM_COMMENT_IMAGES_AND_VIDEOS_LIMIT: process.env.FORUM_COMMENT_IMAGES_AND_VIDEOS_LIMIT,
    FORUM_REPLY_IMAGES_AND_VIDEOS_LIMIT: process.env.FORUM_REPLY_IMAGES_AND_VIDEOS_LIMIT,
    
    FORUM_RELOAD_MINUTES: process.env.FORUM_RELOAD_MINUTES,
    
    
    EXP_GOOD_BUTTON: process.env.EXP_GOOD_BUTTON,
    EXP_GOOD_BUTTON_LOGIN_USER: process.env.EXP_GOOD_BUTTON_LOGIN_USER,
    
    
    URL_BASE: process.env.URL_BASE,
    URL_API: process.env.URL_API,
    
    WEB_PUSH_VAPID_PUBLIC_KEY: process.env.WEB_PUSH_VAPID_PUBLIC_KEY,
    
  }
  
  
});