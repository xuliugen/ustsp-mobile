import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import {APP_BACKGROUD_COLOR} from 'src/styles/common'

import EnterpriseDetailContent from './EnterpriseDetailContent'
import TalentDetailBottom from '../TalentDetailBottom'

export default class EnterpriseDetail extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <EnterpriseDetailContent />
        </ScrollView>
        <TalentDetailBottom />
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
