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
    
    
    ID_INSERT_LIMIT: parseInt(process.env.ID_INSERT_LIMIT, 10),
    UPLOAD_IMAGE_SIZE_UPPER_LIMIT: parseInt(process.env.UPLOAD_IMAGE_SIZE_UPPER_LIMIT, 10),
    FOLLOWERS_LIMIT: parseInt(process.env.FOLLOWERS_LIMIT, 10),
    FOLLOWERS_RELOAD_MINUTES: parseInt(process.env.FOLLOWERS_RELOAD_MINUTES, 10),
    
    
    CARD_PLAYER_HOBBY_LIMIT: parseInt(process.env.CARD_PLAYER_HOBBY_LIMIT, 10),
    CARD_PLAYER_SPECIAL_SKILL_LIMIT: parseInt(process.env.CARD_PLAYER_SPECIAL_SKILL_LIMIT, 10),
    CARD_PLAYER_ACTIVITY_TIME_LIMIT: parseInt(process.env.CARD_PLAYER_ACTIVITY_TIME_LIMIT, 10),
    CARD_PLAYER_LINK_LIMIT: parseInt(process.env.CARD_PLAYER_LINK_LIMIT, 10),
    
    
    COMMUNITY_MEMBER_LIMIT: parseInt(process.env.COMMUNITY_MEMBER_LIMIT, 10),
    COMMUNITY_MEMBER_RELOAD_MINUTES: parseInt(process.env.COMMUNITY_MEMBER_RELOAD_MINUTES, 10),
    COMMUNITY_ADDITIONAL_GAME_LIMIT: parseInt(process.env.COMMUNITY_ADDITIONAL_GAME_LIMIT, 10),
    
    
    FORUM_THREAD_LIST_LIMIT: parseInt(process.env.FORUM_THREAD_LIST_LIMIT, 10),
    FORUM_THREAD_LIMIT: parseInt(process.env.FORUM_THREAD_LIMIT, 10),
    FORUM_COMMENT_LIMIT: parseInt(process.env.FORUM_COMMENT_LIMIT, 10),
    FORUM_REPLY_LIMIT: parseInt(process.env.FORUM_REPLY_LIMIT, 10),
    
    FORUM_THREAD_IMAGES_AND_VIDEOS_LIMIT: parseInt(process.env.FORUM_THREAD_IMAGES_AND_VIDEOS_LIMIT, 10),
    FORUM_COMMENT_IMAGES_AND_VIDEOS_LIMIT: parseInt(process.env.FORUM_COMMENT_IMAGES_AND_VIDEOS_LIMIT, 10),
    FORUM_REPLY_IMAGES_AND_VIDEOS_LIMIT: parseInt(process.env.FORUM_REPLY_IMAGES_AND_VIDEOS_LIMIT, 10),
    
    FORUM_RELOAD_MINUTES: parseInt(process.env.FORUM_RELOAD_MINUTES, 10),
    
    
    RECRUITMENT_THREAD_LIMIT: parseInt(process.env.RECRUITMENT_THREAD_LIMIT, 10),
    RECRUITMENT_COMMENT_LIMIT: parseInt(process.env.RECRUITMENT_COMMENT_LIMIT, 10),
    RECRUITMENT_REPLY_LIMIT: parseInt(process.env.RECRUITMENT_REPLY_LIMIT, 10),
    
    RECRUITMENT_THREAD_IMAGES_AND_VIDEOS_LIMIT: parseInt(process.env.RECRUITMENT_THREAD_IMAGES_AND_VIDEOS_LIMIT, 10),
    RECRUITMENT_COMMENT_IMAGES_AND_VIDEOS_LIMIT: parseInt(process.env.RECRUITMENT_COMMENT_IMAGES_AND_VIDEOS_LIMIT, 10),
    RECRUITMENT_REPLY_IMAGES_AND_VIDEOS_LIMIT: parseInt(process.env.RECRUITMENT_REPLY_IMAGES_AND_VIDEOS_LIMIT, 10),
    
    RECRUITMENT_RELOAD_MINUTES: parseInt(process.env.RECRUITMENT_RELOAD_MINUTES, 10),
    
    RECRUITMENT_THREAD_HARDWARES_LIMIT: parseInt(process.env.RECRUITMENT_THREAD_HARDWARES_LIMIT, 10),
    RECRUITMENT_SEARCH_HARDWARES_LIMIT: parseInt(process.env.RECRUITMENT_SEARCH_HARDWARES_LIMIT, 10),
    
    
    EXP_GOOD_BUTTON: parseInt(process.env.EXP_GOOD_BUTTON, 10),
    EXP_GOOD_BUTTON_LOGIN_USER: parseInt(process.env.EXP_GOOD_BUTTON_LOGIN_USER, 10),
    
    
    URL_BASE: process.env.URL_BASE,
    URL_API: process.env.URL_API,
    
    WEB_PUSH_VAPID_PUBLIC_KEY: process.env.WEB_PUSH_VAPID_PUBLIC_KEY,
    
    
  }
  
  
});