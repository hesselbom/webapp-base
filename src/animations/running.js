import { AnimationClip } from 'three'
import { makeNumberTrack } from '.'

export default () => {
  const duration = 1
  const n = makeNumberTrack(duration)

  return new AnimationClip('Running', duration, [
    n('THIGH_L.rotation[x]', [0.8, -0.2, -1.3, 0, 0.8]),
    n('SHIN_L.rotation[x]', [0.3, 1.3, 0.8, 0, 0.3]),

    n('THIGH_R.rotation[x]', [-1.3, 0, 0.8, -0.2, -1.3]),
    n('SHIN_R.rotation[x]', [0.8, 0, 0.3, 1.3, 0.8]),

    n('UPPER_ARM_L.rotation[z]', [-0.8]),
    n('UPPER_ARM_R.rotation[z]', [0.8])
  ])
}
