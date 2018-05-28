import React from 'react'
import { StyleSheet, Text, ImageBackground, View, ScrollView, PixelRatio } from 'react-native'
import Swiper from 'react-native-swiper'

import { THEME_COLOR } from '../../styles/common'

const DP = PixelRatio.get()

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
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#ebf0f5'
  },

  swiper: {
    // height: 44
  },
  slide: {
    flex: 1
  },
  banner: {
    flex: 1
  }
})
