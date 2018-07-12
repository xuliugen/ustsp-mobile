import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { px2dp, px2sp } from 'src/utils/device'
import { connect } from 'react-redux'
import {Entry, FoldEntry, ResearchInfo, EducationInfo, AwardInfo} from './entries'

const mapStateToProps = state => {
  return {
    user: state.talent.talent,
    userInfo: state.talent.talentInfo
  }
}

/**
 * @todo: userEducationInfoDTO & userAwardInfoDTO
 */
@connect(mapStateToProps)
export default class Introduction extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>基本资料</Text>
          <Entry title="姓名" text={this.props.userInfo.realName} />
          <Entry title="邮箱" text={this.props.userInfo.email} />
          <Entry title="QQ" text={this.props.userInfo.qq} />
          <Entry title="WeChat" text={this.props.userInfo.wechat} />
        </View>
        <View>
          <Text style={styles.title}>个人简介</Text>
          <FoldEntry text={this.props.userInfo.introduction} />
        </View>
        <View>
          <Text style={styles.title}>学术经历</Text>
          <FoldEntry text={this.props.userInfo.academicExperience} />
        </View>
        <View>
          <Text style={styles.title}>科研介绍</Text>
          <FoldEntry text={this.props.userInfo.scienceIntroduction} />
        </View>
        <View>
          <Text style={styles.title}>发表文章</Text>
          <FoldEntry text={this.props.userInfo.publishPaper} />
        </View>
        <View>
          <Text style={styles.title}>教育经历</Text>
          {this.props.userInfo.userEducationInfoDTO && (this.props.userInfo.userEducationInfoDTO.length > 0 ? this.props.userInfo.userEducationInfoDTO.map(item => <EducationInfo key={item.id} info={item} />) : <FoldEntry />)}
        </View>
        <View>
          <Text style={styles.title}>科研情况</Text>
          {this.props.userInfo.researchInfoDTO && (this.props.userInfo.researchInfoDTO.length > 0 ? this.props.userInfo.researchInfoDTO.map(item => <ResearchInfo key={item.startTime} info={item} />) : <FoldEntry />)}
        </View>
        <View>
          <Text style={styles.title}>获奖经历</Text>
          {this.props.userInfo.userAwardInfoDTO && (this.props.userInfo.userAwardInfoDTO.length > 0 ? this.props.userInfo.userAwardInfoDTO.map(item => <AwardInfo key={item.id} info={item} />) : <FoldEntry />)}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: px2dp(88)
  },
  title: {
    paddingLeft: px2dp(30),
    paddingVertical: px2dp(37),
    fontSize: px2sp(28),
    color: '#666'
  }
})
