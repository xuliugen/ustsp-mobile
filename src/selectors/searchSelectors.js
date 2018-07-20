import { createSelector } from 'reselect'

const getPageNum = state => state.search.reqPayload.currentPage
const getPageSize = state => state.search.reqPayload.pageSize
const getTotalPage = state => state.search.totalNum

export const canSearchLoadMore = createSelector(
  [getPageNum, getPageSize, getTotalPage],
  (pageNum, pageSize, totalPage) => {
    return pageNum <= Math.ceil(totalPage / pageSize)
  }
)
