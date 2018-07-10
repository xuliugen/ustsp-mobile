import { SET_TALENT_INFO, CLEAR_TALENT_INFO } from '../constants/actionTypes'

const initialState = {
  talent: {},
  talentInfo: {}
}

export default function talent(state = initialState, action) {
  switch (action.type) {
    case SET_TALENT_INFO:
      const { talent, talentInfo } = action
      return {
        ...state,
        talent,
        talentInfo
      }
    case CLEAR_TALENT_INFO:
      return initialState
    default:
      return state
  }
}
