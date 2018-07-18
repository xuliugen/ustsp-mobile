import React from 'React'
import { TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

/**
 * @description To use this HOC, you must pass talentNav prop with id and type attr
 */
const talentNavDecorator = (WrappedComponent) => {
  return withNavigation(class extends React.Component {
    handlePress = (id, type) => {
      if (Number(type) === 4) {
        return
      }
      this.props.navigation.navigate('TalentDetail', {
        userId: id,
        userType: Number(type)
      })
    }

    render() {
      const { talentNav = {}, ...props } = this.props
      return (
        <TouchableOpacity onPress={this.handlePress.bind(this, talentNav.id, talentNav.type)}>
          <WrappedComponent {...props} />
        </TouchableOpacity>
      )
    }
  })
}

export default talentNavDecorator
