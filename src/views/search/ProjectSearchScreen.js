import React from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'

import { APP_BACKGROUD_COLOR } from '../../styles/common'
import { px2dp, px2sp } from '../../utils/device'
import projectNavDecorator from '../../components/common/projectNavDecorator'

import HeaderTitleSearch from './components/HeaderTitleSearch'
import HeaderRightFilter from './components/HeaderRightFilter'
import ProjectItem from './components/ProjectItem'

const ProjectItemWithNav = projectNavDecorator(ProjectItem)

export default class ProjectSearch extends React.Component {
  static navigationOptions = {
    headerTitle: <HeaderTitleSearch />,
    headerRight: <HeaderRightFilter />,
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff'
  }

  state = {
    searchIptVal: '',
    projects: [{}, {}]
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.resultTextContainer}>
            <Text style={styles.resultText}>共为您找到 <Text style={styles.resultTextHighlight}>{this.state.projects.length}</Text> 个项目</Text>
          </View>
          <View>
            {/* todo: idx to project.id */}
            {this.state.projects.map((project, idx) => (
              <ProjectItemWithNav key={idx} project={project} />
            ))}
          </View>
        </ScrollView>
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
