import * as THREE from 'three'

export default (state = {
  walls: [
    { a: new THREE.Vector2(2, 0), b: new THREE.Vector2(4, 4) },
    { a: new THREE.Vector2(4, 4), b: new THREE.Vector2(4, 10) },
    { a: new THREE.Vector2(4, 10), b: new THREE.Vector2(-4, 10) }
  ]
}, {type}) => {
  return state
}
