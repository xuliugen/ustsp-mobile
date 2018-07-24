import React from 'react'
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import HTMLView from 'react-native-htmlview'
import { connect } from 'react-redux'

import HeaderTitle from './components/HeaderTitle'
// import HeaderRightShare from './components/HeaderRightShare'

import { px2dp, px2sp, SCREEN_WIDTH } from 'src/utils/device'
import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { parseTime } from 'src/utils/format'
import { fetchNewsDetail, clearNewsDetail } from 'src/actions'

const mapStateToProps = state => ({
  news: state.news.detail
})

@connect(mapStateToProps)
export default class NewsDetailScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <HeaderTitle />,
    // headerRight: <HeaderRightShare />,
    headerRight: <View />,
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff'
  }

  componentDidMount() {
    const { dispatch, navigation } = this.props
    dispatch(fetchNewsDetail(navigation.getParam('newsId')))
  }

  componentWillUnmount() {
    this.props.dispatch(clearNewsDetail())
  }

  renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.name === 'img') {
      const a = node.attribs
      return <Image
        key={a.src}
        style={{ width: SCREEN_WIDTH - 60, height: SCREEN_WIDTH - 60 }}
        source={{ uri: a.src }} />
    }
  }

  render() {
    const { news } = this.props
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.dynamicTitle}>{news.title}</Text>
            <View style={styles.readContainer}>
              <Text style={styles.reading}>阅读量</Text>
              <Text style={styles.reading}>{news.view}</Text>
            </View>
          </View>
          <View style={styles.outerContainer}>
            <View style={styles.subtitleContainer}>
              <Image source={{ uri: news.avatar }} style={styles.avatar} />
              <Text style={styles.author}>{news.username}</Text>
              <Text style={styles.date}>发表于{parseTime(news.date)}</Text>
            </View>
            <View style={styles.textContainer}>
              <HTMLView
                value={news.dynamics}
                renderNode={this.renderNode}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    width: SCREEN_WIDTH - px2dp(60),
    height: px2dp(400)
  },
  textContainer: {
    paddingHorizontal: px2dp(30),
    paddingTop: px2dp(30),
    paddingBottom: px2dp(82)
  },
  newsText: {
    fontSize: px2sp(32),
    color: '#333'
  }
})
