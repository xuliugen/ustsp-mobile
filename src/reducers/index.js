import { combineReducers } from 'redux'
import auth from './auth'
import project from './project'
import patent from './pantent'
import talent from './talent'
import news from './news'
import search from './search'
import register from './register'

export default combineReducers({
  auth,
  project,
  patent,
  talent,
  news,
  search,
  register
})
