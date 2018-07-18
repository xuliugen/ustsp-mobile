import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

import { APP_BACKGROUD_COLOR } from 'src/styles/common'
import { px2dp, px2sp } from 'src/utils/device'
import { userLogout } from 'src/actions'
import { checkIfLogin } from 'src/selectors'

import MyScreenHeader from './components/MyScreenHeader'
import MenuListItem from './components/MenuListItem'

const iconIntro = require('./components/img/intro.png')
const iconProject = require('./components/img/project_mgt.png')
const iconPatent = require('./components/img/patent_mgt.png')
// const iconJobMarket = require('./components/img/job_market.png')

const mapStateToProps = state => {
  return {
    isLogin: checkIfLogin(state),
    userId: state.auth.user.id,
    userType: state.auth.user.userType
  }
}

@connect(mapStateToProps)
@withNavigation
export default class MyScreen extends React.Component {
  static navigationOptions = {
    header: <MyScreenHeader />
  }

  handleMenuPress = (title) => {
    switch (title) {
      case 'resume':
        this.props.navigation.navigate('TalentDetail', {
          userId: this.props.userId,
          userType: this.props.userType
        })
        break
      default:
        Alert.alert(title)
    }
  }
  handleLogoutPress = () => {
    this.props.dispatch(userLogout())
    AsyncStorage.multiRemove(['token', 'user'])
  }

  renderTopMenu = (type) => {
    const menus = [
      { title: 'project', text: '管理项目', img: iconProject },
      { title: 'patent', text: '管理专利', img: iconPatent },
      { title: 'resume', text: '我的履历', img: iconIntro },
      // { title: 'job-market', text: '职场入口（未开通）', img: iconJobMarket },
      { title: 'company-profile', text: '公司资料', img: iconIntro }
    ]
    let userMenu = []
    switch (type) {
      case 1:
        userMenu = menus.filter((item, idx) => {
          return idx <= 2
        })
        break
      case 2:
        userMenu = menus.filter((item, idx) => {
          return idx <= 2 && idx !== 1
        })
        break
      case 3:
        userMenu = menus.filter((item, idx) => {
          return idx < 1 || idx === 4
        })
        break
      default:
    }
    return (userMenu.map(item => {
      return (
        <TouchableOpacity key={item.title} onPress={this.handleMenuPress.bind(this, item.title)} style={styles.menuItem} >
          <Image source={item.img} style={styles.menuIcon} />
          <Text style={styles.menuText} >{item.text}</Text>
        </TouchableOpacity>
      )
    }))
  }

  render() {
    const type = 2
    const { isLogin } = this.props
    return (
      <View style={styles.container}>
        <ScrollView>
          {isLogin && <View style={styles.menuContainer}>
            {this.renderTopMenu(type)}
          </View>}
          <View style={styles.menuListContainer}>
            <MenuListItem item={{ iconName: 'md-megaphone', text: '我的动态', num: 134 }} />
          </View>
          <View style={styles.menuListContainer}>
            <MenuListItem item={{ to: 'Contacts', iconName: 'md-contacts', text: '人脉管理' }} />
          </View>
          <View style={styles.menuListContainer}>
            <MenuListItem pass item={{ iconName: 'md-help-circle', text: '常见问题' }} />
            <MenuListItem pass item={{ iconName: 'md-information-circle', text: '关于UppFind' }} />
            <MenuListItem pass item={{ iconName: 'md-thumbs-up', text: '去打分' }} />
          </View>
          {isLogin && <View style={styles.menuListContainer}>
            <TouchableOpacity onPress={this.handleLogoutPress} >
              <View style={styles.logoutContainer} >
                <Text style={styles.logoutText}>退出登录</Text>
              </View>
            </TouchableOpacity>
          </View>}
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
  },

  menuListContainer: {
    marginTop: px2dp(30)
  },

  logoutContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: px2dp(28),
    // paddingHorizontal: px2dp(33),
    // marginBottom: 1,
    backgroundColor: '#fff'
  },
  logoutText: {
    fontSize: px2sp(32),
    color: '#f5222d'
  }
})
