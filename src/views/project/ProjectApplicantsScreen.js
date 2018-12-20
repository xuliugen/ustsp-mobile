import React from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'

import { px2dp } from 'src/utils/device'
import { HEADER_STYLE } from 'src/views/publish/common/style/HeaderStyle'

import talentNavDecorator from 'src/components/common/talentNavDecorator'
import ProjectApplicantsItem from './components/cards/latestApplicants/components/ProjectApplicantsItem'

const TalentwithNav = talentNavDecorator(ProjectApplicantsItem)

export default class ProjectApplicantsScreen extends React.Component {
  static navigationOptions = {
    title: '已报名',
    headerStyle: HEADER_STYLE.headerStyle,
    headerTintColor: HEADER_STYLE.headerTintColor,
    headerTitleStyle: HEADER_STYLE.headerTitleStyle,
    headerRight: <Text />
  }

  ifGoBack = () => {
    this.props.navigation.goBack(null)
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          { this.props.navigation.state.params.applicants.map(item => {
            return (<TalentwithNav key={item.id} user={this.props.navigation.state.params.user}
              applicantInfo={item} talentNav={{id: item.partyId, type: item.partyType}} ifGoBack={this.ifGoBack} />)
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'column',
    minHeight: '100%',
    backgroundColor: '#ebf0f5',
    paddingTop: px2dp(30)
  }
})
