import React from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native'
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

class HeaderTitleSearch extends React.Component {
  state = {
    searchIptVal: '',
    showDeleteIcon: false
  }
  textInput = React.createRef()

  searchProjects() {
    const search = this.state.searchIptVal.trim()
    if (search) {
      Alert.alert(this.state.searchIptVal)
    }
  }

  setSearchIptVal(val) {
    this.setState({ searchIptVal: val })
  }
  setShowDeleteIcon(isShow) {
    this.setState({ showDeleteIcon: isShow })
  }

  handleSubmit = () => {
    this.searchProjects()
  }
  handleIptFocus = () => {
    this.setShowDeleteIcon(true)
  }
  handleIptBlur = () => {
    this.setShowDeleteIcon(false)
  }
  handleDeletePress = () => {
    this.textInput.current.clear()
    this.setSearchIptVal('')
  }

  render() {
    const searchIptProps = {
      underlineColorAndroid: 'transparent',
      placeholder: '搜索'
    }
    return (
      <View style={styles.search}>
        <TextInput inputRef={this.textInput} {...searchIptProps} style={styles.searchInput}
          onSubmitEditing={this.handleSubmit}
          value={this.state.searchIptVal} onChangeText={(text) => this.setSearchIptVal(text)}
          onFocus={this.handleIptFocus} onBlur={this.handleIptBlur} />
        {this.state.showDeleteIcon &&
          <View style={styles.deleteIconContainer}>
            <TouchableOpacity onPress={this.handleDeletePress}>
              <Text style={styles.deleteIcon}>×</Text>
            </TouchableOpacity>
          </View>}
      </View>
    )
  }
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
