import React from 'react'
import setupAnimations from '../animations/index'
import { onFrame, offFrame } from '../util/animator'

export default class Player extends React.Component {
  constructor () {
    super()
    this._update = this.update.bind(this)
  }

  componentDidMount () {
    if (this.props.model) this.setModel(this.props.model)
    onFrame(this._update)
  }

  componentWillUnmount () {
    if (this.model) this.refs.group.remove(this.model)
    offFrame(this._update)
  }

  componentWillReceiveProps (props) {
    if (props.model && !this.props.model) this.setModel(props.model)
    if (props.animation !== this.props.animation) {
      this.animation.setAction(props.animation, props.animation === 'idle')
    }
  }

  setModel (model) {
    this.model = model.clone()
    this.refs.group.add(this.model)

    // console.log(this.model.skeleton.bones)

    this.animation = setupAnimations(this.model)
    this.animation.setAction(this.props.animation, true)
  }

  update () {
    if (this.animation) {
      this.animation.update()
    }
  }

  render () {
    let { pos, rot, model } = this.props

    return <group position={pos} rotation={rot}>
      <group ref='group' />
      {
        !model &&
        (
        <mesh>
          <cylinderGeometry radiusTop={1} radiusBottom={1} height={2} />
          <meshBasicMaterial color={0xffffff} />
        </mesh>
        )
      }
    </group>
  }
}
