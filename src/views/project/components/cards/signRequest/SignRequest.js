import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'

import { px2dp, px2sp } from 'src/utils/device'
import { withNavigation } from 'react-navigation'

import { changeDemandStatus, getDemanOrderDetail } from 'src/ajax/project'
import { fetchProjectDetail } from 'src/actions'

const mapStatetoProps = state => ({
  user: state.auth.user
})

@withNavigation
@connect(mapStatetoProps)
export default class SignRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      owner: [],
      user: [],
      project: []
    }
  }

  async componentDidMount() {
    try {
      const {data} = await getDemanOrderDetail(this.props.projectId)
      this.setState({
        project: data.projectDetail.projectJointDTO,
        owner: data.projectDetail.owner,
        user: this.props.user
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleClickOwner = () => {
    this.props.navigation.navigate('TalentDetail', {
      userId: this.state.owner.ownerId,
      userType: this.state.owner.partyType
    })
  }

  handleComfirm = async () => {
    try {
      await changeDemandStatus({
        currentUserId: this.state.user.id,
        projectId: this.state.project.projectId,
        ownerId: this.state.project.ownerId,
        partyId: this.state.user.id,
        status: 'underway'
      })
      this.props.dispatch(fetchProjectDetail(this.props.projectId))
    } catch (error) {
      console.log(error)
    }
  }

  handleCancle = () => {
    Alert.alert('确定要拒绝签单请求吗？', '按 cancle可以刷新状态', [
      {
        text: 'cancle',
        onPress: this.updateInfo
      }, {
        text: 'ok',
        onPress: this.rejectSign
      }])
  }

  updateInfo = () => {
    this.props.dispatch(fetchProjectDetail(this.props.projectId))
  }

  rejectSign = async () => {
    try {
      await changeDemandStatus({
        currentUserId: this.state.user.id,
        projectId: this.state.project.projectId,
        ownerId: this.state.project.ownerId,
        partyId: this.state.user.id,
        status: 'signRejectB'
      })
      this.props.dispatch(fetchProjectDetail(this.props.projectId))
      this.props.navigation.navigate('ProjectDetail', {
        projectId: this.state.project.id,
        store: true
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { owner } = this.state
    const nameString = String(owner.partyName)
    let ownerName = nameString.length > 4 ? nameString.substr(0, 4) + '...' : nameString
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.cardContainer} onPress={this.handleClickOwner}>
          <View style={styles.signInfo}>
            <View style={styles.partyAInfo}>
              <Image source={require('src/img/project.png')} style={styles.projectIcon} />
              <Text style={styles.signTitle}>甲方发起签单请求</Text>
            </View>
            <View style={styles.partyAInfo}>
              <Text style={styles.name}>{ownerName}</Text>
              <Image source={{ uri: owner.partyAvatar }} style={styles.avatar} />
            </View>
          </View>
          <View style={styles.bottomBtn}>
            <TouchableOpacity style={styles.cancleBtn} onPress={this.handleCancle}>
              <Text style={styles.cancleText}>拒绝</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptBtn} onPress={this.handleComfirm}>
              <Text style={styles.acceptText}>接受</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <Text style={styles.reminder}>若长时间未确定，甲方有可能撤回签单请求</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  cardContainer: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    padding: px2dp(30),
    marginTop: px2dp(60),
    borderRadius: px2dp(10)
  },
  signInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  signTitle: {
    marginLeft: px2dp(18),
    color: '#333',
    fontSize: px2sp(32)
  },
  projectIcon: {
    width: px2dp(40),
    height: px2dp(40),
    borderRadius: px2dp(20)
  },
  name: {
    marginRight: px2dp(18),
    color: '#8f9ba7',
    fontSize: px2sp(26)
  },
  avatar: {
    width: px2dp(60),
    height: px2dp(60),
    borderRadius: px2dp(30)
  },
  partyAInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  bottomBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: px2dp(100)
  },
  cancleBtn: {
    paddingVertical: px2dp(17),
    paddingHorizontal: px2dp(108),
    borderRadius: px2dp(10),
    backgroundColor: '#EBF0F5'
  },
  acceptBtn: {
    paddingVertical: px2dp(17),
    paddingHorizontal: px2dp(108),
    borderRadius: px2dp(10),
    backgroundColor: '#3091E6'
  },
  cancleText: {
    color: '#8f9ba7',
    fontSize: px2sp(28)
  },
  acceptText: {
    color: '#fff',
    fontSize: px2sp(28)
  },
  reminder: {
    marginTop: px2dp(37),
    color: '#8f9ba7',
    fontSize: px2sp(22)
  }
})
