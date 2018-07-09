import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'

import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { px2dp, px2sp } from 'src/utils/device'
import projectNavDecorator from 'src/components/common/projectNavDecorator'
import { fetchSearchResult, clearSearch, setSearchPage } from 'src/actions'

import HeaderTitleSearch from './components/HeaderTitleSearch'
import HeaderRightFilter from './components/HeaderRightFilter'
import ProjectItem from './components/ProjectItem'

const ProjectItemWithNav = projectNavDecorator(ProjectItem)
const mapStateToProps = state => ({
  projects: state.search.result,
  projectsCount: state.search.totalNum,
  page: state.search.reqPayload.currentPage,
  pageCount: Math.ceil(state.search.totalNum / 10)
})

@connect(mapStateToProps)
export default class ProjectSearch extends React.Component {
  static navigationOptions = {
    headerTitle: <HeaderTitleSearch />,
    headerRight: <HeaderRightFilter />,
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff'
  }

  componentDidMount() {
    this.props.dispatch(fetchSearchResult(true))
    this.props.dispatch(setSearchPage(this.props.page + 1))
  }
  componentWillUnmount() {
    this.props.dispatch(clearSearch())
  }

  onEndReached = () => {
    if (this.props.page < this.props.pageCount) {
      this.props.dispatch(fetchSearchResult(true))
      this.props.dispatch(setSearchPage(this.props.page + 1))
    }
  }

  render() {
    const { projects, projectsCount } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.resultTextContainer}>
          <Text style={styles.resultText}>共为您找到 <Text style={styles.resultTextHighlight}>{projectsCount}</Text> 个项目</Text>
        </View>
        <FlatList
          data={projects}
          renderItem={({ item }) => <ProjectItemWithNav project={item} />}
          keyExtractor={(item, index) => item.id}
          onEndReached={this.onEndReached}
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

  resultTextContainer: {
    marginTop: px2dp(30),
    marginBottom: 1,
    paddingVertical: px2dp(22),
    paddingLeft: px2dp(30),
    backgroundColor: '#fff'
  },
  resultText: {
    color: '#8f9ba7',
    fontSize: px2sp(28)
  },
  resultTextHighlight: {
    color: '#1dbbae',
    fontSize: px2sp(30)
  }
})
