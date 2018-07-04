import { combineReducers } from 'redux'
import auth from './auth'
import project from './project'
import patent from './pantent'
import talent from './talent'

export default combineReducers({
  auth,
  project,
  patent,
  talent
})
