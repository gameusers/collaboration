const withCSS = require('@zeit/next-css');
const webpack = require('webpack');

module.exports = withCSS({
  
  // https://github.com/oliver-moran/jimp/tree/master/packages/jimp
  webpack: (config, options) => {
    config.plugins.push(new webpack.DefinePlugin({
      'process.browser': 'true'
    }));
    return config;
  },
  
  // https://github.com/zeit/next-plugins/tree/master/packages/next-css
  // cssModules: true,
  
  // https://github.com/zeit/next.js#exposing-configuration-to-the-server--client-side
  env: {
    
    ENVIRONMENT: process.env.NODE_ENV,
    VERIFY_RECAPTCHA: process.env.VERIFY_RECAPTCHA,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    
    
    ID_INSERT_LIMIT: process.env.ID_INSERT_LIMIT,
    UPLOAD_IMAGE_SIZE_UPPER_LIMIT: process.env.UPLOAD_IMAGE_SIZE_UPPER_LIMIT,
    
    
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
    
    
    URL_BASE: process.env.URL_BASE,
    URL_API: process.env.URL_API,
    
  }
  
});