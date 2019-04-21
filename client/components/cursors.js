export default class Cursors {
  constructor(scene, channel) {
    this.channel = channel
    this.cursors = scene.input.keyboard.createCursorKeys()

    scene.events.on('update', this.update, this)
  }

  update() {
    let move = {
      left: false,
      right: false,
      up: false,
      none: true
    }
    if (this.cursors.left.isDown) {
      move.left = true
      move.none = false
    } else if (this.cursors.right.isDown) {
      move.right = true
      move.none = false
    }

    if (this.cursors.up.isDown) {
      move.up = true
      move.none = false
    }

    if (
      move.left ||
      move.right ||
      move.up ||
      move.none !== this.prevNoMovement
    ) {
      let total = 0
      if (move.left) total += 1
      if (move.right) total += 2
      if (move.up) total += 4
      let str36 = total.toString(36)

      this.channel.emit('playerMove', str36)
    }

    this.prevNoMovement = move.none
  }
}
