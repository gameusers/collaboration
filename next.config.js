const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  publicRuntimeConfig: {
    environment: process.env.NODE_ENV,
    recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
    verifyRecaptcha: process.env.VERIFY_RECAPTCHA,
    urlBase: process.env.URL_BASE,
    urlApi: process.env.URL_API
  }
});