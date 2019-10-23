const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLplugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'devlopment';

const config = {
  target:'web',
  entry: path.join(__dirname,"src/index.js"),
  output:{
    filename:"bundle.js",
    path:path.join(__dirname,"dist")
  },
  module:{
    rules:[{
      test:/\.vue$/,
      loader:'vue-loader'
    },
    {
      test:/\.jsx$/,
      loader:'babel-loader'
    },
    {
      test: /\.styl(us)?$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader:'postcss-loader',
          options:{
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    },
    {
      test:/\.(gif|jpg|jpeg|png|svg)$/,
      use:[
        {
          loader:'url-loader',
          options:{
            limit:1024,
            name:'[name].[ext]'
          }
        }
      ]
    },
    {
      test: /\.css$/,
      use: [
        'vue-style-loader',
        'css-loader'
      ]
    }]
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: isDev ? '"development"':'"production"'
      }
    }),
    new HTMLplugin()
  ]
}

if(isDev){
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port:"8080",
    host:'0.0.0.0', //设置成0.0.0.0 可以通过ip来访问
    overlay:{
      errors:true,   //显示错误
    },
    hot:true,
    open:true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
    )
}
module.exports = config