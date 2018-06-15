import React from 'react'
import { StyleSheet, ImageBackground, View, ScrollView, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'

import { THEME_COLOR, APP_BACKGROUD_COLOR } from '../../styles/common'
import { px2dp } from '../../utils/device'

import Search from './components/Search'
import ProjectCard from './components/ProjectCard'

export default class Home extends React.Component {
  static navigationOptions = {
    title: '首页',
    header: null,
    headerBackTitle: null
  }

  handleProjectCardPress = () => {
    this.props.navigation.navigate('ProjectSearch')
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
        <View>
          <TouchableOpacity onPress={this.handleProjectCardPress} activeOpacity={1} style={styles.tabTouchable}>
            <ProjectCard />
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: APP_BACKGROUD_COLOR
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
  }
})
