const webpack = require('webpack')
const path = require('path')
const UglifyPlugin = require('uglify-es-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackDeletePlugin = require('webpack-delete-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: {
    'vue-rmh-components': './index.js',
    'main': './main.styl'
  },
  output: {
    filename: 'dist/[name].js',
    libraryTarget: 'umd',
    library: 'vue-rmh-components',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.styl'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'styles': resolve('src/styles')
    }
  },
  externals: {
    'Vue': 'vue',
    'moment': 'moment'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
            /node_modules\/(?!ing-).*/
        ]
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /main.styl$/,
        loader: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: { minimize: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: (loader) => [
                require('postcss-smart-import'),
                require('autoprefixer'),
              ]
            }
          },
          { loader: 'stylus-loader' }]
        })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new UglifyPlugin( {
      sourceMap : false,
      mangle: true
    }),
    new ExtractTextPlugin({
      filename: 'dist/[name].min.css',
      allChunks: true
    }),
    new WebpackDeletePlugin(['./dist/main.js'])
  ]
}
