import React from 'react'
import {
  View
} from 'react-native'
import { connect } from 'react-redux'

import { industryCategory, patentType, legalStatus } from 'src/constants/dataset'

import SelectorBlock from './SelectorBlock'
import FilterMenu from './FilterMenu'

const iarr = [{ k: '不限', v: '' }]
const industryCategoryData = iarr.concat(industryCategory.map(i => ({ k: i, v: i })))
const patentTypeData = iarr.concat(patentType.map(i => ({ k: i, v: i })))
const legalStatusData = iarr.concat(legalStatus.map(i => ({ k: i, v: i })))

@connect()
export default class PatentFilterMenu extends React.Component {
  scope = 'patent'

  render() {
    return (
      <FilterMenu scope={this.scope}>
        <View>
          <SelectorBlock label="行业分类" data={industryCategoryData} field="industryCategory" scope={this.scope} />
          <SelectorBlock label="专利类型" data={patentTypeData} field="patentType" scope={this.scope} />
          <SelectorBlock label="法律状态" data={legalStatusData} field="legalStatus" scope={this.scope} />
        </View>
      </FilterMenu>
    )
  }
}
