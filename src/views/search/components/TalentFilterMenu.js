import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { px2dp, px2sp } from 'src/utils/device'
import { subject, province, university, teacherTitle } from 'src/constants/dataset'

const subjectData = ['不限'].concat(subject)
const provinceData = ['不限'].concat(province)
// const universityData = ['不限'].concat(university)
const teacherTitleData = ['不限'].concat(teacherTitle)
const talentTypeData = ['不限', '教师', '学生']

class SelectorBlock extends React.Component {
  constructor(props) {
    super(props)
    // 将一维数组 format 为 Mx3（M行3列）的二维数组(更好的写法？)
    // why: 方便在条件框固定显示每列3个条件（有更好的实现思路？）
    this._2dData = props.data.reduce((pre, cur, idx) => {
      if (idx % 3 === 0) {
        pre[`${idx / 3}`] = [cur]
        return pre
      } else {
        return pre.map((i, iidx) => {
          if (iidx === pre.length - 1) {
            return i.concat(cur)
          } else {
            return i
          }
        })
      }
    }, [])
    this.state = {
      expanded: false
    }
  }

  handleExpandIconPress = () => {
    this.setState(pre => ({
      expanded: !pre.expanded
    }))
  }

  render() {
    const _2dDataResolved = (this.state.expanded || this._2dData.length <= 3) ? this._2dData : this._2dData.slice(0, 3)
    return (
      <View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{this.props.label}</Text>
          {this._2dData.length > 3 && <Ionicons
            name={`ios-arrow-${this.state.expanded ? 'up' : 'down'}`}
            onPress={this.handleExpandIconPress}
            style={styles.expandIcon} />}
        </View>
        <View style={styles.selectorsContainer}>
          {_2dDataResolved.map((column, idx) => (
            <View style={styles.selectorsColumn} key={`line${idx}`}>
              {column.map((subject) => (
                <TouchableOpacity key={subject} style={styles.selector} onPress={() => alert(subject)}>
                  <Text style={styles.selectorText}>{subject}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    )
  }
}

export default class TalentFilterMenu extends React.Component {
  render() {
    let selectedProvince = '四川省'
    const universityData = university[selectedProvince]
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <SelectorBlock label="学科行业" data={subjectData} />
          <SelectorBlock label="省份" data={provinceData} />
          <SelectorBlock label="大学" data={universityData} />
          <SelectorBlock label="职称" data={teacherTitleData} />
          <SelectorBlock label="人才类型" data={talentTypeData} />
          <View style={{ height: px2dp(88 + 40) }} />
        </ScrollView>
        <View style={styles.bottom}>
          <TouchableOpacity style={[styles.bottomBtn, styles.bottomBtnReset]}>
            <Text style={[styles.bottomBtnText, styles.bottomBtnTextReset]}>重置</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottomBtn, styles.bottomBtnConfirm]}>
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
  },

  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    color: '#8f9ba7',
    fontSize: px2sp(28)
  },
  expandIcon: {
    flex: 1,
    textAlign: 'right',
    color: '#8f9ba7'
  },
  selectorsContainer: {
    marginTop: px2dp(20),
    marginHorizontal: px2dp(-10)
  },
  selectorsColumn: {
    flexDirection: 'row',
    marginBottom: px2dp(14)
  },
  selector: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: px2dp(10),
    // paddingVertical: px2dp(22),
    // paddingHorizontal: px2dp(22),
    height: px2dp(70),
    borderRadius: 5,
    backgroundColor: '#ebf0f5'
  },
  selectorChecked: {
    backgroundColor: '#8f9ba7'
  },
  selectorText: {
    textAlign: 'center',
    color: '#666',
    fontSize: px2sp(24)
  },
  selectorTextChecked: {
    color: '#fff'
  }
})
