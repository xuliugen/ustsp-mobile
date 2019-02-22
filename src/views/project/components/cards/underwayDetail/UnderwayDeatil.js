import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { px2dp, px2sp } from 'src/utils/device'
import talentNavDecorator from 'src/components/common/talentNavDecorator'
import { parseTime } from 'src/utils/format'
import OppositeDetail from '../common/OppositeDetail'

const TalentwithNav = talentNavDecorator(OppositeDetail)
export default class UnderwayDetail extends React.Component {
  render() {
    const { underwayDetail } = this.props
    return (
      <View style={styles.container}>
        <TalentwithNav talentNav={{id: this.props.oppositeDetail.id, type: this.props.oppositeDetail.type}}
          oppositeDetail={this.props.oppositeDetail} side={this.props.side} />
        <View style={styles.timeDetailContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>进度详情</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.text}>报名时间：{parseTime(underwayDetail.applyDate)}</Text>
            <Text style={styles.text}>签单时间：{parseTime(underwayDetail.signDate)}</Text>
            <Text style={styles.text}>预计开始时间：{parseTime(underwayDetail.startDate)}</Text>
            <Text style={styles.text}>预计结束时间：{parseTime(underwayDetail.endDate)}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'column',
    height: '100%',
    marginTop: px2dp(30)
  },
  timeDetailContainer: {
    flexDirection: 'column',
    marginTop: px2dp(30)
  },
  titleContainer: {
    padding: px2dp(30),
    borderTopLeftRadius: px2dp(10),
    borderTopRightRadius: px2dp(10),
    backgroundColor: '#fff'
  },
  title: {
    fontSize: px2sp(32),
    color: '#666'
  },
  timeContainer: {
    marginTop: px2dp(2),
    paddingVertical: px2dp(20),
    paddingLeft: px2dp(60),
    borderBottomLeftRadius: px2dp(10),
    borderBottomRightRadius: px2dp(10),
    backgroundColor: '#fff'
  },
  text: {
    paddingVertical: px2dp(10),
    fontSize: px2sp(26),
    color: '#8f9ba7'
  }

})
