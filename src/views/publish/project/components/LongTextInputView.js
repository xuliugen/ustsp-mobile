import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView
} from 'react-native'

import { px2dp, px2sp } from 'src/utils/device'
import { withNavigation } from 'react-navigation'

class LongTextInputView extends React.Component {
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
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text
          style={styles.title}>{'填写' + item.name}</Text>
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="填写需求描述"
            onChangeText={(text) => this.setState({value: text})}
          >{this.state.value}</TextInput>
          <View
            style={styles.textSizeContainer}>
            <Text style={{ color: '#3793e3' }}>{this.state.value === null ? 0 : this.state.value.length}</Text>
            <Text> / 400</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

export default withNavigation(LongTextInputView)
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBF0F5'
  },
  contentContainer: {
    height: '100%',
    marginTop: px2dp(30),
    paddingLeft: px2dp(29),
    paddingRight: px2dp(15),
    paddingTop: px2dp(30),
    backgroundColor: '#fff'
  },
  textInput: {
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#ebeaeb'
  },
  title: {
    fontSize: px2sp(28),
    color: '#8f9ba7',
    marginTop: px2dp(28),
    marginLeft: px2dp(30)
  },
  textSizeContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: '70%',
    left: px2dp(29)
  }
})
