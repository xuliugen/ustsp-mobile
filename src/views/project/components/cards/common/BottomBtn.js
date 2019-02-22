import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { px2dp, px2sp, SCREEN_WIDTH } from 'src/utils/device'

export default class CancleBottomBtn extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.handleClickFunc}>
        <View style={styles.cancleBtn}>
          <Text style={styles.cancleEnroll}>{this.props.lable}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0
  },
  cancleBtn: {
    alignItems: 'center',
    width: SCREEN_WIDTH - px2dp(60),
    borderRadius: px2dp(10),
    marginBottom: px2dp(30),
    marginLeft: px2dp(30),
    marginRight: px2dp(30),
    paddingTop: px2dp(30),
    paddingBottom: px2dp(30),
    backgroundColor: '#3091e6'
  },
  cancleEnroll: {
    fontSize: px2sp(30),
    color: '#ffffff'
  }
})
