import {
  SET_SEARCH_TYPE,
  SET_SEARCH_CONDITION,
  SET_SEARCH_RESULT,
  SET_SEARCH_RESULT_COUNT,
  CLEAR_SEARCH
} from '../constants/actionTypes'

const initalState = {
  searchType: 'talent',
  reqPayload: {
    condition: '',
    currentPage: 1,
    pageSize: 10
  },
  talentPl: {
    major: '',
    school: '',
    title: '',
    type: ''
  },
  projectPl: {
    subject: '',
    oriented: '',
    type: ''
  },
  patentPl: {
    industryCategory: '',
    patentType: '',
    legalStatus: ''
  },
  newsPl: {
    startTime: '',
    endTime: '',
    type: ''
  },
  result: [],
  totalNum: 0
}

export default function search(state = initalState, action) {
  switch (action.type) {
    case SET_SEARCH_TYPE:
      return {
        ...state,
        searchType: action.searchType
      }
    case SET_SEARCH_CONDITION:
      return {
        ...state,
        ...Object.assign({}, state.reqPayload, {
          condition: action.condition
        })
      }
    case SET_SEARCH_RESULT:
      return {
        ...state,
        result: action.result
      }
    case SET_SEARCH_RESULT_COUNT:
      return {
        ...state,
        totalNum: action.totalNum
      }
    case CLEAR_SEARCH:
      return initalState
    default:
      return state
  }
}
