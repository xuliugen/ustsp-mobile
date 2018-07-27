import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import TextInput from 'src/components/common/TextInput'
import { connect } from 'react-redux'

import { px2dp, px2sp } from 'src/utils/device'
import { setSearchCondition, fetchSearchResult, setSearchPage } from 'src/actions'

const mapStateToProps = state => ({
  searchIptVal: state.search.reqPayload.condition
})

/**
 * @todo: ios TextInput bug
 */
@connect(mapStateToProps)
export default class HeaderTitleSearch extends React.Component {
  state = {
    showDeleteIcon: false
  }
  textInput = React.createRef()

  searchProjects() {
    const search = this.props.searchIptVal.trim()
    if (search) {
      this.props.dispatch(setSearchPage(1))
      this.props.dispatch(fetchSearchResult())
    }
  }

  setSearchIptVal(text) {
    this.props.dispatch(setSearchCondition(text))
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
    // this.textInput.current.clear()
    this.setSearchIptVal('')
  }

  render() {
    const searchIptProps = {
      underlineColorAndroid: 'transparent',
      placeholder: '搜索'
    }
    return (
      <View style={styles.search}>
        {/* 正常情况下 value 搭配 onChange 可以可控地使用 TextInput,  */}
        {/* 但 IOS 使用可控 TextInput 上输入有 bug */}
        {/* 所以等 github 的 pr merged 或是 eject 后改 library */}
        <TextInput
          inputRef={this.textInput}
          {...searchIptProps}
          returnKeyType="search"
          style={styles.searchInput}
          onSubmitEditing={this.handleSubmit}
          value={this.props.searchIptVal}
          onChangeText={(text) => this.setSearchIptVal(text)}
          onFocus={this.handleIptFocus}
          onBlur={this.handleIptBlur} />
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
