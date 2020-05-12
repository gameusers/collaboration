// --------------------------------------------------
//   Require
// --------------------------------------------------

// require('dotenv').config();
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
  
  // env: {
    
    
  //   // NEXT_PUBLIC_VERIFY_RECAPTCHA: process.env.NEXT_PUBLIC_VERIFY_RECAPTCHA,
  //   // NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    
    
  //   // NEXT_PUBLIC_ID_INSERT_LIMIT: parseInt(process.env.NEXT_PUBLIC_ID_INSERT_LIMIT, 10),
  //   // NEXT_PUBLIC_UPLOAD_IMAGE_SIZE_UPPER_LIMIT: parseInt(process.env.NEXT_PUBLIC_UPLOAD_IMAGE_SIZE_UPPER_LIMIT, 10),
  //   // NEXT_PUBLIC_FOLLOWERS_LIMIT: parseInt(process.env.NEXT_PUBLIC_FOLLOWERS_LIMIT, 10),
  //   // NEXT_PUBLIC_FOLLOWERS_RELOAD_MINUTES: parseInt(process.env.NEXT_PUBLIC_FOLLOWERS_RELOAD_MINUTES, 10),
    
    
  //   // NEXT_PUBLIC_CARD_PLAYER_HOBBY_LIMIT: parseInt(process.env.NEXT_PUBLIC_CARD_PLAYER_HOBBY_LIMIT, 10),
  //   // NEXT_PUBLIC_CARD_PLAYER_SPECIAL_SKILL_LIMIT: parseInt(process.env.NEXT_PUBLIC_CARD_PLAYER_SPECIAL_SKILL_LIMIT, 10),
  //   // NEXT_PUBLIC_CARD_PLAYER_ACTIVITY_TIME_LIMIT: parseInt(process.env.NEXT_PUBLIC_CARD_PLAYER_ACTIVITY_TIME_LIMIT, 10),
  //   // NEXT_PUBLIC_CARD_PLAYER_LINK_LIMIT: parseInt(process.env.NEXT_PUBLIC_CARD_PLAYER_LINK_LIMIT, 10),
    
    
  //   // NEXT_PUBLIC_COMMUNITY_MEMBER_LIMIT: parseInt(process.env.NEXT_PUBLIC_COMMUNITY_MEMBER_LIMIT, 10),
  //   // NEXT_PUBLIC_COMMUNITY_MEMBER_RELOAD_MINUTES: parseInt(process.env.NEXT_PUBLIC_COMMUNITY_MEMBER_RELOAD_MINUTES, 10),
  //   // NEXT_PUBLIC_COMMUNITY_ADDITIONAL_GAME_LIMIT: parseInt(process.env.NEXT_PUBLIC_COMMUNITY_ADDITIONAL_GAME_LIMIT, 10),
    
    
  //   // NEXT_PUBLIC_FORUM_THREAD_LIST_LIMIT: parseInt(process.env.NEXT_PUBLIC_FORUM_THREAD_LIST_LIMIT, 10),
  //   // NEXT_PUBLIC_FORUM_THREAD_LIMIT: parseInt(process.env.NEXT_PUBLIC_FORUM_THREAD_LIMIT, 10),
  //   // NEXT_PUBLIC_FORUM_COMMENT_LIMIT: parseInt(process.env.NEXT_PUBLIC_FORUM_COMMENT_LIMIT, 10),
  //   // NEXT_PUBLIC_FORUM_REPLY_LIMIT: parseInt(process.env.NEXT_PUBLIC_FORUM_REPLY_LIMIT, 10),
    
  //   // NEXT_PUBLIC_FORUM_THREAD_IMAGES_AND_VIDEOS_LIMIT: parseInt(process.env.NEXT_PUBLIC_FORUM_THREAD_IMAGES_AND_VIDEOS_LIMIT, 10),
  //   // NEXT_PUBLIC_FORUM_COMMENT_IMAGES_AND_VIDEOS_LIMIT: parseInt(process.env.NEXT_PUBLIC_FORUM_COMMENT_IMAGES_AND_VIDEOS_LIMIT, 10),
  //   // NEXT_PUBLIC_FORUM_REPLY_IMAGES_AND_VIDEOS_LIMIT: parseInt(process.env.NEXT_PUBLIC_FORUM_REPLY_IMAGES_AND_VIDEOS_LIMIT, 10),
    
  //   // NEXT_PUBLIC_FORUM_RELOAD_MINUTES: parseInt(process.env.NEXT_PUBLIC_FORUM_RELOAD_MINUTES, 10),
    
    
  //   // NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT: parseInt(process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_LIMIT, 10),
  //   // NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT: parseInt(process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_LIMIT, 10),
  //   // NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT: parseInt(process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_LIMIT, 10),
    
  //   // NEXT_PUBLIC_RECRUITMENT_THREAD_IMAGES_AND_VIDEOS_LIMIT: parseInt(process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_IMAGES_AND_VIDEOS_LIMIT, 10),
  //   // NEXT_PUBLIC_RECRUITMENT_COMMENT_IMAGES_AND_VIDEOS_LIMIT: parseInt(process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_IMAGES_AND_VIDEOS_LIMIT, 10),
  //   // NEXT_PUBLIC_RECRUITMENT_REPLY_IMAGES_AND_VIDEOS_LIMIT: parseInt(process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_IMAGES_AND_VIDEOS_LIMIT, 10),
    
  //   // NEXT_PUBLIC_RECRUITMENT_RELOAD_MINUTES: parseInt(process.env.NEXT_PUBLIC_RECRUITMENT_RELOAD_MINUTES, 10),
    
  //   // NEXT_PUBLIC_RECRUITMENT_THREAD_HARDWARES_LIMIT: parseInt(process.env.NEXT_PUBLIC_RECRUITMENT_THREAD_HARDWARES_LIMIT, 10),
  //   // NEXT_PUBLIC_NEXT_PUBLIC_RECRUITMENT_SEARCH_HARDWARES_LIMIT: parseInt(process.env.NEXT_PUBLIC_NEXT_PUBLIC_RECRUITMENT_SEARCH_HARDWARES_LIMIT, 10),
    
    
  //   // NEXT_PUBLIC_EXP_GOOD_BUTTON: parseInt(process.env.NEXT_PUBLIC_EXP_GOOD_BUTTON, 10),
  //   // NEXT_PUBLIC_EXP_GOOD_BUTTON_LOGIN_USER: parseInt(process.env.NEXT_PUBLIC_EXP_GOOD_BUTTON_LOGIN_USER, 10),
    
    
  //   // NEXT_PUBLIC_URL_BASE: process.env.NEXT_PUBLIC_URL_BASE,
  //   // NEXT_PUBLIC_URL_API: process.env.NEXT_PUBLIC_URL_API,
    
  //   NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY,
    
    
  // }
  
  
});