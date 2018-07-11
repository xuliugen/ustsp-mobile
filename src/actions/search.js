import {
  SET_SEARCH_MENU_OPEN_STATE,
  SET_SEARCH_TYPE,
  SET_SEARCH_CONDITION,
  SET_SEARCH_PAGE,
  SET_SEARCH_PAYLOAD,
  SET_SEARCH_RESULT,
  APPEND_SEARCH_RESULT,
  SET_SEARCH_RESULT_COUNT,
  CLEAR_SEARCH_SCOPE_PAYLOAD,
  CLEAR_SEARCH_RESULT,
  CLEAR_SEARCH
} from '../constants/actionTypes'
import { searchTalents, searchProjects } from 'src/ajax/search'

export function setSideMenuOpenState(isOpen) {
  return {
    type: SET_SEARCH_MENU_OPEN_STATE,
    isOpen
  }
}

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

/**
 * @param {string} scope search payload type
 * @param {string} field certain prop of payload
 * @param value the value
 */
export function setSearchPayload(scope, field, value) {
  return {
    type: SET_SEARCH_PAYLOAD,
    scope,
    field,
    value
  }
}

/**
 * @param {boolean} ifAppend use append mode or set mode
 */
export function fetchSearchResult(ifAppend) {
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
        if (ifAppend) {
          dispatch(appendSearchResult(res.data.data))
          dispatch(setSearchPage(getState().search.reqPayload.currentPage + 1))
        } else {
          dispatch(setSearchResult(res.data.data))
        }
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

function appendSearchResult(result) {
  return {
    type: APPEND_SEARCH_RESULT,
    result
  }
}

function setSearchCount(totalNum) {
  return {
    type: SET_SEARCH_RESULT_COUNT,
    totalNum
  }
}

export function clearSearchScopePayload(scope) {
  return {
    type: CLEAR_SEARCH_SCOPE_PAYLOAD,
    scope
  }
}

export function clearSearchResult() {
  return {
    type: CLEAR_SEARCH_RESULT
  }
}

export function clearSearch() {
  return {
    type: CLEAR_SEARCH
  }
}
