import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { APP_BACKGROUD_COLOR } from 'src/styles/common'

import TalentDetailBottom from '../TalentDetailBottom'
import TeacherDetailContent from './TeacherDetailContent'

export default class TeacherDetail extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TeacherDetailContent />
        </ScrollView>
        <TalentDetailBottom />
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
