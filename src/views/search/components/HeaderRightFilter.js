import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { connect } from 'react-redux'

import { px2sp } from 'src/utils/device'
import { setSideMenuOpenState } from 'src/actions'

const mapStateToProps = state => ({
  isOpen: state.search.isOpen
})

@connect(mapStateToProps)
export default class HeaderRightFilter extends React.Component {
  onPress = () => {
    this.props.dispatch(setSideMenuOpenState(!this.props.isOpen))
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.headerRightText}><Feather name="filter" />&nbsp;筛选</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: 56
  },
  headerRightText: {
    // marginLeft: px2dp(16),
    // marginRight: px2dp(32),
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: px2sp(28)
  }
})
