import React from 'react'
import { View, AsyncStorage } from 'react-native'
import { MessageBarManager, MessageBar } from 'react-native-message-bar'
import { connect } from 'react-redux'
import { Asset, AppLoading } from 'expo'

import AppNavigator from './router'
import { dispatchAuthData, getUserInfo } from 'src/actions'

@connect()
export default class AppRoot extends React.Component {
  constructor(props) {
    super(props)
    this.alert = React.createRef()
  }

  state = {
    isReady: false
  }

  componentWillMount() {
    this.getAuthData()
  }
  componentDidMount() {
    MessageBarManager.registerMessageBar(this.alert.current)
  }
  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar()
  }

  async getAuthData() {
    // 写完了发现可以用 multiGet()，但是不算改了，略略
    const [token, user] = await Promise.all([AsyncStorage.getItem('token'), AsyncStorage.getItem('user')])
    if (token && user) {
      const userObj = JSON.parse(user)
      this.props.dispatch(dispatchAuthData(token, userObj))
      this.props.dispatch(getUserInfo())
    }
  }

  async _cacheResourcesAsync() {
    const images = [
      require('src/img/avatar1.png'),
      // require('src/img/banner1.png'),
      // require('src/img/banner2.jpg'),
      // require('src/img/banner3.jpg'),
      require('src/img/ellipse.png'),
      require('src/img/news.png'),
      require('src/img/patent.png'),
      require('src/img/project.png'),
      require('src/img/splash.png'),
      require('src/img/talent.png'),
      require('src/img/uppfind.png'),
      require('src/img/newsIcon.png'),
      require('src/img/resultIcon.png'),
      require('src/img/projectIcon.png'),
      require('src/views/my/components/img/background.png'),
      require('react-navigation/src/views/assets/back-icon.png')
    ]

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync()
    })
    return Promise.all(cacheImages)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.isReady ? <AppNavigator />
          : <AppLoading
            startAsync={this._cacheResourcesAsync}
            onFinish={() => this.setState({ isReady: true })}
            onError={console.warn}
          />}
        <MessageBar ref={this.alert} />
      </View>
    )
  }
}
