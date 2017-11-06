require('dotenv').config();

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

const options = {
  devTool: 'source-map',
  uglify: {}
}

if (process.env.NODE_ENV === 'production') {
  options.devTool = '';
  options.uglify = {
    compress: { warnings: false }
  }
}


module.exports = {
  entry: {
    main: './client/index.js'
  },
  output: {
    filename: './client/static/bundle.js'
  },
  watch: true,
  devtool: options.devTool,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.(scss|css)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: 65,
              },
              webp: {
                quality: 75
              }
            }
          },
        ],
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./client/styles/main.css', {
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new webpack.optimize.UglifyJsPlugin(options.uglify)
  ]
}
