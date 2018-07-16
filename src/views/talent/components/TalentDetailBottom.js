import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { px2dp, px2sp, SCREEN_WIDTH } from 'src/utils/device'
import { MaterialIcons } from '@expo/vector-icons'

/**
 * @todo add friends
 */
export default class TalentDetailBottom extends React.Component {
  render() {
    return (
      <View style={styles.bottomBtn}>
        <TouchableOpacity style={styles.bottomBtnItem}>
          <View style={styles.textItem}>
            <MaterialIcons name="person-add" style={styles.btnText} />
            <Text style={styles.btnText}>加好友</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.bottomBtnItem}>
          <View style={styles.textItem}>
            <Feather name="eye" style={styles.btnText} />
            <Text style={styles.btnText}>关注TA</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bottomBtn: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    height: px2dp(88),
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff'
  },
  bottomBtnItem: {
    flex: 1,
    justifyContent: 'center'
  },
  textItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRightWidth: 1,
    borderRightColor: '#ddd'
  },
  btnText: {
    marginRight: px2dp(21),
    fontSize: px2sp(30),
    color: '#666'
  }
})
