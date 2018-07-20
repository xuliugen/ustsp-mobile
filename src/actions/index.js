import * as authAction from './auth'
import * as projectAction from './project'
import * as patentAction from './patent'
import * as talentAction from './talent'
import * as NewsAction from './news'
import * as searchAction from './search'
import * as registerAction from './register'

module.exports = {
  ...authAction,
  ...projectAction,
  ...patentAction,
  ...talentAction,
  ...NewsAction,
  ...searchAction,
  ...registerAction
}
