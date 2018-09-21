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
  render() {
    let item = this.props.navigation.getParam('item', null)
    return (
      <View style={{backgroundColor: '#EBF0F5'}}>
        <Text
          style={styles.title}>{'设置' + item.name}</Text>
        <TextInput style={styles.textInput}
          placeholder={'请输入内容'}
          onChangeText={(text) => this.setState({value: text})}
        >{this.state.value}</TextInput>
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
