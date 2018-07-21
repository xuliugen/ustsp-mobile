import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import EnterpriseDetailContent from './EnterpriseDetailContent'
import TalentDetailBottom from '../TalentDetailBottom'

import { checkIfLogin, checkIfInfoCompleted } from 'src/selectors'
import { APP_BACKGROUD_COLOR } from 'src/styles/common'

const mapStateToProps = state => {
  return {
    isLogin: checkIfLogin(state),
    isCompleted: checkIfInfoCompleted(state),
    userId: state.auth.user.id
  }
}

@connect(mapStateToProps)
export default class EnterpriseDetail extends React.Component {
  render() {
    const { isLogin, userId, id } = this.props
    return (
      <View style={styles.container}>
        <ScrollView>
          <EnterpriseDetailContent />
        </ScrollView>
        {!(isLogin && (userId === id)) && <TalentDetailBottom {...this.props} />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: APP_BACKGROUD_COLOR
  }
})
