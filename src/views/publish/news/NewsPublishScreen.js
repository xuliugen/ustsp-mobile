import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView
} from 'react-native'

import { px2dp, px2sp } from 'src/utils/device'
import { HEADER_STYLE } from 'src/views/publish/common/style/HeaderStyle'

let _this = null
export default class NewsPublishScreen extends React.Component {
  static navigationOptions= ({ navigation }) => ({
    title: '发布新动态',
    headerStyle: HEADER_STYLE.headerStyle,
    headerTintColor: HEADER_STYLE.headerTintColor,
    headerTitleStyle: HEADER_STYLE.headerTitleStyle,
    headerRight: <Text
      style={HEADER_STYLE.headerRightStyle}
      onPress={() => _this.publishContent()}>
      发布</Text>
  })

  state = {
    contentCount: 0
  }

  componentDidMount() {
    _this = this
  }

  publishContent = () => {
    this.props.navigation.navigate('PublishSuccess', {
      'type': 'news'
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.contentContainer}>
          <Text style={styles.title}>* 标题</Text>
          <TextInput
            style={{ fontSize: px2sp(30), color: '#333', marginTop: px2dp(22) }}
            placeholder="填写标题"
          />
          <View style={styles.divider} />
          <Text style={[styles.title, { marginTop: px2dp(29) }]}>* 内容</Text>
          <TextInput
            style={{ marginTop: px2dp(21) }}
            placeholder="填写动态内容哦"
            onChangeText={(text) => this.setState({contentCount: text.length})}
          />
          <View
            style={{flexDirection: 'row', position: 'absolute', top: '70%', left: px2dp(29)}}>
            <Text style={{ color: '#3793e3' }}>{this.state.contentCount}</Text>
            <Text> / 400</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  title: {
    fontSize: px2sp(28),
    color: '#8f9ba7'
  },
  divider: {
    height: px2dp(1),
    borderTopWidth: px2dp(1),
    borderTopColor: '#ddd',
    marginTop: px2dp(28)
  }
})
