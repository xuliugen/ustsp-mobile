import React from 'React'
import { TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

const newsNavDecorator = (WrappedComponent) => {
  return withNavigation(class extends React.Component {
    render() {
      return (
        <TouchableOpacity onPress={this.handlePerss}>
          <WrappedComponent{...this.props} />
        </TouchableOpacity>
      )
    }
  })
}

export default newsNavDecorator
