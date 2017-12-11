import * as THREE from 'three'
import Keyboard from 'game-keyboard'
import keyMap from 'game-keyboard/key_map'
import {movePlayer, setAnimation} from '../actions/players'
import {lookAt} from '../actions/camera'

const SPEED = 0.05

export default (index, store) => {
  const keyboard = new Keyboard(keyMap['US'])

  return {
    update: () => {
      let dir = new THREE.Vector2(0, 0, 0)

      if (keyboard.isPressed('up')) dir.y -= 1
      if (keyboard.isPressed('down')) dir.y += 1
      if (keyboard.isPressed('left')) dir.x -= 1
      if (keyboard.isPressed('right')) dir.x += 1

      if (dir.lengthSq() > 0) {
        let player = store.getState().players[index]

        dir.normalize().multiplyScalar(SPEED)

        store.dispatch(movePlayer(index, dir))
        store.dispatch(lookAt(player.pos.clone()))
        store.dispatch(setAnimation(index, 'running'))
      } else {
        store.dispatch(setAnimation(index, 'idle'))
      }
    }
  }
}
