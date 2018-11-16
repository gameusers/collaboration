module.exports = {
  publicRuntimeConfig: {
    environment: process.env.NODE_ENV,
    recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
    verifyRecaptcha: process.env.VERIFY_RECAPTCHA,
    apiUrl: process.env.API_URL
  }
};