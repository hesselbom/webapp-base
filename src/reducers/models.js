export default (state = {}, {type, model, obj}) => {
  switch (type) {
    case 'LOADED_MODEL': return {
      ...state,
      [model]: obj
    }
  }
  return state
}
