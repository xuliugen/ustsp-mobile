import React from 'React'
import { TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

const newsNavDecorator = (WrappedComponent) => {
  return withNavigation(class extends React.Component {
    handlePress = () => {
      this.props.navigation.navigate('NewsDetail')
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

export default newsNavDecorator
