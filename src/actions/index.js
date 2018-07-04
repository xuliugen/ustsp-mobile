import * as authAction from './auth'
import * as projectAction from './project'
import * as patentAction from './patent'

module.exports = {
  ...authAction,
  ...projectAction,
  ...patentAction
}
