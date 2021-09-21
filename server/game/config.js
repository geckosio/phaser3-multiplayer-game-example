import '@geckos.io/phaser-on-nodejs'

import Phaser from 'phaser'
import { GameScene } from './gameScene.js'

export const config = {
  type: Phaser.HEADLESS,
  parent: 'phaser-game',
  width: 896,
  height: 504,
  banner: false,
  audio: false,
  scene: [GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1200 }
    }
  }
}
