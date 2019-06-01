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
    URL_BASE: process.env.URL_BASE,
    URL_API: process.env.URL_API,
    UPLOAD_IMAGE_SIZE_UPPER_LIMIT: process.env.UPLOAD_IMAGE_SIZE_UPPER_LIMIT
  }
  
});