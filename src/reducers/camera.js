import * as THREE from 'three'

const cameraOffset = new THREE.Vector3(0, 8, 5)

export default (state = {
  pos: cameraOffset.clone(),
  lookAt: new THREE.Vector3(0, 0, 0)
}, {type, pos}) => {
  switch (type) {
    case 'LOOK_AT': return {
      ...state,
      pos: pos.clone().add(cameraOffset),
      lookAt: pos
    }
    default: return state
  }
}
