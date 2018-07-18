import { SET_NEWS_DETAIL, CLEAR_NEWS_DETAIL } from '../constants/actionTypes'

const initialState = {
  detail: {}
}

export default function news(state = initialState, action) {
  switch (action.type) {
    case SET_NEWS_DETAIL:
      const { news } = action
      return {
        detail: news
      }
    case CLEAR_NEWS_DETAIL:
      return initialState
    default:
      return state
  }
}
