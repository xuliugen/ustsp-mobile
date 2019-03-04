import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { px2dp, px2sp } from 'src/utils/device'
import ProjectApplicantsItem from './components/ProjectApplicantsItem'
import talentNavDecorator from 'src/components/common/talentNavDecorator'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import { getDemanOrderDetail } from 'src/ajax/project'

const mapStatetoProps = state => ({
  user: state.auth.user
})

const TalentwithNav = talentNavDecorator(ProjectApplicantsItem)

@connect(mapStatetoProps)
@withNavigation
export default class LatestApplicantsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      applicants: [],
      user: {}
    }
  }

  async componentDidMount() {
    try {
      const {data} = await getDemanOrderDetail(this.props.projectId)
      this.setState({
        applicants: data.applicants.data,
        user: this.props.user
      })
    } catch (err) {
      console.log(err)
    }
  }
  handleClickAllApplicants = () => {
    this.props.navigation.navigate('ProjectApplicants', {
      applicants: this.state.applicants,
      user: this.state.user
    })
  }

  render() {
    return (
      <View>
        <View style={styles.latestEnroll}>
          <Text style={styles.Enrolltitle}>最新报名</Text>
          <TouchableOpacity onPress={this.handleClickAllApplicants}>
            <Text style={styles.checkMore}>全部<Feather style={styles.checkMore} name="chevron-right" /></Text>
          </TouchableOpacity>
        </View>
        {this.state.applicants.slice(0, 3).map(item => {
          return (<TalentwithNav key={item.id} applicantInfo={item} user={this.state.user} talentNav={{id: item.partyId, type: item.partyType}} />)
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  checkMore: {
    color: '#8f9ba7',
    fontSize: px2sp(28)
  },
  latestEnroll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: px2dp(30),
    marginBottom: px2dp(1),
    paddingTop: px2dp(32),
    paddingBottom: px2dp(32),
    paddingLeft: px2dp(30),
    paddingRight: px2dp(30),
    borderTopLeftRadius: px2dp(10),
    borderTopRightRadius: px2dp(10),
    backgroundColor: '#ffffff'
  },
  Enrolltitle: {
    fontSize: px2sp(32),
    color: '#666666'
  }
})
