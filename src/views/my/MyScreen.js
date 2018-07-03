import React from 'react'
import { StyleSheet, Text, View, Image, AsyncStorage, TouchableOpacity, Alert } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { px2dp, px2sp } from 'src/utils/device'
import { userLogout } from 'src/actions'
import MyScreenHeader from './components/MyScreenHeader'
import MenuListItem from './components/MenuListItem'

const iconIntro = require('./components/img/intro.png')
const iconProject = require('./components/img/project_mgt.png')
const iconPatent = require('./components/img/patent_mgt.png')
const iconJobMarket = require('./components/img/job_market.png')

/**
 * @todo add param pressFunc to menu list
 * @todo lists for every user role
 */
@connect()
@withNavigation
export default class App extends React.Component {
  static navigationOptions = {
    header: <MyScreenHeader />
  }

  handleMenuPress = (title) => {
    Alert.alert(title)
  }
  handleLogoutPress = () => {
    this.props.dispatch(userLogout())
    AsyncStorage.multiRemove(['token', 'user'])
  }

  setMenus = (type) => {
    let menus = [
      { title: 'project', text: '管理项目', img: iconProject },
      { title: 'patent', text: '管理专利', img: iconPatent },
      { title: 'resume', text: '我的履历', img: iconIntro },
      { title: 'job-market', text: '职场入口（未开通）', img: iconJobMarket },
      { title: 'company-profile', text: '个人资料', img: iconIntro }
    ]
    switch (type) {
      case 1:
        return menus.filter((item, idx) => {
          return idx < 3
        })
      case 2:
        return menus.filter((item, idx) => {
          return idx < 4 && idx !== 1
        })
      case 3:
        return menus.filter((item, idx) => {
          return idx < 1 || idx === 4
        })
      default:
        return []
    }
  }

  render() {
    const type = 3
    const selectedMenus = this.setMenus(type)
    return (
      <View style={styles.container}>
        {/* 未登录隐藏 */}
        <View style={styles.menuContainer} >
          {selectedMenus.map(item => {
            return (
              <TouchableOpacity key={item.title} onPress={this.handleMenuPress.bind(this, item.title)} style={styles.menuItem} >
                <Image source={item.img} style={styles.menuIcon} />
                <Text style={styles.menuText} >{item.text}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
        <View style={{ marginTop: px2dp(30) }}>
          <MenuListItem item={{ iconName: 'md-megaphone', text: '我的动态', num: 134 }} />
        </View>
        <View style={{ marginTop: px2dp(30) }}>
          <MenuListItem item={{ iconName: 'md-help-circle', text: '常见问题' }} style={{ marginTop: px2dp(30) }} />
          <MenuListItem item={{ iconName: 'md-information-circle', text: '关于UppFind' }} />
          <MenuListItem item={{ iconName: 'md-thumbs-up', text: '去打分' }} />
        </View>
        {/* <Button onPress={this.handleLoginPress} title="login" />
        <Button onPress={this.handleLogoutPress} title="logout" /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUD_COLOR
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff'
  },
  menuItem: {
    alignItems: 'center',
    marginVertical: px2dp(30)
  },
  menuIcon: {
    width: px2dp(80),
    height: px2dp(80)
  },
  menuText: {
    marginTop: px2dp(18),
    fontSize: px2sp(24),
    color: '#666'
  }
})
