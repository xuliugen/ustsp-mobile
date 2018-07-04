import { SET_PROJECT_DETAIL, CLEAR_PROJECT_DETAIL } from '../constants/actionTypes'

const initialState = {
  detail: {
    skills: []
  }
}

export default function project(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECT_DETAIL:
      const { project } = action
      return {
        detail: project
      }
    case CLEAR_PROJECT_DETAIL:
      return initialState
    default:
      return state
  }
}
