import * as authSelectors from './authSelectors'
import * as searchSelectors from './searchSelectors'

module.exports = {
  ...authSelectors,
  ...searchSelectors
}
