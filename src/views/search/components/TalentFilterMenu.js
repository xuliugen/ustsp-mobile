import React from 'react'
import {
  View
} from 'react-native'
import { connect } from 'react-redux'

import { subject, province, university, teacherTitle } from 'src/constants/dataset'

import SelectorBlock from './SelectorBlock'
import FilterMenu from './FilterMenu'

const iarr = [{ k: '不限', v: '' }]
const subjectData = iarr.concat(subject.map(i => ({ k: i, v: i })))
const provinceData = iarr.concat(province.map(i => ({ k: i, v: i })))
const teacherTitleData = iarr.concat(teacherTitle.map(i => ({ k: i, v: i })))
const talentTypeData = iarr.concat([{ k: '教师', v: 2 }, { k: '学生', v: 1 }])

const mapStateToProps = state => ({
  provinceSelected: state.search.talentPl.province
})

@connect(mapStateToProps)
export default class TalentFilterMenu extends React.Component {
  scope = 'talent'

  render() {
    const { provinceSelected } = this.props
    const universityData = provinceSelected
      ? iarr.concat(university[provinceSelected].map(i => ({ k: i, v: i }))) : null
    return (
      <FilterMenu scope={this.scope}>
        <View>
          <SelectorBlock label="学科行业" data={subjectData} field="major" scope={this.scope} />
          <SelectorBlock label="省份" data={provinceData} field="province" scope={this.scope} />
          {universityData && <SelectorBlock label="大学" data={universityData} field="school" scope={this.scope} />}
          <SelectorBlock label="职称" data={teacherTitleData} field="title" scope={this.scope} />
          <SelectorBlock label="人才类型" data={talentTypeData} field="type" scope={this.scope} />
        </View>
      </FilterMenu>
    )
  }
}
