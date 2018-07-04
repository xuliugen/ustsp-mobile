import React from 'react'
import { connect } from 'react-redux'

import { getTalentInfo, clearTalentInfo } from 'src/actions'

import TalentDetailHeader from './components/TalentDetailHeader'
import StudentDetail from './StudentDetail'
import TeacherDetail from './TeacherDetail'

class TalentDetailScreen extends React.Component {
  static navigationOptions = {
    header: <TalentDetailHeader />
  }

  componentDidMount() {
    const { navigation, dispatch } = this.props
    const userId = navigation.getParam('userId')
    const userType = navigation.getParam('userType')
    dispatch(getTalentInfo(userId, userType))
  }

  componentWillUnmount() {
    this.props.dispatch(clearTalentInfo())
  }

  render() {
    const { navigation } = this.props
    const userType = navigation.getParam('userType')
    const userId = navigation.getParam('userId')

    switch (userType) {
      case 1:
        return <StudentDetail id={userId} />
      case 2:
        return <TeacherDetail id={userId} />
      case 3:
      default:
        return null
    }
  }
}

export default connect()(TalentDetailScreen)
