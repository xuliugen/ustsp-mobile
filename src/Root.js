import React from 'react'
import { Text, StyleSheet, View, AsyncStorage } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { THEME_COLOR } from 'src/styles/common'
import { MessageBarManager, MessageBar } from 'react-native-message-bar'
import { dispatchAuthData, getUserInfo } from 'src/actions'
import { connect } from 'react-redux'
import { px2dp, px2sp } from 'src/utils/device'

// home
import HomeScreen from 'src/views/home/HomeScreen'
// search
import ProjectSearchScreen from 'src/views/search/ProjectSearchScreen'
import TalentSearchScreen from 'src/views/search/TalentSearchScreen'
import PatentSearchScreen from 'src/views/search/PatentSearchScreen'
// talent
import TalentDetailScreen from 'src/views/talent/TalentDetailScreen'
// project
import ProjectDetailScreen from 'src/views/project/ProjectDetailScreen'
// patent
import PatentDetailScreen from 'src/views/patent/PatentDetailScreen'
// news
import NewsSearchScreen from 'src/views/search/NewsSearchScreen'
import NewsDetailScreen from 'src/views/news/NewsDetailScreen'
// my
import MyScreen from 'src/views/my/MyScreen'
// login
import LoginScreen from 'src/views/login/LoginScreen'
import ContactsMgntScreen from 'src/views/contacts/ContactsMgntScreen.js'
// messages
import MessagesScreen from 'src/views/messages/MessagesScreen'
import ConnectionRequestScreen from 'src/views/messages/components/ConnectionRequestScreen'
import InnerMessagesScreen from 'src/views/messages/components/InnerMessagesScreen'
import ProjectNewsScreen from 'src/views/messages/components/ProjectNewsScreen'
import SystemMessagesScreen from 'src/views/messages/components/SystemMessagesScreen'
// register
import RegisterUserTypeScreen from 'src/views/register/RegisterUserTypeScreen'
import RegisterAccountScreen from 'src/views/register/RegisterAccountScreen'
import RegisterPasswordScreen from 'src/views/register/RegisterPasswordScreen'
import RegisterEmailScreen from 'src/views/register/RegisterEmailScreen'
import RegisterCompleteScreen from 'src/views/register/RegisterCompleteScreen'



const navOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 0) {
    tabBarVisible = false
  }
  return {
    tabBarVisible
  }
}

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  ProjectSearch: { screen: ProjectSearchScreen },
  TalentSearch: { screen: TalentSearchScreen },
  PatentSearch: { screen: PatentSearchScreen },
  NewsSearch: { screen: NewsSearchScreen },
  PalentDetail: { screen: PatentDetailScreen },
  ProjectDetail: { screen: ProjectDetailScreen },
  NewsDetail: { screen: NewsDetailScreen }
})

HomeStack.navigationOptions = navOptions

const MessageStack = createMaterialTopTabNavigator(
  {
    ConnectionRequest: { screen: ConnectionRequestScreen },
    ProjectNews: { screen: ProjectNewsScreen },
    SystemMessages: { screen: SystemMessagesScreen },
    InnerMessages: { screen: InnerMessagesScreen },
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#fff'
      },
      activeTintColor: THEME_COLOR,
      inactiveTintColor: '#999',
      indicatorStyle: {
        height: 5,
        width: 50,
        marginLeft: 20,
        backgroundColor: THEME_COLOR
      }
    },
    navigationOptions: ({navigation}) => ({
      tabBarLabel: ({tintColor}) => {
        const { routeName } = navigation.state
        let label
        switch (routeName) {
          case 'ConnectionRequest':
            label = '好友申请'
            break
          case 'ProjectNews':
            label = '项目动态'
            break
          case 'SystemMessages':
            label = '系统消息'
            break
          case 'InnerMessages':
            label = '站内信'
        }
        return <Text style={[styles.topTabLabel, { color: tintColor }]}>{label}</Text>
      }
    })
  }
)

const MyStack = createStackNavigator({
  My: { screen: MyScreen },
  Contacts: { screen: ContactsMgntScreen },
  Messages: { screen: MessagesScreen }
})

MyStack.navigationOptions = navOptions

const LoginStack = createStackNavigator({
  Login: { screen: LoginScreen },
  Register1: { screen: RegisterUserTypeScreen },
  Register2: { screen: RegisterAccountScreen },
  Register3: { screen: RegisterPasswordScreen },
  Register4: { screen: RegisterEmailScreen },
  RegisterComplete: { screen: RegisterCompleteScreen }
})

const TalentDetailStack = createStackNavigator({
  TalentDetail: { screen: TalentDetailScreen }
})

const AppStack = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    My: { screen: MyStack }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`
        } else if (routeName === 'My') {
          iconName = `ios-options${focused ? '' : '-outline'}`
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />
      },
      tabBarLabel: ({ tintColor }) => {
        const { routeName } = navigation.state
        let label
        if (routeName === 'Home') {
          label = '首页'
        } else if (routeName === 'My') {
          label = '我的'
        }
        return <Text style={[{ color: tintColor }, styles.tabLabel]}>{label}</Text>
      }
    }),
    // tabBarComponent: TabBarBottom,
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: THEME_COLOR,
      inactiveTintColor: '#999'
    },
    animationEnabled: false,
    swipeEnabled: false
  }
)

const AppNavigator = createStackNavigator(
  {
    App: AppStack,
    Login: LoginStack,
    TalentDetail: TalentDetailStack
  },
  {
    initialRouteName: 'App',
    navigationOptions: {
      header: null
    }
  }
)

@connect()
export default class AppRoot extends React.Component {
  componentWillMount() {
    this.getAuthData()
  }
  componentDidMount() {
    MessageBarManager.registerMessageBar(this.refs.alert)
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppNavigator />
        <MessageBar ref="alert" />
      </View>
    )
  }
}

export class MessageStackNavigator extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MessageStack />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabLabel: {
    textAlign: 'center',
    marginBottom: 3
  },
  topTabLabel: {
    marginVertical: px2dp(20),
    fontSize: px2sp(32)
  }
})
