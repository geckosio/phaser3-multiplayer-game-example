import { config } from './config.js'

export class PhaserGame extends Phaser.Game {
  constructor(server) {
    super(config)
    this.server = server
  }
}
