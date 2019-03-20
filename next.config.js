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
  publicRuntimeConfig: {
    environment: process.env.NODE_ENV,
    recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
    verifyRecaptcha: process.env.VERIFY_RECAPTCHA,
    urlBase: process.env.URL_BASE,
    urlApi: process.env.URL_API
  },
  env: {
    ENVIRONMENT: process.env.NODE_ENV,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    VERIFY_RECAPTCHA: process.env.VERIFY_RECAPTCHA,
    URL_BASE: process.env.URL_BASE,
    URL_API: process.env.URL_API,
    UPLOAD_IMAGE_SIZE_UPPER_LIMIT: process.env.UPLOAD_IMAGE_SIZE_UPPER_LIMIT
  }
});