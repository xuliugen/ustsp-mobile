import React from 'react'
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native'

import talentNavDecorator from 'src/components/common/talentNavDecorator'
import { px2dp, px2sp } from 'src/utils/device'
import { fetchHomeTalents } from 'src/ajax/talent'

const TalentWithNav = talentNavDecorator(Talent)

export default class Talents extends React.Component {
  state = {
    talents: []
  }

  componentDidMount() {
    this.fetchTalents()
  }

  async fetchTalents() {
    const { data } = await fetchHomeTalents()
    this.setState({
      talents: data
    })
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentontainer}
        horizontal showsHorizontalScrollIndicator={false}>
        {this.state.talents.map(talent => <TalentWithNav key={talent.id} talent={talent} />)}
      </ScrollView>
    )
  }
}

function Talent(props) {
  const { talent } = props
  return (
    <View style={styles.talentContainer}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: talent.photo }} style={styles.avatar} />
      </View>
      <Text style={styles.name}>{talent.realName}</Text>
      <Text style={styles.university}>{talent.school}</Text>
      <Text style={styles.title}>{talent.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff'
  },
  contentontainer: {
    paddingLeft: px2dp(60)
  },

  talentContainer: {
    flexDirection: 'column',
    paddingTop: px2dp(40),
    paddingBottom: px2dp(40),
    marginRight: px2dp(60),
    alignItems: 'center'
  },
  avatarContainer: {
    marginBottom: px2dp(20)
  },
  avatar: {
    width: px2dp(120),
    height: px2dp(120),
    borderRadius: px2dp(120 / 2)
  },
  name: {
    fontSize: px2sp(28),
    marginBottom: px2dp(10)
  },
  university: {
    fontSize: px2sp(28),
    color: '#999',
    marginBottom: px2dp(10)
  },
  title: {
    fontSize: px2sp(28),
    color: '#8f9ba7'
  }
})
