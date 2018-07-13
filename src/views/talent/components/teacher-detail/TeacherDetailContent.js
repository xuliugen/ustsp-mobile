import React from 'react'
import { StyleSheet, View } from 'react-native'
import { px2dp } from 'src/utils/device'
import { connect } from 'react-redux'

import { Title, Entry, FoldEntry, ResearchInfo, EducationInfo, AwardInfo } from '../set'

const mapStateToProps = state => {
  return {
    user: state.talent.talent,
    userInfo: state.talent.talentInfo
  }
}

@connect(mapStateToProps)
export default class TeacherDetailContent extends React.Component {
  render() {
    const { userInfo } = this.props
    return (
      <View style={styles.container}>
        <View>
          <Title label="基本资料" />
          <Entry title="姓名" text={userInfo.realName} />
          <Entry title="邮箱" text={userInfo.email} />
          <Entry title="QQ" text={userInfo.qq} />
          <Entry title="WeChat" text={userInfo.wechat} />
        </View>

        <View>
          <Title label="个人简介" />
          <FoldEntry text={userInfo.introduction} />
        </View>

        <View>
          <Title label="学术经历" />
          <FoldEntry text={userInfo.academicExperience} />
        </View>

        <View>
          <Title label="科研介绍" />
          <FoldEntry text={userInfo.scienceIntroduction} />
        </View>

        <View>
          <Title label="发表文章" />
          <FoldEntry text={userInfo.publishPaper} />
        </View>

        {userInfo.userEducationInfoDTO && userInfo.userEducationInfoDTO.length > 0 &&
          <View>
            <Title label="教育经历" />
            {userInfo.userEducationInfoDTO.map(item => {
              return <EducationInfo key={item.id} info={item} />
            })}
          </View>
        }

        {userInfo.researchInfoDTO && userInfo.researchInfoDTO.length > 0 &&
          <View>
            <Title label="科研情况" />
            {userInfo.researchInfoDTO.map(item => {
              return <ResearchInfo key={item.startTime} info={item} />
            })})}
          </View>
        }

        {userInfo.userAwardInfoDTO && userInfo.userAwardInfoDTO.length > 0 &&
          <View>
            <Title label="获奖经历" />
            {userInfo.userAwardInfoDTO.map(item => (<AwardInfo key={item.id} info={item} />))}
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: px2dp(88)
  }
})
