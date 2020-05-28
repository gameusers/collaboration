// --------------------------------------------------
//   Require
// --------------------------------------------------

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
  
  
});