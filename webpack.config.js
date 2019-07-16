const fs = require('fs')
const path = require('path')
const UglifyPlugin = require('uglify-es-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackDeletePlugin = require('webpack-delete-plugin')
const node_modules = fs.readdirSync('node_modules').filter(function(x) { return x !== '.bin' })

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  mode: 'production',
  entry: {
    'vue-rmh-components': './index.js',
    'main': './main.styl'
  },
  output: {
    filename: './[name].js',
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
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: require('./eslint-formatter.js')
          }
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            extractCSS: process.env.NODE_ENV === 'production',
            loaders: {
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
              scss: 'vue-style-loader!css-loader!sass-loader',
              stylus: 'vue-style-loader!css-loader!stylus-loader'
            }
          }
        }
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /main.styl$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
                plugins: (loader) => [
                  require('postcss-smart-import'),
                  require('autoprefixer'),
                ]
              }
            },
            'stylus-loader'
          ]
        })
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new UglifyPlugin( {
      sourceMap : false,
      mangle: true
    }),
    new ExtractTextPlugin({
      filename: './[name].min.css',
      allChunks: true
    }),
    new WebpackDeletePlugin(['./main.js'])
  ]
}
