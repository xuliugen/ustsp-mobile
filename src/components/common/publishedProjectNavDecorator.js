import React from 'react'
import { TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

const publishedProjectNavDecorator = (WrappedComponent) => {
  return withNavigation(class extends React.Component {
    handlePress = () => {
      this.props.navigation.navigate('PublishedProjectDetail', {
        projectId: this.props.project.id
      })
    }

    render() {
      return (
        <TouchableOpacity onPress={this.handlePress}>
          <WrappedComponent {...this.props} />
        </TouchableOpacity>
      )
    }
  })
}

export default publishedProjectNavDecorator
