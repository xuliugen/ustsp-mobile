import React from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'

import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { px2dp, px2sp } from 'src/utils/device'
import talentNavDecorator from 'src/components/common/talentNavDecorator'

import HeaderRightFilter from './components/HeaderRightFilter'
import HeaderTitleSearch from './components/HeaderTitleSearch'
import TalentItem from './components/TalentItem'
import { searchTalents } from 'src/ajax/talent'

const TalentItemWithNav = talentNavDecorator(TalentItem)

/**
 * @todo: dispath search action with filter
 */
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
    talents: []
  }

  async componentDidMount() {
    const { data } = await searchTalents({ 'major': '', 'school': '', 'title': '', 'type': '', 'condition': '', 'pageSize': 10, 'currentPage': 1 })
    this.setState({
      talents: data.data
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.resultTitleContainer}>
            <Text style={styles.titleText}>共为你找到 <Text style={styles.titleTextHighlight}>{this.state.talents.length}</Text> 位人才</Text>
          </View>
          <View>
            {this.state.talents.map((talent) => (
              <TalentItemWithNav key={talent.id} talent={talent} />
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUD_COLOR
  },
  resultTitleContainer: {
    marginTop: px2dp(30),
    marginBottom: 1,
    paddingVertical: px2dp(22),
    paddingLeft: px2dp(30),
    backgroundColor: '#fff'
  },
  titleText: {
    color: '#8f9ba7',
    fontSize: px2sp(28)
  },
  titleTextHighlight: {
    color: '#1dbbae',
    fontSize: px2sp(30)
  }
})
