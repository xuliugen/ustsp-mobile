import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

import { px2dp, px2sp } from 'src/utils/device'
import { parseTime } from 'src/utils/format'

import { fetchProjectDetail } from 'src/actions'
import { changeDemandStatus } from 'src/ajax/project'

@connect()
@withNavigation
export default class PartyBInfo extends React.Component {
  handleCancel = () => {
    Alert.alert('确认撤销此项目签单申请？', '点击取消可刷新动态', [
      {
        text: '取消'
      }, {
        text: '确定',
        onPress: this.onCancel
      }
    ])
  }

  onOk = async () => {
    this.props.dispatch(fetchProjectDetail(this.props.partyB.projectId))
  }

  onCancel = async () => {
    try {
      await changeDemandStatus({
        currentUserId: this.props.user.id,
        projectId: this.props.partyB.projectId,
        ownerId: this.props.partyB.ownerId,
        partyId: this.props.partyB.partyId,
        status: 'cancelSigningA'
      })
      this.props.dispatch(fetchProjectDetail(this.props.partyB.projectId))
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    let type = ''
    if (this.props.partyB.partyType === 1) {
      type = '学生'
    } else if (this.props.partyB.partyType === 2) {
      type = '教师'
    } else if (this.props.partyB.partyType === 3) {
      type = '企业'
    }
    return (
      <View style={styles.personContainer}>
        <View style={styles.personInfo}>
          <TouchableOpacity style={styles.basicInfo} onPress={this.handleClick}>
            <Text style={styles.name}>{this.props.partyB.partyName} | {type}</Text>
            <Text style={styles.location}>{this.props.partyB.partyLocation}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleClick}>
            <Image style={styles.avatar} source={{uri: this.props.partyB.partyAvatar}} />
          </TouchableOpacity>
        </View>
        <View style={styles.timeInfoContainer}>
          <View style={styles.timeInfo}>
            <Text style={styles.time}>报名时间 ：{parseTime(this.props.partyB.applyDate)}</Text>
            <Text style={styles.time}>发起签单 ：{parseTime(this.props.partyB.date)}</Text>
          </View>
          <TouchableOpacity style={styles.cancelBtn} onPress={this.handleCancel}>
            <Text style={styles.cancelText}>撤销</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  personContainer: {
    paddingVertical: px2dp(39),
    paddingHorizontal: px2dp(30),
    marginTop: px2dp(1),
    backgroundColor: '#ffffff'
  },
  personInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: px2dp(0),
    padding: px2dp(0)
  },
  basicInfo: {
    flexDirection: 'column',
    margin: px2dp(0),
    padding: px2dp(0)
  },
  name: {
    fontSize: px2sp(28),
    color: '#333333'
  },
  location: {
    fontSize: px2sp(26),
    color: '#333333'
  },
  avatar: {
    width: px2dp(80),
    height: px2dp(80),
    borderRadius: px2dp(40)
  },
  timeInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: px2dp(40),
    paddingBottom: px2dp(10)
  },
  timeInfo: {
    flexDirection: 'column'
  },
  time: {
    fontSize: px2sp(26),
    color: '#999999'
  },
  cancelBtn: {
    paddingVertical: px2dp(16),
    paddingHorizontal: px2dp(33),
    borderColor: '#8f9ba7',
    borderWidth: px2dp(2),
    borderRadius: px2dp(10)
  },
  cancelText: {
    fontSize: px2sp(28),
    color: '#8f9ba7'
  }
})
