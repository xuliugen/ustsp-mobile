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
import { publishNews } from 'src/ajax/news'
import { connect } from 'react-redux'
import MessageBar from 'src/components/common/MessageBar'

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    userInfo: state.auth.userInfo
  }
}

@connect(mapStateToProps)
export default class NewsPublishScreen extends React.Component {
  static navigationOptions= ({ navigation }) => ({
    title: '发布新动态',
    headerStyle: HEADER_STYLE.headerStyle,
    headerTintColor: HEADER_STYLE.headerTintColor,
    headerTitleStyle: HEADER_STYLE.headerTitleStyle,
    headerRight: <Text
      style={HEADER_STYLE.headerRightStyle}
      onPress={() => navigation.state.params.publishContent()}>
      发布</Text>
  })

  state = {
    title: null,
    content: null
  }

  componentDidMount() {
    this.props.navigation.setParams({ publishContent: this.publishContent })
  }

  publishContent = async () => {
    const { user } = this.props
    if (this.state.title === null || this.state.title.length === 0) {
      MessageBar.show({
        message: '请输入要发布的动态标题！',
        type: 'info'
      })
      return
    }
    if (this.state.content === null || this.state.title.content === 0) {
      MessageBar.show({
        message: '请输入要发布的动态内容！',
        type: 'info'
      })
      return
    }
    let content = this.state.content
    let abstract = content.substr(0, 50)
    try {
      let res = await publishNews({
        userId: user.id,
        title: this.state.title,
        abstracts: abstract,
        dynamics: content,
        username: user.realName ? user.realName : user.phone,
        userType: user.userType,
        avatar: user.avatar,
        location: user.location
      })
      if (res != null && res.data != null) {
        this.props.navigation.navigate('PublishSuccess', {
          'type': 'news',
          'data': {'newsId': res.data.dynamicsId}
        })
      }
    } catch (err) {
      MessageBar.show({
        message: '发布动态失败，请重试！',
        type: 'error'
      })
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.contentContainer}>
          <Text style={styles.title}>* 标题</Text>
          <TextInput
            style={{ fontSize: px2sp(30), color: '#333', marginTop: px2dp(22) }}
            placeholder="填写标题"
            onChangeText={(text) => this.setState({title: text})}
          />
          <View style={styles.divider} />
          <Text style={[styles.title, { marginTop: px2dp(29) }]}>* 内容</Text>
          <TextInput
            style={{ marginTop: px2dp(21) }}
            placeholder="填写动态内容哦"
            onChangeText={(text) => this.setState({content: text})}
          />
          <View
            style={{flexDirection: 'row', position: 'absolute', top: '70%', left: px2dp(29)}}>
            <Text style={{ color: '#3793e3' }}>{this.state.content === null ? 0 : this.state.content.length}</Text>
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
