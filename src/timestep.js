// https://gafferongames.com/post/fix_your_timestep/
import * as THREE from 'three'

let clock = new THREE.Clock()

let accum = 0
const dt = 0.01

export default (cb, render) => () => {
  accum += clock.getDelta()

  while (accum >= dt) {
    cb()
    accum -= dt
  }

  if (render) render()
}
