require('../mockBrowser')
const config = require('./config')

class PhaserGame extends Phaser.Game {
  constructor() {
    super(config)
  }
}

module.exports = PhaserGame
