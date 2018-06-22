import React from 'react'
import { StyleSheet, View } from 'react-native'

import { px2dp } from '../../../utils/device'
import projectNavDecorator from '../../../components/common/projectNavDecorator'
import { fetchHomeScreenProjects } from '../../../ajax/project'

import ProjectCard from './ProjectCard'

const ProjectWithNav = projectNavDecorator(ProjectCard)

export default class Projects extends React.Component {
  state = {
    projects: []
  }

  componentDidMount() {
    this.fetchProjects()
  }

  async fetchProjects() {
    const { data } = await fetchHomeScreenProjects()
    this.setState({
      projects: data
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {/* todo: idx to project.id */}
        {this.state.projects.map((project, idx) => {
          let projectInfo = Object.assign({}, project.projectResearchInfo, {
            ownerAvatar: project.ownerAvatar,
            ownerName: project.ownerName
          })
          return (
            <View key={idx}
              style={(idx !== this.state.projects.length - 1) ? styles.projectContainer : {}}>
              <ProjectWithNav project={projectInfo} />
            </View>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  projectContainer: {
    marginBottom: px2dp(30)
  }
})
