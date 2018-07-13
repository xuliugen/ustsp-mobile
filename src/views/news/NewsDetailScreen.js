import React from 'react'
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import HeaderTitle from './components/HeaderTitle'
import HeaderRightShare from './components/HeaderRightShare'
import { px2dp, px2sp } from 'src/utils/device'
import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { Feather } from '@expo/vector-icons'
import RemarkItems from './components/RemarkItems'

var dimensions = require('Dimensions')
var {width} = dimensions.get('window')

export default class NewsDetailScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <HeaderTitle />,
    headerRight: <HeaderRightShare />,
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff'
  }

  state = {
    remarks: [{}, {}, {}]
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.dynamicTitle}>动态的标题一</Text>
            <View style={styles.readContainer}>
              <Text style={styles.reading}>阅读量</Text>
              <Text style={styles.reading}>22k</Text>
            </View>
          </View>
          <View>
            <View style={styles.subtitleContainer}>
              <Image source={require('src/img/avatar1.png')} style={styles.avatar} />
              <Text style={styles.author}>U小妹</Text>
              <Text style={styles.date}>发表于2017-12-30</Text>
            </View>
            <View style={styles.newsContainer}>
              <Image source={require('src/img/banner1.png')} style={styles.pic} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.newsText}>
                欢迎您加入uppfind！以下为您提供一些指南，以助您更好地使用本平台。{'\n\n'}

                在使用本平台前，确保您阅读并已同意《UPPFIND平台管理条例》，如发生条例以外的纠纷，本平台一概不负责任。{'\n'}

                欢迎您加入uppfind！以下为您提供一些指南，以助您更好地使用本平台。{'\n\n'}

                有任何问题都可以致电400-885-335咨询客服。{'\n\n'}
                欢迎您加入uppfind！以下为您提供一些指南，
              </Text>
            </View>
          </View>
          <View style={styles.commentaryContainer}>
            <View style={styles.commentaryHeader}>
              <Text style={styles.iconContainer}><Feather style={styles.commentaryIcon} name="message-square" /></Text>
              <Text style={styles.commAmount}>评论({this.state.remarks.length})</Text>
              <TouchableOpacity style={styles.readMore}>
                <Text style={styles.commAmount}>查看所有<Feather name="chevron-right" style={styles.commentaryIcon} /></Text>
              </TouchableOpacity>
            </View>
            {this.state.remarks.map((remarks, idx) => (
              <RemarkItems key={idx} />
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: px2dp(2),
    borderBottomColor: APP_BACKGROUD_COLOR
  },
  dynamicTitle: {
    paddingHorizontal: px2dp(30),
    paddingVertical: px2dp(40),
    fontSize: px2sp(36)
  },
  readContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    marginRight: px2dp(30),
    paddingVertical: px2dp(10),
    paddingHorizontal: px2dp(20),
    borderRadius: px2dp(4),
    backgroundColor: APP_BACKGROUD_COLOR
  },
  reading: {
    fontSize: px2sp(22),
    color: '#8f9ba7'
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: px2dp(30)
  },
  avatar: {
    width: px2dp(60),
    height: px2dp(60),
    borderRadius: px2dp(30),
    marginVertical: px2dp(30)
  },
  author: {
    marginLeft: px2dp(20),
    fontSize: px2sp(30),
    color: '#8f9ba7'
  },
  date: {
    position: 'absolute',
    right: px2dp(30),
    fontSize: px2sp(26),
    color: '#8f9ba7'
  },
  newsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: px2dp(30),
    overflow: 'hidden'
  },
  pic: {
    width: width - px2dp(60),
    height: px2dp(400)
  },
  textContainer: {
    paddingHorizontal: px2dp(30),
    paddingVertical: px2dp(30)
  },
  newsText: {
    fontSize: px2sp(32)
  },
  commentaryContainer: {
    flexDirection: 'column',
    marginTop: px2dp(52),
    paddingHorizontal: px2dp(30),
    paddingBottom: px2dp(42),
    borderTopWidth: px2dp(2),
    borderTopColor: APP_BACKGROUD_COLOR
  },
  commentaryHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    marginVertical: px2dp(30)
  },
  commentaryIcon: {
    color: '#8f9ba7',
    fontSize: px2sp(28)
  },
  commAmount: {
    marginLeft: px2dp(20),
    fontSize: px2sp(28),
    color: '#8f9ba7'
  },
  readMore: {
    position: 'absolute',
    right: 0
  }
})
