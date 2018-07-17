import React from 'react'
import {
  View
} from 'react-native'
import { connect } from 'react-redux'

import { subject } from 'src/constants/dataset'

import SelectorBlock from './SelectorBlock'
import FilterMenu from './FilterMenu'

const iarr = [{ k: '不限', v: '' }]
const subjectData = iarr.concat(subject.map(i => ({ k: i, v: i })))
const orientedData = iarr.concat(['教师', '学生'].map(i => ({ k: i, v: i })))
const publisherTypeData = iarr.concat([{ k: '学生', v: 1 }, { k: '教师', v: 2 },
  { k: '企业', v: 3 }, { k: '管理员', v: 4 }])

@connect()
export default class TalentFilterMenu extends React.Component {
  scope = 'project'

  render() {
    return (
      <FilterMenu scope={this.scope}>
        <View>
          <SelectorBlock label="学科行业" data={subjectData} field="subject" scope={this.scope} />
          <SelectorBlock label="对接倾向" data={orientedData} field="oriented" scope={this.scope} />
          <SelectorBlock label="发布者分类" data={publisherTypeData} field="type" scope={this.scope} />
        </View>
      </FilterMenu>
    )
  }
}
