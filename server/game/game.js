const config = require('./config')

class PhaserGame extends Phaser.Game {
  constructor(server) {
    super(config)
    this.server = server
  }
}

module.exports = PhaserGame
