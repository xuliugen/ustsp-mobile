import * as authAction from './auth'
import * as projectAction from './project'
import * as patentAction from './patent'
import * as talentAction from './talent'

module.exports = {
  ...authAction,
  ...projectAction,
  ...patentAction,
  ...talentAction
}
