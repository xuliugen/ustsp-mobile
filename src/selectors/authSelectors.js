import { createSelector } from 'reselect'

const getToken = state => state.auth.token
const getUser = state => state.auth.user

export const checkIfLogin = createSelector(
  [getToken, getUser],
  (token, user) => {
    return token && user && user.id
  }
)
