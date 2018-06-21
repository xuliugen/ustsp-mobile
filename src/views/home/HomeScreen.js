import React from 'react'
import { StyleSheet, ImageBackground, View, ScrollView,Text } from 'react-native'
import Swiper from 'react-native-swiper'

import { THEME_COLOR } from '../../styles/common'
import {px2dp, px2sp} from '../../utils/device'

import Search from './components/Search'
import ProjectCard from './components/ProjectCard'
import Talents from './components/Talents'
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
          <Menu />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>- 推荐人才 -</Text>
          <Text style={[styles.titleText, styles.more]}>更多 ></Text>
        </View>
        <View style={styles.talentsContainer}>
          <Talents />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>- 您可能感兴趣的项目 -</Text>
          <Text style={[styles.titleText, styles.more]}>更多 ></Text>
        </View>
        <View style={styles.projectContainer}>
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
  },
  talentsContainer: {
    marginBottom: px2dp(20)
  },
  projectContainer: {
    marginBottom: px2dp(30)
  },
  titleContainer: {
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
    marginTop: px2dp(10),
    marginHorizontal: px2dp(20),
    marginBottom: px2dp(30)
  },
  titleText: {
    fontSize: px2sp(28),
    color: '#8f9ba7'
  },
  more: {
    position: 'absolute',
    right: 0
  }
})
