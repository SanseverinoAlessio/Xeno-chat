const path = require('path')
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');

module.exports =  {
mode: 'production',
entry: {
  app: path.resolve(__dirname , './Server/app.js')
  },
output: {
  path: path.resolve(__dirname, './Server/dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'node',
  node: {
      __dirname: false,
      __filename: false,
    },
  externals: [nodeExternals()],

  plugins: [
      new Dotenv(
{
  path: path.resolve(__dirname,'./Server/process.env')
}),
new webpack.DefinePlugin({
'process.env.Mode': JSON.stringify('production')
}),



],




}
