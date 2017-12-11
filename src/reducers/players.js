import * as THREE from 'three'
import { moveFromWalls } from '../helpers/player'
import store from '../store'

export default (state = [
  {
    pos: new THREE.Vector3(0, 0, 0),
    pos2: new THREE.Vector2(0, 0),
    dir: new THREE.Vector2(1, 0),
    rot: new THREE.Euler(),
    animation: 'idle'
  }
], {type, index, move, animation}) => {
  switch (type) {
    case 'MOVE_PLAYER':
      return state.map((p, i) => {
        if (i === index) {
          let pos2 = p.pos2.clone().add(move)
          let dir = new THREE.Vector2(move.x, move.y).normalize()
          let rot = new THREE.Euler()
            .setFromVector3(new THREE.Vector3(0, Math.PI / 2 - dir.angle(), 0))

          // TODO: Do this check elsewhere?
          let walls = store.getState().map.walls
          if (walls) {
            let radius = 0.45
            moveFromWalls(pos2, radius, walls)
          }

          let pos = new THREE.Vector3(pos2.x, p.pos.y, pos2.y)

          return { ...p, pos2, pos, dir, rot }
        }
        return p
      })

    case 'SET_ANIMATION':
      return state.map((p, i) => (
        i === index
        ? { ...p, animation }
        : p
    ))
  }
  return state
}
