const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.ts'
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'online-store',
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  module:{
    rules: [
      {
        test:/\.css$/,
        use: ['style-loader', 'css-loader',]
      },
      {
        test:/\.s[ac]ss$/,
        use: ['style-loader', 'css-loader',  'sass-loader']
      },
      {
        test:/\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      }
    ]
  }
}