import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native'
import { px2dp, px2sp } from '../../../utils/device'

const iconTalent = require('../../../img/talent.png')
const iconProject = require('../../../img/project.png')
const iconPatent = require('../../../img/patent.png')
const iconNews = require('../../../img/news.png')

export default class Menu extends React.Component {
  onPress = () => {
    this.props.navigation.navigate('My')
  }

  render() {
    const menuItems = [
      { type: 'talent', title: '人才库', img: iconTalent },
      { type: 'project', title: '项目库', img: iconProject },
      { type: 'patent', title: '成果库', img: iconPatent },
      { type: 'news', title: '动态', img: iconNews }
    ]
    return (
      <View style={styles.container}>
        {menuItems.map(item => {
          return (
            <TouchableOpacity key={item.type} onPress={this.onPress} style={styles.buttons}>
              <Image style={styles.icons} source={item.img} />
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: px2dp(30),
    backgroundColor: '#fff'
  },
  buttons: {
    flex: 1,
    alignItems: 'center'
  },
  icons: {
    width: px2dp(80),
    height: px2dp(80)
  },
  title: {
    fontSize: px2sp(24),
    color: '#666'
  }
})
