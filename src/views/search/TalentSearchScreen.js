import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ListView,
  RefreshControl
} from 'react-native'
import { connect } from 'react-redux'
import InfiniteScrollView from 'react-native-infinite-scroll-view'

import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { px2dp, px2sp } from 'src/utils/device'
import talentNavDecorator from 'src/components/common/talentNavDecorator'
import { fetchSearchResult, clearSearch, setSearchPage } from 'src/actions'

import HeaderRightFilter from './components/HeaderRightFilter'
import HeaderTitleSearch from './components/HeaderTitleSearch'
import TalentItem from './components/TalentItem'

const TalentItemWithNav = talentNavDecorator(TalentItem)
const mapStateToProps = state => ({
  talents: state.search.result,
  talentsCount: state.search.totalNum,
  page: state.search.reqPayload.currentPage
})

/**
 * @todo: dispath search action with filter
 */
@connect(mapStateToProps)
export default class TalentSearchScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <HeaderTitleSearch />,
    headerRight: <HeaderRightFilter />,
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff'
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }
    // Update the data store with initial data.
    this.state.dataSource = this.getUpdatedDataSource(props)
  }

  componentWillMount() {
    this._loadMoreContentAsync()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.getUpdatedDataSource(nextProps)
    })
  }
  componentWillUnmount() {
    this.props.dispatch(clearSearch())
  }

  getUpdatedDataSource(props) {
    let rows = props.talents
    let ids = rows.map((obj, idx) => idx)
    return this.state.dataSource.cloneWithRows(rows, ids)
  }

  _renderRowView = (rowData) => {
    return <TalentItemWithNav talent={rowData} />
  }

  _renderRefreshControl() {
    // Reload all data
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._loadMoreContentAsync.bind(this)}
      />
    )
  }

  _loadMoreContentAsync = async () => {
    const { dispatch, page } = this.props
    await dispatch(fetchSearchResult(true))
    dispatch(setSearchPage(page + 1))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.resultTitleContainer}>
          <Text style={styles.titleText}>共为你找到 <Text style={styles.titleTextHighlight}>{this.props.talentsCount}</Text> 位人才</Text>
        </View>
        {/* <View>
          {this.props.talents.map((talent) => (
            <TalentItemWithNav key={talent.id} talent={talent} />
          ))}
        </View> */}
        <ListView
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          dataSource={this.state.dataSource}
          renderRow={this._renderRowView}
          // refreshControl={this._renderRefreshControl()}
          enableEmptySections
          canLoadMore
          onLoadMoreAsync={this._loadMoreContentAsync.bind(this)}
        />
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
