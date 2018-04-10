// --------------------------------------------------
//   Webpack Configuration Ver.4
//   公式解説: https://webpack.js.org/configuration/
// --------------------------------------------------

const webpack = require('webpack');
const path = require('path');

module.exports = {
  
  // モード（Ver.4から）: 'production' | 'development' | 'none'
  // package.jsonのscriptsでモードを指定しているので、ここで指定する必要はありません。
  mode: 'development',
  
  // エントリーポイント
  entry: './views/entry.jsx',
  
  // 出力の設定
  output: {
    
    // 出力先のパス（Ver.2以降は絶対パスを指定する必要があります）
    path: path.join(__dirname, 'public/js'),
    
    // 出力するファイル名
    filename: 'bundle.js',
    
  },
  
  // モジュールの設定
  module: {
    rules: [
      
      // JSX
      {
        test: /\.jsx$/,
        exclude: [
          path.resolve(__dirname, '/node_modules/')
        ],
        loader: 'babel-loader'
      },
      
      // CSS
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      }
      
    ]
  },
  
  resolve: {
    extensions: ['.js', '.json', '.jsx', 'css']
  },
  
  // プラグイン
  plugins: [
    
    new webpack.ProvidePlugin({
      Promise: 'es6-promise-promise'
    }),
    
    // new webpack.ContextReplacementPlugin(
    //   /moment[/\\]locale$/, /ja/
    // ),
    
  ],
  
  // ソースマップを出力する
  devtool: 'source-map',
  
};