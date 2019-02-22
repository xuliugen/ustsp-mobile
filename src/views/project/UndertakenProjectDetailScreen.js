import React from 'React'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native'
import { px2dp, px2sp } from 'src/utils/device'
import { connect } from 'react-redux'
import { Feather } from '@expo/vector-icons'
import { HEADER_STYLE } from 'src/views/publish/common/style/HeaderStyle'

import { fetchProjectDetail, clearProjectDetail } from 'src/actions'
import { projectStatusNum2Str } from 'src/utils/format'
import { getDemanOrderDetail, changeDemandStatus } from 'src/ajax/project'

import SignedRequest from './components/cards/signRequest/SignRequest'
import UnderwayDetail from './components/cards/underwayDetail/UnderwayDeatil'
import TwoOptionBtn from './components/TwoOptionBtn'

const mapStatetoProps = state => ({
  project: state.project.detail,
  user: state.auth.user
})

@connect(mapStatetoProps)
export default class UndertakenProjectDetailScreen extends React.Component {
  state={
    project: [], // 项目详情
    owner: [], // 甲方信息
    oppositeDetail: [], // 对方信息
    underwayDetail: [], // 项目进行中信息
    changeStatusProps: [] // 项目变更参数

  }
  static navigationOptions = {
    title: '我报名的项目',
    headerStyle: HEADER_STYLE.headerStyle,
    headerTintColor: HEADER_STYLE.headerTintColor,
    headerTitleStyle: HEADER_STYLE.headerTitleStyle,
    headerRight: <Text />
  }
  componentDidMount() {
    const { dispatch, navigation } = this.props
    dispatch(fetchProjectDetail(navigation.getParam('projectId')))
    this.fetchInfo(navigation.getParam('projectId'))
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(clearProjectDetail())
  }

  componentWillReceiveProps() {
    const {navigation} = this.props
    this.fetchInfo(navigation.getParam('projectId'))
  }

  async fetchInfo(pid) {
    try {
      const {data} = await getDemanOrderDetail(pid)
      if (data.projectDetail.status === 'toSign') {
        this.setState({
          project: data.projectDetail.projectJointDTO,
          owner: data.projectDetail.owner
        })
      } else if (data.projectDetail.status === 'underway') {
        const oppositeDetail = {
          id: data.projectDetail.owner.ownerId,
          name: data.projectDetail.owner.partyName,
          type: data.projectDetail.owner.partyType,
          contact: data.projectDetail.owner.partyContact,
          avatar: data.projectDetail.owner.partyAvatar,
          location: data.projectDetail.owner.partyLocation
        }
        const underwayDetail = {
          applyDate: data.projectDetail.applyData,
          signDate: data.projectDetail.projectJointDTO.date,
          startDate: data.projectDetail.projectResearchInfo.startTime,
          endDate: data.projectDetail.projectResearchInfo.endTime
        }
        const changeStatusProps = {
          currentUserId: this.props.user.id,
          partyId: data.projectDetail.projectJointDTO.partyId,
          ownerId: data.projectDetail.projectJointDTO.ownerId,
          projectId: data.projectDetail.projectJointDTO.projectId
        }
        this.setState({
          oppositeDetail: oppositeDetail,
          underwayDetail: underwayDetail,
          changeStatusProps: changeStatusProps
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  handleCheckMore = () => {
    this.props.navigation.navigate('ProjectDetail', {
      projectId: this.props.project.id,
      store: true
    })
  }

  handlePressStopProject = () => {
    const nextStatus = { status: 'underwayBreakB' }
    const statusProps = {...this.state.changeStatusProps, ...nextStatus}
    Alert.alert('确定要中断项目请求吗？', '按cancel即可刷新状态', [
      {
        text: '取消',
        onPress: this.undateInfo
      }, {
        text: '确定',
        onPress: () => this.changeProjectStatus(statusProps)
      }
    ])
  }

  handlePressCheck = () => {
    const nextStatus = { status: 'toCheck' }
    const statusProps = {...this.state.changeStatusProps, ...nextStatus}
    Alert.alert('发起验收', '验收通过后项目将进入评价阶段，未通过后将继续进行', [
      {
        text: '取消',
        onPress: this.undateInfo
      }, {
        text: '确定',
        onPress: () => this.changeProjectStatus(statusProps)
      }
    ])
  }

   // 刷新项目状态
   updateInfo = () => {
     const { dispatch, navigation } = this.props
     dispatch(fetchProjectDetail(navigation.getParam('projectId')))
   }

  // 变更项目状态，和底部按钮绑定
  changeProjectStatus = async (statusProps) => {
    try {
      await changeDemandStatus(statusProps)
      this.updateInfo()
    } catch (error) {
      console.log(error)
    }
  }

  renderCard = () => {
    /* applying(1, "报名中"),
    toSign(2, "待签单"),
    underway(3, "进行中"),
    toCheck(4, "待验收"),
    toEvaluate(5, "评价"),
    finished(6, "完成"), */
    switch (this.props.project.status) {
      case 2:
        return <SignedRequest project={this.state.project} user={this.props.user} owner={this.state.owner} />
      case 3:
        return <UnderwayDetail oppositeDetail={this.state.oppositeDetail}
          underwayDetail={this.state.underwayDetail} side={'partyA'} />
      default: return null
    }
  }

  renderBottomButton = () => {
    switch (this.props.project.status) {
      case 3:
        return <TwoOptionBtn handlePressStop={this.handlePressStopProject} handlePressCheck={this.handlePressCheck} />
      default: return null
    }
  }

  render() {
    const { project } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.projectName}>{project.projectName}</Text>
          <View style={styles.checkMoreWrapper}>
            <TouchableOpacity style={styles.checkMoreContainer} onPress={this.handleCheckMore}>
              <Text style={styles.checkMore}>查看项目详情 <Feather style={styles.checkMore} name="chevron-right" /></Text>
            </TouchableOpacity>
            <Text style={styles.status}>{projectStatusNum2Str(project.status)}</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.detailContainer}>
            { this.renderCard() }
          </View>
        </ScrollView>
        { this.renderBottomButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'column',
    backgroundColor: '#ebf0f5',
    height: '100%',
    paddingLeft: px2dp(30),
    paddingRight: px2dp(30)
  },
  title: {
    marginTop: px2dp(30),
    marginBottom: px2dp(0),
    paddingBottom: px2dp(0),
    paddingTop: px2dp(40),
    paddingLeft: px2dp(30),
    borderRadius: px2dp(10),
    backgroundColor: '#ffffff'
  },
  projectName: {
    fontSize: px2sp(36)
  },
  checkMoreContainer: {
    flexDirection: 'row',
    marginTop: px2dp(24),
    alignItems: 'center'
  },
  status: {
    paddingVertical: px2dp(10),
    paddingHorizontal: px2dp(25),
    marginRight: px2dp(30),
    borderRadius: px2dp(10),
    backgroundColor: '#ebf0f5',
    fontSize: px2sp(24),
    color: '#1dbbae'
  },
  checkMoreWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: px2dp(30)
  },
  checkMore: {
    color: '#8f9ba7'
  },
  detailContainer: {
    marginBottom: px2dp(140)
  }
})
