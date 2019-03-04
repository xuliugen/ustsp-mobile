import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { px2dp, px2sp } from 'src/utils/device'
import { connect } from 'react-redux'

import talentNavDecorator from 'src/components/common/talentNavDecorator'
import PartyBInfo from './components/PartyBInfo'

import { getDemanOrderDetail } from 'src/ajax/project'

const TalentInfoWithNav = talentNavDecorator(PartyBInfo)

const mapStatetoProps = state => ({
  user: state.auth.user
})

@connect(mapStatetoProps)
export default class Signedapplicants extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      partyB: [],
      user: []
    }
  }
  async componentDidMount() {
    const {data} = await getDemanOrderDetail(this.props.projectId)
    const applyDate = {applyDate: data.projectDetail.applyData}
    const partyB = {...data.projectDetail.projectJointDTO, ...applyDate}
    this.setState({
      partyB: partyB,
      user: this.props.user
    })
  }
  render() {
    const talentNav = {
      id: this.state.partyB.partyId,
      type: this.state.partyB.partyType
    }
    return (
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>待承接对象</Text>
        </View>
        <TalentInfoWithNav user={this.props.user} partyB={this.state.partyB}
          talentNav={talentNav} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: px2dp(30),
    marginBottom: px2dp(1),
    paddingVertical: px2dp(32),
    paddingLeft: px2dp(30),
    borderTopLeftRadius: px2dp(10),
    borderTopRightRadius: px2dp(10),
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: px2sp(32),
    color: '#666666'
  }
})
