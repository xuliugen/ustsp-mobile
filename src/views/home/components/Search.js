import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import TextInput from 'src/components/common/TextInput'
import { EvilIcons } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'

import { toSearchPageByType } from 'src/utils/nav'
import { px2dp, px2sp } from 'src/utils/device'

@withNavigation
export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedType: 'project',
      searchIptVal: ''
    }
  }

  setSelectedType(type) {
    this.setState({
      selectedType: type
    })
  }

  handleSubmit = () => {
    toSearchPageByType(this.state.selectedType, this.props.navigation)
  }

  render() {
    const textIptProps = {
      underlineColorAndroid: 'transparent',
      placeholder: '搜索'
    }
    const tabConfig = [{
      type: 'talent',
      title: '搜人才'
    }, {
      type: 'project',
      title: '搜项目'
    }, {
      type: 'patent',
      title: '搜专利'
    }]
    return (
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          {tabConfig.map(({ type, title }) => {
            return <Tab key={type} type={type} title={title}
              setSelectedType={this.setSelectedType.bind(this)} curType={this.state.selectedType} />
          })}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={this.state.searchIptVal} onChangeText={(text) => this.setState({ searchIptVal: text })}
            onSubmitEditing={this.handleSubmit}
            {...textIptProps} style={styles.input} />
          <EvilIcons name="search" size={25} color="#999" onPress={this.handleSubmit} />
        </View>
      </View>
    )
  }
}

class Tab extends React.Component {
  handleTabPress = (type, curType) => {
    if (type !== curType) {
      this.props.setSelectedType(type)
    }
  }

  getTabStyle(type) {
    if (type === this.props.curType) {
      return StyleSheet.flatten([styles.tab, styles.tabSelected])
    } else {
      return styles.tab
    }
  }

  getTabTextStyle(type) {
    if (type === this.props.curType) {
      return StyleSheet.flatten([styles.tabText, styles.tabTextSelected])
    } else {
      return styles.tabText
    }
  }

  render() {
    const { type, title, curType } = this.props
    return (
      <View style={this.getTabStyle(type)}>
        <TouchableOpacity onPress={this.handleTabPress.bind(this, type, curType)} style={styles.tabTouchable}>
          <Text style={this.getTabTextStyle(type)}>{title}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },

  tabContainer: {
    flexDirection: 'row',
    borderBottomColor: '#ebf0f5',
    borderBottomWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: 'hidden'
  },
  tab: {
    flex: 1,
    // borderLeftWidth: 1 / DP,
    // borderLeftColor: '#fff',
    height: px2dp(80),
    backgroundColor: '#8f9ba7'
  },
  tabSelected: {
    backgroundColor: '#fff'
  },
  tabTouchable: {
    flex: 1,
    justifyContent: 'center'
  },
  tabText: {
    textAlign: 'center',
    color: '#eee'
  },
  tabTextSelected: {
    color: '#333'
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: px2dp(40),
    paddingRight: px2dp(30),
    paddingTop: px2dp(35),
    paddingBottom: px2dp(35),
    height: px2dp(100),
    backgroundColor: '#fff'
  },
  input: {
    flexGrow: 1,
    fontSize: px2sp(28),
    color: '#999'
  }
})
