import React from 'react'
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native'
import { px2sp, px2dp } from 'src/utils/device'
import { Ionicons } from '@expo/vector-icons'

export default class PublishSuccessScreen extends React.Component {
  renderNavigateToDetailBtn(type) {
    let content
    if (type === 'project') {
      content = '查看该项目'
    } else if (type === 'news') {
      content = '查看该动态'
    } else if (type === 'result') {
      content = '查看该成果'
    } else {
      content = '返回首页'
    }
    return <TouchableOpacity
      onPress={this.navigateToDetailPage}
      underlayColor="#E1F6FF">
      <View style={[styles.border, styles.navigateToDetailBtn]} >
        <Text style={{ color: '#fff', fontSize: px2sp(32) }}>{content}</Text>
      </View>
    </TouchableOpacity>
  }

  navigateToDetailPage = () => {
    let type = this.props.navigation.getParam('type', null)
    let data = this.props.navigation.getParam('data', null)
    let page
    if (type === 'project') {
      page = ''
    } else if (type === 'news') {
      page = 'NewsDetail'
    } else if (type === 'result') {
      page = ''
    } else {
      page = null
    }
    if (page != null) {
      this.props.navigation.navigate(page, data)
    } else {
      this.backToHome()
    }
  }

  backToHome = () => {
    this.props.navigation.popToTop()
    this.props.navigation.goBack(null)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.backToHome}
          style={styles.closeIcon}
          underlayColor="#E1F6FF">
          <Ionicons
            name={'ios-close'}
            color={'#8d9ca7'}
            size={40}
            style={{marginTop: px2dp(140), marginLeft: px2dp(38)}} />
        </TouchableHighlight>
        <Image source={require('src/img/publishSuccess.png')} style={styles.successIcon} />
        <Text style={styles.descriptionTx}>内容发布成功</Text>
        <Text style={{color: '#8f9ba7', fontSize: px2sp(30), marginTop: px2dp(266)}}>您现在可以继续</Text>
        {/* <TouchableHighlight
          onPress={() => { }}
          style={[styles.border, { marginTop: px2dp(40), borderColor: '#2b7dd6' }]}
          underlayColor="#E1F6FF">
          <Text style={{color: '#3091e6', fontSize: px2sp(32)}}>分享给别人</Text>
        </TouchableHighlight> */}
        {this.renderNavigateToDetailBtn(this.props.navigation.getParam('type', null))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
    opacity: 0.8
  },
  closeIcon: {
    alignSelf: 'flex-start'
  },
  successIcon: {
    width: px2dp(261),
    height: px2dp(261),
    marginTop: px2dp(290)
  },
  descriptionTx: {
    color: '#8f9ba7',
    marginTop: px2dp(42),
    fontSize: px2sp(36)
  },
  border: {
    paddingLeft: px2dp(119),
    paddingTop: px2dp(29),
    paddingRight: px2dp(121),
    paddingBottom: px2dp(30),
    borderWidth: px2dp(2),
    borderStyle: 'solid',
    borderRadius: px2dp(10)
  },
  navigateToDetailBtn: {
    marginTop: px2dp(27),
    backgroundColor: '#3091E6',
    borderColor: 'transparent'
  }
})
