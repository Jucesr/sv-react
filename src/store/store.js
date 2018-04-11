import { createStore , combineReducers, applyMiddleware  } from 'redux'
import thunkMiddleware from 'redux-thunk'
import uiReducer from '../reducers/ui'
import projectsReducer from '../reducers/projects'
import viewsReducer from '../reducers/views'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}

const store = createStore(
  combineReducers({
    ui: uiReducer,
    projects: projectsReducer,
    views: viewsReducer
  }),
  persistedState,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store
