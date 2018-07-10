import * as authAction from './auth'
import * as projectAction from './project'
import * as patentAction from './patent'
import * as talentAction from './talent'
import * as searchAction from './search'

module.exports = {
  ...authAction,
  ...projectAction,
  ...patentAction,
  ...talentAction,
  ...searchAction
}
