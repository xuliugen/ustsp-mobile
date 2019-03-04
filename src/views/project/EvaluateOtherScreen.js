import React from 'React'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { px2dp, px2sp } from 'src/utils/device'
import { HEADER_STYLE } from 'src/views/publish/common/style/HeaderStyle'
import { connect } from 'react-redux'

import { submitEvaluation, getDemanOrderDetail } from 'src/ajax/project'
import { fetchProjectDetail } from 'src/actions'

import StarRating from 'react-native-star-rating'

const mapStatetoProps = state => ({
  project: state.project.detail
})

@connect(mapStatetoProps)
export default class EvaluateOtherScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: '评价合作方',
    headerStyle: { backgroundColor: '#ebf0f5' },
    headerTintColor: '#8f9ba7',
    headerTitleStyle: HEADER_STYLE.headerTitleStyle,
    headerRight: <View>{ navigation.getParam('headerRight') }</View>
  })

  constructor(props) {
    super(props)
    const { side } = this.props.navigation.state.params
    this.state = {
      ratings: [0, 0, 0, 0],
      numTotal: 0,
      disabled: false,
      projectId: '',
      ownerId: '',
      partyId: '',
      side: side
    }
  }

  async componentDidMount() {
    const { navigation } = this.props
    try {
      const { data } = await getDemanOrderDetail(navigation.getParam('projectId'))
      this.setState({
        partyId: data.projectDetail.projectJointDTO.partyId,
        ownerId: data.projectDetail.projectJointDTO.ownerId,
        projectId: data.projectDetail.projectJointDTO.projectId
      })
      this.renderHeaderRight()
      if (this.isEvaluated(data)) {
        this.props.navigation.setParams({ headerRight: null }) // 去掉headerRight
        this.startRating(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  onStarRatingPress(rating, index) {
    this.setState((prevState) => {
      let currentState = prevState.ratings.concat()
      currentState[index] = rating
      let avg = (currentState[0] + currentState[1] + currentState[2] + currentState[3]) / 4
      return {ratings: currentState, numTotal: Math.floor(avg)}
    }, () => this.renderHeaderRight())
  }

  // 判断是否评价过
  isEvaluated(prop) {
    const { side } = this.props.navigation.state.params
    const projectPartyEvaluation = prop.projectDetail.projectPartyEvaluateDTO
    const projectOwnerEvaluation = prop.projectDetail.projectOwnerEvaluateDTO
    if ((side === 'partyB' && projectPartyEvaluation) || (side === 'partyA' && projectOwnerEvaluation)) {
      return true
    } else {
      return false
    }
  }

  // headerRight'发布'按钮
  renderHeaderRight() {
    const state = this.state
    const titleRight = <TouchableOpacity onPress={() => this.submitEvaluation(state)} style={styles.titleRight}>
      <Text style={styles.headerRightText}>发布</Text>
    </TouchableOpacity>
    this.props.navigation.setParams({headerRight: titleRight})
  }

  // 提交评价
  async submitEvaluation(val) {
    try {
      const evaluation = {
        partyId: val.partyId,
        ownerId: val.ownerId,
        projectId: val.projectId,
        num1: val.ratings[0],
        num2: val.ratings[1],
        num3: val.ratings[2],
        num4: val.ratings[3],
        type: val.side === 'partyA' ? 'B' : 'A'
      }
      await submitEvaluation(evaluation)
      this.props.dispatch(fetchProjectDetail(this.props.navigation.getParam('projectId')))
      this.props.navigation.goBack(null)
    } catch (err) {
      console.log(err)
    }
  }

  // 已评价，直接赋分
  startRating(prop) {
    const { side } = this.props.navigation.state.params
    const projectPartyEvaluation = prop.projectDetail.projectPartyEvaluateDTO
    const projectOwnerEvaluation = prop.projectDetail.projectOwnerEvaluateDTO
    if (side === 'partyA') {
      const { projectDifficulty, moneyReasonable, communicationsmoothness, demandChangeRate } = projectOwnerEvaluation
      const numTotal = (projectDifficulty + moneyReasonable + communicationsmoothness + demandChangeRate) / 4
      this.setState({
        ratings: [projectDifficulty, moneyReasonable, communicationsmoothness, demandChangeRate],
        numTotal: Math.floor(numTotal),
        disabled: true
      })
    } else if (side === 'partyB') {
      const { skill, projectProgressefficiency, communicationsmoothness, servicePackages } = projectPartyEvaluation
      const numTotal = (skill + projectProgressefficiency + communicationsmoothness + servicePackages) / 4
      this.setState({
        ratings: [skill, projectProgressefficiency, communicationsmoothness, servicePackages],
        numTotal: Math.floor(numTotal),
        disabled: true
      })
    }
  }

  render() {
    const labelListA = ['专业技能', '项目进度效果', '沟通顺畅度', '运维服务']
    const labelListB = ['项目难度', '经费合理性', '沟通顺畅度', '经费及时性']
    const { side } = this.props.navigation.state.params
    const labelList = side === 'partyB' ? labelListA : labelListB
    return (
      <View style={styles.container}>
        <View style={styles.evaluate}>
          {
            labelList.map((item, idx) => {
              return (
                <View style={styles.evaluateItem} key={idx}>
                  <Text style={styles.label}>{labelList[idx]}</Text>
                  <StarRating
                    disabled={this.state.disabled}
                    maxStars={5}
                    starSize={30}
                    rating={this.state.ratings[idx]}
                    fullStarColor={'#F9B25C'}
                    selectedStar={(rating) => this.onStarRatingPress(rating, idx)}
                  />
                </View>
              )
            })
          }
          <View style={styles.evaluateItem}>
            <Text style={styles.label}>总体评价</Text>
            <StarRating
              disabled
              maxStars={5}
              starSize={30}
              rating={this.state.numTotal}
              fullStarColor={'#F9B25C'}
            />
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
    backgroundColor: '#ebf0f5',
    height: '100%',
    paddingLeft: px2dp(30),
    paddingRight: px2dp(30)
  },
  evaluate: {
    marginTop: px2dp(30),
    paddingLeft: px2dp(30),
    paddingRight: px2dp(30),
    paddingTop: px2dp(60),
    paddingBottom: px2dp(60),
    borderRadius: px2dp(10),
    backgroundColor: '#FFF'
  },
  evaluateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: px2dp(20)
  },
  label: {
    fontSize: px2sp(28),
    color: '#666'
  },
  titleRight: {
    marginRight: px2dp(30)
  },
  headerRightText: {
    fontSize: px2sp(28),
    color: '#8f9ba7'
  }
})
