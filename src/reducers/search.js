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

const initalState = {
  isOpen: false,
  searchType: 'talent',
  reqPayload: {
    condition: '',
    currentPage: 1,
    pageSize: 50
  },
  talentPl: {
    major: '',
    province: '',
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
    case SET_SEARCH_MENU_OPEN_STATE:
      return {
        ...state,
        isOpen: action.isOpen
      }
    case SET_SEARCH_TYPE:
      return {
        ...state,
        searchType: action.searchType
      }
    case SET_SEARCH_CONDITION:
      return {
        ...state,
        reqPayload: {
          ...state.reqPayload,
          condition: action.condition
        }
      }
    case SET_SEARCH_PAGE:
      return {
        ...state,
        reqPayload: {
          ...state.reqPayload,
          currentPage: action.currentPage
        }
      }
    case SET_SEARCH_PAYLOAD:
      const { scope, field, value } = action
      let payloadProp = `${scope}Pl`
      // switch (scope) {
      //   case 'talent':
      //     payloadProp = 'talentPl'
      //     break
      //   case 'project':
      //     payloadProp = 'projectPl'
      //     break
      //   case 'patent':
      //     payloadProp = 'patentPl'
      //     break
      //   default:
      //     return state
      // }
      return {
        ...state,
        [payloadProp]: {
          ...state[payloadProp],
          [field]: value
        }
      }
    case SET_SEARCH_RESULT:
      return {
        ...state,
        result: action.result
      }
    case APPEND_SEARCH_RESULT:
      return {
        ...state,
        result: state.result.concat(action.result)
      }
    case SET_SEARCH_RESULT_COUNT:
      return {
        ...state,
        totalNum: action.totalNum
      }
    case CLEAR_SEARCH_SCOPE_PAYLOAD:
      switch (action.scope) {
        case 'talent':
          return {
            ...state,
            talentPl: initalState.talentPl
          }
        case 'project':
          return {
            ...state,
            projectPl: initalState.projectPl
          }
        case 'patent':
          return {
            ...state,
            patentPl: initalState.patentPl
          }
        case 'news':
          return {
            ...state,
            newsPl: initalState.newsPl
          }
        default:
          return state
      }
    case CLEAR_SEARCH_RESULT:
      return {
        ...state,
        result: initalState.result,
        totalNum: initalState.totalNum,
        reqPayload: {
          ...state.reqPayload,
          currentPage: initalState.reqPayload.currentPage,
          pageSize: initalState.reqPayload.pageSize
        }
      }
    case CLEAR_SEARCH:
      return {
        ...initalState,
        searchType: state.searchType
      }
    default:
      return state
  }
}
