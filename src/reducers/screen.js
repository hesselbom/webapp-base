export default (state = {
  width: window.innerWidth,
  height: window.innerHeight
}, {type, width, height}) => (
  type === 'SET_SIZE'
  ? { width, height }
  : state
)
