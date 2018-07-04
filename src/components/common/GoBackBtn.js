import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'

const GoBackBtn = props => {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={() => props.navigation.goBack(null)}>
      <Feather name="arrow-left" size={18} style={styles.goback} />
    </TouchableOpacity>
  )
}

export default withNavigation(GoBackBtn)

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  goback: {
    color: '#fff'
  }
})
