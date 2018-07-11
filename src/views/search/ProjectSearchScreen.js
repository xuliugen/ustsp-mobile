import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'

import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { px2dp, px2sp, SCREEN_WIDTH } from 'src/utils/device'
import projectNavDecorator from 'src/components/common/projectNavDecorator'
import { fetchSearchResult, clearSearch, setSideMenuOpenState } from 'src/actions'
import { canSearchLoadMore } from 'src/selectors'
import SideMenu from 'react-native-side-menu'

import HeaderTitleSearch from './components/HeaderTitleSearch'
import HeaderRightFilter from './components/HeaderRightFilter'
import ProjectItem from './components/ProjectItem'
import ProjectFilterMenu from './components/ProjectFilterMenu'

const ProjectItemWithNav = projectNavDecorator(ProjectItem)

const mapStateToProps = state => ({
  isOpen: state.search.isOpen,
  projects: state.search.result,
  projectsCount: state.search.totalNum,
  page: state.search.reqPayload.currentPage,
  canLoadMore: canSearchLoadMore(state)
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
    const { projects, projectsCount } = this.props
    return (
      <SideMenu
        menu={<ProjectFilterMenu />}
        isOpen={this.props.isOpen}
        openMenuOffset={SCREEN_WIDTH - px2dp(75)}
        disableGestures
        menuPosition="right"
        onChange={isOpen => this.props.dispatch(setSideMenuOpenState(isOpen))}
      >
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
      </SideMenu>
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
