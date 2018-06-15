import React from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import TextInput from '../../components/common/TextInput'
import { Feather } from '@expo/vector-icons'

import { APP_BACKGROUD_COLOR } from '../../styles/common'
import { px2dp, px2sp } from '../../utils/device'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUD_COLOR
  },

  search: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden'
  },
  searchInput: {
    paddingLeft: px2dp(30),
    height: px2dp(60),
    backgroundColor: '#fff',
    fontSize: px2sp(28),
    color: '#333'
  },
  headerRightText: {
    // marginLeft: px2dp(16),
    // marginRight: px2dp(32),
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: px2sp(28)
  }
})

class HeaderSearch extends React.Component {
  render() {
    const searchIptProps = {
      underlineColorAndroid: 'transparent',
      placeholder: '搜索'
    }
    return (
      <View style={styles.search}>
        <TextInput {...searchIptProps} style={styles.searchInput} />
      </View>
    )
  }
}

export default class ProjectSearch extends React.Component {
  static navigationOptions = {
    headerTitle: <HeaderSearch />,
    headerRight: (
      <View style={{ flex: 1, alignItems: 'center', width: 56 }}>
        <TouchableOpacity onPress={() => alert('This is a button!')}>
          <Text style={styles.headerRightText}><Feather name="filter" />&nbsp;筛选</Text>
        </TouchableOpacity>
      </View>
    ),
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff'
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text>1243</Text>
        </ScrollView>
      </View>
    )
  }
}
