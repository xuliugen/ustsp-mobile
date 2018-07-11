import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'

import { px2dp, px2sp } from 'src/utils/device'
import { subject, province, university, teacherTitle } from 'src/constants/dataset'
import { fetchSearchResult, setSearchPage, setSideMenuOpenState, clearSearchScopePayload } from 'src/actions'

import SelectorBlock from './SelectorBlock'

const subjectData = ['不限'].concat(subject)
const provinceData = ['不限'].concat(province)
const teacherTitleData = ['不限'].concat(teacherTitle)
const talentTypeData = ['不限', '教师', '学生']

const mapStateToProps = state => ({
  provinceSelected: state.search.talentPl.province
})

@connect(mapStateToProps)
export default class TalentFilterMenu extends React.Component {
  scope = 'talent'

  handleResetPress = () => {
    this.props.dispatch(clearSearchScopePayload(this.scope))
  }
  handleConfirmPress = () => {
    this.props.dispatch(setSearchPage(1))
    this.props.dispatch(fetchSearchResult())
    this.props.dispatch(setSideMenuOpenState(false))
  }

  render() {
    const { provinceSelected } = this.props
    const universityData = provinceSelected ? ['不限'].concat(university[provinceSelected]) : null
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View>
            <SelectorBlock label="学科行业" data={subjectData} field="major" scope={this.scope} />
            <SelectorBlock label="省份" data={provinceData} field="province" scope={this.scope} />
            {universityData && <SelectorBlock label="大学" data={universityData} field="school" scope={this.scope} />}
            <SelectorBlock label="职称" data={teacherTitleData} field="title" scope={this.scope} />
            <SelectorBlock label="人才类型" data={talentTypeData} field="type" scope={this.scope} />
          </View>
          <View style={{ height: px2dp(88 + 40) }} />
        </ScrollView>
        {/* 底部btn是可以封装的 */}
        <View style={styles.bottom}>
          <TouchableOpacity style={[styles.bottomBtn, styles.bottomBtnReset]} onPress={this.handleResetPress}>
            <Text style={[styles.bottomBtnText, styles.bottomBtnTextReset]}>重置</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottomBtn, styles.bottomBtnConfirm]} onPress={this.handleConfirmPress}>
            <Text style={[styles.bottomBtnText, styles.bottomBtnTextConfirm]}>确定</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContainer: {
    padding: px2dp(30),
    paddingBottom: 0
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row'
  },
  bottomBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: px2dp(88)
  },
  bottomBtnReset: {
    backgroundColor: '#ddd'
  },
  bottomBtnConfirm: {
    backgroundColor: '#3091e6'
  },
  bottomBtnText: {
    fontSize: px2sp(32)
  },
  bottomBtnTextReset: {
    color: '#8f9ba7'
  },
  bottomBtnTextConfirm: {
    color: '#fff'
  }
})
