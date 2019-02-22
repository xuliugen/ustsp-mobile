import React from 'React'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { HEADER_STYLE } from 'src/views/publish/common/style/HeaderStyle'
import { px2dp, px2sp } from 'src/utils/device'
import { Feather } from '@expo/vector-icons'
import { connect } from 'react-redux'

import LatestApplicantsScreen from './components/cards/latestApplicants/LatestApplicantsScreen'
import SignedApplicants from './components/cards/signedApplicants/SignedApplicants'
import UnderwayDetail from './components/cards/underwayDetail/UnderwayDeatil'

import BottomBtn from './components/cards/common/BottomBtn'

import { fetchProjectDetail, clearProjectDetail } from 'src/actions'
import { getDemanOrderDetail, changeDemandStatus } from 'src/ajax/project'
import { projectStatusNum2Str } from 'src/utils/format'

const mapStatetoProps = state => ({
  project: state.project.detail,
  user: state.auth.user
})

@connect(mapStatetoProps)
export default class PublishedProjectDetailScreen extends React.Component {
  state={
    applicants: [], // 已报名
    partyB: [], // 签单待确认乙方
    oppositeDetail: [], // 项目乙方
    underwayDetail: [], // 进行中项目信息
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
      if (data.projectDetail.status === 'applying') {
        this.setState({applicants: data.applicants.data})
      } else if (data.projectDetail.status === 'toSign') {
        const applyDate = {applyDate: data.projectDetail.applyData}
        const partyB = {...data.projectDetail.projectJointDTO, ...applyDate}
        this.setState({partyB: partyB})
      } else if (data.projectDetail.status === 'underway') {
        const oppositeDetail = {
          id: data.projectDetail.projectJointDTO.partyId,
          name: data.projectDetail.projectJointDTO.partyName,
          type: data.projectDetail.projectJointDTO.partyType,
          contact: data.projectDetail.projectJointDTO.partyContact,
          avatar: data.projectDetail.projectJointDTO.partyAvatar,
          location: data.projectDetail.projectJointDTO.partyLocation
        }
        const underwayDetail = {
          applyDate: data.projectDetail.applyData,
          signDate: data.projectDetail.projectJointDTO.date,
          startDate: data.projectDetail.projectResearchInfo.startTime,
          endDate: data.projectDetail.projectResearchInfo.endTime
        }
        const changeStatusProps = {
          currentUserId: data.projectDetail.projectJointDTO.ownerId,
          partyId: data.projectDetail.projectJointDTO.partyId,
          ownerId: data.projectDetail.projectJointDTO.ownerId,
          projectId: data.projectDetail.projectJointDTO.projectId,
          status: 'underwayBreakA'
        }
        this.setState({
          oppositeDetail: oppositeDetail,
          underwayDetail: underwayDetail,
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
        onPress: this.changeProjectStatus
      }
    ])
  }

  // 变更项目状态，和底部按钮绑定
  changeProjectStatus = async () => {
    try {
      await changeDemandStatus(this.state.changeStatusProps)
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
    switch (this.props.project.status) {
      case 1:
        return <LatestApplicantsScreen applicants={this.state.applicants} user={this.props.user} />
      case 2:
        return <SignedApplicants partyB={this.state.partyB} user={this.props.user} />
      case 3:
        return <UnderwayDetail oppositeDetail={this.state.oppositeDetail}
          underwayDetail={this.state.underwayDetail} side={'partyB'} />
      default: return null
    }
  }

  renderBottomButton = () => {
    switch (this.props.project.status) {
      case 1:
        return <BottomBtn handleClickFunc={this.handlePressCancleApply} lable={'取消报名'} />
      case 3:
        return <BottomBtn handleClickFunc={this.handlePressStopProject} lable={'中断项目'} />
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
        <ScrollView >
          <View style={styles.detailContainer}>
            { this.renderCard()}
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
  }
})
