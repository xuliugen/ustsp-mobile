import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import NewsItem from './items/NewsItem'
import {px2dp} from "../../../utils/device";
import {APP_BACKGROUD_COLOR} from "../../../styles/common";

@connect()
@withNavigation
export default class ProjectNewsScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <NewsItem />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  conatiner: {}
})
