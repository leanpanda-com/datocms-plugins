const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require(
  'html-webpack-include-assets-plugin'
)

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  mode: process.env.NODE_ENV,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './',
    disableHostCheck: true,
    https: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loader: 'eslint-loader',
        enforce: 'pre',
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {loader: 'babel-loader'}
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {}
        }
      },
    ],
  },
  resolve: {extensions: ['.js', '.jsx']},
  plugins: [
    new HtmlWebpackPlugin({
      title: 'DatoCMS plugin',
      minify: isProduction,
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      append: false,
      publicPath: '',
      assets: [
        'https://unpkg.com/datocms-plugins-sdk@0.0.6/dist/sdk.js',
        'https://unpkg.com/datocms-plugins-sdk@0.0.6/dist/sdk.css',
      ]
    }),
  ].filter(Boolean),
}
