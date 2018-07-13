import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import { connect } from 'react-redux'

import { Title, Entry, FoldEntry, EducationInfo } from '../set'

import { px2dp } from 'src/utils/device'

const mapStateToProps = state => {
  return {
    user: state.talent.talent,
    userInfo: state.talent.talentInfo
  }
}

@connect(mapStateToProps)
export default class StudentDetailContent extends React.Component {
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
          <Title label="教育经历" />
          {userInfo.edu && (
            userInfo.edu.length > 0 ? userInfo.edu.map(item => {
              return <EducationInfo key={item.id} info={item} />
            }) : <FoldEntry />
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: px2dp(88)
  }
})
