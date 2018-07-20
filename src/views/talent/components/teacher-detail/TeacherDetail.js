import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { APP_BACKGROUD_COLOR } from 'src/styles/common'

import TalentDetailBottom from '../TalentDetailBottom'
import TeacherDetailContent from './TeacherDetailContent'
import { checkIfLogin, checkIfInfoCompleted } from 'src/selectors'

const mapStateToProps = state => {
  return {
    isLogin: checkIfLogin(state),
    isCompleted: checkIfInfoCompleted(state),
    userId: state.auth.user.id
  }
}

@connect(mapStateToProps)
export default class TeacherDetail extends React.Component {
  render() {
    const {isLogin, userId, id} = this.props
    return (
      <View style={styles.container}>
        <ScrollView>
          <TeacherDetailContent />
        </ScrollView>
        {!(isLogin && (userId === id)) && <TalentDetailBottom {...this.props} />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: APP_BACKGROUD_COLOR
  }
})
