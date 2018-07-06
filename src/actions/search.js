import {
  SET_SEARCH_TYPE,
  SET_SEARCH_CONDITION,
  SET_SEARCH_PAGE,
  SET_SEARCH_RESULT,
  SET_SEARCH_RESULT_COUNT,
  CLEAR_SEARCH
} from '../constants/actionTypes'
import { searchTalents, searchProjects } from 'src/ajax/search'

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
      let res
      switch (getState().search.searchType) {
        case 'talent':
          const { reqPayload: reqPayloadTalent, talentPl } = getState().search
          const reqTalent = {
            ...reqPayloadTalent,
            ...talentPl
          }
          res = await searchTalents(reqTalent)
          break
        case 'project':
          const { reqPayload: reqPayloadProject, projectPl } = getState().search
          const reqProject = {
            ...reqPayloadProject,
            ...projectPl
          }
          res = await searchProjects(reqProject)
          break
        case 'patent':
        case 'news':
          break
      }
      if (res.data) {
        dispatch(setSearchResult(res.data.data))
        dispatch(setSearchCount(res.data.totalNum))
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
