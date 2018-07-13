import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'

import { px2dp, px2sp } from 'src/utils/device'
import { parseTime } from 'src/utils/format'

// 基本资料条目
export function Entry(props) {
  const { title, text } = props
  return (
    <View style={styles.itemWrapper}>
      <Text style={styles.leftText}>{title}</Text>
      <Text style={styles.rightText} >{text || '暂无'}</Text>
    </View>
  )
}

// 长文本条目
export class FoldEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFold: true
    }
  }

  handleFoldPress = () => {
    this.setState(prev => ({
      isFold: !prev.isFold
    }))
  }

  render() {
    return (
      <View style={styles.foldEntryContainer}>
        <Text style={styles.foldText} numberOfLines={this.state.isFold ? 5 : Infinity} >{this.props.text || '暂无'}</Text>
        <TouchableOpacity style={styles.foldBtn} onPress={this.handleFoldPress}>
          {this.state.isFold ? (
            <Text style={styles.btnText}>
              显示全部&nbsp;&nbsp;
              <Entypo name="chevron-down" />
            </Text>
          ) : (
            <Text style={styles.btnText}>
              收起全部&nbsp;&nbsp;
              <Entypo name="chevron-up" />
            </Text>
          )}
        </TouchableOpacity>
      </View>
    )
  }
}

// 教育经历条目
export function EducationInfo(props) {
  const { info } = props
  return (
    <View style={styles.container}>
      <View style={styles.detail}>
        <Text style={styles.boldText}>{info.school} - <Text style={styles.detailText}>{info.level}</Text></Text>
        <Text style={styles.detailText}>{info.college} / {info.major}</Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.timeText}>{info.level}级 / {parseTime(info.startTime)} / {parseTime(info.endTime)}</Text>
      </View>
    </View>
  )
}

// 科研情况条目
export function ResearchInfo(props) {
  const { info } = props
  return (
    <View style={styles.container}>
      <View style={styles.detail}>
        <Text style={styles.boldText}>{info.projectName}</Text>
        {!!info.firstParty && (<Text style={styles.detailText}>甲方名：{info.firstParty}</Text>)}
      </View>
      <View style={styles.time}>
        <Text style={styles.timeText}>{parseTime(info.startTime)} ~ {parseTime(info.endTime)}</Text>
      </View>
    </View>
  )
}

// 获奖经历条目
export function AwardInfo(props) {
  const { info } = props
  return (
    <View style={styles.container}>
      <View style={styles.detail}>
        <Text style={styles.boldText}>{info.name}</Text>
        <Text style={styles.detailText}>{info.level}</Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.timeText}>获得时间：{parseTime(info.time)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: px2dp(88),
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff'
  },
  leftText: {
    flex: 1,
    paddingLeft: px2dp(30),
    fontSize: px2sp(28),
    color: '#8f9ba7'
  },
  rightText: {
    flex: 4,
    fontSize: px2sp(30),
    color: '#333'
  },

  foldEntryContainer: {
    backgroundColor: '#fff'
  },
  foldText: {
    padding: px2dp(30),
    fontSize: px2sp(30),
    color: '#333'
  },
  foldBtn: {
    alignItems: 'center',
    paddingVertical: px2dp(30),
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  btnText: {
    fontSize: px2dp(30),
    color: '#999'
  },

  container: {
    marginTop: 1,
    paddingHorizontal: px2dp(30),
    backgroundColor: '#fff'
  },
  detail: {
    paddingVertical: px2dp(25)
  },
  boldText: {
    fontSize: px2sp(32),
    color: '#333'
  },
  detailText: {
    fontSize: px2sp(28),
    color: '#999'
  },
  time: {
    flexDirection: 'row-reverse',
    paddingBottom: px2dp(20)
  },
  timeText: {
    fontSize: px2sp(26),
    color: '#999'
  }
})
