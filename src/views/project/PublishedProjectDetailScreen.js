import React from 'React'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { HEADER_STYLE } from 'src/views/publish/common/style/HeaderStyle'
import { px2dp, px2sp } from 'src/utils/device'
import { Feather } from '@expo/vector-icons'
import { connect } from 'react-redux'

import LatestApplicantsScreen from './components/cards/latestApplicants/LatestApplicantsScreen'
import SignedApplicants from './components/cards/signedApplicants/SignedApplicants'
import UnderwayDetail from './components/cards/underwayDetail/UnderwayDeatil'
import Steps from './components/cards/common/Steps'

import BottomBtn from './components/cards/common/BottomBtn'
import TwoOptionBtn from './components/TwoOptionBtn'

import { fetchProjectDetail, clearProjectDetail } from 'src/actions'
import { getDemanOrderDetail, changeDemandStatus } from 'src/ajax/project'

const mapStatetoProps = state => ({
  project: state.project.detail,
  user: state.auth.user
})

@connect(mapStatetoProps)
export default class PublishedProjectDetailScreen extends React.Component {
  state={
    changeStatusProps: [] // 变更项目状态需要的参数
  }

  static navigationOptions = {
    title: '我发布的项目',
    headerStyle: HEADER_STYLE.headerStyle,
    headerTintColor: HEADER_STYLE.headerTintColor,
    headerTitleStyle: HEADER_STYLE.headerTitleStyle,
    headerRight: <Text />
  }

  componentDidMount() {
    const { dispatch, navigation } = this.props
    dispatch(fetchProjectDetail(navigation.getParam('projectId')))
    this.fetchProjectInfo(navigation.getParam('projectId'))
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(clearProjectDetail())
  }

  componentWillReceiveProps(nextProps) {
    this.fetchProjectInfo(nextProps.project.id)
  }

  async fetchProjectInfo(pid) {
    try {
      const {data} = await getDemanOrderDetail(pid)
      const status = data.projectDetail.status
      if ((status === 'underway') || (status === 'toEvaluate') || (status === 'toCheck')) {
        const changeStatusProps = {
          currentUserId: data.projectDetail.projectJointDTO.ownerId,
          partyId: data.projectDetail.projectJointDTO.partyId,
          ownerId: data.projectDetail.projectJointDTO.ownerId,
          projectId: data.projectDetail.projectJointDTO.projectId,
          status: 'underwayBreakA'
        }
        this.setState({
          changeStatusProps: changeStatusProps
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleCheckMore = () => {
    this.props.navigation.navigate('ProjectDetail', {
      projectId: this.props.project.id,
      store: true
    })
  }

  // 取消项目报名
  handlePressCancleApply = () => {
    Alert.alert('提示',
      '确定撤销此项目的报名请求？\n撤销后项目将进入中断', [
        {
          text: '取消'
        }, {
          text: '确定'
        }
      ])
  }

  // 中断项目
  handlePressStopProject = () => {
    Alert.alert('确定要中断项目请求吗？', '按cancel即可刷新状态', [
      {
        text: '取消',
        onPress: this.undateInfo
      }, {
        text: '确定',
        onPress: () => { this.changeProjectStatus(this.state.changeStatusProps) }
      }
    ])
  }

  // 确认验收
  checkAcceptance = () => {
    let changeStatusProps = this.state.changeStatusProps
    changeStatusProps.status = 'toEvaluate'
    this.changeProjectStatus(changeStatusProps)
  }

  // 驳回验收请求
  checkReject = () => {
    let changeStatusProps = this.state.changeStatusProps
    changeStatusProps.status = 'checkRejectA'
    Alert.alert('确定要驳回验收请求吗', '按cancel即可刷新状态', [
      {
        text: '取消',
        onPress: this.undateInfo
      }, {
        text: '确定',
        onPress: () => { this.changeProjectStatus(changeStatusProps) }
      }
    ])
  }

  // 变更项目状态，和底部按钮绑定
  changeProjectStatus = async (prop) => {
    try {
      await changeDemandStatus(prop)
      this.updateInfo()
    } catch (error) {
      console.log(error)
    }
  }

  // 刷新项目状态
  updateInfo = () => {
    const { dispatch, navigation } = this.props
    dispatch(fetchProjectDetail(navigation.getParam('projectId')))
  }

  renderCard = () => {
    /* toAudit(0, "审核"),
    applying(1, "报名中"),
    toSign(2, "待签单"),
    underway(3, "进行中"),
    toCheck(4, "待验收"),
    toEvaluate(5, "评价"),
    finished(6, "完成"), */
    const projectId = this.props.navigation.getParam('projectId')
    switch (this.props.project.status) {
      case 1:
        return <LatestApplicantsScreen projectId={projectId} />
      case 2:
        return <SignedApplicants projectId={projectId} />
      case 3:
        return <UnderwayDetail side={'partyB'} projectId={projectId} />
      case 4:
        return <UnderwayDetail side={'partyB'} projectId={projectId} />
      case 5:
        return <UnderwayDetail side={'partyB'} next={'toEvaluate'} projectId={projectId} />
      case 6:
        return <UnderwayDetail side={'partyB'} next={'finish'} projectId={projectId} />
      default: return null
    }
  }

  renderBottomButton = () => {
    switch (this.props.project.status) {
      case 1:
        return <BottomBtn handleClickFunc={this.handlePressCancleApply} lable={'取消报名'} />
      case 3:
        return <BottomBtn handleClickFunc={this.handlePressStopProject} lable={'中断项目'} />
      case 4:
        return <TwoOptionBtn handlePressStop={this.checkAcceptance} handlePressCheck={this.checkReject}
          labelA={'确认验收'} labelB={'驳回验收'} />
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
          </View>
          <View style={styles.step}>
            <Steps position={this.props.project.status} />
          </View>
        </View>
        <ScrollView>
          <View style={styles.detailContainer}>
            {this.renderCard()}
          </View>
        </ScrollView>
        { this.renderBottomButton() }
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
  detailContainer: {
    marginBottom: px2dp(140)
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
  step: {
    marginRight: px2dp(30),
    marginBottom: px2dp(30)
  }
})
