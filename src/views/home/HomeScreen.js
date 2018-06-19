import React from 'react'
import { StyleSheet, ImageBackground, View, ScrollView } from 'react-native'
import Swiper from 'react-native-swiper'

import { THEME_COLOR } from '../../styles/common'
import { px2dp } from '../../utils/device'

import Search from './components/Search'
import ProjectCard from './components/ProjectCard'
import Menu from './components/Menu'

export default class App extends React.Component {
  static navigationOptions = {
    title: '首页',
    header: null
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Swiper style={styles.swiper} height={px2dp(400)} dotColor="#ddd" activeDotColor={THEME_COLOR}
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
        <View style={styles.searchContainer}>
          <Search />
        </View>
        <View style={styles.menuContainer}>
          <Menu navigation={this.props.navigation} />
        </View>
        <View>
          <ProjectCard />
        </View>
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
  },
  searchContainer: {
    position: 'relative',
    top: px2dp(-80),
    marginLeft: px2dp(20),
    marginRight: px2dp(20),
    marginBottom: px2dp(-80)
  },
  menuContainer: {
    margin: px2dp(20)
  }
})
