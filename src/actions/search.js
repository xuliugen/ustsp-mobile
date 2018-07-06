import {
  SET_SEARCH_TYPE,
  SET_SEARCH_CONDITION,
  SET_SEARCH_PAGE,
  SET_SEARCH_RESULT,
  SET_SEARCH_RESULT_COUNT,
  CLEAR_SEARCH
} from '../constants/actionTypes'
import { searchTalents } from 'src/ajax/search'

export function setSearchType(searchType) {
  return {
    type: SET_SEARCH_TYPE,
    searchType
  }
}

export function setSearchCondition(condition) {
  return {
    type: SET_SEARCH_CONDITION,
    condition: condition
  }
}

export function setSearchPage(currentPage) {
  return {
    type: SET_SEARCH_PAGE,
    currentPage: currentPage
  }
}

export function fetchSearchResult() {
  return async (dispatch, getState) => {
    try {
      switch (getState().search.searchType) {
        case 'talent':
          const { reqPayload, talentPl } = getState().search
          const req = {
            ...reqPayload,
            ...talentPl
          }
          const { data } = await searchTalents(req)
          dispatch(setSearchResult(data.data))
          dispatch(setSearchCount(data.totalNum))
          break
        case 'project':
        case 'patent':
        case 'news':
          break
      }
    } catch (error) {
      console.log(error)
    }
  }
}

function setSearchResult(result) {
  return {
    type: SET_SEARCH_RESULT,
    result
  }
}

function setSearchCount(totalNum) {
  return {
    type: SET_SEARCH_RESULT_COUNT,
    totalNum
  }
}

export function clearSearch() {
  return {
    type: CLEAR_SEARCH
  }
}
