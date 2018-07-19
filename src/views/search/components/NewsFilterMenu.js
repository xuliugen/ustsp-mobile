import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import SelectorBlock from './SelectorBlock'
import FilterMenu from './FilterMenu'

const iarr = [{ k: '不限', v: '' }]
const publisherTypeData = iarr.concat([{ k: '学生', v: 1 }, { k: '教师', v: 2 },
  { k: '企业', v: 3 }, { k: '管理员', v: 4 }])

@connect()
export default class NewsFilterMenu extends React.Component {
  scope = 'news'

  render() {
    return (
      <FilterMenu scope={this.scope}>
        <View>
          <SelectorBlock label="发布者分类" data={publisherTypeData} field="type" scope={this.scope} />
        </View>
      </FilterMenu>
    )
  }
}
