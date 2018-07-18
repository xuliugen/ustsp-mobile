import React from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { fetchFriendsList } from 'src/ajax/contacts'
import { APP_BACKGROUD_COLOR, THEME_COLOR } from 'src/styles/common'
import { px2dp, px2sp } from 'src/utils/device'
import TalentItem from 'src/components/common/TalentItem'

const mapStateToProps = state => {
  return {
    userId: state.auth.user.id
  }
}

@connect(mapStateToProps)
export default class ContactsMgntScreen extends React.Component {
  static navigationOptions = {
    title: '人脉管理',
    headerStyle: {
      backgroundColor: '#8d9caa'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center'
    },
    headerRight: <View />
  }

  state = {
    curGroup: 'my-friends'
  }

  componentDidMount() {
    this.fetchFriends()
  }

  async fetchFriends() {
    const { data } = await fetchFriendsList(this.props.userId)
    this.setState({
      friends: data
    })
  }

  handleTabPress(type) {
    this.setState({
      curGroup: type,
      friends: []
    })
  }

  handleTalentPress = (id, type) => {
    if (type === 4) {
      return
    }
    this.props.navigation.navigate('TalentDetail', {
      userId: id,
      userType: Number(type)
    })
  }

  render() {
    // const tabs = [
    //   { type: 'my-friends', title: '我的好友' },
    //   { type: 'second-degree', title: '二度人脉' }
    // ]
    return (
      <View style={styles.container} >
        {/* <View style={styles.tabContainer}>
          {tabs.map(item => {
            return (
              <TouchableOpacity activeOpacity={1} key={item.type} style={styles.tabItem} onPress={this.handleTabPress.bind(this, item.type)}>
                <Text style={[styles.tabText, (this.state.curGroup === item.type && styles.selected)]} >{item.title}</Text>
              </TouchableOpacity>
            )
          })}
        </View> */}
        <View style={styles.friendsContainer}>
          <FlatList
            data={this.state.friends}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={this.handleTalentPress.bind(this, item.userInfo.id, item.userInfo.userType)}>
                <TalentItem talent={Object.assign({}, item.userInfo, { 'username': item.username })} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.userInfo.id}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_BACKGROUD_COLOR
  },
  tabContainer: {
    flexDirection: 'row',
    paddingTop: px2dp(30),
    backgroundColor: '#fff'
  },
  tabItem: {
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    paddingBottom: px2dp(30),
    fontSize: px2sp(28),
    color: '#8f9ba7'
  },
  selected: {
    color: THEME_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: THEME_COLOR
  },

  friendsContainer: {
    marginTop: px2dp(30)
  }
})
