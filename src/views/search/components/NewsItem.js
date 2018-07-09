import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { px2dp, px2sp } from 'src/utils/device'
import { APP_BACKGROUD_COLOR } from 'src/styles/common'

export default class NewsItem extends React.Component {
  render() {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.firstContainer}>
          <Image source={require('src/img/avatar1.png')} style={styles.avatar} />
          <Text style={styles.name}>陈素粉</Text>
          <Text style={styles.date}>2018-1-30</Text>
        </View>
        <View style={styles.secondContainer}>
          <Image source={require('src/img/news.png')} style={styles.image} />
          <View style={styles.newContainer}>
            <View style={styles.topicContainer}>
              <Text style={styles.newsTopic} numberOfLines={1}>动态的标题一</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.newsText} numberOfLines={2}>设计是一种设想通过各种合理的规划周密的计划过各种感觉形式传达出来的设计是一种设想通过</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    height: px2dp(260),
    marginTop: px2dp(30),
    backgroundColor: '#fff'
  },
  firstContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: px2dp(14),
    borderBottomWidth: px2dp(2),
    borderBottomColor: APP_BACKGROUD_COLOR
  },
  avatar: {
    width: px2dp(60),
    height: px2dp(60),
    borderRadius: px2dp(30),
    marginLeft: px2dp(30)
  },
  name: {
    fontSize: px2sp(28),
    color: '#333333',
    marginLeft: px2dp(22)
  },
  date: {
    position: 'absolute',
    right: px2dp(30),
    fontSize: px2sp(26),
    color: '#999999'
  },
  secondContainer: {
    flexDirection: 'row'
  },
  image: {
    marginTop: px2dp(30),
    width: px2dp(100),
    height: px2dp(100),
    marginHorizontal: px2dp(30),
    marginBottom: px2dp(42)
  },
  topicContainer: {
    width: px2dp(510),
    paddingTop: px2dp(30),
    marginRight: px2dp(50)
  },
  newsTopic: {
    fontSize: px2sp(32)
  },
  textContainer: {
    width: px2dp(510),
    paddingBottom: px2dp(30),
    marginRight: px2dp(50),
    flexWrap: 'wrap'
  },
  newsText: {
    fontSize: px2sp(28),
    color: '#999999'
  }
})
