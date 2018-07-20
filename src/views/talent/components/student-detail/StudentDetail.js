import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { APP_BACKGROUD_COLOR } from 'src/styles/common'

import TalentDetailBottom from '../TalentDetailBottom'
import StudentDetailContent from './StudentDetailContent'

export default class StudentDetail extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <StudentDetailContent />
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
