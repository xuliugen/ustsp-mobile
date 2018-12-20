import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { connect } from 'react-redux'

import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { getPublishedDemand } from 'src/ajax/project'

import PublishedProjectItem from './components/PublishedProjectItem'
import publishedProjectNavDecorator from 'src/components/common/publishedProjectNavDecorator'

const ProjectItemWithNav = publishedProjectNavDecorator(PublishedProjectItem)

const mapStateToProps = state => {
  return {
    userId: state.auth.user.id
  }
}

@connect(mapStateToProps)
export default class PublishedProjectsScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    projects: [],
    curPage: 1,
    pageSize: 50,
    totalNum: 0
  }

  componentDidMount() {
    this.fetchPublishedProjects()
    this.willFocus = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.updateInfo()
      }
    )
  }

  // 刷新PublishedprojectItem信息
  async updateInfo() {
    if (this.state.curPage > 1) {
      try {
        const { data } = await getPublishedDemand(this.props.userId, 1, this.state.pageSize)
        this.setState(({
          projects: data.data,
          curPage: 2
        }))
      } catch (error) {
        console.log(error)
      }
    }
  }

  async fetchPublishedProjects() {
    let { curPage, pageSize } = this.state
    try {
      const { data } = await getPublishedDemand(this.props.userId, curPage, pageSize)
      this.setState(prev => ({
        projects: prev.projects.concat(data.data),
        totalNum: data.totalNum,
        curPage: prev.curPage + 1
      }))
    } catch (error) {
      console.log(error)
    }
  }

  onEndReach() {
    const { curPage, pageSize, totalNum } = this.state
    if (curPage <= Math.ceil(totalNum / pageSize)) {
      this.fetchPublishedProjects()
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <FlatList
          data={this.state.projects}
          renderItem={({ item }) => <ProjectItemWithNav project={item.projectResearchInfo} />}
          keyExtractor={(item) => item.projectResearchInfo.id}
          onEndReach={this.onEndReach()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUD_COLOR
  }
})
