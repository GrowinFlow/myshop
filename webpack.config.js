const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output bundle file name
    publicPath: '/', // Public URL path
  },
  module: {
    rules: [
      // Handle JavaScript/JSX files with babel-loader
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // Handle CSS files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Handle image files
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions
  },
  plugins: [
    // Generate index.html with injected bundle.js
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    // Define environment variables from .env file
    new Dotenv(),
    // Define global constants
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Serve content from this directory
    compress: true, // Enable gzip compression
    port: 3000, // Port number
    historyApiFallback: true, // Enable history API fallback
  },
};
