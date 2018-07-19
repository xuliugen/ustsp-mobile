import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView, Text, FlatList } from 'react-native'
import SideMenu from 'react-native-side-menu'

import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { px2dp, px2sp, SCREEN_WIDTH } from 'src/utils/device'
import newsNavDecorator from 'src/components/common/newsNavDecorator'
import { fetchSearchResult, clearSearch, setSideMenuOpenState } from 'src/actions'
import { canSearchLoadMore } from 'src/selectors'

import HeaderRightFilter from './components/HeaderRightFilter'
import HeaderTitleSearch from './components/HeaderTitleSearch'
import NewsItem from './components/NewsItem'
import NewsFilterMenu from './components/NewsFilterMenu'

const NewsItemWithNav = newsNavDecorator(NewsItem)

const mapStateToProps = state => ({
  isOpen: state.search.isOpen,
  news: state.search.result,
  newsCount: state.search.totalNum,
  page: state.search.reqPayload.currentPage,
  canLoadMore: canSearchLoadMore(state)
})

@connect(mapStateToProps)
export default class NewsSearchScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <HeaderTitleSearch />,
    headerRight: <HeaderRightFilter />,
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff'
  }

  componentDidMount() {
    this.dispatchSearch()
  }
  componentWillUnmount() {
    this.props.dispatch(clearSearch())
  }

  dispatchSearch() {
    this.props.dispatch(fetchSearchResult(true))
  }

  onEndReached = () => {
    if (this.props.canLoadMore) {
      this.dispatchSearch()
    }
  }

  render() {
    const { news, newsCount } = this.props
    return (
      <SideMenu
        menu={<NewsFilterMenu />}
        isOpen={this.props.isOpen}
        openMenuOffset={SCREEN_WIDTH - px2dp(75)}
        disableGestures
        menuPosition="right"
        onChange={isOpen => this.props.dispatch(setSideMenuOpenState(isOpen))}
      >
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.resultTitleContainer}>
              <Text style={styles.titleText}>共为你找到 <Text style={styles.titleTextHighlight}>{newsCount}</Text> 条动态</Text>
            </View>
            <FlatList
              data={news}
              renderItem={({ item }) => <NewsItemWithNav news={item} />}
              keyExtractor={(item, index) => item.id}
              onEndReached={this.onEndReached}
            />
          </ScrollView>
        </View>
      </SideMenu>
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
