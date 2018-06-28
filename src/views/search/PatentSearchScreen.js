import React from 'react'
import { StyleSheet, ScrollView, View, Text, } from 'react-native'
import HeaderRightFilter from './components/HeaderRightFilter'
import HeaderTitleSearch from './components/HeaderTitleSearch'
import PatentItem from './components/PatentItem'

import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { px2dp, px2sp } from 'src/utils/device'

export default class PatentSearchScreen extends React.Component {
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
    patents: [{}, {}]
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.resultTitleContainer}>
            <Text style={styles.titleText}>共为您找到：<Text style={styles.titleTextHighlight}>3 </Text>个相关知识产权</Text>
          </View>
          <View>
            {/* todo: the value of key is patent.id, not idx */}
            {this.state.patents.map((patents, idx) => (
              <PatentItem key={idx} patents={patents} />
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
    marginTop: px2dp(31),
    marginBottom: 1,
    paddingVertical: px2dp(21),
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
