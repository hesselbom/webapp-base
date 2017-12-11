import * as THREE from 'three'
import soldier from './models/char.json'

export default (store) => {
  new THREE.ObjectLoader().load(soldier, scene => {
    let obj = scene.children[0]

    obj.geometry.bones.forEach(b => {
      b.name = b.name.toUpperCase().replace(/[ .]+/g, '_')
    })

    obj.geometry.computeVertexNormals()

    obj.material = obj.material.map((m, i) => (
      new THREE.MeshToonMaterial({
      // new THREE.MeshBasicMaterial({
        color: m.color,
        name: m.name,
        specular: new THREE.Color(0x000000),
        shininess: 0,
        skinning: true,
        shading: THREE.SmoothShading
      })
    ))

    store.dispatch({
      type: 'LOADED_MODEL',
      model: 'soldier',
      obj
    })
  })
}
