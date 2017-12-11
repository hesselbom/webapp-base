import { createStore, combineReducers } from 'redux'

import screen from './reducers/screen'
import players from './reducers/players'
import camera from './reducers/camera'
import models from './reducers/models'
import map from './reducers/map'

export default createStore(
  combineReducers({ screen, players, camera, models, map })
)
