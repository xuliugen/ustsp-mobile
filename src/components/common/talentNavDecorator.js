import React from 'React'
import { TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

const talentNavDecorator = (WrappedComponent) => {
  return withNavigation(class extends React.Component {
    handlePress = () => {
      this.props.navigation.navigate('TalentDetail')
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

export default talentNavDecorator
