import React from 'React'
import { TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

const patentNavDecorator = (WrappedComponent) => {
  return withNavigation(class extends React.Component {
    handlePress = () => {
      this.props.navigation.navigate('PatentDetail', {
        patentId: this.props.patent.id
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

export default patentNavDecorator
