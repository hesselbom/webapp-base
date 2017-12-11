import {
  AnimationMixer,
  Clock,
  NumberKeyframeTrack,
  VectorKeyframeTrack
} from 'three'

import makeIdleClip from './idle'
import makeRunningClip from './running'

export default (mesh) => {
  let clock = new Clock()
  let mixer = new AnimationMixer(mesh)
  let actions = {
    idle: mixer.clipAction(makeIdleClip()),
    running: mixer.clipAction(makeRunningClip())
  }
  let currentAction = null

  return {
    setAction (action, startAtRandom = false) {
      let oldAction = currentAction

      currentAction = actions[action]
      currentAction.reset().play()

      if (startAtRandom) {
        currentAction.time = currentAction.getClip().duration * Math.random()
      }

      if (oldAction) {
        currentAction.crossFadeFrom(oldAction, 0.25)
      }
    },

    update () {
      mixer.update(clock.getDelta())
    }
  }
}

export function makeNumberTrack (duration) {
  return (prop, values) => {
    if (values.length === 1) values = values.concat(values)

    return new NumberKeyframeTrack(prop, values.map((_, i) => (i / (values.length - 1)) * duration), values)
  }
}

export function makeVectorTrack (duration) {
  return (prop, values) => {
    if (values.length === 1) values = values.concat(values)

    return new VectorKeyframeTrack(prop, values.map((_, i) => (i / (values.length - 1)) * duration), values)
  }
}
