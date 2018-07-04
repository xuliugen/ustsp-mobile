import { SET_PATENT_DETAIL, CLEAR_PATENT_DETAIL } from '../constants/actionTypes'

const initialState = {
  detail: {
    assignor: {},
    surrenderee: {}
  }
}

export default function patent(state = initialState, action) {
  switch (action.type) {
    case SET_PATENT_DETAIL:
      const { patent } = action
      return {
        detail: patent
      }
    case CLEAR_PATENT_DETAIL:
      return initialState
    default:
      return state
  }
}
