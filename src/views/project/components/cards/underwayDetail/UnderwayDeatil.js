import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { px2dp, px2sp } from 'src/utils/device'
import talentNavDecorator from 'src/components/common/talentNavDecorator'
import { parseTime } from 'src/utils/format'
import OppositeDetail from '../common/OppositeDetail'
import { connect } from 'react-redux'
import { getDemanOrderDetail } from 'src/ajax/project'

const mapStatetoProps = state => ({
  project: state.project.detail
})

const TalentwithNav = talentNavDecorator(OppositeDetail)

@connect(mapStatetoProps)
export default class UnderwayDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      underwayDetail: [],
      oppositeDetail: []
    }
  }
  async componentDidMount() {
    try {
      const { data } = await getDemanOrderDetail(this.props.projectId)
      const underwayDetail = {
        applyDate: data.projectDetail.applyData,
        signDate: data.projectDetail.projectJointDTO.date,
        startDate: data.projectDetail.projectResearchInfo.startTime,
        endDate: data.projectDetail.projectResearchInfo.endTime
      }

      let oppositeDetail
      if (this.props.side === 'partyB') {
        // 乙方信息
        oppositeDetail = {
          id: data.projectDetail.projectJointDTO.partyId,
          name: data.projectDetail.projectJointDTO.partyName,
          type: data.projectDetail.projectJointDTO.partyType,
          contact: data.projectDetail.projectJointDTO.partyContact,
          avatar: data.projectDetail.projectJointDTO.partyAvatar,
          location: data.projectDetail.projectJointDTO.partyLocation
        }
      } else {
        // 甲方信息
        oppositeDetail = {
          id: data.projectDetail.owner.ownerId,
          name: data.projectDetail.owner.partyName,
          type: data.projectDetail.owner.partyType,
          contact: data.projectDetail.owner.partyContact,
          avatar: data.projectDetail.owner.partyAvatar,
          location: data.projectDetail.owner.partyLocation
        }
      }
      this.setState({underwayDetail: underwayDetail, oppositeDetail: oppositeDetail})
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { underwayDetail, oppositeDetail } = this.state
    return (
      <View style={styles.container}>
        <TalentwithNav talentNav={{id: oppositeDetail.id, type: oppositeDetail.type}} projectId={this.props.projectId}
          oppositeDetail={oppositeDetail} side={this.props.side} next={this.props.next} />
        <View style={styles.timeDetailContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>进度详情</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.text}>报名时间：{parseTime(underwayDetail.applyDate)}</Text>
            <Text style={styles.text}>签单时间：{parseTime(underwayDetail.signDate)}</Text>
            <Text style={styles.text}>预计开始时间：{parseTime(underwayDetail.startDate)}</Text>
            <Text style={styles.text}>预计结束时间：{parseTime(underwayDetail.endDate)}</Text>
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
    height: '100%',
    marginTop: px2dp(30)
  },
  timeDetailContainer: {
    flexDirection: 'column',
    marginTop: px2dp(30)
  },
  titleContainer: {
    padding: px2dp(30),
    borderTopLeftRadius: px2dp(10),
    borderTopRightRadius: px2dp(10),
    backgroundColor: '#fff'
  },
  title: {
    fontSize: px2sp(32),
    color: '#666'
  },
  timeContainer: {
    marginTop: px2dp(2),
    paddingVertical: px2dp(20),
    paddingLeft: px2dp(60),
    borderBottomLeftRadius: px2dp(10),
    borderBottomRightRadius: px2dp(10),
    backgroundColor: '#fff'
  },
  text: {
    paddingVertical: px2dp(10),
    fontSize: px2sp(26),
    color: '#8f9ba7'
  }

})
