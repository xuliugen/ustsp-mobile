import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import SideMenu from 'react-native-side-menu'

import HeaderRightFilter from './components/HeaderRightFilter'
import HeaderTitleSearch from './components/HeaderTitleSearch'
import PatentItem from './components/PatentItem'
import patentNavDecorator from 'src/components/common/patentNavDecorator'
import PatentFilterMenu from './components/PatentFilterMenu'

import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { px2dp, px2sp, SCREEN_WIDTH } from 'src/utils/device'
import { canSearchLoadMore } from 'src/selectors'
import { fetchSearchResult, clearSearch, setSideMenuOpenState } from 'src/actions'

const PatentItemWithNav = patentNavDecorator(PatentItem)

const mapStateToProps = state => ({
  isOpen: state.search.isOpen,
  patents: state.search.result,
  patentsCount: state.search.totalNum,
  page: state.search.reqPayload.currentPage,
  canLoadMore: canSearchLoadMore(state)
})

@connect(mapStateToProps)
export default class PatentSearchScreen extends React.Component {
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
    return (
      <SideMenu
        menu={<PatentFilterMenu />}
        isOpen={this.props.isOpen}
        openMenuOffset={SCREEN_WIDTH - px2dp(75)}
        disableGestures
        menuPosition="right"
        onChange={isOpen => this.props.dispatch(setSideMenuOpenState(isOpen))}
      >
        <View style={styles.container}>
          <View style={styles.resultTitleContainer}>
            <Text style={styles.titleText}>共为您找到：<Text style={styles.titleTextHighlight}>{this.props.patentsCount} </Text>个相关知识产权</Text>
          </View>
          <FlatList
            data={this.props.patents}
            renderItem={({ item }) => <PatentItemWithNav patent={item} />}
            keyExtractor={(item) => item.id}
            onEndReached={this.onEndReached}
          />
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
    marginTop: px2dp(31),
    marginBottom: 1,
    paddingVertical: px2dp(21),
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
