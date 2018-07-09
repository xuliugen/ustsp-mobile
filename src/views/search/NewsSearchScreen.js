import React from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'

import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { px2dp, px2sp } from 'src/utils/device'
import newsNavDecorator from 'src/components/common/newsNavDecorator'

import HeaderRightFilter from './components/HeaderRightFilter'
import HeaderTitleSearch from './components/HeaderTitleSearch'
import NewsItem from './components/NewsItem'

const NewsItemWithNav = newsNavDecorator(NewsItem)

export default class NewsSearchScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <HeaderTitleSearch />,
    headerRight: <HeaderRightFilter />,
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff'
  }

  state = {
    searchIptVal: '',
    news: [{}, {}, {}, {}]
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.resultTitleContainer}>
            <Text style={styles.titleText}>共为你找到 <Text style={styles.titleTextHighlight}>{this.state.news.length}</Text> 条动态</Text>
          </View>
          <View>
            {this.state.news.map((news, idx) => (
              // todo: idx to news id
              <NewsItemWithNav key={idx} news={news} />
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
    backgroundColor: APP_BACKGROUD_COLOR
  },
  resultTitleContainer: {
    marginTop: px2dp(30),
    marginBottom: 1,
    paddingVertical: px2dp(22),
    paddingLeft: px2dp(30),
    backgroundColor: '#fff'
  },
  titleText: {
    color: '#8f9ba7',
    fontSize: px2sp(28)
  },
  titleTextHighlight: {
    color: '#1dbbae',
    fontSize: px2sp(30)
  }
})
