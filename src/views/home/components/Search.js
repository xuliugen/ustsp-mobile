import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import TextInput from '../../../components/common/TextInput'
import { EvilIcons } from '@expo/vector-icons'

import { DP } from '../../../utils/device'

export default class Search extends React.Component {
  state = {
    selectedType: 'project',
    searchIptVal: ''
  }

  getTabStyle(type) {
    if (type === this.state.selectedType) {
      return StyleSheet.flatten([styles.tab, styles.tabSelected])
    } else {
      return styles.tab
    }
  }
  getTabTextStyle(type) {
    if (type === this.state.selectedType) {
      return StyleSheet.flatten([styles.tabText, styles.tabTextSelected])
    } else {
      return styles.tabText
    }
  }

  handleTabPress = (type) => {
    if (type !== this.state.selectedType) {
      this.setState({
        selectedType: type
      })
    }
  }
  handleSearch = () => {
    const search = this.state.searchIptVal.trim()
    if (search) {
      Alert.alert(this.state.searchIptVal)
    }
  }

  render() {
    const textIptProps = {
      underlineColorAndroid: 'transparent',
      placeholder: '搜索'
    }
    return (
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <View style={this.getTabStyle('project')}>
            <TouchableOpacity onPress={this.handleTabPress.bind(this, 'project')} style={styles.tabTouchable}>
              <Text style={this.getTabTextStyle('project')}>搜项目</Text>
            </TouchableOpacity>
          </View>
          <View style={this.getTabStyle('talent')}>
            <TouchableOpacity onPress={this.handleTabPress.bind(this, 'talent')} style={styles.tabTouchable}>
              <Text style={this.getTabTextStyle('talent')}>搜人才</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={this.state.searchIptVal} onChangeText={(text) => this.setState({ searchIptVal: text })}
            onSubmitEditing={this.handleSearch}
            {...textIptProps} style={styles.input} />
          <EvilIcons name="search" size={25} color="#999" onPress={this.handleSearch} />
        </View>
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
    height: 80 / DP,
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
    paddingLeft: 40 / DP,
    paddingRight: 30 / DP,
    paddingTop: 35 / DP,
    paddingBottom: 35 / DP,
    height: 100 / DP,
    backgroundColor: '#fff'
  },
  input: {
    flexGrow: 1,
    fontSize: 28 / DP,
    color: '#999'
  }
})
