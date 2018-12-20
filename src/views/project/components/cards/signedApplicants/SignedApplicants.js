import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { px2dp, px2sp } from 'src/utils/device'

import talentNavDecorator from 'src/components/common/talentNavDecorator'
import PartyBInfo from './components/PartyBInfo'

const TalentInfoWithNav = talentNavDecorator(PartyBInfo)

export default class Signedapplicants extends React.Component {
  render() {
    const talentNav = {
      id: this.props.partyB.partyId,
      type: this.props.partyB.partyType
    }
    return (
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>待承接对象</Text>
        </View>
        <TalentInfoWithNav user={this.props.user} partyB={this.props.partyB}
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
