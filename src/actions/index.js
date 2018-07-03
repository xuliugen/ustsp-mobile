import * as authAction from './auth'
import * as projectAction from './project'

module.exports = {
  ...authAction,
  ...projectAction
}
