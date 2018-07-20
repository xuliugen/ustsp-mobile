import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { connect } from 'react-redux'

import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { getUndertakenDemand } from 'src/ajax/project'

import UndertakenProjectItem from './components/UndertakenProjectItem'
import projectNavDecorator from 'src/components/common/projectNavDecorator'

const ProjectItemWithNav = projectNavDecorator(UndertakenProjectItem)

const mapStateToProps = state => {
  return {
    userId: state.auth.user.id
  }
}

@connect(mapStateToProps)
export default class UndertakenProjectsScreen extends React.Component {
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
    this.fetchUndertakenProjects()
  }

  async fetchUndertakenProjects() {
    let { curPage, pageSize } = this.state
    try {
      const { data } = await getUndertakenDemand(this.props.userId, curPage, pageSize)
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
      this.fetchUndertakenProjects()
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <FlatList
          data={this.state.projects}
          renderItem={({ item }) => <ProjectItemWithNav project={item} />}
          keyExtractor={(item) => item.id}
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
