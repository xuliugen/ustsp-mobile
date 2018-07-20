import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { connect } from 'react-redux'

import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { getPublishedDemand } from 'src/ajax/project'

import PublishedProjectItem from './components/PublishedProjectItem'
import projectNavDecorator from 'src/components/common/projectNavDecorator'

const ProjectItemWithNav = projectNavDecorator(PublishedProjectItem)

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
  }

  async fetchPublishedProjects() {
    let { projects, curPage, pageSize } = this.state
    try {
      const { data } = await getPublishedDemand(this.props.userId, curPage, pageSize)
      const newProjects = projects.concat(data.data)
      const nextPage = ++curPage
      this.setState({
        projects: newProjects,
        totalNum: data.totalNum,
        curPage: nextPage
      })
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
