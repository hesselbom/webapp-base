import { AnimationClip } from 'three'
import { makeNumberTrack } from '.'

export default () => {
  const duration = 1
  const n = makeNumberTrack(duration)

  return new AnimationClip('Idle', duration, [
    n('UPPER_ARM_L.rotation[z]', [-0.8]),
    n('UPPER_ARM_R.rotation[z]', [0.8]),
    n('UPPER_ARM_L.rotation[x]', [-0.2]),
    n('UPPER_ARM_R.rotation[x]', [-0.2])
  ])
}
