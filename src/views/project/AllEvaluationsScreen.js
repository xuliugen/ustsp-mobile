import React from 'React'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { HEADER_STYLE } from 'src/views/publish/common/style/HeaderStyle'
import { px2dp, px2sp, SCREEN_WIDTH } from 'src/utils/device'

import { getDemanOrderDetail } from 'src/ajax/project'

import StarRating from 'react-native-star-rating'

const Evaluate = (props) => {
  const renderStar = (num, size) =>
    <StarRating
      disabled
      maxStars={5}
      rating={num}
      starSize={size}
      fullStarColor={'#F9B25C'}
    />

  return (
    <View>
      <View style={styles.partyAContainer}>
        <View style={styles.title}>
          <View style={styles.titleLeft}>
            <Image source={{ uri: props.evaluations.avatar }} style={styles.avatar} />
            <Text style={styles.titleText}>{props.side}总体评价</Text>
          </View>
          <View>{renderStar(props.totalNum, 20)}</View>
        </View>
      </View>
      <View style={styles.evaluations}>
        <View style={styles.evaluationItem}>
          <Text style={styles.label}>{props.labelList[0]}：</Text>
          <View>{renderStar(props.evaluations.num1, 15)}</View>
        </View>
        <View style={styles.evaluationItem}>
          <Text style={styles.label}>{props.labelList[1]}：</Text>
          <View>{renderStar(props.evaluations.num2, 15)}</View>
        </View>
        <View style={styles.evaluationItem}>
          <Text style={styles.label}>{props.labelList[2]}：</Text>
          <View>{renderStar(props.evaluations.num3, 15)}</View>
        </View>
        <View style={styles.evaluationItem}>
          <Text style={styles.label}>{props.labelList[3]}：</Text>
          <View>{renderStar(props.evaluations.num4, 15)}</View>
        </View>
      </View>
    </View>
  )
}

export default class AllEvaluationsScreen extends React.Component {
  static navigationOptions = {
    title: '查看互评',
    headerStyle: { backgroundColor: '#ebf0f5' },
    headerTintColor: '#8f9ba7',
    headerTitleStyle: HEADER_STYLE.headerTitleStyle,
    headerRight: <Text />
  }

  constructor(props) {
    super(props)
    this.state = {
      partyA: [],
      partyB: []
    }
  }
  async componentDidMount() {
    const { navigation } = this.props
    try {
      const { data } = await getDemanOrderDetail(navigation.getParam('projectId'))
      const { owner, projectJointDTO, projectOwnerEvaluateDTO, projectPartyEvaluateDTO } = data.projectDetail
      const partyAInfo = {
        avatar: owner.partyAvatar,
        num1: projectOwnerEvaluateDTO.projectDifficulty,
        num2: projectOwnerEvaluateDTO.moneyReasonable,
        num3: projectOwnerEvaluateDTO.communicationsmoothness,
        num4: projectOwnerEvaluateDTO.demandChangeRate
      }
      const partyBInfo = {
        avatar: projectJointDTO.partyAvatar,
        num1: projectPartyEvaluateDTO.skill,
        num2: projectPartyEvaluateDTO.projectProgressefficiency,
        num3: projectPartyEvaluateDTO.communicationsmoothness,
        num4: projectPartyEvaluateDTO.servicePackages
      }
      this.setState({ partyA: partyAInfo, partyB: partyBInfo })
    } catch (err) {
      console.log(err)
    }
  }

  renderStar(num, size) {
    return (
      <StarRating
        disabled
        maxStars={5}
        rating={num}
        starSize={size}
        fullStarColor={'#F9B25C'}
      />
    )
  }

  render() {
    const { partyA, partyB } = this.state
    const avg1 = Math.floor((partyA.num1 + partyA.num2 + partyA.num3 + partyA.num4) / 4)
    const avg2 = Math.floor((partyB.num1 + partyB.num2 + partyB.num3 + partyB.num4) / 4)
    const labelListA = ['项目难度', '经费合理性', '沟通顺畅度', '经费及时性']
    const labelListB = ['专业技能', '项目进度效果', '沟通顺畅度', '运维服务']
    return (
      <View style={styles.container}>
        <ScrollView>
          <Evaluate evaluations={partyA} totalNum={avg1} labelList={labelListA} side={'甲方'} />
          <Evaluate evaluations={partyB} totalNum={avg2} labelList={labelListB} side={'乙方'} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#ebf0f5',
    height: '100%',
    paddingLeft: px2dp(30),
    paddingRight: px2dp(30)
  },
  partyAContainer: {
    marginTop: px2dp(30)
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: px2dp(30),
    paddingVertical: px2sp(20),
    borderTopLeftRadius: px2dp(10),
    borderTopRightRadius: px2dp(10),
    backgroundColor: '#fff'
  },
  titleLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: px2dp(100),
    height: px2dp(100),
    borderRadius: px2dp(50)
  },
  titleText: {
    fontSize: px2sp(32),
    color: '#666',
    marginLeft: px2dp(15)
  },
  evaluations: {
    alignItems: 'center',
    marginTop: px2dp(2),
    paddingTop: px2dp(20),
    paddingBottom: px2dp(30),
    borderBottomLeftRadius: px2dp(10),
    borderBottomRightRadius: px2dp(10),
    backgroundColor: '#fff'
  },
  evaluationItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: SCREEN_WIDTH / 2,
    paddingHorizontal: px2dp(20),
    paddingVertical: px2dp(15),
    marginTop: px2dp(20),
    borderRadius: px2dp(10),
    backgroundColor: '#F0F0F0'
  },
  label: {
    fontSize: px2sp(28),
    color: '#8f9ba7'
  }
})
