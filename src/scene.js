import {connect} from 'react-redux'
import React from 'react'
import * as THREE from 'three'
import React3 from 'react-three-renderer'
import store from './store'
import Player from './objects/player'
import Wall from './objects/wall'
import playerController from './controllers/player'
import fixTimestep from './timestep'
import { runFrame } from './util/animator'

const OrbitControls = require('three-orbit-controls')(THREE)
// const OutlineEffect = require('../lib/OutlineEffect').default(THREE)

let _scene
let _camera
let outlineEffect
let controllers = [playerController(0, store)]
let update = () => controllers.forEach(c => c.update())
let render = () => {
  if (outlineEffect) {
    outlineEffect.render(_scene, _camera)
  }

  runFrame()
}

const lightPos = new THREE.Vector3(10, 10, 10)
const lightTarget = new THREE.Vector3(0, 0, 0)

const onRendererUpdated = (renderer) => {
  // outlineEffect = new OutlineEffect(renderer, {
  //   defaultThickness: 0.002,
  //   defaultColor: new THREE.Color(0x000000)
  // })
}

// TODO: Replace renderer call in react-three-renderer

class Scene extends React.Component {
  componentDidMount () {
    _scene = this.refs.scene
    _camera = this.refs.camera

    this.controls = new OrbitControls(this.refs.camera)
    this.controls.enableKeys = false

    this.onResize = () => this.props.dispatch({
      type: 'SET_SIZE',
      width: window.innerWidth,
      height: window.innerHeight
    })

    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount () {
    this.controls.dispose()
    delete this.controls
    window.removeEventListener('resize', this.onResize)
  }

  render () {
    const {screen, players, camera, models, map} = this.props

    return <React3
      mainCamera='camera'
      width={screen.width}
      height={screen.height}
      clearColor={0xc1b59e}
      onAnimate={fixTimestep(update, render)}
      pixelRatio={window.devicePixelRatio || 1}
      onRendererUpdated={onRendererUpdated}
    >
      <scene ref='scene'>
        <directionalLight position={lightPos} lookAt={lightTarget} />
        <perspectiveCamera
          ref='camera'
          name='camera'
          fov={75}
          aspect={screen.width / screen.height}
          near={0.1}
          far={1000}
          position={camera.pos}
          lookAt={camera.lookAt}
        />
        { players.map((p, i) => <Player key={i} pos={p.pos} rot={p.rot} animation={p.animation} model={models.soldier} />) }
        { map.walls.map((w, i) => <Wall key={i} a={w.a} b={w.b} />) }
      </scene>
    </React3>
  }
}

export default connect(s => s)(Scene)
