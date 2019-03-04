import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import { px2dp, px2sp } from 'src/utils/device'

export default class OppositeDetail extends React.Component {
  next = () => {
    switch (this.props.next) {
      case 'toEvaluate':
        return <TouchableOpacity onPress={() => { this.handleClickNext('EvaluateOther') }}>
          <Text style={styles.next}>评价 ></Text>
        </TouchableOpacity>
      case 'finish':
        return <TouchableOpacity onPress={() => { this.handleClickNext('AllEvaluations') }}>
          <Text style={styles.next}>查看互评 ></Text>
        </TouchableOpacity>
      default: return null
    }
  }

  handleClickNext = (nav) => {
    this.props.navigation.navigate(nav, {
      side: this.props.side,
      evaluations: this.props.evaluations,
      projectId: this.props.projectId
    })
  }

  render() {
    const { oppositeDetail } = this.props
    let type = ''
    let side = ''
    if (oppositeDetail.type === 1) {
      type = '学生'
    } else if (oppositeDetail.type === 2) {
      type = '教师'
    } else if (oppositeDetail.type === 3) {
      type = '企业'
    }

    if (this.props.side === 'partyB') {
      side = '乙方'
    } else {
      side = '甲方'
    }
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleLable}>{side}信息</Text>
          { this.next() }
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.personDetail}>
            <Text style={styles.text}>{oppositeDetail.name} | {type}</Text>
            <Text style={styles.text}>{oppositeDetail.location}</Text>
            <Text style={styles.text}>{oppositeDetail.contact}</Text>
          </View>
          <Image source={{ uri: oppositeDetail.avatar }} style={styles.avatar} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: px2dp(30),
    borderTopLeftRadius: px2dp(10),
    borderTopRightRadius: px2dp(10),
    backgroundColor: '#fff'
  },
  titleLable: {
    fontSize: px2sp(32),
    color: '#666'
  },
  next: {
    fontSize: px2sp(28),
    color: '#8f9ba7'
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: px2dp(30),
    paddingVertical: px2dp(40),
    marginTop: px2dp(2),
    borderBottomLeftRadius: px2dp(10),
    borderBottomRightRadius: px2dp(10),
    backgroundColor: '#fff'
  },
  personDetail: {
    flexDirection: 'column'
  },
  text: {
    fontSize: px2sp(28),
    marginBottom: px2dp(10)
  },
  avatar: {
    width: px2dp(100),
    height: px2dp(100),
    borderRadius: px2dp(50)
  }
})
