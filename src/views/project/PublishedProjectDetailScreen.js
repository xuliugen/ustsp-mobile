import React from 'React'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { HEADER_STYLE } from 'src/views/publish/common/style/HeaderStyle'
import { px2dp, px2sp, SCREEN_WIDTH } from 'src/utils/device'
import { Feather } from '@expo/vector-icons'
import { connect } from 'react-redux'

import LatestApplicantsScreen from './components/cards/latestApplicants/LatestApplicantsScreen'
import SignedApplicants from './components/cards/signedApplicants/SignedApplicants'
import CancleApplyBtn from './components/cards/common/CancleApplyBtn'

import { fetchProjectDetail, clearProjectDetail } from 'src/actions'
import { getDemanOrderDetail } from 'src/ajax/project'
import { projectStatusNum2Str } from 'src/utils/format'

const mapStatetoProps = state => ({
  project: state.project.detail,
  user: state.auth.user
})

@connect(mapStatetoProps)
export default class PublishedProjectDetailScreen extends React.Component {
  state={
    applicants: [], // 已报名
    partyB: [] // 签单待确认乙方
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
      default: return null
    }
  }

  renderBottomButton = () => {
    switch (this.props.project.status) {
      case 1:
        return <CancleApplyBtn />
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
        { this.renderCard()}
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
  cancleBtn: {
    position: 'absolute',
    bottom: px2dp(0),
    alignItems: 'center',
    width: SCREEN_WIDTH - px2dp(60),
    borderRadius: px2dp(10),
    marginBottom: px2dp(30),
    marginLeft: px2dp(30),
    marginRight: px2dp(30),
    paddingTop: px2dp(30),
    paddingBottom: px2dp(30),
    backgroundColor: '#3091e6'
  },
  cancleEnroll: {
    fontSize: px2sp(30),
    color: '#ffffff'
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
