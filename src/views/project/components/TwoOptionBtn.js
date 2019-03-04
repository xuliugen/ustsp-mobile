import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { px2dp, px2sp, SCREEN_WIDTH } from 'src/utils/device'

export default class TwoOptionBtn extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnItemA} onPress={this.props.handlePressStop}>
          <Text style={styles.lableA}>{this.props.labelA}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnItemB} onPress={this.props.handlePressCheck}>
          <Text style={styles.lableB}>{this.props.labelB}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH,
    borderTopWidth: px2dp(1),
    borderTopColor: '#ccc'
  },
  btnItemA: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: px2dp(30),
    width: 0.5 * SCREEN_WIDTH,
    backgroundColor: '#fff'
  },
  btnItemB: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: px2dp(30),
    width: 0.5 * SCREEN_WIDTH,
    backgroundColor: '#3091E6'
  },
  lableA: {
    fontSize: px2sp(30),
    color: '#8f9ba7'
  },
  lableB: {
    fontSize: px2sp(30),
    color: '#fff'
  }
})
