import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { APP_BACKGROUD_COLOR } from 'src/styles/common'

import TalentDetailBottom from './components/TalentDetailBottom'
import Introduction from './components/teacher-detail/Introduction'

export default class TeacherDetail extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Introduction />
        </ScrollView>
        <TalentDetailBottom />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: APP_BACKGROUD_COLOR
  }
})
