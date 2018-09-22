import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native'

import { px2dp, px2sp } from 'src/utils/device'
import { withNavigation } from 'react-navigation'

class ShortTextInputView extends React.Component {
  state = {
    value: this.props.value
  }
  componentDidMount() {
    this.props.onRef(this)
  }

  getValue = () => {
    return this.state.value
  }

  dealWithInputTextProp(params) {
    let prop
    if (params === 'money') {
      prop = {
        placeholder: '请输入金额，单位为元',
        keyboardType: 'numeric',
        textFilter: (text) => { this.setState({value: text.replace(/[^0-9]/g, '')}) }
      }
    } else {
      prop = {
        placeholder: '请输入内容',
        keyboardType: 'default',
        textFilter: (text) => { this.setState({value: text}) }
      }
    }
    return prop
  }
  render() {
    let item = this.props.navigation.getParam('item', null)
    let textInputProp = this.dealWithInputTextProp(item.params)
    return (
      <View style={{backgroundColor: '#EBF0F5'}}>
        <Text
          style={styles.title}>{'设置' + item.name}</Text>
        <TextInput style={styles.textInput}
          placeholder={textInputProp.placeholder}
          keyboardType={textInputProp.keyboardType}
          value={this.state.value}
          onChangeText={(text) => textInputProp.textFilter(text)}
        />
      </View>
    )
  }
}

export default withNavigation(ShortTextInputView)
const styles = StyleSheet.create({
  textInput: {
    paddingLeft: px2dp(30),
    height: px2dp(78),
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#ebeaeb'
  },
  title: {
    fontSize: px2sp(28),
    color: '#8f9ba7',
    marginTop: px2dp(28),
    marginBottom: px2dp(29),
    marginLeft: px2dp(30)
  }
})
