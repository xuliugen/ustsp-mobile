import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { px2sp, px2dp } from 'src/utils/device'
import { changeDemandStatus } from 'src/ajax/project'
import { connect } from 'react-redux'
import { fetchProjectDetail } from 'src/actions'

@connect()
export default class ProjectApplicantsItem extends React.Component {
  handleSign = () => {
    Alert.alert('提示',
      this.props.applicantInfo.partyName + '\n' + '确定对此人发起签单请求？', [
        {
          text: '取消'
        }, {
          text: '确定',
          onPress: this.sign
        }
      ])
  }

  sign = async () => {
    try {
      await changeDemandStatus({
        currentUserId: this.props.user.id,
        projectId: this.props.applicantInfo.projectId,
        ownerId: this.props.applicantInfo.ownerId,
        partyId: this.props.applicantInfo.partyId,
        status: 'toSign'
      })
      this.props.dispatch(fetchProjectDetail(this.props.applicantInfo.projectId))
      // 在 ‘全部’ 页面完成签单时返回‘我发布的项目’
      if (this.props.ifGoBack != null) {
        this.props.ifGoBack()
      }
    } catch (erro) {
      console.log(erro)
    }
  }

  render() {
    let type = ''
    if (this.props.applicantInfo.partyType === 1) {
      type = '学生'
    } else if (this.props.applicantInfo.partyType === 2) {
      type = '教师'
    } else if (this.props.applicantInfo.partyType === 3) {
      type = '企业'
    }
    return (
      <View style={styles.container}>
        <Image source={{uri: this.props.applicantInfo.partyAvatar}} style={styles.avatar} />
        <View style={styles.information}>
          <Text style={styles.name}>{this.props.applicantInfo.partyName} | {type}</Text>
          <Text style={styles.major}>{this.props.applicantInfo.partyLocation}</Text>
        </View>
        <TouchableOpacity style={styles.signBtn} onPress={this.handleSign}><Text style={styles.signText}>签单</Text></TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: px2dp(1),
    paddingTop: px2dp(35),
    paddingBottom: px2dp(32),
    paddingLeft: px2dp(30),
    paddingRight: px2dp(30),
    backgroundColor: '#ffffff'
  },
  avatar: {
    width: px2dp(60),
    height: px2dp(60),
    borderRadius: px2dp(30)
  },
  information: {
    flexDirection: 'column',
    marginLeft: px2dp(30)
  },
  name: {
    fontSize: px2sp(28),
    color: '#333333'
  },
  major: {
    fontSize: px2sp(26),
    color: '#999999'
  },
  signBtn: {
    position: 'absolute',
    right: px2dp(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: px2dp(10),
    backgroundColor: '#ebf0f5',
    paddingLeft: px2dp(33),
    paddingRight: px2dp(33),
    paddingTop: px2dp(17),
    paddingBottom: px2dp(16)
  },
  signText: {
    fontSize: px2sp(28),
    color: '#3091e6'
  }
})
