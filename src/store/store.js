import { createStore , combineReducers, applyMiddleware  } from 'redux'
import thunkMiddleware from 'redux-thunk'
import uiReducer from '../reducers/ui'
import projectsReducer from '../reducers/projects'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
 
const store = createStore(
  combineReducers({
    ui: uiReducer,
    projects: projectsReducer
  }),
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default store
