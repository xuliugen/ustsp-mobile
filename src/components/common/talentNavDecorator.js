import React from 'React'
import { TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

/**
 * @todo 使用对应props进行传参并导航
 */
const talentNavDecorator = (WrappedComponent) => {
  return withNavigation(class extends React.Component {
    handlePress = () => {
      this.props.navigation.navigate('TalentDetail', {
        userId: this.props.talent.id,
        userType: Number(this.props.talent.type)
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

export default talentNavDecorator
