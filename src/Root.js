import React from 'react'
import { Text, StyleSheet, View, AsyncStorage } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { THEME_COLOR } from 'src/styles/common'
import { px2sp, px2dp } from 'src/utils/device'
import { MessageBarManager, MessageBar } from 'react-native-message-bar'
import { dispatchAuthData, getUserInfo } from 'src/actions'
import { connect } from 'react-redux'

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
import PublishedProjectsScreen from 'src/views/project/PublishedProjectsScreen.js'
import UndertakenProjectsScreen from 'src/views/project/UndertakenProjectsScreen.js'
// patent
import PatentDetailScreen from 'src/views/patent/PatentDetailScreen'
// news
import NewsSearchScreen from 'src/views/search/NewsSearchScreen'
import NewsDetailScreen from 'src/views/news/NewsDetailScreen'
// my
import MyScreen from 'src/views/my/MyScreen'
import ContactsMgntScreen from 'src/views/contacts/ContactsMgntScreen.js'
// login
import LoginScreen from 'src/views/login/LoginScreen'
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
  TalentDetail: { screen: TalentDetailScreen },
  NewsDetail: { screen: NewsDetailScreen }
})

HomeStack.navigationOptions = navOptions

const ProjectMgntStack = createMaterialTopTabNavigator(
  {
    PublishedProjects: { screen: PublishedProjectsScreen },
    UndertakenProjects: { screen: UndertakenProjectsScreen }
  },
  {
    initialRouteName: 'PublishedProjects',
    backBehavior: 'none',
    tabBarOptions: {
      style: {
        paddingVertical: px2dp(10),
        backgroundColor: '#fff'
      },
      labelStyle: {
        fontSize: px2sp(28)
      },
      indicatorStyle: {
        backgroundColor: THEME_COLOR
      },
      activeTintColor: THEME_COLOR,
      inactiveTintColor: '#999'
    },
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ tintColor }) => {
        const { routeName } = navigation.state
        let label
        if (routeName === 'PublishedProjects') {
          label = '我发布的'
        } else if (routeName === 'UndertakenProjects') {
          label = '我承接的'
        }
        return <Text style={[{ color: tintColor }, styles.tabLabel]}>{label}</Text>
      }
    })
  }
)

const MyStack = createStackNavigator({
  My: { screen: MyScreen },
  TalentDetail: { screen: TalentDetailScreen },
  ProjectDetail: { screen: ProjectDetailScreen },
  ContactsMgnt: { screen: ContactsMgntScreen },
  ProjectMgnt: {
    screen: ProjectMgntStack,
    navigationOptions: ({ navigation }) => ({
      title: '项目管理',
      headerStyle: {
        backgroundColor: '#8d9caa'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center'
      },
      headerRight: <View />
    })
  }
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
    Login: LoginStack
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

const styles = StyleSheet.create({
  tabLabel: {
    textAlign: 'center',
    marginBottom: 3
  }
})
