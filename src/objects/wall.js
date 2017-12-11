import * as THREE from 'three'

export default ({a, b}) => {
  let mid = a.clone().lerp(b, 0.5)
  let angle = a.clone().sub(b).angle()
  let height = 3
  let width = a.distanceTo(b)
  let pos = new THREE.Vector3(mid.x, height / 2, mid.y)
  let rot = new THREE.Euler()
    .setFromVector3(new THREE.Vector3(0, -angle, 0))

  return <mesh position={pos} rotation={rot}>
    <boxGeometry width={width} height={height} depth={0.08} />
    <meshPhongMaterial color={0xffffff} />
  </mesh>
}
