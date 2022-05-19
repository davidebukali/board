const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      { test: /\.(tsx)$/, loader: 'ts-loader' },
      {
        test: /\.(css)$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.ts', '.tsx'],
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
  },
  devServer: {
    static: path.resolve(__dirname, './public'),
  },
};
