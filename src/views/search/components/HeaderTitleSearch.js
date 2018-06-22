import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import TextInput from 'src/components/common/TextInput'

import { px2dp, px2sp } from 'src/utils/device'

export default class HeaderTitleSearch extends React.Component {
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

const styles = StyleSheet.create({
  search: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden'
  },
  searchInput: {
    paddingLeft: px2dp(30),
    paddingRight: px2dp(60),
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
  }
})
