import React from 'react'
import { StyleSheet, View } from 'react-native'

import { px2dp } from '../../../utils/device'
import projectNavDecorator from '../../../components/common/projectNavDecorator'

import ProjectCard from './ProjectCard'

const ProjectWithNav = projectNavDecorator(ProjectCard)

export default class Projects extends React.Component {
  state = {
    projects: new Array(5).fill({}, 0, 5)
  }

  render() {
    return (
      <View style={styles.container}>
        {/* todo: idx to project.id */}
        {this.state.projects.map((project, idx) => (
          <View key={idx}
            style={(idx !== this.state.projects.length - 1) ? styles.projectContainer : {}}>
            <ProjectWithNav project={project} />
          </View>
        ))}
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
