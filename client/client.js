/// <reference path="../phaser.d.ts" />

import '@babel/polyfill'

import Phaser, { Game } from 'phaser'
import BootScene from './scenes/bootScene'
import GameScene from './scenes/gameScene'
import FullScreenEvent from './components/fullscreenEvent'

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 896,
    height: 504
  },
  scene: [BootScene, GameScene]
}

window.addEventListener('load', () => {
  const game = new Game(config)
  FullScreenEvent(() => resize(game))
})
