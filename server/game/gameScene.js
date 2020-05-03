const geckos = require('@geckos.io/server').default
const { iceServers } = require('@geckos.io/server')

const { Scene } = require('phaser')
const Player = require('./components/player')

class GameScene extends Scene {
  constructor() {
    super({ key: 'GameScene' })
    this.playerId = 0
  }

  init() {
    this.io = geckos({
      iceServers: process.env.NODE_ENV === 'production' ? iceServers : [],
    })
    this.io.addServer(this.game.server)
  }

  getId() {
    return this.playerId++
  }

  prepareToSync(player) {
    return `${player.playerId},${Math.round(player.x).toString(
      36
    )},${Math.round(player.y).toString(36)},${player.dead === true ? 1 : 0},`
  }

  getState() {
    let state = ''
    this.playersGroup.children.iterate((player) => {
      state += this.prepareToSync(player)
    })
    return state
  }

  create() {
    this.playersGroup = this.add.group()

    const addDummy = () => {
      let x = Phaser.Math.RND.integerInRange(50, 800)
      let y = Phaser.Math.RND.integerInRange(100, 400)
      let id = Math.random()

      let dead = this.playersGroup.getFirstDead()
      if (dead) {
        dead.revive(id, true)
        dead.setPosition(x, y)
      } else {
        this.playersGroup.add(new Player(this, id, x, y, true))
      }
    }

    this.io.onConnection((channel) => {
      channel.onDisconnect(() => {
        console.log('Disconnect user ' + channel.id)
        this.playersGroup.children.each((player) => {
          if (player.playerId === channel.playerId) {
            player.kill()
          }
        })
        channel.room.emit('removePlayer', channel.playerId)
      })

      channel.on('addDummy', addDummy)

      channel.on('getId', () => {
        channel.playerId = this.getId()
        channel.emit('getId', channel.playerId.toString(36))
      })

      channel.on('playerMove', (data) => {
        this.playersGroup.children.iterate((player) => {
          if (player.playerId === channel.playerId) {
            player.setMove(data)
          }
        })
      })

      channel.on('addPlayer', (data) => {
        let dead = this.playersGroup.getFirstDead()
        if (dead) {
          dead.revive(channel.playerId, false)
        } else {
          this.playersGroup.add(
            new Player(
              this,
              channel.playerId,
              Phaser.Math.RND.integerInRange(100, 700)
            )
          )
        }
      })

      channel.emit('ready')
    })
  }

  update() {
    let updates = ''
    this.playersGroup.children.iterate((player) => {
      let x = Math.abs(player.x - player.prevX) > 0.5
      let y = Math.abs(player.y - player.prevY) > 0.5
      let dead = player.dead != player.prevDead
      if (x || y || dead) {
        if (dead || !player.dead) {
          updates += this.prepareToSync(player)
        }
      }
      player.postUpdate()
    })

    if (updates.length > 0) {
      this.io.room().emit('updateObjects', [updates])
    }
  }
}

module.exports = GameScene
