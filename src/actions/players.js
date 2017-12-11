export const movePlayer = (index, move) => ({
  type: 'MOVE_PLAYER',
  index,
  move
})

export const setAnimation = (index, animation) => ({
  type: 'SET_ANIMATION',
  index,
  animation
})
