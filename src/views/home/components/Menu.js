import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import { toSearchPageByType } from 'src/utils/nav'
import { px2dp, px2sp } from 'src/utils/device'

const iconTalent = require('src/img/talent.png')
const iconProject = require('src/img/project.png')
const iconPatent = require('src/img/patent.png')
const iconNews = require('src/img/news.png')

@withNavigation
export default class Menu extends React.Component {
  onPress = (type) => {
    toSearchPageByType(type, this.props.navigation)
  }

  render() {
    const menuItems = [
      { type: 'talent', title: '人才库', img: iconTalent },
      { type: 'project', title: '项目库', img: iconProject },
      { type: 'patent', title: '专利库', img: iconPatent },
      { type: 'news', title: '动态', img: iconNews }
    ]
    return (
      <View style={styles.container}>
        {menuItems.map(item => {
          return (
            <TouchableOpacity key={item.type} onPress={this.onPress.bind(this, item.type)} style={styles.buttons}>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#eeedee',
    paddingVertical: px2dp(30),
    paddingHorizontal: px2dp(40),
    backgroundColor: '#fff'
  },
  buttons: {
    alignItems: 'center'
  },
  icons: {
    width: px2dp(80),
    height: px2dp(80)
  },
  title: {
    marginTop: px2dp(12),
    fontSize: px2sp(24),
    color: '#666'
  }
})
