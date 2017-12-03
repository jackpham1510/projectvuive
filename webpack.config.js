const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractPlugin = new ExtractTextPlugin({
  filename: 'css/[name].css',
  allChunks: true,
})

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'public': path.resolve(__dirname, 'public')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: path.resolve(__dirname, 'public/img'),
              publicPath: 'public/img'
            }
          },
          {
            loader: 'url-loader',
          }
        ]
      },
      {
        test: /\.styl$/,
        use: extractPlugin.extract({
          use: ['css-loader', 'stylus-loader']
        })
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: extractPlugin.extract({
          use: ['css-loader']
        })
      }
    ]
  },
  plugins: [
    extractPlugin,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
