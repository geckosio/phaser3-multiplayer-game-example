const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  stats: 'minimal',
  entry: './client/client.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client')
  }
}
