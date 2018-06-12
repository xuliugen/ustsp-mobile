import React from 'react'
import { StyleSheet, ImageBackground, View, ScrollView } from 'react-native'
import Swiper from 'react-native-swiper'

import { THEME_COLOR } from '../../styles/common'
import { DP } from '../../utils/device'

import Search from './components/Search'

export default class App extends React.Component {
  static navigationOptions = {
    title: '首页',
    header: null
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Swiper style={styles.swiper} height={400 / DP} dotColor="#ddd" activeDotColor={THEME_COLOR}
          autoplay autoplayTimeout={2}>
          <View style={styles.slide}>
            <ImageBackground source={require('../../img/banner1.png')} style={styles.banner} />
          </View>
          <View style={styles.slide}>
            <ImageBackground source={require('../../img/banner2.jpg')} style={styles.banner} />
          </View>
          <View style={styles.slide}>
            <ImageBackground source={require('../../img/banner3.jpg')} style={styles.banner} />
          </View>
        </Swiper>
        <Search />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#ebf0f5'
  },

  swiper: {},
  slide: {
    flex: 1
  },
  banner: {
    flex: 1
  }
})
