import axios from './request'

export function fetchHomeScreenProjects(showNum = 5) {
  return axios.get('project/query/home-page/projects', {
    params: { showNum: showNum }
  })
}
