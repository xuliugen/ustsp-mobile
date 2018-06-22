import React from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'

import { APP_BACKGROUD_COLOR } from '../../styles/common'
import { px2dp, px2sp } from '../../utils/device'
import { talentNavDecorator } from '../../components/common/talentNavDecorator'

import { HeaderRightFilter } from './components/HeaderRightFilter'
import { HeaderTitleSearch } from './components/HeaderTitleSearch'
import { TalentItem } from './components/TalentItem'

const TalentItemWithNav = talentNavDecorator(TalentItem)

export default class TalentSearchScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <HeaderTitleSearch />,
    headerRight: <HeaderRightFilter />,
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff'
  }

  state = {
    searchIptVal: '',
    talents: [{}, {}]
  }

  render() {
    return (
      <View style={styles.container}></View>
    )
  }
}

const styles = StyleSheet.create({

})
