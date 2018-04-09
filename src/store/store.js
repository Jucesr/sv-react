import { createStore , combineReducers, applyMiddleware  } from 'redux'
import thunkMiddleware from 'redux-thunk'
import uiReducer from '../reducers/ui'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
 
const store = createStore(
  combineReducers({
    ui: uiReducer
  }),
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default store
