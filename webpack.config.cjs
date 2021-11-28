const path = require('path')

module.exports = {
  mode: 'development',
  entry: './client/client.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client')
  }
}
