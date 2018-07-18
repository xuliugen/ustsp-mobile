import { SET_NEWS_DETAIL, CLEAR_NEWS_DETAIL } from '../constants/actionTypes'
import { fetchNewsDetailApi } from 'src/ajax/news'

export function fetchNewsDetail(newsId) {
  return async dispatch => {
    try {
      const { data } = await fetchNewsDetailApi(newsId)
      dispatch({
        type: SET_NEWS_DETAIL,
        news: data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function clearNewsDetail() {
  return {
    type: CLEAR_NEWS_DETAIL
  }
}
