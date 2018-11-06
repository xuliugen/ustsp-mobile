import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native'
import { px2dp, px2sp, SCREEN_WIDTH } from 'src/utils/device'
import { Feather } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'
import { checkIfLogin, checkIfInfoCompleted } from 'src/selectors'
import { connect } from 'react-redux'
import { signUpInfo } from 'src/ajax/project'
import MessageBar from 'src/components/common/MessageBar'

const mapStateToProps = state => {
  return {
    isLogin: checkIfLogin(state),
    isInfoCompleted: checkIfInfoCompleted(state)
  }
}
@withNavigation
@connect(mapStateToProps)
export default class ProjectDetailBotom extends React.Component {
  constructor() {
    super()
    this.state = {
      btnActive: true,
      msg: ' 报名'
    }
  }

  componentWillReceiveProps(nextProps) {
    const { project } = nextProps
    const { userInfo } = this.props
    if (project.status >= 2) {
      this.setState({ btnActive: false, msg: ' 报名结束' })
    } else if (project.ownerId === userInfo.id) {
      this.setState({ btnActive: false, msg: ' 报名中' })
    } else if (project.dockingStatus === 11) {
      this.setState({ btnActive: false, msg: ' 已拒绝' })
    } else if (project.dockingStatus !== 0) {
      this.setState({ btnActive: false, msg: ' 已报名' })
    }
  }

  handleBtnClick = () => {
    const { isLogin } = this.props
    if (!isLogin) {
      this.props.navigation.navigate('Login')
    } else {
      Alert.alert(
        '提示',
        '报名之后不可撤销\n确定报名吗？',
        [
          {text: '取消', style: 'cancel'},
          {text: '确定', onPress: this.signUp}
        ]
      )
    }
  }

  signUp = async () => {
    const { project, userInfo, isInfoCompleted } = this.props
    if (userInfo.userType === 3) {
      MessageBar.show({
        type: 'warning',
        message: '企业暂时不可以报名'
      })
      return
    }
    if (!isInfoCompleted) {
      MessageBar.show({
        type: 'warning',
        message: '请先完善个人信息'
      })
      return
    }
    try {
      const projectJoin = {
        projectId: project.id,
        ownerId: project.ownerId,
        partyId: userInfo.id,
        status: 1,
        partyAvatar: userInfo.avatar,
        partyName: userInfo.realName,
        partySex: userInfo.sex,
        partyType: userInfo.userType,
        partyLocation: userInfo.location,
        partyContact: userInfo.email || userInfo.phone || userInfo.wechat || userInfo.qq || '',
        date: new Date().getTime()
      }
      await signUpInfo(projectJoin)
      this.setState({ btnActive: false, msg: '已报名' })
      this.props.navigation.navigate('ProjectEnroll', { projectName: this.props.project.name })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const bottomBtn = this.state.btnActive ? (
      <View style={styles.container}>
        <TouchableOpacity style={styles.enrollbtn} onPress={this.handleBtnClick}>
          <Feather name="edit-2" size={18} style={styles.enrollicon} />
          <Text style={styles.enrolltext}>{this.state.msg}</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.enrollbtn}>
          <Text style={styles.enrolltext}>{this.state.msg}</Text>
        </View>
      </View>
    )
    return (bottomBtn)
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0
  },
  enrollbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
    height: px2dp(88),
    backgroundColor: '#3091e6'
  },
  enrolltext: {
    fontSize: px2sp(32),
    color: '#ffffff'
  },
  enrollicon: {
    color: '#ffffff'
  }
})
