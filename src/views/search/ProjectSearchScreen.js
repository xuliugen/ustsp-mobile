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
  deleteIconContainer: {
    position: 'absolute',
    top: px2dp(15),
    right: px2dp(20),
    alignItems: 'center',
    justifyContent: 'center',
    width: px2dp(30),
    height: px2dp(30),
    borderRadius: px2dp(30 / 2),
    backgroundColor: '#8d9caa'
  },
  deleteIcon: {
    flex: 1,
    textAlign: 'center',
    lineHeight: px2dp(30),
    color: '#fff'
  },
  headerRightText: {
    // marginLeft: px2dp(16),
    // marginRight: px2dp(32),
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: px2sp(28)
  }
})

const HeaderTitleSearch = props => {
  const searchIptProps = {
    underlineColorAndroid: 'transparent',
    placeholder: '搜索'
  }
  return (
    <View style={styles.search}>
      <TextInput {...searchIptProps} style={styles.searchInput} />
      <View style={styles.deleteIconContainer}><Text style={styles.deleteIcon}>×</Text></View>
    </View>
  )
}

export default class ProjectSearch extends React.Component {
  state = {
    searchIptVal: ''
  }

  static navigationOptions = {
    headerTitle: <HeaderTitleSearch />,
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
