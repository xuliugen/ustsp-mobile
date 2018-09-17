import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

import { px2sp, px2dp } from 'src/utils/device'

export default class ListItem extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.isMust ? <Text style={{color: '#8f9ba7', paddingTop: px2dp(10)}}>*</Text> : null}
        <Text style={{color: '#666', fontSize: px2sp(30)}}>{this.props.name}</Text>
        <View style={{
          position: 'absolute',
          right: '5%'}}>
          <Image source={require('src/img/rightArrow.png')} style={styles.rightArrow} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: px2dp(30),
    height: px2dp(88),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#ebeaeb'
  },
  rightArrow: {
    height: px2dp(20),
    width: px2dp(15)
  }
})
